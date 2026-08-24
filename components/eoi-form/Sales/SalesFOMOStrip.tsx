"use client";

interface SalesFOMOStripProps {
  onSecureClick: () => void;
}

export default function SalesFOMOStrip({ onSecureClick }: SalesFOMOStripProps) {
  return (
    <section
      className="w-full py-10 px-4"
      style={{ background: "linear-gradient(135deg, #E63946, #C1121F)" }}
    >
      <div className="mx-auto max-w-4xl text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-white" style={{ animation: "fomoBlink 1s infinite" }} />
          <span
            className="text-sm font-extrabold uppercase tracking-widest text-white"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            FOUNDING MEMBER ACCESS — APPLICATIONS OPEN NOW
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-6">
          <div className="text-white/90 text-sm">
            <strong className="text-white">First 100 SMEs:</strong> Year 1 FREE
          </div>
          <div className="hidden md:block w-px h-5 bg-white/30" />
          <div className="text-white/90 text-sm">
            <strong className="text-white">First 500 Readers:</strong> Founding Badge
          </div>
          <div className="hidden md:block w-px h-5 bg-white/30" />
          <div className="text-white/90 text-sm">
            <strong className="text-white">Priority</strong> Platform Onboarding
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-6">
          {[
            "✓ Priority Onboarding",
            "✓ Founding Recognition",
            "✓ Early Platform Access",
            "✓ Exclusive Opportunities",
            "✓ Influence Product Direction",
          ].map((item) => (
            <span key={item} className="text-white/90 text-sm font-medium">{item}</span>
          ))}
        </div>

        <button
          id="sales-fomo-secure-btn"
          onClick={onSecureClick}
          className="inline-flex items-center gap-2 font-bold transition-all duration-300"
          style={{
            background: "#fff",
            color: "#E63946",
            border: "none",
            borderRadius: 50,
            padding: "14px 36px",
            fontSize: 15,
            cursor: "pointer",
            boxShadow: "0 6px 24px rgba(0,0,0,0.15)",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
        >
          🔒 Secure Founding Access
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `@keyframes fomoBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }` }} />
    </section>
  );
}
