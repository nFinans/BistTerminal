import React from "react";
import { Crown, TrendingUp } from "lucide-react";

// Data taken from the actual app screenshots
const KINGS = [
    { sym: "EUPWR", algo: 97.37, stock: 103.78, net: -6.41 },
    { sym: "GESAN", algo: 75.71, stock: 53.83, net: 21.87 },
    { sym: "ASTOR", algo: 72.33, stock: 42.19, net: 30.15 },
    { sym: "EREGL", algo: 44.60, stock: 33.96, net: 10.64 },
    { sym: "ENERY", algo: 31.76, stock: 9.57, net: 22.19 },
    { sym: "SKBNK", algo: 30.86, stock: 27.12, net: 3.74 },
    { sym: "CCOLA", algo: 25.18, stock: 9.48, net: 15.70 },
    { sym: "AKBNK", algo: 24.20, stock: 7.53, net: 16.67 },
    { sym: "YKBNK", algo: 19.66, stock: 15.98, net: 3.68 },
    { sym: "TOASO", algo: 16.77, stock: 18.28, net: -1.52 },
];

const fmt = (v) => `${v > 0 ? "+" : ""}%${v.toFixed(2)}`;
const colorFor = (v, neg = "#ef5350", pos = "#26a69a") => (v >= 0 ? pos : neg);

export default function Kings() {
    return (
        <section
            id="kings"
            className="relative py-24 overflow-hidden"
            style={{
                background:
                    "radial-gradient(ellipse at top, rgba(255,179,0,0.06), transparent 60%), #0a0d12",
            }}
            data-testid="kings-section"
        >
            <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-5">
                    <span
                        className="text-xs font-mono tracking-[0.3em] uppercase mb-3 inline-flex items-center gap-2"
                        style={{ color: "#ffb300" }}
                    >
                        <Crown className="w-4 h-4" />
                        /// Algoritmanın Kralları
                    </span>
                    <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                        Algoritma <span style={{ color: "#ffb300" }}>parayı</span>{" "}
                        nerede{" "}
                        <span style={{ color: "#26a69a" }}>üretiyor?</span>
                    </h2>
                    <p className="mt-5 text-[#a0a4b0] leading-relaxed">
                        Son 10 günde algoritmanın ürettiği <strong className="text-white">Algo Getiri</strong>’yi,
                        hissenin kendi <strong className="text-white">Buy &amp; Hold</strong> performansıyla
                        karşılaştırırız. <span style={{ color: "#e040fb" }}>Reel Fark</span> kolonu,
                        algoritmanın bir hissede yarattığı net alfayı gösterir.
                    </p>

                    <div className="mt-8 grid grid-cols-3 gap-3">
                        <KingsStat label="Toplam Sembol" value="10" color="#ffb300" />
                        <KingsStat label="Ort. Algo" value="+43.84%" color="#26a69a" />
                        <KingsStat label="Ort. Reel Fark" value="+11.66%" color="#e040fb" />
                    </div>
                </div>

                <div
                    className="lg:col-span-7 rounded-2xl overflow-hidden"
                    style={{
                        background: "#0b0e14",
                        border: "1px solid #1e2233",
                    }}
                >
                    <div
                        className="flex items-center justify-between px-5 py-4 border-b"
                        style={{
                            borderColor: "#1e2233",
                            background:
                                "linear-gradient(90deg, rgba(255,179,0,0.06), transparent)",
                        }}
                    >
                        <h3
                            className="font-semibold tracking-wide flex items-center gap-2"
                            style={{ color: "#ffb300" }}
                        >
                            <Crown className="w-4 h-4" />
                            ALGORİTMANIN KRALLARI{" "}
                            <span className="text-[#a0a4b0] text-xs font-mono">
                                (Son 10 Gün)
                            </span>
                        </h3>
                        <span className="text-[10px] font-mono text-[#26a69a] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#26a69a] dot-pulse" />
                            CANLI
                        </span>
                    </div>

                    <div className="grid grid-cols-12 px-5 py-3 text-[10px] font-mono uppercase tracking-wider text-[#6b7080] border-b" style={{ borderColor: "#1e2233" }}>
                        <span className="col-span-3">Sembol</span>
                        <span className="col-span-3 text-right">Algo</span>
                        <span className="col-span-3 text-right">Hisse</span>
                        <span className="col-span-3 text-right">Reel</span>
                    </div>

                    <div className="divide-y" style={{ borderColor: "rgba(43,43,67,0.4)" }}>
                        {KINGS.map((k, i) => (
                            <div
                                key={k.sym}
                                className="grid grid-cols-12 items-center px-5 py-2.5 hover:bg-[#131722] transition"
                                style={{ borderColor: "rgba(43,43,67,0.4)" }}
                                data-testid={`king-row-${k.sym}`}
                            >
                                <span className="col-span-3 font-semibold text-white text-sm">{k.sym}</span>
                                <span
                                    className="col-span-3 text-right font-mono text-sm"
                                    style={{ color: colorFor(k.algo) }}
                                >
                                    {fmt(k.algo)}
                                </span>
                                <span
                                    className="col-span-3 text-right font-mono text-sm"
                                    style={{ color: colorFor(k.stock) }}
                                >
                                    {fmt(k.stock)}
                                </span>
                                <span
                                    className="col-span-3 text-right font-mono text-sm font-semibold"
                                    style={{ color: colorFor(k.net, "#ef5350", "#e040fb") }}
                                >
                                    {fmt(k.net)}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="px-5 py-3 border-t flex items-center gap-3 text-[10px] font-mono text-[#6b7080]" style={{ borderColor: "#1e2233" }}>
                        <TrendingUp className="w-3.5 h-3.5 text-[#26a69a]" />
                        Algo = algoritmik strateji • Hisse = buy &amp; hold • Reel = net fark
                    </div>
                </div>
            </div>
        </section>
    );
}

function KingsStat({ label, value, color }) {
    return (
        <div className="cell p-3">
            <div
                className="text-xl font-bold font-mono"
                style={{ color }}
            >
                {value}
            </div>
            <div className="text-[10px] text-[#6b7080] mt-0.5 uppercase tracking-wider">
                {label}
            </div>
        </div>
    );
}
