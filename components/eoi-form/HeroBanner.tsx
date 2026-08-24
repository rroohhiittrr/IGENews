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
      {/* Abstract background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #E63946 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, #F4A261 0%, transparent 50%),
                            radial-gradient(circle at 60% 80%, #2A9D8F 0%, transparent 40%)`,
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-16 md:py-24 text-center">
        {/* Top badge */}
        <div className="flex justify-center mb-6">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide"
            style={{
              background: "rgba(244, 162, 97, 0.15)",
              border: "1px solid rgba(244, 162, 97, 0.4)",
              color: "#F4A261",
            }}
          >
            🇮🇳 India&apos;s First AI-Powered Trade Intelligence & Industry Ecosystem Platform
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Become a Founding Member of
          <br />
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

        {/* Sub-headline */}
        <p className="text-base md:text-lg mb-8 max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.75)" }}>
          IGEN News | IGEN Expo | IGEN Awards | Viksit Bharat Conference
          <br />
          <span className="font-semibold text-white">15 Products. One Ecosystem. Unlimited Opportunity.</span>
        </p>

        {/* Counter strip */}
        <div
          className="flex flex-wrap justify-center items-center gap-4 mb-8 rounded-2xl px-6 py-3 mx-auto max-w-lg"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-full animate-pulse"
              style={{ background: "#E63946" }}
            />
            <span className="text-xs font-bold text-white">LIVE</span>
          </div>
          <div className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>
            <span className="text-white font-extrabold">847</span> EOIs Submitted
          </div>
          <div className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>
            <span className="text-white font-extrabold">42</span> Cities
          </div>
          <div className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>
            <span className="text-white font-extrabold">8</span> Countries
          </div>
        </div>

        {/* CTA Button */}
        <button
          id="hero-cta-btn"
          onClick={onCtaClick}
          className="rounded-full px-8 py-4 text-lg font-extrabold text-white transition-all duration-200 mb-3"
          style={{
            background: "linear-gradient(135deg, #E63946 0%, #c0392b 100%)",
            boxShadow: "0 8px 32px rgba(230, 57, 70, 0.50)",
            letterSpacing: "0.01em",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-3px) scale(1.02)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 40px rgba(230,57,70,0.60)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0) scale(1)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(230,57,70,0.50)";
          }}
        >
          → Express Your Interest Now — It&apos;s Free
        </button>

        <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
          Takes less than 60 seconds. No payment. No commitment. Just your interest.
        </p>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-10">
          <div
            className="flex flex-col items-center gap-1 animate-bounce"
            style={{ color: "rgba(255,255,255,0.40)" }}
          >
            <div className="h-6 w-px" style={{ background: "rgba(255,255,255,0.25)" }} />
            <span className="text-xs">Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
