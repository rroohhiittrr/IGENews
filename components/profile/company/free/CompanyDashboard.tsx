"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Users, FileText, CheckCircle2, Lock, 
  ArrowRight, Sparkles, ShieldCheck,
  Check, ChevronRight, BarChart3, AlertCircle, Edit, 
  Settings, Eye, Plus, Mail
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import CompanyPublicProfile from "@/components/profile/company/CompanyPublicProfile";

export default function CompanyDashboard() {
  const { user, updateOnboarding } = useAuth();
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || "en";

  // Active Plan determination
  const rawPlan = user?.companyPlan || "free";
  const activeTier: "free" | "startup" | "company" | "corporate" = 
    rawPlan === "corporate" || rawPlan === "gold" ? "corporate"
    : rawPlan === "company" ? "company"
    : rawPlan === "startup" || rawPlan === "silver" ? "startup"
    : "free";

  const isFree = activeTier === "free";
  const isStartup = activeTier === "startup";
  const isCompany = activeTier === "company";
  const isCorporate = activeTier === "corporate";

  // Allowed leader seats
  const maxLeaderSeats = isCorporate ? 5 : isCompany ? 2 : isStartup ? 1 : 0;

  // View states
  const [viewMode, setViewMode] = useState<"private" | "public">("private");
  const [adminTab, setAdminTab] = useState<"overview" | "editor" | "leaders" | "inquiries" | "articles" | "settings">("overview");

  // Profile data reference
  const profile = user?.onboardingForm || {};

  // Form states
  const [companyName, setCompanyName] = useState(profile.companyName || user?.name || "Bharat Forge & Metallurgy Ltd");
  const [sector, setSector] = useState(profile.sector || "Manufacturing & Precision Metallurgy");
  const [tagline, setTagline] = useState(profile.tagline || "Pioneering indigenous heavy forgings and critical global aerospace supply corridors.");
  const [city, setCity] = useState(profile.city || "Pune");
  const [country, setCountry] = useState(profile.country || "India");
  const [website, setWebsite] = useState(profile.website || "https://example.com");
  const [foundedYear, setFoundedYear] = useState(profile.foundedYear || "1988");
  const [employeesCount, setEmployeesCount] = useState(profile.employeesCount || "1,200+ Professionals");

  // Financial KPIs
  const [annualTurnover, setAnnualTurnover] = useState(profile.annualTurnover || "₹480 Cr");
  const [exportShare, setExportShare] = useState(profile.exportShare || "58%");
  const [capacityUtil, setCapacityUtil] = useState(profile.capacityUtil || "91.4%");
  const [creditRating, setCreditRating] = useState(profile.creditRating || "CRISIL AA-");

  // Bundled Leaders assignment state
  const [assignedLeaders, setAssignedLeaders] = useState<Array<{ name: string; title: string; email: string; status: string }>>(
    profile.assignedLeaders || [
      { name: "Rajiv V. Mehta", title: "Managing Director & CEO", email: "rajiv@bharatforge.com", status: "Active" },
      { name: "Dr. Ananya Subramanian", title: "Chief Technology Officer", email: "ananya@bharatforge.com", status: "Active" },
    ].slice(0, maxLeaderSeats)
  );
  const [newLeaderName, setNewLeaderName] = useState("");
  const [newLeaderTitle, setNewLeaderTitle] = useState("");
  const [newLeaderEmail, setNewLeaderEmail] = useState("");

  // Inquiries State
  const [inquiries] = useState([
    { id: "inq-1", name: "Marcus Vance", company: "Gulf Aerospace Consortium (UAE)", topic: "Bilateral CEPA Titanium Forgings RFQ", date: "Aug 26, 2026", status: "New" },
    { id: "inq-2", name: "Hans Zimmer", company: "Nordic Wind Turbines (Germany)", topic: "Main Rotor Shaft Precision Specifications", date: "Aug 24, 2026", status: "Replied" },
  ]);

  // Saved notification
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveProfile = async () => {
    const updatedForm = {
      ...profile,
      companyName,
      sector,
      tagline,
      city,
      country,
      website,
      foundedYear,
      employeesCount,
      annualTurnover,
      exportShare,
      capacityUtil,
      creditRating,
      assignedLeaders,
    };
    await updateOnboarding({
      onboardingForm: updatedForm,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleAddLeader = () => {
    if (!newLeaderName.trim() || !newLeaderEmail.trim()) return;
    if (assignedLeaders.length >= maxLeaderSeats) {
      alert(`Your ${activeTier.toUpperCase()} plan allows a maximum of ${maxLeaderSeats} bundled Leader profiles.`);
      return;
    }
    const updated = [
      ...assignedLeaders,
      { name: newLeaderName, title: newLeaderTitle || "Executive Leader", email: newLeaderEmail, status: "Invited" },
    ];
    setAssignedLeaders(updated);
    setNewLeaderName("");
    setNewLeaderTitle("");
    setNewLeaderEmail("");
  };

  const handleRemoveLeader = (idx: number) => {
    const updated = assignedLeaders.filter((_, i) => i !== idx);
    setAssignedLeaders(updated);
  };

  // Compile combined company data for public profile preview
  const previewCompanyData = {
    companyName,
    sector,
    tagline,
    city,
    country,
    website,
    foundedYear,
    employeesCount,
    annualTurnover,
    exportShare,
    capacityUtil,
    creditRating,
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 pb-24 text-left">
      
      {/* Top Header Panel - View Mode Switcher */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-[#122238] rounded-3xl p-5 border border-gray-100 dark:border-white/5 mb-8 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-orange-500/10 text-[#F0652E] font-black text-xl shrink-0">
            {companyName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Company Management</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h2 className="text-lg font-black text-[#1D1D46] dark:text-white leading-tight flex items-center gap-2">
              <span>{companyName}</span>
              <span className={`px-2.5 py-0.5 text-[9px] font-black rounded uppercase tracking-wider ${
                isCorporate
                  ? "bg-purple-600 text-white"
                  : isCompany
                  ? "bg-[#F0652E] text-white"
                  : isStartup
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-white"
              }`}>
                {isCorporate ? "★ TOP CORPORATE" : isCompany ? "✦ TOP COMPANY" : isStartup ? "✓ TOP START-UP" : "FREE MEMBER"}
              </span>
            </h2>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="bg-gray-100 dark:bg-white/5 p-1 rounded-2xl flex items-center shrink-0">
          <button
            onClick={() => setViewMode("private")}
            className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
              viewMode === "private"
                ? "bg-[#1D1D46] dark:bg-blue-600 text-white shadow-md"
                : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            Admin Dashboard
          </button>
          <button
            onClick={() => setViewMode("public")}
            className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
              viewMode === "public"
                ? "bg-[#1D1D46] dark:bg-blue-600 text-white shadow-md"
                : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Preview Public Profile
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PUBLIC PREVIEW MODE                                                       */}
      {/* ========================================================================= */}
      {viewMode === "public" ? (
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
          <CompanyPublicProfile
            companyData={previewCompanyData}
            tier={activeTier}
            onUpgradeClick={() => router.push(`/${locale}/profile/plans/company`)}
            isOwner={true}
          />
        </div>
      ) : (
        /* ========================================================================= */
        /* PRIVATE ADMIN DASHBOARD                                                   */
        /* ========================================================================= */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-3 space-y-2">
            {[
              { id: "overview", label: "Overview & Analytics", icon: BarChart3 },
              { id: "editor", label: "Stakeholder Content Editor", icon: Edit },
              { id: "leaders", label: `Bundled Leaders (${assignedLeaders.length}/${maxLeaderSeats})`, icon: Users },
              { id: "inquiries", label: "Buyer RFQs & Inquiries", icon: Mail, badge: "2 New" },
              { id: "articles", label: "Trade Intelligence PR", icon: FileText },
              { id: "settings", label: "Settings & Access", icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = adminTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setAdminTab(tab.id as any)}
                  className={`w-full p-3.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-between ${
                    isActive
                      ? "bg-[#F0652E] text-white shadow-md shadow-orange-500/20"
                      : "bg-white dark:bg-[#122238] border border-gray-100 dark:border-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-orange-500/20 text-white">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Plan Upgrade Teaser Card */}
            {!isCorporate && (
              <div className="p-5 mt-4 rounded-3xl bg-gradient-to-br from-indigo-950 to-slate-900 border border-indigo-800/40 text-white shadow-lg space-y-3">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> Upgrade Tier
                </div>
                <h4 className="text-sm font-black">
                  {isFree ? "Unlock 4 Stakeholder Tabs" : isStartup ? "Upgrade to Top Company" : "Secure Sector #1 Pinned Slot"}
                </h4>
                <p className="text-[11px] text-slate-300 leading-snug">
                  {isFree
                    ? "Get Blue Tick verification, bundled Executive Leader Profiles, and Top 10 directory placement."
                    : "Add 5 C-Suite Leader profiles, interactive global corridor mapping, and priority ranking."}
                </p>
                <button
                  onClick={() => router.push(`/${locale}/profile/plans/company`)}
                  className="w-full py-2 bg-[#F0652E] hover:bg-[#d85522] text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <span>View All Plans</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Right Main Content Panel */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Save feedback */}
            {saveSuccess && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-2xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Company profile changes saved successfully!
              </div>
            )}

            {/* 1. OVERVIEW TAB */}
            {adminTab === "overview" && (
              <div className="space-y-6">
                {/* Status Hero Card */}
                <div className="bg-white dark:bg-[#122238] border border-gray-100 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-sm">
                  <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">
                        Institutional Trust Profile
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white">
                        {companyName}
                      </h3>
                      <p className="text-xs text-[#F0652E] font-semibold">{sector}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 text-xs font-bold rounded-xl flex items-center gap-1.5 ${
                        !isFree
                          ? "bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400"
                          : "bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400"
                      }`}>
                        {!isFree ? <ShieldCheck className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        {!isFree ? "KYC Blue Tick Active" : "Unverified Listing"}
                      </span>
                    </div>
                  </div>

                  {/* 4 Quick Stat Counters */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gray-100 dark:border-white/10">
                    <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-1">Monthly Profile Views</span>
                      <span className="text-2xl font-black text-gray-900 dark:text-white">4,820</span>
                      <span className="text-[10px] text-emerald-500 font-bold block mt-0.5">↑ +38% this month</span>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-1">Inbound Buyer RFQs</span>
                      <span className="text-2xl font-black text-[#F0652E]">18</span>
                      <span className="text-[10px] text-gray-400 block mt-0.5">From UAE, US & EU</span>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-1">Bundled Leader Seats</span>
                      <span className="text-2xl font-black text-gray-900 dark:text-white">
                        {assignedLeaders.length} / {maxLeaderSeats}
                      </span>
                      <span className="text-[10px] text-blue-500 font-bold block mt-0.5">All seats active</span>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-1">Sector Rank</span>
                      <span className="text-2xl font-black text-amber-500">
                        {isCorporate ? "#1 Pinned" : !isFree ? "Top 10" : "Unranked"}
                      </span>
                      <span className="text-[10px] text-gray-400 block mt-0.5">Curated Directory</span>
                    </div>
                  </div>
                </div>

                {/* Quick Action Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-6 bg-white dark:bg-[#122238] border border-gray-100 dark:border-white/5 rounded-3xl space-y-3">
                    <h4 className="text-sm font-black text-gray-900 dark:text-white flex items-center gap-2">
                      <Edit className="w-4 h-4 text-[#F0652E]" /> Update Stakeholder Information
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      Keep your financial highlights, capex roadmap, banking partners, and product capability lines up to date for international due diligence.
                    </p>
                    <button
                      onClick={() => setAdminTab("editor")}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
                    >
                      Open Content Editor <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-6 bg-white dark:bg-[#122238] border border-gray-100 dark:border-white/5 rounded-3xl space-y-3">
                    <h4 className="text-sm font-black text-gray-900 dark:text-white flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-500" /> Manage Bundled Leaders
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      Assign C-Suite executives to your bundled leader slots. They receive verified Executive Leader profiles linked directly to your company.
                    </p>
                    <button
                      onClick={() => setAdminTab("leaders")}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
                    >
                      Manage Leader Profiles <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 2. STAKEHOLDER CONTENT EDITOR TAB */}
            {adminTab === "editor" && (
              <div className="bg-white dark:bg-[#122238] border border-gray-100 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                <div>
                  <h3 className="text-base font-black text-gray-900 dark:text-white mb-1">
                    4-Stakeholder Content Editor
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Update corporate data across all 4 stakeholder views (Investors, Employees, Stakeholders, Brand).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Company Name</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Industry Sector</label>
                    <input
                      type="text"
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Corporate Tagline</label>
                    <input
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">City, State</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Country</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Annual Turnover (FY26)</label>
                    <input
                      type="text"
                      value={annualTurnover}
                      onChange={(e) => setAnnualTurnover(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Export Revenue Share (%)</label>
                    <input
                      type="text"
                      value={exportShare}
                      onChange={(e) => setExportShare(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Capacity Utilization</label>
                    <input
                      type="text"
                      value={capacityUtil}
                      onChange={(e) => setCapacityUtil(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Credit Rating</label>
                    <input
                      type="text"
                      value={creditRating}
                      onChange={(e) => setCreditRating(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex justify-end">
                  <button
                    onClick={handleSaveProfile}
                    className="px-6 py-2.5 bg-[#F0652E] hover:bg-[#d85522] text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" /> Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* 3. BUNDLED LEADERS MANAGER TAB */}
            {adminTab === "leaders" && (
              <div className="bg-white dark:bg-[#122238] border border-gray-100 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-black text-gray-900 dark:text-white mb-1">
                        Bundled Executive Leader Profiles
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Your <strong>{activeTier.toUpperCase()}</strong> plan includes <strong>{maxLeaderSeats}</strong> bundled Executive Leader seat(s).
                      </p>
                    </div>
                    <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full">
                      {assignedLeaders.length} / {maxLeaderSeats} Assigned
                    </span>
                  </div>
                </div>

                {/* Leader cards list */}
                <div className="space-y-3">
                  {assignedLeaders.map((ldr, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl flex items-center justify-between flex-wrap gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
                          {ldr.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-gray-900 dark:text-white">{ldr.name}</h4>
                          <p className="text-xs text-[#F0652E] font-medium">{ldr.title} · <span className="text-gray-400">{ldr.email}</span></p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                          ✓ Verified Leader
                        </span>
                        <button
                          onClick={() => handleRemoveLeader(idx)}
                          className="text-xs text-red-400 hover:text-red-300 font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add new leader input form if seats available */}
                {assignedLeaders.length < maxLeaderSeats && (
                  <div className="p-5 bg-gray-50 dark:bg-slate-900/60 border border-dashed border-gray-300 dark:border-slate-700 rounded-2xl space-y-3">
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider block">
                      Assign New Executive Leader:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Full Name (e.g. Rajiv Mehta)"
                        value={newLeaderName}
                        onChange={(e) => setNewLeaderName(e.target.value)}
                        className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 font-medium"
                      />
                      <input
                        type="text"
                        placeholder="Title (e.g. Managing Director)"
                        value={newLeaderTitle}
                        onChange={(e) => setNewLeaderTitle(e.target.value)}
                        className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 font-medium"
                      />
                      <input
                        type="email"
                        placeholder="Work Email (e.g. rajiv@co.com)"
                        value={newLeaderEmail}
                        onChange={(e) => setNewLeaderEmail(e.target.value)}
                        className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 font-medium"
                      />
                    </div>
                    <button
                      onClick={handleAddLeader}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" /> Assign Leader Seat
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 4. INQUIRIES & RFQs TAB */}
            {adminTab === "inquiries" && (
              <div className="bg-white dark:bg-[#122238] border border-gray-100 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                <div>
                  <h3 className="text-base font-black text-gray-900 dark:text-white mb-1">
                    Inbound Buyer RFQs & Trade Inquiries
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Direct procurement requests received from international buyers visiting your Company Page.
                  </p>
                </div>

                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl space-y-2"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-gray-900 dark:text-white">{inq.name}</span>
                          <span className="text-xs text-[#F0652E] font-bold">({inq.company})</span>
                        </div>
                        <span className="text-xs text-gray-400">{inq.date}</span>
                      </div>
                      <p className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                        Topic: <strong className="text-gray-900 dark:text-white">{inq.topic}</strong>
                      </p>
                      <div className="pt-2 flex items-center gap-3">
                        <button
                          onClick={() => alert(`Replying to ${inq.name}...`)}
                          className="px-3.5 py-1.5 bg-[#F0652E] hover:bg-[#d85522] text-white font-bold text-xs rounded-lg transition-all"
                        >
                          Respond via Email
                        </button>
                        <span className="text-[10px] text-emerald-500 font-bold">✓ Direct Lead Delivered</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. ARTICLES & TRADE INTELLIGENCE PR TAB */}
            {adminTab === "articles" && (
              <div className="bg-white dark:bg-[#122238] border border-gray-100 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="text-base font-black text-gray-900 dark:text-white mb-1">
                      Corporate Trade Intelligence & Press Releases
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Publish thought leadership and contract wins across iGEN News feeds.
                    </p>
                  </div>
                  <button
                    onClick={() => alert("Opening article publisher...")}
                    className="px-4 py-2 bg-[#F0652E] hover:bg-[#d85522] text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Publish New PR
                  </button>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider block mb-0.5">Published · Aug 18, 2026</span>
                    <h4 className="text-sm font-black text-gray-900 dark:text-white">"Bharat Forge seals $45M aerospace supply contract under India-UAE CEPA corridor"</h4>
                  </div>
                  <span className="text-xs text-emerald-500 font-bold">✓ 3,420 Reads</span>
                </div>
              </div>
            )}

            {/* 6. SETTINGS & ACCESS TAB */}
            {adminTab === "settings" && (
              <div className="bg-white dark:bg-[#122238] border border-gray-100 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                <div>
                  <h3 className="text-base font-black text-gray-900 dark:text-white mb-1">
                    Company Page Access & Verification Settings
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Manage administrative credentials and institutional verification keys.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl space-y-2">
                  <span className="text-xs font-bold text-gray-900 dark:text-white block">Official Signatory Email</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 block">{user?.email || "admin@bharatforge.com"}</span>
                  <span className="text-[10px] text-emerald-500 font-bold block">✓ Authenticated Corporate Admin</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
