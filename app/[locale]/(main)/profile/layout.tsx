"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import {
  User, BookOpen, Shield, Zap, Microscope, Star, Building2, Crown,
} from "lucide-react";

interface NavItem {
  icon: React.ElementType;
  label: string;
  slug: string;
  badge?: number;
}

const CORE_NAV_ITEMS: NavItem[] = [
  { icon: User,          label: "Profile",   slug: "" },
  { icon: BookOpen,      label: "My News",   slug: "my-news",   badge: 3 },
  { icon: Shield,        label: "Settings",  slug: "settings"  },
];

const PLAN_NAV_ITEMS: NavItem[] = [
  { icon: Zap,           label: "Upgrade",                      slug: "plans/reader" },
  { icon: Microscope,    label: "Subject Matter Expert - SME",  slug: "plans/sme" },
  { icon: Star,          label: "Associate SME",                slug: "plans/associate-sme" },
  { icon: Building2,     label: "Company",                      slug: "plans/company" },
  { icon: Crown,         label: "Leader",                       slug: "plans/leader" },
];

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, loading, user } = useAuth();
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
        <div className="h-12 w-12 border-4 border-[#1D1D46] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const getPlanBadge = (slug: string) => {
    if (!user) return null;
    
    const mapping: Record<string, string> = {
      "plans/sme": "sme",
      "plans/associate-sme": "associate-sme",
      "plans/company": "company",
      "plans/leader": "leader"
    };
    
    const roleKey = mapping[slug];
    if (!roleKey) return null;

    const isActiveRole = user.onboardingRole === roleKey;
    const status = user.onboardingStatus;

    if (isActiveRole) {
      if (status === "Approved") {
        return (
          <span className="text-[9px] font-black bg-emerald-500 text-white px-2 py-0.5 rounded-md uppercase tracking-wider relative z-10">
            Active
          </span>
        );
      } else if (status === "Submitted" || status === "Under Review") {
        return (
          <span className="text-[9px] font-black bg-[#F0652E] text-white px-2 py-0.5 rounded-md uppercase tracking-wider animate-pulse relative z-10">
            Review
          </span>
        );
      } else if (status === "Need More Information") {
        return (
          <span className="text-[9px] font-black bg-orange-500 text-white px-2 py-0.5 rounded-md uppercase tracking-wider relative z-10">
            Action
          </span>
        );
      } else if (status === "Rejected") {
        return (
          <span className="text-[9px] font-black bg-red-500 text-white px-2 py-0.5 rounded-md uppercase tracking-wider relative z-10">
            Declined
          </span>
        );
      } else if (status === "Draft") {
        return (
          <span className="text-[9px] font-black bg-gray-500 text-white px-2 py-0.5 rounded-md uppercase tracking-wider relative z-10">
            Draft
          </span>
        );
      }
    }

    return null;
  };

  const renderLink = (item: NavItem) => {
    const href = `/${locale}/profile${item.slug ? `/${item.slug}` : ""}`;
    const isActive =
      item.slug === ""
        ? pathname === `/${locale}/profile`
        : pathname.startsWith(`/${locale}/profile/${item.slug}`);
    
    const planBadge = getPlanBadge(item.slug);

    return (
      <Link
        key={item.label}
        href={href}
        className={`group flex items-center justify-between px-5 py-3 rounded-l-[28px] transition-all relative ${
          isActive
            ? "bg-[#f4f7fb] text-[#1D1D46] font-bold shadow-lg ml-0 mr-[-16px]"
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

        <div className="flex items-center gap-3 relative z-10">
          <item.icon className="w-5 h-5 shrink-0" />
          <span className="text-sm leading-snug">{item.label}</span>
        </div>

        {item.badge ? (
          <span className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center relative z-10 ${
            isActive ? "bg-[#F0652E] text-white" : "bg-white/20 text-white"
          }`}>
            {item.badge}
          </span>
        ) : planBadge ? (
          planBadge
        ) : null}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex font-body">

      {/* ── Sidebar (Desktop) ── */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 sticky top-0 h-screen bg-[#1D1D46] rounded-r-[40px] shadow-2xl overflow-hidden z-20">
        {/* Brand */}
        <div className="px-8 pt-10 pb-6">
          <span className="text-2xl font-black tracking-widest text-white uppercase">IGENews</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-4 overflow-y-auto hide-scrollbar pb-6">
          <div className="space-y-1">
            {CORE_NAV_ITEMS.map(renderLink)}
          </div>
          
          <div className="pt-6 pb-2 px-5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block">MEMBERSHIPS & PLANS</span>
          </div>

          <div className="space-y-1">
            {PLAN_NAV_ITEMS.map(renderLink)}
          </div>
        </nav>

        {/* Bottom decorative shape */}
        <div className="h-20 relative overflow-hidden pointer-events-none shrink-0">
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#F0652E]/20" />
          <div className="absolute -bottom-4 left-4 w-20 h-20 rounded-full bg-white/5" />
        </div>
      </aside>

      {/* ── Mobile Bottom Tab Bar ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#1D1D46] flex md:hidden items-center justify-around px-2 py-2 shadow-2xl safe-area-pb">
        {CORE_NAV_ITEMS.map((item) => {
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
              <item.icon className={`w-5 h-5 ${isActive ? "text-[#F0652E]" : "text-white/70"}`} />
              <span className={`text-[9px] font-bold uppercase tracking-wide ${isActive ? "text-white" : "text-white/50"}`}>
                {item.label}
              </span>
              {item.badge && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#F0652E] text-white text-[9px] font-black rounded-full flex items-center justify-center">
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
