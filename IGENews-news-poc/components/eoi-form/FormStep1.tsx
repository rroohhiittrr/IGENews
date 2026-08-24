"use client";

import { useState } from "react";
import { ProductId, PRODUCT_INFO, PRODUCT_GROUPS, SECTOR_LIST } from "./data/productData";
import { validateStep1, saveProgress } from "./utils/formUtils";

interface FormStep1Props {
  selectedProduct: ProductId | "";
  prefillCity?: string;
  onComplete: (data: Record<string, string>) => void;
  onToast: (msg: string) => void;
}

export default function FormStep1({ selectedProduct, prefillCity = "", onComplete, onToast }: FormStep1Props) {
  const [form, setForm] = useState({
    full_name: "",
    mobile: "",
    email: "",
    city: prefillCity,
    interested_in: selectedProduct,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const set = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateStep1(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      // Scroll to first error
      const firstKey = Object.keys(errs)[0];
      document.getElementById(`step1-${firstKey}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setLoading(true);
    saveProgress("step1", form);
    await new Promise((r) => setTimeout(r, 400));
    setLoading(false);
    onToast("✅ You're in! Your application has been saved. Continue to Step 2.");
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
    fontFamily: "'Inter', sans-serif",
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
        <p
          className="text-xs font-bold uppercase tracking-widest mb-1"
          style={{ color: "#E63946" }}
        >
          Step 1 of 4
        </p>
        <h2
          className="text-xl font-bold"
          style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463" }}
        >
          Let&apos;s Start. Just 20 Seconds.
        </h2>
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
            onFocus={(e) => { e.target.style.borderColor = "#0A2463"; e.target.style.boxShadow = "0 0 0 3px rgba(10,36,99,0.12)"; }}
            onBlur={(e) => { e.target.style.borderColor = errors.full_name ? "#E63946" : "#DEE2E6"; e.target.style.boxShadow = "none"; }}
          />
          {errors.full_name && <span style={errorStyle}>{errors.full_name}</span>}
        </div>

        {/* Mobile */}
        <div>
          <label htmlFor="step1-mobile" style={labelStyle}>
            Mobile Number <span style={{ color: "#E63946" }}>*</span>
          </label>
          <div className="flex gap-2">
            <div
              className="flex items-center justify-center rounded-xl px-3 text-sm font-medium shrink-0"
              style={{ border: "1.5px solid #DEE2E6", background: "#F8F9FA", color: "#6C757D", minHeight: "48px" }}
            >
              🇮🇳 +91
            </div>
            <input
              id="step1-mobile"
              type="tel"
              value={form.mobile}
              onChange={(e) => set("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="10-digit mobile number"
              inputMode="numeric"
              style={{ ...inputStyle("mobile"), flex: 1 }}
              onFocus={(e) => { e.target.style.borderColor = "#0A2463"; e.target.style.boxShadow = "0 0 0 3px rgba(10,36,99,0.12)"; }}
              onBlur={(e) => { e.target.style.borderColor = errors.mobile ? "#E63946" : "#DEE2E6"; e.target.style.boxShadow = "none"; }}
            />
          </div>
          {errors.mobile && <span style={errorStyle}>{errors.mobile}</span>}
        </div>

        {/* Email */}
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
            onFocus={(e) => { e.target.style.borderColor = "#0A2463"; e.target.style.boxShadow = "0 0 0 3px rgba(10,36,99,0.12)"; }}
            onBlur={(e) => { e.target.style.borderColor = errors.email ? "#E63946" : "#DEE2E6"; e.target.style.boxShadow = "none"; }}
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
            onFocus={(e) => { e.target.style.borderColor = "#0A2463"; e.target.style.boxShadow = "0 0 0 3px rgba(10,36,99,0.12)"; }}
            onBlur={(e) => { e.target.style.borderColor = errors.city ? "#E63946" : "#DEE2E6"; e.target.style.boxShadow = "none"; }}
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
            onFocus={(e) => { e.target.style.borderColor = "#0A2463"; e.target.style.boxShadow = "0 0 0 3px rgba(10,36,99,0.12)"; }}
            onBlur={(e) => { e.target.style.borderColor = errors.interested_in ? "#E63946" : "#DEE2E6"; e.target.style.boxShadow = "none"; }}
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
          {errors.interested_in && <span style={errorStyle}>{errors.interested_in}</span>}
        </div>
      </div>

      {/* Submit */}
      <button
        id="step1-submit"
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-full py-4 text-base font-bold text-white transition-all duration-200"
        style={{
          background: loading ? "#9CA3AF" : "linear-gradient(135deg, #E63946 0%, #c0392b 100%)",
          boxShadow: "0 4px 18px rgba(230, 57, 70, 0.30)",
          minHeight: "56px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Saving…" : "Continue → (Step 1 of 4)"}
      </button>
    </form>
  );
}
