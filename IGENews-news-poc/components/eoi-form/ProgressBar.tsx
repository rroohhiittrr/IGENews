"use client";

interface ProgressBarProps {
  currentStep: number; // 1–4
  submitted?: boolean;
}

const steps = [
  { label: "Quick Entry", short: "1" },
  { label: "Business", short: "2" },
  { label: "Product Details", short: "3" },
  { label: "Intent & Goals", short: "4" },
];

export default function ProgressBar({ currentStep, submitted = false }: ProgressBarProps) {
  const pct = submitted ? 100 : currentStep === 1 ? 25 : currentStep === 2 ? 50 : currentStep === 3 ? 75 : 90;

  return (
    <div
      className="sticky top-0 z-50 bg-white border-b border-gray-100"
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
    >
      <div className="max-w-2xl mx-auto px-4 py-3">
        {/* Step indicators */}
        <div className="flex items-center justify-between mb-2.5">
          {steps.map((step, i) => {
            const stepNum = i + 1;
            const isCompleted = stepNum < currentStep || submitted;
            const isActive = stepNum === currentStep && !submitted;
            return (
              <div key={i} className="flex-1 flex flex-col items-center relative">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div
                    className="absolute top-4 left-1/2 w-full h-0.5 -translate-y-1/2"
                    style={{
                      background: isCompleted ? "#2A9D8F" : "#CED4DA",
                      transition: "background 0.4s ease",
                    }}
                  />
                )}
                {/* Circle */}
                <div
                  className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300"
                  style={{
                    background: isCompleted
                      ? "#2A9D8F"
                      : isActive
                      ? "#0A2463"
                      : "#E9ECEF",
                    color: isCompleted || isActive ? "#fff" : "#6C757D",
                    boxShadow: isActive ? "0 0 0 3px rgba(10,36,99,0.20)" : "none",
                    transform: isActive ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  {isCompleted ? "✓" : step.short}
                </div>
                {/* Label — hidden on very small screens */}
                <span
                  className="mt-1 hidden sm:block text-[10px] font-medium text-center leading-tight"
                  style={{ color: isActive ? "#0A2463" : isCompleted ? "#2A9D8F" : "#6C757D" }}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress bar track */}
        <div
          className="w-full rounded-full overflow-hidden"
          style={{ height: "8px", background: "#E9ECEF" }}
        >
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${pct}%`,
              background: submitted
                ? "#2A9D8F"
                : "linear-gradient(90deg, #0A2463, #E63946)",
            }}
          />
        </div>

        {/* Percentage text */}
        <p className="mt-1 text-right text-[11px] font-medium" style={{ color: "#6C757D" }}>
          {submitted ? "✅ 100% Complete — Submitted!" : `Step ${currentStep} of 4 — ${pct}% Complete`}
        </p>
      </div>
    </div>
  );
}
