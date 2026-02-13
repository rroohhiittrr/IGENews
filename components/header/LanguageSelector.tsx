import { Globe, ChevronDown } from "lucide-react";

export default function LanguageSelector() {
  return (
    <button className="hidden items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-medium text-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-light)] sm:flex">
      <Globe className="h-3.5 w-3.5" />
      <span>EN</span>
      <ChevronDown className="h-3 w-3" />
    </button>
  );
}
