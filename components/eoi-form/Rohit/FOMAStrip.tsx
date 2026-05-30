export default function FOMAStrip() {
  return (
    <section
      id="foma-strip"
      className="w-full px-4 py-5"
      style={{
        background: "linear-gradient(135deg, #E63946 0%, #c0392b 100%)",
      }}
    >
      <div className="mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-3 w-3 rounded-full animate-pulse"
            style={{ background: "#fff", opacity: 0.8 }}
          />
          <span className="text-sm font-bold text-white uppercase tracking-wider">
            Founding Slots Are Filling Fast
          </span>
        </div>
        <div className="hidden sm:block h-4 w-px bg-white opacity-40" />
        <p className="text-sm text-white" style={{ opacity: 0.92 }}>
          🔥 <strong>Limited founding member positions available.</strong>{" "}
          Join before the platform launches and lock in your founding advantage.
        </p>
      </div>
    </section>
  );
}
