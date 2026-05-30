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
  "WhatsApp",
  "LinkedIn",
  "Google Search",
  "Friend / Colleague Referral",
  "IGEN Team Member",
  "Event / Exhibition",
  "Email Campaign",
  "Other",
];

export default function FormStep4({ productId, onComplete, onBack }: FormStep4Props) {
  const [form, setForm] = useState<{
    why_interested: string;
    goals: string;
    referral_source: string;
    referral_name: string;
    additional_products: string[];
    comments: string;
    consent: boolean;
  }>({
    why_interested: "",
    goals: "",
    referral_source: "",
    referral_name: "",
    additional_products: [productId],
    comments: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const showReferralName =
    form.referral_source === "Friend / Colleague Referral" ||
    form.referral_source === "IGEN Team Member";

  const set = (key: string, value: string | boolean) => {
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
      document.getElementById(`step4-${firstKey}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setLoading(true);
    saveProgress("step4", form as unknown as Record<string, string | string[] | boolean>);
    await new Promise((r) => setTimeout(r, 500));
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
          Step 4 of 4
        </p>
        <h2 className="text-xl font-bold" style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463" }}>
          Almost Done! Tell Us Your Goals.
        </h2>
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
            placeholder="Tell us what excites you about IGEN..."
            style={{ ...inputStyle("why_interested"), minHeight: "auto", resize: "vertical" }}
            onFocus={(e) => { e.target.style.borderColor = "#0A2463"; e.target.style.boxShadow = "0 0 0 3px rgba(10,36,99,0.12)"; }}
            onBlur={(e) => { e.target.style.borderColor = errors.why_interested ? "#E63946" : "#DEE2E6"; e.target.style.boxShadow = "none"; }}
          />
          <div className="flex justify-between mt-1">
            {errors.why_interested && <span style={errorStyle}>{errors.why_interested}</span>}
            <span className="ml-auto text-xs" style={{ color: form.why_interested.length >= 20 ? "#2A9D8F" : "#6C757D" }}>
              {form.why_interested.length}/20 min
            </span>
          </div>
        </div>

        {/* Goals */}
        <div>
          <label htmlFor="step4-goals" style={labelStyle}>
            What do you hope to achieve? <span style={{ color: "#6C757D", fontSize: "12px" }}>(optional)</span>
          </label>
          <textarea
            id="step4-goals"
            rows={2}
            value={form.goals}
            onChange={(e) => set("goals", e.target.value)}
            placeholder="What business outcome are you looking for?"
            style={{ ...inputStyle("goals"), minHeight: "auto", resize: "vertical" }}
            onFocus={(e) => { e.target.style.borderColor = "#0A2463"; e.target.style.boxShadow = "0 0 0 3px rgba(10,36,99,0.12)"; }}
            onBlur={(e) => { e.target.style.borderColor = "#DEE2E6"; e.target.style.boxShadow = "none"; }}
          />
        </div>

        {/* Referral source */}
        <div>
          <label htmlFor="step4-referral_source" style={labelStyle}>
            How did you hear about IGEN? <span style={{ color: "#E63946" }}>*</span>
          </label>
          <select
            id="step4-referral_source"
            value={form.referral_source}
            onChange={(e) => set("referral_source", e.target.value)}
            style={{ ...inputStyle("referral_source"), appearance: "none" }}
            onFocus={(e) => { e.target.style.borderColor = "#0A2463"; e.target.style.boxShadow = "0 0 0 3px rgba(10,36,99,0.12)"; }}
            onBlur={(e) => { e.target.style.borderColor = errors.referral_source ? "#E63946" : "#DEE2E6"; e.target.style.boxShadow = "none"; }}
          >
            <option value="">— Select —</option>
            {REFERRAL_SOURCES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.referral_source && <span style={errorStyle}>{errors.referral_source}</span>}
        </div>

        {/* Referral name (conditional) */}
        {showReferralName && (
          <div>
            <label htmlFor="step4-referral_name" style={labelStyle}>
              Referral Name <span style={{ color: "#6C757D", fontSize: "12px" }}>(optional)</span>
            </label>
            <input
              id="step4-referral_name"
              type="text"
              value={form.referral_name}
              onChange={(e) => set("referral_name", e.target.value)}
              placeholder="Name of person who referred you"
              style={inputStyle("referral_name")}
              onFocus={(e) => { e.target.style.borderColor = "#0A2463"; e.target.style.boxShadow = "0 0 0 3px rgba(10,36,99,0.12)"; }}
              onBlur={(e) => { e.target.style.borderColor = "#DEE2E6"; e.target.style.boxShadow = "none"; }}
            />
          </div>
        )}

        {/* Additional products */}
        <div>
          <label style={labelStyle}>
            Interested in more than one IGEN product?{" "}
            <span style={{ color: "#6C757D", fontSize: "12px" }}>(optional)</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {PRODUCT_GROUPS.flatMap((g) => g.ids).map((pid) => {
              const pInfo = PRODUCT_INFO[pid];
              const checked = form.additional_products.includes(pid);
              return (
                <button
                  key={pid}
                  type="button"
                  onClick={() => toggleProduct(pid)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-left transition-all"
                  style={{
                    border: `1.5px solid ${checked ? "#2A9D8F" : "#DEE2E6"}`,
                    background: checked ? "#F0FDF9" : "#fff",
                    color: "#1A1A2E",
                  }}
                >
                  <span style={{ fontSize: "11px" }}>{checked ? "✅" : "⬜"}</span>
                  <span className="text-sm">{pInfo.icon} {pInfo.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Comments */}
        <div>
          <label htmlFor="step4-comments" style={labelStyle}>
            Any questions or comments?{" "}
            <span style={{ color: "#6C757D", fontSize: "12px" }}>(optional)</span>
          </label>
          <textarea
            id="step4-comments"
            rows={2}
            value={form.comments}
            onChange={(e) => set("comments", e.target.value)}
            placeholder="Anything you'd like us to know?"
            style={{ ...inputStyle("comments"), minHeight: "auto", resize: "vertical" }}
            onFocus={(e) => { e.target.style.borderColor = "#0A2463"; e.target.style.boxShadow = "0 0 0 3px rgba(10,36,99,0.12)"; }}
            onBlur={(e) => { e.target.style.borderColor = "#DEE2E6"; e.target.style.boxShadow = "none"; }}
          />
        </div>

        {/* Consent */}
        <div>
          <button
            type="button"
            id="step4-consent"
            onClick={() => set("consent", !form.consent)}
            className="flex items-start gap-3 rounded-xl p-4 w-full text-left transition-all"
            style={{
              border: `1.5px solid ${errors.consent ? "#E63946" : form.consent ? "#2A9D8F" : "#DEE2E6"}`,
              background: form.consent ? "#F0FDF9" : "#F8F9FA",
            }}
          >
            <div
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded"
              style={{
                border: `2px solid ${form.consent ? "#2A9D8F" : "#DEE2E6"}`,
                background: form.consent ? "#2A9D8F" : "#fff",
                color: "#fff",
                fontSize: "12px",
              }}
            >
              {form.consent ? "✓" : ""}
            </div>
            <span className="text-sm" style={{ color: "#1A1A2E" }}>
              <span className="font-semibold">I agree to be contacted by the IGEN team</span>
              <br />
              <span style={{ color: "#6C757D", fontSize: "12px" }}>
                Your information is safe. No spam. No payment required.
              </span>
            </span>
          </button>
          {errors.consent && <span style={errorStyle}>{errors.consent}</span>}
        </div>
      </div>

      {/* Submit button */}
      <button
        id="step4-final-submit"
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-full py-4 text-lg font-bold text-white transition-all duration-200"
        style={{
          background: loading ? "#9CA3AF" : "linear-gradient(135deg, #E63946 0%, #c0392b 100%)",
          boxShadow: "0 8px 32px rgba(230, 57, 70, 0.35)",
          minHeight: "60px",
          cursor: loading ? "not-allowed" : "pointer",
          letterSpacing: "0.01em",
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 40px rgba(230,57,70,0.45)";
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(230,57,70,0.35)";
        }}
      >
        {loading ? "Submitting…" : "🎉  Submit My IGEN Application"}
      </button>

      <p className="mt-2 text-center text-xs" style={{ color: "#6C757D" }}>
        By submitting, you agree to be contacted by the IGEN team.
        <br />
        Your information is safe. No spam. No payment required.
      </p>

      <button
        type="button"
        onClick={onBack}
        className="mt-3 w-full text-center text-sm font-medium underline"
        style={{ color: "#6C757D", background: "none", border: "none", cursor: "pointer" }}
      >
        ← Back to Step 3
      </button>
    </form>
  );
}
