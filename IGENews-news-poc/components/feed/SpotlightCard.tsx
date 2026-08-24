import Link from "next/link";
import { Article } from "@/types/types";
import TagChip from "@/components/news/TagChip";
import SaveButton from "@/components/engagement/SaveButton";
import ShareButton from "@/components/engagement/ShareButton";
import { Sparkles, Clock } from "lucide-react";

interface SpotlightCardProps {
  article: Article;
}

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diff = now - date;
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `About ${hours} hour${hours > 1 ? "s" : ""} ago`;
  return `${Math.floor(diff / 86400000)} days ago`;
}

export default function SpotlightCard({ article }: SpotlightCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] p-5 text-white shadow-lg">
      {/* Label */}
      <div className="mb-3 flex items-center gap-2">
        <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-[var(--color-accent-gold)]" />
          NOW READING / Desk
        </div>
        <div className="ml-auto flex gap-1">
          <SaveButton compact />
          <ShareButton compact />
        </div>
      </div>

      {/* Headline */}
      <Link href={`/article/${article.slug}`}>
        <h2 className="mb-3 text-xl font-bold leading-snug line-clamp-2 hover:underline" style={{ fontFamily: 'var(--font-display)' }}>
          {article.title}
        </h2>
      </Link>

      {/* Metadata */}
      <div className="mb-3 flex items-center gap-3 text-xs text-white/70">
        {article.sector && <TagChip label={article.sector.name} color="sector" />}
        <span>{timeAgo(article.publishedAt)}</span>
      </div>

      {/* Tags */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {article.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white/80"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Read Time + CTA */}
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 text-xs text-white/60">
          <Clock className="h-3 w-3" />
          {article.readTime} min read
        </span>
        <Link
          href={`/article/${article.slug}`}
          className="ml-auto rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[var(--color-primary)] transition-all hover:bg-[var(--color-accent-gold)] hover:text-white hover:shadow-lg"
        >
          Open Article
        </Link>
      </div>

      {/* Decorative gradient circle */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[var(--color-secondary)] opacity-10 blur-3xl" />
    </div>
  );
}
