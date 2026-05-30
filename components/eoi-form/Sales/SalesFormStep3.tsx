"use client";

import { useState } from "react";
import { GOAL_CLUSTERS } from "./data/salesProductData";

interface SalesFormStep3Props {
  onComplete: (goals: string[]) => void;
  onBack: () => void;
  onToast: (msg: string) => void;
}

export default function SalesFormStep3({ onComplete, onBack, onToast }: SalesFormStep3Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [showBridge, setShowBridge] = useState(false);

  const toggle = (goal: string) => {
    setError("");
    setSelected(prev => {
      if (prev.includes(goal)) return prev.filter(g => g !== goal);
      if (prev.length >= 3) return prev;
      return [...prev, goal];
    });
  };

  const handleContinue = () => {
    if (selected.length === 0) {
      setError("⚠️ Please select at least one priority");
      return;
    }
    setShowBridge(true);
    onToast("✅ Goals saved. 30% complete.");
    setTimeout(() => onComplete(selected), 1200);
  };

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-extrabold mb-1" style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463", fontSize: "clamp(18px, 2.5vw, 24px)" }}>
          What Are You Looking To Achieve?
        </h2>
        <p style={{ color: "#6C757D", fontSize: 14 }}>
          Select up to 3 priorities. We'll match you to the most relevant opportunities.
        </p>
      </div>

      {/* Goal clusters */}
      <div className="space-y-4 mb-5">
        {GOAL_CLUSTERS.map(cluster => (
          <div key={cluster.id} className="rounded-2xl overflow-hidden" style={{ border: "1.5px solid #DEE2E6" }}>
            {/* Cluster header */}
            <div className="px-5 py-3 flex items-center gap-2" style={{ background: "rgba(10,36,99,0.04)" }}>
              <span className="text-lg">{cluster.emoji}</span>
              <span className="font-bold text-sm uppercase tracking-wide" style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463" }}>
                {cluster.label}
              </span>
            </div>
            {/* Goals */}
            <div className="p-4 flex flex-wrap gap-2">
              {cluster.goals.map(goal => {
                const isSelected = selected.includes(goal);
                const isDisabled = !isSelected && selected.length >= 3;
                return (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => !isDisabled && toggle(goal)}
                    className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                    style={{
                      border: isSelected ? "2px solid #0A2463" : "1.5px solid #DEE2E6",
                      background: isSelected ? "rgba(10,36,99,0.08)" : "#fff",
                      color: isSelected ? "#0A2463" : isDisabled ? "#B0B8C9" : "#1A1A2E",
                      cursor: isDisabled ? "not-allowed" : "pointer",
                      opacity: isDisabled ? 0.5 : 1,
                      transform: isSelected ? "scale(1.03)" : "scale(1)",
                    }}
                  >
                    {isSelected ? "✓ " : ""}{goal}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Selected tags */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs font-semibold" style={{ color: "#6C757D", alignSelf: "center" }}>Selected:</span>
          {selected.map(g => (
            <span
              key={g}
              className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: "#0A2463", color: "#fff" }}
            >
              {g}
              <button onClick={() => toggle(g)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 0, lineHeight: 1 }}>×</button>
            </span>
          ))}
          <span className="text-xs" style={{ color: "#6C757D", alignSelf: "center" }}>({3 - selected.length} remaining)</span>
        </div>
      )}

      {error && <p style={{ color: "#E63946", fontSize: 13, marginBottom: 12 }}>{error}</p>}

      {/* Bridge message */}
      {showBridge && (
        <div className="rounded-xl px-5 py-4 mb-5 animate-fadeIn" style={{ background: "linear-gradient(135deg, rgba(10,36,99,0.06), rgba(10,36,99,0.02))", border: "1.5px solid rgba(10,36,99,0.15)" }}>
          <p className="font-semibold text-sm" style={{ color: "#0A2463" }}>
            Based on what you want to achieve, here are the IGEN platforms most relevant to you →
          </p>
          <p className="text-xs mt-1" style={{ color: "#6C757D" }}>The next step pre-highlights platforms relevant to your selections.</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 mt-6">
        <button type="button" onClick={onBack} className="font-semibold px-6 py-3 rounded-full" style={{ background: "#F8F9FA", border: "1.5px solid #DEE2E6", color: "#6C757D", cursor: "pointer", fontSize: 15 }}>
          ← Back
        </button>
        <button type="button" onClick={handleContinue} className="flex-1 font-bold rounded-full transition-all duration-300" style={{ background: selected.length > 0 ? "linear-gradient(135deg, #E63946, #C1121F)" : "#E9ECEF", color: selected.length > 0 ? "#fff" : "#6C757D", border: "none", padding: "14px 24px", fontSize: 16, cursor: selected.length > 0 ? "pointer" : "not-allowed", boxShadow: selected.length > 0 ? "0 6px 24px rgba(230,57,70,0.30)" : "none" }}>
          Continue — Explore My IGEN Opportunities →
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .animate-fadeIn { animation: fadeIn 0.4s ease; }` }} />
    </div>
  );
}
