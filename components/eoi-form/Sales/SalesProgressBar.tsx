"use client";

interface SalesProgressBarProps {
  currentStep: number; // 0-7
  submitted?: boolean;
}

const STEPS = ["ID", "Profile", "Org", "Goals", "Ecosystem", "Products", "Review", "Submit"];

export default function SalesProgressBar({ currentStep, submitted = false }: SalesProgressBarProps) {
  const totalSteps = STEPS.length;
  const percentage = submitted ? 100 : Math.round(((currentStep) / (totalSteps - 1)) * 90);

  return (
    <div
      className="sticky top-0 z-50 w-full"
      style={{
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(8px)",
        borderBottom: "1.5px solid #DEE2E6",
        boxShadow: "0 2px 12px rgba(10,36,99,0.08)",
      }}
    >
      {/* Desktop */}
      <div className="hidden md:block mx-auto max-w-4xl px-6 py-3">
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "#0A2463", fontFamily: "'Poppins', sans-serif" }}
          >
            IGEN EOI APPLICATION
          </span>
          <span className="text-xs font-semibold" style={{ color: "#6C757D" }}>
            {submitted ? "Submitted ✓" : `Step ${currentStep + 1} of ${totalSteps}`}
          </span>
        </div>

        {/* Step dots */}
        <div className="flex items-center justify-between mb-2">
          {STEPS.map((label, idx) => {
            const isCompleted = submitted ? true : idx < currentStep;
            const isCurrent = !submitted && idx === currentStep;
            return (
              <div key={label} className="flex flex-col items-center" style={{ flex: 1 }}>
                <div className="relative flex items-center justify-center w-full">
                  {idx > 0 && (
                    <div
                      className="absolute left-0 right-1/2 h-0.5"
                      style={{
                        background: isCompleted || isCurrent ? "#2A9D8F" : "#E9ECEF",
                        transition: "background 0.4s ease",
                      }}
                    />
                  )}
                  {idx < STEPS.length - 1 && (
                    <div
                      className="absolute left-1/2 right-0 h-0.5"
                      style={{
                        background: isCompleted ? "#2A9D8F" : "#E9ECEF",
                        transition: "background 0.4s ease",
                      }}
                    />
                  )}
                  <div
                    className="relative z-10 flex items-center justify-center rounded-full text-xs font-bold"
                    style={{
                      width: 26,
                      height: 26,
                      background: submitted
                        ? "#2A9D8F"
                        : isCompleted
                        ? "#2A9D8F"
                        : isCurrent
                        ? "#0A2463"
                        : "#E9ECEF",
                      color: isCompleted || isCurrent || submitted ? "#fff" : "#6C757D",
                      boxShadow: isCurrent ? "0 0 0 4px rgba(10,36,99,0.15)" : "none",
                      transition: "all 0.3s ease",
                      animation: isCurrent ? "pulse 2s infinite" : "none",
                    }}
                  >
                    {isCompleted || submitted ? "✓" : idx + 1}
                  </div>
                </div>
                <span
                  className="mt-1 text-center"
                  style={{
                    fontSize: 10,
                    color: isCurrent ? "#0A2463" : isCompleted || submitted ? "#2A9D8F" : "#6C757D",
                    fontWeight: isCurrent ? 700 : 400,
                    lineHeight: 1.2,
                  }}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress bar fill */}
        <div
          className="w-full rounded-full overflow-hidden"
          style={{ height: 6, background: "#E9ECEF" }}
        >
          <div
            className="h-full rounded-full transition-all duration-500 ease-in-out"
            style={{
              width: `${percentage}%`,
              background: "linear-gradient(90deg, #0A2463, #E63946)",
            }}
          />
        </div>
        <div className="flex justify-end mt-0.5">
          <span style={{ fontSize: 10, color: "#6C757D" }}>{percentage}% Complete</span>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden px-4 py-2.5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold" style={{ color: "#0A2463" }}>
            {submitted ? "Submitted ✓" : `Step ${currentStep + 1} — ${STEPS[currentStep]}`}
          </span>
          <span className="text-xs font-semibold" style={{ color: "#6C757D" }}>{percentage}%</span>
        </div>
        <div className="w-full rounded-full overflow-hidden" style={{ height: 5, background: "#E9ECEF" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${percentage}%`, background: "linear-gradient(90deg, #0A2463, #E63946)" }}
          />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `@keyframes pulse { 0%, 100% { box-shadow: 0 0 0 4px rgba(10,36,99,0.15); } 50% { box-shadow: 0 0 0 7px rgba(10,36,99,0.08); } }`
      }} />
    </div>
  );
}
