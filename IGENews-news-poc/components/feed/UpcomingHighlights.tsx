import { Article } from "@/types/types";
import NewsCard from "@/components/news/NewsCard";

interface UpcomingHighlightsProps {
  articles: Article[];
}

export default function UpcomingHighlights({ articles }: UpcomingHighlightsProps) {
  return (
    <div className="rounded-xl border border-[var(--color-neutral-light)] bg-white p-4 shadow-[var(--shadow-card)]">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)]">
        📋 Upcoming Highlights
      </h3>
      <div className="space-y-1">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} variant="compact" />
        ))}
      </div>
    </div>
  );
}
