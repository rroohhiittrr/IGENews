"use client";

import { useState, useEffect } from "react";

interface SalesHeroBannerProps {
  onExploreClick: () => void;
  onApplyClick: () => void;
}

function useCounter(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

export default function SalesHeroBanner({ onExploreClick, onApplyClick }: SalesHeroBannerProps) {
  const eois = useCounter(847);
  const cities = useCounter(42);
  const countries = useCounter(8);

  return (
    <section
      className="relative w-full flex flex-col items-center justify-center text-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0A2463 0%, #1a3a7a 40%, #0d1b4b 100%)",
        overflow: "hidden",
      }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(230,57,70,0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(244,162,97,0.06) 0%, transparent 40%)`,
        }}
      />
      {/* Animated orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full pointer-events-none" style={{ background: "rgba(10,36,99,0.3)", filter: "blur(60px)", animation: "float 6s ease-in-out infinite" }} />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full pointer-events-none" style={{ background: "rgba(230,57,70,0.12)", filter: "blur(50px)", animation: "float 8s ease-in-out infinite reverse" }} />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: "rgba(244,162,97,0.18)", border: "1.5px solid rgba(244,162,97,0.35)", backdropFilter: "blur(8px)" }}>
          <span>🇮🇳</span>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#F4A261" }}>Powered by Viksit Bharat 2047 Mission</span>
        </div>

        {/* Headline */}
        <h1
          className="font-extrabold leading-tight mb-4"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(28px, 5vw, 52px)",
            color: "#FFFFFF",
            textShadow: "0 2px 20px rgba(0,0,0,0.3)",
          }}
        >
          Discover Opportunities.<br />
          Build Influence.<br />
          <span style={{ color: "#F4A261" }}>Grow Globally with IGEN.</span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mb-8 max-w-2xl" style={{ color: "rgba(255,255,255,0.82)", fontSize: "clamp(15px, 2.2vw, 18px)", lineHeight: 1.6 }}>
          India's AI-Powered ecosystem connecting Exporters, Importers, SMEs,
          Leaders, Companies and Investors across{" "}
          <strong style={{ color: "#fff" }}>50 Sectors · 1,200+ Industries · 195 Countries</strong>
        </p>

        {/* Live counter strip */}
        <div
          className="grid grid-cols-3 gap-0 rounded-2xl mx-auto mb-10 overflow-hidden"
          style={{ maxWidth: 500, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(10px)" }}
        >
          {[
            { val: `${eois}+`, label: "EOIs Submitted" },
            { val: cities, label: "Cities Represented" },
            { val: countries, label: "Countries Interested" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center py-5 px-3" style={{ borderRight: i < 2 ? "1px solid rgba(255,255,255,0.10)" : "none" }}>
              <span className="font-extrabold" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(22px, 4vw, 32px)", color: "#F4A261" }}>{item.val}</span>
              <span className="text-xs mt-1 text-center" style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.3 }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <button
            id="sales-hero-explore-cta"
            onClick={onExploreClick}
            className="flex items-center justify-center gap-2 font-bold transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #E63946, #C1121F)",
              color: "#fff",
              border: "none",
              borderRadius: 50,
              padding: "16px 40px",
              fontSize: 16,
              minHeight: 54,
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(230,57,70,0.40)",
              transform: "scale(1)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            🔍 Explore Opportunities
          </button>
          <button
            id="sales-hero-apply-cta"
            onClick={onApplyClick}
            className="flex items-center justify-center gap-2 font-semibold transition-all duration-300"
            style={{
              background: "transparent",
              color: "#fff",
              border: "2px solid rgba(255,255,255,0.60)",
              borderRadius: 50,
              padding: "16px 40px",
              fontSize: 16,
              minHeight: 54,
              cursor: "pointer",
              backdropFilter: "blur(4px)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.10)"; e.currentTarget.style.borderColor = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.60)"; }}
          >
            Apply for Founding Access
          </button>
        </div>

        {/* Micro-copy */}
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>
          No payment. No commitment. Express your interest in 5 minutes.
        </p>

        {/* Urgency badge */}
        <div className="flex items-center justify-center gap-2 mt-5">
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: "#E63946", animation: "blink 1.2s infinite" }} />
          <span className="text-xs font-semibold" style={{ color: "#F4A261" }}>LIVE &nbsp;|&nbsp; Founding Member Applications Open — Limited Slots</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2" style={{ animation: "bounce 2s infinite" }}>
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2.5 rounded-full bg-white/60" style={{ animation: "scrollDot 1.5s infinite" }} />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes bounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(8px); } }
        @keyframes scrollDot { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(12px); opacity: 0; } }
      `}} />
    </section>
  );
}
