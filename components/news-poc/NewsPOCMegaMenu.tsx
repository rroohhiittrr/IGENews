"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { NEWS_POC_MENU_ITEMS, MegaMenuItem } from "./newsPOCData";

export default function NewsPOCMegaMenu() {
  const pathname = usePathname();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const isActive = (slug: string) => {
    // Handle locale prefixes in pathname
    const cleanPath = pathname.replace(/^\/(en|hi|ta|kn)/, '') || '/';
    if (slug === "feed") {
      return cleanPath === "/news-poc" || cleanPath === "/news-poc/";
    }
    return cleanPath.startsWith(`/news-poc/${slug}`);
  };

  const getHref = (slug: string) => {
    return slug === "feed" ? "/news-poc" : `/news-poc/${slug}`;
  };

  return (
    <nav className="sticky top-16 z-40 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm transition-colors duration-250 overflow-visible">
      {/* Centered relative wrapper to anchor the full-width dropdowns */}
      <div className="relative mx-auto max-w-7xl px-4 lg:px-6 overflow-visible w-full flex items-center justify-between">
        
        {/* Main 10-item flex container (no wrapping, fits on single line on desktop) */}
        <div className="flex items-center w-full justify-between overflow-visible">
          {NEWS_POC_MENU_ITEMS.map((item, index) => {
            const isSelected = isActive(item.slug);
            const isOpen = openIndex === index;
            const colCount = item.subItems.length;
            const gridClass = 
              colCount === 5 ? "grid-cols-5" :
              colCount === 4 ? "grid-cols-4" :
              colCount === 3 ? "grid-cols-3" :
              colCount === 2 ? "grid-cols-2" : "grid-cols-3";

            return (
              <div
                key={item.id}
                className="overflow-visible"
                onMouseEnter={() => setOpenIndex(index)}
                onMouseLeave={() => setOpenIndex(null)}
              >
                <Link
                  href={getHref(item.slug)}
                  className={`flex items-center gap-1 px-1.5 py-3.5 text-[11px] lg:text-xs font-semibold tracking-tight transition-all focus:outline-none ${
                    isSelected
                      ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                      : "text-gray-650 dark:text-gray-350 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  <span className="text-base leading-none">{item.icon}</span>
                  <span className="whitespace-nowrap">{item.label}</span>
                  <ChevronDown
                    className={`h-3 w-3 opacity-60 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </Link>

                {isOpen && (
                  /* Full-width premium mega dropdown anchored to max-w-7xl container */
                  <div className="absolute left-4 right-4 top-full mt-0 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    {/* Header of Dropdown */}
                    <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3 mb-4">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase text-blue-500">
                          {item.id} · {item.purpose}
                        </span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        item.tier === "Enterprise"
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300"
                          : item.tier === "Verified/Pro"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                          : "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                      }`}>
                        🔑 {item.tier}
                      </span>
                    </div>

                    {/* Submenu Grid dynamically sized */}
                    <div className={`grid ${gridClass} gap-6`}>
                      {item.subItems.map((sub) => {
                        const hasSubSub = sub.subSubItems && sub.subSubItems.length > 0;
                        return (
                          <div key={sub.slug} className="space-y-2">
                            {/* Sub-menu title */}
                            <div>
                              <Link
                                href={`/news-poc/${item.slug}/${sub.slug}`}
                                onClick={() => setOpenIndex(null)}
                                className="block text-[11px] font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                              >
                                {sub.label}
                              </Link>
                              <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 leading-snug">
                                {sub.description}
                              </p>
                            </div>

                            {/* Sub-sub-menu links */}
                            {hasSubSub && (
                              <ul className="space-y-1.5 pl-1.5 border-l border-gray-100 dark:border-gray-800">
                                {sub.subSubItems?.map((subSub) => (
                                  <li key={subSub.slug}>
                                    <Link
                                      href={`/news-poc/${item.slug}/${sub.slug}/${subSub.slug}`}
                                      onClick={() => setOpenIndex(null)}
                                      className="block text-xs text-gray-650 dark:text-gray-350 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-0.5 truncate"
                                      title={subSub.description}
                                    >
                                      • {subSub.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
