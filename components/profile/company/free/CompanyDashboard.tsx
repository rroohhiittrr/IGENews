"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Users, FileText, CheckCircle2, Lock, 
  ArrowRight, Sparkles,
  Check, ChevronRight, ChevronLeft, BarChart3, AlertCircle, Edit3, 
  Settings, Eye, Plus, Mail, Briefcase, Building2,
  Trash2, Globe, MapPin, Upload, Award, Compass, Zap,
  ExternalLink, Share2, HelpCircle,
  TrendingUp, TrendingDown, MessageSquare, ThumbsUp, Repeat,
  UserPlus, Bell, Image as ImageIcon, Video,
  Search, Info, Filter,
  X, ArrowLeft, Calendar, Download,
  MoreHorizontal, ChevronDown, Clock, Smile, Layers, Send
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import CompanyPublicProfile from "@/components/profile/company/CompanyPublicProfile";

export default function CompanyDashboard() {
  const { user, updateOnboarding } = useAuth();
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || "en";

  // Active Plan determination (Default to company for rich experience, toggleable in UI)
  const rawPlan = user?.companyPlan || "free";
  const initialTier: "free" | "startup" | "company" | "corporate" = 
    rawPlan === "corporate" || rawPlan === "gold" ? "corporate"
    : rawPlan === "company" ? "company"
    : rawPlan === "startup" || rawPlan === "silver" ? "startup"
    : "company";

  const [activeTier, setActiveTier] = useState<"free" | "startup" | "company" | "corporate">(initialTier);

  const isFree = activeTier === "free";
  const isStartup = activeTier === "startup";
  const isCompany = activeTier === "company";
  const isCorporate = activeTier === "corporate";

  // Allowed leader seats & invite credits by tier
  const maxLeaderSeats = isCorporate ? 5 : isCompany ? 2 : isStartup ? 1 : 0;
  const maxInviteCredits = isCorporate ? 500 : isCompany ? 300 : isStartup ? 100 : 0;
  const [inviteCredits, setInviteCredits] = useState(maxInviteCredits);

  // View states: Admin vs Public Preview vs Metrics Drilldown
  const [viewMode, setViewMode] = useState<"private" | "public">("private");
  const [selectedPostMetrics, setSelectedPostMetrics] = useState<any | null>(null);

  // Admin Navigation Tabs (Exact LinkedIn Architecture)
  const [activeAdminNav, setActiveAdminNav] = useState<
    "dashboard" | "page_posts" | "analytics" | "feed" | "activity" | "inbox" | "services" | "team" | "vision" | "settings"
  >("dashboard");

  // Analytics Sub-Tabs (LinkedIn Architecture: Content, Visitors, Followers, Search appearances, Competitors, Leads)
  const [activeAnalyticsTab, setActiveAnalyticsTab] = useState<
    "content" | "visitors" | "followers" | "search" | "competitors" | "leads"
  >("visitors");

  // Shared Date Range & Export States
  const [analyticsDateRange, setAnalyticsDateRange] = useState("Aug 4, 2026 - Sep 2, 2026");
  const [dateRangeDropdownOpen, setDateRangeDropdownOpen] = useState(false);
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<"xls" | "csv">("xls");

  // Content Analytics States
  const [contentMetricSelected, setContentMetricSelected] = useState<
    "impressions" | "unique_views" | "clicks" | "reactions" | "comments" | "reposts"
  >("impressions");
  const [contentMetricDropdownOpen, setContentMetricDropdownOpen] = useState(false);
  const [contentEngagementTab, setContentEngagementTab] = useState<"all" | "articles" | "media" | "documents">("all");

  // Visitors Analytics States
  const [visitorMetricSelected, setVisitorMetricSelected] = useState<"page_views" | "unique_visitors">("page_views");
  const [visitorMetricDropdownOpen, setVisitorMetricDropdownOpen] = useState(false);
  const [visitorPageFilter, setVisitorPageFilter] = useState<"all" | "overview" | "vision" | "offerings" | "insights" | "team">("all");
  const [visitorTempPageFilter, setVisitorTempPageFilter] = useState<"all" | "overview" | "vision" | "offerings" | "insights" | "team">("all");
  const [visitorPageModalOpen, setVisitorPageModalOpen] = useState(false);
  const [visitorDesktopChecked, setVisitorDesktopChecked] = useState(true);
  const [visitorMobileChecked, setVisitorMobileChecked] = useState(true);
  const [dismissVisitorBanner, setDismissVisitorBanner] = useState(false);
  const [showAllVisitorsModalOpen, setShowAllVisitorsModalOpen] = useState(false);
  const [visitorDemographicFilter, setVisitorDemographicFilter] = useState<"size" | "industry" | "location" | "seniority">("size");
  const [visitorDemographicDropdownOpen, setVisitorDemographicDropdownOpen] = useState(false);

  // Followers Analytics States
  const [followerSponsoredChecked, setFollowerSponsoredChecked] = useState(true);
  const [followerOrganicChecked, setFollowerOrganicChecked] = useState(true);
  const [followerAutoInvitedChecked, setFollowerAutoInvitedChecked] = useState(true);
  const [followerDemographicFilter, setFollowerDemographicFilter] = useState<"location" | "size" | "industry" | "seniority">("location");
  const [followerDemographicDropdownOpen, setFollowerDemographicDropdownOpen] = useState(false);
  const [followerDemographicsShowAll, setFollowerDemographicsShowAll] = useState(false);
  const [followerRosterTab, setFollowerRosterTab] = useState<"people" | "pages">("people");
  const [dismissFollowerBanner, setDismissFollowerBanner] = useState(false);
  const [showAllFollowersModalOpen, setShowAllFollowersModalOpen] = useState(false);

  // Search Appearances Analytics States
  const [searchDemographicFilter, setSearchDemographicFilter] = useState<"company" | "industry">("company");
  const [searchDemographicDropdownOpen, setSearchDemographicDropdownOpen] = useState(false);
  const [dismissSearchBanner, setDismissSearchBanner] = useState(false);
  const [boostablePostsModalOpen, setBoostablePostsModalOpen] = useState(false);

  // Competitors Analytics States
  const [dismissCompetitorBanner, setDismissCompetitorBanner] = useState(false);
  const [editCompetitorsModalOpen, setEditCompetitorsModalOpen] = useState(false);
  const [newCompetitorInput, setNewCompetitorInput] = useState("");
  const [trackedCompetitors, setTrackedCompetitors] = useState([
    { id: "c1", name: "Gartner", followers: "2,252,680", newFollowers: "16.6K", newFollowersPct: "+14.1%", posts: "113", postsPct: "-2.6%", comments: "1.4K", commentsPct: "+1%", dailyComments: "46", dailyCommentsPct: "+1%", reactions: "39.9K", reactionsPct: "+65.1%", logoBg: "bg-blue-900", logoText: "Gartner" },
    { id: "c2", name: "World Economic Forum", followers: "5,609,439", newFollowers: "13.9K", newFollowersPct: "-1.6%", posts: "234", postsPct: "-4.9%", comments: "3K", commentsPct: "-11.9%", dailyComments: "101", dailyCommentsPct: "-11.9%", reactions: "138.8K", reactionsPct: "+52.1%", logoBg: "bg-slate-900", logoText: "WEF" },
    { id: "c3", name: "CXO Lanes", followers: "508,899", newFollowers: "12.4K", newFollowersPct: "-26.6%", posts: "1K", postsPct: "0%", comments: "28.5K", commentsPct: "-24.6%", dailyComments: "951", dailyCommentsPct: "-24.6%", reactions: "394.6K", reactionsPct: "+2.9%", logoBg: "bg-red-700", logoText: "CXO" },
    { id: "c4", name: "FICCI", followers: "243,841", newFollowers: "3.8K", newFollowersPct: "+0.5%", posts: "250", postsPct: "-22.6%", comments: "205", commentsPct: "-15.3%", dailyComments: "7", dailyCommentsPct: "-15.3%", reactions: "18.6K", reactionsPct: "+0.6%", logoBg: "bg-emerald-800", logoText: "FICCI" },
    { id: "c5", name: "ASSOCHAM (The Associated Chambers of Commerce and Industry of India)", followers: "113,991", newFollowers: "3.2K", newFollowersPct: "-10.1%", posts: "344", postsPct: "+17%", comments: "387", commentsPct: "+7.5%", dailyComments: "13", dailyCommentsPct: "+7.5%", reactions: "24.3K", reactionsPct: "+44.2%", logoBg: "bg-amber-700", logoText: "ASSOCHAM" },
  ]);

  // Leads Analytics States
  const [leadsViewMode, setLeadsViewMode] = useState<"table" | "empty">("table");

  // Feed Tab Interactive States
  const [feedLikedPosts, setFeedLikedPosts] = useState<Record<string, boolean>>({ "conv-1": false });
  const [feedLikeCounts, setFeedLikeCounts] = useState<Record<string, number>>({ "conv-1": 1553 });
  const [feedCommentInput, setFeedCommentInput] = useState("");
  const [feedSortDropdownOpen, setFeedSortDropdownOpen] = useState(false);
  const [feedSortBy, setFeedSortBy] = useState<"relevant" | "recent" | "all">("relevant");
  const [manageFollowingModalOpen, setManageFollowingModalOpen] = useState(false);
  const [followedCompanies, setFollowedCompanies] = useState<Record<string, boolean>>({
    zepto: false,
    sbi: false,
    lt: false,
    leadership_first: true,
    wef: true,
  });
  const [feedCommentsList, setFeedCommentsList] = useState<any[]>([
    {
      id: "comm-1",
      author: "Sabrina Shirley, PMP",
      badge: "3rd+",
      role: "You became the one everyone depends on. | Innerworld Designer | Former H...",
      time: "6h",
      likes: 8,
      isLiked: false,
      text: "This one is sharp. So true. Double standards burn trust down faster than almost anything. Here is the part that stays hidden though. Before a strong performer turns into a cynical spectator, they usually do the opposite first. They try harder. They tell themselves if they are just good enough, the unfair rule will not reach them. So the double standard does not make them...",
      replies: [
        {
          id: "reply-1",
          author: "Latoya Newland",
          verified: true,
          badge: "3rd+",
          role: "Mindset and Culture Strategist at The Culture Strategists",
          time: "5h",
          likes: 2,
          isLiked: false,
          text: "Sabrina Shirley, PMP I love this perspective. Unfortunately it often leads to crushed confidence, disengagement, employees not feeling psychologically safe and sadly, burnout. My work involves looking at a lot data and the impact workplace...",
        }
      ]
    },
    {
      id: "comm-2",
      author: "Latoya Newland",
      verified: true,
      badge: "3rd+",
      role: "Mindset and Culture Strategist at The Culture Strategists",
      time: "6h",
      likes: 3,
      isLiked: false,
      text: "Absolutely! Unfortunately I've experienced this. I was formally warned for something that wasn't against company policy, despite the majority of my team doing the same thing. When I raised this with HR, I was told, \"This is about you.\" No one else faced the same treatment.",
      replies: []
    }
  ]);

  // Activity Main Tab States (6 Sub-Tabs: All, Comments, Mentions, Reactions, Reposts, Analytics)
  const [activitySubTab, setActivitySubTab] = useState<"all" | "comments" | "mentions" | "reactions" | "reposts" | "analytics">("all");

  // Services Main Tab States (3 Sub-Tabs: Service page, Requests, Client projects)
  const [servicesSubTab, setServicesSubTab] = useState<"service_page" | "requests" | "client_projects">("service_page");
  const [selectedServiceRequestId, setSelectedServiceRequestId] = useState<string>("req-1");
  const [editServiceInfoModalOpen, setEditServiceInfoModalOpen] = useState(false);
  const [uploadWorkSampleModalOpen, setUploadWorkSampleModalOpen] = useState(false);
  const [submitProposalModalOpen, setSubmitProposalModalOpen] = useState(false);
  const [serviceAvailability, setServiceAvailability] = useState("Remote or in person (Bengaluru South)");
  const [servicePricingType, setServicePricingType] = useState("Contact for pricing");
  const [serviceTagsList, setServiceTagsList] = useState([
    "Trade Shows", "Brand Marketing", "Advertising", "Digital Marketing", "Growth Marketing",
    "Lead Generation", "Product Marketing", "Search Engine Marketing (SEM)", "Social Media Marketing", "Public Relations"
  ]);
  const [serviceRequestsList, setServiceRequestsList] = useState([
    {
      id: "req-1",
      clientName: "Priyanshu Mani tripathi",
      badge: "2nd",
      service: "Social Media Marketing",
      location: "Lucknow, Uttar Pradesh",
      time: "2d ago",
      avatar: "PM",
      avatarBg: "bg-blue-600",
      role: "Social Media Manager | Digital Growth & Brand Execution SEO | Graphic Designer | Wordpress | Web development",
      connection: "1 shared connection",
      channels: "Facebook",
      goals: "What are the goals for your project? Brand awareness, Lead generation for upcoming national trade expo",
      budget: "₹50,000 - ₹1,00,000",
      status: "New"
    },
    {
      id: "req-2",
      clientName: "virendra kumar",
      badge: "3rd",
      service: "Public Relations",
      location: "New Delhi, Delhi",
      time: "2d ago",
      avatar: "VK",
      avatarBg: "bg-emerald-700",
      role: "Senior Corporate Communications Lead | Media Outreach Director",
      connection: "2 shared connections",
      channels: "Print & National Media, Digital Wire",
      goals: "Press release dissemination across GCC & Indian business news networks.",
      budget: "₹1,00,000 - ₹2,50,000",
      status: "New"
    },
    {
      id: "req-3",
      clientName: "Anshul .",
      badge: "2nd",
      service: "Lead Generation",
      location: "Bengaluru, Karnataka",
      time: "2d ago",
      avatar: "AN",
      avatarBg: "bg-amber-700",
      role: "Founder & Growth Architect | Enterprise B2B Solutions",
      connection: "4 shared connections",
      channels: "Outbound B2B Email, Account-Based Marketing",
      goals: "Targeting VP Supply Chain leaders in automotive manufacturing sectors.",
      budget: "₹75,000 - ₹1,50,000",
      status: "New"
    },
    {
      id: "req-4",
      clientName: "Lohith Raj",
      badge: "3rd",
      service: "Product Marketing",
      location: "Hyderabad, Telangana",
      time: "4d ago",
      avatar: "LR",
      avatarBg: "bg-purple-700",
      role: "Product Marketing Lead | SaaS & DeepTech",
      connection: "1 shared connection",
      channels: "Product Launch Webinars, Technical Whitepapers",
      goals: "Go-to-market positioning for robotic sortation hardware release.",
      budget: "₹1,20,000 - ₹2,00,000",
      status: "New"
    },
    {
      id: "req-5",
      clientName: "Kashi Ram",
      badge: "2nd",
      service: "Digital Marketing",
      location: "Mumbai, Maharashtra",
      time: "6d ago",
      avatar: "KR",
      avatarBg: "bg-indigo-700",
      role: "Head of Marketing | Logistics & Fleet Tech",
      connection: "3 shared connections",
      channels: "Google Search Ads, Programmatic Display",
      goals: "Commercial warehouse lead acquisition campaigns across tier-1 logistics hubs.",
      budget: "₹2,00,000 - ₹4,00,000",
      status: "New"
    },
    {
      id: "req-6",
      clientName: "sahib chauhan",
      badge: "3rd",
      service: "Advertising",
      location: "Chandigarh, Punjab",
      time: "6d ago",
      avatar: "SC",
      avatarBg: "bg-teal-700",
      role: "Brand Strategy Director | Industrial Machinery",
      connection: "1 shared connection",
      channels: "Trade Media Banners, Billboard Exhibitions",
      goals: "Annual expo visibility sponsor package.",
      budget: "₹1,50,000 - ₹3,00,000",
      status: "New"
    }
  ]);

  // Settings & Invite States
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [autoInviteEngagers, setAutoInviteEngagers] = useState(true);
  const [inviteSearchQuery, setInviteSearchQuery] = useState("");
  const [inviteSegmentFilter, setInviteSegmentFilter] = useState("all");
  const [selectedInviteIds, setSelectedInviteIds] = useState<string[]>([]);
  const [settingsActiveModal, setSettingsActiveModal] = useState<null | "admins" | "restricted" | "following" | "inbox" | "content_sharing" | "visibility">(null);
  
  const [adminsList, setAdminsList] = useState([
    { id: "adm-1", name: "You (Owner)", email: "aditya@igenworld.com", role: "Super admin", avatar: "AD", avatarBg: "bg-blue-600" },
    { id: "adm-2", name: "Rajesh Sharma", email: "rajesh@igenworld.com", role: "Content admin", avatar: "RS", avatarBg: "bg-emerald-700" },
    { id: "adm-3", name: "Priya Varma", email: "priya@igenworld.com", role: "Analyst", avatar: "PV", avatarBg: "bg-purple-700" },
  ]);

  const [restrictedMembersList, setRestrictedMembersList] = useState([
    { id: "res-1", name: "Spam Bot Account #402", reason: "Excessive promotional spam", date: "Aug 12, 2026" },
    { id: "res-2", name: "Scraper Indexer Node", reason: "Automated crawling violation", date: "Aug 19, 2026" },
  ]);

  const [inboxMessagingAllowed, setInboxMessagingAllowed] = useState(true);
  const [inboxTopicsList, setInboxTopicsList] = useState([
    "Trade Expo Partnerships", "Commercial Offerings & RFPs", "Media & Press Inquiries", "Speaker & Panel Opportunities"
  ]);

  const [contentSharingSources, setContentSharingSources] = useState([
    { id: "rss-1", title: "iGEN Corporate Press Wire", url: "https://igenworld.com/rss/news.xml", status: "Active", autoPost: true },
    { id: "rss-2", title: "Leadership Medium Publication", url: "https://medium.com/feed/@igenleader", status: "Active", autoPost: false },
  ]);

  // Invite candidate connections list (from Screenshot 2)
  const candidateConnections = [
    { id: "inv-1", name: "Jawad Shariff", role: "Front-End Development Intern | Building Responsive and Interactive Web Interfaces Focused on UI/UX and Modern Web Technologies", loc: "Bengaluru", sector: "tech", avatar: "JS", avatarBg: "bg-slate-700" },
    { id: "inv-2", name: "Anmol jain", role: "Data Analyst | 60% Warehouse Efficiency ↑ | Power BI · SQL · Python | Supply Chain & E-commerce | ETL Pipelines", loc: "Delhi NCR", sector: "manufacturing", avatar: "AJ", avatarBg: "bg-emerald-700" },
    { id: "inv-3", name: "Saikiran Rangu", role: "MERN Stack Developer || Sequelize ORM | Next.js | TypeScript | TailwindCSS | REACT.js | Redux | Bootstrap || Node.js | Express.js | SQL", loc: "Hyderabad", sector: "tech", avatar: "SR", avatarBg: "bg-indigo-700" },
    { id: "inv-4", name: "Sekhar Maaram", role: "Senior Software Engineer | Backend & Full-Stack Engineer | MongoDB", loc: "Bengaluru", sector: "tech", avatar: "SM", avatarBg: "bg-blue-600" },
    { id: "inv-5", name: "Khadhiri Abdul Subhan", role: "Senior Full Stack Developer | React.js | Node.js | Microservices", loc: "Bengaluru", sector: "tech", avatar: "KA", avatarBg: "bg-teal-700" },
    { id: "inv-6", name: "Poorna Pushkala, ICF-PCC, PMP®", role: "CEO | Board Director | Transformation Leader | Rural ESG", loc: "Mumbai", sector: "manufacturing", avatar: "PP", avatarBg: "bg-amber-700" },
    { id: "inv-7", name: "Dr. Satyajit Das", role: "Senior IT Leader & AI Generalist | Independent Director", loc: "Delhi NCR", sector: "tech", avatar: "SD", avatarBg: "bg-pink-700" },
    { id: "inv-8", name: "Parag Gulati", role: "Head of Presales - Data Strategy | Gen-AI | Enterprise Architecture", loc: "Mumbai", sector: "tech", avatar: "PG", avatarBg: "bg-purple-700" },
  ];

  // Page Posts Sub-Tab
  const [postsSubTab, setPostsSubTab] = useState<"published" | "page_ads">("published");

  // Expandable Post Performance Accordion IDs
  const [expandedPerformancePostId, setExpandedPerformancePostId] = useState<string | null>("post-1");

  // Create Modal State
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createType, setCreateType] = useState<
    "menu" | "post" | "event" | "article" | "newsletter" | "ad" | "product" | "offering" | "team"
  >("menu");

  // Event creation form state
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState<"online" | "in_person">("online");
  const [eventFormat, setEventFormat] = useState("iGEN Live Stream");
  const [eventExternalLink, setEventExternalLink] = useState("");
  const [eventTimezone, setEventTimezone] = useState("(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi");
  const [eventStartDate, setEventStartDate] = useState("2026-09-04");
  const [eventStartTime, setEventStartTime] = useState("18:00");
  const [eventHasEndDate, setEventHasEndDate] = useState(true);
  const [eventEndDate, setEventEndDate] = useState("2026-09-04");
  const [eventEndTime, setEventEndTime] = useState("19:00");
  const [eventUseRegForm, setEventUseRegForm] = useState(false);
  const [eventDescription, setEventDescription] = useState("");
  const [eventSpeakers, setEventSpeakers] = useState("");

  // Article State
  const [articleTitle, setArticleTitle] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [articleCover, setArticleCover] = useState<string | null>(null);

  // Newsletter State
  const [newsletterTitle, setNewsletterTitle] = useState("");
  const [newsletterCadence, setNewsletterCadence] = useState("Weekly");
  const [newsletterDesc, setNewsletterDesc] = useState("");
  const [newsletterLogo, setNewsletterLogo] = useState<string | null>(null);

  // Ad Campaign State (Executive Solution)
  const [adObjective, setAdObjective] = useState<"brand" | "leads" | "traffic" | "events">("leads");
  const [adHeadline, setAdHeadline] = useState("Accelerate Your Warehouse Automation by 3x");
  const [adBodyText, setAdBodyText] = useState("Discover intelligent autonomous sorting AMRs and AI vision inspection systems tailored for modern e-commerce fulfillment hubs.");
  const [adCta, setAdCta] = useState("Contact Sales");
  const [adDailyBudget, setAdDailyBudget] = useState(2500);
  const [adDurationDays, setAdDurationDays] = useState(7);

  // Product Spotlight State (Executive Solution)
  const [prodName, setProdName] = useState("");
  const [prodCategory, setProdCategory] = useState("Industrial Robotics");
  const [prodTagline, setProdTagline] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [prodPricing, setProdPricing] = useState("Contact for custom quote");
  const [prodCta, setProdCta] = useState("Request Demo");
  const profile = user?.onboardingForm || {};

  // 1. Basic Profile Form States
  const rawCompanyName = profile.companyName || user?.name;
  const isGenericCompany = !rawCompanyName || rawCompanyName === "SME Pro User" || rawCompanyName === "Your Name" || rawCompanyName.toLowerCase().includes("user") || rawCompanyName === "Nexus Robotics & Automation";
  const [companyName, setCompanyName] = useState(isGenericCompany ? "Mehta Traders" : rawCompanyName);
  const [sector, setSector] = useState(profile.sector || "Commodities, FMCG & Global Trade");
  const [tagline, setTagline] = useState(profile.tagline || "Leading B2B exporter, distributor and supply chain partner across India & global trade corridors.");
  const [city, setCity] = useState(profile.city || "Mumbai");
  const [state, setState] = useState(profile.state || "Maharashtra");
  const [country, setCountry] = useState(profile.country || "India");
  const [website, setWebsite] = useState(profile.website || "www.mehtatraders.in");
  const [foundedYear, setFoundedYear] = useState(profile.foundedYear || "2021");
  const [employeeBracket, setEmployeeBracket] = useState(profile.employeeBracket || "51-200 employees");
  const [workplacePolicy, setWorkplacePolicy] = useState(profile.workplacePolicy || "Hybrid");
  const [followersCount, setFollowersCount] = useState(profile.followersCount || "5,164 followers");
  const [overview, setOverview] = useState(
    profile.overview || 
    `Nexus Robotics & Automation is an industry-leading smart robotics company headquartered in Bengaluru, India. We design, manufacture, and deploy intelligent autonomous mobile robots (AMRs), high-speed sortation systems, and AI-driven vision inspection stations for modern e-commerce fulfillment centers and global supply chain hubs.`
  );

  // Strategic Stakeholder Perspectives States
  const [activeVisionLensEdit, setActiveVisionLensEdit] = useState<"capital" | "culture" | "partners" | "brand">("capital");
  const [growthStage, setGrowthStage] = useState(profile.growthStage || "Profitable & Scaling · Positive Operating Cash Flow");
  const [capexAllocation, setCapexAllocation] = useState(profile.capexAllocation || "Automation & R&D · Phase-2 Infrastructure Expansion");
  const [targetCorridors, setTargetCorridors] = useState(profile.targetCorridors || "GCC & European Union · 25% Export Revenue Target");
  const [capitalRoadmap, setCapitalRoadmap] = useState(
    profile.capitalRoadmap || 
    "Deploying state-of-the-art automated assembly lines, expanding localized supply chain integration across India, and accelerating B2B digital export capabilities to support Mission Viksit Bharat 2047."
  );

  const [talentRetention, setTalentRetention] = useState(profile.talentRetention || "94% Senior Retention · Meritocracy & Equity Incentives");
  const [academicPartnerships, setAcademicPartnerships] = useState(profile.academicPartnerships || "5+ University Partners · R&D Fellowships & Labs");
  const [culturePhilosophy, setCulturePhilosophy] = useState(
    profile.culturePhilosophy || 
    "We foster an environment where domain experts, senior researchers, and operational managers take complete ownership of mission-critical outcomes. Continuous learning, peer recognition, and technical excellence drive our institutional growth."
  );

  const [vendorAccreditation, setVendorAccreditation] = useState(profile.vendorAccreditation || "Tier-1 Approved Vendor for Major Industrial OEMs");
  const [supplyChainNodes, setSupplyChainNodes] = useState(profile.supplyChainNodes || "12 Multi-Sourced Hubs · Zero Single-Point Bottlenecks");
  const [financialStanding, setFinancialStanding] = useState(profile.financialStanding || "Prime Working Capital · Strong Institutional Banking");
  const [partnersNarrative, setPartnersNarrative] = useState(
    profile.partnersNarrative || 
    "Built on strict adherence to international procurement standards, audited vendor governance, and rapid-turnaround contract execution for global commercial partners."
  );

  const [sectorAuthority, setSectorAuthority] = useState(profile.sectorAuthority || "Top 10 Verified in Sector");
  const [pressCoverage, setPressCoverage] = useState(profile.pressCoverage || "National Media Features · Viksit Bharat 2047 Reports");
  const [brandNarrative, setBrandNarrative] = useState(
    profile.brandNarrative || 
    "Official executive quotes, high-resolution logos, and company milestones are available for accredited journalists and business media editors."
  );

  // 2. Services State (Offerings)
  const [servicesList, setServicesList] = useState<Array<{ id: string; name: string; desc: string; category: string }>>(
    profile.servicesList || [
      { id: "s1", name: "Warehouse Sortation Robots", desc: "Autonomous mobile robots (AMRs) for high-speed parcel sortation and routing.", category: "Robotics" },
      { id: "s2", name: "AI Vision Inspection Systems", desc: "Computer vision stations for zero-defect quality control on manufacturing lines.", category: "Automation" },
      { id: "s3", name: "Fleet Management Software", desc: "Cloud-connected IoT dashboard to orchestrate 200+ robots in real time.", category: "Software" },
      { id: "s4", name: "Supply Chain Consulting", desc: "End-to-end automation audits and retrofit planning for legacy facilities.", category: "Consulting" },
    ]
  );
  const [newServiceName, setNewServiceName] = useState("");
  const [newServiceCategory, setNewServiceCategory] = useState("Robotics");
  const [newServiceDesc, setNewServiceDesc] = useState("");

  // 3. Team Members State
  const [teamMembers, setTeamMembers] = useState<Array<{
    id: string;
    name: string;
    role: string;
    dept: string;
    city: string;
    state: string;
    school: string;
    avatar: string;
    verified: boolean;
    exp: string;
    bio: string;
  }>>(
    profile.teamMembers || [
      { id: "tm-1", name: "Aditya Sharma", role: "Founder & CEO", dept: "Leadership", city: "Bengaluru", state: "Karnataka", school: "IIT Madras", avatar: "A", verified: true, exp: "12+ yrs", bio: "Leading strategy, international expansion, and robotic hardware design." },
      { id: "tm-2", name: "Dr. Ananya Subramanian", role: "Chief Technology Officer", dept: "Product & Engineering", city: "Bengaluru", state: "Karnataka", school: "IISc Bangalore", avatar: "A", verified: true, exp: "15+ yrs", bio: "Architect of our proprietary multi-agent robotic motion planning algorithms." },
      { id: "tm-3", name: "Saurav K. Verma", role: "VP of Business Development", dept: "Business Development", city: "Bengaluru", state: "Karnataka", school: "Bangalore University", avatar: "S", verified: true, exp: "10+ yrs", bio: "Oversees enterprise accounts and system integrator partnerships in India & UAE." },
      { id: "tm-4", name: "Namitha Rajan", role: "Lead Robotics Engineer", dept: "Product & Engineering", city: "Bengaluru", state: "Karnataka", school: "Anna University Chennai", avatar: "N", verified: false, exp: "7+ yrs", bio: "Specializes in embedded kinematics and LiDAR sensor integration." },
    ]
  );
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("");
  const [newMemberDept, setNewMemberDept] = useState("Product & Engineering");
  const [newMemberCity, setNewMemberCity] = useState("Bengaluru");
  const [newMemberSchool, setNewMemberSchool] = useState("");
  const [newMemberBio, setNewMemberBio] = useState("");

  // 4. Posts & In-Depth Analytics State
  const [postsList, setPostsList] = useState<Array<any>>(
    profile.postsList || [
      {
        id: "post-1",
        type: "documents",
        author: companyName,
        followers: "5,164 followers",
        timestamp: "1h ago",
        title: "DON'T JUST BUILD A BRAND. BUILD A 20-YEAR LEADERSHIP PRESENCE.",
        content: `What if your investment in one focused sector session could generate value for 20 years?\n\nIntroducing the IGEN Sector Outcome publicity model:\n• Pay once. Double the leadership. Long-term impact.\n• One participating client receives two distinct leadership assets across all mega events.\n• Industry outcome whitepapers, business reports, and long-term brand association.`,
        mediaType: "document",
        docTitle: "IGEN SSO Leadership & 20-Year Visibility Roadmap.pdf",
        docPages: 14,
        docSize: "4.8 MB",
        imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&auto=format&fit=crop&q=80",
        likes: 142,
        comments: 28,
        shares: 19,
        reposts: 1,
        // Post Performance Metrics (Exact LinkedIn format)
        metrics: {
          organicImpressions: 58,
          engagements: 1,
          engagementRate: "1.72%",
          clicks: 0,
          ctr: "0%",
          reactions: 0,
          comments: 0,
          reposts: 1,
          membersReached: 21,
          pageViewers: 0,
          followersGained: 0,
        },
      },
      {
        id: "post-2",
        type: "articles",
        author: companyName,
        followers: "5,164 followers",
        timestamp: "6d ago",
        title: "ONE SSO SESSION IN A CITY. TWO LEADERSHIP ASSETS. 20-YEAR VISIBILITY ROADMAP.",
        content: `A detailed look at how precision manufacturing companies in India are using bilateral trade agreements to enter UAE, GCC, and European supply chains with zero-tariff advantages.`,
        mediaType: "article",
        readTime: "6 min read",
        authorName: "Aditya Sharma, CEO",
        likes: 218,
        comments: 44,
        shares: 36,
        reposts: 4,
        metrics: {
          organicImpressions: 820,
          engagements: 42,
          engagementRate: "5.12%",
          clicks: 18,
          ctr: "2.2%",
          reactions: 24,
          comments: 6,
          reposts: 4,
          membersReached: 640,
          pageViewers: 12,
          followersGained: 7,
        },
      },
    ]
  );
  const [newPostType, setNewPostType] = useState<"articles" | "documents" | "images">("articles");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostDocTitle, setNewPostDocTitle] = useState("");
  const [newPostDocPages, setNewPostDocPages] = useState(12);

  // 5. Industry Conversations Feed
  const conversationFeed = [
    {
      id: "conv-1",
      author: "Leadership First",
      followers: "6,346,143 followers",
      timestamp: "5h ago",
      content: "What is the silent poison that destroys trust, shatters morale, and dismantles team unity faster than anything else? It is the bitter presence of double standards.",
      imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80",
      likes: 1553,
      comments: 65,
      reposts: 165,
    },
    {
      id: "conv-2",
      author: "Global Supply Chain Council",
      followers: "842,100 followers",
      timestamp: "14h ago",
      content: "YOU ARE A TRUE LEADER WHEN YOU HELP OTHERS BE SUCCESSFUL. Modern supply chain transparency is driving greater cross-border collaboration between India and the Middle East.",
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
      likes: 5087,
      comments: 88,
      reposts: 658,
    },
  ];

  // 6. Direct Inbound Inquiries (Inbox)
  const [inboxInquiries, setInboxInquiries] = useState([
    {
      id: "inq-1",
      senderName: "Karan Johar",
      company: "Apex Warehousing Solutions LLC",
      email: "karan@apexwarehouse.ae",
      service: "Warehouse Sortation Robots",
      timestamp: "2 hours ago",
      message: "We are expanding our 120,000 sq.ft fulfillment facility in Dubai Logistics City and looking for 40 units of sorting AMRs. Please share technical spec sheet and deployment lead times.",
      status: "New",
    },
    {
      id: "inq-2",
      senderName: "Shreya Venkat",
      company: "Tata Precision Logistics",
      email: "shreya.v@tataprecision.com",
      service: "AI Vision Inspection Systems",
      timestamp: "Yesterday",
      message: "Looking for optical defect detection for high-speed packaging lines. Can your system interface with standard SCADA protocols?",
      status: "Replied",
    },
  ]);

  // Notification Toast
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Save changes to auth context
  const handleSaveAll = async () => {
    const updatedForm = {
      ...profile,
      companyName,
      sector,
      tagline,
      city,
      state,
      country,
      website,
      foundedYear,
      employeeBracket,
      workplacePolicy,
      overview,
      servicesList,
      teamMembers,
      postsList,
      followersCount,
      growthStage,
      capexAllocation,
      targetCorridors,
      capitalRoadmap,
      talentRetention,
      academicPartnerships,
      culturePhilosophy,
      vendorAccreditation,
      supplyChainNodes,
      financialStanding,
      partnersNarrative,
      sectorAuthority,
      pressCoverage,
      brandNarrative,
    };
    await updateOnboarding({
      onboardingForm: updatedForm,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // Add Service Handler
  const handleAddService = () => {
    if (!newServiceName.trim()) return;
    const newService = {
      id: `s-${Date.now()}`,
      name: newServiceName,
      category: newServiceCategory,
      desc: newServiceDesc || "Custom commercial offering provided by our specialized engineering team.",
    };
    setServicesList([...servicesList, newService]);
    setNewServiceName("");
    setNewServiceDesc("");
    setCreateModalOpen(false);
  };

  // Add Team Member Handler
  const handleAddMember = () => {
    if (!newMemberName.trim() || !newMemberRole.trim()) return;
    const newMember = {
      id: `tm-${Date.now()}`,
      name: newMemberName,
      role: newMemberRole,
      dept: newMemberDept,
      city: newMemberCity || "Bengaluru",
      state: "Karnataka",
      school: newMemberSchool || "Premier University",
      avatar: newMemberName.charAt(0).toUpperCase(),
      verified: true,
      exp: "5+ yrs",
      bio: newMemberBio || "Experienced leader driving technological execution and growth.",
    };
    setTeamMembers([...teamMembers, newMember]);
    setNewMemberName("");
    setNewMemberRole("");
    setNewMemberSchool("");
    setNewMemberBio("");
    setCreateModalOpen(false);
  };

  // Add Post Handler
  const handleAddPost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;
    const newPost = {
      id: `post-${Date.now()}`,
      type: newPostType,
      author: companyName,
      followers: followersCount,
      timestamp: "Just now",
      title: newPostTitle,
      content: newPostContent,
      mediaType: newPostType === "documents" ? "document" : newPostType === "articles" ? "article" : "image",
      docTitle: newPostType === "documents" ? (newPostDocTitle || `${newPostTitle}.pdf`) : undefined,
      docPages: newPostType === "documents" ? newPostDocPages : undefined,
      docSize: newPostType === "documents" ? "3.2 MB" : undefined,
      readTime: newPostType === "articles" ? "5 min read" : undefined,
      authorName: newPostType === "articles" ? (teamMembers[0]?.name || "Executive Team") : undefined,
      likes: 0,
      comments: 0,
      shares: 0,
      reposts: 0,
      metrics: {
        organicImpressions: 1,
        engagements: 0,
        engagementRate: "0.0%",
        clicks: 0,
        ctr: "0%",
        reactions: 0,
        comments: 0,
        reposts: 0,
        membersReached: 1,
        pageViewers: 0,
        followersGained: 0,
      },
    };
    setPostsList([newPost, ...postsList]);
    setNewPostTitle("");
    setNewPostContent("");
    setNewPostDocTitle("");
    setCreateModalOpen(false);
  };

  // Invite connection handler
  const handleInviteConnections = () => {
    if (inviteCredits <= 0) {
      alert("No invite credits remaining this month. Upgrade tier to get more credits.");
      return;
    }
    setInviteCredits(inviteCredits - 10);
    alert("10 invitations sent to industry connections! 10 credits deducted.");
  };

  // Compile combined company data for public preview
  const previewCompanyData = {
    companyName,
    sector,
    tagline,
    city,
    state,
    country,
    website,
    foundedYear,
    employeeBracket,
    workplacePolicy,
    overview,
    servicesList,
    teamMembers,
    postsList,
    followersCount,
    growthStage,
    capexAllocation,
    targetCorridors,
    capitalRoadmap,
    talentRetention,
    academicPartnerships,
    culturePhilosophy,
    vendorAccreditation,
    supplyChainNodes,
    financialStanding,
    partnersNarrative,
    sectorAuthority,
    pressCoverage,
    brandNarrative,
  };

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-6 pb-24 text-left font-sans">
      
      {/* ========================================================================= */}
      {/* 1. PUBLIC PREVIEW MODE                                                    */}
      {/* ========================================================================= */}
      {viewMode === "public" ? (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 p-4 rounded-2xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <Eye className="w-4 h-4 text-[#0a66c2]" />
              <span>Previewing Public Company Page as a Visitor</span>
            </div>
            <button
              onClick={() => setViewMode("private")}
              className="px-4 py-1.5 bg-[#0a66c2] text-white font-semibold text-xs rounded-xl hover:bg-[#084e96] transition-all flex items-center gap-1.5 shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin Panel
            </button>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800">
            <CompanyPublicProfile
              companyData={previewCompanyData}
              tier={activeTier}
              onUpgradeClick={() => router.push(`/${locale}/profile/plans/company`)}
              isOwner={true}
            />
          </div>
        </div>
      ) : selectedPostMetrics ? (
        /* ========================================================================= */
        /* 2. DEEP POST METRICS OVERVIEW VIEW (Exact Screenshot 2 & 3 Drilldown)    */
        /* ========================================================================= */
        <div className="max-w-4xl mx-auto space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 p-4 rounded-2xl shadow-sm">
            <button
              onClick={() => setSelectedPostMetrics(null)}
              className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-[#0a66c2] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Metrics overview
            </button>
            <span className="text-xs text-slate-500">Post published {selectedPostMetrics.timestamp}</span>
          </div>

          {/* Post Snippet Card */}
          <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Post analytics</h3>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0 overflow-hidden">
                {selectedPostMetrics.imageUrl ? (
                  <img src={selectedPostMetrics.imageUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  companyName.charAt(0)
                )}
              </div>
              <div className="space-y-1">
                <span className="text-xs text-slate-500 block">{companyName} posted this · {selectedPostMetrics.timestamp}</span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2">{selectedPostMetrics.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-1">{selectedPostMetrics.content}</p>
                <span className="text-[10px] text-slate-400 font-semibold block pt-1">Targeted to: All followers</span>
              </div>
            </div>
          </div>

          {/* Organic Discovery Card */}
          <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Organic discovery</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-2xl font-black text-slate-900 dark:text-white block">
                  {selectedPostMetrics.metrics?.organicImpressions || 58}
                </span>
                <span className="text-xs text-slate-500 font-medium">Impressions</span>
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900 dark:text-white block">
                  {selectedPostMetrics.metrics?.membersReached || 21}
                </span>
                <span className="text-xs text-slate-500 font-medium">Members reached</span>
              </div>
            </div>

            {/* Amplify Reach Banner */}
            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800/40 rounded-xl flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Amplify your reach</h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">Reach more of the right B2B procurement audience.</p>
                </div>
              </div>
              <button
                onClick={() => alert("Opening post boost campaign manager...")}
                className="px-4 py-1.5 bg-[#0a66c2] hover:bg-[#084e96] text-white font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                Boost Post
              </button>
            </div>
          </div>

          {/* Organic Page Activity Card */}
          <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Organic page activity</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-600 dark:text-slate-400">Page viewers from this post</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedPostMetrics.metrics?.pageViewers || 0}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-600 dark:text-slate-400">Followers gained from this post</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedPostMetrics.metrics?.followersGained || 0}</span>
              </div>
            </div>
          </div>

          {/* Organic Engagement Card */}
          <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Organic engagement</h3>
            <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-100 dark:border-white/5">
              <div>
                <span className="text-2xl font-black text-slate-900 dark:text-white block">
                  {selectedPostMetrics.metrics?.engagements || 1}
                </span>
                <span className="text-xs text-slate-500 font-medium">Engagement</span>
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900 dark:text-white block">
                  {selectedPostMetrics.metrics?.engagementRate || "1.72%"}
                </span>
                <span className="text-xs text-slate-500 font-medium">Engagement rate</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-600 dark:text-slate-400">Clicks</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedPostMetrics.metrics?.clicks || 0}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-600 dark:text-slate-400">Click-through rate</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedPostMetrics.metrics?.ctr || "0%"}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-600 dark:text-slate-400">Reactions</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedPostMetrics.likes || 0}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-600 dark:text-slate-400">Comments</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedPostMetrics.comments || 0}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-600 dark:text-slate-400">Reposts</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedPostMetrics.reposts || 1}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* 3. EXECUTIVE COMPANY COMMAND CENTER WORKSPACE                             */
        /* ========================================================================= */
        <div className="space-y-5">
          {/* Top Admin Plan Switcher Ribbon */}
          <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 p-3 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-slate-500 font-mono text-[11px] uppercase">Active Plan:</span>
              <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] uppercase font-mono ${
                isCorporate
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  : isCompany
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : isStartup
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              }`}>
                {isCorporate ? "👑 Corporate Plan (₹26,999)" : isCompany ? "⭐ Company Plan (₹16,999)" : isStartup ? "🚀 Startup Plan (₹9,999)" : "📋 Free Profile (₹0)"}
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
              {[
                { id: "free", label: "1. Free (₹0)" },
                { id: "startup", label: "2. Startup (₹9,999)" },
                { id: "company", label: "3. Company (₹16,999)" },
                { id: "corporate", label: "4. Corporate (₹26,999)" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTier(t.id as any)}
                  className={`px-3 py-1 rounded-lg font-bold text-xs transition-all whitespace-nowrap font-mono ${
                    activeTier === t.id
                      ? "bg-[#0B4FBA] text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* ========================================================================= */}
            {/* LHS SIDEBAR: COMPANY IDENTITY CARD + PRIMARY NAV TABS                     */}
            {/* ========================================================================= */}
            <div className="lg:col-span-3 space-y-4">
            
            {/* Company Identity Widget */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-[#0a192f] text-white font-bold text-lg flex items-center justify-center shrink-0 border border-slate-200 ${
                  isCorporate ? "ring-2 ring-amber-400" : isCompany ? "ring-2 ring-blue-500/60" : isStartup ? "ring-2 ring-orange-500/60" : ""
                }`}>
                  {companyName.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="text-xs font-bold text-[#0a192f] truncate">{companyName}</h3>
                    
                    {/* 3 VERIFIED TICK MARK BADGES */}
                    {isCorporate ? (
                      <span className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#ea580c] to-[#f59e0b] p-[1.5px] flex items-center justify-center shadow-xs" title="Corporate Sovereign Apex Verified">
                        <span className="w-full h-full rounded-full bg-[#0a192f] flex items-center justify-center text-orange-400">
                          <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                        </span>
                      </span>
                    ) : isCompany ? (
                      <span className="w-4 h-4 rounded-full bg-[#0a192f] flex items-center justify-center text-white shadow-xs" title="Company Enterprise Verified">
                        <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                      </span>
                    ) : isStartup ? (
                      <span className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#ea580c] to-[#f97316] flex items-center justify-center text-white shadow-xs" title="Startup Vanguard Verified">
                        <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                      </span>
                    ) : null}
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">{website}</p>
                  <p className="text-[10px] text-[#ea580c] font-bold">{followersCount}</p>
                </div>
              </div>

              {/* Action Buttons: + Create and View as Member */}
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <button
                  onClick={() => {
                    setCreateType("menu");
                    setCreateModalOpen(true);
                  }}
                  className="w-full py-2 bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Create
                </button>
                <button
                  onClick={() => setViewMode("public")}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-[#0a192f] font-bold text-xs rounded-xl transition-all border border-slate-200 flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" /> View public profile
                </button>
              </div>
            </div>

            {/* Main Navigation Tabs */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-2 shadow-xs space-y-1 text-xs font-semibold">
              {[
                { id: "dashboard", label: "Executive Cockpit", icon: BarChart3 },
                { id: "page_posts", label: "Intelligence & Posts", icon: FileText },
                { id: "analytics", label: "Analytics & Benchmarks", icon: TrendingUp },
                { id: "feed", label: "Ecosystem Stream", icon: Compass },
                { id: "activity", label: "Activity Pulse", icon: Bell, badge: "99+" },
                { id: "inbox", label: "Inbound Pipeline", icon: Mail, badge: inboxInquiries.filter(i => i.status === "New").length || undefined },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeAdminNav === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveAdminNav(item.id as any)}
                    className={`w-full px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                      isActive
                        ? "bg-orange-50 text-[#0a192f] font-bold border-l-4 border-[#ea580c] shadow-2xs"
                        : "text-slate-600 hover:bg-slate-50 hover:text-[#0a192f]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? "text-[#ea580c]" : "text-slate-500"}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-[#ea580c] text-white font-bold text-[10px] font-mono">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="pt-2 border-t border-slate-100 dark:border-white/10 my-1" />

              {/* Secondary Section */}
              {[
                { id: "services", label: "Commercial Offerings", icon: Briefcase },
                { id: "team", label: "Executive Leadership", icon: Users },
                { id: "vision", label: "Vision & 4 Lenses", icon: Building2 },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeAdminNav === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveAdminNav(item.id as any)}
                    className={`w-full px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                      isActive
                        ? "bg-slate-100 dark:bg-slate-800 text-[#0B4FBA] dark:text-blue-400 font-bold border-l-4 border-[#0B4FBA] dark:border-blue-400 shadow-2xs"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              })}

              <div className="pt-2 border-t border-slate-100 dark:border-white/10 my-1" />

              {/* Utility Actions */}
              <button
                onClick={() => alert("Opening Trade Corridor & B2B Expo campaign manager...")}
                className="w-full px-3.5 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2.5"
              >
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Trade Corridors &amp; Ads</span>
              </button>

              <button
                onClick={() => setInviteModalOpen(true)}
                className="w-full px-3.5 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <UserPlus className="w-4 h-4 text-emerald-500" />
                  <span>Invite to Ecosystem</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400">
                  {inviteCredits}/{maxInviteCredits}
                </span>
              </button>

              <button
                key="settings"
                onClick={() => setActiveAdminNav("settings")}
                className={`w-full px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-2.5 ${
                  activeAdminNav === "settings"
                    ? "bg-slate-100 dark:bg-slate-800 text-[#0B4FBA] dark:text-blue-400 font-bold border-l-4 border-[#0B4FBA] dark:border-blue-400 shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Plan &amp; Settings</span>
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* MAIN CONTENT WORKSPACE                                                    */}
          {/* ========================================================================= */}
          <div className="lg:col-span-9 space-y-6">

            {/* Save Toast Notification */}
            {saveSuccess && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 dark:bg-emerald-950/30 dark:border-emerald-800/40 dark:text-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                All company settings and posts have been synchronized with your public page.
              </div>
            )}

            {/* ========================================================================= */}
            {/* 1. DASHBOARD TAB (Screenshot 1 Exact Implementation)                      */}
            {/* ========================================================================= */}
            {activeAdminNav === "dashboard" && (
              <div className="space-y-6">
                
                {/* Welcome Header */}
                <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-2">
                  <h2 className="text-xl font-black text-slate-900 dark:text-white leading-snug">
                    Welcome back, {companyName} - {website}
                  </h2>
                  <p className="text-xs text-[#0a66c2] dark:text-blue-400 font-semibold flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" /> 12 followers gained with Premium auto-invite this past year
                  </p>
                </div>

                {/* Grow Your Followers Accelerator Card */}
                <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Grow your followers 4x faster</h3>
                    <Info className="w-4 h-4 text-slate-400 cursor-pointer" />
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">Save time with content sharing</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Grow followers by publishing regular trade intelligence reports, whitepapers, and videos to your feed.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setCreateType("post");
                        setCreateModalOpen(true);
                      }}
                      className="px-3.5 py-1.5 bg-[#0a66c2] hover:bg-[#084e96] text-white font-bold text-xs rounded-xl shadow-sm transition-all shrink-0"
                    >
                      Create Post
                    </button>
                  </div>
                </div>

                {/* Track Performance Carousel (Exact Screenshot 1 Metrics) */}
                <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">Track performance</h3>
                      <p className="text-xs text-slate-500">Grow your page 3x faster by leveraging insights and analytics</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-100 text-slate-600">
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-100 text-slate-600">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* 4 Performance Metric Boxes */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {/* Who visited your page (Premium insight) */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
                      <div className="flex -space-x-2 overflow-hidden">
                        <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white">
                          A
                        </div>
                        <div className="w-7 h-7 rounded-full bg-purple-600 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white">
                          T
                        </div>
                        <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white">
                          +97
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#0a66c2] hover:underline cursor-pointer">Who's visited your Page</h4>
                        <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 block">✦ Premium insight</span>
                      </div>
                    </div>

                    {/* Search appearances */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
                      <span className="text-2xl font-black text-slate-900 dark:text-white block">828</span>
                      <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Search appearances</h4>
                      <span className="text-[10px] text-red-500 font-semibold flex items-center gap-0.5">
                        <TrendingDown className="w-3 h-3" /> 1.3% last 7 days
                      </span>
                    </div>

                    {/* New followers */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
                      <span className="text-2xl font-black text-slate-900 dark:text-white block">247</span>
                      <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">New followers</h4>
                      <span className="text-[10px] text-red-500 font-semibold flex items-center gap-0.5">
                        <TrendingDown className="w-3 h-3" /> 10.2% last 7 days
                      </span>
                    </div>

                    {/* Post impressions */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
                      <span className="text-2xl font-black text-slate-900 dark:text-white block">1.5k</span>
                      <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Post impressions</h4>
                      <span className="text-[10px] text-red-500 font-semibold flex items-center gap-0.5">
                        <TrendingDown className="w-3 h-3" /> 8.6% last 7 days
                      </span>
                    </div>
                  </div>
                </div>

                {/* Maximize Campaign Results Banner */}
                <div className="p-5 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white rounded-2xl shadow-sm flex items-center justify-between flex-wrap gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Campaign Optimization</span>
                    <h3 className="text-sm font-bold">Maximize your campaign results</h3>
                    <p className="text-xs text-slate-300">Learn the art of iGEN Newsfeed and bilateral trade ad campaign targeting.</p>
                  </div>
                  <button
                    onClick={() => alert("Opening webinar video...")}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                  >
                    Watch webinar
                  </button>
                </div>

                {/* Manage Recent Posts Carousel */}
                <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">Manage recent posts</h3>
                      <p className="text-xs text-slate-500">Manage your Page's content and amplify your reach with boosting.</p>
                    </div>
                    <button
                      onClick={() => setActiveAdminNav("page_posts")}
                      className="text-xs font-bold text-[#0a66c2] hover:underline"
                    >
                      View all posts →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {postsList.slice(0, 2).map((post) => (
                      <div
                        key={post.id}
                        className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-slate-500">Reach more of the right audience.</span>
                          <button
                            onClick={() => alert(`Opening Boost Manager for: ${post.title}`)}
                            className="px-3 py-1 bg-white hover:bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[#0a66c2] font-bold text-xs rounded-full shadow-xs"
                          >
                            Boost
                          </button>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{post.title}</h4>
                          <p className="text-[11px] text-slate-500 line-clamp-2">{post.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Join Conversations (Screenshot 1 Bottom) */}
                <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">Join conversations</h3>
                      <p className="text-xs text-slate-500">Build brand awareness and community by engaging with recent conversations.</p>
                    </div>
                    <button
                      onClick={() => setActiveAdminNav("feed")}
                      className="text-xs font-bold text-[#0a66c2] hover:underline"
                    >
                      Show feed →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {conversationFeed.map((conv) => (
                      <div
                        key={conv.id}
                        className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2.5"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                            {conv.author.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white">{conv.author}</h4>
                            <p className="text-[10px] text-slate-500">{conv.timestamp} · {conv.followers}</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                          {conv.content}
                        </p>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-white/5 text-[11px] text-slate-500">
                          <span>👍 {conv.likes}</span>
                          <span>💬 {conv.comments} comments</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 2. PAGE POSTS TAB (Screenshot 1 RHS & Screenshots 2/3 Implementation)     */}
            {/* ========================================================================= */}
            {activeAdminNav === "page_posts" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Main Feed Column */}
                <div className="lg:col-span-8 space-y-5">
                  
                  {/* Tab Header Card */}
                  <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="text-base font-bold text-slate-900 dark:text-white">Page posts</h2>
                      <span className="text-xs text-slate-400">Analytics are only visible to page admins.</span>
                    </div>

                    {/* Sub-tabs: Published vs Page Ads */}
                    <div className="flex border-b border-slate-100 dark:border-white/10">
                      <button
                        onClick={() => setPostsSubTab("published")}
                        className={`py-2 px-4 text-xs font-bold border-b-2 transition-all ${
                          postsSubTab === "published"
                            ? "border-[#0a66c2] text-[#0a66c2]"
                            : "border-transparent text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        Published
                      </button>
                      <button
                        onClick={() => setPostsSubTab("page_ads")}
                        className={`py-2 px-4 text-xs font-bold border-b-2 transition-all ${
                          postsSubTab === "page_ads"
                            ? "border-[#0a66c2] text-[#0a66c2]"
                            : "border-transparent text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        Page ads
                      </button>
                    </div>

                    {/* Quick Composer Trigger */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-xs shrink-0">
                        {companyName.charAt(0)}
                      </div>
                      <input
                        type="text"
                        placeholder="Start a post..."
                        onClick={() => {
                          setCreateType("post");
                          setCreateModalOpen(true);
                        }}
                        readOnly
                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-2 text-xs text-slate-900 dark:text-white cursor-pointer focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center justify-around text-xs text-slate-600 dark:text-slate-400 pt-1">
                      <button
                        onClick={() => {
                          setNewPostType("documents");
                          setCreateModalOpen(true);
                        }}
                        className="flex items-center gap-1.5 hover:text-[#0a66c2] font-semibold"
                      >
                        <FileText className="w-4 h-4 text-red-500" /> Document PDF
                      </button>
                      <button
                        onClick={() => {
                          setNewPostType("images");
                          setCreateModalOpen(true);
                        }}
                        className="flex items-center gap-1.5 hover:text-[#0a66c2] font-semibold"
                      >
                        <ImageIcon className="w-4 h-4 text-blue-500" /> Photo
                      </button>
                      <button
                        onClick={() => {
                          setNewPostType("articles");
                          setCreateModalOpen(true);
                        }}
                        className="flex items-center gap-1.5 hover:text-[#0a66c2] font-semibold"
                      >
                        <Edit3 className="w-4 h-4 text-amber-500" /> Write article
                      </button>
                    </div>
                  </div>

                  {/* Feed of Published Posts */}
                  <div className="space-y-4">
                    {postsList.map((post) => {
                      const isPerformanceOpen = expandedPerformancePostId === post.id;
                      return (
                        <div
                          key={post.id}
                          className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm overflow-hidden space-y-3"
                        >
                          {/* Top Post Meta */}
                          <div className="p-5 pb-0 flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-sm">
                                {companyName.charAt(0)}
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                                  <span>{companyName}</span>
                                  <Check className="w-3 h-3 text-blue-600" />
                                </h4>
                                <p className="text-[10px] text-slate-500">{post.timestamp} · {followersCount}</p>
                              </div>
                            </div>

                            <button
                              onClick={() => alert(`Opening Boost for: ${post.title}`)}
                              className="px-3.5 py-1 bg-white hover:bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[#0a66c2] font-bold text-xs rounded-full shadow-xs"
                            >
                              Boost
                            </button>
                          </div>

                          {/* Post Content */}
                          <div className="px-5 space-y-2">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{post.title}</h3>
                            <p className="text-xs text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                              {post.content}
                            </p>
                          </div>

                          {/* Media preview (if document or image) */}
                          {post.mediaType === "document" && (
                            <div className="mx-5 p-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-red-500" />
                                <span className="font-bold text-slate-900 dark:text-white">{post.docTitle}</span>
                              </div>
                              <span className="text-[10px] text-slate-400">{post.docPages} Pages</span>
                            </div>
                          )}

                          {/* ========================================================================= */}
                          {/* INLINE POST PERFORMANCE (Exact Screenshot 1 Implementation)               */}
                          {/* ========================================================================= */}
                          <div className="border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/40 p-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-500">
                                Organic impressions: {post.metrics?.organicImpressions || 58} Impressions
                              </span>
                              <button
                                onClick={() => setExpandedPerformancePostId(isPerformanceOpen ? null : post.id)}
                                className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 flex items-center gap-1"
                              >
                                <span>{isPerformanceOpen ? "Hide results" : "Preview results"}</span>
                                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isPerformanceOpen ? "rotate-90" : ""}`} />
                              </button>
                            </div>

                            {/* Expandable Results Card */}
                            {isPerformanceOpen && (
                              <div className="pt-2 space-y-3">
                                <div className="space-y-0.5">
                                  <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                                    <span>Post performance</span>
                                    <Info className="w-3 h-3 text-slate-400" />
                                  </h4>
                                  <p className="text-[10px] text-slate-400">Targeted to: All followers</p>
                                </div>

                                {/* Metric Breakdown Grid */}
                                <div className="grid grid-cols-3 gap-3 text-left">
                                  <div>
                                    <span className="text-base font-black text-slate-900 dark:text-white block">
                                      {post.metrics?.organicImpressions || 58}
                                    </span>
                                    <span className="text-[11px] text-slate-500">Impressions</span>
                                  </div>
                                  <div>
                                    <span className="text-base font-black text-slate-900 dark:text-white block">
                                      {post.metrics?.engagements || 1}
                                    </span>
                                    <span className="text-[11px] text-slate-500">Engagements</span>
                                  </div>
                                  <div>
                                    <span className="text-base font-black text-slate-900 dark:text-white block">
                                      {post.metrics?.engagementRate || "1.72%"}
                                    </span>
                                    <span className="text-[11px] text-slate-500">Engagement rate</span>
                                  </div>
                                  <div>
                                    <span className="text-base font-black text-slate-900 dark:text-white block">
                                      {post.metrics?.clicks || 0}
                                    </span>
                                    <span className="text-[11px] text-slate-500">Clicks</span>
                                  </div>
                                  <div>
                                    <span className="text-base font-black text-slate-900 dark:text-white block">
                                      {post.metrics?.ctr || "0%"}
                                    </span>
                                    <span className="text-[11px] text-slate-500">Click-through rate</span>
                                  </div>
                                  <div>
                                    <span className="text-base font-black text-slate-900 dark:text-white block">
                                      {post.likes || 0}
                                    </span>
                                    <span className="text-[11px] text-slate-500">Reactions</span>
                                  </div>
                                </div>

                                {/* Show all results CTA */}
                                <div className="pt-2 border-t border-slate-200/70 dark:border-white/5 flex items-center justify-between">
                                  <button
                                    onClick={() => setSelectedPostMetrics(post)}
                                    className="text-xs font-bold text-[#0a66c2] hover:underline flex items-center gap-1"
                                  >
                                    <span>Show all results</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
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

                {/* Right-Hand Highlights Column (Screenshot 1 RHS) */}
                <div className="lg:col-span-4 space-y-5">
                  
                  {/* Post Highlights Widget */}
                  <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Post highlights
                      </h3>
                      <span className="text-[10px] text-slate-400">In the last 30 days</span>
                    </div>

                    <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">Most engagement</span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                        🚀 IGEN 2.0 — THE LEADERSHIP TEAM BEHIND MEGA-SCALE EXPOS...
                      </h4>
                      <p className="text-[10px] text-slate-500">19 reactions · 1 comment</p>
                    </div>
                  </div>

                  {/* Grow Your Followers Widget */}
                  <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Grow your followers
                    </h3>

                    <div className="space-y-2">
                      <div className="flex -space-x-2 overflow-hidden">
                        <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white">
                          S
                        </div>
                        <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white">
                          R
                        </div>
                      </div>
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <strong className="text-slate-900 dark:text-white">{inviteCredits}/{maxInviteCredits}</strong> credits available
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Build your audience and reach by inviting connections to follow your verified page.
                      </p>
                    </div>

                    <button
                      onClick={handleInviteConnections}
                      className="w-full py-2 bg-white hover:bg-slate-50 dark:bg-slate-800 border border-[#0a66c2] text-[#0a66c2] font-bold text-xs rounded-xl shadow-xs transition-all"
                    >
                      Invite connections
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 3. ANALYTICS INTELLIGENCE HUB (Exact LinkedIn Architecture)               */}
            {/* ========================================================================= */}
            {activeAdminNav === "analytics" && (
              <div className="space-y-6">
                
                {/* 1. FREE PLAN: LOCKED ANALYTICS PAYWALL */}
                {isFree ? (
                  <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6 shadow-sm my-6">
                    <div className="w-16 h-16 rounded-3xl bg-blue-50 dark:bg-blue-950/50 text-[#0a66c2] flex items-center justify-center mx-auto shadow-inner">
                      <Lock className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Unlock Executive Analytics &amp; Benchmarks</h2>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
                        Analytics are locked for Basic Directory Profiles. Upgrade to Startup, Company, or Corporate plan to track page traffic, visitor demographics, search keywords, competitor metrics, and inbound buyer leads.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2">
                      <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block mb-1">🚀 Startup Plan</span>
                        <p className="text-[11px] text-slate-500">Content &amp; Visitor KPIs (30-day window)</p>
                      </div>
                      <div className="p-3.5 bg-blue-50/50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900/50">
                        <span className="text-xs font-bold text-[#0a66c2] block mb-1">⭐ Company Plan</span>
                        <p className="text-[11px] text-slate-500">Followers, Search, 10 Competitors &amp; Leads</p>
                      </div>
                      <div className="p-3.5 bg-amber-50/50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/50">
                        <span className="text-xs font-bold text-amber-700 dark:text-amber-400 block mb-1">👑 Corporate Plan</span>
                        <p className="text-[11px] text-slate-500">Full 365d, 25 Competitors &amp; CRM sync</p>
                      </div>
                    </div>

                    <button
                      onClick={() => router.push(`/${locale}/profile/plans/company`)}
                      className="px-6 py-2.5 bg-[#0a66c2] hover:bg-[#004182] text-white font-bold text-xs sm:text-sm rounded-full shadow-md transition-all inline-flex items-center gap-2"
                    >
                      <span>Explore Pricing Plans</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (

                /* 2. PAID PLANS: UNLOCKED ANALYTICS HUB */
                <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-6">
                  
                  {/* Top Analytics Title & Sub-Tabs Navigation */}
                  <div className="border-b border-slate-200 dark:border-white/10 pb-2 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-black text-slate-900 dark:text-white">Analytics</h2>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono ${
                          isCorporate 
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                            : isCompany 
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                            : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                        }`}>
                          {isCorporate ? "👑 Corporate Unlimited" : isCompany ? "⭐ Company Pro" : "🚀 Startup Essential"}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 font-medium">Page performance &amp; audience intelligence</span>
                    </div>

                    {/* 6 Core LinkedIn Analytics Sub-Tabs with Tier Indicators */}
                    <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar pt-1">
                      {[
                        { id: "content", label: "Content", locked: false },
                        { id: "visitors", label: "Visitors", locked: false },
                        { id: "followers", label: "Followers", locked: isStartup },
                        { id: "search", label: "Search appearances", locked: isStartup },
                        { id: "competitors", label: "Competitors", locked: isStartup },
                        { id: "leads", label: "Leads", locked: isStartup },
                      ].map((tab) => {
                        const isActive = activeAnalyticsTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveAnalyticsTab(tab.id as any)}
                            className={`pb-2.5 px-3 text-xs sm:text-sm font-bold whitespace-nowrap transition-all border-b-2 flex items-center gap-1.5 ${
                              isActive
                                ? "border-[#0a66c2] text-[#0a66c2]"
                                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                            }`}
                          >
                            <span>{tab.label}</span>
                            {tab.locked && <Lock className="w-3 h-3 text-amber-500" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Shared Global Filter & Export Bar */}
                  <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
                    {/* Date Range Dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => setDateRangeDropdownOpen(!dateRangeDropdownOpen)}
                        className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-full text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 transition-all"
                      >
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{analyticsDateRange}</span>
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${dateRangeDropdownOpen ? "-rotate-90" : "rotate-90"}`} />
                      </button>

                      {dateRangeDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl p-2 z-30 space-y-1 text-xs">
                          {[
                            { label: "Last 7 days", range: "Aug 26, 2026 - Sep 2, 2026" },
                            { label: "Last 15 days", range: "Aug 18, 2026 - Sep 2, 2026" },
                            { label: "Last 30 days (Recommended)", range: "Aug 4, 2026 - Sep 2, 2026" },
                            { label: "Last 90 days", range: "Jun 4, 2026 - Sep 2, 2026" },
                            { label: "Last 365 days (1 Year)", range: "Sep 2, 2025 - Sep 2, 2026" },
                            { label: "Custom Range...", range: "Custom Calendar..." },
                          ].map((item, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                if (item.label.includes("Custom")) {
                                  setCalendarModalOpen(true);
                                } else {
                                  setAnalyticsDateRange(item.range);
                                }
                                setDateRangeDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-xl transition-all font-semibold flex items-center justify-between ${
                                analyticsDateRange === item.range
                                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                              }`}
                            >
                              <span>{item.label}</span>
                              {analyticsDateRange === item.range && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Export Action Button */}
                    <button
                      onClick={() => setExportModalOpen(true)}
                      className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 dark:bg-sky-500 dark:hover:bg-sky-600 text-white rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export</span>
                    </button>
                  </div>

                  {/* ========================================================================= */}
                  {/* TAB 1: CONTENT ANALYTICS                                                  */}
                  {/* ========================================================================= */}
                  {activeAnalyticsTab === "content" && (
                    <div className="space-y-6">
                      
                      {/* Content Highlights Card */}
                      <div className="bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Content highlights</h3>
                          <div className="group relative">
                            <Info className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-64 p-2.5 bg-slate-900 text-white text-[11px] rounded-xl shadow-xl z-30 leading-snug">
                              Some collaborative posts may not be included in the analytics below.
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                          <div className="p-4 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-xl space-y-1">
                            <span className="text-2xl font-black text-slate-900 dark:text-white block">5,120</span>
                            <span className="text-xs text-slate-500 font-medium block">Impressions</span>
                            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-0.5">
                              <TrendingUp className="w-3 h-3" /> 34.2% vs prior period
                            </span>
                          </div>
                          <div className="p-4 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-xl space-y-1">
                            <span className="text-2xl font-black text-slate-900 dark:text-white block">2,840</span>
                            <span className="text-xs text-slate-500 font-medium block">Unique views</span>
                            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-0.5">
                              <TrendingUp className="w-3 h-3" /> 18.5% vs prior period
                            </span>
                          </div>
                          <div className="p-4 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-xl space-y-1">
                            <span className="text-2xl font-black text-slate-900 dark:text-white block">640</span>
                            <span className="text-xs text-slate-500 font-medium block">Total engagements</span>
                            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-0.5">
                              <TrendingUp className="w-3 h-3" /> 12.0% vs prior period
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content Metrics Interactive Line Chart */}
                      <div className="bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-5">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Content metrics</h3>
                            <Info className="w-3.5 h-3.5 text-slate-400" />
                          </div>

                          {/* Metric Dropdown Switcher */}
                          <div className="relative">
                            <button
                              onClick={() => setContentMetricDropdownOpen(!contentMetricDropdownOpen)}
                              className="px-3.5 py-1.5 bg-emerald-500 text-white rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm"
                            >
                              <span className="capitalize">{contentMetricSelected.replace("_", " ")}</span>
                              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${contentMetricDropdownOpen ? "-rotate-90" : "rotate-90"}`} />
                            </button>

                            {contentMetricDropdownOpen && (
                              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl p-1.5 z-30 space-y-1 text-xs font-medium">
                                {[
                                  { id: "impressions", label: "Impressions" },
                                  { id: "unique_views", label: "Unique views" },
                                  { id: "clicks", label: "Clicks" },
                                  { id: "reactions", label: "Reactions" },
                                  { id: "comments", label: "Comments" },
                                  { id: "reposts", label: "Reposts" },
                                ].map((m) => (
                                  <button
                                    key={m.id}
                                    onClick={() => {
                                      setContentMetricSelected(m.id as any);
                                      setContentMetricDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                                      contentMetricSelected === m.id
                                        ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 font-bold"
                                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                                    }`}
                                  >
                                    {m.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Interactive SVG Chart Canvas */}
                        <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-xl p-4 pt-6">
                          <div className="h-56 w-full relative flex items-end">
                            {/* Y-Axis Grid Lines */}
                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-slate-400 font-mono">
                              <div className="border-b border-slate-100 dark:border-white/5 flex justify-between"><span>100</span></div>
                              <div className="border-b border-slate-100 dark:border-white/5 flex justify-between"><span>75</span></div>
                              <div className="border-b border-slate-100 dark:border-white/5 flex justify-between"><span>50</span></div>
                              <div className="border-b border-slate-100 dark:border-white/5 flex justify-between"><span>25</span></div>
                              <div className="border-b border-slate-200 dark:border-white/10 flex justify-between"><span>0</span></div>
                            </div>

                            {/* SVG Trend Line */}
                            <svg className="w-full h-full overflow-visible z-10" viewBox="0 0 500 180" preserveAspectRatio="none">
                              <defs>
                                <linearGradient id="contentGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                                </linearGradient>
                              </defs>
                              <path
                                d="M 0,140 Q 50,110 100,50 T 200,90 T 300,120 T 400,40 T 500,70 L 500,180 L 0,180 Z"
                                fill="url(#contentGradient)"
                              />
                              <path
                                d="M 0,140 Q 50,110 100,50 T 200,90 T 300,120 T 400,40 T 500,70"
                                fill="none"
                                stroke="#10b981"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                              />
                              {[
                                { cx: 0, cy: 140, val: "22" },
                                { cx: 100, cy: 50, val: "88" },
                                { cx: 200, cy: 90, val: "54" },
                                { cx: 300, cy: 120, val: "38" },
                                { cx: 400, cy: 40, val: "94" },
                                { cx: 500, cy: 70, val: "72" },
                              ].map((pt, i) => (
                                <circle
                                  key={i}
                                  cx={pt.cx}
                                  cy={pt.cy}
                                  r="4"
                                  className="fill-white stroke-emerald-500 stroke-2 hover:r-6 transition-all cursor-pointer"
                                />
                              ))}
                            </svg>
                          </div>

                          {/* X-Axis Dates */}
                          <div className="flex justify-between text-[10px] font-semibold text-slate-400 pt-3 border-t border-slate-100 dark:border-white/5">
                            <span>Aug 4</span>
                            <span>Aug 9</span>
                            <span>Aug 14</span>
                            <span>Aug 19</span>
                            <span>Aug 24</span>
                            <span>Aug 29</span>
                          </div>
                        </div>
                      </div>

                      {/* Content Engagement Data Table */}
                      <div className="bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Content engagement</h3>
                            <div className="group relative">
                              <Info className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
                              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-72 p-2.5 bg-slate-900 text-white text-[11px] rounded-xl shadow-xl z-30 leading-snug">
                                Overview: This section includes engagement metrics for individual posts and is updated in real time. We cannot provide engagement metrics for instant reposts.
                              </div>
                            </div>
                          </div>

                          {/* Filter Tabs */}
                          <div className="flex items-center gap-1 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-xl p-1 text-xs">
                            {[
                              { id: "all", label: "All" },
                              { id: "articles", label: "Articles" },
                              { id: "media", label: "Media" },
                              { id: "documents", label: "Documents" },
                            ].map((tab) => (
                              <button
                                key={tab.id}
                                onClick={() => setContentEngagementTab(tab.id as any)}
                                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                                  contentEngagementTab === tab.id
                                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                                }`}
                              >
                                {tab.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Engagement Table */}
                        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#122238]">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-slate-100/70 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 font-bold">
                                <th className="p-3">Post Title</th>
                                <th className="p-3">Type</th>
                                <th className="p-3">Date</th>
                                <th className="p-3 text-right">Impressions</th>
                                <th className="p-3 text-right">Clicks</th>
                                <th className="p-3 text-right">CTR</th>
                                <th className="p-3 text-right">Reactions</th>
                                <th className="p-3 text-right">Rate</th>
                                <th className="p-3 text-center">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-700 dark:text-slate-300">
                              {postsList
                                .filter((p) => contentEngagementTab === "all" || p.type === contentEngagementTab)
                                .map((post) => (
                                  <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                                    <td className="p-3 font-bold text-slate-900 dark:text-white max-w-xs truncate">
                                      {post.title}
                                    </td>
                                    <td className="p-3">
                                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-white/10 capitalize">
                                        {post.type}
                                      </span>
                                    </td>
                                    <td className="p-3 text-slate-500 text-[11px] whitespace-nowrap">{post.timestamp}</td>
                                    <td className="p-3 text-right font-mono font-bold text-slate-900 dark:text-white">
                                      {post.metrics?.organicImpressions || 58}
                                    </td>
                                    <td className="p-3 text-right font-mono">{post.metrics?.clicks || 0}</td>
                                    <td className="p-3 text-right font-mono">{post.metrics?.ctr || "0%"}</td>
                                    <td className="p-3 text-right font-mono font-bold text-[#0a66c2]">{post.likes || 0}</td>
                                    <td className="p-3 text-right font-mono text-emerald-600 font-bold">
                                      {post.metrics?.engagementRate || "1.72%"}
                                    </td>
                                    <td className="p-3 text-center">
                                      <button
                                        onClick={() => setSelectedPostMetrics(post)}
                                        className="text-[#0a66c2] hover:underline font-bold text-[11px]"
                                      >
                                        Details →
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ========================================================================= */}
                  {/* TAB 2: VISITORS ANALYTICS (Exact User Screenshots Implementation)        */}
                  {/* ========================================================================= */}
                  {activeAnalyticsTab === "visitors" && (
                    <div className="space-y-6">
                      
                      {/* Visitor Highlights Card */}
                      <div className="bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Visitor highlights</h3>
                          <div className="group relative">
                            <Info className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-80 p-3 bg-slate-900 text-white text-[11px] rounded-xl shadow-xl z-30 leading-snug">
                              Analytics are based on the total number of Page Views, unique visitors over time, and unique custom button clicks over time. Unique visitors are calculated daily and are not de-duplicated over multiple days. Data is measured across desktop and mobile for logged in members.
                            </div>
                          </div>
                        </div>

                        {/* 3 Highlights KPIs */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                          <div className="p-4 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-xl space-y-1">
                            <span className="text-2xl font-black text-slate-900 dark:text-white block">1,312</span>
                            <span className="text-xs text-slate-500 font-medium block">Page views</span>
                            <span className="text-[11px] text-red-500 font-bold flex items-center gap-0.5">
                              <TrendingDown className="w-3 h-3" /> 25.5%
                            </span>
                          </div>
                          <div className="p-4 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-xl space-y-1">
                            <span className="text-2xl font-black text-slate-900 dark:text-white block">585</span>
                            <span className="text-xs text-slate-500 font-medium block">Unique visitors</span>
                            <span className="text-[11px] text-red-500 font-bold flex items-center gap-0.5">
                              <TrendingDown className="w-3 h-3" /> 32.3%
                            </span>
                          </div>
                          <div className="p-4 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-xl space-y-1">
                            <span className="text-2xl font-black text-slate-900 dark:text-white block">19</span>
                            <span className="text-xs text-slate-500 font-medium block">Custom button clicks</span>
                            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-0.5">
                              <TrendingUp className="w-3 h-3" /> 1,800%
                            </span>
                          </div>
                        </div>

                        {/* "Get Noticed" Growth Callout Banner */}
                        {!dismissVisitorBanner && (
                          <div className="p-4 bg-amber-950/20 border border-amber-500/30 rounded-xl flex items-center justify-between gap-4 text-xs">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                                <Sparkles className="w-4 h-4" />
                              </div>
                              <div className="space-y-1">
                                <h4 className="font-bold text-slate-900 dark:text-amber-100">Get noticed</h4>
                                <p className="text-slate-600 dark:text-amber-200/80 text-[11px]">
                                  Pages that post at least once a week see 5x more followers.
                                </p>
                                <button
                                  onClick={() => {
                                    setCreateType("post");
                                    setCreateModalOpen(true);
                                  }}
                                  className="mt-1 px-4 py-1 border border-slate-400 dark:border-amber-400/60 rounded-full font-bold text-slate-900 dark:text-amber-100 hover:bg-amber-500/10 text-xs transition-all"
                                >
                                  Start a post
                                </button>
                              </div>
                            </div>
                            <button
                              onClick={() => setDismissVisitorBanner(true)}
                              className="text-slate-400 hover:text-slate-600 dark:hover:text-white shrink-0 p-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Visitor Metrics Interactive Line Chart Section */}
                      <div className="bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-5">
                        
                        {/* Title & Filter Pills */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Visitor metrics</h3>
                            <Info className="w-3.5 h-3.5 text-slate-400" />
                          </div>

                          {/* Filter Pills Row (Exact Screenshot 2 & 3) */}
                          <div className="flex items-center gap-2 flex-wrap text-xs">
                            
                            {/* Metric Pill Dropdown */}
                            <div className="relative">
                              <button
                                onClick={() => setVisitorMetricDropdownOpen(!visitorMetricDropdownOpen)}
                                className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold flex items-center gap-1.5 shadow-sm transition-all"
                              >
                                <span>{visitorMetricSelected === "page_views" ? "Page views" : "Unique visitors"}</span>
                                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${visitorMetricDropdownOpen ? "-rotate-90" : "rotate-90"}`} />
                              </button>

                              {visitorMetricDropdownOpen && (
                                <div className="absolute left-0 top-full mt-2 w-44 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl p-1.5 z-30 space-y-1">
                                  <button
                                    onClick={() => {
                                      setVisitorMetricSelected("page_views");
                                      setVisitorMetricDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 rounded-lg font-semibold ${
                                      visitorMetricSelected === "page_views"
                                        ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600"
                                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                                    }`}
                                  >
                                    Page views
                                  </button>
                                  <button
                                    onClick={() => {
                                      setVisitorMetricSelected("unique_visitors");
                                      setVisitorMetricDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 rounded-lg font-semibold ${
                                      visitorMetricSelected === "unique_visitors"
                                        ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600"
                                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                                    }`}
                                  >
                                    Unique visitors
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* Page Filter Pill (Triggers Modal) */}
                            <button
                              onClick={() => {
                                setVisitorTempPageFilter(visitorPageFilter);
                                setVisitorPageModalOpen(true);
                              }}
                              className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold flex items-center gap-1.5 shadow-sm transition-all"
                            >
                              <span className="capitalize">
                                {visitorPageFilter === "all" ? "All pages" 
                                  : visitorPageFilter === "overview" ? "Overview (Home)"
                                  : visitorPageFilter === "vision" ? "Our Vision (About)"
                                  : visitorPageFilter === "insights" ? "Updates & Insights"
                                  : visitorPageFilter === "offerings" ? "Offerings"
                                  : "Team (People)"}
                              </span>
                              <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                            </button>

                            {/* Separator & All Filters */}
                            <span className="text-slate-300 dark:text-slate-700">|</span>
                            <button
                              onClick={() => setVisitorPageModalOpen(true)}
                              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-full text-slate-700 dark:text-slate-300 font-bold"
                            >
                              All filters
                            </button>
                          </div>
                        </div>

                        {/* Interactive Dual-Line SVG Graph */}
                        <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-xl p-5 pt-6 space-y-4">
                          <div className="h-56 w-full relative flex items-end">
                            {/* Y-Axis Grid Lines */}
                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-slate-400 font-mono">
                              <div className="border-b border-slate-100 dark:border-white/5 flex justify-between"><span>100</span></div>
                              <div className="border-b border-slate-100 dark:border-white/5 flex justify-between"><span>75</span></div>
                              <div className="border-b border-slate-100 dark:border-white/5 flex justify-between"><span>50</span></div>
                              <div className="border-b border-slate-100 dark:border-white/5 flex justify-between"><span>25</span></div>
                              <div className="border-b border-slate-200 dark:border-white/10 flex justify-between"><span>0</span></div>
                            </div>

                            {/* Dual SVG Lines for Desktop and Mobile */}
                            <svg className="w-full h-full overflow-visible z-10" viewBox="0 0 500 180" preserveAspectRatio="none">
                              {/* Desktop Series (Solid Light Blue Line) */}
                              {visitorDesktopChecked && (
                                <path
                                  d="M 0,160 L 50,140 L 100,160 L 150,135 L 180,95 L 210,130 L 250,150 L 290,125 L 320,115 L 360,155 L 400,140 L 450,165 L 470,120 L 500,85"
                                  fill="none"
                                  stroke="#70a0ff"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                />
                              )}

                              {/* Mobile Series (Dashed Yellow-Lime Line) */}
                              {visitorMobileChecked && (
                                <path
                                  d="M 0,165 L 50,130 L 100,120 L 140,150 L 180,25 L 210,125 L 250,155 L 290,95 L 320,105 L 360,150 L 400,80 L 450,145 L 470,110 L 500,50"
                                  fill="none"
                                  stroke="#bef264"
                                  strokeWidth="2.5"
                                  strokeDasharray="6 4"
                                  strokeLinecap="round"
                                />
                              )}
                            </svg>
                          </div>

                          {/* X-Axis Date Labels */}
                          <div className="flex justify-between text-[10px] font-semibold text-slate-400 pt-2 border-t border-slate-100 dark:border-white/5">
                            <span>Aug 4</span>
                            <span>Aug 9</span>
                            <span>Aug 14</span>
                            <span>Aug 19</span>
                            <span>Aug 24</span>
                            <span>Aug 29</span>
                          </div>

                          {/* Device Series Toggles (Exact Screenshot 2 Bottom) */}
                          <div className="pt-3 border-t border-slate-100 dark:border-white/10 space-y-2 text-xs">
                            <label className="flex items-center justify-between cursor-pointer py-1.5 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg px-2">
                              <div className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  checked={visitorDesktopChecked}
                                  onChange={(e) => setVisitorDesktopChecked(e.target.checked)}
                                  className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 accent-emerald-500"
                                />
                                <div className="flex items-center gap-2">
                                  <span className="w-6 h-0.5 bg-[#70a0ff] block"></span>
                                  <span className="font-semibold text-slate-800 dark:text-slate-200">Desktop</span>
                                </div>
                              </div>
                              <span className="font-mono font-bold text-slate-900 dark:text-white">510</span>
                            </label>

                            <label className="flex items-center justify-between cursor-pointer py-1.5 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg px-2">
                              <div className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  checked={visitorMobileChecked}
                                  onChange={(e) => setVisitorMobileChecked(e.target.checked)}
                                  className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 accent-emerald-500"
                                />
                                <div className="flex items-center gap-2">
                                  <span className="w-6 h-0.5 border-t-2 border-dashed border-[#bef264] block"></span>
                                  <span className="font-semibold text-slate-800 dark:text-slate-200">Mobile</span>
                                </div>
                              </div>
                              <span className="font-mono font-bold text-slate-900 dark:text-white">802</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* "Who's visited your Page" (👑 Premium Feature Card - Exact Screenshot 5) */}
                      <div className="bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-500 border border-amber-500/30 flex items-center gap-1">
                                <Sparkles className="w-3 h-3" /> Premium
                              </span>
                              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                <span>Who&apos;s visited your Page</span>
                                <Info className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
                              </h3>
                            </div>
                            <p className="text-xs text-slate-500">See one new page visitor each day.</p>
                          </div>
                        </div>

                        {/* List of 3 Visitors Cards */}
                        <div className="divide-y divide-slate-200 dark:divide-white/10 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden">
                          
                          {/* Visitor 1: Nisha Junaid Khan */}
                          <div className="p-4 hover:bg-slate-50/70 dark:hover:bg-white/5 transition-all flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 text-white font-bold flex items-center justify-center text-sm shrink-0 shadow-sm">
                              NK
                            </div>
                            <div className="flex-1 min-w-0 space-y-1 text-xs">
                              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                                Nisha Junaid Khan
                              </h4>
                              <p className="text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                                VP Corporate Relations &quot; Strategic Alliances &amp; Workforce Transformation Leader in BFSI and Higher Education Ecosystems.&quot;
                              </p>
                              <p className="text-slate-400 text-[11px]">Mumbai Metropolitan Region</p>
                              <p className="text-slate-500 text-[11px]">
                                Works in <strong className="text-slate-800 dark:text-slate-200">Investment Banking</strong> industry
                              </p>
                              <span className="text-[10px] text-slate-400 font-medium block pt-0.5">Shown 2 days ago</span>
                            </div>
                          </div>

                          {/* Visitor 2: Dinesh Dusane */}
                          <div className="p-4 hover:bg-slate-50/70 dark:hover:bg-white/5 transition-all flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center text-sm shrink-0 shadow-sm">
                              DD
                            </div>
                            <div className="flex-1 min-w-0 space-y-1 text-xs">
                              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                                Dinesh Dusane
                              </h4>
                              <p className="text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                                Strategy &amp; Corporate Planning Leader | Chemicals, Energy &amp; Infrastructure | M&amp;A, Growth Investments ($Bn+) &amp; Capex Optimisation | Board Experience
                              </p>
                              <p className="text-slate-400 text-[11px]">Mumbai</p>
                              <span className="text-[10px] text-slate-400 font-medium block pt-0.5">Shown 3 days ago</span>
                            </div>
                          </div>

                          {/* Visitor 3: Sushil Kumar Soni */}
                          <div className="p-4 hover:bg-slate-50/70 dark:hover:bg-white/5 transition-all flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-sm shrink-0 shadow-sm ring-2 ring-emerald-500/30">
                              SK
                            </div>
                            <div className="flex-1 min-w-0 space-y-1 text-xs">
                              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                                Sushil Kumar Soni
                              </h4>
                              <p className="text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                                Immediate Joiner | Software Engineer | Full Stack Developer | MERN &amp; MEAN | Node.js | React.js | Angular | TypeScript | AWS | Docker | PostgreSQL | Open to Bangalore Roles
                              </p>
                              <p className="text-slate-400 text-[11px]">Greater Bengaluru Area</p>
                              <p className="text-slate-500 text-[11px]">
                                Works in <strong className="text-slate-800 dark:text-slate-200">IT Services and IT Consulting</strong> industry
                              </p>
                              <span className="text-[10px] text-slate-400 font-medium block pt-0.5">Shown 4 days ago</span>
                            </div>
                          </div>
                        </div>

                        {/* Show all visitors Link */}
                        <div className="text-center pt-1">
                          <button
                            onClick={() => setShowAllVisitorsModalOpen(true)}
                            className="text-xs font-bold text-[#0a66c2] hover:underline flex items-center justify-center gap-1.5 mx-auto"
                          >
                            <span>Show all visitors</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Visitor Demographics Section (Exact Screenshot 1 & 2 Demographics) */}
                      <div className="bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Visitor demographics</h3>
                            <Info className="w-3.5 h-3.5 text-slate-400" />
                          </div>

                          {/* Demographics Dropdown (Company size, Industry, Location, Seniority) */}
                          <div className="relative">
                            <button
                              onClick={() => setVisitorDemographicDropdownOpen(!visitorDemographicDropdownOpen)}
                              className="px-4 py-1.5 bg-white dark:bg-[#122238] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-full text-xs font-bold flex items-center gap-2 shadow-xs"
                            >
                              <span className="capitalize">
                                {visitorDemographicFilter === "size" ? "Company size"
                                  : visitorDemographicFilter === "industry" ? "Industry"
                                  : visitorDemographicFilter === "location" ? "Location"
                                  : "Seniority"}
                              </span>
                              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${visitorDemographicDropdownOpen ? "-rotate-90" : "rotate-90"}`} />
                            </button>

                            {visitorDemographicDropdownOpen && (
                              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl p-1.5 z-30 space-y-1 text-xs">
                                {[
                                  { id: "size", label: "Company size" },
                                  { id: "industry", label: "Industry" },
                                  { id: "location", label: "Location" },
                                  { id: "seniority", label: "Seniority" },
                                ].map((item) => (
                                  <button
                                    key={item.id}
                                    onClick={() => {
                                      setVisitorDemographicFilter(item.id as any);
                                      setVisitorDemographicDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 rounded-lg font-semibold flex items-center justify-between ${
                                      visitorDemographicFilter === item.id
                                        ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 font-bold"
                                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                                    }`}
                                  >
                                    <span>{item.label}</span>
                                    {visitorDemographicFilter === item.id && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Horizontal Distribution Bars */}
                        <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-5 space-y-4">
                          {(
                            visitorDemographicFilter === "size" ? [
                              { name: "10,001+ employees", count: 448, pct: 34.1 },
                              { name: "1,001-5,000 employees", count: 286, pct: 21.8 },
                              { name: "501-1,000 employees", count: 194, pct: 14.8 },
                              { name: "51-200 employees", count: 178, pct: 13.6 },
                              { name: "11-50 employees", count: 112, pct: 8.5 },
                              { name: "2-10 employees", count: 94, pct: 7.2 },
                            ] : visitorDemographicFilter === "industry" ? [
                              { name: "Information Technology", count: 392, pct: 29.9 },
                              { name: "Financial Services & BFSI", count: 284, pct: 21.6 },
                              { name: "Industrial Automation & Robotics", count: 246, pct: 18.8 },
                              { name: "Management Consulting", count: 168, pct: 12.8 },
                              { name: "Higher Education & Research", count: 122, pct: 9.3 },
                              { name: "Hospital & Health Care", count: 100, pct: 7.6 },
                            ] : visitorDemographicFilter === "location" ? [
                              { name: "Bengaluru, Karnataka, India", count: 482, pct: 36.7 },
                              { name: "Mumbai Metropolitan Region", count: 348, pct: 26.5 },
                              { name: "Delhi NCR, India", count: 214, pct: 16.3 },
                              { name: "Hyderabad, Telangana, India", count: 142, pct: 10.8 },
                              { name: "Dubai & Middle East Hub", count: 126, pct: 9.6 },
                            ] : [
                              { name: "Senior Professional / Lead", count: 410, pct: 31.2 },
                              { name: "Manager / Project Lead", count: 320, pct: 24.4 },
                              { name: "Director / Division Head", count: 210, pct: 16.0 },
                              { name: "VP & CXO Executive", count: 185, pct: 14.1 },
                              { name: "Founder / Owner / Partner", count: 115, pct: 8.8 },
                              { name: "Entry Level / Associate", count: 72, pct: 5.5 },
                            ]
                          ).map((item, idx) => (
                            <div key={idx} className="space-y-1.5 text-xs">
                              <div className="flex items-center justify-between font-semibold">
                                <span className="text-slate-900 dark:text-white">{item.name}</span>
                                <span className="text-slate-500 font-mono text-[11px]">{item.count} ({item.pct}%)</span>
                              </div>
                              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-slate-400 dark:bg-slate-500 rounded-full transition-all duration-500"
                                  style={{ width: `${item.pct}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ========================================================================= */}
                  {/* TAB 3: FOLLOWERS ANALYTICS (Exact Screenshots 1-5 Implementation)         */}
                  {/* ========================================================================= */}
                  {activeAnalyticsTab === "followers" && (
                    <div className="space-y-6">
                      
                      {/* Follower Highlights Card */}
                      <div className="bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Follower highlights</h3>
                          <div className="group relative">
                            <Info className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-80 p-3 bg-slate-900 text-white text-[11px] rounded-xl shadow-xl z-30 leading-snug">
                              Total followers are the number of all-time followers of your Page since creation. The total number of followers is updated once a day.<br/><br/>
                              New followers are the number of followers your Page has gained in the past 30 days. A percent change is shown from the previous 30 days.<br/><br/>
                              This does not include followers who are other Pages.
                            </div>
                          </div>
                        </div>

                        {/* 3 Follower KPIs */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                          <div className="p-4 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-xl space-y-1">
                            <span className="text-2xl font-black text-slate-900 dark:text-white block">5,170</span>
                            <span className="text-xs text-slate-500 font-medium block">Total followers</span>
                          </div>
                          <div className="p-4 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-xl space-y-1">
                            <span className="text-2xl font-black text-slate-900 dark:text-white block">1,410</span>
                            <span className="text-xs text-slate-500 font-medium block">New followers in the last 30 days</span>
                            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-0.5">
                              <TrendingUp className="w-3 h-3" /> 195.6%
                            </span>
                          </div>
                          <div className="p-4 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-xl space-y-1">
                            <span className="text-2xl font-black text-slate-900 dark:text-white block">8</span>
                            <span className="text-xs text-slate-500 font-medium block">New followers auto-invited with Premium</span>
                            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-0.5">
                              <TrendingUp className="w-3 h-3" /> 166.7%
                            </span>
                          </div>
                        </div>

                        {/* "Grow your audience" Banner */}
                        {!dismissFollowerBanner && (
                          <div className="p-4 bg-amber-950/20 border border-amber-500/30 rounded-xl flex items-center justify-between gap-4 text-xs">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                                <Sparkles className="w-4 h-4" />
                              </div>
                              <div className="space-y-1">
                                <h4 className="font-bold text-slate-900 dark:text-amber-100">Grow your audience</h4>
                                <p className="text-slate-600 dark:text-amber-200/80 text-[11px]">
                                  Pages that post at least once a week receive 5x more followers. People who engage with your posts are auto-invited to follow your page.
                                </p>
                                <button
                                  onClick={() => {
                                    setCreateType("post");
                                    setCreateModalOpen(true);
                                  }}
                                  className="mt-1 px-4 py-1 border border-slate-400 dark:border-amber-400/60 rounded-full font-bold text-slate-900 dark:text-amber-100 hover:bg-amber-500/10 text-xs transition-all"
                                >
                                  Start a post
                                </button>
                              </div>
                            </div>
                            <button
                              onClick={() => setDismissFollowerBanner(true)}
                              className="text-slate-400 hover:text-slate-600 dark:hover:text-white shrink-0 p-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Follower Metrics Interactive Line Chart (Exact Screenshot 2) */}
                      <div className="bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-5">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Follower metrics</h3>
                          <div className="group relative">
                            <Info className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-72 p-2.5 bg-slate-900 text-white text-[11px] rounded-xl shadow-xl z-30 leading-snug">
                              Line graph of new followers in the past 30 days. Sponsored data shows followers acquired through Ads and Sponsored Content. This does not include followers who are other Pages.
                            </div>
                          </div>
                        </div>

                        {/* Chart Box */}
                        <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-xl p-5 pt-6 space-y-4">
                          <div className="h-60 w-full relative flex items-end">
                            {/* Y-Axis Grid Lines */}
                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-slate-400 font-mono">
                              <div className="border-b border-slate-100 dark:border-white/5 flex justify-between"><span>200</span></div>
                              <div className="border-b border-slate-100 dark:border-white/5 flex justify-between"><span>150</span></div>
                              <div className="border-b border-slate-100 dark:border-white/5 flex justify-between"><span>100</span></div>
                              <div className="border-b border-slate-100 dark:border-white/5 flex justify-between"><span>50</span></div>
                              <div className="border-b border-slate-200 dark:border-white/10 flex justify-between"><span>0</span></div>
                            </div>

                            {/* Hover Popover Box (Screenshot 2 exact format) */}
                            <div className="absolute left-[24%] top-4 bg-slate-900/90 text-white border border-slate-700 p-3 rounded-xl shadow-2xl text-[11px] space-y-1.5 z-20 w-48 pointer-events-none backdrop-blur-xs">
                              <span className="font-bold text-slate-300 block border-b border-slate-700 pb-1">Tuesday, Aug 11, 2026</span>
                              <div className="flex justify-between items-center">
                                <span className="text-[#bef264] font-mono">--- Organic</span>
                                <span className="font-bold font-mono">69 <span className="text-red-400 text-[10px]">▼ 59%</span></span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-[#70a0ff] font-mono">── Sponsored</span>
                                <span className="font-bold font-mono">0</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-[#fb923c] font-mono">···· Auto-invited</span>
                                <span className="font-bold font-mono">0 <span className="text-red-400 text-[10px]">▼ 100%</span></span>
                              </div>
                            </div>

                            {/* SVG Follower Trend Curves */}
                            <svg className="w-full h-full overflow-visible z-10" viewBox="0 0 500 200" preserveAspectRatio="none">
                              {/* Sponsored Line (Solid Blue on 0 line) */}
                              {followerSponsoredChecked && (
                                <path
                                  d="M 0,195 L 500,195"
                                  fill="none"
                                  stroke="#70a0ff"
                                  strokeWidth="2.5"
                                />
                              )}

                              {/* Organic Line (Dashed Lime Peak) */}
                              {followerOrganicChecked && (
                                <path
                                  d="M 0,185 L 30,145 L 60,140 L 90,165 L 120,140 L 140,40 L 160,30 L 180,120 L 200,140 L 220,150 L 240,160 L 270,145 L 300,145 L 330,165 L 360,160 L 390,180 L 420,175 L 440,90 L 470,140 L 500,165"
                                  fill="none"
                                  stroke="#bef264"
                                  strokeWidth="2.5"
                                  strokeDasharray="6 4"
                                  strokeLinecap="round"
                                />
                              )}

                              {/* Auto-Invited Line (Dotted Orange near 0 line) */}
                              {followerAutoInvitedChecked && (
                                <path
                                  d="M 0,195 L 140,195 L 160,190 L 200,195 L 300,195 L 440,190 L 500,195"
                                  fill="none"
                                  stroke="#fb923c"
                                  strokeWidth="2.5"
                                  strokeDasharray="2 3"
                                  strokeLinecap="round"
                                />
                              )}

                              {/* Active Point Circle at Aug 11 */}
                              <circle cx="160" cy="30" r="5" className="fill-[#bef264] stroke-white stroke-2" />
                              <line x1="160" y1="30" x2="160" y2="195" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
                            </svg>
                          </div>

                          {/* X-Axis Date Labels */}
                          <div className="flex justify-between text-[10px] font-semibold text-slate-400 pt-2 border-t border-slate-100 dark:border-white/5">
                            <span>Aug 4</span>
                            <span>Aug 9</span>
                            <span>Aug 14</span>
                            <span>Aug 19</span>
                            <span>Aug 24</span>
                            <span>Aug 29</span>
                          </div>

                          {/* 3 Series Toggles (Exact Screenshot 2 Bottom) */}
                          <div className="pt-3 border-t border-slate-100 dark:border-white/10 space-y-2 text-xs">
                            <label className="flex items-center justify-between cursor-pointer py-1.5 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg px-2">
                              <div className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  checked={followerSponsoredChecked}
                                  onChange={(e) => setFollowerSponsoredChecked(e.target.checked)}
                                  className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 accent-emerald-500"
                                />
                                <div className="flex items-center gap-2">
                                  <span className="w-6 h-0.5 bg-[#70a0ff] block"></span>
                                  <span className="font-semibold text-slate-800 dark:text-slate-200">Sponsored</span>
                                </div>
                              </div>
                              <span className="font-mono font-bold text-slate-900 dark:text-white">0</span>
                            </label>

                            <label className="flex items-center justify-between cursor-pointer py-1.5 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg px-2">
                              <div className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  checked={followerOrganicChecked}
                                  onChange={(e) => setFollowerOrganicChecked(e.target.checked)}
                                  className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 accent-emerald-500"
                                />
                                <div className="flex items-center gap-2">
                                  <span className="w-6 h-0.5 border-t-2 border-dashed border-[#bef264] block"></span>
                                  <span className="font-semibold text-slate-800 dark:text-slate-200">Organic</span>
                                </div>
                              </div>
                              <span className="font-mono font-bold text-slate-900 dark:text-white">1,402</span>
                            </label>

                            <label className="flex items-center justify-between cursor-pointer py-1.5 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg px-2">
                              <div className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  checked={followerAutoInvitedChecked}
                                  onChange={(e) => setFollowerAutoInvitedChecked(e.target.checked)}
                                  className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 accent-emerald-500"
                                />
                                <div className="flex items-center gap-2">
                                  <span className="w-6 h-0.5 border-t-2 border-dotted border-[#fb923c] block"></span>
                                  <span className="font-semibold text-slate-800 dark:text-slate-200">Auto-invited</span>
                                </div>
                              </div>
                              <span className="font-mono font-bold text-slate-900 dark:text-white">8</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Follower Demographics Section (Exact Screenshot 3) */}
                      <div className="bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Follower demographics</h3>
                            <div className="group relative">
                              <Info className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
                              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-80 p-3 bg-slate-900 text-white text-[11px] rounded-xl shadow-xl z-30 leading-snug">
                                Aggregated demographics of LinkedIn members who follow your Page. % shown is calculated as: Followers with this demographic / Total followers with standardized demographics. This does not include followers who are other Pages.
                              </div>
                            </div>
                          </div>

                          {/* Demographics Dropdown */}
                          <div className="relative">
                            <button
                              onClick={() => setFollowerDemographicDropdownOpen(!followerDemographicDropdownOpen)}
                              className="px-4 py-1.5 bg-white dark:bg-[#122238] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-full text-xs font-bold flex items-center gap-2 shadow-xs"
                            >
                              <span className="capitalize">
                                {followerDemographicFilter === "location" ? "Location"
                                  : followerDemographicFilter === "size" ? "Company size"
                                  : followerDemographicFilter === "industry" ? "Industry"
                                  : "Seniority"}
                              </span>
                              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${followerDemographicDropdownOpen ? "-rotate-90" : "rotate-90"}`} />
                            </button>

                            {followerDemographicDropdownOpen && (
                              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl p-1.5 z-30 space-y-1 text-xs">
                                {[
                                  { id: "location", label: "Location" },
                                  { id: "size", label: "Company size" },
                                  { id: "industry", label: "Industry" },
                                  { id: "seniority", label: "Seniority" },
                                ].map((item) => (
                                  <button
                                    key={item.id}
                                    onClick={() => {
                                      setFollowerDemographicFilter(item.id as any);
                                      setFollowerDemographicDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 rounded-lg font-semibold flex items-center justify-between ${
                                      followerDemographicFilter === item.id
                                        ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 font-bold"
                                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                                    }`}
                                  >
                                    <span>{item.label}</span>
                                    {followerDemographicFilter === item.id && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Horizontal Distribution Bars */}
                        <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-5 space-y-4">
                          {(
                            followerDemographicFilter === "location" ? [
                              { name: "India", count: 1409, pct: 27.3 },
                              { name: "Bengaluru, India", count: 544, pct: 10.5 },
                              { name: "Mumbai Metropolitan Region, India", count: 384, pct: 7.4 },
                              { name: "Greater Hyderabad Area, India", count: 270, pct: 5.2 },
                              { name: "Greater Chennai Area, India", count: 207, pct: 4.0 },
                              ...(followerDemographicsShowAll ? [
                                { name: "Greater Kolkata Area, India", count: 119, pct: 2.3 },
                                { name: "Pune/Pimpri-Chinchwad Area, India", count: 118, pct: 2.3 },
                                { name: "Dubai, United Arab Emirates", count: 98, pct: 1.9 },
                              ] : [])
                            ] : followerDemographicFilter === "size" ? [
                              { name: "10,001+ employees", count: 1550, pct: 30.0 },
                              { name: "1,001-5,000 employees", count: 1120, pct: 21.7 },
                              { name: "501-1,000 employees", count: 850, pct: 16.4 },
                              { name: "51-200 employees", count: 740, pct: 14.3 },
                              { name: "11-50 employees", count: 520, pct: 10.1 },
                              ...(followerDemographicsShowAll ? [
                                { name: "2-10 employees", count: 390, pct: 7.5 },
                              ] : [])
                            ] : followerDemographicFilter === "industry" ? [
                              { name: "Information Technology & Services", count: 1620, pct: 31.3 },
                              { name: "Industrial Automation & Robotics", count: 1210, pct: 23.4 },
                              { name: "Financial Services & Banking", count: 840, pct: 16.2 },
                              { name: "Supply Chain & Logistics", count: 680, pct: 13.1 },
                              { name: "Education Management", count: 450, pct: 8.7 },
                              ...(followerDemographicsShowAll ? [
                                { name: "Management Consulting", count: 370, pct: 7.3 },
                              ] : [])
                            ] : [
                              { name: "Senior Professional / Specialist", count: 1740, pct: 33.7 },
                              { name: "Manager / Project Lead", count: 1280, pct: 24.8 },
                              { name: "Director / Vice President", count: 890, pct: 17.2 },
                              { name: "CXO / Partner / Founder", count: 710, pct: 13.7 },
                              { name: "Entry Level / Associate", count: 550, pct: 10.6 },
                            ]
                          ).map((item, idx) => (
                            <div key={idx} className="space-y-1.5 text-xs">
                              <div className="flex items-center justify-between font-semibold">
                                <span className="text-slate-900 dark:text-white">{item.name}</span>
                                <span className="text-slate-500 font-mono text-[11px]">{item.count} ({item.pct}%)</span>
                              </div>
                              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-slate-400 dark:bg-slate-500 rounded-full transition-all duration-500"
                                  style={{ width: `${item.pct * 2.5 > 100 ? 100 : item.pct * 2.5}%` }}
                                />
                              </div>
                            </div>
                          ))}

                          <div className="text-center pt-2">
                            <button
                              onClick={() => setFollowerDemographicsShowAll(!followerDemographicsShowAll)}
                              className="text-xs font-bold text-[#0a66c2] hover:underline"
                            >
                              {followerDemographicsShowAll ? "Show less" : "Show all"}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* "Grow your followers" Quick Action Card (Screenshot 4 Top) */}
                      <div className="p-4 bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-2 overflow-hidden">
                            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center border-2 border-white">S</div>
                            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center border-2 border-white">K</div>
                            <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center border-2 border-white">P</div>
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Grow your followers</h4>
                            <p className="text-[11px] text-slate-500">Build your audience by inviting relevant members to follow your page</p>
                          </div>
                        </div>
                        <button
                          onClick={handleInviteConnections}
                          className="px-4 py-1.5 border border-[#0a66c2] text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white font-bold text-xs rounded-full transition-all shadow-xs shrink-0"
                        >
                          Invite members
                        </button>
                      </div>

                      {/* "All followers" Directory Roster (Screenshot 4 & 5) */}
                      <div className="bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <h3 className="text-sm font-bold text-slate-900 dark:text-white">All followers</h3>
                              <div className="group relative">
                                <Info className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
                                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-72 p-2.5 bg-slate-900 text-white text-[11px] rounded-xl shadow-xl z-30 leading-snug">
                                  List of your page&apos;s current followers ordered by recency. Other pages following your page are not included in other Follower Analytics metrics. Members cannot be followed back.
                                </div>
                              </div>
                            </div>
                            <span className="text-[11px] text-slate-400 block">Excluded from report</span>
                          </div>
                        </div>

                        {/* People vs Pages Toggle Pills */}
                        <div className="flex items-center gap-2 text-xs font-bold">
                          <button
                            onClick={() => setFollowerRosterTab("people")}
                            className={`px-4 py-1.5 rounded-full transition-all ${
                              followerRosterTab === "people"
                                ? "bg-emerald-500 text-white shadow-sm"
                                : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                            }`}
                          >
                            People
                          </button>
                          <button
                            onClick={() => setFollowerRosterTab("pages")}
                            className={`px-4 py-1.5 rounded-full transition-all ${
                              followerRosterTab === "pages"
                                ? "bg-emerald-500 text-white shadow-sm"
                                : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                            }`}
                          >
                            Pages
                          </button>
                        </div>

                        {/* Followers List */}
                        <div className="divide-y divide-slate-200 dark:divide-white/10 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden">
                          {followerRosterTab === "people" ? (
                            <>
                              {/* Person 1: Sekhar Maaram */}
                              <div className="p-4 hover:bg-slate-50/70 dark:hover:bg-white/5 transition-all flex items-start gap-3.5">
                                <div className="w-11 h-11 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center text-sm shrink-0">
                                  SM
                                </div>
                                <div className="flex-1 min-w-0 space-y-0.5 text-xs">
                                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                                    Sekhar Maaram <span className="text-slate-400 text-xs font-normal">· 3rd</span>
                                  </h4>
                                  <p className="text-slate-600 dark:text-slate-300 line-clamp-1">
                                    Senior Software Engineer | Backend &amp; Full-Stack Engineer | Node.js • React.js • Express.js • MongoDB | Platform Engineering
                                  </p>
                                  <span className="text-[10px] text-slate-400 block pt-0.5">September 2026</span>
                                </div>
                              </div>

                              {/* Person 2: Khadhiri Abdul Subhan */}
                              <div className="p-4 hover:bg-slate-50/70 dark:hover:bg-white/5 transition-all flex items-start gap-3.5">
                                <div className="w-11 h-11 rounded-full bg-amber-700 text-white font-bold flex items-center justify-center text-sm shrink-0">
                                  KA
                                </div>
                                <div className="flex-1 min-w-0 space-y-0.5 text-xs">
                                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                                    Khadhiri Abdul Subhan <span className="text-slate-400 text-xs font-normal">· 3rd</span>
                                  </h4>
                                  <p className="text-slate-600 dark:text-slate-300 line-clamp-1">
                                    Immediate Joiner | Senior Full Stack Developer | React.js | Node.js | TypeScript | Microservices | 7+ Years Experience
                                  </p>
                                  <span className="text-[10px] text-slate-400 block pt-0.5">September 2026</span>
                                </div>
                              </div>

                              {/* Person 3: Poorna Pushkala */}
                              <div className="p-4 hover:bg-slate-50/70 dark:hover:bg-white/5 transition-all flex items-start gap-3.5">
                                <div className="w-11 h-11 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-sm shrink-0">
                                  PP
                                </div>
                                <div className="flex-1 min-w-0 space-y-0.5 text-xs">
                                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                                    Poorna Pushkala, ICF-PCC, PMP® <span className="text-slate-400 text-xs font-normal">· 3rd</span>
                                  </h4>
                                  <p className="text-slate-600 dark:text-slate-300 line-clamp-1">
                                    CEO | Board Director | People, Strategy &amp; Transformation Leader | Institution Builder | Rural Transformation | ESG
                                  </p>
                                  <span className="text-[10px] text-slate-400 block pt-0.5">September 2026</span>
                                </div>
                              </div>

                              {/* Person 4: Dr. Satyajit Das */}
                              <div className="p-4 hover:bg-slate-50/70 dark:hover:bg-white/5 transition-all flex items-start gap-3.5">
                                <div className="w-11 h-11 rounded-full bg-indigo-800 text-white font-bold flex items-center justify-center text-sm shrink-0">
                                  SD
                                </div>
                                <div className="flex-1 min-w-0 space-y-0.5 text-xs">
                                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                                    Dr. Satyajit Das (Ex Director Capgemini, DXC, IBM, Steria) <span className="text-slate-400 text-xs font-normal">· 3rd</span>
                                  </h4>
                                  <p className="text-slate-600 dark:text-slate-300 line-clamp-1">
                                    Senior IT Leader &amp; AI Generalist | IICA Certified Independent Director, Board Advisor
                                  </p>
                                  <span className="text-[10px] text-slate-400 block pt-0.5">September 2026</span>
                                </div>
                              </div>

                              {/* Person 5: Parag Gulati */}
                              <div className="p-4 hover:bg-slate-50/70 dark:hover:bg-white/5 transition-all flex items-start gap-3.5">
                                <div className="w-11 h-11 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center text-sm shrink-0">
                                  PG
                                </div>
                                <div className="flex-1 min-w-0 space-y-0.5 text-xs">
                                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                                    Parag Gulati <span className="text-slate-400 text-xs font-normal">· 3rd</span>
                                  </h4>
                                  <p className="text-slate-600 dark:text-slate-300 line-clamp-1">
                                    Head of Presales - Data Strategy | Gen-AI | Enterprise Architecture | Solution Architecture
                                  </p>
                                  <span className="text-[10px] text-slate-400 block pt-0.5">September 2026</span>
                                </div>
                              </div>
                            </>
                          ) : (
                            /* Pages Roster (Screenshot 5) */
                            <div className="p-4 hover:bg-slate-50/70 dark:hover:bg-white/5 transition-all flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3.5">
                                <div className="w-11 h-11 rounded-xl bg-purple-900 text-white font-black flex items-center justify-center text-xs shrink-0 border border-purple-700">
                                  TH
                                </div>
                                <div className="space-y-0.5 text-xs">
                                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Thorio</h4>
                                  <p className="text-slate-500">Staffing and Recruiting · August 2026</p>
                                  <span className="text-[10px] text-slate-400 font-medium">57 followers</span>
                                </div>
                              </div>

                              <button
                                onClick={() => alert("Followed Thorio page!")}
                                className="px-5 py-1.5 border border-[#0a66c2] text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white font-bold text-xs rounded-full transition-all shadow-xs shrink-0"
                              >
                                Follow
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Footer Show all followers */}
                        <div className="text-center pt-1">
                          <button
                            onClick={() => setShowAllFollowersModalOpen(true)}
                            className="text-xs font-bold text-[#0a66c2] hover:underline flex items-center justify-center gap-1 mx-auto"
                          >
                            <span>Show all followers</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ========================================================================= */}
                  {/* TAB 4: SEARCH APPEARANCES ANALYTICS (Exact Screenshots 1-3)               */}
                  {/* ========================================================================= */}
                  {activeAnalyticsTab === "search" && (
                    <div className="space-y-6">
                      
                      {/* Search Appearance Highlights Card */}
                      <div className="bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Search appearance highlights</h3>
                            <div className="group relative">
                              <Info className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
                              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-80 p-3 bg-slate-900 text-white text-[11px] rounded-xl shadow-xl z-30 leading-snug">
                                Total search appearances represent the number of times your Page appeared in search results during a given time period. This number is refreshed daily.<br/><br/>
                                New appearances show how often your Page appeared in search results over the past 7 days. Percent change compares this total to the previous 7-day period.
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-slate-500">
                            How often your Page appeared in search results between August 27 - September 2. <span className="text-[#0a66c2] cursor-pointer hover:underline">Learn more</span>
                          </p>
                        </div>

                        {/* KPI Block */}
                        <div className="p-4 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-xl space-y-1 max-w-xs">
                          <span className="text-2xl font-black text-slate-900 dark:text-white block">828</span>
                          <span className="text-xs text-slate-500 font-medium block">Page searches</span>
                          <span className="text-[11px] text-red-500 font-bold flex items-center gap-0.5">
                            <TrendingDown className="w-3 h-3" /> 1.3% last 7 days
                          </span>
                        </div>

                        {/* "Reach more audience" Banner */}
                        {!dismissSearchBanner && (
                          <div className="p-4 bg-amber-950/20 border border-amber-500/30 rounded-xl flex items-center justify-between gap-4 text-xs">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                                <Sparkles className="w-4 h-4" />
                              </div>
                              <div className="space-y-1">
                                <h4 className="font-bold text-slate-900 dark:text-amber-100">Reach more of the right audience</h4>
                                <p className="text-slate-600 dark:text-amber-200/80 text-[11px]">
                                  Boost your top posts to reach more people and grow your Page engagement.
                                </p>
                                <button
                                  onClick={() => setBoostablePostsModalOpen(true)}
                                  className="mt-1 px-4 py-1 border border-slate-400 dark:border-amber-400/60 rounded-full font-bold text-slate-900 dark:text-amber-100 hover:bg-amber-500/10 text-xs transition-all"
                                >
                                  See boostable posts
                                </button>
                              </div>
                            </div>
                            <button
                              onClick={() => setDismissSearchBanner(true)}
                              className="text-slate-400 hover:text-slate-600 dark:hover:text-white shrink-0 p-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* "Who's visited your Page" (👑 Premium Card - Screenshot 1 & 2) */}
                      <div className="bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-500 border border-amber-500/30 flex items-center gap-1">
                              <Sparkles className="w-3 h-3" /> Premium
                            </span>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                              <span>Who&apos;s visited your Page</span>
                              <Info className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
                            </h3>
                          </div>
                          <p className="text-xs text-slate-500">Discover potential prospects visiting your Page from search results and other places on LinkedIn.</p>
                        </div>

                        {/* 2 Visitor Cards */}
                        <div className="divide-y divide-slate-200 dark:divide-white/10 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden">
                          <div className="p-4 hover:bg-slate-50/70 dark:hover:bg-white/5 transition-all flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 text-white font-bold flex items-center justify-center text-sm shrink-0">
                              NK
                            </div>
                            <div className="flex-1 min-w-0 space-y-1 text-xs">
                              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Nisha Junaid Khan</h4>
                              <p className="text-slate-600 dark:text-slate-300 line-clamp-2">
                                VP Corporate Relations &quot; Strategic Alliances &amp; Workforce Transformation Leader in BFSI and Higher Education Ecosystems.&quot;
                              </p>
                              <span className="text-[10px] text-slate-400 font-medium block">Shown 2 days ago</span>
                            </div>
                          </div>

                          <div className="p-4 hover:bg-slate-50/70 dark:hover:bg-white/5 transition-all flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center text-sm shrink-0">
                              DD
                            </div>
                            <div className="flex-1 min-w-0 space-y-1 text-xs">
                              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Dinesh Dusane</h4>
                              <p className="text-slate-600 dark:text-slate-300 line-clamp-2">
                                Strategy &amp; Corporate Planning Leader | Chemicals, Energy &amp; Infrastructure | M&amp;A, Growth Investments ($Bn+) &amp; Capex Optimisation | Board Experience
                              </p>
                              <p className="text-slate-400 text-[11px]">Mumbai</p>
                              <span className="text-[10px] text-slate-400 font-medium block">Shown 3 days ago</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-center pt-1">
                          <button
                            onClick={() => setShowAllVisitorsModalOpen(true)}
                            className="text-xs font-bold text-[#0a66c2] hover:underline flex items-center justify-center gap-1 mx-auto"
                          >
                            <span>Show all visitors</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Top keywords to find your Page (Screenshot 2 Bottom) */}
                      <div className="bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Top keywords to find your Page</h3>
                          <Info className="w-3.5 h-3.5 text-slate-400" />
                        </div>

                        <div className="divide-y divide-slate-100 dark:divide-white/5 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden text-xs">
                          {[
                            "Expo",
                            "Global",
                            "India",
                            "Www.igenworld.com",
                            "Robotics & Automation Systems",
                            "Autonomous Mobile Robots",
                          ].map((kw, idx) => (
                            <div
                              key={idx}
                              className="p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer"
                            >
                              <span className="font-semibold text-slate-900 dark:text-white">{kw}</span>
                              <Search className="w-4 h-4 text-slate-400 hover:text-[#0a66c2]" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Top Page searcher demographics (Screenshot 3) */}
                      <div className="bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Top Page searcher demographics</h3>
                            <Info className="w-3.5 h-3.5 text-slate-400" />
                          </div>

                          {/* Demographics Dropdown (Company vs Industry) */}
                          <div className="relative">
                            <button
                              onClick={() => setSearchDemographicDropdownOpen(!searchDemographicDropdownOpen)}
                              className="px-4 py-1.5 bg-white dark:bg-[#122238] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-full text-xs font-bold flex items-center gap-2 shadow-xs"
                            >
                              <span className="capitalize">{searchDemographicFilter === "company" ? "Company" : "Industry"}</span>
                              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${searchDemographicDropdownOpen ? "-rotate-90" : "rotate-90"}`} />
                            </button>

                            {searchDemographicDropdownOpen && (
                              <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl p-1.5 z-30 space-y-1 text-xs">
                                {[
                                  { id: "company", label: "Company" },
                                  { id: "industry", label: "Industry" },
                                ].map((item) => (
                                  <button
                                    key={item.id}
                                    onClick={() => {
                                      setSearchDemographicFilter(item.id as any);
                                      setSearchDemographicDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 rounded-lg font-semibold flex items-center justify-between ${
                                      searchDemographicFilter === item.id
                                        ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 font-bold"
                                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                                    }`}
                                  >
                                    <span>{item.label}</span>
                                    {searchDemographicFilter === item.id && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* List of Searching Organizations */}
                        <div className="divide-y divide-slate-100 dark:divide-white/5 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden text-xs">
                          {searchDemographicFilter === "company" ? (
                            [
                              { name: "upGrad", domain: "Higher Education & Executive Upskilling", color: "bg-red-600", initial: "upGrad" },
                              { name: "Xccelera AI", domain: "Artificial Intelligence & Cloud Automation", color: "bg-blue-600", initial: "Xccelera AI" },
                              { name: "Grovon Solutions", domain: "Industrial Automation Systems", color: "bg-emerald-600", initial: "Grovon" },
                              { name: "Datamatics Business Solutions", domain: "Enterprise Digital Operations", color: "bg-rose-700", initial: "Datamatics" },
                            ].map((c, i) => (
                              <div key={i} className="p-4 flex items-center gap-3.5 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                                <div className={`w-10 h-10 rounded-xl ${c.color} text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm`}>
                                  {c.name.substring(0, 2).toUpperCase()}
                                </div>
                                <div>
                                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{c.name}</h4>
                                  <p className="text-slate-500 text-[11px]">{c.domain}</p>
                                </div>
                              </div>
                            ))
                          ) : (
                            [
                              { name: "Information Technology & Services", count: "314 searches", pct: 38 },
                              { name: "Industrial Automation & Robotics", count: "215 searches", pct: 26 },
                              { name: "Higher Education & Management", count: "165 searches", pct: 20 },
                              { name: "Financial Services & BFSI", count: "134 searches", pct: 16 },
                            ].map((ind, i) => (
                              <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                                <div>
                                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{ind.name}</h4>
                                  <span className="text-[11px] text-slate-400">{ind.count}</span>
                                </div>
                                <span className="font-mono font-bold text-emerald-600">{ind.pct}%</span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ========================================================================= */}
                  {/* TAB 5: COMPETITORS ANALYTICS (Exact Screenshots 1-4 Implementation)       */}
                  {/* ========================================================================= */}
                  {activeAnalyticsTab === "competitors" && (
                    <div className="space-y-6">
                      
                      {/* Top Premium Header & Competitors Actions */}
                      <div className="bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-500 border border-amber-500/30 flex items-center gap-1">
                                <Sparkles className="w-3 h-3" /> Premium
                              </span>
                              <h3 className="text-base font-bold text-slate-900 dark:text-white">Learn from other pages</h3>
                            </div>
                            <p className="text-xs text-slate-500">Stay ahead with competitor insights</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditCompetitorsModalOpen(true)}
                              className="px-4 py-1.5 border border-[#0a66c2] text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white font-bold text-xs rounded-full transition-all shadow-xs"
                            >
                              Edit competitors
                            </button>
                            <button
                              onClick={() => setExportModalOpen(true)}
                              className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs rounded-full transition-all shadow-sm flex items-center gap-1.5"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Export</span>
                            </button>
                          </div>
                        </div>

                        {/* Intro Benchmarking Banner */}
                        {!dismissCompetitorBanner && (
                          <div className="p-4 bg-slate-900 text-white border border-slate-700 rounded-xl flex items-center justify-between gap-4 text-xs">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400 shrink-0 border border-slate-700">
                                <BarChart3 className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="font-bold text-white">Start tracking and benchmarking your page&apos;s performance</h4>
                                <p className="text-slate-400 text-[11px] mt-0.5">
                                  Edit your competitors list to track specific pages on LinkedIn. <span className="text-[#70b5f9] cursor-pointer hover:underline">Learn more</span>
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => setDismissCompetitorBanner(true)}
                              className="text-slate-400 hover:text-white shrink-0 p-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Competitor Highlights Card (Screenshot 1 Bottom) */}
                      <div className="bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Competitor highlights</h3>
                            <Info className="w-3.5 h-3.5 text-slate-400" />
                          </div>
                          <span className="text-[11px] text-slate-400 block">Last 30 days</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-4 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-xl space-y-1">
                            <span className="text-2xl font-black text-slate-900 dark:text-white block">7</span>
                            <span className="text-xs text-slate-500 font-medium block">Comments on posts</span>
                            <span className="text-[11px] text-red-500 font-bold flex items-center gap-0.5">
                              <TrendingDown className="w-3 h-3" /> 99.9% vs competitors
                            </span>
                          </div>

                          <div className="p-4 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-xl space-y-1">
                            <span className="text-2xl font-black text-slate-900 dark:text-white block">1,410</span>
                            <span className="text-xs text-slate-500 font-medium block">New followers</span>
                            <span className="text-[11px] text-red-500 font-bold flex items-center gap-0.5">
                              <TrendingDown className="w-3 h-3" /> 81.4% vs competitors
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Compare Growth Table (Exact Screenshot 2) */}
                      <div className="bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Compare growth</h3>
                            <Info className="w-3.5 h-3.5 text-slate-400" />
                          </div>
                          <span className="text-[11px] text-slate-400 block">Last 30 days</span>
                        </div>

                        {/* Benchmark Table */}
                        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#122238]">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-slate-100/70 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 font-bold">
                                <th className="p-3">Competitors</th>
                                <th className="p-3 text-right">New followers</th>
                                <th className="p-3 text-right">Posts</th>
                                <th className="p-3 text-right">Comments</th>
                                <th className="p-3 text-right">Comments per day</th>
                                <th className="p-3 text-right">Reactions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-700 dark:text-slate-300">
                              {trackedCompetitors.map((comp, idx) => (
                                <tr key={comp.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                                  <td className="p-3">
                                    <div className="flex items-center gap-3">
                                      <span className="font-bold text-slate-400 text-xs w-4">{idx + 1}</span>
                                      <div className={`w-8 h-8 rounded-lg ${comp.logoBg} text-white font-bold text-[10px] flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700`}>
                                        {comp.logoText.substring(0, 3)}
                                      </div>
                                      <div className="min-w-0">
                                        <h4 className="font-bold text-slate-900 dark:text-white text-xs truncate max-w-xs">{comp.name}</h4>
                                        <span className="text-[10px] text-slate-400">{comp.followers} followers</span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 text-right font-mono">
                                    <span className="font-bold text-slate-900 dark:text-white">{comp.newFollowers}</span>
                                    <span className={`block text-[10px] font-bold ${comp.newFollowersPct.startsWith("+") ? "text-emerald-600" : "text-red-500"}`}>
                                      {comp.newFollowersPct.startsWith("+") ? `▲ ${comp.newFollowersPct.replace("+", "")}` : `▼ ${comp.newFollowersPct.replace("-", "")}`}
                                    </span>
                                  </td>
                                  <td className="p-3 text-right font-mono">
                                    <span className="font-bold text-slate-900 dark:text-white">{comp.posts}</span>
                                    <span className={`block text-[10px] font-bold ${comp.postsPct.startsWith("+") ? "text-emerald-600" : comp.postsPct.startsWith("-") ? "text-red-500" : "text-slate-400"}`}>
                                      {comp.postsPct.startsWith("+") ? `▲ ${comp.postsPct.replace("+", "")}` : comp.postsPct.startsWith("-") ? `▼ ${comp.postsPct.replace("-", "")}` : `• ${comp.postsPct}`}
                                    </span>
                                  </td>
                                  <td className="p-3 text-right font-mono">
                                    <span className="font-bold text-slate-900 dark:text-white">{comp.comments}</span>
                                    <span className={`block text-[10px] font-bold ${comp.commentsPct.startsWith("+") ? "text-emerald-600" : "text-red-500"}`}>
                                      {comp.commentsPct.startsWith("+") ? `▲ ${comp.commentsPct.replace("+", "")}` : `▼ ${comp.commentsPct.replace("-", "")}`}
                                    </span>
                                  </td>
                                  <td className="p-3 text-right font-mono">
                                    <span className="font-bold text-slate-900 dark:text-white">{comp.dailyComments}</span>
                                    <span className={`block text-[10px] font-bold ${comp.dailyCommentsPct.startsWith("+") ? "text-emerald-600" : "text-red-500"}`}>
                                      {comp.dailyCommentsPct.startsWith("+") ? `▲ ${comp.dailyCommentsPct.replace("+", "")}` : `▼ ${comp.dailyCommentsPct.replace("-", "")}`}
                                    </span>
                                  </td>
                                  <td className="p-3 text-right font-mono">
                                    <span className="font-bold text-slate-900 dark:text-white">{comp.reactions}</span>
                                    <span className={`block text-[10px] font-bold ${comp.reactionsPct.startsWith("+") ? "text-emerald-600" : "text-red-500"}`}>
                                      {comp.reactionsPct.startsWith("+") ? `▲ ${comp.reactionsPct.replace("+", "")}` : `▼ ${comp.reactionsPct.replace("-", "")}`}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Trending Competitor Posts (Exact Screenshot 3) */}
                      <div className="bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Trending competitor posts</h3>
                            <Info className="w-3.5 h-3.5 text-slate-400" />
                          </div>
                          <span className="text-[11px] text-slate-400 block">Last 30 days</span>
                        </div>

                        <div className="space-y-3">
                          {/* Post 1: CXO Lanes */}
                          <div className="p-4 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl space-y-3 text-xs">
                            <span className="text-[11px] text-slate-400 font-semibold block">CXO Lanes posted this • 2w</span>
                            <div className="flex items-start gap-3">
                              <div className="w-16 h-16 rounded-xl bg-slate-800 shrink-0 overflow-hidden flex items-center justify-center font-bold text-white text-xs">
                                RBI Board
                              </div>
                              <p className="text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-3">
                                Anand Mahindra has been appointed as a Part-time, Non-official Director on the Central Board of the <strong>Reserve Bank of India (RBI)</strong> by the Central Government for a four-year term. The appointment is effective from August 20, 2026.
                              </p>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/5 text-[11px] text-slate-500 font-medium">
                              <span>👍👏❤️ 6,100</span>
                              <span>272 comments</span>
                            </div>
                          </div>

                          {/* Post 2: World Economic Forum */}
                          <div className="p-4 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl space-y-3 text-xs">
                            <span className="text-[11px] text-slate-400 font-semibold block">World Economic Forum posted this • 2w</span>
                            <div className="flex items-start gap-3">
                              <div className="w-16 h-16 rounded-xl bg-emerald-900 shrink-0 overflow-hidden flex items-center justify-center font-bold text-white text-xs">
                                Solar Rail
                              </div>
                              <p className="text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-3">
                                The world&apos;s first-ever &apos;solar railway&apos;, installed in <strong>#Switzerland</strong> last year, has been a success — and it could pave the way for trials in more countries. Next stop: South Korea.
                              </p>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/5 text-[11px] text-slate-500 font-medium">
                              <span>👍💡👏 4,365</span>
                              <span>78 comments • 512 reposts</span>
                            </div>
                          </div>

                          {/* Post 3: World Economic Forum */}
                          <div className="p-4 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl space-y-3 text-xs">
                            <span className="text-[11px] text-slate-400 font-semibold block">World Economic Forum posted this • 1w</span>
                            <div className="flex items-start gap-3">
                              <div className="w-16 h-16 rounded-xl bg-purple-900 shrink-0 overflow-hidden flex items-center justify-center font-bold text-white text-xs">
                                Leadership
                              </div>
                              <p className="text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-3">
                                Women make up half the global workforce, but hold only a third of corporate leadership roles. Iceland&apos;s former PM Katrín Jakobsdóttir argues this isn&apos;t just an equity issue — it&apos;s a missed opportunity for better decision-making.
                              </p>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/5 text-[11px] text-slate-500 font-medium">
                              <span>👍❤️👏 2,935</span>
                              <span>70 comments</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Tips to Stay Competitive (Exact Screenshot 4) */}
                      <div className="bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Tips to stay competitive</h3>

                        <div className="space-y-3">
                          {/* Tip 1: Grow your audience */}
                          <div className="p-4 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-between gap-4 text-xs">
                            <div className="space-y-1">
                              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Grow your audience</h4>
                              <p className="text-slate-500">Increase reach by inviting relevant prospects to follow your Page.</p>
                              <button
                                onClick={handleInviteConnections}
                                className="mt-2 px-4 py-1.5 border border-[#0a66c2] text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white font-bold text-xs rounded-full transition-all shadow-xs"
                              >
                                Invite to follow
                              </button>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-[#0a66c2] flex items-center justify-center shrink-0">
                              <Mail className="w-6 h-6" />
                            </div>
                          </div>

                          {/* Tip 2: Drive more engagement */}
                          <div className="p-4 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-between gap-4 text-xs">
                            <div className="space-y-1">
                              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Drive more engagement</h4>
                              <p className="text-slate-500">Posting at least 3x a week can help significantly increase engagement.</p>
                              <button
                                onClick={() => {
                                  setCreateType("post");
                                  setCreateModalOpen(true);
                                }}
                                className="mt-2 px-4 py-1.5 border border-[#0a66c2] text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white font-bold text-xs rounded-full transition-all shadow-xs"
                              >
                                Start a post
                              </button>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center shrink-0">
                              <Zap className="w-6 h-6" />
                            </div>
                          </div>

                          {/* Tip 3: Follow peer Pages */}
                          <div className="p-4 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-between gap-4 text-xs">
                            <div className="space-y-1">
                              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Follow peer Pages</h4>
                              <p className="text-slate-500">Get inspiration, join conversations, and get in front of more audiences.</p>
                              <button
                                onClick={() => setActiveAdminNav("feed")}
                                className="mt-2 px-4 py-1.5 border border-[#0a66c2] text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white font-bold text-xs rounded-full transition-all shadow-xs"
                              >
                                Find Pages to follow
                              </button>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 flex items-center justify-center shrink-0">
                              <Compass className="w-6 h-6" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ========================================================================= */}
                  {/* TAB 6: LEADS ANALYTICS (Exact Screenshot Implementation)                  */}
                  {/* ========================================================================= */}
                  {activeAnalyticsTab === "leads" && (
                    <div className="space-y-6">
                      
                      {/* Leads Header & Permission Notice */}
                      <div className="bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <div className="space-y-0.5">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">Download leads</h3>
                            <p className="text-xs text-slate-500">
                              Leads are available 1 year after submission. Not seeing lead data? Make sure you have the right permissions. <span className="text-[#0a66c2] cursor-pointer hover:underline">Learn more</span>
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setLeadsViewMode(leadsViewMode === "table" ? "empty" : "table")}
                              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-full transition-all"
                            >
                              {leadsViewMode === "table" ? "Preview Empty State" : "View Captured Leads"}
                            </button>
                            <button
                              onClick={() => {
                                alert("Exporting all captured inquiry leads as .CSV file...");
                              }}
                              className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs rounded-full transition-all shadow-sm flex items-center gap-1.5"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download All (.CSV)</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Leads Content View */}
                      {leadsViewMode === "table" && inboxInquiries.length > 0 ? (
                        <div className="bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Active Inbound Leads ({inboxInquiries.length})</h4>
                            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full">
                              Real-Time Synchronization Active
                            </span>
                          </div>

                          {/* Leads Table */}
                          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#122238]">
                            <table className="w-full text-left text-xs border-collapse">
                              <thead>
                                <tr className="bg-slate-100/70 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 font-bold">
                                  <th className="p-3">Lead Name</th>
                                  <th className="p-3">Organization</th>
                                  <th className="p-3">Email Address</th>
                                  <th className="p-3">Inquired Offering</th>
                                  <th className="p-3">Submission Date</th>
                                  <th className="p-3">Status</th>
                                  <th className="p-3 text-center">Action</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-700 dark:text-slate-300">
                                {inboxInquiries.map((lead) => (
                                  <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                                    <td className="p-3 font-bold text-slate-900 dark:text-white">{lead.senderName}</td>
                                    <td className="p-3 font-semibold">{lead.company}</td>
                                    <td className="p-3 font-mono text-slate-500">{lead.email}</td>
                                    <td className="p-3 font-semibold text-[#0a66c2]">{lead.service}</td>
                                    <td className="p-3 text-slate-400 text-[11px]">{lead.timestamp}</td>
                                    <td className="p-3">
                                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                        lead.status === "New" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                                      }`}>
                                        {lead.status}
                                      </span>
                                    </td>
                                    <td className="p-3 text-center">
                                      <button
                                        onClick={() => {
                                          setActiveAdminNav("inbox");
                                        }}
                                        className="text-[#0a66c2] hover:underline font-bold text-xs"
                                      >
                                        Reply in Inbox →
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) : (
                        /* Empty State (Exact Screenshot Implementation) */
                        <div className="bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center space-y-4">
                          {/* Custom SVG Illustration matching screenshot */}
                          <div className="w-48 h-36 mx-auto flex items-center justify-center">
                            <svg viewBox="0 0 200 150" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                              {/* Background wall & window */}
                              <rect x="100" y="20" width="80" height="90" rx="8" fill="#f8fafc" className="dark:fill-slate-800" />
                              <rect x="110" y="28" width="28" height="20" rx="3" fill="#38bdf8" fillOpacity="0.3" stroke="#0284c7" strokeWidth="1.5" />
                              <circle cx="120" cy="38" r="4" fill="#fbbf24" />
                              {/* Person at Desk */}
                              <circle cx="130" cy="58" r="8" fill="#1e293b" className="dark:fill-slate-200" />
                              <path d="M122 75 C122 66, 138 66, 138 75 L140 100 L120 100 Z" fill="#e11d48" />
                              {/* Desk & Computer Monitor */}
                              <rect x="145" y="55" width="22" height="16" rx="2" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5" />
                              <rect x="154" y="71" width="4" height="8" fill="#64748b" />
                              <rect x="148" y="79" width="16" height="3" rx="1.5" fill="#94a3b8" />
                              <rect x="115" y="82" width="60" height="4" rx="2" fill="#cbd5e1" className="dark:fill-slate-600" />
                              {/* Office Delivery Person with Cart */}
                              <circle cx="72" cy="52" r="7" fill="#b45309" />
                              <path d="M66 52 Q72 46 80 50 L84 53" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
                              <rect x="66" y="60" width="14" height="26" rx="4" fill="#3b82f6" />
                              <path d="M68 86 L64 110 M78 86 L82 110" stroke="#b45309" strokeWidth="4" strokeLinecap="round" />
                              {/* Mail & Packages Cart */}
                              <rect x="36" y="80" width="30" height="24" rx="3" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
                              <rect x="40" y="68" width="12" height="12" rx="2" fill="#d97706" />
                              <rect x="54" y="72" width="10" height="8" rx="1" fill="#38bdf8" />
                              <circle cx="42" cy="108" r="4" fill="#475569" />
                              <circle cx="60" cy="108" r="4" fill="#475569" />
                              <path d="M66 84 L72 74" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          </div>
                          <div className="space-y-1.5 max-w-md mx-auto">
                            <h4 className="text-xl font-black text-slate-900 dark:text-white">No leads yet</h4>
                            <p className="text-xs text-slate-500 leading-relaxed">
                              You can start collecting leads by boosting your posts with a goal to get more leads.
                            </p>
                          </div>
                          <button
                            onClick={() => setBoostablePostsModalOpen(true)}
                            className="px-5 py-2 bg-[#0a66c2] hover:bg-[#084e96] text-white font-bold text-xs rounded-full shadow-sm transition-all"
                          >
                            Boost a post for leads
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                )}
              </div>
            )}

            {/* ========================================================================= */}
            {/* 4. FEED TAB (Exact LinkedIn Premium Architecture from Screenshots)        */}
            {/* ========================================================================= */}
            {activeAdminNav === "feed" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                
                {/* ----------------------------------------------------------------------- */}
                {/* LEFT/CENTER 2 COLUMNS: MAIN FEED STREAM                                 */}
                {/* ----------------------------------------------------------------------- */}
                <div className="lg:col-span-2 space-y-4">
                  
                  {/* Feed Header Card (Exact Screenshot 1) */}
                  <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-xs">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Feed</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Join relevant conversations to build brand awareness
                    </p>
                  </div>

                  {/* Feed Post: Leadership First (Exact Screenshots 1 & 2) */}
                  <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-xs space-y-4">
                    
                    {/* Post Author Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center font-serif font-black text-blue-500 text-lg shadow-xs shrink-0">
                          lf
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white hover:text-[#0a66c2] hover:underline cursor-pointer">
                              Leadership First
                            </h3>
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium">6,346,196 followers</p>
                          <p className="text-[11px] text-slate-400 flex items-center gap-1">
                            <span>9h</span>
                            <span>•</span>
                            <span>🌐</span>
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => alert("Post options: Save post, Copy link, Embed post")}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg transition-all"
                        title="More options"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Post Content */}
                    <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                      What is the silent poison that destroys trust, shatters morale, and dismantles team unity faster than anything else? It is the bitter presence of double standards that reward favorites while penalizing everyone else. <span className="text-[#0a66c2] cursor-pointer font-semibold hover:underline">...more</span>
                    </p>

                    {/* Quote Graphic / Book Excerpt (Exact Visual from Screenshot 1) */}
                    <div className="relative rounded-2xl overflow-hidden border border-amber-200/60 dark:border-white/10 bg-[#faf7ee] dark:bg-[#182635] p-6 sm:p-8 shadow-inner">
                      <div className="max-w-md mx-auto text-center space-y-5 font-serif">
                        <div className="space-y-3">
                          <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                            In a toxic culture,
                          </p>
                          <div className="inline-block bg-amber-300/80 dark:bg-amber-500/30 px-3 py-1.5 rounded-lg">
                            <p className="text-base sm:text-xl font-black text-slate-950 dark:text-amber-200 tracking-tight">
                              there&apos;s one set of rules
                            </p>
                          </div>
                          <p className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200">
                            for the favorites and
                          </p>
                          <div className="inline-block bg-amber-300/80 dark:bg-amber-500/30 px-3 py-1.5 rounded-lg">
                            <p className="text-base sm:text-xl font-black text-slate-950 dark:text-amber-200 tracking-tight">
                              another for everyone else.
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-amber-300/40 dark:border-white/10 space-y-2">
                          <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                            In a healthy culture,
                          </p>
                          <p className="text-base sm:text-lg font-black text-slate-950 dark:text-emerald-300">
                            the same standards apply to everyone.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Engagement Stats Bar */}
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-b border-slate-100 dark:border-white/5 pb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="flex -space-x-1">
                          <span className="w-4 h-4 rounded-full bg-blue-500 text-white text-[9px] flex items-center justify-center font-bold">👍</span>
                          <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center font-bold">❤️</span>
                          <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] flex items-center justify-center font-bold">💡</span>
                        </span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {feedLikeCounts["conv-1"] || 1553}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span>{feedCommentsList.length + 65} comments</span>
                        <span>•</span>
                        <span>165 reposts</span>
                      </div>
                    </div>

                    {/* Action Bar (Exact Screenshot 2) */}
                    <div className="flex items-center justify-between gap-1 sm:gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                      {/* Identity Selector */}
                      <button
                        onClick={() => alert(`Currently commenting and engaging as: ${companyName}`)}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-[11px] font-bold text-slate-700 dark:text-slate-200"
                        title={`Comment as ${companyName}`}
                      >
                        <div className="w-4 h-4 rounded bg-blue-600 text-white text-[8px] flex items-center justify-center font-bold">
                          iG
                        </div>
                        <ChevronDown className="w-3 h-3 text-slate-400" />
                      </button>

                      <button
                        onClick={() => {
                          const isCurrentlyLiked = feedLikedPosts["conv-1"];
                          setFeedLikedPosts({ ...feedLikedPosts, "conv-1": !isCurrentlyLiked });
                          setFeedLikeCounts({
                            ...feedLikeCounts,
                            "conv-1": (feedLikeCounts["conv-1"] || 1553) + (isCurrentlyLiked ? -1 : 1)
                          });
                        }}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all ${
                          feedLikedPosts["conv-1"]
                            ? "text-[#0a66c2] bg-blue-50 dark:bg-blue-950/40 font-bold"
                            : "hover:bg-slate-100 dark:hover:bg-white/5"
                        }`}
                      >
                        <ThumbsUp className={`w-4 h-4 ${feedLikedPosts["conv-1"] ? "fill-[#0a66c2]" : ""}`} />
                        <span>Like</span>
                      </button>

                      <button
                        onClick={() => {
                          const el = document.getElementById("feed-comment-input");
                          if (el) el.focus();
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Comment</span>
                      </button>

                      <button
                        onClick={() => alert(`Post reposted successfully to ${companyName}'s page feed!`)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                      >
                        <Repeat className="w-4 h-4" />
                        <span>Repost</span>
                      </button>

                      <button
                        onClick={() => alert("Post link copied to clipboard!")}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-all hidden sm:flex"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Send</span>
                      </button>
                    </div>

                    {/* Interactive Comment Input (Exact Screenshot 2) */}
                    <div className="pt-2 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs shrink-0">
                        {companyName.charAt(0)}
                      </div>
                      <div className="flex-1 flex items-center gap-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-2 text-xs">
                        <input
                          id="feed-comment-input"
                          type="text"
                          value={feedCommentInput}
                          onChange={(e) => setFeedCommentInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && feedCommentInput.trim()) {
                              const newC = {
                                id: `comm-${Date.now()}`,
                                author: companyName,
                                badge: "Admin",
                                role: `${sector} Leader`,
                                time: "Just now",
                                likes: 0,
                                isLiked: false,
                                text: feedCommentInput.trim(),
                                replies: []
                              };
                              setFeedCommentsList([newC, ...feedCommentsList]);
                              setFeedCommentInput("");
                            }
                          }}
                          placeholder={`Comment as ${companyName}...`}
                          className="w-full bg-transparent outline-hidden text-slate-900 dark:text-white placeholder:text-slate-400 text-xs"
                        />
                        <button
                          onClick={() => setFeedCommentInput((prev) => prev + " 👏")}
                          className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
                          title="Add emoji"
                        >
                          <Smile className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => alert("Attach image to comment")}
                          className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
                          title="Add photo"
                        >
                          <ImageIcon className="w-4 h-4" />
                        </button>
                        {feedCommentInput.trim() && (
                          <button
                            onClick={() => {
                              const newC = {
                                id: `comm-${Date.now()}`,
                                author: companyName,
                                badge: "Admin",
                                role: `${sector} Leader`,
                                time: "Just now",
                                likes: 0,
                                isLiked: false,
                                text: feedCommentInput.trim(),
                                replies: []
                              };
                              setFeedCommentsList([newC, ...feedCommentsList]);
                              setFeedCommentInput("");
                            }}
                            className="px-3 py-1 bg-[#0a66c2] text-white font-bold text-xs rounded-full hover:bg-[#084e96]"
                          >
                            Post
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Comments Filter Sort (Exact Screenshot 2) */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/5 text-xs">
                      <div className="relative">
                        <button
                          onClick={() => setFeedSortDropdownOpen(!feedSortDropdownOpen)}
                          className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 hover:text-[#0a66c2]"
                        >
                          <span>{feedSortBy === "relevant" ? "Most relevant" : feedSortBy === "recent" ? "Most recent" : "All comments"}</span>
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>

                        {feedSortDropdownOpen && (
                          <div className="absolute left-0 mt-1.5 w-40 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl z-20 py-1 text-xs">
                            {[
                              { id: "relevant", label: "Most relevant" },
                              { id: "recent", label: "Most recent" },
                              { id: "all", label: "All comments" },
                            ].map((s) => (
                              <button
                                key={s.id}
                                onClick={() => {
                                  setFeedSortBy(s.id as any);
                                  setFeedSortDropdownOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-white/5 font-semibold ${
                                  feedSortBy === s.id ? "text-[#0a66c2] font-bold" : "text-slate-700 dark:text-slate-300"
                                }`}
                              >
                                {s.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Comments Thread (Exact Screenshot 2) */}
                    <div className="space-y-4 pt-1">
                      
                      {feedCommentsList.map((comm: any) => (
                        <div key={comm.id} className="space-y-3">
                          {/* Main Comment */}
                          <div className="flex items-start gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-amber-800 text-white font-bold flex items-center justify-center text-xs shrink-0">
                              {comm.author.charAt(0)}
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 text-xs space-y-1">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="flex items-center gap-1.5">
                                      <h4 className="font-bold text-slate-900 dark:text-white">{comm.author}</h4>
                                      {comm.badge && (
                                        <span className="text-[10px] text-slate-400 font-normal">• {comm.badge}</span>
                                      )}
                                    </div>
                                    <p className="text-[10px] text-slate-500 line-clamp-1">{comm.role}</p>
                                  </div>
                                  <span className="text-[10px] text-slate-400">{comm.time}</span>
                                </div>
                                <p className="text-slate-800 dark:text-slate-200 pt-1 leading-relaxed">
                                  {comm.text}
                                </p>
                              </div>

                              {/* Comment Actions */}
                              <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500 px-3">
                                <button
                                  onClick={() => {
                                    setFeedCommentsList(feedCommentsList.map((c: any) =>
                                      c.id === comm.id ? { ...c, isLiked: !c.isLiked, likes: c.likes + (c.isLiked ? -1 : 1) } : c
                                    ));
                                  }}
                                  className={`hover:underline flex items-center gap-1 ${comm.isLiked ? "text-[#0a66c2] font-bold" : ""}`}
                                >
                                  <span>Like</span>
                                  {comm.likes > 0 && <span>• 👍 {comm.likes}</span>}
                                </button>
                                <span>|</span>
                                <button
                                  onClick={() => {
                                    const replyText = prompt(`Reply to ${comm.author} as ${companyName}:`);
                                    if (replyText) {
                                      const newReply = {
                                        id: `rep-${Date.now()}`,
                                        author: companyName,
                                        verified: true,
                                        badge: "Admin",
                                        role: `${sector} Leader`,
                                        time: "Just now",
                                        likes: 0,
                                        isLiked: false,
                                        text: replyText,
                                      };
                                      setFeedCommentsList(feedCommentsList.map((c: any) =>
                                        c.id === comm.id ? { ...c, replies: [...(c.replies || []), newReply] } : c
                                      ));
                                    }
                                  }}
                                  className="hover:underline"
                                >
                                  Reply {comm.replies?.length ? `• ${comm.replies.length} ${comm.replies.length === 1 ? "reply" : "replies"}` : ""}
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Nested Threaded Replies (Exact Screenshot 2: Latoya Newland) */}
                          {comm.replies && comm.replies.length > 0 && (
                            <div className="pl-8 space-y-2.5 border-l-2 border-slate-200 dark:border-slate-800 ml-4">
                              {comm.replies.map((rep: any) => (
                                <div key={rep.id} className="flex items-start gap-2.5">
                                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-700 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                                    {rep.author.charAt(0)}
                                  </div>
                                  <div className="flex-1 space-y-1">
                                    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 text-xs space-y-1">
                                      <div className="flex items-center justify-between">
                                        <div>
                                          <div className="flex items-center gap-1">
                                            <h5 className="font-bold text-slate-900 dark:text-white">{rep.author}</h5>
                                            {rep.verified && <Check className="w-3 h-3 text-blue-500" />}
                                            <span className="text-[10px] text-slate-400 font-normal">• {rep.badge}</span>
                                          </div>
                                          <p className="text-[10px] text-slate-500 line-clamp-1">{rep.role}</p>
                                        </div>
                                        <span className="text-[10px] text-slate-400">{rep.time}</span>
                                      </div>
                                      <p className="text-slate-800 dark:text-slate-200 pt-1 leading-relaxed">
                                        {rep.text}
                                      </p>
                                    </div>

                                    <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500 px-3">
                                      <button className="hover:underline">Like</button>
                                      <span>|</span>
                                      <button className="hover:underline">Reply</button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ----------------------------------------------------------------------- */}
                {/* RIGHT COLUMN: WIDGETS (Exact Screenshot 1)                              */}
                {/* ----------------------------------------------------------------------- */}
                <div className="space-y-4">
                  
                  {/* Widget 1: Update who your page follows (Exact Screenshot 1) */}
                  <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-xs space-y-3">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Update who your page follows
                    </h3>
                    <button
                      onClick={() => setManageFollowingModalOpen(true)}
                      className="px-4 py-1.5 border border-slate-300 dark:border-white/20 hover:border-[#0a66c2] text-slate-700 dark:text-slate-200 hover:text-[#0a66c2] font-bold text-xs rounded-full transition-all shadow-xs"
                    >
                      Manage following
                    </button>
                  </div>

                  {/* Widget 2: Your Page's followers also follow (Exact Screenshot 1) */}
                  <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-xs space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Your Page&apos;s followers also follow
                    </h3>

                    <div className="space-y-4">
                      
                      {/* Company 1: Zepto (Exact Screenshot 1) */}
                      <div className="flex items-start justify-between gap-3 text-xs">
                        <div className="flex items-start gap-2.5">
                          <div className="w-10 h-10 rounded-full bg-[#5200ff] text-white font-bold flex items-center justify-center text-[10px] shrink-0 lowercase tracking-tighter">
                            zepto
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-white hover:text-[#0a66c2] hover:underline cursor-pointer">
                              Zepto
                            </h4>
                            <p className="text-[11px] text-slate-500 leading-tight">
                              Technology, Information and Internet • India
                            </p>
                            <p className="text-[10px] text-slate-400 mt-0.5">1,226,700 followers</p>
                            <button
                              onClick={() => {
                                setFollowedCompanies({ ...followedCompanies, zepto: !followedCompanies.zepto });
                              }}
                              className={`mt-2 px-3.5 py-1 border font-bold text-xs rounded-full transition-all flex items-center gap-1 ${
                                followedCompanies.zepto
                                  ? "border-emerald-600 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                                  : "border-slate-300 dark:border-white/20 hover:border-[#0a66c2] text-slate-700 dark:text-slate-200 hover:text-[#0a66c2]"
                              }`}
                            >
                              {followedCompanies.zepto ? (
                                <>
                                  <Check className="w-3 h-3" /> Following
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3 h-3" /> Follow
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Company 2: State Bank of India (Exact Screenshot 1) */}
                      <div className="flex items-start justify-between gap-3 text-xs pt-3 border-t border-slate-100 dark:border-white/5">
                        <div className="flex items-start gap-2.5">
                          <div className="w-10 h-10 rounded-full bg-[#002f6c] text-white font-bold flex items-center justify-center text-[9px] shrink-0 tracking-wider">
                            SBI
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-white hover:text-[#0a66c2] hover:underline cursor-pointer">
                              State Bank of India
                            </h4>
                            <p className="text-[11px] text-slate-500 leading-tight">
                              Banking • Mumbai, Maharashtra
                            </p>
                            <p className="text-[10px] text-slate-400 mt-0.5">4,290,774 followers</p>
                            <button
                              onClick={() => {
                                setFollowedCompanies({ ...followedCompanies, sbi: !followedCompanies.sbi });
                              }}
                              className={`mt-2 px-3.5 py-1 border font-bold text-xs rounded-full transition-all flex items-center gap-1 ${
                                followedCompanies.sbi
                                  ? "border-emerald-600 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                                  : "border-slate-300 dark:border-white/20 hover:border-[#0a66c2] text-slate-700 dark:text-slate-200 hover:text-[#0a66c2]"
                              }`}
                            >
                              {followedCompanies.sbi ? (
                                <>
                                  <Check className="w-3 h-3" /> Following
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3 h-3" /> Follow
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Company 3: Larsen & Toubro (Exact Screenshot 1) */}
                      <div className="flex items-start justify-between gap-3 text-xs pt-3 border-t border-slate-100 dark:border-white/5">
                        <div className="flex items-start gap-2.5">
                          <div className="w-10 h-10 rounded-full bg-[#0b3c7d] text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                            L&amp;T
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-white hover:text-[#0a66c2] hover:underline cursor-pointer">
                              Larsen &amp; Toubro
                            </h4>
                            <p className="text-[11px] text-slate-500 leading-tight">
                              Executive Offices • Mumbai, Maharashtra
                            </p>
                            <p className="text-[10px] text-slate-400 mt-0.5">5,259,169 followers</p>
                            <button
                              onClick={() => {
                                setFollowedCompanies({ ...followedCompanies, lt: !followedCompanies.lt });
                              }}
                              className={`mt-2 px-3.5 py-1 border font-bold text-xs rounded-full transition-all flex items-center gap-1 ${
                                followedCompanies.lt
                                  ? "border-emerald-600 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                                  : "border-slate-300 dark:border-white/20 hover:border-[#0a66c2] text-slate-700 dark:text-slate-200 hover:text-[#0a66c2]"
                              }`}
                            >
                              {followedCompanies.lt ? (
                                <>
                                  <Check className="w-3 h-3" /> Following
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3 h-3" /> Follow
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 5. ACTIVITY TAB (Exact LinkedIn Architecture from 5 Screenshots)          */}
            {/* ========================================================================= */}
            {activeAdminNav === "activity" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                
                {/* ----------------------------------------------------------------------- */}
                {/* LEFT/CENTER 2 COLUMNS: ACTIVITY STREAM & 6 SUB-TABS                    */}
                {/* ----------------------------------------------------------------------- */}
                <div className="lg:col-span-2 space-y-4">
                  
                  {/* Activity Header Card & Sub-Tabs Navigation (Exact Screenshot 1) */}
                  <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-xs space-y-4">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">Activity</h2>
                      <p className="text-xs text-slate-500 mt-0.5">Keep track of the activity around your page</p>
                    </div>

                    {/* 6 Sub-Tab Navigation Pills (Exact Screenshot 1) */}
                    <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 border-b border-slate-100 dark:border-white/5 scrollbar-none">
                      {[
                        { id: "all", label: "All" },
                        { id: "comments", label: "Comments" },
                        { id: "mentions", label: "Mentions" },
                        { id: "reactions", label: "Reactions" },
                        { id: "reposts", label: "Reposts" },
                        { id: "analytics", label: "Analytics" },
                      ].map((tab) => {
                        const isActive = activitySubTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActivitySubTab(tab.id as any)}
                            className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-lg transition-all relative shrink-0 ${
                              isActive
                                ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/30"
                                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5"
                            }`}
                          >
                            {tab.label}
                            {isActive && (
                              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-emerald-500 rounded-full" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* --------------------------------------------------------------------- */}
                  {/* SUB-TAB 1: ALL ACTIVITY (Exact Screenshot 1)                           */}
                  {/* --------------------------------------------------------------------- */}
                  {activitySubTab === "all" && (
                    <div className="space-y-3">
                      
                      {/* Item 1: Gulistan Zahid Reaction */}
                      <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-xs space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-800 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                              GZ
                            </div>
                            <div>
                              <p className="text-xs text-slate-700 dark:text-slate-300">
                                <strong>Gulistan Zahid</strong> and 1 other <span className="font-bold text-slate-900 dark:text-white">reacted to your company&apos;s update</span>
                              </p>
                              <span className="text-[10px] text-slate-400">1h</span>
                            </div>
                          </div>
                        </div>

                        {/* Post Card Attachment */}
                        <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center gap-3 text-xs">
                          <div className="w-12 h-12 rounded-lg bg-blue-950 text-white font-bold text-[9px] flex items-center justify-center p-1 shrink-0 text-center uppercase leading-none">
                            20-Year Leader
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 font-semibold line-clamp-2">
                            DON&apos;T JUST BUILD A BRAND. BUILD A 20-YEAR LEADERSHIP PRESENCE. What if your company could POWER ITS BRAND...
                          </p>
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium block">2 reactions</span>
                      </div>

                      {/* Item 2: Dr. Lalthan kimi Repost */}
                      <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-xs space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-red-600 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                              LK
                            </div>
                            <div>
                              <p className="text-xs text-slate-700 dark:text-slate-300">
                                <strong>Dr. Lalthan kimi (PhD)</strong> <span className="font-bold text-slate-900 dark:text-white">reposted your company&apos;s update</span>
                              </p>
                              <span className="text-[10px] text-slate-400">1h</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          &quot;A strong professional brand is built on more than visibility. It is built on demonstrated expertise, credible leadership, meaningful connection...&quot;
                        </p>

                        {/* Post Card Attachment */}
                        <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center gap-3 text-xs">
                          <div className="w-12 h-12 rounded-lg bg-blue-950 text-white font-bold text-[9px] flex items-center justify-center p-1 shrink-0 text-center uppercase leading-none">
                            Leadership
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 font-semibold line-clamp-2">
                            DON&apos;T JUST BUILD A BRAND. BUILD A 20-YEAR LEADERSHIP PRESENCE. What if your company could POWER ITS BRAND...
                          </p>
                        </div>
                      </div>

                      {/* Item 3: Vijendra Mudaliar Reaction */}
                      <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-xs space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-700 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                              VM
                            </div>
                            <div>
                              <p className="text-xs text-slate-700 dark:text-slate-300">
                                <strong>Vijendra Mudaliar R K</strong> and 19 others <span className="font-bold text-slate-900 dark:text-white">reacted to your company&apos;s update</span>
                              </p>
                              <span className="text-[10px] text-slate-400">2h</span>
                            </div>
                          </div>
                        </div>

                        {/* Post Card Attachment */}
                        <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center gap-3 text-xs">
                          <div className="w-12 h-12 rounded-lg bg-amber-900 text-white font-bold text-[9px] flex items-center justify-center p-1 shrink-0 text-center uppercase leading-none">
                            IGEN 2.0
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 font-semibold line-clamp-2">
                            🚀 IGEN 2.0 — THE LEADERSHIP TEAM BEHIND MEGA-SCALE EXECUTION From ICE 1.0 to IGEN 2.0 — the journey...
                          </p>
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium block">20 reactions</span>
                      </div>

                    </div>
                  )}

                  {/* --------------------------------------------------------------------- */}
                  {/* SUB-TAB 2: COMMENTS (Exact Screenshot 2)                               */}
                  {/* --------------------------------------------------------------------- */}
                  {activitySubTab === "comments" && (
                    <div className="space-y-3">
                      
                      {/* Comment 1: Vikash Chaturvedi */}
                      <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-xs space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold flex items-center justify-center text-xs shrink-0">
                            VC
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-slate-700 dark:text-slate-300">
                              <strong>Vikash Chaturvedi LSS MBB®, ICFAI- Sikkim, IIM-B .</strong> <span className="font-bold text-slate-900 dark:text-white">commented on your company&apos;s update</span>
                            </p>
                            <span className="text-[10px] text-slate-400">2d</span>
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-xs space-y-2.5">
                          <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                            Awesome as always , thanks for sharing. With u working is as big as making elephant dance. Happy to be part off this mega and maha...
                          </p>
                          <div className="p-2.5 bg-white dark:bg-[#122238] border border-slate-200 dark:border-slate-800 rounded-lg flex items-center gap-2.5 text-xs">
                            <div className="w-9 h-9 rounded bg-blue-900 text-white text-[8px] flex items-center justify-center font-bold shrink-0">
                              IGEN 2.0
                            </div>
                            <p className="text-[11px] text-slate-600 dark:text-slate-400 font-semibold truncate">
                              🚀 IGEN 2.0 — THE LEADERSHIP TEAM BEHIND MEGA-SCALE EXECUTION From ICE 1.0 to IGEN 2.0 — the journey...
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            const res = prompt(`Respond to Vikash Chaturvedi as ${companyName}:`);
                            if (res) alert("Response posted successfully!");
                          }}
                          className="px-4 py-1.5 border border-[#0a66c2] text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white font-bold text-xs rounded-full transition-all shadow-xs"
                        >
                          Respond
                        </button>
                      </div>

                      {/* Comment 2: Vikash Chaturvedi (Post 2) */}
                      <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-xs space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold flex items-center justify-center text-xs shrink-0">
                            VC
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-slate-700 dark:text-slate-300">
                              <strong>Vikash Chaturvedi LSS MBB®, ICFAI- Sikkim, IIM-B .</strong> <span className="font-bold text-slate-900 dark:text-white">commented on your company&apos;s update</span>
                            </p>
                            <span className="text-[10px] text-slate-400">1w</span>
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-xs space-y-2.5">
                          <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                            Awesome and Thanks for sharing.
                          </p>
                          <div className="p-2.5 bg-white dark:bg-[#122238] border border-slate-200 dark:border-slate-800 rounded-lg flex items-center gap-2.5 text-xs">
                            <div className="w-9 h-9 rounded bg-emerald-900 text-white text-[8px] flex items-center justify-center font-bold shrink-0">
                              MOVEMENT
                            </div>
                            <p className="text-[11px] text-slate-600 dark:text-slate-400 font-semibold truncate">
                              BE PART OF INDIA&apos;S MOST IMPACTFUL BUSINESS LEADERSHIP MOVEMENT What if your expertise could...
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => {
                              const res = prompt(`Respond to Vikash Chaturvedi as ${companyName}:`);
                              if (res) alert("Response posted successfully!");
                            }}
                            className="px-4 py-1.5 border border-[#0a66c2] text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white font-bold text-xs rounded-full transition-all shadow-xs"
                          >
                            Respond
                          </button>
                          <span className="text-[11px] text-slate-400 font-medium">37 reactions • 3 comments</span>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* --------------------------------------------------------------------- */}
                  {/* SUB-TAB 3: MENTIONS (Exact Screenshot 3)                              */}
                  {/* --------------------------------------------------------------------- */}
                  {activitySubTab === "mentions" && (
                    <div className="space-y-3">
                      
                      {/* Mention 1: Fitboard */}
                      <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-xs space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#0a66c2] font-bold flex items-center justify-center text-xs shrink-0 border border-blue-200 dark:border-blue-900">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-slate-700 dark:text-slate-300">
                              <strong>Fitboard</strong> <span className="font-bold text-slate-900 dark:text-white">mentioned your company in an update</span>
                            </p>
                            <span className="text-[10px] text-slate-400">2d</span>
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs">
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            8 New Software Engineer Jobs in India — just posted Check your match score BEFORE you apply: https://fitboard.in Infor— Softwar...
                          </p>
                        </div>

                        <button
                          onClick={() => alert(`Opening comment dialog on Fitboard's update as ${companyName}`)}
                          className="px-4 py-1.5 border border-[#0a66c2] text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white font-bold text-xs rounded-full transition-all shadow-xs"
                        >
                          Comment
                        </button>
                      </div>

                      {/* Mention 2: Dr. Lalthan kimi */}
                      <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-xs space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-600 to-purple-700 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                            LK
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-slate-700 dark:text-slate-300">
                              <strong>Dr. Lalthan kimi (PhD)</strong> <span className="font-bold text-slate-900 dark:text-white">mentioned your company in an update</span>
                            </p>
                            <span className="text-[10px] text-slate-400">1w</span>
                          </div>
                        </div>

                        <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center gap-3 text-xs">
                          <div className="w-12 h-12 rounded-lg bg-orange-950 text-white font-bold text-[9px] flex items-center justify-center p-1 shrink-0 text-center uppercase leading-none">
                            Viksit Bharat
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 font-semibold line-clamp-2">
                            What If Building Viksit Bharat Was Not Just About Witnessing India&apos;s Growth Story—But Contributing Directly...
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => alert(`Opening comment dialog on Dr. Lalthan kimi's post as ${companyName}`)}
                            className="px-4 py-1.5 border border-[#0a66c2] text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white font-bold text-xs rounded-full transition-all shadow-xs"
                          >
                            Comment
                          </button>
                          <span className="text-[11px] text-slate-400 font-medium">29 reactions • 3 comments</span>
                        </div>
                      </div>

                      {/* Mention 3: Ritu Anand */}
                      <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-xs space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-700 to-amber-900 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                            RA
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-slate-700 dark:text-slate-300">
                              <strong>Ritu Anand</strong> <span className="font-bold text-slate-900 dark:text-white">mentioned your company in an update</span>
                            </p>
                            <span className="text-[10px] text-slate-400">3w</span>
                          </div>
                        </div>

                        <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center gap-3 text-xs">
                          <div className="w-12 h-12 rounded-lg bg-slate-900 text-white font-bold text-[9px] flex items-center justify-center p-1 shrink-0 text-center uppercase leading-none">
                            Leadership
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 font-semibold line-clamp-2">
                            30 years of experience meeting the next generation of technology, sales, media and executive enterprise leaders...
                          </p>
                        </div>

                        <button
                          onClick={() => alert(`Opening comment dialog on Ritu Anand's post as ${companyName}`)}
                          className="px-4 py-1.5 border border-[#0a66c2] text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white font-bold text-xs rounded-full transition-all shadow-xs"
                        >
                          Comment
                        </button>
                      </div>

                    </div>
                  )}

                  {/* --------------------------------------------------------------------- */}
                  {/* SUB-TAB 4: REACTIONS (Exact Screenshot 4)                             */}
                  {/* --------------------------------------------------------------------- */}
                  {activitySubTab === "reactions" && (
                    <div className="space-y-3">
                      
                      {/* Reaction 1: Gulistan Zahid */}
                      <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-xs space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center text-xs shrink-0">
                            GZ
                          </div>
                          <div>
                            <p className="text-xs text-slate-700 dark:text-slate-300">
                              <strong>Gulistan Zahid</strong> and 1 other <span className="font-bold text-slate-900 dark:text-white">reacted to your company&apos;s update</span>
                            </p>
                            <span className="text-[10px] text-slate-400">1h</span>
                          </div>
                        </div>

                        <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center gap-3 text-xs">
                          <div className="w-12 h-12 rounded-lg bg-blue-950 text-white font-bold text-[9px] flex items-center justify-center p-1 shrink-0 text-center uppercase leading-none">
                            BRAND
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 font-semibold line-clamp-2">
                            DON&apos;T JUST BUILD A BRAND. BUILD A 20-YEAR LEADERSHIP PRESENCE. What if your company could POWER ITS BRAND...
                          </p>
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium block">2 reactions</span>
                      </div>

                      {/* Reaction 2: Vijendra Mudaliar */}
                      <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-xs space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs shrink-0">
                            VM
                          </div>
                          <div>
                            <p className="text-xs text-slate-700 dark:text-slate-300">
                              <strong>Vijendra Mudaliar R K</strong> and 19 others <span className="font-bold text-slate-900 dark:text-white">reacted to your company&apos;s update</span>
                            </p>
                            <span className="text-[10px] text-slate-400">2h</span>
                          </div>
                        </div>

                        <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center gap-3 text-xs">
                          <div className="w-12 h-12 rounded-lg bg-amber-900 text-white font-bold text-[9px] flex items-center justify-center p-1 shrink-0 text-center uppercase leading-none">
                            IGEN 2.0
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 font-semibold line-clamp-2">
                            🚀 IGEN 2.0 — THE LEADERSHIP TEAM BEHIND MEGA-SCALE EXECUTION From ICE 1.0 to IGEN 2.0 — the journey...
                          </p>
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium block">20 reactions</span>
                      </div>

                      {/* Reaction 3: IGEN Community */}
                      <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-xs space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                            iG
                          </div>
                          <div>
                            <p className="text-xs text-slate-700 dark:text-slate-300">
                              <strong>IGEN - India Global Expo News - www.igenworld.com</strong> and 2 others <span className="font-bold text-slate-900 dark:text-white">reacted to your company&apos;s update</span>
                            </p>
                            <span className="text-[10px] text-slate-400">1d</span>
                          </div>
                        </div>

                        <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center gap-3 text-xs">
                          <div className="w-12 h-12 rounded-lg bg-slate-900 text-white font-bold text-[9px] flex items-center justify-center p-1 shrink-0 text-center uppercase leading-none">
                            ECOSYSTEM
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 font-semibold line-clamp-2">
                            YOUR COMPANY DOESN&apos;T NEED ANOTHER EVENT. IT NEEDS THE RIGHT ECOSYSTEM. What if your company could grow with bilateral trade corridors...
                          </p>
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium block">3 reactions</span>
                      </div>

                    </div>
                  )}

                  {/* --------------------------------------------------------------------- */}
                  {/* SUB-TAB 5: REPOSTS (Exact Screenshot 5)                               */}
                  {/* --------------------------------------------------------------------- */}
                  {activitySubTab === "reposts" && (
                    <div className="space-y-3">
                      
                      {/* Repost 1: Dr. Lalthan kimi */}
                      <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-xs space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-pink-700 text-white font-bold flex items-center justify-center text-xs shrink-0">
                            LK
                          </div>
                          <div>
                            <p className="text-xs text-slate-700 dark:text-slate-300">
                              <strong>Dr. Lalthan kimi (PhD)</strong> <span className="font-bold text-slate-900 dark:text-white">reposted your company&apos;s update</span>
                            </p>
                            <span className="text-[10px] text-slate-400">1h</span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                          A strong professional brand is built on more than visibility. It is built on demonstrated expertise, credible leadership, meaningful...
                        </p>

                        <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center gap-3 text-xs">
                          <div className="w-12 h-12 rounded-lg bg-blue-950 text-white font-bold text-[9px] flex items-center justify-center p-1 shrink-0 text-center uppercase leading-none">
                            20-Year Leader
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 font-semibold line-clamp-2">
                            DON&apos;T JUST BUILD A BRAND. BUILD A 20-YEAR LEADERSHIP PRESENCE. What if your company could POWER ITS BRAND...
                          </p>
                        </div>
                      </div>

                      {/* Repost 2: Vijay Singh */}
                      <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-xs space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-amber-700 text-white font-bold flex items-center justify-center text-xs shrink-0">
                            VS
                          </div>
                          <div>
                            <p className="text-xs text-slate-700 dark:text-slate-300">
                              <strong>Vijay Singh</strong> <span className="font-bold text-slate-900 dark:text-white">reposted your company&apos;s update</span>
                            </p>
                            <span className="text-[10px] text-slate-400">4h</span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                          Welcome to VBW — VIKSIT BHARAT WORLD, the Mega Events Ecosystem PARTNER | SPONSOR | SPEAK | EXHIBIT | ATTEND |...
                        </p>

                        <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center gap-3 text-xs">
                          <div className="w-12 h-12 rounded-lg bg-blue-950 text-white font-bold text-[9px] flex items-center justify-center p-1 shrink-0 text-center uppercase leading-none">
                            BRAND
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 font-semibold line-clamp-2">
                            DON&apos;T JUST BUILD A BRAND. BUILD A 20-YEAR LEADERSHIP PRESENCE. What if your company could POWER ITS BRAND...
                          </p>
                        </div>
                      </div>

                      {/* Repost 3: ICE Global */}
                      <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-xs space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-xs shrink-0">
                            ICE
                          </div>
                          <div>
                            <p className="text-xs text-slate-700 dark:text-slate-300">
                              <strong>ICE Global eCommerce Technology Pvt. Ltd.</strong> <span className="font-bold text-slate-900 dark:text-white">reposted your company&apos;s update</span>
                            </p>
                            <span className="text-[10px] text-slate-400">13h</span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                          🌏 IGEN WORLD ECOSYSTEM FROM ICE 1.0 → IGEN 2.0 30+ YEARS OF LEGACY. NOW POWERED BY AI. India to the World....
                        </p>

                        <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center gap-3 text-xs">
                          <div className="w-12 h-12 rounded-lg bg-amber-900 text-white font-bold text-[9px] flex items-center justify-center p-1 shrink-0 text-center uppercase leading-none">
                            IGEN 2.0
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 font-semibold line-clamp-2">
                            🚀 IGEN 2.0 — THE LEADERSHIP TEAM BEHIND MEGA-SCALE EXECUTION From ICE 1.0 to IGEN 2.0...
                          </p>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* --------------------------------------------------------------------- */}
                  {/* SUB-TAB 6: ANALYTICS (Exact Screenshot from User)                     */}
                  {/* --------------------------------------------------------------------- */}
                  {activitySubTab === "analytics" && (
                    <div className="space-y-3">
                      
                      {/* Milestone 1: 95 new visitors (3d ago) */}
                      <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-xs space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-[#0a66c2] font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                              iGEN
                            </div>
                            <div>
                              <p className="text-xs text-slate-700 dark:text-slate-300">
                                <strong>{companyName}</strong> has <strong className="text-slate-900 dark:text-white">95 new visitors</strong>
                              </p>
                              <span className="text-[10px] text-slate-400">3d</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <button
                            onClick={() => {
                              setActiveAdminNav("analytics");
                              setActiveAnalyticsTab("visitors");
                            }}
                            className="px-4 py-1.5 border border-[#0a66c2] text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white font-bold text-xs rounded-full transition-all shadow-xs"
                          >
                            See visitor analytics
                          </button>
                        </div>
                      </div>

                      {/* Milestone 2: 117 new visitors (1w ago) */}
                      <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-xs space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-[#0a66c2] font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                              iGEN
                            </div>
                            <div>
                              <p className="text-xs text-slate-700 dark:text-slate-300">
                                <strong>{companyName}</strong> has <strong className="text-slate-900 dark:text-white">117 new visitors</strong>
                              </p>
                              <span className="text-[10px] text-slate-400">1w</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <button
                            onClick={() => {
                              setActiveAdminNav("analytics");
                              setActiveAnalyticsTab("visitors");
                            }}
                            className="px-4 py-1.5 border border-[#0a66c2] text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white font-bold text-xs rounded-full transition-all shadow-xs"
                          >
                            See visitor analytics
                          </button>
                        </div>
                      </div>

                      {/* Milestone 3: 198 new visitors (2w ago) */}
                      <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-xs space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-[#0a66c2] font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                              iGEN
                            </div>
                            <div>
                              <p className="text-xs text-slate-700 dark:text-slate-300">
                                <strong>{companyName}</strong> has <strong className="text-slate-900 dark:text-white">198 new visitors</strong>
                              </p>
                              <span className="text-[10px] text-slate-400">2w</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <button
                            onClick={() => {
                              setActiveAdminNav("analytics");
                              setActiveAnalyticsTab("visitors");
                            }}
                            className="px-4 py-1.5 border border-[#0a66c2] text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white font-bold text-xs rounded-full transition-all shadow-xs"
                          >
                            See visitor analytics
                          </button>
                        </div>
                      </div>

                    </div>
                  )}

                </div>

                {/* ----------------------------------------------------------------------- */}
                {/* RIGHT COLUMN: POST HIGHLIGHTS WIDGET (Exact Screenshots 1-5)            */}
                {/* ----------------------------------------------------------------------- */}
                <div className="space-y-4">
                  
                  {/* Post Highlights Card (Exact Screenshot 1) */}
                  <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Post highlights</h3>
                        <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
                      </div>
                      <span className="text-[11px] text-slate-400">In the last 30 days</span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Most engagement</span>
                      
                      {/* Top Post Card Preview */}
                      <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2.5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-slate-800 shrink-0 overflow-hidden flex items-center justify-center text-white font-bold text-[9px] uppercase leading-none text-center p-1">
                            Leadership Team
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                              🚀 IGEN 2.0 — THE LEADERSHIP TEAM BEHIND MEGA-SCALE...
                            </h4>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium">20 reactions • 1 comment</p>
                      </div>

                      {/* Not Eligible Notice */}
                      <div className="p-2.5 bg-slate-100/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                        <Info className="w-4 h-4 text-slate-500 shrink-0" />
                        <span>
                          Not eligible to boost. <span className="text-[#0a66c2] cursor-pointer hover:underline">Learn more</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Standard Navigation Footer Links */}
                  <div className="p-4 text-[11px] text-slate-400 space-y-2 text-center">
                    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                      <span className="hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">About</span>
                      <span className="hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">Accessibility</span>
                      <span className="hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">Help Center</span>
                      <span className="hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">Privacy &amp; Terms</span>
                      <span className="hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">Ad Choices</span>
                      <span className="hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">Advertising</span>
                      <span className="hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">Business Services</span>
                    </div>
                    <p className="pt-2 text-[10px] text-slate-500 font-medium">
                      <strong>iGEN</strong> Corporation © 2026
                    </p>
                  </div>

                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 6. INBOX TAB                                                             */}
            {/* ========================================================================= */}
            {activeAdminNav === "inbox" && (
              <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-6">
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white mb-0.5">
                    Inbound B2B Inquiries & Leads
                  </h2>
                  <p className="text-xs text-slate-500">Direct inquiries submitted by visitors via the public "Inquire Offerings" form.</p>
                </div>

                <div className="space-y-3">
                  {inboxInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white">{inq.senderName}</h4>
                          <span className="text-[10px] font-semibold text-slate-500">({inq.company})</span>
                          <span className="px-2 py-0.5 rounded bg-blue-50 text-[#0a66c2] text-[10px] font-bold">
                            {inq.service}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">{inq.timestamp}</span>
                      </div>

                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        "{inq.message}"
                      </p>

                      <div className="pt-2 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Contact: <strong>{inq.email}</strong></span>
                        <a
                          href={`mailto:${inq.email}?subject=Re: Inquiry for ${inq.service}`}
                          className="px-3 py-1 bg-[#0a66c2] text-white font-bold rounded-lg hover:bg-[#084e96]"
                        >
                          Reply to Inquiry
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 7. SERVICES TAB (Exact LinkedIn Premium Services Architecture)            */}
            {/* ========================================================================= */}
            {activeAdminNav === "services" && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                
                {/* ----------------------------------------------------------------------- */}
                {/* LEFT RAIL: SERVICES SUB-NAVIGATION (Exact Screenshots 1, 3, 4)          */}
                {/* ----------------------------------------------------------------------- */}
                <div className="lg:col-span-1 space-y-4">
                  <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-xs space-y-5">
                    
                    {/* Company Services Identity */}
                    <div className="space-y-3">
                      <div className="w-14 h-14 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-base border-2 border-slate-200 dark:border-white/10 shadow-xs">
                        iGEN
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                          {companyName}&apos;s Services
                        </h3>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-slate-100 dark:bg-white/10 text-[10px] font-semibold text-slate-600 dark:text-slate-300 rounded">
                          Admin view
                        </span>
                      </div>
                    </div>

                    {/* 3 Services Sub-Navigation Links */}
                    <nav className="space-y-1 pt-2 border-t border-slate-100 dark:border-white/5">
                      {[
                        { id: "service_page", label: "Service page", icon: FileText },
                        { id: "requests", label: "Requests", icon: Mail, badge: "6" },
                        { id: "client_projects", label: "Client projects", icon: Briefcase },
                      ].map((sub) => {
                        const Icon = sub.icon;
                        const isActive = servicesSubTab === sub.id;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => setServicesSubTab(sub.id as any)}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                              isActive
                                ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-l-4 border-emerald-500"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <Icon className="w-4 h-4" />
                              <span>{sub.label}</span>
                            </div>
                            {sub.badge && (
                              <span className="px-1.5 py-0.5 bg-amber-500 text-white text-[10px] font-black rounded-full">
                                {sub.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </nav>

                    {/* Support Link */}
                    <div className="pt-3 border-t border-slate-100 dark:border-white/5">
                      <a
                        href="#support"
                        onClick={(e) => {
                          e.preventDefault();
                          alert("iGEN Services Support: Get verified client leads and commercial RFP assistance.");
                        }}
                        className="text-xs font-semibold text-slate-500 hover:text-[#0a66c2] flex items-center gap-1"
                      >
                        Questions? <span className="underline">Learn more</span>
                      </a>
                    </div>
                  </div>

                  {/* Standard Navigation Footer Links */}
                  <div className="p-4 text-[11px] text-slate-400 space-y-2 text-center">
                    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                      <span className="hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">About</span>
                      <span className="hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">Accessibility</span>
                      <span className="hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">Help Center</span>
                      <span className="hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">Privacy &amp; Terms</span>
                      <span className="hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">Ad Choices</span>
                      <span className="hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">Advertising</span>
                      <span className="hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">Business Services</span>
                    </div>
                    <p className="pt-2 text-[10px] text-slate-500 font-medium">
                      <strong>iGEN</strong> Corporation © 2026
                    </p>
                  </div>
                </div>

                {/* ----------------------------------------------------------------------- */}
                {/* MAIN CONTENT: 3 SERVICES SUB-TABS                                       */}
                {/* ----------------------------------------------------------------------- */}
                <div className="lg:col-span-3 space-y-5">
                  
                  {/* ===================================================================== */}
                  {/* SUB-TAB 1: SERVICE PAGE (Exact Screenshots 1 & 2)                     */}
                  {/* ===================================================================== */}
                  {servicesSubTab === "service_page" && (
                    <div className="space-y-5">
                      
                      {/* Top Header Card (Exact Screenshot 1) */}
                      <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-xs space-y-4">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                          <div className="w-5 h-5 rounded bg-blue-900 text-white text-[8px] font-bold flex items-center justify-center">
                            iG
                          </div>
                          <span>{companyName}</span>
                        </div>

                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                          {companyName}&apos;s Services
                        </h2>

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => setEditServiceInfoModalOpen(true)}
                            className="px-4 py-2 bg-[#0a66c2] hover:bg-[#084e96] text-white font-bold text-xs rounded-full shadow-xs flex items-center gap-1.5 transition-all"
                          >
                            <Edit3 className="w-3.5 h-3.5" /> Edit page
                          </button>
                          <button
                            onClick={() => alert("Services options: Share service page, Copy public link, Deactivate services")}
                            className="px-4 py-2 border border-slate-300 dark:border-white/20 text-slate-700 dark:text-slate-200 hover:border-[#0a66c2] hover:text-[#0a66c2] font-bold text-xs rounded-full transition-all"
                          >
                            More
                          </button>
                        </div>
                      </div>

                      {/* Grow your services (Exact Screenshot 1) */}
                      <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-xs space-y-4">
                        <div>
                          <h3 className="text-base font-bold text-slate-900 dark:text-white">
                            Grow your services
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Add more details about your services to showcase your skills and attract more clients.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          
                          {/* Card 1: Add info to your page */}
                          <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-4 flex flex-col justify-between">
                            <div className="flex items-start gap-3">
                              <div className="w-12 h-10 rounded-lg bg-blue-900/30 border border-blue-400/40 p-1 flex flex-col justify-between shrink-0">
                                <div className="w-3 h-3 rounded-full bg-amber-400" />
                                <div className="space-y-0.5">
                                  <div className="w-full h-1 bg-blue-300 rounded" />
                                  <div className="w-2/3 h-1 bg-amber-400 rounded" />
                                </div>
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                                  Add info to your page
                                </h4>
                                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                                  Add 2-3 sentences to your About section highlighting your services and expertise.
                                </p>
                              </div>
                            </div>

                            <button
                              onClick={() => setEditServiceInfoModalOpen(true)}
                              className="w-fit px-4 py-1.5 border border-slate-300 dark:border-white/20 hover:border-[#0a66c2] text-slate-700 dark:text-slate-200 hover:text-[#0a66c2] font-bold text-xs rounded-full transition-all shadow-xs"
                            >
                              Add info
                            </button>
                          </div>

                          {/* Card 2: Upload work samples */}
                          <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-4 flex flex-col justify-between">
                            <div className="flex items-start gap-3">
                              <div className="w-12 h-10 rounded-lg bg-slate-800 border border-slate-700 p-1 flex items-center justify-center shrink-0">
                                <ImageIcon className="w-5 h-5 text-amber-300" />
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                                  Upload work samples
                                </h4>
                                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                                  Showcase your past work by including images, videos, and links on your Service Page.
                                </p>
                              </div>
                            </div>

                            <button
                              onClick={() => setUploadWorkSampleModalOpen(true)}
                              className="w-fit px-4 py-1.5 border border-slate-300 dark:border-white/20 hover:border-[#0a66c2] text-slate-700 dark:text-slate-200 hover:text-[#0a66c2] font-bold text-xs rounded-full transition-all shadow-xs"
                            >
                              Upload samples
                            </button>
                          </div>

                        </div>
                      </div>

                      {/* Overview Section (Exact Screenshot 2) */}
                      <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-xs space-y-5">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">Overview</h3>

                        <div className="space-y-4 text-xs">
                          {/* Availability */}
                          <div className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                            <div>
                              <span className="font-bold text-slate-900 dark:text-white block">Availability</span>
                              <span className="text-slate-500">{serviceAvailability}</span>
                            </div>
                          </div>

                          {/* Pricing */}
                          <div className="flex items-start gap-3">
                            <Layers className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                            <div>
                              <span className="font-bold text-slate-900 dark:text-white block">Pricing</span>
                              <span className="text-slate-500">{servicePricingType}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Services provided Section (Exact Screenshot 2) */}
                      <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-xs space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-bold text-slate-900 dark:text-white">Services provided</h3>
                          <button
                            onClick={() => {
                              const newS = prompt("Enter new commercial service title (e.g. B2B Trade Matchmaking):");
                              if (newS && !serviceTagsList.includes(newS)) {
                                setServiceTagsList([...serviceTagsList, newS]);
                              }
                            }}
                            className="text-xs font-bold text-[#0a66c2] hover:underline"
                          >
                            + Add service
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {serviceTagsList.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 rounded-lg hover:border-[#0a66c2] cursor-pointer transition-all"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Media Section (Exact Screenshot 2) */}
                      <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-xs space-y-4">
                        <div>
                          <h3 className="text-base font-bold text-slate-900 dark:text-white">Media</h3>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Add up to 8 media formats to showcase your company&apos;s work and experience.
                          </p>
                        </div>

                        <div className="pt-1">
                          <button
                            onClick={() => setUploadWorkSampleModalOpen(true)}
                            className="px-4 py-2 border border-slate-300 dark:border-white/20 hover:border-[#0a66c2] text-slate-700 dark:text-slate-200 hover:text-[#0a66c2] font-bold text-xs rounded-full transition-all shadow-xs flex items-center gap-1.5"
                          >
                            <Plus className="w-3.5 h-3.5" /> Add media
                          </button>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* ===================================================================== */}
                  {/* SUB-TAB 2: REQUESTS (Exact Screenshot 3)                              */}
                  {/* ===================================================================== */}
                  {servicesSubTab === "requests" && (
                    <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl shadow-xs overflow-hidden">
                      
                      {/* Requests Header */}
                      <div className="p-4 border-b border-slate-200 dark:border-white/10 flex items-center gap-1.5">
                        <h2 className="text-base font-bold text-slate-900 dark:text-white">Requests</h2>
                        <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-white/10 min-h-[500px]">
                        
                        {/* Left Requests Master List (Screenshot 3) */}
                        <div className="md:col-span-2 space-y-1 p-2">
                          <div className="px-3 py-2 text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                            <span>Premium requests</span>
                          </div>

                          <div className="space-y-1">
                            {serviceRequestsList.map((req) => {
                              const isSelected = selectedServiceRequestId === req.id;
                              return (
                                <div
                                  key={req.id}
                                  onClick={() => setSelectedServiceRequestId(req.id)}
                                  className={`p-3 rounded-xl cursor-pointer transition-all flex items-start gap-3 relative ${
                                    isSelected
                                      ? "bg-slate-100 dark:bg-[#182a45] text-slate-900 dark:text-white font-bold"
                                      : "hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300"
                                  }`}
                                >
                                  {isSelected && (
                                    <div className="absolute left-0 top-2 bottom-2 w-1 bg-emerald-500 rounded-r" />
                                  )}
                                  <div className={`w-9 h-9 rounded-full ${req.avatarBg} text-white font-bold flex items-center justify-center text-xs shrink-0`}>
                                    {req.avatar}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between">
                                      <h4 className="text-xs font-bold truncate">{req.clientName}</h4>
                                      <span className="text-[10px] text-slate-400 shrink-0">{req.time}</span>
                                    </div>
                                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{req.service}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Right Request Detail View (Screenshot 3) */}
                        <div className="md:col-span-3 p-6 space-y-6">
                          {(() => {
                            const curReq = serviceRequestsList.find((r) => r.id === selectedServiceRequestId) || serviceRequestsList[0];
                            return (
                              <div className="space-y-6">
                                
                                {/* Top Badge & Meta */}
                                <div className="space-y-3 border-b border-slate-100 dark:border-white/10 pb-4">
                                  <div className="flex items-center justify-between">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 font-black text-[10px] uppercase tracking-wider">
                                      ■ Premium
                                    </span>
                                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                                      <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                  </div>

                                  <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                      {curReq.service}
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                      {curReq.location} • {curReq.time}
                                    </p>
                                  </div>

                                  {/* Action Buttons */}
                                  <div className="flex items-center gap-2 pt-1">
                                    <button
                                      onClick={() => setSubmitProposalModalOpen(true)}
                                      className="px-5 py-2 bg-[#0a66c2] hover:bg-[#084e96] text-white font-bold text-xs rounded-full shadow-xs transition-all"
                                    >
                                      Submit proposal
                                    </button>
                                    <button
                                      onClick={() => {
                                        if (confirm(`Decline proposal request from ${curReq.clientName}?`)) {
                                          setServiceRequestsList(serviceRequestsList.filter((r) => r.id !== curReq.id));
                                        }
                                      }}
                                      className="px-5 py-2 border border-slate-300 dark:border-white/20 hover:border-slate-500 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-full transition-all"
                                    >
                                      No thanks
                                    </button>
                                  </div>
                                </div>

                                {/* Client Profile Card (Screenshot 3) */}
                                <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
                                  <div className="flex items-start gap-3">
                                    <div className={`w-12 h-12 rounded-full ${curReq.avatarBg} text-white font-bold flex items-center justify-center text-sm shrink-0 shadow-xs`}>
                                      {curReq.avatar}
                                    </div>
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-1">
                                        <h4 className="text-xs font-bold text-slate-900 dark:text-white hover:text-[#0a66c2] hover:underline cursor-pointer">
                                          {curReq.clientName}
                                        </h4>
                                        <span className="text-[10px] text-slate-400 font-normal">• {curReq.badge}</span>
                                      </div>
                                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {curReq.role}
                                      </p>
                                      <p className="text-[10px] text-slate-400 flex items-center gap-1 pt-0.5">
                                        <span>👥</span>
                                        <span>{curReq.connection}</span>
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Project Details Section (Screenshot 3) */}
                                <div className="space-y-4 text-xs">
                                  <h4 className="font-bold text-slate-900 dark:text-white uppercase text-[11px] tracking-wider text-slate-400">
                                    Project details
                                  </h4>

                                  <div className="space-y-1">
                                    <span className="font-bold text-slate-900 dark:text-white block">What channels?</span>
                                    <p className="text-slate-600 dark:text-slate-300">{curReq.channels}</p>
                                  </div>

                                  <div className="space-y-1">
                                    <span className="font-bold text-slate-900 dark:text-white block">What are the goals for your project?</span>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{curReq.goals}</p>
                                  </div>

                                  <div className="space-y-1">
                                    <span className="font-bold text-slate-900 dark:text-white block">Estimated Budget</span>
                                    <p className="text-emerald-600 dark:text-emerald-400 font-bold">{curReq.budget}</p>
                                  </div>
                                </div>

                              </div>
                            );
                          })()}
                        </div>

                      </div>
                    </div>
                  )}

                  {/* ===================================================================== */}
                  {/* SUB-TAB 3: CLIENT PROJECTS (Exact Screenshot 4)                       */}
                  {/* ===================================================================== */}
                  {servicesSubTab === "client_projects" && (
                    <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-xs space-y-6">
                      
                      <div className="flex items-center justify-between">
                        <h2 className="text-base font-bold text-slate-900 dark:text-white">Client projects</h2>
                      </div>

                      {/* Active Filter Pill (Screenshot 4) */}
                      <div>
                        <span className="px-3 py-1 bg-emerald-700 text-white font-bold text-xs rounded-full">
                          Active
                        </span>
                      </div>

                      {/* Zero-State Graphic & Copy (Exact Screenshot 4) */}
                      <div className="py-12 px-4 text-center max-w-md mx-auto space-y-5">
                        
                        {/* Vector Artwork of Person at Desk with Computer & Dog */}
                        <div className="w-48 h-36 mx-auto relative rounded-2xl bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center border border-slate-300 dark:border-white/10 shadow-inner">
                          <div className="text-center space-y-1">
                            <div className="w-16 h-10 mx-auto rounded bg-slate-900 dark:bg-slate-700 border border-blue-400 flex items-center justify-center shadow-xs">
                              <div className="w-10 h-6 bg-blue-500/20 rounded flex items-center justify-center text-[8px] text-blue-300 font-bold">
                                💻 CRM
                              </div>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-xs">
                              <span>👨‍💼</span>
                              <span className="text-[10px]">🐕</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <h3 className="text-base font-bold text-slate-900 dark:text-white">
                            Client projects will appear here.
                          </h3>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            After you submit a proposal you&apos;ll be able to find your projects here.
                          </p>
                        </div>

                        <div>
                          <a
                            href="#client-project-guide"
                            onClick={(e) => {
                              e.preventDefault();
                              alert("iGEN Client Project Manager: Milestone tracking, escrow disbursement, and deliverable review.");
                            }}
                            className="text-xs font-bold text-[#0a66c2] hover:underline"
                          >
                            Learn more
                          </a>
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 8. TEAM MEMBERS TAB (With Bundled Verified Leader Management)             */}
            {/* ========================================================================= */}
            {activeAdminNav === "team" && (
              <div className="space-y-6">
                
                {/* Bundled Executive Leaders Hub */}
                <div className="bg-gradient-to-r from-blue-50/70 via-white to-purple-50/50 dark:from-[#122238] dark:to-[#1a1c36] border border-blue-200/80 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#0a66c2] dark:text-blue-400" />
                        <h2 className="text-base font-bold text-slate-900 dark:text-white">
                          Bundled Verified Executive Leader Profiles
                        </h2>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                        Executive leaders bundled with your <strong>{isCorporate ? "Corporate" : isCompany ? "Company" : isStartup ? "Startup" : "Free"} Plan</strong> receive official verification checkmarks on their public cards and bylines.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        maxLeaderSeats > 0 
                          ? "bg-blue-100 text-[#0a66c2] dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200" 
                          : "bg-slate-100 text-slate-600 dark:bg-slate-800"
                      }`}>
                        {maxLeaderSeats > 0 ? `${maxLeaderSeats} of ${maxLeaderSeats} Bundled Seats Active` : "0 Bundled Seats (Free Tier)"}
                      </span>
                    </div>
                  </div>

                  {/* Bundled Leaders Cards */}
                  {maxLeaderSeats > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                      {teamMembers.slice(0, maxLeaderSeats).map((leader, idx) => (
                        <div
                          key={leader.id}
                          className="p-4 bg-white dark:bg-slate-900/80 border border-blue-200 dark:border-blue-900/40 rounded-xl shadow-2xs space-y-2 flex flex-col justify-between"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-xs shrink-0">
                                {leader.avatar || leader.name.charAt(0)}
                              </div>
                              <div>
                                <div className="flex items-center gap-1">
                                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{leader.name}</h4>
                                  <Check className="w-3.5 h-3.5 text-blue-600" />
                                </div>
                                <p className="text-[11px] text-[#0a66c2] font-semibold line-clamp-1">{leader.role}</p>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-slate-400">Seat #{idx + 1}</span>
                          </div>

                          <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[10px] text-slate-500">
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                              ✓ Verified Leader Badge
                            </span>
                            <span>{leader.dept}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex items-center justify-between gap-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">Unlock Bundled Executive Verification</h4>
                        <p className="text-[11px] text-slate-500">Startup Plan includes 1 Leader, Company Plan includes 2, Corporate Plan includes 5.</p>
                      </div>
                      <button
                        onClick={() => router.push(`/${locale}/profile/plans/company`)}
                        className="px-4 py-2 bg-[#0a66c2] text-white font-bold text-xs rounded-xl shadow-xs hover:bg-[#084e96] transition-all shrink-0"
                      >
                        Upgrade Plan
                      </button>
                    </div>
                  )}
                </div>

                {/* Team & People Directory */}
                <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-0.5">
                        All Associated Team Members ({teamMembers.length})
                      </h3>
                      <p className="text-xs text-slate-500">
                        Manage all employees and department leads shown on your public <strong>Team</strong> tab.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setCreateType("team");
                        setCreateModalOpen(true);
                      }}
                      className="px-4 py-2 bg-[#0a66c2] hover:bg-[#084e96] text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Team Member
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {teamMembers.map((mem, idx) => {
                      const isLeader = idx < maxLeaderSeats;
                      return (
                        <div
                          key={mem.id}
                          className="p-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-[#0a66c2] font-bold text-xs flex items-center justify-center">
                              {mem.avatar || mem.name.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{mem.name}</h4>
                                {isLeader && (
                                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold">
                                    <Check className="w-3 h-3 text-blue-600" />
                                    <span>Bundled Leader</span>
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500">{mem.role} · {mem.dept} · {mem.city}</p>
                            </div>
                          </div>

                          <button
                            onClick={() => setTeamMembers(teamMembers.filter((m) => m.id !== mem.id))}
                            className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* ========================================================================= */}
            {/* 9. OUR VISION & PROFILE TAB                                              */}
            {/* ========================================================================= */}
            {activeAdminNav === "vision" && (
              <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-5">
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white mb-0.5">
                    Our Vision & Company Profile Editor
                  </h2>
                  <p className="text-xs text-slate-500">Edit core company details shown in the Overview and Our Vision public tabs.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide mb-1">Company Name</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide mb-1">Industry Sector</label>
                    <input
                      type="text"
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-medium"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide mb-1">Tagline / Headline</label>
                    <input
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide mb-1">Workplace Policy</label>
                    <select
                      value={workplacePolicy}
                      onChange={(e) => setWorkplacePolicy(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-medium"
                    >
                      <option value="Onsite">Onsite</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide mb-1">Founded Year</label>
                    <input
                      type="text"
                      value={foundedYear}
                      onChange={(e) => setFoundedYear(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-medium"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide mb-1">Vision Narrative &amp; Overview</label>
                    <textarea
                      rows={4}
                      value={overview}
                      onChange={(e) => setOverview(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-medium leading-relaxed"
                    />
                  </div>
                </div>

                {/* ========================================================================= */}
                {/* STRATEGIC STAKEHOLDER PERSPECTIVES EDITOR (4 Lenses)                      */}
                {/* ========================================================================= */}
                <div className="pt-6 border-t border-slate-200 dark:border-white/10 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-[#0a66c2]" />
                        <span>Strategic Stakeholder Perspectives (4 Public Lenses)</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Customize what investors, talent, commercial partners, and media see in your public <strong>Our Vision</strong> tab.
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl overflow-x-auto border border-slate-200 dark:border-slate-800">
                      {[
                        { id: "capital", label: "📈 Capital & Growth" },
                        { id: "culture", label: "👥 Culture & Talent" },
                        { id: "partners", label: "🤝 Partners & Supply" },
                        { id: "brand", label: "📢 Brand & Media" },
                      ].map((lens) => (
                        <button
                          key={lens.id}
                          type="button"
                          onClick={() => setActiveVisionLensEdit(lens.id as any)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                            activeVisionLensEdit === lens.id
                              ? "bg-white dark:bg-[#122238] text-[#0a66c2] dark:text-blue-400 shadow-2xs"
                              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                          }`}
                        >
                          {lens.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Lens 1: Capital & Growth Editor */}
                  {activeVisionLensEdit === "capital" && (
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 animate-fadeIn">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Growth Stage</label>
                          <input
                            type="text"
                            value={growthStage}
                            onChange={(e) => setGrowthStage(e.target.value)}
                            placeholder="e.g., Profitable & Scaling · Positive Cash Flow"
                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">CapEx Allocation Focus</label>
                          <input
                            type="text"
                            value={capexAllocation}
                            onChange={(e) => setCapexAllocation(e.target.value)}
                            placeholder="e.g., Automation & R&D · Phase-2 Facility"
                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Target Export Corridors</label>
                          <input
                            type="text"
                            value={targetCorridors}
                            onChange={(e) => setTargetCorridors(e.target.value)}
                            placeholder="e.g., GCC & European Union · 25% Target"
                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Strategic Capital &amp; Infrastructure Roadmap</label>
                        <textarea
                          rows={3}
                          value={capitalRoadmap}
                          onChange={(e) => setCapitalRoadmap(e.target.value)}
                          placeholder="Describe your non-confidential facility expansion, robotics, and market entry roadmap..."
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white font-medium leading-relaxed"
                        />
                      </div>

                      <div className="p-3 bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 rounded-lg text-xs text-blue-900 dark:text-blue-300 flex items-center justify-between gap-3">
                        <span className="flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>Automatically powers the <strong>'Request Corporate Pitch Deck'</strong> gated lead generator on your public page.</span>
                        </span>
                        <span className="text-[10px] font-bold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full shrink-0">
                          Lead Inflow Ready
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Lens 2: Culture & Talent Editor */}
                  {activeVisionLensEdit === "culture" && (
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 animate-fadeIn">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Senior Talent Retention Metric</label>
                          <input
                            type="text"
                            value={talentRetention}
                            onChange={(e) => setTalentRetention(e.target.value)}
                            placeholder="e.g., 94% Senior Retention · Meritocracy & Equity"
                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Academic &amp; Research Partnerships</label>
                          <input
                            type="text"
                            value={academicPartnerships}
                            onChange={(e) => setAcademicPartnerships(e.target.value)}
                            placeholder="e.g., 5+ University Partners · R&D Fellowships"
                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Leadership Culture &amp; Talent Philosophy</label>
                        <textarea
                          rows={3}
                          value={culturePhilosophy}
                          onChange={(e) => setCulturePhilosophy(e.target.value)}
                          placeholder="Describe your executive leadership style, engineering values, and workplace environment..."
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white font-medium leading-relaxed"
                        />
                      </div>
                    </div>
                  )}

                  {/* Lens 3: Partners & Supply Chain Editor */}
                  {activeVisionLensEdit === "partners" && (
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 animate-fadeIn">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Vendor Accreditation</label>
                          <input
                            type="text"
                            value={vendorAccreditation}
                            onChange={(e) => setVendorAccreditation(e.target.value)}
                            placeholder="e.g., Tier-1 Approved Vendor for Major OEMs"
                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Supply Chain Sourcing Nodes</label>
                          <input
                            type="text"
                            value={supplyChainNodes}
                            onChange={(e) => setSupplyChainNodes(e.target.value)}
                            placeholder="e.g., 12 Multi-Sourced Hubs · Zero Bottlenecks"
                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Financial Standing &amp; Credit</label>
                          <input
                            type="text"
                            value={financialStanding}
                            onChange={(e) => setFinancialStanding(e.target.value)}
                            placeholder="e.g., Prime Working Capital · Strong Banking"
                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Institutional Reliability &amp; Procurement Standards</label>
                        <textarea
                          rows={3}
                          value={partnersNarrative}
                          onChange={(e) => setPartnersNarrative(e.target.value)}
                          placeholder="Describe your quality standards, supplier governance, and delivery reliability..."
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white font-medium leading-relaxed"
                        />
                      </div>
                    </div>
                  )}

                  {/* Lens 4: Brand & Media Editor */}
                  {activeVisionLensEdit === "brand" && (
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 animate-fadeIn">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Sector Authority Rank</label>
                          <input
                            type="text"
                            value={sectorAuthority}
                            onChange={(e) => setSectorAuthority(e.target.value)}
                            placeholder="e.g., Top 10 Verified in Sector"
                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Press Coverage &amp; Reports</label>
                          <input
                            type="text"
                            value={pressCoverage}
                            onChange={(e) => setPressCoverage(e.target.value)}
                            placeholder="e.g., National Media Features · Viksit Bharat 2047"
                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Media Kit &amp; Brand Inquiries</label>
                        <textarea
                          rows={3}
                          value={brandNarrative}
                          onChange={(e) => setBrandNarrative(e.target.value)}
                          placeholder="Provide details on where journalists and conference organizers can access logos, executive bios, and press assets..."
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white font-medium leading-relaxed"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex justify-end">
                  <button
                    onClick={handleSaveAll}
                    className="px-5 py-2 bg-[#0a66c2] hover:bg-[#084e96] text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" /> Save Profile
                  </button>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 10. SETTINGS TAB (Exact LinkedIn Architecture from Screenshot 1)          */}
            {/* ========================================================================= */}
            {activeAdminNav === "settings" && (
              <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl shadow-xs overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-white/10">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Settings</h2>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-white/5">
                  
                  {/* Setting 1: Manage admins */}
                  <div
                    onClick={() => setSettingsActiveModal("admins")}
                    className="p-5 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer flex items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">Manage admins</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Control who manages your page</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 shrink-0" />
                  </div>

                  {/* Setting 2: Manage restricted members */}
                  <div
                    onClick={() => setSettingsActiveModal("restricted")}
                    className="p-5 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer flex items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">Manage restricted members</h3>
                      <p className="text-xs text-slate-500 mt-0.5">See all the restricted members</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 shrink-0" />
                  </div>

                  {/* Setting 3: Manage following */}
                  <div
                    onClick={() => setSettingsActiveModal("following")}
                    className="p-5 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer flex items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">Manage following</h3>
                      <p className="text-xs text-slate-500 mt-0.5">See all the pages your page follows</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 shrink-0" />
                  </div>

                  {/* Setting 4: Inbox settings */}
                  <div
                    onClick={() => setSettingsActiveModal("inbox")}
                    className="p-5 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer flex items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">Inbox settings</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Choose whether members can message the page and select conversation topics</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 shrink-0" />
                  </div>

                  {/* Setting 5: Manage content sharing (NEW badge) */}
                  <div
                    onClick={() => setSettingsActiveModal("content_sharing")}
                    className="p-5 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Manage content sharing</h3>
                        <span className="px-2 py-0.5 bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-[10px] font-black rounded-sm uppercase tracking-wider">
                          NEW
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">Add your external content sources or make changes to your current sources</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 shrink-0" />
                  </div>

                  {/* Setting 6: Company Profile & Verification Status */}
                  <div
                    onClick={() => setSettingsActiveModal("visibility")}
                    className="p-5 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer flex items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">Profile visibility &amp; verified badges</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Manage search appearances, verified blue checkmark, and public directory indexing</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 shrink-0" />
                  </div>

                </div>
              </div>
            )}

          </div>
        </div>
      </div>
      )}

      {/* ========================================================================= */}
      {/* CREATE MODAL WORKSPACE (Screenshots 1, 2, 3, 4, 5)                         */}
      {/* ========================================================================= */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          
          {/* --------------------------------------------------------------------- */}
          {/* 1. SCREENSHOT 1: CREATE OPTIONS MENU                                  */}
          {/* --------------------------------------------------------------------- */}
          {createType === "menu" && (
            <div className="bg-[#1b2228] text-white border border-white/10 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden text-left">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-base font-bold text-white">Create</h3>
                <button
                  onClick={() => setCreateModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="divide-y divide-white/5 py-1">
                {/* 1. Start a post */}
                <div
                  onClick={() => setCreateType("post")}
                  className="p-4 hover:bg-white/5 transition-all cursor-pointer flex items-start gap-3.5 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/5 group-hover:bg-[#0a66c2]/20 flex items-center justify-center text-slate-300 group-hover:text-[#0a66c2] shrink-0 mt-0.5">
                    <Edit3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#0a66c2] transition-colors">
                      Start a post
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Share content to connect with your followers
                    </p>
                  </div>
                </div>

                {/* 2. Create an event */}
                <div
                  onClick={() => setCreateType("event")}
                  className="p-4 hover:bg-white/5 transition-all cursor-pointer flex items-start gap-3.5 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/5 group-hover:bg-emerald-500/20 flex items-center justify-center text-slate-300 group-hover:text-emerald-400 shrink-0 mt-0.5">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                      Create an event
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Host an event to grow your Page&apos;s community
                    </p>
                  </div>
                </div>


                {/* 4. Publish an article */}
                <div
                  onClick={() => setCreateType("article")}
                  className="p-4 hover:bg-white/5 transition-all cursor-pointer flex items-start gap-3.5 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/5 group-hover:bg-indigo-500/20 flex items-center justify-center text-slate-300 group-hover:text-indigo-400 shrink-0 mt-0.5">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                      Publish an article
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Connect with followers through long-form content
                    </p>
                  </div>
                </div>

                {/* 5. Create a newsletter */}
                <div
                  onClick={() => setCreateType("newsletter")}
                  className="p-4 hover:bg-white/5 transition-all cursor-pointer flex items-start gap-3.5 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/5 group-hover:bg-purple-500/20 flex items-center justify-center text-slate-300 group-hover:text-purple-400 shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">
                      Create a newsletter
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Publish articles about a specific topic to build a subscriber base
                    </p>
                  </div>
                </div>

                {/* 6. Create an Ad */}
                <div
                  onClick={() => setCreateType("ad")}
                  className="p-4 hover:bg-white/5 transition-all cursor-pointer flex items-start gap-3.5 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/5 group-hover:bg-yellow-500/20 flex items-center justify-center text-slate-300 group-hover:text-yellow-400 shrink-0 mt-0.5">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors">
                      Create an Ad
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Generate leads, drive website traffic, and build brand awareness
                    </p>
                  </div>
                </div>

                {/* 7. Add a product */}
                <div
                  onClick={() => setCreateType("product")}
                  className="p-4 hover:bg-white/5 transition-all cursor-pointer flex items-start gap-3.5 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/5 group-hover:bg-teal-500/20 flex items-center justify-center text-slate-300 group-hover:text-teal-400 shrink-0 mt-0.5">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-teal-400 transition-colors">
                      Add a product
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Spotlight your organization&apos;s products
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* 2. SCREENSHOT 2: START A POST MODAL                                   */}
          {/* --------------------------------------------------------------------- */}
          {createType === "post" && (
            <div className="bg-[#1b2228] text-white border border-white/10 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden text-left flex flex-col min-h-[420px]">
              
              {/* Header with Company Selector & Close */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-lg bg-white text-slate-900 font-black flex items-center justify-center text-xs overflow-hidden border border-white/20">
                    <span className="text-blue-900 font-extrabold text-sm">iGEN</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 cursor-pointer">
                      <h4 className="text-sm font-bold text-white max-w-[240px] truncate">
                        {companyName}
                      </h4>
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    </div>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      Post to Anyone
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setCreateModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Textarea body */}
              <div className="flex-1 p-5 flex flex-col justify-between">
                <textarea
                  rows={6}
                  placeholder="What do you want to talk about?"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="w-full bg-transparent text-white placeholder-slate-400 text-sm font-normal focus:outline-none resize-none leading-relaxed"
                />

                {/* Emoji trigger */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setNewPostContent((prev) => prev + " 🚀 ")}
                    className="text-slate-400 hover:text-amber-400 transition-colors p-1"
                  >
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Bottom Toolbar & Post Action */}
              <div className="p-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
                <div className="flex items-center gap-3 text-slate-400">
                  <button
                    type="button"
                    title="Add image / media"
                    onClick={() => {
                      const url = prompt("Enter Image URL or attachment link:");
                      if (url) {
                        setNewPostContent((prev) => prev + `\n[Image: ${url}]`);
                      }
                    }}
                    className="p-1.5 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
                  >
                    <ImageIcon className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    title="Create an event"
                    onClick={() => setCreateType("event")}
                    className="p-1.5 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
                  >
                    <Calendar className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    title="Celebrate an occasion"
                    onClick={() => setNewPostContent((prev) => prev + "\n🎉 Proud to announce our latest milestone!")}
                    className="p-1.5 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
                  >
                    <Award className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    title="Add document PDF"
                    onClick={() => {
                      const doc = prompt("Enter document name (e.g. Annual_Report_2026.pdf):");
                      if (doc) {
                        setNewPostType("documents");
                        setNewPostDocTitle(doc);
                        setNewPostContent((prev) => prev + `\nAttached Document: ${doc}`);
                      }
                    }}
                    className="p-1.5 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    title="Schedule post"
                    onClick={() => alert("Post scheduled for publishing at chosen date & time.")}
                    className="text-slate-400 hover:text-white p-1.5 rounded-lg transition-colors"
                  >
                    <Clock className="w-5 h-5" />
                  </button>

                  <button
                    disabled={!newPostContent.trim()}
                    onClick={() => {
                      if (!newPostTitle) {
                        setNewPostTitle(newPostContent.slice(0, 40) + "...");
                      }
                      handleAddPost();
                    }}
                    className={`px-5 py-2 font-bold text-xs rounded-full shadow-xs transition-all ${
                      newPostContent.trim()
                        ? "bg-[#0a66c2] hover:bg-[#084e96] text-white cursor-pointer"
                        : "bg-white/10 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    Post
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* 3. SCREENSHOTS 3, 4, 5: CREATE AN EVENT FORM                           */}
          {/* --------------------------------------------------------------------- */}
          {createType === "event" && (
            <div className="bg-[#1b2228] text-white border border-white/10 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden text-left flex flex-col max-h-[90vh]">
              
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCreateType("menu")}
                    className="text-slate-400 hover:text-white p-1 rounded-lg"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <h3 className="text-base font-bold text-white">Create an event</h3>
                </div>
                <button
                  onClick={() => setCreateModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Form Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                
                {/* 1. Upload Cover Image Banner */}
                <div className="w-full bg-black/80 border border-dashed border-white/20 rounded-xl py-9 px-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#0a66c2] transition-colors group">
                  <div className="w-14 h-11 bg-slate-800 group-hover:bg-[#0a66c2]/20 border border-white/10 rounded-lg flex items-center justify-center mb-2.5 transition-colors">
                    <ImageIcon className="w-6 h-6 text-slate-300 group-hover:text-[#0a66c2]" />
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#0a66c2] transition-colors">
                    Upload cover image
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Minimum width 480 pixels, 16:9 recommended
                  </p>
                </div>

                {/* 2. Event Type: Online / In person */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">Event type</label>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-white">
                      <input
                        type="radio"
                        name="eventType"
                        checked={eventType === "online"}
                        onChange={() => setEventType("online")}
                        className="accent-emerald-500 w-4 h-4"
                      />
                      <span>Online</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-white">
                      <input
                        type="radio"
                        name="eventType"
                        checked={eventType === "in_person"}
                        onChange={() => setEventType("in_person")}
                        className="accent-emerald-500 w-4 h-4"
                      />
                      <span>In person</span>
                    </label>
                  </div>
                </div>

                {/* 3. Event Format* */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Event format*</label>
                  <select
                    value={eventFormat}
                    onChange={(e) => setEventFormat(e.target.value)}
                    className="w-full bg-transparent border border-white/20 focus:border-[#0a66c2] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="iGEN Live Stream" className="bg-[#1b2228] text-white">iGEN Live Stream</option>
                    <option value="Audio event" className="bg-[#1b2228] text-white">Audio event / Panel discussion</option>
                    <option value="External event link" className="bg-[#1b2228] text-white">External event link (Zoom, Meet, Expo Portal)</option>
                  </select>
                </div>

                {/* Conditional External Link */}
                {eventFormat === "External event link" && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">External event link*</label>
                    <input
                      type="url"
                      placeholder="https://zoom.us/j/... or https://expo.igenworld.com/..."
                      value={eventExternalLink}
                      onChange={(e) => setEventExternalLink(e.target.value)}
                      className="w-full bg-transparent border border-white/20 focus:border-[#0a66c2] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                )}

                {/* 4. Event Name* */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-slate-300">Event name*</label>
                    <span className="text-[11px] text-slate-400">{eventName.length}/75</span>
                  </div>
                  <input
                    type="text"
                    maxLength={75}
                    placeholder="e.g. Global Industrial Robotics & Automation Summit 2026"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="w-full bg-transparent border border-white/20 focus:border-[#0a66c2] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>

                {/* 5. Timezone* */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Timezone*</label>
                  <select
                    value={eventTimezone}
                    onChange={(e) => setEventTimezone(e.target.value)}
                    className="w-full bg-transparent border border-white/20 focus:border-[#0a66c2] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi" className="bg-[#1b2228] text-white">
                      (UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi
                    </option>
                    <option value="(UTC+04:00) Abu Dhabi, Muscat, Dubai" className="bg-[#1b2228] text-white">
                      (UTC+04:00) Abu Dhabi, Muscat, Dubai
                    </option>
                    <option value="(UTC+00:00) London, Edinburgh, Dublin" className="bg-[#1b2228] text-white">
                      (UTC+00:00) London, Edinburgh, Dublin
                    </option>
                    <option value="(UTC-05:00) Eastern Time (US & Canada)" className="bg-[#1b2228] text-white">
                      (UTC-05:00) Eastern Time (US & Canada)
                    </option>
                    <option value="(UTC+08:00) Singapore, Beijing, Hong Kong" className="bg-[#1b2228] text-white">
                      (UTC+08:00) Singapore, Beijing, Hong Kong
                    </option>
                  </select>
                </div>

                {/* 6. Start Date* & Start Time* */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Start date*</label>
                    <input
                      type="date"
                      value={eventStartDate}
                      onChange={(e) => setEventStartDate(e.target.value)}
                      className="w-full bg-transparent border border-white/20 focus:border-[#0a66c2] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Start time*</label>
                    <div className="relative">
                      <input
                        type="time"
                        value={eventStartTime}
                        onChange={(e) => setEventStartTime(e.target.value)}
                        className="w-full bg-transparent border border-white/20 focus:border-[#0a66c2] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 7. Checkbox: Add end date and time */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-white">
                    <input
                      type="checkbox"
                      checked={eventHasEndDate}
                      onChange={(e) => setEventHasEndDate(e.target.checked)}
                      className="accent-emerald-500 w-4 h-4 rounded"
                    />
                    <span>Add end date and time</span>
                  </label>

                  {eventHasEndDate && (
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">End date</label>
                        <input
                          type="date"
                          value={eventEndDate}
                          onChange={(e) => setEventEndDate(e.target.value)}
                          className="w-full bg-transparent border border-white/20 focus:border-[#0a66c2] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">End time</label>
                        <input
                          type="time"
                          value={eventEndTime}
                          onChange={(e) => setEventEndTime(e.target.value)}
                          className="w-full bg-transparent border border-white/20 focus:border-[#0a66c2] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 8. Checkbox: Use an iGEN registration form */}
                <div className="space-y-1 pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs font-medium text-white">
                    <input
                      type="checkbox"
                      checked={eventUseRegForm}
                      onChange={(e) => setEventUseRegForm(e.target.checked)}
                      className="accent-emerald-500 w-4 h-4 rounded mt-0.5"
                    />
                    <div>
                      <span>Use an iGEN registration form</span>
                      <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                        Registration forms keep people updated on events and give you insights on interested viewers.{" "}
                        <span className="text-[#0a66c2] hover:underline cursor-pointer">Learn more</span>
                      </p>
                    </div>
                  </label>
                </div>

                {/* 9. Description */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-slate-300">Description</label>
                    <span className="text-[11px] text-slate-400">{eventDescription.length}/5,000</span>
                  </div>
                  <textarea
                    rows={4}
                    maxLength={5000}
                    placeholder="Ex: topics, schedule, key takeaways, who should attend..."
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    className="w-full bg-transparent border border-white/20 focus:border-[#0a66c2] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none resize-none"
                  />
                </div>

                {/* 10. Speakers */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Speakers</label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search connections or enter keynote speaker names..."
                      value={eventSpeakers}
                      onChange={(e) => setEventSpeakers(e.target.value)}
                      className="w-full bg-transparent border border-white/20 focus:border-[#0a66c2] rounded-xl pl-9 pr-3.5 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                    Add connections to speak at the event. Speakers can join the event early and will be shown in the event&apos;s Details section and presenter area. They cannot allow attendees to speak or end the event.
                  </p>
                </div>

              </div>

              {/* Bottom Sticky Action Footer */}
              <div className="p-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCreateType("menu")}
                  className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white"
                >
                  Back
                </button>

                <button
                  type="button"
                  disabled={!eventName.trim()}
                  onClick={() => {
                    const newEventPost = {
                      id: `post-${Date.now()}`,
                      title: `📅 Event: ${eventName}`,
                      content: `${eventDescription || "Join our upcoming corporate event!"}\n\n📍 Type: ${eventType === "online" ? "Online (" + eventFormat + ")" : "In person"}\n🕒 Start: ${eventStartDate} at ${eventStartTime}\n${eventHasEndDate ? "🏁 End: " + eventEndDate + " at " + eventEndTime : ""}\n🎙️ Speakers: ${eventSpeakers || "Nexus Leadership"}`,
                      date: "Just now",
                      views: 0,
                      likes: 0,
                      comments: 0,
                      type: "articles" as const,
                      metrics: { impressions: "1", ctr: "0.0%", shares: 0, clicks: 0, replies: 0 }
                    };
                    setPostsList([newEventPost, ...postsList]);
                    alert(`Success! Event "${eventName}" created and broadcasted to your company followers.`);
                    setEventName("");
                    setEventDescription("");
                    setCreateModalOpen(false);
                    setActiveAdminNav("page_posts");
                  }}
                  className={`px-6 py-2 font-bold text-xs rounded-full shadow-xs transition-all ${
                    eventName.trim()
                      ? "bg-[#0a66c2] hover:bg-[#084e96] text-white cursor-pointer"
                      : "bg-white/10 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  Create Event 🚀
                </button>
              </div>

            </div>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* 4. SCREENSHOT 1: PUBLISH AN ARTICLE (FULL CANVAS EDITOR)              */}
          {/* --------------------------------------------------------------------- */}
          {createType === "article" && (
            <div className="bg-[#1b2228] text-white border border-white/10 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden text-left flex flex-col max-h-[92vh]">
              
              {/* Top Sticky Navigation Bar (Matching Screenshot 1) */}
              <div className="p-3.5 border-b border-white/10 flex items-center justify-between flex-wrap gap-3 bg-[#171d22]">
                
                {/* Company Avatar & Identity Selector */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white text-blue-900 font-extrabold flex items-center justify-center text-xs overflow-hidden border border-white/20">
                    <span>iGEN</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 cursor-pointer">
                      <h4 className="text-xs font-bold text-white max-w-[160px] truncate">
                        {companyName}
                      </h4>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <span className="text-[10px] text-slate-400 block">Individual article</span>
                  </div>
                </div>

                {/* Rich Text Toolbar (Matching Screenshot 1) */}
                <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 rounded-xl px-2 py-1 text-xs">
                  <button
                    type="button"
                    className="flex items-center gap-1 px-2 py-1 hover:bg-white/10 rounded text-slate-300 hover:text-white font-semibold"
                  >
                    <span>Style</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>
                  <span className="text-white/20">|</span>
                  <button
                    type="button"
                    title="Bold"
                    onClick={() => setArticleBody((prev) => prev + " **bold** ")}
                    className="p-1 hover:bg-white/10 rounded text-slate-300 hover:text-white font-black"
                  >
                    B
                  </button>
                  <button
                    type="button"
                    title="Italic"
                    onClick={() => setArticleBody((prev) => prev + " *italic* ")}
                    className="p-1 hover:bg-white/10 rounded text-slate-300 hover:text-white italic font-serif"
                  >
                    I
                  </button>
                  <button
                    type="button"
                    title="Bullet list"
                    onClick={() => setArticleBody((prev) => prev + "\n- Item 1\n- Item 2\n")}
                    className="p-1 hover:bg-white/10 rounded text-slate-300 hover:text-white"
                  >
                    •—
                  </button>
                  <button
                    type="button"
                    title="Numbered list"
                    onClick={() => setArticleBody((prev) => prev + "\n1. Step 1\n2. Step 2\n")}
                    className="p-1 hover:bg-white/10 rounded text-slate-300 hover:text-white font-mono text-[11px]"
                  >
                    123
                  </button>
                  <button
                    type="button"
                    title="Quote"
                    onClick={() => setArticleBody((prev) => prev + '\n> "Quote text goes here"\n')}
                    className="p-1 hover:bg-white/10 rounded text-slate-300 hover:text-white font-serif text-sm leading-none"
                  >
                    &ldquo;&rdquo;
                  </button>
                  <button
                    type="button"
                    title="Code snippet"
                    onClick={() => setArticleBody((prev) => prev + "\n```javascript\n// Code goes here\n```\n")}
                    className="p-1 hover:bg-white/10 rounded text-slate-300 hover:text-white font-mono text-xs"
                  >
                    {`{}`}
                  </button>
                  <button
                    type="button"
                    title="Divider line"
                    onClick={() => setArticleBody((prev) => prev + "\n---\n")}
                    className="p-1 hover:bg-white/10 rounded text-slate-300 hover:text-white"
                  >
                    —
                  </button>
                  <button
                    type="button"
                    title="Add link"
                    onClick={() => {
                      const link = prompt("Enter URL to embed:");
                      if (link) setArticleBody((prev) => prev + ` [Link](${link}) `);
                    }}
                    className="p-1 hover:bg-white/10 rounded text-slate-300 hover:text-white"
                  >
                    🔗
                  </button>
                  <button
                    type="button"
                    title="Embed code / widget"
                    onClick={() => setArticleBody((prev) => prev + "\n<iframe ... />\n")}
                    className="p-1 hover:bg-white/10 rounded text-slate-300 hover:text-white font-mono text-xs"
                  >
                    &lt;/&gt;
                  </button>
                  <button
                    type="button"
                    title="Insert image"
                    onClick={() => {
                      const img = prompt("Enter Image URL:");
                      if (img) setArticleBody((prev) => prev + `\n![Article Image](${img})\n`);
                    }}
                    className="p-1 hover:bg-white/10 rounded text-slate-300 hover:text-white"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Right Action Buttons: Manage ▾ and Next → */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => alert("Manage settings: Article URL slug, Canonical tags, SEO meta descriptions.")}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold rounded-full flex items-center gap-1 border border-white/10"
                  >
                    <span>Manage</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>

                  <button
                    type="button"
                    disabled={!articleTitle.trim()}
                    onClick={() => {
                      const newArticlePost = {
                        id: `post-${Date.now()}`,
                        title: articleTitle,
                        content: articleBody || "Read the full long-form article published on iGEN News.",
                        date: "Just now",
                        views: 0,
                        likes: 0,
                        comments: 0,
                        type: "articles" as const,
                        metrics: { impressions: "1", ctr: "0.0%", shares: 0, clicks: 0, replies: 0 }
                      };
                      setPostsList([newArticlePost, ...postsList]);
                      alert(`Success! Long-form article "${articleTitle}" published.`);
                      setArticleTitle("");
                      setArticleBody("");
                      setCreateModalOpen(false);
                      setActiveAdminNav("page_posts");
                    }}
                    className={`px-5 py-1.5 text-xs font-bold rounded-full transition-all flex items-center gap-1 ${
                      articleTitle.trim()
                        ? "bg-[#0a66c2] hover:bg-[#084e96] text-white cursor-pointer shadow-xs"
                        : "bg-white/10 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setCreateModalOpen(false)}
                    className="text-slate-400 hover:text-white p-1 rounded-lg ml-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

              </div>

              {/* Scrollable Article Canvas Body */}
              <div className="flex-1 overflow-y-auto p-8 max-w-3xl mx-auto w-full space-y-6">
                
                {/* Cover Image / Video Dropzone */}
                <div className="w-full bg-black/50 border border-dashed border-white/20 rounded-2xl py-12 px-6 flex flex-col items-center justify-center text-center hover:border-[#0a66c2] transition-all group cursor-pointer">
                  <div className="w-14 h-11 bg-slate-800 group-hover:bg-[#0a66c2]/20 border border-white/10 rounded-lg flex items-center justify-center mb-3">
                    <ImageIcon className="w-6 h-6 text-slate-400 group-hover:text-[#0a66c2]" />
                  </div>
                  <p className="text-xs text-slate-300 font-medium mb-3">
                    Add a cover image or video to your article.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      const url = prompt("Enter Cover Image URL or upload link:");
                      if (url) setArticleCover(url);
                    }}
                    className="px-4 py-2 border border-slate-400 hover:border-white text-white text-xs font-bold rounded-full flex items-center gap-2 hover:bg-white/5 transition-all"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload from computer</span>
                  </button>
                  {articleCover && (
                    <span className="text-[11px] text-emerald-400 font-mono mt-2 truncate max-w-sm">
                      Cover linked: {articleCover}
                    </span>
                  )}
                </div>

                {/* Title Input */}
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Title"
                    value={articleTitle}
                    onChange={(e) => setArticleTitle(e.target.value)}
                    className="w-full bg-transparent text-white placeholder-slate-500 text-3xl font-extrabold focus:outline-none tracking-tight"
                  />
                </div>

                {/* Body Textarea with formatting placeholder */}
                <div className="space-y-2 min-h-[260px]">
                  <textarea
                    rows={12}
                    placeholder="Write here. You can also include @mentions."
                    value={articleBody}
                    onChange={(e) => setArticleBody(e.target.value)}
                    className="w-full bg-transparent text-white placeholder-slate-500 text-base font-normal focus:outline-none resize-none leading-relaxed"
                  />
                </div>

              </div>

              {/* Bottom Right Draft Status */}
              <div className="p-3 border-t border-white/10 bg-[#171d22] flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => setCreateType("menu")}
                  className="text-slate-400 hover:text-white font-bold"
                >
                  ← Back to options
                </button>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold">Draft auto-saved</span>
                </div>
              </div>

            </div>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* 5. SCREENSHOT 2: CREATE A NEWSLETTER MODAL                            */}
          {/* --------------------------------------------------------------------- */}
          {createType === "newsletter" && (
            <div className="bg-[#1b2228] text-white border border-white/10 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden text-left flex flex-col max-h-[88vh]">
              
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCreateType("menu")}
                    className="text-slate-400 hover:text-white p-1 rounded-lg"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <h3 className="text-base font-bold text-white">Create a newsletter</h3>
                </div>
                <button
                  onClick={() => setCreateModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Form Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
                
                {/* Intro Callout (Exact text from Screenshot 2) */}
                <p className="text-slate-300 leading-relaxed text-xs">
                  Newsletters on iGEN allow you to share your perspective regularly by publishing articles at the cadence you choose. Your subscribers will receive a push notification and email after each new edition of your page newsletter. Limit 5 newsletters per page.{" "}
                  <span className="text-[#0a66c2] hover:underline cursor-pointer font-semibold">Learn More</span>
                </p>

                {/* Section: Newsletter details */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider text-slate-400">
                    Newsletter details
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-slate-300 font-semibold">Newsletter title*</label>
                      <input
                        type="text"
                        placeholder="Add a title to your newsletter"
                        value={newsletterTitle}
                        onChange={(e) => setNewsletterTitle(e.target.value)}
                        className="w-full bg-transparent border border-white/20 focus:border-[#0a66c2] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-300 font-semibold">How often do you want to publish?*</label>
                      <select
                        value={newsletterCadence}
                        onChange={(e) => setNewsletterCadence(e.target.value)}
                        className="w-full bg-transparent border border-white/20 focus:border-[#0a66c2] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      >
                        <option value="Weekly" className="bg-[#1b2228] text-white">Weekly</option>
                        <option value="Biweekly" className="bg-[#1b2228] text-white">Biweekly</option>
                        <option value="Monthly" className="bg-[#1b2228] text-white">Monthly</option>
                        <option value="Daily" className="bg-[#1b2228] text-white">Daily</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Newsletter description*</label>
                    <input
                      type="text"
                      placeholder="Add a description to your newsletter"
                      value={newsletterDesc}
                      onChange={(e) => setNewsletterDesc(e.target.value)}
                      className="w-full bg-transparent border border-white/20 focus:border-[#0a66c2] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                    />
                    <p className="text-[11px] text-slate-400">
                      This description appears alongside your newsletter title
                    </p>
                  </div>

                  {/* Logo Upload Box (Exact from Screenshot 2) */}
                  <div className="p-4 bg-white/[0.02] border border-white/10 rounded-xl flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-slate-400" />
                    </div>
                    <div className="space-y-1.5 min-w-0">
                      <h5 className="text-xs font-bold text-white">
                        Add an image or logo for your newsletter to increase engagement.
                      </h5>
                      <p className="text-[11px] text-slate-400">
                        The recommended image size is 300x300 pixels.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          const logo = prompt("Enter Newsletter Logo / Icon URL:");
                          if (logo) setNewsletterLogo(logo);
                        }}
                        className="px-3 py-1 border border-slate-400 hover:border-white text-white text-xs font-bold rounded-full hover:bg-white/5 transition-all"
                      >
                        Upload image
                      </button>
                    </div>
                  </div>
                </div>

                {/* Subscriber Announcement Callout (Exact from Screenshot 2) */}
                <div className="p-4 bg-slate-900/80 border border-white/10 rounded-xl flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-[#0a66c2] flex items-center justify-center shrink-0 mt-0.5">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">
                      Your page followers will be invited to subscribe
                    </h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                      We&apos;ll notify your page&apos;s network when you publish the first edition of your newsletter and invite new followers to subscribe.
                    </p>
                  </div>
                </div>

              </div>

              {/* Bottom Actions */}
              <div className="p-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 border border-slate-500 text-slate-300 hover:text-white rounded-full font-bold text-xs"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={!newsletterTitle.trim()}
                  onClick={() => {
                    const newNewsletterPost = {
                      id: `post-${Date.now()}`,
                      title: `📰 Newsletter: ${newsletterTitle}`,
                      content: `We just launched our official company newsletter: "${newsletterTitle}"!\n\nCadence: ${newsletterCadence}\nAbout: ${newsletterDesc || "Exclusive sector insights and supply chain innovations."}\n\nSubscribe now to receive real-time editions directly to your inbox.`,
                      date: "Just now",
                      views: 0,
                      likes: 0,
                      comments: 0,
                      type: "articles" as const,
                      metrics: { impressions: "1", ctr: "0.0%", shares: 0, clicks: 0, replies: 0 }
                    };
                    setPostsList([newNewsletterPost, ...postsList]);
                    alert(`Success! Newsletter "${newsletterTitle}" created and broadcasted to your followers.`);
                    setNewsletterTitle("");
                    setNewsletterDesc("");
                    setCreateModalOpen(false);
                    setActiveAdminNav("page_posts");
                  }}
                  className={`px-6 py-2 font-bold text-xs rounded-full shadow-xs transition-all ${
                    newsletterTitle.trim()
                      ? "bg-[#0a66c2] hover:bg-[#084e96] text-white cursor-pointer"
                      : "bg-white/10 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  Done
                </button>
              </div>

            </div>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* 6. EXECUTIVE SOLUTION: CREATE AN AD CAMPAIGN BUILDER                  */}
          {/* --------------------------------------------------------------------- */}
          {createType === "ad" && (
            <div className="bg-[#1b2228] text-white border border-white/10 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden text-left flex flex-col max-h-[88vh]">
              
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCreateType("menu")}
                    className="text-slate-400 hover:text-white p-1 rounded-lg"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <h3 className="text-base font-bold text-white">Create an Ad Campaign</h3>
                </div>
                <button
                  onClick={() => setCreateModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
                
                {/* 1. Campaign Objective */}
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold block">1. Select Advertising Objective</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "leads", label: "🎯 Lead Generation", desc: "Collect qualified inquiries via instant lead forms" },
                      { id: "traffic", label: "🌐 Website Visits", desc: "Drive high-intent buyers to your landing page" },
                      { id: "brand", label: "📈 Brand Awareness", desc: "Maximize impressions across CXO decision makers" },
                      { id: "events", label: "📅 Event Attendance", desc: "Boost registrations for your summits & webinars" },
                    ].map((obj) => (
                      <div
                        key={obj.id}
                        onClick={() => setAdObjective(obj.id as any)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          adObjective === obj.id
                            ? "bg-[#0a66c2]/20 border-[#0a66c2] text-white"
                            : "bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/30"
                        }`}
                      >
                        <h5 className="font-bold text-xs text-white">{obj.label}</h5>
                        <p className="text-[10px] text-slate-400 mt-1 leading-snug">{obj.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Ad Copy & Creative */}
                <div className="space-y-2.5 pt-1">
                  <label className="text-slate-300 font-bold block">2. Ad Creative & Headline</label>
                  <div className="space-y-1">
                    <label className="text-slate-400 font-medium">Ad Headline*</label>
                    <input
                      type="text"
                      value={adHeadline}
                      onChange={(e) => setAdHeadline(e.target.value)}
                      className="w-full bg-transparent border border-white/20 focus:border-[#0a66c2] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-medium">Primary Copy Text*</label>
                    <textarea
                      rows={3}
                      value={adBodyText}
                      onChange={(e) => setAdBodyText(e.target.value)}
                      className="w-full bg-transparent border border-white/20 focus:border-[#0a66c2] rounded-xl px-3 py-2 text-xs text-white focus:outline-none resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-400 font-medium">Call-to-Action (CTA)</label>
                      <select
                        value={adCta}
                        onChange={(e) => setAdCta(e.target.value)}
                        className="w-full bg-transparent border border-white/20 focus:border-[#0a66c2] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      >
                        <option value="Contact Sales" className="bg-[#1b2228] text-white">Contact Sales</option>
                        <option value="Request Quote" className="bg-[#1b2228] text-white">Request Quote</option>
                        <option value="Learn More" className="bg-[#1b2228] text-white">Learn More</option>
                        <option value="Download Brochure" className="bg-[#1b2228] text-white">Download Brochure</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-400 font-medium">Daily Budget (₹)</label>
                      <input
                        type="number"
                        value={adDailyBudget}
                        onChange={(e) => setAdDailyBudget(Number(e.target.value))}
                        className="w-full bg-transparent border border-white/20 focus:border-[#0a66c2] rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Performance Forecast Widget */}
                <div className="p-3.5 bg-gradient-to-r from-blue-950/40 to-indigo-950/40 border border-blue-500/30 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider block">Estimated 7-Day Reach</span>
                    <h4 className="text-sm font-bold text-white">24,500 - 65,000 Impressions</h4>
                    <p className="text-[11px] text-emerald-400 font-medium">~720 to 1,480 targeted CXO clicks</p>
                  </div>
                  <span className="px-3 py-1.5 bg-blue-500 text-white font-mono font-bold text-xs rounded-lg shadow-xs">
                    ₹{(adDailyBudget * adDurationDays).toLocaleString("en-IN")} Total
                  </span>
                </div>

              </div>

              {/* Bottom Actions */}
              <div className="p-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCreateType("menu")}
                  className="px-4 py-2 border border-slate-500 text-slate-300 hover:text-white rounded-full font-bold text-xs"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={() => {
                    alert(`Success! Ad campaign "${adHeadline}" created and submitted for review.`);
                    setCreateModalOpen(false);
                  }}
                  className="px-6 py-2 bg-[#0a66c2] hover:bg-[#084e96] text-white font-bold text-xs rounded-full shadow-xs cursor-pointer"
                >
                  Launch Campaign 🚀
                </button>
              </div>

            </div>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* 7. EXECUTIVE SOLUTION: ADD A PRODUCT / SOLUTION SHOWCASE              */}
          {/* --------------------------------------------------------------------- */}
          {createType === "product" && (
            <div className="bg-[#1b2228] text-white border border-white/10 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden text-left flex flex-col max-h-[88vh]">
              
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCreateType("menu")}
                    className="text-slate-400 hover:text-white p-1 rounded-lg"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <h3 className="text-base font-bold text-white">Spotlight a Product</h3>
                </div>
                <button
                  onClick={() => setCreateModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-3.5 text-xs">
                
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Product Name*</label>
                  <input
                    type="text"
                    placeholder="e.g. Nexus Autonomous Mobile Robot AMR-500"
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    className="w-full bg-transparent border border-white/20 focus:border-[#0a66c2] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Category*</label>
                    <select
                      value={prodCategory}
                      onChange={(e) => setProdCategory(e.target.value)}
                      className="w-full bg-transparent border border-white/20 focus:border-[#0a66c2] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    >
                      <option value="Industrial Robotics" className="bg-[#1b2228] text-white">Industrial Robotics</option>
                      <option value="AI Vision Systems" className="bg-[#1b2228] text-white">AI Vision Systems</option>
                      <option value="Sorting Conveyors" className="bg-[#1b2228] text-white">Sorting Conveyors</option>
                      <option value="Enterprise Automation Software" className="bg-[#1b2228] text-white">Enterprise Automation Software</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Pricing Model</label>
                    <input
                      type="text"
                      placeholder="e.g. Contact for pricing"
                      value={prodPricing}
                      onChange={(e) => setProdPricing(e.target.value)}
                      className="w-full bg-transparent border border-white/20 focus:border-[#0a66c2] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Product Tagline*</label>
                  <input
                    type="text"
                    placeholder="e.g. 500kg payload autonomous warehouse robot with LiDAR SLAM"
                    value={prodTagline}
                    onChange={(e) => setProdTagline(e.target.value)}
                    className="w-full bg-transparent border border-white/20 focus:border-[#0a66c2] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Overview & Technical Specifications</label>
                  <textarea
                    rows={4}
                    placeholder="Detail the key capabilities, throughput rate, payload capacity, and ERP integration APIs..."
                    value={prodDesc}
                    onChange={(e) => setProdDesc(e.target.value)}
                    className="w-full bg-transparent border border-white/20 focus:border-[#0a66c2] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Call to Action (CTA Button)</label>
                  <select
                    value={prodCta}
                    onChange={(e) => setProdCta(e.target.value)}
                    className="w-full bg-transparent border border-white/20 focus:border-[#0a66c2] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="Request Demo" className="bg-[#1b2228] text-white">Request Demo</option>
                    <option value="Download Spec Sheet" className="bg-[#1b2228] text-white">Download Spec Sheet</option>
                    <option value="Contact Commercial Sales" className="bg-[#1b2228] text-white">Contact Commercial Sales</option>
                  </select>
                </div>

              </div>

              {/* Bottom Actions */}
              <div className="p-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCreateType("menu")}
                  className="px-4 py-2 border border-slate-500 text-slate-300 hover:text-white rounded-full font-bold text-xs"
                >
                  Back
                </button>

                <button
                  type="button"
                  disabled={!prodName.trim()}
                  onClick={() => {
                    const newOffering = {
                      id: `s-${Date.now()}`,
                      name: prodName,
                      desc: prodTagline || prodDesc || "High-performance enterprise solution.",
                      category: prodCategory
                    };
                    setServicesList([...servicesList, newOffering]);
                    alert(`Success! Product "${prodName}" added to your company showcase.`);
                    setProdName("");
                    setProdTagline("");
                    setProdDesc("");
                    setCreateModalOpen(false);
                    setActiveAdminNav("services");
                  }}
                  className={`px-6 py-2 font-bold text-xs rounded-full shadow-xs transition-all ${
                    prodName.trim()
                      ? "bg-[#0a66c2] hover:bg-[#084e96] text-white cursor-pointer"
                      : "bg-white/10 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  Add Product ✨
                </button>
              </div>

            </div>
          )}



        </div>
      )}

      {/* ========================================================================= */}
      {/* VISITOR PAGE FILTER MODAL (Exact Screenshot 3 & 4)                        */}
      {/* ========================================================================= */}
      {visitorPageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#1b2730] text-white border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white">Page type</h3>
              <button
                onClick={() => setVisitorPageModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Radio Options with Emerald Ring */}
            <div className="space-y-4">
              {[
                { id: "all", label: "All pages" },
                { id: "overview", label: "Overview (Home)" },
                { id: "vision", label: "Our Vision (About)" },
                { id: "insights", label: "Updates & Insights (Insights)" },
                { id: "offerings", label: "Offerings (Services)" },
                { id: "team", label: "Team (People)" },
              ].map((opt) => {
                const isSelected = visitorTempPageFilter === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setVisitorTempPageFilter(opt.id as any)}
                    className="w-full flex items-center gap-3.5 text-left text-sm font-semibold hover:text-emerald-400 transition-all"
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all ${
                      isSelected ? "border-emerald-400 bg-emerald-500/20" : "border-slate-500"
                    }`}>
                      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />}
                    </div>
                    <span className={isSelected ? "text-white font-bold" : "text-slate-300"}>
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Footer Actions: Reset and Show results */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                onClick={() => setVisitorTempPageFilter("all")}
                className="text-xs font-bold text-slate-400 hover:text-white"
              >
                Reset
              </button>
              <button
                onClick={() => {
                  setVisitorPageFilter(visitorTempPageFilter);
                  setVisitorPageModalOpen(false);
                }}
                className="px-5 py-2 bg-[#70b5f9] hover:bg-[#5aa3ea] text-slate-950 font-bold text-xs rounded-full shadow-md transition-all"
              >
                Show results
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* EXPORT ANALYTICS MODAL                                                    */}
      {/* ========================================================================= */}
      {exportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-5 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-[#0a66c2]" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Export Analytics Report</h3>
              </div>
              <button
                onClick={() => setExportModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-600 dark:text-slate-300">
                Export engagement, visitor metrics, and audience demographics for <strong>{analyticsDateRange}</strong>.
              </p>

              <div className="space-y-2 pt-1">
                <span className="font-bold text-slate-900 dark:text-white block">Select Export Format</span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setExportFormat("xls")}
                    className={`p-3 rounded-xl border text-left font-bold transition-all ${
                      exportFormat === "xls"
                        ? "border-[#0a66c2] bg-blue-50 text-[#0a66c2] dark:bg-blue-950/40"
                        : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    .XLS (Excel)
                    <span className="block text-[10px] font-normal text-slate-500 mt-0.5">Full multi-tab workbook</span>
                  </button>
                  <button
                    onClick={() => setExportFormat("csv")}
                    className={`p-3 rounded-xl border text-left font-bold transition-all ${
                      exportFormat === "csv"
                        ? "border-[#0a66c2] bg-blue-50 text-[#0a66c2] dark:bg-blue-950/40"
                        : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    .CSV (Data Stream)
                    <span className="block text-[10px] font-normal text-slate-500 mt-0.5">Raw table data</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-white/10">
              <button
                onClick={() => setExportModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Downloading ${exportFormat.toUpperCase()} report for ${analyticsDateRange}...`);
                  setExportModalOpen(false);
                }}
                className="px-5 py-2 bg-[#0a66c2] hover:bg-[#084e96] text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Report</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SHOW ALL VISITORS ROSTER MODAL                                            */}
      {/* ========================================================================= */}
      {showAllVisitorsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-6 max-w-2xl w-full shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto text-left">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-500 border border-amber-500/30">
                  Premium
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">All Recent Page Visitors (Last 30 Days)</h3>
              </div>
              <button
                onClick={() => setShowAllVisitorsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { name: "Nisha Junaid Khan", headline: "VP Corporate Relations, Strategic Alliances Leader in BFSI", loc: "Mumbai", ind: "Investment Banking", time: "2 days ago" },
                { name: "Dinesh Dusane", headline: "Strategy & Corporate Planning Leader | M&A ($Bn+) & Growth", loc: "Mumbai", ind: "Energy & Infrastructure", time: "3 days ago" },
                { name: "Sushil Kumar Soni", headline: "Full Stack Developer | Cloud & DevOps Lead", loc: "Bengaluru", ind: "IT Services", time: "4 days ago" },
                { name: "Meera Krishnaswamy", headline: "Procurement Director | Global Supply Logistics", loc: "Hyderabad", ind: "Supply Chain", time: "5 days ago" },
                { name: "Farhan Al Hashimi", headline: "Head of Industrial Portfolios & Asset Management", loc: "Dubai, UAE", ind: "Industrial Real Estate", time: "6 days ago" },
              ].map((v, i) => (
                <div key={i} className="p-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between text-xs gap-3">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{v.name}</h4>
                    <p className="text-slate-600 dark:text-slate-400">{v.headline}</p>
                    <p className="text-[11px] text-slate-400">{v.loc} · Works in <strong>{v.ind}</strong></p>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 shrink-0">{v.time}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex justify-end">
              <button
                onClick={() => setShowAllVisitorsModalOpen(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 font-bold text-xs text-slate-700 dark:text-slate-300 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CUSTOM CALENDAR MODAL                                                     */}
      {/* ========================================================================= */}
      {calendarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Custom Analytics Horizon</h3>
              <button
                onClick={() => setCalendarModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Start Date</label>
                <input
                  type="date"
                  defaultValue="2026-08-04"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">End Date</label>
                <input
                  type="date"
                  defaultValue="2026-09-02"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-white/10">
              <button
                onClick={() => setCalendarModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setAnalyticsDateRange("Aug 4, 2026 - Sep 2, 2026");
                  setCalendarModalOpen(false);
                }}
                className="px-5 py-2 bg-[#0a66c2] text-white font-bold text-xs rounded-xl"
              >
                Apply Range
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SHOW ALL FOLLOWERS DIRECTORY MODAL                                        */}
      {/* ========================================================================= */}
      {showAllFollowersModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-6 max-w-2xl w-full shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto text-left">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#0a66c2]" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">All Followers Directory ({followersCount})</h3>
              </div>
              <button
                onClick={() => setShowAllFollowersModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sub-pills: People vs Pages */}
            <div className="flex items-center gap-2 text-xs font-bold">
              <button
                onClick={() => setFollowerRosterTab("people")}
                className={`px-4 py-1.5 rounded-full transition-all ${
                  followerRosterTab === "people"
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300"
                }`}
              >
                People (5,113)
              </button>
              <button
                onClick={() => setFollowerRosterTab("pages")}
                className={`px-4 py-1.5 rounded-full transition-all ${
                  followerRosterTab === "pages"
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300"
                }`}
              >
                Pages (57)
              </button>
            </div>

            <div className="space-y-3">
              {[
                { name: "Sekhar Maaram", role: "Senior Software Engineer | Backend & Full-Stack Engineer | MongoDB", date: "Sep 2026" },
                { name: "Khadhiri Abdul Subhan", role: "Senior Full Stack Developer | React.js | Node.js | Microservices", date: "Sep 2026" },
                { name: "Poorna Pushkala, ICF-PCC, PMP®", role: "CEO | Board Director | Transformation Leader | Rural ESG", date: "Sep 2026" },
                { name: "Dr. Satyajit Das", role: "Senior IT Leader & AI Generalist | Independent Director", date: "Sep 2026" },
                { name: "Parag Gulati", role: "Head of Presales - Data Strategy | Gen-AI | Enterprise Architecture", date: "Sep 2026" },
                { name: "Aarav Nambiar", role: "Robotics Hardware Architect | Autonomous Systems", date: "Aug 2026" },
                { name: "Divya Ramesh", role: "Director of Supply Chain & Global Sourcing", date: "Aug 2026" },
              ].map((f, i) => (
                <div key={i} className="p-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between text-xs gap-3">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{f.name}</h4>
                    <p className="text-slate-600 dark:text-slate-400">{f.role}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 shrink-0">Followed {f.date}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex justify-end">
              <button
                onClick={() => setShowAllFollowersModalOpen(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 font-bold text-xs text-slate-700 dark:text-slate-300 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BOOSTABLE POSTS CAMPAIGN MODAL (Search Appearances Banner Trigger)        */}
      {/* ========================================================================= */}
      {boostablePostsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Boost Top Posts &amp; Grow Reach</h3>
              </div>
              <button
                onClick={() => setBoostablePostsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Promote your high-engagement whitepapers and leadership articles to increase search discovery across GCC and Indian industrial corridors.
            </p>

            <div className="space-y-3">
              {postsList.slice(0, 2).map((post) => (
                <div key={post.id} className="p-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between gap-3 text-xs">
                  <div className="min-w-0">
                    <h4 className="font-bold text-slate-900 dark:text-white truncate">{post.title}</h4>
                    <p className="text-[11px] text-slate-500">{post.metrics?.organicImpressions || 58} organic impressions · {post.likes} reactions</p>
                  </div>
                  <button
                    onClick={() => {
                      alert(`Initiating Sponsored Boost Campaign for: ${post.title}`);
                      setBoostablePostsModalOpen(false);
                    }}
                    className="px-3.5 py-1.5 bg-[#0a66c2] hover:bg-[#084e96] text-white font-bold text-xs rounded-xl shadow-xs shrink-0"
                  >
                    Boost Post
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-white/10">
              <button
                onClick={() => setBoostablePostsModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* EDIT COMPETITORS MODAL (Competitors Tab Action Trigger)                   */}
      {/* ========================================================================= */}
      {editCompetitorsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-left max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#0a66c2]" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Edit Monitored Competitors</h3>
              </div>
              <button
                onClick={() => setEditCompetitorsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Benchmark your growth against key industry rivals and peer organizations ({trackedCompetitors.length} / {isCorporate ? "25" : isCompany ? "10" : isStartup ? "3" : "1"} tracked).
            </p>

            {/* Add Competitor Input */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search and add company or institution..."
                  value={newCompetitorInput}
                  onChange={(e) => setNewCompetitorInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newCompetitorInput.trim()) {
                      const newComp = {
                        id: `c_${Date.now()}`,
                        name: newCompetitorInput.trim(),
                        followers: "120,400",
                        newFollowers: "2.1K",
                        newFollowersPct: "+4.2%",
                        posts: "45",
                        postsPct: "+1.2%",
                        comments: "150",
                        commentsPct: "+3.0%",
                        dailyComments: "5",
                        dailyCommentsPct: "+3.0%",
                        reactions: "12.4K",
                        reactionsPct: "+8.1%",
                        logoBg: "bg-indigo-700",
                        logoText: newCompetitorInput.trim().slice(0, 3).toUpperCase(),
                      };
                      setTrackedCompetitors((prev) => [...prev, newComp]);
                      setNewCompetitorInput("");
                    }
                  }}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-[#0a66c2]"
                />
              </div>
              <button
                onClick={() => {
                  if (newCompetitorInput.trim()) {
                    const newComp = {
                      id: `c_${Date.now()}`,
                      name: newCompetitorInput.trim(),
                      followers: "120,400",
                      newFollowers: "2.1K",
                      newFollowersPct: "+4.2%",
                      posts: "45",
                      postsPct: "+1.2%",
                      comments: "150",
                      commentsPct: "+3.0%",
                      dailyComments: "5",
                      dailyCommentsPct: "+3.0%",
                      reactions: "12.4K",
                      reactionsPct: "+8.1%",
                      logoBg: "bg-indigo-700",
                      logoText: newCompetitorInput.trim().slice(0, 3).toUpperCase(),
                    };
                    setTrackedCompetitors((prev) => [...prev, newComp]);
                    setNewCompetitorInput("");
                  }
                }}
                disabled={!newCompetitorInput.trim()}
                className="px-3.5 py-2 bg-[#0a66c2] hover:bg-[#084e96] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs shrink-0 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            {/* Competitors List */}
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {trackedCompetitors.map((comp) => (
                <div
                  key={comp.id}
                  className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-8 h-8 rounded-lg ${comp.logoBg} text-white font-bold flex items-center justify-center text-[10px] shrink-0`}>
                      {comp.logoText}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-900 dark:text-white truncate">{comp.name}</h4>
                      <p className="text-[11px] text-slate-500">{comp.followers} followers</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setTrackedCompetitors((prev) => prev.filter((c) => c.id !== comp.id))}
                    className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Remove competitor"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-white/10">
              <button
                onClick={() => setEditCompetitorsModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MANAGE FOLLOWING MODAL (Feed Right Rail Action Trigger)                   */}
      {/* ========================================================================= */}
      {manageFollowingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-left max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#0a66c2]" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Manage Followed Pages</h3>
              </div>
              <button
                onClick={() => setManageFollowingModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Pages and industry leaders your company follows to populate the company feed with relevant discussions.
            </p>

            <div className="space-y-3">
              {[
                { id: "leadership_first", name: "Leadership First", sector: "Professional Training & Coaching", followers: "6.3M followers", logoText: "lf", logoBg: "bg-blue-600" },
                { id: "wef", name: "World Economic Forum", sector: "Non-profit Organization Management", followers: "5.6M followers", logoText: "WEF", logoBg: "bg-slate-900" },
                { id: "gartner", name: "Gartner", sector: "Information Technology & Services", followers: "2.2M followers", logoText: "G", logoBg: "bg-blue-900" },
                { id: "zepto", name: "Zepto", sector: "Technology, Information and Internet", followers: "1.2M followers", logoText: "zepto", logoBg: "bg-purple-600" },
              ].map((p) => {
                const isFollowed = followedCompanies[p.id] !== false;
                return (
                  <div key={p.id} className="p-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${p.logoBg} text-white font-bold flex items-center justify-center text-xs shrink-0`}>
                        {p.logoText}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">{p.name}</h4>
                        <p className="text-[11px] text-slate-500">{p.sector} · {p.followers}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setFollowedCompanies({ ...followedCompanies, [p.id]: !isFollowed });
                      }}
                      className={`px-3 py-1 text-xs font-bold rounded-full transition-all border ${
                        isFollowed
                          ? "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-red-500 hover:text-red-500"
                          : "border-[#0a66c2] bg-[#0a66c2] text-white"
                      }`}
                    >
                      {isFollowed ? "Following" : "+ Follow"}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-white/10">
              <button
                onClick={() => setManageFollowingModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* EDIT SERVICE PAGE INFO MODAL                                              */}
      {/* ========================================================================= */}
      {editServiceInfoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#0a66c2]" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Edit Service Page Overview</h3>
              </div>
              <button
                onClick={() => setEditServiceInfoModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Service Location &amp; Availability</label>
                <input
                  type="text"
                  value={serviceAvailability}
                  onChange={(e) => setServiceAvailability(e.target.value)}
                  placeholder="e.g. Remote or in person (Bengaluru South)"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Pricing Model</label>
                <input
                  type="text"
                  value={servicePricingType}
                  onChange={(e) => setServicePricingType(e.target.value)}
                  placeholder="e.g. Contact for pricing / Starting at ₹50,000"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-medium"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-white/10">
              <button
                onClick={() => setEditServiceInfoModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Service page details saved successfully!");
                  setEditServiceInfoModalOpen(false);
                }}
                className="px-5 py-2 bg-[#0a66c2] hover:bg-[#084e96] text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* UPLOAD WORK SAMPLE / MEDIA MODAL                                          */}
      {/* ========================================================================= */}
      {uploadWorkSampleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#0a66c2]" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Upload Work Samples &amp; Media</h3>
              </div>
              <button
                onClick={() => setUploadWorkSampleModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Upload client case studies, brochure decks (PDF), or video showcases (up to 8 media assets).
            </p>

            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center space-y-3 bg-slate-50 dark:bg-slate-900">
              <Upload className="w-8 h-8 text-[#0a66c2] mx-auto" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Drag &amp; drop files or click to browse</p>
                <p className="text-[11px] text-slate-500">Supports JPG, PNG, PDF, MP4 up to 50MB</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-white/10">
              <button
                onClick={() => setUploadWorkSampleModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Work sample uploaded and linked to Service page!");
                  setUploadWorkSampleModalOpen(false);
                }}
                className="px-5 py-2 bg-[#0a66c2] hover:bg-[#084e96] text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Upload &amp; Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBMIT PROPOSAL MODAL                                                     */}
      {/* ========================================================================= */}
      {submitProposalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-[#0a66c2]" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Submit Commercial Proposal</h3>
              </div>
              <button
                onClick={() => setSubmitProposalModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Proposal Scope / Cover Letter</label>
                <textarea
                  rows={4}
                  placeholder="Outline your execution methodology, timeline milestones, and deliverables..."
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Proposed Quote (₹)</label>
                  <input
                    type="text"
                    defaultValue="₹75,000"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 font-mono font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Timeline</label>
                  <input
                    type="text"
                    defaultValue="30 Days"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-white/10">
              <button
                onClick={() => setSubmitProposalModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Proposal submitted to client! Project will appear under 'Client projects' once accepted.");
                  setSubmitProposalModalOpen(false);
                  setServicesSubTab("client_projects");
                }}
                className="px-5 py-2 bg-[#0a66c2] hover:bg-[#084e96] text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Send Proposal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ALTERNATIVE SOLUTION: INVITE CONNECTIONS TO FOLLOW MODAL                   */}
      {/* ========================================================================= */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden text-left flex flex-col max-h-[85vh]">
            
            {/* Modal Header & Credit Meter */}
            <div className="p-5 border-b border-slate-100 dark:border-white/10 flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.02]">
              <div>
                <div className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-emerald-500" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Invite Connections to Follow
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Grow your company followers by inviting your network and industry leaders.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs font-mono font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                    {inviteCredits} / {maxInviteCredits} credits
                  </span>
                </div>
                <button
                  onClick={() => setInviteModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Smart Auto-Invite Toggle Banner (Alternative to LinkedIn's Dropdown) */}
            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-b border-amber-200/60 dark:border-amber-800/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Auto-invite content engagers</span>
                    <span className="text-[9px] font-black uppercase bg-amber-500 text-white px-1.5 py-0.2 rounded">PREMIUM</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                    Automatically send follow invites to 1st-degree connections who like or comment on your posts.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setAutoInviteEngagers(!autoInviteEngagers)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-all ${
                  autoInviteEngagers ? "bg-emerald-500 justify-end" : "bg-slate-300 dark:bg-slate-700 justify-start"
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            {/* Fast Filter Chips & Search Bar */}
            <div className="p-4 border-b border-slate-100 dark:border-white/10 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search connections by name, company, or skills..."
                  value={inviteSearchQuery}
                  onChange={(e) => setInviteSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white font-medium focus:border-[#0a66c2] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: "all", label: "All Contacts" },
                    { id: "bengaluru", label: "📍 Bengaluru" },
                    { id: "mumbai", label: "📍 Mumbai" },
                    { id: "delhi", label: "📍 Delhi NCR" },
                    { id: "tech", label: "🏢 Tech & IT" },
                    { id: "manufacturing", label: "🏭 Industry" },
                  ].map((chip) => (
                    <button
                      key={chip.id}
                      onClick={() => setInviteSegmentFilter(chip.id)}
                      className={`px-3 py-1 rounded-full font-bold text-[11px] transition-all ${
                        inviteSegmentFilter === chip.id
                          ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs"
                          : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-[11px] font-bold">
                  <button
                    onClick={() => {
                      const allIds = candidateConnections.map((c) => c.id);
                      setSelectedInviteIds(allIds);
                    }}
                    className="text-[#0a66c2] hover:underline"
                  >
                    Select All
                  </button>
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                  <button
                    onClick={() => setSelectedInviteIds([])}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable Clean Single-Column Contact List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5 divide-y divide-slate-100 dark:divide-white/5">
              {candidateConnections
                .filter((c) => {
                  const matchQuery =
                    !inviteSearchQuery ||
                    c.name.toLowerCase().includes(inviteSearchQuery.toLowerCase()) ||
                    c.role.toLowerCase().includes(inviteSearchQuery.toLowerCase());
                  const matchSegment =
                    inviteSegmentFilter === "all" ||
                    (inviteSegmentFilter === "bengaluru" && c.loc.includes("Bengaluru")) ||
                    (inviteSegmentFilter === "mumbai" && c.loc.includes("Mumbai")) ||
                    (inviteSegmentFilter === "delhi" && c.loc.includes("Delhi")) ||
                    (inviteSegmentFilter === "tech" && c.sector === "tech") ||
                    (inviteSegmentFilter === "manufacturing" && c.sector === "manufacturing");
                  return matchQuery && matchSegment;
                })
                .map((contact) => {
                  const isChecked = selectedInviteIds.includes(contact.id);
                  return (
                    <div
                      key={contact.id}
                      onClick={() => {
                        if (isChecked) {
                          setSelectedInviteIds(selectedInviteIds.filter((id) => id !== contact.id));
                        } else {
                          setSelectedInviteIds([...selectedInviteIds, contact.id]);
                        }
                      }}
                      className={`p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-3 pt-3.5 ${
                        isChecked
                          ? "bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40"
                          : "hover:bg-slate-50 dark:hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className={`w-10 h-10 rounded-full ${contact.avatarBg} text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs`}>
                          {contact.avatar}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {contact.name}
                          </h4>
                          <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mt-0.5">
                            {contact.role}
                          </p>
                          <span className="inline-block mt-1 text-[10px] font-semibold text-slate-400">
                            {contact.loc}
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 pl-2">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                          isChecked
                            ? "bg-[#0a66c2] border-[#0a66c2] text-white"
                            : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Bottom Action Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-between">
              <div className="text-xs">
                <span className="font-bold text-slate-900 dark:text-white">
                  {selectedInviteIds.length} selected
                </span>
                <span className="text-slate-400 ml-1">
                  (Uses {selectedInviteIds.length} credit{selectedInviteIds.length !== 1 ? "s" : ""})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setInviteModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400"
                >
                  Cancel
                </button>
                <button
                  disabled={selectedInviteIds.length === 0}
                  onClick={() => {
                    alert(`Success! Follow invitations sent to ${selectedInviteIds.length} connections.`);
                    setInviteCredits(Math.max(0, inviteCredits - selectedInviteIds.length));
                    setSelectedInviteIds([]);
                    setInviteModalOpen(false);
                  }}
                  className={`px-5 py-2 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 ${
                    selectedInviteIds.length > 0
                      ? "bg-[#0a66c2] hover:bg-[#084e96] text-white cursor-pointer"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send {selectedInviteIds.length > 0 ? selectedInviteIds.length : ""} Invite{selectedInviteIds.length !== 1 ? "s" : ""}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SETTINGS MODAL 1: MANAGE ADMINS                                           */}
      {/* ========================================================================= */}
      {settingsActiveModal === "admins" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Manage Page Admins</h3>
                <p className="text-xs text-slate-500">Control who has administrative access and editing permissions for {companyName}.</p>
              </div>
              <button
                onClick={() => setSettingsActiveModal(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {adminsList.map((adm) => (
                <div key={adm.id} className="p-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full ${adm.avatarBg} text-white font-bold flex items-center justify-center text-xs`}>
                      {adm.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{adm.name}</h4>
                      <p className="text-[11px] text-slate-500">{adm.email}</p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 bg-blue-50 text-[#0a66c2] dark:bg-blue-950/40 font-bold rounded-lg text-[10px]">
                    {adm.role}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  const email = prompt("Enter email of new administrator to invite:");
                  if (email) {
                    setAdminsList([...adminsList, {
                      id: `adm-${Date.now()}`,
                      name: email.split("@")[0],
                      email,
                      role: "Content admin",
                      avatar: email.substring(0, 2).toUpperCase(),
                      avatarBg: "bg-indigo-600"
                    }]);
                  }
                }}
                className="text-xs font-bold text-[#0a66c2] hover:underline"
              >
                + Add admin
              </button>

              <button
                onClick={() => setSettingsActiveModal(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SETTINGS MODAL 2: MANAGE RESTRICTED MEMBERS                                */}
      {/* ========================================================================= */}
      {settingsActiveModal === "restricted" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Restricted Members</h3>
                <p className="text-xs text-slate-500">Members who are restricted cannot comment on posts or submit inbound inquiries.</p>
              </div>
              <button
                onClick={() => setSettingsActiveModal(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {restrictedMembersList.map((res) => (
                <div key={res.id} className="p-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between gap-3 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{res.name}</h4>
                    <p className="text-[11px] text-red-500">{res.reason} · Restricted on {res.date}</p>
                  </div>

                  <button
                    onClick={() => {
                      setRestrictedMembersList(restrictedMembersList.filter((r) => r.id !== res.id));
                      alert(`Unrestricted member: ${res.name}`);
                    }}
                    className="px-3 py-1 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-500 font-bold text-xs rounded-lg"
                  >
                    Unrestrict
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex justify-end">
              <button
                onClick={() => setSettingsActiveModal(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SETTINGS MODAL 3: INBOX SETTINGS                                          */}
      {/* ========================================================================= */}
      {settingsActiveModal === "inbox" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Inbox &amp; Direct Messaging Settings</h3>
                <p className="text-xs text-slate-500">Configure how buyers and partners initiate direct commercial conversations.</p>
              </div>
              <button
                onClick={() => setSettingsActiveModal(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Direct Messaging Toggle */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Allow Direct Member Messages</span>
                  <span className="text-[11px] text-slate-500">Enable &quot;Inquire Offerings&quot; button on your public company profile</span>
                </div>
                <button
                  onClick={() => setInboxMessagingAllowed(!inboxMessagingAllowed)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-all ${
                    inboxMessagingAllowed ? "bg-emerald-500 justify-end" : "bg-slate-300 dark:bg-slate-700 justify-start"
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                </button>
              </div>

              {/* Conversation Topics */}
              <div className="space-y-2">
                <span className="font-bold text-slate-900 dark:text-white block">Conversation Topic Starters</span>
                <div className="flex flex-wrap gap-1.5">
                  {inboxTopicsList.map((topic, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5"
                    >
                      <span>{topic}</span>
                      <X
                        className="w-3 h-3 text-slate-400 hover:text-red-500 cursor-pointer"
                        onClick={() => setInboxTopicsList(inboxTopicsList.filter((_, i) => i !== idx))}
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex justify-end">
              <button
                onClick={() => {
                  alert("Inbox preferences updated successfully!");
                  setSettingsActiveModal(null);
                }}
                className="px-5 py-2 bg-[#0a66c2] hover:bg-[#084e96] text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SETTINGS MODAL 4: MANAGE CONTENT SHARING (RSS Feeds)                      */}
      {/* ========================================================================= */}
      {settingsActiveModal === "content_sharing" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Content Sharing Sources</h3>
                <p className="text-xs text-slate-500">Connect external blogs, RSS streams, or YouTube channels for auto-syndication.</p>
              </div>
              <button
                onClick={() => setSettingsActiveModal(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {contentSharingSources.map((src) => (
                <div key={src.id} className="p-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between gap-3 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{src.title}</h4>
                    <p className="text-[11px] text-slate-500 font-mono">{src.url}</p>
                  </div>

                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 text-[10px] font-bold rounded">
                    {src.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  const url = prompt("Enter RSS Feed URL to syndicate:");
                  if (url) {
                    setContentSharingSources([...contentSharingSources, {
                      id: `rss-${Date.now()}`,
                      title: "External Syndicated Feed",
                      url,
                      status: "Active",
                      autoPost: true
                    }]);
                  }
                }}
                className="text-xs font-bold text-[#0a66c2] hover:underline"
              >
                + Connect new source
              </button>

              <button
                onClick={() => setSettingsActiveModal(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SETTINGS MODAL 5: PROFILE VISIBILITY & VERIFICATION                       */}
      {/* ========================================================================= */}
      {settingsActiveModal === "visibility" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Profile Visibility &amp; Verification</h3>
                <p className="text-xs text-slate-500">Configure global search indexing and corporate verification badges.</p>
              </div>
              <button
                onClick={() => setSettingsActiveModal(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Active Plan Tier</span>
                  <span className="text-[11px] text-slate-500">{isCorporate ? "Corporate Plan" : isCompany ? "Company Plan" : isStartup ? "Startup Plan" : "Free Profile"}</span>
                </div>
                <button
                  onClick={() => {
                    setSettingsActiveModal(null);
                    router.push(`/${locale}/profile/plans/company`);
                  }}
                  className="px-3 py-1 bg-[#0a66c2] text-white font-bold text-xs rounded-lg"
                >
                  Change Plan
                </button>
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Verified Blue Checkmark</span>
                  <span className="text-[11px] text-slate-500">{!isFree ? "Corporate entity verified" : "Unverified (Upgrade required)"}</span>
                </div>
                <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${!isFree ? "bg-blue-100 text-[#0a66c2]" : "bg-slate-200 text-slate-600"}`}>
                  {!isFree ? "Verified" : "Unverified"}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex justify-end">
              <button
                onClick={() => setSettingsActiveModal(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
