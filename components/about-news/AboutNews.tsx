import Link from "next/link";
import { Globe, Users, BarChart3 } from "lucide-react";

export default function AboutNews() {
  return (
    <div className="rounded-xl border border-[var(--color-neutral-light)] bg-gradient-to-br from-white to-[var(--color-neutral-light)]/50 p-4">
      <h3
        className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-neutral-dark)] mb-2"
      >
        About News
      </h3>
      <h4
        className="text-base font-bold text-[var(--color-primary)] mb-1"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Global Signal Desk
      </h4>
      <p className="text-xs text-[var(--color-neutral-dark)] mb-3 leading-relaxed">
        Curated reporting, community commentary and personalised digests for
        teams.
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className="rounded-full bg-[var(--color-neutral-light)] px-2 py-0.5 text-[10px] text-[var(--color-neutral-dark)]">
          Est. 2025
        </span>
        <span className="rounded-full bg-[var(--color-neutral-light)] px-2 py-0.5 text-[10px] text-[var(--color-neutral-dark)]">
          Global
        </span>
        <span className="rounded-full bg-[var(--color-neutral-light)] px-2 py-0.5 text-[10px] text-[var(--color-neutral-dark)]">
          Community-led
        </span>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-3 text-[11px] text-[var(--color-neutral-dark)]">
        <span className="flex items-center gap-1">
          <Globe className="h-3 w-3" /> 10 Countries
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-3 w-3" /> 20 Sectors
        </span>
      </div>

      {/* Newsletter */}
      <div className="mt-3 pt-3 border-t border-[var(--color-neutral-light)]">
        <label className="text-[11px] font-medium text-[var(--color-neutral-dark)]">
          Subscribe to Newsletter
        </label>
        <div className="mt-1 flex gap-1">
          <input
            type="email"
            placeholder="you@company.com"
            className="flex-1 rounded-lg border border-[var(--color-neutral-mid)] bg-white px-2 py-1.5 text-xs outline-none focus:border-[var(--color-secondary)]"
          />
          <button className="rounded-lg bg-[var(--color-primary)] px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-[var(--color-primary-dark)]">
            Go
          </button>
        </div>
      </div>

      {/* IGE Link */}
      <Link
        href="https://indiaglobalexpo.com"
        target="_blank"
        className="mt-3 flex items-center gap-1.5 text-xs font-medium text-[var(--color-accent-green)] hover:underline"
      >
        <BarChart3 className="h-3 w-3" />
        India Global Expo →
      </Link>

      {/* Footer links */}
      <div className="mt-3 pt-3 border-t border-[var(--color-neutral-light)] flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-[var(--color-neutral-dark)]">
        <Link href="/about" className="hover:text-[var(--color-primary)]">About</Link>
        <Link href="/privacy" className="hover:text-[var(--color-primary)]">Privacy</Link>
        <Link href="/terms" className="hover:text-[var(--color-primary)]">Terms</Link>
        <Link href="/help" className="hover:text-[var(--color-primary)]">Help</Link>
      </div>
    </div>
  );
}
