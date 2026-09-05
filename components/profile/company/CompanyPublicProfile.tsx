"use client";

import { useState, useMemo } from "react";
import { 
  ShieldCheck, MapPin, Mail, ExternalLink,
  Share2, Check, Star, AlertCircle, 
  Rocket, Crown, Search, ChevronRight, ChevronLeft,
  Building2, Users, FileText, Video, Image as ImageIcon,
  Download, Eye, ThumbsUp, MessageSquare, Repeat, Send,
  Briefcase, GraduationCap, Globe, CheckCircle2, Lock,
  Plus, MoreHorizontal, ArrowUpRight, Sparkles, Filter,
  Layers, Compass, Award, TrendingUp, BadgeCheck
} from "lucide-react";
import { useParams } from "next/navigation";

export interface CompanyPublicProfileProps {
  companyData?: any;
  tier?: "free" | "startup" | "company" | "corporate";
  onUpgradeClick?: () => void;
  isOwner?: boolean;
}

export default function CompanyPublicProfile({
  companyData = {},
  tier: initialTier = "company",
  onUpgradeClick,
  isOwner = false,
}: CompanyPublicProfileProps) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  // Active Plan State
  const [activeTier, setActiveTier] = useState<"free" | "startup" | "company" | "corporate">(initialTier);

  const isFree = activeTier === "free";
  const isStartup = activeTier === "startup";
  const isCompany = activeTier === "company";
  const isCorporate = activeTier === "corporate";
  const maxLeaderSeats = isCorporate ? 5 : isCompany ? 2 : isStartup ? 1 : 0;

  // 5 Clean Tabs State
  const [activeTab, setActiveTab] = useState<"home" | "about" | "services" | "posts" | "people">("home");

  // Posts Sub-Filters
  const [postFilter, setPostFilter] = useState<"all" | "images" | "videos" | "articles" | "documents">("all");
  const [postSort, setPostSort] = useState<"top" | "latest">("top");

  // People Search & Department Filter
  const [peopleSearch, setPeopleSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [stakeholderLens, setStakeholderLens] = useState<"capital" | "culture" | "partners" | "brand">("capital");

  // Modals & States
  const [selectedLeaderModal, setSelectedLeaderModal] = useState<any | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryService, setInquiryService] = useState("");
  const [docViewerModal, setDocViewerModal] = useState<any | null>(null);
  const [docPageNum, setDocPageNum] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isFollowing, setIsFollowing] = useState(true);
  const [overviewExpanded, setOverviewExpanded] = useState(false);

  // Profile data
  const companyName = companyData.companyName || (
    isStartup ? "Nexus Robotics & Automation" : 
    isFree ? "Acme Enterprise Solutions" : 
    isCorporate ? "Bharat Forge & Heavy Industries" : 
    "IGEN - India Global Expo News"
  );

  const website = companyData.website || "www.igenworld.com";
  const sector = companyData.sector || (isStartup ? "Industrial Robotics & Automation" : "International Trade and Development");
  const city = companyData.city || (isStartup ? "Bengaluru" : "Bengaluru South");
  const state = companyData.state || "Karnataka";
  const country = companyData.country || "India";
  const foundedYear = companyData.foundedYear || (isStartup ? "2021" : isCorporate ? "1988" : "2019");
  const workplacePolicy = companyData.workplacePolicy || "Hybrid";
  const followersCount = companyData.followersCount || (isCorporate ? "28,450 followers" : isCompany ? "5,163 followers" : isStartup ? "1,240 followers" : "420 followers");
  const employeeBracket = companyData.employeeBracket || (isCorporate ? "1,001-5,000 employees" : isCompany ? "51-200 employees" : isStartup ? "11-50 employees" : "1-10 employees");

  const tagline = companyData.tagline || (
    isStartup 
      ? "AI-powered sorting robots and smart automation systems for modern warehouse supply chains." 
      : isCorporate
      ? "One Ecosystem. Infinite Opportunities. Global Impact. Connecting Indian manufacturing with international trade corridors across 42+ countries."
      : "AI-driven platform for India-World business news, B2B trade expos, awards, and global executive networking."
  );

  const fullOverviewText = companyData.overview || `ABOUT - IGEN WORLD ECOSYSTEM - B2B BRANDS Growth Success Platforms "THINK BIG OR GO HOME" - is the one & only mindset change required by all CXO's for empowering VIKSIT BHARAT 2047 !!! IGEN WORLD ECOSYSTEM is India's integrated AI-powered B2B business growth ecosystem connecting trade intelligence, verified institutional visibility, export corridor facilitation, and global partnerships through one single unified platform.`;

  // Services List
  const servicesList = companyData.servicesList || [
    { id: "s1", name: "Trade Shows & Expos", desc: "Industry exhibitions, pavilions, and B2B delegation meetings", category: "Events" },
    { id: "s2", name: "Brand & Content Marketing", desc: "Industry reports, thought leadership, and executive articles", category: "Marketing" },
    { id: "s3", name: "B2B Advertising", desc: "Targeted sector newsfeed and newsletter banner campaigns", category: "Advertising" },
    { id: "s4", name: "Lead Generation", desc: "Direct inbound buyer inquiries and trade matchmaking", category: "Growth" },
    { id: "s5", name: "Export & Trade Corridors", desc: "Trade facilitation between India, UAE, UK, and European markets", category: "Trade" },
    { id: "s6", name: "SEO & Directory Listing", desc: "High-authority Google indexing on iGEN's verified company registry", category: "Growth" },
    { id: "s7", name: "Public Relations & Media", desc: "Press release distribution to verified media and newsrooms", category: "Media" },
    { id: "s8", name: "Supply Chain Auditing", desc: "Vendor quality checks and supplier compliance verification", category: "Operations" },
  ];

  // Team Members
  const teamMembers = companyData.teamMembers || [
    { id: "tm-1", name: "Aditya Sharma", role: "Principal Product Manager", dept: "Product & Engineering", city: "Bengaluru", state: "Karnataka", school: "Bangalore University", avatar: "A", verified: true, exp: "10+ yrs", bio: "Leads product strategy, taxonomy systems, and user experience across iGEN's platforms." },
    { id: "tm-2", name: "Saurav K. Verma", role: "Head of International Partnerships", dept: "Business Development", city: "Bengaluru", state: "Karnataka", school: "Bangalore University", avatar: "S", verified: true, exp: "14+ yrs", bio: "Manages trade partnerships with Middle East and European trade councils." },
    { id: "tm-3", name: "Namitha Rajan", role: "Senior Editor", dept: "Editorial & Content", city: "Bengaluru", state: "Karnataka", school: "Anna University Chennai", avatar: "N", verified: false, exp: "8+ yrs", bio: "Oversees research reports and business news across 60 GDP sectors." },
    { id: "tm-4", name: "Rajiv V. Mehta", role: "Managing Director & CEO", dept: "Leadership", city: "Bengaluru", state: "Karnataka", school: "Bangalore University", avatar: "R", verified: true, exp: "24+ yrs", bio: "24 years of experience building B2B exhibitions, trade platforms, and business networks." },
    { id: "tm-5", name: "Dr. Ananya Subramanian", role: "Chief Technology Officer", dept: "Product & Engineering", city: "Bengaluru", state: "Karnataka", school: "Anna University Chennai", avatar: "A", verified: true, exp: "16+ yrs", bio: "Architect of iGEN's multi-source AI news aggregation and tagging engine." },
    { id: "tm-6", name: "Vikram Singhania", role: "VP — Global Trade Operations", dept: "Business Development", city: "Bengaluru", state: "Karnataka", school: "Kendriya Vidyalaya", avatar: "V", verified: true, exp: "12+ yrs", bio: "Focuses on cross-border logistics, trade corridors, and overseas operations." },
    { id: "tm-7", name: "Pooja Hegde", role: "Director of Communications", dept: "Marketing & PR", city: "Bengaluru", state: "Karnataka", school: "Kendriya Vidyalaya", avatar: "P", verified: false, exp: "7+ yrs", bio: "Handles media relations, brand partnerships, and annual events." },
    { id: "tm-8", name: "Kiran Nambiar", role: "Lead Software Engineer", dept: "Product & Engineering", city: "Mysore", state: "Karnataka", school: "Thiruvalluvar University, Vellore", avatar: "K", verified: false, exp: "6+ yrs", bio: "Full-stack cloud developer specializing in high-performance web applications." },
    { id: "tm-9", name: "Meera Krishnan", role: "Head of Sustainability & ESG", dept: "Leadership", city: "Bengaluru", state: "Karnataka", school: "Karuna Yoga Vidya Peetham", avatar: "M", verified: true, exp: "15+ yrs", bio: "Leads environmental standards, corporate governance, and ESG compliance." },
  ];

  const departments = ["All", "Leadership", "Business Development", "Product & Engineering", "Editorial & Content", "Marketing & PR"];

  const filteredMembers = useMemo(() => {
    return teamMembers.filter((m: any) => {
      const matchesSearch = !peopleSearch.trim() || 
        (m.name || "").toLowerCase().includes(peopleSearch.toLowerCase()) ||
        (m.role || "").toLowerCase().includes(peopleSearch.toLowerCase()) ||
        (m.dept || "").toLowerCase().includes(peopleSearch.toLowerCase()) ||
        (m.school || "").toLowerCase().includes(peopleSearch.toLowerCase()) ||
        (m.city || "").toLowerCase().includes(peopleSearch.toLowerCase());
      
      const matchesDept = selectedDept === "All" || m.dept === selectedDept;
      return matchesSearch && matchesDept;
    });
  }, [peopleSearch, selectedDept, teamMembers]);

  // Demographic Stats
  const liveStats = [
    { label: "India", count: 21, percent: 95 },
    { label: "Karnataka, India", count: 20, percent: 90 },
    { label: "Greater Bengaluru Area", count: 19, percent: 85 },
    { label: "Bengaluru", count: 17, percent: 77 },
    { label: "Mysore", count: 1, percent: 8 },
  ];

  const studyStats = [
    { label: "Bangalore University", count: 3, percent: 75 },
    { label: "Kendriya Vidyalaya", count: 2, percent: 50 },
    { label: "Anna University Chennai", count: 2, percent: 50 },
    { label: "Karuna Yoga Vidya Peetham", count: 1, percent: 25 },
    { label: "Thiruvalluvar University, Vellore", count: 1, percent: 25 },
  ];

  // Feed Posts
  const postsList = companyData.postsList || [
    {
      id: "post-1",
      type: "documents",
      author: companyName,
      followers: followersCount,
      timestamp: "6d ago",
      title: "ONE SSO SESSION IN A CITY. TWO LEADERSHIP ASSETS. 20-YEAR VISIBILITY ROADMAP.",
      content: `What if your investment in one focused sector session could generate value for 20 years?

Introducing the IGEN SSO (Sector Session Outcome) publicity model:
• Pay once. Double the leadership. Long-term impact.
• One participating client receives two distinct leadership assets across all mega events.
• Industry outcome whitepapers, business reports, and long-term brand association.`,
      mediaType: "document",
      docTitle: "IGEN SSO Leadership & 20-Year Visibility Roadmap.pdf",
      docPages: 14,
      docSize: "4.8 MB",
      likes: 142,
      comments: 28,
      shares: 19,
    },
    {
      id: "post-2",
      type: "articles",
      author: companyName,
      followers: followersCount,
      timestamp: "1w ago",
      title: "How Indian Manufacturing Can Benefit from New Bilateral Trade Corridors",
      content: `A detailed look at how precision manufacturing companies in India are using bilateral trade agreements to enter UAE, GCC, and European supply chains with zero-tariff advantages. Read the full article co-authored with industry leaders.`,
      mediaType: "article",
      readTime: "6 min read",
      authorName: "Rajiv V. Mehta, CEO",
      likes: 218,
      comments: 44,
      shares: 36,
    },
    {
      id: "post-3",
      type: "images",
      author: companyName,
      followers: followersCount,
      timestamp: "2w ago",
      title: "Highlights from the Annual Trade Summit in Bengaluru",
      content: `Key moments from the opening ceremony of the Global Business Summit with 350+ industry leaders, diplomats, and international trade representatives in attendance.`,
      mediaType: "image",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&auto=format&fit=crop&q=80",
      likes: 312,
      comments: 52,
      shares: 41,
    },
    {
      id: "post-4",
      type: "videos",
      author: companyName,
      followers: followersCount,
      timestamp: "3w ago",
      title: "Product Demo: How iGEN Aggregates News from 1,550+ Global Industry Sources",
      content: `A quick walkthrough of our AI-driven news feed system, showing how we clean, categorize, and organize news updates in real time for business readers.`,
      mediaType: "video",
      videoLength: "04:18",
      likes: 189,
      comments: 19,
      shares: 27,
    },
  ];

  const filteredPosts = useMemo(() => {
    if (postFilter === "all") return postsList;
    return postsList.filter((p) => p.type === postFilter);
  }, [postFilter]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const openServiceInquiry = (serviceName: string = "") => {
    setInquiryService(serviceName);
    setInquiryModalOpen(true);
  };

  return (
    <div className="bg-[#f8fafc] text-slate-800 min-h-screen font-sans pb-28">
      
      {/* ========================================================================= */}
      {/* 0. CLEAN PLAN PREVIEW BAR                                                 */}
      {/* ========================================================================= */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 py-2.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-500">Preview Plan:</span>
            <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] uppercase ${
              isCorporate 
                ? "bg-purple-100 text-purple-800 border border-purple-200" 
                : isCompany 
                ? "bg-blue-100 text-blue-800 border border-blue-200" 
                : isStartup 
                ? "bg-emerald-100 text-emerald-800 border border-emerald-200" 
                : "bg-slate-100 text-slate-700"
            }`}>
              {isCorporate ? "Corporate Plan" : isCompany ? "Company Plan" : isStartup ? "Startup Plan" : "Free Profile"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-100 rounded-xl border border-slate-200">
            {[
              { id: "free", label: "1. Free Profile (₹0)" },
              { id: "startup", label: "2. Startup Plan (₹9,999)" },
              { id: "company", label: "3. Company Plan (₹16,999)" },
              { id: "corporate", label: "4. Corporate Plan (₹26,999)" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTier(t.id as any)}
                className={`px-3 py-1 rounded-lg font-semibold text-xs transition-all whitespace-nowrap ${
                  activeTier === t.id
                    ? "bg-[#0a66c2] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {onUpgradeClick && (
            <button
              onClick={onUpgradeClick}
              className="text-[#0a66c2] hover:underline font-semibold text-xs flex items-center gap-1"
            >
              <span>View Pricing Plans</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* ========================================================================= */}
        {/* 1. CLEAN PROFESSIONAL LINKEDIN COMPANY HEADER                             */}
        {/* ========================================================================= */}
        <div className="bg-white dark:bg-[#1b2228] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs mb-6">
          
          {/* Cover Banner */}
          <div className="h-36 sm:h-52 w-full bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
            
            {/* Top Right Subtle Plan Tier Indicator */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-xs ${
                isCorporate
                  ? "bg-slate-900/80 text-amber-300 border border-amber-500/40"
                  : isCompany
                  ? "bg-slate-900/80 text-blue-300 border border-blue-500/40"
                  : isStartup
                  ? "bg-slate-900/80 text-emerald-300 border border-emerald-500/40"
                  : "bg-slate-900/80 text-slate-300 border border-slate-700"
              }`}>
                {isCorporate ? "👑 Corporate Enterprise" : isCompany ? "⭐ Verified Company" : isStartup ? "🚀 High-Growth Venture" : "📋 Standard Listing"}
              </span>
            </div>
          </div>

          {/* Profile Identity & Action Bar */}
          <div className="px-6 sm:px-8 pb-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-14 sm:-mt-16 gap-4 mb-4">
              
              {/* Square Logo Overlapping Cover */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white dark:bg-[#1b2228] border-4 border-white dark:border-[#1b2228] shadow-md flex items-center justify-center p-2 shrink-0 z-10">
                {companyData.logo ? (
                  <img src={companyData.logo} alt={companyName} className="w-full h-full object-contain rounded-xl" />
                ) : (
                  <div className="w-full h-full rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-3xl">
                    {companyName.charAt(0)}
                  </div>
                )}
              </div>

              {/* Action Buttons Right Aligned */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 shadow-xs ${
                    isFollowing
                      ? "bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600"
                      : "bg-[#0a66c2] hover:bg-[#004182] text-white"
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <Check className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Follow</span>
                    </>
                  )}
                </button>

                <a
                  href={`https://${website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 border border-[#0a66c2] text-[#0a66c2] dark:text-[#70b5f9] dark:border-[#70b5f9] hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5"
                >
                  <span>Visit website</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={handleShare}
                  className="px-3.5 py-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5"
                  title="Share page"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Title & Metadata */}
            <div className="space-y-1.5 text-left">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  {companyName}
                </h1>
                {!isFree && (
                  <BadgeCheck className="w-6 h-6 text-[#0a66c2] fill-[#0a66c2]/10 shrink-0" />
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                {tagline}
              </p>

              <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-x-2 gap-y-1 pt-1 font-normal">
                <span>{sector}</span>
                <span>•</span>
                <span>{city}, {state}, {country}</span>
                <span>•</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{followersCount}</span>
                <span>•</span>
                <span>{employeeBracket}</span>
                <span>•</span>
                <span>{workplacePolicy}</span>
              </div>
            </div>
          </div>

          {/* Clean Horizontal Tabs Navigation */}
          <div className="border-t border-slate-200 dark:border-slate-800 px-4 sm:px-8 bg-white dark:bg-[#1b2228]">
            <nav className="flex items-center gap-2 sm:gap-4 overflow-x-auto">
              {[
                { id: "home", label: "Overview" },
                { id: "about", label: "Our Vision" },
                { id: "services", label: "Offerings" },
                { id: "posts", label: "Updates & Insights" },
                { id: "people", label: "Team" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-3.5 border-b-2 font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center shrink-0 ${
                    activeTab === tab.id
                      ? "border-[#0a66c2] text-[#0a66c2]"
                      : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: HOME                                                               */}
        {/* ========================================================================= */}
        {activeTab === "home" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Left Column */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* 1. Overview */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-base font-bold text-slate-900 mb-2">Overview</h2>
                <p className={`text-xs sm:text-sm text-slate-600 leading-relaxed ${overviewExpanded ? "" : "line-clamp-3"}`}>
                  {fullOverviewText}
                </p>
                <button
                  onClick={() => setOverviewExpanded(!overviewExpanded)}
                  className="mt-2 text-xs font-bold text-[#0a66c2] hover:underline"
                >
                  {overviewExpanded ? "Show less" : "... See more"}
                </button>
              </div>

              {/* Startup Metrics Widget */}
              {isStartup && (
                <div className="bg-white border border-emerald-200 rounded-2xl p-5 shadow-sm space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                    <Rocket className="w-3.5 h-3.5" /> Startup Growth Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">Annual Revenue</span>
                      <span className="text-lg font-black text-emerald-800">₹8.4 Cr</span>
                      <span className="text-[10px] text-emerald-600 font-semibold block">+140% YoY</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">Funding Stage</span>
                      <span className="text-lg font-black text-slate-900">Series A</span>
                      <span className="text-[10px] text-slate-500 block">Backed by Top VCs</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">Active Clients</span>
                      <span className="text-lg font-black text-slate-900">18 Enterprise</span>
                      <span className="text-[10px] text-slate-500 block">Supply Chain & Tech</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Offerings Preview */}
              <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white font-display">Commercial Capabilities &amp; Solutions</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Structured product modules and client deliverables</p>
                  </div>
                  <button
                    onClick={() => {
                      setInquiryService("Commercial RFP & Solutions Inquiry");
                      setInquiryModalOpen(true);
                    }}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 font-bold text-xs rounded-xl transition-all shadow-2xs"
                  >
                    Submit Commercial RFP
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {servicesList.slice(0, isFree ? 2 : isStartup ? 4 : isCompany ? 6 : 8).map((srv) => (
                    <div
                      key={srv.id}
                      onClick={() => openServiceInquiry(srv.name)}
                      className="p-3.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50/50 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer transition-all group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#0B4FBA] dark:group-hover:text-blue-400 transition-colors">{srv.name}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0B4FBA] dark:group-hover:text-blue-400 transition-colors" />
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{srv.desc}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActiveTab("services")}
                  className="text-xs font-bold text-[#0B4FBA] dark:text-blue-400 hover:underline flex items-center gap-1 pt-1 font-mono"
                >
                  <span>View all {servicesList.length} capabilities →</span>
                </button>
              </div>

              {/* 3. Articles & Publications */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-slate-900">Featured Articles</h2>
                  <span className="text-xs text-slate-500">By Company Leadership</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Trade Analysis</span>
                    <h3 className="text-xs font-bold text-slate-900 line-clamp-2">
                      How Indian Manufacturing Can Benefit from New Bilateral Trade Corridors
                    </h3>
                    <p className="text-[11px] text-slate-500">6 min read · 218 readers</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Industry Report</span>
                    <h3 className="text-xs font-bold text-slate-900 line-clamp-2">
                      Precision Manufacturing & Global Supply Chains in 2026
                    </h3>
                    <p className="text-[11px] text-slate-500">8 min read · 340 readers</p>
                  </div>
                </div>
              </div>

              {/* 4. Team Highlights */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Team Highlights</h2>
                    <p className="text-xs text-slate-500">Core leadership team</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("people")}
                    className="text-xs font-bold text-[#0a66c2] hover:underline"
                  >
                    View Full Team →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {teamMembers.slice(0, isStartup ? 1 : isCompany ? 2 : 4).map((ldr) => (
                    <div
                      key={ldr.id}
                      onClick={() => setSelectedLeaderModal(ldr)}
                      className="p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 cursor-pointer transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-sm shrink-0">
                          {ldr.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#0a66c2] transition-colors">{ldr.name}</h4>
                            {ldr.verified && <Check className="w-3 h-3 text-blue-600" />}
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{ldr.role}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 group-hover:text-[#0a66c2] transition-colors shrink-0 flex items-center gap-0.5">
                        <span>Profile</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Unlock Insights Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <h2 className="text-base font-bold text-slate-900">Company Insights & Benchmarks</h2>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200 shadow-sm">
                    Verified Stats
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Trust & Verification Score</span>
                    <span className="text-xl font-black text-emerald-600">94 / 100</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Top 5% in Sector</span>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Trade Alignment</span>
                    <span className="text-xl font-black text-[#0a66c2]">High Match</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Active Export Corridors</span>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Inbound Inquiries</span>
                    <span className="text-xl font-black text-slate-900">↑ +38% MoM</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">High Buyer Intent</span>
                  </div>
                </div>

                {isFree && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs">
                    <span className="text-amber-900">Upgrade your company plan to unlock full analytics and detailed competitor benchmarks.</span>
                    {onUpgradeClick && (
                      <button
                        onClick={onUpgradeClick}
                        className="px-3 py-1 bg-[#0a66c2] text-white font-bold rounded-lg text-xs hover:bg-[#004182] shrink-0 ml-2 shadow-sm"
                      >
                        Upgrade
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Affiliated Pages */}
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#0a66c2]" />
                  <span>Affiliated Pages</span>
                </h3>
                
                <div className="space-y-3">
                  {[
                    { tag: "VB", name: "VB World", sub: "Events & Exhibitions", follow: true },
                    { tag: "iGEN", name: "India Global News", sub: "B2B News Platform", follow: true },
                    { tag: "VBW", name: "Viksit Bharat World", sub: "Trade & Industry Portal", follow: false },
                  ].map((aff, i) => (
                    <div key={i} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold flex items-center justify-center text-xs">
                          {aff.tag}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{aff.name}</h4>
                          <p className="text-[10px] text-slate-500">{aff.sub}</p>
                        </div>
                      </div>
                      <button className="text-xs font-bold text-[#0a66c2] hover:underline">
                        {aff.follow ? "✓ Following" : "+ Follow"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: ABOUT                                                              */}
        {/* ========================================================================= */}
        {activeTab === "about" && (
          <div className="max-w-4xl space-y-6">
            
            {/* Overview / Vision */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">Our Vision & Mission</h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {fullOverviewText}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">Website</span>
                  <a href={`https://${website}`} target="_blank" rel="noreferrer" className="text-[#0a66c2] font-bold flex items-center gap-1 mt-0.5 hover:underline">
                    {website} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">Primary Sector</span>
                  <span className="text-slate-900 font-bold">{sector}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">Company Size</span>
                  <span className="text-slate-900 font-bold">{employeeBracket}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">Founded</span>
                  <span className="text-slate-900 font-bold">{foundedYear}</span>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* STRATEGIC STAKEHOLDER PERSPECTIVES HUB (4 Lenses)                         */}
            {/* ========================================================================= */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#0a66c2]" />
                    <span>Strategic Stakeholder Perspectives</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select a strategic stakeholder lens to review macro growth signals, leadership ethos, and partnership credentials.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto">
                  {[
                    { id: "capital", label: "📈 Capital & Growth" },
                    { id: "culture", label: "👥 Culture & Talent" },
                    { id: "partners", label: "🤝 Partners & Supply" },
                    { id: "brand", label: "📢 Brand & Media" },
                  ].map((lens) => (
                    <button
                      key={lens.id}
                      onClick={() => setStakeholderLens(lens.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                        stakeholderLens === lens.id
                          ? "bg-white text-[#0a66c2] shadow-2xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {lens.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lens 1: Capital & Expansion Vision */}
              {stakeholderLens === "capital" && (
                <div className="space-y-4 pt-1 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100">
                      <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block mb-1">Growth Stage</span>
                      <span className="text-xs font-bold text-slate-900">{companyData.growthStage || "Profitable & Scaling"}</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Positive Operating Cash Flow</p>
                    </div>
                    <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">CapEx Allocation</span>
                      <span className="text-xs font-bold text-slate-900">{companyData.capexAllocation || "Automation & R&D"}</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Phase-2 Infrastructure Expansion</p>
                    </div>
                    <div className="p-3.5 bg-purple-50/50 rounded-xl border border-purple-100">
                      <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block mb-1">Target Corridors</span>
                      <span className="text-xs font-bold text-slate-900">{companyData.targetCorridors || "GCC & European Union"}</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">25% Export Revenue Target</p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-2">
                    <p className="font-semibold text-slate-800">
                      Strategic Capital &amp; Infrastructure Roadmap (2026–2028):
                    </p>
                    <p>
                      {companyData.capitalRoadmap || "Deploying state-of-the-art automated assembly lines, expanding localized supply chain integration across India, and accelerating B2B digital export capabilities to support Mission Viksit Bharat 2047."}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-xl shadow-sm">
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-amber-400" />
                        <span>Investor Due Diligence &amp; Confidential Pitch Deck</span>
                      </h4>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        Qualified family offices, VC funds, and institutional banks can request official corporate documentation.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setInquiryService("Investor & Capital Due Diligence Deck Request");
                        setInquiryModalOpen(true);
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-[#F0652E] to-amber-500 text-white text-xs font-bold rounded-lg shadow-sm hover:opacity-90 transition-all shrink-0"
                    >
                      Request Corporate Deck
                    </button>
                  </div>
                </div>
              )}

              {/* Lens 2: Culture & Employer Brand */}
              {stakeholderLens === "culture" && (
                <div className="space-y-4 pt-1 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Workplace Ethos</span>
                      <span className="text-xs font-bold text-slate-900">{workplacePolicy} Collaboration</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Hubs in {city}</p>
                    </div>
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Talent Retention</span>
                      <span className="text-xs font-bold text-slate-900">{companyData.talentRetention || "94% Senior Retention"}</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Meritocracy &amp; Equity Incentives</p>
                    </div>
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Academic Ties</span>
                      <span className="text-xs font-bold text-slate-900">{companyData.academicPartnerships || "5+ University Partners"}</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">R&amp;D Fellowships &amp; Labs</p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
                    <p className="font-semibold text-slate-800 mb-1">Engineering-First Leadership Culture:</p>
                    <p>
                      {companyData.culturePhilosophy || "We foster an environment where domain experts, senior researchers, and operational managers take complete ownership of mission-critical outcomes. Continuous learning, peer recognition, and technical excellence drive our institutional growth."}
                    </p>
                  </div>
                </div>
              )}

              {/* Lens 3: Supply Chain & Partners */}
              {stakeholderLens === "partners" && (
                <div className="space-y-4 pt-1 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Accreditation</span>
                      <span className="text-xs font-bold text-slate-900">{companyData.vendorAccreditation || "Tier-1 Approved Vendor"}</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Major Industrial OEMs</p>
                    </div>
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Supply Chain Nodes</span>
                      <span className="text-xs font-bold text-slate-900">{companyData.supplyChainNodes || "12 Multi-Sourced Hubs"}</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Zero Single-Point Bottlenecks</p>
                    </div>
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Financial Standing</span>
                      <span className="text-xs font-bold text-slate-900">{companyData.financialStanding || "Prime Working Capital"}</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Strong Institutional Banking</p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
                    <p className="font-semibold text-slate-800 mb-1">Institutional Reliability &amp; Compliance:</p>
                    <p>
                      {companyData.partnersNarrative || "Built on strict adherence to international procurement standards, audited vendor governance, and rapid-turnaround contract execution for global commercial partners."}
                    </p>
                  </div>
                </div>
              )}

              {/* Lens 4: Brand & Media */}
              {stakeholderLens === "brand" && (
                <div className="space-y-4 pt-1 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Sector Authority</span>
                      <span className="text-xs font-bold text-slate-900">{companyData.sectorAuthority || "Top 10 Verified"}</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Sector: {sector}</p>
                    </div>
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Press Coverage</span>
                      <span className="text-xs font-bold text-slate-900">{companyData.pressCoverage || "National Media Features"}</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Viksit Bharat 2047 Reports</p>
                    </div>
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Official Canonical URL</span>
                      <span className="text-xs font-bold text-blue-600 font-mono">indiaglobalnews.com</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Google-Indexed Property</p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
                    <p className="font-semibold text-slate-800 mb-1">Media Kit &amp; Brand Inquiries:</p>
                    <p>
                      {companyData.brandNarrative || "Official executive quotes, high-resolution logos, and company milestones are available for accredited journalists and business media editors."}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Corporate Certifications & Global Trade Corridors (For Corporate Plan) */}
            {isCorporate && (
              <div className="space-y-6">
                
                {/* Global Trade Corridors Grid */}
                <div className="bg-gradient-to-br from-[#1D1D46] to-slate-900 text-white border border-purple-500/30 rounded-2xl p-6 shadow-md space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Globe className="w-5 h-5 text-amber-400" />
                        <h3 className="text-base font-bold text-white">Global Trade &amp; Export Corridors</h3>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Active B2B trade corridors connected with international procurement delegations and trade ports.
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-400/30">
                      Corporate Network
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">🌍 GCC Corridor</span>
                      <h4 className="text-xs font-bold text-white">Port Jebel Ali, Dubai</h4>
                      <p className="text-[10px] text-slate-400">Middle East &amp; North Africa Hub</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">🇪🇺 EU Corridor</span>
                      <h4 className="text-xs font-bold text-white">Port of Rotterdam</h4>
                      <p className="text-[10px] text-slate-400">European Industrial Gateway</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">🇺🇸 North America</span>
                      <h4 className="text-xs font-bold text-white">Port of Houston</h4>
                      <p className="text-[10px] text-slate-400">OEM Supply Chain Fulfillment</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
                      <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">🌏 ASEAN Hub</span>
                      <h4 className="text-xs font-bold text-white">Singapore Maritime Hub</h4>
                      <p className="text-[10px] text-slate-400">Southeast Asia Corridor</p>
                    </div>
                  </div>
                </div>

                {/* Quality Certifications */}
                <div className="bg-white border border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-purple-900 flex items-center gap-2">
                    <Crown className="w-4 h-4 text-purple-600" />
                    <span>International Quality Certifications &amp; Compliance</span>
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-xs font-bold text-slate-900 block">BIS Certified</span>
                      <span className="text-[10px] text-emerald-600 font-semibold">Valid 2028</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-xs font-bold text-slate-900 block">CE Mark</span>
                      <span className="text-[10px] text-emerald-600 font-semibold">EU Verified</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-xs font-bold text-slate-900 block">US FDA</span>
                      <span className="text-[10px] text-emerald-600 font-semibold">Registered</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-xs font-bold text-slate-900 block">AS9100D</span>
                      <span className="text-[10px] text-emerald-600 font-semibold">Aerospace</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-xs font-bold text-slate-900 block">ISO 9001</span>
                      <span className="text-[10px] text-emerald-600 font-semibold">Quality Standard</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Workplace Policy */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-2">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#0a66c2]" />
                <span>{workplacePolicy} Workplace Policy</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {workplacePolicy} work policy with teams operating directly at our main offices and research facilities in {city}.
              </p>
            </div>

            {/* Locations */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0a66c2]" />
                <span>Office Locations</span>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Headquarters</span>
                  <h3 className="text-xs font-bold text-slate-900">Registered Office</h3>
                  <p className="text-[11px] text-slate-500">{city}, {country}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">Overseas Trade Office</span>
                  <h3 className="text-xs font-bold text-slate-900">International Corridor Office</h3>
                  <p className="text-[11px] text-slate-500">Port Jebel Ali, Dubai, United Arab Emirates</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: OFFERINGS                                                          */}
        {/* ========================================================================= */}
        {activeTab === "services" && (
          <div className="max-w-4xl space-y-6">
            
            {/* Header Banner */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">Commercial Offerings &amp; Solutions</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-lg">
                  Explore verified B2B capabilities, technical deliverables, and commercial scopes.
                </p>
              </div>

              <button
                onClick={() => {
                  setInquiryService("Commercial RFP & Solutions Inquiry");
                  setInquiryModalOpen(true);
                }}
                className="px-5 py-2.5 bg-[#0B4FBA] hover:bg-[#083884] text-white font-bold text-xs rounded-xl shadow-xs transition-all shrink-0"
              >
                Submit Commercial RFP
              </button>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {servicesList.map((srv) => (
                <div
                  key={srv.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2.5 hover:border-slate-400 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-700">
                      {srv.category}
                    </span>
                    <button
                      onClick={() => openServiceInquiry(srv.name)}
                      className="text-xs font-bold text-[#0a66c2] hover:underline flex items-center gap-1"
                    >
                      <span>Inquire</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{srv.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{srv.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: POSTS                                                              */}
        {/* ========================================================================= */}
        {activeTab === "posts" && (
          <div className="max-w-4xl space-y-6">
            
            {/* Filters */}
            <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2 overflow-x-auto">
                {[
                  { id: "all", label: "All Posts" },
                  { id: "documents", label: "📄 Documents" },
                  { id: "articles", label: "📰 Articles" },
                  { id: "images", label: "🖼️ Photos" },
                  { id: "videos", label: "🎥 Videos" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setPostFilter(f.id as any)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                      postFilter === f.id
                        ? "bg-[#0a66c2] text-white shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1 text-xs text-slate-500">
                <span>Sort by:</span>
                <select
                  value={postSort}
                  onChange={(e) => setPostSort(e.target.value as any)}
                  className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value="top">Top Posts</option>
                  <option value="latest">Latest Posts</option>
                </select>
              </div>
            </div>

            {/* Post Feed */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-sm">
                        {post.author.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{post.author}</span>
                          <Check className="w-3 h-3 text-blue-600" />
                        </h4>
                        <p className="text-[10px] text-slate-500">{post.timestamp}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2">{post.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                      {post.content}
                    </p>
                  </div>

                  {/* Document Carousel Viewer */}
                  {post.mediaType === "document" && (
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-slate-900">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-red-500" />
                          <span className="text-xs font-bold">{post.docTitle}</span>
                        </div>
                        <span className="text-[10px] text-slate-500">{post.docPages} Pages · {post.docSize}</span>
                      </div>

                      <div className="h-36 rounded-lg bg-white border border-slate-200 flex flex-col items-center justify-center p-4 text-center shadow-sm">
                        <p className="text-xs text-slate-700 mb-2 font-bold">Interactive PDF Preview</p>
                        <button
                          onClick={() => {
                            setDocViewerModal(post);
                            setDocPageNum(1);
                          }}
                          className="px-4 py-2 bg-[#0a66c2] hover:bg-[#004182] text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
                        >
                          <Eye className="w-3.5 h-3.5" /> Read Full Document (1 of {post.docPages})
                        </button>
                      </div>
                    </div>
                  )}

                  {post.mediaType === "image" && (
                    <div className="rounded-xl overflow-hidden max-h-72 border border-slate-200">
                      <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                  )}

                  {post.mediaType === "article" && (
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-bold text-blue-600 uppercase">Article</span>
                        <h4 className="text-xs font-bold text-slate-900 mt-0.5">{post.title}</h4>
                        <p className="text-[10px] text-slate-500 mt-1">By {post.authorName} · {post.readTime}</p>
                      </div>
                      <button className="px-3 py-1.5 bg-[#0a66c2] text-white text-xs font-bold rounded-lg shrink-0">
                        Read
                      </button>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    <span>👍 {post.likes} likes</span>
                    <span>{post.comments} comments · {post.shares} shares</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: TEAM                                                               */}
        {/* ========================================================================= */}
        {activeTab === "people" && (
          <div className="max-w-5xl space-y-6">
            
            {/* Demographics Overview Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#0a66c2]" />
                    <span>{teamMembers.length} Team Members</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">Demographics and full team directory</p>
                </div>

                {/* Department Filter */}
                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {departments.slice(0, 4).map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDept(d)}
                      className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                        selectedDept === d
                          ? "bg-slate-900 text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                <input
                  type="text"
                  value={peopleSearch}
                  onChange={(e) => setPeopleSearch(e.target.value)}
                  placeholder="Search employees by title, keyword or school..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0a66c2]"
                />
              </div>

              {/* Demographic Bar Charts (Company & Corporate Tier Inclusion) */}
              {isCompany || isCorporate ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  
                  {/* Where they live */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>Where they live</span>
                      </h3>
                      <span className="text-[10px] font-mono text-slate-400">5 Cities</span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      {liveStats.map((item, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-[11px] font-semibold text-slate-700">
                            <span>{item.count} | {item.label}</span>
                          </div>
                          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#566848] rounded-full transition-all duration-500"
                              style={{ width: `${item.percent}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Where they studied */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                        <span>Where they studied</span>
                      </h3>
                      <span className="text-[10px] font-mono text-slate-400">Schools</span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      {studyStats.map((item, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-[11px] font-semibold text-slate-700">
                            <span>{item.count} | {item.label}</span>
                          </div>
                          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#006070] rounded-full transition-all duration-500"
                              style={{ width: `${item.percent}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-xl flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Interactive Team Demographics (Location &amp; Education)</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Where team members live and studied is available on Company &amp; Corporate Plans.</p>
                  </div>
                  {onUpgradeClick && (
                    <button
                      onClick={onUpgradeClick}
                      className="px-3 py-1.5 bg-[#0a66c2] text-white text-xs font-bold rounded-lg shrink-0 hover:bg-[#084e96] transition-all"
                    >
                      Upgrade Plan
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Team Directory Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-sm font-bold text-slate-900">
                  Associated Team Directory ({filteredMembers.length})
                </h3>
                {maxLeaderSeats > 0 && (
                  <span className="text-xs font-semibold text-slate-500">
                    {maxLeaderSeats} Bundled Verified {maxLeaderSeats === 1 ? "Leader" : "Leaders"} ({activeTier.toUpperCase()})
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMembers.map((member, idx) => {
                  const isBundledVerified = idx < maxLeaderSeats;
                  return (
                    <div
                      key={member.id}
                      onClick={() => setSelectedLeaderModal(member)}
                      className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-slate-400 transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-start justify-between gap-3">
                          <div className="w-11 h-11 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-sm shrink-0">
                            {member.avatar}
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-[10px] font-semibold text-slate-600">
                            {member.dept}
                          </span>
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0a66c2] transition-colors">
                              {member.name}
                            </h4>
                            {isBundledVerified && (
                              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold" title="Bundled Verified Leader">
                                <Check className="w-3 h-3 text-blue-600" />
                                <span className="text-[9px]">Verified</span>
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#0a66c2] font-semibold mt-0.5 line-clamp-1">{member.role}</p>
                        </div>

                        <div className="space-y-0.5 text-[11px] text-slate-500 pt-1">
                          <p className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" /> {member.city}, {member.state}
                          </p>
                          <p className="flex items-center gap-1 line-clamp-1">
                            <GraduationCap className="w-3 h-3 text-slate-400" /> {member.school}
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-[#0a66c2] transition-colors">
                        <span>View Profile</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: REQUEST SERVICES FORM                                            */}
      {/* ========================================================================= */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 text-slate-900 shadow-2xl relative">
            <button
              onClick={() => {
                setInquiryModalOpen(false);
                setInquirySent(false);
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>

            {inquirySent ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Inquiry Sent Successfully</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Your message has been sent to <strong>{companyName}</strong>. You will receive a confirmation email shortly.
                </p>
                <button
                  onClick={() => {
                    setInquiryModalOpen(false);
                    setInquirySent(false);
                  }}
                  className="mt-4 px-6 py-2 bg-[#0a66c2] text-white font-bold text-xs rounded-xl"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">B2B Trade &amp; Commercial Inquiry</h3>
                  <p className="text-xs text-slate-500">Submit a direct commercial inquiry or RFP to {companyName}.</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Your Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Work Email</label>
                      <input
                        type="email"
                        placeholder="sarah@company.com"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Phone / WhatsApp</label>
                      <input
                        type="text"
                        placeholder="+91 98765 43210"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Service Required</label>
                    <select
                      value={inquiryService}
                      onChange={(e) => setInquiryService(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
                    >
                      <option value="">Select a service...</option>
                      {servicesList.map((s) => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Project Details / Message</label>
                    <textarea
                      rows={3}
                      placeholder="Describe what you need, project scope, or timeline..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setInquirySent(true)}
                  className="w-full py-3 bg-[#0a66c2] hover:bg-[#004182] text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                >
                  Send Inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: DOCUMENT VIEWER                                                  */}
      {/* ========================================================================= */}
      {docViewerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 text-slate-900 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-red-500" />
                <div>
                  <h3 className="text-sm font-bold">{docViewerModal.docTitle}</h3>
                  <p className="text-[10px] text-slate-500">Page {docPageNum} of {docViewerModal.docPages} · PDF Document</p>
                </div>
              </div>
              <button
                onClick={() => setDocViewerModal(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="h-80 bg-slate-50 rounded-xl border border-slate-200 p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Section {docPageNum}: Overview & Summary</span>
                <h4 className="text-base font-bold text-slate-900">Dual Publicity Model & 20-Year Business Visibility Roadmap</h4>
                <p className="text-xs text-slate-600 leading-relaxed pt-2">
                  Comprehensive strategy document detailing long-term branding assets and participation across all major B2B events.
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-200">
                <span>Document ID: IGEN-DOC-2026</span>
                <span>Verified Publication</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDocPageNum(Math.max(1, docPageNum - 1))}
                  disabled={docPageNum === 1}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-xs font-semibold transition-all text-slate-700"
                >
                  Previous
                </button>
                <span className="text-xs font-mono text-slate-600">{docPageNum} / {docViewerModal.docPages}</span>
                <button
                  onClick={() => setDocPageNum(Math.min(docViewerModal.docPages, docPageNum + 1))}
                  disabled={docPageNum === docViewerModal.docPages}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-xs font-semibold transition-all text-slate-700"
                >
                  Next
                </button>
              </div>

              <button
                onClick={() => alert("Downloading PDF document...")}
                className="px-4 py-2 bg-[#0a66c2] hover:bg-[#004182] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" /> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: PROFILE MODAL                                                    */}
      {/* ========================================================================= */}
      {selectedLeaderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 text-slate-900 shadow-2xl relative space-y-4">
            <button
              onClick={() => setSelectedLeaderModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-slate-900 text-white font-bold text-xl flex items-center justify-center">
                {selectedLeaderModal.avatar}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                  <span>{selectedLeaderModal.name}</span>
                  {selectedLeaderModal.verified && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </h3>
                <p className="text-xs text-[#0a66c2] font-semibold">{selectedLeaderModal.role}</p>
                <p className="text-[11px] text-slate-500">{selectedLeaderModal.dept}</p>
              </div>
            </div>

            {selectedLeaderModal.bio && (
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                {selectedLeaderModal.bio}
              </p>
            )}

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-1.5">
              <p>📍 Location: <strong>{selectedLeaderModal.city}, {selectedLeaderModal.state}</strong></p>
              <p>🎓 Education: <strong>{selectedLeaderModal.school}</strong></p>
              <p>🛡️ Status: <strong className="text-emerald-700">Verified Member</strong></p>
            </div>

            <button
              onClick={() => {
                setSelectedLeaderModal(null);
                openServiceInquiry(`Inquiry regarding ${selectedLeaderModal.name}`);
              }}
              className="w-full py-2.5 bg-[#0a66c2] hover:bg-[#004182] text-white font-bold text-xs rounded-xl shadow-sm transition-all"
            >
              Send Message
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
