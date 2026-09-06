"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Article, ContentType, NewsCardVariant } from "@/types/types";
import TagChip from "@/components/news-feed/TagChip";
import LikeButton, { LikeLabel } from "@/components/engagement/LikeButton";
import CommentButton, { CommentLabel } from "@/components/engagement/CommentButton";
import ShareButton from "@/components/engagement/ShareButton";
import SaveButton from "@/components/engagement/SaveButton";
import CommentPanel from "@/components/engagement/CommentPanel";
import { Clock, Flame, Lock, MoreHorizontal, Sparkles, ChevronUp, Calendar, BookOpen } from "lucide-react";
import ArticleBody from "@/components/article/ArticleBody";

interface NewsCardProps {
  article: Article;
  variant?: NewsCardVariant;
}

// ── Variant pickers ──────────────────────────────────────────────────────────
const LIKE_LABELS: LikeLabel[]       = ["Like", "Agree", "Dislike", "Support", "Respect", "Upvote"];
const COMMENT_LABELS: CommentLabel[] = ["Debate", "Reply", "Counter", "Speak", "Open Talk", "Say Something", "Thoughts"];
const CTA_LABELS = [
  "See What Happened",
  "Get the Full Tea",
  "What's the Drama?",
  "You Won't Believe This",
  "Go Deep",
  "Full Breakdown",
];

function slugHash(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
}

function pickVariants(slug: string) {
  const h = slugHash(slug);
  return {
    like:    LIKE_LABELS[h % LIKE_LABELS.length],
    comment: COMMENT_LABELS[(h >> 3) % COMMENT_LABELS.length],
    cta:     CTA_LABELS[(h >> 6) % CTA_LABELS.length],
  };
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

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });
}
// ─────────────────────────────────────────────────────────────────────────────

export default function NewsCard({ article, variant = "list" }: NewsCardProps) {
  if (variant === "sidebar") return <SidebarCard article={article} />;
  if (variant === "compact") return <CompactCard article={article} />;
  return <ListCard article={article} />;
}

// ==========================================
// LIST CARD (main card with inline expand)
// ==========================================
function ListCard({ article }: { article: Article }) {
  const variants = pickVariants(article.slug);
  const [commentOpen, setCommentOpen] = useState(false);
  const [articleOpen, setArticleOpen] = useState(false);
  const expandRef = useRef<HTMLDivElement>(null);

  // Scroll card into view when expanded
  useEffect(() => {
    if (articleOpen && expandRef.current) {
      setTimeout(() => {
        expandRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }, [articleOpen]);

  return (
    <article
      ref={expandRef}
      className={`group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f172a] shadow-2xs hover:shadow-md transition-all duration-300 ${articleOpen ? "ring-2 ring-[#0B4FBA]/20" : ""}`}
    >
      {/* Badges */}
      <div className="absolute top-3 right-3 z-10 flex gap-1.5">
        {article.type === ContentType.MANUAL_AI && (
          <span className="flex items-center gap-1 rounded-full bg-[#0B4FBA] px-2.5 py-0.5 text-[10px] font-bold font-mono text-white shadow-xs">
            <Sparkles className="h-3 w-3 text-amber-300" /> IGEN VERIFIED
          </span>
        )}
        {article.isTrending && (
          <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-2.5 py-0.5 text-[10px] font-bold font-mono text-white shadow-xs">
            <Flame className="h-3 w-3" /> TRENDING
          </span>
        )}
      </div>

      {/* Hero Image — clickable to expand */}
      <button
        onClick={() => setArticleOpen(!articleOpen)}
        className={`block relative w-full overflow-hidden cursor-pointer ${articleOpen ? "aspect-[16/7]" : "aspect-[16/9]"} transition-all duration-500`}
        aria-label={articleOpen ? "Collapse article" : "Read full article"}
      >
        <Image
          src={article.heroImage}
          alt={article.title}
          fill
          className={`object-cover transition-transform duration-500 ${!articleOpen ? "group-hover:scale-102" : ""}`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {articleOpen && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        )}
        {article.isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xs">
            <div className="flex items-center gap-2 rounded-xl bg-white/95 px-4 py-2 text-xs font-bold font-mono text-slate-900 shadow-md">
              <Lock className="h-4 w-4 text-[#0B4FBA]" />
              Enterprise Briefing Locked
            </div>
          </div>
        )}
      </button>

      <div className="p-5">
        {/* Source + Time */}
        <div className="mb-2.5 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <div className="flex h-5 w-5 items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300">
            {article.sourceName.charAt(0)}
          </div>
          <span className="font-semibold text-slate-700 dark:text-slate-300">{article.sourceName}</span>
          <span>·</span>
          <span suppressHydrationWarning>{timeAgo(article.publishedAt)}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {article.readTime} min read
          </span>
        </div>

        {/* Headline */}
        <button
          onClick={() => setArticleOpen(!articleOpen)}
          className="mb-2.5 text-left w-full"
        >
          <h3
            className={`text-xl font-bold font-display leading-snug text-slate-900 dark:text-white transition-colors hover:text-[#0B4FBA] dark:hover:text-blue-400 ${!articleOpen ? "line-clamp-2" : ""}`}
          >
            {article.title}
          </h3>
        </button>

        {/* Summary */}
        <p className={`mb-3.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300 ${!articleOpen ? "line-clamp-3" : ""}`}>
          {article.summary}
        </p>

        {/* Tags */}
        <div className="mb-3.5 flex flex-wrap gap-1.5">
          {article.tags.slice(0, articleOpen ? article.tags.length : 4).map((tag) => (
            <TagChip
              key={tag}
              label={tag}
              color={article.sector ? "sector" : article.country ? "country" : "default"}
            />
          ))}
        </div>

        {/* ── EXPANDED ARTICLE CONTENT ──────────────────────────────────────── */}
        {articleOpen && (
          <div className="mt-2 mb-4 space-y-4" style={{ animation: "slideDown 0.25s ease" }}>
            {/* Metadata bar */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-[var(--color-neutral-light)] bg-[var(--color-neutral-light)]/40 px-4 py-3">
              {article.authorName && (
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-secondary)]/10 text-xs font-bold text-[var(--color-secondary)]">
                    {article.authorName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[10px] text-[var(--color-neutral-dark)]">Written by</p>
                    <p className="text-xs font-semibold text-[var(--color-text-body)]">{article.authorName}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-1 text-xs text-[var(--color-neutral-dark)]">
                <Calendar className="h-3 w-3 text-[var(--color-primary)]" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-[var(--color-neutral-dark)]">
                <Clock className="h-3 w-3 text-[var(--color-primary)]" />
                <span>{article.readTime} min read</span>
              </div>
              {article.leaderDesignation && (
                <div className="flex items-center gap-1 text-xs text-[var(--color-neutral-dark)]">
                  <BookOpen className="h-3 w-3 text-[var(--color-primary)]" />
                  <span>{article.leaderDesignation.title}</span>
                </div>
              )}
            </div>

            {/* Article body — enhanced styles + AI widget mid-article */}
            <ArticleBody article={article} />

            {/* Topics */}
            <div className="border-t border-[var(--color-neutral-light)] pt-4">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-neutral-dark)]">Topics</p>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--color-neutral-light)] px-3 py-1 text-xs font-medium text-[var(--color-text-body)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        )}


        {/* Action Buttons */}
        <div className="flex items-center gap-1 border-t border-[var(--color-neutral-light)] pt-2 -mx-1">
          <LikeButton count={article.likeCount} isLiked={article.isLiked} label={variants.like} />
          <CommentButton
            count={article.commentCount}
            label={variants.comment}
            isOpen={commentOpen}
            onClick={() => setCommentOpen(!commentOpen)}
          />
          <ShareButton count={article.shareCount} article={article} />
          <div className="ml-auto flex items-center gap-1">
            <SaveButton isBookmarked={article.isBookmarked} />
            <MoreMenu />
          </div>
        </div>

        {/* Comment Panel */}
        {commentOpen && (
          <CommentPanel
            articleSlug={article.slug}
            totalCount={article.commentCount}
            label={variants.comment}
            onClose={() => setCommentOpen(false)}
          />
        )}

        {/* CTA / Collapse Button */}
        {!articleOpen ? (
          <button
            onClick={() => setArticleOpen(true)}
            className="mt-3 flex w-full items-center justify-center rounded-lg bg-[var(--color-primary)] py-2.5 text-sm font-semibold text-white transition-all hover:bg-[var(--color-primary-dark)] hover:shadow-lg"
          >
            {variants.cta}
          </button>
        ) : (
          <button
            onClick={() => { setArticleOpen(false); setCommentOpen(false); }}
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-[var(--color-neutral-light)] bg-white py-2.5 text-sm font-semibold text-[var(--color-neutral-dark)] transition-all hover:bg-[var(--color-neutral-light)]"
          >
            <ChevronUp className="h-4 w-4" />
            Collapse Article
          </button>
        )}
      </div>
    </article>
  );
}

// ==========================================
// MORE MENU (... dropdown)
// ==========================================
function MoreMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const items = [
    "Follow author News",
    "Follow publisher News",
    "Mute author News",
    "Mute publication News",
    "Report story...",
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center rounded-full p-1.5 text-xs text-[var(--color-neutral-dark)] transition-all hover:bg-[var(--color-neutral-light)]"
        aria-label="More options"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute right-0 bottom-full mb-1 z-50 min-w-[190px] rounded-xl border border-[var(--color-neutral-light)] bg-white shadow-xl py-1">
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => setOpen(false)}
              className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors hover:bg-[var(--color-neutral-light)] ${
                item === "Report story..." ? "text-red-500" : "text-[var(--color-text-body)]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// COMPACT CARD
// ==========================================
function CompactCard({ article }: { article: Article }) {
  return (
    <button
      className="group flex w-full gap-3 rounded-lg p-2 text-left transition-colors hover:bg-[var(--color-neutral-light)]"
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
    </button>
  );
}

// ==========================================
// SIDEBAR CARD
// ==========================================
function SidebarCard({ article }: { article: Article }) {
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
          <span suppressHydrationWarning>{timeAgo(article.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
