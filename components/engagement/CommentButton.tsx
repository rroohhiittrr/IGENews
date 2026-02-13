"use client";

import { MessageCircle } from "lucide-react";

interface CommentButtonProps {
  count: number;
  compact?: boolean;
}

export default function CommentButton({ count, compact = false }: CommentButtonProps) {
  return (
    <button className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-[var(--color-neutral-dark)] transition-all hover:bg-[var(--color-neutral-light)]">
      <MessageCircle className="h-4 w-4" />
      {!compact && <span>{count.toLocaleString()} Comments</span>}
    </button>
  );
}
