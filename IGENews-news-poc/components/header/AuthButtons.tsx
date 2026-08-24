"use client";

import Link from "next/link";
import { LogIn, UserPlus } from "lucide-react";

export default function AuthButtons() {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/login"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--color-primary)] hover:bg-[var(--color-neutral-light)] transition-colors"
      >
        <LogIn className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Log In</span>
      </Link>
      <Link
        href="/signup"
        className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--color-primary)] text-white text-xs font-semibold shadow-sm hover:bg-[var(--color-primary-dark)] transition-all hover:shadow-md"
      >
        <UserPlus className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Sign Up</span>
      </Link>
    </div>
  );
}
