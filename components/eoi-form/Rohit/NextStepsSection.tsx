export default function NextStepsSection() {
  const steps = [
    {
      icon: "📋",
      title: "Submit Your EOI",
      desc: "Fill out your expression of interest in under 5 minutes. No payment required.",
    },
    {
      icon: "📞",
      title: "Team Contacts You",
      desc: "Our dedicated onboarding team calls you within 24 hours to discuss your application.",
    },
    {
      icon: "📄",
      title: "Receive Your Pack",
      desc: "Get your product brochure, pricing details, and onboarding requirements on WhatsApp + Email.",
    },
    {
      icon: "🛠️",
      title: "Profile Created",
      desc: "Our team builds your IGEN profile or page and reviews it before platform launch.",
    },
    {
      icon: "🚀",
      title: "Go Live at Launch",
      desc: "Your page, profile, or participation goes live when IGEN officially launches — with founding member advantages.",
    },
  ];

  return (
    <section id="next-steps" className="w-full px-4 py-14" style={{ background: "#fff" }}>
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <h2
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463" }}
          >
            What Happens After Your EOI?
          </h2>
          <p className="text-sm" style={{ color: "#6C757D" }}>
            Here&apos;s the simple 5-step journey from your expression of interest to going live on IGEN.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical line (desktop hidden) */}
          <div className="flex flex-col md:flex-row gap-4">
            {steps.map((step, i) => (
              <div key={i} className="flex-1 flex flex-col items-center text-center relative">
                {/* Connector */}
                {i < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-8 left-[calc(50%+32px)] w-full h-0.5"
                    style={{ background: "linear-gradient(90deg, #0A2463, #DEE2E6)", opacity: 0.3 }}
                  />
                )}
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl text-2xl mb-3 relative z-10"
                  style={{
                    background: i === 0
                      ? "linear-gradient(135deg, #0A2463, #1a3a8f)"
                      : "#F8F9FA",
                    border: i === 0 ? "none" : "2px solid #DEE2E6",
                    boxShadow: i === 0 ? "0 4px 16px rgba(10,36,99,0.25)" : "none",
                  }}
                >
                  {step.icon}
                </div>
                <div
                  className="text-xs font-bold uppercase tracking-wider mb-1"
                  style={{ color: i === 0 ? "#E63946" : "#6C757D" }}
                >
                  Step {i + 1}
                </div>
                <h3
                  className="text-sm font-bold mb-1"
                  style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463" }}
                >
                  {step.title}
                </h3>
                <p className="text-xs" style={{ color: "#6C757D" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
