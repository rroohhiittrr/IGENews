import Link from "next/link";
import { Linkedin, Twitter, Instagram, Youtube, Send } from "lucide-react";
import { useTranslations } from "next-intl";

const FOOTER_LINKS = {
  company: [
    { key: "aboutUs", href: "/about" },
    { key: "advertise", href: "/advertise" },
    { key: "contactUs", href: "/contact" },
    { key: "careers", href: "/careers" },
  ],
  quickLinks: [
    { key: "feed", href: "/", section: "nav" },
    { key: "headlines", href: "/headlines", section: "nav" },
    { key: "trending", href: "/trending", section: "nav" },
    { key: "categories", href: "/categories/sector", section: "nav" },
    { key: "subscriptionPlans", href: "/plans", section: "footer" },
  ],
  legal: [
    { key: "privacy", href: "/privacy" },
    { key: "terms", href: "/terms" },
    { key: "cookie", href: "/cookies" },
    { key: "sitemap", href: "/sitemap" },
  ],
  portals: [
    { label: "iGenWorld", href: "https://igenworld.com", external: true },
    { label: "India Global Expo", href: "https://indiaglobalexpo.com", external: true },
    { label: "India Global News", href: "https://indiaglobalnews.com", external: true },
  ],
};

const SOCIAL_LINKS = [
  { Icon: Linkedin, href: "https://linkedin.com/company/indiaglobalnews", label: "LinkedIn" },
  { Icon: Twitter, href: "https://twitter.com/indiaglobalnews", label: "Twitter / X" },
  { Icon: Instagram, href: "https://instagram.com/indiaglobalnews", label: "Instagram" },
  { Icon: Youtube, href: "https://youtube.com/@indiaglobalnews", label: "YouTube" },
];

const SECTORS_GRID = [
  "Technology", "Pharmaceuticals", "Textiles", "Automotive", "Agriculture",
  "Chemicals", "Defence", "Electronics", "Energy", "Food",
  "Gems & Jewellery", "Healthcare", "Infrastructure", "Iron & Steel", "Leather",
  "Marine", "Mining", "Plastics", "Renewable Energy", "IT Services",
];

export default function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-neutral-light)] bg-[var(--color-primary)]">
      {/* Sector Directory */}
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-neutral-mid)]">
          {t("footer.sectorDirectory")}
        </h4>
        <div className="flex flex-wrap gap-2">
          {SECTORS_GRID.map((s) => (
            <Link
              key={s}
              href={`/categories/sector/${s.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
              className="rounded-full border border-[var(--color-neutral-dark)]/30 px-2.5 py-1 text-[11px] font-medium text-[var(--color-neutral-mid)] transition-colors hover:border-[var(--color-accent-gold)] hover:text-[var(--color-accent-gold)]"
            >
              {s}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-5 lg:px-6">
          {/* Brand + Newsletter */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-accent-gold)] text-white font-bold text-xs">
                IGN
              </div>
              <div>
                <h3 className="text-sm font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                  India Global News
                </h3>
                <p className="text-[10px] text-[var(--color-neutral-mid)]">by iGenWorld</p>
              </div>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-[var(--color-neutral-mid)]">
              {t("footer.description")}
            </p>

            {/* Newsletter */}
            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-gold)]">
                {t("footer.subscribeTitle")}
              </p>
              <div className="flex rounded-lg overflow-hidden">
                <input
                  type="email"
                  placeholder={t("sidebar.emailPlaceholder")}
                  className="flex-1 border-0 bg-white/10 px-3 py-2.5 text-sm text-white placeholder-[var(--color-neutral-mid)] outline-none focus:bg-white/15"
                />
                <button className="flex items-center gap-1 bg-[var(--color-accent-gold)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-gold-dark)]">
                  <Send className="h-3.5 w-3.5" />
                  {t("common.subscribe")}
                </button>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-2">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-[var(--color-neutral-mid)] transition-all hover:bg-[var(--color-accent-gold)] hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-gold)]">
              {t("footer.company")}
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="text-sm text-[var(--color-neutral-mid)] transition-colors hover:text-white">
                    {t(`footer.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-gold)]">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="text-sm text-[var(--color-neutral-mid)] transition-colors hover:text-white">
                    {/* Handle section based translation */}
                    {link.section === "nav" ? t(`nav.${link.key}`) : t(`footer.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portals & Legal */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-gold)]">
              {t("footer.portals")}
            </h4>
            <ul className="space-y-2 mb-6">
              {FOOTER_LINKS.portals.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-neutral-mid)] transition-colors hover:text-white"
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-gold)]">
              {t("footer.legal")}
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="text-sm text-[var(--color-neutral-mid)] transition-colors hover:text-white">
                    {t(`footer.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-[var(--color-neutral-mid)] sm:flex-row lg:px-6">
          <p>{t("footer.rights", { year: currentYear })}</p>
          <p className="flex items-center gap-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent-green)]"></span>
            {t("footer.ssl")} · V0.1.0
          </p>
        </div>
      </div>
    </footer>
  );
}
