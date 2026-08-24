"use client";

import { useState } from "react";
import { ProductId, THANK_YOU_CONTENT } from "./data/productData";
import { SubmissionData, copyToClipboard } from "./utils/formUtils";

interface ThankYouScreenProps {
  submission: SubmissionData;
  onFillAnother: () => void;
}

export default function ThankYouScreen({ submission, onFillAnother }: ThankYouScreenProps) {
  const [copied, setCopied] = useState(false);
  const productId = submission.meta.product_id as ProductId;
  const content = THANK_YOU_CONTENT[productId];
  const firstName = submission.step1.full_name.split(" ")[0] || "Friend";
  const submissionId = submission.meta.submission_id;

  const handleCopy = async () => {
    const ok = await copyToClipboard(JSON.stringify(submission, null, 2));
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const waText = encodeURIComponent(content?.share_message || "I just registered on IGEN World! → www.igenworld.com");
  const linkedInUrl = "https://www.linkedin.com/sharing/share-offsite/?url=https://igenworld.com";

  return (
    <div id="thank-you-screen" className="text-center">
      {/* Animated checkmark */}
      <div className="flex justify-center mb-4">
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full text-4xl"
          style={{
            background: "linear-gradient(135deg, #2A9D8F, #1a7a70)",
            boxShadow: "0 8px 32px rgba(42, 157, 143, 0.40)",
            animation: "bounceIn 0.6s ease",
          }}
        >
          ✓
        </div>
      </div>

      <h2
        className="text-2xl font-bold mb-1"
        style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463" }}
      >
        🎉 Thank You, {firstName}!
      </h2>
      <p className="text-base mb-1" style={{ color: "#1A1A2E" }}>
        Your IGEN Application Has Been Submitted Successfully.
      </p>

      {/* Reference ID */}
      <div
        className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-xs font-mono font-semibold"
        style={{ background: "#EEF2FF", color: "#0A2463", border: "1px solid #CBD5E1" }}
      >
        🔖 {submissionId}
      </div>

      <p className="text-sm mb-6" style={{ color: "#6C757D" }}>
        Your application has been saved. Our team will contact you within 24 hours.
      </p>

      {/* Product-specific next steps */}
      {content && (
        <div
          className="text-left rounded-2xl p-5 mb-6"
          style={{ background: "#F8F9FA", border: "1.5px solid #DEE2E6" }}
        >
          <h3 className="font-bold mb-3" style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463", fontSize: "15px" }}>
            {content.headline}
          </h3>
          <ol className="space-y-2">
            {content.next_steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                  style={{ background: "#0A2463", color: "#fff" }}
                >
                  {i + 1}
                </span>
                <span className="text-sm" style={{ color: "#1A1A2E" }}>{step}</span>
              </li>
            ))}
          </ol>

          {/* Product CTA link */}
          {content.cta_url && (
            <a
              href={content.cta_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all"
              style={{
                background: "#EEF2FF",
                color: "#0A2463",
                border: "1.5px solid #0A2463",
                textDecoration: "none",
              }}
            >
              {content.cta_label} →
            </a>
          )}
        </div>
      )}

      {/* Share actions */}
      <div className="space-y-3">
        <a
          id="wa-share-btn"
          href={`https://wa.me/?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full rounded-full py-3.5 text-sm font-bold text-white transition-all"
          style={{
            background: "linear-gradient(135deg, #25D366, #1da851)",
            boxShadow: "0 4px 16px rgba(37, 211, 102, 0.30)",
            textDecoration: "none",
          }}
        >
          📲 Save My Application to WhatsApp
        </a>

        <a
          id="linkedin-share-btn"
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full rounded-full py-3.5 text-sm font-bold transition-all"
          style={{
            background: "#fff",
            border: "2px solid #0A66C2",
            color: "#0A66C2",
            textDecoration: "none",
          }}
        >
          🔗 Share on LinkedIn
        </a>

        <button
          id="copy-json-btn"
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 w-full rounded-full py-3.5 text-sm font-semibold transition-all"
          style={{
            background: "#fff",
            border: "1.5px solid #DEE2E6",
            color: copied ? "#2A9D8F" : "#1A1A2E",
          }}
        >
          {copied ? "✅ Copied to Clipboard!" : "📋 Copy My Submission Data"}
        </button>
      </div>

      {/* Fill another */}
      <button
        id="fill-another-btn"
        onClick={onFillAnother}
        className="mt-5 text-sm font-medium underline"
        style={{ color: "#6C757D", background: "none", border: "none", cursor: "pointer" }}
      >
        ← Fill Another EOI for a Different Product
      </button>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.1); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}} />
    </div>
  );
}
