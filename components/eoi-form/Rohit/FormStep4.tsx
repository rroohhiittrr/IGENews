"use client";

import { useState } from "react";
import { ProductId, PRODUCT_INFO, PRODUCT_GROUPS } from "./data/productData";
import { validateStep4, saveProgress } from "./utils/formUtils";

interface FormStep4Props {
  productId: ProductId;
  onComplete: (data: Record<string, unknown>) => void;
  onBack: () => void;
}

const REFERRAL_SOURCES = [
  "Associate SME Referral",
  "LinkedIn",
  "Facebook Ad",
  "Instagram",
  "Website",
  "Event",
  "WhatsApp",
  "Other",
];

export default function FormStep4({
  productId,
  onComplete,
  onBack,
}: FormStep4Props) {
  const product = PRODUCT_INFO[productId];

  const [form, setForm] = useState<{
    why_interested: string;
    goals: string;
    referral_source: string;
    referral_code: string;
    additional_products: string[];
    comments: string;
    consent: boolean;
  }>({
    why_interested: "",
    goals: "",
    referral_source: "",
    referral_code: "",
    additional_products: [productId],
    comments: "",
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const set = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const toggleProduct = (pid: string) => {
    setForm((prev) => {
      const already = prev.additional_products.includes(pid);
      return {
        ...prev,
        additional_products: already
          ? prev.additional_products.filter((p) => p !== pid)
          : [...prev.additional_products, pid],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateStep4(form as Record<string, unknown>);

    if (Object.keys(errs).length) {
      setErrors(errs);
      const firstKey = Object.keys(errs)[0];
      document.getElementById(`step4-${firstKey}`)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    setLoading(true);
    saveProgress(
      "step4",
      form as unknown as Record<string, string | string[] | boolean>
    );
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
          STEP 4 OF 4 — INTENT & GOALS
        </span>
        <h2
          className="text-xl md:text-2xl font-bold mb-1"
          style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463" }}
        >
          Almost There — Last Step.
        </h2>

        {product && (
          <div
            className="mt-2 p-3 rounded-xl text-xs font-semibold max-w-lg mx-auto"
            style={{
              background: "#FFF7ED",
              color: "#C2440E",
              border: "1px solid #FFEDD5",
            }}
          >
            💡 {product.stage4Hook}
          </div>
        )}
      </div>

      <div className="space-y-5">
        {/* Why interested */}
        <div>
          <label htmlFor="step4-why_interested" style={labelStyle}>
            Why are you interested in IGEN? <span style={{ color: "#E63946" }}>*</span>
          </label>
          <textarea
            id="step4-why_interested"
            rows={3}
            value={form.why_interested}
            onChange={(e) => set("why_interested", e.target.value)}
            placeholder="Tell us about your business goals and why IGEN..."
            style={{ ...inputStyle("why_interested"), minHeight: "auto", resize: "vertical" }}
          />
          <div className="flex justify-between mt-1 text-xs">
            {errors.why_interested ? (
              <span style={errorStyle}>{errors.why_interested}</span>
            ) : (
              <span />
            )}
            <span
              style={{
                color: form.why_interested.length >= 20 ? "#2A9D8F" : "#718096",
              }}
            >
              {form.why_interested.length}/20 min chars
            </span>
          </div>
        </div>

        {/* Goals */}
        <div>
          <label htmlFor="step4-goals" style={labelStyle}>
            What do you hope to achieve?{" "}
            <span className="text-xs font-normal text-slate-500">(optional)</span>
          </label>
          <textarea
            id="step4-goals"
            rows={2}
            value={form.goals}
            onChange={(e) => set("goals", e.target.value)}
            placeholder="What specific business outcome are you looking for?"
            style={{ ...inputStyle("goals"), minHeight: "auto", resize: "vertical" }}
          />
        </div>

        {/* How did you hear about IGEN? */}
        <div>
          <label htmlFor="step4-referral_source" style={labelStyle}>
            How did you hear about IGEN? <span style={{ color: "#E63946" }}>*</span>
          </label>
          <select
            id="step4-referral_source"
            value={form.referral_source}
            onChange={(e) => set("referral_source", e.target.value)}
            style={{ ...inputStyle("referral_source"), appearance: "none" }}
          >
            <option value="">— Select Source —</option>
            {REFERRAL_SOURCES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.referral_source && (
            <span style={errorStyle}>{errors.referral_source}</span>
          )}
        </div>

        {/* Referral / Coupon Code */}
        <div>
          <label htmlFor="step4-referral_code" style={labelStyle}>
            Referral / Coupon Code{" "}
            <span className="text-xs font-normal text-slate-500">(optional)</span>
          </label>
          <input
            id="step4-referral_code"
            type="text"
            value={form.referral_code}
            onChange={(e) => set("referral_code", e.target.value.toUpperCase())}
            placeholder="e.g. BLRSME15072"
            style={inputStyle("referral_code")}
          />
        </div>

        {/* 20-Product Multi-Select Grid */}
        <div>
          <label style={labelStyle}>
            Interested in more IGEN products?{" "}
            <span className="text-xs font-normal text-slate-500">(select any to add)</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto p-2 border border-slate-200 rounded-xl bg-slate-50">
            {PRODUCT_GROUPS.flatMap((g) => g.ids).map((pid) => {
              const pInfo = PRODUCT_INFO[pid];
              if (!pInfo) return null;
              const checked = form.additional_products.includes(pid);
              return (
                <button
                  key={pid}
                  type="button"
                  onClick={() => toggleProduct(pid)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-left transition-all border cursor-pointer"
                  style={{
                    borderColor: checked ? "#0A2463" : "#DEE2E6",
                    background: checked ? "#EEF2FF" : "#ffffff",
                    color: checked ? "#0A2463" : "#4A5568",
                    fontWeight: checked ? 700 : 500,
                  }}
                >
                  <span>{checked ? "✅" : "⬜"}</span>
                  <span className="text-base shrink-0">{pInfo.icon}</span>
                  <span className="truncate">{pInfo.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Questions or Comments */}
        <div>
          <label htmlFor="step4-comments" style={labelStyle}>
            Any questions or comments?{" "}
            <span className="text-xs font-normal text-slate-500">(optional)</span>
          </label>
          <textarea
            id="step4-comments"
            rows={2}
            value={form.comments}
            onChange={(e) => set("comments", e.target.value)}
            placeholder="Anything else you'd like our team to know?"
            style={{ ...inputStyle("comments"), minHeight: "auto", resize: "vertical" }}
          />
        </div>

        {/* Consent Checkbox */}
        <div>
          <button
            type="button"
            id="step4-consent"
            onClick={() => set("consent", !form.consent)}
            className="flex items-start gap-3 rounded-xl p-4 w-full text-left transition-all cursor-pointer border"
            style={{
              borderColor: errors.consent
                ? "#E63946"
                : form.consent
                ? "#2A9D8F"
                : "#DEE2E6",
              background: form.consent ? "#F0FDF9" : "#F8F9FA",
            }}
          >
            <div
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded text-xs font-bold text-white"
              style={{
                border: `2px solid ${form.consent ? "#2A9D8F" : "#CBD5E1"}`,
                background: form.consent ? "#2A9D8F" : "#ffffff",
              }}
            >
              {form.consent ? "✓" : ""}
            </div>
            <span className="text-xs md:text-sm text-slate-800">
              <span className="font-bold">
                I agree to be contacted by the IGEN team.
              </span>{" "}
              Your information is safe. No spam. No payment required.
            </span>
          </button>
          {errors.consent && (
            <span style={errorStyle}>{errors.consent}</span>
          )}
        </div>
      </div>

      {/* Final Submit CTA Button */}
      <button
        id="step4-final-submit"
        type="submit"
        disabled={loading}
        className="mt-8 w-full rounded-full py-4 text-base md:text-lg font-extrabold text-white transition-all duration-200 cursor-pointer shadow-xl"
        style={{
          background: loading
            ? "#9CA3AF"
            : "linear-gradient(135deg, #E63946 0%, #C1121F 100%)",
          boxShadow: "0 8px 32px rgba(230, 57, 70, 0.40)",
          minHeight: "60px",
        }}
      >
        {loading
          ? "Submitting Application…"
          : product?.stage4Cta || "🎉 Submit My IGEN Application"}
      </button>

      <p className="mt-2 text-center text-xs text-slate-500">
        By submitting, you agree to be contacted by the IGEN team. Your information is safe. No payment required.
      </p>

      <button
        type="button"
        onClick={onBack}
        className="mt-4 w-full text-center text-xs font-bold text-slate-500 hover:text-slate-800 underline cursor-pointer"
      >
        ← Back to Step 3
      </button>
    </form>
  );
}
