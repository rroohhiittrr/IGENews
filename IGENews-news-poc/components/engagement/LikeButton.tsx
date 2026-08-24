"use client";

import { useState } from "react";

export type LikeLabel = "Like" | "Agree" | "Dislike" | "Support" | "Respect" | "Upvote";

const LIKE_CONFIGS: Record<LikeLabel, { emoji: string; activeClass: string }> = {
  Like:    { emoji: "❤️",  activeClass: "bg-red-50 text-red-500" },
  Agree:   { emoji: "👍",  activeClass: "bg-blue-50 text-blue-600" },
  Dislike: { emoji: "👎",  activeClass: "bg-gray-100 text-gray-600" },
  Support: { emoji: "🤝",  activeClass: "bg-green-50 text-green-600" },
  Respect: { emoji: "🫡",  activeClass: "bg-purple-50 text-purple-600" },
  Upvote:  { emoji: "⬆️",  activeClass: "bg-orange-50 text-orange-500" },
};

interface LikeButtonProps {
  count: number;
  isLiked?: boolean;
  compact?: boolean;
  label?: LikeLabel;
}

export default function LikeButton({
  count,
  isLiked = false,
  compact = false,
  label = "Agree",
}: LikeButtonProps) {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(count);
  const config = LIKE_CONFIGS[label];

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
        liked
          ? config.activeClass
          : "text-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-light)]"
      }`}
    >
      <span className="text-sm leading-none">{config.emoji}</span>
      {!compact && (
        <span>
          {label} · {likeCount.toLocaleString()}
        </span>
      )}
    </button>
  );
}
