"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Locale } from "@/i18n";

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "hi", label: "हिंदी", flag: "🇮🇳" },
  { code: "ta", label: "தமிழ்", flag: "🇮🇳" },
  { code: "kn", label: "ಕನ್ನಡ", flag: "🇮🇳" },
];

export default function LanguageSelector() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (newLocale: Locale) => {
    setIsOpen(false);
    
    // Save preference to cookie via document.cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    
    // Navigate to the new locale
    startTransition(() => {
      // Remove current locale from pathname and add new one
      const pathWithoutLocale = pathname.replace(/^\/(en|hi|ta|kn)/, '');
      router.replace(`/${newLocale}${pathWithoutLocale || '/'}`);
    });
  };

  return (
    <div className="relative hidden sm:block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium text-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-light)] transition-all disabled:opacity-50"
      >
        <Globe className="h-3.5 w-3.5" />
        <span className="flex items-center gap-1">
          <span>{currentLang.flag}</span>
          <span>{currentLang.code.toUpperCase()}</span>
        </span>
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 min-w-[180px] rounded-lg bg-white dark:bg-[var(--color-neutral-white)] shadow-lg border border-[var(--color-neutral-mid)]/20 py-1 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              disabled={isPending}
              className="flex w-full items-center justify-between px-3 py-2 text-sm text-[var(--color-text-body)] hover:bg-[var(--color-neutral-light)] transition-colors disabled:opacity-50"
            >
              <span className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </span>
              {locale === lang.code && (
                <Check className="h-4 w-4 text-[var(--color-primary)]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
