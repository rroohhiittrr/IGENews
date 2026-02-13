"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Newspaper,
  LayoutList,
  Grid3X3,
  TrendingUp,
  Search,
  Bookmark,
  Clock,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Feed", href: "/", icon: Newspaper },
  { label: "Headlines", href: "/headlines", icon: LayoutList },
  { label: "Categories", href: "/categories", icon: Grid3X3 },
  { label: "Trending", href: "/trending", icon: TrendingUp },
  { label: "Search", href: "/search", icon: Search },
  { label: "Bookmarks", href: "/mynews?tab=bookmarks", icon: Bookmark },
  { label: "Read Later", href: "/mynews?tab=readlater", icon: Clock },
];

export default function NavigationPanel() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.split("?")[0]);
  };

  return (
    <nav className="space-y-0.5">
      <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-neutral-dark)]">
        Navigations
      </h3>
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-[var(--color-primary)] text-white shadow-sm"
                : "text-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-light)] hover:text-[var(--color-primary)]"
            }`}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
