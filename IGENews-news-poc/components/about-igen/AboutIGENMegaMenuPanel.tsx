"use client";

import Link from "next/link";
import { type MegaMenuData } from "./AboutIGENMegaMenuData";

interface Props {
  menu: MegaMenuData;
  onClose: () => void;
  align?: "left" | "center" | "right";
}

export default function AboutIGENMegaMenuPanel({ menu, onClose, align = "left" }: Props) {
  const positionClass =
    align === "right"
      ? "right-0"
      : align === "center"
      ? "left-1/2 -translate-x-1/2"
      : "left-0";

  return (
    <div
      className={`absolute top-full z-50 w-[min(96vw,1000px)] rounded-b-xl border border-t-0 border-[var(--color-neutral-light)] bg-white shadow-2xl dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)] ${positionClass}`}
      style={{ maxHeight: "70vh", overflowY: "auto" }}
      onMouseLeave={onClose}
    >
      <div className="flex">
        {/* ── Left sidebar — menu identity ── */}
        <div className="hidden w-52 shrink-0 flex-col gap-3 border-r border-[var(--color-neutral-light)] bg-[var(--color-neutral-light)]/40 p-6 dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--background)] lg:flex">
          <div className="text-4xl">{menu.icon}</div>
          <div>
            <p className="text-xl font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
              {menu.name}
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-gold-dark)]">
              {menu.type}
            </p>
          </div>
          {menu.upgradeHook && (
            <div className="mt-auto">
              <p className="mb-3 text-xs leading-snug text-[var(--color-neutral-dark)] dark:text-gray-400">
                {menu.upgradeHook}
              </p>
              <Link
                href="/reader-plans"
                onClick={onClose}
                className="inline-block rounded-full bg-[var(--color-primary)] px-3 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-90"
              >
                Upgrade →
              </Link>
            </div>
          )}
        </div>

        {/* ── Right side — columns grid ── */}
        <div className="flex-1 p-5">
          <div
            className="grid gap-x-6 gap-y-5"
            style={{
              gridTemplateColumns: `repeat(${Math.min(menu.columns.length, 5)}, 1fr)`,
            }}
          >
            {menu.columns.map((col, idx) => (
              <div key={idx}>
                <h4 className="mb-3 text-[10px] font-black uppercase tracking-widest text-[var(--color-neutral-mid)]">
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block text-[13px] leading-snug text-[var(--color-neutral-dark)] transition-colors hover:text-[var(--color-primary)] dark:text-gray-400 dark:hover:text-[var(--color-primary-light)]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
