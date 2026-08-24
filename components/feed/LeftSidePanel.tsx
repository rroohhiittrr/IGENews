"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Megaphone,
  Grid3X3,
  Flame,
  Search,
  Bookmark,
  Clock,
  Send,
  ExternalLink,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Feed", href: "/", icon: Home },
  { label: "Headlines", href: "/headlines", icon: Megaphone },
  { label: "Categories", href: "/categories/sector", icon: Grid3X3 },
  { label: "Trending", href: "/trending", icon: Flame },
  { label: "Search", href: "/search", icon: Search },
];

const QUICK_LINKS = [
  { label: "Bookmarks", href: "/mynews?tab=bookmarks", icon: Bookmark },
  { label: "Read Later", href: "/mynews?tab=readlater", icon: Clock },
];

export default function LeftSidePanel() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.split("?")[0]);
  };

  return (
    <aside className="hidden lg:block w-full space-y-4">
      {/* Navigation */}
      <div className="rounded-xl border border-[var(--color-neutral-light)] bg-white p-3 shadow-[var(--shadow-card)]">
        <h4 className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-[var(--color-neutral-dark)]">
          Navigations
        </h4>
        <nav className="space-y-0.5">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                isActive(href)
                  ? "bg-[var(--color-primary)] text-white shadow-sm"
                  : "text-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-light)] hover:text-[var(--color-primary)]"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Quick Links */}
        <div className="mt-3 border-t border-[var(--color-neutral-light)] pt-3">
          {QUICK_LINKS.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-neutral-dark)] transition-all hover:bg-[var(--color-neutral-light)] hover:text-[var(--color-primary)]"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* About News Card */}
      <div className="rounded-xl border border-[var(--color-neutral-light)] bg-white p-4 shadow-[var(--shadow-card)]">
        <h4 className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[var(--color-neutral-dark)]">
          About News
        </h4>
        <h3 className="mb-1 text-sm font-bold text-[var(--color-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
          Global Signal Desk
        </h3>
        <p className="mb-3 text-xs leading-relaxed text-[var(--color-neutral-dark)]">
          Curated reporting, community commentary and personalised digests for teams.
        </p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="rounded-full bg-[var(--color-neutral-light)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-neutral-dark)]">
            Est. 2025
          </span>
          <span className="rounded-full bg-[var(--color-neutral-light)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-neutral-dark)]">
            Global
          </span>
          <span className="rounded-full bg-[var(--color-neutral-light)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-neutral-dark)]">
            Community-led
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-lg font-bold text-[var(--color-primary)]">2.4K</div>
            <div className="text-[10px] text-[var(--color-neutral-dark)]">Members</div>
          </div>
          <div>
            <div className="text-lg font-bold text-[var(--color-primary)]">12</div>
            <div className="text-[10px] text-[var(--color-neutral-dark)]">Bureaus</div>
          </div>
          <div>
            <div className="text-lg font-bold text-[var(--color-primary)]">156</div>
            <div className="text-[10px] text-[var(--color-neutral-dark)]">Briefings</div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="rounded-xl border border-[var(--color-neutral-light)] bg-[var(--color-primary)] p-4 shadow-[var(--shadow-card)]">
        <p className="mb-2 text-xs font-semibold text-[var(--color-accent-gold)]">📧 Newsletter</p>
        <div className="flex rounded-lg overflow-hidden">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 border-0 bg-white/15 px-3 py-2 text-xs text-white placeholder-white/50 outline-none"
          />
          <button className="flex items-center bg-[var(--color-accent-gold)] px-2.5 py-2 text-xs font-semibold text-white hover:bg-[var(--color-accent-gold-dark)]">
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Explore IGE */}
      <a
        href="https://indiaglobalexpo.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-xl border border-[var(--color-accent-green)]/20 bg-[var(--color-accent-green-light)] p-3 transition-all hover:border-[var(--color-accent-green)]/40"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded bg-[var(--color-accent-green)] text-[10px] font-bold text-white">
          IGE
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold text-[var(--color-accent-green-dark)]">Explore India Global Expo →</p>
          <p className="text-[10px] text-[var(--color-neutral-dark)]">Trade events & exhibitors</p>
        </div>
        <ExternalLink className="h-3.5 w-3.5 text-[var(--color-accent-green)]" />
      </a>

      {/* Footer Links */}
      <div className="px-2 text-[10px] text-[var(--color-neutral-dark)]">
        <Link href="/privacy" className="hover:text-[var(--color-primary)]">Privacy</Link>
        <span className="mx-1">·</span>
        <Link href="/terms" className="hover:text-[var(--color-primary)]">Terms</Link>
        <div className="mt-1">@2026 News · V0.1.0</div>
      </div>
    </aside>
  );
}
