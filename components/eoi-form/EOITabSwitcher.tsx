"use client";

import EOILandingPage from "@/components/eoi-form/Rohit/EOILandingPage";
import { ProductId } from "@/components/eoi-form/Rohit/data/productData";

interface EOITabSwitcherProps {
  preselectedProduct?: ProductId | "";
  prefillCity?: string;
  prefillSector?: string;
  trafficSource?: string;
  teamMember?: string;
}

export default function EOITabSwitcher({
  preselectedProduct = "",
  prefillCity = "",
  prefillSector = "",
  trafficSource = "",
  teamMember = "",
}: EOITabSwitcherProps) {
  return (
    <EOILandingPage
      preselectedProduct={preselectedProduct}
      prefillCity={prefillCity}
      prefillSector={prefillSector}
      trafficSource={trafficSource}
      teamMember={teamMember}
    />
  );
}
