"use client";

import { useState } from "react";

interface EnquiryFormProps {
  onSuccessToast?: (msg: string) => void;
}

export default function EnquiryForm({ onSuccessToast }: EnquiryFormProps) {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    comments: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Full name is required";
    if (!form.mobile.trim()) {
      errs.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(form.mobile.replace(/\s/g, ""))) {
      errs.mobile = "Enter a valid 10-digit mobile number";
    }
    if (!form.comments.trim())
      errs.comments = "Please share what you are looking for";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));

    try {
      const enquiries = JSON.parse(
        localStorage.getItem("igen_eoi_enquiries") || "[]"
      );
      enquiries.push({
        ...form,
        submitted_at: new Date().toISOString(),
      });
      localStorage.setItem("igen_eoi_enquiries", JSON.stringify(enquiries));
    } catch (err) {
      console.error("Failed to save enquiry", err);
    }

    setLoading(false);
    setSubmitted(true);
    if (onSuccessToast) {
      onSuccessToast("✅ Enquiry submitted! Our team will call you within 24 hours.");
    }
  };

  const handleReset = () => {
    setForm({ name: "", mobile: "", comments: "" });
    setSubmitted(false);
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "14px",
    fontWeight: 600,
    marginBottom: "6px",
    color: "#1A1A2E",
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

  const errorStyle: React.CSSProperties = {
    display: "block",
    fontSize: "12px",
    color: "#E63946",
    marginTop: "4px",
  };

  return (
    <div
      className="rounded-2xl p-6 md:p-8 mt-10"
      style={{
        background: "#ffffff",
        border: "1.5px solid #DEE2E6",
        boxShadow: "0 4px 24px rgba(10, 36, 99, 0.05)",
      }}
    >
      {submitted ? (
        <div className="text-center py-6 animate-fadeIn">
          <div
            className="inline-flex h-16 w-16 items-center justify-center rounded-full text-white text-3xl mb-4 font-bold"
            style={{ background: "linear-gradient(135deg, #2A9D8F, #1a7a70)" }}
          >
            ✓
          </div>
          <h3 className="text-xl font-bold mb-1" style={{ color: "#0A2463" }}>
            Enquiry Submitted!
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Our onboarding team will call you within 24 hours to discuss your application.
          </p>
          <button
            onClick={handleReset}
            className="text-xs font-bold underline text-[#0A2463] cursor-pointer"
          >
            Submit Another Enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-6 text-center">
            <span
              className="inline-block text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-2"
              style={{ background: "#FFF7ED", color: "#C2440E" }}
            >
              GET IN TOUCH
            </span>
            <h3
              className="text-xl font-bold mb-1"
              style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463" }}
            >
              Not sure where to start?
            </h3>
            <p className="text-xs md:text-sm text-slate-600">
              Tell us a little and the IGEN team will call you within 24 hours.
            </p>
          </div>

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label style={labelStyle}>
                Full Name <span style={{ color: "#E63946" }}>*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Your Full Name"
                style={inputStyle("name")}
              />
              {errors.name && <span style={errorStyle}>{errors.name}</span>}
            </div>

            {/* Mobile Number */}
            <div>
              <label style={labelStyle}>
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
                  type="tel"
                  value={form.mobile}
                  onChange={(e) =>
                    set("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  placeholder="10-digit mobile number"
                  style={{ ...inputStyle("mobile"), flex: 1 }}
                />
              </div>
              {errors.mobile && <span style={errorStyle}>{errors.mobile}</span>}
            </div>

            {/* Comments / Details */}
            <div>
              <label style={labelStyle}>
                Comments / What are you looking for?{" "}
                <span style={{ color: "#E63946" }}>*</span>
              </label>
              <textarea
                value={form.comments}
                onChange={(e) => set("comments", e.target.value)}
                placeholder="Tell us what you'd like to do or ask..."
                style={{
                  ...inputStyle("comments"),
                  minHeight: "80px",
                  resize: "vertical",
                }}
              />
              {errors.comments && (
                <span style={errorStyle}>{errors.comments}</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-full py-4 text-sm font-extrabold text-white transition-all cursor-pointer shadow-md"
            style={{
              background: loading
                ? "#9CA3AF"
                : "linear-gradient(135deg, #0A2463 0%, #1a3a8f 100%)",
              boxShadow: "0 4px 18px rgba(10, 36, 99, 0.20)",
            }}
          >
            {loading ? "Submitting..." : "Submit Enquiry & Request Call"}
          </button>
        </form>
      )}
    </div>
  );
}
