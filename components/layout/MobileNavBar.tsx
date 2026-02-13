"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Newspaper, Globe2, UserCircle, Search, User } from "lucide-react";

const TABS = [
  { label: "Feed", href: "/", icon: Newspaper },
  { label: "Country", href: "/country", icon: Globe2 },
  { label: "Leader", href: "/leader", icon: UserCircle },
  { label: "Search", href: "/search", icon: Search },
  { label: "Profile", href: "/profile", icon: User },
];

export default function MobileNavBar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--color-neutral-light)] bg-white/95 backdrop-blur-md md:hidden">
      <div className="flex items-center justify-around">
        {TABS.map(({ label, href, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={label}
              href={href}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-2.5 text-[10px] font-medium transition-all ${
                active
                  ? "text-[var(--color-primary)]"
                  : "text-[var(--color-neutral-dark)]"
              }`}
            >
              {/* Active indicator dot */}
              {active && (
                <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 h-0.5 w-5 rounded-full bg-[var(--color-secondary)]" />
              )}
              <Icon
                className={`h-5 w-5 transition-all ${
                  active ? "scale-110" : ""
                }`}
                strokeWidth={active ? 2.5 : 1.8}
              />
              <span className={active ? "font-semibold" : ""}>{label}</span>
            </Link>
          );
        })}
      </div>

      {/* Safe area spacer for iPhone notch */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
