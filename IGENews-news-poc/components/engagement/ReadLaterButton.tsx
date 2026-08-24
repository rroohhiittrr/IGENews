"use client";

import { useState } from "react";
import { Clock } from "lucide-react";

interface ReadLaterButtonProps {
  compact?: boolean;
}

export default function ReadLaterButton({ compact = false }: ReadLaterButtonProps) {
  const [added, setAdded] = useState(false);

  return (
    <button
      onClick={() => setAdded(!added)}
      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
        added
          ? "bg-[var(--color-accent-green-light)] text-[var(--color-accent-green-dark)]"
          : "text-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-light)]"
      }`}
    >
      <Clock
        className={`h-4 w-4 transition-all ${added ? "text-[var(--color-accent-green)]" : ""}`}
      />
      {!compact && <span>{added ? "Added" : "Read Later"}</span>}
    </button>
  );
}
