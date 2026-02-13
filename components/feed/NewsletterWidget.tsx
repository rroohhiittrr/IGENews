"use client";

import { Send } from "lucide-react";

export default function NewsletterWidget() {
  return (
    <div className="rounded-xl border border-[var(--color-neutral-light)] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] p-5 text-white shadow-[var(--shadow-card)]">
      <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-[var(--color-accent-gold)]">
        📧 IGN Weekly
      </h3>
      <p className="mb-3 text-xs text-white/70">
        Get the week&apos;s top B2B headlines delivered to your inbox every Monday.
      </p>
      <div className="flex rounded-lg overflow-hidden">
        <input
          type="email"
          placeholder="your@email.com"
          className="flex-1 border-0 bg-white/15 px-3 py-2 text-sm text-white placeholder-white/50 outline-none focus:bg-white/20"
        />
        <button className="flex items-center gap-1 bg-[var(--color-accent-gold)] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[var(--color-accent-gold-dark)]">
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
