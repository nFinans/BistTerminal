import React, { useState, useEffect } from "react";
import { Maximize2, Bell, LogOut } from "lucide-react";

// Static SVG-based animated dashboard mockup matching the real app's design language.
export default function DashboardMockup() {
    const [tab, setTab] = useState("ana");
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setTick((t) => (t + 1) % 100), 1800);
        return () => clearInterval(id);
    }, []);

    return (
        <div
            className="relative rounded-2xl overflow-hidden float-y"
            style={{
                background: "#0b0e14",
                border: "1px solid #1e2233",
                boxShadow:
                    "0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(38,166,154,0.08)",
            }}
            data-testid="dashboard-mockup"
        >
            {/* Top bar */}
            <div
                className="flex items-center justify-between px-3 py-2 border-b"
                style={{ background: "#131722", borderColor: "#1e2233" }}
            >
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ef5350]/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ffb300]/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#26a69a]/70" />
                    </div>
                    <span className="ml-3 text-[10px] font-mono text-[#a0a4b0]">
                        privyalgo.com/terminal — THYAO
                    </span>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-mono text-[#a0a4b0]">
                    <Bell className="w-3.5 h-3.5 text-[#ffb300]" />
                    <LogOut className="w-3.5 h-3.5 text-[#ef5350]" />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1.5 px-3 py-2 border-b" style={{ borderColor: "#1e2233" }}>
                {[
                    { id: "ana", label: "Ana Göstergeler" },
                    { id: "vol", label: "Volatilite" },
                    { id: "sen", label: "Sentiment" },
                ].map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setTab(t.id)}
                        data-active={tab === t.id}
                        className="tab-pill px-2.5 py-1 text-[10px] font-mono rounded border border-[#2b2b43] text-[#6b7080] hover:text-white"
                    >
                        {t.label}
                    </button>
                ))}
                <div className="ml-auto flex items-center gap-1">
                    {["5m", "15m", "1H", "2H"].map((p, i) => (
                        <span
                            key={p}
                            className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${i === 0 ? "bg-[#26a69a]/20 text-[#26a69a]" : "text-[#6b7080]"}`}
                        >
                            {p}
                        </span>
                    ))}
                </div>
            </div>

            {/* Legend strip */}
            <div className="flex items-center gap-4 px-3 py-2 text-[9px] font-mono border-b" style={{ borderColor: "#1e2233" }}>
                <Legend label="REAL PRICE" value="327.83" color="#26a69a" />
                <Legend label="AVG PRICE" value="328.29" color="#ef5350" />
                <Legend label="MARKET SCORE" value="1.1695" color="#ffb300" />
                <Legend label="MOMENTUM" value="-98.1174" color="#ef5350" />
                <Legend label="ALGO GETİRİ" value="+63.55" color="#ffb300" />
                <Legend label="HİSSE GETİRİ" value="+63.91" color="#26a69a" />
                <Legend label="REEL FARK" value="-0.36" color="#e040fb" />
            </div>

            {/* Chart */}
            <ChartSVG tick={tick} />

            {/* Bottom volume panel */}
            <VolumePanel />

            {/* Floating fullscreen icon */}
            <Maximize2 className="absolute top-12 right-3 w-3.5 h-3.5 text-[#6b7080]" />
        </div>
    );
}

function Legend({ label, value, color }) {
    return (
        <div className="flex flex-col">
            <span className="text-[8px] text-[#6b7080] tracking-widest">{label}</span>
            <span style={{ color }} className="font-mono">
                {value}
            </span>
        </div>
    );
}

function ChartSVG({ tick }) {
    // Pre-generated price path simulating THYAO
    const pricePath =
        "M0 250 L40 248 L80 252 L100 200 L130 198 L160 196 L180 195 L210 190 L240 188 L270 192 L300 186 L330 184 L360 182 L380 178 L410 176 L440 172 L470 174 L500 170 L530 168 L560 172 L580 165 L600 162 L630 160 L660 156 L680 152";
    const avgPath =
        "M0 252 L40 250 L80 251 L100 220 L130 215 L160 210 L180 205 L210 202 L240 200 L270 198 L300 196 L330 194 L360 192 L380 190 L410 188 L440 186 L470 184 L500 183 L530 182 L560 181 L580 180 L600 179 L630 178 L660 178 L680 178";

    return (
        <div className="relative" style={{ height: 230, background: "#0b0e14" }}>
            <svg viewBox="0 0 700 280" className="w-full h-full" preserveAspectRatio="none">
                {/* grid */}
                {[40, 80, 120, 160, 200, 240].map((y) => (
                    <line
                        key={y}
                        x1="0"
                        x2="700"
                        y1={y}
                        y2={y}
                        stroke="#1e2233"
                        strokeWidth="0.5"
                    />
                ))}

                {/* Hedge Wall */}
                <line
                    x1="0"
                    x2="700"
                    y1="195"
                    y2="195"
                    stroke="#ffb300"
                    strokeWidth="1.5"
                    strokeDasharray="2 0"
                />
                <rect x="630" y="187" width="68" height="16" fill="#ffb300" rx="2" />
                <text x="635" y="198" fontSize="9" fontFamily="JetBrains Mono" fill="#0b0e14">
                    HEDGE WALL
                </text>

                {/* MaxSell line */}
                <line x1="0" x2="700" y1="50" y2="50" stroke="#ef5350" strokeWidth="1" strokeDasharray="4 4" />
                <rect x="600" y="42" width="98" height="16" fill="#ef5350" rx="2" />
                <text x="606" y="53" fontSize="9" fontFamily="JetBrains Mono" fill="#0b0e14">
                    MaxSell 1 (584M)
                </text>

                {/* MaxBuy line */}
                <line x1="0" x2="700" y1="240" y2="240" stroke="#26a69a" strokeWidth="1" strokeDasharray="4 4" />
                <rect x="600" y="232" width="98" height="16" fill="#26a69a" rx="2" />
                <text x="606" y="243" fontSize="9" fontFamily="JetBrains Mono" fill="#0b0e14">
                    MaxBuy 1 (1.78B)
                </text>

                {/* Average price line (red) */}
                <path
                    d={avgPath}
                    stroke="#ef5350"
                    strokeWidth="2"
                    fill="none"
                    className="draw-line"
                />
                {/* Real price line (green) */}
                <path
                    d={pricePath}
                    stroke="#26a69a"
                    strokeWidth="2"
                    fill="none"
                    className="draw-line"
                    style={{ animationDelay: "0.5s" }}
                />

                {/* TF AL / TF SAT markers */}
                {[
                    { x: 100, y: 200, kind: "AL" },
                    { x: 240, y: 188, kind: "SAT" },
                    { x: 380, y: 178, kind: "AL" },
                    { x: 530, y: 168, kind: "SAT" },
                ].map((m, i) => (
                    <g key={i}>
                        <circle
                            cx={m.x}
                            cy={m.y}
                            r="4"
                            fill={m.kind === "AL" ? "#26a69a" : "#ef5350"}
                        />
                        <text
                            x={m.x + 6}
                            y={m.kind === "AL" ? m.y + 12 : m.y - 6}
                            fontSize="9"
                            fontFamily="JetBrains Mono"
                            fill={m.kind === "AL" ? "#26a69a" : "#ef5350"}
                        >
                            TF {m.kind}
                        </text>
                    </g>
                ))}

                {/* Live cursor */}
                <line x1="680" x2="680" y1="0" y2="280" stroke="#3a3a5a" strokeDasharray="2 3" />
                <circle cx="680" cy="178" r="4" fill="#26a69a" className="dot-pulse" />
            </svg>

            {/* Right axis labels */}
            <div className="absolute right-1 top-0 h-full flex flex-col justify-between py-1 text-[8px] font-mono text-[#6b7080]">
                <span>342.00</span>
                <span>334.55</span>
                <span style={{ color: "#26a69a" }}>327.83</span>
                <span>315.91</span>
                <span>298.25</span>
            </div>
        </div>
    );
}

function VolumePanel() {
    const bars = Array.from({ length: 60 });
    return (
        <div
            className="relative px-3 py-2"
            style={{ background: "#0b0e14", borderTop: "1px solid #1e2233" }}
        >
            <div className="flex items-center gap-3 text-[9px] font-mono text-[#6b7080] mb-1.5">
                <span>
                    Ort. Vol <span style={{ color: "#ffb300" }}>9.52K</span>
                </span>
                <span>
                    Alım Vol <span style={{ color: "#26a69a" }}>+45.2%</span>
                </span>
                <span>
                    Satım Vol <span style={{ color: "#ef5350" }}>-12.4%</span>
                </span>
            </div>
            <div className="flex items-end gap-0.5 h-12">
                {bars.map((_, i) => {
                    const h = 6 + Math.abs(Math.sin(i * 0.6)) * 38;
                    const isBuy = (i + Math.floor(Date.now() / 1000)) % 3 !== 0;
                    return (
                        <div
                            key={i}
                            style={{
                                height: `${h}px`,
                                width: "1.6%",
                                background: isBuy ? "#26a69a" : "#ef5350",
                                opacity: 0.75,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
