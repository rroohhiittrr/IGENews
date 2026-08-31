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
    subItems: [
      {
        label: "Sector Feed",
        slug: "sector",
        description: "News feed filtered by sectors.",
        subSubItems: [
          { label: "My Sector", slug: "my", description: "Personalized news from your selected sectors." },
          { label: "All Sector", slug: "all", description: "Read sample news from all 50 sectors." }
        ]
      },
      {
        label: "Industry Feed",
        slug: "industry",
        description: "News feed filtered by industry tags.",
        subSubItems: [
          { label: "My Industry", slug: "my", description: "Personalized feed for your selected industry segments." },
          { label: "All Industry", slug: "all", description: "Read sample news from 1,300+ industries." }
        ]
      },
      {
        label: "Country Feed",
        slug: "country",
        description: "Bilateral country news stream.",
        subSubItems: [
          { label: "My Country", slug: "my", description: "News affecting your selected countries." },
          { label: "All Country", slug: "all", description: "Bilateral news for 195 countries." }
        ]
      },
      {
        label: "Leader Feed",
        slug: "leader",
        description: "Executive intelligence feed.",
        subSubItems: [
          { label: "My Leader", slug: "my", description: "Activity updates from your followed leaders." },
          { label: "All Leader", slug: "all", description: "Feed showing news of all 150 leaders." }
        ]
      }
    ]
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
        description: "Automated AI producing real-time global news 24/7.",
        subSubItems: [
          { label: "My Sector", slug: "my", description: "AI news for your selected sectors." },
          { label: "All Sector", slug: "all", description: "AI news from all sectors." }
        ]
      },
      {
        label: "IGEN Intelligence Editor",
        slug: "intelligence-editor",
        description: "Internal IGEN research team producing curated reports.",
        subSubItems: [
          { label: "My Sector", slug: "my", description: "Intelligence editor stories from your selected sectors." },
          { label: "All Sector", slug: "all", description: "Intelligence editor stories from all sectors." }
        ]
      },
      {
        label: "Subject Matter Expert Editor",
        slug: "sme-editor",
        description: "Curated list of SME-authored articles.",
        subSubItems: [
          { label: "My Sector", slug: "my", description: "SME-authored stories from your selected sectors." },
          { label: "All Sector", slug: "all", description: "SME-authored stories from all sectors." }
        ]
      },
      {
        label: "Viksit Bharat Panel Editor",
        slug: "viksit-bharat-panel",
        description: "Panel discussions aligned to Viksit Bharat 2047.",
        subSubItems: [
          { label: "My Sector", slug: "my", description: "Viksit Bharat stories from your selected sectors." },
          { label: "All Sector", slug: "all", description: "Viksit Bharat stories from all sectors." }
        ]
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
    subItems: [
      {
        label: "Most Liked",
        slug: "most-liked",
        description: "Surfaces articles with high likes count.",
        subSubItems: [
          { label: "My Sectors", slug: "my", description: "Most liked news in your selected sectors." },
          { label: "All Sectors", slug: "all", description: "Most liked news globally." }
        ]
      },
      {
        label: "Most Shared",
        slug: "most-shared",
        description: "Surfaces articles with high shares count.",
        subSubItems: [
          { label: "My Sectors", slug: "my", description: "Most shared news in your selected sectors." },
          { label: "All Sectors", slug: "all", description: "Most shared news globally." }
        ]
      },
      {
        label: "Most Commented",
        slug: "most-commented",
        description: "Surfaces articles with high comment activity.",
        subSubItems: [
          { label: "My Sectors", slug: "my", description: "Most commented news in your selected sectors." },
          { label: "All Sectors", slug: "all", description: "Most commented news globally." }
        ]
      }
    ]
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
          { label: "Company News", slug: "news", description: "Press releases and announcements from registered companies." },
          { label: "By Sector", slug: "sector", description: "Browse registered companies sorted by sector." },
          { label: "All Sector", slug: "all", description: "Full repository of registered companies." }
        ]
      },
      {
        label: "Verified Companies",
        slug: "verified",
        description: "Pro Tier verified business listings.",
        subSubItems: [
          { label: "Company Pages", slug: "pages", description: "Premium verified profiles with lead forms." },
          { label: "Company News", slug: "news", description: "Verified business updates and announcements." },
          { label: "By Sector", slug: "sector", description: "Browse verified companies by sector." },
          { label: "All Sector", slug: "all", description: "Full repository of verified companies." }
        ]
      },
      {
        label: "Top Companies",
        slug: "top",
        description: "Enterprise Tier corporate listings.",
        subSubItems: [
          { label: "Company Pages", slug: "pages", description: "Advanced corporate dashboards and custom analytics." },
          { label: "Company News", slug: "news", description: "Corporate breaking news and market disclosures." },
          { label: "By Sector", slug: "sector", description: "Browse top corporates by sector." },
          { label: "All Sector", slug: "all", description: "Full repository of enterprise corporates." }
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
          { label: "Leader Pages", slug: "pages", description: "Basic bio and profile card for registered executives." },
          { label: "By Sector", slug: "sector", description: "Registered leaders categorized by industry sector." },
          { label: "All Sector", slug: "all", description: "Full registry of registered leaders." }
        ]
      },
      {
        label: "Verified Leaders",
        slug: "verified",
        description: "Pro Tier verified executive profiles.",
        subSubItems: [
          { label: "Leader News", slug: "news", description: "Exclusive news and activity logs of verified leaders." },
          { label: "Leader Pages", slug: "pages", description: "Verified biography, network indicators, and decisions." },
          { label: "By Sector", slug: "sector", description: "Verified leaders categorized by sector." },
          { label: "All Sector", slug: "all", description: "Full repository of verified leaders." }
        ]
      },
      {
        label: "Top Leaders",
        slug: "top",
        description: "Enterprise Tier top movers & market leaders.",
        subSubItems: [
          { label: "Leader News", slug: "news", description: "Market-moving executive disclosures and investment news." },
          { label: "Leader Pages", slug: "pages", description: "Influence score, investment trackers, and policy mentions." },
          { label: "By Sector", slug: "sector", description: "Top leaders categorized by sector." },
          { label: "All Sector", slug: "all", description: "Full database of top market leaders." }
        ]
      },
      {
        label: "Leader Intelligence",
        slug: "intelligence",
        description: "C-suite strategic moves, executive quotes, leadership trends, and predictive signals.",
        subSubItems: [
          { label: "Compare Leaders", slug: "compare", description: "Compare corporate leaders side-by-side across influence, focus, and metrics." }
        ]
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
          { label: "SME Pages", slug: "pages", description: "Profiles and consultation booking options for SMEs." },
          { label: "By Sector", slug: "sector", description: "Browse verified SMEs sorted by sector." },
          { label: "All Sector", slug: "all", description: "Full catalog of verified SMEs." }
        ]
      },
      {
        label: "ASME (Associate Subject Matter Expert)",
        slug: "asme",
        description: "ASME-authored business insights.",
        subSubItems: [
          { label: "ASME News", slug: "news", description: "Articles and analyses written by ASMEs." },
          { label: "ASME Pages", slug: "pages", description: "Profiles and direct request forms for ASMEs." },
          { label: "By Sector", slug: "sector", description: "Browse ASMEs by industry sector." },
          { label: "All Sector", slug: "all", description: "Full catalog of ASMEs." }
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
        label: "All Sector",
        slug: "all",
        description: "Comprehensive feed covering all 50 sectors.",
        subSubItems: [
          { label: "50 Sector Directory", slug: "directory", description: "Master index of all 50 sectors." },
          { label: "1,350+ Industries", slug: "industries", description: "Granular sub-industry taxonomy." }
        ]
      },
      {
        label: "Sector Engagement",
        slug: "engagement",
        description: "Crowd popularity, sector discussions, and active polls.",
        subSubItems: [
          { label: "Sector Polls", slug: "polls", description: "Live sentiment & export outlook polls." },
          { label: "Discussion Hub", slug: "discussions", description: "Industry peer comments & Q&A." }
        ]
      },
      {
        label: "Sector Intelligence",
        slug: "intelligence",
        description: "Merged sector reports, KPIs, and predictive charts.",
        subSubItems: [
          { label: "Compare Sector", slug: "compare", description: "Compare industrial sectors side-by-side." }
        ]
      },
      {
        label: "Industry Intelligence",
        slug: "industry",
        description: "1,350+ industry growth trends, production metrics, and AI recommendations.",
        subSubItems: []
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
        label: "My Country",
        slug: "my",
        description: "Bilateral trade details for your chosen countries.",
        subSubItems: [
          { label: "My Country Feed", slug: "feed", description: "Personalized stream for selected countries." },
          { label: "Trade Leads & Metrics", slug: "metrics", description: "Bilateral economic indicators." }
        ]
      },
      {
        label: "All Country",
        slug: "all",
        description: "Full directory of 195 countries with bilateral trade graphs.",
        subSubItems: [
          { label: "195 Countries Directory", slug: "directory", description: "Full global country index." },
          { label: "Bilateral Corridor Matrix", slug: "matrix", description: "Compare any two nations side-by-side." }
        ]
      },
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
        description: "Private network for Subject Matter Experts.",
        subSubItems: [
          { label: "All", slug: "all", description: "Discussion forums for all verified experts." },
          { label: "Top", slug: "top", description: "Premium discussions and advisory logs." }
        ]
      },
      {
        label: "Reader Community",
        slug: "reader",
        description: "Open community discussions for news readers.",
        subSubItems: [
          { label: "All", slug: "all", description: "Public threads and news comments." },
          { label: "Top", slug: "top", description: "Top readers board and badge rankings." }
        ]
      },
      {
        label: "Leader Community",
        slug: "leader",
        description: "Executive-only roundtable conversations.",
        subSubItems: [
          { label: "All", slug: "all", description: "Executive forums." },
          { label: "Top", slug: "top", description: "Elite board-level discussions." }
        ]
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
        label: "My News",
        slug: "my",
        description: "Personalized news feed matching selected sector streams.",
        subSubItems: []
      },
      {
        label: "My Activities",
        slug: "activities",
        description: "Track comment history, likes, and saved records.",
        subSubItems: [
          { label: "My Likes", slug: "likes", description: "All liked articles and reports." },
          { label: "My Comments", slug: "comments", description: "Log of your comments and discussions." },
          { label: "My Trade-News Analytics", slug: "analytics", description: "Custom dashboards highlighting reading topics." }
        ]
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
