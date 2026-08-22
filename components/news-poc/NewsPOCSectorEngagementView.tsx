"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  MessageSquare,
  ThumbsUp,
  Share2,
  Bookmark,
  Plus,
  HelpCircle,
  CheckCircle2,
  Users,
  Calendar,
  Sparkles,
  Lock,
  Mail,
  ChevronRight,
  TrendingUp,
  Award,
  Filter,
  Check,
  Crown,
  Zap,
  Cpu,
  Layers,
  Globe,
  Star,
  Activity,
  Flame,
  ShieldCheck,
  UserCheck,
  Search,
  ArrowRight,
  Send,
  Eye,
  BarChart2,
  Briefcase,
  ExternalLink,
  MessageCircle,
  Radio,
  FileText,
  UserPlus,
  Compass,
  AlertCircle
} from "lucide-react";
import { IGEN_50_SECTORS } from "./igenTaxonomyData";

// ─────────────────────────────────────────────────────────────────────────────
// DATA TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface DiscussionItem {
  id: string;
  sector: string;
  industry: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  company: string;
  authorAvatarBg: string;
  authorInitials: string;
  time: string;
  views: string;
  replies: number;
  likes: number;
  isTrending?: boolean;
  category: "Policy" | "Technology" | "Trade" | "Investment" | "General";
}

interface SectorPollItem {
  id: string;
  sector: string;
  question: string;
  totalVotes: number;
  closingDate: string;
  options: { label: string; pct: number }[];
}

interface ExpertQASubmission {
  id: string;
  question: string;
  sector: string;
  industry: string;
  askedBy: string;
  answeredBy: string;
  expertRole: string;
  expertCompany: string;
  answerSummary: string;
  fullAnswer: string;
  upvotes: number;
  time: string;
}

interface FeaturedExpertItem {
  id: string;
  name: string;
  designation: string;
  company: string;
  sector: string;
  expertise: string[];
  followersCount: string;
  questionsAnswered: number;
  avatarBg: string;
  initials: string;
  verified: boolean;
}

interface SectorCommunityHub {
  id: string;
  sector: string;
  icon: string;
  members: string;
  activeDiscussions: number;
  latestActivity: string;
  popularTopics: string[];
}

interface IndustrySurveyItem {
  id: string;
  title: string;
  sector: string;
  participants: string;
  status: "Live Survey" | "Published Report";
  keyFindings: { label: string; pct: string }[];
  isPremium?: boolean;
}

interface ContributorItem {
  rank: number;
  name: string;
  role: string;
  company: string;
  sector: string;
  points: string;
  badge: "Top Contributor" | "Industry Expert" | "Rising Voice" | "Sector Champion" | "Verified Professional";
  avatarBg: string;
  initials: string;
}

interface PeerNetworkingItem {
  id: string;
  name: string;
  designation: string;
  company: string;
  sector: string;
  industry: string;
  mutualInterests: string;
  avatarBg: string;
  initials: string;
}

interface IndustryOpportunityItem {
  id: string;
  title: string;
  type: "Business Partnership" | "Investment" | "Export" | "Procurement" | "Project";
  sector: string;
  country: string;
  description: string;
  deadline: string;
  isPremium?: boolean;
}

interface UpcomingSectorEvent {
  id: string;
  title: string;
  sector: string;
  date: string;
  location: string;
  type: "Webinar" | "Conference" | "Roundtable" | "Summit";
  attendees: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// DATASETS
// ─────────────────────────────────────────────────────────────────────────────

const TRENDING_DISCUSSIONS: DiscussionItem[] = [
  {
    id: "disc-1",
    sector: "Manufacturing",
    industry: "Industrial Automation & Robotics",
    title: "How will AI-driven edge robotics transform heavy manufacturing over the next 5 years?",
    excerpt: "Tier-1 auto OEMs are deploying automated visual quality inspection on active assembly lines, cutting rework defect rates by 42%. Are component suppliers ready for API integration?",
    author: "Vikramaditya Sharma",
    authorRole: "VP Global Manufacturing",
    company: "Bharat Forge Solutions",
    authorAvatarBg: "from-blue-600 to-indigo-700",
    authorInitials: "VS",
    time: "2 hours ago",
    views: "2.8k",
    replies: 126,
    likes: 340,
    isTrending: true,
    category: "Technology"
  },
  {
    id: "disc-2",
    sector: "Energy & CleanTech",
    industry: "Green Hydrogen Pipelines",
    title: "What will be the biggest renewable energy arbitrage opportunity across Western European off-take routes?",
    excerpt: "With European CBAM mandates tightening on industrial steel and fertilizer inputs, Indian clean ammonia bunkering ports are commanding a competitive levelized price advantage.",
    author: "Dr. Ananya Varma",
    authorRole: "Senior Energy Strategist",
    company: "CleanGrid International",
    authorAvatarBg: "from-emerald-600 to-teal-700",
    authorInitials: "AV",
    time: "4 hours ago",
    views: "2.4k",
    replies: 94,
    likes: 215,
    isTrending: true,
    category: "Trade"
  },
  {
    id: "disc-3",
    sector: "Semiconductors",
    industry: "OSAT Silicon Packaging",
    title: "Overcoming silicon substrate capex bottlenecks: Can domestic fabs scale sub-14nm packaging by 2027?",
    excerpt: "Cleanroom power stability and ultra-pure chemical supply agreements remain the critical path for Phase-2 foundry rollouts in Gujarat and Karnataka corridors.",
    author: "Rohan Sengupta",
    authorRole: "Director of Silicon Strategy",
    company: "Indo-Pacific Chipworks",
    authorAvatarBg: "from-purple-600 to-indigo-800",
    authorInitials: "RS",
    time: "6 hours ago",
    views: "3.1k",
    replies: 142,
    likes: 410,
    isTrending: true,
    category: "Investment"
  }
];

const SECTOR_POLLS_DATA: SectorPollItem[] = [
  {
    id: "poll-1",
    sector: "Manufacturing & Heavy Engineering",
    question: "What is the biggest operational challenge facing India's manufacturing expansion in 2026?",
    totalVotes: 3420,
    closingDate: "Closes in 3 days",
    options: [
      { label: "High Raw Material & Freight Logistics Costs", pct: 38 },
      { label: "Skilled Precision Engineering Workforce Shortages", pct: 29 },
      { label: "Rapid Industry 4.0 & AI Technology Adoption", pct: 21 },
      { label: "Cross-Border Regulatory & ESG Compliance", pct: 12 }
    ]
  },
  {
    id: "poll-2",
    sector: "Semiconductors & Electronics",
    question: "Which semiconductor packaging vertical offers the highest domestic ROI for Tier-2 suppliers?",
    totalVotes: 2180,
    closingDate: "Closes in 5 days",
    options: [
      { label: "OSAT High-Density BGA Packaging", pct: 45 },
      { label: "Power Semiconductor SiC/GaN Modules", pct: 31 },
      { label: "Testing & Automated Optical Inspection", pct: 15 },
      { label: "Leadframe & Chemical Substrates", pct: 9 }
    ]
  }
];

const EXPERT_QA_STREAM: ExpertQASubmission[] = [
  {
    id: "qa-1",
    question: "What direct impact will new European CBAM carbon accounting rules have on Indian metal exporters?",
    sector: "Energy & Metals",
    industry: "Steel & Green Alloys",
    askedBy: "Rajesh Kulkarni (Exim Director, Allied Steels)",
    answeredBy: "Dr. Aris Thorne",
    expertRole: "Global Trade Compliance Lead",
    expertCompany: "Global Corridors Advisory",
    answerSummary: "Exporters with verified green hydrogen smelters will receive complete carbon tax rebates, preserving an estimated 14% export price advantage.",
    fullAnswer: "The European Union's Carbon Border Adjustment Mechanism (CBAM) enters definitive taxation phases in 2026. For Indian producers, verified life-cycle assessments (LCA) compliant with ISO 14067 are essential. Utilizing renewable captive power agreements and digitized blockchain manifests directly reduces baseline emissions liability.",
    upvotes: 184,
    time: "Yesterday"
  },
  {
    id: "qa-2",
    question: "What are the key certification requirements for Indian medical device manufacturers entering ASEAN hospitals?",
    sector: "Healthcare & MedTech",
    industry: "Diagnostic Equipment",
    askedBy: "Pooja Mehta (Product Head, BioSensors Ltd)",
    answeredBy: "Dr. Sunita Ramachandran",
    expertRole: "Chief Regulatory Officer",
    expertCompany: "ASEAN MedTech Alliance",
    answerSummary: "MDSAP audits combined with ISO 13485 fast-track local HSA and GDPMD approvals across Singapore and Malaysia.",
    fullAnswer: "ASEAN Medical Device Directive (AMDD) harmonizes product dossiers across CSDT formats. Conducting multi-site biocompatibility testing at NABL-accredited labs enables simultaneous registration across 6 ASEAN member states without duplicate clinical trials.",
    upvotes: 142,
    time: "2 days ago"
  }
];

const FEATURED_EXPERTS_DATA: FeaturedExpertItem[] = [
  {
    id: "exp-1",
    name: "Dr. Aris Thorne",
    designation: "Principal Trade Compliance SME",
    company: "Global Corridors Advisory",
    sector: "Cross-Border Trade & Policy",
    expertise: ["CBAM Tariffs", "IMEC Multimodal", "FTAs"],
    followersCount: "8.4k",
    questionsAnswered: 148,
    avatarBg: "from-blue-600 to-indigo-700",
    initials: "AT",
    verified: true
  },
  {
    id: "exp-2",
    name: "Meera Deshmukh",
    designation: "Chief AI Architect",
    company: "Indo-Edge Systems",
    sector: "AI & Cyber Security",
    expertise: ["Sovereign LLMs", "Edge Automation", "Data Laws"],
    followersCount: "11.2k",
    questionsAnswered: 215,
    avatarBg: "from-purple-600 to-indigo-800",
    initials: "MD",
    verified: true
  },
  {
    id: "exp-3",
    name: "Karan Patel",
    designation: "Clean Energy Strategist",
    company: "SunGrid Solutions",
    sector: "Energy & Sustainability",
    expertise: ["Green Hydrogen", "Battery Swapping", "Off-Take Deals"],
    followersCount: "6.9k",
    questionsAnswered: 96,
    avatarBg: "from-emerald-600 to-teal-800",
    initials: "KP",
    verified: true
  }
];

const SECTOR_COMMUNITIES_DATA: SectorCommunityHub[] = [
  { id: "com-tech", sector: "Technology & Software", icon: "💻", members: "18.5k Members", activeDiscussions: 420, latestActivity: "Active 4m ago", popularTopics: ["Sovereign AI", "Cybersecurity", "SaaS Export", "Cloud Sovereign Nodes"] },
  { id: "com-semi", sector: "Semiconductors & Hardware", icon: "⚙️", members: "12.2k Members", activeDiscussions: 310, latestActivity: "Active 12m ago", popularTopics: ["OSAT Fabs", "Substrates", "EDA Tools", "Cleanroom Capex"] },
  { id: "com-energy", sector: "Energy & CleanTech", icon: "⚡", members: "15.4k Members", activeDiscussions: 385, latestActivity: "Active 18m ago", popularTopics: ["Green Hydrogen", "Solar PV", "Grid Interconnects", "Battery Storage"] },
  { id: "com-mfg", sector: "Manufacturing & Auto", icon: "🏭", members: "16.8k Members", activeDiscussions: 290, latestActivity: "Active 8m ago", popularTopics: ["Robotics", "EV Powertrains", "PLI Schemes", "Smart Factories"] },
  { id: "com-health", sector: "Healthcare & Pharma", icon: "💊", members: "11.9k Members", activeDiscussions: 180, latestActivity: "Active 25m ago", popularTopics: ["Biosimilars", "API Sourcing", "US-FDA Audits", "MedTech"] },
  { id: "com-fin", sector: "Financial Services & FinTech", icon: "💳", members: "14.1k Members", activeDiscussions: 240, latestActivity: "Active 15m ago", popularTopics: ["B2B Cross-Border", "UPI Global", "Trade Finance", "RegTech"] }
];

const INDUSTRY_SURVEYS_DATA: IndustrySurveyItem[] = [
  {
    id: "surv-1",
    title: "2026 Manufacturing & Automation Industry Outlook Survey",
    sector: "Manufacturing",
    participants: "8,500+ Professionals",
    status: "Published Report",
    keyFindings: [
      { label: "Expect Increased Plant Automation", pct: "68%" },
      { label: "Plan Direct AI Quality Investment", pct: "54%" },
      { label: "Forecast Double-Digit Export Growth", pct: "42%" }
    ],
    isPremium: true
  },
  {
    id: "surv-2",
    title: "National Clean Energy & Hydrogen Grid Capex Pulse",
    sector: "Energy",
    participants: "5,200+ Executives",
    status: "Live Survey",
    keyFindings: [
      { label: "Target Green Ammonia Bunkering by 2027", pct: "61%" },
      { label: "Prioritize Domestic Electrolyzer Sourcing", pct: "52%" },
      { label: "Seek Bilateral Off-Take Guarantees", pct: "74%" }
    ],
    isPremium: false
  }
];

const TOP_CONTRIBUTORS_DATA: ContributorItem[] = [
  { rank: 1, name: "Dr. Aris Thorne", role: "Trade Compliance SME", company: "Global Corridors Advisory", sector: "Trade Policy", points: "4,820 Pts", badge: "Top Contributor", avatarBg: "from-blue-600 to-indigo-700", initials: "AT" },
  { rank: 2, name: "Meera Deshmukh", role: "Chief AI Architect", company: "Indo-Edge Systems", sector: "AI & Cyber", points: "4,150 Pts", badge: "Industry Expert", avatarBg: "from-purple-600 to-indigo-800", initials: "MD" },
  { rank: 3, name: "Vikramaditya Sharma", role: "VP Manufacturing", company: "Bharat Forge Solutions", sector: "Automotive", points: "3,890 Pts", badge: "Sector Champion", avatarBg: "from-emerald-600 to-teal-800", initials: "VS" },
  { rank: 4, name: "Dr. Sunita Ramachandran", role: "Regulatory Affairs Dir", company: "ASEAN MedTech", sector: "Healthcare", points: "3,420 Pts", badge: "Verified Professional", avatarBg: "from-amber-600 to-orange-700", initials: "SR" }
];

const PEER_NETWORKING_DATA: PeerNetworkingItem[] = [
  { id: "peer-1", name: "Siddharth Rao", designation: "Head of Supply Chain", company: "Tata AutoComp", sector: "Automotive & EV", industry: "Battery Enclosures", mutualInterests: "EV Freight & PLI Grants", avatarBg: "from-blue-600 to-indigo-700", initials: "SR" },
  { id: "peer-2", name: "Dr. Neha Sen", designation: "VP Research & Development", company: "Biocon Biologics", sector: "Biotechnology & Pharma", industry: "Recombinant Proteins", mutualInterests: "US-FDA Compliance & CEPA", avatarBg: "from-purple-600 to-pink-700", initials: "NS" },
  { id: "peer-3", name: "Amitav Goswami", designation: "Chief Operating Officer", company: "CleanWatt Solar", sector: "Energy & Sustainability", industry: "PV Modules", mutualInterests: "Gujarat Power Corridors", avatarBg: "from-emerald-600 to-teal-700", initials: "AG" }
];

const INDUSTRY_OPPORTUNITIES_DATA: IndustryOpportunityItem[] = [
  { id: "opp-1", title: "Seeking High-Density Silicon Substrate Joint Venture Partner", type: "Business Partnership", sector: "Semiconductors (S46)", country: "India 🇮🇳 / Global", description: "50% state capex subsidy pre-approved in Dholera for tier-1 OSAT cleanroom facilities.", deadline: "Dec 2026", isPremium: true },
  { id: "opp-2", title: "15-Year Green Ammonia Off-Take Tender for Hamburg Maritime Port", type: "Export", sector: "Energy & CleanTech (S17)", country: "Germany 🇩🇪", description: "Long-term bilateral procurement under zero-emission standards, exempt from CBAM levies.", deadline: "Nov 2026", isPremium: false },
  { id: "opp-3", title: "Automated Edge AI Inspection Systems RFP for 4 Auto Plants", type: "Procurement", sector: "Manufacturing (S45)", country: "India 🇮🇳", description: "Direct tender procurement for multi-camera robotic optical defect detection suites.", deadline: "Jan 2027", isPremium: true }
];

const UPCOMING_SECTOR_EVENTS: UpcomingSectorEvent[] = [
  { id: "ev-1", title: "Semicon India International Expo & Executive B2B Matchmaking", sector: "Semiconductors", date: "Nov 12-14, 2026", location: "BIEC, Bengaluru", type: "Conference", attendees: "4,500+ Registered" },
  { id: "ev-2", title: "World Green Hydrogen & Clean Bunkering Summit 2026", sector: "Clean Energy", date: "Dec 03-05, 2026", location: "Bharat Mandapam, New Delhi", type: "Summit", attendees: "3,200+ Registered" },
  { id: "ev-3", title: "Sovereign AI Infrastructure & Data Governance Roundtable", sector: "AI & Tech", date: "Oct 22, 2026", location: "Online / Virtual", type: "Roundtable", attendees: "850+ Registered" }
];

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function NewsPOCSectorEngagementView() {
  // Filters & State
  const [searchQuery, setSearchQuery] = useState("");
  const [feedCategoryFilter, setFeedCategoryFilter] = useState<string>("Latest");
  const [qaTopicFilter, setQaTopicFilter] = useState<string>("All Topics");

  // Interaction State
  const [pollVotes, setPollVotes] = useState<Record<string, number>>({});
  const [likedDiscussions, setLikedDiscussions] = useState<string[]>([]);
  const [followedDiscussions, setFollowedDiscussions] = useState<string[]>(["disc-1"]);
  const [connectedPeers, setConnectedPeers] = useState<string[]>([]);
  const [followedCommunities, setFollowedCommunities] = useState<string[]>(["com-tech", "com-semi"]);
  const [isJoinedCommunity, setIsJoinedCommunity] = useState(false);

  // Modals
  const [showStartDiscussionModal, setShowStartDiscussionModal] = useState(false);
  const [newDiscussionTitle, setNewDiscussionTitle] = useState("");
  const [newDiscussionSector, setNewDiscussionSector] = useState("Semiconductors");
  const [newDiscussionContent, setNewDiscussionContent] = useState("");
  const [discussionPostSuccess, setDiscussionPostSuccess] = useState(false);

  const [showAskExpertModal, setShowAskExpertModal] = useState(false);
  const [targetExpertName, setTargetExpertName] = useState("");
  const [expertQuestionText, setExpertQuestionText] = useState("");
  const [expertQuestionSuccess, setExpertQuestionSuccess] = useState(false);

  const [selectedDiscussionModal, setSelectedDiscussionModal] = useState<DiscussionItem | null>(null);
  const [replyText, setReplyText] = useState("");
  const [repliesList, setRepliesList] = useState<string[]>([]);

  const [selectedExpertAnswerModal, setSelectedExpertAnswerModal] = useState<ExpertQASubmission | null>(null);

  const [showProModal, setShowProModal] = useState(false);
  const [proSuccess, setProSuccess] = useState(false);

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Actions
  const handleVotePoll = (pollId: string, optIdx: number) => {
    setPollVotes(prev => ({ ...prev, [pollId]: optIdx }));
  };

  const handleToggleLike = (id: string) => {
    setLikedDiscussions(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleToggleSave = (id: string) => {
    setFollowedDiscussions(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleToggleConnect = (id: string) => {
    setConnectedPeers(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleToggleCommunity = (id: string) => {
    setFollowedCommunities(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handlePostDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiscussionTitle.trim() || !newDiscussionContent.trim()) return;
    setDiscussionPostSuccess(true);
    setTimeout(() => {
      setDiscussionPostSuccess(false);
      setShowStartDiscussionModal(false);
      setNewDiscussionTitle("");
      setNewDiscussionContent("");
    }, 2000);
  };

  const handleAskExpertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expertQuestionText.trim()) return;
    setExpertQuestionSuccess(true);
    setTimeout(() => {
      setExpertQuestionSuccess(false);
      setShowAskExpertModal(false);
      setExpertQuestionText("");
      setTargetExpertName("");
    }, 2000);
  };

  const handleAddReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setRepliesList(prev => [...prev, replyText]);
    setReplyText("");
  };

  // Filtered discussions feed
  const filteredDiscussions = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return TRENDING_DISCUSSIONS.filter(disc => {
      const matchSearch =
        q === "" ||
        disc.title.toLowerCase().includes(q) ||
        disc.sector.toLowerCase().includes(q) ||
        disc.industry.toLowerCase().includes(q) ||
        disc.author.toLowerCase().includes(q);

      if (feedCategoryFilter === "Trending") return matchSearch && disc.isTrending;
      if (feedCategoryFilter === "Most Discussed") return matchSearch && disc.replies > 100;
      if (feedCategoryFilter === "My Sectors") return matchSearch && (disc.sector === "Semiconductors" || disc.sector === "Energy & CleanTech");
      return matchSearch;
    });
  }, [searchQuery, feedCategoryFilter]);

  return (
    <div className="space-y-12 pb-16">

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. HERO — Connect. Discuss. Influence. */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#061e16] via-[#093325] to-[#04120d] text-white rounded-3xl p-6 md:p-12 relative overflow-hidden border border-emerald-800/40 shadow-xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />

        <div className="relative z-10 space-y-6 max-w-4xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold bg-emerald-600 px-3 py-1 rounded-full uppercase tracking-wider text-white flex items-center gap-1.5 shadow-xs">
              <Users className="h-3.5 w-3.5" /> B2B Sector Community & Networking
            </span>
            <span className="text-xs text-emerald-300 font-medium">50+ Industry Verticals · Verified SMEs</span>
          </div>

          <div className="space-y-2">
            <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Connect. Discuss. Influence Your Industry.
            </h1>
            <p className="text-slate-300 text-xs md:text-sm font-normal max-w-2xl leading-relaxed">
              Join sector conversations, participate in industry polls, ask experts, share insights, and connect with professionals across 50+ sectors.
            </p>
          </div>

          {/* Prominent Search Bar */}
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/15 shadow-2xl max-w-3xl">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-emerald-300" />
              <input
                type="text"
                placeholder="Search discussions, topics, experts, polls or companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 dark:bg-gray-900/80 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-xs md:text-sm text-white placeholder-slate-400 outline-none focus:border-emerald-400 transition-all font-medium"
              />
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              onClick={() => setIsJoinedCommunity(!isJoinedCommunity)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <UserCheck className="h-4 w-4" />
              {isJoinedCommunity ? "Joined Sector Community ✓" : "Join Sector Community"}
            </button>
            <button
              onClick={() => setShowStartDiscussionModal(true)}
              className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="h-4 w-4 text-emerald-300" /> Start a Discussion
            </button>
          </div>

          {/* Quick Navigation Anchors */}
          <div className="flex flex-wrap gap-2 pt-2 text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-1 self-center">Jump To:</span>
            {[
              { label: "Trending Discussions", href: "#trending-discussions" },
              { label: "Sector Polls", href: "#sector-polls" },
              { label: "Ask an Expert", href: "#ask-expert" },
              { label: "Industry Events", href: "#sector-events" },
              { label: "My Discussions", href: "#my-engagement" }
            ].map((anchor) => (
              <a
                key={anchor.label}
                href={anchor.href}
                className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-slate-200 font-bold text-xs transition-all"
              >
                {anchor.label}
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. TRENDING DISCUSSIONS */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section id="trending-discussions" className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
          <div>
            <h2 className="font-display text-base md:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Flame className="h-5 w-5 text-amber-500 fill-amber-500" /> Trending Discussions
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">High-velocity executive debates, technical breakdowns, and policy queries.</p>
          </div>
          <span className="text-[10px] text-gray-400 font-semibold font-mono">Live Activity</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRENDING_DISCUSSIONS.map((disc) => {
            const isLiked = likedDiscussions.includes(disc.id);
            const isSaved = followedDiscussions.includes(disc.id);

            return (
              <div
                key={disc.id}
                className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs hover:border-emerald-500 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200/20 uppercase">
                      {disc.sector}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">{disc.time}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-blue-600 font-bold block">{disc.industry}</span>
                    <h3 className="font-bold text-xs md:text-sm text-gray-900 dark:text-white leading-snug group-hover:text-emerald-600 transition-colors mt-0.5">
                      {disc.title}
                    </h3>
                  </div>

                  <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
                    {disc.excerpt}
                  </p>

                  <div className="flex items-center gap-3 pt-1">
                    <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${disc.authorAvatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                      {disc.authorInitials}
                    </div>
                    <div className="text-[10px] leading-tight">
                      <span className="font-bold text-gray-900 dark:text-white block">{disc.author}</span>
                      <span className="text-gray-400">{disc.authorRole} · {disc.company}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-3 text-gray-500">
                    <button
                      onClick={() => handleToggleLike(disc.id)}
                      className={`flex items-center gap-1 font-bold cursor-pointer ${isLiked ? "text-emerald-600" : "hover:text-emerald-600"}`}
                    >
                      <ThumbsUp className="h-3.5 w-3.5" />
                      <span>{disc.likes + (isLiked ? 1 : 0)}</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedDiscussionModal(disc);
                        setRepliesList([]);
                      }}
                      className="flex items-center gap-1 font-bold hover:text-emerald-600 cursor-pointer"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>{disc.replies}</span>
                    </button>

                    <button
                      onClick={() => handleToggleSave(disc.id)}
                      className={`cursor-pointer ${isSaved ? "text-blue-600 font-bold" : "hover:text-blue-600"}`}
                      title="Save / Follow"
                    >
                      <Bookmark className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedDiscussionModal(disc);
                      setRepliesList([]);
                    }}
                    className="font-bold text-emerald-600 hover:underline cursor-pointer flex items-center gap-0.5"
                  >
                    Join Discussion →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. SECTOR POLLS */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section id="sector-polls" className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
          <div>
            <h2 className="font-display text-base md:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-emerald-600" /> Sector Polls & Sentiment Telemetry
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Real-time industry sentiment on supply chain bottlenecks, regulation, and capital investments.</p>
          </div>
          <span className="text-[10px] text-gray-400 font-semibold font-mono">Live Voting</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SECTOR_POLLS_DATA.map((poll) => {
            const votedOpt = pollVotes[poll.id];
            const hasVoted = votedOpt !== undefined;

            return (
              <div
                key={poll.id}
                className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200/20 uppercase">
                    {poll.sector}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">{poll.closingDate}</span>
                </div>

                <h3 className="font-bold text-xs md:text-sm text-gray-900 dark:text-white leading-snug">
                  {poll.question}
                </h3>

                <div className="space-y-2">
                  {poll.options.map((opt, idx) => {
                    const isSelected = votedOpt === idx;
                    return (
                      <button
                        key={idx}
                        disabled={hasVoted}
                        onClick={() => handleVotePoll(poll.id, idx)}
                        className={`w-full text-left p-3 rounded-xl border text-xs relative overflow-hidden transition-all flex justify-between items-center cursor-pointer ${
                          isSelected
                            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 font-bold"
                            : "border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 hover:border-emerald-300"
                        }`}
                      >
                        {hasVoted && (
                          <div
                            className="absolute left-0 top-0 bottom-0 bg-emerald-500/15 rounded-xl transition-all"
                            style={{ width: `${opt.pct + (isSelected ? 3 : -1)}%` }}
                          />
                        )}
                        <span className="relative z-10 font-semibold flex items-center gap-2">
                          {isSelected && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                          {opt.label}
                        </span>
                        {hasVoted && (
                          <span className="relative z-10 text-emerald-600 font-mono font-bold">
                            {opt.pct + (isSelected ? 3 : -1)}%
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[10px] text-gray-400">
                  <span>{poll.totalVotes.toLocaleString()} Votes Recorded</span>
                  <span className="text-emerald-600 font-bold">
                    {hasVoted ? "Industry Opinion Unlocked ✓" : "Click an option to vote"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. LATEST SECTOR CONVERSATIONS (Community Feed) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
          <div>
            <h2 className="font-display text-base md:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" /> Latest Sector Conversations
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Stream of executive discussions across 50+ Indian and global sectors.</p>
          </div>

          <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-900 p-1 rounded-xl border border-gray-200 dark:border-gray-800 overflow-x-auto text-xs">
            {["Latest", "Trending", "Most Discussed", "Most Viewed", "Unanswered", "My Sectors"].map((fTab) => (
              <button
                key={fTab}
                onClick={() => setFeedCategoryFilter(fTab)}
                className={`px-3 py-1.5 font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  feedCategoryFilter === fTab
                    ? "bg-white dark:bg-[#0f172a] text-emerald-600 shadow-xs"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {fTab}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredDiscussions.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs hover:border-emerald-500 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                    {item.sector}
                  </span>
                  <span className="text-gray-400 font-medium">{item.industry}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-400 font-mono">{item.time}</span>
                </div>

                <h3 className="font-bold text-xs md:text-sm text-gray-900 dark:text-white leading-snug">
                  {item.title}
                </h3>

                <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1 leading-relaxed">
                  {item.excerpt}
                </p>

                <div className="flex items-center gap-2 pt-0.5 text-[10px] text-gray-400">
                  <span className="font-bold text-gray-800 dark:text-gray-200">{item.author}</span>
                  <span>({item.authorRole}, {item.company})</span>
                </div>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold">
                  <span>{item.replies} Replies</span>
                  <span>{item.views} Views</span>
                </div>

                <button
                  onClick={() => {
                    setSelectedDiscussionModal(item);
                    setRepliesList([]);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  Join Discussion
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 5. ASK AN EXPERT */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section id="ask-expert" className="bg-gradient-to-br from-indigo-950/60 via-slate-900 to-[#071318] border border-indigo-800/40 rounded-3xl p-6 md:p-8 text-white space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">Direct SME Advisory</span>
            <h2 className="font-display text-lg md:text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-emerald-400" /> Ask an Industry Expert
            </h2>
            <p className="text-xs text-slate-300">
              Get direct technical, trade, and regulatory insights from verified professionals and industry specialists.
            </p>
          </div>

          <button
            onClick={() => {
              setTargetExpertName("");
              setShowAskExpertModal(true);
            }}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
          >
            Ask a Question
          </button>
        </div>

        {/* Answered Questions Stream */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EXPERT_QA_STREAM.map((qa) => (
            <div
              key={qa.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 hover:border-emerald-500/60 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-emerald-400 font-bold">{qa.sector} · {qa.industry}</span>
                  <span className="text-slate-400">{qa.time}</span>
                </div>

                <h3 className="font-bold text-xs md:text-sm text-white leading-snug">
                  "{qa.question}"
                </h3>

                <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                    Answered by {qa.answeredBy} ({qa.expertRole})
                  </span>
                  <p className="text-[11px] text-slate-200 leading-relaxed italic">
                    "{qa.answerSummary}"
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[10px]">
                <span className="text-slate-400 font-mono">▲ {qa.upvotes} Helpful Votes</span>
                <button
                  onClick={() => setSelectedExpertAnswerModal(qa)}
                  className="font-bold text-emerald-400 hover:underline cursor-pointer"
                >
                  Read Expert Answer →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 6. FEATURED INDUSTRY EXPERTS */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
          <div>
            <h2 className="font-display text-base md:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600" /> Featured Industry Experts
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Verified sector leaders available for Q&A, policy consultations, and roundtable discussions.</p>
          </div>
          <Link href="/en/news-poc/expert-news" className="text-xs font-bold text-blue-600 hover:underline">
            View All Experts →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_EXPERTS_DATA.map((exp) => (
            <div
              key={exp.id}
              className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs hover:border-emerald-500 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${exp.avatarBg} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-md`}>
                    {exp.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="font-bold text-xs text-gray-900 dark:text-white">{exp.name}</h3>
                      {exp.verified && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 fill-emerald-500 text-white" />}
                    </div>
                    <p className="text-[10px] text-gray-500">{exp.designation}</p>
                    <span className="text-[9px] text-blue-600 font-bold block">{exp.company}</span>
                  </div>
                </div>

                <div className="space-y-1 text-[10px]">
                  <span className="text-gray-400 font-bold block">Expertise:</span>
                  <div className="flex flex-wrap gap-1">
                    {exp.expertise.map((tag) => (
                      <span key={tag} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded text-[9px] font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] bg-gray-50 dark:bg-gray-900 p-2.5 rounded-xl text-center">
                  <div>
                    <span className="text-gray-400 block">Followers</span>
                    <span className="font-bold text-gray-900 dark:text-white">{exp.followersCount}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Answered</span>
                    <span className="font-bold text-emerald-600">{exp.questionsAnswered} Qs</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                <Link
                  href="/en/news-poc/expert-news"
                  className="font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white"
                >
                  View Profile
                </Link>
                <button
                  onClick={() => {
                    setTargetExpertName(exp.name);
                    setShowAskExpertModal(true);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg transition-all shadow-2xs cursor-pointer"
                >
                  Ask Question
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 7. SECTOR COMMUNITIES / DISCUSSION HUBS */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
          <div>
            <h2 className="font-display text-base md:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-purple-600" /> Explore Sector Communities
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Dedicated industry hubs organized by technology, energy, healthcare, and infrastructure.</p>
          </div>
          <span className="text-[10px] text-gray-400 font-semibold font-mono">6 Core Hubs</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {SECTOR_COMMUNITIES_DATA.map((com) => {
            const isFollowed = followedCommunities.includes(com.id);

            return (
              <div
                key={com.id}
                className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs hover:border-purple-500 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{com.icon}</span>
                    <span className="text-[9px] font-mono font-bold text-purple-600 bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded">
                      {com.members}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-xs md:text-sm text-gray-900 dark:text-white">{com.sector}</h3>
                    <span className="text-[10px] text-gray-400">{com.activeDiscussions} Active Discussions · {com.latestActivity}</span>
                  </div>

                  <div className="space-y-1 pt-1">
                    <span className="text-[9px] text-gray-400 uppercase font-bold block">Popular Topics:</span>
                    <div className="flex flex-wrap gap-1">
                      {com.popularTopics.map((top) => (
                        <span key={top} className="text-[9px] bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded border border-gray-200/50 dark:border-gray-800">
                          {top}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                  <button
                    onClick={() => handleToggleCommunity(com.id)}
                    className={`text-xs font-bold px-4 py-1.5 rounded-xl transition-all cursor-pointer ${
                      isFollowed
                        ? "bg-purple-50 border border-purple-300 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300"
                        : "bg-purple-600 hover:bg-purple-700 text-white shadow-xs"
                    }`}
                  >
                    {isFollowed ? "Joined Hub ✓" : "Join Community"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 8. INDUSTRY Q&A (Topic Filtered) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 dark:border-gray-800 pb-3">
          <div>
            <h2 className="font-display text-base md:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-emerald-600" /> Industry Q&A
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Explore specific market questions, policy inquiries, and technology implementations.</p>
          </div>

          <div className="flex flex-wrap gap-1.5 text-xs">
            {["All Topics", "Market", "Policy", "Export", "Investment", "Technology"].map((topic) => (
              <button
                key={topic}
                onClick={() => setQaTopicFilter(topic)}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  qaTopicFilter === topic
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-emerald-600"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { q: "What are the biggest export opportunities in India's renewable energy sector under CEPA?", count: 3, sector: "Clean Energy", time: "3 hours ago" },
            { q: "How are semiconductor fabs handling ultra-pure water recycling standards in Tier-2 parks?", count: 2, sector: "Semiconductors", time: "5 hours ago" }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded">
                    {item.sector}
                  </span>
                  <span className="text-gray-400">{item.time}</span>
                </div>

                <h3 className="font-bold text-xs md:text-sm text-gray-900 dark:text-white leading-snug">
                  {item.q}
                </h3>
              </div>

              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                <span className="text-[10px] text-gray-400 font-bold">Answered by {item.count} Experts</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setTargetExpertName("");
                      setShowAskExpertModal(true);
                    }}
                    className="text-[10px] font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer"
                  >
                    Ask a Question
                  </button>
                  <button
                    onClick={() => setSelectedExpertAnswerModal(EXPERT_QA_STREAM[0])}
                    className="text-[10px] font-bold text-emerald-600 hover:underline cursor-pointer"
                  >
                    Read Answers →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 9. INDUSTRY SURVEYS & RESEARCH */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
          <div>
            <h2 className="font-display text-base md:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-blue-600" /> Industry Surveys & Research
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Empirical data collected from thousands of participating enterprise executives.</p>
          </div>
          <span className="text-[10px] text-gray-400 font-semibold font-mono">B2B Intelligence</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INDUSTRY_SURVEYS_DATA.map((surv) => (
            <div
              key={surv.id}
              className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold px-2.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-600 uppercase">
                    {surv.status}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">{surv.participants}</span>
                </div>

                <h3 className="font-bold text-sm text-gray-900 dark:text-white leading-snug">{surv.title}</h3>

                <div className="space-y-2 pt-1">
                  {surv.keyFindings.map((kf, i) => (
                    <div key={i} className="flex items-center justify-between text-xs bg-gray-50 dark:bg-gray-900 p-2.5 rounded-xl">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{kf.label}</span>
                      <span className="font-mono font-bold text-emerald-600">{kf.pct}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <button
                  onClick={() => setShowProModal(true)}
                  className="text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-blue-600 cursor-pointer"
                >
                  View Survey Results
                </button>
                <button
                  onClick={() => setShowProModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  {surv.isPremium && <Lock className="h-3 w-3" />} Download Full Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 10. COMMUNITY LEADERBOARD (Top Contributors) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
          <div>
            <h2 className="font-display text-base md:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" /> Community Leaderboard — Top Contributors
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Recognizing domain specialists providing verified technical answers and market insights.</p>
          </div>
          <span className="text-[10px] text-gray-400 font-semibold font-mono">Monthly Points</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {TOP_CONTRIBUTORS_DATA.map((user) => (
            <div
              key={user.rank}
              className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-500 font-mono">#{user.rank}</span>
                  <span className="text-[8.5px] font-bold text-purple-600 bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded uppercase">
                    {user.badge}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${user.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                    {user.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-gray-900 dark:text-white">{user.name}</h3>
                    <span className="text-[9.5px] text-gray-400 block">{user.role}</span>
                  </div>
                </div>

                <div className="text-[10px] text-gray-500 pt-1">
                  <span>{user.company} · {user.sector}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-[10px]">
                <span className="text-gray-400">Score:</span>
                <span className="font-mono font-bold text-emerald-600">{user.points}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 11. MY SECTOR ENGAGEMENT (Personalized Hub) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section id="my-engagement" className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
          <div>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block">Personalized Activity</span>
            <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white mt-0.5">
              Your Sector Engagement Hub
            </h2>
            <p className="text-xs text-gray-500">Live tracker of discussions, expert replies, and upcoming industry events.</p>
          </div>

          <Link
            href="/en/mynews/bookmarks"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-xs shrink-0 text-center"
          >
            View My Activity →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
          <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-150 dark:border-gray-800">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Following</span>
            <div className="text-xl font-black text-emerald-600 mt-1">5 Sectors</div>
            <span className="text-[9px] text-gray-400">Active feeds</span>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-150 dark:border-gray-800">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">New Discussions</span>
            <div className="text-xl font-black text-blue-600 mt-1">18 Today</div>
            <span className="text-[9px] text-gray-400">In your sectors</span>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-150 dark:border-gray-800">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Unread Replies</span>
            <div className="text-xl font-black text-purple-600 mt-1">7 Replies</div>
            <span className="text-[9px] text-emerald-500 font-bold">Awaiting review</span>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-150 dark:border-gray-800">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Active Polls</span>
            <div className="text-xl font-black text-amber-500 mt-1">4 Polls</div>
            <span className="text-[9px] text-gray-400">Open to vote</span>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-150 dark:border-gray-800">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Upcoming Events</span>
            <div className="text-xl font-black text-indigo-600 mt-1">2 Events</div>
            <span className="text-[9px] text-gray-400">Registered</span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 12. PROFESSIONAL NETWORKING */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
          <div>
            <h2 className="font-display text-base md:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-blue-600" /> Professionals You May Want to Connect With
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Recommendations based on your active sector discussions and industry affinity.</p>
          </div>
          <span className="text-[10px] text-gray-400 font-semibold font-mono">B2B Network</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PEER_NETWORKING_DATA.map((peer) => {
            const isConnected = connectedPeers.includes(peer.id);

            return (
              <div
                key={peer.id}
                className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs hover:border-blue-500 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${peer.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`}>
                      {peer.initials}
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-gray-900 dark:text-white">{peer.name}</h3>
                      <p className="text-[10px] text-gray-500">{peer.designation}</p>
                      <span className="text-[9.5px] text-blue-600 font-bold block">{peer.company}</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-gray-500 bg-gray-50 dark:bg-gray-900 p-2.5 rounded-xl space-y-0.5">
                    <div>Sector: <span className="font-bold text-gray-800 dark:text-gray-200">{peer.sector}</span></div>
                    <div>Focus: <span className="text-emerald-600 font-medium">{peer.mutualInterests}</span></div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                  <Link href="/en/news-poc/leader-news" className="text-[10px] font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    View Profile
                  </Link>
                  <button
                    onClick={() => handleToggleConnect(peer.id)}
                    className={`text-xs font-bold px-4 py-1.5 rounded-xl transition-all cursor-pointer ${
                      isConnected
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-300 dark:bg-emerald-950/40"
                        : "bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
                    }`}
                  >
                    {isConnected ? "Connected ✓" : "Connect +"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 13. INDUSTRY OPPORTUNITIES */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
          <div>
            <h2 className="font-display text-base md:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-emerald-600" /> Industry Business Opportunities
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Verified tenders, technology partnerships, and procurement contracts across 50+ sectors.</p>
          </div>
          <Link href="/en/eoi" className="text-xs font-bold text-emerald-600 hover:underline">
            Post Opportunity →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INDUSTRY_OPPORTUNITIES_DATA.map((opp) => (
            <div
              key={opp.id}
              className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs hover:border-emerald-500 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200/20 uppercase">
                    {opp.type}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">{opp.country}</span>
                </div>

                <h3 className="font-bold text-xs md:text-sm text-gray-900 dark:text-white leading-snug">{opp.title}</h3>
                <span className="text-[10px] text-blue-600 font-bold block">{opp.sector}</span>

                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  {opp.description}
                </p>

                <div className="text-[10px] text-gray-400 font-mono">
                  Deadline: <span className="text-gray-800 dark:text-gray-200 font-bold">{opp.deadline}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                <Link
                  href="/en/eoi"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs"
                >
                  View Opportunity
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 14 & 15. SECTOR EVENTS & SPONSORED SPOTLIGHT */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* 14. Sector Events */}
        <section id="sector-events" className="lg:col-span-7 space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-600" /> Upcoming Sector Events
            </h2>
            <Link href="/en/profile/events" className="text-[10px] font-bold text-blue-600 hover:underline">
              View All Events →
            </Link>
          </div>

          <div className="space-y-3">
            {UPCOMING_SECTOR_EVENTS.map((ev) => (
              <div
                key={ev.id}
                className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-xs flex items-center justify-between hover:border-purple-500 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/40 text-purple-600">
                      {ev.type}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">{ev.sector}</span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">{ev.title}</h4>
                  <p className="text-[10px] text-gray-500">{ev.date} · {ev.location} · <span className="text-emerald-600 font-bold">{ev.attendees}</span></p>
                </div>

                <Link
                  href="/en/profile/events"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shrink-0 ml-2 shadow-xs"
                >
                  Register
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 15. Sponsored Discussion Spotlight */}
        <section className="lg:col-span-5 space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" /> Sponsored Sector Spotlight
            </h2>
          </div>

          <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-400/40 rounded-3xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-amber-600 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded uppercase tracking-wider">
                SPONSORED
              </span>
              <span className="text-[10px] text-gray-400 font-medium">Presented by Tata Power Renewables</span>
            </div>

            <h3 className="font-bold text-xs md:text-sm text-gray-900 dark:text-white leading-snug">
              "The Future of Commercial EV Fleet Charging & 800V Mega-Hubs in India"
            </h3>

            <p className="text-[11px] text-gray-600 dark:text-slate-300 leading-relaxed font-normal">
              Participate in this sponsored discussion detailing depot interoperability, high-power Megawatt Charging Systems (MCS), and fleet electrification models.
            </p>

            <div className="pt-2 border-t border-amber-200/40 flex justify-end">
              <Link href="/en/eoi" className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1">
                Join Sponsored Discussion →
              </Link>
            </div>
          </div>
        </section>

      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 16. FEATURED COMPANY / PRODUCT SPOTLIGHT */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-3">
          <div>
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="h-4.5 w-4.5 text-blue-600" /> Featured Industry Spotlight
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Corporate enterprise solution profile.</p>
          </div>
          <Link href="/en/eoi" className="text-xs font-bold text-blue-600 hover:underline">
            Promote Your Company →
          </Link>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-blue-600 text-white font-black text-lg flex items-center justify-center shrink-0 shadow-md">
              SL
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">SemiconLabs India Pvt Ltd</h3>
                <span className="text-[8px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 px-2 py-0.5 rounded">
                  VERIFIED ENTERPRISE
                </span>
              </div>
              <p className="text-xs text-gray-500">Semiconductors · High-Density Substrate Cleanrooms</p>
              <p className="text-[11px] text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed font-normal">
                Manufacturing pilot glass-core substrate packages and high-density leadframes for Tier-1 automotive and aerospace electronics.
              </p>
            </div>
          </div>

          <div className="flex gap-3 shrink-0">
            <Link
              href="/en/news-poc/company-news"
              className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-bold text-xs px-4 py-2 rounded-xl transition-all"
            >
              View Company
            </Link>
            <Link
              href="/en/eoi"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs"
            >
              Contact Company
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 17. PREMIUM COMMUNITY (Unlock Premium Sector Engagement) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-emerald-950 text-white rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-2xl border border-slate-800 text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-3 relative z-10">
          <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/10">
            Community Pro Tier
          </span>

          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white">
            Unlock Premium Sector Engagement
          </h2>

          <p className="text-xs md:text-sm text-slate-300 font-normal leading-relaxed">
            Gain access to private executive circles, priority SME question routing, exclusive industry surveys, and invite-only roundtables.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[10px] font-bold text-slate-200 pt-2">
            <div className="bg-white/5 p-2 rounded-xl border border-white/10">✓ Private Sector Circles</div>
            <div className="bg-white/5 p-2 rounded-xl border border-white/10">✓ Priority SME Answers</div>
            <div className="bg-white/5 p-2 rounded-xl border border-white/10">✓ Exclusive Surveys</div>
            <div className="bg-white/5 p-2 rounded-xl border border-white/10">✓ Executive Roundtables</div>
          </div>

          <div className="pt-3 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowProModal(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md cursor-pointer"
            >
              Upgrade to Premium (14-Day Free Trial)
            </button>
            <Link
              href="/en/eoi"
              className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all"
            >
              View Community Plans
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 18. NEWSLETTER / SECTOR ALERTS */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
        <div className="max-w-xl mx-auto text-center space-y-2">
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block">Stay Informed</span>
          <h2 className="font-display text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            Stay Connected With Your Industry
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            Subscribe to receive top weekly discussions, live poll results, verified expert answers, and industry opportunity notices.
          </p>
        </div>

        {newsletterSuccess ? (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-800 rounded-2xl text-center space-y-1 max-w-md mx-auto">
            <h4 className="text-sm font-bold text-emerald-600">✓ Subscribed Successfully!</h4>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Community digest will be sent directly to <strong>{newsletterEmail}</strong>.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (newsletterEmail.trim()) setNewsletterSuccess(true);
            }}
            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="Enter your corporate email..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white outline-none focus:border-emerald-500 flex-1 font-medium"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer shrink-0"
            >
              Subscribe to Sector Updates
            </button>
          </form>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* START A DISCUSSION MODAL */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {showStartDiscussionModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <MessageSquare className="h-4.5 w-4.5 text-emerald-600" /> Start a New Sector Discussion
              </h3>
              <button
                onClick={() => setShowStartDiscussionModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            {discussionPostSuccess ? (
              <div className="text-center py-6 space-y-2">
                <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Discussion Published!</h4>
                <p className="text-xs text-gray-500">Your thread has been posted to the active sector community feed.</p>
              </div>
            ) : (
              <form onSubmit={handlePostDiscussion} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Sector Category</label>
                  <select
                    value={newDiscussionSector}
                    onChange={(e) => setNewDiscussionSector(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-xs font-bold outline-none"
                  >
                    {IGEN_50_SECTORS.slice(0, 15).map((s) => (
                      <option key={s.code} value={s.name}>{s.name} ({s.code})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Discussion Topic Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. How are domestic fabs managing high-purity etching gas supplies?"
                    value={newDiscussionTitle}
                    onChange={(e) => setNewDiscussionTitle(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-xs outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Context & Details</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share technical data, regulatory questions, or operational insights..."
                    value={newDiscussionContent}
                    onChange={(e) => setNewDiscussionContent(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-xs outline-none"
                  />
                </div>

                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowStartDiscussionModal(false)}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2 rounded-xl shadow-xs cursor-pointer"
                  >
                    Post Discussion
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* ASK AN EXPERT MODAL */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {showAskExpertModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <HelpCircle className="h-4.5 w-4.5 text-emerald-600" />
                {targetExpertName ? `Ask Question to ${targetExpertName}` : "Submit Question to Verified SME"}
              </h3>
              <button
                onClick={() => setShowAskExpertModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            {expertQuestionSuccess ? (
              <div className="text-center py-6 space-y-2">
                <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Question Routed to SME!</h4>
                <p className="text-xs text-gray-500">Your query has been assigned. You will receive an email digest alert upon response.</p>
              </div>
            ) : (
              <form onSubmit={handleAskExpertSubmit} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Question Summary</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Enter your supply-chain, regulatory tariff, or technical engineering question in detail..."
                    value={expertQuestionText}
                    onChange={(e) => setExpertQuestionText(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-xs outline-none"
                  />
                </div>

                <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/40 rounded-xl text-[10px] text-gray-600 dark:text-slate-300">
                  💡 Questions are reviewed by verified trade consultants, legal counsel, and chief architects.
                </div>

                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAskExpertModal(false)}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2 rounded-xl shadow-xs cursor-pointer"
                  >
                    Submit Question
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* DISCUSSION READER & REPLY MODAL */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {selectedDiscussionModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{selectedDiscussionModal.sector} · {selectedDiscussionModal.industry}</span>
                <span className="text-xs text-gray-400 block">{selectedDiscussionModal.time}</span>
              </div>
              <button
                onClick={() => setSelectedDiscussionModal(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-base md:text-lg font-bold text-gray-900 dark:text-white leading-snug">
                {selectedDiscussionModal.title}
              </h3>

              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${selectedDiscussionModal.authorAvatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                  {selectedDiscussionModal.authorInitials}
                </div>
                <div className="text-xs">
                  <span className="font-bold text-gray-900 dark:text-white block">{selectedDiscussionModal.author}</span>
                  <span className="text-gray-400">{selectedDiscussionModal.authorRole} · {selectedDiscussionModal.company}</span>
                </div>
              </div>

              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                {selectedDiscussionModal.excerpt}
              </p>

              {/* Replies list */}
              <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                <span className="text-xs font-bold text-gray-900 dark:text-white block">
                  Community Replies ({selectedDiscussionModal.replies + repliesList.length})
                </span>

                <div className="p-3 bg-gray-50/70 dark:bg-gray-900/40 rounded-xl space-y-1 text-xs">
                  <span className="font-bold text-gray-900 dark:text-white text-[11px]">Siddharth Rao (Supply Chain Dir)</span>
                  <p className="text-gray-600 dark:text-gray-300">
                    "Agreed with the cleanroom capex point. The primary constraint in Phase-2 is high-purity chemical certification timeline rather than clean power."
                  </p>
                </div>

                {repliesList.map((rep, idx) => (
                  <div key={idx} className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/40 rounded-xl space-y-1 text-xs">
                    <span className="font-bold text-emerald-600 text-[11px]">You (Verified Participant)</span>
                    <p className="text-gray-800 dark:text-slate-200">{rep}</p>
                  </div>
                ))}

                {/* Reply Form */}
                <form onSubmit={handleAddReply} className="flex gap-2 pt-2">
                  <input
                    type="text"
                    required
                    placeholder="Write your professional response..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-xs flex-1 outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer shrink-0"
                  >
                    Reply
                  </button>
                </form>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-end">
              <button
                onClick={() => setSelectedDiscussionModal(null)}
                className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
              >
                Close Thread
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* EXPERT ANSWER INSPECT MODAL */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {selectedExpertAnswerModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl max-w-xl w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Verified Expert Response</span>
                <span className="text-xs text-gray-400 block">{selectedExpertAnswerModal.sector}</span>
              </div>
              <button
                onClick={() => setSelectedExpertAnswerModal(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Original Question</span>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">
                  "{selectedExpertAnswerModal.question}"
                </h4>
                <span className="text-[10px] text-gray-400">Asked by {selectedExpertAnswerModal.askedBy}</span>
              </div>

              <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/30 border-l-4 border-emerald-600 rounded-r-2xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-600">{selectedExpertAnswerModal.answeredBy}</span>
                  <span className="text-[10px] text-gray-400">{selectedExpertAnswerModal.expertRole}, {selectedExpertAnswerModal.expertCompany}</span>
                </div>
                <p className="text-xs text-gray-800 dark:text-slate-200 leading-relaxed">
                  {selectedExpertAnswerModal.fullAnswer}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-xs">
              <span className="text-gray-400 font-mono">▲ {selectedExpertAnswerModal.upvotes} Found This Helpful</span>
              <button
                onClick={() => setSelectedExpertAnswerModal(null)}
                className="bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
              >
                Close Answer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* PRO UPGRADE MODAL */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {showProModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Crown className="h-5 w-5 text-emerald-600 animate-bounce" /> Upgrade to Community Pro
              </h4>
              <button
                onClick={() => {
                  setShowProModal(false);
                  setProSuccess(false);
                }}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            {proSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                <h5 className="text-sm font-bold text-gray-900 dark:text-white">Community Pro Trial Active!</h5>
                <p className="text-xs text-gray-500 px-4 font-normal leading-normal">
                  Thank you! Your 14-day free trial is active. You can now access private circles, download empirical survey reports, and route priority questions to SMEs.
                </p>
                <button
                  onClick={() => {
                    setShowProModal(false);
                    setProSuccess(false);
                  }}
                  className="bg-emerald-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
                >
                  Return to Community
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs font-medium text-gray-600 dark:text-gray-300">
                <p className="text-xs leading-relaxed">
                  Join exclusive peer circles, download deep-dive survey reports, and gain direct consultation access to industry chairs.
                </p>
                <div className="p-3 bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/40 rounded-xl space-y-1.5">
                  <h5 className="font-bold text-emerald-600 uppercase tracking-widest text-[9px]">Included Entitlements</h5>
                  <ul className="list-disc pl-4 space-y-1 text-[11px]">
                    <li>Private executive group applications</li>
                    <li>SME prioritization matching filters</li>
                    <li>Downloadable community pulse report briefs</li>
                    <li>Invitation to invite-only C-suite webinars</li>
                  </ul>
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowProModal(false)}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setProSuccess(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md cursor-pointer"
                  >
                    Confirm 14-Day Free Trial
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
