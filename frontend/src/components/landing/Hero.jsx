import React from "react";
import { ArrowRight, Sparkles, Activity, ShieldCheck } from "lucide-react";
import DashboardMockup from "@/components/landing/DashboardMockup";
import SignalTicker from "@/components/landing/SignalTicker";

export default function Hero({ onLogin, loginUrl, onSubscribe }) {
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
                            Emir Bazlı Veri Analitikleri 
                        </span>{" "}
                        oku.
                        <br />
                        <span className="text-white/90">Algoritmalarla Analiz ederek</span>{" "}
                        <span className="font-mono text-[#ffb300]">kazan.</span>
                    </h1>

                    <p
                        className="mt-6 text-lg text-[#a0a4b0] max-w-xl leading-relaxed"
                        data-testid="hero-subheadline"
                    >
                        Privy Neural Algo v2.0, <strong className="text-white">BIST hisseleri için</strong> için
                        nöral / kuantitatif modellerle <span className="text-[#26a69a]">Momentum</span>,
                        <span className="text-[#26a69a]"> Sentiment</span> ve
                        <span className="text-[#ffb300]"> akıllı para akışını(likidite akışını)</span>{" "}
                        gerçek zamanlı olarak anlık izler. <span className="text-white">Algoritmik sinyalleri</span> <span className="text-[#26a69a]">Anlık olarak Emir akışlarına ve Ağırlıklandırılmış Ortalama Fiyatlara göre o an ki yoğun işlem bölgelerinin analizini yaparak,</span>
                        <span className="text-[#ffb300]"> Hedge Wall</span> ve
                        <span className="text-[#ffb300]"> MaxBuy / MaxSell</span> gibi <strong className="text-white">Destek-Direnç Bölgelerini</strong> sizin için grafikler üzerinde görselleştirerek anlık verileri okumanızı kolaylaştırır ve yatırımlarınızı yaparken bilinçli kararlaralmanızı sağlar.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <a
                            href={loginUrl}
                            target="_blank"
                            rel="noopener noreferrer"
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
                        </a>
                        <button
                            onClick={onSubscribe}
                            data-testid="hero-subscribe-btn"
                            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md text-sm font-semibold tracking-wider text-[#e6e8ee] border border-[#2b2b43] hover:border-[#26a69a] hover:text-white transition"
                            style={{ fontFamily: "JetBrains Mono, monospace" }}
                        >
                            <Sparkles className="w-4 h-4 text-[#ffb300]" />
                            PAKET SATIN AL
                        </button>
                    </div>

                    {/* Trust strip */}
                    <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
                        <Stat label="Kapsama" value="BIST100" accent="#26a69a" />
                        <Stat label="Sinyal Doğruluğu" value="68-75 arasında%" accent="#ffb300" tag="Backtest" />
                        <Stat label="Veri Periyodu" value="5-15-60-120 dk.lık" accent="#e040fb" mono />
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
