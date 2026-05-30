"use client";

import { useState } from "react";
import { IdentityType, INDUSTRY_SECTORS } from "./data/salesProductData";

interface SalesFormStep2Props {
  identity: IdentityType;
  prefillSector?: string;
  onComplete: (data: Record<string, string>) => void;
  onBack: () => void;
  onToast: (msg: string) => void;
}

const EMPLOYEE_OPTIONS = ["1–10", "11–50", "51–200", "201–500", "500+"];
const BUSINESS_TYPES = [
  "Startup", "MSME", "Enterprise", "Exporter", "Importer",
  "Manufacturer", "Service Provider", "Consultant", "Professional",
  "Investor", "Government", "Association",
];
const REVENUE_OPTIONS = [
  "Under ₹1 Cr", "₹1–5 Cr", "₹5–25 Cr", "₹25–100 Cr",
  "₹100 Cr+", "Prefer not to say",
];

export default function SalesFormStep2({ identity, prefillSector = "", onComplete, onBack, onToast }: SalesFormStep2Props) {
  const isSimplified = identity === "READER";
  const isPartiallySimplified = identity === "INDUSTRY_EXPERT";

  const [form, setForm] = useState({
    company_name: "",
    website: "",
    industry_sector: prefillSector,
    sub_industry: "",
    employee_strength: "",
    business_type: "",
    revenue_band: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: string, val: string) => {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.industry_sector) e.industry_sector = "⚠️ Please select your industry sector";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    onToast("✅ Organisation details saved. 20% complete.");
    onComplete(form);
  };

  const inputStyle: React.CSSProperties = { width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #DEE2E6", fontSize: 16, color: "#1A1A2E", background: "#fff", outline: "none", boxSizing: "border-box" };
  const labelStyle: React.CSSProperties = { display: "block", fontSize: 14, fontWeight: 600, color: "#1A1A2E", marginBottom: 6 };
  const errorStyle: React.CSSProperties = { color: "#E63946", fontSize: 12, marginTop: 4 };

  return (
    <form onSubmit={handleSubmit} noValidate className="animate-fadeIn">
      <div className="mb-6">
        <h2 className="font-extrabold mb-1" style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463", fontSize: "clamp(18px, 2.5vw, 24px)" }}>
          Tell Us About Your Organisation
        </h2>
        {!isSimplified && (
          <p style={{ color: "#6C757D", fontSize: 14 }}>
            Your company profile helps us match you with the right trade and industry partners.
          </p>
        )}
      </div>

      <div className="space-y-5">
        {/* Company Name */}
        <div>
          <label style={labelStyle}>
            Company / Organisation Name {!isSimplified && <span style={{ color: "#E63946" }}>*</span>}
            {isSimplified && <span className="ml-1 text-xs font-normal" style={{ color: "#6C757D" }}>(Optional)</span>}
          </label>
          <input type="text" placeholder="Your company or practice name" value={form.company_name} onChange={e => set("company_name", e.target.value)} style={inputStyle} onFocus={e => (e.target.style.borderColor = "#0A2463")} onBlur={e => (e.target.style.borderColor = "#DEE2E6")} />
        </div>

        {!isSimplified && (
          <div>
            <label style={labelStyle}>Website</label>
            <input type="url" placeholder="https://yourcompany.com" value={form.website} onChange={e => set("website", e.target.value)} style={inputStyle} onFocus={e => (e.target.style.borderColor = "#0A2463")} onBlur={e => (e.target.style.borderColor = "#DEE2E6")} />
          </div>
        )}

        {/* Industry Sector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>Industry Sector <span style={{ color: "#E63946" }}>*</span></label>
            <select value={form.industry_sector} onChange={e => set("industry_sector", e.target.value)} style={{ ...inputStyle, borderColor: errors.industry_sector ? "#E63946" : "#DEE2E6" }}>
              <option value="">Select Sector</option>
              {INDUSTRY_SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.industry_sector && <p style={errorStyle}>{errors.industry_sector}</p>}
          </div>
          <div>
            <label style={labelStyle}>Sub-Industry</label>
            <input type="text" placeholder="e.g. IT Services, Garments…" value={form.sub_industry} onChange={e => set("sub_industry", e.target.value)} style={inputStyle} onFocus={e => (e.target.style.borderColor = "#0A2463")} onBlur={e => (e.target.style.borderColor = "#DEE2E6")} />
          </div>
        </div>

        {/* Business Type — for non-reader */}
        {!isSimplified && (
          <div>
            <label style={labelStyle}>Business Type <span style={{ color: "#E63946" }}>*</span></label>
            <div className="flex flex-wrap gap-2">
              {BUSINESS_TYPES.map(bt => (
                <button
                  key={bt}
                  type="button"
                  onClick={() => set("business_type", bt)}
                  className="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
                  style={{
                    border: form.business_type === bt ? "2px solid #0A2463" : "1.5px solid #DEE2E6",
                    background: form.business_type === bt ? "rgba(10,36,99,0.06)" : "#fff",
                    color: form.business_type === bt ? "#0A2463" : "#6C757D",
                    cursor: "pointer",
                  }}
                >
                  {bt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Employee Strength — for non-reader/expert */}
        {!isSimplified && !isPartiallySimplified && (
          <div>
            <label style={labelStyle}>Employee Strength</label>
            <div className="flex flex-wrap gap-2">
              {EMPLOYEE_OPTIONS.map(eo => (
                <button
                  key={eo}
                  type="button"
                  onClick={() => set("employee_strength", eo)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                  style={{
                    border: form.employee_strength === eo ? "2px solid #0A2463" : "1.5px solid #DEE2E6",
                    background: form.employee_strength === eo ? "rgba(10,36,99,0.06)" : "#fff",
                    color: form.employee_strength === eo ? "#0A2463" : "#6C757D",
                    cursor: "pointer",
                  }}
                >
                  {eo}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Revenue Band — for non-reader */}
        {!isSimplified && (
          <div>
            <label style={labelStyle}>Annual Revenue Range</label>
            <div className="rounded-xl p-3 mb-2" style={{ background: "rgba(10,36,99,0.04)", border: "1px solid rgba(10,36,99,0.08)", fontSize: 12, color: "#6C757D" }}>
              💡 Why we ask: helps us connect you with the right IGEN partners and opportunities.
            </div>
            <select value={form.revenue_band} onChange={e => set("revenue_band", e.target.value)} style={inputStyle} onFocus={e => (e.target.style.borderColor = "#0A2463")} onBlur={e => (e.target.style.borderColor = "#DEE2E6")}>
              <option value="">Select range</option>
              {REVENUE_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        <button type="button" onClick={onBack} className="font-semibold px-6 py-3 rounded-full" style={{ background: "#F8F9FA", border: "1.5px solid #DEE2E6", color: "#6C757D", cursor: "pointer", fontSize: 15 }}>
          ← Back
        </button>
        <button type="submit" className="flex-1 font-bold rounded-full transition-all duration-300" style={{ background: "linear-gradient(135deg, #E63946, #C1121F)", color: "#fff", border: "none", padding: "14px 24px", fontSize: 16, cursor: "pointer", boxShadow: "0 6px 24px rgba(230,57,70,0.30)" }}>
          Continue — Step 3 of 7 →
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .animate-fadeIn { animation: fadeIn 0.4s ease; }` }} />
    </form>
  );
}
