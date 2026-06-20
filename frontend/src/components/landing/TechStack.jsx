import React from "react";
import { Cpu, Database, LineChart, Zap } from "lucide-react";

const STACK = [
    {
        icon: Cpu,
        title: "Python + Flask Mimari",
        body: "Gelişmiş kuantitatif hesaplama katmanı; Pandas + NumPy ile saniyelik veri işleme.",
        color: "#26a69a",
    },
    {
        icon: Database,
        title: "Düşük Gecikmeli Veri",
        body: "MS SQL üzerinde optimize edilmiş periyotlu sorgular, 5dk–2H arası tam veri seti.",
        color: "#ffb300",
    },
    {
        icon: LineChart,
        title: "Lightweight Charts",
        body: "TradingView’in açık kaynak grafik motoruyla profesyonel kalitede görsel deneyim.",
        color: "#e040fb",
    },
    {
        icon: Zap,
        title: "Anlık TF AL/SAT Bildirimleri",
        body: "Tarayıcı push bildirimleriyle algoritma yeni sinyal ürettiği an haberdar olun.",
        color: "#5eead4",
    },
];

export default function TechStack() {
    return (
        <section className="relative max-w-7xl mx-auto px-5 sm:px-8 py-24" data-testid="tech-section">
            <div className="text-center max-w-3xl mx-auto">
                <span className="text-xs font-mono tracking-[0.3em] uppercase mb-3 text-[#26a69a]">
                    /// Altyapı
                </span>
                <h2 className="mt-3 text-3xl sm:text-4xl font-bold leading-tight">
                    Kurumsal sınıf <span className="text-[#26a69a]">teknoloji</span>,
                    bireysel trader’a açıldı.
                </h2>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {STACK.map((s, i) => {
                    const Icon = s.icon;
                    return (
                        <div
                            key={i}
                            className="cell p-5 transition-transform hover:translate-y-[-2px]"
                            data-testid={`tech-card-${s.title}`}
                        >
                            <div
                                className="w-10 h-10 rounded-md flex items-center justify-center mb-4"
                                style={{
                                    background: `${s.color}18`,
                                    border: `1px solid ${s.color}55`,
                                }}
                            >
                                <Icon className="w-4 h-4" style={{ color: s.color }} />
                            </div>
                            <h3 className="text-sm font-semibold text-white">{s.title}</h3>
                            <p className="mt-2 text-xs text-[#a0a4b0] leading-relaxed">{s.body}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
