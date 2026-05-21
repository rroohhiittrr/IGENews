"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth, type AccountType } from "@/contexts/AuthContext";
import { SECTORS, FREE_SECTOR_LIMIT } from "@/lib/sectors";
import { TOP_10_COUNTRIES, COUNTRIES_BY_CONTINENT, FREE_COUNTRY_LIMIT, type Country } from "@/lib/countries";
import { LEADER_ROLES, FREE_LEADER_LIMIT } from "@/lib/leaderRoles";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Check, Search, ChevronDown, ChevronUp, Newspaper,
  // Sector icons
  Factory, ShoppingBag, Cpu, Briefcase, GraduationCap, Wheat, HeartPulse,
  Zap, Building2, Shield, FlaskConical, CircuitBoard, Globe, Leaf, Droplet,
  Droplets, Plane, Mountain, Radio, Radar, SunMedium, TreePine, Sprout, Fish,
  ShoppingCart, UtensilsCrossed, Activity, Tv, Users, Cog, Wind, Flame, Pill,
  Ship, BatteryCharging, Rocket, BarChart3, Layers, MapPin, Landmark, CreditCard,
  Truck, Train, Car, Lightbulb, Store, Recycle,
  // Leader icons
  BookOpen, UserCheck, UserPlus, Crown, Code, Settings, DollarSign, Megaphone,
  Building, Award, TrendingUp, LayoutGrid, Target, Package, Monitor, FileEdit,
  Mic, ClipboardList, User,
  // Account Type icons
  Eye, Microscope, Star, BarChart2, Users2,
  Microchip, Pickaxe, TestTube,
  type LucideIcon,
} from "lucide-react";
import "./onboarding.css";

/* ============================
   ICON MAP
   ============================ */
const ICON_MAP: Record<string, LucideIcon> = {
  // Sectors
  Factory, ShoppingBag, Cpu, Briefcase, GraduationCap, Wheat, HeartPulse,
  Zap, Building2, Shield, FlaskConical, CircuitBoard, Globe, Leaf, Droplet,
  Droplets, Plane, Mountain, Radio, Radar, SunMedium, TreePine, Sprout, Fish,
  ShoppingCart, UtensilsCrossed, Activity, Tv, Users, Cog, Wind, Flame, Pill,
  Ship, BatteryCharging, Rocket, BarChart3, Layers, MapPin, Landmark, CreditCard,
  Truck, Train, Car, Lightbulb, Store, Recycle,
  Microchip, Pickaxe, TestTube,
  // Leaders
  BookOpen, UserCheck, UserPlus, Crown, Code, Settings, DollarSign, Megaphone,
  Building, Award, TrendingUp, LayoutGrid, Target, Package, Monitor, FileEdit,
  Mic, ClipboardList, User,
};

/* ============================
   ACCOUNT TYPE DEFINITIONS
   ============================ */
interface AccountTypeOption {
  id: AccountType;
  label: string;
  icon: LucideIcon;
  description: string;
  badge: string;
}

const ACCOUNT_TYPES: AccountTypeOption[] = [
  {
    id: "reader",
    label: "Reader",
    icon: Eye,
    description: "Stay informed with curated trade news, sector insights, and global market intelligence tailored to your interests.",
    badge: "General Access",
  },
  {
    id: "sme",
    label: "SME",
    icon: Microscope,
    description: "Subject Matter Expert — contribute analysis, insights, and expert commentary across your domain sectors.",
    badge: "Expert Contributor",
  },
  {
    id: "associate-sme",
    label: "Associate SME",
    icon: Star,
    description: "Associate Subject Matter Expert — growing professional with domain knowledge, supporting expert-level contributions.",
    badge: "Associate Contributor",
  },
  {
    id: "company",
    label: "Company",
    icon: Building2,
    description: "Represent your organisation — access B2B intelligence, trade data, and company-level insights and analytics.",
    badge: "Business Account",
  },
  {
    id: "leader",
    label: "Leader",
    icon: Crown,
    description: "C-Suite, Founders, MDs and key decision-makers — get executive-level intelligence and strategic market signals.",
    badge: "Executive Access",
  },
];

/* ============================
   PROGRESS BAR (4 steps)
   ============================ */
function ProgressBar({ step }: { step: number }) {
  const steps = ["Sectors", "Countries", "Leaders", "Account"];
  return (
    <div className="onb-progress">
      <div className="onb-progress-bar">
        <div className="onb-progress-fill" style={{ width: `${(step / 4) * 100}%` }} />
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
   STEP 1 — SECTORS (50 items, select up to 5)
   ============================ */
function SectorStep({ selected, onToggle }: { selected: string[]; onToggle: (id: string) => void }) {
  const [search, setSearch] = useState("");
  const isMaxed = selected.length >= FREE_SECTOR_LIMIT;

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return SECTORS;
    return SECTORS.filter(
      (s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="onb-step">
      <div className="onb-step-header">
        <h2>Select Your Sectors</h2>
        <p>Choose up to {FREE_SECTOR_LIMIT} industries you want to follow</p>
        <div className="onb-counter">
          Selected: <strong>{selected.length}</strong> / {FREE_SECTOR_LIMIT}
        </div>
      </div>

      {/* Search */}
      <div className="onb-search" style={{ marginBottom: 20 }}>
        <Search className="onb-search-icon" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search from 50 sectors..."
          className="onb-search-input"
        />
      </div>

      <div className="onb-sector-grid">
        {filtered.map((sector) => {
          const isSelected = selected.includes(sector.id);
          const isDisabled = !isSelected && isMaxed;
          const Icon = ICON_MAP[sector.icon] || Briefcase;

          return (
            <motion.button
              key={sector.id}
              whileHover={!isDisabled ? { scale: 1.02 } : undefined}
              whileTap={!isDisabled ? { scale: 0.98 } : undefined}
              onClick={() => !isDisabled && onToggle(sector.id)}
              className={`onb-sector-card ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""}`}
              title={isDisabled ? `Free plan allows up to ${FREE_SECTOR_LIMIT} sectors.` : undefined}
            >
              <div className="onb-sector-icon">
                <Icon className="w-5 h-5" />
              </div>
              <h3>{sector.name}</h3>
              <p>{sector.description}</p>
              {isSelected && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="onb-sector-check">
                  <Check className="w-3 h-3" />
                </motion.div>
              )}
              {isDisabled && (
                <div className="onb-sector-tooltip">Max {FREE_SECTOR_LIMIT} sectors</div>
              )}
            </motion.button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: "center", color: "var(--color-neutral-mid)", marginTop: 32 }}>
          No sectors found for "{search}"
        </p>
      )}
    </div>
  );
}

/* ============================
   STEP 2 — COUNTRIES (up to 10)
   ============================ */
function CountryStep({ selected, onToggle }: { selected: string[]; onToggle: (name: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openContinents, setOpenContinents] = useState<string[]>([]);
  const isMaxed = selected.length >= FREE_COUNTRY_LIMIT;

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

  const CountryButton = ({ country }: { country: Country }) => {
    const isSel = selected.includes(country.name);
    const isDis = !isSel && isMaxed;
    return (
      <button
        onClick={() => !isDis && onToggle(country.name)}
        className={`onb-country-item ${isSel ? "selected" : ""} ${isDis ? "disabled" : ""}`}
        title={isDis ? `You can select up to ${FREE_COUNTRY_LIMIT} countries.` : undefined}
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
        <h2>Select Your Countries</h2>
        <p>Choose up to {FREE_COUNTRY_LIMIT} countries whose trade news matters to you</p>
        <div className="onb-counter">
          Selected: <strong>{selected.length}</strong> / {FREE_COUNTRY_LIMIT}
        </div>
      </div>

      {/* Top 10 */}
      <div className="onb-top10">
        <h3 className="onb-section-label">🔥 Top 10 Countries</h3>
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
          placeholder="Search from 195 countries..."
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
   STEP 3 — LEADERS (select up to FREE_LEADER_LIMIT)
   ============================ */
function LeaderStep({ selected, onToggle }: { selected: string[]; onToggle: (id: string) => void }) {
  const [search, setSearch] = useState("");
  const isMaxed = selected.length >= FREE_LEADER_LIMIT;

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return LEADER_ROLES;
    return LEADER_ROLES.filter((r) => r.name.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="onb-step">
      <div className="onb-step-header">
        <h2>Select Leader Roles</h2>
        <p>Choose the leadership positions you identify with or want to follow</p>
        <div className="onb-counter">
          Selected: <strong>{selected.length}</strong> / {FREE_LEADER_LIMIT}
        </div>
      </div>

      {/* Search */}
      <div className="onb-search" style={{ marginBottom: 20 }}>
        <Search className="onb-search-icon" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search roles..."
          className="onb-search-input"
        />
      </div>

      <div className="onb-leader-grid">
        {filtered.map((role) => {
          const isSel = selected.includes(role.id);
          const isDis = !isSel && isMaxed;
          const Icon = ICON_MAP[role.icon] || UserCheck;

          return (
            <motion.button
              key={role.id}
              whileHover={!isDis ? { scale: 1.03 } : undefined}
              whileTap={!isDis ? { scale: 0.97 } : undefined}
              onClick={() => !isDis && onToggle(role.id)}
              className={`onb-leader-chip ${isSel ? "selected" : ""} ${isDis ? "disabled" : ""}`}
              title={isDis ? `You can select up to ${FREE_LEADER_LIMIT} roles.` : undefined}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{role.name}</span>
              {isSel && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ marginLeft: "auto" }}>
                  <Check className="w-3.5 h-3.5 shrink-0" />
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: "center", color: "var(--color-neutral-mid)", marginTop: 32 }}>
          No roles found for "{search}"
        </p>
      )}

      {isMaxed && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="onb-limit-msg"
        >
          You can select up to {FREE_LEADER_LIMIT} roles. Upgrade later for more!
        </motion.p>
      )}
    </div>
  );
}

/* ============================
   STEP 4 — PRIMARY ACCOUNT SELECTION
   ============================ */
function AccountTypeStep({
  selected,
  onSelect,
}: {
  selected: AccountType | null;
  onSelect: (type: AccountType) => void;
}) {
  return (
    <div className="onb-step">
      <div className="onb-step-header">
        <h2>Primary Account Type</h2>
        <p>Select one account type — this defines your dashboard and profile structure</p>
      </div>

      <div className="onb-account-grid">
        {ACCOUNT_TYPES.map((type) => {
          const Icon = type.icon;
          const isSel = selected === type.id;

          return (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => onSelect(type.id)}
              className={`onb-account-card ${isSel ? "selected" : ""}`}
            >
              <div className="onb-account-icon-wrap">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <div className="onb-account-card-title">{type.label}</div>
                <div className="onb-account-card-desc">{type.description}</div>
                <span className="onb-account-badge">{type.badge}</span>
              </div>
              {isSel && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="onb-account-check">
                  <Check className="w-4 h-4" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      <p className="onb-single-note">
        ✦ You can only select one account type &nbsp;·&nbsp; You can update this later from your profile
      </p>
    </div>
  );
}

/* ============================
   MAIN ONBOARDING PAGE
   ============================ */
export default function OnboardingPage() {
  const { updateOnboarding, user } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [sectors, setSectors] = useState<string[]>(user?.sectors || []);
  const [countries, setCountries] = useState<string[]>(user?.countries || []);
  const [leaders, setLeaders] = useState<string[]>(user?.leaders || []);
  const [accountType, setAccountType] = useState<AccountType | null>(user?.accountType || null);
  const [saving, setSaving] = useState(false);

  const TOTAL_STEPS = 4;

  const toggleItem = (list: string[], setList: (v: string[]) => void, id: string) => {
    setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  };

  const canProceed = () => {
    if (step === 1) return sectors.length > 0;
    if (step === 2) return countries.length > 0;
    if (step === 3) return leaders.length > 0;
    if (step === 4) return accountType !== null;
    return false;
  };

  const handleNext = async () => {
    if (step < TOTAL_STEPS) {
      setDirection(1);
      setStep(step + 1);
      return;
    }

    // Final step — save everything
    setSaving(true);
    try {
      await updateOnboarding({
        sectors,
        countries,
        leaders,
        accountType: accountType!,
        accountTypeSelectedAt: new Date().toISOString(),
        onboardingComplete: true,
      });
      await new Promise((r) => setTimeout(r, 400));
      router.push("/");
    } catch (error) {
      console.error("Error saving onboarding data:", error);
      setSaving(false);
    }
  };

  const goNext = () => {
    setDirection(1);
    handleNext();
  };

  const goBack = () => {
    setDirection(-1);
    setStep(step - 1);
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="onb-container">
      {/* Header */}
      <div className="onb-header">
        <div className="onb-header-brand">
          <Newspaper className="w-6 h-6 text-[var(--color-secondary)]" />
          <span>IGENews</span>
        </div>
        <div className="onb-header-step">Step {step} of {TOTAL_STEPS}</div>
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
              <SectorStep
                selected={sectors}
                onToggle={(id) => toggleItem(sectors, setSectors, id)}
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
                selected={leaders}
                onToggle={(id) => toggleItem(leaders, setLeaders, id)}
              />
            )}
            {step === 4 && (
              <AccountTypeStep
                selected={accountType}
                onSelect={setAccountType}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="onb-footer">
        {step > 1 ? (
          <button onClick={goBack} className="onb-btn-back">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        ) : (
          <div />
        )}
        <button
          onClick={goNext}
          disabled={!canProceed() || saving}
          className="onb-btn-next"
        >
          {saving ? (
            <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : step === TOTAL_STEPS ? (
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
  );
}
