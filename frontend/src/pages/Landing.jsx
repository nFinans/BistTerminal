import React, { useState } from 'react';
import TopBar from '../components/landing/TopBar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import SentimentPanel from '../components/landing/SentimentPanel';
import Pricing from '../components/landing/Pricing';
import FooterSection from '../components/landing/FooterSection';
import WhopModal from '../components/landing/WhopModal';

// 🟢 ESKİ WHOP YAPISI (İptal edilmedi, şalterle kontrol edilecek) 🟢
const WHOP_PLANS = {
  sixMonth: {
    planId: "plan_xxxxxx", // Kendi eski Whop plan ID'n
    title: "Premium Plan - 6 Aylık",
    price: "5400 TL",
    url: "https://whop.com/checkout/..." 
  },
  yearly: {
    planId: "plan_yyyyyy", // Kendi eski Whop plan ID'n
    title: "Premium+ Plan - Yıllık",
    price: "9600 TL",
    url: "https://whop.com/checkout/..." 
  }
};

export default function Landing() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  // 🔄 SİSTEM SEÇİCİ ŞALTER 🔄
  // İleride Whop'a dönmek istersen bu değeri 'true' yapman yeterli!
  const USE_WHOP = false; 

  const handlePlanSelect = (planData) => {
    if (USE_WHOP) {
      // Şalter açıksa: Pricing'den gelen paketin ID'sini (sixMonth) al,
      // yukarıdaki WHOP_PLANS listesinden eski URL'leri bul ve Modal'a gönder.
      const planId = planData.id || planData.planId;
      setSelectedPlan(WHOP_PLANS[planId]);
    } else {
      // Şalter kapalıysa (ŞU ANKİ DURUM): İyzico/WhatsApp için paketin 
      // fiyat, başlık gibi TÜM bilgilerini doğrudan yeni Modal'a gönder.
      setSelectedPlan(planData);
    }
  };

  return (
    <div className="bg-[#0b0e14] min-h-screen text-white font-sans selection:bg-[#26a69a] selection:text-white">
      <TopBar />
      <main>
        <Hero />
        <Features />
        <SentimentPanel />
        <Pricing onSelect={handlePlanSelect} />
      </main>
      <FooterSection />
      
      <WhopModal 
        plan={selectedPlan} 
        onClose={() => setSelectedPlan(null)} 
      />
    </div>
  );
}
