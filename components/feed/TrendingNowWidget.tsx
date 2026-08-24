import { Article } from "@/types/types";
import NewsCard from "@/components/news/NewsCard";
import { Flame } from "lucide-react";

interface TrendingNowWidgetProps {
  articles: Article[];
}

export default function TrendingNowWidget({ articles }: TrendingNowWidgetProps) {
  return (
    <div className="rounded-xl border border-[var(--color-neutral-light)] bg-white p-4 shadow-[var(--shadow-card)]">
      <div className="mb-3 flex items-center gap-2">
        <Flame className="h-4 w-4 text-orange-500" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)]">
          Trending Now
        </h3>
      </div>
      <div className="space-y-2">
        {articles.slice(0, 4).map((article, i) => (
          <div key={article.id} className="flex gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-neutral-light)] text-[11px] font-bold text-[var(--color-primary)]">
              {i + 1}
            </span>
            <div className="flex-1">
              <NewsCard article={article} variant="sidebar" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
