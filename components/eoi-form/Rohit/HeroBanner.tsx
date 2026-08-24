"use client";

interface HeroBannerProps {
  onCtaClick: () => void;
}

export default function HeroBanner({ onCtaClick }: HeroBannerProps) {
  return (
    <section
      id="eoi-hero"
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0A2463 0%, #1a3a8f 50%, #0d1b4b 100%)",
        minHeight: "560px",
      }}
    >
      {/* Background glow effects */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 40%, #E63946 0%, transparent 45%),
                            radial-gradient(circle at 80% 20%, #F4A261 0%, transparent 45%),
                            radial-gradient(circle at 50% 80%, #2A9D8F 0%, transparent 40%)`,
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-14 md:py-20 text-center">
        {/* Badge / Pill */}
        <div className="flex justify-center mb-6">
          <span
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs md:text-sm font-semibold tracking-wide"
            style={{
              background: "rgba(244, 162, 97, 0.15)",
              border: "1px solid rgba(244, 162, 97, 0.4)",
              color: "#F4A261",
            }}
          >
            🇮🇳 India&apos;s First AI-Powered Trade Intelligence & Industry Ecosystem Platform
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Become a Founding Member of{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #F4A261, #E63946)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            IGEN World
          </span>
          <br />
          Before Everyone Else Joins.
        </h1>

        {/* Sub-headline & Tagline */}
        <p className="text-base md:text-lg mb-2" style={{ color: "rgba(255,255,255,0.85)" }}>
          IGEN News | IGEN Expo | IGEN Awards | Viksit Bharat Conference
        </p>
        <p className="text-sm md:text-base font-semibold mb-8" style={{ color: "#F4A261" }}>
          20 Products. One Ecosystem. Unlimited Opportunity.
        </p>

        {/* Live stats bar */}
        <div
          className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-8 rounded-2xl px-6 py-3.5 mx-auto max-w-xl"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full animate-pulse"
              style={{ background: "#E63946" }}
            />
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">LIVE</span>
          </div>
          <div className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.9)" }}>
            <span className="text-white font-extrabold text-base">1,248</span> EOIs Submitted
          </div>
          <div className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.9)" }}>
            <span className="text-white font-extrabold text-base">64</span> Cities
          </div>
          <div className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.9)" }}>
            <span className="text-white font-extrabold text-base">14</span> Countries
          </div>
        </div>

        {/* Primary CTA */}
        <button
          id="hero-cta-btn"
          onClick={onCtaClick}
          className="rounded-full px-8 py-4 text-base md:text-lg font-extrabold text-white transition-all duration-300 mb-3 cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #E63946 0%, #C1121F 100%)",
            boxShadow: "0 8px 32px rgba(230, 57, 70, 0.45)",
          }}
        >
          → Express Your Interest Now — It&apos;s Free
        </button>

        {/* Reassurance line */}
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.60)" }}>
          Takes less than 60 seconds. No payment. No commitment. Just your interest.
        </p>

        {/* Scroll cue */}
        <div className="flex justify-center mt-10">
          <div className="flex flex-col items-center gap-1 animate-bounce" style={{ color: "rgba(255,255,255,0.40)" }}>
            <span className="text-xs font-medium">↓ Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
