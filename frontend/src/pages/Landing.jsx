import React, { useState } from "react";
import TopBar from "@/components/landing/TopBar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Kings from "@/components/landing/Kings";
import SentimentPanels from "@/components/landing/SentimentPanels";
import Pricing from "@/components/landing/Pricing";
import TechStack from "@/components/landing/TechStack";
import FooterSection from "@/components/landing/FooterSection";
import WhopModal from "@/components/landing/WhopModal";

const LOGIN_URL = "https://bist.privyalgo.com/app";

// Whop checkout URLs (plan IDs provided by user)
const WHOP_PLANS = {
    sixMonth: {
        title: "Premium Plan — 6 Aylık",
        price: "5.400 TL",
        planId: "plan_g4J6Wi1MAafMB",
        url: "https://whop.com/checkout/plan_g4J6Wi1MAafMB/?d2c=true",
    },
    yearly: {
        title: "Premium+ Plan — Yıllık",
        price: "9.600 TL",
        planId: "plan_JeXSEXRXPoExb",
        url: "https://whop.com/checkout/plan_JeXSEXRXPoExb/?d2c=true",
    },
};

export default function Landing() {
    const [whopPlan, setWhopPlan] = useState(null);

    const handleLogin = () => {
        window.open(LOGIN_URL, "_self");
    };

    const handleScrollToPricing = () => {
        const el = document.getElementById("pricing");
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    const handleOpenPlan = (planKey) => {
        setWhopPlan(WHOP_PLANS[planKey]);
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

            <WhopModal plan={whopPlan} onClose={() => setWhopPlan(null)} />
        </div>
    );
}
