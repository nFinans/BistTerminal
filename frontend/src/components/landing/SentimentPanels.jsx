import React from "react";
import { Rocket, Droplet } from "lucide-react";

const BUYERS = [
    { sym: "DOAS", chg: 0.85, score: 99.28 },
    { sym: "BSOKE", chg: 2.79, score: 98.34 },
    { sym: "SKBNK", chg: 0.77, score: 97.99 },
    { sym: "GESAN", chg: 8.47, score: 95.76 },
    { sym: "MAVI", chg: -0.38, score: 95.69 },
    { sym: "ARCLK", chg: 0.57, score: 92.94 },
    { sym: "EUPWR", chg: 4.58, score: 92.71 },
    { sym: "CCOLA", chg: -0.06, score: 90.47 },
    { sym: "DAPGM", chg: -1.11, score: 89.02 },
    { sym: "ENERY", chg: 2.22, score: 88.84 },
];

const SELLERS = [
    { sym: "TOASO", chg: -1.30, score: -98.79 },
    { sym: "BRYAT", chg: -1.21, score: -98.48 },
    { sym: "SISE-2", chg: -2.42, score: -97.85 },
    { sym: "SISE", chg: -2.42, score: -97.58 },
    { sym: "AEFES", chg: -1.99, score: -97.55 },
    { sym: "PATEK", chg: -1.64, score: -97.40 },
    { sym: "SOKM", chg: -1.81, score: -96.65 },
    { sym: "TSPOR", chg: 2.08, score: -96.37 },
    { sym: "ASTOR", chg: -2.13, score: -95.50 },
    { sym: "ALTNY", chg: -0.75, score: -95.10 },
];

export default function SentimentPanels() {
    return (
        <section
            id="sentiment"
            className="relative max-w-7xl mx-auto px-5 sm:px-8 py-24"
            data-testid="sentiment-section"
        >
            <div className="max-w-3xl">
                <span className="text-xs font-mono tracking-[0.3em] uppercase mb-3 text-[#26a69a]">
                    /// SentimentScore
                </span>
                <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                    Akıllı paranın yönü,
                    <br />
                    <span className="text-[#a0a4b0]">tek bakışta.</span>
                </h2>
                <p className="mt-5 text-[#a0a4b0] max-w-2xl">
                    Buy Power = BuyerScore × √TotalBuyer · Sell Power = SellerScore × √TotalSeller.
                    Bu iki güç birbirine oranlanır ve <span className="text-white">−100 ile +100</span> arası
                    standartlaştırılmış skor üretilir. Sonuç: bugünün en güçlü alıcıları ve satıcıları.
                </p>
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-5">
                <Panel
                    title="GÜÇLÜ ALICILAR"
                    icon={Rocket}
                    accent="#26a69a"
                    rows={BUYERS}
                    direction="up"
                />
                <Panel
                    title="GÜÇLÜ SATICILAR"
                    icon={Droplet}
                    accent="#ef5350"
                    rows={SELLERS}
                    direction="down"
                />
            </div>
        </section>
    );
}

function Panel({ title, icon: Icon, accent, rows, direction }) {
    return (
        <div
            className="rounded-2xl overflow-hidden"
            style={{
                background: "#0b0e14",
                border: "1px solid #1e2233",
            }}
            data-testid={`panel-${title}`}
        >
            <div
                className="flex items-center justify-between px-5 py-4 border-b"
                style={{ borderColor: "#1e2233" }}
            >
                <h3
                    className="font-semibold tracking-wide flex items-center gap-2"
                    style={{ color: accent }}
                >
                    <Icon className="w-4 h-4" />
                    {title}
                </h3>
                <span className="text-[10px] font-mono text-[#6b7080]">
                    SKOR · BIST
                </span>
            </div>

            <div className="grid grid-cols-12 px-5 py-3 text-[10px] font-mono uppercase tracking-wider text-[#6b7080] border-b" style={{ borderColor: "#1e2233" }}>
                <span className="col-span-3">Sembol</span>
                <span className="col-span-3">Değişim</span>
                <span className="col-span-6 text-right">Skor</span>
            </div>

            <div>
                {rows.map((r) => {
                    const pct = Math.min(100, Math.abs(r.score));
                    const chgColor = r.chg >= 0 ? "#26a69a" : "#ef5350";
                    return (
                        <div
                            key={r.sym}
                            className="grid grid-cols-12 items-center px-5 py-2.5 hover:bg-[#131722] transition"
                            data-testid={`sentiment-row-${r.sym}`}
                        >
                            <span className="col-span-3 font-semibold text-white text-sm">
                                {r.sym}
                            </span>
                            <span
                                className="col-span-3 font-mono text-sm"
                                style={{ color: chgColor }}
                            >
                                {r.chg > 0 ? "+" : ""}
                                {r.chg.toFixed(2)}%
                            </span>
                            <div className="col-span-6 flex items-center gap-3 justify-end">
                                <span className="font-mono text-sm" style={{ color: accent }}>
                                    {r.score > 0 ? "+" : ""}
                                    {r.score.toFixed(2)}
                                </span>
                                <div
                                    className="h-1.5 w-28 rounded-full overflow-hidden"
                                    style={{ background: "#1e2233" }}
                                >
                                    <div
                                        className={direction === "up" ? "score-fill-g h-full" : "score-fill-r h-full"}
                                        style={{ width: `${pct}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
