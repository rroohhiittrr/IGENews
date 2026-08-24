import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types/types";
import { BookOpen, Bookmark, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface NowReadingDeskProps {
  article: Article;
}

export default function NowReadingDesk({ article }: NowReadingDeskProps) {
  const t = useTranslations();

  return (
    <div className="rounded-xl overflow-hidden border border-[var(--color-neutral-light)] shadow-sm">
      {/* Header */}
      <div className="bg-[var(--color-primary)] px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-white/80" />
          <span className="text-xs font-semibold text-white uppercase tracking-wider">
            {t("sidebar.nowReading")}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="p-1 rounded-full hover:bg-white/10 transition-colors">
            <Bookmark className="h-3.5 w-3.5 text-white/80" />
          </button>
          <button className="p-1 rounded-full hover:bg-white/10 transition-colors">
            <Share2 className="h-3.5 w-3.5 text-white/80" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] p-4">
        {/* Thumbnail */}
        <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-3">
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            className="object-cover"
            sizes="280px"
          />
        </div>

        {/* Tag */}
        {article.sector && (
          <span className="inline-block rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium text-white mb-2">
            {article.sector.name}
          </span>
        )}

        {/* Title */}
        <h3
          className="text-sm font-bold text-white leading-snug line-clamp-2 mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {article.title}
        </h3>

        {/* Meta */}
        <div className="flex items-center gap-2 text-[10px] text-white/60">
          <span>{t("common.minRead", { min: article.readTime })}</span>
          <span>·</span>
          <span>{article.sourceName}</span>
        </div>

        {/* CTA */}
        <Link
          href={`/article/${article.slug}`}
          className="mt-3 flex w-full items-center justify-center rounded-lg bg-white py-2 text-xs font-semibold text-[var(--color-primary)] transition-all hover:bg-white/90 hover:shadow-md"
        >
          {t("sidebar.openArticle")}
        </Link>
      </div>
    </div>
  );
}
