export default function Page() {
  const title = "country-news";
  return (
    <div className="container mx-auto px-4 py-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-display font-bold text-[var(--color-primary)] mb-4 capitalize">
        {title.replace(/-/g, ' ')}
      </h1>
      <p className="text-[var(--color-neutral-dark)] mb-8">
        This section is currently under development.
      </p>
      <a href="/en/about-igen" className="text-sm font-semibold text-[var(--color-accent-gold-dark)] hover:underline">
        ← Back to About IGEN
      </a>
    </div>
  );
}
