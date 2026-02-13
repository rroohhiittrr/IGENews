import { ExternalLink, ArrowRight } from "lucide-react";

export default function ExploreIGEWidget() {
  return (
    <a
      href="https://indiaglobalexpo.com"
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl border border-[var(--color-accent-green)]/20 bg-[var(--color-accent-green-light)] p-4 transition-all hover:border-[var(--color-accent-green)]/40 hover:shadow-md"
    >
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-accent-green)] text-white text-xs font-bold">
          IGE
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[var(--color-accent-green-dark)]">
            India Global Expo
          </h4>
          <p className="text-[10px] text-[var(--color-accent-green)]">B2B Trade Platform</p>
        </div>
        <ExternalLink className="ml-auto h-4 w-4 text-[var(--color-accent-green)]" />
      </div>
      <p className="mb-2 text-xs text-[var(--color-neutral-dark)]">
        Looking for trade partners? Explore exhibitors, events, and products across 20+ sectors.
      </p>
      <span className="flex items-center gap-1 text-xs font-semibold text-[var(--color-accent-green)] group-hover:gap-2 transition-all">
        Explore IGE <ArrowRight className="h-3 w-3" />
      </span>
    </a>
  );
}
