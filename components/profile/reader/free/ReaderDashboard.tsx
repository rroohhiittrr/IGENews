"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, Copy, Edit, Compass, BookOpen, Clock, 
  ChevronRight, ArrowRight, ShieldAlert, Sparkles, 
  TrendingUp, Award, ExternalLink, Bookmark, Check,
  Newspaper, Upload, X, MapPin, Briefcase, Building
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

  const profile = user?.onboardingForm || {};

  // Form edit states
  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState(profile.displayName || user?.name || "");
  const [avatarBase64, setAvatarBase64] = useState(profile.avatarBase64 || "");
  const [profession, setProfession] = useState(profile.profession || "");
  const [organisation, setOrganisation] = useState(profile.organisation || "");
  const [country, setCountry] = useState(profile.country || "India");
  const [city, setCity] = useState(profile.city || "Mumbai");
  const [state, setState] = useState(profile.state || "Maharashtra");

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
      setState(f.state || "Maharashtra");
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
      
      {/* ── PROFILE HEADER CARD (Section 1.3) ── */}
      <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 shadow-sm relative text-left mb-8">
        
        {/* FREE MEMBER Badge (Top-Right) */}
        <div className="absolute top-6 right-6 flex items-center gap-3">
          <button 
            onClick={() => router.push(`/${locale}/profile/plans/reader`)}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#C55A11] hover:opacity-90 text-white text-[10px] font-black rounded-lg uppercase tracking-wider shadow-sm transition-opacity"
            title="Free Member — Profile Unverified. Click to Upgrade to Pro Plan."
          >
            <Star className="w-3.5 h-3.5 fill-white text-white" />
            <span>FREE MEMBER</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          
          {/* Avatar (80x80px) with change trigger */}
          <div className="relative group shrink-0">
            {avatarBase64 ? (
              <img src={avatarBase64} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-gray-250 dark:border-white/10 shadow" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-[#1D1D46] text-white flex items-center justify-center font-bold text-xl uppercase shadow">
                {editName.slice(0, 2)}
              </div>
            )}
            <button 
              onClick={() => avatarInputRef.current?.click()}
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-white dark:bg-[#172c47] border border-gray-200 dark:border-white/10 rounded-full flex items-center justify-center shadow hover:text-[#F0652E] transition-all"
              title="Change Profile Picture"
            >
              <Upload className="w-3 h-3" />
            </button>
            <input type="file" ref={avatarInputRef} onChange={handleAvatarUpload} accept="image/png, image/jpeg" className="hidden" />
          </div>

          {/* Info Details */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2">
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
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-[#1D1D46] dark:text-white leading-tight">{editName}</h2>
                  <button onClick={() => setIsEditingName(true)} className="text-gray-400 hover:text-[#F0652E] transition-all" title="Edit Name">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Plan details and Upgrade CTA */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-xs">
              <span className="text-gray-400 font-semibold">Free Reader</span>
              <button 
                onClick={() => router.push(`/${locale}/profile/plans/reader`)}
                className="text-[#C55A11] hover:underline font-black flex items-center gap-0.5"
              >
                Upgrade to Pro →
              </button>
              <span className="text-gray-400">• Member Since: {getFormattedDate()}</span>
            </div>

            {/* Sub details */}
            {profession && (
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {profession}</span>
                {organisation && <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5" /> {organisation}</span>}
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {city}, {country}</span>
              </div>
            )}

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

      {/* ── GRID SYSTEM ── */}
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

            {/* Articles List */}
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

          </div>
        </div>

        {/* SIDEBAR — QUICK STATS (Columns 9-12) */}
        <div className="lg:col-span-4 space-y-6">
          
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
              {followsCount >= 8 && followsCount < 10 && (
                <div className="p-2.5 bg-orange-500/5 border border-orange-500/10 rounded-xl text-[10px] text-orange-600 leading-normal flex items-start gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>Nearing followed sectors limit ({followsCount}/10). Upgrade to Pro for unlimited follows!</span>
                </div>
              )}
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

        </div>

      </div>

    </div>
  );
}
