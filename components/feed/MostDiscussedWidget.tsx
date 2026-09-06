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
    <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f172a] p-4 shadow-2xs">
      <div className="mb-3.5 flex items-center gap-2 pb-2.5 border-b border-slate-100 dark:border-white/5">
        <MessageCircle className="h-4 w-4 text-[#0B4FBA] dark:text-blue-400" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-mono">
          Executive Discussions
        </h3>
      </div>
      <div className="space-y-2.5">
        {articles.slice(0, 5).map((article) => (
          <Link
            key={article.id}
            href={`/article/${article.slug}`}
            className="group block rounded-xl p-2.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
          >
            <h4 className="text-xs sm:text-sm font-semibold leading-snug text-slate-900 dark:text-slate-100 line-clamp-2 group-hover:text-[#0B4FBA] dark:group-hover:text-blue-400 transition-colors">
              {article.title}
            </h4>
            <div className="mt-1.5 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
              {article.sector && <span className="font-medium text-slate-700 dark:text-slate-300">{article.sector.name}</span>}
              <span>•</span>
              <span className="flex items-center gap-1 font-mono">
                <MessageCircle className="h-3 w-3" />
                {article.commentCount}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-mono" suppressHydrationWarning>
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
