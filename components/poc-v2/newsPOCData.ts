export interface SubSubItem {
  label: string;
  slug: string;
  description: string;
}

export interface SubItem {
  label: string;
  slug: string;
  description: string;
  subSubItems?: SubSubItem[];
}

export interface MegaMenuItem {
  id: string;
  label: string;
  slug: string;
  icon: string;
  purpose: string;
  tier: "Free/Registered" | "Verified/Pro" | "Enterprise" | "All Tiers";
  audience?: string[];
  subItems: SubItem[];
}

export const NEWS_POC_MENU_ITEMS: MegaMenuItem[] = [
  {
    id: "IGN-M01",
    label: "Feed",
    slug: "feed",
    icon: "📱",
    purpose: "Personalized RSS-style stream from reader's tagged taxonomy.",
    tier: "All Tiers",
    subItems: []
  },
  {
    id: "IGN-M02",
    label: "Headlines",
    slug: "headlines",
    icon: "🔥",
    purpose: "Curated stories grouped by who produced them (editors/sources).",
    tier: "Free/Registered",
    subItems: [
      {
        label: "IGEN AI Editor",
        slug: "ai-editor",
        description: "Automated AI producing real-time global news 24/7."
      },
      {
        label: "IGEN Intelligence Editor",
        slug: "intelligence-editor",
        description: "Internal IGEN research team producing curated reports."
      },
      {
        label: "Subject Matter Expert Editor",
        slug: "sme-editor",
        description: "Curated list of SME-authored articles."
      },
      {
        label: "Viksit Bharat Panel Editor",
        slug: "viksit-bharat-panel",
        description: "Panel discussions aligned to Viksit Bharat 2047."
      }
    ]
  },
  {
    id: "IGN-M03",
    label: "Trending",
    slug: "trending",
    icon: "📈",
    purpose: "Surfaces popular news based on crowd reactions (likes/shares/comments).",
    tier: "Free/Registered",
    subItems: []
  },
  {
    id: "IGN-M04",
    label: "Company News",
    slug: "company-news",
    icon: "🏢",
    purpose: "Linked directly to the Company Pages product (Free, Pro, Enterprise).",
    tier: "Verified/Pro",
    subItems: [
      {
        label: "Registered Companies",
        slug: "registered",
        description: "Free Tier company listings.",
        subSubItems: [
          { label: "Company Pages", slug: "pages", description: "Basic digital profiles for registered companies." },
          { label: "Company News", slug: "news", description: "Press releases and announcements from registered companies." }
        ]
      },
      {
        label: "Verified Companies",
        slug: "verified",
        description: "Pro Tier verified business listings.",
        subSubItems: [
          { label: "Company Pages", slug: "pages", description: "Premium verified profiles with lead forms." },
          { label: "Company News", slug: "news", description: "Verified business updates and announcements." }
        ]
      },
      {
        label: "Top Companies",
        slug: "top",
        description: "Enterprise Tier corporate listings.",
        subSubItems: [
          { label: "Company Pages", slug: "pages", description: "Advanced corporate dashboards and custom analytics." },
          { label: "Company News", slug: "news", description: "Corporate breaking news and market disclosures." }
        ]
      }
    ]
  },
  {
    id: "IGN-M05",
    label: "Leader News",
    slug: "leader-news",
    icon: "👑",
    purpose: "Linked directly to the Leader Pages product.",
    tier: "Enterprise",
    subItems: [
      {
        label: "Registered Leaders",
        slug: "registered",
        description: "Free Tier basic leader entries.",
        subSubItems: [
          { label: "Leader News", slug: "news", description: "News coverage for registered leaders." },
          { label: "Leader Pages", slug: "pages", description: "Basic bio and profile card for registered executives." }
        ]
      },
      {
        label: "Verified Leaders",
        slug: "verified",
        description: "Pro Tier verified executive profiles.",
        subSubItems: [
          { label: "Leader News", slug: "news", description: "Exclusive news and activity logs of verified leaders." },
          { label: "Leader Pages", slug: "pages", description: "Verified biography, network indicators, and decisions." }
        ]
      },
      {
        label: "Top Leaders",
        slug: "top",
        description: "Enterprise Tier top movers & market leaders.",
        subSubItems: [
          { label: "Leader News", slug: "news", description: "Market-moving executive disclosures and investment news." },
          { label: "Leader Pages", slug: "pages", description: "Influence score, investment trackers, and policy mentions." }
        ]
      },
      {
        label: "Leader Intelligence",
        slug: "intelligence",
        description: "C-suite strategic moves, executive quotes, leadership trends, and predictive signals.",
        subSubItems: []
      }
    ]
  },
  {
    id: "IGN-M06",
    label: "Expert News",
    slug: "expert-news",
    icon: "🎓",
    purpose: "Expert-authored insights from the SME/ASME consultation network.",
    tier: "Verified/Pro",
    subItems: [
      {
        label: "SME (Subject Matter Expert)",
        slug: "sme",
        description: "SME-authored columns and publication panels.",
        subSubItems: [
          { label: "SME News", slug: "news", description: "Columns, articles, and research published by SMEs." },
          { label: "SME Pages", slug: "pages", description: "Profiles and consultation booking options for SMEs." }
        ]
      },
      {
        label: "ASME (Associate Subject Matter Expert)",
        slug: "asme",
        description: "ASME-authored business insights.",
        subSubItems: [
          { label: "ASME News", slug: "news", description: "Articles and analyses written by ASMEs." },
          { label: "ASME Pages", slug: "pages", description: "Profiles and direct request forms for ASMEs." }
        ]
      }
    ]
  },
  {
    id: "IGN-M07",
    label: "Sector News",
    slug: "sector-news",
    icon: "🏭",
    purpose: "50-sector industry intelligence and engagement platform.",
    tier: "Verified/Pro",
    subItems: [
      {
        label: "Sector Feed",
        slug: "all",
        description: "Comprehensive feed covering all 50 sectors.",
        subSubItems: []
      },
      {
        label: "Sector Engagement",
        slug: "engagement",
        description: "Crowd popularity, sector discussions, and active polls.",
        subSubItems: []
      },
      {
        label: "Sector Intelligence",
        slug: "intelligence",
        description: "Merged sector reports, KPIs, and predictive charts.",
        subSubItems: []
      },
      {
        label: "Industry Intelligence",
        slug: "industry",
        description: "1,350+ industry growth trends, production metrics, and AI recommendations.",
        subSubItems: []
      },
      {
        label: "Industry Feed",
        slug: "industry-feed",
        description: "News feed filtered by industry tags."
      }
    ]
  },
  {
    id: "IGN-M08",
    label: "Country News",
    slug: "country-news",
    icon: "🌐",
    purpose: "Bilateral trade details and country business intelligence.",
    tier: "Verified/Pro",
    subItems: [
      {
        label: "Country Intelligence",
        slug: "intelligence",
        description: "Bilateral trade analytics, AI risk forecasts, and custom research.",
        subSubItems: []
      }
    ]
  },
  {
    id: "IGN-M09",
    label: "Communities",
    slug: "communities",
    icon: "🤝",
    purpose: "Professional networks linking trade experts, readers, and expo members.",
    tier: "All Tiers",
    subItems: [
      {
        label: "SME & ASME Community",
        slug: "sme-asme",
        description: "Private network for Subject Matter Experts."
      },
      {
        label: "Reader Community",
        slug: "reader",
        description: "Open community discussions for news readers."
      },
      {
        label: "Leader Community",
        slug: "leader",
        description: "Executive-only roundtable conversations."
      }
    ]
  },
  {
    id: "IGN-M10",
    label: "My News",
    slug: "my-news",
    icon: "👤",
    purpose: "Personal workspace for trade news bookmarks, reader intelligence, and analytics.",
    tier: "Verified/Pro",
    subItems: [
      {
        label: "My Activities",
        slug: "activities",
        description: "Track comment history, likes, and saved records."
      },
      {
        label: "Reader Intelligence",
        slug: "intelligence",
        description: "Audience analytics, reading habits & content intelligence.",
        subSubItems: []
      }
    ]
  }
];
