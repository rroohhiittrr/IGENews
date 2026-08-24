"use client";

import { useState } from "react";
import { SECTOR_LIST } from "./data/productData";
import { validateStep2, saveProgress } from "./utils/formUtils";

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
  "Less than 1 year",
  "1–3 years",
  "3–5 years",
  "5–10 years",
  "10–20 years",
  "20+ years",
];

export default function FormStep2({ prefillSector = "", onComplete, onBack }: FormStep2Props) {
  const [form, setForm] = useState({
    company_name: "",
    industry_sector: prefillSector,
    designation: "",
    website: "",
    business_category: "",
    years_in_business: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const set = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateStep2(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      const firstKey = Object.keys(errs)[0];
      document.getElementById(`step2-${firstKey}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setLoading(true);
    saveProgress("step2", form);
    await new Promise((r) => setTimeout(r, 400));
    setLoading(false);
    onComplete(form);
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
    transition: "border-color 0.2s, box-shadow 0.2s",
  });

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "14px",
    fontWeight: 500,
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
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#E63946" }}>
          Step 2 of 4
        </p>
        <h2 className="text-xl font-bold" style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463" }}>
          Tell Us About Your Business
        </h2>
      </div>

      {/* Auto-save reminder */}
      <div
        className="flex items-center gap-2 rounded-xl px-4 py-2.5 mb-5 text-sm"
        style={{ background: "#F0FDF9", border: "1px solid #6EE7B7", color: "#065F46" }}
      >
        💾 Your progress is auto-saved. You can return anytime to complete your application.
      </div>

      <div className="space-y-4">
        {/* Company Name */}
        <div>
          <label htmlFor="step2-company_name" style={labelStyle}>
            Company / Organisation Name <span style={{ color: "#E63946" }}>*</span>
          </label>
          <input
            id="step2-company_name"
            type="text"
            value={form.company_name}
            onChange={(e) => set("company_name", e.target.value)}
            placeholder="Your Company or Organisation"
            style={inputStyle("company_name")}
            onFocus={(e) => { e.target.style.borderColor = "#0A2463"; e.target.style.boxShadow = "0 0 0 3px rgba(10,36,99,0.12)"; }}
            onBlur={(e) => { e.target.style.borderColor = errors.company_name ? "#E63946" : "#DEE2E6"; e.target.style.boxShadow = "none"; }}
          />
          {errors.company_name && <span style={errorStyle}>{errors.company_name}</span>}
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
            onFocus={(e) => { e.target.style.borderColor = "#0A2463"; e.target.style.boxShadow = "0 0 0 3px rgba(10,36,99,0.12)"; }}
            onBlur={(e) => { e.target.style.borderColor = errors.industry_sector ? "#E63946" : "#DEE2E6"; e.target.style.boxShadow = "none"; }}
          >
            <option value="">— Select Sector —</option>
            {SECTOR_LIST.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.industry_sector && <span style={errorStyle}>{errors.industry_sector}</span>}
        </div>

        {/* Designation */}
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
            onFocus={(e) => { e.target.style.borderColor = "#0A2463"; e.target.style.boxShadow = "0 0 0 3px rgba(10,36,99,0.12)"; }}
            onBlur={(e) => { e.target.style.borderColor = errors.designation ? "#E63946" : "#DEE2E6"; e.target.style.boxShadow = "none"; }}
          />
          {errors.designation && <span style={errorStyle}>{errors.designation}</span>}
        </div>

        {/* Website */}
        <div>
          <label htmlFor="step2-website" style={labelStyle}>
            Website URL <span style={{ color: "#6C757D", fontSize: "12px" }}>(optional)</span>
          </label>
          <input
            id="step2-website"
            type="url"
            value={form.website}
            onChange={(e) => set("website", e.target.value)}
            placeholder="www.yourcompany.com"
            style={inputStyle("website")}
            onFocus={(e) => { e.target.style.borderColor = "#0A2463"; e.target.style.boxShadow = "0 0 0 3px rgba(10,36,99,0.12)"; }}
            onBlur={(e) => { e.target.style.borderColor = "#DEE2E6"; e.target.style.boxShadow = "none"; }}
          />
        </div>

        {/* Business Category */}
        <div>
          <label style={labelStyle}>
            Business Category <span style={{ color: "#E63946" }}>*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {BUSINESS_CATEGORIES.map((cat) => {
              const isSelected = form.business_category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  id={`step2-biz-${cat.replace(/\s/g, "-")}`}
                  onClick={() => set("business_category", cat)}
                  className="rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-150"
                  style={{
                    border: `1.5px solid ${isSelected ? "#0A2463" : "#DEE2E6"}`,
                    background: isSelected ? "#0A2463" : "#fff",
                    color: isSelected ? "#fff" : "#1A1A2E",
                    boxShadow: isSelected ? "0 2px 8px rgba(10,36,99,0.20)" : "none",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          {errors.business_category && <span style={errorStyle}>{errors.business_category}</span>}
        </div>

        {/* Years in Business */}
        <div>
          <label htmlFor="step2-years_in_business" style={labelStyle}>
            Years in Business / Industry <span style={{ color: "#E63946" }}>*</span>
          </label>
          <select
            id="step2-years_in_business"
            value={form.years_in_business}
            onChange={(e) => set("years_in_business", e.target.value)}
            style={{ ...inputStyle("years_in_business"), appearance: "none" }}
            onFocus={(e) => { e.target.style.borderColor = "#0A2463"; e.target.style.boxShadow = "0 0 0 3px rgba(10,36,99,0.12)"; }}
            onBlur={(e) => { e.target.style.borderColor = errors.years_in_business ? "#E63946" : "#DEE2E6"; e.target.style.boxShadow = "none"; }}
          >
            <option value="">— Select Years —</option>
            {YEARS_OPTIONS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          {errors.years_in_business && <span style={errorStyle}>{errors.years_in_business}</span>}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full px-5 py-3 text-sm font-semibold transition-all"
          style={{ border: "1.5px solid #DEE2E6", color: "#6C757D", background: "#fff", minHeight: "48px" }}
        >
          ← Back
        </button>
        <button
          id="step2-submit"
          type="submit"
          disabled={loading}
          className="flex-1 rounded-full py-3 text-base font-bold text-white transition-all duration-200"
          style={{
            background: loading ? "#9CA3AF" : "linear-gradient(135deg, #E63946 0%, #c0392b 100%)",
            boxShadow: "0 4px 18px rgba(230, 57, 70, 0.30)",
            minHeight: "56px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Saving…" : "Continue → (Step 2 of 4)"}
        </button>
      </div>
    </form>
  );
}
