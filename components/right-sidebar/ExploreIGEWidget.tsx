import Link from "next/link";
import { ExternalLink, BarChart3, Globe, Users } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ExploreIGEWidget() {
  const t = useTranslations("sidebar");

  return (
    <div className="rounded-xl border border-[var(--color-accent-green)]/30 bg-gradient-to-br from-[var(--color-accent-green)]/5 to-white p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <BarChart3 className="h-4 w-4 text-[var(--color-accent-green)]" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-green)]">
          {t("aboutIGE")}
        </h3>
      </div>

      <p className="text-xs text-[var(--color-neutral-dark)] mb-3 leading-relaxed">
        {t("igeDescription")}
      </p>

      <div className="flex items-center gap-3 text-[10px] text-[var(--color-neutral-dark)] mb-3">
        <span className="flex items-center gap-1">
          <Globe className="h-3 w-3" /> 50+ {t("countries", {count: 50})} 
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-3 w-3" /> 10K+ {t("companies", {count: 10})} 
        </span>
      </div>

      <Link
        href="https://indiaglobalexpo.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 rounded-lg bg-[var(--color-accent-green)] py-2 text-xs font-semibold text-white transition-all hover:bg-[var(--color-accent-green)]/90 hover:shadow-md"
      >
        {t("visitIGE")}
        <ExternalLink className="h-3 w-3" />
      </Link>
    </div>
  );
}
