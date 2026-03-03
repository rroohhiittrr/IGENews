import type { Metadata } from "next";
import "../globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';

export const metadata: Metadata = {
  title: "IGENews — India Global Expo News | B2B Trade Intelligence",
  description:
    "IGENews delivers curated sector, country and leader news for international trade professionals.",
  keywords: [
    "India trade news",
    "B2B trade intelligence",
    "export import news",
    "sector analysis",
    "bilateral trade",
  ],
  icons: {
    icon: "/images/favicon_IGENews.svg",
    apple: "/images/favicon_IGENews.svg",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await params (Next.js 16 requirement)
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Get messages for the locale
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className="bg-[var(--background)] text-[var(--color-text-body)] antialiased"
        style={{ fontFamily: "var(--font-body)" }}
      >
        <ThemeProvider>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <NotificationProvider>
              <AuthProvider>{children}</AuthProvider>
            </NotificationProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
