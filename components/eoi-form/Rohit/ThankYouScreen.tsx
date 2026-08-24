"use client";

import { useState } from "react";
import { ProductId, THANK_YOU_CONTENT, PRODUCT_INFO } from "./data/productData";
import { SubmissionData, copyToClipboard } from "./utils/formUtils";

interface ThankYouScreenProps {
  submission: SubmissionData;
  onFillAnother: () => void;
}

export default function ThankYouScreen({
  submission,
  onFillAnother,
}: ThankYouScreenProps) {
  const [copiedId, setCopiedId] = useState(false);
  const [copiedData, setCopiedData] = useState(false);

  const productId = submission.meta.product_id as ProductId;
  const content = THANK_YOU_CONTENT[productId];
  const product = PRODUCT_INFO[productId];

  const firstName = submission.step1.full_name.split(" ")[0] || "Partner";
  const submissionId = submission.meta.submission_id;

  const handleCopyId = async () => {
    const ok = await copyToClipboard(submissionId);
    if (ok) {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2500);
    }
  };

  const handleCopyData = async () => {
    const ok = await copyToClipboard(JSON.stringify(submission, null, 2));
    if (ok) {
      setCopiedData(true);
      setTimeout(() => setCopiedData(false), 2500);
    }
  };

  const waText = encodeURIComponent(
    content?.share_message ||
      `I just registered on IGEN World! Reference: ${submissionId} → www.igenworld.com`
  );
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=https://igenworld.com`;

  return (
    <div id="thank-you-screen" className="text-center max-w-xl mx-auto py-4">
      {/* Animated Success Checkmark */}
      <div className="flex justify-center mb-5">
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full text-4xl text-white font-extrabold shadow-xl"
          style={{
            background: "linear-gradient(135deg, #2A9D8F, #1a7a70)",
            boxShadow: "0 8px 32px rgba(42, 157, 143, 0.40)",
          }}
        >
          ✓
        </div>
      </div>

      <h2
        className="text-2xl md:text-3xl font-extrabold mb-1"
        style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463" }}
      >
        🎉 Thank You, {firstName}!
      </h2>
      <p className="text-sm md:text-base font-semibold mb-3 text-slate-700">
        Your IGEN Application Has Been Submitted Successfully.
      </p>

      {/* Copyable Reference ID Badge */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <button
          onClick={handleCopyId}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs md:text-sm font-mono font-bold transition-all border cursor-pointer hover:shadow-md"
          style={{
            background: "#EEF2FF",
            color: "#0A2463",
            borderColor: "#CBD5E1",
          }}
        >
          <span>🔖 Reference ID: {submissionId}</span>
          <span className="text-xs bg-indigo-200 text-indigo-900 px-2 py-0.5 rounded-full font-sans">
            {copiedId ? "✓ Copied!" : "📋 Copy"}
          </span>
        </button>
      </div>

      <p className="text-xs md:text-sm mb-6 text-slate-500">
        Your application has been saved in our CRM. Our team will contact you within 24 hours.
      </p>

      {/* Reward / Recognition Banner */}
      {content?.reward && (
        <div
          className="rounded-2xl p-4 mb-6 text-xs md:text-sm font-bold shadow-sm"
          style={{
            background: "linear-gradient(135deg, #FFF7ED, #FFEDD5)",
            color: "#C2440E",
            border: "1.5px solid #FDBA74",
          }}
        >
          🌟 {content.reward}
        </div>
      )}

      {/* Product Next-Steps Block */}
      {content && (
        <div
          className="text-left rounded-2xl p-5 md:p-6 mb-6"
          style={{ background: "#F8FAFC", border: "1.5px solid #E2E8F0" }}
        >
          <h3
            className="font-bold mb-4 text-base"
            style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463" }}
          >
            What Happens Next?
          </h3>
          <ol className="space-y-3">
            {content.next_steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ background: "#0A2463" }}
                >
                  {i + 1}
                </span>
                <span className="text-xs md:text-sm font-medium text-slate-800">
                  {step}
                </span>
              </li>
            ))}
          </ol>

          {/* Download Brochure CTA button */}
          {content.cta_url && (
            <div className="mt-6 pt-4 border-t border-slate-200 text-center">
              <a
                href={content.cta_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs md:text-sm font-extrabold transition-all shadow-sm"
                style={{
                  background: "#0A2463",
                  color: "#ffffff",
                  textDecoration: "none",
                }}
              >
                📥 {content.cta_label || "Download Brochure →"}
              </a>
            </div>
          )}
        </div>
      )}

      {/* Share Actions */}
      <div className="space-y-3">
        <a
          id="wa-share-btn"
          href={`https://wa.me/?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full rounded-full py-3.5 text-sm font-extrabold text-white transition-all shadow-md cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #25D366, #1da851)",
            textDecoration: "none",
          }}
        >
          📲 Save Application Details to WhatsApp
        </a>

        <a
          id="linkedin-share-btn"
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full rounded-full py-3.5 text-sm font-bold transition-all border cursor-pointer"
          style={{
            background: "#ffffff",
            borderColor: "#0A66C2",
            color: "#0A66C2",
            textDecoration: "none",
          }}
        >
          🔗 Share on LinkedIn
        </a>

        <button
          id="copy-json-btn"
          onClick={handleCopyData}
          className="flex items-center justify-center gap-2 w-full rounded-full py-3.5 text-sm font-bold transition-all border cursor-pointer"
          style={{
            background: "#ffffff",
            borderColor: "#CBD5E1",
            color: copiedData ? "#2A9D8F" : "#4A5568",
          }}
        >
          {copiedData ? "✅ Submission Data Copied!" : "📋 Copy Submission Data"}
        </button>
      </div>

      {/* Secondary Link */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <button
          id="fill-another-btn"
          onClick={onFillAnother}
          className="text-xs md:text-sm font-extrabold text-indigo-900 hover:text-indigo-700 underline cursor-pointer"
        >
          ← Fill Another EOI for a Different Product
        </button>
      </div>
    </div>
  );
}
