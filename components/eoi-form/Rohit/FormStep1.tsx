"use client";

import { useState } from "react";
import { ProductId, PRODUCT_INFO, PRODUCT_GROUPS } from "./data/productData";
import { validateStep1, saveProgress } from "./utils/formUtils";

interface FormStep1Props {
  selectedProduct: ProductId | "";
  prefillCity?: string;
  onComplete: (data: Record<string, string>) => void;
  onToast: (msg: string) => void;
}

const EVENT_CITIES = [
  "Delhi",
  "Mumbai",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Ahmedabad",
  "All / No preference",
];

export default function FormStep1({
  selectedProduct,
  prefillCity = "",
  onComplete,
  onToast,
}: FormStep1Props) {
  const product = selectedProduct ? PRODUCT_INFO[selectedProduct] : null;
  const isAwardsOrConf =
    product &&
    ["vb_awards", "vb_conferences", "vb_expo", "igen_awards", "igen_conferences"].includes(
      product.category
    );

  const [form, setForm] = useState({
    full_name: "",
    mobile: "",
    email: "",
    city: prefillCity,
    interested_in: selectedProduct,
    event_cities: [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const set = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const toggleEventCity = (c: string) => {
    setForm((prev) => {
      const exists = prev.event_cities.includes(c);
      const updated = exists
        ? prev.event_cities.filter((item) => item !== c)
        : [...prev.event_cities, c];
      return { ...prev, event_cities: updated };
    });
    setErrors((prev) => ({ ...prev, event_cities: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateStep1(form);

    if (isAwardsOrConf && form.event_cities.length === 0) {
      errs.event_cities = "Please select at least one event city";
    }

    if (Object.keys(errs).length) {
      setErrors(errs);
      const firstKey = Object.keys(errs)[0];
      document.getElementById(`step1-${firstKey}`)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    setLoading(true);
    saveProgress("step1", {
      ...form,
      event_cities: form.event_cities.join(", "),
    });
    await new Promise((r) => setTimeout(r, 300));
    setLoading(false);
    onToast("✅ You're in! Your application progress is saved. Continue to Step 2.");
    onComplete({
      ...form,
      event_cities: form.event_cities.join(", "),
    });
  };

  const inputStyle = (fieldKey: string): React.CSSProperties => ({
    width: "100%",
    minHeight: "48px",
    fontSize: "16px",
    padding: "12px 16px",
    border: `1.5px solid ${errors[fieldKey] ? "#E63946" : "#DEE2E6"}`,
    borderRadius: "12px",
    outline: "none",
    background: "#F8F9FA",
    color: "#1A1A2E",
    fontFamily: "'Inter', sans-serif",
  });

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "14px",
    fontWeight: 600,
    marginBottom: "6px",
    color: "#1A1A2E",
  };

  const errorStyle: React.CSSProperties = {
    display: "block",
    fontSize: "12px",
    color: "#E63946",
    marginTop: "4px",
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-6 text-center">
        <span
          className="inline-block text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-2"
          style={{ background: "#EEF2FF", color: "#0A2463" }}
        >
          STEP 1 OF 4 — QUICK ENTRY
        </span>
        <h2
          className="text-xl md:text-2xl font-bold mb-1"
          style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463" }}
        >
          Let&apos;s Start. Just 20 Seconds.
        </h2>

        {/* Stage 1 Persuasive Hook */}
        {product && (
          <div
            className="mt-3 p-3 rounded-xl text-xs font-semibold max-w-lg mx-auto"
            style={{
              background: "#FFF7ED",
              color: "#C2440E",
              border: "1px solid #FFEDD5",
            }}
          >
            💡 {product.stage1Hook}
          </div>
        )}
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="step1-full_name" style={labelStyle}>
            Full Name <span style={{ color: "#E63946" }}>*</span>
          </label>
          <input
            id="step1-full_name"
            type="text"
            value={form.full_name}
            onChange={(e) => set("full_name", e.target.value)}
            placeholder="Your Full Name"
            style={inputStyle("full_name")}
          />
          {errors.full_name && <span style={errorStyle}>{errors.full_name}</span>}
        </div>

        {/* Mobile Number */}
        <div>
          <label htmlFor="step1-mobile" style={labelStyle}>
            Mobile Number <span style={{ color: "#E63946" }}>*</span>
          </label>
          <div className="flex gap-2">
            <div
              className="flex items-center justify-center rounded-xl px-3 text-sm font-medium shrink-0"
              style={{
                border: "1.5px solid #DEE2E6",
                background: "#F8F9FA",
                color: "#6C757D",
                minHeight: "48px",
              }}
            >
              🇮🇳 +91
            </div>
            <input
              id="step1-mobile"
              type="tel"
              value={form.mobile}
              onChange={(e) =>
                set("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              placeholder="10-digit mobile number"
              inputMode="numeric"
              style={{ ...inputStyle("mobile"), flex: 1 }}
            />
          </div>
          {errors.mobile && <span style={errorStyle}>{errors.mobile}</span>}
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="step1-email" style={labelStyle}>
            Email Address <span style={{ color: "#E63946" }}>*</span>
          </label>
          <input
            id="step1-email"
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="your@email.com"
            style={inputStyle("email")}
          />
          {errors.email && <span style={errorStyle}>{errors.email}</span>}
        </div>

        {/* City */}
        <div>
          <label htmlFor="step1-city" style={labelStyle}>
            City <span style={{ color: "#E63946" }}>*</span>
          </label>
          <input
            id="step1-city"
            type="text"
            value={form.city}
            onChange={(e) => set("city", e.target.value)}
            placeholder="Your City"
            style={inputStyle("city")}
          />
          {errors.city && <span style={errorStyle}>{errors.city}</span>}
        </div>

        {/* Interested In */}
        <div>
          <label htmlFor="step1-interested_in" style={labelStyle}>
            Interested In <span style={{ color: "#E63946" }}>*</span>
          </label>
          <select
            id="step1-interested_in"
            value={form.interested_in}
            onChange={(e) => set("interested_in", e.target.value)}
            style={{ ...inputStyle("interested_in"), appearance: "none" }}
          >
            <option value="">— Select a Product —</option>
            {PRODUCT_GROUPS.map((group) => (
              <optgroup key={group.category} label={group.label}>
                {group.ids.map((id) => (
                  <option key={id} value={id}>
                    {PRODUCT_INFO[id]?.icon} {PRODUCT_INFO[id]?.name} ({PRODUCT_INFO[id]?.code})
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          {errors.interested_in && (
            <span style={errorStyle}>{errors.interested_in}</span>
          )}
        </div>

        {/* Conditional Event City for Awards & Conferences */}
        {isAwardsOrConf && (
          <div id="step1-event_cities">
            <label style={labelStyle}>
              Target Event City / Cities <span style={{ color: "#E63946" }}>*</span>
            </label>
            <div className="flex flex-wrap gap-2 mt-1">
              {EVENT_CITIES.map((c) => {
                const active = form.event_cities.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleEventCity(c)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border"
                    style={{
                      background: active ? "#0A2463" : "#F8F9FA",
                      color: active ? "#ffffff" : "#4A5568",
                      borderColor: active ? "#0A2463" : "#DEE2E6",
                    }}
                  >
                    {active && "✓ "}
                    {c}
                  </button>
                );
              })}
            </div>
            {errors.event_cities && (
              <span style={errorStyle}>{errors.event_cities}</span>
            )}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        id="step1-submit"
        type="submit"
        disabled={loading}
        className="mt-8 w-full rounded-full py-4 text-base font-extrabold text-white transition-all duration-200 cursor-pointer shadow-lg"
        style={{
          background: loading
            ? "#9CA3AF"
            : "linear-gradient(135deg, #E63946 0%, #C1121F 100%)",
          boxShadow: "0 4px 18px rgba(230, 57, 70, 0.35)",
        }}
      >
        {loading
          ? "Saving…"
          : product?.stage1Cta || "Continue → (Step 1 of 4)"}
      </button>
    </form>
  );
}
