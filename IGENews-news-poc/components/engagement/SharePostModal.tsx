"use client";

import { useState, useRef, useCallback } from "react";
import { X, Download, Share2, Instagram, Linkedin, MessageCircle, Maximize2 } from "lucide-react";
import { Article } from "@/types/types";

interface SharePostModalProps {
  article: Article;
  onClose: () => void;
}

type Format = "post" | "story";

// Colour palette for the generated cards — aligned with IGENews brand identity
const PALETTES = [
  { bg: "#1D1D46", accent: "#F0652E", text: "#ffffff", badge: "#F0652E" },  // Indigo Navy + Saffron Gold
  { bg: "#121232", accent: "#0642BA", text: "#ffffff", badge: "#0642BA" },  // Dark Navy + Steel Blue
  { bg: "#0642BA", accent: "#F0652E", text: "#ffffff", badge: "#F0652E" },  // Steel Blue + Gold
  { bg: "#1D1D46", accent: "#2E7D32", text: "#ffffff", badge: "#2E7D32" },  // Navy + Export Green
  { bg: "#121232", accent: "#4A8FC2", text: "#ffffff", badge: "#4A8FC2" },  // Deep Navy + Sky Blue
];

function slugHash(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function getCaption(article: Article): string {
  const tags = article.tags.slice(0, 3);
  return `${article.title}\n\n${article.summary.substring(0, 200)}${article.summary.length > 200 ? "…" : ""}\n\n${tags.map(t => `#${t.replace(/ /g, "")}`).join(" ")} #IndiaGlobalNews #TradeIntelligence`;
}

// ─── Post card preview (1080 × 1350 aspect = 4:5) ─────────────────────────────
function PostCardPreview({ article }: { article: Article }) {
  const palette = PALETTES[slugHash(article.slug) % PALETTES.length];
  const tags = article.tags.slice(0, 3);

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
      style={{ aspectRatio: "4/5", background: palette.bg }}
    >
      {/* Hero image */}
      <img
        src={article.heroImage}
        alt={article.title}
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(160deg, ${palette.bg}cc 0%, ${palette.bg}99 35%, ${palette.bg}ee 75%, ${palette.bg} 100%)`,
        }}
      />

      {/* Top branding */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-[6%] pt-[5%]">
        <div className="flex items-center gap-2">
          <img
            src="/IGEN NEWS - White Background - Rectangle.svg"
            alt="India Global News"
            style={{ height: "1.5rem", width: "auto", objectFit: "contain", borderRadius: "2px" }}
          />
        </div>
        {article.isTrending && (
          <span
            className="rounded-full px-2.5 py-0.5 font-bold text-white tracking-wide"
            style={{ background: "#f97316", fontSize: "0.55rem" }}
          >
            🔥 Trending
          </span>
        )}
      </div>

      {/* Sector badge */}
      {article.sector && (
        <div className="absolute px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-white"
          style={{ top: "15%", left: "6%", background: `${palette.accent}cc`, fontSize: "0.5rem" }}>
          {article.sector.name}
        </div>
      )}

      {/* Main content */}
      <div className="absolute bottom-0 left-0 right-0 px-[6%] pb-[6%]">
        {/* Tags */}
        <div className="mb-[3%] flex flex-wrap gap-1.5">
          {tags.map(tag => (
            <span key={tag} className="rounded-full px-2 py-0.5 font-medium text-white border border-white/30" style={{ fontSize: "0.5rem" }}>
              #{tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2
          className="mb-[4%] font-black leading-snug text-white"
          style={{ fontSize: "clamp(1rem, 5cqw, 1.5rem)" }}
        >
          {article.title}
        </h2>

        {/* Summary excerpt */}
        <p className="mb-[5%] text-white/70 leading-relaxed" style={{ fontSize: "clamp(0.55rem, 2.5cqw, 0.75rem)" }}>
          {article.summary.substring(0, 110)}…
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between border-t border-white/10 pt-[4%]">
          <div className="text-white/50 uppercase tracking-widest" style={{ fontSize: "0.5rem" }}>
            {formatDate(article.publishedAt)} · {article.readTime} min read
          </div>
          <div
            className="rounded-full px-2.5 py-0.5 font-bold text-white"
            style={{ background: palette.accent, fontSize: "0.5rem" }}
          >
            iglobalnews.com
          </div>
        </div>
      </div>

      {/* Decorative accent line */}
      <div
        className="absolute rounded-full"
        style={{ top: "20%", left: "6%", width: "12%", height: "3px", background: palette.accent }}
      />
    </div>
  );
}

// ─── Story card preview (1080 × 1920 aspect = 9:16) ──────────────────────────
function StoryCardPreview({ article }: { article: Article }) {
  const palette = PALETTES[(slugHash(article.slug) + 2) % PALETTES.length];

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
      style={{ aspectRatio: "9/16", background: palette.bg }}
    >
      {/* Full bleed hero image */}
      <img
        src={article.heroImage}
        alt={article.title}
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      {/* Strong gradient bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, ${palette.bg}55 40%, ${palette.bg}cc 65%, ${palette.bg} 100%)`,
        }}
      />

      {/* Top: story progress bar mock */}
      <div className="absolute top-[3%] left-[4%] right-[4%] flex gap-1">
        <div className="h-1 flex-1 rounded-full bg-white opacity-100" />
        <div className="h-1 flex-1 rounded-full bg-white opacity-40" />
        <div className="h-1 flex-1 rounded-full bg-white opacity-40" />
      </div>

      {/* Top: IGE branding avatar */}
      <div className="absolute left-[4%] flex items-center gap-2" style={{ top: "6%" }}>
        <img
          src="/IGEN NEWS - White Background - Rectangle.svg"
          alt="IGE"
          style={{ height: "1.4rem", width: "auto", objectFit: "contain", borderRadius: "2px" }}
        />
        <div>
          <p className="font-bold text-white leading-none" style={{ fontSize: "0.55rem" }}>IGENews</p>
          <p className="text-white/60 leading-tight" style={{ fontSize: "0.45rem" }}>Now</p>
        </div>
      </div>

      {/* Center: Large decorative stat */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-[8%] text-center" style={{ top: "-5%" }}>
        {article.sector && (
          <span
            className="mb-[4%] rounded-full px-3 py-0.5 font-bold uppercase tracking-widest text-white"
            style={{ background: `${palette.accent}cc`, fontSize: "0.5rem" }}
          >
            {article.sector.name}
          </span>
        )}
        <p className="text-white/50 uppercase tracking-widest mb-[3%]" style={{ fontSize: "0.55rem" }}>Breaking Story</p>
        <div
          className="w-[15%] rounded-full"
          style={{ height: "2px", background: palette.accent }}
        />
      </div>

      {/* Bottom: Main content block */}
      <div className="absolute bottom-0 left-0 right-0 px-[6%] pb-[8%]">
        {/* Country flag or tag */}
        {article.country && (
          <span className="mb-[2%] inline-block font-semibold text-white/60 uppercase tracking-widest" style={{ fontSize: "0.55rem" }}>
            {article.country.pairName}
          </span>
        )}

        {/* Headline */}
        <h2
          className="mb-[5%] font-black leading-tight text-white"
          style={{ fontSize: "clamp(1.1rem, 6cqw, 1.8rem)" }}
        >
          {article.title}
        </h2>

        {/* Key stats row */}
        <div className="mb-[6%] flex gap-2 w-full max-w-[80%]">
          <div className="flex-1 rounded-lg py-1.5 text-center" style={{ background: `${palette.accent}33`, border: `1px solid ${palette.accent}55` }}>
            <p className="font-black text-white" style={{ fontSize: "0.65rem" }}>{article.readTime}m</p>
            <p className="text-white/50 uppercase leading-none" style={{ fontSize: "0.45rem" }}>read</p>
          </div>
          <div className="flex-1 rounded-lg py-1.5 text-center" style={{ background: `${palette.accent}33`, border: `1px solid ${palette.accent}55` }}>
            <p className="font-black text-white" style={{ fontSize: "0.65rem" }}>{article.likeCount >= 1000 ? `${(article.likeCount/1000).toFixed(1)}k` : article.likeCount}</p>
            <p className="text-white/50 uppercase leading-none" style={{ fontSize: "0.45rem" }}>likes</p>
          </div>
          <div className="flex-1 rounded-lg py-1.5 text-center" style={{ background: `${palette.accent}33`, border: `1px solid ${palette.accent}55` }}>
            <p className="font-black text-white" style={{ fontSize: "0.65rem" }}>{article.shareCount}</p>
            <p className="text-white/50 uppercase leading-none" style={{ fontSize: "0.45rem" }}>viral</p>
          </div>
        </div>

        {/* Swipe up prompt */}
        <div className="flex flex-col items-center gap-1.5 pt-[2%]">
          <div className="h-px w-[15%] bg-white/20" />
          <p className="font-semibold uppercase tracking-widest text-white/50" style={{ fontSize: "0.45rem" }}>Read full story →</p>
          <p className="text-white/30" style={{ fontSize: "0.4rem" }}>iglobalnews.com</p>
        </div>
      </div>

      {/* Corner accent glow */}
      <div
        className="absolute object-cover blur-3xl opacity-30 rounded-full"
        style={{ top: "-10%", right: "-10%", width: "50%", paddingTop: "50%", background: palette.accent }}
      />
    </div>
  );
}

// ─── Share action buttons ──────────────────────────────────────────────────────
function ShareActions({ label }: { label: string }) {
  const platforms = [
    { name: "Instagram", icon: <Instagram className="h-4 w-4" />, color: "bg-gradient-to-r from-pink-500 to-purple-500" },
    { name: "LinkedIn", icon: <Linkedin className="h-4 w-4" />, color: "bg-[#0077b5]" },
    { name: "WhatsApp", icon: <MessageCircle className="h-4 w-4" />, color: "bg-green-500" },
  ];

  return (
    <div className="space-y-4 pt-4 border-t border-[var(--color-neutral-light)]">
      <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-neutral-dark)]">Share directly to</p>
      <div className="flex flex-wrap gap-2.5">
        {platforms.map((p) => (
          <button
            key={p.name}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:opacity-90 hover:shadow-md ${p.color}`}
          >
            {p.icon}
            {p.name}
          </button>
        ))}
        <button className="flex items-center gap-2 rounded-xl border border-[var(--color-neutral-light)] bg-white px-4 py-2.5 text-xs font-semibold text-[var(--color-text-body)] shadow-sm hover:bg-[var(--color-neutral-light)] transition-all hover:shadow-md">
          <Download className="h-4 w-4" />
          Save Image
        </button>
      </div>
    </div>
  );
}

// ─── Main Modal ────────────────────────────────────────────────────────────────
export default function SharePostModal({ article, onClose }: SharePostModalProps) {
  const [activeTab, setActiveTab] = useState<Format>("post");

  return (
    <>
      <div
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        style={{ animation: "fadeIn 0.2s ease" }}
      />

      <div
        className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6"
        style={{ pointerEvents: "none" }}
      >
        <div
          className="relative w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_32px_80px_rgba(0,0,0,0.35)]"
          style={{ pointerEvents: "auto", animation: "slideUpModal 0.25s ease" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-[var(--color-neutral-light)] px-6 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-primary)] to-purple-600 shadow-sm">
              <Share2 className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-bold text-[var(--color-text-body)]">Generate Visual Content</p>
              <p className="text-xs text-[var(--color-neutral-dark)] truncate">{article.title}</p>
            </div>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <X className="h-4 w-4 text-slate-500" />
            </button>
          </div>

          {/* Modal Body: Two Columns */}
          <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
            {/* Left Column: Preview Panel (constrained width) */}
            <div className="w-full md:w-[45%] lg:w-[40%] bg-slate-50 border-r border-[var(--color-neutral-light)] p-5 md:p-8 overflow-y-auto flex flex-col items-center">
              {/* Tab Selector inside the preview column */}
              <div className="flex w-full max-w-[300px] mb-6 rounded-xl bg-slate-200/60 p-1 shadow-inner">
                <button
                  onClick={() => setActiveTab("post")}
                  className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${
                    activeTab === "post"
                      ? "bg-white text-[var(--color-primary)] shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  📸 Post (4:5)
                </button>
                <button
                  onClick={() => setActiveTab("story")}
                  className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${
                    activeTab === "story"
                      ? "bg-white text-pink-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  📱 Story (9:16)
                </button>
              </div>

              {/* Explicitly sized container for the preview card using container queries to scale typography */}
              <div className="w-full max-w-[280px]" style={{ containerType: "inline-size" }}>
                {activeTab === "post" ? (
                  <PostCardPreview article={article} />
                ) : (
                  <StoryCardPreview article={article} />
                )}
              </div>
            </div>

            {/* Right Column: Settings & Actions */}
            <div className="w-full md:w-[55%] lg:w-[60%] p-6 md:p-8 overflow-y-auto bg-white flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-black text-[var(--color-primary)] mb-1">
                  {activeTab === "post" ? "News Feed Post" : "Story Highlight"}
                </h3>
                <p className="text-sm text-[var(--color-neutral-dark)] leading-relaxed">
                  {activeTab === "post" 
                    ? "Aspect ratio optimised for Instagram and LinkedIn feeds. The image is rendered as a single high-quality media asset." 
                    : "Full-screen vertical format for Instagram and WhatsApp stories. Minimal UI for maximum impact."}
                </p>
              </div>

              {activeTab === "post" && (
                <div className="rounded-xl border border-[var(--color-neutral-light)] bg-slate-50 p-4 shadow-sm">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-neutral-dark)]">Suggested Caption</p>
                    <button
                      onClick={() => navigator.clipboard.writeText(getCaption(article))}
                      className="text-xs font-semibold text-[var(--color-primary)] hover:underline"
                    >
                      Copy caption
                    </button>
                  </div>
                  <div className="rounded-lg bg-white border border-slate-200 p-3 h-32 overflow-y-auto">
                    <p className="text-xs leading-relaxed text-[var(--color-text-body)] whitespace-pre-line">
                      {getCaption(article)}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-auto">
                <ShareActions label={activeTab === "post" ? "Post" : "Story"} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUpModal {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}
