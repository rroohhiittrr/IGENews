"use client";

import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NewsletterWidget() {
  const t = useTranslations("sidebar");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="rounded-xl border border-[var(--color-neutral-light)] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] p-4 text-white shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <Mail className="h-4 w-4 text-white/80" />
        <h3 className="text-xs font-bold uppercase tracking-wider">
          {t("ignWeekly")}
        </h3>
      </div>

      {subscribed ? (
        <div className="flex items-center gap-2 py-2">
          <CheckCircle className="h-5 w-5 text-[var(--color-accent-green)]" />
          <p className="text-xs text-white/80">{t("subscribeSuccess")}</p>
        </div>
      ) : (
        <>
          <p className="text-[11px] text-white/60 mb-3">
            {t("newsletterDesc")}
          </p>
          <div className="flex gap-1.5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
              className="flex-1 rounded-lg bg-white/10 border border-white/20 px-2.5 py-1.5 text-xs text-white placeholder-white/40 outline-none focus:border-white/40 focus:bg-white/15"
            />
            <button
              onClick={handleSubscribe}
              className="rounded-lg bg-[var(--color-accent-gold)] px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-[var(--color-accent-gold-dark)] hover:shadow-md"
            >
              {t("join")}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
