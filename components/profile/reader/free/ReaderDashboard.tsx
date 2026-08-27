"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { 
  Star, Copy, Edit, Clock, Bookmark, ExternalLink,
  ShieldAlert, Sparkles, 
  Check,
  Upload, X, MapPin, Briefcase, Building
} from "lucide-react";
import { SECTORS } from "@/lib/sectors";
import { useParams, useRouter } from "next/navigation";

// Mock Breaking News Bulletins
const MOCK_BREAKING_NEWS = [
  "🚨 Custom Duty revisions announced on high-grade steel imports between India and Japan.",
  "📈 Bilateral trade volume hits record highs in the pharmaceutical and API manufacturing sectors.",
  "💡 New semiconductor logistics green corridor approved to accelerate technology transfers.",
  "🌾 Agro-commodity regulations updated: Export bans eased on non-basmati rice categories."
];

// Helper to get formatted date
const getFormattedDate = () => {
  const d = new Date();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

export default function ReaderDashboard() {
  const { user, updateOnboarding } = useAuth();
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || "en";

  const profile = user?.onboardingForm || {}; const currentPlan = user?.readerPlan || "free";

  const [viewMode, setViewMode] = useState<"private" | "public">("private");
  const [profileVisibility, setProfileVisibility] = useState<"private" | "platform" | "public">("private");

  const getPlanInfo = () => {
    switch (currentPlan) {
      case "pro":
        return {
          label: "PRO MEMBER",
          color: "bg-[#1E3A5F]",
          nameText: "Pro Reader",
          nextCta: "Upgrade to Premium →",
        };
      case "premium":
        return {
          label: "PREMIUM MEMBER",
          color: "bg-[#059669]",
          nameText: "Premium Reader",
          nextCta: "Upgrade to Pro Plus →",
        };
      case "enterprise":
        return {
          label: "PRO PLUS MEMBER",
          color: "bg-[#7c3aed]",
          nameText: "Pro Plus Reader",
          nextCta: "View Plans →",
        };
      default:
        return {
          label: "FREE MEMBER",
          color: "bg-[#C55A11]",
          nameText: "Free Reader",
          nextCta: "Upgrade to Pro →",
        };
    }
  };

  const planInfo = getPlanInfo();

  const handleAvatarClick = () => {
    if (currentPlan === "free" || currentPlan === "pro") {
      alert("Custom profile picture upload is a Premium Reader benefit. Please upgrade your plan.");
      router.push(`/${locale}/profile/plans/reader`);
      return;
    }
    avatarInputRef.current?.click();
  };

  // Form edit states
  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState(profile.displayName || user?.name || "");
  const [avatarBase64, setAvatarBase64] = useState(profile.avatarBase64 || "");
  const [profession, setProfession] = useState(profile.profession || "");
  const [organisation, setOrganisation] = useState(profile.organisation || "");
  const [country, setCountry] = useState(profile.country || "India");
  const [city, setCity] = useState(profile.city || "Mumbai");
  const [_state, _setState] = useState(profile.state || "Maharashtra");
  const [bio, setBio] = useState(profile.bio || "");
  const [isEditingBio, setIsEditingBio] = useState(false);

  const displayedProfession = profession || "Sourcing Specialist / Reader";
  const displayedOrganisation = organisation || "Independent / Individual Specialist";
  const displayedBio = bio || (currentPlan === "premium" || currentPlan === "enterprise" ? "Write a professional summary or focus statement here..." : "B2B Trade Intelligence Reader & Analyst");

  const [bannerBase64, setBannerBase64] = useState(profile.bannerBase64 || "");
  const [pronouns] = useState(profile.pronouns || "He/Him");
  const [connectionsCount] = useState(512);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleBannerClick = () => {
    if (currentPlan === "enterprise") {
      bannerInputRef.current?.click();
    } else {
      alert("Upgrade to Pro Plus to upload a customized profile header banner!");
    }
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getHeaderCardStyles = () => {
    switch (currentPlan) {
      case "pro":
        return "border-blue-500/20 bg-[#f4f7fb]/80 dark:bg-[#152a46]/50 shadow-md";
      case "premium":
        return "border-emerald-500/20 bg-gradient-to-r from-white via-white to-emerald-50/5 dark:from-[#122238] dark:to-[#0c3125]/20 shadow-lg";
      case "enterprise":
        return "border-[#7c3aed]/20 bg-gradient-to-r from-white via-white to-purple-50/10 dark:from-[#122238] dark:to-[#1a113b]/30 shadow-2xl relative overflow-hidden";
      default:
        return "bg-white dark:bg-[#122238] border-gray-100 dark:border-white/5 shadow-sm";
    }
  };
  const headerCardStyles = getHeaderCardStyles();

  const getAvatarRingClass = () => {
    switch (currentPlan) {
      case "pro":
        return "ring-4 ring-blue-500/30";
      case "premium":
        return "ring-4 ring-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
      case "enterprise":
        return "ring-4 ring-purple-500/50 animate-pulse shadow-[0_0_20px_rgba(124,58,237,0.3)]";
      default:
        return "ring-2 ring-gray-200 dark:ring-white/10";
    }
  };
  const avatarRingClass = getAvatarRingClass();
  const completeness = (editName ? 25 : 0) + (avatarBase64 ? 25 : 0) + (profession ? 15 : 0) + (organisation ? 15 : 0) + (bio ? 20 : 0);

  const avatarInputRef = useRef<HTMLInputElement>(null);

  // Stats / Quota Trackers
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [articlesRead, setArticlesRead] = useState(14);
  const [activeTab, setActiveTab] = useState<string>("all"); // "all", "for-you", or sectorId

  // Simulation of Saved Articles & Followed Sectors in state
  const [savedArticles, setSavedArticles] = useState<{ id: string; title: string; sector: string; date: string }[]>([
    { id: "art-1", title: "Global Logistics and Cargo Realignments across Indo-UAE Trade Corridors", sector: "logistics", date: "May 24, 2026" },
    { id: "art-2", title: "API Formulation Incentives: How Indian Pharma Scales Production", sector: "pharma", date: "May 22, 2026" },
    { id: "art-3", title: "AI-Powered Custom Controls: Deploying Predictive Trade Auditing Tools", sector: "it", date: "May 20, 2026" },
    { id: "art-4", title: "Automotive Component Sourcing Frameworks & Tariffs updates", sector: "automotive", date: "May 18, 2026" },
    { id: "art-5", title: "Renewable Energy Certificates: Bilateral Offsets Explained", sector: "energy", date: "May 15, 2026" }
  ]);

  // CEPA customs calculator states
  const [cepaSector, setCepaSector] = useState("chemicals");
  const [cepaCountry, setCepaCountry] = useState("UAE");
  const [cepaValue, setCepaValue] = useState<number>(50000);
  const [cepaResult, setCepaResult] = useState<{ originalDuty: number; cepaDuty: number; savings: number } | null>(null);

  const handleCalculateCepa = () => {
    let baseRate = 0.075; // 7.5% standard duty
    let cepaRate = 0.01; // 1% concessional duty
    if (cepaSector === "steel") {
      baseRate = 0.15; // 15%
      cepaRate = 0.05; // 5%
    } else if (cepaSector === "textiles") {
      baseRate = 0.10; // 10%
      cepaRate = 0.0; // 0% duty free
    }

    if (cepaCountry === "Australia") {
      cepaRate = Math.max(0, cepaRate - 0.01);
    }

    const originalDuty = cepaValue * baseRate;
    const cepaDuty = cepaValue * cepaRate;
    const savings = originalDuty - cepaDuty;

    setCepaResult({ originalDuty, cepaDuty, savings });
  };

  // Sector and Follow simulations
  const followedSectors = user?.sectors || ["pharma", "it", "logistics", "energy", "manufacturing", "retail", "aerospace"];
  const savesCount = savedArticles.length;
  const followsCount = followedSectors.length;

  useEffect(() => {
    if (user && user.onboardingForm) {
      const f = user.onboardingForm;
      setEditName(f.displayName || user.name || "");
      setAvatarBase64(f.avatarBase64 || "");
      setProfession(f.profession || "");
      setOrganisation(f.organisation || "");
      setCountry(f.country || "India");
      setCity(f.city || "Mumbai");
      _setState(f.state || "Maharashtra");
    }
  }, [user]);

  if (!user) return null;

  const username = user.email.split("@")[0];
  const publicUrl = `indiaglobalnews.com/reader/${username}`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Profile picture size exceeds 2MB limit.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      if (event.target?.result) {
        const b64 = event.target.result as string;
        setAvatarBase64(b64);
        const updatedForm = { ...profile, avatarBase64: b64 };
        await updateOnboarding({ onboardingForm: updatedForm });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveName = async () => {
    if (!editName.trim()) return;
    const updatedForm = { ...profile, displayName: editName };
    await updateOnboarding({
      name: editName,
      onboardingForm: updatedForm
    });
    setIsEditingName(false);
  };

  // Mock Trade Articles based on followed sectors
  const getMockFeed = () => {
    const feed = [
      { id: "feed-1", title: "Pharma API Import Duty Reductions: What Exporters Need to Know", sector: "pharma", date: "25 May 2026", readTime: "4 min read", desc: "Understanding the newest custom tariff amendments on chemical active ingredients." },
      { id: "feed-2", title: "Technological Expansion Drives Indo-German Bilateral Investments", sector: "it", date: "24 May 2026", readTime: "6 min read", desc: "Bilateral venture flow reports reveal record startup backing in manufacturing tech." },
      { id: "feed-3", title: "Renewable Energy Offtake Policies: Regional Regulatory Guidelines", sector: "energy", date: "23 May 2026", readTime: "5 min read", desc: "How national grid regulations are shaping cross-border electricity sales and offsets." },
      { id: "feed-4", title: "Port Tariffs & Digital Clearance Milestones: Logistics Review", sector: "logistics", date: "22 May 2026", readTime: "3 min read", desc: "Indian ocean cargo logs showcase 24% clearance speed improvement using AI logs." },
      { id: "feed-5", title: "Global Semiconductor Alliance: Bilateral Treaties & Directives", sector: "manufacturing", date: "20 May 2026", readTime: "8 min read", desc: "Detailed breakdown of custom treaties and manufacturing subsidies on fabrication parts." }
    ];

    if (activeTab === "all") return feed;
    if (activeTab === "for-you") return feed.slice(0, 3); // Simulated basic personalization
    return feed.filter(art => art.sector === activeTab);
  };

  // Simulated Save toggle
  const toggleSaveArticle = (article: { id: string; title: string; sector: string; date: string }) => {
    const exists = savedArticles.find(a => a.title === article.title);
    if (exists) {
      setSavedArticles(prev => prev.filter(a => a.title !== article.title));
    } else {
      if (savesCount >= 20) {
        alert("Saved article limit reached (20 / 20 saves). Upgrade to Pro to save unlimited articles!");
        return;
      }
      setSavedArticles(prev => [...prev, {
        id: `art-${Date.now()}`,
        title: article.title,
        sector: article.sector,
        date: getFormattedDate()
      }]);
    }
  };

  const getSectorName = (id: string) => {
    return SECTORS.find(s => s.id === id)?.name || id;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 pb-24 text-left">
      
      {/* ── STICKY PREVIEW BAR ── */}
      <div className="mb-6 bg-gradient-to-r from-[#1D1D46] to-[#0A0A28] rounded-2xl p-4 border border-white/10 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Profile View Mode Controller</h4>
          </div>
          <p className="text-[9px] text-gray-300 mt-0.5">Toggle between your private owner dashboard and what external visitors see.</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 shrink-0">
          <button
            onClick={() => setViewMode("private")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              viewMode === "private"
                ? "bg-[#F0652E] text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Private Dashboard (Owner View)
          </button>
          <button
            onClick={() => setViewMode("public")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              viewMode === "public"
                ? "bg-[#F0652E] text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Public Profile (Visitor View)
          </button>
        </div>
      </div>

      {/* ── PROFILE HEADER CARD (Section 1.3) ── */}
      <div className={`rounded-3xl border relative text-left mb-8 transition-all duration-300 overflow-hidden ${headerCardStyles}`}>
        
        {/* Cover Banner — Enterprise Only */}
        {currentPlan === "enterprise" && (
          <div className="relative w-full h-32 md:h-48 border-b border-white/5">
            {bannerBase64 ? (
              <img src={bannerBase64} alt="Profile Cover" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-indigo-950 via-purple-900 to-violet-950 flex items-center justify-end p-6 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.15),transparent)] pointer-events-none" />
                <span className="text-white/20 font-black text-xl uppercase tracking-widest hidden md:inline">B2B Trade Intelligence Enterprise</span>
              </div>
            )}
            <button 
              onClick={handleBannerClick}
              className="absolute top-4 right-4 bg-white/80 dark:bg-black/60 backdrop-blur-sm p-2 rounded-full shadow hover:scale-105 transition-all text-[#1D1D46] dark:text-white"
              title="Upload Custom Cover Banner"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <input type="file" ref={bannerInputRef} onChange={handleBannerUpload} accept="image/png, image/jpeg" className="hidden" />
          </div>
        )}

        {/* DYNAMIC MEMBER Badge (Top-Right) */}
        <div className="absolute top-6 right-6 flex items-center gap-3">
          <button 
            onClick={() => router.push(`/${locale}/profile/plans/reader`)}
            className={`flex items-center gap-1.5 px-3 py-1 ${planInfo.color} hover:opacity-90 text-white text-[10px] font-black rounded-lg uppercase tracking-wider shadow-sm transition-opacity`}
            title={`${planInfo.nameText} — Click to Upgrade or View Plans.`}
          >
            <Star className="w-3.5 h-3.5 fill-white text-white" />
            <span>{planInfo.label}</span>
          </button>
        </div>

        <div className="px-6 pb-6 md:px-8 md:pb-8 relative pt-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          
          {/* Avatar with change trigger */}
          <div className="relative group shrink-0">
            {avatarBase64 ? (
              <img src={avatarBase64} alt="Avatar" className={`w-20 h-20 rounded-full object-cover shadow ${avatarRingClass}`} />
            ) : (
              <div className={`w-20 h-20 rounded-full bg-[#1D1D46] text-white flex items-center justify-center font-bold text-xl uppercase shadow ${avatarRingClass}`}>
                {editName.slice(0, 2)}
              </div>
            )}
            <button 
              onClick={handleAvatarClick}
              className="absolute -bottom-1 -right-1 w-7 h-7 bg-white dark:bg-[#172c47] border border-gray-200 dark:border-white/10 rounded-full flex items-center justify-center shadow hover:text-[#F0652E] transition-all"
              title="Change Profile Picture"
            >
              <Upload className="w-3.5 h-3.5" />
            </button>
            <input type="file" ref={avatarInputRef} onChange={handleAvatarUpload} accept="image/png, image/jpeg" className="hidden" />
          </div>

          {/* Info Details */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2 pt-2">
              {isEditingName ? (
                <div className="flex gap-2 items-center">
                  <input 
                    type="text" 
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="px-2.5 py-1 bg-gray-100 dark:bg-white/5 text-sm font-bold text-[#1D1D46] dark:text-white rounded focus:outline-none"
                  />
                  <button onClick={handleSaveName} className="px-2.5 py-1 bg-emerald-600 text-white text-[10px] font-bold rounded">Save</button>
                  <button onClick={() => { setEditName(profile.displayName || user.name); setIsEditingName(false); }} className="px-2.5 py-1 bg-gray-400 text-white text-[10px] font-bold rounded">Cancel</button>
                </div>
              ) : (
                <div className="flex items-center flex-wrap justify-center md:justify-start gap-2">
                  <h2 className="text-2xl font-bold text-[#1D1D46] dark:text-white leading-tight flex items-center gap-1.5">
                    {editName}
                    {currentPlan === "enterprise" && (
                      <Check className="w-5 h-5 text-blue-500 fill-blue-500/20 stroke-[3px]" />
                    )}
                  </h2>
                  {currentPlan === "enterprise" && (
                    <span className="text-[9px] bg-[#1D1D46]/5 dark:bg-white/10 text-gray-500 dark:text-gray-300 px-2 py-0.5 rounded font-bold">{pronouns}</span>
                  )}
                  <button onClick={() => setIsEditingName(true)} className="text-gray-400 hover:text-[#F0652E] transition-all" title="Edit Name">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Plan details and Upgrade CTA */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-xs">
              <span className="text-gray-400 font-semibold">{planInfo.nameText}</span>
              {currentPlan !== "enterprise" && (
                <button 
                  onClick={() => router.push(`/${locale}/profile/plans/reader`)}
                  className="text-[#C55A11] hover:underline font-black flex items-center gap-0.5"
                >
                  {planInfo.nextCta}
                </button>
              )}
              <span className="text-gray-400">• Member Since: {getFormattedDate()}</span>
            </div>

            {/* Sub details with Fallbacks */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {displayedProfession}</span>
              <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5" /> {displayedOrganisation}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {city}, {country}</span>
            </div>

            {/* Connections count — Enterprise only */}
            {currentPlan === "enterprise" && (
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-semibold text-gray-500">
                <span className="text-blue-600 dark:text-blue-400 cursor-pointer">{connectionsCount}+ B2B Connections</span>
              </div>
            )}

            {/* Custom Bio / Summary */}
            <div className="pt-2 text-left space-y-1">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Professional Summary</span>
              {isEditingBio ? (
                <div className="space-y-2 max-w-xl">
                  <textarea 
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Describe your trade role, procurement focus, or regional experience..."
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-[#1D1D46] dark:text-white rounded-xl focus:outline-none focus:border-[#F0652E]"
                    rows={2}
                  />
                  <div className="flex gap-2">
                    <button onClick={() => setIsEditingBio(false)} className="px-3 py-1 bg-[#1D1D46] text-white text-[10px] font-bold rounded-lg hover:opacity-90">Save Summary</button>
                    <button onClick={() => { setBio(profile.bio || ""); setIsEditingBio(false); }} className="px-3 py-1 bg-gray-400 text-white text-[10px] font-bold rounded-lg hover:opacity-90">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-1.5 group max-w-xl">
                  <p className="text-xs text-gray-600 dark:text-gray-300 italic leading-relaxed">
                    "{displayedBio}"
                  </p>
                  <button 
                    onClick={() => setIsEditingBio(true)} 
                    className="text-gray-400 hover:text-[#F0652E] opacity-0 group-hover:opacity-100 transition-all shrink-0 mt-0.5" 
                    title="Edit Summary"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Public profile URL link copier */}
            <div className="pt-2 flex items-center justify-center md:justify-start gap-2">
              <div className="bg-[#f4f7fb] dark:bg-white/5 px-3 py-1.5 rounded-xl border border-gray-150 dark:border-transparent flex items-center gap-2 max-w-sm">
                <span className="text-[10px] text-gray-400 font-mono select-all truncate">Your public URL: {publicUrl}</span>
                <button 
                  onClick={handleCopyUrl}
                  className="text-gray-400 hover:text-[#1D1D46] dark:hover:text-white shrink-0"
                  title="Copy public URL"
                >
                  {copiedUrl ? <span className="text-[8px] text-emerald-600 font-bold">Copied!</span> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ── BREAKING NEWS STRIP (Horizontal scroll) ── */}
      <div className="bg-[#1D1D46] dark:bg-[#122238] rounded-2xl py-3 px-4 border border-white/5 shadow-sm mb-8 overflow-hidden relative flex items-center">
        <div className="bg-[#F0652E] text-white text-[9px] font-black px-2 py-1 rounded uppercase tracking-wider shrink-0 mr-4 z-10 shadow-sm">
          Breaking
        </div>
        <div className="w-full overflow-hidden whitespace-nowrap relative">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            className="inline-flex gap-16 text-xs text-gray-100 font-medium"
            style={{ width: "fit-content" }}
          >
            {/* Duplicated list to scroll smoothly without seams */}
            {[...MOCK_BREAKING_NEWS, ...MOCK_BREAKING_NEWS].map((news, idx) => (
              <span key={idx} className="inline-flex items-center gap-2">
                {news}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── GRID SYSTEM / CONDITIONAL VIEW MODE ── */}
      {viewMode === "public" ? (
        // Public Preview / Visitor View
        <div className="bg-white dark:bg-[#122238] rounded-3xl p-8 border border-gray-150 dark:border-white/5 shadow-sm text-left space-y-8">
          
          {/* Banner notification depending on tier */}
          {currentPlan === "free" || currentPlan === "pro" ? (
            <div className="bg-amber-500/5 border border-amber-500/15 rounded-2xl p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto">
                <ShieldAlert className="w-6 h-6 text-amber-500" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#1D1D46] dark:text-white">🔒 Stealth Private Profile Mode</h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                  As a {planInfo.nameText}, your profile remains in Stealth Private Mode. This visitor page is locked and hidden from other members and search engines.
                </p>
              </div>
              <button 
                onClick={() => router.push(`/${locale}/profile/plans/reader`)}
                className="px-5 py-2 bg-[#C55A11] text-white text-xs font-bold rounded-xl hover:opacity-90 shadow-sm"
              >
                Upgrade to Premium to Unlock Public Networking
              </button>
            </div>
          ) : (
            // Premium or Pro Plus active visitor view preview
            <div className="space-y-8">
              <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-2xl p-4 flex gap-3 items-center text-xs text-emerald-700 dark:text-emerald-400">
                <Check className="w-5 h-5 shrink-0" />
                <div>
                  <span className="font-bold">Visitor Preview Active: </span>
                  {currentPlan === "premium" 
                    ? "Other verified logged-in community members can view this profile. It is hidden from search engines."
                    : "This profile is Fully Public, optimized for SEO, and crawlable on Google search."}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Side: Designation Card */}
                <div className="md:col-span-1 space-y-6">
                  <div className="bg-[#f4f7fb]/60 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/5 space-y-4">
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Designation</span>
                      <h4 className="font-bold text-[#1D1D46] dark:text-white text-sm">{displayedProfession}</h4>
                      <p className="text-xs text-gray-500">{displayedOrganisation}</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Location</span>
                      <p className="text-xs text-gray-500">{city}, {country}</p>
                    </div>
                    {currentPlan === "enterprise" && (
                      <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-white/10">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Corporate Links</span>
                        <div className="space-y-1.5">
                          <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                            <ExternalLink className="w-3 h-3" /> Website Portfolio
                          </a>
                          <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                            <ExternalLink className="w-3 h-3" /> LinkedIn Profile
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side: Followed Sectors & Focus Areas */}
                <div className="md:col-span-2 space-y-6">
                  <div className="space-y-3 text-left">
                    <h3 className="font-bold text-[#1D1D46] dark:text-white text-base">Trade Focus & Sourcing Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {followedSectors.map((sectorId) => (
                        <span 
                          key={sectorId} 
                          className="px-3 py-1.5 bg-[#1D1D46]/5 dark:bg-white/10 text-gray-700 dark:text-gray-200 text-xs font-bold rounded-xl capitalize"
                        >
                          {sectorId}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-gray-100 dark:border-white/5">
                    <h3 className="font-bold text-[#1D1D46] dark:text-white text-base">B2B Activity & Discussions</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl space-y-2">
                        <div className="flex justify-between text-[10px] text-gray-400">
                          <span className="font-bold">Commented on: Custom Duty revisions on high-grade steel</span>
                          <span>2 hours ago</span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300 italic">
                          "This regulation change will help local manufacturing units secure raw materials at a 12% lower input cost."
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl space-y-2">
                        <div className="flex justify-between text-[10px] text-gray-400">
                          <span className="font-bold">Discussed in: Port Tariffs & Digital Clearance Milestones</span>
                          <span>1 day ago</span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300 italic">
                          "Reducing documentation steps down to a single digital custom ledger is the key milestone we have been waiting for."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Private Owner view (original grid)
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* MAIN CONTENT AREA: MY FEED (Columns 1-8) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 border border-gray-100 dark:border-white/5 shadow-sm text-left">
              
              {/* Sector filter tabs */}
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-4 mb-6">
                <div>
                  <h3 className="font-bold text-[#1D1D46] dark:text-white text-lg">My Feed</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">Curated trade reports from your followed sectors.</p>
                </div>
              </div>

              {/* Filter tabs */}
              <div className="flex flex-wrap gap-1.5 mb-6 overflow-x-auto pb-1.5 max-h-16">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all shrink-0 ${
                    activeTab === "all"
                      ? "bg-[#1D1D46] text-white"
                      : "bg-[#f4f7fb] hover:bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-300"
                  }`}
                >
                  All Sectors
                </button>
                <button
                  onClick={() => setActiveTab("for-you")}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all shrink-0 flex items-center gap-1 ${
                    activeTab === "for-you"
                      ? "bg-[#1D1D46] text-white"
                      : "bg-[#f4f7fb] hover:bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-300"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F0652E]" />
                  For You
                </button>
                {followedSectors.map((sectorId) => (
                  <button
                    key={sectorId}
                    onClick={() => setActiveTab(sectorId)}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all shrink-0 capitalize ${
                      activeTab === sectorId
                        ? "bg-[#1D1D46] text-white"
                        : "bg-[#f4f7fb] hover:bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-300"
                    }`}
                  >
                    {sectorId}
                  </button>
                ))}
                <button
                  onClick={() => setActiveTab("cepa-calc")}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all shrink-0 flex items-center gap-1 ${
                    activeTab === "cepa-calc"
                      ? "bg-[#7c3aed] text-white"
                      : "bg-purple-500/10 hover:bg-purple-500/20 text-[#7c3aed]"
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <line x1="9" y1="9" x2="15" y2="9" />
                    <line x1="9" y1="13" x2="15" y2="13" />
                    <line x1="9" y1="17" x2="15" y2="17" />
                  </svg>
                  CEPA Customs Tool
                </button>
              </div>

              {/* Feed contents */}
              {activeTab === "for-you" && (
                <div className="bg-orange-500/5 border border-orange-500/15 rounded-2xl p-4 mb-6 flex gap-3 text-left">
                  <Sparkles className="w-6 h-6 text-orange-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-[#1D1D46] dark:text-white">Basic Curation Active</h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                      You are viewing a basic version of your 'For You' feed. Upgrade to a **Pro Reader** to unlock full AI-personalised news intelligence matching deep taxonomy.
                    </p>
                    <button 
                      onClick={() => router.push(`/${locale}/profile/plans/reader`)}
                      className="text-[10px] font-bold text-[#C55A11] hover:underline uppercase tracking-wider block pt-1"
                    >
                      View Pro Benefits →
                    </button>
                  </div>
                </div>
              )}

              {/* CEPA Calculator Tab */}
              {activeTab === "cepa-calc" && (
                currentPlan === "enterprise" ? (
                  <div className="bg-gradient-to-r from-purple-500/5 to-indigo-500/5 border border-purple-500/15 rounded-3xl p-6 space-y-6 text-left">
                    <div>
                      <h4 className="text-base font-bold text-[#1D1D46] dark:text-white flex items-center gap-2">
                        📊 Bilateral Customs Duty Calculator
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">Estimate savings on raw materials under India's active CEPA treaties.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Import Commodity Sector</label>
                        <select 
                          value={cepaSector}
                          onChange={(e) => setCepaSector(e.target.value)}
                          className="w-full px-3.5 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-700 dark:text-gray-250 rounded-xl focus:outline-none focus:border-[#7c3aed]"
                        >
                          <option value="chemicals">Chemicals & APIs (Standard 7.5% vs. 1% CEPA)</option>
                          <option value="steel">Alloys & Structural Steel (Standard 15% vs. 5% CEPA)</option>
                          <option value="textiles">High-Grade Cotton Textiles (Standard 10% vs. 0% CEPA)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">CEPA Treaty Country</label>
                        <select 
                          value={cepaCountry}
                          onChange={(e) => setCepaCountry(e.target.value)}
                          className="w-full px-3.5 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-700 dark:text-gray-250 rounded-xl focus:outline-none focus:border-[#7c3aed]"
                        >
                          <option value="UAE">India-UAE CEPA</option>
                          <option value="Australia">India-Australia ECTA</option>
                          <option value="Mauritius">India-Mauritius CECPA</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Estimated Cargo Declared Value (USD)</label>
                      <div className="flex gap-3">
                        <input 
                          type="number"
                          value={cepaValue}
                          onChange={(e) => setCepaValue(Number(e.target.value))}
                          className="flex-1 px-3.5 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-700 dark:text-gray-250 rounded-xl focus:outline-none focus:border-[#7c3aed]"
                        />
                        <button 
                          onClick={handleCalculateCepa}
                          className="px-5 py-2 bg-[#7c3aed] text-white text-xs font-bold rounded-xl hover:opacity-90 transition-all shadow-sm shrink-0"
                        >
                          Calculate Duties
                        </button>
                      </div>
                    </div>

                    {cepaResult && (
                      <div className="bg-white/50 dark:bg-white/5 border border-gray-150 dark:border-white/5 rounded-2xl p-5 grid grid-cols-3 gap-4 text-center">
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-gray-400 uppercase block">Standard Duty</span>
                          <span className="text-sm font-bold text-red-500">${cepaResult.originalDuty.toLocaleString()}</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-gray-400 uppercase block">CEPA Concessional</span>
                          <span className="text-sm font-bold text-emerald-500">${cepaResult.cepaDuty.toLocaleString()}</span>
                        </div>
                        <div className="space-y-1 bg-emerald-500/5 rounded-lg py-1 border border-emerald-500/10">
                          <span className="text-[9px] font-black text-emerald-600 block">Total Savings</span>
                          <span className="text-sm font-black text-emerald-600">${cepaResult.savings.toLocaleString()}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // Locked placard for Free, Pro, and Premium users
                  <div className="bg-purple-500/5 border border-purple-500/15 rounded-3xl p-8 text-center space-y-4">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto">
                      <ShieldAlert className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-base font-bold text-[#1D1D46] dark:text-white">🔒 CEPA Duty Calculator Locked</h4>
                      <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                        The customs duty calculator and bilateral tariff optimizer is reserved exclusively for **Pro Plus (Enterprise)** members.
                      </p>
                    </div>
                    <button 
                      onClick={() => router.push(`/${locale}/profile/plans/reader`)}
                      className="px-5 py-2 bg-[#7c3aed] text-white text-xs font-bold rounded-xl hover:opacity-90 transition-all shadow-md"
                    >
                      Upgrade to Pro Plus to Unlock Custom Calculators
                    </button>
                  </div>
                )
              )}

              {/* Articles List */}
              {activeTab !== "cepa-calc" && (
                <div className="space-y-5">
                {getMockFeed().map((article) => {
                  const isSaved = savedArticles.some(a => a.title === article.title);
                  return (
                    <div 
                      key={article.id} 
                      className="p-5 bg-[#f4f7fb] dark:bg-white/5 rounded-2xl border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 bg-[#1D1D46]/10 text-[#1D1D46] dark:text-blue-300 dark:bg-blue-950/30 text-[9px] font-bold uppercase tracking-wider rounded">
                            {getSectorName(article.sector)}
                          </span>
                          <span className="text-[9px] text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
                        </div>
                        <h4 className="font-bold text-[#1D1D46] dark:text-white text-sm hover:text-[#F0652E] cursor-pointer transition-all">{article.title}</h4>
                        <p className="text-[11px] text-gray-500 leading-normal">{article.desc}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                        <button 
                          onClick={() => toggleSaveArticle(article)}
                          className={`p-2 rounded-xl border border-gray-200 dark:border-white/10 transition-all ${
                            isSaved 
                              ? "bg-[#C55A11] border-[#C55A11] text-white" 
                              : "hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400"
                          }`}
                          title={isSaved ? "Saved" : "Save Article"}
                        >
                          <Bookmark className="w-4 h-4 fill-current" />
                        </button>
                        <button className="px-3.5 py-2 bg-white dark:bg-white/10 text-[#1D1D46] dark:text-white border border-gray-200 dark:border-white/10 hover:border-[#F0652E] dark:hover:border-[#F0652E] text-xs font-bold rounded-xl flex items-center gap-1">
                          Read <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              )}

            </div>
          </div>

          {/* SIDEBAR — QUICK STATS (Columns 9-12) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Profile Strength / Completeness Indicator */}
            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 border border-gray-100 dark:border-white/5 shadow-sm text-left space-y-4">
              <div>
                <h3 className="font-bold text-[#1D1D46] dark:text-white text-base flex justify-between items-center">
                  <span>Profile Strength</span>
                  <span className="text-xs font-black text-[#F0652E]">{completeness}%</span>
                </h3>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  {completeness < 50 ? "⚠️ Basic profile. Add photo and summary." : completeness < 80 ? "👍 Professional B2B setup active." : "🌟 All-Star B2B Profile status!"}
                </p>
              </div>

              <div className="space-y-2">
                <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-300 bg-gradient-to-r from-[#F0652E] to-emerald-500" 
                    style={{ width: `${completeness}%` }} 
                  />
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[9px] text-gray-500">
                    <span className="flex items-center gap-1">Name added</span>
                    <span className={editName ? "text-emerald-500 font-bold" : "text-gray-400"}>{editName ? "✓ +25%" : "Pending"}</span>
                  </div>
                  <div className="flex items-center justify-between text-[9px] text-gray-500">
                    <span className="flex items-center gap-1">Avatar uploaded</span>
                    <span className={avatarBase64 ? "text-emerald-500 font-bold" : "text-gray-400"}>{avatarBase64 ? "✓ +25%" : "Pending"}</span>
                  </div>
                  <div className="flex items-center justify-between text-[9px] text-gray-500">
                    <span className="flex items-center gap-1">Designation & Org</span>
                    <span className={(profession && organisation) ? "text-emerald-500 font-bold" : "text-gray-400"}>{(profession && organisation) ? "✓ +30%" : "Pending"}</span>
                  </div>
                  <div className="flex items-center justify-between text-[9px] text-gray-500">
                    <span className="flex items-center gap-1">Professional bio</span>
                    <span className={bio ? "text-emerald-500 font-bold" : "text-gray-400"}>{bio ? "✓ +20%" : "Pending"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visibility Settings widget */}
            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 border border-gray-100 dark:border-white/5 shadow-sm text-left space-y-4">
              <div>
                <h3 className="font-bold text-[#1D1D46] dark:text-white text-base">
                  Profile Visibility Mode
                </h3>
                <p className="text-[10px] text-gray-400 mt-0.5">Control how your B2B profile is viewed on the platform.</p>
              </div>

              {currentPlan === "free" || currentPlan === "pro" ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2.5 bg-amber-500/5 border border-amber-500/10 rounded-xl">
                    <span className="text-xs text-amber-600 font-bold flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4" /> Locked Stealth Private
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-normal">
                    Free and Pro reader profiles are strictly private. Upgrade to **Premium Reader** to upload custom photos and select platform public visibility modes.
                  </p>
                  <button 
                    onClick={() => router.push(`/${locale}/profile/plans/reader`)}
                    className="w-full py-2 bg-[#C55A11] hover:opacity-90 text-white font-bold text-xs rounded-xl shadow-sm transition-opacity"
                  >
                    Upgrade Plan
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Radio settings triggers */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 cursor-pointer">
                      <input 
                        type="radio" 
                        name="visibility" 
                        checked={profileVisibility === "private"}
                        onChange={() => setProfileVisibility("private")}
                        className="accent-[#F0652E]"
                      />
                      <div>
                        <span className="font-bold">Stealth Private Mode</span>
                        <p className="text-[9px] text-gray-400">Hidden from directory searches entirely.</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 cursor-pointer">
                      <input 
                        type="radio" 
                        name="visibility" 
                        checked={profileVisibility === "platform"}
                        onChange={() => setProfileVisibility("platform")}
                        className="accent-[#F0652E]"
                      />
                      <div>
                        <span className="font-bold">Platform-Only Public Mode</span>
                        <p className="text-[9px] text-gray-400">Only visible to verified logged-in platform members.</p>
                      </div>
                    </label>

                    {currentPlan === "enterprise" && (
                      <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 cursor-pointer">
                        <input 
                          type="radio" 
                          name="visibility" 
                          checked={profileVisibility === "public"}
                          onChange={() => setProfileVisibility("public")}
                          className="accent-[#F0652E]"
                        />
                        <div>
                          <span className="font-bold">Fully Public Mode (Google SEO)</span>
                          <p className="text-[9px] text-gray-400 font-medium">Indexed on search engines, discoverable by external clients.</p>
                        </div>
                      </label>
                    )}
                  </div>

                  {currentPlan === "premium" && (
                    <div className="p-2.5 bg-blue-500/5 border border-blue-500/10 rounded-xl text-[9px] text-blue-600 leading-normal flex items-start gap-1">
                      <Sparkles className="w-3 h-3 mt-0.5 shrink-0" />
                      <span>Upgrade to **Pro Plus** to enable Google SEO indexing and add external corporate social links!</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 border border-gray-100 dark:border-white/5 shadow-sm text-left space-y-6">
              <h3 className="font-bold text-[#1D1D46] dark:text-white text-base border-b border-gray-100 dark:border-white/5 pb-2.5">
                Quick Stats
              </h3>

              {/* Articles Read */}
              <div className="space-y-1">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Articles Read This Month</span>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-black text-[#1D1D46] dark:text-white">{articlesRead}</span>
                  <span className="text-[10px] text-gray-400 font-medium">unlimited basic reads active</span>
                </div>
              </div>

              {/* Sectors Following */}
              <div className="space-y-2">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Sectors Following ({followsCount})</span>
                <div className="flex flex-wrap gap-1.5">
                  {followedSectors.map((sectorId) => (
                    <span 
                      key={sectorId} 
                      className="px-2.5 py-1 bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-300 text-[10px] font-bold rounded-lg border border-gray-150 dark:border-white/5 capitalize shrink-0"
                    >
                      {sectorId}
                    </span>
                  ))}
                </div>
              </div>

              {/* Saves Limit */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <span>Saves Used</span>
                  <span>{savesCount} / 20</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      savesCount >= 20 ? "bg-red-500" : savesCount >= 15 ? "bg-orange-500" : "bg-[#1D1D46]"
                    }`} 
                    style={{ width: `${(savesCount / 20) * 100}%` }} 
                  />
                </div>

                {savesCount >= 15 && (
                  <div className="p-3 bg-orange-500/5 border border-orange-500/15 rounded-xl text-[10px] text-orange-600 dark:text-orange-400 leading-relaxed space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold">
                      <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                      <span>Nearing Saves Quota Limit</span>
                    </div>
                    <p>You have used {savesCount} of your 20 free bookmark saves. Upgrade to Pro Reader plan to save unlimited articles.</p>
                    <button 
                      onClick={() => router.push(`/${locale}/profile/plans/reader`)}
                      className="px-3 py-1.5 bg-[#C55A11] hover:bg-[#A0450B] text-white font-extrabold rounded-lg uppercase tracking-wider block text-[8px] transition-all shadow-sm"
                    >
                      Upgrade Plan
                    </button>
                  </div>
                )}
              </div>

              {/* Follows Limit */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <span>Follows Used</span>
                  <span>{followsCount} / 10</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      followsCount >= 10 ? "bg-red-500" : followsCount >= 8 ? "bg-orange-500" : "bg-[#1D1D46]"
                    }`} 
                    style={{ width: `${(followsCount / 10) * 100}%` }} 
                  />
                </div>

                {followsCount >= 8 && (
                  <div className="p-3 bg-orange-500/5 border border-orange-500/15 rounded-xl text-[10px] text-orange-600 dark:text-orange-400 leading-relaxed space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold">
                      <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                      <span>Nearing Follows Limit</span>
                    </div>
                    <p>You are following {followsCount} sectors (max 10). Upgrade to Pro Reader to follow unlimited leaders, companies, and sectors.</p>
                    <button 
                      onClick={() => router.push(`/${locale}/profile/plans/reader`)}
                      className="px-3 py-1.5 bg-[#C55A11] hover:bg-[#A0450B] text-white font-extrabold rounded-lg uppercase tracking-wider block text-[8px] transition-all shadow-sm"
                    >
                      Upgrade Plan
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* Interactive Saves List Panel */}
            {savedArticles.length > 0 && (
              <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 border border-gray-100 dark:border-white/5 shadow-sm text-left space-y-4">
                <h4 className="font-bold text-[#1D1D46] dark:text-white text-sm flex items-center justify-between">
                  <span>Saved Articles ({savesCount})</span>
                  <span className="text-[10px] text-gray-400 font-medium">{savesCount}/20 slots</span>
                </h4>
                <div className="divide-y divide-gray-100 dark:divide-white/5 max-h-60 overflow-y-auto pr-1">
                  {savedArticles.map((art) => (
                    <div key={art.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                      <div className="space-y-0.5 truncate">
                        <h5 className="font-bold text-gray-700 dark:text-white truncate cursor-pointer hover:text-[#F0652E]">{art.title}</h5>
                        <span className="text-[9px] text-gray-400 uppercase">{getSectorName(art.sector)}</span>
                      </div>
                      <button 
                        onClick={() => setSavedArticles(prev => prev.filter(a => a.id !== art.id))}
                        className="text-red-500 hover:text-red-700 text-xs shrink-0 font-bold"
                        title="Unsave"
                      >
                        Unsave
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trade Intelligence Briefings Library (PDF downloads) */}
            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 border border-gray-100 dark:border-white/5 shadow-sm text-left space-y-4 relative overflow-hidden">
              <div>
                <h4 className="font-bold text-[#1D1D46] dark:text-white text-sm flex items-center justify-between">
                  <span>Custom PDF Briefings</span>
                  <span className="text-[9px] bg-purple-500/10 text-purple-600 dark:text-purple-400 font-extrabold px-2 py-0.5 rounded-lg uppercase tracking-wider">Pro Plus Exclusive</span>
                </h4>
                <p className="text-[10px] text-gray-400 mt-0.5">Download full-length trade compliance intelligence reports.</p>
              </div>

              {currentPlan === "enterprise" ? (
                <div className="space-y-3">
                  <div className="p-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl flex items-center justify-between gap-3 text-xs">
                    <div className="truncate">
                      <span className="font-bold text-gray-700 dark:text-white block truncate">Indo-UAE CEPA Briefing.pdf</span>
                      <span className="text-[9px] text-gray-400">Trade Tariffs & Logistics Realignment</span>
                    </div>
                    <button 
                      onClick={() => alert("Downloading Indo-UAE CEPA Briefing.pdf...")}
                      className="px-2.5 py-1.5 bg-[#C55A11] hover:bg-[#A0450B] text-white font-bold text-[10px] rounded-lg shrink-0 flex items-center gap-1 shadow-sm"
                    >
                      Download
                    </button>
                  </div>
                  <div className="p-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl flex items-center justify-between gap-3 text-xs">
                    <div className="truncate">
                      <span className="font-bold text-gray-700 dark:text-white block truncate">Formulation Tariff Insights.pdf</span>
                      <span className="text-[9px] text-gray-400">Chemicals & Active Ingredients (API)</span>
                    </div>
                    <button 
                      onClick={() => alert("Downloading Formulation Tariff Insights.pdf...")}
                      className="px-2.5 py-1.5 bg-[#C55A11] hover:bg-[#A0450B] text-white font-bold text-[10px] rounded-lg shrink-0 flex items-center gap-1 shadow-sm"
                    >
                      Download
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 pt-2">
                  <div className="absolute inset-0 bg-white/80 dark:bg-[#122238]/95 backdrop-blur-[1px] flex flex-col items-center justify-center p-6 text-center space-y-3 z-20">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center">
                      <ShieldAlert className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-xs font-bold text-gray-700 dark:text-white">PDF Downloads Locked</h5>
                      <p className="text-[10px] text-gray-400 max-w-[200px] leading-relaxed">Upgrade to **Pro Plus Reader** to download trade intel PDF briefings.</p>
                    </div>
                    <button 
                      onClick={() => router.push(`/${locale}/profile/plans/reader`)}
                      className="px-3.5 py-1.5 bg-[#7c3aed] text-white text-[10px] font-bold rounded-lg shadow-md hover:opacity-90 transition-opacity"
                    >
                      Upgrade to Pro Plus
                    </button>
                  </div>
                  {/* Mock content below blur for premium layout effect */}
                  <div className="opacity-20 space-y-3 select-none pointer-events-none">
                    <div className="p-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl flex items-center justify-between text-xs">
                      <span>Mock CEPA Briefing.pdf</span>
                    </div>
                    <div className="p-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl flex items-center justify-between text-xs">
                      <span>Mock API Tariff Insights.pdf</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
