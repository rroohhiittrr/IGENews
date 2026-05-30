"use client";

import { useState, useCallback } from "react";
import { IdentityType, PlatformId } from "./data/salesProductData";
import SalesProgressBar from "./SalesProgressBar";
import SalesHeroBanner from "./SalesHeroBanner";
import SalesTrustStrip from "./SalesTrustStrip";
import SalesFOMOStrip from "./SalesFOMOStrip";
import SalesEcosystemSnapshot from "./SalesEcosystemSnapshot";
import SalesFormStep0 from "./SalesFormStep0";
import SalesFormStep1 from "./SalesFormStep1";
import SalesFormStep2 from "./SalesFormStep2";
import SalesFormStep3 from "./SalesFormStep3";
import SalesFormStep4 from "./SalesFormStep4";
import SalesFormStep5 from "./SalesFormStep5";
import SalesFormStep6 from "./SalesFormStep6";
import SalesFormStep7 from "./SalesFormStep7";
import SalesThankYouScreen from "./SalesThankYouScreen";

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | "done";

function generateRefId() {
  const ts = Date.now().toString().slice(-6);
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `IGEN-${ts}-${rand}`;
}

interface SalesFormData {
  identity: IdentityType;
  personal: Record<string, string>;
  organisation: Record<string, string>;
  goals: string[];
  platforms: PlatformId[];
  portfolio: Record<string, string[]>;
  intent: Record<string, string>;
}

export default function SalesEOILandingPage() {
  const [step, setStep] = useState<Step>(0);
  const [formInView, setFormInView] = useState(false);
  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [refId] = useState(generateRefId());

  const [formData, setFormData] = useState<Partial<SalesFormData>>({
    identity: undefined,
    personal: {},
    organisation: {},
    goals: [],
    platforms: [],
    portfolio: {},
    intent: {},
  });

  const showToastMessage = useCallback((msg: string) => {
    setToast(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  }, []);

  const scrollToForm = () => {
    setFormInView(true);
    setTimeout(() => {
      document.getElementById("sales-form-module")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const goToStep = (s: Step) => {
    setStep(s);
    setTimeout(() => {
      document.getElementById("sales-form-anchor")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  // Step handlers
  const handleStep0 = (identity: IdentityType) => {
    setFormData(d => ({ ...d, identity }));
    goToStep(1);
  };

  const handleStep1 = (personal: Record<string, string>) => {
    setFormData(d => ({ ...d, personal }));
    goToStep(2);
  };

  const handleStep2 = (organisation: Record<string, string>) => {
    setFormData(d => ({ ...d, organisation }));
    goToStep(3);
  };

  const handleStep3 = (goals: string[]) => {
    setFormData(d => ({ ...d, goals }));
    goToStep(4);
  };

  const handleStep4 = (platforms: PlatformId[]) => {
    setFormData(d => ({ ...d, platforms }));
    goToStep(5);
  };

  const handleStep5 = (portfolio: Record<string, string[]>) => {
    setFormData(d => ({ ...d, portfolio }));
    goToStep(6);
  };

  const handleStep6 = () => {
    goToStep(7);
  };

  const handleStep7 = (intent: Record<string, string>) => {
    setFormData(d => ({ ...d, intent }));
    showToastMessage("🎉 Application submitted! Welcome to the IGEN Founding Community!");
    goToStep("done");
  };

  const handleEditStep = (targetStep: number) => {
    goToStep(targetStep as Step);
  };

  const handleFillAnother = () => {
    setFormData({ identity: undefined, personal: {}, organisation: {}, goals: [], platforms: [], portfolio: {}, intent: {} });
    setStep(0);
    scrollToForm();
  };

  const isFormStep = step !== "done" && typeof step === "number";
  const stepNumber = typeof step === "number" ? step : 7;

  return (
    <div
      className="min-h-screen w-full"
      style={{ fontFamily: "'Inter', sans-serif", background: "#F8F9FA" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* Sticky Progress Bar — only during form */}
      {formInView && (
        <SalesProgressBar currentStep={stepNumber} submitted={step === "done"} />
      )}

      {/* SECTION 1 — Hero Banner */}
      {!formInView && (
        <SalesHeroBanner onExploreClick={scrollToForm} onApplyClick={scrollToForm} />
      )}

      {/* SECTION 2 — Trust Strip */}
      {!formInView && <SalesTrustStrip />}

      {/* SECTION 3 — FOMO Strip */}
      {!formInView && <SalesFOMOStrip onSecureClick={scrollToForm} />}

      {/* SECTION 4 — Ecosystem Snapshot */}
      {!formInView && <SalesEcosystemSnapshot onStartClick={scrollToForm} />}

      {/* FORM MODULE */}
      <section id="sales-form-module" className="w-full px-4 py-10" style={{ background: "#F8F9FA", minHeight: formInView ? "80vh" : undefined }}>
        <div id="sales-form-anchor" style={{ marginTop: -80, paddingTop: 80 }} />

        {!formInView && (
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3" style={{ background: "linear-gradient(135deg, #E63946, #c0392b)", color: "#fff" }}>
              Begin Your Journey
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463" }}>
              Build Your IGEN Portfolio
            </h2>
            <p className="text-sm" style={{ color: "#6C757D" }}>
              Express your interest in 5 minutes. No payment. No commitment.
            </p>
          </div>
        )}

        <div className="mx-auto max-w-3xl">
          {/* Form Card */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "#fff",
              boxShadow: "0 8px 40px rgba(10, 36, 99, 0.12)",
              border: "1.5px solid #DEE2E6",
            }}
          >
            <div className="p-6 md:p-10">
              {/* Step 0: Self-Identification */}
              {step === 0 && (
                <SalesFormStep0 onComplete={handleStep0} />
              )}

              {/* Step 1: Personal Profile */}
              {step === 1 && (
                <SalesFormStep1
                  onComplete={handleStep1}
                  onBack={() => goToStep(0)}
                  onToast={showToastMessage}
                />
              )}

              {/* Step 2: Organisation Profile */}
              {step === 2 && (
                <SalesFormStep2
                  identity={formData.identity!}
                  onComplete={handleStep2}
                  onBack={() => goToStep(1)}
                  onToast={showToastMessage}
                />
              )}

              {/* Step 3: Business Objectives */}
              {step === 3 && (
                <SalesFormStep3
                  onComplete={handleStep3}
                  onBack={() => goToStep(2)}
                  onToast={showToastMessage}
                />
              )}

              {/* Step 4: Ecosystem Interest */}
              {step === 4 && (
                <SalesFormStep4
                  identity={formData.identity!}
                  selectedGoals={formData.goals || []}
                  onComplete={handleStep4}
                  onBack={() => goToStep(3)}
                  onToast={showToastMessage}
                />
              )}

              {/* Step 5: Product Explorer */}
              {step === 5 && (
                <SalesFormStep5
                  selectedPlatforms={formData.platforms || []}
                  onComplete={handleStep5}
                  onBack={() => goToStep(4)}
                  onToast={showToastMessage}
                />
              )}

              {/* Step 6: Review Portfolio */}
              {step === 6 && (
                <SalesFormStep6
                  formData={{
                    identity: formData.identity || "READER",
                    personal: formData.personal || {},
                    organisation: formData.organisation || {},
                    goals: formData.goals || [],
                    platforms: formData.platforms || [],
                    portfolio: formData.portfolio || {},
                  }}
                  onComplete={handleStep6}
                  onEditStep={handleEditStep}
                />
              )}

              {/* Step 7: Final Submission */}
              {step === 7 && (
                <SalesFormStep7
                  onSubmit={handleStep7}
                  onBack={() => goToStep(6)}
                />
              )}

              {/* Done: Thank You */}
              {step === "done" && (
                <SalesThankYouScreen
                  firstName={(formData.personal?.full_name || "").split(" ")[0]}
                  referenceId={refId}
                  portfolio={formData.portfolio || {}}
                  platforms={formData.platforms || []}
                  onFillAnother={handleFillAnother}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — Next Steps (below form, pre-form-view) */}
      {!formInView && (
        <section className="w-full py-14 px-4" style={{ background: "#fff" }}>
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center font-extrabold mb-8" style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463", fontSize: "clamp(20px, 3vw, 28px)" }}>
              What Happens After Your EOI?
            </h2>
            <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-0">
              {[
                { icon: "📝", step: "Step 1", label: "EOI Submitted", sub: "CRM Entry" },
                { icon: "👤", step: "Step 2", label: "Assigned to Team", sub: "24-hr Contact" },
                { icon: "📞", step: "Step 3", label: "Discovery Call", sub: "Qualification" },
                { icon: "📄", step: "Step 4", label: "Brochure Shared", sub: "Sales Strategy" },
                { icon: "🚀", step: "Step 5", label: "Onboarding Begins", sub: "Platform Live" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center flex-1">
                  <div className="relative flex items-center justify-center w-14 h-14 rounded-full mb-3" style={{ background: "linear-gradient(135deg, #0A2463, #1a3a7a)", color: "#fff", fontSize: 22 }}>
                    {item.icon}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: "#E63946" }}>{item.step}</span>
                  <span className="font-semibold text-sm" style={{ color: "#0A2463" }}>{item.label}</span>
                  <span className="text-xs" style={{ color: "#6C757D" }}>{item.sub}</span>
                  {i < 4 && (
                    <div className="hidden md:block absolute" style={{ display: "none" }}>→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="w-full px-4 py-8 text-center" style={{ background: "#0A2463", color: "rgba(255,255,255,0.75)" }}>
        <div className="mx-auto max-w-4xl">
          <div className="text-xl font-extrabold mb-1" style={{ fontFamily: "'Poppins', sans-serif", color: "#fff" }}>
            🌐 IGEN World
          </div>
          <p className="text-xs mb-3">India Global Expo News Platform Pvt Ltd</p>
          <p className="text-xs mb-3 italic" style={{ color: "rgba(255,255,255,0.55)" }}>
            Mission: Viksit Bharat 2047 — Empowering Indian Industry Intelligence, Trade & Ecosystem Growth
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-4 text-xs font-medium">
            {["IGEN News", "IGEN Expo", "IGEN Awards", "igenworld.com"].map((link, i) => (
              <a key={i} href="#" className="transition-colors" style={{ color: "rgba(255,255,255,0.70)" }}>{link}</a>
            ))}
          </div>
          <p className="text-xs" style={{ opacity: 0.5 }}>© 2025 India Global Expo News Platform Pvt Ltd. All rights reserved.</p>
        </div>
      </footer>

      {/* Toast */}
      {showToast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-xl"
          style={{
            background: "linear-gradient(135deg, #2A9D8F, #1a7a70)",
            boxShadow: "0 8px 32px rgba(42,157,143,0.40)",
            animation: "slideUp 0.3s ease",
            maxWidth: "90vw",
          }}
        >
          {toast}
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideUp {
          from { transform: translateX(-50%) translateY(20px); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
      `}} />
    </div>
  );
}
