export default function TrustStrip() {
  const items = [
    {
      icon: "🏆",
      number: "15",
      label: "Products",
      desc: "One form. All 15 IGEN products. From news to expo to awards.",
    },
    {
      icon: "🏭",
      number: "50+",
      label: "Sectors",
      desc: "Covering every major industry sector in India and beyond.",
    },
    {
      icon: "🤖",
      number: "#1",
      label: "AI Platform",
      desc: "India's First AI-Powered Trade Intelligence Ecosystem.",
    },
  ];

  return (
    <section
      id="trust-strip"
      className="w-full py-10 px-4"
      style={{ background: "#F8F9FA", borderBottom: "1px solid #DEE2E6" }}
    >
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center rounded-2xl p-6"
              style={{
                background: "#fff",
                boxShadow: "0 4px 24px rgba(10, 36, 99, 0.07)",
                border: "1.5px solid #DEE2E6",
              }}
            >
              <span className="text-4xl mb-3">{item.icon}</span>
              <span
                className="text-3xl font-extrabold mb-0.5"
                style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463" }}
              >
                {item.number}
              </span>
              <span
                className="text-sm font-bold uppercase tracking-wider mb-2"
                style={{ color: "#E63946" }}
              >
                {item.label}
              </span>
              <p className="text-sm" style={{ color: "#6C757D" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
