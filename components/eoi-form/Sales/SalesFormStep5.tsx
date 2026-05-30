"use client";

import { useState } from "react";
import { PLATFORMS, SalesProduct, PlatformId } from "./data/salesProductData";

interface SalesFormStep5Props {
  selectedPlatforms: PlatformId[];
  onComplete: (portfolio: Record<string, string[]>) => void;
  onBack: () => void;
  onToast: (msg: string) => void;
}

export default function SalesFormStep5({ selectedPlatforms, onComplete, onBack, onToast }: SalesFormStep5Props) {
  const [portfolio, setPortfolio] = useState<Record<string, string[]>>({});
  const [conditionalValues, setConditionalValues] = useState<Record<string, string>>({});
  const [activePlatform, setActivePlatform] = useState<PlatformId | null>(selectedPlatforms[0] || null);
  const [error, setError] = useState("");

  const platforms = PLATFORMS.filter(p => selectedPlatforms.includes(p.id));

  const toggleProduct = (platformId: string, productId: string) => {
    setPortfolio(prev => {
      const current = prev[platformId] || [];
      if (current.includes(productId)) {
        return { ...prev, [platformId]: current.filter(x => x !== productId) };
      }
      return { ...prev, [platformId]: [...current, productId] };
    });
  };

  const totalSelected = Object.values(portfolio).reduce((sum, arr) => sum + arr.length, 0);

  const handleContinue = () => {
    if (totalSelected === 0) {
      setError("⚠️ Please add at least one product to your portfolio.");
      return;
    }
    onToast(`✅ Portfolio saved — ${totalSelected} product${totalSelected > 1 ? "s" : ""} selected. 70% complete.`);
    onComplete(portfolio);
  };

  return (
    <div className="animate-fadeIn">
      <div className="mb-6">
        <h2 className="font-extrabold mb-1" style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463", fontSize: "clamp(18px, 2.5vw, 24px)" }}>
          Build Your IGEN Product Portfolio
        </h2>
        <p style={{ color: "#6C757D", fontSize: 14 }}>
          Explore each platform and add products to your portfolio.
        </p>
      </div>

      {/* Platform tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {platforms.map(p => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActivePlatform(p.id)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
            style={{
              background: activePlatform === p.id ? "#0A2463" : "#fff",
              color: activePlatform === p.id ? "#fff" : "#1A1A2E",
              border: activePlatform === p.id ? "2px solid #0A2463" : "1.5px solid #DEE2E6",
              cursor: "pointer",
            }}
          >
            <span>{p.icon}</span>
            <span>{p.name}</span>
            {(portfolio[p.id] || []).length > 0 && (
              <span
                className="ml-1 flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold"
                style={{ background: "#2A9D8F", color: "#fff" }}
              >
                {(portfolio[p.id] || []).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Active platform */}
      {activePlatform && (() => {
        const platform = platforms.find(p => p.id === activePlatform);
        if (!platform) return null;
        return (
          <div className="animate-fadeIn">
            {/* Platform banner */}
            <div
              className="rounded-2xl p-5 mb-4"
              style={{ background: "linear-gradient(135deg, #0A2463, #1a3a7a)", color: "#fff" }}
            >
              <div className="text-2xl mb-1">{platform.icon}</div>
              <div className="font-extrabold text-lg" style={{ fontFamily: "'Poppins', sans-serif" }}>{platform.name}</div>
              <div className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>{platform.tagline}</div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {platform.whoShouldJoin.map(w => (
                  <span key={w} className="px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.90)" }}>
                    {w}
                  </span>
                ))}
              </div>
            </div>

            {/* Products */}
            <div className="space-y-3">
              {platform.products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isSelected={(portfolio[activePlatform] || []).includes(product.id)}
                  conditionalValue={conditionalValues[product.id] || ""}
                  onConditionalChange={(val) => setConditionalValues(prev => ({ ...prev, [product.id]: val }))}
                  onToggle={() => toggleProduct(activePlatform, product.id)}
                />
              ))}
            </div>
          </div>
        );
      })()}

      {error && <p className="mt-4" style={{ color: "#E63946", fontSize: 13 }}>{error}</p>}

      {/* Portfolio summary mini */}
      {totalSelected > 0 && (
        <div className="mt-4 rounded-xl px-4 py-3" style={{ background: "rgba(42,157,143,0.08)", border: "1.5px solid rgba(42,157,143,0.20)" }}>
          <span className="text-sm font-semibold" style={{ color: "#2A9D8F" }}>
            🗂️ Your Portfolio: {totalSelected} product{totalSelected > 1 ? "s" : ""} selected
          </span>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 mt-6">
        <button type="button" onClick={onBack} className="font-semibold px-6 py-3 rounded-full" style={{ background: "#F8F9FA", border: "1.5px solid #DEE2E6", color: "#6C757D", cursor: "pointer", fontSize: 15 }}>
          ← Back
        </button>
        <button type="button" onClick={handleContinue} className="flex-1 font-bold rounded-full transition-all duration-300" style={{ background: "linear-gradient(135deg, #E63946, #C1121F)", color: "#fff", border: "none", padding: "14px 24px", fontSize: 16, cursor: "pointer", boxShadow: "0 6px 24px rgba(230,57,70,0.30)" }}>
          Review My Portfolio →
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .animate-fadeIn { animation: fadeIn 0.4s ease; }` }} />
    </div>
  );
}

function ProductCard({
  product, isSelected, onToggle, conditionalValue, onConditionalChange,
}: {
  product: SalesProduct;
  isSelected: boolean;
  onToggle: () => void;
  conditionalValue: string;
  onConditionalChange: (val: string) => void;
}) {
  return (
    <div
      className="rounded-2xl p-5 transition-all duration-300"
      style={{
        background: isSelected ? "rgba(10,36,99,0.03)" : "#fff",
        border: isSelected ? "2px solid #0A2463" : "1.5px solid #DEE2E6",
        boxShadow: isSelected ? "0 0 0 3px rgba(10,36,99,0.08)" : "0 2px 10px rgba(10,36,99,0.04)",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-base" style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463" }}>{product.name}</span>
            {product.foundingSlot && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "rgba(230,57,70,0.10)", color: "#E63946" }}>
                🔴 {product.foundingSlot}
              </span>
            )}
          </div>

          <p className="text-sm italic mb-3" style={{ color: "#6C757D" }}>
            Ideal For: "{product.idealFor}"
          </p>

          <div className="flex flex-wrap gap-1 mb-3">
            {product.benefits.map(b => (
              <span key={b} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(42,157,143,0.08)", color: "#2A9D8F", fontWeight: 600 }}>
                ✓ {b}
              </span>
            ))}
          </div>

          {product.pricingNote && (
            <p className="text-xs mb-2" style={{ color: "#6C757D" }}>💰 {product.pricingNote}</p>
          )}

          {product.addOns && product.addOns.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className="text-xs" style={{ color: "#6C757D" }}>Suggested Add-Ons:</span>
              {product.addOns.map(ao => (
                <span key={ao} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#F8F9FA", border: "1px solid #DEE2E6", color: "#1A1A2E" }}>
                  + {ao}
                </span>
              ))}
            </div>
          )}

          {/* Conditional field */}
          {isSelected && product.conditionalField && (
            <div className="mt-3">
              <label className="block text-xs font-semibold mb-1" style={{ color: "#1A1A2E" }}>{product.conditionalField.label}</label>
              {product.conditionalField.type === "textarea" ? (
                <textarea
                  value={conditionalValue}
                  onChange={e => onConditionalChange(e.target.value)}
                  rows={2}
                  className="w-full rounded-lg p-2.5 text-sm"
                  style={{ border: "1.5px solid #DEE2E6", resize: "vertical", fontSize: 16 }}
                />
              ) : (
                <select value={conditionalValue} onChange={e => onConditionalChange(e.target.value)} className="w-full rounded-lg p-2.5 text-sm" style={{ border: "1.5px solid #DEE2E6", fontSize: 16 }}>
                  <option value="">Select…</option>
                  {product.conditionalField.options?.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              )}
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onToggle}
        className="mt-4 w-full font-bold py-2.5 rounded-full text-sm transition-all duration-200"
        style={{
          background: isSelected ? "rgba(42,157,143,0.10)" : "linear-gradient(135deg, #0A2463, #1a3a7a)",
          color: isSelected ? "#2A9D8F" : "#fff",
          border: isSelected ? "2px solid #2A9D8F" : "none",
          cursor: "pointer",
        }}
      >
        {isSelected ? "✓ Added to Portfolio — Remove" : "+ Add to My Portfolio"}
      </button>
    </div>
  );
}
