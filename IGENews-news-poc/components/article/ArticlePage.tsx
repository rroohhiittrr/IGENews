"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Article, ContentType } from "@/types/types";
import LikeButton, { LikeLabel } from "@/components/engagement/LikeButton";
import CommentButton, { CommentLabel } from "@/components/engagement/CommentButton";
import ShareButton from "@/components/engagement/ShareButton";
import SaveButton from "@/components/engagement/SaveButton";
import CommentPanel from "@/components/engagement/CommentPanel";
import {
  ArrowLeft,
  Clock,
  Flame,
  Lock,
  MoreHorizontal,
  Sparkles,
  Calendar,
  BookOpen,
  ChevronRight,
} from "lucide-react";

// ── Helpers ──────────────────────────────────────────────────────────────────

const LIKE_LABELS: LikeLabel[] = ["Like", "Agree", "Dislike", "Support", "Respect", "Upvote"];
const COMMENT_LABELS: CommentLabel[] = ["Debate", "Reply", "Counter", "Speak", "Open Talk", "Say Something", "Thoughts"];

function slugHash(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
}

function pickVariants(slug: string) {
  const h = slugHash(slug);
  return {
    like: LIKE_LABELS[h % LIKE_LABELS.length],
    comment: COMMENT_LABELS[(h >> 3) % COMMENT_LABELS.length],
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

// ── Props ─────────────────────────────────────────────────────────────────────
interface ArticlePageProps {
  article: Article;
  relatedArticles: Article[];
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ArticlePage({ article, relatedArticles }: ArticlePageProps) {
  const [commentOpen, setCommentOpen] = useState(false);
  const variants = pickVariants(article.slug);

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* ── Hero Banner ─────────────────────────────────────────────────────── */}
      <div className="relative w-full aspect-[21/9] md:aspect-[3/1] overflow-hidden">
        <Image
          src={article.heroImage}
          alt={article.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Back button */}
        <Link
          href="javascript:history.back()"
          onClick={(e) => { e.preventDefault(); window.history.back(); }}
          className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full bg-black/50 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-black/70"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        {/* Badges */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          {article.type === ContentType.MANUAL_AI && (
            <span className="flex items-center gap-1 rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-semibold text-white shadow">
              <Sparkles className="h-3 w-3" /> IGN Exclusive
            </span>
          )}
          {article.isTrending && (
            <span className="flex items-center gap-1 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white shadow">
              <Flame className="h-3 w-3" /> Trending
            </span>
          )}
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="mx-auto max-w-4xl">
            {/* Tags row */}
            <div className="mb-3 flex flex-wrap gap-2">
              {article.sector && (
                <span className="rounded-full bg-[var(--color-primary)]/80 px-3 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
                  {article.sector.name}
                </span>
              )}
              {article.country && (
                <span className="rounded-full bg-white/20 px-3 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
                  {article.country.pairName}
                </span>
              )}
              {article.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/10 px-3 py-0.5 text-xs font-medium text-white/80 backdrop-blur-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Headline */}
            <h1
              className="text-2xl md:text-4xl font-bold leading-tight text-white drop-shadow-lg"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {article.title}
            </h1>
          </div>
        </div>

        {/* Locked overlay */}
        {article.isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-white p-8 shadow-2xl">
              <Lock className="h-10 w-10 text-[var(--color-primary)]" />
              <p className="text-lg font-semibold text-[var(--color-text-body)]">Premium Content</p>
              <p className="text-sm text-[var(--color-neutral-dark)]">Upgrade your plan to read this article</p>
              <Link
                href="/plans"
                className="rounded-full bg-[var(--color-primary)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-primary-dark)] transition-colors"
              >
                Upgrade Now
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ── Content Area ────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          {/* ── Left: Article ──────────────────────────────────────────────── */}
          <div className="min-w-0">
            {/* Metadata bar */}
            <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-[var(--color-neutral-light)] bg-white px-5 py-4 shadow-sm">
              {/* Publisher */}
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-bold text-white">
                  {article.sourceName.charAt(0)}
                </div>
                <div>
                  <p className="text-xs text-[var(--color-neutral-dark)]">Published by</p>
                  <p className="text-sm font-semibold text-[var(--color-text-body)]">{article.sourceName}</p>
                </div>
              </div>

              {/* Author */}
              {article.authorName && (
                <>
                  <span className="hidden text-[var(--color-neutral-light)] sm:block">|</span>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-secondary)]/10 text-sm font-bold text-[var(--color-secondary)]">
                      {article.authorName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-neutral-dark)]">Written by</p>
                      <p className="text-sm font-semibold text-[var(--color-text-body)]">{article.authorName}</p>
                    </div>
                  </div>
                </>
              )}

              {/* Divider */}
              <span className="hidden text-[var(--color-neutral-light)] sm:block">|</span>

              {/* Date */}
              <div className="flex items-center gap-1.5 text-xs text-[var(--color-neutral-dark)]">
                <Calendar className="h-3.5 w-3.5 text-[var(--color-primary)]" />
                <span>{formatDate(article.publishedAt)}</span>
                <span className="text-[var(--color-neutral-mid)]">({timeAgo(article.publishedAt)})</span>
              </div>

              {/* Read time */}
              <div className="flex items-center gap-1.5 text-xs text-[var(--color-neutral-dark)]">
                <Clock className="h-3.5 w-3.5 text-[var(--color-primary)]" />
                <span>{article.readTime} min read</span>
              </div>

              {/* Leader designation */}
              {article.leaderDesignation && (
                <div className="flex items-center gap-1.5 text-xs text-[var(--color-neutral-dark)]">
                  <BookOpen className="h-3.5 w-3.5 text-[var(--color-primary)]" />
                  <span>{article.leaderDesignation.title}</span>
                </div>
              )}
            </div>

            {/* Article summary callout */}
            <div className="mb-8 rounded-xl border-l-4 border-[var(--color-primary)] bg-[var(--color-primary)]/5 px-6 py-4">
              <p className="text-base font-medium leading-relaxed text-[var(--color-text-body)] italic">
                {article.summary}
              </p>
            </div>

            {/* Article body */}
            <div
              className="article-body prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.body || `<p>${article.summary}</p>` }}
            />

            {/* Tags section */}
            <div className="mt-8 border-t border-[var(--color-neutral-light)] pt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-neutral-dark)]">
                Topics in this article
              </p>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="rounded-full border border-[var(--color-neutral-light)] px-4 py-1.5 text-sm font-medium text-[var(--color-text-body)] transition-all hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Engagement stats */}
            <div className="mt-6 flex items-center gap-6 text-sm text-[var(--color-neutral-dark)]">
              <span className="flex items-center gap-1.5">❤️ <strong>{article.likeCount.toLocaleString()}</strong> likes</span>
              <span className="flex items-center gap-1.5">💬 <strong>{article.commentCount}</strong> comments</span>
              <span className="flex items-center gap-1.5">🔗 <strong>{article.shareCount}</strong> shares</span>
            </div>

            {/* Engagement action bar */}
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-[var(--color-neutral-light)] bg-white p-3 shadow-sm">
              <LikeButton count={article.likeCount} isLiked={article.isLiked} label={variants.like} />
              <CommentButton
                count={article.commentCount}
                label={variants.comment}
                isOpen={commentOpen}
                onClick={() => setCommentOpen(!commentOpen)}
              />
              <ShareButton count={article.shareCount} />
              <div className="ml-auto flex items-center gap-2">
                <SaveButton isBookmarked={article.isBookmarked} />
                <button
                  className="flex items-center justify-center rounded-full p-2 text-[var(--color-neutral-dark)] transition-all hover:bg-[var(--color-neutral-light)]"
                  aria-label="More options"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Comment Panel */}
            {commentOpen && (
              <div className="mt-4">
                <CommentPanel
                  articleSlug={article.slug}
                  totalCount={article.commentCount}
                  label={variants.comment}
                  onClose={() => setCommentOpen(false)}
                />
              </div>
            )}
          </div>

          {/* ── Right Sidebar: Related Articles ────────────────────────────── */}
          <aside className="space-y-4">
            {relatedArticles.length > 0 && (
              <div className="rounded-xl border border-[var(--color-neutral-light)] bg-white p-4 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--color-primary)]">
                  <span className="h-1 w-4 rounded-full bg-[var(--color-primary)]" />
                  Related Stories
                </h2>
                <div className="space-y-4">
                  {relatedArticles.map((rel) => (
                    <RelatedCard key={rel.slug} article={rel} />
                  ))}
                </div>
              </div>
            )}

            {/* Share CTA */}
            <div className="rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] p-5 text-white">
              <p className="mb-1 text-base font-bold">Enjoying this article?</p>
              <p className="mb-4 text-sm text-white/80">Share it with your network and spread the insight.</p>
              <ShareButton count={article.shareCount} />
            </div>
          </aside>
        </div>
      </div>

      {/* ── Article Body Styles ───────────────────────────────────────────── */}
      <style jsx global>{`
        .article-body h2 {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--color-primary);
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          font-family: var(--font-display);
          border-bottom: 2px solid var(--color-neutral-light);
          padding-bottom: 0.4rem;
        }
        .article-body h3 {
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--color-text-body);
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .article-body p {
          color: var(--color-text-body);
          font-size: 1rem;
          line-height: 1.85;
          margin-bottom: 1.25rem;
        }
        .article-body strong {
          color: var(--color-text-body);
          font-weight: 700;
        }
        .article-body blockquote {
          border-left: 4px solid var(--color-secondary);
          background: linear-gradient(to right, rgba(var(--color-secondary-rgb, 30, 64, 175), 0.06), transparent);
          margin: 1.75rem 0;
          padding: 1.25rem 1.5rem;
          border-radius: 0 0.75rem 0.75rem 0;
          font-size: 1.05rem;
          font-style: italic;
          color: var(--color-text-body);
          line-height: 1.7;
        }
        .article-body ul, .article-body ol {
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
        }
        .article-body li {
          color: var(--color-text-body);
          line-height: 1.75;
          margin-bottom: 0.4rem;
        }
      `}</style>
    </div>
  );
}

// ── Related Article Card ──────────────────────────────────────────────────────
function RelatedCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group flex gap-3 rounded-lg p-2 transition-colors hover:bg-[var(--color-neutral-light)]"
    >
      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md">
        <Image
          src={article.heroImage}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="80px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium leading-snug text-[var(--color-text-body)] line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors">
          {article.title}
        </h4>
        <div className="mt-1.5 flex items-center gap-1 text-[11px] text-[var(--color-neutral-dark)]">
          <Clock className="h-3 w-3 shrink-0" />
          <span>{article.readTime} min</span>
          <ChevronRight className="h-3 w-3 ml-auto shrink-0 text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </Link>
  );
}
