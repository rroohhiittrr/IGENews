"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Article, ContentType } from "@/types/types";
import LikeButton from "@/components/engagement/LikeButton";
import CommentButton from "@/components/engagement/CommentButton";
import ShareButton from "@/components/engagement/ShareButton";
import SaveButton from "@/components/engagement/SaveButton";
import ReadLaterButton from "@/components/engagement/ReadLaterButton";
import CommentPanel from "@/components/engagement/CommentPanel";
import ArticleBody from "@/components/article/ArticleBody";
import { Clock, Sparkles, ChevronUp, Calendar } from "lucide-react";

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

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default function MobileNewsCard({ article }: MobileNewsCardProps) {
  const badges = ARTICLE_BADGES[article.id] || [];
  const [articleOpen, setArticleOpen] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const expandRef = useRef<HTMLDivElement>(null);
  // Client-only time string to prevent SSR/client hydration mismatch
  const [timeAgoStr, setTimeAgoStr] = useState("");

  useEffect(() => {
    setTimeAgoStr(timeAgo(article.publishedAt));
  }, [article.publishedAt]);

  useEffect(() => {
    if (expandRef.current) {
      setTimeout(() => {
        expandRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }, [articleOpen]);

  return (
    <article ref={expandRef} className="bg-white dark:bg-[var(--color-neutral-white)] border-b border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-mid)] last:border-b-0">
      {/* Hero Image — tap to expand */}
      <button
        onClick={() => setArticleOpen(!articleOpen)}
        className="block w-full text-left"
        aria-label={articleOpen ? "Collapse article" : "Read full article"}
      >
        <div className={`relative w-full overflow-hidden transition-all duration-500 ${articleOpen ? "aspect-[16/7]" : "aspect-[16/9]"}`}>
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
          {articleOpen && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          )}
          {/* Badge system */}
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
          {article.type === ContentType.MANUAL_AI && (
            <div className="absolute top-2.5 right-2.5">
              <span className="flex items-center gap-1 rounded-full bg-[var(--color-primary)] px-2 py-0.5 text-[10px] font-bold text-white shadow-md">
                <Sparkles className="h-3 w-3" /> IGN
              </span>
            </div>
          )}
        </div>
      </button>

      {/* Content */}
      <div className="px-4 pt-3 pb-2">
        {/* Source + Time */}
        <div className="flex items-center gap-2 text-[var(--color-meta)] mb-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-neutral-light)] text-[9px] font-bold text-[var(--color-primary)]">
            {article.sourceName.charAt(0)}
          </div>
          <span className="text-[11px] font-medium text-[var(--color-neutral-dark)]">{article.sourceName}</span>
          <span className="text-[var(--color-neutral-mid)]">·</span>
          {timeAgoStr && <span className="text-[11px] text-[var(--color-neutral-dark)]">{timeAgoStr}</span>}
          <span className="text-[var(--color-neutral-mid)]">·</span>
          <span className="flex items-center gap-0.5 text-[11px] text-[var(--color-neutral-dark)]">
            <Clock className="h-3 w-3" />
            {article.readTime} min
          </span>
        </div>

        {/* Title */}
        <button onClick={() => setArticleOpen(!articleOpen)} className="w-full text-left mb-1.5">
          <h3
            className={`text-[15px] font-semibold leading-snug text-[var(--color-text-body)] ${!articleOpen ? "line-clamp-2" : ""}`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            {article.title}
          </h3>
        </button>

        {/* Summary */}
        <p className={`text-[13px] leading-relaxed text-[var(--color-neutral-dark)] mb-2 ${!articleOpen ? "line-clamp-2" : ""}`}>
          {article.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-2">
          {article.tags.slice(0, articleOpen ? article.tags.length : 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[var(--color-neutral-light)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-neutral-dark)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Expanded article content */}
        {articleOpen && (
          <div className="mt-3 space-y-3" style={{ animation: "slideDown 0.25s ease" }}>
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-3 rounded-lg bg-[var(--color-neutral-light)]/50 dark:bg-[var(--color-neutral-light)]/20 px-3 py-2">
              {article.authorName && (
                <div className="flex items-center gap-1.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-secondary)]/10 text-[10px] font-bold text-[var(--color-secondary)]">
                    {article.authorName.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold text-[var(--color-text-body)]">{article.authorName}</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-[11px] text-[var(--color-neutral-dark)]">
                <Calendar className="h-3 w-3 text-[var(--color-primary)]" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-[var(--color-neutral-dark)]">
                <Clock className="h-3 w-3 text-[var(--color-primary)]" />
                <span>{article.readTime} min read</span>
              </div>
            </div>

            {/* Article body + AI widget */}
            <ArticleBody article={article} />

            {/* Topics */}
            <div className="pt-2 border-t border-[var(--color-neutral-light)]">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-neutral-dark)]">Topics</p>
              <div className="flex flex-wrap gap-1.5">
                {article.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-[var(--color-neutral-light)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-text-body)]">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Comment panel */}
            {commentOpen && (
              <CommentPanel
                articleSlug={article.slug}
                totalCount={article.commentCount}
                label="Thoughts"
                onClose={() => setCommentOpen(false)}
              />
            )}
          </div>
        )}
      </div>

      {/* Engagement Buttons */}
      <div className="flex items-center gap-0.5 px-3 pb-3 border-t border-[var(--color-neutral-light)]/60 dark:border-[var(--color-neutral-mid)]/40 pt-2 mx-1">
        <LikeButton count={article.likeCount} isLiked={article.isLiked} />
        <CommentButton
          count={article.commentCount}
          isOpen={commentOpen}
          onClick={() => { if (!articleOpen) setArticleOpen(true); setCommentOpen(!commentOpen); }}
        />
        <ShareButton count={article.shareCount} />
        <div className="ml-auto flex items-center gap-0.5">
          <SaveButton isBookmarked={article.isBookmarked} />
          <ReadLaterButton />
        </div>
      </div>

      {/* Read more / Collapse */}
      <div className="px-4 pb-3">
        {!articleOpen ? (
          <button
            onClick={() => setArticleOpen(true)}
            className="w-full rounded-lg bg-[var(--color-primary)] py-2 text-sm font-semibold text-white"
          >
            Read Full Story
          </button>
        ) : (
          <button
            onClick={() => { setArticleOpen(false); setCommentOpen(false); }}
            className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-mid)] bg-white dark:bg-[var(--color-neutral-white)] py-2 text-sm font-semibold text-[var(--color-neutral-dark)]"
          >
            <ChevronUp className="h-4 w-4" />
            Collapse
          </button>
        )}
      </div>
    </article>
  );
}
