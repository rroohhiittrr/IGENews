// Sales EOI Form — Product & Platform Data
// Based on IGEN_EOI_PLATFORM_FRONTEND_BUILDSPEC_v2.md

export type IdentityType =
  | "READER"
  | "INDUSTRY_EXPERT"
  | "BUSINESS_OWNER"
  | "INDUSTRY_LEADER"
  | "EXPORTER_IMPORTER";

export type PlatformId =
  | "igen_expo"
  | "igen_news"
  | "igen_awards"
  | "viksit_bharat"
  | "igen_partners"
  | "igen_sponsors"
  | "igen_leaders";

export interface Platform {
  id: PlatformId;
  icon: string;
  name: string;
  tagline: string;
  whoShouldJoin: string[];
  products: SalesProduct[];
}

export interface SalesProduct {
  id: string;
  name: string;
  idealFor: string;
  benefits: string[];
  foundingSlot?: string;
  addOns?: string[];
  pricingNote?: string;
  conditionalField?: { condition: string; label: string; type: "textarea" | "dropdown"; options?: string[] };
}

export const PLATFORMS: Platform[] = [
  {
    id: "igen_expo",
    icon: "🌐",
    name: "IGEN EXPO",
    tagline: "India's AI-Powered Trade Intelligence & Digital Exhibition",
    whoShouldJoin: ["Exporters", "Importers", "Manufacturers", "Trading Houses", "Global Buyers", "Service Providers"],
    products: [
      {
        id: "indian_exporters_page",
        name: "Indian Exporters Page",
        idealFor: "Your products are ready for the world, but global buyers can't find you yet.",
        benefits: [
          "Visibility across 195 countries",
          "AI-powered buyer discovery",
          "Verified exporter profile",
          "Trade intelligence by country",
          "Sector visibility",
        ],
        pricingNote: "Pricing shared after EOI review",
        addOns: ["Company Page", "Leader Page", "Awards", "Conference"],
      },
      {
        id: "global_importers_page",
        name: "Global Importers Page",
        idealFor: "You're sourcing products globally but haven't found the right partners yet.",
        benefits: [
          "Access to verified Indian suppliers",
          "Sector-wise sourcing intelligence",
          "Direct connect with exporters",
          "Global trade opportunity alerts",
        ],
        pricingNote: "Pricing shared after EOI review",
        addOns: ["Company Page", "EXIM Service Providers Page"],
      },
      {
        id: "indian_importers_page",
        name: "Indian Importers Page",
        idealFor: "You import goods but lack visibility among global exporters looking for Indian buyers.",
        benefits: [
          "Verified importer profile",
          "Visibility to 195-country exporter network",
          "AI-powered supplier matching",
          "Trade data & analytics",
        ],
        pricingNote: "Pricing shared after EOI review",
        addOns: ["Company Page", "Awards"],
      },
      {
        id: "global_exporters_page",
        name: "Global Exporters Page",
        idealFor: "You export globally but need a stronger digital presence to attract Indian buyers.",
        benefits: [
          "Visibility to Indian importers & traders",
          "AI-curated buyer recommendations",
          "Verified global exporter badge",
          "Sector intelligence reports",
        ],
        pricingNote: "Pricing shared after EOI review",
        addOns: ["EXIM Service Providers Page", "Conference"],
      },
      {
        id: "exim_service_providers",
        name: "EXIM Service Providers Page",
        idealFor: "You offer trade-related services — logistics, finance, compliance — but reach is limited.",
        benefits: [
          "Visibility to importers & exporters",
          "Lead generation for B2B services",
          "Verified service provider badge",
          "Cross-platform referral opportunities",
        ],
        pricingNote: "Pricing shared after EOI review",
        addOns: ["Company Page", "Sponsor"],
      },
    ],
  },
  {
    id: "igen_news",
    icon: "📰",
    name: "IGEN NEWS",
    tagline: "India's Business & Industry Intelligence Platform",
    whoShouldJoin: ["Experts", "Companies", "CXOs", "Founders", "Readers", "Investors", "Professionals"],
    products: [
      {
        id: "sme_page",
        name: "SME Page",
        idealFor: "You've spent years building expertise in your industry — but when people search for an expert, they don't find you.",
        benefits: [
          "Thought Leadership publishing",
          "Consulting opportunities & bookings",
          "Industry Recognition",
          "Awards Jury Eligibility",
          "Podcast Opportunities",
          "Expert Branding",
        ],
        foundingSlot: "First 100 SMEs — Year 1 FREE",
        addOns: ["Leader Page", "Conference Speaker", "Awards Jury", "Knowledge Partner"],
        pricingNote: "Founding slot: Year 1 FREE for first 100",
      },
      {
        id: "associate_sme_page",
        name: "Associate SME Page",
        idealFor: "You're becoming recognised in your field but your professional presence online doesn't reflect the expert you've become.",
        benefits: [
          "Digital Presence",
          "Authority Building",
          "Industry Visibility",
          "Clear pathway to Full SME Status",
          "Certification Roadmap",
          "Mentorship access",
          "Milestone achievement badges",
        ],
        pricingNote: "Pricing shared after EOI review",
        addOns: ["SME Page (upgrade)", "Awards"],
      },
      {
        id: "company_page",
        name: "Company Page",
        idealFor: "Your company has a great product and team, but buyers and investors searching online don't find you, or don't trust what they find.",
        benefits: [
          "Verified Company Profile — Blue Tick Identity",
          "Investor, Employee, Stakeholder sub-tabs",
          "PR Publishing",
          "Industry Ranking Position",
          "Lead Generation Benefits",
          "Featured Company Upgrade",
        ],
        pricingNote: "Pricing shared after EOI review",
        addOns: ["Leader Page", "Awards", "Sponsor", "Conference"],
      },
      {
        id: "leader_page",
        name: "Leader Page",
        idealFor: "You've earned your seat at the industry table — but your digital presence doesn't show who you've become.",
        benefits: [
          "Personal Brand Score",
          "Industry Influence Index",
          "Speaking Opportunities",
          "Board Advisory Opportunities",
          "Media Coverage Opportunities",
          "Executive Visibility Benefits",
        ],
        pricingNote: "Pricing shared after EOI review",
        addOns: ["Company Page", "Awards", "Conference Speaker"],
      },
      {
        id: "reader_plan",
        name: "Reader Plan",
        idealFor: "You track your industry but rely on generic news that wastes your time or misses what matters to you.",
        benefits: [
          "AI-curated industry news — no noise",
          "Follow Industries & Sectors",
          "Save Articles & Personalise Feed",
          "Upgrade path: Reader → Associate SME",
          "Founding Member recognition (first 500)",
        ],
        foundingSlot: "First 500 Readers get Founding Badge",
        pricingNote: "Pricing shared after EOI review",
        addOns: ["Associate SME Page (upgrade)"],
      },
    ],
  },
  {
    id: "igen_awards",
    icon: "🏅",
    name: "IGEN AWARDS",
    tagline: "Industry Recognition Platform",
    whoShouldJoin: ["Companies", "Leaders", "Exporters", "SMEs", "Professionals"],
    products: [
      { id: "awards_nomination", name: "Awards Nomination", idealFor: "You want your company or leadership recognised at the national industry level.", benefits: ["Industry Recognition", "Brand Credibility", "Media Visibility", "Networking", "Reputation Enhancement"], pricingNote: "Pricing shared after EOI review" },
      { id: "jury_member", name: "Jury Member", idealFor: "You have the expertise to evaluate and elevate your industry.", benefits: ["Industry Influence", "Peer Recognition", "Media Exposure", "Network Expansion"], pricingNote: "Pricing shared after EOI review" },
      { id: "awards_partner", name: "Awards Partner", idealFor: "You want to co-brand with IGEN's national awards platform.", benefits: ["Co-branding", "National Visibility", "Sponsored category rights", "Speaking slot"], pricingNote: "Pricing shared after EOI review" },
      { id: "awards_sponsor", name: "Awards Sponsor", idealFor: "You want premium brand visibility during award ceremonies and publications.", benefits: ["Premium Branding", "Category Ownership", "Media Presence", "Thought Leadership"], pricingNote: "Pricing shared after EOI review" },
      { id: "category_sponsor", name: "Category Sponsor", idealFor: "You want to own a specific category of recognition in your sector.", benefits: ["Category Ownership", "Sector Authority", "Exclusive Branding", "Media Exposure"], pricingNote: "Pricing shared after EOI review" },
    ],
  },
  {
    id: "viksit_bharat",
    icon: "🇮🇳",
    name: "VIKSIT BHARAT CONFERENCE",
    tagline: "Powering Viksit Bharat 2047",
    whoShouldJoin: ["Industry Leaders", "Government", "Academia", "Investors", "Companies", "Experts"],
    products: [
      { id: "delegate", name: "Delegate", idealFor: "You want to connect with policy-makers and industry leaders in one room.", benefits: ["National Visibility", "Policy Dialogue", "Strategic Networking", "Industry Influence"], pricingNote: "Pricing shared after EOI review" },
      { id: "speaker", name: "Speaker", idealFor: "You want to share your expertise and build thought leadership on a national stage.", benefits: ["Thought Leadership", "Media Coverage", "Audience of 500+", "Video content rights"], pricingNote: "Pricing shared after EOI review", conditionalField: { condition: "speaker", label: "Topic you'd like to speak on", type: "textarea" } },
      { id: "panelist", name: "Panelist", idealFor: "You want to engage in live industry dialogue with peer leaders.", benefits: ["Expert positioning", "Media coverage", "Live panel visibility", "Post-event publication"], pricingNote: "Pricing shared after EOI review" },
      { id: "knowledge_partner", name: "Knowledge Partner", idealFor: "Your organisation wants to co-produce content and research with IGEN.", benefits: ["Co-branded research", "Content production rights", "National Distribution", "Speaking slots"], pricingNote: "Pricing shared after EOI review" },
      { id: "strategic_partner", name: "Strategic Partner", idealFor: "You want deep ecosystem association and long-term collaboration with IGEN.", benefits: ["Ecosystem integration", "Revenue opportunities", "Exclusive access", "Long-term branding"], pricingNote: "Pricing shared after EOI review" },
      { id: "conference_sponsor", name: "Sponsor", idealFor: "You want premium brand visibility at India's premier industry conference.", benefits: ["Premium Branding", "Category Ownership", "National Reach", "Media placements"], pricingNote: "Pricing shared after EOI review", conditionalField: { condition: "conference_sponsor", label: "Sponsorship budget range", type: "dropdown", options: ["₹1L – ₹5L", "₹5L – ₹15L", "₹15L – ₹50L", "₹50L+", "Prefer to discuss"] } },
    ],
  },
  {
    id: "igen_partners",
    icon: "🤝",
    name: "IGEN PARTNERS",
    tagline: "Grow with IGEN — City · Sector",
    whoShouldJoin: ["Consultants", "Agencies", "Regional Leaders", "Industry Associations", "Media Houses"],
    products: [
      { id: "affiliate_partner", name: "Affiliate Partner", idealFor: "You want to earn while growing the IGEN ecosystem in your network.", benefits: ["Revenue Opportunities", "Regional Visibility", "Ecosystem Influence", "Long-Term Participation"], pricingNote: "Pricing shared after EOI review" },
      { id: "city_partner", name: "City Partner", idealFor: "You are the go-to industry connector in your city.", benefits: ["City-level authority", "Revenue from local memberships", "Exclusive city rights", "IGEN brand association"], pricingNote: "Pricing shared after EOI review" },
      { id: "sector_partner", name: "Sector Partner", idealFor: "You represent or lead a specific sector or industry body.", benefits: ["Sector authority", "National distribution", "Co-branded content", "Revenue share"], pricingNote: "Pricing shared after EOI review" },
      { id: "knowledge_partner_p", name: "Knowledge Partner", idealFor: "You produce research, reports, or educational content for industries.", benefits: ["Co-branded publications", "National Distribution", "Expert positioning", "Speaking rights"], pricingNote: "Pricing shared after EOI review" },
      { id: "media_partner", name: "Media Partner", idealFor: "You own or operate a media property and want cross-promotion.", benefits: ["Cross-promotion", "Content syndication", "Shared audience growth", "Event co-branding"], pricingNote: "Pricing shared after EOI review" },
      { id: "strategic_partner_p", name: "Strategic Partner", idealFor: "You want deep, long-term integration with the IGEN ecosystem.", benefits: ["Ecosystem integration", "Exclusive access", "Joint GTM strategy", "Revenue sharing"], pricingNote: "Pricing shared after EOI review" },
    ],
  },
  {
    id: "igen_sponsors",
    icon: "💎",
    name: "IGEN SPONSORS",
    tagline: "Own a Category — National Reach",
    whoShouldJoin: ["Enterprises", "Banks", "Insurance Companies", "Government Bodies", "Large Brands"],
    products: [
      { id: "founding_sponsor", name: "Founding Sponsor", idealFor: "You want to be permanently associated with IGEN's founding story.", benefits: ["Premium Branding", "National Visibility", "Category Ownership", "Thought Leadership Positioning", "Ecosystem Association"], pricingNote: "Pricing shared after EOI review" },
      { id: "expo_sponsor", name: "Expo Sponsor", idealFor: "You want visibility across India's trade & export intelligence platform.", benefits: ["Trade audience reach", "Branded pages", "Event co-branding", "Export community visibility"], pricingNote: "Pricing shared after EOI review" },
      { id: "awards_sponsor_s", name: "Awards Sponsor", idealFor: "You want premium brand placement during national industry awards.", benefits: ["Awards branding", "Category co-ownership", "Media coverage", "VIP access"], pricingNote: "Pricing shared after EOI review" },
      { id: "conference_sponsor_s", name: "Conference Sponsor", idealFor: "You want brand prominence at India's premier policy & industry conference.", benefits: ["Conference branding", "Speaking slot", "Media coverage", "VIP delegate access"], pricingNote: "Pricing shared after EOI review" },
      { id: "platform_sponsor", name: "Platform Sponsor", idealFor: "You want persistent digital branding across the IGEN platform.", benefits: ["Platform-wide visibility", "AI recommendation placement", "Newsletter sponsorship", "Persistent branding"], pricingNote: "Pricing shared after EOI review" },
      { id: "sector_sponsor", name: "Sector Sponsor", idealFor: "You want to own a sector category across all IGEN products.", benefits: ["Sector ownership", "Cross-platform branding", "Category exclusivity", "National visibility"], pricingNote: "Pricing shared after EOI review" },
    ],
  },
  {
    id: "igen_leaders",
    icon: "👔",
    name: "IGEN LEADERS",
    tagline: "Executive Legacy — CEO · MD · CXO · Permanent Page",
    whoShouldJoin: ["CEOs", "MDs", "Founders", "Board Members", "Government Officials", "Industry Leaders"],
    products: [
      { id: "leader_page_l", name: "Leader Page", idealFor: "You've built a career of impact — now build a digital legacy that lasts.", benefits: ["Permanent Executive Identity", "Leadership Visibility", "Industry Recognition", "Media Opportunities", "Speaker Opportunities"], pricingNote: "Pricing shared after EOI review" },
      { id: "conference_speaker", name: "Conference Speaker", idealFor: "You want a prestigious national stage to share your vision.", benefits: ["National stage", "Media coverage", "Peer recognition", "Video content rights"], pricingNote: "Pricing shared after EOI review" },
      { id: "awards_jury_l", name: "Awards Jury", idealFor: "You want to shape industry standards as a recognised jury member.", benefits: ["Industry Influence", "Peer Recognition", "Media Exposure", "Network Expansion"], pricingNote: "Pricing shared after EOI review" },
      { id: "knowledge_partner_l", name: "Knowledge Partner", idealFor: "You want to co-produce thought leadership content with IGEN.", benefits: ["Co-branded research", "Content rights", "National distribution", "Expert positioning"], pricingNote: "Pricing shared after EOI review" },
      { id: "mentor", name: "Mentor", idealFor: "You want to give back by guiding the next generation of industry leaders.", benefits: ["Legacy building", "Community respect", "Published mentorship stories", "Expert profile"], pricingNote: "Pricing shared after EOI review" },
    ],
  },
];

// Cross-sell recommendation logic
export const CROSS_SELL_MAP: Record<string, string[]> = {
  indian_exporters_page: ["company_page", "leader_page", "awards_nomination", "delegate"],
  global_importers_page: ["company_page", "awards_nomination", "conference_sponsor"],
  indian_importers_page: ["company_page", "leader_page", "awards_nomination"],
  global_exporters_page: ["company_page", "exim_service_providers", "delegate"],
  exim_service_providers: ["company_page", "platform_sponsor", "sector_sponsor"],
  sme_page: ["leader_page", "conference_speaker", "awards_jury_l", "knowledge_partner_l"],
  associate_sme_page: ["sme_page", "awards_nomination"],
  company_page: ["leader_page", "awards_nomination", "founding_sponsor", "delegate"],
  leader_page: ["company_page", "awards_nomination", "conference_speaker"],
  reader_plan: ["associate_sme_page"],
  awards_nomination: ["company_page", "leader_page", "delegate"],
  jury_member: ["leader_page", "conference_speaker"],
  delegate: ["awards_nomination", "leader_page_l", "founding_sponsor"],
  speaker: ["awards_nomination", "leader_page_l", "founding_sponsor"],
  founding_sponsor: ["platform_sponsor", "conference_sponsor_s"],
};

// Identity → pre-highlighted platforms
export const IDENTITY_PLATFORM_MAP: Record<IdentityType, PlatformId[]> = {
  READER: ["igen_news"],
  INDUSTRY_EXPERT: ["igen_news", "igen_awards"],
  BUSINESS_OWNER: ["igen_news", "igen_expo", "igen_awards"],
  INDUSTRY_LEADER: ["igen_leaders", "igen_awards", "viksit_bharat"],
  EXPORTER_IMPORTER: ["igen_expo", "igen_news"],
};

// Goal clusters
export const GOAL_CLUSTERS = [
  {
    id: "growth",
    label: "GROWTH & REVENUE",
    emoji: "📈",
    goals: [
      "Generate Leads",
      "Export Growth",
      "Import Opportunities",
      "Strategic Partnerships",
      "Investment Opportunities",
    ],
  },
  {
    id: "visibility",
    label: "VISIBILITY & RECOGNITION",
    emoji: "🏆",
    goals: [
      "Increase Visibility",
      "Industry Recognition",
      "Thought Leadership",
      "Awards & Credibility",
      "Government Engagement",
    ],
  },
  {
    id: "intelligence",
    label: "INTELLIGENCE & COMMUNITY",
    emoji: "💡",
    goals: [
      "Market Intelligence",
      "Networking",
      "Recruitment",
      "Learning & Insights",
    ],
  },
];

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh", "Puducherry", "Chandigarh",
  "International",
];

export const INDUSTRY_SECTORS = [
  "Agriculture & Food", "Automotive", "Aviation & Aerospace", "Banking & Finance",
  "Chemicals & Petrochemicals", "Construction & Real Estate", "Defence",
  "Education & EdTech", "Energy & Power", "Engineering & Manufacturing",
  "Environment & Sustainability", "FMCG & Retail", "Healthcare & Pharma",
  "Hospitality & Tourism", "IT & Software", "Legal & Compliance",
  "Logistics & Supply Chain", "Media & Entertainment", "Mining & Minerals",
  "Oil & Gas", "Shipping & Maritime", "Telecom", "Textiles & Apparel",
  "Trade & Commerce", "Other",
];
