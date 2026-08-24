"use client";

export default function SalesTrustStrip() {
  const stats = [
    { icon: "🌍", value: "195", label: "Countries Network" },
    { icon: "📊", value: "50", label: "Sectors Covered" },
    { icon: "🏢", value: "10+", label: "Products" },
    { icon: "👥", value: "1,000+", label: "Members Target" },
    { icon: "🏆", value: "6", label: "Award Categories" },
  ];

  return (
    <section className="w-full py-10 px-4" style={{ background: "#FFFFFF", borderBottom: "1.5px solid #DEE2E6" }}>
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center text-center p-4 rounded-2xl transition-all duration-300"
              style={{ background: "#F8F9FA", border: "1.5px solid #DEE2E6" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(10,36,99,0.10)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
            >
              <span className="text-3xl mb-1">{s.icon}</span>
              <span
                className="text-xl font-extrabold"
                style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463" }}
              >
                {s.value}
              </span>
              <span className="text-xs mt-0.5" style={{ color: "#6C757D" }}>{s.label}</span>
            </div>
          ))}
        </div>

        <p
          className="text-center text-sm italic"
          style={{ color: "#6C757D", borderTop: "1px solid #DEE2E6", paddingTop: 16 }}
        >
          "Backed by 30 years of ICE Exhibition legacy — India's most trusted trade intelligence ecosystem."
        </p>
      </div>
    </section>
  );
}
