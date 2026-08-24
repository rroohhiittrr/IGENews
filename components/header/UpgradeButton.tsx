import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function UpgradeButton() {
  return (
    <Link
      href="/plans"
      className="hidden items-center gap-1 rounded-full bg-[var(--color-accent-gold)] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[var(--color-accent-gold-dark)] hover:shadow-md sm:flex"
    >
      <Sparkles className="h-3.5 w-3.5" />
      Upgrade
    </Link>
  );
}
