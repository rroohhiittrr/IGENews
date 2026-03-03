"use client";

import { ABOUT_IGEN_MEGA_MENUS } from "@/components/about-igen/AboutIGENMegaMenuData";
import AboutIGENMegaMenuNav from "@/components/about-igen/AboutIGENMegaMenuNav";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function AboutIGENPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AboutIGENMegaMenuNav />
      <div className="container mx-auto px-6 py-20">
        <div className="mb-16 text-center">
          <h1 className="mb-4 font-display text-5xl font-bold text-[var(--color-primary)]">About IGEN Intelligence</h1>
          <p className="mx-auto max-w-2xl text-lg text-[var(--color-neutral-dark)]">
            Explore India's most structured trade intelligence platform. 
            From real-time feeds to deep industry reports, discover the architecture of global trade.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ABOUT_IGEN_MEGA_MENUS.map((menu) => (
            <Link 
              key={menu.id}
              href={`/about-igen/${menu.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-neutral-light)] bg-white p-8 transition-all hover:border-[var(--color-primary)] hover:shadow-xl dark:bg-[var(--color-neutral-white)]"
            >
              <div className="mb-4 text-3xl">{menu.icon}</div>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-display text-xl font-bold">{menu.name}</h3>
                <ChevronRight className="h-5 w-5 text-[var(--color-neutral-dark)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--color-primary)]" />
              </div>
              <div className="mb-4 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] opacity-60">
                {menu.type}
              </div>
              <p className="mt-auto text-sm text-[var(--color-neutral-dark)] line-clamp-2">
                {menu.upgradeHook || `Deep dive into ${menu.name.toLowerCase()} architecture and intelligence tools.`}
              </p>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-[var(--color-primary)] transition-transform scale-x-0 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
