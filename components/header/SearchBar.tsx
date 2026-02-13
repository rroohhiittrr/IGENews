"use client";

import { useState } from "react";
import { Search, Sparkles, Command } from "lucide-react";

export default function SearchBar() {
  const [focused, setFocused] = useState(false);

  return (
    <>
      {/* Desktop AI Search Bar */}
      <div
        className={`relative mx-4 hidden md:flex flex-1 max-w-xl transition-all duration-300 ${
          focused ? "max-w-2xl" : ""
        }`}
      >
        <div className="relative w-full group">
          {/* AI shimmer border */}
          <div
            className={`absolute -inset-[1.5px] rounded-full bg-gradient-to-r from-[var(--color-secondary)] via-[var(--color-accent-gold)] to-[var(--color-primary)] opacity-0 blur-[1px] transition-opacity duration-500 ${
              focused
                ? "opacity-100 animate-[shimmer_3s_linear_infinite]"
                : "group-hover:opacity-60"
            }`}
          />

          <div className="relative flex items-center">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              <Sparkles
                className={`h-4 w-4 transition-colors duration-300 ${
                  focused
                    ? "text-[var(--color-accent-gold)]"
                    : "text-[var(--color-neutral-dark)]"
                }`}
              />
            </div>

            <input
              type="text"
              placeholder="Ask AI or search news..."
              className="w-full rounded-full border border-[var(--color-neutral-mid)]/60 bg-[var(--color-neutral-light)] py-2.5 pl-10 pr-20 text-sm text-[var(--color-text-body)] placeholder-[var(--color-neutral-dark)]/60 outline-none transition-all duration-300 focus:border-transparent focus:bg-white focus:shadow-lg focus:shadow-[var(--color-secondary)]/10"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />

            {/* Keyboard shortcut badge */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1">
              <kbd className="flex items-center gap-0.5 rounded border border-[var(--color-neutral-mid)]/60 bg-white/80 px-1.5 py-0.5 text-[10px] font-medium text-[var(--color-neutral-dark)]/70 backdrop-blur-sm">
                <Command className="h-2.5 w-2.5" />K
              </kbd>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Button */}
      <button className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-light)] md:hidden">
        <Search className="h-[18px] w-[18px]" />
      </button>
    </>
  );
}
