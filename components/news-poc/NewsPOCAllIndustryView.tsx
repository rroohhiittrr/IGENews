"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { 
  Sparkles, TrendingUp, Search, ArrowLeft, ChevronRight,
  Clock, Calendar, Flame, Lock, Mail, FileText, CheckCircle,
  ThumbsUp, Bookmark, Share2, MessageSquare, Globe, Cpu, Zap, Car,
  Layers, Scale, Headphones, Users, BarChart3,
  ArrowUpRight, Heart, Newspaper,
  Play, Tag, Award, Target, Bell
} from "lucide-react";

function SectionTitle({ title, action, subtitle }: { title: string; action?: React.ReactNode; subtitle?: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 dark:border-gray-800 pb-2.5">
      <div>
        <h3 className="font-display text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider">{title}</h3>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="text-xs">{action}</div>}
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white dark:bg-[#0f172a] rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xs hover:shadow-sm transition-all ${className}`}>
      {children}
    </div>
  );
}


interface NewsPOCAllIndustryViewProps {
  onBack?: () => void;
}

export default function NewsPOCAllIndustryView({ onBack }: NewsPOCAllIndustryViewProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isIntelligenceActive = pathname?.includes("/sector-news/industry") || pathname?.endsWith("/intelligence");
  const isAllActive = pathname?.endsWith("/feed/industry/all") || pathname?.includes("/feed/industry/all") || (!isIntelligenceActive && pathname?.includes("/all")) || (!isIntelligenceActive && !pathname?.includes("/feed/industry"));
  const isMyActive = !isIntelligenceActive && !isAllActive;

  // Local state for interactive features
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"Breaking" | "Latest" | "Most Read" | "Most Discussed">("Breaking");
  const [feedSortFilter, setFeedSortFilter] = useState<"latest" | "trending">("latest");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [likedArticles, setLikedArticles] = useState<string[]>([]);
  const [savedArticles, setSavedArticles] = useState<string[]>([]);
  const [followedIndustries, setFollowedIndustries] = useState<string[]>(["Semiconductors", "Renewable Energy"]);
  const [sharedArticleId, setSharedArticleId] = useState<string | null>(null);
  const [openCommentId, setOpenCommentId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState<string>("");
  const [articleComments, setArticleComments] = useState<Record<string, { author: string; text: string; time: string }[]>>({
    "ind-feed-1": [
      { author: "Siddharth Sen", text: "OSAT packaging incentives will significantly curb lead times for domestic OEMs.", time: "15m ago" }
    ],
    "ind-feed-2": [
      { author: "Elena Weber", text: "EU port terminals are actively bidding for long-term Indian green ammonia supply contracts.", time: "1h ago" }
    ]
  });

  // Comparison widget state
  const [compareA, setCompareA] = useState<string>("Semiconductors");
  const [compareB, setCompareB] = useState<string>("Automotive & EV");

  // Pagination state for dedicated Load More / View More Stories experience
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [selectedNewsletterIndustries, setSelectedNewsletterIndustries] = useState<string[]>([
    "Semiconductors", "Renewable Energy", "Automotive & EV"
  ]);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);

  // Industry Intelligence Submenu state variables
  const [iiSearchQuery, setIiSearchQuery] = useState("");
  const [iiSelectedSector, setIiSelectedSector] = useState("Electronics & IT & Components");
  const [iiSelectedIndustry, setIiSelectedIndustry] = useState("Semiconductors");
  const [iiActiveScenario, setIiActiveScenario] = useState<"Base Case" | "High Growth" | "Downside">("Base Case");
  const [iiNewsletterEmail, setIiNewsletterEmail] = useState("");
  const [iiNewsletterSubscribed, setIiNewsletterSubscribed] = useState(false);
  const [iiFollowed, setIiFollowed] = useState(false);
  const [iiAlertsConfigured, setIiAlertsConfigured] = useState(false);
  const [iiAskInput, setIiAskInput] = useState("");
  const [iiAskedQuestions, setIiAskedQuestions] = useState([
    { id: 1, question: "Will the new carbon border adjustment tax impact solar component exports to Europe?", votes: 34, voted: false },
    { id: 2, question: "What is the expected lead time reduction for OSAT packaging units with local glass substrates?", votes: 29, voted: false },
    { id: 3, question: "Can EV heavy transport fleets bypass proprietary charging hubs using the new swap protocol?", votes: 18, voted: false }
  ]);
  const [iiPublishCompany, setIiPublishCompany] = useState("");
  const [iiPublishTitle, setIiPublishTitle] = useState("");
  const [iiPublishSuccess, setIiPublishSuccess] = useState(false);


  // Handlers
  const handleLike = (id: string) => {
    setLikedArticles(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleSave = (id: string) => {
    setSavedArticles(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleShare = (id: string) => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/en/news-poc/article/${id}`);
    }
    setSharedArticleId(id);
    setTimeout(() => setSharedArticleId(null), 2500);
  };

  const handleFollowIndustry = (name: string) => {
    setFollowedIndustries(prev => prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]);
  };

  const handleAddComment = (id: string) => {
    if (!commentInput.trim()) return;
    setArticleComments(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), { author: "You", text: commentInput.trim(), time: "Just now" }]
    }));
    setCommentInput("");
  };

  const toggleNewsletterIndustry = (ind: string) => {
    setSelectedNewsletterIndustries(prev => 
      prev.includes(ind) ? prev.filter(i => i !== ind) : [...prev, ind]
    );
  };

  // Industries list for horizontal navigation & comparison
  const INDUSTRIES = [
    { name: "All", count: 184 },
    { name: "Semiconductors", count: 32, icon: Cpu },
    { name: "Renewable Energy", count: 28, icon: Zap },
    { name: "Automotive & EV", count: 24, icon: Car },
    { name: "Pharma & Biotech", count: 21, icon: Layers },
    { name: "Aerospace & Defence", count: 19, icon: Globe },
    { name: "FinTech & Payments", count: 18, icon: Scale },
    { name: "Logistics & Maritime", count: 16, icon: Layers },
    { name: "AgriTech & Food", count: 14, icon: Globe },
    { name: "Mining & Rare Earths", count: 12, icon: Layers }
  ];

  // News ticker data
  const TICKER_STORIES = {
    Breaking: [
      { id: "tick-1", industry: "Semiconductors", title: "India-Taiwan joint OSAT facility achieves commercial packaging yield benchmark", time: "8m ago", source: "IGEN Tech Desk", readTime: "3 min read" },
      { id: "tick-2", industry: "Renewable Energy", title: "Cabinet sanctions €2.4B green hydrogen marine bunkering pipeline for Western ports", time: "22m ago", source: "Ministry of MNRE", readTime: "4 min read" },
      { id: "tick-3", industry: "Automotive & EV", title: "Standardized high-voltage battery swap framework mandated for 80 freight highways", time: "45m ago", source: "Auto Logistics Bureau", readTime: "3 min read" }
    ],
    Latest: [
      { id: "tick-4", industry: "Pharma & Biotech", title: "Domestic fermentation plants synthesize 68% of active bulk ingredients", time: "1h ago", source: "Pharma Pulse", readTime: "5 min read" },
      { id: "tick-5", industry: "FinTech & Payments", title: "Cross-border UPI settlement protocols expanded into 14 maritime gateways", time: "2h ago", source: "FinTech Wire", readTime: "4 min read" }
    ],
    "Most Read": [
      { id: "tick-6", industry: "Mining & Rare Earths", title: "12 Critical mineral exploration blocks auctioned for domestic cell giga-factories", time: "4h ago", source: "Mining Intelligence", readTime: "6 min read" },
      { id: "tick-7", industry: "Aerospace & Defence", title: "Indigenously engineered UAV radar avionics clear overseas export guidelines", time: "6h ago", source: "Defence Trade Journal", readTime: "5 min read" }
    ],
    "Most Discussed": [
      { id: "tick-8", industry: "Logistics & Maritime", title: "Automated single-window customs API slices port detention time by 38%", time: "3h ago", source: "Maritime Council", readTime: "4 min read" }
    ]
  };

  // Main Articles Feed Data
  const ALL_INDUSTRY_ARTICLES = [
    {
      id: "ind-feed-1",
      title: "Semiconductor OSAT Substrate Scaling Accelerates Across Southern Industrial Corridors",
      excerpt: "High-density glass packaging facilities reach pilot commercial run milestones, reducing dependence on East Asian test houses by 35% in Q1.",
      industry: "Semiconductors",
      code: "IND-01",
      country: "India-Taiwan Bilateral",
      source: "India Semiconductor Mission",
      author: "Arun Kulkarni · Tech Hardware",
      date: "10m ago",
      readTime: "5 min read",
      likes: 312,
      comments: 24,
      impact: "+38.2% YoY Output",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
      whyItMatters: "Secures domestic supply resilience for mission-critical automotive ECUs and high-performance server accelerators."
    },
    {
      id: "ind-feed-2",
      title: "Green Hydrogen Marine Corridors: €2.4B Interconnectivity Pipeline Approved with EU Ports",
      excerpt: "Bilateral energy agreements secure offshore solar-wind grid interconnectivity to supply liquefied clean hydrogen to Rotterdam and Hamburg terminals.",
      industry: "Renewable Energy",
      code: "IND-04",
      country: "India-Germany Bilateral",
      source: "Ministry of New & Renewable Energy",
      author: "Vikram Sengupta · Energy Lead",
      date: "35m ago",
      readTime: "6 min read",
      likes: 428,
      comments: 31,
      impact: "€2.4B Pipeline",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop&q=80",
      whyItMatters: "Positions Indian coastal export hubs as primary clean fuel suppliers for European decarbonization mandates."
    },
    {
      id: "ind-feed-3",
      title: "Heavy Commercial EV Battery Interoperability Protocol Mandated Across 80 Transit Corridors",
      excerpt: "Standardized 800V fast-swapping battery enclosures across national freight highways cut long-haul logistics fleet turnaround times by 45%.",
      industry: "Automotive & EV",
      code: "IND-06",
      country: "Domestic & SEA",
      source: "Ministry of Heavy Industries",
      author: "Sunita Rao · Auto Logistics",
      date: "2 hrs ago",
      readTime: "4 min read",
      likes: 260,
      comments: 18,
      impact: "+45% Turnaround",
      image: "https://images.unsplash.com/photo-1558441719-8b89ec691456?w=800&auto=format&fit=crop&q=80",
      whyItMatters: "Eliminates proprietary charging barriers, enabling unified fleet electrification for inter-city heavy transport."
    },
    {
      id: "ind-feed-4",
      title: "API Sovereignty Milestone: India Synthesizes 68% of Essential Bulk Drugs Domestically",
      excerpt: "Fermentation plants under the PLI bulk drug scheme go commercial, drastically reducing import dependency on key active pharmaceutical ingredients.",
      industry: "Pharma & Biotech",
      code: "IND-07",
      country: "Global Corridors",
      source: "Department of Pharmaceuticals",
      author: "Dr. Ananya Sen · Pharma Sourcing",
      date: "4 hrs ago",
      readTime: "5 min read",
      likes: 345,
      comments: 19,
      impact: "68% Domestic Share",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80",
      whyItMatters: "Protects generic drug supply chains from foreign pricing shocks and raw material export curbs."
    },
    {
      id: "ind-feed-5",
      title: "Autonomous Border UAV & Drone Avionics Production Cleared for Global Friendly Exports",
      excerpt: "Tri-service operational clearance awarded to indigenously designed radar guidance pods and composite airframes with overseas delivery pipelines.",
      industry: "Aerospace & Defence",
      code: "IND-05",
      country: "Domestic & Global",
      source: "Ministry of Defence",
      author: "Col. Rajesh Verma · Defence Analyst",
      date: "6 hrs ago",
      readTime: "7 min read",
      likes: 390,
      comments: 27,
      impact: "+54.0% Exports",
      image: "https://images.unsplash.com/photo-1517976487588-46c8209ebfa5?w=800&auto=format&fit=crop&q=80",
      whyItMatters: "Demonstrates indigenous high-tier defense manufacturing capability on the international trade stage."
    },
    {
      id: "ind-feed-6",
      title: "Cross-Border UPI Integration Deployed Across 14 Major European and Gulf Maritime Trade Ports",
      excerpt: "Real-time port duty and customs settlement rails via UPI go live in UAE, Singapore, and European logistics hubs, removing FX settlement delays.",
      industry: "FinTech & Payments",
      code: "IND-02",
      country: "India-UAE-EU",
      source: "National Payments Corporation",
      author: "Priya Sundaram · Trade Analyst",
      date: "8 hrs ago",
      readTime: "4 min read",
      likes: 410,
      comments: 35,
      impact: "Instant Settlement",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80",
      whyItMatters: "Eliminates correspondent banking delays for exporters and importers settling maritime freight charges."
    },
    {
      id: "ind-feed-7",
      title: "CleanTech Electrolyser Stack Manufacturing Scales to 3GW Annual Capacity in Gujarat",
      excerpt: "Domestic mega-electrolyser plants achieve sub-$2 per kg green hydrogen production benchmarks, boosting maritime export off-take contracts.",
      industry: "Renewable Energy",
      code: "IND-08",
      country: "India-Nordic Bilateral",
      source: "Clean Energy Transition Bureau",
      author: "Siddharth Sen · CleanTech",
      date: "10 hrs ago",
      readTime: "5 min read",
      likes: 295,
      comments: 14,
      impact: "3GW Electrolysers",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&auto=format&fit=crop&q=80",
      whyItMatters: "Accelerates utility-scale green ammonia production for heavy industry and container ship bunkering."
    },
    {
      id: "ind-feed-8",
      title: "Critical Mineral Refining Hub Commissioned for Domestic Lithium-Iron-Phosphate Cells",
      excerpt: "First commercial refining block processes high-purity battery grade spodumene, supporting domestic gigafactory production pipelines.",
      industry: "Mining & Rare Earths",
      code: "IND-09",
      country: "India-Australia Corridor",
      source: "Ministry of Mines",
      author: "Kavita Nair · Mineral Economics",
      date: "12 hrs ago",
      readTime: "6 min read",
      likes: 380,
      comments: 22,
      impact: "+40% Raw Material Security",
      image: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=800&auto=format&fit=crop&q=80",
      whyItMatters: "Reduces cell-level import dependency for two-wheeler and grid-scale energy storage manufacturers."
    },
    {
      id: "ind-feed-9",
      title: "Deep-Sea Automated Port Terminals Cut Turnaround Time by 38% at Western Freight Gateways",
      excerpt: "AI-driven container stowage and electric gantry cranes clear 24,000 TEU mega-vessels within 18 hours across primary maritime hubs.",
      industry: "Logistics & Maritime",
      code: "IND-10",
      country: "Global Maritime Gateway",
      source: "Maritime Trade Authority",
      author: "Capt. Raghavan Iyer · Maritime Desk",
      date: "14 hrs ago",
      readTime: "4 min read",
      likes: 310,
      comments: 17,
      impact: "-38% Berth Latency",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
      whyItMatters: "Directly lowers container demurrage and logistics friction for cross-border export cargo."
    },
    {
      id: "ind-feed-10",
      title: "Smart Precision Agriculture Drones Deploy Across 1.2M Hectares for High-Value Cash Crops",
      excerpt: "Autonomous multispectral spraying and soil moisture mapping protocols boost crop yield predictability while cutting chemical usage by 30%.",
      industry: "AgriTech & Food",
      code: "IND-11",
      country: "Domestic Corridors",
      source: "AgriTech Innovation Council",
      author: "Sunil Patel · Agri Economics",
      date: "16 hrs ago",
      readTime: "5 min read",
      likes: 275,
      comments: 12,
      impact: "+22% Yield Margin",
      image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&auto=format&fit=crop&q=80",
      whyItMatters: "Enhances farmgate realization and export-grade agricultural traceability for European food processors."
    },
    {
      id: "ind-feed-11",
      title: "Next-Gen 6G Terahertz Testbed and Open RAN Telecommunications Sandbox Inaugurated",
      excerpt: "Telecom engineering consortia initiate high-frequency beamforming trials supporting low-latency industrial robotics and automated fab controls.",
      industry: "Telecommunications",
      code: "IND-12",
      country: "Global R&D Hubs",
      source: "Department of Telecommunications",
      author: "Aditya Mehta · Telecom Tech",
      date: "18 hrs ago",
      readTime: "6 min read",
      likes: 415,
      comments: 29,
      impact: "Sub-1ms Latency",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
      whyItMatters: "Enables sovereign intellectual property in cellular standard essential patents (SEPs) for next-decade networks."
    },
    {
      id: "ind-feed-12",
      title: "Green Cement and Low-Carbon Prefab Building Protocols Adopted for Major Freight Corridors",
      excerpt: "Fly-ash geopolymers and recycled steel slag composite materials achieve structural load certifications across 12 high-speed transit routes.",
      industry: "Construction",
      code: "IND-13",
      country: "National Infrastructure",
      source: "National Highways Infrastructure",
      author: "Meera Joshi · Infra Planning",
      date: "1 day ago",
      readTime: "5 min read",
      likes: 230,
      comments: 11,
      impact: "-45% Embodied Carbon",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=800&auto=format&fit=crop&q=80",
      whyItMatters: "Meets international green procurement standards required for multilateral development bank project financing."
    }
  ];

  // Filtered articles
  const filteredArticles = ALL_INDUSTRY_ARTICLES.filter(art => {
    const matchIndustry = selectedIndustry === "All" || art.industry === selectedIndustry;
    const matchTopic = !selectedTopic || art.title.toLowerCase().includes(selectedTopic.toLowerCase()) || art.excerpt.toLowerCase().includes(selectedTopic.toLowerCase());
    const matchSearch = !searchQuery || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) || 
      art.industry.toLowerCase().includes(searchQuery.toLowerCase());
    return matchIndustry && matchTopic && matchSearch;
  }).sort((a, b) => {
    if (feedSortFilter === "trending") {
      return (b.likes + b.comments) - (a.likes + a.comments);
    }
    // "latest" default chronological order as ordered in dataset
    return 0;
  });

  // ─── INDUSTRY INTELLIGENCE DATA REPOSITORY ───
  const II_SECTORS_MAP: Record<string, string[]> = {
    "Electronics & IT & Components": ["Semiconductors", "Silicon Fabrication & OSAT"],
    "Energy & Sustainability": ["Renewable Energy", "Solar PV Cell Production"],
    "Automotive & Electric Vehicles": ["Automotive & EV", "Electric Vehicle Batteries"],
    "Health & Family Welfare & Pharma": ["Pharma & Biotech", "Active Pharma Ingredients (API)"],
    "Defence & Aerospace": ["Aerospace & Defence", "Defense Autonomous Avionics"],
    "Logistics & Supply Chain": ["Logistics & Maritime", "Precision Agritech Equipment"]
  };

  const II_INDUSTRY_DB: Record<string, {
    marketDirection: string;
    investmentActivity: string;
    tradeActivity: string;
    techAdoption: string;
    riskLevel: string;
    outlook: string;
    indicators: {
      cagr: string;
      capex: string;
      exportGrowth: string;
      demandIndex: string;
      employmentIndex: string;
      capacityUtilization: string;
    };
    opportunities: { title: string; category: string }[];
    risks: { title: string; category: string; level: string }[];
    whyItMatters: { title: string; explanation: string; affected: string[]; watch: string };
    companies: { name: string; country: string; desc: string }[];
    leaders: { name: string; designation: string; company: string; country: string }[];
    forecast: {
      c2026: string;
      c2027: string;
      c2028: string;
      c2030: string;
      assumptions: string[];
      limitations: string;
    };
    reports: { title: string; price: string; code: string; isPremium: boolean }[];
    timeline: { date: string; title: string; desc: string }[];
    marketIndicators: { label: string; value: string; desc: string }[];
    articles: { id: string; title: string; excerpt: string; date: string; readTime: string; category: string; source: string }[];
    trends: { label: string; val: string; tech: string }[];
  }> = {
    "Semiconductors": {
      marketDirection: "Growing",
      investmentActivity: "High",
      tradeActivity: "Increasing",
      techAdoption: "Rapid",
      riskLevel: "Moderate",
      outlook: "Positive",
      indicators: {
        cagr: "+14.2%",
        capex: "$84.6B",
        exportGrowth: "+8.7%",
        demandIndex: "92.4 / 100",
        employmentIndex: "+4.2%",
        capacityUtilization: "88.5%"
      },
      opportunities: [
        { title: "PLI subsidies for OSAT chip assemblies in southern hubs", category: "Government Incentive" },
        { title: "High-density glass packaging expansion to bypass substrate blockades", category: "Technology Moat" }
      ],
      risks: [
        { title: "Red Sea freight tariff hikes raising silicon delivery costs", category: "Supply Chain", level: "High" },
        { title: "Sanctions on EUV lithography components restricting local fabs", category: "Regulatory", level: "Moderate" }
      ],
      whyItMatters: {
        title: "Sovereign OSAT Capacity Slashes Import Wait Times",
        explanation: "Local packaging facilities reduce wait times for auto microcontrollers from 24 weeks to just 8 weeks, securing manufacturing continuity.",
        affected: ["Automotive Manufacturers", "Telecom Hardware Devs", "Exporters"],
        watch: "Phase-2 PLI grant allocations in September"
      },
      companies: [
        { name: "Tata OSAT Solutions", country: "India", desc: "Developing $4.2B substrate testing and fab packaging lines." },
        { name: "NVIDIA Chip Sourcing", country: "USA", desc: "Expanding design partnership alliances across commercial clusters." }
      ],
      leaders: [
        { name: "Jensen Huang", designation: "CEO", company: "NVIDIA", country: "USA" },
        { name: "Arun Kulkarni", designation: "Lead Tech Hardware Architect", company: "India Semiconductor Mission", country: "India" }
      ],
      forecast: {
        c2026: "$110B",
        c2027: "$142B",
        c2028: "$180B",
        c2030: "$240B",
        assumptions: ["Sustained 8% domestic device growth", "No escalation in regional semiconductor trade blocks"],
        limitations: "Depends heavily on state water resource management guidelines."
      },
      reports: [
        { title: "Global OSAT Semiconductor Packaging Market 2026", price: "$199", code: "REP-SEM-46", isPremium: true },
        { title: "Substrate Supply Chain & Geopolitical Volatility Guide", price: "$149", code: "REP-SEM-12", isPremium: true }
      ],
      timeline: [
        { date: "JAN 2026", title: "Glass packaging pilot", desc: "First commercial yields validated at Bangalore cleanrooms." },
        { date: "MAR 2026", title: "Substrate cluster sanction", desc: "Ministry of Electronics sanctions $800M cluster development fund." }
      ],
      marketIndicators: [
        { label: "Wafer Pricing Velocity", value: "-2.4% QoQ", desc: "Silicon raw substrate pricing pressure eases." },
        { label: "Lead Time Average", value: "8.5 Weeks", desc: "Fastest assembly turnaround in two years." }
      ],
      trends: [
        { label: "EMERGING TREND", val: "High-density glass substrates", tech: "Substrate Scaling" },
        { label: "GROWING TREND", val: "Private compute accelerators", tech: "AI Optimization" }
      ],
      articles: [
        { id: "ind-feed-1", title: "Semiconductor OSAT Substrate Scaling Accelerates Across Southern Industrial Corridors", excerpt: "High-density glass packaging facilities reach pilot commercial run milestones, reducing dependence on East Asian test houses by 35% in Q1.", date: "10m ago", readTime: "5 min read", category: "TECHNOLOGY", source: "India Semiconductor Mission" },
        { id: "tick-1", title: "India-Taiwan joint OSAT facility achieves commercial packaging yield benchmark", excerpt: "Silicon fabrication logistics slow down. Indian assembly plants prepare to increase buffer stocks.", date: "1 hr ago", readTime: "3 min read", category: "MARKET", source: "IGEN Tech Desk" }
      ]
    },
    "Renewable Energy": {
      marketDirection: "Growing",
      investmentActivity: "High",
      tradeActivity: "Increasing",
      techAdoption: "Rapid",
      riskLevel: "Low",
      outlook: "Positive",
      indicators: {
        cagr: "+18.5%",
        capex: "$112.4B",
        exportGrowth: "+12.1%",
        demandIndex: "96.2 / 100",
        employmentIndex: "+6.8%",
        capacityUtilization: "72.4%"
      },
      opportunities: [
        { title: "Offshore wind tariff exemptions for green hydrogen feedstock", category: "Tax Credit" },
        { title: "Bilateral solar cell export corridors to Central European gateways", category: "Bilateral Trade" }
      ],
      risks: [
        { title: "EU Carbon Border Adjustment compliance overheads", category: "Regulatory", level: "High" },
        { title: "Grid integration bottlenecks for remote solar fields", category: "Infrastructure", level: "Moderate" }
      ],
      whyItMatters: {
        title: "Green Hydrogen Tariff Arbitrage Shifts Export Routes",
        explanation: "Bilateral wind agreements make coastal production routes 18% cheaper than inland pipelines, routing trade directly through maritime hubs.",
        affected: ["Hydrogen Project Sponsors", "Maritime Shipping Lines", "Utility Firms"],
        watch: "EU import carbon pricing updates in October"
      },
      companies: [
        { name: "SunGrid Solar", country: "India", desc: "Deploying 12GW solar farm grids across Western desert states." },
        { name: "Rotterdam Marine Energy", country: "Netherlands", desc: "Setting up clean liquefied hydrogen off-take terminals." }
      ],
      leaders: [
        { name: "Vikram Sengupta", designation: "Energy Policy Advisor", company: "Ministry of MNRE", country: "India" },
        { name: "Elena Weber", designation: "Director of Clean Fuel logistics", company: "Rotterdam Ports Alliance", country: "Netherlands" }
      ],
      forecast: {
        c2026: "$85B",
        c2027: "$115B",
        c2028: "$160B",
        c2030: "$225B",
        assumptions: ["Sustained global hydrogen subsidy structures", "Solar panel import tariffs remain below 20%"],
        limitations: "Subject to grid inter-connector construction milestones."
      },
      reports: [
        { title: "India Green Hydrogen Maritime Export Corridors 2026", price: "$199", code: "REP-HYD-17", isPremium: true },
        { title: "Solar Photovoltaic Grid Interconnection Report", price: "Free", code: "REP-SOL-FREE", isPremium: false }
      ],
      timeline: [
        { date: "FEB 2026", title: "Maritime terminal deal", desc: "Initial agreement signed for green ammonia bunkering channels." },
        { date: "MAY 2026", title: "Offshore Wind auction", desc: "MNRE sanctions 4.5GW offshore solar-wind hybrid grid tenders." }
      ],
      marketIndicators: [
        { label: "Electrolyzer Efficiency", value: "78.4%", desc: "New catalyst technologies boost gas output." },
        { label: "LCOH Tariff Average", value: "$4.12 / kg", desc: "Competitive export corridor pricing reached." }
      ],
      trends: [
        { label: "EMERGING TREND", val: "Cooperative green energy bidding", tech: "Financing Model" },
        { label: "GROWING TREND", val: "Offshore wind electrolysis", tech: "Electrolyzer Design" }
      ],
      articles: [
        { id: "ind-feed-2", title: "Green Hydrogen Marine Corridors: €2.4B Interconnectivity Pipeline Approved with EU Ports", excerpt: "Bilateral energy agreements secure offshore solar-wind grid interconnectivity to supply liquefied clean hydrogen to Rotterdam and Hamburg terminals.", date: "35m ago", readTime: "6 min read", category: "INVESTMENT", source: "Ministry of New & Renewable Energy" },
        { id: "tick-2", title: "Cabinet sanctions €2.4B green hydrogen marine bunkering pipeline for Western ports", excerpt: "Special economic grid incentives enable localized production units to supply international vessels.", date: "2 hrs ago", readTime: "4 min read", category: "POLICY", source: "Ministry of MNRE" }
      ]
    }
  };

  const DEFAULT_INDUSTRY_DATA = {
    marketDirection: "Growing",
    investmentActivity: "Medium",
    tradeActivity: "Stable",
    techAdoption: "Steady",
    riskLevel: "Moderate",
    outlook: "Positive",
    indicators: {
      cagr: "+11.4%",
      capex: "$42.5B",
      exportGrowth: "+6.2%",
      demandIndex: "85.0 / 100",
      employmentIndex: "+3.1%",
      capacityUtilization: "82.0%"
    },
    opportunities: [
      { title: "Standardized regional compliance templates", category: "Regulatory Alignment" },
      { title: "Local manufacturing sourcing integrations", category: "Supply Chain" }
    ],
    risks: [
      { title: "High raw material price volatility", category: "Market Volatility", level: "High" },
      { title: "Increasing compliance costs for carbon accounting", category: "Regulatory", level: "Moderate" }
    ],
    whyItMatters: {
      title: "Global Supply Corridors Require Regional Adapters",
      explanation: "Cross-border trade frameworks demand local manufacturing clusters to deploy interoperable standards, or face 12% border tax penalties.",
      affected: ["Supply Chain Directors", "Corporate Compliance Officers"],
      watch: "Unified standard releases in Q4"
    },
    companies: [
      { name: "Global Industries Ltd", country: "India", desc: "Managing national logistics hubs and multi-modal transit points." }
    ],
    leaders: [
      { name: "Dr. Ramesh Nair", designation: "Sourcing Director", company: "Global Industries Ltd", country: "India" }
    ],
    forecast: {
      c2026: "$48B",
      c2027: "$62B",
      c2028: "$78B",
      c2030: "$114B",
      assumptions: ["Bilateral trade tariffs stabilize", "Carbon tax credits are implemented cleanly"],
      limitations: "Projections do not account for extreme meteorological disruptions."
    },
    reports: [
      { title: "B2B Industry Trade Digest Q1 (Summary)", price: "Free", code: "REP-DIG-FREE", isPremium: false }
    ],
    timeline: [
      { date: "MAR 2026", title: "Standard guidelines drafted", desc: "First cross-border working group aligns on container manifest parameters." }
    ],
    marketIndicators: [
      { label: "Sourcing Index", value: "+4.1% QoQ", desc: "Procurement velocities steady across key manufacturing zones." }
    ],
    trends: [
      { label: "EMERGING TREND", val: "Automation", tech: "AI Optimization" }
    ],
    articles: [
      { id: "s-1", title: "Global Supply Chain Rebalancing: India-Europe Corridors Expand", excerpt: "Strategic cargo agreements between shipping lines open faster trade routes bypass Suez disruption bottlenecks, boosting export volumes.", date: "2 hrs ago", readTime: "4 min read", category: "TRADE", source: "Maritime Council" }
    ]
  };

  const getIndustryData = (name: string) => {
    return II_INDUSTRY_DB[name] || DEFAULT_INDUSTRY_DATA;
  };

  const iiData = getIndustryData(iiSelectedIndustry);

  const handleSectorChange = (sector: string) => {
    setIiSelectedSector(sector);
    const industries = II_SECTORS_MAP[sector] || [];
    if (industries.length > 0) {
      setIiSelectedIndustry(industries[0]);
    }
  };

  const handleVote = (id: number) => {
    setIiAskedQuestions(prev => prev.map(q => {
      if (q.id === id) {
        return { ...q, votes: q.votes + (q.voted ? -1 : 1), voted: !q.voted };
      }
      return q;
    }));
  };

  const handleAddQuestion = () => {
    if (!iiAskInput.trim()) return;
    setIiAskedQuestions(prev => [
      ...prev,
      { id: Date.now(), question: iiAskInput.trim(), votes: 1, voted: true }
    ]);
    setIiAskInput("");
  };

  if (isIntelligenceActive) {
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-20 transition-colors duration-300">
        
        {/* Top Navigation Switcher */}
        <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (onBack) onBack();
                  else router.push("/en/news-poc/feed/industry");
                }}
                className="p-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:text-blue-600 transition-colors shadow-xs"
                aria-label="Go back"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-650 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900/40">
                    Sector News
                  </span>
                  <span className="text-gray-400 text-xs">/</span>
                  <span className="text-xs font-semibold text-gray-500">
                    Industry Intelligence
                  </span>
                </div>
                <h1 className="font-display text-xl md:text-2xl font-bold leading-tight mt-1 text-gray-900 dark:text-white">
                  Industry Intelligence & Analysis Hub
                </h1>
              </div>
            </div>

            {/* Sub-menu Switcher */}
            <div className="flex items-center gap-1.5 bg-white dark:bg-gray-950 p-1 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs">
              <button
                onClick={() => router.push("/en/news-poc/feed/industry")}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                My Industry
              </button>
              <button
                onClick={() => router.push("/en/news-poc/feed/industry/all")}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                All Industry
              </button>
              <button
                onClick={() => router.push("/en/news-poc/sector-news/industry")}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white shadow-xs flex items-center gap-1"
              >
                <span>Industry Intelligence</span>
                <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </section>

        {/* ── 01. INDUSTRY INTELLIGENCE HERO ── */}
        <section className="bg-gradient-to-br from-amber-600 to-orange-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:px-6 space-y-6">
            <div className="max-w-3xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-amber-200 bg-amber-950/80 border border-amber-800 px-2.5 py-0.5 rounded-full">
                  INDUSTRY INTELLIGENCE
                </span>
                <span className="text-[10px] text-amber-100">Verified Strategic Decision Support</span>
              </div>
              <h1 className="font-display text-2xl md:text-4xl font-bold tracking-tight">
                Understand the Trends, Opportunities & Risks Shaping Industries
              </h1>
              <p className="text-sm md:text-base text-amber-50 leading-relaxed font-normal">
                Get a deeper view of industry developments, market trends, business activity, trade, investment, companies, leaders and future outlook.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button 
                onClick={() => {
                  const el = document.getElementById("ii-main-grid");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white text-amber-950 hover:bg-amber-50 font-bold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-xs"
              >
                Explore Industry Intelligence →
              </button>
              <Link 
                href="/eoi"
                className="bg-amber-800/85 hover:bg-amber-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl border border-amber-700/60 transition-colors shadow-xs"
              >
                View Intelligence Reports →
              </Link>
            </div>

            {/* Quick Hero Search */}
            <div className="relative max-w-2xl pt-2">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-300" />
              <input
                value={iiSearchQuery}
                onChange={(e) => {
                  setIiSearchQuery(e.target.value);
                  // Match industry immediately if they type it fully
                  const matchedInd = Object.keys(II_INDUSTRY_DB).find(
                    ind => ind.toLowerCase() === e.target.value.trim().toLowerCase()
                  );
                  if (matchedInd) {
                    setIiSelectedIndustry(matchedInd);
                    // Match sector
                    const sectorKey = Object.keys(II_SECTORS_MAP).find(sec => 
                      II_SECTORS_MAP[sec].includes(matchedInd)
                    );
                    if (sectorKey) setIiSelectedSector(sectorKey);
                  }
                }}
                placeholder="Search industries... (e.g. Semiconductors, Renewable Energy)"
                className="w-full rounded-xl bg-white/10 border border-white/20 py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-amber-200 outline-none focus:ring-2 focus:ring-amber-400 backdrop-blur-xs"
              />
            </div>
          </div>
        </section>

        {/* ── 02. INDUSTRY SELECTOR ── */}
        <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
          <Card className="p-4 space-y-3">
            <span className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-amber-600" /> Set Context Industry
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-400">Select Sector</label>
                <select
                  value={iiSelectedSector}
                  onChange={(e) => handleSectorChange(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2.5 text-xs font-bold outline-none"
                >
                  {Object.keys(II_SECTORS_MAP).map(sec => (
                    <option key={sec} value={sec}>{sec}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-400">Select Industry</label>
                <select
                  value={iiSelectedIndustry}
                  onChange={(e) => setIiSelectedIndustry(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2.5 text-xs font-bold outline-none"
                >
                  {(II_SECTORS_MAP[iiSelectedSector] || []).map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  const el = document.getElementById("ii-snapshot");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-2.5 rounded-lg shadow-xs transition-colors"
              >
                View Intelligence
              </button>
            </div>
          </Card>
        </section>

        {/* ── 03. INDUSTRY SNAPSHOT ── */}
        <section id="ii-snapshot" className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
          <Card className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 dark:border-gray-800 pb-5">
              <div>
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-0.5 rounded border border-amber-200 dark:border-amber-900/40">
                  {iiSelectedIndustry.toUpperCase()} TELEMETRY
                </span>
                <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white mt-1.5">
                  {iiSelectedIndustry} Industry Snapshot
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2.5 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col min-w-[110px]">
                  <span className="text-[9px] font-bold uppercase text-gray-400 tracking-wider">Market Direction</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                    {iiData.marketDirection} ▲
                  </span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2.5 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col min-w-[110px]">
                  <span className="text-[9px] font-bold uppercase text-gray-400 tracking-wider">Investment</span>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                    {iiData.investmentActivity}
                  </span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2.5 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col min-w-[110px]">
                  <span className="text-[9px] font-bold uppercase text-gray-400 tracking-wider">Tech Adoption</span>
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400 mt-0.5">
                    {iiData.techAdoption}
                  </span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2.5 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col min-w-[110px]">
                  <span className="text-[9px] font-bold uppercase text-gray-400 tracking-wider">Risk Level</span>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                    {iiData.riskLevel}
                  </span>
                </div>
              </div>
            </div>

            {/* ── 04. KEY INDUSTRY INDICATORS ── */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: "CAGR (2025-2030)", value: iiData.indicators.cagr, color: "bg-emerald-500" },
                { label: "Capital Expenditure", value: iiData.indicators.capex, color: "bg-blue-500" },
                { label: "Export Growth", value: iiData.indicators.exportGrowth, color: "bg-emerald-500" },
                { label: "Global Demand Index", value: iiData.indicators.demandIndex, color: "bg-purple-500" },
                { label: "Employment Index", value: iiData.indicators.employmentIndex, color: "bg-blue-500" },
                { label: "Capacity Utilization", value: iiData.indicators.capacityUtilization, color: "bg-amber-500" }
              ].map((ind, idx) => (
                <div key={idx} className="p-3.5 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-2">
                  <span className="text-[10px] font-bold text-gray-400 block leading-tight">{ind.label}</span>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{ind.value}</div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                    <div className={`${ind.color} h-1.5 rounded-full`} style={{ width: "75%" }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* ── MAIN TWIN COLUMN LAYOUT ── */}
        <section id="ii-main-grid" className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
          <div className="grid grid-cols-12 gap-8">
            
            {/* LEFT 8-COLUMN MAIN STREAM */}
            <div className="col-span-12 lg:col-span-8 space-y-8">
              
              {/* ── 05. LATEST & BREAKING INTELLIGENCE ── */}
              <div className="space-y-4">
                <SectionTitle 
                  title="Latest & Breaking Intelligence" 
                  action={
                    <span className="text-[9px] font-mono text-gray-450 bg-gray-105 dark:bg-gray-900 px-2 py-0.5 rounded">
                      Real-time Feed
                    </span>
                  }
                />
                <div className="space-y-3">
                  {iiData.articles.map((art) => (
                    <Card key={art.id} className="p-5 hover:border-amber-500 transition-all flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 space-y-2.5">
                        <div className="flex justify-between items-start flex-wrap gap-2 text-[10px]">
                          <span className="font-mono font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/20 px-2 py-0.5 rounded">
                            {art.category}
                          </span>
                          <span className="text-gray-400">{art.date}</span>
                        </div>
                        <h4 className="text-sm md:text-base font-bold text-gray-900 dark:text-white leading-snug">
                          {art.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                          {art.excerpt}
                        </p>
                        <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs gap-3">
                          <span className="text-gray-400 text-[10px] font-medium">Source: {art.source}</span>
                          <Link href="/eoi" className="text-amber-600 hover:text-amber-700 font-bold flex items-center gap-0.5">
                            Read Intelligence ({art.readTime}) →
                          </Link>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* ── 06. TOP INDUSTRY STORIES ── */}
              <div className="space-y-4">
                <SectionTitle title="Top Stories Shaping the Industry" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "Union Budget: Technology Infrastructure gets $12B Allocation Booster", cat: "POLICY", excerpt: "Strategic software developments and infrastructure grants secure stable paths for hardware hubs." },
                    { title: "Freight Corridors Standard Swap Specifications Approved by Panel", cat: "MARKET", excerpt: "Unified swapping specifications reduce capital entry costs by 22% for logistics fleets." }
                  ].map((st, i) => (
                    <Card key={i} className="p-4 space-y-3 flex flex-col justify-between hover:border-amber-500 transition-all">
                      <div className="space-y-1.5">
                        <span className="text-[8px] font-bold bg-amber-50 dark:bg-amber-950/20 text-amber-650 px-2 py-0.5 rounded font-mono">
                          {st.cat}
                        </span>
                        <h4 className="text-xs font-bold text-gray-950 dark:text-white leading-snug">{st.title}</h4>
                        <p className="text-[11px] text-gray-500 leading-relaxed font-normal line-clamp-2">{st.excerpt}</p>
                      </div>
                      <Link href="/eoi" className="text-xs text-amber-600 hover:underline font-bold block pt-2 border-t border-gray-100 dark:border-gray-800">
                        Read Story →
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>

              {/* ── 07. INDUSTRY TRENDS ── */}
              <div className="space-y-4">
                <SectionTitle title="Industry Trends & Momentum" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {iiData.trends.map((tr, idx) => (
                    <Card key={idx} className="p-4 flex flex-col justify-between space-y-2 hover:border-amber-500 transition-all">
                      <div className="space-y-1.5">
                        <span className="text-[8px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-955/20 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                          {tr.label}
                        </span>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">{tr.val}</h4>
                        <span className="text-[10px] text-gray-450 block">Technology: {tr.tech}</span>
                      </div>
                      <Link href="/eoi" className="text-xs text-amber-600 hover:underline font-bold block pt-2 border-t border-gray-100 dark:border-gray-800">
                        Explore Trend →
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT 4-COLUMN SIDEBAR PANEL */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              
              {/* ── 08. MARKET & BUSINESS INDICATORS ── */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2.5">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <BarChart3 className="h-4 w-4 text-amber-600" />
                    Market & Business Indicators
                  </h4>
                  <span className="text-[9px] text-gray-450 font-mono">Telemetry</span>
                </div>
                <div className="space-y-2.5">
                  {iiData.marketIndicators.map((ind, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-gray-400 block">{ind.label}</span>
                        <span className="text-[10.5px] text-gray-600 dark:text-gray-300 leading-snug block mt-0.5">{ind.desc}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-650 shrink-0">{ind.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── 09. & 10. TRADE & INVESTMENT INTELLIGENCE ── */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-4">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="h-4 w-4 text-amber-600" />
                  Trade & Investment Pulse
                </h4>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-150/40 dark:border-gray-850 space-y-1">
                    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">Top Export Target</span>
                    <span className="font-bold text-gray-900 dark:text-white block">Germany</span>
                    <span className="text-[9px] text-gray-400 block">Sustaining +18% supply volume</span>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-150/40 dark:border-gray-850 space-y-1">
                    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">Investment Hotspot</span>
                    <span className="font-bold text-gray-900 dark:text-white block">OSAT Clusters</span>
                    <span className="text-[9px] text-gray-400 block">CAGR +22.4% CapEx expansion</span>
                  </div>
                </div>

                <Link
                  href="/en/news-poc/country-news/intelligence"
                  className="block text-center w-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-300 font-bold text-xs py-2 rounded-xl border border-amber-200 dark:border-amber-900/40 hover:bg-amber-100 transition-colors"
                >
                  Explore Corridors
                </Link>
              </div>

              {/* ── 11. OPPORTUNITIES & RISKS MATRIX ── */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-4">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Target className="h-4 w-4 text-amber-600" />
                  Industry Opportunities & Risks
                </h4>

                <div className="space-y-3 text-xs font-medium">
                  {/* Opportunities */}
                  <div className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30 space-y-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      🚀 Key Opportunities
                    </span>
                    <div className="space-y-1.5 pl-1.5">
                      {iiData.opportunities.map((opp, idx) => (
                        <div key={idx} className="text-[11px] leading-snug">
                          <span className="font-bold text-emerald-600">{opp.category}</span>: {opp.title}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Risks */}
                  <div className="p-3 rounded-2xl bg-red-50/60 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/30 space-y-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-red-700 dark:text-red-400">
                      ⚠️ Key Risks
                    </span>
                    <div className="space-y-1.5 pl-1.5">
                      {iiData.risks.map((risk, idx) => (
                        <div key={idx} className="text-[11px] leading-snug flex items-start gap-1 justify-between">
                          <span>
                            <span className="font-bold text-red-600">{risk.category}</span>: {risk.title}
                          </span>
                          <span className="text-[8px] bg-red-100 text-red-800 font-bold px-1 rounded shrink-0">{risk.level}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── 13. & 14. KEY COMPANIES & LEADERS ── */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2.5">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-amber-600" />
                    Key Companies & Leaders
                  </h4>
                  <span className="text-[9px] text-gray-405 font-mono">B2B Network</span>
                </div>

                {/* Companies */}
                <div className="space-y-2">
                  <span className="text-[9px] text-gray-400 uppercase font-bold block">Relevant Companies</span>
                  {iiData.companies.map((comp, idx) => (
                    <div key={idx} className="p-2.5 bg-gray-50 dark:bg-gray-900 rounded-xl flex items-center justify-between text-xs gap-3">
                      <div>
                        <h5 className="font-bold text-gray-900 dark:text-white">{comp.name}</h5>
                        <span className="text-[9px] text-gray-450">{comp.desc}</span>
                      </div>
                      <Link href="/en/news-poc/company-news" className="text-[9px] font-bold text-blue-600 hover:underline shrink-0">
                        View ➔
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Leaders */}
                <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-[9px] text-gray-400 uppercase font-bold block">Relevant Leaders</span>
                  {iiData.leaders.map((lead, idx) => (
                    <div key={idx} className="p-2.5 bg-gray-50 dark:bg-gray-900 rounded-xl flex items-center justify-between text-xs gap-3">
                      <div>
                        <h5 className="font-bold text-gray-900 dark:text-white">{lead.name}</h5>
                        <span className="text-[9px] text-gray-450">{lead.designation}, {lead.company}</span>
                      </div>
                      <Link href="/en/news-poc/leader-news" className="text-[9px] font-bold text-blue-600 hover:underline shrink-0">
                        View ➔
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── 16. RECOMMENDED INTELLIGENCE REPORTS ── */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2.5">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="h-4 w-4 text-amber-600" />
                    Recommended Reports
                  </h4>
                  <span className="text-[9px] text-gray-400 font-mono">Store</span>
                </div>
                <div className="space-y-2">
                  {iiData.reports.map((rep, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-150/40 dark:border-gray-800 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-bold text-gray-900 dark:text-white block line-clamp-1">{rep.title}</span>
                        <span className="text-[9px] font-mono text-gray-400">{rep.code}</span>
                      </div>
                      <Link href="/eoi" className="bg-purple-600 text-white font-bold text-[9px] px-2.5 py-1.5 rounded-lg shrink-0">
                        {rep.price}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── 17. AI INTELLIGENCE PREVIEW ── */}
              <div className="p-5 bg-gradient-to-br from-slate-950 to-amber-950 text-white rounded-3xl border border-amber-900/60 shadow-md space-y-4">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-amber-400 block font-mono">
                    AI-POWERED PREVIEW
                  </span>
                  <h4 className="text-sm font-bold text-white mt-0.5">
                    AI Industry Intelligence
                  </h4>
                </div>

                <div className="space-y-2 text-xs text-amber-100 font-medium">
                  <div className="flex justify-between items-center py-1 border-b border-amber-900/35">
                    <span className="flex items-center gap-1">🔒 AI Industry Forecasts</span>
                    <span className="text-[9px] text-amber-400 bg-amber-900/60 px-1 rounded">PRO</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-amber-900/35">
                    <span className="flex items-center gap-1">🔒 Geopolitical Scenario Analysis</span>
                    <span className="text-[9px] text-amber-400 bg-amber-900/60 px-1 rounded">PRO</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-amber-900/35">
                    <span className="flex items-center gap-1">🔒 Opportunity & Risk Signals</span>
                    <span className="text-[9px] text-amber-400 bg-amber-900/60 px-1 rounded">PRO</span>
                  </div>
                </div>

                <Link
                  href="/eoi"
                  className="block text-center w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors shadow-xs"
                >
                  Unlock AI Intelligence (Pro)
                </Link>
              </div>

              {/* ── 18. INDUSTRY INTELLIGENCE ALERTS ── */}
              <div className="bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-900/40 rounded-3xl p-5 shadow-xs space-y-3">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Bell className="h-4 w-4 text-amber-600" />
                  Industry News Alerts
                </h4>
                <p className="text-[11px] text-gray-650 dark:text-gray-400 leading-normal">
                  Receive breaking notifications about policy changes, tariff adjustments, and major investments for {iiSelectedIndustry}.
                </p>
                <button
                  onClick={() => setIiAlertsConfigured(!iiAlertsConfigured)}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all shadow-xs ${
                    iiAlertsConfigured
                      ? "bg-amber-600 text-white animate-fade-in"
                      : "bg-amber-50 dark:bg-amber-900/40 text-amber-600 border border-amber-200 dark:border-gray-800 hover:bg-amber-100"
                  }`}
                >
                  {iiAlertsConfigured ? "Alerts Enabled ✓" : "Enable Alerts"}
                </button>
              </div>

              {/* ── 22. SPONSORED INTELLIGENCE ── */}
              <div className="bg-amber-50/10 dark:bg-amber-950/5 border border-amber-200 dark:border-amber-900/30 p-5 rounded-3xl shadow-xs space-y-2">
                <span className="text-[8px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded font-mono">
                  Sponsored Industry Insight
                </span>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white pt-1">
                  Automating Customs manifesting APIs for high-volume trade channels
                </h4>
                <p className="text-[11px] text-gray-500 leading-relaxed font-normal">
                  How next-gen supply chains cut shipping delays by 34% using unified ledger protocols.
                </p>
                <Link href="/eoi" className="text-xs font-bold text-blue-600 hover:underline">
                  Explore Case Study →
                </Link>
              </div>

              {/* ── 21. NEWSLETTER BRIEFING ── */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-3">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="h-4 w-4 text-amber-600" />
                  Industry Intelligence Briefing
                </h4>
                <p className="text-[11px] text-gray-500">
                  Weekly high-frequency digests, trade policies, investment signals and forecasts delivered.
                </p>
                {iiNewsletterSubscribed ? (
                  <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-xl text-center">
                    ✓ Subscribed successfully!
                  </div>
                ) : (
                  <div className="space-y-2">
                    <input
                      value={iiNewsletterEmail}
                      onChange={(e) => setIiNewsletterEmail(e.target.value)}
                      placeholder="work@corporation.com"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs outline-none focus:border-amber-500"
                    />
                    <button
                      onClick={() => {
                        if (iiNewsletterEmail) setIiNewsletterSubscribed(true);
                      }}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-2 rounded-xl transition-colors shadow-xs"
                    >
                      Subscribe
                    </button>
                  </div>
                )}
              </div>

            </div>

          </div>
        </section>

        {/* ── 20. INDUSTRY TIMELINE ── */}
        <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
          <div className="bg-white dark:bg-[#0f172a] rounded-3xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 shadow-xs space-y-6">
            <div>
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                CHRONOLOGY
              </span>
              <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white mt-1">
                {iiSelectedIndustry} Development Timeline
              </h3>
            </div>

            <div className="relative pl-6 border-l border-gray-200 dark:border-gray-800 space-y-6">
              {iiData.timeline.map((time, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-amber-600 border-2 border-white dark:border-[#0f172a]" />
                  <span className="text-[9px] font-mono font-bold text-amber-600 dark:text-amber-400 block">{time.date}</span>
                  <h4 className="text-xs font-bold text-gray-950 dark:text-white mt-0.5">{time.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed mt-0.5 font-normal">{time.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 23. PRO / ENTERPRISE CTA ── */}
        <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
          <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-[#0f172a] to-amber-950 text-white p-8 md:p-12 border border-slate-800 text-center space-y-4 shadow-md">
            <span className="bg-amber-600 text-white text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full inline-block">
              ENTERPRISE INTELLIGENCE
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-bold max-w-2xl mx-auto leading-tight text-white">
              Don't Just Read the Industry. Understand It.
            </h2>
            <p className="text-xs md:text-sm text-amber-100 max-w-xl mx-auto leading-relaxed font-normal">
              Stay ahead of policy changes, tariff adjustments, and cross-border supply chain movements with verified real-time industry intelligence.
            </p>
            <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/signup"
                className="bg-white text-gray-950 hover:bg-gray-100 font-bold text-xs px-6 py-3 rounded-xl transition-colors shadow-sm"
              >
                Start Free Discovery
              </Link>
              <Link
                href="/eoi"
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors shadow-sm"
              >
                Explore Premium Intelligence →
              </Link>
            </div>
          </div>
        </section>

      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-20 transition-colors duration-300">
      
      {/* Top Breadcrumb & Page Sub-Header */}
      <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (onBack) onBack();
                else router.push("/en/news-poc/feed/industry");
              }}
              className="p-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:text-blue-600 transition-colors shadow-xs"
              aria-label="Go back"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900/40">
                  {isIntelligenceActive ? "Sector News" : "Feed Sub-Module"}
                </span>
                <span className="text-gray-400 text-xs">/</span>
                <span className="text-xs font-semibold text-gray-500">
                  {isIntelligenceActive ? "Industry Intelligence" : "Industry Feed"}
                </span>
              </div>
              <h1 className="font-display text-xl md:text-2xl font-bold leading-tight mt-1 text-gray-900 dark:text-white">
                {isIntelligenceActive ? "Industry Intelligence & Analysis Hub" : "All Industry Discovery Hub"}
              </h1>
            </div>
          </div>

          {/* Sub-menu switcher (My Industry | All Industry | Industry Intelligence) */}
          <div className="flex items-center gap-1.5 bg-white dark:bg-gray-950 p-1 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs">
            <button
              onClick={() => router.push("/en/news-poc/feed/industry")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isMyActive
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
              }`}
            >
              My Industry
            </button>
            <button
              onClick={() => router.push("/en/news-poc/feed/industry/all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isAllActive
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
              }`}
            >
              All Industry
            </button>
            <button
              onClick={() => router.push("/en/news-poc/sector-news/industry")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                isIntelligenceActive
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
              }`}
            >
              <span>Industry Intelligence</span>
              <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 1 — HERO: GLOBAL INDUSTRY PULSE */}
      <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
        <div className="grid grid-cols-12 gap-6">
          
          {/* Main Hero Card (8 Cols) */}
          <div className="col-span-12 lg:col-span-8 relative rounded-3xl overflow-hidden bg-slate-950 text-white min-h-[380px] flex flex-col justify-end p-8 border border-slate-900 shadow-sm group">
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center opacity-40 group-hover:scale-103 transition-transform duration-700"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80')` }}
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            
            <div className="relative z-10 space-y-3.5 max-w-2xl">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="bg-red-600 text-white text-[9px] font-mono font-bold uppercase px-2.5 py-0.5 rounded tracking-wider shadow-xs animate-pulse">
                  GLOBAL INDUSTRY PULSE
                </span>
                <span className="bg-white/20 text-white text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                  Semiconductors & OSAT
                </span>
                <span className="text-[10px] text-slate-300 font-medium flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Updated 10m ago · 5 min read
                </span>
              </div>

              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white drop-shadow-xs">
                Semiconductor OSAT Substrate Scaling Accelerates Across Southern Industrial Corridors
              </h2>

              <p className="text-slate-300 text-xs md:text-sm leading-relaxed line-clamp-2">
                High-density glass packaging facilities reach pilot commercial run milestones, reducing dependence on East Asian test houses by 35% in Q1.
              </p>

              <div className="pt-2 flex items-center gap-3">
                <Link 
                  href="/en/news-poc/article/ind-feed-1"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5"
                >
                  <span>Read Full Story</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/en/news-poc/sector-news/industry"
                  className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2.5 rounded-xl backdrop-blur-xs transition-colors"
                >
                  View Industry Intelligence →
                </Link>
              </div>
            </div>
          </div>

          {/* Secondary Featured Stories Column (4 Cols) */}
          <div className="col-span-12 lg:col-span-4 flex flex-col justify-between gap-4">
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="h-3.5 w-3.5 text-orange-500" /> Featured Industry Signals
                </span>
                <span className="text-[9px] font-bold text-emerald-500">Live</span>
              </div>

              {[
                {
                  id: "ind-feed-2",
                  ind: "Renewable Energy",
                  title: "Green Hydrogen: €2.4B Interconnectivity Pipeline with EU Ports",
                  time: "35m ago",
                  metric: "+24% CapEx"
                },
                {
                  id: "ind-feed-3",
                  ind: "Automotive & EV",
                  title: "Heavy EV Battery Interoperability Protocol Adopted for 80 Corridors",
                  time: "2h ago",
                  metric: "-45% Downtime"
                },
                {
                  id: "ind-feed-4",
                  ind: "Pharma & Biotech",
                  title: "Domestic Fermentation Synthesizes 68% of Essential Bulk Drugs",
                  time: "4h ago",
                  metric: "68% Domestic"
                }
              ].map((item, idx) => (
                <Link
                  key={idx}
                  href={`/en/news-poc/article/${item.id}`}
                  className="block p-3 rounded-2xl bg-gray-50 dark:bg-gray-900/60 hover:bg-blue-50/50 dark:hover:bg-gray-900 transition-all border border-gray-150/40 dark:border-gray-800 space-y-1.5 group"
                >
                  <div className="flex items-center justify-between text-[9px]">
                    <span className="font-bold text-blue-600 dark:text-blue-400">{item.ind}</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{item.metric}</span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-gray-400 block">{item.time}</span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2 — INDUSTRY NAVIGATION BAR */}
      <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6 sticky top-0 z-20 bg-gray-50/95 dark:bg-[#070b12]/95 backdrop-blur-md pb-2">
        <div className="bg-white dark:bg-[#0f172a] p-3 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs flex items-center justify-between gap-4">
          
          {/* Horizontal Scrollable Industry Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs flex-1">
            {INDUSTRIES.map((ind) => {
              const isSelected = selectedIndustry === ind.name;
              return (
                <button
                  key={ind.name}
                  onClick={() => {
                    setSelectedIndustry(ind.name);
                    setSelectedTopic(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-200/70"
                  }`}
                >
                  <span>{ind.name}</span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-white/20 text-white" : "bg-gray-200 dark:bg-gray-800 text-gray-500"
                  }`}>
                    {ind.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative w-48 sm:w-60 shrink-0 hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search industries..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </section>

      {/* SECTION 3 — BREAKING / LATEST INDUSTRY NEWS TICKER */}
      <section className="mx-auto max-w-7xl px-4 pt-4 lg:px-6">
        <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-200 dark:border-gray-800 p-4 shadow-xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                Industry Wire
              </span>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-900 p-1 rounded-xl text-[11px] font-bold">
              {(["Breaking", "Latest", "Most Read", "Most Discussed"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    activeTab === tab 
                      ? "bg-white dark:bg-gray-800 text-blue-600 shadow-xs" 
                      : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Ticker Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {TICKER_STORIES[activeTab]?.map((item, idx) => (
              <Link
                key={idx}
                href={`/en/news-poc/article/${item.id}`}
                className="p-3 rounded-xl bg-gray-50/70 dark:bg-gray-900/40 hover:bg-blue-50/60 dark:hover:bg-gray-900 border border-gray-150/40 dark:border-gray-800/80 transition-all flex flex-col justify-between space-y-2 group"
              >
                <div className="flex items-center justify-between text-[9px]">
                  <span className="font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-900/30">
                    {item.industry}
                  </span>
                  <span className="text-gray-400">{item.time}</span>
                </div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                  {item.title}
                </h4>
                <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-gray-100 dark:border-gray-800">
                  <span>{item.source}</span>
                  <span className="font-semibold text-blue-500 group-hover:underline">{item.readTime} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2.5 — INDUSTRY SNAPSHOT, INDICATORS & ALERTS */}
      {isIntelligenceActive && (
        <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
          <div className="bg-white dark:bg-[#0f172a] rounded-3xl border border-gray-200 dark:border-gray-800 p-6 shadow-xs space-y-6">
            
            {/* Industry Snapshot */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 dark:border-gray-800 pb-6">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900/40">
                  Telemetry & Snapshot
                </span>
                <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white mt-1">
                  Global {selectedIndustry === "All" ? "Sectors & Tech" : selectedIndustry} Industry Pulse
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-gray-50 dark:bg-gray-900 px-3.5 py-2 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col min-w-[100px]">
                  <span className="text-[9px] font-bold uppercase text-gray-400 tracking-wider">Market Direction</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                    Growing <span className="text-[10px]">▲</span>
                  </span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 px-3.5 py-2 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col min-w-[100px]">
                  <span className="text-[9px] font-bold uppercase text-gray-400 tracking-wider">Investment Activity</span>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 mt-0.5">
                    High
                  </span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 px-3.5 py-2 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col min-w-[100px]">
                  <span className="text-[9px] font-bold uppercase text-gray-400 tracking-wider">Tech Adoption</span>
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1 mt-0.5">
                    Rapid
                  </span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 px-3.5 py-2 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col min-w-[100px]">
                  <span className="text-[9px] font-bold uppercase text-gray-400 tracking-wider">Risk Level</span>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 mt-0.5">
                    Moderate
                  </span>
                </div>
              </div>
            </div>

            {/* Key Industry Indicators Dashboard */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-2">
                <span className="text-[10px] font-bold text-gray-500 block">CAGR (2025-2030)</span>
                <div className="text-lg font-bold text-gray-900 dark:text-white">+14.2%</div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: "85%" }} />
                </div>
              </div>

              <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-2">
                <span className="text-[10px] font-bold text-gray-500 block">Capital Expenditure</span>
                <div className="text-lg font-bold text-gray-900 dark:text-white">$84.6B</div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "70%" }} />
                </div>
              </div>

              <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-2">
                <span className="text-[10px] font-bold text-gray-500 block">Export Growth</span>
                <div className="text-lg font-bold text-gray-900 dark:text-white">+8.7%</div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: "60%" }} />
                </div>
              </div>

              <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-2">
                <span className="text-[10px] font-bold text-gray-500 block">Global Demand Index</span>
                <div className="text-lg font-bold text-gray-900 dark:text-white">92.4 <span className="text-xs text-gray-400">/ 100</span></div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: "92%" }} />
                </div>
              </div>

              <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-2">
                <span className="text-[10px] font-bold text-gray-500 block">Employment Index</span>
                <div className="text-lg font-bold text-gray-900 dark:text-white">+4.2%</div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "45%" }} />
                </div>
              </div>

              <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-2">
                <span className="text-[10px] font-bold text-gray-500 block">Capacity Utilization</span>
                <div className="text-lg font-bold text-gray-900 dark:text-white">88.5%</div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: "88%" }} />
                </div>
              </div>
            </div>

            {/* Subscriptions & Realtime Alerts Tracker */}
            <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                    Receive Alerts for {selectedIndustry === "All" ? "All Industry Sectors" : selectedIndustry}
                  </h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    We will notify you of any policy updates, market movements, trade barriers, or forecast changes.
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleFollowIndustry(selectedIndustry === "All" ? "General Tech" : selectedIndustry)}
                className={`text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs ${
                  followedIndustries.includes(selectedIndustry === "All" ? "General Tech" : selectedIndustry)
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {followedIndustries.includes(selectedIndustry === "All" ? "General Tech" : selectedIndustry)
                  ? "✓ Alerts Configured"
                  : "Subscribe to Alerts"}
              </button>
            </div>

          </div>
        </section>
      )}

      {/* MAIN TWO-COLUMN CONTAINER (Left: Content Stream / Right: Signals, Reports & Monetization) */}
      <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
        <div className="grid grid-cols-12 gap-8">
          
          {/* LEFT 8-COLUMN DISCOVERY STREAM */}
          <div className="col-span-12 lg:col-span-8 space-y-10">

            {/* SECTION 10 — MAIN INDUSTRY NEWS FEED (PLACED AT TOP) */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 dark:border-gray-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                      Main Industry News Feed
                    </h3>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                      Live Stream
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">Real-time dispatches from verified corporate, ministerial, and corridor sources.</p>
                </div>

                {/* Filter Controls: Latest vs Trending */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-900 p-1 rounded-xl border border-gray-200 dark:border-gray-800">
                    <button
                      onClick={() => setFeedSortFilter("latest")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        feedSortFilter === "latest"
                          ? "bg-blue-600 text-white shadow-xs"
                          : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      }`}
                    >
                      <Clock className="h-3.5 w-3.5" />
                      <span>Latest</span>
                    </button>
                    <button
                      onClick={() => setFeedSortFilter("trending")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        feedSortFilter === "trending"
                          ? "bg-blue-600 text-white shadow-xs"
                          : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      }`}
                    >
                      <Flame className="h-3.5 w-3.5" />
                      <span>Trending</span>
                    </button>
                  </div>
                  <span className="text-xs font-semibold text-gray-400 hidden sm:inline">
                    {filteredArticles.length} Stories
                  </span>
                </div>
              </div>

              {/* Feed Cards */}
              <div className="space-y-6">
                {filteredArticles.slice(0, visibleCount).map((art) => {
                  const isLiked = likedArticles.includes(art.id);
                  const isSaved = savedArticles.includes(art.id);
                  const isShared = sharedArticleId === art.id;
                  const isCommentOpen = openCommentId === art.id;
                  const isFollowed = followedIndustries.includes(art.industry);
                  const comments = articleComments[art.id] || [];

                  return (
                    <div
                      key={art.id}
                      className="bg-white dark:bg-[#0f172a] rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-xs hover:border-blue-400 dark:hover:border-blue-500/50 transition-all flex flex-col md:flex-row group"
                    >
                      {/* Image */}
                      <div className="md:w-72 md:shrink-0 relative overflow-hidden bg-slate-900 min-h-[220px] md:min-h-full">
                        <img 
                          src={art.image} 
                          alt={art.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 bg-black/75 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded">
                          {art.code}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2.5">
                          {/* Tags & Follow Button */}
                          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2.5 py-0.5 rounded-lg border border-blue-200 dark:border-blue-900/40">
                                {art.industry}
                              </span>
                              <span className="text-gray-400 text-[10px]">·</span>
                              <span className="text-[10px] text-gray-500 font-medium">{art.country}</span>
                            </div>
                            
                            <button
                              onClick={() => handleFollowIndustry(art.industry)}
                              className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                                isFollowed
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-600"
                              }`}
                            >
                              <span>{isFollowed ? "Following" : "+ Follow"}</span>
                            </button>
                          </div>

                          {/* Headline */}
                          <Link href={`/en/news-poc/article/${art.id}`}>
                            <h3 className="font-display text-base md:text-lg font-bold text-gray-950 dark:text-white group-hover:text-blue-600 transition-colors leading-snug">
                              {art.title}
                            </h3>
                          </Link>

                          {/* Excerpt */}
                          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                            {art.excerpt}
                          </p>

                          {/* Impact Metrics & Source */}
                          <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-gray-400 font-medium">
                            <span className="text-gray-700 dark:text-gray-300 font-semibold">{art.source}</span>
                            <span>·</span>
                            <span>{art.author}</span>
                            <span>·</span>
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {art.date}</span>
                            <span>·</span>
                            <span>{art.readTime}</span>
                            <span className="ml-auto font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                              {art.impact}
                            </span>
                          </div>
                        </div>

                        {/* Interactive Actions Footer */}
                        <div className="pt-3 border-t border-gray-100 dark:border-gray-850 flex flex-wrap items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2 flex-wrap">
                            
                            {/* Like */}
                            <button
                              onClick={() => handleLike(art.id)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                                isLiked
                                  ? "border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/30 text-red-600 font-bold"
                                  : "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-red-500"
                              }`}
                            >
                              <Heart className={`h-3.5 w-3.5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                              <span>{art.likes + (isLiked ? 1 : 0)}</span>
                            </button>

                            {/* Comment */}
                            <button
                              onClick={() => setOpenCommentId(isCommentOpen ? null : art.id)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                                isCommentOpen
                                  ? "border-blue-200 dark:border-blue-900/40 bg-blue-50 dark:bg-blue-950/30 text-blue-600 font-bold"
                                  : "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-blue-600"
                              }`}
                            >
                              <MessageSquare className="h-3.5 w-3.5" />
                              <span>{art.comments + comments.length}</span>
                            </button>

                            {/* Save */}
                            <button
                              onClick={() => handleSave(art.id)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                                isSaved
                                  ? "border-purple-200 dark:border-purple-900/40 bg-purple-50 dark:bg-purple-950/30 text-purple-600 font-bold"
                                  : "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-purple-600"
                              }`}
                            >
                              <Bookmark className={`h-3.5 w-3.5 ${isSaved ? "fill-purple-600 text-purple-600" : ""}`} />
                              <span>{isSaved ? "Saved" : "Save"}</span>
                            </button>

                            {/* Share */}
                            <button
                              onClick={() => handleShare(art.id)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all relative ${
                                isShared
                                  ? "border-emerald-200 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 font-bold"
                                  : "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-emerald-600"
                              }`}
                            >
                              <Share2 className="h-3.5 w-3.5" />
                              <span>{isShared ? "Link Copied!" : "Share"}</span>
                            </button>
                          </div>

                          {/* Read Story */}
                          <Link
                            href={`/en/news-poc/article/${art.id}`}
                            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 ml-auto"
                          >
                            Read Full Story <ChevronRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>

                        {/* Inline Comments Expansion Drawer */}
                        {isCommentOpen && (
                          <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-3 bg-gray-50/70 dark:bg-gray-900/40 -mx-6 -mb-6 p-6 rounded-b-3xl">
                            <h4 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                              <MessageSquare className="h-3.5 w-3.5 text-blue-500" />
                              Industry Comments & Notes ({art.comments + comments.length})
                            </h4>

                            <div className="space-y-2 max-h-40 overflow-y-auto">
                              {comments.length === 0 ? (
                                <p className="text-[11px] text-gray-400 italic">No comments yet. Share your industry perspective below!</p>
                              ) : (
                                comments.map((c, cIdx) => (
                                  <div key={cIdx} className="bg-white dark:bg-[#0f172a] p-2.5 rounded-xl border border-gray-100 dark:border-gray-800 text-xs">
                                    <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1">
                                      <span className="font-bold text-gray-700 dark:text-gray-300">{c.author}</span>
                                      <span>{c.time}</span>
                                    </div>
                                    <p className="text-gray-800 dark:text-gray-200">{c.text}</p>
                                  </div>
                                ))
                              )}
                            </div>

                            <div className="flex items-center gap-2 pt-1">
                              <input
                                type="text"
                                value={commentInput}
                                onChange={(e) => setCommentInput(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") handleAddComment(art.id);
                                }}
                                placeholder="Add your perspective..."
                                className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0f172a] px-3.5 py-2 text-xs outline-none focus:border-blue-500"
                              />
                              <button
                                onClick={() => handleAddComment(art.id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs"
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

              {/* Dynamic Load More / Pagination & End of Feed Component */}
              <div className="text-center pt-6 space-y-4">
                {visibleCount < filteredArticles.length ? (
                  <button 
                    onClick={() => {
                      setIsLoadingMore(true);
                      setTimeout(() => {
                        setVisibleCount(prev => prev + 6);
                        setIsLoadingMore(false);
                      }, 400);
                    }}
                    disabled={isLoadingMore}
                    className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-500 text-xs font-bold px-8 py-3.5 rounded-2xl shadow-xs transition-all flex items-center gap-2 mx-auto"
                  >
                    {isLoadingMore ? (
                      <>
                        <span className="inline-block h-3.5 w-3.5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
                        <span>Loading more industry stories...</span>
                      </>
                    ) : (
                      <>
                        <span>Load More Industry Stories ↓</span>
                        <span className="text-[10px] text-gray-400 font-mono">({filteredArticles.length - visibleCount} remaining)</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="p-6 bg-gray-50 dark:bg-gray-900/60 rounded-3xl border border-gray-200 dark:border-gray-800 space-y-3 max-w-xl mx-auto">
                    <span className="text-xs font-bold text-gray-900 dark:text-white block">
                      ✓ You're all caught up.
                    </span>
                    <p className="text-[11px] text-gray-500">
                      Explore more cross-sector news, trending global themes, or deep industry intelligence.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                      <button
                        onClick={() => {
                          setFeedSortFilter("trending");
                          window.scrollTo({ top: 400, behavior: "smooth" });
                        }}
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-bold px-3.5 py-1.5 rounded-xl hover:text-blue-600 transition-colors shadow-xs"
                      >
                        Explore Trending Stories →
                      </button>
                      <button
                        onClick={() => {
                          setSelectedIndustry("All");
                          setSelectedTopic(null);
                          setSearchQuery("");
                          window.scrollTo({ top: 200, behavior: "smooth" });
                        }}
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-bold px-3.5 py-1.5 rounded-xl hover:text-blue-600 transition-colors shadow-xs"
                      >
                        Explore Industries →
                      </button>
                      <Link
                        href="/en/news-poc/sector-news/industry"
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition-colors shadow-xs"
                      >
                        Explore Industry Intelligence →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* SECTION 4 — TOP INDUSTRY STORIES */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <div>
                  <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <TrendingUp className="h-4.5 w-4.5 text-blue-500" />
                    Top Curated Industry Stories
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">High-impact developments with strategic implications across supply chains.</p>
                </div>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-lg">
                  Curated
                </span>
              </div>

              {/* 1 Primary + 4 Secondary Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ALL_INDUSTRY_ARTICLES.slice(0, 4).map((art) => (
                  <div
                    key={art.id}
                    className="bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-xs hover:border-blue-400 dark:hover:border-blue-500/50 transition-all flex flex-col justify-between space-y-3 group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-900/30">
                          {art.industry}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium">{art.date}</span>
                      </div>
                      <Link href={`/en/news-poc/article/${art.id}`}>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors leading-snug">
                          {art.title}
                        </h4>
                      </Link>
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                        {art.excerpt}
                      </p>
                    </div>

                    {/* Why It Matters Callout */}
                    <div className="p-2.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30 text-[11px] text-amber-900 dark:text-amber-300">
                      <strong className="block text-[9px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-0.5">
                        ⚡ Why It Matters
                      </strong>
                      <span>{art.whyItMatters}</span>
                    </div>

                    <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[10px] text-gray-400">
                      <span>{art.source}</span>
                      <Link href={`/en/news-poc/article/${art.id}`} className="text-blue-600 font-bold group-hover:underline flex items-center gap-0.5">
                        Read Story →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 6 — TRENDING TOPICS CLOUD */}
            <div className="bg-white dark:bg-[#0f172a] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                  <Tag className="h-4 w-4 text-blue-500" /> Trending Industry Topics
                </span>
                <span className="text-[10px] text-gray-400">Click to filter discovery feed</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {[
                  { tag: "OSAT Packaging", count: "3.4k reads" },
                  { tag: "Battery Swapping", count: "2.8k reads" },
                  { tag: "Green Hydrogen", count: "2.1k reads" },
                  { tag: "Customs API", count: "1.9k reads" },
                  { tag: "Rare Earths", count: "1.4k reads" },
                  { tag: "Fermentation API", count: "1.2k reads" },
                  { tag: "Carbon Border Tax", count: "980 reads" }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedTopic(selectedTopic === item.tag ? null : item.tag)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      selectedTopic === item.tag
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-200"
                    }`}
                  >
                    <span>#{item.tag}</span>
                    <span className="text-[9px] text-gray-400 font-mono">({item.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* SECTION 8 — WHAT'S CHANGING IN INDUSTRIES? */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <h3 className="font-display text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Layers className="h-4.5 w-4.5 text-blue-500" />
                  What's Changing Across Industries?
                </h3>
                <span className="text-xs text-gray-400">Strategic Context</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    ind: "Technology & Semiconductors",
                    headline: "High-density OSAT substrates reshaping compute packaging.",
                    desc: "Domestic testing plants reduce lead-time bottlenecks by 35% as multi-die advanced packaging replaces monolithic silicon imports.",
                    link: "/en/news-poc/sector-news/industry"
                  },
                  {
                    ind: "Energy & Infrastructure",
                    headline: "Bilateral grid linkages driving coastal green ammonia pipelines.",
                    desc: "€2.4B in maritime interconnectivity treaties link Western Indian renewable ports directly with Rotterdam clean fuel hubs.",
                    link: "/en/news-poc/sector-news/industry"
                  },
                  {
                    ind: "Automotive & Logistics",
                    headline: "Universal battery-swapping enclosure specs mandated.",
                    desc: "800V fast-swapping standards across 80 transit corridors eliminate proprietary infrastructure fragmentation for freight operators.",
                    link: "/en/news-poc/sector-news/industry"
                  }
                ].map((card, cIdx) => (
                  <div key={cIdx} className="bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-xs flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider block">
                        {card.ind}
                      </span>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">
                        {card.headline}
                      </h4>
                      <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                        {card.desc}
                      </p>
                    </div>
                    <Link
                      href={card.link}
                      className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1 pt-2 border-t border-gray-100 dark:border-gray-800"
                    >
                      <span>Read Related Insights</span>
                      <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 9 — PERSONALIZED RECOMMENDED FOR YOU */}
            <div className="bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-transparent p-6 rounded-3xl border border-blue-200 dark:border-blue-900/30 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Personalized For You
                  </span>
                  <h3 className="font-display text-base font-bold text-gray-900 dark:text-white mt-0.5">
                    Because you follow Semiconductors & Clean Energy
                  </h3>
                </div>
                <button
                  onClick={() => router.push("/en/news-poc/my-news")}
                  className="bg-white dark:bg-gray-900 text-xs font-bold text-blue-600 px-3.5 py-1.5 rounded-xl border border-blue-200 dark:border-blue-800 shadow-xs hover:bg-blue-50 transition-colors"
                >
                  Personalize Feed
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ALL_INDUSTRY_ARTICLES.slice(0, 2).map((art) => (
                  <Link
                    key={art.id}
                    href={`/en/news-poc/article/${art.id}`}
                    className="p-3.5 bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-400 transition-all block space-y-2 shadow-xs group"
                  >
                    <div className="flex items-center justify-between text-[9px]">
                      <span className="font-bold text-blue-600">{art.industry}</span>
                      <span className="text-gray-400">{art.readTime}</span>
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-600 leading-snug line-clamp-2">
                      {art.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>

            {/* SECTION 13.5 & 14.5 — KEY COMPANIES & LEADERS */}
            {isIntelligenceActive && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 animate-fade-in">
                {/* Key Companies */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-4">
                  <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <Globe className="h-4.5 w-4.5 text-blue-500" />
                    Key Companies in {selectedIndustry === "All" ? "this space" : selectedIndustry}
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: "Semco International", role: "Foundry Leader", country: "Taiwan", tier: "Tier-1 Partner" },
                      { name: "Nordic Litho AB", role: "ASIC Machinery", country: "Sweden", tier: "Strategic Vendor" },
                      { name: "Vanguard Solar Tech", role: "PV Cell Supplier", country: "India", tier: "Growth Player" }
                    ].map((comp, idx) => (
                      <div key={idx} className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-gray-900 dark:text-white block">{comp.name}</span>
                          <span className="text-[10px] text-gray-500">{comp.role} · {comp.country}</span>
                        </div>
                        <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-md">
                          {comp.tier}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Leaders */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-4">
                  <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <Users className="h-4.5 w-4.5 text-purple-500" />
                    Key Industry Leaders & Experts
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: "Dr. Aris Vance", company: "Semco International", designation: "Chief Architect" },
                      { name: "Lars Larsson", company: "Nordic Litho AB", designation: "VP Engineering" },
                      { name: "Rohan Sen", company: "Vanguard Solar Tech", designation: "Director Operations" }
                    ].map((lead, idx) => (
                      <div key={idx} className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 flex items-center gap-3 text-xs">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400 text-xs">
                          {lead.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <span className="font-bold text-gray-900 dark:text-white block">{lead.name}</span>
                          <span className="text-[10px] text-gray-500">{lead.designation} at {lead.company}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}


            {/* SECTION 17 — INDUSTRY VOICES / PODCASTS & VIDEOS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <h3 className="font-display text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Headphones className="h-4.5 w-4.5 text-purple-500" />
                  Industry Voices & Multimedia Briefs
                </h3>
                <span className="text-xs text-blue-600 font-bold hover:underline cursor-pointer">
                  All Podcasts →
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Episode 48: The Geopolitics of Advanced Semiconductor Packaging",
                    host: "Dr. K. S. Rao with Jensen Huang",
                    type: "Podcast",
                    duration: "28 mins",
                    ind: "Semiconductors"
                  },
                  {
                    title: "Executive Brief: Decarbonizing Heavy Maritime Freight Corridors",
                    host: "Sarah Lin with Ports Advisory",
                    type: "Video",
                    duration: "18 mins",
                    ind: "Logistics"
                  }
                ].map((media, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-5 rounded-2xl bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 shadow-xs space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[9px]">
                        <span className="font-bold text-purple-600 bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded">
                          {media.type}
                        </span>
                        <span className="text-gray-400">{media.duration}</span>
                      </div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">
                        {media.title}
                      </h4>
                      <p className="text-[10px] text-gray-500">{media.host}</p>
                    </div>

                    <button 
                      onClick={() => alert(`Launching media player for: ${media.title}`)}
                      className="w-full bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-300 font-bold text-xs py-2 rounded-xl border border-purple-200 dark:border-purple-900/30 hover:bg-purple-100 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>{media.type === "Podcast" ? "Listen Episode" : "Watch Brief"}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>


            {/* SECTION 15 & 17.5 — INDUSTRY FORECAST & AI PREVIEW */}
            {isIntelligenceActive && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 animate-fade-in">
                {/* Forecast & Outlook */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                      <BarChart3 className="h-4.5 w-4.5 text-blue-500" />
                      5-Year Market Forecast (USD B)
                    </h3>
                    <span className="text-[9px] font-mono uppercase bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 px-1.5 py-0.2 rounded font-bold">
                      Base Case
                    </span>
                  </div>
                  <div className="space-y-3.5">
                    {[
                      { year: "2025 (Current)", val: "$240.5B", progress: "40%" },
                      { year: "2026", val: "$278.4B", progress: "55%" },
                      { year: "2027", val: "$310.2B", progress: "70%" },
                      { year: "2030 (Projected)", val: "$442.8B", progress: "95%" }
                    ].map((step, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">{step.year}</span>
                          <span className="font-bold text-gray-900 dark:text-white">{step.val}</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: step.progress }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Intelligence Preview (Locked Panel) */}
                <div className="bg-gradient-to-br from-blue-50/20 to-purple-50/20 dark:from-blue-950/10 dark:to-purple-950/10 border border-blue-100/60 dark:border-blue-900/30 rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                      <Sparkles className="h-4.5 w-4.5 text-blue-500 animate-pulse" />
                      AI-Powered Scenario Preview
                    </h3>
                    <p className="text-[10px] text-gray-500 leading-relaxed">
                      Lock scenarios based on geopolitical tensions, supply chain blockages, and subsidy updates.
                    </p>
                    <div className="space-y-2 pt-1.5">
                      {[
                        "Geopolitical Supply Shifts scenario analysis",
                        "Alternate Supply Chain routes opportunity maps",
                        "Risk signals for port terminal infrastructure"
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                          <Lock className="h-3 w-3 text-gray-400 shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1">
                    <Lock className="h-3.5 w-3.5 fill-current" />
                    Unlock Scenario Engine (Pro)
                  </button>
                </div>
              </div>
            )}

          </div>


          {/* RIGHT 4-COLUMN SIGNALS, REPORTS & MONETIZATION SIDEBAR */}
          <div className="col-span-12 lg:col-span-4 space-y-6">

            {/* SECTION 5 — TRENDING INDUSTRIES CARD */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-3">
              <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-orange-500" />
                Trending Industries Momentum
              </h4>
              <div className="space-y-2 text-xs">
                {[
                  { name: "Semiconductors & OSAT", growth: "+32% news volume", trend: "↑ High" },
                  { name: "Renewable Energy & H2", growth: "+27% treaties signed", trend: "↑ High" },
                  { name: "Electric Vehicles (EV)", growth: "+21% fleet adoption", trend: "↑ Med" },
                  { name: "Pharma Bulk API", growth: "+18% domestic share", trend: "↑ Med" },
                  { name: "Aerospace Defence", growth: "+15% export clearance", trend: "→ Steady" }
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 bg-gray-50 dark:bg-gray-900 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="font-bold text-gray-800 dark:text-gray-200 block">{item.name}</span>
                      <span className="text-[9px] text-gray-400 mt-0.5 block">{item.growth}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                      {item.trend}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 7 — INDUSTRY PULSE DASHBOARD TABLE */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <BarChart3 className="h-4 w-4 text-blue-500" />
                  Industry Pulse Matrix
                </h4>
                <span className="text-[9px] text-gray-400">Weekly Scan</span>
              </div>

              <div className="space-y-2 text-xs font-medium">
                {[
                  { ind: "Semiconductors", cov: "High", mom: "↑", risk: "Low" },
                  { ind: "Clean Energy", cov: "High", mom: "↑", risk: "Low" },
                  { ind: "Automotive EV", cov: "Med", mom: "↑", risk: "Med" },
                  { ind: "Pharma API", cov: "Med", mom: "→", risk: "Low" },
                  { ind: "Logistics Maritime", cov: "High", mom: "↓", risk: "Elevated" }
                ].map((row, rIdx) => (
                  <div key={rIdx} className="flex items-center justify-between p-2 rounded-lg bg-gray-50/70 dark:bg-gray-900/40 text-[11px]">
                    <span className="font-bold text-gray-800 dark:text-gray-200">{row.ind}</span>
                    <span className="text-gray-400">Cov: {row.cov}</span>
                    <span className={`font-bold ${row.mom === "↑" ? "text-emerald-500" : row.mom === "↓" ? "text-red-500" : "text-amber-500"}`}>
                      {row.mom}
                    </span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                      row.risk === "Elevated" ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                    }`}>
                      {row.risk}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 9.5 & 10.5 — TRADE & INVESTMENT PULSE */}
            {isIntelligenceActive && (
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-4 animate-fade-in">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Scale className="h-4 w-4 text-blue-500" />
                  Trade & Investment Pulse
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-2">
                    <span className="text-[9px] font-bold uppercase text-gray-400 tracking-wider">Top Export Target</span>
                    <div className="text-sm font-bold text-gray-900 dark:text-white">Germany</div>
                    <p className="text-[9.5px] text-gray-500 leading-snug">Representing 38% of overseas supply corridors.</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-2">
                    <span className="text-[9px] font-bold uppercase text-gray-400 tracking-wider">Investment Hotspot</span>
                    <div className="text-sm font-bold text-gray-900 dark:text-white">India (OSAT)</div>
                    <p className="text-[9.5px] text-gray-500 leading-snug">CAGR for manufacturing centers at +22.4%.</p>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 text-[10px] text-blue-800 dark:text-blue-300 flex items-center justify-between">
                  <span>Deeper analytics available on dashboard</span>
                  <Link href="/en/news-poc/sector-news/reports" className="font-bold underline hover:text-blue-600">
                    View Reports →
                  </Link>
                </div>
              </div>
            )}

            {/* SECTION 12 — INDUSTRY OPPORTUNITIES & RISKS */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-4">
              <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Target className="h-4 w-4 text-emerald-500" />
                Opportunities & Risks Preview
              </h4>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/30 rounded-xl space-y-1">
                  <span className="text-[9px] font-bold uppercase text-emerald-700 dark:text-emerald-400">
                    🚀 Key Opportunities
                  </span>
                  <p className="text-gray-700 dark:text-gray-300 text-[11px] leading-relaxed">
                    PLI subsidies for OSAT chip assemblies & European maritime hydrogen off-take agreements.
                  </p>
                </div>

                <div className="p-3 bg-red-50/60 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/30 rounded-xl space-y-1">
                  <span className="text-[9px] font-bold uppercase text-red-700 dark:text-red-400">
                    ⚠️ Trade Risks
                  </span>
                  <p className="text-gray-700 dark:text-gray-300 text-[11px] leading-relaxed">
                    Red Sea shipping insurance premiums & EU Carbon Border Adjustment Mechanism compliance.
                  </p>
                </div>
              </div>

              <Link
                href="/en/news-poc/sector-news/industry"
                className="block text-center w-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 font-bold text-xs py-2.5 rounded-xl border border-blue-200 dark:border-blue-900/40 hover:bg-blue-100 transition-colors"
              >
                Explore Full Industry Intelligence →
              </Link>
            </div>


            {/* SECTION 13 — RECOMMENDED REPORTS */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-blue-500" />
                  Industry Reports
                </h4>
                <span className="text-[9px] font-bold text-purple-600">Q1 Releases</span>
              </div>

              <div className="space-y-3">
                {[
                  { title: "Global OSAT Semiconductor Packaging Market 2026", price: "$199", isPremium: true, code: "REP-SEM-46" },
                  { title: "Green Hydrogen Marine Corridors Supply Map", price: "$149", isPremium: true, code: "REP-HYD-17" },
                  { title: "B2B Industry Trade Digest Q1 (Summary)", price: "Free", isPremium: false, code: "REP-DIG-FREE" }
                ].map((rep, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-850 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-gray-900 dark:text-white block line-clamp-1">
                        {rep.title}
                      </span>
                      <span className="text-[9px] font-mono text-gray-400">{rep.code}</span>
                    </div>
                    <Link
                      href="/eoi"
                      className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition-colors shrink-0 ${
                        rep.isPremium
                          ? "bg-purple-600 text-white hover:bg-purple-700"
                          : "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {rep.price === "Free" ? "Download Free" : `Unlock ${rep.price}`}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 16 — INDUSTRY EVENTS & WEBINARS */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-emerald-500" />
                  Industry Events & Summits
                </h4>
                <span className="text-[9px] font-bold text-blue-500">2026 Agenda</span>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { name: "Semicon India & OSAT Expo 2026", date: "Mar 24-26", loc: "Bangalore", type: "Conference" },
                  { name: "Global Clean Hydrogen Marine Summit", date: "Apr 12-14", loc: "Mumbai / Virtual", type: "Hybrid" }
                ].map((ev, eIdx) => (
                  <div key={eIdx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-150/40 dark:border-gray-800 space-y-1">
                    <div className="flex items-center justify-between text-[9px]">
                      <span className="font-bold text-emerald-600">{ev.type}</span>
                      <span className="text-gray-400">{ev.date}</span>
                    </div>
                    <h5 className="font-bold text-gray-900 dark:text-white text-xs">{ev.name}</h5>
                    <div className="flex items-center justify-between text-[10px] text-gray-500 pt-1">
                      <span>📍 {ev.loc}</span>
                      <Link href="/eoi" className="text-blue-600 font-bold hover:underline">Register →</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 18 — EXPERT PERSPECTIVES */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-3">
              <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Award className="h-4 w-4 text-amber-500" />
                Industry Leader Perspective
              </h4>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-900/70 rounded-2xl border border-gray-150/40 dark:border-gray-800 space-y-2">
                <p className="text-xs text-gray-700 dark:text-gray-300 italic leading-relaxed">
                  "The convergence of AI hardware and decentralized shipping customs standards represents the largest supply chain arbitrage of the decade."
                </p>
                <div className="pt-2 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-gray-900 dark:text-white block">Jensen Huang</span>
                    <span className="text-[10px] text-gray-400">CEO, NVIDIA</span>
                  </div>
                  <Link href="/en/news-poc/leader-news" className="text-xs font-bold text-blue-600 hover:underline">
                    View Profile →
                  </Link>
                </div>
              </div>
            </div>

            {/* SECTION 19 — SPONSORED CONTENT */}
            <div className="bg-white dark:bg-[#0f172a] border border-amber-200/80 dark:border-amber-900/30 rounded-3xl p-5 shadow-xs space-y-2">
              <span className="text-[8px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded">
                Sponsored Industry Insight
              </span>
              <h4 className="text-xs font-bold text-gray-900 dark:text-white pt-1">
                Automating Cross-Border Customs Single-Window Systems for Global Shippers
              </h4>
              <p className="text-[11px] text-gray-500 leading-snug">
                Learn how enterprise cloud platforms eliminate paper clearance latency across 40 maritime ports.
              </p>
              <Link href="/eoi" className="text-xs font-bold text-blue-600 hover:underline inline-block pt-1">
                Learn More ↗
              </Link>
            </div>


            {/* SECTION 21 — INDUSTRY NEWSLETTER */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-4">
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="h-4 w-4 text-blue-500" />
                  Get Your Industry Briefing
                </h4>
                <p className="text-[11px] text-gray-500 mt-1">
                  Receive curated weekly intelligence for your chosen industries.
                </p>
              </div>

              {/* Multi-industry checklist */}
              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                {["Semiconductors", "Renewable Energy", "Automotive & EV", "Pharma API", "Aerospace", "FinTech"].map((ind) => {
                  const isChecked = selectedNewsletterIndustries.includes(ind);
                  return (
                    <button
                      key={ind}
                      onClick={() => toggleNewsletterIndustry(ind)}
                      className={`px-2.5 py-1.5 rounded-lg border text-left flex items-center gap-1.5 transition-all ${
                        isChecked 
                          ? "bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold"
                          : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      <span className={`h-2.5 w-2.5 rounded-sm flex items-center justify-center text-[8px] ${isChecked ? "bg-blue-600 text-white" : "border border-gray-400"}`}>
                        {isChecked ? "✓" : ""}
                      </span>
                      <span className="truncate">{ind}</span>
                    </button>
                  );
                })}
              </div>

              {newsletterSubscribed ? (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold rounded-xl text-center">
                  ✓ Subscribed! You will receive your weekly briefing.
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="work@company.com"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={() => {
                      if (newsletterEmail) setNewsletterSubscribed(true);
                    }}
                    className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-950 hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white font-bold text-xs py-2 rounded-xl transition-colors"
                  >
                    Get My Briefing
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 20 — INDUSTRY TIMELINE */}
      {isIntelligenceActive && (
        <section className="mx-auto max-w-7xl px-4 pt-12 lg:px-6">
          <div className="bg-white dark:bg-[#0f172a] rounded-3xl border border-gray-200 dark:border-gray-800 p-8 shadow-xs space-y-6 animate-fade-in">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Chronological Logs
              </span>
              <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mt-1">
                Industry Timeline & Milestones
              </h3>
            </div>
            <div className="relative pl-6 border-l border-gray-200 dark:border-gray-800 space-y-6">
              {[
                { date: "JAN 2026", title: "Global Tariff Shifts", desc: "Key trade barriers lowered across Asia-Pacific logistics clusters." },
                { date: "MAR 2026", title: "AI Integration Standards", desc: "First cross-industry protocol ratified for robotic optimization models." },
                { date: "JUN 2026", title: "Next-Gen Infrastructure Funding", desc: "US and EU combined commit $18B to sub-10nm chip supply pathways." }
              ].map((time, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-blue-600 border-2 border-white dark:border-[#0f172a]" />
                  <span className="text-[9px] font-mono font-bold text-blue-600 dark:text-blue-400 block">{time.date}</span>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white mt-0.5">{time.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{time.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 22 — RELATED INTELLIGENCE CROSS-NAVIGATION */}
      <section className="mx-auto max-w-7xl px-4 pt-12 lg:px-6">
        <div className="bg-white dark:bg-[#0f172a] rounded-3xl border border-gray-200 dark:border-gray-800 p-8 shadow-xs space-y-6">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Cross-Platform Discovery
            </span>
            <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mt-1">
              Explore Related B2B Intelligence Products
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Connect into deeper analytic modules across countries, leaders, verified companies, and custom intelligence tiers.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: "Industry Intelligence", desc: "Deep analytical research", href: "/en/news-poc/sector-news/industry", icon: Layers },
              { label: "Company Intelligence", desc: "Corporate verification pages", href: "/en/news-poc/company-news", icon: Globe },
              { label: "Country Intelligence", desc: "Bilateral trade corridors", href: "/en/news-poc/country-news/intelligence", icon: Globe },
              { label: "Leader Intelligence", desc: "C-Suite influence scorecards", href: "/en/news-poc/leader-news/intelligence", icon: Users },
              { label: "Reader Intelligence", desc: "Specialist trade digests", href: "/en/news-poc/my-news/intelligence", icon: Newspaper },
              { label: "Premium Reports", desc: "Downloadable trade dossiers", href: "/eoi", icon: FileText }
            ].map((prod, pIdx) => {
              const IconComponent = prod.icon || Layers;
              return (
                <Link
                  key={pIdx}
                  href={prod.href}
                  className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-150/50 dark:border-gray-800 hover:border-blue-500 hover:bg-blue-50/40 dark:hover:bg-gray-900 transition-all block space-y-2 group"
                >
                  <IconComponent className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-600">
                    {prod.label}
                  </h4>
                  <p className="text-[10px] text-gray-400 leading-snug">
                    {prod.desc}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 23 — FINAL CONVERSION CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-[#0f172a] to-blue-950 text-white p-8 md:p-12 border border-slate-800 text-center space-y-4 shadow-md">
          <span className="bg-blue-600 text-white text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full inline-block">
            ENTERPRISE INTELLIGENCE
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-bold max-w-2xl mx-auto leading-tight text-white">
            Don't Just Read the Industry. Understand It.
          </h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Stay ahead of policy changes, tariff adjustments, and cross-border supply chain movements with verified real-time industry intelligence.
          </p>
          <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/signup"
              className="bg-white text-gray-950 hover:bg-gray-100 font-bold text-xs px-6 py-3 rounded-xl transition-colors shadow-sm"
            >
              Start Free Discovery
            </Link>
            <Link
              href="/eoi"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors shadow-sm"
            >
              Explore Premium Intelligence →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
