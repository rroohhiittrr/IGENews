"use client";

import { useState } from "react";
import { INDIAN_STATES } from "./data/salesProductData";

interface SalesFormStep1Props {
  prefillCity?: string;
  onComplete: (data: Record<string, string>) => void;
  onBack: () => void;
  onToast: (msg: string) => void;
}

const COUNTRY_CODES = ["+91 🇮🇳", "+1 🇺🇸", "+44 🇬🇧", "+971 🇦🇪", "+65 🇸🇬", "+61 🇦🇺", "+49 🇩🇪", "+33 🇫🇷"];

export default function SalesFormStep1({ prefillCity = "", onComplete, onBack, onToast }: SalesFormStep1Props) {
  const [form, setForm] = useState({
    full_name: "",
    country_code: "+91 🇮🇳",
    mobile: "",
    email: "",
    city: prefillCity,
    state: "",
    country: "India",
    linkedin: "",
    designation: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: string, val: string) => {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.full_name.trim()) e.full_name = "⚠️ Please enter your full name";
    if (!form.mobile.trim() || form.mobile.length < 7) e.mobile = "⚠️ Please enter a valid mobile number";
    if (!form.email.trim() || !form.email.includes("@")) e.email = "⚠️ Please enter a valid email address";
    if (!form.city.trim()) e.city = "⚠️ Please enter your city";
    if (!form.designation.trim()) e.designation = "⚠️ Please enter your current designation";
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const firstKey = Object.keys(e)[0];
      document.getElementById(`sales-step1-${firstKey}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onToast("✅ Profile saved. Your application is 10% complete.");
    onComplete(form);
  };

  const inputStyle = (err?: string): React.CSSProperties => ({
    width: "100%",
    padding: "12px 14px",
    borderRadius: 10,
    border: err ? "1.5px solid #E63946" : "1.5px solid #DEE2E6",
    fontSize: 16,
    color: "#1A1A2E",
    background: "#fff",
    outline: "none",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
  });

  const labelStyle: React.CSSProperties = { display: "block", fontSize: 14, fontWeight: 600, color: "#1A1A2E", marginBottom: 6 };
  const errorStyle: React.CSSProperties = { color: "#E63946", fontSize: 12, marginTop: 4 };

  return (
    <form onSubmit={handleSubmit} noValidate className="animate-fadeIn">
      <div className="mb-6">
        <h2 className="font-extrabold mb-1" style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463", fontSize: "clamp(18px, 2.5vw, 24px)" }}>
          Let's Build Your IGEN Profile
        </h2>
        <p style={{ color: "#6C757D", fontSize: 14 }}>Your professional identity on India's industry intelligence ecosystem.</p>
      </div>

      <div className="space-y-5">
        {/* Full Name */}
        <div>
          <label htmlFor="sales-step1-full_name" style={labelStyle}>Full Name <span style={{ color: "#E63946" }}>*</span></label>
          <input id="sales-step1-full_name" type="text" placeholder="e.g. Rahul Sharma" value={form.full_name} onChange={e => set("full_name", e.target.value)} style={inputStyle(errors.full_name)} onFocus={e => (e.target.style.borderColor = "#0A2463")} onBlur={e => (e.target.style.borderColor = errors.full_name ? "#E63946" : "#DEE2E6")} />
          {errors.full_name && <p style={errorStyle}>{errors.full_name}</p>}
        </div>

        {/* Mobile */}
        <div>
          <label htmlFor="sales-step1-mobile" style={labelStyle}>Mobile Number <span style={{ color: "#E63946" }}>*</span></label>
          <div className="flex gap-2">
            <select value={form.country_code} onChange={e => set("country_code", e.target.value)} style={{ ...inputStyle(), width: "auto", minWidth: 120, flex: "0 0 auto" }}>
              {COUNTRY_CODES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input id="sales-step1-mobile" type="tel" placeholder="9876543210" value={form.mobile} onChange={e => set("mobile", e.target.value)} style={{ ...inputStyle(errors.mobile), flex: 1 }} onFocus={e => (e.target.style.borderColor = "#0A2463")} onBlur={e => (e.target.style.borderColor = errors.mobile ? "#E63946" : "#DEE2E6")} />
          </div>
          {errors.mobile && <p style={errorStyle}>{errors.mobile}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="sales-step1-email" style={labelStyle}>Email Address <span style={{ color: "#E63946" }}>*</span></label>
          <input id="sales-step1-email" type="email" placeholder="you@company.com" value={form.email} onChange={e => set("email", e.target.value)} style={inputStyle(errors.email)} onFocus={e => (e.target.style.borderColor = "#0A2463")} onBlur={e => (e.target.style.borderColor = errors.email ? "#E63946" : "#DEE2E6")} />
          {errors.email && <p style={errorStyle}>{errors.email}</p>}
        </div>

        {/* City */}
        <div>
          <label htmlFor="sales-step1-city" style={labelStyle}>City <span style={{ color: "#E63946" }}>*</span></label>
          <input id="sales-step1-city" type="text" placeholder="e.g. Mumbai" value={form.city} onChange={e => set("city", e.target.value)} style={inputStyle(errors.city)} onFocus={e => (e.target.style.borderColor = "#0A2463")} onBlur={e => (e.target.style.borderColor = errors.city ? "#E63946" : "#DEE2E6")} />
          {errors.city && <p style={errorStyle}>{errors.city}</p>}
        </div>

        {/* State & Country */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="sales-step1-state" style={labelStyle}>State</label>
            <select id="sales-step1-state" value={form.state} onChange={e => set("state", e.target.value)} style={inputStyle()}>
              <option value="">Select State</option>
              {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="sales-step1-country" style={labelStyle}>Country</label>
            <input id="sales-step1-country" type="text" value={form.country} onChange={e => set("country", e.target.value)} style={inputStyle()} />
          </div>
        </div>

        {/* LinkedIn */}
        <div>
          <label htmlFor="sales-step1-linkedin" style={labelStyle}>LinkedIn Profile</label>
          <input id="sales-step1-linkedin" type="url" placeholder="https://linkedin.com/in/yourname" value={form.linkedin} onChange={e => set("linkedin", e.target.value)} style={inputStyle()} onFocus={e => (e.target.style.borderColor = "#0A2463")} onBlur={e => (e.target.style.borderColor = "#DEE2E6")} />
          <p style={{ fontSize: 12, color: "#6C757D", marginTop: 4 }}>💡 So we can personalise your recommendations</p>
        </div>

        {/* Designation */}
        <div>
          <label htmlFor="sales-step1-designation" style={labelStyle}>Current Designation / Role <span style={{ color: "#E63946" }}>*</span></label>
          <input id="sales-step1-designation" type="text" placeholder="e.g. Founder / CEO / Director / Expert" value={form.designation} onChange={e => set("designation", e.target.value)} style={inputStyle(errors.designation)} onFocus={e => (e.target.style.borderColor = "#0A2463")} onBlur={e => (e.target.style.borderColor = errors.designation ? "#E63946" : "#DEE2E6")} />
          {errors.designation && <p style={errorStyle}>{errors.designation}</p>}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        <button type="button" onClick={onBack} className="font-semibold px-6 py-3 rounded-full" style={{ background: "#F8F9FA", border: "1.5px solid #DEE2E6", color: "#6C757D", cursor: "pointer", fontSize: 15 }}>
          ← Back
        </button>
        <button type="submit" className="flex-1 font-bold rounded-full transition-all duration-300" style={{ background: "linear-gradient(135deg, #E63946, #C1121F)", color: "#fff", border: "none", padding: "14px 24px", fontSize: 16, cursor: "pointer", boxShadow: "0 6px 24px rgba(230,57,70,0.30)" }}>
          Continue — Step 2 of 7 →
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .animate-fadeIn { animation: fadeIn 0.4s ease; }` }} />
    </form>
  );
}
