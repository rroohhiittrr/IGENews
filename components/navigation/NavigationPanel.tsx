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
import { useTranslations } from "next-intl";



export default function NavigationPanel() {
  const pathname = usePathname();
  const t = useTranslations("nav");

  const navItems = [
    { label: t("feed"), href: "/", icon: Newspaper },
    { label: t("headlines"), href: "/headlines", icon: LayoutList },
    { label: t("categories"), href: "/categories", icon: Grid3X3 },
    { label: t("trending"), href: "/trending", icon: TrendingUp },
    { label: t("search"), href: "/search", icon: Search },
    { label: t("bookmarks"), href: "/mynews?tab=bookmarks", icon: Bookmark },
    { label: t("readLater"), href: "/mynews?tab=readlater", icon: Clock },
  ];

  const isActive = (href: string) => {
    // Handle locale prefix in pathname
    const cleanPath = pathname.replace(/^\/(en|hi|ta|kn)/, '') || '/';
    if (href === "/") return cleanPath === "/";
    return cleanPath.startsWith(href.split("?")[0]);
  };

  return (
    <nav className="space-y-0.5">
      <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-neutral-dark)]">
        Navigations
      </h3>
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);
        return (
          <Link
            key={item.href} // Changed key to href since label might change
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
