"use client";

import { ProductId, PRODUCT_INFO } from "./data/productData";

interface ProductInfoPanelProps {
  productId: ProductId;
  onBeginApplication: () => void;
}

const platformBadgeStyle: Record<string, { bg: string; text: string }> = {
  "IGEN NEWS": { bg: "#EEF2FF", text: "#0A2463" },
  "IGEN EXPO": { bg: "#FFF7ED", text: "#C2440E" },
  "IGEN COMMON": { bg: "#F0FDF9", text: "#065F46" },
};

export default function ProductInfoPanel({ productId, onBeginApplication }: ProductInfoPanelProps) {
  const product = PRODUCT_INFO[productId];
  const badge = platformBadgeStyle[product.platform] || platformBadgeStyle["IGEN COMMON"];

  return (
    <div
      id="product-info-panel"
      className="rounded-2xl overflow-hidden animate-fadeIn"
      style={{
        border: "2px solid #0A2463",
        boxShadow: "0 8px 32px rgba(10, 36, 99, 0.12)",
        background: "#fff",
      }}
    >
      {/* Header gradient bar */}
      <div
        className="h-1.5 w-full"
        style={{ background: "linear-gradient(90deg, #0A2463, #E63946, #F4A261)" }}
      />

      <div className="p-5 md:p-7">
        {/* Product header */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-3xl"
            style={{ background: "#EEF2FF" }}
          >
            {product.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3
                className="text-xl font-bold"
                style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463" }}
              >
                {product.name}
              </h3>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: badge.bg, color: badge.text }}
              >
                {product.platform}
              </span>
            </div>
            <p className="text-sm font-semibold italic" style={{ color: "#1A1A2E" }}>
              "{product.headline}"
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#6C757D" }}>
            Your Benefits
          </p>
          <ul className="space-y-2">
            {product.benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                  style={{ background: "#2A9D8F", color: "#fff" }}
                >
                  ✓
                </span>
                <span className="text-sm" style={{ color: "#1A1A2E" }}>
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* FOMO strip */}
        <div
          className="flex items-start gap-3 rounded-xl p-3 mb-5"
          style={{ background: "#FFF1F2", border: "1px solid #FECDD3" }}
        >
          <span className="text-base shrink-0">🔴</span>
          <p className="text-sm font-semibold" style={{ color: "#E63946" }}>
            {product.fomo}
          </p>
        </div>

        {/* CTA */}
        <button
          id="begin-application-btn"
          onClick={onBeginApplication}
          className="w-full rounded-full py-3.5 text-base font-bold text-white transition-all duration-200"
          style={{
            background: "linear-gradient(135deg, #E63946 0%, #c0392b 100%)",
            boxShadow: "0 4px 18px rgba(230, 57, 70, 0.35)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 24px rgba(230, 57, 70, 0.45)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 18px rgba(230, 57, 70, 0.35)";
          }}
        >
          → {product.cta}
        </button>

        <p className="mt-2 text-center text-xs" style={{ color: "#6C757D" }}>
          Takes less than 5 minutes. No payment. No commitment.
        </p>
      </div>
    </div>
  );
}
