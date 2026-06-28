import React from "react";

export default function NFinansBadge() {
    return (
        <a
            href="https://www.nfinans.net"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="made-with-nfinans-badge"
            className="group"
            style={{
                position: "fixed",
                bottom: 16,
                right: 16,
                zIndex: 9999,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 14px",
                borderRadius: 999,
                background: "linear-gradient(135deg, #0b0e14 0%, #131722 100%)",
                border: "1px solid #26a69a",
                boxShadow:
                    "0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(38,166,154,0.15) inset, 0 0 20px rgba(38,166,154,0.18)",
                textDecoration: "none",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 12,
                fontWeight: 600,
                color: "#ffffff",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                    "0 12px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(38,166,154,0.25) inset, 0 0 28px rgba(38,166,154,0.35)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(38,166,154,0.15) inset, 0 0 20px rgba(38,166,154,0.18)";
            }}
        >
            {/* nFinans monogram */}
            <svg
                width="18"
                height="18"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
            >
                <defs>
                    <linearGradient id="nf-grad" x1="0" y1="0" x2="32" y2="32">
                        <stop offset="0%" stopColor="#26a69a" />
                        <stop offset="100%" stopColor="#5eead4" />
                    </linearGradient>
                </defs>
                <rect
                    x="2"
                    y="2"
                    width="28"
                    height="28"
                    rx="7"
                    fill="url(#nf-grad)"
                    opacity="0.18"
                />
                <path
                    d="M8 24 L8 9 L13 9 L20 18 L20 9 L24 9 L24 24 L19 24 L12 15 L12 24 Z"
                    fill="url(#nf-grad)"
                />
            </svg>

            <span style={{ letterSpacing: "0.04em" }}>
                Made with{" "}
                <span style={{ color: "#26a69a" }}>nFinans</span>
            </span>
        </a>
    );
}
