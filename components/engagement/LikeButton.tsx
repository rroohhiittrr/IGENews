"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

interface LikeButtonProps {
  count: number;
  isLiked?: boolean;
  compact?: boolean;
}

export default function LikeButton({ count, isLiked = false, compact = false }: LikeButtonProps) {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(count);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
        liked
          ? "bg-red-50 text-red-500"
          : "text-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-light)]"
      }`}
    >
      <Heart
        className={`h-4 w-4 transition-all ${liked ? "fill-red-500 text-red-500 scale-110" : ""}`}
      />
      {!compact && <span>{likeCount.toLocaleString()}</span>}
    </button>
  );
}
