"use client";

import Link from "next/link";
import Image from "next/image";
import { Article, ContentType, NewsCardVariant } from "@/types/types";
import TagChip from "@/components/news-feed/TagChip";
import LikeButton from "@/components/engagement/LikeButton";
import CommentButton from "@/components/engagement/CommentButton";
import ShareButton from "@/components/engagement/ShareButton";
import SaveButton from "@/components/engagement/SaveButton";
import ReadLaterButton from "@/components/engagement/ReadLaterButton";
import { Clock, Flame, Lock, MoreHorizontal, Sparkles } from "lucide-react";

interface NewsCardProps {
  article: Article;
  variant?: NewsCardVariant;
}

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diff = now - date;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `About ${hours} hour${hours > 1 ? "s" : ""} ago`;
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

export default function NewsCard({ article, variant = "list" }: NewsCardProps) {
  if (variant === "sidebar") {
    return <SidebarCard article={article} />;
  }

  if (variant === "compact") {
    return <CompactCard article={article} />;
  }

  // LIST variant (main card)
  return (
    <article className="card-hover group relative overflow-hidden rounded-xl border border-[var(--color-neutral-light)] bg-white shadow-[var(--shadow-card)]">
      {/* Badges */}
      <div className="absolute top-3 right-3 z-10 flex gap-1.5">
        {article.type === ContentType.MANUAL_AI && (
          <span className="flex items-center gap-1 rounded-full bg-[var(--color-primary)] px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
            <Sparkles className="h-3 w-3" /> IGN Exclusive
          </span>
        )}
        {article.isTrending && (
          <span className="flex items-center gap-1 rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
            <Flame className="h-3 w-3" /> Trending
          </span>
        )}
      </div>

      {/* Hero Image */}
      <Link href={`/article/${article.slug}`} className="block relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={article.heroImage}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {article.isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[var(--color-primary)]">
              <Lock className="h-4 w-4" />
              Upgrade to Read
            </div>
          </div>
        )}
      </Link>

      <div className="p-4">
        {/* Source + Time */}
        <div className="mb-2 flex items-center gap-2 text-[var(--color-meta)]">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-neutral-light)] text-xs font-bold text-[var(--color-primary)]">
            {article.sourceName.charAt(0)}
          </div>
          <span className="text-xs font-medium text-[var(--color-neutral-dark)]">{article.sourceName}</span>
          <span className="text-[var(--color-neutral-mid)]">·</span>
          <span className="text-xs text-[var(--color-neutral-dark)]">{timeAgo(article.publishedAt)}</span>
          <span className="text-[var(--color-neutral-mid)]">·</span>
          <span className="flex items-center gap-0.5 text-xs text-[var(--color-neutral-dark)]">
            <Clock className="h-3 w-3" />
            {article.readTime} min read
          </span>
        </div>

        {/* Headline */}
        <Link href={`/article/${article.slug}`}>
          <h3 className="mb-2 text-lg font-semibold leading-snug text-[var(--color-text-body)] line-clamp-2 group-hover:text-[var(--color-secondary)] transition-colors" style={{ fontFamily: 'var(--font-body)' }}>
            {article.title}
          </h3>
        </Link>

        {/* Summary */}
        <p className="mb-3 text-sm leading-relaxed text-[var(--color-neutral-dark)] line-clamp-3">
          {article.summary}
        </p>

        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {article.tags.slice(0, 4).map((tag) => (
            <TagChip
              key={tag}
              label={tag}
              color={article.sector ? "sector" : article.country ? "country" : "default"}
            />
          ))}
        </div>


        {/* Action Buttons */}
        <div className="flex items-center gap-1 border-t border-[var(--color-neutral-light)] pt-2 -mx-1">
          <LikeButton count={article.likeCount} isLiked={article.isLiked} />
          <CommentButton count={article.commentCount} />
          <ShareButton count={article.shareCount} />
          <div className="ml-auto flex items-center gap-1">
            <SaveButton isBookmarked={article.isBookmarked} />
            <ReadLaterButton />
          </div>
        </div>

        {/* Read Full Story CTA */}
        <Link
          href={`/article/${article.slug}`}
          className="mt-3 flex w-full items-center justify-center rounded-lg bg-[var(--color-primary)] py-2.5 text-sm font-semibold text-white transition-all hover:bg-[var(--color-primary-dark)] hover:shadow-lg"
        >
          Read Full Story
        </Link>
      </div>
    </article>
  );
}

// ==========================================
// COMPACT CARD (Upcoming Highlights list item)
// ==========================================
function CompactCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group flex gap-3 rounded-lg p-2 transition-colors hover:bg-[var(--color-neutral-light)]"
    >
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium leading-snug text-[var(--color-text-body)] line-clamp-2 group-hover:text-[var(--color-secondary)] transition-colors">
          {article.title}
        </h4>
        <div className="mt-1 flex items-center gap-2 text-[11px] text-[var(--color-neutral-dark)]">
          {article.sector && <TagChip label={article.sector.name} color="sector" />}
          <span className="flex items-center gap-0.5">
            <Clock className="h-3 w-3" />
            {article.readTime} min
          </span>
        </div>
      </div>
    </Link>
  );
}

// ==========================================
// SIDEBAR CARD (Trending Now / Most Discussed)
// ==========================================
function SidebarCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group flex gap-3 rounded-lg p-2 transition-colors hover:bg-[var(--color-neutral-light)]"
    >
      {/* Thumbnail */}
      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md">
        <Image
          src={article.heroImage}
          alt={article.title}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium leading-snug text-[var(--color-text-body)] line-clamp-2 group-hover:text-[var(--color-secondary)] transition-colors">
          {article.title}
        </h4>
        <div className="mt-1 flex items-center gap-2 text-[11px] text-[var(--color-neutral-dark)]">
          {article.sector && <span>{article.sector.name}</span>}
          <span>·</span>
          <span>{timeAgo(article.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
