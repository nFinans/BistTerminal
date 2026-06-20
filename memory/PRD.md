# Privy Neural Algo v2.0 BIST — Landing Page

## Original Problem Statement
Conversion-optimized, premium dark-mode landing page (Turkish) for "Privy Neural Algo v2.0 BIST" — an institutional-grade algorithmic trading dashboard for Borsa Istanbul (BIST). Design must match the existing Flask app's visual language (colors `#0b0e14`, `#131722`, `#26a69a`, `#ef5350`, `#ffb300`, `#e040fb` and fonts Outfit + JetBrains Mono).

## User Choices (Dec 2025)
- **Static landing page only** (no backend / no email collection)
- **CTA "Sisteme Giriş Yap"** → redirects to `https://bist.privyalgo.com`
- **Dashboard visuals**: CSS/HTML/SVG animated mockups (no uploaded screenshot assets used)
- **No testimonial section**
- **Whop pricing pop-up modal** with two plans:
  - 6 Aylık Premium Plan — `plan_g4J6Wi1MAafMB` — 5.400 TL (was 7.200 TL)
  - Yıllık Premium+ Plan — `plan_JeXSEXRXPoExb` — 9.600 TL (was 14.400 TL)

## Architecture
- **Frontend**: React 19 + Tailwind + craco
- **No backend logic changed** (existing FastAPI server.py untouched)
- **Whop integration**: official embed loader (`https://js.whop.com/static/checkout/loader.js`) mounted inside an in-page modal. Iframe is rendered by Whop's own script which bypasses their CSP `frame-ancestors` restriction.

## File Structure
```
/app/frontend/src/
├── App.js                              (entry — renders Landing)
├── App.css / index.css                 (design tokens, fonts, animations)
├── pages/Landing.jsx                   (orchestrator + Whop plan map)
└── components/landing/
    ├── TopBar.jsx                      (sticky nav + login CTA)
    ├── Hero.jsx                        (headline + dashboard mockup)
    ├── DashboardMockup.jsx             (animated SVG chart with TF AL/SAT, HEDGE WALL, MaxBuy/MaxSell)
    ├── SignalTicker.jsx                (scrolling BIST symbol strip)
    ├── Features.jsx                    (4 feature cards)
    ├── Kings.jsx                       (Algoritmanın Kralları table — Son 10 Gün)
    ├── SentimentPanels.jsx             (Güçlü Alıcılar + Güçlü Satıcılar)
    ├── Pricing.jsx                     (2 plan cards triggering Whop modal)
    ├── TechStack.jsx                   (infra cards)
    ├── FooterSection.jsx
    └── WhopModal.jsx                   (in-page Whop checkout embed)
```

## Implemented (Dec 2025 — Initial MVP)
- Sticky glassmorphism top bar with brand + Turkish nav + "SİSTEME GİRİŞ YAP" button
- Hero: bilingual-styled headline, BIST badge, animated SVG chart with TF AL / TF SAT markers, HEDGE WALL line, MaxBuy / MaxSell zones, live legend strip, volume panel, 3 stat cards
- Live scrolling signal ticker with 10 real BIST symbols
- 4 feature cards: Sentiment, Volatilite, Algoritmik Sinyaller, Hedge Wall
- Algoritmanın Kralları (Son 10 Gün) — exact 10 stocks with Algo / Hisse / Reel columns from screenshots
- Sentiment panels — Güçlü Alıcılar & Güçlü Satıcılar with real data + animated score bars
- Pricing: 2 Whop-backed plans (6 Ay 5.400 TL, Yıllık 9.600 TL with "En Popüler" badge)
- WhopModal: official Whop embed via `data-whop-checkout-plan-id`; "Yeni Sekmede Aç" fallback link
- Tech stack section + footer with mailto and live status
- Fonts: Outfit (UI) + JetBrains Mono (data) loaded via Google Fonts
- Full Turkish copy, conversion-focused

## Environment Fix
Pinned `webpack-dev-server@4.15.2` in package.json resolutions (was hoisting v5.2.4 which is incompatible with react-scripts 5 `onAfterSetupMiddleware`).

## Verified
- Frontend HTTP 200 on internal port + external preview URL
- Whop iframe checkout loads correctly inside the modal (verified: Premium Plan — 6 Aylık 5.400 TL form renders with Whop's required Üyelik Ad/Soyad, Mail, Şifre, TC/VERGİ NO, Cep Telefonu fields)
- All 5 main sections render correctly at 1440×900

## P1 Backlog (Not Done)
- Mobile-specific QA pass (responsive grid validated but no device-specific testing)
- Real testimonials (intentionally skipped per user request)
- Analytics / conversion event tracking (PostHog is already loaded by base template)
- Faster Whop embed warm-up (preload `loader.js`)

## Next Action Items
- [ ] Test the live Whop checkout end-to-end with a real test purchase
- [ ] Add Open Graph / Twitter card metadata for social sharing
- [ ] Add a "comparison vs. brokerage tool X" section for conversion lift
