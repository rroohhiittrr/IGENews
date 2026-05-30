"use client";

import { useState } from "react";
import EOILandingPage from "@/components/eoi-form/Rohit/EOILandingPage";
import SalesEOILandingPage from "@/components/eoi-form/Sales/SalesEOILandingPage";
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
  const [activeTab, setActiveTab] = useState<"rohit" | "sales">("rohit");

  return (
    <div className="min-h-screen w-full" style={{ fontFamily: "'Inter', sans-serif" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* Tab Switcher Bar */}
      <div
        className="sticky top-0 z-[100] w-full flex items-center justify-center gap-3 px-4 py-3"
        style={{
          background: "rgba(10, 36, 99, 0.97)",
          backdropFilter: "blur(12px)",
          borderBottom: "1.5px solid rgba(255,255,255,0.10)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
        }}
      >
        {/* Left label */}
        <span
          className="text-xs font-bold uppercase tracking-widest hidden sm:block"
          style={{ color: "rgba(255,255,255,0.50)" }}
        >
          EOI View:
        </span>

        {/* Rohit Button */}
        <button
          id="eoi-tab-rohit"
          onClick={() => setActiveTab("rohit")}
          className="flex items-center gap-2 font-bold transition-all duration-300"
          style={{
            background: activeTab === "rohit"
              ? "linear-gradient(135deg, #E63946, #C1121F)"
              : "rgba(255,255,255,0.08)",
            color: activeTab === "rohit" ? "#fff" : "rgba(255,255,255,0.65)",
            border: activeTab === "rohit" ? "none" : "1.5px solid rgba(255,255,255,0.15)",
            borderRadius: 50,
            padding: "10px 28px",
            fontSize: 15,
            cursor: "pointer",
            boxShadow: activeTab === "rohit" ? "0 4px 20px rgba(230,57,70,0.45)" : "none",
            transform: activeTab === "rohit" ? "scale(1.04)" : "scale(1)",
          }}
        >
          {activeTab === "rohit" && <span>●</span>}
          Rohit
        </button>

        {/* Divider */}
        <div className="w-px h-5" style={{ background: "rgba(255,255,255,0.15)" }} />

        {/* Sales Button */}
        <button
          id="eoi-tab-sales"
          onClick={() => setActiveTab("sales")}
          className="flex items-center gap-2 font-bold transition-all duration-300"
          style={{
            background: activeTab === "sales"
              ? "linear-gradient(135deg, #F4A261, #E76F51)"
              : "rgba(255,255,255,0.08)",
            color: activeTab === "sales" ? "#fff" : "rgba(255,255,255,0.65)",
            border: activeTab === "sales" ? "none" : "1.5px solid rgba(255,255,255,0.15)",
            borderRadius: 50,
            padding: "10px 28px",
            fontSize: 15,
            cursor: "pointer",
            boxShadow: activeTab === "sales" ? "0 4px 20px rgba(244,162,97,0.45)" : "none",
            transform: activeTab === "sales" ? "scale(1.04)" : "scale(1)",
          }}
        >
          {activeTab === "sales" && <span>●</span>}
          Sales
        </button>

        {/* Tab indicator label */}
        <span
          className="text-xs hidden sm:block"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          {activeTab === "rohit" ? "— Current Form" : "— Discovery Platform"}
        </span>
      </div>

      {/* Tab Content */}
      <div style={{ marginTop: 0 }}>
        {activeTab === "rohit" ? (
          <div key="rohit-tab">
            <EOILandingPage
              preselectedProduct={preselectedProduct}
              prefillCity={prefillCity}
              prefillSector={prefillSector}
              trafficSource={trafficSource}
              teamMember={teamMember}
            />
          </div>
        ) : (
          <div key="sales-tab">
            <SalesEOILandingPage />
          </div>
        )}
      </div>
    </div>
  );
}
