import React from "react";

const TICKERS = [
    { sym: "THYAO", chg: "+2.45%", sig: "TF AL", price: "327.83", color: "#26a69a" },
    { sym: "EUPWR", chg: "+4.58%", sig: "TF AL", price: "92.71", color: "#26a69a" },
    { sym: "TOASO", chg: "-1.30%", sig: "TF SAT", price: "215.40", color: "#ef5350" },
    { sym: "GESAN", chg: "+8.47%", sig: "TF AL", price: "95.76", color: "#26a69a" },
    { sym: "BRYAT", chg: "-1.21%", sig: "TF SAT", price: "98.48", color: "#ef5350" },
    { sym: "ASTOR", chg: "+1.12%", sig: "TF AL", price: "72.33", color: "#26a69a" },
    { sym: "SISE", chg: "-2.42%", sig: "TF SAT", price: "97.58", color: "#ef5350" },
    { sym: "SKBNK", chg: "+0.77%", sig: "TF AL", price: "97.99", color: "#26a69a" },
    { sym: "AKBNK", chg: "+0.55%", sig: "TF AL", price: "24.20", color: "#26a69a" },
    { sym: "ENERY", chg: "+2.22%", sig: "TF AL", price: "88.84", color: "#26a69a" },
];

export default function SignalTicker() {
    const list = [...TICKERS, ...TICKERS];
    return (
        <div
            className="relative mt-12 border-y overflow-hidden"
            style={{ borderColor: "#1e2233", background: "#0c1018" }}
            data-testid="signal-ticker"
        >
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to right, #0c1018, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to left, #0c1018, transparent)" }} />

            <div className="flex items-center gap-10 py-3 scroll-x whitespace-nowrap" style={{ width: "200%" }}>
                <div className="flex items-center gap-2 px-5 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#26a69a] dot-pulse" />
                    <span className="text-[10px] font-mono tracking-widest text-[#26a69a]">CANLI · BIST</span>
                </div>
                {list.map((t, i) => (
                    <div key={i} className="flex items-center gap-3 shrink-0">
                        <span className="text-sm font-semibold text-white">{t.sym}</span>
                        <span className="font-mono text-xs text-[#a0a4b0]">{t.price}</span>
                        <span className="font-mono text-xs" style={{ color: t.color }}>
                            {t.chg}
                        </span>
                        <span
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded border"
                            style={{ borderColor: t.color, color: t.color }}
                        >
                            {t.sig}
                        </span>
                        <span className="text-[#2b2b43]">•</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
