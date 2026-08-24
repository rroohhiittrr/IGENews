import Link from "next/link";
import { Article } from "@/types/types";
import { MessageCircle, Clock } from "lucide-react";

interface MostDiscussedWidgetProps {
  articles: Article[];
}

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diff = now - date;
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
}

export default function MostDiscussedWidget({ articles }: MostDiscussedWidgetProps) {
  return (
    <div className="rounded-xl border border-[var(--color-neutral-light)] bg-white p-4 shadow-[var(--shadow-card)]">
      <div className="mb-3 flex items-center gap-2">
        <MessageCircle className="h-4 w-4 text-[var(--color-secondary)]" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)]">
          Most Discussed
        </h3>
      </div>
      <div className="space-y-3">
        {articles.slice(0, 5).map((article) => (
          <Link
            key={article.id}
            href={`/article/${article.slug}`}
            className="group block rounded-lg p-2 transition-colors hover:bg-[var(--color-neutral-light)]"
          >
            <h4 className="text-sm font-medium leading-snug text-[var(--color-text-body)] line-clamp-2 group-hover:text-[var(--color-secondary)] transition-colors">
              {article.title}
            </h4>
            <div className="mt-1 flex items-center gap-2 text-[11px] text-[var(--color-neutral-dark)]">
              {article.sector && <span>{article.sector.name}</span>}
              <span className="flex items-center gap-0.5">
                <MessageCircle className="h-3 w-3" />
                {article.commentCount}
              </span>
              <span className="flex items-center gap-0.5">
                <Clock className="h-3 w-3" />
                {timeAgo(article.publishedAt)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
