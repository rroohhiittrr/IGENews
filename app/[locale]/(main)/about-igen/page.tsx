"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AboutIGENMegaMenuNav from "@/components/about-igen/AboutIGENMegaMenuNav";

export default function AboutIGENPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("about-igen/feed");
  }, [router]);

  // Show the nav bar while redirecting
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AboutIGENMegaMenuNav />
      <div className="flex items-center justify-center py-40">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--color-primary)] border-t-transparent" />
          <p className="text-sm font-medium text-[var(--color-neutral-dark)]">
            Loading Feed…
          </p>
        </div>
      </div>
    </div>
  );
}
