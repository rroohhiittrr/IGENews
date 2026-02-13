"use client";

import { Share2 } from "lucide-react";

interface ShareButtonProps {
  count?: number;
  compact?: boolean;
}

export default function ShareButton({ count, compact = false }: ShareButtonProps) {
  const handleShare = () => {
    // Future: open share sheet modal
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-[var(--color-neutral-dark)] transition-all hover:bg-[var(--color-neutral-light)]"
    >
      <Share2 className="h-4 w-4" />
      {!compact && count !== undefined && <span>{count.toLocaleString()} Shares</span>}
    </button>
  );
}
