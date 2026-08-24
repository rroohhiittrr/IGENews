"use client";

import { ProductId, PRODUCT_INFO, PRODUCT_GROUPS } from "./data/productData";

interface ProductSelectorProps {
  selectedProduct: ProductId | "";
  onSelect: (id: ProductId) => void;
}

const platformColors: Record<string, { bg: string; text: string; border: string }> = {
  "IGEN NEWS": { bg: "#EEF2FF", text: "#0A2463", border: "#0A2463" },
  "IGEN EXPO": { bg: "#FFF7ED", text: "#C2440E", border: "#F4A261" },
  "IGEN COMMON": { bg: "#F0FDF9", text: "#065F46", border: "#2A9D8F" },
};

export default function ProductSelector({ selectedProduct, onSelect }: ProductSelectorProps) {
  return (
    <div id="product-selector" className="w-full">
      <div className="mb-6 text-center">
        <h2
          className="text-2xl font-bold mb-1"
          style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463" }}
        >
          What are you interested in?
        </h2>
        <p className="text-sm" style={{ color: "#6C757D" }}>
          Select a product to see your benefits and begin your application.
        </p>
      </div>

      {/* Mobile dropdown */}
      <div className="md:hidden mb-4">
        <select
          id="product-select-mobile"
          value={selectedProduct}
          onChange={(e) => onSelect(e.target.value as ProductId)}
          className="w-full rounded-xl border px-4 py-3 text-sm font-medium focus:outline-none"
          style={{
            borderColor: "#DEE2E6",
            color: "#1A1A2E",
            background: "#F8F9FA",
            fontSize: "16px",
            minHeight: "48px",
          }}
        >
          <option value="">— Select a Product —</option>
          {PRODUCT_GROUPS.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.ids.map((id) => (
                <option key={id} value={id}>
                  {PRODUCT_INFO[id].icon} {PRODUCT_INFO[id].name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {/* Desktop card grid */}
      <div className="hidden md:block space-y-6">
        {PRODUCT_GROUPS.map((group) => {
          const colors = platformColors[group.label.replace(" Platform", "")] || platformColors["IGEN COMMON"];
          return (
            <div key={group.label}>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: colors.bg, color: colors.text }}
                >
                  {group.label}
                </span>
                <div className="flex-1 h-px" style={{ background: colors.border, opacity: 0.25 }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.ids.map((id) => {
                  const product = PRODUCT_INFO[id];
                  const isSelected = selectedProduct === id;
                  return (
                    <button
                      key={id}
                      id={`product-card-${id}`}
                      onClick={() => onSelect(id)}
                      className="relative flex flex-col items-start text-left rounded-2xl p-5 transition-all duration-200 border-2 cursor-pointer w-full hover:shadow-md"
                      style={{
                        borderColor: isSelected ? "#0A2463" : "#DEE2E6",
                        background: isSelected ? "linear-gradient(135deg, #0A2463 0%, #1a3a8f 100%)" : "#fff",
                        boxShadow: isSelected
                          ? "0 6px 24px rgba(10, 36, 99, 0.18)"
                          : "0 2px 8px rgba(0,0,0,0.04)",
                        transform: isSelected ? "translateY(-2px)" : "none",
                        fontFamily: "inherit",
                        minHeight: "180px",
                      }}
                    >
                      {isSelected && (
                        <div
                          className="absolute top-4 right-4 h-5 w-5 rounded-full flex items-center justify-center text-xs"
                          style={{ background: "#E63946", color: "#fff", fontWeight: "bold" }}
                        >
                          ✓
                        </div>
                      )}
                      
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl shrink-0">{product.icon}</span>
                        <h3
                          className="text-base font-bold leading-tight"
                          style={{ color: isSelected ? "#fff" : "#0A2463", fontFamily: "'Poppins', sans-serif" }}
                        >
                          {product.name}
                        </h3>
                      </div>
                      
                      <p
                        className="text-xs leading-relaxed mb-4"
                        style={{ color: isSelected ? "#E2E8F0" : "#4A5568" }}
                      >
                        {product.description}
                      </p>
                      
                      <div
                        className="mt-auto w-full pt-3 flex items-center justify-between border-t border-dashed"
                        style={{ borderColor: isSelected ? "rgba(255,255,255,0.2)" : "#E2E8F0" }}
                      >
                        <span className="text-[10px] font-medium" style={{ color: isSelected ? "#F4A261" : "#718096" }}>
                          Fill: 4 steps (~60s)
                        </span>
                        <span
                          className="text-xs font-semibold flex items-center gap-0.5"
                          style={{ color: isSelected ? "#fff" : "#E63946" }}
                        >
                          Apply Now →
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
