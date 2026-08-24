// 🌍 IGEN NEWS PLATFORM — ALL 12 MEGA MENU DATA
// Source: IGEN_NEWS_MEGA_MENU_ARCHITECTURE.md

export type SubMenuColumn = {
  title: string;
  items: Array<{ label: string; href: string }>;
};

export type MegaMenuData = {
  id: number;
  icon: string;
  name: string;
  slug: string;
  type: string;
  upgradeHook?: string;
  columns: SubMenuColumn[];
};

const BASE = "/about-igen";

export const ABOUT_IGEN_MEGA_MENUS: MegaMenuData[] = [
  {
    id: 1,
    icon: "🔵",
    name: "Feed",
    slug: "feed",
    type: "Volume Engine",
    upgradeHook: "Follow more sectors. Upgrade to Pro.",
    columns: [
      {
        title: "By Sector",
        items: [
          { label: "All 20 Sectors", href: `${BASE}/feed/by-sector` },
          { label: "Sector Heat Map", href: `${BASE}/feed/by-sector/sector-heat-map` },
          { label: "My Followed Sectors", href: `${BASE}/feed/by-sector/my-followed-sectors` },
          { label: "Sector Gap Alerts", href: `${BASE}/feed/by-sector/sector-gap-alerts` },
          { label: "Sector Activity Rank", href: `${BASE}/feed/by-sector/sector-activity-rank` },
        ],
      },
      {
        title: "By Industry Depth",
        items: [
          { label: "All Industries (1000+)", href: `${BASE}/feed/by-industry-depth` },
          { label: "Industry Search", href: `${BASE}/feed/by-industry-depth/industry-search` },
          { label: "My Followed Industries", href: `${BASE}/feed/by-industry-depth/my-followed-industries` },
          { label: "Fastest Growing Industries", href: `${BASE}/feed/by-industry-depth/fastest-growing-industries` },
          { label: "Under-Covered Industries", href: `${BASE}/feed/by-industry-depth/under-covered-industries` },
        ],
      },
      {
        title: "By Country & Bilateral Trade",
        items: [
          { label: "All 195 Countries", href: `${BASE}/feed/by-country` },
          { label: "Bilateral Trade Map", href: `${BASE}/feed/by-country/bilateral-trade-map` },
          { label: "My Followed Countries", href: `${BASE}/feed/by-country/my-followed-countries` },
          { label: "Trade Zone View", href: `${BASE}/feed/by-country/trade-zone-view` },
          { label: "Country Momentum Score", href: `${BASE}/feed/by-country/country-momentum-score` },
        ],
      },
      {
        title: "By Content Stream",
        items: [
          { label: "RSS AI Articles", href: `${BASE}/feed/by-content-stream/rss-ai-articles` },
          { label: "Manual AI Authority Articles", href: `${BASE}/feed/by-content-stream/manual-ai-articles` },
          { label: "Breaking Trade Updates", href: `${BASE}/feed/by-content-stream/breaking-trade-updates` },
          { label: "QC Verified Articles", href: `${BASE}/feed/by-content-stream/qc-verified-articles` },
          { label: "Most Discussed Today", href: `${BASE}/feed/by-content-stream/most-discussed-today` },
        ],
      },
      {
        title: "Social Signals",
        items: [
          { label: "Most Liked Today", href: `${BASE}/feed/social-signals/most-liked-today` },
          { label: "Most Commented", href: `${BASE}/feed/social-signals/most-commented` },
          { label: "Most Shared", href: `${BASE}/feed/social-signals/most-shared` },
          { label: "Articles with Leader Quotes", href: `${BASE}/feed/social-signals/articles-with-leader-quotes` },
          { label: "Community Picks (FPC Curated)", href: `${BASE}/feed/social-signals/community-picks` },
        ],
      },
    ],
  },
  {
    id: 2,
    icon: "🟢",
    name: "Headlines",
    slug: "headlines",
    type: "Authority Engine",
    upgradeHook: "Download industry briefs. Upgrade to Pro.",
    columns: [
      {
        title: "Editor's Desk",
        items: [
          { label: "Top Industry Stories", href: `${BASE}/headlines/editors-desk/top-industry-stories` },
          { label: "Policy Impact Headlines", href: `${BASE}/headlines/editors-desk/policy-impact-headlines` },
          { label: "Export-Import Signals", href: `${BASE}/headlines/editors-desk/export-import-signals` },
          { label: "Industry Risk Alerts", href: `${BASE}/headlines/editors-desk/industry-risk-alerts` },
          { label: "Regulatory Highlights", href: `${BASE}/headlines/editors-desk/regulatory-highlights` },
        ],
      },
      {
        title: "Leader Mentions",
        items: [
          { label: "CEO Headlines", href: `${BASE}/headlines/leader-mentions/ceo-headlines` },
          { label: "CFO Headlines", href: `${BASE}/headlines/leader-mentions/cfo-headlines` },
          { label: "Founder Headlines", href: `${BASE}/headlines/leader-mentions/founder-headlines` },
          { label: "CXO Movements", href: `${BASE}/headlines/leader-mentions/cxo-movements` },
          { label: "Government Trade Officials", href: `${BASE}/headlines/leader-mentions/government-trade-officials` },
        ],
      },
      {
        title: "Corporate Spotlight",
        items: [
          { label: "Major Corporate Announcements", href: `${BASE}/headlines/corporate-spotlight/major-corporate-announcements` },
          { label: "Corporate Expansion Moves", href: `${BASE}/headlines/corporate-spotlight/corporate-expansion-moves` },
          { label: "M&A Highlights", href: `${BASE}/headlines/corporate-spotlight/ma-highlights` },
          { label: "Corporate Earnings Signals", href: `${BASE}/headlines/corporate-spotlight/corporate-earnings-signals` },
          { label: "Industry Entry / Exit", href: `${BASE}/headlines/corporate-spotlight/industry-entry-exit` },
        ],
      },
      {
        title: "Trade Intelligence Highlights",
        items: [
          { label: "Top 10 Today", href: `${BASE}/headlines/trade-intelligence-highlights/top-10-today` },
          { label: "Weekly Strategic Signals", href: `${BASE}/headlines/trade-intelligence-highlights/weekly-strategic-signals` },
          { label: "High Impact Trade Developments", href: `${BASE}/headlines/trade-intelligence-highlights/high-impact-trade-developments` },
          { label: "Industry Disruption Alerts", href: `${BASE}/headlines/trade-intelligence-highlights/industry-disruption-alerts` },
          { label: "Strategic Long Reads", href: `${BASE}/headlines/trade-intelligence-highlights/strategic-long-reads` },
        ],
      },
    ],
  },
  {
    id: 3,
    icon: "🔥",
    name: "Trending",
    slug: "trending",
    type: "Momentum Engine",
    upgradeHook: "See full engagement analytics with Pro.",
    columns: [
      {
        title: "By Engagement Signals",
        items: [
          { label: "Most Read Today", href: `${BASE}/trending/by-engagement-signals/most-read-today` },
          { label: "Most Liked", href: `${BASE}/trending/by-engagement-signals/most-liked` },
          { label: "Most Bookmarked", href: `${BASE}/trending/by-engagement-signals/most-bookmarked` },
          { label: "Most Commented", href: `${BASE}/trending/by-engagement-signals/most-commented` },
          { label: "Fastest Rising Article", href: `${BASE}/trending/by-engagement-signals/fastest-rising-article` },
        ],
      },
      {
        title: "By Sector Momentum",
        items: [
          { label: "Sector Heat Map", href: `${BASE}/trending/by-sector-momentum/sector-heat-map` },
          { label: "Fastest Growing Sector", href: `${BASE}/trending/by-sector-momentum/fastest-growing-sector` },
          { label: "Sector Engagement Index", href: `${BASE}/trending/by-sector-momentum/sector-engagement-index` },
          { label: "Weekly Sector Competition", href: `${BASE}/trending/by-sector-momentum/weekly-sector-competition` },
          { label: "Quietest Sector (Opportunity)", href: `${BASE}/trending/by-sector-momentum/quietest-sector` },
        ],
      },
      {
        title: "By Search Behavior",
        items: [
          { label: "Rising Keywords", href: `${BASE}/trending/by-search-behavior/rising-keywords` },
          { label: "Bilateral Buzz", href: `${BASE}/trending/by-search-behavior/bilateral-buzz` },
          { label: "Leader Name Trending", href: `${BASE}/trending/by-search-behavior/leader-name-trending` },
          { label: "Industry Search Spikes", href: `${BASE}/trending/by-search-behavior/industry-search-spikes` },
          { label: "Export Trend Keywords", href: `${BASE}/trending/by-search-behavior/export-trend-keywords` },
        ],
      },
      {
        title: "Time Filters",
        items: [
          { label: "Trending Now", href: `${BASE}/trending/time-filters/trending-now` },
          { label: "Today", href: `${BASE}/trending/time-filters/today` },
          { label: "This Week", href: `${BASE}/trending/time-filters/this-week` },
          { label: "This Month", href: `${BASE}/trending/time-filters/this-month` },
          { label: "All Time", href: `${BASE}/trending/time-filters/all-time` },
        ],
      },
    ],
  },
  {
    id: 4,
    icon: "🏭",
    name: "Sector News",
    slug: "sector-news",
    type: "20 Sector Intelligence Hubs",
    upgradeHook: "Access full sector reports.",
    columns: [
      {
        title: "20 Sector Hubs",
        items: [
          { label: "All 20 Sectors", href: `${BASE}/sector-news` },
        ],
      },
      {
        title: "Sector Intelligence",
        items: [
          { label: "Sector Overview Page", href: `${BASE}/sector-news/sector-intelligence/sector-overview` },
          { label: "Top Industries in Sector", href: `${BASE}/sector-news/sector-intelligence/top-industries` },
          { label: "Export Leaders", href: `${BASE}/sector-news/sector-intelligence/export-leaders` },
          { label: "Import Signals", href: `${BASE}/sector-news/sector-intelligence/import-signals` },
          { label: "Sector Ranking Index", href: `${BASE}/sector-news/sector-intelligence/sector-ranking-index` },
        ],
      },
      {
        title: "Sector Engagement",
        items: [
          { label: "Most Engaged Articles", href: `${BASE}/sector-news/sector-engagement/most-engaged-articles` },
          { label: "Leader Voices in Sector", href: `${BASE}/sector-news/sector-engagement/leader-voices` },
          { label: "Corporate Presence", href: `${BASE}/sector-news/sector-engagement/corporate-presence` },
          { label: "Sector Polls", href: `${BASE}/sector-news/sector-engagement/sector-polls` },
          { label: "FLC Insights", href: `${BASE}/sector-news/sector-engagement/flc-insights` },
        ],
      },
      {
        title: "Sector Reports",
        items: [
          { label: "Quarterly Sector Report (Pro+)", href: `${BASE}/sector-news/sector-reports/quarterly-sector-report` },
          { label: "Industry Depth Brief", href: `${BASE}/sector-news/sector-reports/industry-depth-brief` },
          { label: "Risk Dashboard", href: `${BASE}/sector-news/sector-reports/risk-dashboard` },
          { label: "Sector Outlook", href: `${BASE}/sector-news/sector-reports/sector-outlook` },
          { label: "Sector Leader Directory", href: `${BASE}/sector-news/sector-reports/sector-leader-directory` },
        ],
      },
    ],
  },
  {
    id: 5,
    icon: "🌍",
    name: "Country News",
    slug: "country-news",
    type: "195 Bilateral Trade Architecture",
    upgradeHook: "Follow unlimited countries.",
    columns: [
      {
        title: "195 Bilateral Pages",
        items: [
          { label: "All 195 Country Pages", href: `${BASE}/country-news` },
        ],
      },
      {
        title: "Trade Insights",
        items: [
          { label: "Export Signals", href: `${BASE}/country-news/trade-insights/export-signals` },
          { label: "Import Trends", href: `${BASE}/country-news/trade-insights/import-trends` },
          { label: "Bilateral Policy Updates", href: `${BASE}/country-news/trade-insights/bilateral-policy-updates` },
          { label: "Trade Agreements", href: `${BASE}/country-news/trade-insights/trade-agreements` },
          { label: "Investment Activity", href: `${BASE}/country-news/trade-insights/investment-activity` },
        ],
      },
      {
        title: "Country Ranking",
        items: [
          { label: "Most Active Trade Partners", href: `${BASE}/country-news/country-ranking/most-active-trade-partners` },
          { label: "Fastest Growing Countries", href: `${BASE}/country-news/country-ranking/fastest-growing-countries` },
          { label: "Sector-wise Country Map", href: `${BASE}/country-news/country-ranking/sector-wise-country-map` },
          { label: "Trade Deficit Watch", href: `${BASE}/country-news/country-ranking/trade-deficit-watch` },
          { label: "Opportunity Countries", href: `${BASE}/country-news/country-ranking/opportunity-countries` },
        ],
      },
      {
        title: "Country Leaders",
        items: [
          { label: "Country-wise CEOs", href: `${BASE}/country-news/country-leaders/country-wise-ceos` },
          { label: "Trade Secretaries", href: `${BASE}/country-news/country-leaders/trade-secretaries` },
          { label: "Embassy Mentions", href: `${BASE}/country-news/country-leaders/embassy-mentions` },
          { label: "Diplomatic Signals", href: `${BASE}/country-news/country-leaders/diplomatic-signals` },
          { label: "Bilateral Events", href: `${BASE}/country-news/country-leaders/bilateral-events` },
        ],
      },
    ],
  },
  {
    id: 6,
    icon: "👔",
    name: "Leader News",
    slug: "leader-news",
    type: "25 Leadership Designations",
    columns: [
      {
        title: "By Designation (25 Types)",
        items: [
          { label: "CEO News", href: `${BASE}/leader-news/by-designation/ceo` },
          { label: "CFO News", href: `${BASE}/leader-news/by-designation/cfo` },
          { label: "CTO News", href: `${BASE}/leader-news/by-designation/cto` },
          { label: "Founder News", href: `${BASE}/leader-news/by-designation/founder` },
          { label: "Chairman News", href: `${BASE}/leader-news/by-designation/chairman` },
          { label: "Trade Secretary News", href: `${BASE}/leader-news/by-designation/trade-secretary` },
          { label: "CHRO / CIO / CSO", href: `${BASE}/leader-news/by-designation/chro-cio-cso` },
        ],
      },
      {
        title: "Leader Profiles",
        items: [
          { label: "Emerging Leaders", href: `${BASE}/leader-news/leader-profiles/emerging-leaders` },
          { label: "Charter Leaders (FLC)", href: `${BASE}/leader-news/leader-profiles/charter-leaders-flc` },
          { label: "Most Active Leaders", href: `${BASE}/leader-news/leader-profiles/most-active-leaders` },
          { label: "Leader Rankings", href: `${BASE}/leader-news/leader-profiles/leader-rankings` },
          { label: "Leader Spotlight", href: `${BASE}/leader-news/leader-profiles/leader-spotlight` },
        ],
      },
      {
        title: "Leader Insights",
        items: [
          { label: "Monthly Published Insights", href: `${BASE}/leader-news/leader-insights/monthly-published-insights` },
          { label: "Most Discussed Leader Articles", href: `${BASE}/leader-news/leader-insights/most-discussed-leader-articles` },
          { label: "Leader Interviews", href: `${BASE}/leader-news/leader-insights/leader-interviews` },
          { label: "Podcast Features", href: `${BASE}/leader-news/leader-insights/podcast-features` },
          { label: "AMA Sessions", href: `${BASE}/leader-news/leader-insights/ama-sessions` },
        ],
      },
      {
        title: "Leader Reputation Tools",
        items: [
          { label: "Claim Your Profile", href: `${BASE}/leader-news/leader-reputation-tools/claim-your-profile` },
          { label: "Build SEO Presence", href: `${BASE}/leader-news/leader-reputation-tools/build-seo-presence` },
          { label: "Publish Your Insight", href: `${BASE}/leader-news/leader-reputation-tools/publish-your-insight` },
          { label: "Leader Verification", href: `${BASE}/leader-news/leader-reputation-tools/leader-verification` },
          { label: "Upgrade to Emerging Leader", href: `${BASE}/leader-news/leader-reputation-tools/upgrade-to-emerging-leader` },
        ],
      },
    ],
  },
  {
    id: 7,
    icon: "💎",
    name: "Reader Plans",
    slug: "reader-plans",
    type: "Revenue Ladder",
    columns: [
      {
        title: "Free Plan",
        items: [
          { label: "What You Get", href: `${BASE}/reader-plans/free-plan/what-you-get` },
          { label: "Feature Limits", href: `${BASE}/reader-plans/free-plan/feature-limits` },
          { label: "Upgrade Comparison", href: `${BASE}/reader-plans/free-plan/upgrade-comparison` },
          { label: "Community Access", href: `${BASE}/reader-plans/free-plan/community-access` },
          { label: "FAQs", href: `${BASE}/reader-plans/free-plan/faqs` },
        ],
      },
      {
        title: "Pro Reader",
        items: [
          { label: "Structured Follow Limits", href: `${BASE}/reader-plans/pro-reader/structured-follow-limits` },
          { label: "Download Briefs", href: `${BASE}/reader-plans/pro-reader/download-briefs` },
          { label: "Advanced Filters", href: `${BASE}/reader-plans/pro-reader/advanced-filters` },
          { label: "Bookmark Library", href: `${BASE}/reader-plans/pro-reader/bookmark-library` },
          { label: "Upgrade CTA", href: `${BASE}/reader-plans/pro-reader/upgrade-cta` },
        ],
      },
      {
        title: "Emerging Leader",
        items: [
          { label: "Leader Profile", href: `${BASE}/reader-plans/emerging-leader/leader-profile` },
          { label: "Monthly Insight", href: `${BASE}/reader-plans/emerging-leader/monthly-insight` },
          { label: "Verified Badge", href: `${BASE}/reader-plans/emerging-leader/verified-badge` },
          { label: "SEO Advantage", href: `${BASE}/reader-plans/emerging-leader/seo-advantage` },
          { label: "Charter Leader Access", href: `${BASE}/reader-plans/emerging-leader/charter-leader-access` },
        ],
      },
      {
        title: "Corporate Plan",
        items: [
          { label: "Corporate Profile", href: `${BASE}/reader-plans/corporate-plan/corporate-profile` },
          { label: "Multi-user Access", href: `${BASE}/reader-plans/corporate-plan/multi-user-access` },
          { label: "Corporate Visibility", href: `${BASE}/reader-plans/corporate-plan/corporate-visibility` },
          { label: "Founding Corporate Partner", href: `${BASE}/reader-plans/corporate-plan/founding-corporate-partner` },
          { label: "Schedule Consultation", href: `${BASE}/reader-plans/corporate-plan/schedule-consultation` },
        ],
      },
    ],
  },
  {
    id: 8,
    icon: "🤖",
    name: "AI Plus",
    slug: "ai-plus",
    type: "Premium Intelligence Layer",
    columns: [
      {
        title: "Smart Monitoring",
        items: [
          { label: "AI Industry Tracker", href: `${BASE}/ai-plus/smart-monitoring/ai-industry-tracker` },
          { label: "Country Watch Alerts", href: `${BASE}/ai-plus/smart-monitoring/country-watch-alerts` },
          { label: "Leader Activity Monitor", href: `${BASE}/ai-plus/smart-monitoring/leader-activity-monitor` },
          { label: "Custom Alerts", href: `${BASE}/ai-plus/smart-monitoring/custom-alerts` },
          { label: "Smart Digest", href: `${BASE}/ai-plus/smart-monitoring/smart-digest` },
        ],
      },
      {
        title: "Predictive Signals",
        items: [
          { label: "Industry Momentum Index", href: `${BASE}/ai-plus/predictive-signals/industry-momentum-index` },
          { label: "Sector Growth Forecast", href: `${BASE}/ai-plus/predictive-signals/sector-growth-forecast` },
          { label: "Trade Sentiment Score", href: `${BASE}/ai-plus/predictive-signals/trade-sentiment-score` },
          { label: "Risk Indicator", href: `${BASE}/ai-plus/predictive-signals/risk-indicator` },
          { label: "Early Disruption Alerts", href: `${BASE}/ai-plus/predictive-signals/early-disruption-alerts` },
        ],
      },
      {
        title: "Smart Research Tools",
        items: [
          { label: "AI Industry Summary", href: `${BASE}/ai-plus/smart-research-tools/ai-industry-summary` },
          { label: "Country Trade Snapshot", href: `${BASE}/ai-plus/smart-research-tools/country-trade-snapshot` },
          { label: "Leader Summary Generator", href: `${BASE}/ai-plus/smart-research-tools/leader-summary-generator` },
          { label: "Article Summary Tool", href: `${BASE}/ai-plus/smart-research-tools/article-summary-tool` },
          { label: "Comparative Analysis Tool", href: `${BASE}/ai-plus/smart-research-tools/comparative-analysis-tool` },
        ],
      },
      {
        title: "AI Personalisation",
        items: [
          { label: "My AI Feed", href: `${BASE}/ai-plus/ai-personalisation/my-ai-feed` },
          { label: "Auto Curated Daily Digest", href: `${BASE}/ai-plus/ai-personalisation/auto-curated-daily-digest` },
          { label: "Smart Recommendations", href: `${BASE}/ai-plus/ai-personalisation/smart-recommendations` },
          { label: "Predictive Interest Mapping", href: `${BASE}/ai-plus/ai-personalisation/predictive-interest-mapping` },
          { label: "AI Bookmark Suggestions", href: `${BASE}/ai-plus/ai-personalisation/ai-bookmark-suggestions` },
        ],
      },
    ],
  },
  {
    id: 9,
    icon: "🏆",
    name: "Top News",
    slug: "top-news",
    type: "Future Revenue Engine",
    columns: [
      {
        title: "Podcast",
        items: [
          { label: "Weekly Trade Podcast", href: `${BASE}/top-news/podcast/weekly-trade-podcast` },
          { label: "Leader Interviews", href: `${BASE}/top-news/podcast/leader-interviews` },
          { label: "Sector Focus Series", href: `${BASE}/top-news/podcast/sector-focus-series` },
          { label: "Corporate Voices", href: `${BASE}/top-news/podcast/corporate-voices` },
          { label: "FLC Special Episodes", href: `${BASE}/top-news/podcast/flc-special-episodes` },
        ],
      },
      {
        title: "Top Company News",
        items: [
          { label: "Top Corporate Moves", href: `${BASE}/top-news/top-company-news/top-corporate-moves` },
          { label: "Fastest Growing Companies", href: `${BASE}/top-news/top-company-news/fastest-growing-companies` },
          { label: "Corporate Spotlight", href: `${BASE}/top-news/top-company-news/corporate-spotlight` },
          { label: "Earnings Highlights", href: `${BASE}/top-news/top-company-news/earnings-highlights` },
          { label: "Industry Dominators", href: `${BASE}/top-news/top-company-news/industry-dominators` },
        ],
      },
      {
        title: "Top Leader News",
        items: [
          { label: "Most Influential Leaders", href: `${BASE}/top-news/top-leader-news/most-influential-leaders` },
          { label: "Leader Momentum Index", href: `${BASE}/top-news/top-leader-news/leader-momentum-index` },
          { label: "Leader of the Month", href: `${BASE}/top-news/top-leader-news/leader-of-the-month` },
          { label: "Rising Industry Voices", href: `${BASE}/top-news/top-leader-news/rising-industry-voices` },
          { label: "FLC Highlights", href: `${BASE}/top-news/top-leader-news/flc-highlights` },
        ],
      },
      {
        title: "Top Country News",
        items: [
          { label: "Most Active Trade Country", href: `${BASE}/top-news/top-country-news/most-active-trade-country` },
          { label: "Country Spotlight of the Month", href: `${BASE}/top-news/top-country-news/country-spotlight-of-the-month` },
          { label: "Bilateral Growth Leader", href: `${BASE}/top-news/top-country-news/bilateral-growth-leader` },
          { label: "Strategic Trade Region", href: `${BASE}/top-news/top-country-news/strategic-trade-region` },
          { label: "Investment Focus Country", href: `${BASE}/top-news/top-country-news/investment-focus-country` },
        ],
      },
    ],
  },
  {
    id: 10,
    icon: "📊",
    name: "Trade Intelligence Lab",
    slug: "trade-intelligence-lab",
    type: "Research Authority Engine",
    columns: [
      {
        title: "Industry Reports",
        items: [
          { label: "Quarterly Reports", href: `${BASE}/trade-intelligence-lab/industry-reports/quarterly-reports` },
          { label: "Sector Reports", href: `${BASE}/trade-intelligence-lab/industry-reports/sector-reports` },
          { label: "Country Intelligence", href: `${BASE}/trade-intelligence-lab/industry-reports/country-intelligence` },
          { label: "Risk Analysis", href: `${BASE}/trade-intelligence-lab/industry-reports/risk-analysis` },
          { label: "Export Opportunity Maps", href: `${BASE}/trade-intelligence-lab/industry-reports/export-opportunity-maps` },
        ],
      },
      {
        title: "Rankings",
        items: [
          { label: "Industry Growth Ranking", href: `${BASE}/trade-intelligence-lab/rankings/industry-growth-ranking` },
          { label: "Leader Ranking", href: `${BASE}/trade-intelligence-lab/rankings/leader-ranking` },
          { label: "Corporate Ranking", href: `${BASE}/trade-intelligence-lab/rankings/corporate-ranking` },
          { label: "Sector Activity Ranking", href: `${BASE}/trade-intelligence-lab/rankings/sector-activity-ranking` },
          { label: "Country Trade Ranking", href: `${BASE}/trade-intelligence-lab/rankings/country-trade-ranking` },
        ],
      },
      {
        title: "Surveys & Polls",
        items: [
          { label: "Industry Sentiment Poll", href: `${BASE}/trade-intelligence-lab/surveys-and-polls/industry-sentiment-poll` },
          { label: "Export Outlook Survey", href: `${BASE}/trade-intelligence-lab/surveys-and-polls/export-outlook-survey` },
          { label: "Leader Confidence Index", href: `${BASE}/trade-intelligence-lab/surveys-and-polls/leader-confidence-index` },
          { label: "Corporate Outlook", href: `${BASE}/trade-intelligence-lab/surveys-and-polls/corporate-outlook` },
          { label: "Annual Trade Survey", href: `${BASE}/trade-intelligence-lab/surveys-and-polls/annual-trade-survey` },
        ],
      },
      {
        title: "Whitepapers",
        items: [
          { label: "Sponsored Reports", href: `${BASE}/trade-intelligence-lab/whitepapers/sponsored-reports` },
          { label: "Corporate Whitepapers", href: `${BASE}/trade-intelligence-lab/whitepapers/corporate-whitepapers` },
          { label: "Trade Outlook Books", href: `${BASE}/trade-intelligence-lab/whitepapers/trade-outlook-books` },
          { label: "Annual Intelligence Book", href: `${BASE}/trade-intelligence-lab/whitepapers/annual-intelligence-book` },
          { label: "Download Centre", href: `${BASE}/trade-intelligence-lab/whitepapers/download-centre` },
        ],
      },
    ],
  },
  {
    id: 11,
    icon: "🌐",
    name: "Community",
    slug: "community",
    type: "Prestige & Retention Engine",
    columns: [
      {
        title: "FPC — Founding Professionals",
        items: [
          { label: "Founding Wall", href: `${BASE}/community/fpc/founding-wall` },
          { label: "FPC Directory", href: `${BASE}/community/fpc/fpc-directory` },
          { label: "Top FPC Contributors", href: `${BASE}/community/fpc/top-fpc-contributors` },
          { label: "Quarterly Meet Info", href: `${BASE}/community/fpc/quarterly-meet-info` },
          { label: "Recognition Certificates", href: `${BASE}/community/fpc/recognition-certificates` },
        ],
      },
      {
        title: "FLC — Founding Leaders",
        items: [
          { label: "Charter Leaders", href: `${BASE}/community/flc/charter-leaders` },
          { label: "Leader Spotlight", href: `${BASE}/community/flc/leader-spotlight` },
          { label: "Leader Roundtable", href: `${BASE}/community/flc/leader-roundtable` },
          { label: "Podcast Guests", href: `${BASE}/community/flc/podcast-guests` },
          { label: "Public Recognition Posts", href: `${BASE}/community/flc/public-recognition-posts` },
        ],
      },
      {
        title: "FCC — Founding Corporate",
        items: [
          { label: "Founding Corporate Partners", href: `${BASE}/community/fcc/founding-corporate-partners` },
          { label: "Corporate Spotlight", href: `${BASE}/community/fcc/corporate-spotlight` },
          { label: "Corporate Roundtable", href: `${BASE}/community/fcc/corporate-roundtable` },
          { label: "Co-Branded Briefs", href: `${BASE}/community/fcc/co-branded-briefs` },
          { label: "Recognition Seal", href: `${BASE}/community/fcc/recognition-seal` },
        ],
      },
      {
        title: "Discussions",
        items: [
          { label: "Industry Discussion Threads", href: `${BASE}/community/discussions/industry-discussion-threads` },
          { label: "Country Discussion", href: `${BASE}/community/discussions/country-discussion` },
          { label: "Leader AMA", href: `${BASE}/community/discussions/leader-ama` },
          { label: "Corporate Announcements", href: `${BASE}/community/discussions/corporate-announcements` },
          { label: "Suggest Industry Coverage", href: `${BASE}/community/discussions/suggest-industry-coverage` },
        ],
      },
    ],
  },
  {
    id: 12,
    icon: "👤",
    name: "My TradeNews",
    slug: "my-tradenews",
    type: "Personal Dashboard",
    columns: [
      {
        title: "My Dashboard",
        items: [
          { label: "My Followed Sectors", href: `${BASE}/my-tradenews/my-dashboard/my-followed-sectors` },
          { label: "My Industries", href: `${BASE}/my-tradenews/my-dashboard/my-industries` },
          { label: "My Countries", href: `${BASE}/my-tradenews/my-dashboard/my-countries` },
          { label: "My Leaders", href: `${BASE}/my-tradenews/my-dashboard/my-leaders` },
          { label: "My Alerts", href: `${BASE}/my-tradenews/my-dashboard/my-alerts` },
        ],
      },
      {
        title: "My Activity",
        items: [
          { label: "My Likes", href: `${BASE}/my-tradenews/my-activity/my-likes` },
          { label: "My Comments", href: `${BASE}/my-tradenews/my-activity/my-comments` },
          { label: "My Shares", href: `${BASE}/my-tradenews/my-activity/my-shares` },
          { label: "My Bookmarks", href: `${BASE}/my-tradenews/my-activity/my-bookmarks` },
          { label: "My Reading History", href: `${BASE}/my-tradenews/my-activity/my-reading-history` },
        ],
      },
      {
        title: "My Contributions",
        items: [
          { label: "My Published Insights", href: `${BASE}/my-tradenews/my-contributions/my-published-insights` },
          { label: "My Drafts", href: `${BASE}/my-tradenews/my-contributions/my-drafts` },
          { label: "My Leader Page", href: `${BASE}/my-tradenews/my-contributions/my-leader-page` },
          { label: "My Corporate Page", href: `${BASE}/my-tradenews/my-contributions/my-corporate-page` },
          { label: "My Engagement Score", href: `${BASE}/my-tradenews/my-contributions/my-engagement-score` },
        ],
      },
      {
        title: "My Analytics (Pro+)",
        items: [
          { label: "Engagement Stats", href: `${BASE}/my-tradenews/my-analytics/engagement-stats` },
          { label: "Article Reach", href: `${BASE}/my-tradenews/my-analytics/article-reach` },
          { label: "Follower Count", href: `${BASE}/my-tradenews/my-analytics/follower-count` },
          { label: "Sector Influence", href: `${BASE}/my-tradenews/my-analytics/sector-influence` },
          { label: "Reputation Score", href: `${BASE}/my-tradenews/my-analytics/reputation-score` },
        ],
      },
    ],
  },
];
