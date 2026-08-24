import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types/types";
import { Globe, Megaphone } from "lucide-react";
import SidebarSection from "./SidebarSection";
import { useTranslations, useFormatter } from "next-intl";

interface UpcomingHighlightsWidgetProps {
  articles: Article[];
}

export default function UpcomingHighlightsWidget({ articles }: UpcomingHighlightsWidgetProps) {
  const t = useTranslations("sidebar");
  const format = useFormatter();

  const items = articles.map((article, index) => {
    const isCountryAd = index === 2; // 3rd item is a country news ad
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
          {isCountryAd && (
            <div className="absolute top-0.5 left-0.5 flex items-center gap-0.5 rounded bg-blue-600 px-1 py-0.5">
              <Globe className="h-2 w-2 text-white" />
              <span className="text-[7px] font-bold text-white uppercase">Country</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-medium leading-snug text-[var(--color-text-body)] line-clamp-2 group-hover:text-[var(--color-secondary)] transition-colors">
            {article.title}
          </h4>
          <div className="mt-1 flex items-center gap-2 text-[10px] text-[var(--color-neutral-dark)]">
            {article.country?.pairName && <span className="flex items-center gap-0.5"><Globe className="h-2.5 w-2.5" />{article.country.pairName}</span>}
            {!article.country?.pairName && article.sector && <span>{article.sector.name}</span>}
            <span>·</span>
            <span>{format.relativeTime(new Date(article.publishedAt), { now: new Date() })}</span>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <SidebarSection
      title={t("upcomingHighlights")}
      icon="📋"
      viewMoreHref="/headlines"
    >
      {items}
    </SidebarSection>
  );
}
