import React from "react";
import { Brain, MessageCircle, Globe } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/905415478141";
const WHATSAPP_LABEL = "+90 541 547 81 41";

const LEGAL = [
    { slug: "uyelik-sozlesmesi", label: "Üyelik Sözleşmesi" },
    { slug: "kvkk", label: "KVKK Aydınlanma Metni" },
    { slug: "gizlilik-politikasi", label: "Gizlilik Politikamız" },
];

export default function FooterSection() {
    return (
        <footer
            className="border-t"
            style={{ borderColor: "#1e2233", background: "#08090d" }}
            data-testid="footer"
        >
            <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-2">
                    <div className="flex items-center gap-2.5">
                        <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center"
                            style={{
                                background:
                                    "linear-gradient(135deg, #0f5132 0%, #26a69a 100%)",
                            }}
                        >
                            <Brain className="w-5 h-5 text-white" />
                        </div>
                        <div className="leading-tight">
                            <div className="font-mono text-[10px] tracking-[0.2em] text-[#26a69a]">
                                PRIVY • BIST
                            </div>
                            <div className="text-sm font-semibold text-white">
                                Neural Algo v2.0
                            </div>
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-[#a0a4b0] max-w-md leading-relaxed">
                        Privy Neural Algo, Borsa İstanbul hisseleri için
                        kuantitatif sinyaller üretir. Yatırım tavsiyesi değildir;
                        bağımsız karar süreçlerinizde yardımcı bir araçtır.
                    </p>
                </div>

                <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-[#6b7080] mb-3">
                        Ürün
                    </div>
                    <ul className="space-y-2 text-sm text-[#a0a4b0]">
                        <li><a href="#features" className="hover:text-white">Özellikler</a></li>
                        <li><a href="#kings" className="hover:text-white">Algoritmanın Kralları</a></li>
                        <li><a href="#sentiment" className="hover:text-white">Sentiment Skor</a></li>
                        <li><a href="#pricing" className="hover:text-white">Paket Satın Al</a></li>
                    </ul>
                </div>

                <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-[#6b7080] mb-3">
                        Destek
                    </div>
                    <ul className="space-y-2 text-sm text-[#a0a4b0]">
                        <li>
                            <a
                                href={WHATSAPP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 hover:text-white"
                                data-testid="footer-whatsapp"
                            >
                                <MessageCircle className="w-3.5 h-3.5 text-[#26a69a]" />
                                WhatsApp · {WHATSAPP_LABEL}
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://bist.privyalgo.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 hover:text-white"
                            >
                                <Globe className="w-3.5 h-3.5" />
                                bist.privyalgo.com
                            </a>
                        </li>
                        <li className="pt-3 mt-2 border-t border-[#1e2233]">
                            <div className="text-[10px] font-mono uppercase tracking-widest text-[#6b7080] mb-2">
                                Yasal
                            </div>
                            <div className="space-y-1.5">
                                {LEGAL.map((l) => (
                                    <a
                                        key={l.slug}
                                        href={`#/${l.slug}`}
                                        className="block hover:text-white text-[13px]"
                                        data-testid={`footer-legal-${l.slug}`}
                                    >
                                        {l.label}
                                    </a>
                                ))}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div
                className="border-t py-5 px-5 sm:px-8 text-[11px] font-mono text-[#6b7080] flex flex-col sm:flex-row items-center justify-between gap-2"
                style={{ borderColor: "#1e2233" }}
            >
                <div>© {new Date().getFullYear()} NFİNANS — PrivyAlgo. Tüm hakları saklıdır.</div>
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#26a69a] dot-pulse" />
                    BIST · Live · v2.0
                </div>
            </div>
        </footer>
    );
}
