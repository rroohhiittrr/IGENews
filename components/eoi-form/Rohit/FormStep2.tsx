"use client";

import { useState, useEffect } from "react";
import { SECTOR_LIST, PRODUCT_INFO, ProductId } from "./data/productData";
import { validateStep2, saveProgress, loadCurrentSubmission } from "./utils/formUtils";

interface FormStep2Props {
  prefillSector?: string;
  onComplete: (data: Record<string, string>) => void;
  onBack: () => void;
}

const BUSINESS_CATEGORIES = [
  "Startup",
  "SME / MSME",
  "Large Enterprise",
  "Individual Professional",
  "Government Body",
];

const YEARS_OPTIONS = [
  "<1 year",
  "1–3 years",
  "3–5 years",
  "5–10 years",
  "10–20 years",
  "20+ years",
];

const TARGET_CITIES = [
  "Delhi",
  "Mumbai",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Ahmedabad",
  "All / Nationwide",
];

export default function FormStep2({
  prefillSector = "",
  onComplete,
  onBack,
}: FormStep2Props) {
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const stored = loadCurrentSubmission();
    if (stored?.meta?.product_id) {
      setProduct(PRODUCT_INFO[stored.meta.product_id as ProductId]);
    }
  }, []);

  const isAwardsOrConf =
    product &&
    ["vb_awards", "vb_conferences", "vb_expo", "igen_awards", "igen_conferences"].includes(
      product.category
    );

  const [form, setForm] = useState({
    company_name: "",
    industry_sector: prefillSector,
    designation: "",
    website: "",
    business_category: "",
    years_in_business: "",
    target_cities: [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const set = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const toggleTargetCity = (c: string) => {
    setForm((prev) => {
      const exists = prev.target_cities.includes(c);
      const updated = exists
        ? prev.target_cities.filter((item) => item !== c)
        : [...prev.target_cities, c];
      return { ...prev, target_cities: updated };
    });
    setErrors((prev) => ({ ...prev, target_cities: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check optional company name rule for individual professional
    let errs = validateStep2(form);
    if (
      form.business_category === "Individual Professional" &&
      errs.company_name
    ) {
      delete errs.company_name;
    }

    if (isAwardsOrConf && form.target_cities.length === 0) {
      errs.target_cities = "Please select at least one target city";
    }

    if (Object.keys(errs).length) {
      setErrors(errs);
      const firstKey = Object.keys(errs)[0];
      document.getElementById(`step2-${firstKey}`)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    setLoading(true);
    saveProgress("step2", {
      ...form,
      target_cities: form.target_cities.join(", "),
    });
    await new Promise((r) => setTimeout(r, 300));
    setLoading(false);
    onComplete({
      ...form,
      target_cities: form.target_cities.join(", "),
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
          STEP 2 OF 4 — BUSINESS DETAILS
        </span>
        <h2
          className="text-xl md:text-2xl font-bold mb-1"
          style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463" }}
        >
          Tell Us About Your Business
        </h2>

        {/* Product Stage 2 Hook */}
        {product && (
          <div
            className="mt-2 p-3 rounded-xl text-xs font-semibold max-w-lg mx-auto"
            style={{
              background: "#FFF7ED",
              color: "#C2440E",
              border: "1px solid #FFEDD5",
            }}
          >
            💡 {product.stage2Hook}
          </div>
        )}
      </div>

      {/* Auto-save header notice */}
      <div
        className="flex items-center gap-2 rounded-xl px-4 py-2.5 mb-6 text-xs md:text-sm font-semibold"
        style={{
          background: "#F0FDF9",
          border: "1px solid #6EE7B7",
          color: "#065F46",
        }}
      >
        🏁 Your progress is auto-saved. You can return anytime to complete your application.
      </div>

      <div className="space-y-4">
        {/* Company Name */}
        <div>
          <label htmlFor="step2-company_name" style={labelStyle}>
            Company / Organisation Name{" "}
            <span style={{ color: "#E63946" }}>*</span>
            {form.business_category === "Individual Professional" && (
              <span className="text-xs font-normal text-slate-500 ml-1">
                (optional for Individuals)
              </span>
            )}
          </label>
          <input
            id="step2-company_name"
            type="text"
            value={form.company_name}
            onChange={(e) => set("company_name", e.target.value)}
            placeholder="Your Company or Organisation"
            style={inputStyle("company_name")}
          />
          {errors.company_name && (
            <span style={errorStyle}>{errors.company_name}</span>
          )}
        </div>

        {/* Industry Sector */}
        <div>
          <label htmlFor="step2-industry_sector" style={labelStyle}>
            Industry Sector <span style={{ color: "#E63946" }}>*</span>
          </label>
          <select
            id="step2-industry_sector"
            value={form.industry_sector}
            onChange={(e) => set("industry_sector", e.target.value)}
            style={{ ...inputStyle("industry_sector"), appearance: "none" }}
          >
            <option value="">— Select Sector —</option>
            {SECTOR_LIST.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.industry_sector && (
            <span style={errorStyle}>{errors.industry_sector}</span>
          )}
        </div>

        {/* Role / Designation */}
        <div>
          <label htmlFor="step2-designation" style={labelStyle}>
            Your Role / Designation <span style={{ color: "#E63946" }}>*</span>
          </label>
          <input
            id="step2-designation"
            type="text"
            value={form.designation}
            onChange={(e) => set("designation", e.target.value)}
            placeholder="Founder / CEO / Director / Manager"
            style={inputStyle("designation")}
          />
          {errors.designation && (
            <span style={errorStyle}>{errors.designation}</span>
          )}
        </div>

        {/* Website URL */}
        <div>
          <label htmlFor="step2-website" style={labelStyle}>
            Website URL{" "}
            <span className="text-xs font-normal text-slate-500">(optional)</span>
          </label>
          <input
            id="step2-website"
            type="url"
            value={form.website}
            onChange={(e) => set("website", e.target.value)}
            placeholder="www.yourcompany.com"
            style={inputStyle("website")}
          />
        </div>

        {/* Business Category Pill Toggles */}
        <div>
          <label style={labelStyle}>
            Business Category <span style={{ color: "#E63946" }}>*</span>
          </label>
          <div className="flex flex-wrap gap-2 mt-1">
            {BUSINESS_CATEGORIES.map((cat) => {
              const isSelected = form.business_category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => set("business_category", cat)}
                  className="rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer border"
                  style={{
                    borderColor: isSelected ? "#0A2463" : "#DEE2E6",
                    background: isSelected ? "#0A2463" : "#ffffff",
                    color: isSelected ? "#ffffff" : "#4A5568",
                  }}
                >
                  {isSelected && "✓ "}
                  {cat}
                </button>
              );
            })}
          </div>
          {errors.business_category && (
            <span style={errorStyle}>{errors.business_category}</span>
          )}
        </div>

        {/* Years in Business */}
        <div>
          <label htmlFor="step2-years_in_business" style={labelStyle}>
            Years in Business / Industry{" "}
            <span style={{ color: "#E63946" }}>*</span>
          </label>
          <select
            id="step2-years_in_business"
            value={form.years_in_business}
            onChange={(e) => set("years_in_business", e.target.value)}
            style={{ ...inputStyle("years_in_business"), appearance: "none" }}
          >
            <option value="">— Select Years —</option>
            {YEARS_OPTIONS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          {errors.years_in_business && (
            <span style={errorStyle}>{errors.years_in_business}</span>
          )}
        </div>

        {/* Conditional Target Cities for Awards & Conferences */}
        {isAwardsOrConf && (
          <div id="step2-target_cities">
            <label style={labelStyle}>
              Target City / Cities (confirm event presence){" "}
              <span style={{ color: "#E63946" }}>*</span>
            </label>
            <div className="flex flex-wrap gap-2 mt-1">
              {TARGET_CITIES.map((c) => {
                const active = form.target_cities.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleTargetCity(c)}
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
            {errors.target_cities && (
              <span style={errorStyle}>{errors.target_cities}</span>
            )}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full px-6 py-3.5 text-sm font-bold border transition-all cursor-pointer"
          style={{
            borderColor: "#DEE2E6",
            color: "#4A5568",
            background: "#ffffff",
          }}
        >
          ← Back
        </button>

        <button
          id="step2-submit"
          type="submit"
          disabled={loading}
          className="flex-1 rounded-full py-4 text-base font-extrabold text-white transition-all duration-200 cursor-pointer shadow-lg"
          style={{
            background: loading
              ? "#9CA3AF"
              : "linear-gradient(135deg, #E63946 0%, #C1121F 100%)",
            boxShadow: "0 4px 18px rgba(230, 57, 70, 0.35)",
          }}
        >
          {loading
            ? "Saving…"
            : product?.stage2Cta || "Continue → (Step 2 of 4)"}
        </button>
      </div>
    </form>
  );
}
