"use client";

import { useState } from "react";
import {
  ProductId,
  CategoryId,
  CATEGORIES,
  PRODUCT_INFO,
  PRODUCT_GROUPS,
} from "./data/productData";

interface ProductSelectorProps {
  selectedProduct: ProductId | "";
  onSelect: (id: ProductId) => void;
}

export default function ProductSelector({
  selectedProduct,
  onSelect,
}: ProductSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");

  const filteredGroups =
    activeCategory === "all"
      ? PRODUCT_GROUPS
      : PRODUCT_GROUPS.filter((g) => g.category === activeCategory);

  return (
    <div id="product-selector" className="w-full">
      {/* Category Navigation Tabs */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 p-1.5 rounded-2xl bg-white shadow-sm border border-gray-200 max-w-4xl mx-auto">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-200 cursor-pointer"
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, #0A2463, #1a3a8f)"
                    : "transparent",
                  color: isActive ? "#fff" : "#4A5568",
                  boxShadow: isActive
                    ? "0 4px 14px rgba(10, 36, 99, 0.25)"
                    : "none",
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Card Grid (20 Cards) */}
      <div className="space-y-8">
        {filteredGroups.map((group) => (
          <div key={group.category} className="space-y-4">
            <div className="flex items-center gap-3">
              <span
                className="text-xs font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full"
                style={{ background: "#0A2463", color: "#fff" }}
              >
                {group.label}
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {group.ids.map((id) => {
                const product = PRODUCT_INFO[id];
                if (!product) return null;
                const isSelected = selectedProduct === id;

                return (
                  <button
                    key={id}
                    id={`product-card-${id}`}
                    onClick={() => onSelect(id)}
                    className="relative flex flex-col items-start text-left rounded-2xl p-5 transition-all duration-200 border-2 cursor-pointer w-full hover:shadow-lg group"
                    style={{
                      borderColor: isSelected ? "#0A2463" : "#E2E8F0",
                      background: isSelected
                        ? "linear-gradient(135deg, #0A2463 0%, #173275 100%)"
                        : "#ffffff",
                      boxShadow: isSelected
                        ? "0 8px 24px rgba(10, 36, 99, 0.20)"
                        : "0 2px 8px rgba(0,0,0,0.04)",
                      transform: isSelected ? "translateY(-2px)" : "none",
                    }}
                  >
                    {/* Selected badge */}
                    {isSelected && (
                      <div
                        className="absolute top-4 right-4 h-6 w-6 rounded-full flex items-center justify-center text-xs font-extrabold text-white"
                        style={{ background: "#E63946" }}
                      >
                        ✓
                      </div>
                    )}

                    {/* Icon + Product Name + Code */}
                    <div className="flex items-center gap-3 mb-2.5 pr-6">
                      <span className="text-3xl shrink-0">{product.icon}</span>
                      <div>
                        <span
                          className="text-[10px] font-extrabold uppercase tracking-widest px-1.5 py-0.5 rounded"
                          style={{
                            background: isSelected
                              ? "rgba(255,255,255,0.15)"
                              : "#EDF2F7",
                            color: isSelected ? "#F4A261" : "#718096",
                          }}
                        >
                          {product.code}
                        </span>
                        <h3
                          className="text-base font-bold leading-snug"
                          style={{
                            color: isSelected ? "#ffffff" : "#0A2463",
                            fontFamily: "'Poppins', sans-serif",
                          }}
                        >
                          {product.name}
                        </h3>
                      </div>
                    </div>

                    {/* About line */}
                    <p
                      className="text-xs leading-relaxed mb-3 line-clamp-2"
                      style={{ color: isSelected ? "#E2E8F0" : "#4A5568" }}
                    >
                      {product.about}
                    </p>

                    {/* Card hook */}
                    <div
                      className="text-xs font-semibold p-2.5 rounded-xl mb-4 w-full"
                      style={{
                        background: isSelected
                          ? "rgba(244, 162, 97, 0.15)"
                          : "#FFF7ED",
                        color: isSelected ? "#F4A261" : "#C2440E",
                        border: isSelected
                          ? "1px solid rgba(244, 162, 97, 0.3)"
                          : "1px solid #FFEDD5",
                      }}
                    >
                      💡 {product.cardHook}
                    </div>

                    {/* Metadata + CTA */}
                    <div
                      className="mt-auto w-full pt-3 flex items-center justify-between border-t border-dashed"
                      style={{
                        borderColor: isSelected
                          ? "rgba(255,255,255,0.2)"
                          : "#E2E8F0",
                      }}
                    >
                      <span
                        className="text-[10px] font-medium"
                        style={{ color: isSelected ? "rgba(255,255,255,0.7)" : "#718096" }}
                      >
                        Fill: 4 steps (~60s)
                      </span>
                      <span
                        className="text-xs font-extrabold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                        style={{ color: isSelected ? "#ffffff" : "#E63946" }}
                      >
                        {product.cardCta} →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
