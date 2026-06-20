import React, { useEffect, useRef } from "react";
import { X, ExternalLink, ShieldCheck } from "lucide-react";

const WHOP_LOADER_SRC = "https://js.whop.com/static/checkout/loader.js";

function ensureWhopLoader() {
    if (document.querySelector(`script[src="${WHOP_LOADER_SRC}"]`)) return;
    const s = document.createElement("script");
    s.src = WHOP_LOADER_SRC;
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
}

export default function WhopModal({ plan, onClose }) {
    const mountRef = useRef(null);

    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onClose();
        if (plan) {
            document.addEventListener("keydown", onKey);
            document.body.style.overflow = "hidden";
            ensureWhopLoader();
        }
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [plan, onClose]);

    if (!plan) return null;

    return (
        <div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
            onClick={onClose}
            data-testid="whop-modal"
        >
            <div
                className="relative w-full max-w-3xl h-[90vh] rounded-2xl overflow-hidden flex flex-col"
                style={{
                    background: "#0b0e14",
                    border: "1px solid #2b2b43",
                    boxShadow: "0 30px 100px rgba(0,0,0,0.7)",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="flex items-center justify-between px-5 py-4 border-b shrink-0"
                    style={{
                        borderColor: "#1e2233",
                        background: "linear-gradient(90deg, rgba(38,166,154,0.08), transparent)",
                    }}
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center"
                            style={{
                                background:
                                    "linear-gradient(135deg, #0f5132 0%, #26a69a 100%)",
                            }}
                        >
                            <ShieldCheck className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-white">
                                {plan.title}
                            </div>
                            <div className="text-[11px] font-mono text-[#a0a4b0]">
                                Güvenli Ödeme · Whop Checkout · {plan.price}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <a
                            href={plan.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1.5 rounded border border-[#2b2b43] text-[#a0a4b0] hover:text-white hover:border-[#26a69a] transition"
                            data-testid="whop-open-new-tab"
                        >
                            <ExternalLink className="w-3 h-3" />
                            Yeni Sekmede Aç
                        </a>
                        <button
                            onClick={onClose}
                            className="w-9 h-9 rounded-md flex items-center justify-center border border-[#2b2b43] hover:border-[#ef5350] hover:text-[#ef5350] text-[#a0a4b0] transition"
                            data-testid="whop-close-btn"
                            aria-label="Kapat"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div
                    className="flex-1 overflow-auto"
                    style={{ background: "#0b0e14" }}
                >
                    {/* Whop checkout embed mount. The loader.js script swaps this div
                        with the Whop checkout iframe (whitelisted by Whop's CSP). */}
                    <div
                        key={plan.planId}
                        ref={mountRef}
                        data-whop-checkout-plan-id={plan.planId}
                        data-whop-checkout-theme="dark"
                        className="w-full min-h-full"
                        data-testid="whop-embed-mount"
                    />
                    <div className="text-center text-[10px] font-mono text-[#6b7080] py-3 px-4">
                        Ödeme sayfası açılmıyorsa{" "}
                        <a
                            href={plan.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#26a69a] underline"
                        >
                            yeni sekmede açın
                        </a>
                        .
                    </div>
                </div>
            </div>
        </div>
    );
}
