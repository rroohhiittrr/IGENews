"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";

interface SaveButtonProps {
  isBookmarked?: boolean;
  compact?: boolean;
}

export default function SaveButton({ isBookmarked = false, compact = false }: SaveButtonProps) {
  const [saved, setSaved] = useState(isBookmarked);

  return (
    <button
      onClick={() => setSaved(!saved)}
      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
        saved
          ? "bg-[var(--color-accent-gold-light)] text-[var(--color-accent-gold-dark)]"
          : "text-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-light)]"
      }`}
    >
      <Bookmark
        className={`h-4 w-4 transition-all ${saved ? "fill-[var(--color-accent-gold)] text-[var(--color-accent-gold)]" : ""}`}
      />
      {!compact && <span>{saved ? "Saved" : "Save"}</span>}
    </button>
  );
}
