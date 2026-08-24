import Link from "next/link";

interface TagChipProps {
  label: string;
  href?: string;
  color?: "default" | "sector" | "country" | "leader" | "trending" | "related" | "exclusive";
}

const COLOR_MAP = {
  default: "bg-[var(--color-neutral-light)] text-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-mid)]/30",
  sector: "bg-blue-50 text-blue-700 hover:bg-blue-100",
  country: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
  leader: "bg-purple-50 text-purple-700 hover:bg-purple-100",
  trending: "bg-orange-50 text-orange-600 hover:bg-orange-100",
  related: "bg-amber-50 text-amber-700 hover:bg-amber-100",
  exclusive: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]",
};

export default function TagChip({ label, href, color = "default" }: TagChipProps) {
  const classes = `inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors cursor-pointer ${COLOR_MAP[color]}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    );
  }

  return <span className={classes}>{label}</span>;
}
