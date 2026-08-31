"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import MenuDropdown from "./MenuDropdown";
import { useTranslations } from "next-intl";
import NewsPOCMegaMenu from "@/components/news-poc/NewsPOCMegaMenu";
import POCV2MegaMenu from "@/components/poc-v2/NewsPOCMegaMenu";

export default function MegaMenu() {
  const pathname = usePathname();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = useTranslations("nav");

  if (pathname.includes("/poc-v2")) {
    return <POCV2MegaMenu />;
  }

  if (pathname.includes("/news-poc")) {
    return <NewsPOCMegaMenu />;
  }

  const FEED_ITEMS = [
    { label: t("sectorNews"), href: "/feed/sector" },
    { label: t("countryNews"), href: "/feed/country" },
    { label: t("leaderNews"), href: "/feed/leader" },
    { label: t("exploreIGE"), href: "https://indiaglobalexpo.com", external: true },
  ];

  const HEADLINES_ITEMS = [
    { label: t("sectorNews"), href: "/headlines/sector" },
    { label: t("countryNews"), href: "/headlines/country" },
    { label: t("leaderNews"), href: "/headlines/leader" },
    { label: t("exploreIGE"), href: "https://indiaglobalexpo.com", external: true },
  ];

  const TRENDING_ITEMS = [
    { label: t("sectorNews"), href: "/trending/sector" },
    { label: t("countryNews"), href: "/trending/country" },
    { label: t("leaderNews"), href: "/trending/leader" },
    { label: t("exploreIGE"), href: "https://indiaglobalexpo.com", external: true },
  ];

  const CATEGORIES_ITEMS = [
    { label: t("sectorNews"), href: "/categories/sector" },
    { label: t("countryNews"), href: "/categories/country" },
    { label: t("leaderNews"), href: "/categories/leader" },
  ];

  const MYNEWS_ITEMS = [
    { label: t("myFavourites"), href: "/mynews/favourites" },
    { label: t("myBookmarks"), href: "/mynews/bookmarks" },
    { label: t("myReadLater"), href: "/mynews/readlater" },
    { label: t("myComments"), href: "/mynews/comments" },
    { label: t("myLikes"), href: "/mynews/likes" },
  ];

  const COMPANY_ITEMS = [
    { label: "Registered Companies", href: "/company-news/registered/pages" },
    { label: "Verified Companies", href: "/company-news/verified/pages" },
    { label: "Top/Enterprise Companies", href: "/company-news/top/pages" },
  ];

  const MENU_ITEMS = [
    { label: t("feed"), href: "/", subItems: FEED_ITEMS },
    { label: t("headlines"), href: "/headlines", subItems: HEADLINES_ITEMS },
    { label: t("trending"), href: "/trending", subItems: TRENDING_ITEMS },
    { label: t("categories"), href: "/categories/sector", subItems: CATEGORIES_ITEMS },
    { label: t("myNews"), href: "/mynews", subItems: MYNEWS_ITEMS },
    { label: t("companyNews"), href: "/company-news", subItems: COMPANY_ITEMS },
  ];

  const isActive = (href: string) => {
    // Handle locale prefix in pathname
    const cleanPath = pathname.replace(/^\/(en|hi|ta|kn)/, '') || '/';
    if (href === "/") return cleanPath === "/";
    return cleanPath.startsWith(href.split("?")[0]);
  };

  return (
    <nav className="sticky top-16 z-40 border-b border-[var(--color-neutral-light)] bg-white">
      <div className="mx-auto flex max-w-7xl items-center px-4 lg:px-6">
        {MENU_ITEMS.map((item, index) => (
          <div
            key={item.href}
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
            {t("topNews")}
            <span className="rounded-full bg-[var(--color-neutral-light)] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--color-neutral-mid)]">
              {t("soon")}
            </span>
          </span>
        </div>
      </div>
    </nav>
  );
}
