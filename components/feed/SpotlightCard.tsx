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
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#090E17] via-[#0F172A] to-[#1E293B] p-6 text-white border border-slate-800 shadow-md">
      {/* Label */}
      <div className="mb-3.5 flex items-center gap-2">
        <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider font-mono border border-white/15">
          <Sparkles className="h-3 w-3 text-amber-400" />
          EXECUTIVE EDITORIAL DESK
        </div>
        <div className="ml-auto flex gap-1">
          <SaveButton compact />
          <ShareButton compact />
        </div>
      </div>

      {/* Headline */}
      <Link href={`/article/${article.slug}`}>
        <h2 className="mb-3 text-xl sm:text-2xl font-bold leading-snug line-clamp-2 hover:text-blue-300 transition-colors font-display">
          {article.title}
        </h2>
      </Link>

      {/* Metadata */}
      <div className="mb-3 flex items-center gap-3 text-xs text-slate-300">
        {article.sector && <TagChip label={article.sector.name} color="sector" />}
        <span className="font-mono text-[11px]" suppressHydrationWarning>{timeAgo(article.publishedAt)}</span>
      </div>

      {/* Tags */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {article.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-white/10 px-2 py-0.5 text-[11px] font-medium text-slate-300 border border-white/10 font-mono"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Read Time + CTA */}
      <div className="flex items-center gap-3 pt-2 border-t border-white/10">
        <span className="flex items-center gap-1 text-xs text-slate-400 font-mono">
          <Clock className="h-3.5 w-3.5" />
          {article.readTime} min read
        </span>
        <Link
          href={`/article/${article.slug}`}
          className="ml-auto rounded-xl bg-gradient-to-r from-[#F0652E] to-amber-500 px-4 py-2 text-xs font-bold text-white transition-all hover:opacity-95 shadow-xs"
        >
          Read Intelligence Brief →
        </Link>
      </div>
    </div>
  );
}
