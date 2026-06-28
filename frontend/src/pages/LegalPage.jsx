import React, { useEffect } from "react";
import { ArrowLeft, Brain, ShieldCheck } from "lucide-react";
import { COMPANY, LEGAL_PAGES } from "@/data/legal";

export default function LegalPage({ slug, onBack }) {
    const doc = LEGAL_PAGES[slug];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [slug]);

    if (!doc) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                <p>Belge bulunamadı.</p>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen text-white"
            style={{ background: "var(--bg-0)" }}
            data-testid={`legal-page-${slug}`}
        >
            {/* Top bar */}
            <header
                className="sticky top-0 z-30 border-b backdrop-blur-xl"
                style={{
                    background: "rgba(11,14,20,0.85)",
                    borderColor: "#1e2233",
                }}
            >
                <div className="max-w-4xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
                    <a
                        href="#/"
                        onClick={(e) => {
                            e.preventDefault();
                            if (onBack) onBack();
                        }}
                        className="flex items-center gap-2.5 group"
                        data-testid="legal-brand"
                    >
                        <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center"
                            style={{
                                background:
                                    "linear-gradient(135deg, #0f5132 0%, #26a69a 100%)",
                                boxShadow: "0 0 24px rgba(38,166,154,0.25)",
                            }}
                        >
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

                    <a
                        href="#/"
                        onClick={(e) => {
                            e.preventDefault();
                            if (onBack) onBack();
                        }}
                        data-testid="legal-back-btn"
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-md border border-[#2b2b43] text-[#a0a4b0] hover:text-white hover:border-[#26a69a] transition"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        ANA SAYFA
                    </a>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-5 sm:px-8 py-14">
                <div className="mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-widest border mb-4"
                        style={{
                            background: "rgba(38,166,154,0.08)",
                            borderColor: "rgba(38,166,154,0.35)",
                            color: "#5eead4",
                        }}>
                        <ShieldCheck className="w-3 h-3" />
                        YASAL METİN
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                        {doc.title}
                    </h1>
                    <p className="mt-3 text-[#a0a4b0] text-sm">{doc.subtitle}</p>
                </div>

                <article className="space-y-10">
                    {doc.sections.map((sec, i) => (
                        <section key={i}>
                            <h2 className="text-lg sm:text-xl font-semibold text-[#26a69a] mb-3">
                                {sec.heading}
                            </h2>
                            <div className="space-y-3">
                                {sec.paragraphs?.map((p, j) => (
                                    <p
                                        key={j}
                                        className="text-[14px] leading-relaxed text-[#d1d4dc]"
                                    >
                                        {p}
                                    </p>
                                ))}
                                {sec.list && (
                                    <ul className="list-disc pl-6 space-y-1.5 text-[14px] text-[#d1d4dc] leading-relaxed">
                                        {sec.list.map((item, k) => (
                                            <li key={k}>{item}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </section>
                    ))}
                </article>

                {/* Veri Sorumlusu bloğu */}
                <section
                    className="mt-14 rounded-xl p-6"
                    style={{
                        background: "#0f1320",
                        border: "1px solid #1e2233",
                    }}
                >
                    <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-widest font-mono">
                        Veri Sorumlusu
                    </h3>
                    <div className="space-y-1 text-[13px] text-[#a0a4b0] font-mono">
                        <div>{COMPANY.name}</div>
                        <div>Vergi Dairesi ve VKN: {COMPANY.vatOffice} – {COMPANY.vatNo}</div>
                        <div>MERSİS No: {COMPANY.mersis}</div>
                        <div>Adres: {COMPANY.address}</div>
                        <div>
                            Whatsapp:{" "}
                            <a
                                href={COMPANY.whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#26a69a] hover:underline"
                            >
                                {COMPANY.whatsapp}
                            </a>
                        </div>
                        <div>
                            E-posta:{" "}
                            <a
                                href={`mailto:${COMPANY.email}`}
                                className="text-[#26a69a] hover:underline"
                            >
                                {COMPANY.email}
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <footer
                className="border-t py-6 px-5 sm:px-8 text-[11px] font-mono text-[#6b7080] text-center"
                style={{ borderColor: "#1e2233" }}
            >
                © {new Date().getFullYear()} {COMPANY.name}
            </footer>
        </div>
    );
}
