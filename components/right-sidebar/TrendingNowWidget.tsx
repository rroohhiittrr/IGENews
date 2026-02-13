import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types/types";
import { UserCircle } from "lucide-react";
import SidebarSection from "./SidebarSection";

function timeAgoShort(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

interface TrendingNowWidgetProps {
  articles: Article[];
}

export default function TrendingNowWidget({ articles }: TrendingNowWidgetProps) {
  const items = articles.map((article, index) => {
    const isCeoAd = index === 2; // 3rd item is CEO voice ad
    return (
      <Link
        key={article.id}
        href={`/article/${article.slug}`}
        className="group flex gap-3 rounded-lg p-2 transition-colors hover:bg-[var(--color-neutral-light)] relative"
      >
        {/* Rank Number */}
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[var(--color-accent-gold)]/10 text-xs font-bold text-[var(--color-accent-gold)]">
          {index + 1}
        </div>
        <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md">
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            className="object-cover"
            sizes="80px"
          />
          {isCeoAd && (
            <div className="absolute top-0.5 left-0.5 flex items-center gap-0.5 rounded bg-purple-600 px-1 py-0.5">
              <UserCircle className="h-2 w-2 text-white" />
              <span className="text-[7px] font-bold text-white uppercase">CEO</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-medium leading-snug text-[var(--color-text-body)] line-clamp-2 group-hover:text-[var(--color-secondary)] transition-colors">
            {article.title}
          </h4>
          <div className="mt-1 flex items-center gap-2 text-[10px] text-[var(--color-neutral-dark)]">
            {article.sector && <span>{article.sector.name}</span>}
            <span>·</span>
            <span>{timeAgoShort(article.publishedAt)}</span>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <SidebarSection
      title="Trending Now"
      icon="🔥"
      viewMoreHref="/trending"
    >
      {items}
    </SidebarSection>
  );
}
