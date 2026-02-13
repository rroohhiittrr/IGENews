"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";

const BREAKING_NEWS = [
  {
    id: "bn1",
    headline: "BREAKING: India signs $2B semiconductor deal with Netherlands — ASML to set up training center in Bangalore",
    articleSlug: "india-semiconductor-deal-netherlands",
  },
  {
    id: "bn2",
    headline: "BREAKING: RBI holds rates steady at 6.5% — Export sector welcomes stability amid global uncertainty",
    articleSlug: "rbi-holds-rates-export-sector",
  },
  {
    id: "bn3",
    headline: "BREAKING: India-UAE CEPA crosses $100B trade milestone — Services exports surge 40% YoY",
    articleSlug: "india-uae-cepa-100b-milestone",
  },
];

export default function BreakingNewsTicker() {
  return (
    <div className="relative overflow-hidden bg-[var(--color-breaking)] text-white">
      <div className="mx-auto flex max-w-7xl items-center">
        {/* Label */}
        <div className="flex shrink-0 items-center gap-1.5 bg-[var(--color-breaking)] px-3 py-1.5 z-10">
          <AlertTriangle className="h-3.5 w-3.5 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Breaking
          </span>
        </div>

        {/* Ticker */}
        <div className="overflow-hidden flex-1">
          <div className="flex animate-ticker whitespace-nowrap py-1.5">
            {BREAKING_NEWS.map((item) => (
              <Link
                key={item.id}
                href={`/article/${item.articleSlug}`}
                className="mr-16 text-sm font-medium text-white hover:underline"
              >
                {item.headline}
              </Link>
            ))}
            {/* Duplicate for seamless loop */}
            {BREAKING_NEWS.map((item) => (
              <Link
                key={`dup-${item.id}`}
                href={`/article/${item.articleSlug}`}
                className="mr-16 text-sm font-medium text-white hover:underline"
              >
                {item.headline}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
