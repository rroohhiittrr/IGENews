"use client";

import { useState } from "react";
import { IdentityType } from "./data/salesProductData";

interface SalesFormStep0Props {
  onComplete: (identity: IdentityType) => void;
}

const IDENTITIES: { id: IdentityType; icon: string; title: string; desc: string }[] = [
  { id: "READER", icon: "📖", title: "READER", desc: "I consume industry news and want smarter insights" },
  { id: "INDUSTRY_EXPERT", icon: "🎓", title: "INDUSTRY EXPERT", desc: "I have deep expertise and want industry visibility" },
  { id: "BUSINESS_OWNER", icon: "🏢", title: "BUSINESS OWNER / COMPANY", desc: "I want my company to grow and be found" },
  { id: "INDUSTRY_LEADER", icon: "👔", title: "INDUSTRY LEADER (CXO / Founder)", desc: "I want my executive identity built" },
  { id: "EXPORTER_IMPORTER", icon: "🌐", title: "EXPORTER / IMPORTER", desc: "I want to discover global trade opportunities" },
];

export default function SalesFormStep0({ onComplete }: SalesFormStep0Props) {
  const [selected, setSelected] = useState<IdentityType | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleSelect = (id: IdentityType) => {
    setSelected(id);
    setConfirmed(false);
  };

  const handleContinue = () => {
    if (!selected) return;
    setConfirmed(true);
    setTimeout(() => onComplete(selected), 600);
  };

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-8">
        <h2
          className="font-extrabold mb-2"
          style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463", fontSize: "clamp(20px, 3vw, 28px)" }}
        >
          Before We Begin — Who Are You?
        </h2>
        <p style={{ color: "#6C757D", fontSize: 15 }}>
          So we can show you what's most relevant to you in IGEN.
        </p>
      </div>

      {/* Identity cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {IDENTITIES.map(({ id, icon, title, desc }) => {
          const isSelected = selected === id;
          return (
            <button
              key={id}
              id={`sales-identity-${id.toLowerCase()}`}
              onClick={() => handleSelect(id)}
              className="text-left rounded-2xl p-6 transition-all duration-300 relative"
              style={{
                background: isSelected ? "rgba(10,36,99,0.04)" : "#fff",
                border: isSelected ? "2px solid #0A2463" : "1.5px solid #DEE2E6",
                boxShadow: isSelected ? "0 0 0 3px rgba(10,36,99,0.12)" : "0 2px 12px rgba(10,36,99,0.04)",
                transform: isSelected ? "scale(1.01)" : "scale(1)",
                cursor: "pointer",
              }}
            >
              {isSelected && (
                <span
                  className="absolute top-3 right-3 flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
                  style={{ background: "#0A2463", color: "#fff" }}
                >
                  ✓
                </span>
              )}
              <div className="text-3xl mb-3">{icon}</div>
              <div className="font-bold text-sm mb-1" style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463" }}>
                {title}
              </div>
              <div className="text-sm" style={{ color: "#6C757D" }}>{desc}</div>
            </button>
          );
        })}
      </div>

      {/* Personalisation message */}
      {selected && !confirmed && (
        <div
          className="rounded-xl px-5 py-3 mb-5 flex items-start gap-3 animate-fadeIn"
          style={{ background: "rgba(42,157,143,0.08)", border: "1.5px solid rgba(42,157,143,0.25)" }}
        >
          <span className="text-xl">✓</span>
          <div>
            <span className="font-semibold text-sm" style={{ color: "#2A9D8F" }}>
              Great! We've personalised your IGEN journey based on your profile.
            </span>
            <p className="text-xs mt-0.5" style={{ color: "#6C757D" }}>You can still explore all opportunities.</p>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="flex justify-center">
        <button
          id="sales-step0-continue"
          onClick={handleContinue}
          disabled={!selected}
          className="font-bold transition-all duration-300"
          style={{
            background: selected ? "linear-gradient(135deg, #E63946, #C1121F)" : "#E9ECEF",
            color: selected ? "#fff" : "#6C757D",
            border: "none",
            borderRadius: 50,
            padding: "16px 44px",
            fontSize: 16,
            cursor: selected ? "pointer" : "not-allowed",
            boxShadow: selected ? "0 8px 28px rgba(230,57,70,0.30)" : "none",
            minWidth: 280,
          }}
        >
          Continue — Build My IGEN Profile →
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .animate-fadeIn { animation: fadeIn 0.4s ease; }` }} />
    </div>
  );
}
