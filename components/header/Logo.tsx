import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-primary)] text-white font-bold text-sm">
        IGN
      </div>
      <div className="hidden sm:block">
        <h1
          className="text-base font-bold text-[var(--color-primary)] leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          India Global News
        </h1>
        <p className="text-[10px] text-[var(--color-neutral-dark)] leading-none -mt-0.5">
          by iGenWorld
        </p>
      </div>
    </Link>
  );
}
