"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { Newspaper, Globe2, UserCircle, Search, User } from "lucide-react";

const TABS = [
  { label: "Feed",    segment: "",        icon: Newspaper },
  { label: "Country", segment: "country", icon: Globe2 },
  { label: "Leader",  segment: "leader",  icon: UserCircle },
  { label: "Search",  segment: "search",  icon: Search },
  { label: "Profile", segment: "profile", icon: User },
];

export default function MobileNavBar() {
  const pathname = usePathname();
  const params   = useParams();
  const locale   = (params?.locale as string) || "en";

  const makeHref = (segment: string) =>
    segment ? `/${locale}/${segment}` : `/${locale}`;

  const isActive = (segment: string) => {
    const href = makeHref(segment);
    // Feed root — exact match only so it doesn't highlight for all pages
    if (!segment) return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--color-neutral-light)] bg-white/95 backdrop-blur-md dark:bg-[var(--background)]/95 dark:border-[var(--color-neutral-mid)] md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-around">
        {TABS.map(({ label, segment, icon: Icon }) => {
          const active = isActive(segment);
          return (
            <Link
              key={label}
              href={makeHref(segment)}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-2.5 text-[10px] font-medium transition-all ${
                active
                  ? "text-[var(--color-primary)]"
                  : "text-[var(--color-neutral-dark)]"
              }`}
            >
              {/* Active indicator — top bar */}
              {active && (
                <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 h-0.5 w-5 rounded-full bg-[var(--color-secondary)]" />
              )}
              <Icon
                className={`h-5 w-5 transition-all ${active ? "scale-110" : ""}`}
                strokeWidth={active ? 2.5 : 1.8}
              />
              <span className={active ? "font-semibold" : ""}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
