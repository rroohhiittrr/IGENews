"use client";

import Link from "next/link";
import Image from "next/image";
import { Article, ContentType } from "@/types/types";
import LikeButton from "@/components/engagement/LikeButton";
import CommentButton from "@/components/engagement/CommentButton";
import ShareButton from "@/components/engagement/ShareButton";
import SaveButton from "@/components/engagement/SaveButton";
import ReadLaterButton from "@/components/engagement/ReadLaterButton";
import { Clock, Sparkles } from "lucide-react";

// Badge type definitions
export type BadgeType = "trending" | "top" | "discussed" | "highlights" | "sponsored";

interface BadgeConfig {
  label: string;
  icon: string;
  bgColor: string;
}

const BADGE_MAP: Record<BadgeType, BadgeConfig> = {
  trending: { label: "Trending", icon: "🔥", bgColor: "bg-orange-500" },
  top: { label: "Top", icon: "⭐", bgColor: "bg-[var(--color-accent-gold)]" },
  discussed: { label: "Most Discussed", icon: "💬", bgColor: "bg-purple-600" },
  highlights: { label: "Highlights", icon: "🌟", bgColor: "bg-blue-600" },
  sponsored: { label: "Sponsored", icon: "📢", bgColor: "bg-teal-600" },
};

// Badge assignment map — each article gets up to 2 badges
const ARTICLE_BADGES: Record<string, BadgeType[]> = {
  a1: ["trending", "top"],
  a2: ["trending", "sponsored"],
  a3: ["discussed", "top"],
  a4: ["trending", "highlights"],
  a5: ["trending", "top"],
  a6: ["highlights", "sponsored"],
  a7: ["discussed", "highlights"],
  a8: ["sponsored", "top"],
  a9: ["trending", "discussed"],
  a10: ["trending", "top"],
  a11: ["highlights", "discussed"],
  a12: ["sponsored", "highlights"],
};

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diff = now - date;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

interface MobileNewsCardProps {
  article: Article;
}

export default function MobileNewsCard({ article }: MobileNewsCardProps) {
  const badges = ARTICLE_BADGES[article.id] || [];

  return (
    <article className="bg-white border-b border-[var(--color-neutral-light)] last:border-b-0">
      {/* Clickable area — entire card navigates to article */}
      <Link href={`/article/${article.slug}`} className="block">
        {/* Hero Image with Badges */}
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            className="object-cover"
            sizes="100vw"
          />

          {/* Badge system — max 2 badges */}
          <div className="absolute top-2.5 left-2.5 flex gap-1.5">
            {badges.map((badgeType) => {
              const badge = BADGE_MAP[badgeType];
              return (
                <span
                  key={badgeType}
                  className={`${badge.bgColor} flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold text-white shadow-md backdrop-blur-sm`}
                >
                  <span className="text-[10px]">{badge.icon}</span>
                  {badge.label}
                </span>
              );
            })}
          </div>

          {/* IGN Exclusive Badge */}
          {article.type === ContentType.MANUAL_AI && (
            <div className="absolute top-2.5 right-2.5">
              <span className="flex items-center gap-1 rounded-full bg-[var(--color-primary)] px-2 py-0.5 text-[10px] font-bold text-white shadow-md">
                <Sparkles className="h-3 w-3" /> IGN
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-4 pt-3 pb-2">
          {/* Source + Time */}
          <div className="flex items-center gap-2 text-[var(--color-meta)] mb-1.5">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-neutral-light)] text-[9px] font-bold text-[var(--color-primary)]">
              {article.sourceName.charAt(0)}
            </div>
            <span className="text-[11px] font-medium text-[var(--color-neutral-dark)]">
              {article.sourceName}
            </span>
            <span className="text-[var(--color-neutral-mid)]">·</span>
            <span className="text-[11px] text-[var(--color-neutral-dark)]">
              {timeAgo(article.publishedAt)}
            </span>
            <span className="text-[var(--color-neutral-mid)]">·</span>
            <span className="flex items-center gap-0.5 text-[11px] text-[var(--color-neutral-dark)]">
              <Clock className="h-3 w-3" />
              {article.readTime} min
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-[15px] font-semibold leading-snug text-[var(--color-text-body)] line-clamp-2 mb-1.5"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {article.title}
          </h3>

          {/* Summary */}
          <p className="text-[13px] leading-relaxed text-[var(--color-neutral-dark)] line-clamp-2 mb-2">
            {article.summary}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-2">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[var(--color-neutral-light)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-neutral-dark)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* Engagement Buttons — outside the Link so they're independently tappable */}
      <div className="flex items-center gap-0.5 px-3 pb-3 border-t border-[var(--color-neutral-light)]/60 pt-2 mx-1">
        <LikeButton count={article.likeCount} isLiked={article.isLiked} />
        <CommentButton count={article.commentCount} />
        <ShareButton count={article.shareCount} />
        <div className="ml-auto flex items-center gap-0.5">
          <SaveButton isBookmarked={article.isBookmarked} />
          <ReadLaterButton />
        </div>
      </div>
    </article>
  );
}
