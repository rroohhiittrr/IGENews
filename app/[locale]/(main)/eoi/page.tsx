"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import EOITabSwitcher from "@/components/eoi-form/EOITabSwitcher";
import { ProductId, PRODUCT_INFO } from "@/components/eoi-form/Rohit/data/productData";

function EOIPageContent() {
  const searchParams = useSearchParams();

  // URL param: ?product=sme_page — pre-selects product
  const productParam = searchParams.get("product") as ProductId | null;
  const preselectedProduct =
    productParam && PRODUCT_INFO[productParam] ? productParam : "";

  // URL param: ?city=Mumbai — pre-fills city field
  const prefillCity = searchParams.get("city") || "";

  // URL param: ?sector=IT — pre-selects sector in step 2
  const prefillSector = searchParams.get("sector") || "";

  // URL param: ?source=whatsapp_campaign — saved to submission JSON
  const trafficSource = searchParams.get("source") || "";

  // URL param: ?team=meghna — saved to submission JSON
  const teamMember = searchParams.get("team") || "";

  return (
    <EOITabSwitcher
      preselectedProduct={preselectedProduct}
      prefillCity={prefillCity}
      prefillSector={prefillSector}
      trafficSource={trafficSource}
      teamMember={teamMember}
    />
  );
}

export default function EOIPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center" style={{ background: "#0A2463" }}>
        <div className="text-center text-white">
          <div className="text-4xl mb-4 animate-bounce">🌐</div>
          <p className="text-lg font-semibold">Loading IGEN EOI…</p>
        </div>
      </div>
    }>
      <EOIPageContent />
    </Suspense>
  );
}
