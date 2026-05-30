"use client";

import { PLATFORMS, PlatformId } from "./data/salesProductData";

interface SalesFormStep6Props {
  formData: {
    identity: string;
    personal: Record<string, string>;
    organisation: Record<string, string>;
    goals: string[];
    platforms: PlatformId[];
    portfolio: Record<string, string[]>;
  };
  onComplete: () => void;
  onEditStep: (step: number) => void;
}

export default function SalesFormStep6({ formData, onComplete, onEditStep }: SalesFormStep6Props) {
  const { personal, organisation, goals, platforms, portfolio } = formData;

  const totalProducts = Object.values(portfolio).reduce((sum, arr) => sum + arr.length, 0);

  const EditBtn = ({ step }: { step: number }) => (
    <button
      type="button"
      onClick={() => onEditStep(step)}
      className="text-xs font-semibold px-3 py-1 rounded-full transition-all duration-200"
      style={{ background: "rgba(10,36,99,0.08)", color: "#0A2463", border: "1px solid rgba(10,36,99,0.15)", cursor: "pointer" }}
    >
      Edit ✏️
    </button>
  );

  const Section = ({ label, children, step }: { label: string; children: React.ReactNode; step: number }) => (
    <div className="border-b last:border-0" style={{ borderColor: "#DEE2E6", paddingBottom: 20, marginBottom: 20 }}>
      <div className="flex items-center justify-between mb-3">
        <span className="font-bold text-xs uppercase tracking-widest" style={{ color: "#6C757D" }}>{label}</span>
        <EditBtn step={step} />
      </div>
      {children}
    </div>
  );

  return (
    <div className="animate-fadeIn">
      <div className="mb-6">
        <h2 className="font-extrabold mb-1" style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463", fontSize: "clamp(18px, 2.5vw, 24px)" }}>
          Your IGEN Opportunity Portfolio
        </h2>
        <p style={{ color: "#6C757D", fontSize: 14 }}>Review your selections. Edit anything before submitting.</p>
      </div>

      <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1.5px solid #DEE2E6", boxShadow: "0 4px 24px rgba(10,36,99,0.08)" }}>
        {/* Personal Profile */}
        <Section label="Personal Profile" step={1}>
          <div className="text-sm" style={{ color: "#1A1A2E" }}>
            <span className="font-semibold">{personal.full_name || "—"}</span>
            {personal.designation && <span> · {personal.designation}</span>}
            {personal.city && <span> · {personal.city}</span>}
          </div>
          <div className="text-xs mt-1" style={{ color: "#6C757D" }}>
            {personal.email} {personal.mobile && `· ${personal.country_code} ${personal.mobile}`}
          </div>
        </Section>

        {/* Organisation */}
        <Section label="Organisation" step={2}>
          <div className="text-sm" style={{ color: "#1A1A2E" }}>
            <span className="font-semibold">{organisation.company_name || "Not provided"}</span>
            {organisation.industry_sector && <span> · {organisation.industry_sector}</span>}
            {organisation.business_type && <span> · {organisation.business_type}</span>}
          </div>
        </Section>

        {/* Goals */}
        <Section label="Your Goals" step={3}>
          <div className="flex flex-wrap gap-2">
            {goals.length > 0 ? goals.map(g => (
              <span key={g} className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "#0A2463", color: "#fff" }}>{g}</span>
            )) : <span style={{ color: "#6C757D", fontSize: 13 }}>No goals selected</span>}
          </div>
        </Section>

        {/* Portfolio */}
        <Section label="Your Selected Opportunities" step={5}>
          {totalProducts === 0 ? (
            <p style={{ color: "#6C757D", fontSize: 13 }}>No products added yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {platforms.map(platformId => {
                const products = portfolio[platformId] || [];
                if (products.length === 0) return null;
                const platform = PLATFORMS.find(p => p.id === platformId);
                if (!platform) return null;
                return (
                  <div key={platformId} className="rounded-xl p-3" style={{ background: "#F8F9FA", border: "1.5px solid #DEE2E6" }}>
                    <div className="flex items-center gap-1.5 mb-2">
                      <span>{platform.icon}</span>
                      <span className="font-bold text-xs" style={{ color: "#0A2463" }}>{platform.name}</span>
                    </div>
                    {products.map(prodId => {
                      const prod = platform.products.find(p => p.id === prodId);
                      return prod ? (
                        <div key={prodId} className="text-xs" style={{ color: "#2A9D8F" }}>✓ {prod.name}</div>
                      ) : null;
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </Section>

        {/* Founding Member Status */}
        <div className="rounded-xl p-4" style={{ background: "linear-gradient(135deg, rgba(230,57,70,0.06), rgba(230,57,70,0.02))", border: "1.5px solid rgba(230,57,70,0.20)" }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: "#E63946" }} />
            <span className="font-bold text-sm" style={{ color: "#E63946" }}>FOUNDING MEMBER STATUS: ACTIVE</span>
          </div>
          <p className="text-xs mb-2" style={{ color: "#6C757D" }}>Your application qualifies for Founding Member benefits</p>
          <div className="flex flex-wrap gap-2">
            {["✓ Priority Onboarding", "✓ Founding Recognition", "✓ Early Platform Access"].map(b => (
              <span key={b} className="text-xs font-semibold" style={{ color: "#2A9D8F" }}>{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex gap-3 mt-6">
        <button type="button" onClick={() => onEditStep(5)} className="font-semibold px-6 py-3 rounded-full" style={{ background: "#F8F9FA", border: "1.5px solid #DEE2E6", color: "#6C757D", cursor: "pointer", fontSize: 15 }}>
          ← Back
        </button>
        <button type="button" onClick={onComplete} className="flex-1 font-bold rounded-full transition-all duration-300" style={{ background: "linear-gradient(135deg, #E63946, #C1121F)", color: "#fff", border: "none", padding: "14px 24px", fontSize: 16, cursor: "pointer", boxShadow: "0 8px 32px rgba(230,57,70,0.35)" }}>
          🔒 Secure My Founding Access →
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .animate-fadeIn { animation: fadeIn 0.4s ease; }` }} />
    </div>
  );
}
