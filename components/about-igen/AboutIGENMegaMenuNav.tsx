"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { ABOUT_IGEN_MEGA_MENUS } from "./AboutIGENMegaMenuData";
import AboutIGENMegaMenuPanel from "./AboutIGENMegaMenuPanel";

export default function AboutIGENMegaMenuNav() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <nav
      className="sticky top-16 z-40 w-full border-b border-[var(--color-neutral-light)] bg-white dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]"
      onMouseLeave={() => setOpenIndex(null)}
    >
      <div className="mx-auto flex max-w-[1600px] items-stretch px-3 xl:px-6">
        {ABOUT_IGEN_MEGA_MENUS.map((menu, index) => (
          <div
            key={menu.id}
            className="relative flex-1"
            onMouseEnter={() => setOpenIndex(index)}
          >
            <Link
              href={`/about-igen/${menu.slug}`}
              className={`flex h-full w-full items-center justify-center gap-0.5 whitespace-nowrap px-1.5 py-2.5 text-[11px] font-semibold xl:px-2 xl:text-xs transition-colors ${
                openIndex === index
                  ? "border-b-2 border-[var(--color-primary)] text-[var(--color-primary)] dark:border-[var(--color-primary-light)] dark:text-[var(--color-primary-light)]"
                  : "text-[var(--color-neutral-dark)] hover:text-[var(--color-primary)] dark:text-gray-400 dark:hover:text-[var(--color-primary-light)]"
              }`}
            >
              <span className="mr-0.5 text-xs leading-none">{menu.icon}</span>
              <span className="leading-tight">{menu.name}</span>
              <ChevronDown
                className={`h-2.5 w-2.5 shrink-0 transition-transform ${
                  openIndex === index ? "rotate-180 text-[var(--color-primary)]" : ""
                }`}
              />
            </Link>

            {openIndex === index && (
              <AboutIGENMegaMenuPanel
                menu={menu}
                align={
                  index <= 4 ? "left" :
                  index <= 8 ? "center" :
                  "right"
                }
                onClose={() => setOpenIndex(null)}
              />
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
