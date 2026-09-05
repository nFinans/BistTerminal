from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.responses import HTMLResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone
import iyzipay
import json

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()
api_router = APIRouter(prefix="/api")

# Basic Auth for Admin Panel
security = HTTPBasic()

# IYZICO Ayarları (Env üzerinden dinamik)
iyzico_options = {
    'api_key': os.environ.get('IYZICO_API_KEY', '').strip(),
    'secret_key': os.environ.get('IYZICO_SECRET_KEY', '').strip(),
    'base_url': os.environ.get('IYZICO_BASE_URL', 'https://api.iyzipay.com').strip()
}

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class PaymentRequest(BaseModel):
    planId: str
    planName: str
    price: str
    name: str
    surname: str
    email: str
    gsmNumber: str
    identityNumber: str
    address: str
    district: str
    city: str
    username: str
    password: str
    userIp: str = "85.34.78.112"

class VerifyPaymentRequest(BaseModel):
    token: str

@api_router.get("/")
async def root():
    return {"message": "BIST API is running"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

# 1. ADIM: Ödeme Başlatıldığında Kayıt Atma (MongoDB)
@api_router.post("/payment/initialize")
async def initialize_payment(request: PaymentRequest):
    try:
        full_address = f"{request.address}, {request.district} / {request.city}"
        conversation_id = f"BIST-{uuid.uuid4().hex[:8]}"

        request_data = {
            'locale': 'tr',
            'conversationId': conversation_id,
            'price': request.price,
            'paidPrice': request.price,
            'currency': 'TRY',
            'basketId': request.planId,
            'paymentGroup': 'SUBSCRIPTION',
            'callbackUrl': 'https://bist.privyalgo.com/odeme-basarili',
            'enabledInstallments': ['1'],
            'buyer': {
                'id': f"USER-{uuid.uuid4().hex[:6]}",
                'name': request.name,
                'surname': request.surname,
                'gsmNumber': request.gsmNumber,
                'email': request.email,
                'identityNumber': request.identityNumber,
                'registrationAddress': full_address,
                'ip': request.userIp,
                'city': request.city,
                'country': 'Turkey'
            },
            'shippingAddress': {
                'contactName': f"{request.name} {request.surname}",
                'city': request.city,
                'country': 'Turkey',
                'address': full_address
            },
            'billingAddress': {
                'contactName': f"{request.name} {request.surname}",
                'city': request.city,
                'country': 'Turkey',
                'address': full_address
            },
            'basketItems': [
                {
                    'id': request.planId,
                    'name': request.planName,
                    'category1': 'BIST',
                    'itemType': 'VIRTUAL',
                    'price': request.price
                }
            ]
        }

        checkout_form = iyzipay.CheckoutFormInitialize().create(request_data, iyzico_options)
        raw_result = checkout_form.read()
        
        if isinstance(raw_result, bytes):
            result = json.loads(raw_result.decode('utf-8'))
        else:
            result = json.loads(raw_result) if isinstance(raw_result, str) else raw_result

        token = result.get('token') if result.get('status') == 'success' else None

        # MongoDB'ye "Ödeme Başlatıldı" olarak kaydediyoruz
        order_record = {
            "order_id": conversation_id,
            "name": request.name,
            "surname": request.surname,
            "email": request.email,
            "gsmNumber": request.gsmNumber,
            "planId": request.planId,
            "planName": request.planName,
            "price": request.price,
            "terminal_username": request.username,
            "terminal_password": request.password,
            "payment_status": "Ödeme Başlatıldı",
            "created_at": datetime.now(timezone.utc).isoformat(),
            "iyzico_token": token
        }
        await db.orders.insert_one(order_record)

        if result.get('status') == 'success':
            return {"status": "success", "paymentPageUrl": result.get('paymentPageUrl'), "token": token}
        else:
            raise HTTPException(status_code=400, detail=result.get('errorMessage', 'Ödeme başlatılamadı'))

    except Exception as e:
        print(f"Sunucu Hatası: {e}")
        raise HTTPException(status_code=500, detail="Sunucu tarafında bir hata oluştu")

# 2. ADIM: Ödeme Onayı ve MongoDB Güncelleme
@api_router.post("/payment/verify")
async def verify_payment(data: VerifyPaymentRequest):
    try:
        request_data = {'locale': 'tr', 'token': data.token}
        checkout_form = iyzipay.CheckoutForm().retrieve(request_data, iyzico_options)
        raw_result = checkout_form.read()
        
        result = json.loads(raw_result.decode('utf-8')) if isinstance(raw_result, bytes) else raw_result

        if result.get('status') == 'success' and result.get('paymentStatus') == 'SUCCESS':
            # MongoDB'de Token ile eşleşen kaydı "Ödeme Başarılı" yap
            await db.orders.update_one(
                {"iyzico_token": data.token},
                {"$set": {"payment_status": "Ödeme Başarılı"}}
            )
            return {"status": "success", "message": "Ödeme onaylandı"}
        else:
            return {"status": "failure", "message": "Ödeme başarısız"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# BIST İÇİN GÖRKEMLİ HTML ADMIN PANELİ ROTASI (MongoDB Uyumlu)
@api_router.get("/admin/orders", response_class=HTMLResponse)
async def get_admin_orders(credentials: HTTPBasicCredentials = Depends(security)):
    if credentials.username != "nFinans" or credentials.password != "Gs1905uA":
        raise HTTPException(status_code=401, detail="Geçersiz yetki", headers={"WWW-Authenticate": "Basic"})
    try:
        orders = await db.orders.find().sort("_id", -1).to_list(100)

        rows_html = ""
        for o in orders:
            status_color = "bg-amber-500/10 text-amber-400 border-amber-500/30" if o.get('payment_status') == "Ödeme Başlatıldı" else "bg-teal-500/10 text-teal-400 border-teal-500/30"
            rows_html += f"""
            <tr class="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td class="px-4 py-3 font-mono text-xs text-zinc-400">{o.get('created_at', '')[:19].replace('T', ' ')}</td>
                <td class="px-4 py-3 font-medium text-white">{o.get('name', '')} {o.get('surname', '')}</td>
                <td class="px-4 py-3 text-zinc-300 text-xs">{o.get('email', '')}<br/><span class="text-zinc-500">{o.get('gsmNumber', '')}</span></td>
                <td class="px-4 py-3 font-mono text-xs text-teal-300">{o.get('planName', '')}</td>
                <td class="px-4 py-3 font-mono text-white font-bold">{o.get('price', '')} TL</td>
                <td class="px-4 py-3 font-mono text-xs text-amber-300 bg-amber-950/20 rounded">
                    Kullanıcı: <b>{o.get('terminal_username', '')}</b><br/>
                    Şifre: <span class="text-teal-400">{o.get('terminal_password', '')}</span>
                </td>
                <td class="px-4 py-3">
                    <span class="px-2.5 py-1 rounded-full text-[10px] font-mono border {status_color}">
                        {o.get('payment_status', '')}
                    </span>
                </td>
            </tr>
            """

        html_content = f"""
        <!DOCTYPE html>
        <html lang="tr" class="dark">
        <head>
            <meta charset="UTF-8">
            <title>BIST PrivyAlgo - Admin Panel</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-zinc-950 text-zinc-100 min-h-screen p-6 lg:p-10 font-sans">
            <div class="max-w-7xl mx-auto">
                <div class="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                    <div>
                        <div class="font-mono text-xs text-teal-500 uppercase tracking-widest">// BIST YÖNETİM PANELİ</div>
                        <h1 class="text-3xl font-black text-white tracking-tight mt-1">Siparişler & Terminal Talepleri</h1>
                    </div>
                    <div class="font-mono text-xs bg-zinc-900 border border-white/10 px-4 py-2 rounded-lg text-zinc-400">
                        Toplam Kayıt: <span class="text-teal-400 font-bold">{len(orders)}</span>
                    </div>
                </div>

                <div class="bg-zinc-900/60 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="border-b border-white/10 bg-zinc-900/90 font-mono text-[11px] text-zinc-400 uppercase tracking-wider">
                                    <th class="px-4 py-3">Tarih (UTC)</th>
                                    <th class="px-4 py-3">Müşteri</th>
                                    <th class="px-4 py-3">İletişim</th>
                                    <th class="px-4 py-3">Paket</th>
                                    <th class="px-4 py-3">Tutar</th>
                                    <th class="px-4 py-3">Terminal Bilgileri</th>
                                    <th class="px-4 py-3">Durum</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows_html if rows_html else '<tr><td colspan="7" class="text-center py-12 text-zinc-500 font-mono">Henüz kayıt bulunmuyor.</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </body>
        </html>
        """
        return HTMLResponse(content=html_content)
    except Exception as e:
        print(f"Admin Paneli Hatası: {e}")
        raise HTTPException(status_code=500, detail="Kayıtlar getirilemedi")

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
