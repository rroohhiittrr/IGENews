import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types/types";
import { MessageCircle, Building2 } from "lucide-react";
import SidebarSection from "./SidebarSection";

function timeAgoShort(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

interface MostDiscussedWidgetProps {
  articles: Article[];
}

export default function MostDiscussedWidget({ articles }: MostDiscussedWidgetProps) {
  const items = articles.map((article, index) => {
    const isCompanyAd = index === 2; // 3rd item is company profile ad
    return (
      <Link
        key={article.id}
        href={`/article/${article.slug}`}
        className="group flex gap-3 rounded-lg p-2 transition-colors hover:bg-[var(--color-neutral-light)] relative"
      >
        <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md">
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            className="object-cover"
            sizes="80px"
          />
          {isCompanyAd && (
            <div className="absolute top-0.5 left-0.5 flex items-center gap-0.5 rounded bg-teal-600 px-1 py-0.5">
              <Building2 className="h-2 w-2 text-white" />
              <span className="text-[7px] font-bold text-white uppercase">Co.</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-medium leading-snug text-[var(--color-text-body)] line-clamp-2 group-hover:text-[var(--color-secondary)] transition-colors">
            {article.title}
          </h4>
          <div className="mt-1 flex items-center gap-2 text-[10px] text-[var(--color-neutral-dark)]">
            <span className="flex items-center gap-0.5 text-[var(--color-accent-gold)]">
              <MessageCircle className="h-2.5 w-2.5" />
              {article.commentCount}
            </span>
            <span>·</span>
            <span>{timeAgoShort(article.publishedAt)}</span>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <SidebarSection
      title="Most Discussed"
      icon="💬"
      viewMoreHref="/trending?sort=discussed"
    >
      {items}
    </SidebarSection>
  );
}
