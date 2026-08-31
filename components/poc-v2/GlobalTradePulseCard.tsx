"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  TrendingUp,
  TrendingDown,
  Globe,
  ChevronRight,
  ChevronLeft,
  Pause,
  Play,
  ArrowUpRight,
  Sparkles,
  Layers,
  ArrowRight
} from "lucide-react";

export interface IntelligenceMetric {
  id: string;
  label: string;
  value: string;
  trend: string;
  isPositive: boolean;
  period: string;
  note: string;
}

export interface BilateralCorridorData {
  id: string;
  corridorName: string;
  countryA: string;
  flagA: string;
  countryB: string;
  flagB: string;
  agreement: string;
  metrics: IntelligenceMetric[];
}

export const BILATERAL_CORRIDORS_INTEL: Record<string, BilateralCorridorData> = {
  global: {
    id: "global",
    corridorName: "Global Trade Pulse",
    countryA: "Global",
    flagA: "🌐",
    countryB: "All Markets",
    flagB: "🌍",
    agreement: "Multilateral Trade & Corridors",
    metrics: [
      {
        id: "volume",
        label: "Global Trade Volume",
        value: "$42.8B",
        trend: "▲ 18.3% QoQ",
        isPositive: true,
        period: "Q1 2026 · Global trade",
        note: "Bilateral export clearance speeds across major corridors show a strong bullish outlook entering Q1 2026."
      },
      {
        id: "export",
        label: "Global Export Growth",
        value: "+12.6%",
        trend: "▲ 4.2% MoM",
        isPositive: true,
        period: "Q1 2026 · Outbound shipments",
        note: "Electronics, generic pharmaceuticals, and capital machinery expand global export velocity."
      },
      {
        id: "import",
        label: "Global Import Growth",
        value: "+8.9%",
        trend: "▼ 1.3% MoM",
        isPositive: false,
        period: "Q1 2026 · Inbound freight",
        note: "Domestic intermediate substitution in key industrial hubs moderates foreign component reliance."
      },
      {
        id: "balance",
        label: "Global Trade Balance",
        value: "+$6.4B",
        trend: "▲ 7.8% YoY",
        isPositive: true,
        period: "Q1 2026 · Net position",
        note: "Services trade surplus and non-oil commercial resilience anchor positive current account balances."
      },
      {
        id: "corridors",
        label: "Active Trade Corridors",
        value: "128",
        trend: "▲ 14 new corridors",
        isPositive: true,
        period: "Q1 2026 · Connected routes",
        note: "Fast-track green customs lanes, digital single-windows, and new container berths now operational."
      }
    ]
  },
  "india-eu": {
    id: "india-eu",
    corridorName: "India–EU Trade Pulse",
    countryA: "India",
    flagA: "🇮🇳",
    countryB: "European Union",
    flagB: "🇪🇺",
    agreement: "Broad-Based Trade & Investment Accord",
    metrics: [
      {
        id: "volume",
        label: "India–EU Trade Volume",
        value: "$42.8B",
        trend: "▲ 18.3% QoQ",
        isPositive: true,
        period: "Q1 2026 · Bilateral trade",
        note: "Bilateral export clearance speeds across major corridors show a strong bullish outlook entering Q1 2026."
      },
      {
        id: "export",
        label: "India–EU Export Growth",
        value: "+16.4%",
        trend: "▲ 5.1% MoM",
        isPositive: true,
        period: "Q1 2026 · Outbound to EU",
        note: "Clean energy equipment, sustainable textiles, and APIs lead European container arrivals."
      },
      {
        id: "import",
        label: "India–EU Import Growth",
        value: "+11.2%",
        trend: "▲ 2.4% MoM",
        isPositive: true,
        period: "Q1 2026 · Inbound from EU",
        note: "High-precision tooling, automotive components, and chemical feedstocks remain steady."
      },
      {
        id: "balance",
        label: "India–EU Trade Balance",
        value: "+$8.2B",
        trend: "▲ 12.5% YoY",
        isPositive: true,
        period: "Q1 2026 · Merchandise & Services",
        note: "Specialized engineering and IT services maintain structural surplus against EU markets."
      },
      {
        id: "corridors",
        label: "Active India–EU Corridors",
        value: "34",
        trend: "▲ 6 new corridors",
        isPositive: true,
        period: "Q1 2026 · Maritime & Air Lanes",
        note: "Dedicated Rotterdam, Hamburg, and Antwerp green customs lanes achieve 18-hour clearance."
      }
    ]
  },
  "india-usa": {
    id: "india-usa",
    corridorName: "India–USA Trade Pulse",
    countryA: "India",
    flagA: "🇮🇳",
    countryB: "United States",
    flagB: "🇺🇸",
    agreement: "Critical & Emerging Tech (iCET)",
    metrics: [
      {
        id: "volume",
        label: "India–USA Trade Volume",
        value: "$191.8B",
        trend: "▲ 14.2% QoQ",
        isPositive: true,
        period: "Q1 2026 · Bilateral trade",
        note: "Defense aerospace assemblies, AI data servers, and critical tech partnerships power record commerce."
      },
      {
        id: "export",
        label: "India–USA Export Growth",
        value: "+18.9%",
        trend: "▲ 6.3% MoM",
        isPositive: true,
        period: "Q1 2026 · Outbound to US",
        note: "OSAT packaging substrates, generic therapeutics, and digital infrastructure lead shipments."
      },
      {
        id: "import",
        label: "India–USA Import Growth",
        value: "+9.4%",
        trend: "▲ 1.8% MoM",
        isPositive: true,
        period: "Q1 2026 · Inbound from US",
        note: "Commercial aircraft turbines, semiconductor machinery, and LNG energy deliveries."
      },
      {
        id: "balance",
        label: "India–USA Trade Balance",
        value: "+$38.5B",
        trend: "▲ 15.2% YoY",
        isPositive: true,
        period: "Q1 2026 · Net position",
        note: "India maintains historic trade surplus powered by software exports and precision manufacturing."
      },
      {
        id: "corridors",
        label: "Active India–USA Corridors",
        value: "48",
        trend: "▲ 8 new corridors",
        isPositive: true,
        period: "Q1 2026 · Direct routes",
        note: "Direct West Coast semiconductor express shipping and East Coast air cargo expansion."
      }
    ]
  },
  "india-uae": {
    id: "india-uae",
    corridorName: "India–UAE Trade Pulse",
    countryA: "India",
    flagA: "🇮🇳",
    countryB: "United Arab Emirates",
    flagB: "🇦🇪",
    agreement: "CEPA Comprehensive Economic Partnership",
    metrics: [
      {
        id: "volume",
        label: "India–UAE Trade Volume",
        value: "$87.2B",
        trend: "▲ 21.5% QoQ",
        isPositive: true,
        period: "Q1 2026 · Bilateral trade",
        note: "CEPA zero-duty tariff phase-outs accelerate bilateral non-oil commerce toward $100B milestone."
      },
      {
        id: "export",
        label: "India–UAE Export Growth",
        value: "+24.1%",
        trend: "▲ 7.8% MoM",
        isPositive: true,
        period: "Q1 2026 · Outbound to UAE",
        note: "Precious gems, agricultural produce, and electrical hardware hit all-time monthly high."
      },
      {
        id: "import",
        label: "India–UAE Import Growth",
        value: "+19.3%",
        trend: "▲ 4.2% MoM",
        isPositive: true,
        period: "Q1 2026 · Inbound from UAE",
        note: "Refined petrochemicals, bullion, and sovereign digital logistics hardware imports."
      },
      {
        id: "balance",
        label: "India–UAE Trade Balance",
        value: "-$24.0B",
        trend: "▼ 3.1% YoY",
        isPositive: true,
        period: "Q1 2026 · Balanced trade",
        note: "Energy import moderation and surging services export reduce historical merchandise deficit."
      },
      {
        id: "corridors",
        label: "Active India–UAE Corridors",
        value: "26",
        trend: "▲ 4 new corridors",
        isPositive: true,
        period: "Q1 2026 · Maritime routes",
        note: "Jebel Ali - Nhava Sheva digital single-window cut customs clearance times by 40%."
      }
    ]
  },
  "india-germany": {
    id: "india-germany",
    corridorName: "India–Germany Trade Pulse",
    countryA: "India",
    flagA: "🇮🇳",
    countryB: "Germany",
    flagB: "🇩🇪",
    agreement: "Green Hydrogen & Industry 4.0 Corridor",
    metrics: [
      {
        id: "volume",
        label: "India–Germany Trade Volume",
        value: "$30.8B",
        trend: "▲ 12.7% QoQ",
        isPositive: true,
        period: "Q1 2026 · Bilateral trade",
        note: "Green hydrogen pipeline infrastructure and precision manufacturing joint ventures expand."
      },
      {
        id: "export",
        label: "India–Germany Export Growth",
        value: "+14.8%",
        trend: "▲ 3.9% MoM",
        isPositive: true,
        period: "Q1 2026 · Outbound to Germany",
        note: "Specialty chemicals, automotive electrical harnesses, and textiles expand market share."
      },
      {
        id: "import",
        label: "India–Germany Import Growth",
        value: "+10.6%",
        trend: "▲ 2.1% MoM",
        isPositive: true,
        period: "Q1 2026 · Inbound from Germany",
        note: "Heavy industrial robotics, optical instruments, and renewable grid substations."
      },
      {
        id: "balance",
        label: "India–Germany Trade Balance",
        value: "-$10.4B",
        trend: "▲ 4.5% YoY",
        isPositive: true,
        period: "Q1 2026 · Net position",
        note: "High-value German engineering capital goods imports balance expanding Indian tech exports."
      },
      {
        id: "corridors",
        label: "Active India–Germany Corridors",
        value: "18",
        trend: "▲ 3 new corridors",
        isPositive: true,
        period: "Q1 2026 · Freight lanes",
        note: "Direct maritime clean fuels transit and air freight cargo lines operating at full capacity."
      }
    ]
  },
  "india-uk": {
    id: "india-uk",
    corridorName: "India–UK Trade Pulse",
    countryA: "India",
    flagA: "🇮🇳",
    countryB: "United Kingdom",
    flagB: "🇬🇧",
    agreement: "Enhanced Trade Partnership (ETP)",
    metrics: [
      {
        id: "volume",
        label: "India–UK Trade Volume",
        value: "$24.2B",
        trend: "▲ 11.4% QoQ",
        isPositive: true,
        period: "Q1 2026 · Bilateral trade",
        note: "Financial tech interoperability and automotive export tariff reductions lift bilateral velocity."
      },
      {
        id: "export",
        label: "India–UK Export Growth",
        value: "+13.2%",
        trend: "▲ 3.4% MoM",
        isPositive: true,
        period: "Q1 2026 · Outbound to UK",
        note: "IT consulting, apparel, footwear, and generic healthcare formulations lead cargo."
      },
      {
        id: "import",
        label: "India–UK Import Growth",
        value: "+8.1%",
        trend: "▼ 0.9% MoM",
        isPositive: false,
        period: "Q1 2026 · Inbound from UK",
        note: "Advanced aerospace parts, specialized spirits, and scientific measurement devices."
      },
      {
        id: "balance",
        label: "India–UK Trade Balance",
        value: "+$4.6B",
        trend: "▲ 8.9% YoY",
        isPositive: true,
        period: "Q1 2026 · Net position",
        note: "India maintains surplus position backed by strong professional and software services."
      },
      {
        id: "corridors",
        label: "Active India–UK Corridors",
        value: "16",
        trend: "▲ 2 new corridors",
        isPositive: true,
        period: "Q1 2026 · Connected lanes",
        note: "London Heathrow - Delhi air logistics corridor upgraded with AI customs inspection."
      }
    ]
  },
  "india-singapore": {
    id: "india-singapore",
    corridorName: "India–Singapore Trade Pulse",
    countryA: "India",
    flagA: "🇮🇳",
    countryB: "Singapore",
    flagB: "🇸🇬",
    agreement: "CECA & PayNow-UPI Cross-Border Rail",
    metrics: [
      {
        id: "volume",
        label: "India–Singapore Trade Volume",
        value: "$35.6B",
        trend: "▲ 16.8% QoQ",
        isPositive: true,
        period: "Q1 2026 · Bilateral trade",
        note: "Fintech corridors, maritime transshipment, and electronics assembly power robust inflows."
      },
      {
        id: "export",
        label: "India–Singapore Export Growth",
        value: "+15.7%",
        trend: "▲ 4.8% MoM",
        isPositive: true,
        period: "Q1 2026 · Outbound to Singapore",
        note: "Petroleum products, electronic components, and food security shipments sustain gains."
      },
      {
        id: "import",
        label: "India–Singapore Import Growth",
        value: "+12.4%",
        trend: "▲ 2.9% MoM",
        isPositive: true,
        period: "Q1 2026 · Inbound from Singapore",
        note: "High-density semiconductors, organic chemicals, and specialized machinery."
      },
      {
        id: "balance",
        label: "India–Singapore Trade Balance",
        value: "-$11.4B",
        trend: "▲ 5.2% YoY",
        isPositive: true,
        period: "Q1 2026 · Trade deficit",
        note: "Transshipment logistics hub volume reflects heavy intermediary re-export commerce."
      },
      {
        id: "corridors",
        label: "Active India–Singapore Corridors",
        value: "14",
        trend: "▲ 3 new corridors",
        isPositive: true,
        period: "Q1 2026 · Port lanes",
        note: "Direct PSA Singapore to JNPT automated container transit lanes fully integrated."
      }
    ]
  },
  "india-japan": {
    id: "india-japan",
    corridorName: "India–Japan Trade Pulse",
    countryA: "India",
    flagA: "🇮🇳",
    countryB: "Japan",
    flagB: "🇯🇵",
    agreement: "CEPA & High-Speed Rail Corridor",
    metrics: [
      {
        id: "volume",
        label: "India–Japan Trade Volume",
        value: "$21.4B",
        trend: "▲ 9.8% QoQ",
        isPositive: true,
        period: "Q1 2026 · Bilateral trade",
        note: "Industrial robotics, Shinkansen rail components, and specialty metals investments expand."
      },
      {
        id: "export",
        label: "India–Japan Export Growth",
        value: "+11.5%",
        trend: "▲ 2.8% MoM",
        isPositive: true,
        period: "Q1 2026 · Outbound to Japan",
        note: "Marine seafood, refined petroleum, and enterprise engineering software."
      },
      {
        id: "import",
        label: "India–Japan Import Growth",
        value: "+7.9%",
        trend: "▼ 0.6% MoM",
        isPositive: false,
        period: "Q1 2026 · Inbound from Japan",
        note: "Specialized steel alloys, electric train rolling stock, and electronics capital goods."
      },
      {
        id: "balance",
        label: "India–Japan Trade Balance",
        value: "-$9.8B",
        trend: "▼ 1.8% YoY",
        isPositive: true,
        period: "Q1 2026 · Infrastructure inflows",
        note: "Capital equipment imports for mega infra projects supported by low-interest bilateral credit."
      },
      {
        id: "corridors",
        label: "Active India–Japan Corridors",
        value: "15",
        trend: "▲ 2 new corridors",
        isPositive: true,
        period: "Q1 2026 · Trade corridors",
        note: "Yokohama to Mundra port dedicated high-speed roll-on/roll-off automotive transit."
      }
    ]
  }
};

interface GlobalTradePulseCardProps {
  /**
   * Layout variant:
   * - "hero": full-sized card for Feed / Landing Fold (matches user screenshot)
   * - "compact": condensed version for MegaMenu dropdowns
   * - "interactive": full explorer version with Bilateral Corridor dropdown & metric selector tabs
   */
  variant?: "hero" | "compact" | "interactive";
  defaultCorridor?: string;
  allowCorridorSelection?: boolean;
  autoRotate?: boolean;
  rotationInterval?: number; // ms
  showCountryIntelligenceLink?: boolean;
  className?: string;
  onCorridorChange?: (corridorId: string) => void;
}

export default function GlobalTradePulseCard({
  variant = "hero",
  defaultCorridor = "india-eu",
  allowCorridorSelection = false,
  autoRotate = true,
  rotationInterval = 4200,
  showCountryIntelligenceLink = true,
  className = "",
  onCorridorChange
}: GlobalTradePulseCardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedCorridorKey, setSelectedCorridorKey] = useState<string>(defaultCorridor);
  const [metricIndex, setMetricIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Sync corridor selection if prop changes
  useEffect(() => {
    if (defaultCorridor && BILATERAL_CORRIDORS_INTEL[defaultCorridor]) {
      setSelectedCorridorKey(defaultCorridor);
    }
  }, [defaultCorridor]);

  const activeCorridor = BILATERAL_CORRIDORS_INTEL[selectedCorridorKey] || BILATERAL_CORRIDORS_INTEL["global"];
  const metricsList = activeCorridor.metrics;
  const currentMetric = metricsList[metricIndex % metricsList.length];

  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate || isPaused || isHovered) return;

    const timer = setInterval(() => {
      setMetricIndex((prev) => (prev + 1) % metricsList.length);
    }, rotationInterval);

    return () => clearInterval(timer);
  }, [autoRotate, isPaused, isHovered, rotationInterval, metricsList.length]);

  const handleNextMetric = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setMetricIndex((prev) => (prev + 1) % metricsList.length);
  };

  const handlePrevMetric = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setMetricIndex((prev) => (prev - 1 + metricsList.length) % metricsList.length);
  };

  const handleSelectMetric = (idx: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setMetricIndex(idx);
  };

  const handleCorridorSwitch = (corridorId: string) => {
    setSelectedCorridorKey(corridorId);
    setMetricIndex(0);
    if (onCorridorChange) {
      onCorridorChange(corridorId);
    }
  };

  // Determine intelligence destination link based on active path/locale
  const getDestinationUrl = () => {
    const isPOC = pathname.includes("/poc-v2");
    if (isPOC) {
      return `/en/poc-v2/country-news/intelligence?corridor=${selectedCorridorKey}`;
    }
    return `/country?view=intelligence&corridor=${selectedCorridorKey}`;
  };

  const handleCardClick = () => {
    router.push(getDestinationUrl());
  };

  // =========================================================================
  // COMPACT VARIANT (FOR MEGA MENU DROPDOWNS)
  // =========================================================================
  if (variant === "compact") {
    return (
      <div
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative flex flex-col justify-between p-4 rounded-2xl bg-gradient-to-b from-[#231710] via-[#1a110b] to-[#120b07] border border-[#4a3222] hover:border-[#F4A024]/80 text-white shadow-lg cursor-pointer transition-all duration-300 hover:shadow-[#F4A024]/10 hover:shadow-xl ${className}`}
      >
        {/* Top Eyebrow & Badges */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F4A024] animate-pulse" />
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#F4A024]">
              GLOBAL TRADE PULSE
            </span>
          </div>
          <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-[#F4A024]/15 text-[#FEC970] border border-[#F4A024]/30">
            {activeCorridor.flagA} {activeCorridor.flagB}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-xs font-serif font-bold text-[#FEC970] mt-1 line-clamp-1 group-hover:text-white transition-colors">
          {currentMetric.label}
        </h4>

        {/* Big Number & Trend */}
        <div className="my-2.5">
          <div className="text-2xl lg:text-3xl font-extrabold font-serif text-[#F4A024] tracking-tight group-hover:scale-102 transition-transform">
            {currentMetric.value}
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-emerald-400">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span>{currentMetric.trend}</span>
          </div>
        </div>

        {/* Period & Subtitle */}
        <p className="text-[10px] text-[#e0bba2] leading-snug line-clamp-2 mb-2">
          {currentMetric.note}
        </p>

        {/* Bottom Bar: Dots & CTA */}
        <div className="pt-2 border-t border-[#3a271c] flex items-center justify-between">
          <div className="flex items-center gap-1">
            {metricsList.map((m, idx) => (
              <button
                key={m.id}
                onClick={(e) => handleSelectMetric(idx, e)}
                className={`h-1.5 rounded-full transition-all ${
                  metricIndex % metricsList.length === idx
                    ? "w-4 bg-[#F4A024]"
                    : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`View ${m.label}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1 text-[9px] font-bold text-[#FEC970] group-hover:translate-x-0.5 transition-transform">
            <span>Country Intelligence</span>
            <ArrowRight className="h-2.5 w-2.5" />
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // INTERACTIVE VARIANT (FOR COUNTRY INTELLIGENCE PAGE WITH CORRIDOR FILTER)
  // =========================================================================
  if (variant === "interactive") {
    return (
      <div className={`space-y-4 ${className}`}>
        {/* Corridor Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white dark:bg-[#0f172a] p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
              <Globe className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                Bilateral Trade Pulse Filter
              </h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Switch between active country corridors to inspect live trade metrics.
              </p>
            </div>
          </div>

          {/* Corridor Dropdown Selector */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase hidden sm:inline">Corridor:</span>
            <select
              value={selectedCorridorKey}
              onChange={(e) => handleCorridorSwitch(e.target.value)}
              className="text-xs font-bold bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-3.5 py-2 rounded-xl outline-none cursor-pointer focus:border-amber-500 transition-colors"
            >
              <option value="global">🌐 Global Trade (All Markets)</option>
              <option value="india-eu">🇮🇳 🇪🇺 India – European Union</option>
              <option value="india-usa">🇮🇳 🇺🇸 India – United States</option>
              <option value="india-uae">🇮🇳 🇦🇪 India – UAE (CEPA)</option>
              <option value="india-germany">🇮🇳 🇩🇪 India – Germany (Green Corridor)</option>
              <option value="india-uk">🇮🇳 🇬🇧 India – United Kingdom</option>
              <option value="india-singapore">🇮🇳 🇸🇬 India – Singapore</option>
              <option value="india-japan">🇮🇳 🇯🇵 India – Japan</option>
            </select>
          </div>
        </div>

        {/* The Card with Metric Tabs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Visual Card (col-span-5) */}
          <div
            onClick={handleCardClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="lg:col-span-5 relative flex flex-col justify-between p-7 md:p-8 rounded-3xl bg-gradient-to-b from-[#241710] via-[#1a110b] to-[#120b07] border border-[#4a3222] hover:border-[#F4A024] text-white shadow-2xl transition-all duration-300 group cursor-pointer"
          >
            {/* Header Eyebrow */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#F4A024] animate-pulse" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#F4A024]">
                  GLOBAL TRADE PULSE
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F4A024]/20 text-[#FEC970] border border-[#F4A024]/40">
                {activeCorridor.flagA} {activeCorridor.countryA} ⇄ {activeCorridor.flagB} {activeCorridor.countryB}
              </span>
            </div>

            {/* Metric Title */}
            <div className="mt-4">
              <h3 className="text-xl md:text-2xl font-bold font-serif text-[#FEC970] leading-snug">
                {currentMetric.label}
              </h3>
              <span className="text-[10px] font-medium text-[#cbb09c]">
                {currentMetric.period}
              </span>
            </div>

            {/* Huge Number & Growth Badge */}
            <div className="my-6">
              <div className="text-5xl md:text-6xl font-serif font-black text-[#F4A024] tracking-tight">
                {currentMetric.value}
              </div>
              <div className="mt-2.5 flex items-center gap-2 text-sm font-bold text-emerald-400">
                {currentMetric.isPositive ? (
                  <span className="flex items-center gap-1">
                    <span className="text-base">↗</span>
                    <span>{currentMetric.trend}</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-rose-400">
                    <span className="text-base">↘</span>
                    <span>{currentMetric.trend}</span>
                  </span>
                )}
                <span className="text-[10px] font-normal text-[#cbb09c]">vs previous period</span>
              </div>
            </div>

            {/* Subtitle / Note */}
            <p className="text-xs md:text-sm text-[#e0bba2] leading-relaxed mb-6 font-normal">
              {currentMetric.note}
            </p>

            {/* Controls Bar */}
            <div className="pt-4 border-t border-[#3a271c] flex items-center justify-between">
              {/* Pagination Dots */}
              <div className="flex items-center gap-1.5">
                {metricsList.map((m, idx) => (
                  <button
                    key={m.id}
                    onClick={(e) => handleSelectMetric(idx, e)}
                    className={`h-2 rounded-full transition-all ${
                      metricIndex % metricsList.length === idx
                        ? "w-6 bg-[#F4A024]"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                    title={m.label}
                  />
                ))}
              </div>

              {/* Prev/Next & Play/Pause */}
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPaused(!isPaused);
                  }}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#FEC970] transition-colors"
                  title={isPaused ? "Resume rotation" : "Pause rotation"}
                >
                  {isPaused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
                </button>
                <button
                  onClick={handlePrevMetric}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#FEC970] transition-colors"
                  title="Previous metric"
                >
                  <ChevronLeft className="h-3 w-3" />
                </button>
                <button
                  onClick={handleNextMetric}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#FEC970] transition-colors"
                  title="Next metric"
                >
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Metric Selector Grid (col-span-7) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 flex-1">
            {metricsList.map((metric, idx) => {
              const isSelected = metricIndex % metricsList.length === idx;
              return (
                <div
                  key={metric.id}
                  onClick={() => setMetricIndex(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#1f150e] border-[#F4A024] shadow-md text-white ring-1 ring-[#F4A024]/40"
                      : "bg-white dark:bg-[#0f172a] border-gray-200 dark:border-gray-800 hover:border-amber-400 dark:hover:border-amber-500/50 text-gray-900 dark:text-white"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-[9px] font-bold uppercase tracking-wider ${
                        isSelected ? "text-[#F4A024]" : "text-gray-400"
                      }`}>
                        Metric 0{idx + 1}
                      </span>
                      <span className={`text-[10px] font-bold ${
                        metric.isPositive ? "text-emerald-500" : "text-rose-500"
                      }`}>
                        {metric.trend}
                      </span>
                    </div>

                    <h4 className={`text-xs font-bold leading-tight ${
                      isSelected ? "text-[#FEC970]" : "text-gray-900 dark:text-white"
                    }`}>
                      {metric.label}
                    </h4>
                  </div>

                  <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-800/80 flex items-baseline justify-between">
                    <span className={`text-xl font-bold font-serif ${
                      isSelected ? "text-[#F4A024]" : "text-amber-600 dark:text-amber-400"
                    }`}>
                      {metric.value}
                    </span>
                    <span className="text-[9px] text-gray-400 line-clamp-1 max-w-[130px]">
                      {metric.period.split("·")[1] || metric.period}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Bilateral Agreement Summary Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-purple-500/5 to-blue-500/10 border border-amber-500/20 flex flex-col justify-between">
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  Treaty & Accord Framework
                </span>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                  {activeCorridor.agreement}
                </h4>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  Single-window digital customs clearance & tariff reductions active for {activeCorridor.countryA} ⇄ {activeCorridor.countryB}.
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleCardClick}
                  className="text-[10px] font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Full Corridor Analytics <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  }

  // =========================================================================
  // HERO VARIANT (DEFAULT FOR FEED & LANDING PAGE - MATCHES USER SCREENSHOT)
  // =========================================================================
  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col justify-between p-6 md:p-8 rounded-3xl bg-gradient-to-b from-[#241710] via-[#1a110b] to-[#120b07] border border-[#4a3222] hover:border-[#F4A024] text-white shadow-2xl cursor-pointer transition-all duration-300 hover:shadow-[#F4A024]/10 hover:shadow-2xl ${className}`}
      role="region"
      aria-label="Global Trade Pulse intelligence widget"
    >
      {/* Optional Corridor Quick Pills if allowed */}
      {allowCorridorSelection && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 scrollbar-hide text-[10px]">
          {Object.keys(BILATERAL_CORRIDORS_INTEL).slice(0, 4).map((k) => {
            const corr = BILATERAL_CORRIDORS_INTEL[k];
            return (
              <button
                key={k}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCorridorSwitch(k);
                }}
                className={`px-2 py-0.5 rounded-full font-bold transition-all shrink-0 ${
                  selectedCorridorKey === k
                    ? "bg-[#F4A024] text-gray-950 shadow-xs"
                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                }`}
              >
                {corr.flagA} {corr.flagB} {corr.countryA === "Global" ? "Global" : corr.countryB}
              </button>
            );
          })}
        </div>
      )}

      {/* Top Header Eyebrow */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#F4A024]">
            GLOBAL TRADE PULSE
          </span>
          <div className="flex items-center gap-1 text-[9px] font-bold text-[#FEC970] bg-[#F4A024]/15 px-2 py-0.5 rounded-full border border-[#F4A024]/30 opacity-80 group-hover:opacity-100 transition-opacity">
            <span>{activeCorridor.flagA} {activeCorridor.flagB}</span>
          </div>
        </div>

        {/* Metric Label (Serif) */}
        <h3 className="text-base md:text-lg font-serif font-bold mt-1 text-[#FEC970] leading-snug group-hover:text-white transition-colors">
          {currentMetric.label}
        </h3>
      </div>

      {/* Middle: Big Metric Number & Trend Indicator */}
      <div className="my-6 md:my-8">
        <div className="text-5xl md:text-6xl font-serif font-black text-[#F4A024] tracking-tight group-hover:scale-102 transition-transform">
          {currentMetric.value}
        </div>
        
        <div className="mt-2.5 flex items-center gap-2 text-xs md:text-sm font-bold text-emerald-400">
          {currentMetric.isPositive ? (
            <span className="flex items-center gap-1">
              <span className="text-base font-bold">↗</span>
              <span>{currentMetric.trend}</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-rose-400">
              <span className="text-base font-bold">↘</span>
              <span>{currentMetric.trend}</span>
            </span>
          )}
        </div>
      </div>

      {/* Bottom Subtitle / Description */}
      <div>
        <p className="text-[11px] md:text-xs text-[#e0bba2] leading-relaxed mb-4 font-normal">
          {currentMetric.note}
        </p>

        {/* Footer Bar with Carousel Dots & Country Intelligence Link */}
        <div className="pt-3 border-t border-[#3a271c] flex items-center justify-between">
          
          {/* Indicator Dots */}
          <div className="flex items-center gap-1.5">
            {metricsList.map((m, idx) => (
              <button
                key={m.id}
                onClick={(e) => handleSelectMetric(idx, e)}
                className={`h-1.5 rounded-full transition-all ${
                  metricIndex % metricsList.length === idx
                    ? "w-5 bg-[#F4A024]"
                    : "w-1.5 bg-white/25 hover:bg-white/50"
                }`}
                aria-label={`Switch to ${m.label}`}
                title={m.label}
              />
            ))}
          </div>

          {/* Quick Click Hint */}
          <div className="flex items-center gap-1 text-[10px] font-bold text-[#FEC970] group-hover:text-white transition-colors">
            <span>Country Intelligence</span>
            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}
