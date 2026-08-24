"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useActiveMode } from "@/contexts/ActiveModeContext";
import { SECTORS, FREE_SECTOR_LIMIT, FREE_INDUSTRIES_PER_SECTOR } from "@/lib/sectors";
import { TOP_10_COUNTRIES, COUNTRIES_BY_CONTINENT, FREE_COUNTRY_LIMIT, FREE_TOP_10_LIMIT, FREE_OTHER_LIMIT, type Country } from "@/lib/countries";
import {
  LEADERSHIP_GROUPS,
  LEADERSHIP_CATEGORIES,
  FREE_LEADER_CATEGORY_LIMIT,
  searchLeadershipTitles,
  type LeaderCategory,
  type LeaderTitle,
} from "@/lib/leadershipTaxonomy";
import {
  STUDENT_GROUPS,
  STUDENT_CATEGORIES,
  FREE_STUDENT_CATEGORY_LIMIT,
  searchStudentTitles,
  type StudentCategory,
  type StudentTitle,
} from "@/lib/studentTaxonomy";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Check, Search, ChevronDown, ChevronUp, Newspaper,
  // Sector, Leadership & Student icons
  Factory, ShoppingBag, Cpu, Briefcase, GraduationCap, Wheat, HeartPulse,
  Zap, Building2, Shield, FlaskConical, CircuitBoard, Globe, Leaf, Droplet,
  Droplets, Plane, Mountain, Radio, Radar, SunMedium, TreePine, Sprout, Fish,
  ShoppingCart, UtensilsCrossed, Activity, Tv, Users, Cog, Wind, Flame, Pill,
  Ship, BatteryCharging, Rocket, BarChart3, Layers, MapPin, Landmark, CreditCard,
  Truck, Train, Car, Lightbulb, Store, Recycle,
  BookOpen, UserCheck, UserPlus, Crown, Code, Settings, DollarSign, Megaphone,
  Building, Award, TrendingUp, LayoutGrid, Target, Package, Monitor, FileEdit,
  Mic, ClipboardList, User,
  Microchip, Pickaxe, TestTube, Sparkles, AlertTriangle, Lock, Key, X, Info,
  type LucideIcon,
} from "lucide-react";
import "./onboarding.css";

/* ============================
   ICON MAP
   ============================ */
const ICON_MAP: Record<string, LucideIcon> = {
  // Sectors, Leaders & Students
  Factory, ShoppingBag, Cpu, Briefcase, GraduationCap, Wheat, HeartPulse,
  Zap, Building2, Shield, FlaskConical, CircuitBoard, Globe, Leaf, Droplet,
  Droplets, Plane, Mountain, Radar, SunMedium, TreePine, Sprout, Fish,
  ShoppingCart, UtensilsCrossed, Activity, Tv, Users, Cog, Wind, Flame, Pill,
  Ship, BatteryCharging, Rocket, BarChart3, Layers, MapPin, Landmark, CreditCard,
  Truck, Train, Car, Lightbulb, Store, Recycle,
  Microchip, Pickaxe, TestTube, Radio,
  BookOpen, UserCheck, UserPlus, Crown, Code, Settings, DollarSign, Megaphone,
  Building, Award, TrendingUp, LayoutGrid, Target, Package, Monitor, FileEdit,
  Mic, ClipboardList, User, Lock, Key, X, Info,
};

/* ============================
   PROGRESS BAR (4 steps)
   ============================ */
function ProgressBar({ step }: { step: number }) {
  const steps = ["Sectors & Industries", "Bilateral Countries", "Leaders", "Reader Identity"];
  const totalSteps = 4;

  return (
    <div className="onb-progress">
      <div className="onb-progress-bar">
        <div className="onb-progress-fill" style={{ width: `${(step / totalSteps) * 100}%` }} />
      </div>
      <div className="onb-progress-labels">
        {steps.map((label, i) => (
          <div key={label} className={`onb-progress-step ${i + 1 <= step ? "active" : ""} ${i + 1 === step ? "current" : ""}`}>
            <span className="onb-progress-dot">
              {i + 1 < step ? <Check className="w-3 h-3" /> : i + 1}
            </span>
            <span className="onb-progress-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================
   STEP 1 — SECTORS & INDUSTRIES
   ============================ */
function SectorAndIndustryStep({
  selectedSectors,
  selectedIndustries,
  onToggleSector,
  onToggleIndustry,
}: {
  selectedSectors: string[];
  selectedIndustries: Record<string, string[]>;
  onToggleSector: (id: string) => void;
  onToggleIndustry: (sectorId: string, industryId: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [openSectors, setOpenSectors] = useState<string[]>([]);
  const isSectorMaxed = selectedSectors.length >= FREE_SECTOR_LIMIT;

  const toggleSectorAccordion = (sectorId: string) => {
    setOpenSectors((prev) =>
      prev.includes(sectorId) ? prev.filter((id) => id !== sectorId) : [...prev, sectorId]
    );
  };

  const totalIndustriesSelected = useMemo(() => {
    return Object.values(selectedIndustries).reduce((sum, arr) => sum + (arr?.length || 0), 0);
  }, [selectedIndustries]);

  const filteredSectors = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return SECTORS;
    return SECTORS.map((sector) => {
      const matchSector = sector.name.toLowerCase().includes(q) || sector.description.toLowerCase().includes(q);
      const matchingIndustries = sector.industries.filter((ind) => ind.name.toLowerCase().includes(q));
      if (matchSector || matchingIndustries.length > 0) {
        return sector;
      }
      return null;
    }).filter((s): s is typeof SECTORS[number] => s !== null);
  }, [search]);

  return (
    <div className="onb-step">
      <div className="onb-step-header">
        <h2>Select Your Sectors &amp; Industries</h2>
        <p>Expand any sector below to select up to {FREE_INDUSTRIES_PER_SECTOR} industries (up to {FREE_SECTOR_LIMIT} sectors total)</p>
        <div className="onb-counter-group">
          <div className="onb-counter">
            Sectors Selected: <strong>{selectedSectors.length}</strong> / {FREE_SECTOR_LIMIT}
          </div>
          <div className="onb-counter accent">
            Total Industries Selected: <strong>{totalIndustriesSelected}</strong> / {selectedSectors.length > 0 ? selectedSectors.length * FREE_INDUSTRIES_PER_SECTOR : 25}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="onb-search" style={{ marginBottom: 20 }}>
        <Search className="onb-search-icon" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search from 50 sectors and 1,350 industries..."
          className="onb-search-input"
        />
      </div>

      {/* 50 Sector Accordions */}
      <div className="onb-continents">
        {filteredSectors.map((sector) => {
          const isOpen = openSectors.includes(sector.id) || search.trim().length > 0;
          const Icon = ICON_MAP[sector.icon] || Briefcase;
          const sectorIndustries = selectedIndustries[sector.id] || [];
          const isMaxedIndustries = sectorIndustries.length >= FREE_INDUSTRIES_PER_SECTOR;

          return (
            <div key={sector.id} className="onb-continent">
              <button
                type="button"
                onClick={() => toggleSectorAccordion(sector.id)}
                className="onb-continent-header"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--color-neutral-light)] text-[var(--color-primary)] flex items-center justify-center font-semibold shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="font-bold text-[15px] text-[var(--color-primary)] block leading-tight">{sector.name}</span>
                    <span className="text-[11px] color-[var(--color-neutral-dark)] font-normal hidden sm:inline">{sector.description}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 ml-auto">
                  {sectorIndustries.length > 0 && (
                    <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                      {sectorIndustries.length} / {FREE_INDUSTRIES_PER_SECTOR} Selected
                    </span>
                  )}
                  <span className="onb-continent-count">{sector.industries.length}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-gray-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />}
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="onb-continent-list">
                      {sector.industries.map((industry) => {
                        const isSel = sectorIndustries.includes(industry.id);
                        const isDis = !isSel && isMaxedIndustries;

                        return (
                          <button
                            key={industry.id}
                            type="button"
                            onClick={() => {
                              if (!isSel && !selectedSectors.includes(sector.id)) {
                                if (!isSectorMaxed) {
                                  onToggleSector(sector.id);
                                } else {
                                  return;
                                }
                              }
                              onToggleIndustry(sector.id, industry.id);
                            }}
                            className={`onb-country-item ${isSel ? "selected" : ""} ${isDis ? "disabled" : ""}`}
                            title={isDis ? `You can select up to ${FREE_INDUSTRIES_PER_SECTOR} industries per sector.` : undefined}
                          >
                            <Icon className="w-4 h-4 shrink-0" />
                            <span className="onb-country-name">{industry.name}</span>
                            {isSel && <Check className="w-3.5 h-3.5 text-white shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {filteredSectors.length === 0 && (
        <p className="onb-no-results">
          No sectors or industries found for &quot;{search}&quot;
        </p>
      )}
    </div>
  );
}

/* ============================
   STEP 2 — COUNTRIES
   ============================ */
function CountryStep({ selected, onToggle }: { selected: string[]; onToggle: (name: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openContinents, setOpenContinents] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const top10NamesSet = useMemo(() => new Set(TOP_10_COUNTRIES.map((c) => c.name)), []);

  const top10SelectedCount = useMemo(() => {
    return selected.filter((name) => top10NamesSet.has(name)).length;
  }, [selected, top10NamesSet]);

  const otherSelectedCount = useMemo(() => {
    return selected.filter((name) => !top10NamesSet.has(name)).length;
  }, [selected, top10NamesSet]);

  const toggleContinent = (continent: string) => {
    setOpenContinents((prev) =>
      prev.includes(continent) ? prev.filter((c) => c !== continent) : [...prev, continent]
    );
  };

  const filteredContinents = useMemo(() => {
    if (!searchQuery.trim()) return COUNTRIES_BY_CONTINENT;
    const q = searchQuery.toLowerCase();
    return COUNTRIES_BY_CONTINENT.map((group) => ({
      ...group,
      countries: group.countries.filter((c) => c.name.toLowerCase().includes(q)),
    })).filter((g) => g.countries.length > 0);
  }, [searchQuery]);

  const handleCountryClick = (countryName: string) => {
    const isSel = selected.includes(countryName);
    const isTop10 = top10NamesSet.has(countryName);

    if (isSel) {
      setErrorMsg(null);
      onToggle(countryName);
      return;
    }

    if (selected.length >= FREE_COUNTRY_LIMIT) {
      setErrorMsg(`Selection limit reached! Free readers can select a maximum of ${FREE_COUNTRY_LIMIT} total bilateral countries.`);
      return;
    }

    if (isTop10 && top10SelectedCount >= FREE_TOP_10_LIMIT) {
      setErrorMsg(`Top 10 Limit Reached! Free readers can select a maximum of ${FREE_TOP_10_LIMIT} countries from the Top 10 list.`);
      return;
    }

    if (!isTop10 && otherSelectedCount >= FREE_OTHER_LIMIT) {
      setErrorMsg(`Other Regions Limit Reached! Free readers can select a maximum of ${FREE_OTHER_LIMIT} countries from other regions.`);
      return;
    }

    setErrorMsg(null);
    onToggle(countryName);
  };

  const CountryButton = ({ country }: { country: Country }) => {
    const isSel = selected.includes(country.name);
    const isTop10 = top10NamesSet.has(country.name);

    let isDis = false;
    let disabledTitle: string | undefined = undefined;

    if (!isSel) {
      if (selected.length >= FREE_COUNTRY_LIMIT) {
        isDis = true;
        disabledTitle = `Maximum ${FREE_COUNTRY_LIMIT} total countries limit reached`;
      } else if (isTop10 && top10SelectedCount >= FREE_TOP_10_LIMIT) {
        isDis = true;
        disabledTitle = `Free readers are limited to ${FREE_TOP_10_LIMIT} Top 10 countries`;
      } else if (!isTop10 && otherSelectedCount >= FREE_OTHER_LIMIT) {
        isDis = true;
        disabledTitle = `Free readers are limited to ${FREE_OTHER_LIMIT} other region countries`;
      }
    }

    return (
      <button
        onClick={() => handleCountryClick(country.name)}
        className={`onb-country-item ${isSel ? "selected" : ""} ${isDis ? "disabled" : ""}`}
        title={disabledTitle}
      >
        <span className="onb-country-flag">
          {country.code
            .toUpperCase()
            .split("")
            .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
            .join("")}
        </span>
        <span className="onb-country-name">{country.name}</span>
        {isSel && <Check className="w-3.5 h-3.5 text-white shrink-0" />}
      </button>
    );
  };

  return (
    <div className="onb-step">
      <div className="onb-step-header">
        <h2>Select Your Bilateral Countries</h2>
        <p>Choose up to {FREE_COUNTRY_LIMIT} bilateral countries whose trade news matters to you</p>

        {/* Highlighted Rule Banner */}
        <div className="mt-3 py-2 px-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold inline-flex items-center gap-2 shadow-xs">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Free Reader Allowance: Max <strong>{FREE_TOP_10_LIMIT} Top 10 Countries</strong> + up to <strong>{FREE_OTHER_LIMIT} Other Countries</strong> ({FREE_COUNTRY_LIMIT} Total)</span>
        </div>

        {/* Counter Group */}
        <div className="onb-counter-group mt-3">
          <div className={`onb-counter ${top10SelectedCount >= FREE_TOP_10_LIMIT ? "accent" : ""}`}>
            Top 10 Selected: <strong>{top10SelectedCount}</strong> / {FREE_TOP_10_LIMIT}
          </div>
          <div className={`onb-counter ${otherSelectedCount >= FREE_OTHER_LIMIT ? "accent" : ""}`}>
            Other Countries Selected: <strong>{otherSelectedCount}</strong> / {FREE_OTHER_LIMIT}
          </div>
          <div className="onb-counter accent font-bold">
            Total Selected: <strong>{selected.length}</strong> / {FREE_COUNTRY_LIMIT}
          </div>
        </div>
      </div>

      {/* Error Toast Alert */}
      <AnimatePresence>
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold flex items-center justify-between shadow-xs"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <button
              onClick={() => setErrorMsg(null)}
              className="text-red-500 hover:text-red-700 text-xs font-bold underline shrink-0 ml-2"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top 10 */}
      <div className="onb-top10">
        <h3 className="onb-section-label">🔥 Top 10 Bilateral Countries (Max {FREE_TOP_10_LIMIT})</h3>
        <div className="onb-top10-grid">
          {TOP_10_COUNTRIES.map((country) => (
            <CountryButton key={country.name} country={country} />
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="onb-search">
        <Search className="onb-search-icon" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search from 195 bilateral countries..."
          className="onb-search-input"
        />
      </div>

      {/* Continent Accordions */}
      <div className="onb-continents">
        {filteredContinents.map((group) => {
          const isOpen = openContinents.includes(group.continent) || searchQuery.trim().length > 0;
          return (
            <div key={group.continent} className="onb-continent">
              <button onClick={() => toggleContinent(group.continent)} className="onb-continent-header">
                <span>{group.continent}</span>
                <span className="onb-continent-count">{group.countries.length}</span>
                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="onb-continent-list">
                      {group.countries.map((country) => (
                        <CountryButton key={country.name} country={country} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================
   STEP 3 — LEADERS (Master Leadership Taxonomy: 66 Categories, 294 Subcategories & 1,233 Titles Search)
   ============================ */
function LeaderStep({
  selectedCategories,
  selectedSubcategories,
  selectedTitles,
  onToggleCategory,
  onToggleSubcategory,
  onAddTitle,
  onRemoveTitle,
}: {
  selectedCategories: string[];
  selectedSubcategories: Record<string, string[]>;
  selectedTitles: string[];
  onToggleCategory: (catId: string) => void;
  onToggleSubcategory: (catId: string, subcatName: string) => void;
  onAddTitle: (titleName: string) => void;
  onRemoveTitle: (titleName: string) => void;
}) {
  const [titleSearch, setTitleSearch] = useState("");
  const [showTypeahead, setShowTypeahead] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>(["grp-1"]);
  const [openSubcatAccordions, setOpenSubcatAccordions] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isCategoryMaxed = selectedCategories.length >= FREE_LEADER_CATEGORY_LIMIT;

  const toggleGroupAccordion = (grpId: string) => {
    setOpenGroups((prev) =>
      prev.includes(grpId) ? prev.filter((id) => id !== grpId) : [...prev, grpId]
    );
  };

  const toggleSubcatAccordion = (catId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenSubcatAccordions((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
  };

  const searchResults = useMemo(() => {
    return searchLeadershipTitles(titleSearch, 15);
  }, [titleSearch]);

  const handleCategoryClick = (catId: string) => {
    const isSel = selectedCategories.includes(catId);
    if (!isSel && isCategoryMaxed) {
      setErrorMsg(`Selection limit reached! Free readers can select up to ${FREE_LEADER_CATEGORY_LIMIT} Leader Categories.`);
      return;
    }
    setErrorMsg(null);
    onToggleCategory(catId);
    if (!isSel) {
      if (!openSubcatAccordions.includes(catId)) {
        setOpenSubcatAccordions((prev) => [...prev, catId]);
      }
    }
  };

  return (
    <div className="onb-step">
      {/* 1. Header Definition Box: Who is a Leader & Hierarchy Distinction */}
      <div className="onb-leader-def-card">
        <div className="onb-leader-def-header">
          <div className="onb-leader-def-icon">
            <Crown className="w-6 h-6" />
          </div>
          <div>
            <h3 className="onb-leader-def-title">Executive Leadership Taxonomy &amp; Intelligence</h3>
            <p className="text-xs text-slate-300">Understanding Categories, Subcategories &amp; Individual Titles</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
          <div className="onb-leader-def-item">
            <div className="onb-leader-def-item-title">
              <Users className="w-4 h-4 text-sky-400" />
              66 Categories
            </div>
            <p className="onb-leader-def-item-desc">
              <strong>Community &amp; Functional Groups</strong> — Macro executive domains across 6 core industry groups.
            </p>
          </div>
          <div className="onb-leader-def-item">
            <div className="onb-leader-def-item-title">
              <Layers className="w-4 h-4 text-emerald-400" />
              294 Subcategories
            </div>
            <p className="onb-leader-def-item-desc">
              <strong>Sub-Functional Groups</strong> — Specialized leadership functions under each main community category.
            </p>
          </div>
          <div className="onb-leader-def-item">
            <div className="onb-leader-def-item-title">
              <UserCheck className="w-4 h-4 text-amber-400" />
              1,233 Titles
            </div>
            <p className="onb-leader-def-item-desc">
              <strong>Individual Leadership Titles</strong> — Specific executive positions searchable via live database lookup.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Main Question & Selection Counter */}
      <div className="onb-step-header">
        <h2>Which leaders&apos; news do you want to follow?</h2>
        <p>Select 0 to {FREE_LEADER_CATEGORY_LIMIT} Leader Categories (Community Groups), drill into optional subcategories, or search specific individual titles from our 1,233 database.</p>
        
        <div className="onb-counter-group mt-3">
          <div className={`onb-counter ${selectedCategories.length >= FREE_LEADER_CATEGORY_LIMIT ? "accent" : ""}`}>
            Leader Categories Selected: <strong>{selectedCategories.length}</strong> / {FREE_LEADER_CATEGORY_LIMIT}
          </div>
          {selectedTitles.length > 0 && (
            <div className="onb-counter accent font-bold">
              Individual Titles Selected: <strong>{selectedTitles.length}</strong>
            </div>
          )}
        </div>
      </div>

      {/* Limit Error Alert Toast */}
      <AnimatePresence>
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold flex items-center justify-between shadow-xs"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <button
              onClick={() => setErrorMsg(null)}
              className="text-red-500 hover:text-red-700 text-xs font-bold underline shrink-0 ml-2"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Title Search Box (Live Typeahead Query against 1,233 Titles Database) */}
      <div className="onb-title-search-container">
        <div className="mb-2 flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-blue-600" />
            <span>Search &amp; Choose Your Individual Titles (From 1,233 Titles Database)</span>
          </label>
          <span className="text-[11px] text-slate-500 font-semibold bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
            Individual Positions
          </span>
        </div>

        <div className="relative">
          <Search className="onb-search-icon" />
          <input
            type="text"
            value={titleSearch}
            onChange={(e) => {
              setTitleSearch(e.target.value);
              setShowTypeahead(true);
            }}
            onFocus={() => setShowTypeahead(true)}
            placeholder="Type to search from 1,233 individual leadership titles (e.g. CEO, Founder, CAIO, VP Finance)..."
            className="onb-search-input"
          />
          {titleSearch && (
            <button
              type="button"
              onClick={() => {
                setTitleSearch("");
                setShowTypeahead(false);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1.5 font-medium">
          <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
          <span>
            <strong>Categories &amp; Subcategories</strong> represent Community &amp; Functional Groups, while <strong>Titles</strong> are Individual Leader Roles chosen from the 1,233 master list.
          </span>
        </p>

        {/* Live Typeahead Dropdown */}
        <AnimatePresence>
          {showTypeahead && titleSearch.trim().length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="onb-title-typeahead-dropdown"
            >
              {searchResults.length > 0 ? (
                searchResults.map((item) => {
                  const isSel = selectedTitles.includes(item.title);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        if (isSel) {
                          onRemoveTitle(item.title);
                        } else {
                          onAddTitle(item.title);
                        }
                        setTitleSearch("");
                        setShowTypeahead(false);
                      }}
                      className="onb-title-typeahead-item"
                    >
                      <div className="flex items-center gap-2">
                        {isSel ? (
                          <Check className="w-4 h-4 text-blue-600 shrink-0" />
                        ) : (
                          <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        )}
                        <span className="onb-title-typeahead-name">{item.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="onb-title-typeahead-meta">{item.categoryName}</span>
                        {item.subcategoryName && (
                          <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                            {item.subcategoryName}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="p-3 text-center text-xs text-gray-500 font-medium">
                  No matching titles found in the 1,233-title database for &quot;{titleSearch}&quot;
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected Searched Title Badges */}
        {selectedTitles.length > 0 && (
          <div className="onb-selected-titles-bar">
            <span className="text-xs font-semibold text-gray-500 flex items-center gap-1 self-center">
              Selected Titles:
            </span>
            {selectedTitles.map((title) => (
              <span key={title} className="onb-title-chip">
                <span>{title}</span>
                <button
                  type="button"
                  onClick={() => onRemoveTitle(title)}
                  className="onb-title-chip-remove"
                  title="Remove title"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 4. 6 Leadership Group Accordions displaying 66 Leader Categories */}
      <div className="onb-continents">
        {LEADERSHIP_GROUPS.map((group) => {
          const isOpen = openGroups.includes(group.id) || titleSearch.trim().length > 0;
          const groupSelectedCatsCount = group.categories.filter((c) => selectedCategories.includes(c.id)).length;

          return (
            <div key={group.id} className="onb-continent">
              <button
                type="button"
                onClick={() => toggleGroupAccordion(group.id)}
                className="onb-continent-header"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-semibold shrink-0">
                    <Crown className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="font-bold text-[15px] text-slate-900">{group.name}</span>
                </div>

                <div className="flex items-center gap-3 ml-auto">
                  {groupSelectedCatsCount > 0 && (
                    <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                      {groupSelectedCatsCount} Selected
                    </span>
                  )}
                  <span className="onb-continent-count">{group.categories.length} Categories</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-gray-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />}
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3.5 bg-slate-50/50">
                      {group.categories.map((cat) => {
                        const isSel = selectedCategories.includes(cat.id);
                        const isDis = !isSel && isCategoryMaxed;
                        const Icon = ICON_MAP[cat.icon] || UserCheck;
                        const isSubcatOpen = openSubcatAccordions.includes(cat.id);
                        const catSubcatsSelected = selectedSubcategories[cat.id] || [];

                        return (
                          <div
                            key={cat.id}
                            className={`onb-leader-category-card ${isSel ? "selected" : ""} ${isDis ? "disabled" : ""}`}
                            onClick={() => handleCategoryClick(cat.id)}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isSel ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                  <span className="font-bold text-sm text-slate-900 block leading-snug">{cat.name}</span>
                                  <span className="text-[11px] text-slate-500 font-medium">Category #{cat.num}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                {isSel ? (
                                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center">
                                    <Check className="w-3.5 h-3.5" />
                                  </span>
                                ) : (
                                  <span className="w-6 h-6 rounded-full border-2 border-slate-300" />
                                )}
                              </div>
                            </div>

                            {/* Subcategories toggle button & count */}
                            {cat.subcategories.length > 0 && (
                              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                                <span className={`onb-subcat-badge ${catSubcatsSelected.length > 0 ? "selected" : ""}`}>
                                  {catSubcatsSelected.length > 0
                                    ? `${catSubcatsSelected.length} Subcats Selected`
                                    : `${cat.subcategories.length} Subcategories`}
                                </span>

                                <button
                                  type="button"
                                  onClick={(e) => toggleSubcatAccordion(cat.id, e)}
                                  className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                >
                                  <span>{isSubcatOpen ? "Hide Subcategories" : "View Subcategories"}</span>
                                  {isSubcatOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                </button>
                              </div>
                            )}

                            {/* Subcategories Accordion */}
                            <AnimatePresence>
                              {isSubcatOpen && cat.subcategories.length > 0 && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.15 }}
                                  className="overflow-hidden mt-3"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div className="onb-subcat-checklist">
                                    {cat.subcategories.map((subcat) => {
                                      const isSubSel = catSubcatsSelected.includes(subcat.name);
                                      return (
                                        <button
                                          key={subcat.id}
                                          type="button"
                                          onClick={() => {
                                            if (!isSel) {
                                              if (!isCategoryMaxed) {
                                                onToggleCategory(cat.id);
                                              } else {
                                                setErrorMsg(`Selection limit reached! Free readers can select up to ${FREE_LEADER_CATEGORY_LIMIT} Leader Categories.`);
                                                return;
                                              }
                                            }
                                            onToggleSubcategory(cat.id, subcat.name);
                                          }}
                                          className={`onb-subcat-item ${isSubSel ? "selected" : ""}`}
                                        >
                                          <span className="w-3.5 h-3.5 rounded border border-slate-300 flex items-center justify-center shrink-0 bg-white">
                                            {isSubSel && <Check className="w-2.5 h-2.5 text-blue-600 font-bold" />}
                                          </span>
                                          <span className="truncate">{subcat.name}</span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================
   STEP 4 — READER IDENTITY (Option A vs Option B with Student Taxonomy)
   ============================ */
function ReaderStep({
  readerType,
  setReaderType,
  selectedCategories,
  selectedSubcategories,
  selectedTitles,
  onToggleCategory,
  onToggleSubcategory,
  onAddTitle,
  onRemoveTitle,
  leaderSelectedCategories,
  leaderSelectedSubcategories,
  leaderSelectedTitles,
}: {
  readerType: "leader_professional" | "student";
  setReaderType: (v: "leader_professional" | "student") => void;
  selectedCategories: string[];
  selectedSubcategories: Record<string, string[]>;
  selectedTitles: string[];
  onToggleCategory: (catId: string) => void;
  onToggleSubcategory: (catId: string, subcatName: string) => void;
  onAddTitle: (titleName: string) => void;
  onRemoveTitle: (titleName: string) => void;
  leaderSelectedCategories: string[];
  leaderSelectedSubcategories: Record<string, string[]>;
  leaderSelectedTitles: string[];
}) {
  const [titleSearch, setTitleSearch] = useState("");
  const [showTypeahead, setShowTypeahead] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>(["stud-grp-1"]);
  const [openSubcatAccordions, setOpenSubcatAccordions] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isCategoryMaxed = selectedCategories.length >= FREE_STUDENT_CATEGORY_LIMIT;

  const toggleGroupAccordion = (grpId: string) => {
    setOpenGroups((prev) =>
      prev.includes(grpId) ? prev.filter((id) => id !== grpId) : [...prev, grpId]
    );
  };

  const toggleSubcatAccordion = (catId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenSubcatAccordions((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
  };

  const searchResults = useMemo(() => {
    return searchStudentTitles(titleSearch, 15);
  }, [titleSearch]);

  const handleCategoryClick = (catId: string) => {
    const isSel = selectedCategories.includes(catId);
    if (!isSel && isCategoryMaxed) {
      setErrorMsg(`Selection limit reached! Free readers can select up to ${FREE_STUDENT_CATEGORY_LIMIT} Student Categories.`);
      return;
    }
    setErrorMsg(null);
    onToggleCategory(catId);
    if (!isSel) {
      if (!openSubcatAccordions.includes(catId)) {
        setOpenSubcatAccordions((prev) => [...prev, catId]);
      }
    }
  };

  return (
    <div className="onb-step">
      {/* 1. Top Reader Definition Header Box: Who is a Reader & Leader-Reader Interconnection */}
      <div className="onb-leader-def-card">
        <div className="onb-leader-def-header">
          <div className="onb-leader-def-icon">
            <BookOpen className="w-6 h-6 text-sky-400" />
          </div>
          <div>
            <h3 className="onb-leader-def-title">Reader Identity &amp; Knowledge Profile</h3>
            <p className="text-xs text-slate-300">Interconnected Leadership, Professional &amp; Academic Readers</p>
          </div>
        </div>
        <div className="onb-leader-def-grid">
          <div className="onb-leader-def-item">
            <div className="onb-leader-def-item-title">
              <UserCheck className="w-4 h-4 text-sky-400" />
              Who is a Reader?
            </div>
            <p className="onb-leader-def-item-desc">
              Every professional, leader, SME, researcher, student, and decision-maker on IGENews is a Reader. Readers consume specialized trade intelligence, economic news, and sector developments.
            </p>
          </div>
          <div className="onb-leader-def-item">
            <div className="onb-leader-def-item-title">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Leader &amp; Reader Interconnection
            </div>
            <p className="onb-leader-def-item-desc">
              Leaders automatically hold Reader status on IGENews. If you selected Leader Roles in Step 3, your professional identity is already active. Readers can also hold dual Student / Academic identities.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Main Question: "Which best describes you?" */}
      <div className="onb-step-header">
        <h2>Which best describes you?</h2>
        <p>Choose your primary reader identity to finalize your personalized newsfeed.</p>
      </div>

      {/* 3. Two Options Only (Option A vs Option B) */}
      <div className="onb-reader-type-grid">
        {/* Option A — Leader / Working Professional */}
        <div
          className={`onb-reader-type-card ${readerType === "leader_professional" ? "selected" : ""}`}
          onClick={() => setReaderType("leader_professional")}
        >
          <div className="flex items-center justify-between">
            <div className="onb-reader-type-icon">
              <Crown className="w-5 h-5" />
            </div>
            {readerType === "leader_professional" && (
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Check className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
          <h3 className="onb-reader-type-title">Option A — Leader / Working Professional</h3>
          <p className="onb-reader-type-subtitle">
            Reuses your Step 3 Leader selections as your professional identity. No extra setup required.
          </p>
        </div>

        {/* Option B — Student / Researcher / Aspirant */}
        <div
          className={`onb-reader-type-card ${readerType === "student" ? "selected" : ""}`}
          onClick={() => setReaderType("student")}
        >
          <div className="flex items-center justify-between">
            <div className="onb-reader-type-icon">
              <GraduationCap className="w-5 h-5" />
            </div>
            {readerType === "student" && (
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Check className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
          <h3 className="onb-reader-type-title">Option B — Student / Researcher / Aspirant</h3>
          <p className="onb-reader-type-subtitle">
            Select from 86 academic disciplines, degrees, competitive exam tracks, or department specializations.
          </p>
        </div>
      </div>

      {/* Option A View: Reuses & Shows Step 3 Leader Selections */}
      {readerType === "leader_professional" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="onb-reader-confirm-card text-left"
        >
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-blue-100">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">Professional Identity Connected</h4>
              <p className="text-xs text-slate-500">
                Your Reader Identity automatically inherits your selections from <strong>Step 3 (Select Leaders)</strong>:
              </p>
            </div>
          </div>

          {/* Show what the user selected in Step 3 */}
          <div className="space-y-3.5">
            {/* Selected Categories */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1.5">
                👑 Selected Leader Categories ({leaderSelectedCategories.length} / 5):
              </span>
              {leaderSelectedCategories.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {leaderSelectedCategories.map((catId) => {
                    const catObj = LEADERSHIP_CATEGORIES.find((c) => c.id === catId);
                    return (
                      <span
                        key={catId}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-semibold border border-blue-200"
                      >
                        <Crown className="w-3.5 h-3.5 text-blue-700" />
                        <span>{catObj ? catObj.name : catId}</span>
                      </span>
                    );
                  })}
                </div>
              ) : (
                <span className="text-xs text-slate-500 italic">No categories selected in Step 3</span>
              )}
            </div>

            {/* Selected Subcategories if any */}
            {Object.values(leaderSelectedSubcategories).some((arr) => arr.length > 0) && (
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-1.5">
                  📂 Selected Subcategories:
                </span>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(leaderSelectedSubcategories).flatMap(([_, subs]) =>
                    subs.map((sub) => (
                      <span
                        key={sub}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200"
                      >
                        <span>{sub}</span>
                      </span>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Selected Titles if any */}
            {leaderSelectedTitles.length > 0 && (
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-1.5">
                  💼 Searched &amp; Selected Individual Titles:
                </span>
                <div className="flex flex-wrap gap-2">
                  {leaderSelectedTitles.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 text-xs font-semibold border border-amber-200"
                    >
                      <UserCheck className="w-3 h-3 text-amber-600" />
                      <span>{t}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-blue-100 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs text-slate-500 font-medium">
              Option A connects your professional roles as your reader identity.
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-600 text-white text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5" /> All Set! Click Complete Setup
            </span>
          </div>
        </motion.div>
      )}

      {/* Option B View: Student Database Taxonomy (Exact same shape as Step 3) */}
      {readerType === "student" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
          {/* Header Definition Box for Student Taxonomy */}
          <div className="onb-leader-def-card">
            <div className="onb-leader-def-header">
              <div className="onb-leader-def-icon">
                <GraduationCap className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="onb-leader-def-title">Student &amp; Academic Reader Taxonomy</h3>
                <p className="text-xs text-slate-300">Understanding Academic Categories, Subcategories &amp; Individual Degrees</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
              <div className="onb-leader-def-item">
                <div className="onb-leader-def-item-title">
                  <Users className="w-4 h-4 text-sky-400" />
                  86 Categories
                </div>
                <p className="onb-leader-def-item-desc">
                  <strong>Community &amp; Academic Groups</strong> — Macro academic disciplines across 11 major groups.
                </p>
              </div>
              <div className="onb-leader-def-item">
                <div className="onb-leader-def-item-title">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  Subcategories
                </div>
                <p className="onb-leader-def-item-desc">
                  <strong>Sub-Functional Specializations</strong> — Departmental and degree program tracks.
                </p>
              </div>
              <div className="onb-leader-def-item">
                <div className="onb-leader-def-item-title">
                  <UserCheck className="w-4 h-4 text-amber-400" />
                  258 Titles / Degrees
                </div>
                <p className="onb-leader-def-item-desc">
                  <strong>Individual Degrees &amp; Exam Tracks</strong> — Specific qualifications searchable via live lookup.
                </p>
              </div>
            </div>
          </div>

          {/* Limit Error Alert Toast */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -6, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -6, height: 0 }}
                className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold flex items-center justify-between shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
                <button
                  onClick={() => setErrorMsg(null)}
                  className="text-red-500 hover:text-red-700 text-xs font-bold underline shrink-0 ml-2"
                >
                  Dismiss
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Title / Degree Live Search Box (258 Researched Titles Database) */}
          <div className="onb-title-search-container">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-blue-600" />
                <span>Search &amp; Choose Your Individual Degrees/Titles (From 258 Academic &amp; Exam Database)</span>
              </label>
              <span className="text-[11px] text-slate-500 font-semibold bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                Individual Degrees
              </span>
            </div>

            <div className="relative">
              <Search className="onb-search-icon" />
              <input
                type="text"
                value={titleSearch}
                onChange={(e) => {
                  setTitleSearch(e.target.value);
                  setShowTypeahead(true);
                }}
                onFocus={() => setShowTypeahead(true)}
                placeholder="Type to search from 258 individual degrees/titles (e.g. M.Tech VLSI, PhD Scholar, IAS Aspirant, MBBS)..."
                className="onb-search-input"
              />
              {titleSearch && (
                <button
                  type="button"
                  onClick={() => {
                    setTitleSearch("");
                    setShowTypeahead(false);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1.5 font-medium">
              <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>
                <strong>Categories &amp; Subcategories</strong> represent Academic Communities &amp; Groups, while <strong>Degrees &amp; Titles</strong> are Individual Qualifications from the 258 master list.
              </span>
            </p>

            {/* Live Typeahead Dropdown */}
            <AnimatePresence>
              {showTypeahead && titleSearch.trim().length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="onb-title-typeahead-dropdown"
                >
                  {searchResults.length > 0 ? (
                    searchResults.map((item) => {
                      const isSel = selectedTitles.includes(item.title);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            if (isSel) {
                              onRemoveTitle(item.title);
                            } else {
                              onAddTitle(item.title);
                            }
                            setTitleSearch("");
                            setShowTypeahead(false);
                          }}
                          className="onb-title-typeahead-item"
                        >
                          <div className="flex items-center gap-2">
                            {isSel ? (
                              <Check className="w-4 h-4 text-blue-600 shrink-0" />
                            ) : (
                              <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            )}
                            <span className="onb-title-typeahead-name">{item.title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="onb-title-typeahead-meta">{item.categoryName}</span>
                            <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                              {item.groupName}
                            </span>
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="p-3 text-center text-xs text-gray-500 font-medium">
                      No matching degrees/titles found for &quot;{titleSearch}&quot;
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Selected Searched Title Badges */}
            {selectedTitles.length > 0 && (
              <div className="onb-selected-titles-bar">
                <span className="text-xs font-semibold text-gray-500 flex items-center gap-1 self-center">
                  Selected Degrees/Titles:
                </span>
                {selectedTitles.map((title) => (
                  <span key={title} className="onb-title-chip">
                    <span>{title}</span>
                    <button
                      type="button"
                      onClick={() => onRemoveTitle(title)}
                      className="onb-title-chip-remove"
                      title="Remove degree"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 86 Categories across 11 Groups */}
          <div className="onb-continents">
            {STUDENT_GROUPS.map((group) => {
              const isOpen = openGroups.includes(group.id) || titleSearch.trim().length > 0;
              const groupSelectedCatsCount = group.categories.filter((c) => selectedCategories.includes(c.id)).length;
              const Icon = ICON_MAP[group.icon] || BookOpen;

              return (
                <div key={group.id} className="onb-continent">
                  <button
                    type="button"
                    onClick={() => toggleGroupAccordion(group.id)}
                    className="onb-continent-header"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-semibold shrink-0">
                        <Icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-bold text-[15px] text-slate-900">{group.name}</span>
                    </div>

                    <div className="flex items-center gap-3 ml-auto">
                      {groupSelectedCatsCount > 0 && (
                        <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                          {groupSelectedCatsCount} Selected
                        </span>
                      )}
                      <span className="onb-continent-count">{group.categories.length} Categories</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-gray-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3.5 bg-slate-50/50">
                          {group.categories.map((cat) => {
                            const isSel = selectedCategories.includes(cat.id);
                            const isDis = !isSel && isCategoryMaxed;
                            const CatIcon = ICON_MAP[cat.icon] || BookOpen;
                            const isSubcatOpen = openSubcatAccordions.includes(cat.id);
                            const catSubcatsSelected = selectedSubcategories[cat.id] || [];

                            return (
                              <div
                                key={cat.id}
                                className={`onb-leader-category-card ${isSel ? "selected" : ""} ${isDis ? "disabled" : ""}`}
                                onClick={() => handleCategoryClick(cat.id)}
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isSel ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>
                                      <CatIcon className="w-4 h-4" />
                                    </div>
                                    <div className="text-left">
                                      <span className="font-bold text-sm text-slate-900 block leading-snug">{cat.name}</span>
                                      <span className="text-[11px] text-slate-500 font-medium">{group.name}</span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 shrink-0">
                                    {isSel ? (
                                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center">
                                        <Check className="w-3.5 h-3.5" />
                                      </span>
                                    ) : (
                                      <span className="w-6 h-6 rounded-full border-2 border-slate-300" />
                                    )}
                                  </div>
                                </div>

                                {/* Subcategory Accordion toggle */}
                                {cat.subcategories.length > 0 && (
                                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                                    <span className={`onb-subcat-badge ${catSubcatsSelected.length > 0 ? "selected" : ""}`}>
                                      {catSubcatsSelected.length > 0
                                        ? `${catSubcatsSelected.length} Subcats Selected`
                                        : `${cat.subcategories.length} Subcategories`}
                                    </span>

                                    <button
                                      type="button"
                                      onClick={(e) => toggleSubcatAccordion(cat.id, e)}
                                      className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                    >
                                      <span>{isSubcatOpen ? "Hide Subcategories" : "View Subcategories"}</span>
                                      {isSubcatOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                    </button>
                                  </div>
                                )}

                                {/* Subcategories Accordion */}
                                <AnimatePresence>
                                  {isSubcatOpen && cat.subcategories.length > 0 && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.15 }}
                                      className="overflow-hidden mt-3"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <div className="onb-subcat-checklist">
                                        {cat.subcategories.map((subcat) => {
                                          const isSubSel = catSubcatsSelected.includes(subcat.name);
                                          return (
                                            <button
                                              key={subcat.id}
                                              type="button"
                                              onClick={() => {
                                                if (!isSel) {
                                                  if (!isCategoryMaxed) {
                                                    onToggleCategory(cat.id);
                                                  } else {
                                                    setErrorMsg(`Selection limit reached! Free readers can select up to ${FREE_STUDENT_CATEGORY_LIMIT} Student Categories.`);
                                                    return;
                                                  }
                                                }
                                                onToggleSubcategory(cat.id, subcat.name);
                                              }}
                                              className={`onb-subcat-item ${isSubSel ? "selected" : ""}`}
                                            >
                                              <span className="w-3.5 h-3.5 rounded border border-slate-300 flex items-center justify-center shrink-0 bg-white">
                                                {isSubSel && <Check className="w-2.5 h-2.5 text-blue-600 font-bold" />}
                                              </span>
                                              <span className="truncate">{subcat.name}</span>
                                            </button>
                                          );
                                        })}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* ============================
   POST-ONBOARDING COMPLETION SUMMARY MODAL
   ============================ */
function CompletionSummaryModal({
  sectorsCount,
  industriesCount,
  countriesCount,
  leaderCategoriesCount,
  leaderSubcategoriesCount,
  leaderTitlesCount,
  readerType,
  studentCategoriesCount,
  studentSubcategoriesCount,
  studentTitlesCount,
  onExploreFeed,
  onUpgradePlan,
}: {
  sectorsCount: number;
  industriesCount: number;
  countriesCount: number;
  leaderCategoriesCount: number;
  leaderSubcategoriesCount: number;
  leaderTitlesCount: number;
  readerType: "leader_professional" | "student";
  studentCategoriesCount: number;
  studentSubcategoriesCount: number;
  studentTitlesCount: number;
  onExploreFeed: () => void;
  onUpgradePlan: () => void;
}) {
  return (
    <div className="onb-modal-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="onb-modal-card"
      >
        <div className="onb-modal-header">
          <div className="onb-modal-celebration-badge">
            <Sparkles className="w-8 h-8 text-amber-300" />
          </div>
          <h2 className="onb-modal-title">🎉 Onboarding Setup Complete!</h2>
          <p className="onb-modal-subtitle">
            Your personalized trade intelligence profile is ready. Here is the summary of your choices across all 4 steps:
          </p>
        </div>

        {/* 4 Summary Cards Grid with exact numbers & totals */}
        <div className="onb-summary-grid">
          {/* Card 1 — Sectors & Industries */}
          <div className="onb-summary-card">
            <div className="onb-summary-card-header">
              <div className="onb-summary-card-icon">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="onb-summary-card-title">Step 1 — Sectors &amp; Industries</span>
            </div>
            <div className="onb-summary-stat-row">
              <span className="onb-summary-stat-label">Sectors Selected:</span>
              <span className="onb-summary-stat-value">{sectorsCount} / 50 Total</span>
            </div>
            <div className="onb-summary-stat-row">
              <span className="onb-summary-stat-label">Industries Selected:</span>
              <span className="onb-summary-stat-value">{industriesCount} / 1,350 Total</span>
            </div>
          </div>

          {/* Card 2 — Bilateral Countries */}
          <div className="onb-summary-card">
            <div className="onb-summary-card-header">
              <div className="onb-summary-card-icon">
                <Globe className="w-4 h-4" />
              </div>
              <span className="onb-summary-card-title">Step 2 — Bilateral Countries</span>
            </div>
            <div className="onb-summary-stat-row">
              <span className="onb-summary-stat-label">Trade Partner Countries:</span>
              <span className="onb-summary-stat-value">{countriesCount} / 195 Total</span>
            </div>
            <div className="onb-summary-stat-row">
              <span className="onb-summary-stat-label">Free Reader Limit:</span>
              <span className="onb-summary-stat-value">Max 10 Total (2 Top 10 + 8 Other)</span>
            </div>
          </div>

          {/* Card 3 — Leader Roles */}
          <div className="onb-summary-card">
            <div className="onb-summary-card-header">
              <div className="onb-summary-card-icon">
                <Crown className="w-4 h-4" />
              </div>
              <span className="onb-summary-card-title">Step 3 — Leader Roles</span>
            </div>
            <div className="onb-summary-stat-row">
              <span className="onb-summary-stat-label">Leader Categories:</span>
              <span className="onb-summary-stat-value">{leaderCategoriesCount} / 66 Total</span>
            </div>
            <div className="onb-summary-stat-row">
              <span className="onb-summary-stat-label">Subcategories Selected:</span>
              <span className="onb-summary-stat-value">{leaderSubcategoriesCount} / 294 Total</span>
            </div>
            <div className="onb-summary-stat-row">
              <span className="onb-summary-stat-label">Searched Leader Titles:</span>
              <span className="onb-summary-stat-value">{leaderTitlesCount} / 1,233 Database</span>
            </div>
          </div>

          {/* Card 4 — Reader Identity */}
          <div className="onb-summary-card">
            <div className="onb-summary-card-header">
              <div className="onb-summary-card-icon">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="onb-summary-card-title">Step 4 — Reader Identity</span>
            </div>
            <div className="onb-summary-stat-row">
              <span className="onb-summary-stat-label">Reader Profile Type:</span>
              <span className="onb-summary-stat-value">
                {readerType === "leader_professional" ? "Working Professional" : "Student / Researcher"}
              </span>
            </div>
            {readerType === "student" ? (
              <>
                <div className="onb-summary-stat-row">
                  <span className="onb-summary-stat-label">Student Categories:</span>
                  <span className="onb-summary-stat-value">{studentCategoriesCount} / 86 Total</span>
                </div>
                <div className="onb-summary-stat-row">
                  <span className="onb-summary-stat-label">Searched Degrees/Titles:</span>
                  <span className="onb-summary-stat-value">{studentTitlesCount} / 258 Database</span>
                </div>
              </>
            ) : (
              <div className="onb-summary-stat-row">
                <span className="onb-summary-stat-label">Identity Connection:</span>
                <span className="onb-summary-stat-value text-blue-600">Connected to Step 3 Roles</span>
              </div>
            )}
          </div>
        </div>

        {/* Upgrade Plan CTA Card */}
        <div className="onb-modal-cta-box">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold shrink-0">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Want Unlimited Intelligence &amp; Full Database Access?</h4>
              <p className="text-xs text-slate-300">
                Upgrade to Pro or Enterprise to track unlimited sectors, 195 bilateral countries, and all 1,233 leader roles.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onUpgradePlan}
            className="onb-modal-cta-btn-secondary shrink-0 bg-amber-400 hover:bg-amber-300 text-slate-950 border-none font-extrabold"
          >
            <Sparkles className="w-4 h-4 text-slate-900" />
            Upgrade Plan Now
          </button>
        </div>

        {/* Primary Action Button */}
        <button
          type="button"
          onClick={onExploreFeed}
          className="onb-modal-cta-btn-primary"
        >
          <span>Explore My Personalized Newsfeed</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
}

/* ============================
   MAIN ONBOARDING PAGE
   ============================ */
export default function OnboardingPage() {
  const { user, updateOnboarding } = useAuth();
  const { completeOnboarding } = useActiveMode();
  const router = useRouter();

  // step: 1 = Sectors & Industries, 2 = Countries, 3 = Leaders, 4 = Reader Identity
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [sectors, setSectors] = useState<string[]>(user?.sectors || []);
  const [industries, setIndustries] = useState<Record<string, string[]>>(user?.industries || {});
  const [countries, setCountries] = useState<string[]>(user?.countries || []);
  
  // Step 3 state
  const [leaderCategories, setLeaderCategories] = useState<string[]>(user?.leaderCategories || []);
  const [leaderSubcategories, setLeaderSubcategories] = useState<Record<string, string[]>>(user?.leaderSubcategories || {});
  const [leaderTitles, setLeaderTitles] = useState<string[]>(user?.leaderTitles || []);

  // Step 4 state
  const [readerType, setReaderType] = useState<"leader_professional" | "student">(user?.readerType || "leader_professional");
  const [readerCategories, setReaderCategories] = useState<string[]>(user?.readerCategories || []);
  const [readerSubcategories, setReaderSubcategories] = useState<Record<string, string[]>>(user?.readerSubcategories || {});
  const [readerTitles, setReaderTitles] = useState<string[]>(user?.readerTitles || []);

  const [saving, setSaving] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const TOTAL_STEPS = 4;

  const totalIndustriesSelected = useMemo(() => {
    return Object.values(industries).reduce((sum, arr) => sum + (arr?.length || 0), 0);
  }, [industries]);

  const totalLeaderSubcatsSelected = useMemo(() => {
    return Object.values(leaderSubcategories).reduce((sum, arr) => sum + (arr?.length || 0), 0);
  }, [leaderSubcategories]);

  const totalStudentSubcatsSelected = useMemo(() => {
    return Object.values(readerSubcategories).reduce((sum, arr) => sum + (arr?.length || 0), 0);
  }, [readerSubcategories]);

  const toggleSector = (id: string) => {
    setSectors((prev) => {
      if (prev.includes(id)) {
        setIndustries((ind) => {
          const next = { ...ind };
          delete next[id];
          return next;
        });
        return prev.filter((x) => x !== id);
      }
      return [...prev, id];
    });
  };

  const toggleIndustry = (sectorId: string, industryId: string) => {
    setIndustries((prev) => {
      const current = prev[sectorId] || [];
      if (current.includes(industryId)) {
        const nextIndustries = current.filter((x) => x !== industryId);
        if (nextIndustries.length === 0) {
          setSectors((sec) => sec.filter((x) => x !== sectorId));
        }
        return { ...prev, [sectorId]: nextIndustries };
      }
      if (current.length >= FREE_INDUSTRIES_PER_SECTOR) return prev;
      return { ...prev, [sectorId]: [...current, industryId] };
    });
  };

  const toggleLeaderCategory = (catId: string) => {
    setLeaderCategories((prev) => {
      if (prev.includes(catId)) {
        setLeaderSubcategories((sub) => {
          const next = { ...sub };
          delete next[catId];
          return next;
        });
        return prev.filter((x) => x !== catId);
      }
      if (prev.length >= FREE_LEADER_CATEGORY_LIMIT) return prev;
      return [...prev, catId];
    });
  };

  const toggleLeaderSubcategory = (catId: string, subcatName: string) => {
    setLeaderSubcategories((prev) => {
      const current = prev[catId] || [];
      if (current.includes(subcatName)) {
        const nextSubcats = current.filter((x) => x !== subcatName);
        return { ...prev, [catId]: nextSubcats };
      }
      return { ...prev, [catId]: [...current, subcatName] };
    });
  };

  const addLeaderTitle = (title: string) => {
    if (!leaderTitles.includes(title)) {
      setLeaderTitles((prev) => [...prev, title]);
    }
  };

  const removeLeaderTitle = (title: string) => {
    setLeaderTitles((prev) => prev.filter((t) => t !== title));
  };

  // Student taxonomy toggles
  const toggleStudentCategory = (catId: string) => {
    setReaderCategories((prev) => {
      if (prev.includes(catId)) {
        setReaderSubcategories((sub) => {
          const next = { ...sub };
          delete next[catId];
          return next;
        });
        return prev.filter((x) => x !== catId);
      }
      if (prev.length >= FREE_STUDENT_CATEGORY_LIMIT) return prev;
      return [...prev, catId];
    });
  };

  const toggleStudentSubcategory = (catId: string, subcatName: string) => {
    setReaderSubcategories((prev) => {
      const current = prev[catId] || [];
      if (current.includes(subcatName)) {
        const nextSubcats = current.filter((x) => x !== subcatName);
        return { ...prev, [catId]: nextSubcats };
      }
      return { ...prev, [catId]: [...current, subcatName] };
    });
  };

  const addStudentTitle = (title: string) => {
    if (!readerTitles.includes(title)) {
      setReaderTitles((prev) => [...prev, title]);
    }
  };

  const removeStudentTitle = (title: string) => {
    setReaderTitles((prev) => prev.filter((t) => t !== title));
  };

  const toggleItem = (list: string[], setList: (v: string[]) => void, id: string) => {
    setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  };

  const canProceed = () => {
    if (step === 1) return sectors.length > 0;
    if (step === 2) return countries.length > 0;
    if (step === 3) return true;
    if (step === 4) return true;
    return false;
  };

  const handleNext = async () => {
    if (step < TOTAL_STEPS) {
      setDirection(1);
      setStep(step + 1);
      return;
    }

    // Final step — save everything and show completion modal
    setSaving(true);
    try {
      await updateOnboarding({
        sectors,
        industries,
        countries,
        leaders: [...leaderCategories, ...leaderTitles],
        leaderCategories,
        leaderSubcategories,
        leaderTitles,
        readerType,
        readerCategories: readerType === "student" ? readerCategories : leaderCategories,
        readerSubcategories: readerType === "student" ? readerSubcategories : leaderSubcategories,
        readerTitles: readerType === "student" ? readerTitles : leaderTitles,
        accountType: "reader",
        accountTypeSelectedAt: new Date().toISOString(),
        onboardingComplete: true,
      });
      completeOnboarding();
      setSaving(false);
      setShowCompletionModal(true);
    } catch (error) {
      console.error("Error saving onboarding data:", error);
      setSaving(false);
    }
  };

  const goNext = () => handleNext();

  const goBack = () => {
    setDirection(-1);
    setStep(step - 1);
  };

  const isFirstScreen = step === 1;
  const isLastScreen = step === TOTAL_STEPS;

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  const stepLabel = () => {
    if (step === 1) return "Step 1 of 4 — Sectors & Industries";
    if (step === 2) return "Step 2 of 4 — Bilateral Countries";
    if (step === 3) return "Step 3 of 4 — Leaders";
    return "Step 4 of 4 — Reader Identity";
  };

  return (
    <div className="onb-container">
      {/* Header with Nav Buttons */}
      <div className="onb-header">
        <div className="onb-header-brand">
          <Newspaper className="w-6 h-6 text-[var(--color-secondary)]" />
          <span>IGENews</span>
        </div>

        {/* Top RHS Header Actions */}
        <div className="onb-header-actions">
          <div className="onb-header-step">{stepLabel()}</div>
          {!isFirstScreen && (
            <button onClick={goBack} className="onb-btn-back-sm">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>
          )}
          <button
            onClick={goNext}
            disabled={!canProceed() || saving}
            className="onb-btn-next-sm"
          >
            {saving ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : isLastScreen ? (
              <>
                Complete Setup
                <Check className="w-4 h-4" />
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Progress */}
      <ProgressBar step={step} />

      {/* Content */}
      <div className="onb-content">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {step === 1 && (
              <SectorAndIndustryStep
                selectedSectors={sectors}
                selectedIndustries={industries}
                onToggleSector={toggleSector}
                onToggleIndustry={toggleIndustry}
              />
            )}
            {step === 2 && (
              <CountryStep
                selected={countries}
                onToggle={(name) => toggleItem(countries, setCountries, name)}
              />
            )}
            {step === 3 && (
              <LeaderStep
                selectedCategories={leaderCategories}
                selectedSubcategories={leaderSubcategories}
                selectedTitles={leaderTitles}
                onToggleCategory={toggleLeaderCategory}
                onToggleSubcategory={toggleLeaderSubcategory}
                onAddTitle={addLeaderTitle}
                onRemoveTitle={removeLeaderTitle}
              />
            )}
            {step === 4 && (
              <ReaderStep
                readerType={readerType}
                setReaderType={setReaderType}
                selectedCategories={readerCategories}
                selectedSubcategories={readerSubcategories}
                selectedTitles={readerTitles}
                onToggleCategory={toggleStudentCategory}
                onToggleSubcategory={toggleStudentSubcategory}
                onAddTitle={addStudentTitle}
                onRemoveTitle={removeStudentTitle}
                leaderSelectedCategories={leaderCategories}
                leaderSelectedSubcategories={leaderSubcategories}
                leaderSelectedTitles={leaderTitles}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Completion Summary Modal */}
      <AnimatePresence>
        {showCompletionModal && (
          <CompletionSummaryModal
            sectorsCount={sectors.length}
            industriesCount={totalIndustriesSelected}
            countriesCount={countries.length}
            leaderCategoriesCount={leaderCategories.length}
            leaderSubcategoriesCount={totalLeaderSubcatsSelected}
            leaderTitlesCount={leaderTitles.length}
            readerType={readerType}
            studentCategoriesCount={readerCategories.length}
            studentSubcategoriesCount={totalStudentSubcatsSelected}
            studentTitlesCount={readerTitles.length}
            onExploreFeed={() => router.push("/")}
            onUpgradePlan={() => router.push("/about-igen/reader-plans")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
