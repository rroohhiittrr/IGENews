"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  User, Bell, Shield, Globe, Eye, EyeOff, Save, ChevronRight,
  Moon, Sun, Building2, Lock, Zap, ArrowRight, Clock, Crown,
  BookOpen, Star, Users, Briefcase,
} from "lucide-react";

type SettingsTab = "account" | "interests" | "account-type" | "notifications" | "privacy" | "preferences";

const TABS: { id: SettingsTab; icon: any; label: string; badge?: string }[] = [
  { id: "account",       icon: User,      label: "Account" },
  { id: "interests",     icon: Globe,     label: "My Interests",   badge: "FREE" },
  { id: "account-type",  icon: Crown,     label: "Account Type",   badge: "FREE" },
  { id: "notifications", icon: Bell,      label: "Notifications" },
  { id: "privacy",       icon: Shield,    label: "Privacy" },
  { id: "preferences",   icon: Globe,     label: "Preferences" },
];

/* ─── helpers ─────────────────────────────────── */
function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className={`w-12 h-6 rounded-full relative transition-colors ${on ? "bg-[#1E3A5F]" : "bg-gray-200"}`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${on ? "translate-x-7" : "translate-x-1"}`} />
    </button>
  );
}
function Row({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0 gap-4">
      <div><p className="text-sm font-semibold text-[#1E3A5F]">{label}</p>{desc && <p className="text-xs text-gray-400 mt-0.5">{desc}</p>}</div>
      {children}
    </div>
  );
}

/* ─── Locked Interest Section ─────────────────── */
function LockedInterestSection({
  icon: Icon, title, color, bg, items, daysLeft,
}: {
  icon: any; title: string; color: string; bg: string; items: string[]; daysLeft: number;
}) {
  const isLocked = daysLeft > 0;
  return (
    <div className={`rounded-2xl border-2 ${isLocked ? "border-dashed border-gray-200 bg-gray-50" : "border-[#1E3A5F]/20 bg-white"} p-5 mb-5`}>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-xl ${bg} ${color} flex items-center justify-center`}><Icon className="w-4 h-4" /></div>
          <h3 className="font-bold text-[#1E3A5F] text-sm">{title}</h3>
        </div>
        {isLocked ? (
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs font-bold text-amber-700">Editable in {daysLeft} days</span>
          </div>
        ) : (
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">Available to edit</span>
        )}
      </div>

      {/* Current selections */}
      <div className="flex flex-wrap gap-2 mb-4">
        {items.length > 0 ? items.map(item => (
          <span key={item} className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize ${isLocked ? "bg-gray-200 text-gray-500" : "bg-[#1E3A5F] text-white"}`}>
            {item.replace(/-/g, " ")}
          </span>
        )) : <span className="text-xs text-gray-400 italic">None selected</span>}
      </div>

      {/* Free plan restriction note */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
        <p className="text-xs text-gray-500 leading-relaxed">
          <span className="font-bold text-[#1E3A5F]">Free Plan Restriction:</span> On the Free plan, you can only edit your {title.toLowerCase()} once every 60 days. Your next edit window opens in <span className="font-bold text-amber-600">{daysLeft} days</span>.
        </p>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button disabled className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-200 text-gray-400 text-sm font-bold rounded-xl cursor-not-allowed">
          <Lock className="w-4 h-4" /> Edit {title}
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-[#1E3A5F] to-[#2F6FA3] text-white text-sm font-bold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all">
          <Zap className="w-4 h-4 text-[#F4A024]" /> Upgrade to Edit Anytime <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ─── Role Combination Card ───────────────────── */
type RoleCombo = {
  id: string;
  roles: { label: string; icon: any; color: string; bg: string }[];
  desc: string;
  isCurrent?: boolean;
  requiresUpgrade: boolean;
  upgradeNote?: string;
};

const ROLE_COMBOS: RoleCombo[] = [
  {
    id: "free-reader",
    roles: [{ label: "Free Reader", icon: BookOpen, color: "text-slate-700", bg: "bg-slate-100" }],
    desc: "Basic news access only. Read industry headlines and follow sectors.",
    isCurrent: true,
    requiresUpgrade: false,
  },
  {
    id: "pro-reader",
    roles: [{ label: "Pro Reader", icon: Star, color: "text-blue-700", bg: "bg-blue-100" }],
    desc: "Premium content, reports, and advanced sector feeds.",
    requiresUpgrade: true,
    upgradeNote: "Upgrade to Pro",
  },
  {
    id: "pro-associate-sme",
    roles: [
      { label: "Pro Reader", icon: Star, color: "text-blue-700", bg: "bg-blue-100" },
      { label: "Associate SME", icon: Users, color: "text-violet-700", bg: "bg-violet-100" },
    ],
    desc: "10+ years expert. Publish articles and build authority.",
    requiresUpgrade: true,
    upgradeNote: "Requires Pro + Associate SME",
  },
  {
    id: "pro-sme",
    roles: [
      { label: "Pro Reader", icon: Star, color: "text-blue-700", bg: "bg-blue-100" },
      { label: "SME", icon: Users, color: "text-emerald-700", bg: "bg-emerald-100" },
    ],
    desc: "20+ years expert. Consulting, reports, authority, and monetization.",
    requiresUpgrade: true,
    upgradeNote: "Requires Pro + SME",
  },
  {
    id: "pro-leader",
    roles: [
      { label: "Pro Reader", icon: Star, color: "text-blue-700", bg: "bg-blue-100" },
      { label: "Leader", icon: Crown, color: "text-amber-700", bg: "bg-amber-100" },
    ],
    desc: "Verified leadership identity and thought leadership access.",
    requiresUpgrade: true,
    upgradeNote: "Requires Pro + Leader",
  },
  {
    id: "pro-associate-leader",
    roles: [
      { label: "Pro Reader", icon: Star, color: "text-blue-700", bg: "bg-blue-100" },
      { label: "Associate SME", icon: Users, color: "text-violet-700", bg: "bg-violet-100" },
      { label: "Leader", icon: Crown, color: "text-amber-700", bg: "bg-amber-100" },
    ],
    desc: "Expert profile with verified industry leader status.",
    requiresUpgrade: true,
    upgradeNote: "Requires Pro + Associate SME + Leader",
  },
  {
    id: "pro-sme-leader",
    roles: [
      { label: "Pro Reader", icon: Star, color: "text-blue-700", bg: "bg-blue-100" },
      { label: "SME", icon: Users, color: "text-emerald-700", bg: "bg-emerald-100" },
      { label: "Leader", icon: Crown, color: "text-amber-700", bg: "bg-amber-100" },
    ],
    desc: "High authority. Consulting + leadership + recognition.",
    requiresUpgrade: true,
    upgradeNote: "Requires Pro + SME + Leader",
  },
  {
    id: "company",
    roles: [{ label: "Company", icon: Briefcase, color: "text-rose-700", bg: "bg-rose-100" }],
    desc: "Verified company page with branding and sector visibility.",
    requiresUpgrade: true,
    upgradeNote: "Requires Company plan",
  },
  {
    id: "company-leader",
    roles: [
      { label: "Company", icon: Briefcase, color: "text-rose-700", bg: "bg-rose-100" },
      { label: "Leader", icon: Crown, color: "text-amber-700", bg: "bg-amber-100" },
    ],
    desc: "Company profile with founder/CEO leader identity.",
    requiresUpgrade: true,
    upgradeNote: "Requires Company + Leader",
  },
  {
    id: "company-pro",
    roles: [
      { label: "Company", icon: Briefcase, color: "text-rose-700", bg: "bg-rose-100" },
      { label: "Pro Reader", icon: Star, color: "text-blue-700", bg: "bg-blue-100" },
    ],
    desc: "Corporate premium intelligence access.",
    requiresUpgrade: true,
    upgradeNote: "Requires Company + Pro",
  },
  {
    id: "company-pro-leader",
    roles: [
      { label: "Company", icon: Briefcase, color: "text-rose-700", bg: "bg-rose-100" },
      { label: "Pro Reader", icon: Star, color: "text-blue-700", bg: "bg-blue-100" },
      { label: "Leader", icon: Crown, color: "text-amber-700", bg: "bg-amber-100" },
    ],
    desc: "Most powerful corporate identity — branding + intelligence + leadership.",
    requiresUpgrade: true,
    upgradeNote: "Requires Company + Pro + Leader",
  },
];

/* ─── Main Component ──────────────────────────── */
export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState<SettingsTab>("account");
  const [showPass, setShowPass] = useState(false);
  const [notifs, setNotifs] = useState({ breaking: true, digest: true, sme: false, events: true, messages: true });
  const [privacy, setPrivacy] = useState({ publicProfile: true, showSectors: true, showCountries: false });
  const [prefs, setPrefs] = useState({ darkMode: false, emailDigest: true, language: "English" });
  const toggle = (obj: any, set: any, k: string) => set({ ...obj, [k]: !obj[k] });

  // Simulate days since onboarding (dummy: 18 days ago → 42 left)
  const DAYS_LEFT = 42;

  return (
    <div className="p-5 md:p-8 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1E3A5F]" style={{ fontFamily: "var(--font-display)" }}>Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account, notifications, and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        {/* ── Sidebar ── */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[24px] p-3 shadow-sm border border-gray-100">
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all mb-1 last:mb-0 ${tab === t.id ? "bg-[#1E3A5F] text-white shadow" : "text-gray-500 hover:bg-[#f4f7fb] hover:text-[#1E3A5F]"}`}>
                <t.icon className={`w-4 h-4 shrink-0 ${tab === t.id ? "text-[#F4A024]" : ""}`} />
                <span>{t.label}</span>
                {t.badge && (
                  <span className={`ml-auto text-[9px] font-black px-2 py-0.5 rounded-md ${tab === t.id ? "bg-[#F4A024] text-white" : "bg-gray-100 text-gray-500"}`}>
                    {t.badge}
                  </span>
                )}
                {!t.badge && <ChevronRight className={`w-4 h-4 ml-auto ${tab === t.id ? "text-white/50" : "text-gray-300"}`} />}
              </button>
            ))}
          </div>
        </div>

        {/* ── Content Panel ── */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-[28px] p-6 md:p-8 shadow-sm border border-gray-100">

            {/* ── ACCOUNT ── */}
            {tab === "account" && (
              <div>
                <h2 className="text-lg font-bold text-[#1E3A5F] mb-6">Account Details</h2>
                <div className="space-y-5 mb-6">
                  {([["Full Name", user?.name || "", "text"], ["Email Address", user?.email || "", "email"], ["Mobile Number", user?.mobile || "", "tel"]] as [string, string, string][]).map(([label, val, type]) => (
                    <div key={label}>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">{label}</label>
                      <input type={type} defaultValue={val} placeholder={val ? undefined : `Enter ${label}`}
                        className="w-full px-4 py-3 bg-[#f4f7fb] rounded-2xl text-sm font-medium text-[#1E3A5F] border-none focus:outline-none focus:ring-2 focus:ring-[#F4A024] transition-all" />
                    </div>
                  ))}
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Password</label>
                    <div className="relative">
                      <input type={showPass ? "text" : "password"} defaultValue="••••••••"
                        className="w-full px-4 py-3 bg-[#f4f7fb] rounded-2xl text-sm font-medium text-[#1E3A5F] border-none focus:outline-none focus:ring-2 focus:ring-[#F4A024] transition-all pr-12" />
                      <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1E3A5F]">
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1E3A5F] text-white text-sm font-bold rounded-2xl hover:bg-[#F4A024] transition-colors shadow-md">
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                  <button onClick={() => logout()} className="px-6 py-3 border-2 border-red-200 text-red-500 text-sm font-bold rounded-2xl hover:bg-red-50 transition-colors">
                    Sign Out
                  </button>
                </div>
              </div>
            )}

            {/* ── INTERESTS ── */}
            {tab === "interests" && (
              <div>
                <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                  <div>
                    <h2 className="text-lg font-bold text-[#1E3A5F]">My Interests</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Sectors, countries, and leader roles you selected during onboarding</p>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
                    <Lock className="w-3 h-3" /> Free Plan — 60-Day Lock
                  </span>
                </div>

                {/* Info banner */}
                <div className="bg-[#1E3A5F]/5 border border-[#1E3A5F]/10 rounded-2xl p-4 mb-6">
                  <p className="text-xs text-[#1E3A5F] leading-relaxed">
                    <span className="font-bold">⏳ Free Plan Restriction:</span> On the Free plan, each interest category can only be edited once every <span className="font-bold">60 days</span> to maintain platform integrity. Upgrade to Pro for unlimited edits anytime.
                  </p>
                </div>

                <LockedInterestSection
                  icon={Building2} title="Sectors" color="text-blue-700" bg="bg-blue-100"
                  items={user?.sectors ?? []} daysLeft={DAYS_LEFT}
                />
                <LockedInterestSection
                  icon={Globe} title="Countries" color="text-teal-700" bg="bg-teal-100"
                  items={user?.countries ?? []} daysLeft={DAYS_LEFT - 5}
                />
                <LockedInterestSection
                  icon={Users} title="Leader Roles" color="text-violet-700" bg="bg-violet-100"
                  items={user?.leaders ?? []} daysLeft={DAYS_LEFT + 10}
                />
              </div>
            )}

            {/* ── ACCOUNT TYPE ── */}
            {tab === "account-type" && (
              <div>
                <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                  <div>
                    <h2 className="text-lg font-bold text-[#1E3A5F]">Account Type & Role</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Your active role combination defines your dashboard and capabilities</p>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl">
                    <BookOpen className="w-3 h-3" /> Currently: Free Reader
                  </span>
                </div>

                {/* Info banner */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
                  <p className="text-xs text-amber-800 leading-relaxed">
                    <span className="font-bold">ℹ️ Important:</span> All new users start as <span className="font-bold">Free Reader</span>. To unlock SME, Associate SME, Leader, or Company roles — and their combinations — you must upgrade your plan. You can hold multiple roles simultaneously.
                  </p>
                </div>

                {/* Role Combination Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ROLE_COMBOS.map(combo => (
                    <div key={combo.id}
                      className={`rounded-2xl border-2 p-5 transition-all relative ${combo.isCurrent ? "border-[#1E3A5F] bg-[#1E3A5F]/5 shadow-md" : "border-gray-200 bg-gray-50"}`}>
                      {combo.isCurrent && (
                        <div className="absolute -top-2.5 left-4 bg-[#1E3A5F] text-white text-[10px] font-black px-3 py-0.5 rounded-full">
                          ✓ Active Plan
                        </div>
                      )}

                      {/* Role badges */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {combo.roles.map((r, i) => (
                          <span key={i} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${combo.isCurrent ? `${r.bg} ${r.color} border-transparent` : "bg-white text-gray-400 border-gray-200"}`}>
                            <r.icon className="w-3.5 h-3.5" />
                            {r.label}
                          </span>
                        ))}
                      </div>

                      <p className={`text-xs leading-relaxed mb-4 ${combo.isCurrent ? "text-[#1E3A5F]" : "text-gray-400"}`}>{combo.desc}</p>

                      {combo.requiresUpgrade ? (
                        <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-[#1E3A5F] to-[#2F6FA3] text-white text-xs font-bold rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all">
                          <Zap className="w-3.5 h-3.5 text-[#F4A024]" />
                          Upgrade — {combo.upgradeNote}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <div className="w-full py-2.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-xl text-center">
                          ✓ Your Current Plan
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── NOTIFICATIONS ── */}
            {tab === "notifications" && (
              <div>
                <h2 className="text-lg font-bold text-[#1E3A5F] mb-6">Notification Preferences</h2>
                <Row label="Breaking News Alerts" desc="Instant alerts for major trade news"><Toggle on={notifs.breaking} onToggle={() => toggle(notifs, setNotifs, "breaking")} /></Row>
                <Row label="Daily Digest Email" desc="Morning summary of top stories"><Toggle on={notifs.digest} onToggle={() => toggle(notifs, setNotifs, "digest")} /></Row>
                <Row label="SME Article Updates" desc="When SMEs you follow publish content"><Toggle on={notifs.sme} onToggle={() => toggle(notifs, setNotifs, "sme")} /></Row>
                <Row label="Event Reminders" desc="Reminders for events you're registered for"><Toggle on={notifs.events} onToggle={() => toggle(notifs, setNotifs, "events")} /></Row>
                <Row label="New Messages" desc="Notifications for direct messages"><Toggle on={notifs.messages} onToggle={() => toggle(notifs, setNotifs, "messages")} /></Row>
              </div>
            )}

            {/* ── PRIVACY ── */}
            {tab === "privacy" && (
              <div>
                <h2 className="text-lg font-bold text-[#1E3A5F] mb-6">Privacy Settings</h2>
                <Row label="Public Profile" desc="Allow others to view your profile"><Toggle on={privacy.publicProfile} onToggle={() => toggle(privacy, setPrivacy, "publicProfile")} /></Row>
                <Row label="Show Tracked Sectors" desc="Display your sectors on your public profile"><Toggle on={privacy.showSectors} onToggle={() => toggle(privacy, setPrivacy, "showSectors")} /></Row>
                <Row label="Show Tracked Countries" desc="Display your countries on your public profile"><Toggle on={privacy.showCountries} onToggle={() => toggle(privacy, setPrivacy, "showCountries")} /></Row>
              </div>
            )}

            {/* ── PREFERENCES ── */}
            {tab === "preferences" && (
              <div>
                <h2 className="text-lg font-bold text-[#1E3A5F] mb-6">App Preferences</h2>
                <Row label="Dark Mode" desc="Switch to a darker interface theme">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-[#F4A024]" />
                    <Toggle on={prefs.darkMode} onToggle={() => toggle(prefs, setPrefs, "darkMode")} />
                    <Moon className="w-4 h-4 text-[#1E3A5F]" />
                  </div>
                </Row>
                <Row label="Weekly Email Digest" desc="Receive a weekly industry summary">
                  <Toggle on={prefs.emailDigest} onToggle={() => toggle(prefs, setPrefs, "emailDigest")} />
                </Row>
                <Row label="Content Language" desc="Preferred language for news articles">
                  <select value={prefs.language} onChange={e => setPrefs({ ...prefs, language: e.target.value })}
                    className="px-3 py-2 bg-[#f4f7fb] rounded-xl text-sm font-semibold text-[#1E3A5F] border-none focus:outline-none focus:ring-2 focus:ring-[#F4A024]">
                    <option>English</option><option>Hindi</option><option>German</option><option>Arabic</option>
                  </select>
                </Row>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
