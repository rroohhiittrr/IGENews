"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { 
  ArrowLeft, Lock, Sparkles, TrendingUp, Calendar, Clock, Heart, Share2, 
  MessageSquare, CheckCircle, FileText, Bookmark, Mail, ShieldAlert, Key, 
  ThumbsUp, MessageCircle, BarChart2, ChevronRight, Layers, Users, Search, Flame, Download,
  Crown, Award, Briefcase, Globe, Building, Play
} from "lucide-react";
import { NEWS_POC_MENU_ITEMS, MegaMenuItem, SubItem, SubSubItem } from "@/components/news-poc/newsPOCData";
import NewsPOCHeadlinesHome from "@/components/news-poc/NewsPOCHeadlinesHome";
import NewsPOCCompanyNewsHome from "@/components/news-poc/NewsPOCCompanyNewsHome";
import NewsPOCCompanyNewsSubmenu from "@/components/news-poc/NewsPOCCompanyNewsSubmenu";
import NewsPOCTrendingHome from "@/components/news-poc/NewsPOCTrendingHome";
import NewsPOCTrendingMostLikedMySectors from "@/components/news-poc/NewsPOCTrendingMostLikedMySectors";
import NewsPOCTrendingMostLikedAllSectors from "@/components/news-poc/NewsPOCTrendingMostLikedAllSectors";
import NewsPOCTrendingMostSharedMySectors from "@/components/news-poc/NewsPOCTrendingMostSharedMySectors";
import NewsPOCTrendingMostSharedAllSectors from "@/components/news-poc/NewsPOCTrendingMostSharedAllSectors";
import NewsPOCTrendingMostCommentedMySectors from "@/components/news-poc/NewsPOCTrendingMostCommentedMySectors";
import NewsPOCTrendingMostCommentedAllSectors from "@/components/news-poc/NewsPOCTrendingMostCommentedAllSectors";
import NewsPOCHeadlinesAIEditorMySector from "@/components/news-poc/NewsPOCHeadlinesAIEditorMySector";
import NewsPOCHeadlinesAIEditorAllSectors from "@/components/news-poc/NewsPOCHeadlinesAIEditorAllSectors";
import NewsPOCHeadlinesIntelligenceEditorMySector from "@/components/news-poc/NewsPOCHeadlinesIntelligenceEditorMySector";
import NewsPOCHeadlinesIntelligenceEditorAllSectors from "@/components/news-poc/NewsPOCHeadlinesIntelligenceEditorAllSectors";
import NewsPOCHeadlinesSMEEditorMySector from "@/components/news-poc/NewsPOCHeadlinesSMEEditorMySector";
import NewsPOCHeadlinesSMEEditorAllSectors from "@/components/news-poc/NewsPOCHeadlinesSMEEditorAllSectors";
import NewsPOCHeadlinesViksitBharatPanelEditorMySector from "@/components/news-poc/NewsPOCHeadlinesViksitBharatPanelEditorMySector";
import NewsPOCHeadlinesViksitBharatPanelEditorAllSectors from "@/components/news-poc/NewsPOCHeadlinesViksitBharatPanelEditorAllSectors";
import NewsPOCLeaderNewsHome from "@/components/news-poc/NewsPOCLeaderNewsHome";
import NewsPOCLeaderNewsSubmenu from "@/components/news-poc/NewsPOCLeaderNewsSubmenu";
import NewsPOCExpertNewsHome from "@/components/news-poc/NewsPOCExpertNewsHome";
import NewsPOCExpertNewsSubmenu from "@/components/news-poc/NewsPOCExpertNewsSubmenu";
import NewsPOCSectorNewsHome from "@/components/news-poc/NewsPOCSectorNewsHome";
import NewsPOCSectorNewsSubmenu from "@/components/news-poc/NewsPOCSectorNewsSubmenu";
import NewsPOCCountryNewsHome from "@/components/news-poc/NewsPOCCountryNewsHome";
import NewsPOCCountryNewsSubmenu from "@/components/news-poc/NewsPOCCountryNewsSubmenu";
import NewsPOCCommunitiesHome from "@/components/news-poc/NewsPOCCommunitiesHome";
import NewsPOCCommunitiesSubmenu from "@/components/news-poc/NewsPOCCommunitiesSubmenu";
import NewsPOCMyNewsHome from "@/components/news-poc/NewsPOCMyNewsHome";
import NewsPOCMyNewsSubmenu from "@/components/news-poc/NewsPOCMyNewsSubmenu";
import NewsPOCArticleDetail from "@/components/news-poc/NewsPOCArticleDetail";
import NewsPOCAllIndustryView from "@/components/news-poc/NewsPOCAllIndustryView";
import NewsPOCAllCountryView from "@/components/news-poc/NewsPOCAllCountryView";
import NewsPOCAllLeaderView from "@/components/news-poc/NewsPOCAllLeaderView";
import NewsPOCFullDiscoveryView from "@/components/news-poc/NewsPOCFullDiscoveryView";
import { IGEN_50_SECTORS } from "@/components/news-poc/igenTaxonomyData";

// Mock database for sub-feeds
const MOCK_SUB_ARTICLES = [
  { id: "s-1", title: "Global Supply Chain Rebalancing: India-Europe Corridors Expand", excerpt: "Strategic cargo agreements between shipping lines open faster trade routes bypass Suez disruption bottlenecks, boosting export volumes.", tag: "Logistics", date: "2 hrs ago", time: "4 min read", likes: 120, comments: 8 },
  { id: "s-2", title: "Automotive & Electric Vehicle Battery Swap Standardized Rules Released", font: "Min of Heavy Industries", excerpt: "New battery interoperability specifications approved by panel, reducing infrastructure deployment cost by 22%.", tag: "Automotive", date: "4 hrs ago", time: "5 min read", likes: 89, comments: 12 },
  { id: "s-3", title: "Agritech Export Volumes Rise 15% as Drone Sprayers Expand Rural Reach", excerpt: "Precision agriculture investments trigger bumper harvest yields in Western states, expanding bilateral trade output.", tag: "Agriculture", date: "1 day ago", time: "6 min read", likes: 215, comments: 19 }
];

const SECTORS_LIST = IGEN_50_SECTORS;

const INDUSTRIES_LIST = [
  { code: "IND-01", name: "Silicon Fabrication & OSAT", sector: "Electronics & IT", feed: "OSAT chip packaging volumes rise 12%." },
  { code: "IND-02", name: "FinTech Infrastructure APIs", sector: "FinTech & Payments", feed: "Payment gateway compliance rules adopted." },
  { code: "IND-03", name: "Precision Agritech Equipment", sector: "Agriculture", feed: "Drone sprayer grants expand crop yield." },
  { code: "IND-04", name: "Solar PV Cell Production", sector: "Sustainable Energy", feed: "Bilateral solar cell shipments peak." },
  { code: "IND-05", name: "Defense Autonomous Avionics", sector: "Defence & Aerospace", feed: "UAV testing protocols approved." },
  { code: "IND-06", name: "Electric Vehicle Batteries", sector: "Automotive & EV", feed: "Battery swap standards finalized." },
  { code: "IND-07", name: "Active Pharma Ingredients (API)", sector: "Healthcare & Pharma", feed: "API imports decline as local supply grows." }
];

const COUNTRIES_LIST = [
  { code: "IND-USA", name: "India-USA Bilateral", region: "North America", feed: "Bilateral tech agreements signed." },
  { code: "IND-DEU", name: "India-Germany Bilateral", region: "Europe", feed: "Hydrogen shipment corridors open." },
  { code: "IND-TWN", name: "India-Taiwan Bilateral", region: "East Asia", feed: "OSAT fabricators lease facility land." },
  { code: "IND-FRA", name: "India-France Bilateral", region: "Europe", feed: "Defense aircraft avionics trials." },
  { code: "IND-ARE", name: "India-UAE Bilateral", region: "Middle East", feed: "CEPA trade volume crosses $100B." }
];

const LEADERS_LIST = [
  { code: "L-01", name: "Jensen Huang", designation: "CEO, NVIDIA", feed: "AI trade hardware supply outlines." },
  { code: "L-02", name: "Nandan Nilekani", designation: "Chairman, Infosys", feed: "Digital public rail blueprints." },
  { code: "L-03", name: "Shaktikanta Das", designation: "Governor, RBI", feed: "UPI SAARC corridors guidelines." },
  { code: "L-04", name: "Rajnath Singh", designation: "Minister of Defence", feed: "Autonomous aerospace research." }
];

const READERS_LIST = [
  { code: "R-01", name: "Trade Logistics Analyst", group: "Export Operations", feed: "Decentralized customs clearance routes." },
  { code: "R-02", name: "Semiconductor Sourcing Mgr", group: "Procurement", feed: "Silicon wafer pricing trends updates." },
  { code: "R-03", name: "Bilateral Policy Researcher", group: "Advisory", feed: "Carbon tax compliance impact briefs." }
];

// Mock articles data keyed by Category (Sector, Industry, Country, Leader, Reader)
const MOCK_CATEGORY_ARTICLES: Record<string, any[]> = {
  sector: [
    { 
      id: "sec-1", 
      title: "India's Tech Sector Volatility Eases Amid Solid Q1 Domestic Demand", 
      excerpt: "Strategic software developments and SaaS expansions secure a stable growth path for domestic tech service providers, offsetting US corporate spend slows.", 
      sector: "Electronics & IT (S16)", 
      ministry: "Ministry of Electronics & IT",
      author: "Priya Sundaram · Trade Analyst",
      country: "Domestic Trade", 
      readTime: "5 min read", 
      date: "10m ago", 
      likes: 140, 
      comments: 12, 
      impact: "+14.2% Growth",
      isPremium: false, 
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80" 
    },
    { 
      id: "sec-2", 
      title: "Agricultural drone sprayers approved for 1,200 rural districts", 
      excerpt: "Ministry of Agriculture introduces direct capital grants to purchase indigenous unmanned flight hardware for farming societies.", 
      sector: "Agriculture (S01)", 
      ministry: "Ministry of Agriculture & Farmers Welfare",
      author: "Dr. Ramesh Nair · Agri Policy",
      country: "Domestic", 
      readTime: "6 min read", 
      date: "2 hrs ago", 
      likes: 98, 
      comments: 5, 
      impact: "+18.5% Efficiency",
      isPremium: true, 
      image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&auto=format&fit=crop&q=80" 
    },
    { 
      id: "sec-3", 
      title: "Union Budget: Clean Energy Infrastructure gets $12B allocation booster", 
      excerpt: "Renewable energy sector welcomes mega grid interconnectivity funding to secure remote solar farms into national power lines.", 
      sector: "Energy & Sustainability (S17)", 
      ministry: "Ministry of New & Renewable Energy",
      author: "Vikram Sengupta · Energy Lead",
      country: "India-France Bilateral", 
      readTime: "8 min read", 
      date: "1 day ago", 
      likes: 312, 
      comments: 24, 
      impact: "+22.4% Capex",
      isPremium: false, 
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80" 
    },
    { 
      id: "sec-4", 
      title: "Semiconductor OSAT Substrate Scaling Accelerates in Tamil Nadu Hubs", 
      excerpt: "Advanced high-density glass packaging facilities reach commercial production benchmarks, reducing dependence on East Asian packaging lines.", 
      sector: "Semiconductors (S46)", 
      ministry: "India Semiconductor Mission",
      author: "Arun Kulkarni · Tech Hardware",
      country: "India-Taiwan Bilateral", 
      readTime: "5 min read", 
      date: "3 hrs ago", 
      likes: 245, 
      comments: 19, 
      impact: "+38.2% YoY",
      isPremium: true, 
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80" 
    },
    { 
      id: "sec-5", 
      title: "Next-Gen Commercial EV Battery Interoperability Protocol Finalized", 
      excerpt: "New standardized battery-swapping architecture across 60 freight transit corridors cuts fleet turnaround times by 45%.", 
      sector: "Automotive & EV (S45)", 
      ministry: "Ministry of Heavy Industries",
      author: "Sunita Rao · Auto Logistics",
      country: "Domestic & SEA", 
      readTime: "4 min read", 
      date: "5 hrs ago", 
      likes: 178, 
      comments: 14, 
      impact: "+26.0% Adoption",
      isPremium: false, 
      image: "https://images.unsplash.com/photo-1558441719-8b89ec691456?w=600&auto=format&fit=crop&q=80" 
    }
  ],
  industry: [
    { id: "ind-1", title: "OSAT Semiconductor Packaging Facilities Face Shortages in Taiwan Corridors", excerpt: "Silicon fabrication logistics slow down. Indian assembly plants prepare to increase buffer stocks for silicon wafers.", sector: "Semiconductors (S46)", country: "India-Taiwan Bilateral", readTime: "4 min read", date: "15m ago", likes: 204, comments: 18, isPremium: false, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60" },
    { id: "ind-2", title: "Cloud Logistics: Secured documents standard rules adopted by 40 shipping lines", excerpt: "Advanced encryption protocols introduced across maritime trade portals to avoid customs documentation delays.", sector: "Logistics (S43)", country: "Global Corridors", readTime: "5 min read", date: "3 hrs ago", likes: 110, comments: 9, isPremium: true, image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500&auto=format&fit=crop&q=60" }
  ],
  country: [
    { id: "cou-1", title: "India-US Bilateral Trade volume peaks at record $191.8 Billion", excerpt: "Strategic cooperation in critical defense tech and AI partnerships drives bilateral commerce flows, narrowing trade deficits.", sector: "AI & Cyber Security (S02)", country: "India-USA Bilateral", readTime: "7 min read", date: "30m ago", likes: 450, comments: 38, isPremium: false, image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=500&auto=format&fit=crop&q=60" },
    { id: "cou-2", title: "India-Germany Green Hydrogen Corridor: €2B initial funding signed", excerpt: "Bilateral trade agreement targets maritime shipments of liquefied clean hydrogen to EU ports by late 2026.", sector: "Energy & Sustainability (S17)", country: "India-Germany Bilateral", readTime: "6 min read", date: "4 hrs ago", likes: 185, comments: 14, isPremium: true, image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&auto=format&fit=crop&q=60" }
  ],
  leader: [
    { id: "lea-1", title: "CEO Panel Discussion: Navigating Cross-Border AI Regulations in 2026", excerpt: "Industry leaders align on decentralized data storage setups to satisfy strict regional compliance rules without sacrificing speed.", sector: "AI & Cyber Security (S02)", country: "Global Corridors", readTime: "5 min read", date: "45m ago", likes: 156, comments: 11, isPremium: false, image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60" },
    { id: "lea-2", title: "Nandan Nilekani Outlines Digital Public Infrastructure Blueprint for G20 nations", excerpt: "Viksit Bharat strategy outlines how unified payment APIs secure digital sovereignty for developing economies.", sector: "FinTech & Digital Payments (S42)", country: "Global", readTime: "6 min read", date: "5 hrs ago", likes: 290, comments: 20, isPremium: true, image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500&auto=format&fit=crop&q=60" }
  ],
  reader: [
    { id: "rea-1", title: "B2B Professional Dashboard Usage Trends: AI Alerts Drive Trade Decisions", excerpt: "Study of 1,200 active trade analysts indicates personalized alert digests improve reaction times to policy changes.", sector: "Services (S35)", country: "Domestic", readTime: "4 min read", date: "1 hr ago", likes: 98, comments: 7, isPremium: false, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60" }
  ]
};

// Recommended reports based on active submenu category
const MOCK_REPORTS: Record<string, any[]> = {
  sector: [
    { title: "Q3 Electronics & IT Trade Report", code: "REP-ELE-16", price: "$149" },
    { title: "Agriculture Export & Supply Outlook", code: "REP-AGR-01", price: "$129" }
  ],
  industry: [
    { title: "OSAT Silicon Packaging Growth Trends", code: "REP-SEM-46", price: "$199" },
    { title: "Freight Cloud Logistics Integration Map", code: "REP-LOG-43", price: "$149" }
  ],
  country: [
    { title: "India-US Critical Tech Bilateral Briefing", code: "REP-BILA-US", price: "$249" },
    { title: "Bilateral Trade tariff tables: India-EU", code: "REP-TARIFF-EU", price: "$199" }
  ],
  leader: [
    { title: "Executive Decision Logs: M&A Volatility Index", code: "REP-EXEC-92", price: "$299" },
    { title: "Emerging Leaders Designation Analysis", code: "REP-LEADER-06", price: "$179" }
  ],
  reader: [
    { title: "Professional Trade Analyst Salary & Tools Report", code: "REP-ANAL-15", price: "$99" }
  ]
};

export default function NewsPOCCatchAllPage() {
  const params = useParams();
  const router = useRouter();
  const slugParts = (params.slug as string[]) || [];

  const [activeSub, setActiveSub] = useState<string>(slugParts[2] || "my");
  const [likedList, setLikedList] = useState<string[]>([]);
  const [savedList, setSavedList] = useState<string[]>([]);
  const [sharedArticleId, setSharedArticleId] = useState<string | null>(null);
  const [commentOpenId, setCommentOpenId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState<string>("");
  const [commentsMap, setCommentsMap] = useState<Record<string, { author: string; text: string; time: string }[]>>({
    "sec-1": [
      { author: "Rajesh Kumar", text: "Domestic SaaS growth is offsetting export slowdown nicely.", time: "8m ago" }
    ],
    "sec-2": [
      { author: "Kavita Nair", text: "Drone sprayer grants will transform precision farming.", time: "1h ago" }
    ],
    "sec-all-1": [
      { author: "Vivek Murthy", text: "High-density substrate packaging is a critical strategic moat for Indian OSATs.", time: "10m ago" }
    ],
    "sec-all-2": [
      { author: "Devika Sharma", text: "Drone spraying grants are accelerating agricultural productivity across MP and Punjab.", time: "30m ago" }
    ],
    "sec-all-3": [
      { author: "Arun Mehra", text: "€2.4B green hydrogen corridor with Germany will transform port exports by 2027.", time: "1h ago" }
    ]
  });
  const [selectedSectorFilter, setSelectedSectorFilter] = useState<string>("all");
  const [followedItems, setFollowedItems] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Resolve standard catch-all properties (Declared before early returns)
  let menuMatch: MegaMenuItem | undefined;
  let subMatch: SubItem | undefined;
  let subSubMatch: SubSubItem | undefined;

  if (slugParts.length > 0) {
    menuMatch = NEWS_POC_MENU_ITEMS.find((item) => item.slug === slugParts[0]);
  }
  if (menuMatch && slugParts.length > 1) {
    subMatch = menuMatch.subItems.find((sub) => sub.slug === slugParts[1]);
  }
  if (subMatch && slugParts.length > 2) {
    subSubMatch = subMatch.subSubItems?.find((subsub) => subsub.slug === slugParts[2]);
  }

  const isFeedPage = slugParts[0] === "feed";
  const categoryKey = slugParts[1] || "sector"; // "sector", "industry", "country", "leader", "reader"
  const categoryName = categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);

  // If user navigates to /feed/[category]/intelligence, redirect/render corresponding Intelligence suite
  if (isFeedPage && slugParts.length >= 3 && slugParts[2] === "intelligence") {
    if (categoryKey === "sector") {
      return <NewsPOCSectorNewsSubmenu submenu="intelligence" />;
    }
    if (categoryKey === "industry") {
      return <NewsPOCSectorNewsSubmenu submenu="industry" />;
    }
    if (categoryKey === "country") {
      return <NewsPOCCountryNewsSubmenu submenu="intelligence" />;
    }
    if (categoryKey === "leader") {
      return <NewsPOCLeaderNewsSubmenu tier="intelligence" view="signals" />;
    }
    if (categoryKey === "reader") {
      return <NewsPOCMyNewsSubmenu submenuSlug="intelligence" viewSlug="all" />;
    }
  }

  const isHeadlinesLanding = slugParts[0] === "headlines" && slugParts.length === 1;

  const isTrendingLanding = slugParts[0] === "trending" && slugParts.length === 1;

  if (isHeadlinesLanding) {
    return <NewsPOCHeadlinesHome />;
  }

  if (isTrendingLanding) {
    return <NewsPOCTrendingHome />;
  }

  const isCompanyNewsLanding = slugParts[0] === "company-news" && slugParts.length === 1;
  if (isCompanyNewsLanding) {
    return <NewsPOCCompanyNewsHome />;
  }

  // Company News sub-menu: /company-news/[tier]/[view]
  // tier: registered | verified | top
  // view: pages | news | sector | all
  if (slugParts[0] === "company-news" && slugParts.length >= 2) {
    const validTiers = ["registered", "verified", "top"];
    const validViews = ["pages", "news", "sector", "all"];
    const cnTier = validTiers.includes(slugParts[1]) ? slugParts[1] : "registered";
    const cnView = validViews.includes(slugParts[2]) ? slugParts[2] : "pages";
    return (
      <NewsPOCCompanyNewsSubmenu
        tier={cnTier as "registered" | "verified" | "top"}
        submenu={cnView as "pages" | "news" | "sector" | "all"}
      />
    );
  }

  // Leader News mega menu landing
  if (slugParts[0] === "leader-news" && slugParts.length === 1) {
    return <NewsPOCLeaderNewsHome />;
  }

  // Expert News mega menu landing
  if (slugParts[0] === "expert-news" && slugParts.length === 1) {
    return <NewsPOCExpertNewsHome />;
  }

  // Expert News sub-menu: /expert-news/[expertType]/[view]
  // expertType: sme | asme
  // view: news | pages | sector | all
  if (slugParts[0] === "expert-news" && slugParts.length >= 2) {
    const validTypes = ["sme", "asme"];
    const validViews = ["news", "pages", "sector", "all"];
    const typePart = validTypes.includes(slugParts[1]) ? slugParts[1] : "sme";
    const viewPart = validViews.includes(slugParts[2]) ? slugParts[2] : "news";
    return (
      <NewsPOCExpertNewsSubmenu
        expertType={typePart as "sme" | "asme"}
        view={viewPart as "news" | "pages" | "sector" | "all"}
      />
    );
  }

  // Sector News mega menu landing
  if (slugParts[0] === "sector-news" && slugParts.length === 1) {
    return <NewsPOCSectorNewsHome />;
  }

  // Sector News sub-menu: /sector-news/[submenu]
  // submenu: all | engagement | intelligence | industry
  if (slugParts[0] === "sector-news" && slugParts.length >= 2) {
    const validSubmenus = ["all", "engagement", "intelligence", "industry"];
    const subPart = validSubmenus.includes(slugParts[1]) ? slugParts[1] : "all";
    return (
      <NewsPOCSectorNewsSubmenu
        submenu={subPart as "all" | "engagement" | "intelligence" | "industry"}
      />
    );
  }

  // Country News mega menu landing
  if (slugParts[0] === "country-news" && slugParts.length === 1) {
    return <NewsPOCCountryNewsHome />;
  }

  // Country News sub-menu: /country-news/[submenu]
  // submenu: my | all | intelligence
  if (slugParts[0] === "country-news" && slugParts.length >= 2) {
    const validSubmenus = ["my", "all", "intelligence"];
    const subPart = validSubmenus.includes(slugParts[1]) ? slugParts[1] : "my";
    return (
      <NewsPOCCountryNewsSubmenu
        submenu={subPart as "my" | "all" | "intelligence"}
      />
    );
  }

  // Communities mega menu landing
  if (slugParts[0] === "communities" && slugParts.length === 1) {
    return <NewsPOCCommunitiesHome />;
  }

  // Communities sub-menu: /communities/[trackSlug]/[viewSlug]
  // trackSlug: sme | sme-asme | reader | leader | expo | igen-expo
  // viewSlug: all | top | ific | importers | ifec | exporters | service | services
  if (slugParts[0] === "communities" && slugParts.length >= 2) {
    const trackPart = slugParts[1];
    const viewPart = slugParts[2] || "all";
    return (
      <NewsPOCCommunitiesSubmenu
        trackSlug={trackPart}
        viewSlug={viewPart}
      />
    );
  }

  // My News mega menu landing
  if (slugParts[0] === "my-news" && slugParts.length === 1) {
    return <NewsPOCMyNewsHome />;
  }

  // My News sub-menu: /my-news/[subSlug]/[viewSlug]
  // subSlug: my | feed | activities | contribution
  // viewSlug: all | likes | comments | analytics
  if (slugParts[0] === "my-news" && slugParts.length >= 2) {
    const subPart = slugParts[1];
    const viewPart = slugParts[2] || "all";
    return (
      <NewsPOCMyNewsSubmenu
        submenuSlug={subPart}
        viewSlug={viewPart}
      />
    );
  }

  // Article detail reader: /article/[id]
  if (slugParts[0] === "article") {
    const articleId = slugParts[1] || "default";
    return <NewsPOCArticleDetail articleId={articleId} />;
  }

  // Leader News sub-menu: /leader-news/[tier]/[view] or /leader-news/intelligence
  // tier: registered | verified | top | intelligence
  // view: news | pages | sector | all | signals | influence | briefs
  if (slugParts[0] === "leader-news" && slugParts.length >= 2) {
    if (slugParts[1] === "intelligence") {
      const validIntelViews = ["signals", "influence", "briefs", "all", "news"];
      const intelView = validIntelViews.includes(slugParts[2]) ? slugParts[2] : "signals";
      return (
        <NewsPOCLeaderNewsSubmenu
          tier="intelligence"
          view={intelView as any}
        />
      );
    }
    const validTiers = ["registered", "verified", "top"];
    const validViews = ["news", "pages", "sector", "all"];
    const leaderTier = validTiers.includes(slugParts[1]) ? slugParts[1] : "registered";
    const leaderView = validViews.includes(slugParts[2]) ? slugParts[2] : "news";
    return (
      <NewsPOCLeaderNewsSubmenu
        tier={leaderTier as "registered" | "verified" | "top"}
        view={leaderView as "news" | "pages" | "sector" | "all"}
      />
    );
  }

  if (isFeedPage) {
    if (categoryKey === "sector" && activeSub === "all") {
      return (
        <NewsPOCFullDiscoveryView
          initialCategory="All"
          onBack={() => {
            setActiveSub("my");
            router.push("/en/news-poc/feed/sector");
          }}
        />
      );
    }

    if (categoryKey === "industry" && activeSub === "all") {
      return (
        <NewsPOCAllIndustryView 
          onBack={() => {
            setActiveSub("my");
            router.push("/en/news-poc/feed/industry");
          }} 
        />
      );
    }

    if (categoryKey === "country" && activeSub === "all") {
      return (
        <NewsPOCAllCountryView 
          onBack={() => {
            setActiveSub("my");
            router.push("/en/news-poc/feed/country");
          }} 
        />
      );
    }

    if (categoryKey === "leader" && activeSub === "all") {
      return (
        <NewsPOCAllLeaderView 
          onBack={() => {
            setActiveSub("my");
            router.push("/en/news-poc/feed/leader");
          }} 
        />
      );
    }

    const handleLike = (id: string) => {
      setLikedList(likedList.includes(id) ? likedList.filter(i => i !== id) : [...likedList, id]);
    };

    const handleSave = (id: string) => {
      setSavedList(savedList.includes(id) ? savedList.filter(i => i !== id) : [...savedList, id]);
    };

    const handleShare = (id: string) => {
      if (typeof window !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(`${window.location.origin}/en/news-poc/article/${id}`);
      }
      setSharedArticleId(id);
      setTimeout(() => setSharedArticleId(null), 2500);
    };

    const handleAddComment = (id: string) => {
      if (!commentInput.trim()) return;
      setCommentsMap(prev => ({
        ...prev,
        [id]: [...(prev[id] || []), { author: "You", text: commentInput.trim(), time: "Just now" }]
      }));
      setCommentInput("");
    };

    const handleFollow = (id: string) => {
      setFollowedItems(followedItems.includes(id) ? followedItems.filter(i => i !== id) : [...followedItems, id]);
    };

    const articles = MOCK_CATEGORY_ARTICLES[categoryKey] || MOCK_CATEGORY_ARTICLES.sector;
    const reports = MOCK_REPORTS[categoryKey] || MOCK_REPORTS.sector;

    // Filter by search query & sector filter
    const filteredArticles = articles.filter(art => {
      const matchSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (art.sector && art.sector.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchSector = selectedSectorFilter === "all" || (art.sector && art.sector.includes(selectedSectorFilter));
      return matchSearch && matchSector;
    });

    return (
      <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-12 transition-colors duration-300">
        
        {/* Sub-Feed Submenu Header Selector */}
        <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-250 dark:border-gray-855 pb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.back()}
                className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:text-blue-500 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-505">
                  Feed Sub-Module
                </span>
                <h1 className="font-display text-xl font-bold leading-none mt-1">
                  {categoryName} Feed
                </h1>
              </div>
            </div>

            {/* Dynamic Sub-menu tabs (My | All | Intelligence) */}
            <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-950 p-1 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs">
              {[
                { key: "my", label: `My ${categoryName.split(" ")[0]}` },
                { key: "all", label: `All ${categoryName.split(" ")[0]}` },
                { key: "intelligence", label: `${categoryName.split(" ")[0]} Intelligence` }
              ].map((sub) => (
                <button
                  key={sub.key}
                  onClick={() => {
                    if (sub.key === "intelligence") {
                      if (categoryKey === "sector") {
                        router.push("/en/news-poc/sector-news/intelligence");
                        return;
                      }
                      if (categoryKey === "industry") {
                        router.push("/en/news-poc/sector-news/industry");
                        return;
                      }
                      if (categoryKey === "country") {
                        router.push("/en/news-poc/country-news/intelligence");
                        return;
                      }
                      if (categoryKey === "leader") {
                        router.push("/en/news-poc/leader-news/intelligence");
                        return;
                      }
                      if (categoryKey === "reader") {
                        router.push("/en/news-poc/my-news/intelligence");
                        return;
                      }
                    }
                    if (sub.key === "all") {
                      router.push(`/en/news-poc/feed/${categoryKey}/all`);
                      return;
                    }
                    if (sub.key === "my") {
                      router.push(`/en/news-poc/feed/${categoryKey}/my`);
                      return;
                    }
                    setActiveSub(sub.key);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeSub === sub.key
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-gray-655 dark:text-gray-350 hover:bg-gray-150 dark:hover:bg-gray-850"
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Sub-Feed Page Elements */}
        <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
          <div className="grid grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: Hero Brief, Personalized Feed (FIRST), then Trending Stories in Sector (SECOND) */}
            <div className="col-span-12 lg:col-span-8 space-y-8">
              
              {/* Component 1: Hero Banner with Featured Story */}
              {filteredArticles.length > 0 && (
                <div className="relative rounded-2xl overflow-hidden bg-slate-950 text-white min-h-[340px] flex flex-col justify-end p-8 border border-slate-900 shadow-sm group">
                  <div 
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-40 group-hover:scale-102 transition-transform duration-300"
                    style={{ backgroundImage: `url(${filteredArticles[0].image})` }}
                  />
                  <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded">
                        FEATURED BRIEF
                      </span>
                      <span className="bg-white/20 text-white text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                        {filteredArticles[0].sector}
                      </span>
                    </div>
                    <h2 className="font-display text-xl md:text-3xl font-bold leading-tight">
                      {filteredArticles[0].title}
                    </h2>
                    <p className="text-slate-300 text-xs md:text-sm font-normal max-w-2xl leading-relaxed">
                      {filteredArticles[0].excerpt}
                    </p>
                    <div className="pt-2 flex items-center gap-3">
                      <Link 
                        href={`/en/news-poc/article/${filteredArticles[0].id || "sec-1"}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors shadow-xs"
                      >
                        READ FULL BRIEFING
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Component 2: FIRST -> PERSONALIZED FEED AREA */}
              {activeSub === "my" && (
                <div className="space-y-6">
                  {/* Personalized Feed Header & Filters */}
                  <div className="bg-white dark:bg-[#0f172a] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                          <h2 className="font-display text-base font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                            Personalized Feed
                          </h2>
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-600 border border-blue-200 dark:border-blue-800">
                            Custom Stream
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Tailored live updates matching your tracked sectors, bilateral nodes, and trade interests.
                        </p>
                      </div>

                      {/* Local Search */}
                      <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Filter feed stories..."
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Sector Quick Filter Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                      <span className="text-[10px] font-bold text-gray-400 uppercase shrink-0">Filter:</span>
                      {[
                        { label: "All Followed", value: "all" },
                        { label: "Electronics (S16)", value: "S16" },
                        { label: "Agriculture (S01)", value: "S01" },
                        { label: "Energy (S17)", value: "S17" },
                        { label: "Semiconductors (S46)", value: "S46" },
                        { label: "Automotive (S45)", value: "S45" }
                      ].map((pill) => (
                        <button
                          key={pill.value}
                          onClick={() => setSelectedSectorFilter(pill.value)}
                          className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all shrink-0 ${
                            selectedSectorFilter === pill.value
                              ? "bg-blue-600 text-white shadow-xs"
                              : "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-blue-600"
                          }`}
                        >
                          {pill.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Personalized Feed Article Cards */}
                  <div className="space-y-4">
                    {filteredArticles.map((art) => {
                      const isLiked = likedList.includes(art.id);
                      const isSaved = savedList.includes(art.id);
                      const isShared = sharedArticleId === art.id;
                      const isCommentOpen = commentOpenId === art.id;
                      const articleComments = commentsMap[art.id] || [];

                      return (
                        <div 
                          key={art.id} 
                          className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-xs hover:border-blue-400 dark:hover:border-blue-500/50 transition-all space-y-4 group"
                        >
                          {/* Card Top Metadata Row */}
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[9px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-lg border border-blue-100 dark:border-blue-900/30">
                                {art.sector}
                              </span>
                              <span className="text-[9px] font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 px-2 py-0.5 rounded">
                                {art.country}
                              </span>
                              {art.impact && (
                                <span className="text-[8px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                                  {art.impact}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-gray-400 font-medium">
                              {art.date} · {art.readTime}
                            </span>
                          </div>

                          {/* Article Title & Excerpt */}
                          <div className="space-y-2">
                            <Link href={`/en/news-poc/article/${art.id}`} className="block">
                              <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors leading-snug">
                                {art.title}
                              </h3>
                            </Link>
                            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                              {art.excerpt}
                            </p>
                          </div>

                          {/* Author & Source Tag */}
                          <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                            <span className="font-semibold text-gray-700 dark:text-gray-300">
                              {art.author || "iGEN Trade Intelligence Desk"}
                            </span>
                            {art.ministry && (
                              <span className="text-[10px] text-gray-400 hidden sm:inline">
                                {art.ministry}
                              </span>
                            )}
                          </div>

                          {/* Interactive Action Bar (Like, Comment, Save, Share, Read) */}
                          <div className="pt-3 border-t border-gray-100 dark:border-gray-850 flex flex-wrap items-center justify-between gap-3 text-xs">
                            <div className="flex items-center gap-2 flex-wrap">
                              
                              {/* 1. LIKE BUTTON */}
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

                              {/* 2. COMMENT BUTTON */}
                              <button 
                                onClick={() => setCommentOpenId(isCommentOpen ? null : art.id)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                                  isCommentOpen
                                    ? "border-blue-200 dark:border-blue-900/40 bg-blue-50 dark:bg-blue-950/30 text-blue-600 font-bold"
                                    : "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-blue-600"
                                }`}
                              >
                                <MessageSquare className="h-3.5 w-3.5" />
                                <span>{art.comments + articleComments.length}</span>
                              </button>

                              {/* 3. SAVE ARTICLE BUTTON */}
                              <button 
                                onClick={() => handleSave(art.id)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                                  isSaved 
                                    ? "border-purple-200 dark:border-purple-900/40 bg-purple-50 dark:bg-purple-950/30 text-purple-600 font-bold" 
                                    : "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-purple-600"
                                }`}
                              >
                                <Bookmark className={`h-3.5 w-3.5 ${isSaved ? "fill-purple-600 text-purple-600" : ""}`} />
                                <span>{isSaved ? "Saved" : "Save Article"}</span>
                              </button>

                              {/* 4. SHARE BUTTON */}
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

                            {/* READ FULL LINK */}
                            <Link 
                              href={`/en/news-poc/article/${art.id}`} 
                              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 ml-auto"
                            >
                              Read Full Briefing <ChevronRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>

                          {/* Inline Comments Expansion Drawer */}
                          {isCommentOpen && (
                            <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-3 bg-gray-50/70 dark:bg-gray-900/40 -mx-5 -mb-5 p-5 rounded-b-2xl">
                              <h4 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                                <MessageSquare className="h-3.5 w-3.5 text-blue-500" />
                                Reader Comments ({art.comments + articleComments.length})
                              </h4>

                              {/* Existing comments */}
                              <div className="space-y-2 max-h-48 overflow-y-auto">
                                {articleComments.length === 0 ? (
                                  <p className="text-[11px] text-gray-400 italic">No community comments yet. Be the first to share your analysis!</p>
                                ) : (
                                  articleComments.map((c, cIdx) => (
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

                              {/* Post comment input */}
                              <div className="flex items-center gap-2 pt-1">
                                <input
                                  type="text"
                                  value={commentInput}
                                  onChange={(e) => setCommentInput(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") handleAddComment(art.id);
                                  }}
                                  placeholder="Write a comment or industry takeaway..."
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
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Component 3: SECOND -> TRENDING STORIES IN SECTOR (FOR 'MY' TAB) */}
              {activeSub === "my" && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                    <h3 className="font-display text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <TrendingUp className="h-4.5 w-4.5 text-blue-500" />
                      Trending Stories in {categoryName}
                    </h3>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                      High Velocity
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {articles.slice(1).map((art, idx) => (
                      <Link 
                        key={idx} 
                        href={`/en/news-poc/article/${art.id || "sec-1"}`} 
                        className="bg-white dark:bg-[#0f172a] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 p-5 flex flex-col justify-between shadow-xs hover:shadow-sm hover:border-blue-500 transition-all group block space-y-3"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="inline-block px-2.5 py-0.5 rounded text-[8px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/20">
                              {art.sector}
                            </span>
                            <span className="text-[9px] font-bold text-emerald-500">
                              #{idx + 1} Trending
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors leading-snug">
                            {art.title}
                          </h4>
                          <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                            {art.excerpt}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-gray-100 dark:border-gray-850 flex items-center justify-between text-[10px] text-gray-400">
                          <span>{art.date} • {art.readTime}</span>
                          <span className="text-blue-600 font-bold group-hover:underline flex items-center gap-0.5">
                            Read Brief →
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* View when activeSub === "all" -> ALL SECTORS TAB */}
              {activeSub === "all" && (
                <div className="space-y-10">
                  
                  {/* 1. LATEST SECTOR NEWS FEED FOR ALL SECTORS */}
                  <div className="space-y-6">
                    {/* Header & Category Filter Bar */}
                    <div className="bg-white dark:bg-[#0f172a] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-ping" />
                            <h2 className="font-display text-lg md:text-xl font-bold uppercase tracking-wide text-gray-900 dark:text-white">
                              Latest Sector News Feed
                            </h2>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                              All 20 Sectors
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Comprehensive real-time coverage across all major industrial corridors, policy updates, and bilateral commerce nodes.
                          </p>
                        </div>

                        {/* Local Search */}
                        <div className="relative w-full sm:w-64">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search all sector stories..."
                            className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      {/* Sector Filter Chips */}
                      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                        <span className="text-[10px] font-bold text-gray-400 uppercase shrink-0">Sectors:</span>
                        {[
                          { label: "All Sectors (20)", value: "all" },
                          { label: "Electronics & IT (S16)", value: "S16" },
                          { label: "Agriculture (S01)", value: "S01" },
                          { label: "Energy & Renewables (S17)", value: "S17" },
                          { label: "Automotive & EV (S45)", value: "S45" },
                          { label: "Pharma & Healthcare (S08)", value: "S08" },
                          { label: "Defence & Aerospace (S07)", value: "S07" },
                          { label: "FinTech & Payments (S42)", value: "S42" }
                        ].map((pill) => (
                          <button
                            key={pill.value}
                            onClick={() => setSelectedSectorFilter(pill.value)}
                            className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all shrink-0 ${
                              selectedSectorFilter === pill.value
                                ? "bg-blue-600 text-white shadow-xs"
                                : "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-blue-600 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                            }`}
                          >
                            {pill.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Rich Large Article Cards Grid */}
                    <div className="space-y-6">
                      {[
                        {
                          id: "sec-all-1",
                          title: "Semiconductor OSAT Packaging & High-Density Substrate Manufacturing Accelerates",
                          excerpt: "Advanced packaging facilities in Tamil Nadu and Gujarat achieve commercial test benchmarks, reducing dependence on East Asian test houses by 35% in Q1.",
                          sector: "Electronics & IT (S16)",
                          ministry: "India Semiconductor Mission",
                          author: "Arun Kulkarni · Tech Hardware",
                          country: "India-Taiwan Bilateral",
                          readTime: "5 min read",
                          date: "12m ago",
                          likes: 284,
                          comments: 18,
                          impact: "+38.2% YoY Output",
                          isPremium: false,
                          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80"
                        },
                        {
                          id: "sec-all-2",
                          title: "Kisan Drone Subsidies & Precision Agriculture Infrastructure Scaled to 2,500 FPOs",
                          excerpt: "Ministry of Agriculture introduces direct capital grants to deploy indigenous unmanned flight hardware for rural farming societies, optimizing pesticide and water utilization.",
                          sector: "Agriculture & AgriTech (S01)",
                          ministry: "Ministry of Agriculture & Farmers Welfare",
                          author: "Dr. Ramesh Nair · Agri Policy",
                          country: "Domestic Trade",
                          readTime: "6 min read",
                          date: "45m ago",
                          likes: 195,
                          comments: 14,
                          impact: "+21.4% Crop Yield",
                          isPremium: true,
                          image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&auto=format&fit=crop&q=80"
                        },
                        {
                          id: "sec-all-3",
                          title: "Green Hydrogen Grid: Cabinet Approves €2.4B Interconnectivity Pipeline with European Ports",
                          excerpt: "Renewable energy sector welcomes mega offshore grid interconnectivity funding to secure remote solar and wind farms into national power corridors for direct maritime hydrogen exports.",
                          sector: "Energy & Sustainability (S17)",
                          ministry: "Ministry of New & Renewable Energy",
                          author: "Vikram Sengupta · Energy Lead",
                          country: "India-Germany Bilateral",
                          readTime: "8 min read",
                          date: "2 hrs ago",
                          likes: 412,
                          comments: 31,
                          impact: "€2.4B Pipeline",
                          isPremium: false,
                          image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop&q=80"
                        },
                        {
                          id: "sec-all-4",
                          title: "Commercial EV Interoperability: Heavy Duty Battery-Swapping Standard Adopted for 80 Freight Corridors",
                          excerpt: "Standardized high-voltage battery-swapping architecture across national logistics highways cuts heavy commercial fleet turnaround times by 45%.",
                          sector: "Automotive & EV (S45)",
                          ministry: "Ministry of Heavy Industries",
                          author: "Sunita Rao · Auto Logistics",
                          country: "Domestic & SEA",
                          readTime: "4 min read",
                          date: "4 hrs ago",
                          likes: 230,
                          comments: 16,
                          impact: "+45% Turnaround",
                          isPremium: false,
                          image: "https://images.unsplash.com/photo-1558441719-8b89ec691456?w=800&auto=format&fit=crop&q=80"
                        },
                        {
                          id: "sec-all-5",
                          title: "API Sovereignty Milestone: India Synthesizes 68% of Essential Bulk Drugs Domestically",
                          excerpt: "Production Linked Incentive schemes yield massive breakthroughs in fermentation plants, drastically reducing import exposure on key active pharmaceutical ingredients.",
                          sector: "Healthcare & Pharmaceuticals (S08)",
                          ministry: "Department of Pharmaceuticals",
                          author: "Dr. Ananya Sen · Pharma Sourcing",
                          country: "Global Corridors",
                          readTime: "5 min read",
                          date: "6 hrs ago",
                          likes: 310,
                          comments: 22,
                          impact: "68% Domestic Share",
                          isPremium: true,
                          image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80"
                        },
                        {
                          id: "sec-all-6",
                          title: "Autonomous Border Defence & UAV Avionics Production Clears Rapid Export Guidelines",
                          excerpt: "Indigenously engineered radar guidance units and UAV airframes receive tri-service operational clearance with overseas sales pipelines for friendly partner nations.",
                          sector: "Aerospace & Defence (S07)",
                          ministry: "Ministry of Defence",
                          author: "Col. Rajesh Verma · Defence Analyst",
                          country: "Domestic & Global",
                          readTime: "7 min read",
                          date: "8 hrs ago",
                          likes: 350,
                          comments: 29,
                          impact: "+54.0% Exports",
                          isPremium: false,
                          image: "https://images.unsplash.com/photo-1517976487588-46c8209ebfa5?w=800&auto=format&fit=crop&q=80"
                        }
                      ].filter(art => {
                        const matchSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.sector.toLowerCase().includes(searchQuery.toLowerCase());
                        const matchSector = selectedSectorFilter === "all" || art.sector.includes(selectedSectorFilter);
                        return matchSearch && matchSector;
                      }).map((art) => {
                        const isLiked = likedList.includes(art.id);
                        const isSaved = savedList.includes(art.id);
                        const isShared = sharedArticleId === art.id;
                        const isCommentOpen = commentOpenId === art.id;
                        const articleComments = commentsMap[art.id] || [];

                        return (
                          <div 
                            key={art.id} 
                            className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs hover:border-blue-400 dark:hover:border-blue-500/50 transition-all flex flex-col md:flex-row group"
                          >
                            {/* Article Image (Left / Top) */}
                            <div className="md:w-72 md:shrink-0 relative overflow-hidden bg-slate-900 min-h-[220px] md:min-h-full">
                              <img 
                                src={art.image} 
                                alt={art.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
                              <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded">
                                {art.sector.split("(")[0]}
                              </span>
                            </div>

                            {/* Article Body Content (Right) */}
                            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                              <div className="space-y-2.5">
                                {/* Top Tags */}
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-[9px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-lg border border-blue-100 dark:border-blue-900/30">
                                      {art.sector}
                                    </span>
                                    <span className="text-[9px] font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 px-2 py-0.5 rounded">
                                      {art.country}
                                    </span>
                                    {art.impact && (
                                      <span className="text-[8px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                                        {art.impact}
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[10px] text-gray-400 font-medium">
                                    {art.date} · {art.readTime}
                                  </span>
                                </div>

                                {/* Title */}
                                <Link href={`/en/news-poc/article/${art.id}`} className="block">
                                  <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors leading-snug">
                                    {art.title}
                                  </h3>
                                </Link>

                                {/* Excerpt */}
                                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                                  {art.excerpt}
                                </p>
                              </div>

                              {/* Author & Ministry */}
                              <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                                <span className="font-semibold text-gray-700 dark:text-gray-300">
                                  {art.author}
                                </span>
                                <span className="text-[10px] text-gray-400 hidden sm:inline">
                                  {art.ministry}
                                </span>
                              </div>

                              {/* Interactive Action Bar (Like, Comment, Save, Share, Read Full) */}
                              <div className="pt-3 border-t border-gray-100 dark:border-gray-850 flex flex-wrap items-center justify-between gap-3 text-xs">
                                <div className="flex items-center gap-2 flex-wrap">
                                  
                                  {/* 1. LIKE BUTTON */}
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

                                  {/* 2. COMMENT BUTTON */}
                                  <button 
                                    onClick={() => setCommentOpenId(isCommentOpen ? null : art.id)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                                      isCommentOpen
                                        ? "border-blue-200 dark:border-blue-900/40 bg-blue-50 dark:bg-blue-950/30 text-blue-600 font-bold"
                                        : "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-blue-600"
                                    }`}
                                  >
                                    <MessageSquare className="h-3.5 w-3.5" />
                                    <span>{art.comments + articleComments.length}</span>
                                  </button>

                                  {/* 3. SAVE ARTICLE BUTTON */}
                                  <button 
                                    onClick={() => handleSave(art.id)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                                      isSaved 
                                        ? "border-purple-200 dark:border-purple-900/40 bg-purple-50 dark:bg-purple-950/30 text-purple-600 font-bold" 
                                        : "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-purple-600"
                                    }`}
                                  >
                                    <Bookmark className={`h-3.5 w-3.5 ${isSaved ? "fill-purple-600 text-purple-600" : ""}`} />
                                    <span>{isSaved ? "Saved" : "Save Article"}</span>
                                  </button>

                                  {/* 4. SHARE BUTTON */}
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

                                {/* 5. READ FULL ARTICLE */}
                                <Link 
                                  href={`/en/news-poc/article/${art.id}`} 
                                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 ml-auto"
                                >
                                  Read Full Article <ChevronRight className="h-3.5 w-3.5" />
                                </Link>
                              </div>

                              {/* Inline Comments Expansion Drawer */}
                              {isCommentOpen && (
                                <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-3 bg-gray-50/70 dark:bg-gray-900/40 -mx-6 -mb-6 p-6 rounded-b-2xl">
                                  <h4 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                                    <MessageSquare className="h-3.5 w-3.5 text-blue-500" />
                                    Reader & Analyst Comments ({art.comments + articleComments.length})
                                  </h4>

                                  {/* Existing comments */}
                                  <div className="space-y-2 max-h-48 overflow-y-auto">
                                    {articleComments.length === 0 ? (
                                      <p className="text-[11px] text-gray-400 italic">No community comments yet. Be the first to share your analysis!</p>
                                    ) : (
                                      articleComments.map((c, cIdx) => (
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

                                  {/* Post comment input */}
                                  <div className="flex items-center gap-2 pt-1">
                                    <input
                                      type="text"
                                      value={commentInput}
                                      onChange={(e) => setCommentInput(e.target.value)}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") handleAddComment(art.id);
                                      }}
                                      placeholder="Write an industry analysis or perspective..."
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
                  </div>

                  {/* 2. TRENDING STORIES IN ALL SECTORS */}
                  <div className="space-y-5 pt-4">
                    <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
                      <div>
                        <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-blue-500" />
                          Trending Stories in All Sectors
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          High-momentum industrial intelligence with the highest cross-sector readership this week.
                        </p>
                      </div>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-900/40">
                        ⚡ High Velocity Radar
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {[
                        {
                          id: "sec-all-trend-1",
                          title: "Critical Mineral Exploration: 12 Rare Earth Blocks Auctioned for Cell Giga-Factories",
                          excerpt: "Domestic lithium, cobalt, and nickel extraction reserves open to private investment consortiums to secure clean mobility supply lines.",
                          sector: "Mining & Rare Minerals (S25)",
                          date: "1 hr ago",
                          readTime: "4 min read",
                          views: "14.2k reads",
                          velocity: "+48% spike",
                          rank: "#1"
                        },
                        {
                          id: "sec-all-trend-2",
                          title: "Digital Public Infrastructure: Cross-Border UPI APIs Scaled to 14 Global Maritime Gateways",
                          excerpt: "Automated port duty and customs settlement rails via UPI go live in Singapore, UAE, and European logistics clusters.",
                          sector: "FinTech & Payments (S42)",
                          date: "3 hrs ago",
                          readTime: "5 min read",
                          views: "11.8k reads",
                          velocity: "+34% spike",
                          rank: "#2"
                        },
                        {
                          id: "sec-all-trend-3",
                          title: "Cold Chain Freight Logistics: 40 Multi-Modal Refrigerated Terminals Operational",
                          excerpt: "Dedicated perishable freight corridors slash transit spoilage rates for fresh horticulture and seafood exports to the Gulf.",
                          sector: "Logistics & Supply Chain (S43)",
                          date: "5 hrs ago",
                          readTime: "6 min read",
                          views: "9.5k reads",
                          velocity: "+29% spike",
                          rank: "#3"
                        },
                        {
                          id: "sec-all-trend-4",
                          title: "Textile Technical Fabrics: High-Performance Geo-Textile Production Surges 32%",
                          excerpt: "Export orders for advanced industrial polymers and infrastructural fabrics expand across North American highway construction projects.",
                          sector: "Textiles & Apparel (S04)",
                          date: "7 hrs ago",
                          readTime: "4 min read",
                          views: "8.1k reads",
                          velocity: "+22% spike",
                          rank: "#4"
                        }
                      ].map((trendArt, tIdx) => (
                        <Link
                          key={tIdx}
                          href={`/en/news-poc/article/${trendArt.id}`}
                          className="bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col justify-between shadow-xs hover:border-blue-500 hover:shadow-md transition-all group space-y-4"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="inline-block px-2.5 py-0.5 rounded text-[8px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/20">
                                {trendArt.sector}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded">
                                  {trendArt.velocity}
                                </span>
                                <span className="text-[10px] font-bold text-amber-500">
                                  {trendArt.rank} Trending
                                </span>
                              </div>
                            </div>
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors leading-snug">
                              {trendArt.title}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
                              {trendArt.excerpt}
                            </p>
                          </div>
                          <div className="pt-3 border-t border-gray-100 dark:border-gray-850 flex items-center justify-between text-[11px] text-gray-400">
                            <span>{trendArt.date} · {trendArt.readTime} · <strong className="text-gray-700 dark:text-gray-300">{trendArt.views}</strong></span>
                            <span className="text-blue-600 font-bold group-hover:underline flex items-center gap-0.5 text-xs">
                              Read Brief →
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* 3. ALL SECTOR CHANNELS DIRECTORIES */}
                  <div className="space-y-5 pt-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 dark:border-gray-800 pb-4">
                      <div>
                        <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                          <Globe className="h-5 w-5 text-blue-500" />
                          All Sector Channels Directory
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Follow dedicated real-time feeds for each of the 20 strategic national sectors.
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-gray-400">
                        Showing {SECTORS_LIST.length} Active Channels
                      </span>
                    </div>

                    {/* Follow Channels Directory Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(() => {
                        let activeList: any[] = SECTORS_LIST;
                        let searchField3 = "ministry";

                        if (categoryKey === "industry") {
                          activeList = INDUSTRIES_LIST;
                          searchField3 = "sector";
                        } else if (categoryKey === "country") {
                          activeList = COUNTRIES_LIST;
                          searchField3 = "region";
                        } else if (categoryKey === "leader") {
                          activeList = LEADERS_LIST;
                          searchField3 = "designation";
                        } else if (categoryKey === "reader") {
                          activeList = READERS_LIST;
                          searchField3 = "group";
                        }

                        return activeList.filter(item => 
                          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item[searchField3] && item[searchField3].toLowerCase().includes(searchQuery.toLowerCase()))
                        ).map((item: any) => {
                          const isFollowed = followedItems.includes(item.code);
                          return (
                            <div key={item.code} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-2xl flex items-center justify-between shadow-xs hover:border-blue-500/40 transition-all">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-[9px] font-mono text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/40 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-900/40">
                                    {item.code}
                                  </span>
                                  <span className="text-xs font-bold text-gray-900 dark:text-white">
                                    {item.name}
                                  </span>
                                </div>
                                <span className="block text-[10px] text-gray-400 truncate max-w-[220px]">
                                  {item[searchField3] || ""}
                                </span>
                                <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                                  ⚡ {item.feed || "Active intelligence feed streaming."}
                                </span>
                              </div>
                              <button
                                onClick={() => handleFollow(item.code)}
                                className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all flex-shrink-0 shadow-xs ${
                                  isFollowed
                                    ? "bg-emerald-50 border border-emerald-300 text-emerald-700 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-300"
                                    : "bg-gray-900 text-white dark:bg-white dark:text-gray-950 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white"
                                }`}
                              >
                                {isFollowed ? "✓ Following" : "Follow"}
                              </button>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>

                </div>
              )}

                {activeSub === "intelligence" && (
  categoryKey === "country" ? (
    <div className="space-y-8 col-span-12">
      
      {/* Hero Section (India-UAE Trade Corridor) */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-950 text-white min-h-[380px] flex flex-col justify-end p-8 border border-slate-900 shadow-sm group">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30 group-hover:scale-102 transition-transform duration-300"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1000&auto=format&fit=crop&q=80')` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        
        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="flex items-center gap-2">
            <span className="bg-[#E63946] text-white text-[9px] font-bold px-2 py-0.5 rounded">
              FEATURED REPORT
            </span>
            <span className="text-[10px] text-slate-300 font-semibold flex items-center gap-1">
              <Clock className="h-3 w-3" /> Updated 2 hrs ago
            </span>
          </div>

          <h2 className="font-display text-2xl md:text-4xl font-bold leading-tight text-[#FEC970]">
            India–UAE Trade Corridor Expands as Logistics Investments Cross $12 Billion
          </h2>
          
          <p className="text-slate-300 text-xs md:text-sm font-normal max-w-3xl leading-relaxed">
            Bilateral non-oil trade targets $100B by 2030, driven by comprehensive economic partnership agreements and major infrastructure commitments across critical ports.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-6 border-t border-white/10 pt-4 text-xs font-semibold text-slate-300">
            <div>
              <span className="block text-[8px] text-gray-400 uppercase">Growth (YoY)</span>
              <span className="text-sm font-bold text-emerald-400">+18.4%</span>
            </div>
            <div>
              <span className="block text-[8px] text-gray-400 uppercase">Corridor Value</span>
              <span className="text-sm font-bold text-white">$87.2B</span>
            </div>
            <div>
              <span className="block text-[8px] text-gray-400 uppercase">Opportunity Score</span>
              <span className="text-sm font-bold text-[#F4A024]">92/100</span>
            </div>
            <div className="ml-auto">
              <Link href="/en/news-poc/article/sec-1" className="bg-white text-gray-950 hover:bg-gray-100 font-bold px-5 py-2.5 rounded-lg transition-colors flex items-center gap-1.5 text-[10px]">
                READ FULL ANALYSIS <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Second Fold 3-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sub-column: Momentum, Queries, Alert */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-4 rounded-xl shadow-xs">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-3">Sector Momentum</span>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between font-semibold">
                <span>EV & Energy Storage</span>
                <span className="text-emerald-500 font-bold">+8.4%</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Semiconductors</span>
                <span className="text-emerald-500 font-bold">+6.2%</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Agricultural Tech</span>
                <span className="text-emerald-500 font-bold">+3.1%</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Textiles & Apparel</span>
                <span className="text-red-500 font-bold">-2.4%</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0f172a] border border-gray-255 dark:border-gray-850 p-4 rounded-xl shadow-xs space-y-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase block mb-2">Intelligence Queries</span>
            <div className="flex flex-wrap gap-1.5">
              {["Lithium +24%", "Red Sea +18%", "Tariffs -12%", "Copper -5%"].map((q, idx) => (
                <span key={idx} className="bg-gray-50 dark:bg-gray-955 border border-gray-200 dark:border-gray-855 px-2 py-0.5 rounded text-[9px] font-semibold">
                  {q}
                </span>
              ))}
            </div>
          </div>

          <div className="border border-red-200 dark:border-red-955/40 bg-red-50/50 dark:bg-red-950/10 p-4 rounded-xl space-y-2">
            <h4 className="font-bold text-xs text-red-655 flex items-center gap-1">
              <ShieldAlert className="h-4 w-4" /> AI INTELLIGENCE ALERT
            </h4>
            <p className="text-[11px] text-red-600 dark:text-red-400 leading-relaxed font-normal">
              Elevated risk detected: Black Sea port operations show 34% disruption in standard grain export volumes over the last 72 hours.
            </p>
          </div>
        </div>

        {/* Center Column: Market Intelligence, Rankings */}
        <div className="lg:col-span-9 space-y-6">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-800 p-5 rounded-xl shadow-xs space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-855 pb-2">
              <h4 className="text-xs font-bold text-gray-900 dark:text-white">India Market Intelligence</h4>
              <button className="text-[10px] font-bold text-blue-500 hover:underline">FULL DASHBOARD</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-955 rounded-lg">
                <span className="text-[9px] font-bold text-gray-400 uppercase">Total Exports (YTD)</span>
                <span className="block text-base font-bold text-gray-900 dark:text-white mt-1">$782.4B</span>
                <span className="text-[9px] text-emerald-500 font-bold block mt-0.5">▲ 12.3% YoY</span>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-955 rounded-lg">
                <span className="text-[9px] font-bold text-gray-400 uppercase">FDI Inflows</span>
                <span className="block text-base font-bold text-gray-900 dark:text-white mt-1">$48.1B</span>
                <span className="text-[9px] text-emerald-500 font-bold block mt-0.5">▲ 8.7% YoY</span>
              </div>
            </div>

            {/* Sankey Lock Block */}
            <div className="p-4 bg-gray-50 dark:bg-gray-955 rounded-lg border border-dashed border-gray-300 dark:border-gray-800 text-center space-y-2">
              <span className="text-[9px] font-bold text-gray-400 uppercase block">SEMICONDUCTOR FLOW VISUALIZATION</span>
              <p className="text-[10px] text-gray-500">Interactive Sankey diagram flows require a Pro Reader subscription.</p>
              <Link href="/eoi" className="text-[9px] text-blue-500 font-bold hover:underline block">Unlock Visualizer</Link>
            </div>
          </div>

          {/* Emerging Market Rankings */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-255 dark:border-gray-800 p-5 rounded-xl shadow-xs space-y-3">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-855 pb-2">
              <h4 className="text-xs font-bold text-gray-955 dark:text-white">Emerging Market Rankings</h4>
              <button className="text-[10px] font-bold text-blue-500 hover:underline">VIEW ALL</button>
            </div>
            <table className="w-full text-left text-[11px] border-collapse">
              <thead>
                <tr className="text-gray-450 border-b border-gray-100 dark:border-gray-855 font-bold">
                  <th className="pb-2">MARKET</th>
                  <th className="pb-2">OPP SCORE</th>
                  <th className="pb-2">GROWTH EST.</th>
                  <th className="pb-2">RISK INDEX</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50 dark:border-gray-880">
                  <td className="py-2 font-bold">Vietnam</td>
                  <td className="py-2">88</td>
                  <td className="py-2 text-emerald-500 font-bold">+6.5%</td>
                  <td className="py-2 text-emerald-500 font-bold">Low</td>
                </tr>
                <tr className="border-b border-gray-50 dark:border-gray-880">
                  <td className="py-2 font-bold">India</td>
                  <td className="py-2">85</td>
                  <td className="py-2 text-emerald-500 font-bold">+6.1%</td>
                  <td className="py-2 text-amber-500 font-bold">Med</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Third Fold: Feature Briefing */}
      <div className="bg-white dark:bg-[#0f172a] border border-gray-255 dark:border-gray-800 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1 space-y-3">
          <span className="text-[9px] font-bold text-blue-500 uppercase tracking-wider block">FEATURE BRIEFING</span>
          <h3 className="font-display text-lg md:text-xl font-bold">India Emerges as Asia's Fastest Growing Strategic Export Hub</h3>
          <p className="text-xs text-gray-600 dark:text-gray-455 leading-relaxed font-normal">
            Driven by the "China Plus One" strategy and robust domestic manufacturing incentives, India's electronics and pharmaceutical export volumes have surged.
          </p>
          <div className="flex gap-2.5 pt-2">
            <Link href="/eoi" className="bg-[#E63946] text-white font-bold text-[10px] px-4 py-2 rounded">
              Read Executive Summary
            </Link>
            <button className="border border-gray-300 text-gray-750 dark:border-gray-700 dark:text-gray-300 font-bold text-[10px] px-4 py-2 rounded">
              Download Datapack
            </button>
          </div>
        </div>
        
        <div className="w-full md:w-56 p-4 bg-gradient-to-br from-[#1a0f0a] to-slate-950 text-white rounded-xl border border-gray-800 text-center">
          <span className="text-[8px] text-gray-400 block uppercase">Export Volume</span>
          <span className="text-2xl font-bold text-[#F4A024] block mt-1">$42.8B</span>
          <span className="text-[9px] text-emerald-400 block font-bold mt-1">▲ +24% YoY</span>
        </div>
      </div>

      {/* Fourth Fold: Predictive Intelligence signals */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-850 pb-2">
          <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white">Predictive Intelligence</h3>
          <span className="bg-emerald-500/10 text-emerald-600 text-[8px] font-bold px-2 py-0.5 rounded font-mono">Model V4 Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Green Hydrogen Logistics", sig: "SIGNAL: HIGH CONFIDENCE", desc: "Infrastructure scaling in MENA region expected to reduce European landed costs by 12% by 2026.", w: "80%" },
            { name: "Semiconductor Reshoring", sig: "SIGNAL: EMERGING", desc: "Capital expenditure shifts indicate accelerated timeline for US-based fabs reaching volume production.", w: "50%" },
            { name: "Critical Minerals Bottleneck", sig: "SIGNAL: MODERATE RISK", desc: "Export licensing delays in South America posing near-term constraint on EV battery supply chains.", w: "65%" }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-955 text-white border border-slate-900 p-4 rounded-xl flex flex-col justify-between min-h-[140px]">
              <div>
                <span className="text-[8px] font-bold text-blue-400 block uppercase">{item.sig}</span>
                <h4 className="text-xs font-bold mt-1">{item.name}</h4>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mt-3">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: item.w }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fifth Fold: Container Port news section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
        
        {/* Container Port main news (col-span-8) */}
        <div className="lg:col-span-8 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden p-6 shadow-xs group">
          <div className="h-56 w-full overflow-hidden rounded-xl relative mb-4">
            <img 
              src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&auto=format&fit=crop&q=80" 
              alt="Container Port"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            />
            <span className="absolute top-3 left-3 bg-[#E63946] text-white text-[9px] font-bold px-2 py-0.5 rounded">BREAKING REPORT</span>
          </div>
          
          <h4 className="text-sm md:text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
            India-UAE trade volume rises 18% amid logistics expansion
          </h4>
          <p className="text-xs text-gray-655 dark:text-gray-405 mt-2 leading-relaxed font-normal">
            Bilateral trade between India and the United Arab Emirates has seen an unprecedented surge following the implementation of the CEPA agreement. Logistics corridors expanding through key maritime routes have reduced transit times by an average of 48 hours.
          </p>
          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-850 flex items-center justify-between text-[11px] text-gray-500">
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1 hover:text-red-500"><ThumbsUp className="h-3.5 w-3.5" /> 314</button>
              <button className="flex items-center gap-1 hover:text-blue-505"><MessageCircle className="h-3.5 w-3.5" /> 42</button>
            </div>
            <Link href="/eoi" className="text-blue-500 hover:underline font-bold flex items-center gap-0.5">
              Export PDF Brief <Download className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Right sidebar metrics widget (col-span-4) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Fastest growing markets */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-255 dark:border-gray-800 p-4 rounded-xl shadow-xs">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Fastest Growing Markets</span>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between font-semibold">
                <span>Vietnam</span>
                <span className="text-emerald-500 font-bold">+8.4%</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Mexico</span>
                <span className="text-emerald-500 font-bold">+6.2%</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Indonesia</span>
                <span className="text-emerald-500 font-bold">+5.9%</span>
              </div>
            </div>
          </div>

          {/* Trade Risk Alerts */}
          <div className="bg-slate-955 text-white border border-slate-900 p-4 rounded-xl space-y-3">
            <span className="text-[9px] font-bold text-red-400 uppercase tracking-wider block">⚠️ Trade Risk Alerts</span>
            <div className="text-[10px] space-y-2">
              <div className="border-b border-slate-900 pb-1">
                <span className="font-bold text-amber-500 block">RED SEA CORRIDOR</span>
                <p className="text-slate-450 leading-relaxed">Shipping premiums rise 12% amid sustained rerouting protocol.</p>
              </div>
              <div>
                <span className="font-bold text-red-500 block">EUROPEAN UNION</span>
                <p className="text-slate-450 leading-relaxed">New CBAM compliance deadlines approaching for heavy industry.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Sixth Fold: Leadership Signals */}
      <div className="space-y-4 pt-4">
        <h4 className="font-display text-sm font-bold text-gray-900 dark:text-white">Leadership Signals</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Jonathan Hayes", des: "Minister of Trade, UK", text: "We are finalizing the framework for the digital trade corridor, expecting a 30% reduction in customs processing overhead by Q3.", status: "Positive", col: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20" },
            { name: "Sarah Lin", des: "CEO, Pacific Logistics Group", text: "Capacity constraints at major west coast ports remain a structural issue. We advise clients to diversify entry points through secondary hubs.", status: "Neutral / Cautious", col: "text-amber-500 bg-amber-50 dark:bg-amber-955/20" },
            { name: "Carlos Mendoza", des: "Head of Commodities, Banco Sur", text: "Agricultural export tariffs introduced overnight will severely impact Q2 forecasts. Immediate recalculation of margin models is required.", status: "Negative Risk", col: "text-red-500 bg-red-50 dark:bg-red-955/20" }
          ].map((sig, idx) => (
            <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-255 dark:border-gray-800 p-5 rounded-xl flex flex-col justify-between shadow-xs">
              <div className="space-y-2">
                <div className="flex gap-3 items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-950 flex items-center justify-center font-bold text-xs uppercase">
                    {sig.name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-gray-955 dark:text-white block text-xs">{sig.name}</span>
                    <span className="text-[9px] text-gray-400 block">{sig.des}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed font-normal italic">
                  "{sig.text}"
                </p>
              </div>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-sm block text-center mt-4 ${sig.col}`}>
                {sig.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Seventh Fold: Corridors & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        
        {/* Corridor momentum left widget (col-span-3) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-255 dark:border-gray-800 p-4 rounded-xl shadow-xs">
            <span className="text-[9px] font-bold text-gray-400 uppercase block mb-3">Trade Momentum</span>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>APAC</span>
                <span className="text-emerald-500 font-bold">+4.2%</span>
              </div>
              <div className="flex justify-between">
                <span>EMEA</span>
                <span className="text-red-500 font-bold">-1.1%</span>
              </div>
              <div className="flex justify-between">
                <span>AMER</span>
                <span className="text-emerald-500 font-bold">+2.8%</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0f172a] border border-gray-255 dark:border-gray-800 p-4 rounded-xl shadow-xs space-y-2">
            <span className="text-[9px] font-bold text-gray-400 uppercase block mb-1">AI Signals</span>
            <div className="text-[10px] space-y-1 text-gray-500 font-normal">
              <p>⚡ <strong>Supply Chain:</strong> Red Sea routing delays affecting EU-Asia lane.</p>
            </div>
          </div>
        </div>

        {/* Center corridor comparison & table (col-span-6) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-xl shadow-xs space-y-3">
            <span className="text-[10px] font-bold text-gray-455 uppercase block border-b border-gray-100 dark:border-gray-850 pb-2">Strategic Corridors</span>
            
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-950 p-2.5 rounded-lg">
                <div>
                  <span className="font-bold text-gray-900 dark:text-white">India ⇄ UAE</span>
                  <span className="text-[9px] font-mono text-gray-400 block mt-0.5">Primary Axis · CEPA Active</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-950 dark:text-white block">$85B</span>
                  <span className="text-[9px] text-emerald-500 font-bold block mt-0.5">▲ +14%</span>
                </div>
              </div>
              <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-955 p-2.5 rounded-lg">
                <div>
                  <span className="font-bold text-gray-900 dark:text-white">USA ⇄ Vietnam</span>
                  <span className="text-[9px] font-mono text-gray-400 block mt-0.5">Tech Axis · Accelerating</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-955 dark:text-white block">$124B</span>
                  <span className="text-[9px] text-emerald-500 font-bold block mt-0.5">▲ +18%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs">
            <div className="p-4 border-b border-gray-100 dark:border-gray-855 flex justify-between items-center">
              <h5 className="font-bold text-xs text-gray-950 dark:text-white">Market Performance Index</h5>
            </div>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-955 border-b border-gray-100 dark:border-gray-855 text-gray-500 font-bold">
                  <th className="p-3">MARKET</th>
                  <th className="p-3">EXPORT VOL</th>
                  <th className="p-3">GROWTH</th>
                  <th className="p-3">RISK</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50 dark:border-gray-880">
                  <td className="p-3 font-bold">India</td>
                  <td className="p-3 font-mono">$112.4B</td>
                  <td className="p-3 text-emerald-500 font-bold">+8.2%</td>
                  <td className="p-3 font-bold text-emerald-500">LOW</td>
                </tr>
                <tr className="border-b border-gray-50 dark:border-gray-880">
                  <td className="p-3 font-bold">Vietnam</td>
                  <td className="p-3 font-mono">$94.8B</td>
                  <td className="p-3 text-emerald-500 font-bold">+11.5%</td>
                  <td className="p-3 font-bold text-amber-500">MODERATE</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Enterprise license upgrade right widget (col-span-3) */}
        <div className="lg:col-span-3 bg-gradient-to-br from-[#0c1424] to-[#162136] border border-slate-800 text-white p-5 rounded-2xl shadow-xs space-y-3">
          <span className="text-[9px] font-bold text-[#FEC970] uppercase">Enterprise Intel</span>
          <h4 className="font-display text-xs font-bold text-white leading-snug">Unlock Real-Time Port Data</h4>
          <p className="text-[10px] text-slate-355 leading-relaxed">
            Access live shipping container delays, custom API databases, and terminal alerts.
          </p>
          <Link href="/eoi" className="block text-center bg-[#F4A024] hover:bg-[#C47F1A] text-gray-950 font-bold text-xs py-2 rounded transition-colors">
            Upgrade Access
          </Link>
        </div>
      </div>

    </div>
  ) : categoryKey === "leader" ? (
    <div className="space-y-8 col-span-12">
      
      {/* Refine Intelligence Filter Bar */}
      <div className="bg-slate-950 text-white p-3 rounded-xl border border-slate-900 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-bold text-slate-400">Refine Intelligence:</span>
        <div className="flex flex-wrap gap-2">
          <button className="bg-slate-900 border border-slate-800 px-3 py-1 rounded hover:bg-slate-800 flex items-center gap-1 font-semibold text-[11px]"><Briefcase className="h-3 w-3 text-blue-400" /> Role</button>
          <button className="bg-slate-900 border border-slate-800 px-3 py-1 rounded hover:bg-slate-800 flex items-center gap-1 font-semibold text-[11px]"><Layers className="h-3 w-3 text-emerald-400" /> Sector</button>
          <button className="bg-slate-900 border border-slate-800 px-3 py-1 rounded hover:bg-slate-800 flex items-center gap-1 font-semibold text-[11px]"><Globe className="h-3 w-3 text-[#FEC970]" /> Country</button>
          <button className="bg-slate-900 border border-slate-800 px-3 py-1 rounded hover:bg-slate-800 flex items-center gap-1 font-semibold text-[11px]"><Building className="h-3 w-3 text-purple-400" /> Company</button>
          <button className="bg-slate-900 border border-slate-800 px-3 py-1 rounded hover:bg-slate-800 flex items-center gap-1 font-semibold text-[11px]"><CheckCircle className="h-3 w-3 text-teal-400" /> Status</button>
          <button className="bg-slate-900 border border-slate-800 px-3 py-1 rounded hover:bg-slate-800 flex items-center gap-1 font-semibold text-[11px]"><TrendingUp className="h-3 w-3 text-orange-400" /> Influence Score</button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Hero Section */}
        <div className="lg:col-span-12 relative rounded-2xl overflow-hidden bg-slate-950 text-white min-h-[360px] flex flex-col justify-end p-8 border border-slate-900 shadow-sm group">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center opacity-30 group-hover:scale-102 transition-transform duration-300"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=80')` }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-955 via-slate-955/40 to-transparent" />
          
          <div className="relative z-10 space-y-3">
            <div className="flex gap-2">
              <span className="bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded">Premium Analysis</span>
              <span className="bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded">Trade Policy</span>
            </div>
            <h2 className="font-display text-xl md:text-3xl font-bold leading-tight text-[#FEC970]">
              Global CEOs Driving the Next Trade Revolution
            </h2>
            <div className="flex items-center gap-3 text-[10px] text-slate-400 font-semibold pt-1">
              <span>👁 24.8K views</span>
              <span>👥 3.6K followers</span>
              <span>📅 Oct 2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* Second Fold (Profiles & AI Forecast) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Role Momentum, Search Trends, AI Banner */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-805 p-4 rounded-xl shadow-xs">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-3">Role Momentum</span>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between font-semibold">
                <span>Sourcing Director</span>
                <span className="text-emerald-500 font-bold">+12%</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Logistics CXO</span>
                <span className="text-emerald-500 font-bold">+8.4%</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Policy Analyst</span>
                <span className="text-emerald-500 font-bold">+21%</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-4 rounded-xl shadow-xs space-y-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase block mb-2">Search Trends</span>
            <div className="flex flex-wrap gap-1.5">
              {["#TradePolicy", "#SemiconductorCEOs", "#EVSupplyChain", "#NetZeroShipping"].map((tag, idx) => (
                <span key={idx} className="bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-850 px-2 py-0.5 rounded text-[9px] font-semibold">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[#0f172a] text-white border border-slate-800 p-5 rounded-xl text-center space-y-3">
            <span className="text-[10px] font-bold text-[#FEC970] uppercase">AI Leadership Intel</span>
            <p className="text-[10px] text-slate-300 leading-relaxed font-normal">
              Unlock deep predictive behavioral modeling for Fortune 500 executives.
            </p>
            <Link href="/eoi" className="block w-full bg-white hover:bg-gray-100 text-gray-950 font-bold text-[10px] py-2 rounded-lg transition-colors">
              Upgrade Now
            </Link>
          </div>
        </div>

        {/* Center Column: Leader Profiles Hub */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-855 pb-2">
            <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1">
              <Crown className="h-4.5 w-4.5 text-blue-500" /> Leader Profiles Hub
            </h3>
            <button className="text-[10px] font-bold text-blue-500 hover:underline">View All</button>
          </div>

          {[
            {
              name: "Elena Rodriguez",
              title: "Chief Operations Officer, Maersk Fleet",
              verified: "Verified",
              inf: "94.8",
              sec: "Shipping",
              bio: "Elena oversees the modernization of the world's largest shipping fleet. She is a pioneer in integrating IoT and sustainable fuel technologies into maritime operations.",
              activity: ["Announced the Green Fleet initiative 2030.", "Interviewed by Trade Finance Journal.", "Optimized port operations in Rotterdam."],
              nReach: "85%", tLead: "92%", tImpact: "78%"
            },
            {
              name: "Julian Chen",
              title: "CEO, EcoHydro Dynamics",
              verified: "Premium Verified",
              inf: "91.5",
              sec: "Green Hydrogen",
              bio: "Julian is a visionary in the renewable energy space, driving the adoption of green hydrogen at a planetary scale. He focuses on zero-emission infrastructure for industrial hubs.",
              activity: ["Secured $28B in Series D funding for hydrogen hubs.", "Keynote speaker at Davos 2024.", "Partnered with Maersk for fuel cells."],
              nReach: "76%", tLead: "88%", tImpact: "94%"
            }
          ].map((profile, pIdx) => (
            <div key={pIdx} className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-2xl shadow-xs space-y-4">
              <div className="flex gap-4 items-start">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-700 text-white font-bold flex items-center justify-center text-lg uppercase">
                  {profile.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-955 dark:text-white text-xs">{profile.name}</span>
                    <span className="bg-blue-50 text-blue-600 text-[8px] font-bold px-1.5 py-0.5 rounded-sm">{profile.verified}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 block">{profile.title}</span>
                  <div className="flex gap-4 text-[10px] mt-2 font-mono">
                    <span><strong>INFLUENCE:</strong> {profile.inf}</span>
                    <span><strong>SECTOR:</strong> {profile.sec}</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-gray-650 dark:text-gray-400 leading-relaxed font-normal">
                <p><strong>EXECUTIVE BIO:</strong> {profile.bio}</p>
              </div>

              <div className="text-[10px] bg-gray-50 dark:bg-gray-955 p-3 rounded-lg space-y-1">
                <span className="font-bold text-gray-450 uppercase block mb-1">ACTIVITY FEED</span>
                {profile.activity.map((act, aIdx) => (
                  <span key={aIdx} className="block text-gray-500">• {act}</span>
                ))}
              </div>

              {/* Progress metrics */}
              <div className="grid grid-cols-3 gap-4 text-[9px] pt-1">
                <div>
                  <span className="text-gray-400 block">Network Reach</span>
                  <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-blue-500" style={{ width: profile.nReach }} />
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 block">Thought Leadership</span>
                  <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-indigo-500" style={{ width: profile.tLead }} />
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 block">Trade Impact</span>
                  <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-amber-500" style={{ width: profile.tImpact }} />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2 text-[10px] font-bold border-t border-gray-100 dark:border-gray-855 pt-3">
                <button className="bg-slate-900 text-white dark:bg-white dark:text-gray-950 px-3 py-1.5 rounded">View Analytics</button>
                <button className="border border-gray-305 dark:border-gray-700 px-3 py-1.5 rounded">Request Interview</button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: AI Forecast, Watchlist, Market Pulse */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* AI Powered Forecast */}
          <div className="bg-[#0f172a] text-white border border-gray-800 p-5 rounded-2xl shadow-xs space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider">AI-POWERED FORECAST</span>
              <span className="bg-blue-600 text-white text-[8px] font-mono px-1.5 py-0.5 rounded">92% MATCH</span>
            </div>
            <p className="text-[10px] text-slate-350 leading-relaxed font-normal">
              AI Predicts Southeast Asia Manufacturing Leaders Will Gain Highest Investor Visibility Over Next 24 Months, driven by resilient supply chain shifts.
            </p>
            <div className="grid grid-cols-2 gap-2 text-[9px] font-mono">
              <div><span className="text-gray-400 block">CONFIDENCE</span><span className="text-white font-bold">92%</span></div>
              <div><span className="text-gray-400 block">MOMENTUM</span><span className="text-emerald-400 font-bold">+48%</span></div>
              <div><span className="text-gray-400 block">VISIBILITY</span><span className="text-[#FEC970] font-bold">+31%</span></div>
              <div><span className="text-gray-400 block">INVESTOR</span><span className="text-white font-bold">High</span></div>
            </div>
            <button className="w-full bg-amber-500 hover:bg-amber-600 text-gray-955 font-bold text-[10px] py-2 rounded-lg transition-colors">
              View Full Intelligence
            </button>
          </div>

          {/* My Watchlist */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-4 rounded-xl shadow-xs space-y-3">
            <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">My Watchlist</span>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="font-bold">Tesla Supply Chain</span>
                <span className="text-red-500 font-bold">High Volatility</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">ASML Executives</span>
                <span className="text-blue-500 font-bold">3 New Alerts</span>
              </div>
            </div>
          </div>

          {/* Market Pulse */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-255 dark:border-gray-800 p-4 rounded-xl shadow-xs space-y-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Market Pulse</span>
            <div className="flex justify-between items-center text-xs">
              <span>Sentiment</span>
              <span className="text-emerald-500 font-bold flex items-center gap-0.5">Bullish 📈</span>
            </div>
            <div className="flex justify-between items-center text-xs border-t border-gray-50 dark:border-gray-850 pt-2 mt-2">
              <span>Resilience</span>
              <span className="font-bold text-blue-500">88.4 / 100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Third Fold: Leader Rankings Dashboard */}
      <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-6 rounded-2xl shadow-xs space-y-6">
        <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-850 pb-3 flex-wrap gap-4">
          <div>
            <h4 className="font-display text-sm font-bold text-gray-950 dark:text-white">Leader Rankings Dashboard</h4>
            <p className="text-[10px] text-gray-400">Aggregated global influence metrics updated in real-time.</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-[10px] font-bold px-3 py-1.5 rounded">Last 30 Days</button>
            <button className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded flex items-center gap-1">Export PDF <Download className="h-3 w-3" /></button>
          </div>
        </div>

        {/* Normalized Scale Influence chart */}
        <div className="space-y-2">
          <span className="text-[9px] font-bold text-gray-400 uppercase block">INFLUENCE OVERVIEW (NORMALIZED SCALE)</span>
          <div className="h-44 w-full bg-slate-955 text-white rounded-xl border border-slate-900 flex items-end justify-between p-4 relative overflow-hidden">
            
            {/* Decorative Grid Lines */}
            <div className="absolute inset-0 grid grid-rows-4 pointer-events-none opacity-5">
              <div className="border-b border-white" />
              <div className="border-b border-white" />
              <div className="border-b border-white" />
            </div>

            {/* Simulated SVG Graph Paths */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none z-0" viewBox="0 0 500 150" preserveAspectRatio="none">
              <path 
                d="M 30,120 Q 110,80 200,60 T 380,40 T 480,30" 
                fill="none" 
                stroke="#3b82f6" 
                strokeWidth="2.5" 
              />
              <path 
                d="M 30,140 Q 110,110 200,90 T 380,70 T 480,50" 
                fill="none" 
                stroke="#ea580c" 
                strokeWidth="2.0" 
                strokeDasharray="4 4"
              />
            </svg>

            {/* Axis Labeling overlay */}
            <div className="absolute top-2 left-2 text-[8px] bg-slate-900/60 px-1 rounded flex items-center gap-2 text-slate-400">
              <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> INFLUENCE</span>
              <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-orange-500" /> MOVING AVG</span>
            </div>

            <span className="text-[8px] text-gray-400 z-10">Q1</span>
            <span className="text-[8px] text-gray-400 z-10">Q2</span>
            <span className="text-[8px] text-gray-400 z-10">Q3</span>
            <span className="text-[8px] text-gray-400 z-10">Q4</span>
            <span className="text-[8px] text-gray-400 z-10">Q1'24</span>
            <span className="text-[8px] text-gray-400 z-10">Q2'24</span>
            <span className="text-[8px] text-gray-400 z-10">Q3'24</span>
          </div>
        </div>

        {/* Bottom Gainers Heatmap row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div>
            <span className="text-[9px] font-bold text-gray-400 uppercase block mb-2">Regional Activity</span>
            <div className="grid grid-cols-4 gap-1">
              {Array.from({ length: 12 }).map((_, idx) => (
                <div key={idx} className="h-6 bg-slate-900 border border-slate-800 rounded flex items-center justify-center text-[8px] font-mono">
                  {idx * 8 + 12}%
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="text-[9px] font-bold text-gray-400 uppercase block mb-2">Top Gainers</span>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between"><span>Marcus Klatt</span><span className="text-emerald-500 font-bold">+14.2%</span></div>
              <div className="flex justify-between"><span>Yuki Lin</span><span className="text-emerald-500 font-bold">+9.8%</span></div>
              <div className="flex justify-between"><span>S. Ahmed</span><span className="text-emerald-500 font-bold">+8.1%</span></div>
            </div>
          </div>
          <div>
            <span className="text-[9px] font-bold text-gray-400 uppercase block mb-2">Emerging Founders</span>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between"><span>Arjun Mehta</span><span className="text-blue-500 bg-blue-50 dark:bg-blue-955/20 px-1 py-0.5 rounded text-[9px] font-bold">RISING</span></div>
              <div className="flex justify-between"><span>Clara Voss</span><span className="text-blue-500 bg-blue-50 dark:bg-blue-955/20 px-1 py-0.5 rounded text-[9px] font-bold">RISING</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Fourth Fold: Predictive Leadership Trends */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-850 pb-2">
          <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white">Predictive Leadership Trends</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "AI-Driven Manufacturing Leaders", strength: "84.2%", sig: "EMERGING", level: "Very Strong", conf: "92%", growth: "+14.5%", border: "border-blue-500" },
            { name: "Women Leaders in Global Trade Expansion", strength: "79.1%", sig: "HIGH GROWTH", level: "Accelerating", conf: "78%", growth: "+22.8%", border: "border-amber-500" },
            { name: "Sustainable Supply Chain Executives", strength: "95.0%", sig: "VERIFIED OPPORTUNITY", level: "Established", conf: "95%", growth: "+18.2%", border: "border-emerald-500" },
            { name: "Cross-Border Investment Experts", strength: "62.4%", sig: "STRATEGIC RISK", level: "Critical", conf: "89%", growth: "-2.4%", border: "border-red-500" },
            { name: "Digital Trade Policy Leaders", strength: "68.7%", sig: "INNOVATION SIGNAL", level: "Pioneering", conf: "62%", growth: "+12.4%", border: "border-purple-500" }
          ].map((item, idx) => (
            <div key={idx} className={`bg-white dark:bg-[#0f172a] border-l-4 ${item.border} border border-gray-255 dark:border-gray-800 p-4 rounded-r-xl flex flex-col justify-between min-h-[160px] shadow-xs`}>
              <div>
                <div className="flex justify-between items-center text-[8px] font-bold text-gray-450 uppercase">
                  <span>{item.sig}</span>
                  <span className="text-blue-500">STRENGTH: {item.strength}</span>
                </div>
                <h4 className="text-xs font-bold mt-1 text-gray-950 dark:text-white">{item.name}</h4>
              </div>
              <div className="grid grid-cols-3 gap-2 text-[9px] pt-3 font-mono border-t border-gray-50 dark:border-gray-850 mt-2">
                <div><span className="text-gray-400 block">SIGNAL</span><span className="font-bold">{item.level}</span></div>
                <div><span className="text-gray-400 block">CONFIDENCE</span><span className="font-bold">{item.conf}</span></div>
                <div><span className="text-gray-400 block">GROWTH</span><span className={`font-bold ${item.growth.startsWith("-") ? "text-red-500" : "text-emerald-500"}`}>{item.growth}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  ) : (
    <div className="space-y-8 col-span-12">
      
      {/* Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-xs">
        <div>
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Sector Momentum</span>
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 mt-0.5">
            +18.4% <TrendingUp className="h-3 w-3" />
          </span>
        </div>
        <div>
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Export Activity</span>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="text-xs font-bold text-gray-900 dark:text-white">Strong</span>
            <div className="h-1.5 w-12 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: "80%" }} />
            </div>
          </div>
        </div>
        <div>
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Investment Growth</span>
          <span className="text-xs font-bold text-gray-900 dark:text-white block mt-0.5">$4.2T YoY</span>
        </div>
        <div>
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Risk Level</span>
          <span className="text-xs font-bold text-red-500 block mt-0.5">HIGH ⚠️</span>
        </div>
        <div>
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">AI Accuracy</span>
          <span className="text-xs font-bold text-emerald-500 block mt-0.5">94.2%</span>
        </div>
        <div className="flex items-center justify-between col-span-2 md:col-span-1 border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-800 pt-2 md:pt-0 md:pl-4">
          <div>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Markets</span>
            <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> OPEN
            </span>
          </div>
        </div>
      </div>

      {/* First Fold 3-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sub-column (col-span-3) */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Sector Momentum table card */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-xs">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-3">Sector Momentum</span>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between font-semibold">
                <span>Cybersecurity</span>
                <span className="text-blue-500 font-bold">+12.4%</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>AI Infrastructure</span>
                <span className="text-emerald-500 font-bold">+24.1%</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Green Energy</span>
                <span className="text-red-500 font-bold">-2.8%</span>
              </div>
            </div>
            <button className="mt-4 w-full text-center text-[10px] font-bold text-amber-500 hover:underline">
              View Heatmap
            </button>
          </div>

          {/* AI Search Signals Card */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-xs space-y-3">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block border-b border-gray-100 dark:border-gray-855 pb-2">
              AI Search Signals
            </span>
            <div className="space-y-3 text-[11px]">
              <div>
                <span className="font-bold text-gray-900 dark:text-white block">Lithium Extraction 2.0</span>
                <span className="text-gray-550 block leading-snug">Surge in Nordic R&D activity detected.</span>
              </div>
              <div>
                <span className="font-bold text-gray-900 dark:text-white block">Edge Computing Node</span>
                <span className="text-gray-555 block leading-snug">Institutional interest up 115% this week.</span>
              </div>
            </div>
          </div>

          {/* Orange Strategic Alert */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-gray-955 p-5 rounded-xl space-y-3 relative overflow-hidden shadow-sm">
            <div className="absolute -right-4 -bottom-4 text-6xl opacity-10 font-bold">⚡</div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-orange-950 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" /> Strategic Alert
            </h4>
            <p className="text-xs font-bold leading-relaxed text-orange-955">
              Deep Sea Power Grid initiatives in SEA markets show high predictive probability for Q3 investment spikes.
            </p>
            <button className="w-full bg-gray-955 hover:bg-gray-855 text-white font-bold text-[10px] py-2 rounded-lg transition-colors">
              Unlock Forecast
            </button>
          </div>
        </div>

        {/* Center Column (col-span-6) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Hero analytical banner */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-955 text-white p-6 rounded-xl relative overflow-hidden border border-slate-800 shadow-sm flex flex-col justify-between min-h-[220px]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80')] bg-cover opacity-20" />
            <div className="relative z-10 space-y-2">
              <span className="bg-amber-400 text-gray-955 text-[9px] font-bold px-2 py-0.5 rounded">
                MARKET OPPORTUNITY
              </span>
              <h3 className="font-display text-lg md:text-2xl font-bold max-w-md leading-tight text-[#FEC970]">
                Becomes the Fastest Growing Global Export Opportunity
              </h3>
            </div>
            
            <div className="relative z-10 flex gap-3 mt-4">
              <Link href="/eoi" className="bg-amber-500 hover:bg-amber-600 text-gray-955 font-bold text-[10px] px-4 py-2 rounded">
                View Full Analysis
              </Link>
              <button className="border border-white/20 hover:bg-white/10 text-white font-bold text-[10px] px-4 py-2 rounded transition-colors">
                Monitor Sector
              </button>
            </div>
          </div>

          {/* Article Text & Quote highlight */}
          <div className="space-y-4">
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
              Data from the Enterprise Intelligence Platform indicates a structural shift in global trade flows. AI Infrastructure—ranging from advanced cooling systems to proprietary HBM modules—is outpacing traditional automotive and semiconductor sectors in export volume growth.
            </p>
            <div className="p-4 bg-amber-500/5 dark:bg-amber-955/15 border-l-4 border-amber-500 rounded-r-lg">
              <p className="text-xs italic text-gray-700 dark:text-gray-300 leading-relaxed">
                "The transition from digital services to physical AI hardware exports marks a new epoch for Tier-1 industrial nations."
              </p>
              <span className="text-[10px] text-gray-500 mt-1 block font-bold">— Chief Analyst, Market Policy</span>
            </div>
          </div>

          {/* Trending Industry Insights */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-gray-105 dark:border-gray-855 pb-2">
              <h4 className="text-xs font-bold text-gray-900 dark:text-white">Trending Industry Insights</h4>
              <button className="text-[10px] font-bold text-blue-500 hover:underline">View Archive</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[8px] font-bold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">MANUFACTURING</span>
                  <span className="text-[8px] text-gray-400 font-bold">PREMIUM</span>
                </div>
                <h5 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">Germany Pivots to Smart Factory Export Models</h5>
                <p className="text-[10px] text-gray-500 leading-relaxed line-clamp-2">New subsidies for edge-AI industrial sensors are driving a...</p>
              </div>
              <div className="p-4 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[8px] font-bold bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded">GEOPOLITICS</span>
                  <span className="text-[8px] text-gray-455 font-bold">TRENDING</span>
                </div>
                <h5 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">The Critical Minerals Corridor: DRC-UAE Pact</h5>
                <p className="text-[10px] text-gray-500 leading-relaxed line-clamp-2">Strategic shifts in cobalt processing locations are...</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Recommendations (col-span-3) */}
        <div className="lg:col-span-3 space-y-6">

          {/* AI Recommendations panel */}
          <div className="bg-[#0f172a] text-white border border-gray-800 p-5 rounded-xl shadow-xs space-y-4">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#FEC970] block">AI Recommendations</span>
            <div className="space-y-3 text-[10px]">
              <div className="border-b border-slate-800 pb-2">
                <span className="text-amber-400 font-bold block">REBALANCING ALERT</span>
                <p className="text-slate-300 leading-relaxed mt-0.5">Reduce exposure to Southeast Asian Logistics by 4%; pivot toward Northern European Smart Infrastructure.</p>
              </div>
              <div>
                <span className="text-blue-400 font-bold block">OPPORTUNITY SIGNAL</span>
                <p className="text-slate-300 leading-relaxed mt-0.5">High-conviction signal detected in Sub-Saharan Lithium refinement startups following new trade treaties.</p>
              </div>
            </div>
            <button className="w-full bg-[#1E3A5F] hover:bg-[#152e4f] text-white font-bold text-[10px] py-2 rounded-lg transition-colors">
              Analyze Portfolio
            </button>
          </div>
        </div>
      </div>

    </div>
  )
)}

              {/* Component 5: Locked AI Intelligence Preview */}
              <div className="relative overflow-hidden rounded-2xl border border-blue-200 dark:border-blue-900/40 bg-blue-50/30 dark:bg-blue-950/10 p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-950 p-2.5 text-blue-600 dark:text-blue-400">
                    <Sparkles className="h-5 w-5 animate-spin" style={{ animationDuration: "3s" }} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        AI Plus Smart Briefings
                      </span>
                      <span className="inline-flex items-center gap-1 rounded bg-amber-100 text-amber-800 text-[8px] font-bold uppercase px-2 py-0.5">
                        <Lock className="h-2.5 w-2.5" /> PRO LIMITS
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                      AI Trade Bullet Summaries
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed blur-[3.5px] pointer-events-none select-none">
                      This is mock text to simulate a locked intelligence dashboard. It highlights policy adjustments and bilateral tariff forecasts.
                    </p>
                    <div className="pt-2">
                      <Link
                        href="/eoi"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] px-4 py-2 rounded shadow-sm inline-block"
                      >
                        Request Founding Upgrade to unlock
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Sidebar (Reports, Trending, Newsletter, Corporate upgrade) */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              
              {/* Component 6: Trending Topics */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="h-4.5 w-4.5 text-orange-500" />
                  Trending Topics
                </h4>
                <div className="space-y-2 text-xs font-semibold">
                  {[
                    { tag: "#ViksitBharat2047", count: "1.2k reads" },
                    { tag: "#SemiconductorIncentives", count: "984 reads" },
                    { tag: "#BilateralCorridors", count: "512 reads" }
                  ].map((t, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-950 rounded hover:bg-gray-100 dark:hover:bg-gray-855 cursor-pointer transition-colors">
                      <span className="text-blue-500">{t.tag}</span>
                      <span className="text-[10px] text-gray-400">{t.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Component 7: Recommended Reports */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="h-4.5 w-4.5 text-blue-500" />
                  Recommended Reports
                </h4>
                <div className="space-y-2">
                  {reports.map((rep, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-950 border border-gray-150 dark:border-gray-850 rounded-xl flex items-center justify-between">
                      <div className="min-w-0 pr-2">
                        <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                          {rep.title}
                        </p>
                        <span className="text-[9px] font-mono text-gray-400 uppercase">
                          {rep.code}
                        </span>
                      </div>
                      <Link
                        href="/eoi"
                        className="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1.5 rounded hover:bg-blue-700 transition-colors flex-shrink-0"
                      >
                        Get {rep.price}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Component 8: Upgrade Banner (Reader/Leader/Corporate) */}
              <div className="bg-gradient-to-br from-[#0c1424] to-[#162136] border border-slate-800 text-white p-6 rounded-2xl shadow-xs space-y-4">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400">
                    B2B License
                  </span>
                  <h4 className="font-display text-sm font-bold text-white mt-1">
                    Corporate & Reader Plans
                  </h4>
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>Reader Plan</span>
                    <span className="font-bold text-slate-300">$19/mo</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>Leader Plan</span>
                    <span className="font-bold text-amber-400">$49/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Corporate Plan</span>
                    <span className="font-bold text-purple-300">Custom</span>
                  </div>
                </div>

                <Link
                  href="/eoi"
                  className="block w-full text-center bg-amber-400 hover:bg-amber-500 text-gray-950 font-bold text-xs py-2.5 rounded-lg transition-colors"
                >
                  Configure Founding Offer
                </Link>
              </div>

              {/* Component 9: Related Premium Pages (Cross-Sell) */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Related Premium Pages
                </h4>
                <div className="space-y-2 text-xs">
                  {[
                    { label: "Company Directory Listings", desc: "Corporate profiles and leads." },
                    { label: "Executive Leader Registry", desc: "150 CEO monitoring pages." },
                    { label: "SME Expert Network", desc: "Consultation & advisory panels." }
                  ].map((item, idx) => (
                    <div key={idx} className="p-2.5 bg-gray-50 dark:bg-gray-950 border border-gray-150/40 rounded flex items-center justify-between">
                      <div>
                        <span className="font-bold text-gray-900 dark:text-white block">{item.label}</span>
                        <span className="text-[9px] text-gray-400 mt-0.5 block">{item.desc}</span>
                      </div>
                      <Link href="/eoi" className="text-blue-500 hover:text-blue-600 font-bold flex-shrink-0">
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Component 10: Sponsored Content */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-850 rounded-2xl p-5 shadow-xs space-y-2">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                  Sponsored Placement
                </span>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                  Securing International Bilateral Logistics channels
                </h4>
                <p className="text-[10px] text-gray-500 leading-snug">
                  Deploy corporate cloud networks across India-EU hubs to automate document customs checks securely.
                </p>
              </div>

              {/* Component 11: Newsletter Signup */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-850 rounded-2xl p-5 shadow-xs space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="h-4.5 w-4.5 text-blue-500" />
                    B2B News Alerts
                  </h4>
                  <p className="text-[10px] text-gray-500 mt-1 leading-snug">
                    Get weekly analytical summaries for the <strong>{categoryName} Feed</strong> corridor.
                  </p>
                </div>

                {subscribed ? (
                  <div className="p-3 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg">
                    ✓ Subscribed work email!
                  </div>
                ) : (
                  <div className="space-y-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="work@company.com"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-xs outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={() => {
                        if (email) setSubscribed(true);
                      }}
                      className="w-full bg-[#1E3A5F] hover:bg-[#152e4f] text-white text-xs font-bold py-2 rounded-lg transition-colors"
                    >
                      Subscribe
                    </button>
                  </div>
                )}
              </div>

            </div>

          </div>
        </section>

      </div>
    );
  }

  if (slugParts[0] === "headlines" && slugParts.length > 1) {
    const editorSlug = slugParts[1]; // "ai-editor", "intelligence-editor", "sme-editor", "viksit-bharat-panel", "podcast"
    const editorName = subMatch?.label || "IGEN Editor";
    const subTab = slugParts[2] || "my"; // "my" or "all"

    if (editorSlug === "ai-editor" && subTab === "my") {
      return <NewsPOCHeadlinesAIEditorMySector onBack={() => router.back()} />;
    }

    if (editorSlug === "ai-editor" && subTab === "all") {
      return <NewsPOCHeadlinesAIEditorAllSectors onBack={() => router.back()} />;
    }
    
    // Sample articles for different editors
    const editorArticlesMap: Record<string, any[]> = {
      "ai-editor": [
        { id: "ai-1", title: "Autonomous Trade-Logistics Agent Outperforms C-Suite Schedules by 14%", excerpt: "New benchmarks indicate agentic workflow deployments slice border customs delays by predictive rescheduling algorithms.", sector: "Logistics", date: "5m ago", readTime: "4 min read", likes: 89, comments: 4, type: "AI News", sponsored: false },
        { id: "ai-2", title: "Natural Language API Interfaces Unified Across 12 APAC Shipping Ports", excerpt: "Port operators declare direct compatibility standards for voice-to-form custom declarations, removing manual data entry.", sector: "Electronics & IT", date: "2 hrs ago", readTime: "5 min read", likes: 112, comments: 7, type: "AI News", sponsored: false },
        { id: "ai-3", title: "Generative AI Code-Translation Saves $4.2B in Trade Compliance Costs", excerpt: "Compliance standard audits adopt micro-AI translators to review foreign cargo shipping paperwork in milliseconds.", sector: "Trade Compliance", date: "1 day ago", readTime: "6 min read", likes: 204, comments: 15, type: "Sponsored Insight", sponsored: true }
      ],
      "intelligence-editor": [
        { id: "intel-1", title: "IGEN Special Report: Rebalancing Semiconductor OSAT Corridors", excerpt: "Deep analysis outlines silicon shipping bottlenecks in Southeast Asia and local buffer options.", sector: "Semiconductors", date: "30m ago", readTime: "8 min read", likes: 140, comments: 12, type: "Curation Report", sponsored: false },
        { id: "intel-2", title: "Bilateral Trade Tariff Forecasts: How New Carbon Border Policies Impact Exporters", excerpt: "Industrial metrics project 8% export margin drop for carbon-intensive metallurgy shipping by Q1.", sector: "Energy & Sustainability", date: "4 hrs ago", readTime: "10 min read", likes: 98, comments: 5, type: "Curation Report", sponsored: false }
      ],
      "sme-editor": [
        { id: "sme-1", title: "Expert Column: Solid-State Battery Sourcing Grid Risks", author: "Dr. Aris Vance", excerpt: "Alternative solid state configurations present logistics challenges due to extreme temperature regulations.", sector: "Automotive & EV", date: "1 hr ago", readTime: "5 min read", likes: 78, comments: 3, type: "Expert Opinion", sponsored: false },
        { id: "sme-2", title: "Managing Da Nang Port Congestion: Practical Guide for Logistics Managers", author: "Sarah Lin", excerpt: "Alternative freight forwarding paths bypass terminal backlogs, ensuring consistent deliveries.", sector: "Logistics", date: "5 hrs ago", readTime: "6 min read", likes: 94, comments: 8, type: "Expert Opinion", sponsored: false }
      ],
      "viksit-bharat-panel": [
        { id: "vb-1", title: "Viksit Bharat 2047: Digitizing Port Infrastructure for Global Competitiveness", excerpt: "Inter-ministerial panel details automation initiatives to slice customs delays down to 60 seconds.", sector: "Logistics & Trade", date: "2 hrs ago", readTime: "6 min read", likes: 220, comments: 18, type: "Policy Story", sponsored: false },
        { id: "vb-2", title: "Bilateral Solar PV Investment Frameworks Approved for Western Districts", excerpt: "New clean energy partnerships secure private grid linkages to accelerate rural electrification.", sector: "Sustainable Energy", date: "1 day ago", readTime: "8 min read", likes: 185, comments: 11, type: "Policy Story", sponsored: false }
      ],
      "podcast": [
        { id: "pod-1", title: "Episode 42: Scaling Global Semiconductor Assembly with Jensen Huang", excerpt: "Fireside chat outlines NVIDIA's global supply chain resilience blueprint and new manufacturing hubs in India.", duration: "32 min listen", date: "New Episode", type: "Podcast Brief", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60" },
        { id: "pod-2", title: "Episode 41: Navigating Bilateral Trade Treaties with Minister of Commerce", excerpt: "Discussion on trade tariffs, carbon tax compliance, and digital public rails.", duration: "28 min listen", date: "1 week ago", type: "Podcast Brief", image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=500&auto=format&fit=crop&q=60" }
      ]
    };

    const articles = editorArticlesMap[editorSlug] || editorArticlesMap["ai-editor"];

    if (editorSlug === "intelligence-editor" && subTab === "my") {
      return <NewsPOCHeadlinesIntelligenceEditorMySector onBack={() => router.back()} />;
    }

    if (editorSlug === "intelligence-editor" && subTab === "all") {
      return <NewsPOCHeadlinesIntelligenceEditorAllSectors onBack={() => router.back()} />;
    }

    if (editorSlug === "sme-editor" && subTab === "my") {
      return <NewsPOCHeadlinesSMEEditorMySector onBack={() => router.back()} />;
    }

    if (editorSlug === "sme-editor" && subTab === "all") {
      return <NewsPOCHeadlinesSMEEditorAllSectors onBack={() => router.back()} />;
    }

    if (editorSlug === "viksit-bharat-panel" && subTab === "my") {
      return <NewsPOCHeadlinesViksitBharatPanelEditorMySector onBack={() => router.back()} />;
    }

    if (editorSlug === "viksit-bharat-panel" && subTab === "all") {
      return <NewsPOCHeadlinesViksitBharatPanelEditorAllSectors onBack={() => router.back()} />;
    }

    if (editorSlug === "intelligence-editor") {
      return (
        <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 transition-colors duration-300">
          
          {/* Header Block */}
          <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-250 dark:border-gray-855 pb-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.back()}
                  className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:text-blue-500 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-505">
                    Intelligence Curation
                  </span>
                  <h1 className="font-display text-xl font-bold leading-none mt-1">
                    {editorName}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-955 p-1 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs">
                {[
                  { key: "my", label: "My Sector" },
                  { key: "all", label: "All Sector" }
                ].map((sub) => (
                  <button
                    key={sub.key}
                    onClick={() => {
                      const newSlug = `/en/news-poc/headlines/${editorSlug}/${sub.key}`;
                      router.push(newSlug);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      subTab === sub.key
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-gray-655 dark:text-gray-350 hover:bg-gray-150 dark:hover:bg-gray-855"
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Component 1: Market Snapshot Strip */}
          <section className="mx-auto max-w-7xl px-4 pt-4 lg:px-6">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-3 rounded-xl shadow-3xs">
              {[
                { name: "S&P 500", val: "5,241.53", change: "+0.32%", up: true },
                { name: "NASDAQ", val: "16,384.47", change: "+0.18%", up: true },
                { name: "NIFTY 50", val: "22,475.20", change: "+0.68%", up: true },
                { name: "BRENT", val: "$85.42", change: "-0.56%", up: false },
                { name: "GOLD", val: "$2,358.40", change: "+0.35%", up: true },
                { name: "BTC/USD", val: "$68,432", change: "+1.45%", up: true }
              ].slice(0, 6).map((mVal, idx) => (
                <div key={idx} className="text-center border-r border-gray-100 dark:border-gray-855 last:border-r-0 py-1">
                  <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider block">{mVal.name}</span>
                  <span className="text-[10px] font-bold text-gray-900 dark:text-white block mt-0.5 font-mono">{mVal.val}</span>
                  <span className={`text-[8px] font-bold block ${mVal.up ? "text-emerald-500" : "text-red-500"}`}>
                    {mVal.change}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Grid Layout */}
          <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
            <div className="grid grid-cols-12 gap-8">
              
              {/* LEFT COLUMN */}
              <div className="col-span-12 lg:col-span-8 space-y-8">
                
                {/* Hero Story */}
                {articles.length > 0 && (
                  <div className="relative rounded-2xl overflow-hidden bg-slate-955 text-white min-h-[320px] flex flex-col justify-end p-8 border border-slate-900 shadow-sm group">
                    <div 
                      className="absolute inset-0 z-0 bg-cover bg-center opacity-30 group-hover:scale-102 transition-transform duration-300"
                      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80')` }}
                    />
                    <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-955 via-slate-955/40 to-transparent" />
                    
                    <div className="relative z-10 space-y-3">
                      <span className="bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                        CURATED REPORT
                      </span>
                      <h2 className="font-display text-lg md:text-2xl font-bold leading-tight text-[#FEC970]">
                        {articles[0].title}
                      </h2>
                      <p className="text-slate-350 text-xs md:text-sm font-normal max-w-2xl leading-relaxed">
                        {articles[0].excerpt}
                      </p>
                      <div className="pt-2">
                        <Link href={`/en/news-poc/article/${articles[0]?.id || "sec-1"}`} className="bg-white text-gray-950 hover:bg-gray-105 font-bold px-4 py-2 rounded text-[10px]">
                          Read Full Analysis
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* Intelligence Feed */}
                <div className="space-y-4">
                  <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-gray-850 pb-2">
                    {subTab === "my" ? "Curated Intelligence Feed" : "All Intelligence Streams"}
                  </h3>

                  <div className="space-y-4">
                    {articles.map((art) => (
                      <div key={art.id} className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-xl flex gap-4 items-start hover:shadow-2xs transition-all">
                        <div className="flex-1 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[8px] font-bold px-2 py-0.5 rounded-sm bg-blue-50 text-blue-600 dark:bg-blue-955/20">
                              {art.type || "Curation"}
                            </span>
                            <span className="text-[9px] font-mono text-gray-400 font-bold">{art.sector}</span>
                          </div>
                          <h4 className="text-xs md:text-sm font-bold text-gray-955 dark:text-white leading-snug">{art.title}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-normal">{art.excerpt}</p>
                          <div className="flex justify-between items-center text-[10px] text-gray-455 pt-2 border-t border-gray-50 dark:border-gray-850 mt-2 font-semibold">
                            <span>{art.date}</span>
                            <div className="flex items-center gap-3">
                              <button className="flex items-center gap-1 hover:text-red-500"><ThumbsUp className="h-3.5 w-3.5" /> {art.likes || 0}</button>
                              <button className="flex items-center gap-1 hover:text-blue-500"><MessageCircle className="h-3.5 w-3.5" /> {art.comments || 0}</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sponsored Research */}
                <div className="border border-amber-200 dark:border-amber-955/40 bg-amber-50/10 dark:bg-amber-950/5 p-5 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-amber-200/20">
                    <span className="text-[9px] font-bold text-amber-600 uppercase tracking-wider">SPONSORED RESEARCH</span>
                    <span className="bg-amber-500 text-gray-955 text-[7px] font-bold px-1.5 py-0.5 rounded font-mono">PARTNER</span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-955 dark:text-white leading-snug">
                    Bilateral Clean Hydrogen Corridors: Logistics & Asset Refinements
                  </h4>
                  <p className="text-[11px] text-gray-655 dark:text-gray-405 leading-relaxed font-normal">
                    This sponsored research outlines green hydrogen corridor projections between Western India and Northern Europe, analyzing shipping bottlenecks and capital expenditure maps.
                  </p>
                  <Link href="/eoi" className="text-xs text-blue-500 hover:underline font-bold flex items-center gap-0.5">
                    Download Sponsored Report <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>

              </div>

              {/* RIGHT COLUMN */}
              <div className="col-span-12 lg:col-span-4 space-y-6">
                
                {/* Premium Intelligence Reports (Premium Reports & Membership Plans) */}
                <div className="bg-slate-950 text-white border border-slate-900 p-5 rounded-2xl shadow-xs space-y-4">
                  <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider block">PREMIUM REPORTS</span>
                  <div className="space-y-3 text-[10px]">
                    <div className="border-b border-slate-800 pb-2 flex justify-between items-center">
                      <div>
                        <span className="font-bold block text-white">Bilateral Trade Compliance Manual</span>
                        <span className="text-slate-400 block mt-0.5">Code: REP-COMP-09 • Value: $249</span>
                      </div>
                      <Lock className="h-3.5 w-3.5 text-slate-500 shrink-0 ml-2" />
                    </div>
                    <div className="pb-1 flex justify-between items-center">
                      <div>
                        <span className="font-bold block text-white">APAC Supply Chain Congestion Indices</span>
                        <span className="text-slate-400 block mt-0.5">Code: REP-LOG-85 • Value: $199</span>
                      </div>
                      <Lock className="h-3.5 w-3.5 text-slate-500 shrink-0 ml-2" />
                    </div>
                  </div>
                  <Link href="/eoi" className="block text-center bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs py-2 rounded transition-colors uppercase">
                    View Membership Plans
                  </Link>
                </div>

                {/* Expert Recommendations */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-xl shadow-xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block border-b border-gray-100 dark:border-gray-850 pb-2">
                    Expert Recommendations
                  </span>
                  <div className="space-y-3 text-[11px] font-normal leading-relaxed text-gray-655 dark:text-gray-450">
                    <p>
                      ⚡ <strong>Semiconductors:</strong> We advise sourcing teams to raise buffer stock targets by 4% to mitigate prospective tariff shocks.
                    </p>
                    <p className="border-t border-gray-50 dark:border-gray-855 pt-2">
                      ⚡ <strong>Logistics:</strong> Diversify entry hubs from West Coast nodes to avoid projected Q3 rail delays.
                    </p>
                  </div>
                </div>

                {/* Research Sponsorship */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-xl shadow-xs space-y-3">
                  <h4 className="text-xs font-bold text-gray-955 dark:text-white uppercase tracking-wider">Research Sponsorship</h4>
                  <p className="text-[10px] text-gray-500 leading-relaxed font-normal">
                    Promote your organization's whitepapers, surveys, and industrial forecasts directly to C-suite decision makers.
                  </p>
                  <Link href="/eoi" className="block text-center bg-gray-900 text-white dark:bg-white dark:text-gray-955 font-bold text-[10px] py-2 rounded hover:opacity-90 transition-all uppercase">
                    Become a Partner
                  </Link>
                </div>

              </div>

            </div>
          </section>

        </div>
      );
    }

    if (editorSlug === "viksit-bharat-panel") {
      return (
        <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 transition-colors duration-300">
          
          {/* Header Block */}
          <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-250 dark:border-gray-855 pb-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.back()}
                  className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:text-blue-505 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-505">
                    Viksit Bharat 2047
                  </span>
                  <h1 className="font-display text-xl font-bold leading-none mt-1">
                    {editorName}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-955 p-1 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs">
                {[
                  { key: "my", label: "My Sector" },
                  { key: "all", label: "All Sector" }
                ].map((sub) => (
                  <button
                    key={sub.key}
                    onClick={() => {
                      const newSlug = `/en/news-poc/headlines/${editorSlug}/${sub.key}`;
                      router.push(newSlug);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      subTab === sub.key
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-gray-655 dark:text-gray-350 hover:bg-gray-150 dark:hover:bg-gray-850"
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Growth Dashboard & Policy Tracker banner */}
          <section className="mx-auto max-w-7xl px-4 pt-4 lg:px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Policy Tracker */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-xs space-y-2">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Policy Tracker</span>
              <div className="space-y-1.5 text-xs font-semibold">
                <div className="flex justify-between"><span>Customs Digitization Bill</span><span className="text-emerald-500 font-bold">Draft Approved</span></div>
                <div className="flex justify-between border-t border-gray-50 dark:border-gray-850 pt-1"><span>Single Window Clearances</span><span className="text-blue-505 font-bold">Implemented</span></div>
              </div>
            </div>

            {/* Growth Dashboard (metrics) */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-xs space-y-2.5">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Growth Index Tracker</span>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <div><span className="text-[9px] text-gray-400 block font-normal">Logistics Latency</span><span className="text-emerald-500 font-bold">-24% Q3</span></div>
                <div><span className="text-[9px] text-gray-400 block font-normal">Mfg Capacity</span><span className="text-blue-500 font-bold">+18% YoY</span></div>
              </div>
            </div>

            {/* Industry Impact summary */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-xs space-y-1">
              <span className="text-[9px] font-bold text-[#E63946] uppercase block">Industry Impact</span>
              <p className="text-[10px] text-gray-500 leading-relaxed font-normal">
                Standardized API interfaces cut logistics costs for C-suite operations, raising net margins by 2% overall.
              </p>
            </div>
          </section>

          {/* Grid Layout */}
          <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
            <div className="grid grid-cols-12 gap-8">
              
              {/* LEFT COLUMN */}
              <div className="col-span-12 lg:col-span-8 space-y-8">
                
                {/* Featured Policy Story */}
                {articles.length > 0 && (
                  <div className="relative rounded-2xl overflow-hidden bg-slate-955 text-white min-h-[300px] flex flex-col justify-end p-8 border border-slate-900 shadow-sm group">
                    <div 
                      className="absolute inset-0 z-0 bg-cover bg-center opacity-30 group-hover:scale-102 transition-transform duration-300"
                      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80')` }}
                    />
                    <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    <div className="relative z-10 space-y-3">
                      <span className="bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                        PANEL STORY
                      </span>
                      <h2 className="font-display text-lg md:text-2xl font-bold leading-tight text-[#FEC970]">
                        {articles[0].title}
                      </h2>
                      <p className="text-slate-350 text-xs md:text-sm font-normal max-w-2xl leading-relaxed">
                        {articles[0].excerpt}
                      </p>
                      <div className="pt-2">
                        <Link href="/eoi" className="bg-white text-gray-955 hover:bg-gray-100 font-bold px-4 py-2 rounded text-[10px]">
                          View Panel Briefing
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* Policy Updates feed */}
                <div className="space-y-4">
                  <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-gray-850 pb-2">
                    {subTab === "my" ? "Policy Updates in Subscribed Sectors" : "All Policy Discussions"}
                  </h3>

                  <div className="space-y-4">
                    {articles.map((art) => (
                      <div key={art.id} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-xl flex gap-4 items-start hover:shadow-2xs transition-all">
                        <div className="flex-1 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[8px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-755 dark:bg-emerald-955/20">
                              {art.type}
                            </span>
                            <span className="text-[9px] font-mono text-gray-400 font-bold">{art.sector}</span>
                          </div>
                          <h4 className="text-xs md:text-sm font-bold text-gray-955 dark:text-white leading-snug">{art.title}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-normal">{art.excerpt}</p>
                          <div className="flex justify-between items-center text-[10px] text-gray-455 pt-2 border-t border-gray-50 dark:border-gray-855 mt-2 font-semibold">
                            <span>{art.date}</span>
                            <div className="flex items-center gap-3">
                              <button className="flex items-center gap-1 hover:text-red-500"><ThumbsUp className="h-3.5 w-3.5" /> {art.likes || 0}</button>
                              <button className="flex items-center gap-1 hover:text-blue-500"><MessageCircle className="h-3.5 w-3.5" /> {art.comments || 0}</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sponsored Initiatives */}
                <div className="border border-blue-200 dark:border-blue-900/40 bg-blue-50/10 dark:bg-blue-955/5 p-5 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-blue-100/20">
                    <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider">SPONSORED INITIATIVE</span>
                    <span className="bg-blue-600 text-white text-[7px] font-bold px-1.5 py-0.5 rounded font-mono">SUPPORTED</span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-955 dark:text-white leading-snug">
                    Viksit Bharat Smart Logistics Corridor: Partnering with Adani Ports
                  </h4>
                  <p className="text-[11px] text-gray-655 dark:text-gray-405 leading-relaxed font-normal">
                    This sponsored initiative outlines dock-expansion and smart terminal automation schedules designed to enhance import throughput.
                  </p>
                  <Link href="/eoi" className="text-xs text-blue-500 hover:underline font-bold flex items-center gap-0.5">
                    View Initiative Details <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>

              </div>

              {/* RIGHT COLUMN */}
              <div className="col-span-12 lg:col-span-4 space-y-6">
                
                {/* Premium Policy Reports */}
                <div className="bg-slate-950 text-white border border-slate-900 p-5 rounded-2xl shadow-xs space-y-4">
                  <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider block">PREMIUM POLICY REPORTS</span>
                  <div className="space-y-3 text-[10px]">
                    <div className="border-b border-slate-800 pb-2 flex justify-between items-center">
                      <div>
                        <span className="font-bold block text-white">Viksit Bharat 2047 Infrastructure Map</span>
                        <span className="text-slate-400 block mt-0.5">Code: REP-VB-47 • Value: $299</span>
                      </div>
                      <Lock className="h-3.5 w-3.5 text-slate-500 shrink-0 ml-2" />
                    </div>
                  </div>
                  <Link href="/eoi" className="block text-center bg-amber-500 hover:bg-amber-600 text-gray-955 font-bold text-xs py-2 rounded transition-colors uppercase">
                    Access Premium Reports
                  </Link>
                </div>

                {/* Government Partnerships banner */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-255 dark:border-gray-800 p-5 rounded-xl shadow-xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block border-b border-gray-100 dark:border-gray-850 pb-2">
                    Government Partnerships
                  </span>
                  <p className="text-[10px] text-gray-500 leading-relaxed font-normal">
                    Collaborate directly with ministries and policy makers on standardized digitization schedules.
                  </p>
                  <Link href="/eoi" className="block text-center bg-gray-900 text-white dark:bg-white dark:text-gray-955 font-bold text-[10px] py-2 rounded hover:opacity-90 transition-all uppercase">
                    Partner With Us
                  </Link>
                </div>

                {/* Sponsored Campaigns */}
                <div className="bg-[#0f172a] text-white border border-slate-800 p-5 rounded-2xl shadow-xs space-y-3">
                  <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider block">Sponsored Campaign</span>
                  <h4 className="font-display text-xs font-bold leading-snug">Scaling Renewable Infrastructure</h4>
                  <p className="text-[10px] text-slate-300 leading-relaxed font-normal">
                    Learn how public initiatives are supporting clean power systems.
                  </p>
                  <Link href="/eoi" className="block text-center bg-[#1E3A5F] hover:bg-[#152e4f] text-white font-bold text-[10px] py-2 rounded transition-colors">
                    Learn More
                  </Link>
                </div>

              </div>

            </div>
          </section>

        </div>
      );
    }

    if (editorSlug === "podcast") {
      return (
        <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 transition-colors duration-300">
          
          {/* Header Block */}
          <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
            <div className="flex items-center gap-2 border-b border-gray-250 dark:border-gray-855 pb-4">
              <button
                onClick={() => router.back()}
                className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:text-blue-505 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-505">
                  Audio Broadcasts
                </span>
                <h1 className="font-display text-xl font-bold leading-none mt-1">
                  {editorName}
                </h1>
              </div>
            </div>
          </section>

          {/* Component 1: Coming Soon Banner */}
          <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
            <div className="bg-gradient-to-r from-blue-900 to-indigo-955 text-white p-8 rounded-2xl border border-slate-800 text-center space-y-3 relative overflow-hidden shadow-md">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&auto=format&fit=crop&q=80')] bg-cover opacity-10 animate-pulse" />
              <div className="relative z-10">
                <span className="bg-amber-400 text-gray-955 text-[9px] font-bold px-2 py-0.5 rounded tracking-wider uppercase block w-max mx-auto mb-2">
                  Launching Soon
                </span>
                <h2 className="font-display text-lg md:text-2xl font-bold text-[#FEC970]">
                  IGEN Fireside Podcasts Launching in Q3 2026
                </h2>
                <p className="text-slate-300 text-xs md:text-sm font-normal max-w-xl mx-auto leading-relaxed">
                  Get exclusive 1:1 roundtables and trade strategy podcasts from global manufacturing and policy leaders directly on your dashboard.
                </p>
                
                {/* Notify Me block */}
                <div className="pt-4 max-w-md mx-auto">
                  {subscribed ? (
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 p-2.5 rounded-lg text-[10px] font-bold text-center">
                      ✓ We will notify you at launch!
                    </div>
                  ) : (
                    <div className="flex gap-2 justify-center">
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="work@company.com"
                        className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-gray-900 text-xs outline-none focus:border-blue-500"
                      />
                      <button
                        onClick={() => { if (email) setSubscribed(true); }}
                        className="bg-amber-500 hover:bg-amber-600 text-gray-955 text-xs font-bold px-4 py-1.5 rounded-lg transition-colors"
                      >
                        Notify Me
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Grid Layout */}
          <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: Featured Podcast, Episodes */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Featured Podcast Card */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden p-6 shadow-xs group">
                  <div className="h-52 w-full overflow-hidden rounded-xl relative mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&auto=format&fit=crop&q=80" 
                      alt="Podcast Episode"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                      FEATURED EPISODE
                    </span>
                  </div>

                  <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-550 transition-colors">
                    {articles[0].title}
                  </h3>
                  <p className="text-xs text-gray-555 leading-relaxed mt-2 font-normal">
                    {articles[0].excerpt}
                  </p>
                  <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-850 flex items-center justify-between text-[11px] text-gray-500">
                    <span className="font-bold text-blue-500 uppercase text-[9px]">{articles[0].type}</span>
                    <button className="text-blue-505 font-bold hover:underline flex items-center gap-1">
                      Listen to Preview <Play className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Upcoming Episodes */}
                <div className="space-y-4">
                  <h4 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-gray-850 pb-2">
                    Upcoming Episodes schedule
                  </h4>
                  <div className="space-y-3">
                    {[
                      { title: "Episode 43: Trade Logistics & AI Integration with APAC Policy Analysts", date: "Releasing Aug 2" },
                      { title: "Episode 44: Energy Sourcing Volatilities with GreenHydrogen Executives", date: "Releasing Aug 9" }
                    ].map((ep, idx) => (
                      <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl flex justify-between items-center shadow-3xs">
                        <span className="text-xs font-bold text-gray-955 dark:text-white">{ep.title}</span>
                        <span className="text-[10px] text-amber-500 font-bold bg-amber-50 dark:bg-amber-955/20 px-2 py-0.5 rounded">{ep.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: Premium podcasts & sponsorships */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Podcast Categories follow */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Podcast Channels</span>
                  <div className="flex flex-wrap gap-1.5">
                    {["Bilateral Strategy", "C-Suite Roundtable", "Agritech Futures", "Energy Geopolitics"].map((comp, idx) => (
                      <span key={idx} className="bg-gray-50 dark:bg-gray-955 border border-gray-200 dark:border-gray-800 px-2 py-0.5 rounded text-[9px] font-semibold">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Premium Podcasts */}
                <div className="bg-slate-950 text-white border border-slate-900 p-5 rounded-2xl shadow-xs space-y-4">
                  <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider block">PREMIUM PODCASTS</span>
                  <div className="space-y-3 text-[10px]">
                    <div className="border-b border-slate-800 pb-2 flex justify-between items-center">
                      <div>
                        <span className="font-bold block text-white">Full Roundtable: US-China Tariff Recalibrations</span>
                        <span className="text-slate-400 block mt-0.5">Duration: 54 mins • Premium Only</span>
                      </div>
                      <Lock className="h-3.5 w-3.5 text-slate-500 shrink-0 ml-2" />
                    </div>
                  </div>
                  <Link href="/eoi" className="block text-center bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs py-2 rounded transition-colors uppercase">
                    Unlock Podcast Library
                  </Link>
                </div>

                {/* Sponsor This Episode / Brand Partnerships */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-xl shadow-xs space-y-3">
                  <h4 className="text-xs font-bold text-gray-955 dark:text-white uppercase tracking-wider">Sponsor This Episode</h4>
                  <p className="text-[10px] text-gray-500 leading-relaxed font-normal">
                    Deliver your value propositions directly to policy advisors and industry leaders listening in.
                  </p>
                  <Link href="/eoi" className="block text-center bg-gray-900 text-white dark:bg-white dark:text-gray-955 font-bold text-[10px] py-2 rounded hover:opacity-90 transition-all uppercase">
                    Submit Brand Partnership Inquiry
                  </Link>
                </div>

              </div>

            </div>
          </section>

        </div>
      );
    }

    return (
      <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 transition-colors duration-300">
        
        {/* Header Block */}
        <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-250 dark:border-gray-855 pb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.back()}
                className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:text-blue-505 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-505">
                  Headlines Source
                </span>
                <h1 className="font-display text-xl font-bold leading-none mt-1">
                  {editorName}
                </h1>
              </div>
            </div>

            {/* Dynamic tabs for My Sector vs All Sector (except for podcast which has none) */}
            {editorSlug !== "podcast" && (
              <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-955 p-1 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs">
                {[
                  { key: "my", label: "My Sector" },
                  { key: "all", label: "All Sector" }
                ].map((sub) => (
                  <button
                    key={sub.key}
                    onClick={() => {
                      // Navigate or set state
                      const newSlug = `/en/news-poc/headlines/${editorSlug}/${sub.key}`;
                      router.push(newSlug);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      subTab === sub.key
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-gray-655 dark:text-gray-350 hover:bg-gray-150 dark:hover:bg-gray-855"
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Dynamic content page */}
        <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
          <div className="grid grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: Hero, News feed */}
            <div className="col-span-12 lg:col-span-8 space-y-8">
              
              {/* Component 1: Hero Banner */}
              {articles.length > 0 && (
                <div className="relative rounded-2xl overflow-hidden bg-slate-955 text-white min-h-[300px] flex flex-col justify-end p-8 border border-slate-900 shadow-sm group">
                  <div 
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-30 group-hover:scale-102 transition-transform duration-300"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80')` }}
                  />
                  <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  <div className="relative z-10 space-y-3">
                    <span className="bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                      FEATURED INTEL
                    </span>
                    <h2 className="font-display text-lg md:text-2xl font-bold leading-tight text-[#FEC970]">
                      {articles[0].title}
                    </h2>
                    <p className="text-slate-300 text-xs md:text-sm font-normal max-w-2xl leading-relaxed">
                      {articles[0].excerpt}
                    </p>
                    <div className="pt-2">
                      <Link href="/eoi" className="bg-white text-gray-955 hover:bg-gray-105 font-bold px-4 py-2 rounded text-[10px]">
                        Read Curation
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Component 2 & 3: Latest & Trending list split */}
              <div className="space-y-4">
                <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-gray-855 pb-2">
                  {subTab === "my" ? "Latest Subscribed Sector News" : "All Curation Streams"}
                </h3>

                <div className="space-y-4">
                  {articles.map((art) => (
                    <div key={art.id} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-xl flex gap-4 items-start hover:shadow-2xs transition-all">
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className={`text-[8px] font-bold px-2 py-0.5 rounded-sm ${
                            art.sponsored 
                              ? "bg-amber-500/10 text-amber-600 border border-amber-500/20" 
                              : "bg-blue-50 text-blue-600 dark:bg-blue-955/20"
                          }`}>
                            {art.type || "Curation"}
                          </span>
                          <span className="text-[9px] font-mono text-gray-400 font-bold">{art.sector}</span>
                        </div>
                        <h4 className="text-xs md:text-sm font-bold text-gray-955 dark:text-white leading-snug">{art.title}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-normal">{art.excerpt}</p>
                        <div className="flex justify-between items-center text-[10px] text-gray-450 pt-2 border-t border-gray-50 dark:border-gray-855 mt-2 font-semibold">
                          <span>{art.date} {art.duration && `• ${art.duration}`}</span>
                          <div className="flex items-center gap-3">
                            <button className="flex items-center gap-1 hover:text-red-505"><ThumbsUp className="h-3.5 w-3.5" /> {art.likes || 0}</button>
                            <button className="flex items-center gap-1 hover:text-blue-505"><MessageCircle className="h-3.5 w-3.5" /> {art.comments || 0}</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Display Ad (Leaderboard placeholder) */}
              <div className="p-4 bg-gray-100 dark:bg-gray-955 border border-gray-200 dark:border-gray-800 rounded-xl text-center shadow-3xs border-dashed">
                <span className="text-[8px] font-bold text-gray-400 block uppercase">Advertisement Spot</span>
                <p className="text-[10px] text-gray-500 mt-1">Strategic SaaS compliance platform listings. Request listing details.</p>
              </div>
            </div>

            {/* RIGHT COLUMN: AI preview locks, upgrade forms, display ads, sponsored tags */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              
              {/* Component 4: Premium Intelligence Card (Upgrade CTA) */}
              <div className="bg-slate-955 text-white border border-slate-900 p-5 rounded-2xl shadow-xs space-y-4">
                <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider block">PREMIUM INTELLIGENCE</span>
                <h4 className="text-xs font-bold leading-snug">Unlock Expert AI Editor Insights</h4>
                <p className="text-[10px] text-slate-300 leading-relaxed font-normal">
                  Access 1,300+ sector analyses, real-time custom regulatory reports, and central bank tariff tables.
                </p>
                <Link href="/eoi" className="block text-center bg-amber-500 hover:bg-amber-600 text-gray-955 font-bold text-xs py-2 rounded transition-colors uppercase">
                  Upgrade Plan
                </Link>
              </div>

              {/* Component 5: Display Ads (Side Box) */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-xs text-center space-y-2">
                <span className="text-[8px] font-bold text-gray-400 block uppercase">Display Ad</span>
                <div className="bg-gray-50 dark:bg-gray-955 p-4 rounded border border-dashed border-gray-200 dark:border-gray-800">
                  <span className="font-bold text-xs text-blue-500 block">AWS for Trade</span>
                  <p className="text-[9px] text-gray-500 mt-1 leading-snug">Power compliant trade workflows at sub-second speeds.</p>
                </div>
              </div>

              {/* Component 6: Featured Companies follow list */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-xs space-y-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Featured Companies</span>
                <div className="flex flex-wrap gap-1.5">
                  {["Toyota Logistics", "Siemens M&A", "EcoHydro Power", "AWS", "NVIDIA Intel"].map((comp, idx) => (
                    <span key={idx} className="bg-gray-50 dark:bg-gray-955 border border-gray-200 dark:border-gray-800 px-2 py-0.5 rounded text-[9px] font-semibold">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Component 7: Newsletter Signup */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-800 p-5 rounded-2xl shadow-xs space-y-4">
                <h4 className="text-xs font-bold text-gray-955 dark:text-white uppercase tracking-wider">Editor Newsletter</h4>
                <p className="text-[10px] text-gray-500 leading-relaxed font-normal">
                  Subscribe to receive daily digests hand-curated by our global editorial office.
                </p>
                {subscribed ? (
                  <div className="bg-emerald-50 dark:bg-emerald-955/20 border border-emerald-300 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 p-3 rounded-lg text-[10px] font-bold text-center">
                    ✓ Subscribed Successfully!
                  </div>
                ) : (
                  <div className="space-y-2">
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="work@company.com"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-955 text-xs outline-none focus:border-blue-555"
                    />
                    <button
                      onClick={() => { if (email) setSubscribed(true); }}
                      className="w-full bg-[#1E3A5F] hover:bg-[#152e4f] text-white text-xs font-bold py-2 rounded-lg transition-colors"
                    >
                      Subscribe
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

      </div>
    );
  }


  if (slugParts[0] === "trending" && slugParts.length > 1) {
    const trendSlug = slugParts[1]; // "most-liked", "most-shared", "most-commented"
    const trendName = subMatch?.label || "Most Liked";
    const subTab = slugParts[2] || "my"; // "my" or "all"

    if (trendSlug === "most-liked" && subTab === "my") {
      return <NewsPOCTrendingMostLikedMySectors onBack={() => router.back()} />;
    }

    if (trendSlug === "most-liked" && subTab === "all") {
      return <NewsPOCTrendingMostLikedAllSectors onBack={() => router.back()} />;
    }

    if (trendSlug === "most-shared" && subTab === "my") {
      return <NewsPOCTrendingMostSharedMySectors onBack={() => router.back()} />;
    }

    if (trendSlug === "most-shared" && subTab === "all") {
      return <NewsPOCTrendingMostSharedAllSectors onBack={() => router.back()} />;
    }

    if (trendSlug === "most-commented" && subTab === "my") {
      return <NewsPOCTrendingMostCommentedMySectors onBack={() => router.back()} />;
    }

    if (trendSlug === "most-commented" && subTab === "all") {
      return <NewsPOCTrendingMostCommentedAllSectors onBack={() => router.back()} />;
    }

    // Tailored article data per submenu
    const articlesMap: Record<string, any[]> = {
      "most-liked": [
        { id: "tl-1", title: "Green Steel Revolution: India's New Export Frontier to European Markets", excerpt: "Sustainable metallurgy exports surge by 22% as producers align with international carbon standards. European buyers place forward contracts at record pace.", sector: "Steel & Metallurgy", date: "2 hrs ago", likes: 3420, shares: 450, comments: 128, type: "Highly Liked", sponsored: false, author: "Marcus Chen", role: "Trade Analyst" },
        { id: "tl-2", title: "EV Charging Infrastructure Investment Receives Government Grid Approval", excerpt: "Fresh budget unlocks 1,200 solar charging plazas along Western expressways, doubling EV cargo ranges and lowering depot operational costs.", sector: "Automotive & EV", date: "4 hrs ago", likes: 2890, shares: 320, comments: 84, type: "Highly Liked", sponsored: false, author: "Priya Sharma", role: "Policy Analyst" },
        { id: "tl-3", title: "Lithium Carbonate Spot Prices Rally as Global Battery Demand Accelerates", excerpt: "Spot markets register 14% gains in 48 hours as EV battery manufacturers bid on constrained Chilean supply chains.", sector: "Mining & Commodities", date: "6 hrs ago", likes: 2240, shares: 198, comments: 55, type: "Sponsored Insight", sponsored: true, author: "Elena Rostova", role: "Market Strategist" }
      ],
      "most-shared": [
        { id: "ts-1", title: "APAC Supply Chain Shifts: Cargo Operators Bypass Transit Bottlenecks", excerpt: "Strategic cargo reroutings through Da Nang and Chennai reduce sea cargo delays by 6 days. Logistics operators in Southeast Asia adopt AI-assisted scheduling.", sector: "Logistics", date: "1 hr ago", likes: 1800, shares: 1420, comments: 220, type: "Highly Shared", sponsored: false, author: "Julian Vance", role: "Supply Chain Director" },
        { id: "ts-2", title: "Autonomous Drone Spraying Adoption Expands Wheat Export Output by 18%", excerpt: "Western grain cooperatives roll out automated spray schedules, securing record high harvest yields. Indian wheat exports show fastest growth since 2019.", sector: "Agriculture", date: "5 hrs ago", likes: 1540, shares: 980, comments: 140, type: "Highly Shared", sponsored: false, author: "Aisha Patel", role: "AgriTech Correspondent" },
        { id: "ts-3", title: "US FTC Clears $14.2B Semiconductor Acquisition: Global Trade Implications", excerpt: "Antitrust clearance paves way for reshaping advanced packaging ecosystem, enabling new OSAT corridors across Southeast Asia.", sector: "Semiconductors", date: "8 hrs ago", likes: 1290, shares: 768, comments: 98, type: "Highly Shared", sponsored: false, author: "Satoshi Yamamoto", role: "Tech Policy Editor" }
      ],
      "most-commented": [
        { id: "tc-1", title: "Bilateral Tariff Negotiations: EU Carbon Border Tax Revisions Draw Industry Debate", excerpt: "Exporters raise concerns over carbon accounting rules, claiming metallurgical cargo face profit margin drops of 8–14%. Debate intensifies in Brussels corridors.", sector: "Trade Compliance", date: "30m ago", likes: 2100, shares: 190, comments: 940, type: "Highly Active", sponsored: false, author: "Sonia Marchetti", role: "Brussels Correspondent" },
        { id: "tc-2", title: "Deep Sea Power Grid Investment: Funding Frameworks Spark Regulatory Discussions", excerpt: "Inter-ministerial panels dispute offshore private lines ownership, seeking corporate backing structures. Environmental groups raise long-horizon concerns.", sector: "Energy & Infrastructure", date: "2 hrs ago", likes: 1650, shares: 110, comments: 520, type: "Highly Active", sponsored: false, author: "Deepak Narang", role: "Energy Policy Editor" },
        { id: "tc-3", title: "WTO Trade Facilitation Revisions: New Rules Split Global Exporters", excerpt: "Single window digitization targets split opinions among Tier-1 and Tier-2 exporters over compliance cost burdens and timeline expectations.", sector: "WTO & Policy", date: "3 hrs ago", likes: 1200, shares: 88, comments: 410, type: "Highly Active", sponsored: false, author: "Chloé Moreau", role: "Policy Analyst" }
      ]
    };

    const articles = articlesMap[trendSlug] || articlesMap["most-liked"];

    // Revenue focus labels per submenu + tab
    const revenueFocusMap: Record<string, Record<string, string[]>> = {
      "most-liked": {
        my: ["AI Recommendations", "Top Liked Companies Ranking", "Premium AI Ranking"],
        all: ["Global Leaderboard", "Sponsored Rankings", "Premium Analytics"]
      },
      "most-shared": {
        my: ["Viral Reports", "Featured Companies", "Premium Insights"],
        all: ["Country-wise Sharing Map", "Sponsored Campaigns", "Viral Intelligence"]
      },
      "most-commented": {
        my: ["Expert Discussions", "Community Polls", "Premium Access"],
        all: ["Industry Debates", "Sponsored Discussions", "Live Expert Q&A"]
      }
    };

    const revFocus = revenueFocusMap[trendSlug]?.[subTab] || ["Premium Upgrade CTA", "Sponsored Stories", "Featured Experts"];

    // AI score per submenu
    const aiScoreMap: Record<string, number> = {
      "most-liked": 94,
      "most-shared": 88,
      "most-commented": 91
    };
    const aiScore = aiScoreMap[trendSlug] || 88;

    // Related topics per submenu
    const relatedTopicsMap: Record<string, string[]> = {
      "most-liked": ["#EVBatteries", "#SteelExports", "#IndiaManufacturing", "#Lithium", "#GreenHydrogen"],
      "most-shared": ["#LogisticsTech", "#SupplyChain", "#DroneAgri", "#Semiconductors", "#TradeRoutes"],
      "most-commented": ["#CarbonTax", "#WTO", "#EUPolicy", "#OffshoreEnergy", "#TariffDebate"]
    };
    const relatedTopics = relatedTopicsMap[trendSlug] || ["#TrendingNow", "#Trade", "#APAC"];

    // Expert featured per submenu
    const expertsMap: Record<string, any[]> = {
      "most-liked": [
        { name: "Marcus Chen", role: "Supply Chain Director", badge: "Expert", color: "bg-blue-500" },
        { name: "Priya Sharma", role: "Trade Policy Analyst", badge: "Analyst", color: "bg-emerald-500" }
      ],
      "most-shared": [
        { name: "Julian Vance", role: "Supply Chain Director", badge: "Expert", color: "bg-indigo-500" },
        { name: "Aisha Patel", role: "AgriTech Correspondent", badge: "Analyst", color: "bg-teal-500" }
      ],
      "most-commented": [
        { name: "Sonia Marchetti", role: "Brussels Correspondent", badge: "Expert", color: "bg-purple-500" },
        { name: "Deepak Narang", role: "Energy Policy Editor", badge: "Analyst", color: "bg-orange-500" }
      ]
    };
    const experts = expertsMap[trendSlug] || expertsMap["most-liked"];

    return (
      <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 transition-colors duration-300">

        {/* ─── HEADER: Title, AI Score, Search ─── */}
        <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-5">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:text-blue-500 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Trending · {subTab === "my" ? "My Sectors" : "All Sectors"}</span>
                <h1 className="font-display text-xl font-bold leading-none mt-0.5">{trendName} Feed</h1>
              </div>
              {/* AI Score badge */}
              <div className="ml-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs">
                <Sparkles className="h-3 w-3" />
                <span className="text-[10px] font-bold">AI Score: {aiScore}%</span>
              </div>
            </div>

            {/* Inline search */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search trending topics..."
                  className="pl-8 pr-3 py-2 text-xs rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 outline-none focus:border-blue-500 w-52"
                />
              </div>
              {/* My Sectors / All Sectors tab */}
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-900 p-0.5 rounded-xl border border-gray-200 dark:border-gray-800">
                {[
                  { key: "my", label: "My Sectors" },
                  { key: "all", label: "All Sectors" }
                ].map((sub) => (
                  <button
                    key={sub.key}
                    onClick={() => router.push(`/en/news-poc/trending/${trendSlug}/${sub.key}`)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                      subTab === sub.key
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── FILTERS: Date, Sector, Country, Region ─── */}
        <section className="mx-auto max-w-7xl px-4 pt-4 lg:px-6">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-3 flex flex-wrap gap-4 items-center shadow-xs">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Filters:</span>
            {[
              { label: "Date", options: ["Last 7 Days", "Last 24 Hours", "Last 30 Days"] },
              { label: "Sector", options: ["All Sectors", "EV & Energy", "Logistics", "Agriculture"] },
              { label: "Country", options: ["Global", "India", "USA", "Germany"] },
              { label: "Region", options: ["Global", "APAC", "EMEA", "Americas"] }
            ].map((filter) => (
              <div key={filter.label} className="flex items-center gap-1.5">
                <span className="text-[9px] text-gray-500 font-semibold">{filter.label}:</span>
                <select className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded px-2 py-0.5 text-[10px] font-semibold outline-none">
                  {filter.options.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
        </section>

        {/* ─── MAIN GRID ─── */}
        <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
          <div className="grid grid-cols-12 gap-8">

            {/* LEFT MAIN COLUMN (col 1-8) */}
            <div className="col-span-12 lg:col-span-8 space-y-8">

              {/* ── Hero Trending Story ── */}
              {articles.length > 0 && (
                <div className="relative rounded-2xl overflow-hidden bg-slate-950 text-white min-h-[340px] flex flex-col justify-end p-8 border border-slate-900 shadow-sm group">
                  <div
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-25 group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&auto=format&fit=crop&q=80')` }}
                  />
                  <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

                  {/* Engagement strip at top */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                    <span className="bg-white/10 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ThumbsUp className="h-2.5 w-2.5" /> {(articles[0].likes / 1000).toFixed(1)}K
                    </span>
                    <span className="bg-white/10 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Share2 className="h-2.5 w-2.5" /> {articles[0].shares}
                    </span>
                    <span className="bg-white/10 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <MessageCircle className="h-2.5 w-2.5" /> {articles[0].comments}
                    </span>
                  </div>

                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#E63946] text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        {trendSlug === "most-liked" ? "Top Liked" : trendSlug === "most-shared" ? "Most Viral" : "Most Discussed"}
                      </span>
                      <span className="text-slate-400 text-[9px] font-semibold">{articles[0].date}</span>
                    </div>
                    <h2 className="font-display text-xl md:text-3xl font-bold leading-tight text-[#FEC970] max-w-2xl">
                      {articles[0].title}
                    </h2>
                    <p className="text-slate-300 text-xs md:text-sm font-normal max-w-xl leading-relaxed">
                      {articles[0].excerpt}
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-[9px] uppercase">
                        {articles[0].author?.charAt(0)}
                      </div>
                      <div>
                        <span className="text-white font-bold text-[10px] block">{articles[0].author}</span>
                        <span className="text-slate-400 text-[9px] block">{articles[0].role}</span>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Link href={`/en/news-poc/article/${articles[0]?.id || "sec-1"}`} className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-[10px] px-4 py-2 rounded transition-all">
                        Read Full Story
                      </Link>
                      <button className="border border-white/20 hover:bg-white/10 text-white font-bold text-[10px] px-4 py-2 rounded transition-all flex items-center gap-1.5">
                        <Bookmark className="h-3 w-3" /> Save
                      </button>
                      <button className="border border-white/20 hover:bg-white/10 text-white font-bold text-[10px] px-4 py-2 rounded transition-all flex items-center gap-1.5">
                        <Share2 className="h-3 w-3" /> Share
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Trending News Feed with engagement metrics ── */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-850 pb-2">
                  <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    {subTab === "my" ? "Trending in Your Sectors" : "All Sector Trending"}
                  </h3>
                  <span className="text-[9px] font-bold text-gray-400 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 bg-red-500 rounded-full animate-pulse" /> Live
                  </span>
                </div>

                <div className="space-y-4">
                  {articles.map((art, idx) => (
                    <div key={art.id} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl hover:shadow-md transition-all group">
                      <div className="flex gap-4 items-start">
                        {/* Rank number */}
                        <span className="font-display text-3xl font-extrabold text-gray-150 dark:text-gray-800 group-hover:text-blue-500 transition-colors leading-none shrink-0 w-8 text-center">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div className="flex-1 space-y-2">
                          <div className="flex justify-between items-start flex-wrap gap-2">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className={`text-[8px] font-bold px-2 py-0.5 rounded-sm uppercase ${
                                art.sponsored
                                  ? "bg-amber-500/15 text-amber-600 border border-amber-500/20"
                                  : "bg-blue-50 text-blue-600 dark:bg-blue-950/20"
                              }`}>
                                {art.type}
                              </span>
                              {art.sponsored && <span className="text-[7px] font-bold text-amber-500 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">SPONSORED</span>}
                            </div>
                            <span className="text-[9px] font-mono text-gray-400 font-bold">{art.sector}</span>
                          </div>

                          <h4 className="text-xs md:text-sm font-bold text-gray-950 dark:text-white leading-snug group-hover:text-blue-500 transition-colors">{art.title}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-normal">{art.excerpt}</p>

                          <div className="flex items-center gap-2 text-[9px] text-gray-400 font-semibold">
                            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-[7px] uppercase shrink-0">
                              {art.author?.charAt(0)}
                            </div>
                            <span>{art.author}</span>
                            <span>•</span>
                            <span>{art.role}</span>
                            <span>•</span>
                            <span>{art.date}</span>
                          </div>

                          {/* Engagement metrics bar */}
                          <div className="flex items-center justify-between pt-3 border-t border-gray-50 dark:border-gray-850">
                            <div className="flex items-center gap-4 text-[10px] font-bold">
                              <span className="flex items-center gap-1 text-red-500"><ThumbsUp className="h-3.5 w-3.5" /> {(art.likes / 1000).toFixed(1)}K</span>
                              <span className="flex items-center gap-1 text-blue-500"><Share2 className="h-3.5 w-3.5" /> {art.shares}</span>
                              <span className="flex items-center gap-1 text-emerald-500"><MessageCircle className="h-3.5 w-3.5" /> {art.comments}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="text-[9px] font-bold text-gray-450 border border-gray-200 dark:border-gray-800 px-2 py-0.5 rounded hover:bg-gray-50 dark:hover:bg-gray-850 transition-colors">
                                Save
                              </button>
                              <button className="text-[9px] font-bold text-gray-455 border border-gray-200 dark:border-gray-800 px-2 py-0.5 rounded hover:bg-gray-50 dark:hover:bg-gray-850 transition-colors">
                                Follow
                              </button>
                              <Link href="/eoi" className="text-[9px] font-bold text-blue-500 border border-blue-200 dark:border-blue-900 px-2 py-0.5 rounded hover:bg-blue-50 dark:hover:bg-blue-955/20 transition-colors">
                                Read →
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Sponsored Content ── */}
              <div className="border border-amber-200 dark:border-amber-900/40 bg-amber-50/10 dark:bg-amber-950/5 p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-amber-200/30">
                  <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest">Sponsored Story</span>
                  <span className="bg-amber-500 text-gray-950 text-[7px] font-bold px-1.5 py-0.5 rounded font-mono">AD</span>
                </div>
                <h4 className="text-sm font-bold text-gray-950 dark:text-white leading-snug">
                  {trendSlug === "most-shared"
                    ? "Viral Intelligence Report: Why Trade Stories Spread in 2025"
                    : trendSlug === "most-commented"
                    ? "Community Debate Analysis: Carbon Tax and Who's Really Paying"
                    : "Premium AI Rankings: The Top 20 Most-Liked Trade Articles This Month"}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                  Exclusive sponsored analysis covering comprehensive industry engagement trends, market momentum trackers, and regional sentiment comparisons aggregated weekly.
                </p>
                <div className="flex items-center gap-3">
                  <Link href="/eoi" className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs px-4 py-2 rounded transition-all uppercase">
                    Download Sponsored Report
                  </Link>
                  <button className="text-xs font-bold text-gray-400 hover:underline">Dismiss</button>
                </div>
              </div>

              {/* ── Banner Ad ── */}
              <div className="bg-gray-100 dark:bg-gray-955 border border-gray-200 dark:border-gray-800 border-dashed p-5 rounded-2xl text-center space-y-1">
                <span className="text-[8px] font-bold text-gray-400 block uppercase tracking-widest">Advertisement</span>
                <p className="text-xs font-bold text-gray-600 dark:text-gray-400">Trade Platform SaaS · Your brand here · 320 × 50</p>
                <Link href="/eoi" className="text-[9px] font-bold text-blue-500 hover:underline block uppercase mt-1">Request Ad Placement</Link>
              </div>

              {/* ── Related Trending Topics ── */}
              <div className="space-y-3">
                <h4 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-gray-850 pb-2">
                  Related Trending Topics
                </h4>
                <div className="flex flex-wrap gap-2">
                  {relatedTopics.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 px-3 py-1 rounded-full text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-955/20 cursor-pointer transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* ─── RIGHT SIDEBAR (col 9-12) ─── */}
            <div className="col-span-12 lg:col-span-4 space-y-6">

              {/* ── AI Trend Insights (Premium) ── */}
              <div className="bg-slate-950 text-white border border-slate-900 p-5 rounded-2xl shadow-xs space-y-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/60 to-purple-950/40 pointer-events-none" />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider">AI Trend Insights</span>
                    <span className="bg-amber-500 text-gray-950 text-[7px] font-bold px-1.5 py-0.5 rounded ml-auto">PRO</span>
                  </div>
                  <h4 className="text-xs font-bold leading-snug">
                    {trendSlug === "most-liked"
                      ? "AI Confidence: Steel exports to Europe will sustain 18%+ growth for 3 consecutive quarters."
                      : trendSlug === "most-shared"
                      ? "AI Signal: Viral logistics content predicts 6-day average cargo delay reduction across APAC by Q4."
                      : "AI Debate Score: Carbon border tax debate has 89% likelihood of triggering policy revision within 120 days."}
                  </h4>
                  <div className="flex items-center gap-3 text-[10px]">
                    <div>
                      <span className="text-[8px] text-slate-500 block uppercase">Confidence</span>
                      <span className="font-bold text-amber-400 font-mono">{aiScore}% MATCH</span>
                    </div>
                    <div className="h-8 w-px bg-slate-800" />
                    <div>
                      <span className="text-[8px] text-slate-500 block uppercase">Model</span>
                      <span className="font-bold text-white">IGEN AI Plus</span>
                    </div>
                  </div>
                  <Lock className="h-4 w-4 text-white/30 absolute top-4 right-4" />
                  <Link href="/eoi" className="block text-center bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs py-2 rounded transition-colors uppercase">
                    Unlock AI Analysis
                  </Link>
                </div>
              </div>

              {/* ── Premium Upgrade Widget ── */}
              <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white border border-slate-800 p-5 rounded-2xl shadow-xs space-y-4">
                <h4 className="font-display text-sm font-bold">Go Premium</h4>
                <ul className="space-y-2 text-[10px] text-slate-300 font-normal">
                  {revFocus.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <CheckCircle className="h-3 w-3 text-emerald-400 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link href="/eoi" className="block text-center bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs py-2.5 rounded transition-colors uppercase">
                  Upgrade Access
                </Link>
              </div>


              {/* ── Featured Companies ── */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-xs space-y-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block border-b border-gray-50 dark:border-gray-850 pb-2">Featured Companies</span>
                <div className="space-y-2">
                  {[
                    { name: "Tata Steel", tag: "Steel", trending: true },
                    { name: "Mahindra Logistics", tag: "Logistics", trending: false },
                    { name: "NVIDIA Supply Chain", tag: "Semiconductors", trending: true }
                  ].map((comp, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-950/30 border border-gray-200 dark:border-gray-800 flex items-center justify-center font-bold text-blue-600 text-[9px]">
                          {comp.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold block text-gray-900 dark:text-white text-[10px]">{comp.name}</span>
                          <span className="text-[9px] text-gray-450">{comp.tag}</span>
                        </div>
                      </div>
                      {comp.trending && (
                        <span className="text-[8px] font-bold text-emerald-500 flex items-center gap-0.5">
                          <TrendingUp className="h-2.5 w-2.5" /> Trending
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Featured Experts ── */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-xs space-y-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block border-b border-gray-50 dark:border-gray-850 pb-2">Featured Experts</span>
                <div className="space-y-3">
                  {experts.map((expert, idx) => (
                    <div key={idx} className={`flex items-center gap-2 ${idx > 0 ? "border-t border-gray-50 dark:border-gray-850 pt-2" : ""}`}>
                      <div className={`h-8 w-8 rounded-full ${expert.color} text-white flex items-center justify-center font-bold text-xs uppercase shrink-0`}>
                        {expert.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 dark:text-white text-xs block">{expert.name}</span>
                        <span className="text-[9px] text-gray-450">{expert.role}</span>
                      </div>
                      <button className="ml-auto text-[9px] font-bold text-blue-500 border border-blue-200 dark:border-blue-900 px-2 py-0.5 rounded hover:bg-blue-50 dark:hover:bg-blue-955/20 transition-colors">
                        Follow
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Newsletter Subscription ── */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs space-y-3">
                <h4 className="text-xs font-bold text-gray-955 dark:text-white uppercase tracking-wider">
                  {trendSlug === "most-liked" ? "Liked Stories Digest" : trendSlug === "most-shared" ? "Viral Trade Brief" : "Discussion Digest"}
                </h4>
                <p className="text-[10px] text-gray-500 leading-relaxed font-normal">
                  Get the top {trendSlug === "most-liked" ? "liked" : trendSlug === "most-shared" ? "shared" : "discussed"} trade stories delivered to your inbox every morning.
                </p>
                {subscribed ? (
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 p-3 rounded-lg text-[10px] font-bold text-center">
                    ✓ Subscribed Successfully!
                  </div>
                ) : (
                  <div className="space-y-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="work@company.com"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-955 text-xs outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={() => { if (email) setSubscribed(true); }}
                      className="w-full bg-[#1E3A5F] hover:bg-[#152e4f] text-white text-xs font-bold py-2 rounded-lg transition-colors"
                    >
                      Subscribe
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

      </div>
    );
  }


  // Non-feed modules fall back to coming soon
  const menuName = menuMatch?.label || slugParts[0] || "Unknown Module";
  const subName = subMatch?.label || slugParts[1] || "";
  const subSubName = subSubMatch?.label || slugParts[2] || "";
  const displayTitle = subSubName 
    ? `${subSubName} (${subName})` 
    : subName 
    ? subName 
    : menuName;
  const purpose = subSubMatch?.description || subMatch?.description || menuMatch?.purpose || "B2B Trade Intelligence Content Workspace.";
  const accessTier = menuMatch?.tier || "All Tiers";
  const audienceList = menuMatch?.audience || ["Industry Professionals", "Exporters & Importers"];
  const canonicalUrl = `https://indiaglobalnews.com/news-poc/${slugParts.join("/")}`;
  const proposedSlug = `/news-poc/${slugParts.join("/")}`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 lg:px-6">
      <button
        onClick={() => router.back()}
        className="mb-8 flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Previous
      </button>

      <div className="overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl">
        <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 p-8 text-white">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-blue-200 uppercase mb-3">
            <span>India Global News POC</span>
            <span>/</span>
            <span>{menuMatch?.id || "IGN-Module"}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold">{displayTitle}</h1>
          <p className="mt-2 text-sm text-blue-100 max-w-2xl">{purpose}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-white backdrop-blur-md">
              <Key className="h-3 w-3 text-amber-400" /> Access Tier: {accessTier}
            </span>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="flex items-start gap-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 p-5">
            <ShieldAlert className="h-5 w-5 text-amber-700" />
            <div>
              <h3 className="font-bold text-amber-900 dark:text-amber-200 text-sm">Coming Soon - Mock Page Placeholder</h3>
              <p className="mt-1 text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
                This page layout has been successfully structured and mapped in the Navigation Tree. Under the final platform release, it will display the full database components.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/20">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-500" /> Target Audience Focus
              </h4>
              <ul className="space-y-1.5 pl-1.5">
                {audienceList.map((aud: string, index: number) => (
                  <li key={index} className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" /> {aud}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/20">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2 font-semibold">
                Proposed SEO Metadata
              </h4>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-semibold text-gray-500 block">Proposed Route:</span>
                  <code className="text-blue-600 dark:text-blue-400 font-mono break-all">{proposedSlug}</code>
                </div>
                <div>
                  <span className="font-semibold text-gray-500 block">Canonical URL:</span>
                  <code className="text-gray-600 dark:text-gray-400 font-mono break-all">{canonicalUrl}</code>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 dark:border-gray-850 pt-6 flex items-center justify-between">
            <Link href="/news-poc" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-5 py-2.5 rounded-lg shadow-sm">
              Explore News POC Workspace Hub
            </Link>
            <Link href="/eoi" className="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-xs px-5 py-2.5 rounded-lg">
              Submit EOI Form
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
