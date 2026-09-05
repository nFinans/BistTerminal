import React, { useState } from "react";
import { Check, Crown, MessageCircle, TrendingUp, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const PLANS = [
    {
        planId: "sixMonth",
        title: "Premium Plan",
        period: "6 Ay",
        price: "5400",
        currency: "TL",
        oldPrice: "7200 TL",
        kdv: "KDV Dahil · Bankacılık Ödeme Aracı Komisyonu Dahildir.",
        tag: "%25 Avantajlı Paket · 6 Aylık yenilenir",
        tagColor: "#26a69a",
        accent: "#facc15",
        cta: "Premium Plan 6 Aylık",
        features: [
            { t: "5-15-60-120 dk. tam veri seti", icon: Check, color: "#26a69a" },
            { t: "Özel Haftalık Bülten", icon: Check, color: "#26a69a" },
            { t: "Premium Abonelere Özel Whatsapp Destek Grubu", icon: MessageCircle, color: "#5eead4" },
        ],
        popular: false,
    },
    {
        planId: "yearly",
        title: "Premium+ Plan",
        period: "Yıl",
        price: "9600",
        currency: "TL",
        oldPrice: "14400 TL",
        kdv: "KDV Dahil · Bankacılık Ödeme Aracı Komisyonu Dahildir.",
        tag: "Yıllık Üyelikte Ekstra %33,33 Tanışma Bonusu · Yıllık yenilenir",
        tagColor: "#26a69a",
        accent: "#ffb300",
        cta: "Premium+ Plan Yıllık",
        features: [
            { t: "5-15-60-120 dk. tam veri seti", icon: Check, color: "#26a69a" },
            { t: "Özel Haftalık Bülten", icon: Check, color: "#26a69a" },
            { t: "1 Yıllık TradingView PremiumAlgo Paketi", icon: TrendingUp, color: "#ef5350" },
            { t: "Premium+ Abonelere Özel Whatsapp Destek Grubu", icon: MessageCircle, color: "#5eead4" },
        ],
        popular: true,
    },
];

const LEGAL_LINKS = [
    { key: "uyelik", slug: "uyelik-sozlesmesi", label: "Üyelik Sözleşmesi" },
    { key: "kvkk", slug: "kvkk", label: "KVKK Aydınlanma Metni" },
    { key: "gizlilik", slug: "gizlilik-politikasi", label: "Gizlilik Politikası" },
];

export default function Pricing({ onSelect }) {
    return (
        <section
            id="pricing"
            className="relative py-24 overflow-hidden"
            style={{
                background:
                    "radial-gradient(ellipse at center, rgba(38,166,154,0.06), transparent 70%), #0a0d12",
            }}
        >
            <div className="max-w-7xl mx-auto px-5 sm:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <span className="text-xs font-mono tracking-[0.3em] uppercase mb-3 text-[#26a69a]">
                        /// Üyelik Planları
                    </span>
                    <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                        Profesyonel BIST trader’ları
                        <br />
                        <span className="text-[#a0a4b0]">için tasarlandı.</span>
                    </h2>
                    <p className="mt-5 text-[#a0a4b0]">
                        Ödemeler nFinans güvencesi altında, güvenli İyzico altyapısıyla sayfadan çıkmadan tamamlanır. Ödeme ve Taksit Seçenekleri ödeme ekranında kartınızın bağlı olduğu banka' ya göre değişiklik gösterir...
                    </p>
                </div>

                <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {PLANS.map((p) => (
                        <PlanCard
                            key={p.planId}
                            plan={p}
                            onSelect={() => onSelect(p)} 
                        />
                    ))}
                </div>

                <p className="mt-10 text-center text-xs font-mono text-[#6b7080] max-w-2xl mx-auto">
                    * Üyeliğiniz nFinans tarafından PrivyAlgo adına yönetilir. Tüm planlar PrivyAlgo kullanıcı sözleşmesine
                    tabidir. ** TradingView PremiumAlgo Paketi yıllık aboneliğe özel hediyedir.
                </p>
            </div>
        </section>
    );
}

function PlanCard({ plan, onSelect }) {
    const [consents, setConsents] = useState({
        uyelik: false,
        kvkk: false,
        gizlilik: false,
    });

    const allAccepted = consents.uyelik && consents.kvkk && consents.gizlilik;

    const handleBuy = () => {
        const missing = LEGAL_LINKS.filter((l) => !consents[l.key]).map((l) => l.label);
        if (missing.length > 0) {
            toast.error("Lütfen yasal metinleri onaylayın", {
                description: `Devam etmek için şu onayları vermelisiniz: ${missing.join(", ")}.`,
                duration: 5500,
                icon: <AlertCircle className="w-4 h-4 text-red-400" />,
            });
            return;
        }
        onSelect(); 
    };

    const toggle = (key) => setConsents((c) => ({ ...c, [key]: !c[key] }));

    return (
        <div
            className="relative rounded-2xl p-8 transition-all hover:translate-y-[-3px]"
            style={{
                background: "#0b0e14",
                border: `1.5px solid ${plan.popular ? plan.accent : "rgba(43,43,67,0.7)"}`,
                boxShadow: plan.popular
                    ? `0 20px 60px rgba(255,179,0,0.12), 0 0 0 1px ${plan.accent}33 inset`
                    : "0 10px 30px rgba(0,0,0,0.3)",
            }}
        >
            {plan.popular && (
                <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] font-mono tracking-widest rounded-full flex items-center gap-1.5"
                    style={{
                        background: plan.accent,
                        color: "#0b0e14",
                    }}
                >
                    <Crown className="w-3 h-3" /> EN POPÜLER
                </div>
            )}

            <div className="text-center">
                <div className="text-xs font-mono text-[#6b7080] line-through">
                    {plan.oldPrice} Yerine
                </div>
                <div
                    className="mt-2 text-3xl sm:text-4xl font-bold"
                    style={{ color: plan.accent, fontFamily: "Outfit, sans-serif" }}
                >
                    {plan.price} TL
                </div>
                <div className="text-[11px] text-[#6b7080] mt-1">{plan.kdv}</div>

                <h3
                    className="mt-6 text-xl font-bold"
                    style={{ color: plan.accent }}
                >
                    {plan.title}
                </h3>
                <div
                    className="mt-2 text-xs font-medium"
                    style={{ color: plan.tagColor }}
                >
                    {plan.tag}
                </div>
            </div>

            <ul className="mt-8 space-y-3">
                {plan.features.map((f, i) => {
                    const Icon = f.icon;
                    return (
                        <li key={i} className="flex items-start gap-3 text-sm text-[#d1d4dc]">
                            <span
                                className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                                style={{
                                    background: `${f.color}1a`,
                                    border: `1px solid ${f.color}55`,
                                }}
                            >
                                <Icon className="w-3 h-3" style={{ color: f.color }} />
                            </span>
                            <span>{f.t}</span>
                        </li>
                    );
                })}
            </ul>

            <div
                className="mt-8 rounded-lg p-4 space-y-2.5"
                style={{
                    background: "rgba(15,19,32,0.7)",
                    border: "1px solid rgba(43,43,67,0.55)",
                }}
            >
                {LEGAL_LINKS.map((l) => (
                    <label
                        key={l.key}
                        className="flex items-start gap-2.5 cursor-pointer group select-none"
                    >
                        <input
                            type="checkbox"
                            checked={consents[l.key]}
                            onChange={() => toggle(l.key)}
                            className="mt-0.5 w-4 h-4 rounded accent-[#26a69a] shrink-0 cursor-pointer"
                        />
                        <span className="text-[12px] leading-relaxed text-[#a0a4b0] group-hover:text-white transition">
                            <a
                                href={`#/${l.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-[#26a69a] hover:underline"
                            >
                                {l.label}
                            </a>
                            ’ni okudum, kabul ediyorum.
                        </span>
                    </label>
                ))}
            </div>

            <button
                onClick={handleBuy}
                className={`cta-shine w-full mt-5 py-3.5 rounded-md text-sm font-semibold tracking-wider transition ${
                    allAccepted ? "" : "opacity-90"
                }`}
                style={{
                    background: plan.popular
                        ? `linear-gradient(135deg, ${plan.accent} 0%, #d97706 100%)`
                        : "#1e2233",
                    color: plan.popular ? "#0b0e14" : "#ffffff",
                    fontFamily: "JetBrains Mono, monospace",
                    border: plan.popular ? "none" : `1px solid ${plan.accent}`,
                }}
            >
                {plan.cta}
            </button>

            {!allAccepted && (
                <p className="mt-2 text-[10px] font-mono text-[#6b7080] text-center">
                    Ödeme sayfası açılmadan önce sözleşmeleri tıklayarak onaylamanız ve işaretlemeniz gerekir.
                </p>
            )}
        </div>
    );
}
