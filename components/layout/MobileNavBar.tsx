"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Megaphone, Flame, Bookmark, User } from "lucide-react";

const TABS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Headlines", href: "/headlines", icon: Megaphone },
  { label: "Trending", href: "/trending", icon: Flame },
  { label: "My News", href: "/mynews", icon: Bookmark },
  { label: "Profile", href: "/profile", icon: User },
];

export default function MobileNavBar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--color-neutral-light)] bg-white md:hidden">
      <div className="flex items-center justify-around">
        {TABS.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className={`flex flex-col items-center gap-0.5 px-3 py-2 text-[10px] font-medium transition-colors ${
              isActive(href)
                ? "text-[var(--color-secondary)]"
                : "text-[var(--color-neutral-dark)]"
            }`}
          >
            <Icon
              className={`h-5 w-5 ${
                isActive(href) ? "fill-[var(--color-secondary)]/20" : ""
              }`}
            />
            {label}
          </Link>
        ))}
      </div>

      {/* Safe area spacer for iPhone */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
