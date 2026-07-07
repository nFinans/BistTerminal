import React, { useEffect, useState } from "react";
import { LogIn, Brain } from "lucide-react";

export default function TopBar({ onLogin, loginUrl }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            data-testid="topbar"
            className={`sticky top-0 z-40 transition-all duration-300 ${
                scrolled
                    ? "backdrop-blur-xl bg-[#0b0e14]/85 border-b border-[#1e2233]"
                    : "bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
                <a
                    href="#top"
                    className="flex items-center gap-2.5 group"
                    data-testid="topbar-brand"
                >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{
                            background:
                                "linear-gradient(135deg, #0f5132 0%, #26a69a 100%)",
                            boxShadow: "0 0 24px rgba(38,166,154,0.35)",
                        }}>
                        <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div className="leading-tight">
                        <div className="font-mono text-[10px] tracking-[0.2em] text-[#26a69a]">
                            PRIVY • BIST
                        </div>
                        <div className="text-sm font-semibold text-white">
                            Neural Algo <span className="text-[#26a69a]">v2.0</span>
                        </div>
                    </div>
                </a>

                <nav className="hidden md:flex items-center gap-7 text-sm text-[#a0a4b0]">
                    <a href="#features" className="hover:text-white transition" data-testid="nav-features">
                        Özellikler
                    </a>
                    <a href="#kings" className="hover:text-white transition" data-testid="nav-kings">
                        Algoritmanın Kralları
                    </a>
                    <a href="#sentiment" className="hover:text-white transition" data-testid="nav-sentiment">
                        Sentiment
                    </a>
                    <a href="#pricing" className="hover:text-white transition" data-testid="nav-pricing">
                        Paket Satın Al
                    </a>
                    <a href="https://blog.privyalgo.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition" data-testid="nav-blog">
                        Blog
                    </a>
                </nav>

                <a
                    href={loginUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="topbar-login-btn"
                    className="cta-shine inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider rounded-md text-white border border-[#26a69a] hover:bg-[#26a69a]/15 transition"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                    <LogIn className="w-4 h-4" />
                    SİSTEME GİRİŞ YAP
                </a>
            </div>
        </header>
    );
}
