"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { SECTORS, FREE_SECTOR_LIMIT } from "@/lib/sectors";
import { TOP_10_COUNTRIES, COUNTRIES_BY_CONTINENT, FREE_COUNTRY_LIMIT, type Country } from "@/lib/countries";
import { LEADER_ROLES, FREE_LEADER_LIMIT } from "@/lib/leaderRoles";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Check, Search, ChevronDown, ChevronUp, Newspaper,
  Factory, ShoppingBag, Cpu, Briefcase, GraduationCap, Wheat, HeartPulse,
  Zap, Building2, Shield, FlaskConical, CircuitBoard,
  UserCheck, Rocket, Users, Crown, Building, Settings, DollarSign, Code,
  Megaphone, Heart, Monitor, TrendingUp, LayoutGrid, Banknote, Landmark,
  type LucideIcon,
} from "lucide-react";
import "./onboarding.css";

/* ============================
   ICON MAP
   ============================ */
const ICON_MAP: Record<string, LucideIcon> = {
  Factory, ShoppingBag, Cpu, Briefcase, GraduationCap, Wheat, HeartPulse,
  Zap, Building2, Shield, FlaskConical, CircuitBoard,
  UserCheck, Rocket, Users, Crown, Building, Settings, DollarSign, Code,
  Megaphone, Heart, Monitor, TrendingUp, LayoutGrid, Banknote, Landmark,
};

/* ============================
   PROGRESS BAR
   ============================ */
function ProgressBar({ step }: { step: number }) {
  const steps = ["Sectors", "Countries", "Leaders"];
  return (
    <div className="onb-progress">
      <div className="onb-progress-bar">
        <div className="onb-progress-fill" style={{ width: `${(step / 3) * 100}%` }} />
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
   STEP 1 — SECTORS
   ============================ */
function SectorStep({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (id: string) => void;
}) {
  const isMaxed = selected.length >= FREE_SECTOR_LIMIT;

  return (
    <div className="onb-step">
      <div className="onb-step-header">
        <h2>Select Your Sectors</h2>
        <p>Choose the industries you want to follow</p>
        <div className="onb-counter">
          Selected: <strong>{selected.length}</strong> / {FREE_SECTOR_LIMIT}
        </div>
      </div>

      <div className="onb-sector-grid">
        {SECTORS.map((sector) => {
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
              title={isDisabled ? "Free plan allows up to 2 sectors." : undefined}
            >
              <div className="onb-sector-icon">
                <Icon className="w-6 h-6" />
              </div>
              <h3>{sector.name}</h3>
              <p>{sector.description}</p>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="onb-sector-check"
                >
                  <Check className="w-3.5 h-3.5" />
                </motion.div>
              )}
              {isDisabled && (
                <div className="onb-sector-tooltip">
                  Free plan: max 2 sectors
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ============================
   STEP 2 — COUNTRIES
   ============================ */
function CountryStep({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (name: string) => void;
}) {
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
        title={isDis ? "Free plan allows up to 2 countries." : undefined}
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
        <p>Choose the countries whose trade news matters to you</p>
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
              <button
                onClick={() => toggleContinent(group.continent)}
                className="onb-continent-header"
              >
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
   STEP 3 — LEADERS
   ============================ */
function LeaderStep({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (id: string) => void;
}) {
  const isMaxed = selected.length >= FREE_LEADER_LIMIT;

  return (
    <div className="onb-step">
      <div className="onb-step-header">
        <h2>Select Leader Roles</h2>
        <p>Follow news about these leadership positions</p>
        <div className="onb-counter">
          Selected: <strong>{selected.length}</strong> / {FREE_LEADER_LIMIT}
        </div>
      </div>

      <div className="onb-leader-grid">
        {LEADER_ROLES.map((role) => {
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
              title={isDis ? "Free plan allows up to 5 leader roles." : undefined}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{role.name}</span>
              {isSel && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <Check className="w-3.5 h-3.5 shrink-0" />
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      {isMaxed && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="onb-limit-msg"
        >
          Free plan allows up to {FREE_LEADER_LIMIT} leader roles. Upgrade later for more!
        </motion.p>
      )}
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
  const [sectors, setSectors] = useState<string[]>(user?.sectors || []);
  const [countries, setCountries] = useState<string[]>(user?.countries || []);
  const [leaders, setLeaders] = useState<string[]>(user?.leaders || []);
  const [saving, setSaving] = useState(false);

  const toggleItem = (list: string[], setList: (v: string[]) => void, id: string) => {
    setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  };

  const canProceed = () => {
    if (step === 1) return sectors.length > 0;
    if (step === 2) return countries.length > 0;
    if (step === 3) return leaders.length > 0;
    return false;
  };

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    // Final step — save
    setSaving(true);
    try {
      await updateOnboarding({
        sectors,
        countries,
        leaders,
        onboardingComplete: true,
      });
      
      // Small delay to ensure data is saved
      await new Promise((r) => setTimeout(r, 500));
      router.push("/");
    } catch (error) {
      console.error("Error saving onboarding data:", error);
      setSaving(false);
      // Could add error state here if needed
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? -300 : 300, opacity: 0 }),
  };

  const [direction, setDirection] = useState(1);

  const goNext = () => {
    setDirection(1);
    handleNext();
  };

  const goBack = () => {
    setDirection(-1);
    setStep(step - 1);
  };

  return (
    <div className="onb-container">
      {/* Header */}
      <div className="onb-header">
        <div className="onb-header-brand">
          <Newspaper className="w-6 h-6 text-[var(--color-secondary)]" />
          <span>IGENews</span>
        </div>
        <div className="onb-header-step">Step {step} of 3</div>
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
          ) : step === 3 ? (
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
