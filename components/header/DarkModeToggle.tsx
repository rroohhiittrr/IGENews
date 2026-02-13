"use client";

import { useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-light)]"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun className="h-[18px] w-[18px]" />
      ) : (
        <Moon className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
