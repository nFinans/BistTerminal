import React, { useState } from "react";
import TopBar from "@/components/landing/TopBar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Kings from "@/components/landing/Kings";
import SentimentPanels from "@/components/landing/SentimentPanels";
import Pricing from "@/components/landing/Pricing";
import TechStack from "@/components/landing/TechStack";
import FooterSection from "@/components/landing/FooterSection";
import WhopModal from "@/components/landing/WhopModal"; // İsmi WhopModal kalsa da içi tamamen senin İyzico/WhatsApp altyapın!

const LOGIN_URL = "https://bist.privyalgo.com/app";

export default function Landing() {
    // İyzico/WhatsApp ekranına (yeni modale) gidecek plan verisini tutar
    const [selectedPlan, setSelectedPlan] = useState(null);

    const handleLogin = () => {
        window.open(LOGIN_URL, "_blank", "noopener,noreferrer");
    };

    const handleScrollToPricing = () => {
        const el = document.getElementById("pricing");
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    const handleOpenPlan = (planData) => {
        // Pricing.jsx'ten gelen plan bilgisini doğrudan İyzico modali için state'e gönderiyoruz.
        setSelectedPlan(planData);
    };

    return (
        <div
            className="min-h-screen text-white"
            style={{ background: "var(--bg-0)" }}
            data-testid="landing-root"
        >
            <TopBar onLogin={handleLogin} loginUrl={LOGIN_URL} />
            <Hero onLogin={handleLogin} loginUrl={LOGIN_URL} onSubscribe={handleScrollToPricing} />
            <Features />
            <Kings />
            <SentimentPanels />
            <Pricing onSelect={handleOpenPlan} />
            <TechStack />
            <FooterSection />

            <WhopModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
        </div>
    );
}
