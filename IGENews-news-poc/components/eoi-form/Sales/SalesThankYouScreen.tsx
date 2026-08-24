"use client";

import { useState } from "react";
import { PLATFORMS, PlatformId } from "./data/salesProductData";

interface SalesThankYouScreenProps {
  firstName: string;
  referenceId: string;
  portfolio: Record<string, string[]>;
  platforms: PlatformId[];
  onFillAnother: () => void;
}

export default function SalesThankYouScreen({ firstName, referenceId, portfolio, platforms, onFillAnother }: SalesThankYouScreenProps) {
  const [copied, setCopied] = useState(false);

  const copyRef = () => {
    navigator.clipboard.writeText(referenceId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const nextSteps = [
    { icon: "✅", label: "Application received", sub: "Saved to our CRM" },
    { icon: "📞", label: "IGEN Account Manager calls you", sub: "Within 24 hours" },
    { icon: "📄", label: "Personalised brochures shared", sub: "On WhatsApp + Email" },
    { icon: "🗓️", label: "Discovery call scheduled", sub: "For your onboarding" },
    { icon: "🚀", label: "Founding Member access activated", sub: "At platform launch" },
  ];

  const totalProducts = Object.values(portfolio).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div className="animate-fadeIn text-center">
      {/* Animated checkmark */}
      <div
        className="flex items-center justify-center w-24 h-24 rounded-full mx-auto mb-6"
        style={{
          background: "linear-gradient(135deg, #2A9D8F, #1a7a70)",
          boxShadow: "0 12px 40px rgba(42,157,143,0.40)",
          animation: "popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
      >
        <span style={{ fontSize: 44 }}>✅</span>
      </div>

      <h2
        className="font-extrabold mb-2"
        style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463", fontSize: "clamp(20px, 3vw, 28px)" }}
      >
        Welcome to the IGEN Founding Community{firstName ? `, ${firstName}` : ""}!
      </h2>
      <p className="mb-2" style={{ color: "#6C757D", fontSize: 15 }}>
        Your IGEN Opportunity Portfolio has been submitted.
      </p>

      {/* Reference */}
      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 cursor-pointer transition-all duration-200"
        style={{ background: "#F8F9FA", border: "1.5px solid #DEE2E6" }}
        onClick={copyRef}
        title="Click to copy"
      >
        <span className="text-xs font-mono font-semibold" style={{ color: "#0A2463" }}>{referenceId}</span>
        <span className="text-xs" style={{ color: "#6C757D" }}>{copied ? "✓ Copied!" : "📋 Copy"}</span>
      </div>

      <hr style={{ borderColor: "#DEE2E6", marginBottom: 24 }} />

      {/* Portfolio summary */}
      {totalProducts > 0 && (
        <>
          <div className="text-left mb-2">
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#6C757D" }}>YOUR SELECTED PORTFOLIO</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {platforms.map(platformId => {
              const products = portfolio[platformId] || [];
              if (products.length === 0) return null;
              const platform = PLATFORMS.find(p => p.id === platformId);
              if (!platform) return null;
              return (
                <div key={platformId} className="rounded-xl p-3 text-left" style={{ background: "#F8F9FA", border: "1.5px solid #DEE2E6" }}>
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-lg">{platform.icon}</span>
                    <span className="font-bold text-xs" style={{ color: "#0A2463" }}>{platform.name}</span>
                  </div>
                  {products.map(prodId => {
                    const prod = platform.products.find(p => p.id === prodId);
                    return prod ? (
                      <div key={prodId} className="text-xs" style={{ color: "#2A9D8F" }}>✓ {prod.name}</div>
                    ) : null;
                  })}
                </div>
              );
            })}
          </div>
          <hr style={{ borderColor: "#DEE2E6", marginBottom: 24 }} />
        </>
      )}

      {/* What happens next */}
      <div className="text-left mb-6">
        <div className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "#6C757D" }}>WHAT HAPPENS NEXT?</div>
        <div className="space-y-3">
          {nextSteps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0" style={{ lineHeight: 1.3 }}>{step.icon}</span>
              <div>
                <div className="text-sm font-semibold" style={{ color: "#1A1A2E" }}>{step.label}</div>
                <div className="text-xs" style={{ color: "#6C757D" }}>{step.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr style={{ borderColor: "#DEE2E6", marginBottom: 24 }} />

      {/* Next steps CTAs — prioritised */}
      <div className="space-y-3 mb-6">
        <button
          id="sales-thankyou-schedule"
          className="w-full font-bold py-4 rounded-2xl transition-all duration-300"
          style={{ background: "linear-gradient(135deg, #0A2463, #1a3a7a)", color: "#fff", border: "none", fontSize: 16, cursor: "pointer", boxShadow: "0 8px 28px rgba(10,36,99,0.25)" }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.02)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          📅 Schedule My Discovery Call
        </button>
        <button
          id="sales-thankyou-refer"
          className="w-full font-semibold py-3.5 rounded-2xl transition-all duration-300"
          style={{ background: "#fff", color: "#0A2463", border: "2px solid #0A2463", fontSize: 15, cursor: "pointer" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(10,36,99,0.04)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#fff"; }}
        >
          👥 Refer a Colleague to IGEN
        </button>
      </div>

      {/* Tertiary links */}
      <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm font-semibold" style={{ color: "#6C757D" }}>
        <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="hover:text-[#0A2463] transition-colors">📲 Join WhatsApp Updates</a>
        <span>|</span>
        <a href="#" className="hover:text-[#0A2463] transition-colors">📥 Download Brochure</a>
        <span>|</span>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#0A2463] transition-colors">💼 Follow on LinkedIn</a>
      </div>

      <button
        type="button"
        onClick={onFillAnother}
        className="text-sm font-semibold"
        style={{ background: "none", border: "none", color: "#6C757D", cursor: "pointer", textDecoration: "underline" }}
      >
        ← Fill Another EOI for a Different Product
      </button>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.4s ease; }
      `}} />
    </div>
  );
}
