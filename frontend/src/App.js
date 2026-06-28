import "@/App.css";
import React, { useEffect, useState } from "react";
import Landing from "@/pages/Landing";
import LegalPage from "@/pages/LegalPage";
import { Toaster } from "@/components/ui/sonner";
import NFinansBadge from "@/components/NFinansBadge";
import { LEGAL_PAGES } from "@/data/legal";

function getSlugFromHash() {
    const h = window.location.hash.replace(/^#\/?/, "").trim();
    return LEGAL_PAGES[h] ? h : null;
}

function App() {
    const [slug, setSlug] = useState(getSlugFromHash());

    useEffect(() => {
        const onHash = () => setSlug(getSlugFromHash());
        window.addEventListener("hashchange", onHash);
        return () => window.removeEventListener("hashchange", onHash);
    }, []);

    const goHome = () => {
        window.location.hash = "";
    };

    return (
        <div className="App">
            {slug ? <LegalPage slug={slug} onBack={goHome} /> : <Landing />}
            <Toaster
                theme="dark"
                position="top-center"
                richColors
                closeButton
            />
            <NFinansBadge />
        </div>
    );
}

export default App;
