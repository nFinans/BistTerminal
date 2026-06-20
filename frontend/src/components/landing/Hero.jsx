import React from "react";
import { ArrowRight, Sparkles, Activity, ShieldCheck } from "lucide-react";
import DashboardMockup from "@/components/landing/DashboardMockup";
import SignalTicker from "@/components/landing/SignalTicker";

export default function Hero({ onLogin, onSubscribe }) {
    return (
        <section
            id="top"
            className="relative overflow-hidden bg-grid bg-radial-teal pt-12 sm:pt-20 pb-10"
            data-testid="hero-section"
        >
            {/* ambient glow */}
            <div
                className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full"
                style={{
                    background:
                        "radial-gradient(ellipse, rgba(38,166,154,0.18), transparent 60%)",
                    filter: "blur(60px)",
                }}
            />

            <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* LEFT */}
                <div className="lg:col-span-6">
                    <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6 border"
                        style={{
                            background: "rgba(38,166,154,0.08)",
                            borderColor: "rgba(38,166,154,0.35)",
                            color: "#5eead4",
                            fontFamily: "JetBrains Mono, monospace",
                            letterSpacing: "0.06em",
                        }}
                        data-testid="hero-badge"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#26a69a] dot-pulse" />
                        BIST CANLI VERİ AKIŞI · 5dk / 15dk / 1H / 2H
                    </div>

                    <h1
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight"
                        style={{ fontFamily: "Outfit, sans-serif" }}
                        data-testid="hero-headline"
                    >
                        Borsa İstanbul’u
                        <br />
                        <span style={{ color: "#26a69a" }}>
                            algoritmayla
                        </span>{" "}
                        oku.
                        <br />
                        <span className="text-white/90">Veriyle</span>{" "}
                        <span className="font-mono text-[#ffb300]">kazan.</span>
                    </h1>

                    <p
                        className="mt-6 text-lg text-[#a0a4b0] max-w-xl leading-relaxed"
                        data-testid="hero-subheadline"
                    >
                        Privy Neural Algo v2.0, <strong className="text-white">BIST hisseleri</strong> için
                        nöral / kuantitatif modellerle <span className="text-[#26a69a]">momentum</span>,
                        <span className="text-[#26a69a]"> sentiment</span> ve
                        <span className="text-[#ffb300]"> akıllı para akışını</span>{" "}
                        gerçek zamanlı izler. <span className="text-white">TF AL / TF SAT</span> sinyalleri,
                        <span className="text-white"> Hedge Wall</span> ve
                        <span className="text-white"> MaxBuy / MaxSell</span> kümeleriyle profesyonel kararlar verin.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <button
                            onClick={onLogin}
                            data-testid="hero-login-btn"
                            className="cta-shine glow-teal inline-flex items-center gap-2 px-6 py-3.5 rounded-md text-sm font-semibold tracking-wider text-white"
                            style={{
                                background:
                                    "linear-gradient(135deg, #0f5132 0%, #26a69a 100%)",
                                fontFamily: "JetBrains Mono, monospace",
                            }}
                        >
                            SİSTEME GİRİŞ YAP
                            <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                            onClick={onSubscribe}
                            data-testid="hero-subscribe-btn"
                            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md text-sm font-semibold tracking-wider text-[#e6e8ee] border border-[#2b2b43] hover:border-[#26a69a] hover:text-white transition"
                            style={{ fontFamily: "JetBrains Mono, monospace" }}
                        >
                            <Sparkles className="w-4 h-4 text-[#ffb300]" />
                            HEMEN KATIL
                        </button>
                    </div>

                    {/* Trust strip */}
                    <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
                        <Stat label="Aktif Sembol" value="500+" accent="#26a69a" />
                        <Stat label="Sinyal Doğruluğu" value="68%" accent="#ffb300" tag="Backtest" />
                        <Stat label="Veri Periyodu" value="5dk" accent="#e040fb" mono />
                    </div>
                </div>

                {/* RIGHT — Dashboard mockup */}
                <div className="lg:col-span-6 relative">
                    <DashboardMockup />
                </div>
            </div>

            <SignalTicker />
        </section>
    );
}

function Stat({ label, value, accent, mono = false, tag }) {
    return (
        <div className="cell p-3" data-testid={`hero-stat-${label}`}>
            <div className="flex items-baseline gap-2">
                <div
                    className={`text-2xl font-bold ${mono ? "font-mono" : ""}`}
                    style={{ color: accent }}
                >
                    {value}
                </div>
                {tag && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#1e2233] text-[#6b7080] uppercase">
                        {tag}
                    </span>
                )}
            </div>
            <div className="text-[11px] text-[#6b7080] mt-1 uppercase tracking-wider">
                {label}
            </div>
        </div>
    );
}
