"use client";

import { useEffect, useRef } from "react";
import HeroBanner from "@/components/eoi-form/HeroBanner";
import TrustStrip from "@/components/eoi-form/TrustStrip";
import EOIFormModule from "@/components/eoi-form/EOIFormModule";
import FOMAStrip from "@/components/eoi-form/FOMAStrip";
import NextStepsSection from "@/components/eoi-form/NextStepsSection";
import { ProductId } from "@/components/eoi-form/data/productData";

interface EOILandingPageProps {
  preselectedProduct?: ProductId | "";
  prefillCity?: string;
  prefillSector?: string;
  trafficSource?: string;
  teamMember?: string;
}

export default function EOILandingPage({
  preselectedProduct = "",
  prefillCity = "",
  prefillSector = "",
}: EOILandingPageProps) {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    document.getElementById("eoi-form-module")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      document.getElementById("product-selector")?.focus?.();
    }, 600);
  };

  return (
    <div
      className="min-h-screen w-full"
      style={{ fontFamily: "'Inter', sans-serif", background: "#F8F9FA" }}
    >
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* SECTION 1 — Hero */}
      <HeroBanner onCtaClick={scrollToForm} />

      {/* SECTION 2 — Trust Strip */}
      <TrustStrip />

      {/* SECTION 3 — EOI Form Module */}
      <div ref={formRef}>
        <EOIFormModule
          preselectedProduct={preselectedProduct}
          prefillCity={prefillCity}
          prefillSector={prefillSector}
        />
      </div>

      {/* SECTION 4 — FOMA Strip */}
      <FOMAStrip />

      {/* SECTION 5 — Next Steps */}
      <NextStepsSection />

      {/* SECTION 6 — Footer */}
      <footer
        className="w-full px-4 py-8 text-center"
        style={{ background: "#0A2463", color: "rgba(255,255,255,0.75)" }}
      >
        <div className="mx-auto max-w-4xl">
          <div
            className="text-xl font-extrabold mb-1"
            style={{ fontFamily: "'Poppins', sans-serif", color: "#fff" }}
          >
            🌐 IGEN World
          </div>
          <p className="text-xs mb-3">
            India Global Expo News Platform Pvt Ltd
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-4 text-xs font-medium">
            <a href="https://igennews.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.70)" }}>IGEN News</a>
            <a href="https://igenexpo.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.70)" }}>IGEN Expo</a>
            <a href="https://igenawards.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.70)" }}>IGEN Awards</a>
            <a href="https://igenworld.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.70)" }}>igenworld.com</a>
          </div>
          <p className="text-xs" style={{ opacity: 0.5 }}>
            © 2025 India Global Expo News Platform Pvt Ltd. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
