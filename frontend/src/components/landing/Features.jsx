import React from "react";
import { Activity, BarChart3, Crosshair, Layers } from "lucide-react";

const FEATURES = [
    {
        id: "sentiment",
        icon: Activity,
        title: "Gelişmiş Sentiment Analizi",
        accent: "#26a69a",
        body: "Gerçek zamanlı alıcı vs. satıcı gücü, likidite oranı ve Buy/Sell Power formülasyonu ile piyasanın duygusunu tek bakışta okuyun. SentimentScore −100 ile +100 arasında kuantitatif bir sinyal üretir.",
        chips: ["BuyerScore", "SellerScore", "SentimentScore"],
    },
    {
        id: "vol",
        icon: BarChart3,
        title: "Volatilite Takibi",
        accent: "#ffb300",
        body: "5dk ortalama volatilite, alış lot toplam volatilitesi ve satış lot toplam volatilitesi ayrı serilerde grafik üzerine dinamik olarak işlenir. Hacim spike’larını sinyalden önce yakalayın.",
        chips: ["Ort. Vol.", "Alım Vol.", "Satım Vol."],
    },
    {
        id: "signals",
        icon: Crosshair,
        title: "Algoritmik Sinyaller",
        accent: "#5eead4",
        body: "Momentum, Market Score, AOF (Algoritmik Ortalama Fiyat) ve Reel Fiyat kombinasyonuyla üretilen TF AL / TF SAT sinyalleri grafik üzerinde işaretlenir. Tarayıcı bildirimleriyle anlık tetiklenir.",
        chips: ["TF AL", "TF SAT", "Momentum", "AOF"],
    },
    {
        id: "wall",
        icon: Layers,
        title: "Dinamik Destek & Direnç (Hedge Wall)",
        accent: "#e040fb",
        body: "Algoritma; geçmiş 14 günün hacim-ağırlıklı yığılma seviyelerinden Hedge Wall hattını ve maksimum alım/satım likidite kümelerini (MaxBuy / MaxSell) otomatik üretir.",
        chips: ["HEDGE WALL (14D)", "MaxBuy 1·2·3", "MaxSell 1·2"],
    },
];

export default function Features() {
    return (
        <section
            id="features"
            className="relative max-w-7xl mx-auto px-5 sm:px-8 py-24"
            data-testid="features-section"
        >
            <div className="flex flex-col items-start max-w-3xl">
                <span
                    className="text-xs font-mono tracking-[0.3em] uppercase mb-3"
                    style={{ color: "#26a69a" }}
                >
                    /// Çekirdek Yetenekler
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                    Standart göstergeleri unutun.
                    <br />
                    <span className="text-[#a0a4b0]">
                        Kuantitatif sinyalleri seçin.
                    </span>
                </h2>
                <p className="mt-5 text-[#a0a4b0] text-base max-w-2xl">
                    Privy Neural Algo, BIST verisini saniyelik olarak işler;
                    momentum, sentiment, akıllı para ve volatiliteyi tek terminale taşır.
                </p>
            </div>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
                {FEATURES.map((f) => (
                    <FeatureCard key={f.id} {...f} />
                ))}
            </div>
        </section>
    );
}

function FeatureCard({ icon: Icon, title, body, chips, accent }) {
    return (
        <div
            className="cell p-7 group hover:translate-y-[-2px] transition-transform"
            style={{ borderColor: "rgba(43,43,67,0.6)" }}
            data-testid={`feature-card-${title}`}
        >
            <div className="flex items-start gap-4">
                <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                        background: `${accent}18`,
                        border: `1px solid ${accent}55`,
                    }}
                >
                    <Icon style={{ color: accent }} className="w-5 h-5" />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                    <p className="mt-2 text-sm text-[#a0a4b0] leading-relaxed">{body}</p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                        {chips.map((c) => (
                            <span
                                key={c}
                                className="text-[10px] font-mono px-2 py-1 rounded border"
                                style={{
                                    borderColor: `${accent}55`,
                                    color: accent,
                                    background: `${accent}10`,
                                }}
                            >
                                {c}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
