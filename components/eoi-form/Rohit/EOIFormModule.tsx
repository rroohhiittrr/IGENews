"use client";

import { useState, useEffect, useCallback } from "react";
import { ProductId, PRODUCT_INFO } from "./data/productData";
import {
  createEmptySubmission,
  finalSubmit,
  loadCurrentSubmission,
  resetForm,
  SubmissionData,
  STORAGE_KEYS,
} from "./utils/formUtils";
import ProductSelector from "./ProductSelector";
import ProductInfoPanel from "./ProductInfoPanel";
import ProgressBar from "./ProgressBar";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";
import FormStep4 from "./FormStep4";
import ThankYouScreen from "./ThankYouScreen";
import EnquiryForm from "./EnquiryForm";

interface EOIFormModuleProps {
  preselectedProduct?: ProductId | "";
  prefillCity?: string;
  prefillSector?: string;
}

type Stage = "select" | "info" | "step1" | "step2" | "step3" | "step4" | "done";

export default function EOIFormModule({
  preselectedProduct = "",
  prefillCity = "",
  prefillSector = "",
}: EOIFormModuleProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductId | "">(preselectedProduct);
  const [stage, setStage] = useState<Stage>(preselectedProduct ? "info" : "select");
  const [submission, setSubmission] = useState<SubmissionData | null>(null);
  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Load any previously saved submission on mount
  useEffect(() => {
    const saved = loadCurrentSubmission();
    if (saved && saved.meta.product_id && !preselectedProduct) {
      setSelectedProduct(saved.meta.product_id as ProductId);
    }
  }, [preselectedProduct]);

  const showToastMessage = useCallback((msg: string) => {
    setToast(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  }, []);

  const handleProductSelect = (id: ProductId) => {
    setSelectedProduct(id);
    // Initialize fresh submission
    const product = PRODUCT_INFO[id];
    const newSub = createEmptySubmission(id, product.name, product.categoryName);
    localStorage.setItem(STORAGE_KEYS.CURRENT_SUBMISSION, JSON.stringify(newSub));
    setStage("info");
    // Scroll to form
    setTimeout(() => {
      document.getElementById("eoi-form-anchor")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleBeginApplication = () => {
    setStage("step1");
    setTimeout(() => {
      document.getElementById("eoi-form-anchor")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleStep1Complete = (data: Record<string, string>) => {
    if (data.interested_in && data.interested_in !== selectedProduct) {
      const newProdId = data.interested_in as ProductId;
      setSelectedProduct(newProdId);
      const product = PRODUCT_INFO[newProdId];
      if (product) {
        const stored = loadCurrentSubmission();
        if (stored) {
          stored.meta.product_id = newProdId;
          stored.meta.product_name = product.name;
          stored.meta.platform = product.categoryName;
          localStorage.setItem(STORAGE_KEYS.CURRENT_SUBMISSION, JSON.stringify(stored));
        }
      }
    }
    setStage("step2");
    scrollToForm();
  };

  const handleStep2Complete = () => {
    setStage("step3");
    scrollToForm();
  };

  const handleStep3Complete = () => {
    setStage("step4");
    scrollToForm();
  };

  const handleStep4Complete = async () => {
    const result = await finalSubmit();
    if (result) {
      setSubmission(result);
      setStage("done");
      scrollToForm();
    }
  };

  const handleFillAnother = () => {
    resetForm();
    setSelectedProduct("");
    setSubmission(null);
    setStage("select");
    scrollToForm();
  };

  const scrollToForm = () => {
    setTimeout(() => {
      document.getElementById("eoi-form-anchor")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const currentStep =
    stage === "step1" ? 1 :
    stage === "step2" ? 2 :
    stage === "step3" ? 3 :
    stage === "step4" ? 4 : 1;

  const showProgressBar = ["step1", "step2", "step3", "step4", "done"].includes(stage);

  return (
    <section
      id="eoi-form-module"
      className="w-full px-4 py-10"
      style={{ background: "#F8F9FA", minHeight: "500px" }}
    >
      {/* Anchor for scrolling */}
      <div id="eoi-form-anchor" className="block" style={{ marginTop: "-80px", paddingTop: "80px" }} />

      <div className={`mx-auto ${stage === "select" ? "max-w-6xl" : stage === "info" ? "max-w-4xl" : "max-w-2xl"} transition-all duration-300`}>
        {/* Section heading (when in select mode) */}
        {stage === "select" && (
          <div className="text-center mb-8">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
              style={{ background: "linear-gradient(135deg, #E63946, #c0392b)", color: "#fff" }}
            >
              Begin Your Application
            </span>
            <h2
              className="text-2xl md:text-3xl font-bold mb-2"
              style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463" }}
            >
              Express Your Interest
            </h2>
            <p className="text-sm" style={{ color: "#6C757D" }}>
              Select a product below to see your exclusive founding member benefits and begin your application.
            </p>
          </div>
        )}

        {/* Product Selector & Enquiry Form fallback */}
        {stage === "select" && (
          <div className="space-y-10">
            <ProductSelector selectedProduct={selectedProduct} onSelect={handleProductSelect} />
            <EnquiryForm onSuccessToast={showToastMessage} />
          </div>
        )}

        {/* Product Info Panel */}
        {stage === "info" && selectedProduct && (
          <div className="space-y-4">
            <ProductInfoPanel
              productId={selectedProduct}
              onBeginApplication={handleBeginApplication}
              onBack={() => setStage("select")}
            />
          </div>
        )}

        {/* Progress bar */}
        {showProgressBar && stage !== "done" && (
          <ProgressBar currentStep={currentStep} submitted={false} />
        )}
        {stage === "done" && <ProgressBar currentStep={4} submitted={true} />}

        {/* Form container */}
        {["step1", "step2", "step3", "step4", "done"].includes(stage) && (
          <div
            className="rounded-2xl overflow-hidden mt-0"
            style={{
              background: "#fff",
              boxShadow: "0 4px 24px rgba(10, 36, 99, 0.10)",
              border: "1.5px solid #DEE2E6",
            }}
          >
            <div className="p-5 md:p-8">
              {stage === "step1" && selectedProduct && (
                <FormStep1
                  selectedProduct={selectedProduct}
                  prefillCity={prefillCity}
                  onComplete={handleStep1Complete}
                  onToast={showToastMessage}
                />
              )}

              {stage === "step2" && (
                <FormStep2
                  prefillSector={prefillSector}
                  onComplete={handleStep2Complete}
                  onBack={() => setStage("step1")}
                />
              )}

              {stage === "step3" && selectedProduct && (
                <FormStep3
                  productId={selectedProduct}
                  onComplete={handleStep3Complete}
                  onBack={() => setStage("step2")}
                />
              )}

              {stage === "step4" && selectedProduct && (
                <FormStep4
                  productId={selectedProduct}
                  onComplete={handleStep4Complete}
                  onBack={() => setStage("step3")}
                />
              )}

              {stage === "done" && submission && (
                <ThankYouScreen
                  submission={submission}
                  onFillAnother={handleFillAnother}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Toast notification */}
      {showToast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-xl transition-all"
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
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.35s ease; }
      `}} />
    </section>
  );
}
