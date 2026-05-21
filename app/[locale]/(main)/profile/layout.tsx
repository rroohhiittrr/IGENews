"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import {
  User, BookOpen, Award, Calendar, Shield, MessageSquare,
} from "lucide-react";

interface NavItem {
  icon: React.ElementType;
  label: string;
  slug: string;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { icon: User,          label: "Profile",   slug: "" },
  { icon: BookOpen,      label: "My News",   slug: "my-news",   badge: 3 },
  { icon: Award,         label: "Authority", slug: "authority" },
  { icon: Calendar,      label: "Events",    slug: "events",    badge: 2 },
  { icon: Shield,        label: "Settings",  slug: "settings"  },
  { icon: MessageSquare, label: "Messages",  slug: "messages",  badge: 1 },
];

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const locale = (params?.locale as string) || "en";

  useEffect(() => {
    if (!loading && !isLoggedIn) router.push(`/${locale}/login`);
  }, [isLoggedIn, loading, router, locale]);

  if (loading || !isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#f4f7fb] flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-[#1E3A5F] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex font-body">

      {/* ── Sidebar (Desktop) ── */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 sticky top-0 h-screen bg-[#1E3A5F] rounded-r-[40px] shadow-2xl overflow-hidden z-20">
        {/* Brand */}
        <div className="px-8 pt-10 pb-8">
          <span className="text-2xl font-black tracking-widest text-white uppercase">IGENews</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-4">
          {NAV_ITEMS.map((item) => {
            const href = `/${locale}/profile${item.slug ? `/${item.slug}` : ""}`;
            const isActive =
              item.slug === ""
                ? pathname === `/${locale}/profile`
                : pathname.startsWith(`/${locale}/profile/${item.slug}`);

            return (
              <Link
                key={item.label}
                href={href}
                className={`group flex items-center justify-between px-5 py-3.5 rounded-l-[28px] transition-all relative ${
                  isActive
                    ? "bg-[#f4f7fb] text-[#1E3A5F] font-bold shadow-lg ml-0 mr-[-16px]"
                    : "text-white/75 hover:text-white hover:bg-white/10 rounded-r-[28px]"
                }`}
              >
                {/* Active tab curved cutouts */}
                {isActive && (
                  <>
                    <div className="absolute -top-6 right-0 w-6 h-6 bg-transparent rounded-br-3xl shadow-[0_12px_0_0_#f4f7fb] pointer-events-none" />
                    <div className="absolute -bottom-6 right-0 w-6 h-6 bg-transparent rounded-tr-3xl shadow-[0_-12px_0_0_#f4f7fb] pointer-events-none" />
                  </>
                )}

                <div className="flex items-center gap-3.5 relative z-10">
                  <item.icon className="w-5 h-5 shrink-0" />
                  <span className="text-sm">{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center relative z-10 ${
                    isActive ? "bg-[#F4A024] text-white" : "bg-white/20 text-white"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom decorative shape */}
        <div className="h-40 relative overflow-hidden pointer-events-none">
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#F4A024]/20" />
          <div className="absolute -bottom-4 left-4 w-20 h-20 rounded-full bg-white/5" />
        </div>
      </aside>

      {/* ── Mobile Bottom Tab Bar ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#1E3A5F] flex md:hidden items-center justify-around px-2 py-2 shadow-2xl safe-area-pb">
        {NAV_ITEMS.map((item) => {
          const href = `/${locale}/profile${item.slug ? `/${item.slug}` : ""}`;
          const isActive =
            item.slug === ""
              ? pathname === `/${locale}/profile`
              : pathname.startsWith(`/${locale}/profile/${item.slug}`);

          return (
            <Link
              key={item.label}
              href={href}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all relative ${
                isActive ? "bg-white/15" : "text-white/60"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-[#F4A024]" : "text-white/70"}`} />
              <span className={`text-[9px] font-bold uppercase tracking-wide ${isActive ? "text-white" : "text-white/50"}`}>
                {item.label}
              </span>
              {item.badge && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#F4A024] text-white text-[9px] font-black rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Page Content ── */}
      <main className="flex-1 overflow-y-auto h-screen hide-scrollbar pb-24 md:pb-0">
        {children}
      </main>
    </div>
  );
}
