"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Sparkles, TrendingUp, Search, ArrowLeft, ChevronRight,
  Clock, Calendar, Flame, Lock, Mail, FileText, CheckCircle,
  ThumbsUp, Bookmark, Share2, MessageSquare, MessageCircle, Globe, Cpu, Zap, Car,
  Layers, Scale, Headphones, Users, BarChart3,
  ArrowUpRight, Heart, Newspaper,
  Play, Tag, Award, Target, Briefcase, Plus, Check, ArrowRight
} from "lucide-react";

interface NewsPOCAllLeaderViewProps {
  onBack?: () => void;
}

// Mock Database for Leadership Module
const ALL_LEADER_ARTICLES = [
  {
    id: "lead-feed-1",
    title: "NVIDIA CEO Jensen Huang Outlines Strategic Blueprint for Global AI Fab Networks",
    excerpt: "Jensen Huang announced partnerships with regional fabricators to secure next-generation tensor core allocations, emphasizing sovereign compute hubs in emerging markets.",
    leader: "Jensen Huang",
    designation: "CEO",
    company: "NVIDIA",
    country: "USA",
    flag: "🇺🇸",
    industry: "Semiconductors",
    topic: "AI Leadership",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&auto=format&fit=crop&q=80",
    date: "12m ago",
    readTime: "6 min read",
    likes: 420,
    comments: 32,
    source: "NVIDIA Global Press",
    whyItMatters: "Paves the path for decentralized hardware procurement and establishes secure bilateral silicon supply guarantees outside standard channels."
  },
  {
    id: "lead-feed-2",
    title: "Nandan Nilekani Proposes Digital Public Infrastructure for Sovereign AI Training",
    excerpt: "Infosys Chairman advocates for open-source AI guardrails and shared data consensus platforms to democratize AI compute models for developing nations.",
    leader: "Nandan Nilekani",
    designation: "Chairman",
    company: "Infosys",
    country: "India",
    flag: "🇮🇳",
    industry: "Electronics & IT",
    topic: "Corporate Strategy",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
    date: "45m ago",
    readTime: "5 min read",
    likes: 310,
    comments: 18,
    source: "India Tech Summit",
    whyItMatters: "Allows small and medium businesses to leverage unified national datasets without costly private architecture."
  },
  {
    id: "lead-feed-3",
    title: "RBI Governor Shaktikanta Das Sets Blueprint for UPI SAARC Cross-Border Settlement",
    excerpt: "Das outlines structural API integration standards for regional central banks to enable near-instantaneous trade settlement and bypass dollar settlement hubs.",
    leader: "Shaktikanta Das",
    designation: "Governor",
    company: "Reserve Bank of India",
    country: "India",
    flag: "🇮🇳",
    industry: "FinTech & Payments",
    topic: "Business Expansion",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80",
    date: "2h ago",
    readTime: "4 min read",
    likes: 245,
    comments: 14,
    source: "RBI Bulletins",
    whyItMatters: "Directly minimizes currency conversion spreads and transactional delays for cross-border South Asian trade."
  },
  {
    id: "lead-feed-4",
    title: "Tata Group Chairman N. Chandrasekaran Announces Semiconductor Expansion Funding",
    excerpt: "Tata Sons commits over $10 Billion in phased capital investments to expand raw wafer testing and assembly facilities in Gujarat.",
    leader: "N. Chandrasekaran",
    designation: "Chairman",
    company: "Tata Sons",
    country: "India",
    flag: "🇮🇳",
    industry: "Electronics & IT",
    topic: "Innovation",
    image: "https://images.unsplash.com/photo-15190853650753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80",
    date: "4h ago",
    readTime: "7 min read",
    likes: 512,
    comments: 29,
    source: "Tata Media Centre",
    whyItMatters: "Establishes India's first scaled domestic high-volume semiconductor assembly and test presence."
  },
  {
    id: "lead-feed-5",
    title: "Reliance Chairman Mukesh Ambani Commits to Green Hydrogen Gigafactory in Gujarat",
    excerpt: "Ambani announces fast-tracked deployment of high-efficiency electrolyzer manufacturing, targeting sub-$1 per kg green hydrogen production.",
    leader: "Mukesh Ambani",
    designation: "Chairman",
    company: "Reliance Industries",
    country: "India",
    flag: "🇮🇳",
    industry: "Sustainable Energy",
    topic: "Sustainability",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80",
    date: "6h ago",
    readTime: "6 min read",
    likes: 389,
    comments: 21,
    source: "RIL Shareholders Meet",
    whyItMatters: "Accelerates India's zero-emission fuel production, offering direct replacement for imported industrial LNG."
  },
  {
    id: "lead-feed-6",
    title: "Adani Group's Gautam Adani Secures Sri Lanka Port Infrastructure Expansion Deals",
    excerpt: "Adani announces major port terminal infrastructure construction projects, enhancing Indo-Lanka maritime connectivity.",
    leader: "Gautam Adani",
    designation: "Chairman",
    company: "Adani Group",
    country: "India",
    flag: "🇮🇳",
    industry: "Logistics & Maritime",
    topic: "Business Expansion",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80",
    date: "1d ago",
    readTime: "5 min read",
    likes: 298,
    comments: 17,
    source: "Adani Logistics Office",
    whyItMatters: "Consolidates South Asian shipping corridors and provides a resilient regional cargo container hub."
  }
];

const LEADERSHIP_MOVES = [
  {
    id: "move-1",
    name: "Rajesh Gopinathan",
    type: "New Appointment",
    prevRole: "Former CEO, TCS",
    newRole: "Global Tech Advisor, Cognizant",
    country: "USA",
    flag: "🇺🇸",
    industry: "Electronics & IT",
    date: "Today"
  },
  {
    id: "move-2",
    name: "Karan Adani",
    type: "Promotion",
    prevRole: "CEO, Adani Ports",
    newRole: "Managing Director, Adani Ports",
    country: "India",
    flag: "🇮🇳",
    industry: "Logistics & Maritime",
    date: "Yesterday"
  },
  {
    id: "move-3",
    name: "Salil Parekh",
    type: "Board Appointment",
    prevRole: "CEO, Infosys",
    newRole: "Non-Executive Director, US-India Business Council",
    country: "USA",
    flag: "🇺🇸",
    industry: "FinTech & Payments",
    date: "3 days ago"
  },
  {
    id: "move-4",
    name: "Gita Gopinath",
    type: "Founder Move",
    prevRole: "First Deputy Managing Director",
    newRole: "Global Economic Chair, IMF Advisory Group",
    country: "Global",
    flag: "🌐",
    industry: "Government Leaders",
    date: "5 days ago"
  }
];

const TRENDING_LEADERS = [
  { name: "Jensen Huang", designation: "CEO, NVIDIA", status: "↑ Trending", flag: "🇺🇸", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { name: "Nandan Nilekani", designation: "Chairman, Infosys", status: "↑ High", flag: "🇮🇳", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { name: "Shaktikanta Das", designation: "Governor, RBI", status: "↑ Rising", flag: "🇮🇳", color: "text-blue-500", bg: "bg-blue-500/10" },
  { name: "N. Chandrasekaran", designation: "Chairman, Tata Sons", status: "↑ Rising", flag: "🇮🇳", color: "text-blue-500", bg: "bg-blue-500/10" },
  { name: "Mukesh Ambani", designation: "Chairman, Reliance", status: "→ Stable", flag: "🇮🇳", color: "text-gray-400", bg: "bg-gray-400/10" }
];

const MOST_READ_LEADERSHIP = [
  { id: "lead-feed-1", title: "NVIDIA CEO Jensen Huang Outlines Strategic Blueprint for Global AI Fab Networks", count: "12.4k views", flag: "🇺🇸", country: "USA" },
  { id: "lead-feed-4", title: "Tata Group Chairman N. Chandrasekaran Announces Semiconductor Expansion Funding", count: "9.8k views", flag: "🇮🇳", country: "India" },
  { id: "lead-feed-2", title: "Nandan Nilekani Proposes Digital Public Infrastructure for Sovereign AI Training", count: "8.2k views", flag: "🇮🇳", country: "India" },
  { id: "lead-feed-3", title: "RBI Governor Shaktikanta Das Sets Blueprint for UPI SAARC Cross-Border Settlement", count: "6.5k views", flag: "🇮🇳", country: "India" },
  { id: "lead-feed-5", title: "Reliance Chairman Mukesh Ambani Commits to Green Hydrogen Gigafactory in Gujarat", count: "5.1k views", flag: "🇮🇳", country: "India" }
];

const RECOMMENDED_LEADERSHIP_REPORTS = {
  Free: [
    { id: "rep-f1", title: "India Tech Executive Survey Q1 2026", desc: "Key strategies deployed by top 100 Indian enterprise CEOs regarding domestic production and supply lines.", topic: "Tech Leadership", date: "Aug 2026", status: "Free" },
    { id: "rep-f2", title: "Global Logistics Executive Report", desc: "Strategic shifts and corridor routing adjustments adopted by maritime and shipping directors.", topic: "Logistics", date: "Jul 2026", status: "Free" }
  ],
  Premium: [
    { id: "rep-p1", title: "Semiconductor Executive Strategy Report 2026 🔒", desc: "Private intelligence on bilateral investment timelines and sub-packaging OSAT facility pipelines.", topic: "Semiconductors", date: "Aug 2026", price: "$149", status: "Premium" },
    { id: "rep-p2", title: "Sovereign AI Compute Infrastructure Review 🔒", desc: "Strategic breakdown of national compute capabilities and bilateral hardware licensing agreements.", topic: "AI Leadership", date: "Aug 2026", price: "$199", status: "Premium" }
  ]
};

const AI_LEADERSHIP_PREVIEWS: Record<string, { summary: string; focus: string; priorities: string; developments: string; outlook: string }> = {
  "Jensen Huang": {
    summary: "Recent activity outlines an aggressive strategy to establish sovereign cloud and compute networks globally, bypassing conventional centralized datacentres.",
    focus: "Sovereign compute, customized GPU architecture, regional fab integrations.",
    priorities: "Acquiring strategic land and energy pipelines, signing regional fabricator commitments.",
    developments: "Signed hardware allocation pacts with major Western and South Asian regional providers.",
    outlook: "Expect Nvidia to secure local market shares through bespoke national infrastructure deployments."
  },
  "Nandan Nilekani": {
    summary: "Advocating for unified open-source standards to allow digital public infrastructure (DPI) to compete against monopolistic corporate models.",
    focus: "Open-source AI rails, digital identity standardization, national computing nodes.",
    priorities: "Consolidating dataset consensus standards across government and business stakeholders.",
    developments: "Presented strategic blueprints at global forums for national tech interoperability.",
    outlook: "Likely to shape regional digital compliance and public database sharing models."
  },
  "Shaktikanta Das": {
    summary: "Focusing heavily on bilateral UPI corridors and central bank digital currencies (CBDC) to optimize treasury flows and direct trade settlements.",
    focus: "Direct currency clearing networks, UPI SAARC terminals, sovereign debt settlement.",
    priorities: "Minimizing US Dollar conversion dependencies for South Asian imports.",
    developments: "Established pilot clearing lines for bilateral energy trade with regional suppliers.",
    outlook: "UPI is projected to displace legacy SWIFT routes for 40% of neighboring trade transactions by 2028."
  }
};

export default function NewsPOCAllLeaderView({ onBack }: NewsPOCAllLeaderViewProps) {
  const router = useRouter();

  // State Management
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCountryFilter, setSelectedCountryFilter] = useState("all");
  const [selectedIndustryFilter, setSelectedIndustryFilter] = useState("all");
  const [activeNewsTab, setActiveNewsTab] = useState<"Breaking" | "Latest" | "Most Recent">("Breaking");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [activeReportsTab, setActiveReportsTab] = useState<"Free" | "Premium">("Free");
  const [feedSort, setFeedSort] = useState<"latest" | "trending">("latest");
  const [visibleArticlesCount, setVisibleArticlesCount] = useState(3);
  const [likedArticles, setLikedArticles] = useState<string[]>([]);
  const [savedArticles, setSavedArticles] = useState<string[]>([]);
  const [followedLeaders, setFollowedLeaders] = useState<string[]>(["Jensen Huang", "Nandan Nilekani"]);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterCategories, setNewsletterCategories] = useState<string[]>(["CEOs", "Founders"]);
  const [sharedArticleId, setSharedArticleId] = useState<string | null>(null);
  const [commentInputMap, setCommentInputMap] = useState<Record<string, string>>({});
  const [commentsMap, setCommentsMap] = useState<Record<string, { author: string; text: string; time: string }[]>>({
    "lead-feed-1": [
      { author: "Vikram Malhotra", text: "Decentralized hardware networks will be critical for cybersecurity redundancy.", time: "10m ago" }
    ]
  });
  const [showCommentsId, setShowCommentsId] = useState<string | null>(null);

  // Interaction Handlers
  const handleLike = (id: string) => {
    setLikedArticles(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  const handleSave = (id: string) => {
    setSavedArticles(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  const handleShare = (id: string) => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/en/poc-v2/article/${id}`);
    }
    setSharedArticleId(id);
    setTimeout(() => setSharedArticleId(null), 2500);
  };

  const handleFollow = (leaderName: string) => {
    setFollowedLeaders(prev => 
      prev.includes(leaderName) ? prev.filter(n => n !== leaderName) : [...prev, leaderName]
    );
  };

  const handleAddComment = (artId: string) => {
    const input = commentInputMap[artId] || "";
    if (!input.trim()) return;
    setCommentsMap(prev => ({
      ...prev,
      [artId]: [...(prev[artId] || []), { author: "You", text: input.trim(), time: "Just now" }]
    }));
    setCommentInputMap(prev => ({ ...prev, [artId]: "" }));
  };

  const toggleNewsletterCategory = (cat: string) => {
    setNewsletterCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  // Filter & Search Logic for Main Feed
  const filteredLeaderArticles = ALL_LEADER_ARTICLES.filter((art) => {
    const matchesSearch = 
      art.leader.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = 
      selectedCategory === "All" ||
      (selectedCategory === "CEOs" && art.designation === "CEO") ||
      (selectedCategory === "Founders" && art.topic === "AI Leadership") || 
      (selectedCategory === "Executives" && art.designation.includes("Chairman")) ||
      (selectedCategory === "Industry Leaders" && ["Sustainable Energy", "Logistics & Maritime", "Semiconductors"].includes(art.industry));

    const matchesCountry = selectedCountryFilter === "all" || art.country === selectedCountryFilter;
    const matchesIndustry = selectedIndustryFilter === "all" || art.industry === selectedIndustryFilter;
    const matchesTopic = !selectedTopic || art.topic === selectedTopic;

    return matchesSearch && matchesCategory && matchesCountry && matchesIndustry && matchesTopic;
  }).sort((a, b) => {
    if (feedSort === "trending") {
      return b.likes - a.likes;
    }
    return 0; // Chronological default
  });

  // Ticker filter logic
  const tickerArticles = ALL_LEADER_ARTICLES.filter((art) => {
    if (activeNewsTab === "Breaking") {
      return ["lead-feed-1", "lead-feed-3"].includes(art.id);
    }
    if (activeNewsTab === "Latest") {
      return ["lead-feed-2", "lead-feed-4"].includes(art.id);
    }
    return true; // Most Recent
  });

  // RENDER MAIN TWO-COLUMN DISCOVERY SECTION
  const renderMainDiscovery = () => (
    <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT 8-COLUMNS: MAIN NEWS FEED */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          
          {/* SECTION 09 — MAIN LEADERSHIP NEWS FEED */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 dark:border-gray-800 pb-4">
            <div>
              <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">
                Latest Leadership News
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Real-time updates and strategic declarations from verified business and policy leaders.
              </p>
            </div>

            {/* Sorting feed */}
            <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-900 p-1 rounded-xl border border-gray-200 dark:border-gray-800 self-start sm:self-auto">
              <button
                onClick={() => setFeedSort("latest")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  feedSort === "latest"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                Latest
              </button>
              <button
                onClick={() => setFeedSort("trending")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  feedSort === "trending"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                Trending
              </button>
            </div>
          </div>

          {/* Articles feed list */}
          {filteredLeaderArticles.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-[#0f172a] rounded-3xl border border-gray-200 dark:border-gray-800 text-sm text-gray-500">
              No matching leadership stories found. Try resetting your search filters.
            </div>
          ) : (
            <div className="space-y-6">
              {filteredLeaderArticles.slice(0, visibleArticlesCount).map((art) => {
                const isLiked = likedArticles.includes(art.id);
                const isSaved = savedArticles.includes(art.id);
                const isCommentsOpen = showCommentsId === art.id;

                return (
                  <div 
                    key={art.id}
                    className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4 hover:border-gray-300 dark:hover:border-gray-700/80 transition-all flex flex-col md:flex-row gap-6"
                  >
                    {/* Image block */}
                    <div className="w-full md:w-44 h-32 bg-slate-900 rounded-2xl overflow-hidden shrink-0 relative">
                      <img src={art.image} alt={art.title} className="h-full w-full object-cover" />
                      <span className="absolute top-2.5 left-2.5 bg-slate-950/75 text-white text-[8px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                        {art.flag} {art.country}
                      </span>
                    </div>

                    {/* Content block */}
                    <div className="flex-1 space-y-2 min-w-0">
                      <div className="flex items-center justify-between text-[10px] font-bold text-blue-600 uppercase">
                        <span>{art.leader} · {art.designation}, {art.company}</span>
                        <span className="text-gray-400 font-semibold">{art.date}</span>
                      </div>

                      <h4 className="font-display text-base font-bold text-gray-900 dark:text-white leading-snug">
                        {art.title}
                      </h4>

                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                        {art.excerpt}
                      </p>

                      {/* Article actions */}
                      <div className="pt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-[10px] text-gray-400 font-semibold">
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => handleLike(art.id)}
                            className={`flex items-center gap-1 hover:text-blue-600 transition-colors ${isLiked ? "text-blue-600" : ""}`}
                          >
                            <ThumbsUp className="h-3.5 w-3.5" />
                            <span>{art.likes + (isLiked ? 1 : 0)}</span>
                          </button>
                          <button 
                            onClick={() => setShowCommentsId(isCommentsOpen ? null : art.id)}
                            className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            <span>{(commentsMap[art.id] || []).length + art.comments}</span>
                          </button>
                          <button 
                            onClick={() => handleSave(art.id)}
                            className={`flex items-center gap-1 hover:text-blue-600 transition-colors ${isSaved ? "text-blue-600" : ""}`}
                          >
                            <Bookmark className="h-3.5 w-3.5" />
                            <span>{isSaved ? "Saved" : "Save"}</span>
                          </button>
                          <button 
                            onClick={() => handleShare(art.id)}
                            className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                          >
                            <Share2 className="h-3.5 w-3.5" />
                            <span>{sharedArticleId === art.id ? "Copied Link!" : "Share"}</span>
                          </button>
                        </div>

                        <Link href={`/en/poc-v2/article/${art.id}`} className="text-blue-600 font-bold hover:underline shrink-0">
                          Read Article →
                        </Link>
                      </div>

                      {/* Interactive comments block */}
                      {isCommentsOpen && (
                        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
                          <div className="space-y-2">
                            {(commentsMap[art.id] || []).map((c, cIdx) => (
                              <div key={cIdx} className="bg-gray-50 dark:bg-gray-900 p-2.5 rounded-xl border border-gray-200/60/40 dark:border-gray-800">
                                <div className="flex justify-between items-center text-[9px] font-bold text-gray-500">
                                  <span>{c.author}</span>
                                  <span>{c.time}</span>
                                </div>
                                <p className="text-[11px] text-gray-700 dark:text-gray-300 mt-1">{c.text}</p>
                              </div>
                            ))}
                          </div>

                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={commentInputMap[art.id] || ""}
                              onChange={(e) => {
                                const textVal = e.target.value;
                                setCommentInputMap(prev => ({ ...prev, [art.id]: textVal }));
                              }}
                              placeholder="Write a professional comment..."
                              className="flex-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs outline-none focus:border-blue-500"
                            />
                            <button
                              onClick={() => handleAddComment(art.id)}
                              className="bg-gray-900 dark:bg-white hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white text-white dark:text-gray-900 px-4 rounded-xl text-xs font-bold transition-all"
                            >
                              Post
                            </button>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Load More Button */}
          {filteredLeaderArticles.length > visibleArticlesCount && (
            <button
              onClick={() => setVisibleArticlesCount(prev => prev + 3)}
              className="w-full text-center py-3 bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 transition-all font-bold text-xs cursor-pointer block"
            >
              Load More Stories
            </button>
          )}

          {/* SECTION 04 — TOP LEADERSHIP STORIES (Relocated inside Discovery Left Column) */}
          <div className="space-y-4 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-200 dark:border-gray-800 pb-3">
              Top Leadership Stories
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Main Featured Top Story (7-columns) */}
              <div className="md:col-span-7 bg-white dark:bg-[#0f172a] rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:border-blue-400 transition-all flex flex-col justify-between group">
                <div className="h-64 relative overflow-hidden bg-slate-900">
                  <img src={ALL_LEADER_ARTICLES[3].image} alt={ALL_LEADER_ARTICLES[3].leader} className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-300" />
                  <div className="absolute top-4 left-4 flex gap-1.5">
                    <span className="bg-amber-600 text-white text-[9px] font-bold px-2 py-0.5 rounded">
                      {ALL_LEADER_ARTICLES[3].flag} {ALL_LEADER_ARTICLES[3].leader}
                    </span>
                    <span className="bg-slate-950/75 text-white text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                      {ALL_LEADER_ARTICLES[3].company}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <h4 className="font-display text-xl font-bold text-gray-900 dark:text-white leading-tight">
                    {ALL_LEADER_ARTICLES[3].title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-normal">
                    {ALL_LEADER_ARTICLES[3].excerpt}
                  </p>

                  {/* Why It Matters */}
                  <div className="p-4 bg-blue-50/55 dark:bg-blue-950/20 border-l-4 border-blue-500 rounded-r-xl">
                    <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest block mb-0.5">
                      ⚡ Why It Matters
                    </span>
                    <p className="text-xs font-semibold text-gray-700 dark:text-slate-350">
                      {ALL_LEADER_ARTICLES[3].whyItMatters}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-400">
                    <span>🕒 {ALL_LEADER_ARTICLES[3].date} · {ALL_LEADER_ARTICLES[3].readTime}</span>
                    <Link href={`/en/poc-v2/article/${ALL_LEADER_ARTICLES[3].id}`} className="text-blue-600 font-bold hover:underline">
                      Read Article →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Supporting Top Stories Grid (5-columns) */}
              <div className="md:col-span-5 flex flex-col justify-between gap-4">
                {ALL_LEADER_ARTICLES.slice(4, 6).map((art) => (
                  <Link
                    key={art.id}
                    href={`/en/poc-v2/article/${art.id}`}
                    className="bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm flex items-center gap-4 hover:border-blue-400 transition-all group"
                  >
                    <div className="h-16 w-20 bg-slate-900 rounded-xl overflow-hidden shrink-0 relative">
                      <img src={art.image} alt={art.leader} className="h-full w-full object-cover" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 text-[9px] font-bold text-blue-600 uppercase font-mono">
                        <span>{art.flag} {art.leader}</span>
                        <span className="text-gray-400 font-normal">· {art.date}</span>
                      </div>
                      <h5 className="text-xs font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {art.title}
                      </h5>
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT 4-COLUMNS: SIDEBAR BLOCKS */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          
          {/* SECTION 10 — MOST READ TODAY */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 font-display">
                <Flame className="h-3.5 w-3.5 text-red-655" />
                Most Read Leadership News
              </span>
            </div>

            <div className="space-y-3.5">
              {MOST_READ_LEADERSHIP.map((art, idx) => (
                <Link
                  key={art.id}
                  href={`/en/poc-v2/article/${art.id}`}
                  className="flex gap-3 items-start group"
                >
                  <span className="font-mono font-bold text-lg text-gray-300 dark:text-slate-700 w-5 text-right shrink-0">
                    {idx + 1}.
                  </span>
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-blue-600 font-mono">
                      <span>{art.flag} {art.country}</span>
                      <span className="text-gray-400 font-normal">· {art.count}</span>
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-600 leading-snug line-clamp-2 transition-colors">
                      {art.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* SECTION 05 — TRENDING LEADERS (Relocated into Discovery Right Column Sidebar) */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="border-b border-gray-200/60 dark:border-gray-800 pb-3 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 font-display">
                <TrendingUp className="h-3.5 w-3.5 text-blue-500" />
                Trending Leaders
              </span>
              <span className="text-[9px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 px-2 py-0.5 rounded">
                High Traffic
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {TRENDING_LEADERS.map((trend) => (
                <button
                  key={trend.name}
                  onClick={() => setSearchQuery(trend.name)}
                  className="p-2.5 bg-gray-50 dark:bg-gray-900/60 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-400 transition-all flex items-center justify-between group text-left w-full cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{trend.flag}</span>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors block">
                        {trend.name}
                      </span>
                      <span className="text-[9px] text-gray-400 block font-normal">{trend.designation}</span>
                    </div>
                  </div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${trend.bg} ${trend.color} shrink-0`}>
                    {trend.status}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* SECTION 06 — TRENDING LEADERSHIP TOPICS (Relocated into Discovery Right Column Sidebar) */}
          <div className="bg-white dark:bg-[#0f172a] p-5 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
            <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider block mb-1 font-display">
              Trending Topics
            </span>
            <div className="flex flex-wrap gap-1.5">
              {["AI Leadership", "CEO Succession", "Executive Appointments", "Corporate Strategy", "Leadership Changes", "Business Expansion", "Sustainability", "Innovation"].map((topic) => {
                const isSelected = selectedTopic === topic;
                return (
                  <button
                    key={topic}
                    onClick={() => setSelectedTopic(isSelected ? null : topic)}
                    className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
                      isSelected 
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-600"
                    }`}
                  >
                    #{topic}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 11 — RECOMMENDED LEADERSHIP REPORTS */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider font-display">
                Recommended Reports
              </span>
              
              <div className="flex gap-1 bg-gray-100 dark:bg-gray-900 p-0.5 rounded-lg border border-gray-200 dark:border-gray-800">
                {(["Free", "Premium"] as const).map((rTab) => (
                  <button
                    key={rTab}
                    onClick={() => setActiveReportsTab(rTab)}
                    className={`px-2 py-0.5 rounded-md text-[9px] font-bold transition-all ${
                      activeReportsTab === rTab
                        ? "bg-blue-600 text-white"
                        : "text-gray-500 hover:text-blue-600"
                    }`}
                  >
                    {rTab}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {RECOMMENDED_LEADERSHIP_REPORTS[activeReportsTab].map((rep) => (
                <div key={rep.id} className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-200/60/60 dark:border-gray-800 space-y-2">
                  <div className="flex items-center justify-between text-[9px] font-bold text-gray-400 font-mono">
                    <span>{rep.topic}</span>
                    <span className="text-blue-500 font-bold">{rep.status}</span>
                  </div>
                  <h5 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{rep.title}</h5>
                  <p className="text-[10px] text-gray-500 leading-normal font-normal">{rep.desc}</p>
                  
                  <div className="pt-2 border-t border-gray-200/50 dark:border-gray-800 space-y-2">
                    {('price' in rep) && <span className="text-xs font-bold text-gray-900 dark:text-white">{(rep as any).price}</span>}
                    <Link
                      href="/en/poc-v2/headlines"
                      className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] py-2 rounded-xl transition-all block"
                    >
                      {activeReportsTab === "Free" ? "Download Free" : "Unlock Report →"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* SECTION 14 — LEADERSHIP NEWSLETTER */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-sm space-y-4">
            <div>
              <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 font-display">
                <Mail className="h-4 w-4 text-blue-500" />
                Get Your Leadership Briefing
              </h4>
              <p className="text-[11px] text-gray-5000 mt-1">
                Receive curated weekly intelligence briefings for followed leaders and key movements.
              </p>
            </div>

            {/* Checkbox selector */}
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              {["CEOs", "Founders", "Tech Leaders", "Finance Leaders", "Board Moves"].map((catName) => {
                const isChecked = newsletterCategories.includes(catName);
                return (
                  <button
                    key={catName}
                    onClick={() => toggleNewsletterCategory(catName)}
                    className={`px-2.5 py-1.5 rounded-lg border text-left flex items-center gap-1.5 transition-all w-full cursor-pointer ${
                      isChecked 
                        ? "bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold"
                        : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    <span className={`h-2.5 w-2.5 rounded-sm flex items-center justify-center text-[8px] ${isChecked ? "bg-blue-600 text-white" : "border border-gray-400"}`}>
                      {isChecked ? "✓" : ""}
                    </span>
                    <span>{catName}</span>
                  </button>
                );
              })}
            </div>

            {newsletterSubscribed ? (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold rounded-xl text-center">
                ✓ Briefing Confirmed! Subscribed.
              </div>
            ) : (
              <button
                onClick={() => setNewsletterSubscribed(true)}
                className="w-full text-center py-2.5 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-xl hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white font-bold text-xs transition-all cursor-pointer"
              >
                Subscribe to Briefing
              </button>
            )}
          </div>

          {/* SECTION 15 — SPONSORED LEADERSHIP CONTENT */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-[9px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800 pb-2 font-mono">
              <span>Sponsored Leadership Insight</span>
              <span className="bg-amber-100/60 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded">
                Sponsored
              </span>
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">
                How Executive Teams are Preparing for the Next Phase of Bilateral AI Adoption
              </h4>
              <p className="text-[10px] text-gray-500 leading-normal font-normal">
                Presented by <strong>Global Consult Services</strong>. Discover key operational frameworks to build resilient sovereign tech layers.
              </p>
              <Link
                href="/en/poc-v2/headlines"
                className="block text-center w-full py-2 border border-gray-200 dark:border-gray-800 hover:border-blue-500 rounded-xl text-[10px] font-bold transition-all"
              >
                Learn More →
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-12 transition-colors duration-300">
      
      {/* HEADER BREADCRUMB */}
      <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:text-blue-500 transition-colors cursor-pointer"
              aria-label="Go back"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600">
                Feed Mega Menu · Leaders Feed
              </span>
              <h1 className="font-display text-xl font-bold leading-none mt-1">
                All Leaders News & Discovery
              </h1>
            </div>
          </div>

          {/* Dynamic Sub-menu tabs (My Leader | All Leader | Leader Intelligence) */}
          <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-950 p-1 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs">
            {[
              { key: "my", label: "My Leader" },
              { key: "all", label: "All Leader" },
              { key: "intelligence", label: "Leader Intelligence" }
            ].map((sub) => (
              <button
                key={sub.key}
                onClick={() => {
                  if (sub.key === "intelligence") {
                    router.push("/en/poc-v2/leader-news/intelligence");
                    return;
                  }
                  if (sub.key === "all") {
                    router.push("/en/poc-v2/feed/leader/all");
                    return;
                  }
                  if (sub.key === "my") {
                    router.push("/en/poc-v2/feed/leader");
                    return;
                  }
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  sub.key === "all"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-gray-600 dark:text-gray-350 hover:bg-gray-150 dark:hover:bg-gray-850"
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 01 — HERO: LEADERSHIP PULSE */}
      <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Story Card (8-columns) */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-slate-950 rounded-3xl overflow-hidden border border-slate-900 shadow-lg min-h-[460px] relative group">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-45 group-hover:scale-[1.01] transition-transform duration-500"
              style={{ backgroundImage: `url(${ALL_LEADER_ARTICLES[0].image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-955 via-slate-950/30 to-transparent" />
            
            <div className="relative z-10 p-6 sm:p-8 space-y-4 mt-auto">
              <div className="flex items-center gap-2.5">
                <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-blue-600 text-white uppercase tracking-wider">
                  {ALL_LEADER_ARTICLES[0].flag} {ALL_LEADER_ARTICLES[0].leader}
                </span>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-white/15 text-slate-200 backdrop-blur-xs">
                  {ALL_LEADER_ARTICLES[0].topic}
                </span>
                <span className="text-[9px] text-gray-400 font-medium">
                  {ALL_LEADER_ARTICLES[0].designation}, {ALL_LEADER_ARTICLES[0].company}
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-4xl font-bold text-white leading-tight max-w-3xl">
                {ALL_LEADER_ARTICLES[0].title}
              </h2>
              
              <p className="text-slate-300 text-xs sm:text-sm font-normal max-w-2xl leading-relaxed line-clamp-3">
                {ALL_LEADER_ARTICLES[0].excerpt}
              </p>

              {/* Why It Matters */}
              <div className="p-4 bg-blue-950/40 border-l-4 border-blue-500 rounded-r-xl max-w-xl">
                <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest block mb-0.5">
                  ⚡ Why It Matters
                </span>
                <p className="text-xs font-semibold text-slate-200">
                  {ALL_LEADER_ARTICLES[0].whyItMatters}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-white/10 text-[11px] text-gray-400">
                <div className="flex items-center gap-4">
                  <span>🕒 {ALL_LEADER_ARTICLES[0].date}</span>
                  <span>⚡ {ALL_LEADER_ARTICLES[0].readTime}</span>
                  <span>✍️ {ALL_LEADER_ARTICLES[0].source}</span>
                </div>
                <Link
                  href={`/en/poc-v2/article/${ALL_LEADER_ARTICLES[0].id}`}
                  className="bg-white hover:bg-slate-200 text-gray-950 font-bold px-5 py-2.5 rounded-xl transition-all flex items-center gap-1 shrink-0 text-xs"
                >
                  Read Full Story <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Secondary Supporting Stories (4-columns) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4">
            <div className="bg-white dark:bg-[#0f172a] rounded-3xl border border-gray-200/70 dark:border-gray-800 p-6 flex-1 space-y-4">
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block">
                Supporting Stories
              </span>
              
              <div className="space-y-4 divide-y divide-gray-100 dark:divide-gray-800">
                {ALL_LEADER_ARTICLES.slice(1, 4).map((art, idx) => (
                  <Link 
                    key={art.id}
                    href={`/en/poc-v2/article/${art.id}`}
                    className={`flex gap-4 items-start ${idx > 0 ? "pt-4" : ""}`}
                  >
                    <div className="h-16 w-20 rounded-xl bg-slate-900 overflow-hidden shrink-0 relative">
                      <img src={art.image} alt={art.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-blue-600 uppercase">
                        <span>{art.flag} {art.leader}</span>
                        <span className="text-gray-400 font-normal">· {art.date}</span>
                      </div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 hover:text-blue-600 transition-colors font-display">
                        {art.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 02 — LEADER SEARCH & NAVIGATION */}
      <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
        <div className="bg-white dark:bg-[#0f172a] p-5 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs shrink-0 max-w-full">
              {["All", "CEOs", "Founders", "Executives", "Industry Leaders"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-blue-600"
                  }`}
                >
                  {cat === "All" ? "All Leaders" : cat}
                </button>
              ))}
            </div>

            {/* Search Leader bar */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search leaders, companies or industry titles..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Quick Select shortcuts */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider py-1.5 mr-1 font-mono">Quick Select:</span>
            {TRENDING_LEADERS.map((cnt) => (
              <button
                key={cnt.name}
                onClick={() => {
                  setSearchQuery(cnt.name);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  searchQuery === cnt.name
                    ? "bg-blue-50 dark:bg-blue-950/40 border border-blue-400 text-blue-700 dark:text-blue-300"
                    : "bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                <span>{cnt.flag}</span>
                <span>{cnt.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 03 — BREAKING / LATEST LEADER NEWS */}
      <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
        <div className="bg-white dark:bg-[#0f172a] rounded-3xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200/60 dark:border-gray-800 pb-3">
            <div className="flex gap-2">
              {(["Breaking", "Latest", "Most Recent"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveNewsTab(tab)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeNewsTab === tab
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-gray-100 dark:bg-gray-900 text-gray-5000 hover:text-blue-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-ping" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tickerArticles.map((story) => (
              <div 
                key={story.id}
                className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-200/60 dark:border-gray-800 flex flex-col justify-between space-y-3 hover:border-blue-450 dark:hover:border-blue-500/30 transition-all group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[9px] font-mono">
                    <span className="font-bold text-blue-600 flex items-center gap-1 uppercase">
                      <span>{story.flag}</span>
                      <span>{story.leader}</span>
                    </span>
                    <span className="text-gray-400">{story.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug line-clamp-3 group-hover:text-blue-600 transition-colors">
                    {story.title}
                  </h4>
                </div>
                <div className="pt-2 border-t border-gray-200/60 dark:border-gray-800/80 flex items-center justify-between text-[10px] text-gray-400 font-semibold font-mono">
                  <span>{story.source}</span>
                  <Link href={`/en/poc-v2/article/${story.id}`} className="text-blue-600 font-bold hover:underline">
                    Read →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TWO-COLUMN DISCOVERY SECTION */}
      {renderMainDiscovery()}

      {/* SECTION 07 — LEADERSHIP MOVES & APPOINTMENTS */}
      <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
        <div className="space-y-4">
          <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-200 dark:border-gray-800 pb-3">
            Leadership Moves & Appointments
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {LEADERSHIP_MOVES.map((move) => (
              <div 
                key={move.id}
                className="bg-white dark:bg-[#0f172a] p-5 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between min-h-[220px]"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">{move.name}</span>
                    <span className="text-[8px] font-mono text-gray-400">{move.type}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase">
                        <span>{move.flag} {move.country}</span>
                        <span>·</span>
                        <span>{move.date}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 font-normal leading-normal">
                        Prev: {move.prevRole}
                      </p>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-slate-200 leading-snug">
                        New: {move.newRole}
                      </h4>
                    </div>
                  </div>
                </div>

                <Link
                  href="/en/poc-v2/headlines"
                  className="w-full text-center text-[10px] font-bold bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-blue-605 py-2 rounded-xl transition-all mt-4 block"
                >
                  Explore Move →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 08 — PERSONALIZED LEADER FEED */}
      <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
        <div className="bg-white dark:bg-[#0f172a] rounded-3xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200/60 dark:border-gray-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="font-display text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  Personalized Leader Feed
                </h3>
              </div>
              <p className="text-xs text-gray-5000 mt-1">Based on the leaders and topics you follow.</p>
            </div>

            {/* Manual follow interface */}
            <div className="flex flex-wrap gap-1.5">
              {["Jensen Huang", "Nandan Nilekani", "Shaktikanta Das", "Mukesh Ambani"].map((lName) => {
                const isFollowed = followedLeaders.includes(lName);
                return (
                  <button
                    key={lName}
                    onClick={() => handleFollow(lName)}
                    className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
                      isFollowed
                        ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-700 dark:text-emerald-300"
                        : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600"
                    }`}
                  >
                    {isFollowed ? `✓ Following ${lName}` : `+ Follow ${lName}`}
                  </button>
                );
              })}
            </div>
          </div>

          {followedLeaders.length === 0 ? (
            <div className="p-8 text-center bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-2">
              <h4 className="font-bold text-xs">Build Your Leader Feed</h4>
              <p className="text-xs text-gray-400 font-normal">Follow leaders you care about and receive a more personalized news experience.</p>
              <button 
                onClick={() => setFollowedLeaders(["Jensen Huang", "Nandan Nilekani"])}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all"
              >
                Personalize My Feed →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ALL_LEADER_ARTICLES
                .filter(art => followedLeaders.includes(art.leader))
                .slice(0, 2)
                .map((art) => (
                  <div key={art.id} className="p-4 bg-gray-50 dark:bg-gray-900/40 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-2">
                    <div className="flex items-center justify-between text-[9px] font-mono">
                      <span className="font-bold text-blue-600">{art.flag} {art.leader}</span>
                      <span className="text-gray-400">{art.date}</span>
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug line-clamp-2">
                      {art.title}
                    </h4>
                    <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed font-normal">
                      {art.excerpt}
                    </p>
                    <Link href={`/en/poc-v2/article/${art.id}`} className="text-[10px] text-blue-600 font-bold hover:underline block pt-1">
                      Read Recommended Brief →
                    </Link>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 16 — RELATED LEADERSHIP INTELLIGENCE */}
      <section className="mx-auto max-w-7xl px-4 pt-12 lg:px-6">
        <div className="bg-white dark:bg-[#0f172a] rounded-3xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm space-y-6">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600">
              Explore More Leadership Intelligence
            </span>
            <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mt-1">
              Explore More Leadership Intelligence
            </h3>
            <p className="text-xs text-gray-5000 mt-1 max-w-2xl">
              Connect into deeper analytic modules across leaders, companies, and custom intelligence tiers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Leadership Intelligence", desc: "Go deeper into individual leaders.", path: "/en/poc-v2/leader-news/intelligence" },
              { title: "Leader Profiles", desc: "Explore detailed professional leader profiles.", path: "/en/poc-v2/leader-news" },
              { title: "Company Intelligence", desc: "Understand the companies leaders operate.", path: "/en/poc-v2/company-news" },
              { title: "Industry Intelligence", desc: "Understand the industries leaders influence.", path: "/en/poc-v2/sector-news/industry" },
              { title: "Country Intelligence", desc: "Understand the countries where leaders operate.", path: "/en/poc-v2/country-news/intelligence" },
              { title: "Premium Reports", desc: "Access deeper research and analysis.", path: "/en/poc-v2/headlines" }
            ].map((prod) => (
              <div 
                key={prod.title}
                className="p-5 bg-gray-50 dark:bg-gray-900/60 border border-gray-200/60/40 dark:border-gray-800/80 rounded-2xl flex flex-col justify-between hover:border-blue-400 dark:hover:border-blue-500/30 transition-all group"
              >
                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {prod.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed font-normal">
                    {prod.desc}
                  </p>
                </div>
                <Link href={prod.path} className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1 pt-3 shrink-0">
                  Explore <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
