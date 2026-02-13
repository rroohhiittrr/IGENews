"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import MenuDropdown from "./MenuDropdown";
import { FEED_ITEMS } from "./FeedMenu";
import { HEADLINES_ITEMS } from "./HeadlinesMenu";
import { TRENDING_ITEMS } from "./TrendingMenu";
import { CATEGORIES_ITEMS } from "./CategoriesMenu";
import { MYNEWS_ITEMS } from "./MyNewsMenu";

const MENU_ITEMS = [
  { label: "Feed", href: "/", subItems: FEED_ITEMS },
  { label: "Headlines", href: "/headlines", subItems: HEADLINES_ITEMS },
  { label: "Trending", href: "/trending", subItems: TRENDING_ITEMS },
  { label: "Categories", href: "/categories/sector", subItems: CATEGORIES_ITEMS },
  { label: "My News", href: "/mynews", subItems: MYNEWS_ITEMS },
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
              <ChevronDown
                className={`h-3 w-3 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </Link>

            {openIndex === index && (
              <MenuDropdown
                items={item.subItems}
                onClose={() => setOpenIndex(null)}
              />
            )}
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
