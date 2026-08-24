"use client";

import { useState } from "react";
import { ProductId, PRODUCT_INFO } from "./data/productData";

interface ProductInfoPanelProps {
  productId: ProductId;
  onBeginApplication: () => void;
  onBack?: () => void;
}

export default function ProductInfoPanel({
  productId,
  onBeginApplication,
  onBack,
}: ProductInfoPanelProps) {
  const product = PRODUCT_INFO[productId];
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);

  if (!product) return null;

  const handleStart = () => {
    if (!consent) {
      setConsentError(true);
      document.getElementById("privacy-consent-box")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }
    setConsentError(false);
    onBeginApplication();
  };

  return (
    <div
      id="product-info-panel"
      className="rounded-3xl overflow-hidden animate-fadeIn w-full mx-auto shadow-2xl transition-all duration-300"
      style={{
        border: "2px solid #0A2463",
        background: "#ffffff",
        boxShadow: "0 20px 50px rgba(10, 36, 99, 0.12)",
      }}
    >
      {/* Top Header Gradient Line */}
      <div
        className="h-2.5 w-full"
        style={{
          background: "linear-gradient(90deg, #0A2463 0%, #2A9D8F 50%, #E63946 100%)",
        }}
      />

      <div className="p-6 md:p-10 space-y-8">
        {/* ========================================================================= */}
        {/* SECTION 1: PRODUCT HIGHLIGHT HEADER                                        */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-start gap-5 pb-6 border-b border-slate-200">
          <div
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-4xl shadow-md border border-indigo-100"
            style={{ background: "linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)" }}
          >
            {product.icon}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-md"
                style={{ background: "#0A2463", color: "#ffffff" }}
              >
                {product.code}
              </span>
              <span
                className="text-xs font-bold px-3 py-1 rounded-full border"
                style={{
                  background: "#FFF7ED",
                  color: "#C2440E",
                  borderColor: "#FFEDD5",
                }}
              >
                {product.categoryName}
              </span>
            </div>

            <h2
              className="text-2xl md:text-3xl font-extrabold leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463" }}
            >
              {product.name}
            </h2>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 2: HEADLINE & KEY VALUE PROP                                       */}
        {/* ========================================================================= */}
        <div
          className="p-5 md:p-6 rounded-2xl shadow-sm"
          style={{
            background: "linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)",
            borderLeft: "6px solid #E63946",
            border: "1px solid #E2E8F0",
            borderLeftWidth: "6px",
          }}
        >
          <h3
            className="text-xl md:text-2xl font-bold mb-1"
            style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463" }}
          >
            {product.landingHeadline}
          </h3>
          <p className="text-sm md:text-base font-bold text-rose-600">
            {product.landingSubheadline}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 3: 3 CORE DETAILS (WHO / WHAT / WHY)                              */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 md:p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-colors">
            <span className="font-extrabold text-slate-800 flex items-center gap-1.5 mb-2 uppercase tracking-wider text-xs">
              <span>👤</span> WHO SHOULD APPLY
            </span>
            <p className="text-xs md:text-sm text-slate-700 font-medium leading-relaxed">
              {product.whoShouldApply}
            </p>
          </div>

          <div className="p-4 md:p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-colors">
            <span className="font-extrabold text-slate-800 flex items-center gap-1.5 mb-2 uppercase tracking-wider text-xs">
              <span>📦</span> WHAT THIS FORM GIVES YOU
            </span>
            <p className="text-xs md:text-sm text-slate-700 font-medium leading-relaxed">
              {product.whatThisGives}
            </p>
          </div>

          <div className="p-4 md:p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-colors">
            <span className="font-extrabold text-slate-800 flex items-center gap-1.5 mb-2 uppercase tracking-wider text-xs">
              <span>⚡</span> WHY NOW / WHY FOUNDING
            </span>
            <p className="text-xs md:text-sm text-slate-700 font-medium leading-relaxed">
              {product.whyNow}
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 4: INCLUDED MEMBER BENEFITS & PERSUASIVE HOOK                     */}
        {/* ========================================================================= */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
          <h4 className="text-xs font-extrabold uppercase tracking-widest mb-4 text-slate-500">
            INCLUDED MEMBER BENEFITS
          </h4>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {product.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-800 font-semibold">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-extrabold text-white bg-teal-600 shadow-sm">
                  ✓
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div
            className="mt-5 rounded-xl p-4 text-center font-bold text-xs md:text-sm"
            style={{
              background: "#FFF7ED",
              color: "#C2440E",
              border: "1px solid #FFEDD5",
            }}
          >
            💡 {product.pageHook}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 5: PRIVACY & DATA CONSENT (MATCHING IMAGE SPECIFICATION)           */}
        {/* ========================================================================= */}
        <div
          id="privacy-consent-section"
          className="pt-6 border-t border-slate-200 space-y-6"
        >
          {/* Header */}
          <div className="text-center max-w-xl mx-auto">
            <h3
              className="text-2xl md:text-3xl font-extrabold mb-2"
              style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463" }}
            >
              Privacy & Data Consent
            </h3>
            <p className="text-xs md:text-sm text-slate-600 font-medium">
              Before proceeding with your IGEN Global Connectivity application, please review how we manage your high-prestige data and privacy.
            </p>
            <div
              className="h-1 w-24 mx-auto mt-3 rounded-full"
              style={{ background: "linear-gradient(90deg, #3B82F6, #6366F1)" }}
            />
          </div>

          {/* 2 Side-by-Side Cards (Data Security & Usage Purpose) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className="p-5 rounded-2xl border transition-all"
              style={{ background: "#F0F7FF", borderColor: "#BFDBFE" }}
            >
              <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm md:text-base mb-2">
                <span className="text-blue-600 text-lg">🛡️</span> Data Security
              </div>
              <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                Your information is encrypted using industry-standard protocols, ensuring that your professional identity remains secure within our global network.
              </p>
            </div>

            <div
              className="p-5 rounded-2xl border transition-all"
              style={{ background: "#F0F7FF", borderColor: "#BFDBFE" }}
            >
              <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm md:text-base mb-2">
                <span className="text-blue-600 text-lg">📊</span> Usage Purpose
              </div>
              <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                We use your data exclusively for IGEN award processing, conference credentials, and founding member communications. No third-party sharing.
              </p>
            </div>
          </div>

          {/* Full Policy & Terms Summary Box */}
          <div>
            <span className="block text-xs font-extrabold uppercase tracking-widest text-slate-500 mb-2">
              FULL POLICY & TERMS
            </span>

            <div
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs md:text-sm space-y-3"
            >
              <div>
                <h5 className="font-extrabold text-slate-900 mb-1">
                  1. Information Collection
                </h5>
                <p className="text-slate-600 font-medium leading-relaxed">
                  We collect personal identification information (Name, email address, phone number, etc.) and professional credentials relevant to the IGEN Global Connectivity ecosystem. This data is essential for maintaining the prestige of our founding members and delegates.
                </p>
              </div>

              <div>
                <h5 className="font-extrabold text-slate-900 mb-1">
                  2. How We Use Your Data
                </h5>
                <p className="text-slate-600 font-medium leading-relaxed">
                  Your data is utilized to personalize your dashboard experience, process registrations for events, verify business credentials, and deliver targeted trade intelligence updates.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Consent Checkbox Box */}
          <div
            id="privacy-consent-box"
            onClick={() => {
              setConsent(!consent);
              if (consentError) setConsentError(false);
            }}
            className="p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4"
            style={{
              background: consent ? "#EFF6FF" : "#F8FAFC",
              borderColor: consentError ? "#E63946" : consent ? "#3B82F6" : "#CBD5E1",
              boxShadow: consentError
                ? "0 0 0 4px rgba(230, 57, 70, 0.15)"
                : consent
                ? "0 4px 16px rgba(59, 130, 246, 0.12)"
                : "none",
            }}
          >
            <div
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-all"
              style={{
                borderColor: consent ? "#2563EB" : "#94A3B8",
                background: consent ? "#2563EB" : "#ffffff",
                color: "#ffffff",
              }}
            >
              {consent && <span className="font-bold text-sm">✓</span>}
            </div>

            <div className="flex-1">
              <span className="font-extrabold text-slate-900 text-sm md:text-base block mb-0.5">
                I agree to the terms and conditions
              </span>
              <p className="text-xs md:text-sm text-slate-600 font-medium">
                By checking this box, you confirm that you have read and understood the IGEN Global Connectivity Privacy Policy and Data Usage Agreement.
              </p>
            </div>
          </div>

          {consentError && (
            <p className="text-xs font-bold text-rose-600 text-center animate-pulse">
              ⚠️ Please check the box to confirm your privacy & data consent before continuing.
            </p>
          )}
        </div>

        {/* ========================================================================= */}
        {/* SECTION 6: ACTION BUTTONS (RETURN / START APPLICATION)                    */}
        {/* ========================================================================= */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors border border-slate-300 rounded-full cursor-pointer bg-white"
            >
              ← Return to Product List
            </button>
          ) : (
            <div />
          )}

          <button
            id="start-application-btn"
            type="button"
            onClick={handleStart}
            className="w-full sm:w-auto flex-1 max-w-md rounded-full py-4 px-8 text-base md:text-lg font-extrabold text-white transition-all duration-200 cursor-pointer shadow-xl text-center"
            style={{
              background: consent
                ? "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)"
                : "linear-gradient(135deg, #E63946 0%, #C1121F 100%)",
              boxShadow: consent
                ? "0 8px 28px rgba(37, 99, 235, 0.35)"
                : "0 8px 28px rgba(230, 57, 70, 0.35)",
            }}
          >
            Start My Application →
          </button>
        </div>

        <p className="text-center text-xs text-slate-500 font-medium">
          Takes less than 60 seconds. No payment required. Official IGEN Founding Process.
        </p>
      </div>
    </div>
  );
}
