"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ExternalLink } from "lucide-react";

interface SubItem {
  label: string;
  href: string;
  external?: boolean;
}

interface MenuItem {
  label: string;
  href: string;
  subItems: SubItem[];
}

const CONTENT_SUBS = (base: string): SubItem[] => [
  { label: "Sector News", href: `${base}?tab=sector` },
  { label: "Country News", href: `${base}?tab=country` },
  { label: "Leader News", href: `${base}?tab=leader` },
  { label: "Explore IGE →", href: "https://indiaglobalexpo.com", external: true },
];

const CATEGORY_SUBS: SubItem[] = [
  { label: "Sector News", href: "/categories/sector" },
  { label: "Country News", href: "/categories/country" },
  { label: "Leader News", href: "/categories/leader" },
];

const MYNEWS_SUBS: SubItem[] = [
  { label: "My Favourites", href: "/mynews?tab=favourites" },
  { label: "My Bookmarks", href: "/mynews?tab=bookmarks" },
  { label: "My Read Later", href: "/mynews?tab=readlater" },
  { label: "My Comments", href: "/mynews?tab=comments" },
  { label: "My Likes", href: "/mynews?tab=likes" },
];

const MENU_ITEMS: MenuItem[] = [
  { label: "Feed", href: "/", subItems: CONTENT_SUBS("/") },
  { label: "Headlines", href: "/headlines", subItems: CONTENT_SUBS("/headlines") },
  { label: "Trending", href: "/trending", subItems: CONTENT_SUBS("/trending") },
  { label: "Categories", href: "/categories/sector", subItems: CATEGORY_SUBS },
  { label: "My News", href: "/mynews", subItems: MYNEWS_SUBS },
];

export default function MegaMenu() {
  const pathname = usePathname();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.split("?")[0]);
  };

  return (
    <nav className="sticky top-16 z-40 border-b border-[var(--color-neutral-light)] bg-white">
      <div className="mx-auto flex max-w-7xl items-center px-4 lg:px-6">
        {MENU_ITEMS.map((item, index) => (
          <div
            key={item.label}
            className="mega-menu-item relative"
            onMouseEnter={() => setOpenIndex(index)}
            onMouseLeave={() => setOpenIndex(null)}
          >
            <Link
              href={item.href}
              className={`flex items-center gap-1 px-4 py-3 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "border-b-2 border-[var(--color-secondary)] text-[var(--color-primary)]"
                  : "text-[var(--color-neutral-dark)] hover:text-[var(--color-primary)]"
              }`}
            >
              {item.label}
              <ChevronDown className={`h-3 w-3 transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
            </Link>

            {/* Dropdown */}
            <div
              className={`mega-menu-dropdown absolute left-0 top-full min-w-[200px] rounded-b-lg border border-t-0 border-[var(--color-neutral-light)] bg-white py-1 shadow-lg ${
                openIndex === index ? "!opacity-100 !visible !transform-none" : ""
              }`}
            >
              {item.subItems.map((sub) => (
                <Link
                  key={sub.label}
                  href={sub.href}
                  target={sub.external ? "_blank" : undefined}
                  rel={sub.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--color-neutral-dark)] transition-colors hover:bg-[var(--color-neutral-light)] hover:text-[var(--color-primary)]"
                  onClick={() => setOpenIndex(null)}
                >
                  {sub.label}
                  {sub.external && <ExternalLink className="h-3 w-3 text-[var(--color-accent-green)]" />}
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Top News - Coming Soon */}
        <div className="px-4 py-3">
          <span className="flex items-center gap-1 text-sm font-medium text-[var(--color-neutral-mid)] cursor-not-allowed">
            Top News
            <span className="rounded-full bg-[var(--color-neutral-light)] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--color-neutral-mid)]">
              Soon
            </span>
          </span>
        </div>
      </div>
    </nav>
  );
}
