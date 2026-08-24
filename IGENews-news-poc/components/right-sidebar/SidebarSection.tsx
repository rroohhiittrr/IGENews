"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface SidebarSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode[];
  defaultCount?: number;
  expandedCount?: number;
  viewMoreHref?: string;
}

export default function SidebarSection({
  title,
  icon,
  children,
  defaultCount = 3,
  expandedCount = 5,
  viewMoreHref = "#",
}: SidebarSectionProps) {
  const t = useTranslations("common");
  const [isHovered, setIsHovered] = useState(false);
  const visibleCount = isHovered ? expandedCount : defaultCount;
  const displayItems = children.slice(0, Math.min(visibleCount, children.length));

  return (
    <div
      className="rounded-xl border border-[var(--color-neutral-light)] bg-white shadow-sm overflow-hidden transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Section Header */}
      <div className="flex items-center gap-2 px-4 pt-3 pb-2">
        <span className="text-base">{icon}</span>
        <h3
          className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]"
        >
          {title}
        </h3>
      </div>

      {/* Items */}
      <div className="px-2 pb-2 space-y-0.5">
        {displayItems.map((child, index) => (
          <div
            key={index}
            className="transition-all duration-300"
            style={{
              opacity: index >= defaultCount ? (isHovered ? 1 : 0) : 1,
              maxHeight: index >= defaultCount ? (isHovered ? "200px" : "0px") : "200px",
              overflow: "hidden",
              transitionDelay: index >= defaultCount ? `${(index - defaultCount) * 50}ms` : "0ms",
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* View More */}
      <Link
        href={viewMoreHref}
        className="flex items-center justify-center gap-1 border-t border-[var(--color-neutral-light)] px-4 py-2 text-xs font-medium text-[var(--color-secondary)] transition-colors hover:bg-[var(--color-neutral-light)] hover:text-[var(--color-primary)]"
      >
        {t("viewMore")} <ChevronRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
