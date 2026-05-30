"use client";

import { useState } from "react";
import { PLATFORMS, IDENTITY_PLATFORM_MAP, CROSS_SELL_MAP, IdentityType, PlatformId } from "./data/salesProductData";

interface SalesFormStep4Props {
  identity: IdentityType;
  selectedGoals: string[];
  onComplete: (platforms: PlatformId[]) => void;
  onBack: () => void;
  onToast: (msg: string) => void;
}

export default function SalesFormStep4({ identity, selectedGoals, onComplete, onBack, onToast }: SalesFormStep4Props) {
  const [selected, setSelected] = useState<PlatformId[]>([]);
  const [error, setError] = useState("");

  const recommendedPlatforms = IDENTITY_PLATFORM_MAP[identity] || [];

  // Live recommendations from cross-sell map (based on selected platforms' products)
  const liveRecs = Array.from(
    new Set(
      selected.flatMap(pid => {
        const platform = PLATFORMS.find(p => p.id === pid);
        if (!platform) return [];
        return platform.products.flatMap(prod => CROSS_SELL_MAP[prod.id] || []);
      })
    )
  ).slice(0, 5);

  const toggle = (id: PlatformId) => {
    setError("");
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleContinue = () => {
    if (selected.length === 0) {
      setError("⚠️ Please select at least one platform to continue.");
      return;
    }
    onToast("✅ Ecosystem interest saved. 40% complete.");
    onComplete(selected);
  };

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-extrabold mb-1" style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463", fontSize: "clamp(18px, 2.5vw, 24px)" }}>
          Select Your Areas of Interest
        </h2>
        <p style={{ color: "#6C757D", fontSize: 14 }}>
          You can select multiple. Each selection opens a detailed opportunity explorer.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Platform cards */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {PLATFORMS.map(platform => {
              const isSelected = selected.includes(platform.id);
              const isRecommended = recommendedPlatforms.includes(platform.id);
              return (
                <button
                  key={platform.id}
                  id={`sales-platform-${platform.id}`}
                  type="button"
                  onClick={() => toggle(platform.id)}
                  className="text-left rounded-2xl p-4 relative transition-all duration-300"
                  style={{
                    background: isSelected ? "rgba(10,36,99,0.04)" : "#fff",
                    border: isSelected ? "2px solid #0A2463" : "1.5px solid #DEE2E6",
                    boxShadow: isSelected ? "0 0 0 3px rgba(10,36,99,0.10)" : "0 2px 12px rgba(10,36,99,0.04)",
                    transform: isSelected ? "scale(1.02)" : "scale(1)",
                    cursor: "pointer",
                  }}
                >
                  {isRecommended && (
                    <div
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold mb-2"
                      style={{ background: "rgba(244,162,97,0.18)", color: "#B5620A" }}
                    >
                      ⭐ Recommended for You
                    </div>
                  )}
                  {isSelected && (
                    <span
                      className="absolute top-3 right-3 flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold"
                      style={{ background: "#0A2463", color: "#fff" }}
                    >
                      ✓
                    </span>
                  )}
                  <div className="text-2xl mb-1">{platform.icon}</div>
                  <div className="font-bold text-sm" style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463" }}>{platform.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#6C757D" }}>{platform.tagline}</div>
                  <div
                    className="mt-2 text-xs font-semibold"
                    style={{ color: isSelected ? "#0A2463" : "#6C757D" }}
                  >
                    {isSelected ? "✓ Selected" : "○ Select"}
                  </div>
                </button>
              );
            })}
          </div>

          {error && <p style={{ color: "#E63946", fontSize: 13 }}>{error}</p>}
        </div>

        {/* Live Recommendation Sidebar */}
        {selected.length > 0 && (
          <div
            className="lg:w-64 flex-shrink-0 rounded-2xl p-5 self-start animate-fadeIn"
            style={{
              background: "linear-gradient(135deg, #0A2463 0%, #1a3a7a 100%)",
              color: "#fff",
              position: "sticky",
              top: 80,
            }}
          >
            <div className="text-sm font-bold mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>⚡ SMART RECOMMENDATIONS</div>
            <div className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.70)" }}>Based on your portfolio</div>

            <div className="text-xs font-semibold mb-2" style={{ color: "rgba(255,255,255,0.80)" }}>You selected:</div>
            {selected.map(pid => {
              const p = PLATFORMS.find(x => x.id === pid);
              return p ? (
                <div key={pid} className="text-xs mb-1 flex items-center gap-1" style={{ color: "rgba(255,255,255,0.90)" }}>
                  <span>{p.icon}</span> {p.name} ✓
                </div>
              ) : null;
            })}

            {liveRecs.length > 0 && (
              <>
                <div className="border-t border-white/20 my-3" />
                <div className="text-xs font-semibold mb-2" style={{ color: "rgba(255,255,255,0.80)" }}>You may also benefit from:</div>
                {liveRecs.slice(0, 4).map(rec => (
                  <div key={rec} className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.75)" }}>
                    ➕ {rec.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
                  </div>
                ))}
              </>
            )}

            {/* FOMO sidebar */}
            <div className="border-t border-white/20 mt-3 pt-3">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="inline-block w-2 h-2 rounded-full" style={{ background: "#E63946" }} />
                <span className="text-xs font-bold" style={{ color: "#F4A261" }}>FOUNDING ACCESS OPEN</span>
              </div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>
                First 100 SMEs: Year 1 FREE<br />
                First 500 Readers: Badge
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-6">
        <button type="button" onClick={onBack} className="font-semibold px-6 py-3 rounded-full" style={{ background: "#F8F9FA", border: "1.5px solid #DEE2E6", color: "#6C757D", cursor: "pointer", fontSize: 15 }}>
          ← Back
        </button>
        <button type="button" onClick={handleContinue} className="flex-1 font-bold rounded-full transition-all duration-300" style={{ background: "linear-gradient(135deg, #E63946, #C1121F)", color: "#fff", border: "none", padding: "14px 24px", fontSize: 16, cursor: "pointer", boxShadow: "0 6px 24px rgba(230,57,70,0.30)" }}>
          Continue to Product Explorer →
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .animate-fadeIn { animation: fadeIn 0.4s ease; }` }} />
    </div>
  );
}
