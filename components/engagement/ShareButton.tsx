"use client";

import { useRef, useEffect, useState } from "react";
import { Share2, Link2, MessageCircle, FileText, Code2, CheckCheck } from "lucide-react";
import { Article } from "@/types/types";
import SharePostModal from "@/components/engagement/SharePostModal";

interface ShareButtonProps {
  count?: number;
  compact?: boolean;
  articleUrl?: string;
  article?: Article; // optional — needed for "Share as Post" / story feature
}

export default function ShareButton({ count, compact = false, articleUrl, article }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const url = articleUrl ?? (typeof window !== "undefined" ? window.location.href : "https://iglobalnews.com");

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  const SHARE_OPTIONS = [
    {
      label: "Share to Instagram",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="url(#ig)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <defs>
            <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f09433" />
              <stop offset="25%" stopColor="#e6683c" />
              <stop offset="50%" stopColor="#dc2743" />
              <stop offset="75%" stopColor="#cc2366" />
              <stop offset="100%" stopColor="#bc1888" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="url(#ig)" stroke="none" />
        </svg>
      ),
      color: "hover:bg-pink-50",
      action: () => window.open("https://www.instagram.com/", "_blank"),
    },
    {
      label: "Share to LinkedIn",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-[#0077b5]" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      color: "hover:bg-blue-50",
      action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank"),
    },
    {
      label: "Copy Link",
      icon: <Link2 className="h-4 w-4 shrink-0 text-gray-500" />,
      color: "hover:bg-gray-50",
      action: () => navigator.clipboard.writeText(url),
      isCopy: true,
    },
    {
      label: "Send as Message",
      icon: <MessageCircle className="h-4 w-4 shrink-0 text-green-500" />,
      color: "hover:bg-green-50",
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(url)}`, "_blank"),
    },
    {
      label: "Share as Post",
      icon: <FileText className="h-4 w-4 shrink-0 text-orange-500" />,
      color: "hover:bg-orange-50",
      isPostShare: true,
      action: () => {
        if (article) {
          setOpen(false);
          setPostModalOpen(true);
        } else {
          window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`, "_blank");
        }
      },
    },
    {
      label: "Embed Code",
      icon: <Code2 className="h-4 w-4 shrink-0 text-purple-500" />,
      color: "hover:bg-purple-50",
      action: () => navigator.clipboard.writeText(`<iframe src="${url}" width="600" height="400" frameborder="0"></iframe>`),
      isCopy: true,
      copyLabel: "Code copied!",
    },
  ];

  type Opt = typeof SHARE_OPTIONS[0];
  const handleOption = (opt: Opt) => {
    opt.action();
    if (opt.isCopy) {
      const msg = (opt as any).copyLabel ?? "Link copied!";
      setCopied(msg);
      setTimeout(() => setCopied(null), 2000);
    }
    if (!opt.isCopy && !(opt as any).isPostShare) setOpen(false);
  };

  return (
    <>
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
            open
              ? "bg-[var(--color-primary)] text-white"
              : "text-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-light)]"
          }`}
        >
          <Share2 className="h-4 w-4" />
          {!compact && (
            <span>Viral{count !== undefined ? ` · ${count.toLocaleString()}` : ""}</span>
          )}
        </button>

        {open && (
          <div
            className="absolute right-0 bottom-full mb-2 z-50 w-56 rounded-2xl border border-[var(--color-neutral-light)] bg-white shadow-2xl overflow-hidden"
            style={{ animation: "slideUp 0.18s ease" }}
          >
            {/* Header */}
            <div className="px-4 py-2.5 border-b border-[var(--color-neutral-light)] bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">
              <p className="text-[11px] font-bold text-white tracking-wide uppercase">Share Story</p>
            </div>

            {/* Options */}
            <div className="py-1">
              {SHARE_OPTIONS.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleOption(opt)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-[var(--color-text-body)] transition-colors ${opt.color}`}
                >
                  {opt.icon}
                  <span className="flex-1 text-left">{opt.label}</span>
                  {(opt as any).isPostShare && article && (
                    <span className="rounded-full bg-orange-100 px-1.5 py-0.5 text-[9px] font-bold text-orange-600">NEW</span>
                  )}
                  {opt.isCopy && copied && ((opt as any).copyLabel ? copied === (opt as any).copyLabel : copied === "Link copied!") && (
                    <CheckCheck className="h-3.5 w-3.5 text-green-500 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(6px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>

      {/* Share Post Modal — rendered at root via portal-like pattern */}
      {postModalOpen && article && (
        <SharePostModal article={article} onClose={() => setPostModalOpen(false)} />
      )}
    </>
  );
}
