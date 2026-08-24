"use client";

import { MessageCircle } from "lucide-react";

export type CommentLabel =
  | "Debate"
  | "Reply"
  | "Counter"
  | "Speak"
  | "Open Talk"
  | "Say Something"
  | "Thoughts";

interface CommentButtonProps {
  count: number;
  compact?: boolean;
  label?: CommentLabel;
  isOpen?: boolean;
  onClick?: () => void;
}

export default function CommentButton({
  count,
  compact = false,
  label = "Debate",
  isOpen = false,
  onClick,
}: CommentButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
        isOpen
          ? "bg-[var(--color-primary)] text-white"
          : "text-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-light)]"
      }`}
    >
      <MessageCircle className={`h-4 w-4 ${isOpen ? "fill-white/30" : ""}`} />
      {!compact && (
        <span>
          {label} · {count.toLocaleString()}
        </span>
      )}
    </button>
  );
}
