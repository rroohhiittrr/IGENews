"use client";

interface SalesEcosystemSnapshotProps {
  onStartClick: () => void;
}

const PLATFORMS = [
  { icon: "🌐", name: "IGEN EXPO", sub: "Trade & Export Intelligence", detail: "195 Countries" },
  { icon: "📰", name: "IGEN NEWS", sub: "Industry Intel", detail: "SMEs · Leaders · Companies" },
  { icon: "🏅", name: "IGEN AWARDS", sub: "Industry Recognition", detail: "6 Categories per Sector" },
  { icon: "🇮🇳", name: "VIKSIT BHARAT CONF.", sub: "Vision 2047", detail: "Industry Summit" },
  { icon: "🤝", name: "IGEN PARTNERS", sub: "Grow with IGEN", detail: "City · Sector" },
  { icon: "💎", name: "IGEN SPONSORS", sub: "Own a Category", detail: "National Reach" },
  { icon: "👔", name: "IGEN LEADERS", sub: "Executive Legacy", detail: "CEO · MD · CXO · Permanent Page" },
];

export default function SalesEcosystemSnapshot({ onStartClick }: SalesEcosystemSnapshotProps) {
  return (
    <section className="w-full py-14 px-4" style={{ background: "#F8F9FA" }}>
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="text-center mb-10">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
            style={{ background: "rgba(10,36,99,0.08)", color: "#0A2463" }}
          >
            The IGEN Ecosystem
          </span>
          <h2
            className="font-extrabold"
            style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463", fontSize: "clamp(22px, 4vw, 32px)" }}
          >
            One Ecosystem. Every Business Opportunity.
          </h2>
        </div>

        {/* Platform cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {PLATFORMS.slice(0, 4).map((p) => (
            <PlatformCard key={p.name} {...p} />
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {PLATFORMS.slice(4).map((p) => (
            <PlatformCard key={p.name} {...p} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            id="sales-ecosystem-start-btn"
            onClick={onStartClick}
            className="inline-flex items-center gap-2 font-bold transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #0A2463, #1a3a7a)",
              color: "#fff",
              border: "none",
              borderRadius: 50,
              padding: "16px 44px",
              fontSize: 16,
              cursor: "pointer",
              boxShadow: "0 8px 28px rgba(10,36,99,0.25)",
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            Start Your Discovery Journey →
          </button>
        </div>
      </div>
    </section>
  );
}

function PlatformCard({ icon, name, sub, detail }: { icon: string; name: string; sub: string; detail: string }) {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-1 transition-all duration-300 cursor-pointer"
      style={{
        background: "#fff",
        border: "1.5px solid #DEE2E6",
        boxShadow: "0 4px 24px rgba(10,36,99,0.06)",
      }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 8px 32px rgba(10,36,99,0.14)"; el.style.transform = "translateY(-3px)"; el.style.borderColor = "#0A2463"; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 4px 24px rgba(10,36,99,0.06)"; el.style.transform = "none"; el.style.borderColor = "#DEE2E6"; }}
    >
      <span className="text-2xl">{icon}</span>
      <span className="font-bold text-sm" style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463" }}>{name}</span>
      <span className="text-xs" style={{ color: "#6C757D" }}>{sub}</span>
      <span className="text-xs font-medium" style={{ color: "#1A1A2E" }}>{detail}</span>
      <span className="text-xs font-semibold mt-1" style={{ color: "#E63946" }}>Explore →</span>
    </div>
  );
}
