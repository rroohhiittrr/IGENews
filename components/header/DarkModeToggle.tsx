"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-light)] transition-all duration-300"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? (
        <Sun className="h-[18px] w-[18px] animate-in spin-in-180 duration-500" />
      ) : (
        <Moon className="h-[18px] w-[18px] animate-in spin-in-180 duration-500" />
      )}
    </button>
  );
}
