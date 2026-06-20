import React from "react";
import { Check, Crown, MessageCircle, TrendingUp } from "lucide-react";

const PLANS = [
    {
        id: "sixMonth",
        title: "Premium Plan",
        period: "6 Ay",
        price: "5400 TL",
        oldPrice: "7200 TL",
        kdv: "KDV Dahil · Bankacılık Ödeme Aracı Komisyonu Dahildir.",
        tag: "%25 Avantajlı Paket · 6 Aylık yenilenir",
        tagColor: "#26a69a",
        accent: "#facc15",
        cta: "Premium Plan 6 Aylık",
        features: [
            { t: "5-15-60-120 dk. tam veri seti", icon: Check, color: "#26a69a" },
            { t: "Özel Haftalık Bülten", icon: Check, color: "#26a69a" },
            { t: "Premium Abonelere Özel Whatsapp Grubu", icon: MessageCircle, color: "#5eead4" },
        ],
        popular: false,
    },
    {
        id: "yearly",
        title: "Premium+ Plan",
        period: "Yıl",
        price: "9600 TL",
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
            { t: "Premium+ Abonelere Özel Whatsapp Grubu", icon: MessageCircle, color: "#5eead4" },
        ],
        popular: true,
    },
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
            data-testid="pricing-section"
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
                        Ödemeler Whop güvencesi altında, sayfadan çıkmadan tamamlanır.
                    </p>
                </div>

                <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {PLANS.map((p) => (
                        <PlanCard key={p.id} plan={p} onSelect={() => onSelect(p.id)} />
                    ))}
                </div>

                <p className="mt-10 text-center text-xs font-mono text-[#6b7080] max-w-2xl mx-auto">
                    * Üyeliğiniz Whop tarafından yönetilir. Tüm planlar PrivyAlgo kullanıcı sözleşmesine
                    tabidir. ** TradingView PremiumAlgo Paketi yıllık aboneliğe özel hediyedir.
                </p>
            </div>
        </section>
    );
}

function PlanCard({ plan, onSelect }) {
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
            data-testid={`plan-card-${plan.id}`}
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
                    {plan.price}
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

            <button
                onClick={onSelect}
                data-testid={`plan-cta-${plan.id}`}
                className="cta-shine w-full mt-6 py-3.5 rounded-md text-sm font-semibold tracking-wider transition"
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

            <ul className="mt-6 space-y-3">
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
        </div>
    );
}
