"use client";

import { useState } from "react";
import { Search, Heart, Bookmark, Clock, MessageCircle, ThumbsUp, ChevronDown, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { mockArticles } from "@/lib/mockData";

interface MyNewsSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  articles: typeof mockArticles;
}

const MY_NEWS_SECTIONS: MyNewsSection[] = [
  {
    id: "favourites",
    label: "My Favourites",
    icon: <Heart className="h-4 w-4" />,
    color: "text-red-500",
    articles: mockArticles.slice(0, 5),
  },
  {
    id: "bookmarks",
    label: "My Bookmarks",
    icon: <Bookmark className="h-4 w-4" />,
    color: "text-blue-600",
    articles: mockArticles.slice(2, 7),
  },
  {
    id: "readlater",
    label: "My Read Later",
    icon: <Clock className="h-4 w-4" />,
    color: "text-amber-600",
    articles: mockArticles.slice(4, 9),
  },
  {
    id: "comments",
    label: "My Comments",
    icon: <MessageCircle className="h-4 w-4" />,
    color: "text-purple-600",
    articles: mockArticles.slice(1, 6),
  },
  {
    id: "likes",
    label: "My Likes",
    icon: <ThumbsUp className="h-4 w-4" />,
    color: "text-green-600",
    articles: mockArticles.slice(3, 8),
  },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-[var(--color-neutral-light)]/30 pb-24">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-[var(--color-neutral-light)] shadow-sm md:hidden">
        <div className="px-4 py-3">
          <h1 className="text-lg font-bold text-[var(--color-primary)] mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Search & My News
          </h1>

          {/* AI Search Bar */}
          <div className="relative">
            <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-[var(--color-secondary)] via-[var(--color-accent-gold)] to-[var(--color-primary)] opacity-30 blur-[1px]" />
            <div className="relative flex items-center">
              <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-accent-gold)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask AI or search news..."
                className="w-full rounded-xl border border-[var(--color-neutral-mid)]/40 bg-white py-3 pl-10 pr-4 text-sm text-[var(--color-text-body)] placeholder-[var(--color-neutral-dark)]/50 outline-none focus:border-transparent focus:shadow-lg focus:shadow-[var(--color-secondary)]/10"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-neutral-dark)]" />
            </div>
          </div>
        </div>
      </header>

      {/* Desktop placeholder */}
      <div className="hidden md:block max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-display)" }}>Search</h1>
        <p className="text-[var(--color-neutral-dark)] mt-2">This page is optimized for mobile view.</p>
      </div>

      {/* My News Sections */}
      <div className="md:hidden px-4 mt-4 space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-neutral-dark)] mb-2">
          My News
        </h2>

        {MY_NEWS_SECTIONS.map((section) => {
          const isOpen = openSections[section.id];
          const displayArticles = section.articles.slice(0, 3);

          return (
            <div
              key={section.id}
              className="rounded-xl bg-white border border-[var(--color-neutral-light)] shadow-sm overflow-hidden"
            >
              {/* Toggle Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-4 py-3 active:bg-[var(--color-neutral-light)]/50"
              >
                <div className="flex items-center gap-3">
                  <span className={section.color}>{section.icon}</span>
                  <span className="text-sm font-semibold text-[var(--color-text-body)]">
                    {section.label}
                  </span>
                  <span className="rounded-full bg-[var(--color-neutral-light)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--color-neutral-dark)]">
                    {section.articles.length}
                  </span>
                </div>
                {isOpen ? (
                  <ChevronDown className="h-4 w-4 text-[var(--color-neutral-dark)]" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-[var(--color-neutral-dark)]" />
                )}
              </button>

              {/* Collapsible Content */}
              <div
                className="transition-all duration-300 overflow-hidden"
                style={{
                  maxHeight: isOpen ? "400px" : "0px",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div className="px-3 pb-2 space-y-1">
                  {displayArticles.map((article) => (
                    <Link
                      key={article.id}
                      href={`/article/${article.slug}`}
                      className="flex items-start gap-3 rounded-lg px-2 py-2 active:bg-[var(--color-neutral-light)]"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[13px] font-medium leading-snug text-[var(--color-text-body)] line-clamp-2">
                          {article.title}
                        </h4>
                        <div className="mt-1 flex items-center gap-2 text-[10px] text-[var(--color-neutral-dark)]">
                          <span>{article.sourceName}</span>
                          <span>·</span>
                          <span>{article.readTime} min</span>
                        </div>
                      </div>
                    </Link>
                  ))}

                  {/* View More */}
                  <Link
                    href={`/mynews?tab=${section.id}`}
                    className="flex items-center justify-center gap-1 rounded-lg bg-[var(--color-neutral-light)]/60 py-2 text-xs font-medium text-[var(--color-secondary)] active:bg-[var(--color-neutral-light)]"
                  >
                    View More <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
