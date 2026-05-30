"use client";

import { useState } from "react";

interface SalesFormStep7Props {
  onSubmit: (intentData: Record<string, string>) => void;
  onBack: () => void;
}

const REFERRAL_SOURCES = [
  "WhatsApp", "LinkedIn", "Google Search", "Friend / Colleague",
  "IGEN Team Member", "Event / Exhibition", "Email Campaign", "Other",
];

export default function SalesFormStep7({ onSubmit, onBack }: SalesFormStep7Props) {
  const [form, setForm] = useState({
    why_interested: "",
    goals_year_1: "",
    referral_source: "",
    referral_name: "",
    additional_comments: "",
  });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: string, val: string) => {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.why_interested.trim() || form.why_interested.trim().length < 20) {
      e.why_interested = "⚠️ Please tell us more (at least 20 characters)";
    }
    if (!form.referral_source) e.referral_source = "⚠️ Please tell us how you heard about IGEN";
    if (!consent) e.consent = "⚠️ You must agree to be contacted to submit";
    setErrors(e);
    if (Object.keys(e).length > 0) {
      document.getElementById("sales-step7-why")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  const textareaStyle: React.CSSProperties = {
    width: "100%", padding: "12px 14px", borderRadius: 10,
    border: "1.5px solid #DEE2E6", fontSize: 16, color: "#1A1A2E",
    background: "#fff", outline: "none", resize: "vertical", boxSizing: "border-box",
  };
  const labelStyle: React.CSSProperties = { display: "block", fontSize: 14, fontWeight: 600, color: "#1A1A2E", marginBottom: 6 };
  const errorStyle: React.CSSProperties = { color: "#E63946", fontSize: 12, marginTop: 4 };
  const showReferralName = ["Friend / Colleague", "IGEN Team Member"].includes(form.referral_source);

  return (
    <form onSubmit={handleSubmit} noValidate className="animate-fadeIn">
      <div className="mb-6">
        <h2 className="font-extrabold mb-1" style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463", fontSize: "clamp(18px, 2.5vw, 24px)" }}>
          Almost There — Final Step
        </h2>
        <p style={{ color: "#6C757D", fontSize: 14 }}>Tell us a little more so we can personalise your onboarding.</p>
      </div>

      <div className="space-y-5">
        {/* Why interested */}
        <div>
          <label htmlFor="sales-step7-why" style={labelStyle}>
            Why are you interested in IGEN? <span style={{ color: "#E63946" }}>*</span>
          </label>
          <textarea
            id="sales-step7-why"
            value={form.why_interested}
            onChange={e => set("why_interested", e.target.value)}
            rows={3}
            placeholder="Tell us what excites you about IGEN…"
            style={{ ...textareaStyle, borderColor: errors.why_interested ? "#E63946" : "#DEE2E6" }}
            onFocus={e => (e.target.style.borderColor = "#0A2463")}
            onBlur={e => (e.target.style.borderColor = errors.why_interested ? "#E63946" : "#DEE2E6")}
          />
          {errors.why_interested && <p style={errorStyle}>{errors.why_interested}</p>}
        </div>

        {/* Goals Year 1 */}
        <div>
          <label style={labelStyle}>What do you hope to achieve in Year 1?</label>
          <textarea
            value={form.goals_year_1}
            onChange={e => set("goals_year_1", e.target.value)}
            rows={2}
            placeholder="What business outcome are you looking for?"
            style={textareaStyle}
            onFocus={e => (e.target.style.borderColor = "#0A2463")}
            onBlur={e => (e.target.style.borderColor = "#DEE2E6")}
          />
        </div>

        {/* Referral Source */}
        <div>
          <label style={labelStyle}>How did you hear about IGEN? <span style={{ color: "#E63946" }}>*</span></label>
          <select
            value={form.referral_source}
            onChange={e => set("referral_source", e.target.value)}
            style={{ ...textareaStyle, borderColor: errors.referral_source ? "#E63946" : "#DEE2E6", cursor: "pointer" }}
            onFocus={e => (e.target.style.borderColor = "#0A2463")}
            onBlur={e => (e.target.style.borderColor = errors.referral_source ? "#E63946" : "#DEE2E6")}
          >
            <option value="">Select…</option>
            {REFERRAL_SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.referral_source && <p style={errorStyle}>{errors.referral_source}</p>}
        </div>

        {/* Referral Name - conditional */}
        {showReferralName && (
          <div className="animate-fadeIn">
            <label style={labelStyle}>Referred by (name)</label>
            <input
              type="text"
              value={form.referral_name}
              onChange={e => set("referral_name", e.target.value)}
              placeholder="Enter their name"
              style={{ ...textareaStyle, resize: "none" }}
              onFocus={e => (e.target.style.borderColor = "#0A2463")}
              onBlur={e => (e.target.style.borderColor = "#DEE2E6")}
            />
          </div>
        )}

        {/* Additional Comments */}
        <div>
          <label style={labelStyle}>Any questions for the IGEN team?</label>
          <textarea
            value={form.additional_comments}
            onChange={e => set("additional_comments", e.target.value)}
            rows={2}
            placeholder="Optional — ask us anything"
            style={textareaStyle}
            onFocus={e => (e.target.style.borderColor = "#0A2463")}
            onBlur={e => (e.target.style.borderColor = "#DEE2E6")}
          />
        </div>

        {/* Consent */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <div
              onClick={() => { setConsent(c => !c); if (errors.consent) setErrors(e => ({ ...e, consent: "" })); }}
              className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded transition-all duration-200"
              style={{
                border: errors.consent ? "2px solid #E63946" : "2px solid #DEE2E6",
                background: consent ? "#0A2463" : "#fff",
                cursor: "pointer",
                minWidth: 20,
                minHeight: 20,
              }}
            >
              {consent && <span style={{ color: "#fff", fontSize: 12 }}>✓</span>}
            </div>
            <span className="text-sm" style={{ color: "#1A1A2E" }}>
              I agree to be contacted by the IGEN team about my application{" "}
              <span style={{ color: "#E63946" }}>*</span>
            </span>
          </label>
          {errors.consent && <p style={errorStyle}>{errors.consent}</p>}
        </div>
      </div>

      {/* Submit CTA */}
      <button
        type="submit"
        id="sales-step7-submit"
        className="w-full font-bold rounded-2xl mt-8 transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, #E63946, #C1121F)",
          color: "#fff",
          border: "none",
          padding: "20px 24px",
          fontSize: 18,
          cursor: "pointer",
          boxShadow: "0 12px 40px rgba(230,57,70,0.40)",
          letterSpacing: "0.01em",
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.02)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
      >
        🎉 Secure My Founding Access
      </button>

      <p className="text-center text-xs mt-3" style={{ color: "#6C757D" }}>
        🔒 Your information is secure. No payment required at this stage.<br />
        Our team will contact you within 24 hours of submission.
      </p>

      <div className="flex justify-center mt-5">
        <button type="button" onClick={onBack} className="font-semibold px-6 py-2 rounded-full text-sm" style={{ background: "none", border: "1.5px solid #DEE2E6", color: "#6C757D", cursor: "pointer" }}>
          ← Back to Review
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .animate-fadeIn { animation: fadeIn 0.4s ease; }` }} />
    </form>
  );
}
