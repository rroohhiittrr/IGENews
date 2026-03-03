"use client";

import { Article } from "@/types/types";
import AIArticleAssistant from "@/components/article/AIArticleAssistant";

interface ArticleBodyProps {
  article: Article;
}

/**
 * Splits an HTML string at h2 tag boundaries.
 * Returns [firstHalf, secondHalf].
 * If only one or two sections, puts everything in firstHalf.
 */
function splitAtMidH2(html: string): [string, string] {
  // Split before each <h2 to get sections
  const sections = html.split(/(?=<h2[\s>])/i);
  if (sections.length <= 2) {
    // 0 or 1 sections — put everything up front
    return [html, ""];
  }
  const midIdx = Math.ceil(sections.length / 2);
  return [
    sections.slice(0, midIdx).join(""),
    sections.slice(midIdx).join(""),
  ];
}

export default function ArticleBody({ article }: ArticleBodyProps) {
  const bodyHtml = article.body || `<p>${article.summary}</p>`;
  const [firstHalf, secondHalf] = splitAtMidH2(bodyHtml);

  return (
    <>
      {/* ── First half ────────────────────────────────────────────────────── */}
      <div
        className="article-inline-body"
        dangerouslySetInnerHTML={{ __html: firstHalf }}
      />

      {/* ── AI Assistant (mid-article) ─────────────────────────────────────── */}
      <AIArticleAssistant article={article} />

      {/* ── Second half (if split happened) ──────────────────────────────── */}
      {secondHalf && (
        <div
          className="article-inline-body"
          dangerouslySetInnerHTML={{ __html: secondHalf }}
        />
      )}

      {/* ── Article body styles (globally injected once) ──────────────────── */}
      <style jsx global>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Section headings ──────────────────────────────────────────────── */
        .article-inline-body h1 {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--color-primary);
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          font-family: var(--font-display);
          line-height: 1.3;
        }
        .article-inline-body h2 {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--color-primary);
          margin-top: 1.75rem;
          margin-bottom: 0.6rem;
          font-family: var(--font-display);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          line-height: 1.35;
        }
        .article-inline-body h2::before {
          content: '';
          display: inline-block;
          width: 4px;
          min-width: 4px;
          height: 1.1em;
          background: linear-gradient(to bottom, var(--color-primary), var(--color-secondary, #6366f1));
          border-radius: 2px;
        }
        .article-inline-body h3 {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--color-text-body);
          margin-top: 1.25rem;
          margin-bottom: 0.4rem;
          letter-spacing: -0.01em;
        }

        /* ── Paragraphs ────────────────────────────────────────────────────── */
        .article-inline-body p {
          color: var(--color-text-body);
          font-size: 0.925rem;
          line-height: 1.85;
          margin-bottom: 1rem;
        }

        /* ── Bold highlights ───────────────────────────────────────────────── */
        .article-inline-body strong {
          font-weight: 700;
          color: var(--color-primary);
          background: linear-gradient(120deg, rgba(var(--color-primary-rgb, 14,100,163), 0.08) 0%, rgba(var(--color-primary-rgb, 14,100,163), 0) 100%);
          padding: 0 2px;
          border-radius: 2px;
        }

        /* ── Blockquote ────────────────────────────────────────────────────── */
        .article-inline-body blockquote {
          position: relative;
          border: none;
          border-left: 3px solid var(--color-primary);
          background: linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(139,92,246,0.04) 100%);
          margin: 1.5rem 0;
          padding: 1rem 1.25rem 1rem 1.5rem;
          border-radius: 0 0.75rem 0.75rem 0;
          font-size: 0.9rem;
          font-style: italic;
          color: var(--color-text-body);
          line-height: 1.75;
        }
        .article-inline-body blockquote::before {
          content: '"';
          position: absolute;
          top: -0.25rem;
          left: 0.75rem;
          font-size: 2.5rem;
          line-height: 1;
          color: var(--color-primary);
          opacity: 0.25;
          font-style: normal;
          font-family: Georgia, serif;
        }

        /* ── Lists ─────────────────────────────────────────────────────────── */
        .article-inline-body ul {
          margin-bottom: 1rem;
          padding-left: 0;
          list-style: none;
        }
        .article-inline-body ul li {
          position: relative;
          padding-left: 1.25rem;
          font-size: 0.9rem;
          color: var(--color-text-body);
          line-height: 1.75;
          margin-bottom: 0.3rem;
        }
        .article-inline-body ul li::before {
          content: '';
          position: absolute;
          left: 0.25rem;
          top: 0.625rem;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--color-primary);
        }
        .article-inline-body ol {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }
        .article-inline-body ol li {
          font-size: 0.9rem;
          color: var(--color-text-body);
          line-height: 1.75;
          margin-bottom: 0.3rem;
        }
        .article-inline-body ol li::marker {
          color: var(--color-primary);
          font-weight: 700;
        }

        /* ── Inline code / stat callouts ───────────────────────────────────── */
        .article-inline-body code {
          font-family: monospace;
          font-size: 0.82rem;
          background: rgba(99,102,241,0.08);
          color: var(--color-primary);
          padding: 0.1rem 0.35rem;
          border-radius: 4px;
          font-style: normal;
        }

        /* ── Horizontal rule ───────────────────────────────────────────────── */
        .article-inline-body hr {
          border: none;
          height: 1.5px;
          background: linear-gradient(to right, var(--color-primary), transparent);
          margin: 1.5rem 0;
          opacity: 0.2;
        }
      `}</style>
    </>
  );
}
