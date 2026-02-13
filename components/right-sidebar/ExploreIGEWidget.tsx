import Link from "next/link";
import { ExternalLink, BarChart3, Globe, Users } from "lucide-react";

export default function ExploreIGEWidget() {
  return (
    <div className="rounded-xl border border-[var(--color-accent-green)]/30 bg-gradient-to-br from-[var(--color-accent-green)]/5 to-white p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <BarChart3 className="h-4 w-4 text-[var(--color-accent-green)]" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-green)]">
          About IGE
        </h3>
      </div>

      <p className="text-xs text-[var(--color-neutral-dark)] mb-3 leading-relaxed">
        India Global Expo — B2B platform connecting exporters, importers, and service providers worldwide.
      </p>

      <div className="flex items-center gap-3 text-[10px] text-[var(--color-neutral-dark)] mb-3">
        <span className="flex items-center gap-1">
          <Globe className="h-3 w-3" /> 50+ Countries
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-3 w-3" /> 10K+ Companies
        </span>
      </div>

      <Link
        href="https://indiaglobalexpo.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 rounded-lg bg-[var(--color-accent-green)] py-2 text-xs font-semibold text-white transition-all hover:bg-[var(--color-accent-green)]/90 hover:shadow-md"
      >
        Visit India Global Expo
        <ExternalLink className="h-3 w-3" />
      </Link>
    </div>
  );
}
