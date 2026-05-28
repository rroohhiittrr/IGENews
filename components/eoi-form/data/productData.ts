// IGEN EOI Form — Product Data
// All 15 products with info panel content and thank-you screen content

export interface ProductInfo {
  name: string;
  platform: "IGEN NEWS" | "IGEN EXPO" | "IGEN COMMON";
  icon: string;
  headline: string;
  benefits: string[];
  fomo: string;
  cta: string;
  description: string;
}

export interface ThankYouContent {
  headline: string;
  next_steps: string[];
  cta_label: string;
  cta_url: string;
  share_message: string;
}

export type ProductId =
  | "sme_page"
  | "associate_sme"
  | "company_page"
  | "leader_page"
  | "reader_plan"
  | "indian_exporter"
  | "global_importer"
  | "global_exporter"
  | "indian_importer"
  | "service_provider"
  | "igen_awards"
  | "viksit_bharat_conf"
  | "affiliate_partner"
  | "reseller_partner"
  | "founding_stakeholder";

export const PRODUCT_INFO: Record<ProductId, ProductInfo> = {
  sme_page: {
    name: "SME Page",
    platform: "IGEN NEWS",
    icon: "🏆",
    headline: "Your 20 Years of Experience Deserves a National Stage.",
    benefits: [
      "Get Discovered by Companies, Investors & Industry Leaders",
      "Thought Leadership Articles — Build Your Authority",
      "Consulting Marketplace — Earn from Your Expertise",
      "Sector Business Report Writing — ₹10K–₹25K per page",
      "Opportunity to Become an Industry Awards Judge",
      "Top SME Ranking — Daily Visibility on Platform",
    ],
    fomo: "Only 100 Founding SME Slots — Year 1 Membership is FREE for the first 100.",
    cta: "Apply as a Founding SME",
    description: "Establish your authority as a verified sector expert. Fill in your professional background and areas of expertise to share thought leadership and join the consulting marketplace.",
  },

  associate_sme: {
    name: "Associate SME Page",
    platform: "IGEN NEWS",
    icon: "🌱",
    headline: "Build Your Industry Identity Before You Become the Top SME.",
    benefits: [
      "Visibility as an Emerging Industry Expert",
      "Entry into the Consulting Marketplace",
      "Association with Top SMEs in Your Sector",
      "City-Level Networking & Partnership Opportunities",
      "Path to Full SME Status as Your Profile Grows",
      "Founding Member Badge — Be First in Your City",
    ],
    fomo: "Associate SME applications are being screened carefully. First 100 spots go through due diligence.",
    cta: "Apply as Associate SME",
    description: "Build your professional identity and emerging sector visibility. Fill in your current industry role, sectors of work, and professional goals.",
  },

  company_page: {
    name: "Company Page",
    platform: "IGEN NEWS",
    icon: "🏢",
    headline: "Build India's Most Trusted Digital Company Identity.",
    benefits: [
      "Verified Company Profile — Blue Tick Trust Credential",
      "Google-Indexed Company Page with SEO Schema",
      "Investor, Employee, Stakeholder & Brand Sub-tabs",
      "Bundled Free Leader Pages for Your Executives",
      "Sector Ranking Visibility — Be Discovered by Buyers",
      "Award Badges — Win and Display on Your Page",
    ],
    fomo: "Founding Company Pages get permanent front-page discovery advantage in their sector.",
    cta: "Register Company Interest",
    description: "Create a verified, SEO-ready company page to build digital trust. Fill in company legal details, founding year, employee count, and sector information.",
  },

  leader_page: {
    name: "Leader Page",
    platform: "IGEN NEWS",
    icon: "👔",
    headline: "Your Leadership Profile Must Work as Hard as You Do.",
    benefits: [
      "Executive Identity Page — CEO, CFO, CTO, Founder, MD",
      "Discoverable by Investors, Board Committees & Executive Search",
      "Thought Leadership Publishing on India's Industry Platform",
      "Page Portability — Your Page Travels With You",
      "Speaking Authority on IGEN Events & Conferences",
      "Leadership Awards Nomination — Permanent Credential",
    ],
    fomo: "Founding Leader Pages get priority nomination in the inaugural IGEN Awards cycle.",
    cta: "Claim Your Leader Page",
    description: "Publish thought leadership and build personal executive brand. Fill in designation, company, industry sector, and leadership goals.",
  },

  reader_plan: {
    name: "Reader Upgrade Plan",
    platform: "IGEN NEWS",
    icon: "📰",
    headline: "Stop Being Overwhelmed. Start Making Smarter Industry Decisions.",
    benefits: [
      "AI-Curated News Across 50 Sectors — No Noise",
      "Trade Intelligence Reports — Country & Sector Level",
      "SME Consulting Access — Book Industry Experts",
      "Founding Member Recognition — First 500 Readers",
      "Early Access to IGEN Awards & Conference Programs",
      "Sector Discovery — Find Companies, Leaders & SMEs",
    ],
    fomo: "First 500 Founding Readers get permanent Founding Member recognition badge.",
    cta: "Join as Founding Reader",
    description: "Subscribe to premium AI-curated sector intelligence and bilateral reports. Fill in sectors of interest, news consumption channels, and reason for upgrading.",
  },

  indian_exporter: {
    name: "Indian Exporters Page",
    platform: "IGEN EXPO",
    icon: "🚢",
    headline: "Get Discovered by Buyers in 195 Countries.",
    benefits: [
      "Verified Indian Exporter Profile — Global Discoverability",
      "195-Country Trade Intelligence — Know Your Best Markets",
      "Bilateral Trade Insights — Sector-Wise Export Data",
      "Government Policy Alerts — Stay Ahead of Regulations",
      "Export Opportunity Alerts — Real-Time Buyer Signals",
      "Sector Ranking — Be the First Exporter Buyers Find",
    ],
    fomo: "Founding Exporter pages get top-ranked discovery in their sector at launch.",
    cta: "Register Exporter Interest",
    description: "Get discovered by international buyers across 195 countries. Fill in company legal name, export products, destination markets, and IEC details.",
  },

  global_importer: {
    name: "Global Importers Page",
    platform: "IGEN EXPO",
    icon: "🌐",
    headline: "Discover India's Most Verified Suppliers — All in One Place.",
    benefits: [
      "India Sourcing Intelligence — 50 Sectors, 1200 Industries",
      "Verified Indian Supplier Discovery — Trust First",
      "Bilateral Trade Data — Make Data-Driven Sourcing Decisions",
      "SME Expert Consultation — Book India Sector Specialists",
      "Quality Verification Signals — Blue-Tick Suppliers",
      "Direct Connection to Indian Exporters on Platform",
    ],
    fomo: "Register early to get first-mover supplier matching when the platform launches.",
    cta: "Register Importer Interest",
    description: "Connect with verified Indian suppliers across top industries. Fill in country, sourcing products, sectors of interest, and supplier matching criteria.",
  },

  global_exporter: {
    name: "Global Exporters Page",
    platform: "IGEN EXPO",
    icon: "✈️",
    headline: "Enter India's Fastest-Growing Market with Intelligence.",
    benefits: [
      "India Market Entry Intelligence — Regulations, Tariffs, Buyers",
      "Indian Buyer Discovery — 50 Sectors, Verified Importers",
      "Compliance & Regulatory Intelligence — Export-Ready",
      "Sector-Wise Indian Market Demand Data",
      "Direct Access to Indian Importer Profiles",
      "Trade Zone Intelligence — ASEAN, EU, GCC Cross-Border Data",
    ],
    fomo: "Early registrations get priority matching with Indian importers at platform launch.",
    cta: "Register Global Export Interest",
    description: "Analyze target Indian importers and trade compliance details. Fill in country of origin, products to export, target Indian sector, and market challenge.",
  },

  indian_importer: {
    name: "Indian Importers Page",
    platform: "IGEN EXPO",
    icon: "📦",
    headline: "Source Globally. Import Intelligently.",
    benefits: [
      "Global Supplier Discovery — 195-Country Coverage",
      "Import Intelligence — Tariffs, Duties, Compliance Alerts",
      "Verified Global Supplier Profiles",
      "Bilateral Trade Data — Best Source Countries by Sector",
      "EXIM Compliance Alerts — Never Miss a Policy Change",
      "Sector Expert Consultation — Import Strategy Sessions",
    ],
    fomo: "Founding Indian Importer profiles get early access to global supplier matching engine.",
    cta: "Register Importer Interest",
    description: "Source products globally and navigate customs duties easily. Fill in company name, current products imported, countries sourced from, and IEC status.",
  },

  service_provider: {
    name: "Service Providers Page",
    platform: "IGEN EXPO",
    icon: "🤝",
    headline: "Be the First Service Provider Exporters & Importers Find.",
    benefits: [
      "Lead Generation Engine — Buyers Find YOU",
      "Verified Service Profile — EXIM-Focused Trust Signal",
      "Industry Networking — Connect with Exporters & Importers",
      "Sector-Specific Discovery — Appear in Right Industry Context",
      "IGEN Expo Event Participation Priority",
      "Awards & Recognition — Service Excellence Category",
    ],
    fomo: "Service Provider pages at launch get maximum sector visibility before competition joins.",
    cta: "Register Service Provider Interest",
    description: "Advertise EXIM support, freight, logistics, or trade finance services. Fill in service types offered, sectors served, client base, and registration status.",
  },

  igen_awards: {
    name: "IGEN Awards",
    platform: "IGEN COMMON",
    icon: "🏅",
    headline: "India's Most Comprehensive AI-Hosted Industry Recognition.",
    benefits: [
      "6 Award Categories Per Sector — Leadership, Innovation, Brand, Export, MSME, ESG",
      "City-Wise Award Events Across India",
      "Permanent Award Badge on Your IGEN Page",
      "Verified SME Jury System — Most Credible Recognition",
      "Indexed in Trade Intelligence Lab — Permanent Discovery",
      "Nomination Open First to IGEN Founding Page Holders",
    ],
    fomo: "Founding Members participate in the Inaugural IGEN Awards — the most prestigious first-edition recognition.",
    cta: "Register Awards Interest",
    description: "Nominate your company or leaders for prestigious industry awards. Fill in nominee name, award category, sector, and brief achievement description.",
  },

  viksit_bharat_conf: {
    name: "Viksit Bharat Conference",
    platform: "IGEN COMMON",
    icon: "🇮🇳",
    headline: "India's Vision 2047 Industry Summit. Be There at the Beginning.",
    benefits: [
      "National Industry Conference — Aligned with Viksit Bharat 2047 Mission",
      "Delegate | Speaker | Partner | Sponsor Opportunities",
      "Government Officials, Industry Leaders & Trade Associations",
      "50-Sector Industry Representation",
      "Media Coverage — IGEN News Platform",
      "Networking with India's Top Industry Decision-Makers",
    ],
    fomo: "Founding Conference delegates get reserved seating and inaugural session recognition.",
    cta: "Register Conference Interest",
    description: "Attend as a delegate, speak, or sponsor the Vision 2047 Summit. Fill in organization name, sector represented, speaking/sponsorship interest, and city.",
  },

  affiliate_partner: {
    name: "Affiliate Partner",
    platform: "IGEN COMMON",
    icon: "🔗",
    headline: "Earn by Introducing India's Biggest Industry Ecosystem to Your Network.",
    benefits: [
      "Commission on Every Successful Referral",
      "IGEN-Branded Affiliate Tools & Collateral",
      "Real-Time Referral Tracking Dashboard",
      "Access to All IGEN Brochures & Sales Material",
      "Training & Onboarding by IGEN Team",
      "Scale Unlimited — The Larger Your Network, the Higher Your Earnings",
    ],
    fomo: "Founding Affiliates get priority onboarding and higher commission rates in Year 1.",
    cta: "Apply as Affiliate Partner",
    description: "Refer business owners and professionals and earn referral payouts. Fill in network type, estimated network size, sectors strongest in, and promotion channels.",
  },

  reseller_partner: {
    name: "Reseller Partner",
    platform: "IGEN COMMON",
    icon: "💼",
    headline: "Build Your Business on India's Industry Intelligence Infrastructure.",
    benefits: [
      "Resell IGEN Products in Your City / Region",
      "White-Label or Co-Branded Sales Collateral",
      "Revenue Share on All Products Sold",
      "Dedicated Account Manager from IGEN Team",
      "City Exclusivity Possible for First Resellers",
      "Be Part of India's Largest Industry Ecosystem from Day One",
    ],
    fomo: "Founding Resellers in Tier 1 and Tier 2 cities may get city-level exclusivity — very limited slots.",
    cta: "Apply as Reseller Partner",
    description: "Obtain city exclusivity to resell IGEN products and retain revenue share. Fill in region to resell in, agency name, business type, and sales experience.",
  },

  founding_stakeholder: {
    name: "Founding Stakeholder",
    platform: "IGEN COMMON",
    icon: "🌟",
    headline: "Be Part of Building India's Most Ambitious Industry Intelligence Company.",
    benefits: [
      "Founding Stakeholder Status — Lifetime Recognition",
      "Early Investor or Strategic Partner Consideration",
      "Platform Advisory Input — Shape the IGEN Roadmap",
      "Priority Access to All IGEN Products & Events",
      "Founding Stakeholder Badge — Permanent Platform Identity",
      "Direct Access to Founder Vijay Singh for Strategic Discussion",
    ],
    fomo: "Founding Stakeholder conversations are strictly limited. Request a meeting now.",
    cta: "Express Founding Stakeholder Interest",
    description: "Partner with IGEN's founding core team for strategic growth. Fill in firm name, nature of interest, key contribution, and connection preference.",
  },
};

export const THANK_YOU_CONTENT: Record<ProductId, ThankYouContent> = {
  sme_page: {
    headline: "Welcome to India's Industry Intelligence Platform",
    next_steps: [
      "Our SME Onboarding Team will call you within 24 hours.",
      "You'll receive your Founding SME Application form on WhatsApp + Email.",
      "Your profile will be created and reviewed by our team.",
      "Once approved — your SME Page goes live at launch.",
    ],
    cta_label: "Download SME Brochure",
    cta_url: "https://igensme.com/brochure",
    share_message:
      "I just applied to become a Founding SME on IGEN World! India's first AI-powered industry intelligence platform. Join me → www.igenworld.com",
  },
  associate_sme: {
    headline: "Your Associate SME Application is Received",
    next_steps: [
      "Our team will review your application within 48 hours.",
      "First 100 applications go through a city-validation and due diligence process.",
      "You'll receive a call from our onboarding team.",
      "Approved applicants get their Associate SME Page created at launch.",
    ],
    cta_label: "Learn More About Associate SME",
    cta_url: "https://igensme.com",
    share_message:
      "I just applied as a Founding Associate SME on IGEN World! Be part of India's industry ecosystem → www.igenworld.com",
  },
  company_page: {
    headline: "Your Company Page Application is In",
    next_steps: [
      "An IGEN Account Manager will contact you within 24 hours.",
      "You'll receive the Company Pages brochure with pricing and tier details.",
      "Document requirements will be shared for Blue Tick verification.",
      "Your Company Page will be built and reviewed before platform launch.",
    ],
    cta_label: "View Company Page Benefits",
    cta_url: "https://igennews.com",
    share_message:
      "My company just registered for a Founding Company Page on IGEN World! Digital trust for India's industry → www.igenworld.com",
  },
  leader_page: {
    headline: "Your Leader Page Application is Confirmed",
    next_steps: [
      "Our Leader Page team will reach out within 24 hours.",
      "You'll receive the Leader Pages brochure on WhatsApp + Email.",
      "Profile creation requirements (headshot, bio, LinkedIn) will be shared.",
      "Your Leader Page goes live at platform launch.",
    ],
    cta_label: "View Leader Page Benefits",
    cta_url: "https://igennews.com",
    share_message:
      "I just claimed my Founding Leader Page on IGEN World. Executive identity for India's leaders → www.igenworld.com",
  },
  reader_plan: {
    headline: "You're on the Founding Reader Waitlist!",
    next_steps: [
      "You are among the first to join IGEN as a Founding Reader.",
      "Platform access will be granted when IGEN News goes live.",
      "You'll get a Founding Member badge for being in the first 500.",
      "Watch your inbox for platform launch updates.",
    ],
    cta_label: "Explore IGEN News Platform",
    cta_url: "https://igennews.com",
    share_message:
      "I'm a Founding Reader on IGEN World — India's AI-powered industry intelligence platform! Join me → www.igenworld.com",
  },
  indian_exporter: {
    headline: "Your Exporter Profile Application is Submitted",
    next_steps: [
      "Our Expo team will contact you within 24 hours.",
      "You'll receive the Indian Exporters brochure with platform details.",
      "IEC and company documents will be requested for verified profile creation.",
      "Your Exporter Page goes live on the IGEN Expo platform at launch.",
    ],
    cta_label: "View IGEN Expo Platform",
    cta_url: "https://igenexpo.com",
    share_message:
      "My company just registered on IGEN World's Expo Platform — India's Digital Trade Infrastructure → www.igenworld.com",
  },
  global_importer: {
    headline: "Your Importer Discovery Registration is Confirmed",
    next_steps: [
      "Our global trade team will reach you within 48 hours.",
      "We will share IGEN Expo platform capabilities and timeline.",
      "You'll be matched with verified Indian suppliers in your sector at launch.",
      "Access to India's supplier discovery engine will be granted.",
    ],
    cta_label: "Learn About IGEN Expo",
    cta_url: "https://igenexpo.com",
    share_message:
      "Just registered to discover Indian suppliers on IGEN World's Expo Platform → www.igenworld.com",
  },
  global_exporter: {
    headline: "Your India Market Entry Interest is Registered",
    next_steps: [
      "Our EXIM team will contact you within 48 hours.",
      "India market intelligence overview will be shared.",
      "Indian buyer matching will begin when the platform goes live.",
      "You'll receive IGEN Expo platform details and timeline.",
    ],
    cta_label: "Explore IGEN Expo Platform",
    cta_url: "https://igenexpo.com",
    share_message:
      "Registered for India market entry on IGEN World's Expo Platform → www.igenworld.com",
  },
  indian_importer: {
    headline: "Your Importer Application is Confirmed",
    next_steps: [
      "Our Expo team will contact you within 24 hours.",
      "Global supplier matching capabilities will be shared.",
      "Your Importer Page requirements and docs will be discussed.",
      "Profile goes live on IGEN Expo at launch.",
    ],
    cta_label: "View IGEN Expo Platform",
    cta_url: "https://igenexpo.com",
    share_message:
      "Just registered on IGEN World's Expo Platform for global sourcing intelligence → www.igenworld.com",
  },
  service_provider: {
    headline: "Your Service Provider Application is In",
    next_steps: [
      "Our Expo team will contact you within 24 hours.",
      "Service Provider page requirements and pricing will be shared.",
      "Your profile will be built and reviewed before launch.",
      "Leads from exporters and importers will start flowing at launch.",
    ],
    cta_label: "View IGEN Expo Benefits",
    cta_url: "https://igenexpo.com",
    share_message:
      "My EXIM services business just registered on IGEN World's Expo Platform → www.igenworld.com",
  },
  igen_awards: {
    headline: "Your IGEN Awards Application is Received",
    next_steps: [
      "Our Awards team will contact you within 48 hours.",
      "Award categories, criteria and nomination form will be shared.",
      "City-wise award event schedule will be shared.",
      "Nomination review process will begin.",
    ],
    cta_label: "View IGEN Awards",
    cta_url: "https://igenawards.com",
    share_message:
      "Just registered for the IGEN Awards — India's most comprehensive AI-platform industry recognition → www.igenworld.com",
  },
  viksit_bharat_conf: {
    headline: "You're Registered for the Viksit Bharat Conference",
    next_steps: [
      "Our Conference team will contact you within 48 hours.",
      "Conference schedule, city details and participation packs will be shared.",
      "Speaker slot or sponsorship deck will be sent if applicable.",
      "Delegate confirmation and registration kit follows.",
    ],
    cta_label: "Learn More About the Conference",
    cta_url: "https://igenworld.com/conference",
    share_message:
      "Just registered for the IGEN Viksit Bharat Conference — India's Vision 2047 Industry Summit → www.igenworld.com",
  },
  affiliate_partner: {
    headline: "Your Affiliate Partner Application is Submitted",
    next_steps: [
      "Our Partnerships team will contact you within 24 hours.",
      "Affiliate program details, commission structure and tools will be shared.",
      "Training and onboarding call will be scheduled.",
      "You'll receive your affiliate tracking link after onboarding.",
    ],
    cta_label: "Learn About Partnerships",
    cta_url: "https://igenpartners.com",
    share_message:
      "Just applied to become an IGEN Affiliate Partner — earning by growing India's industry ecosystem → www.igenworld.com",
  },
  reseller_partner: {
    headline: "Your Reseller Application is Confirmed",
    next_steps: [
      "Our Partnerships team will contact you within 24 hours.",
      "Reseller program deck, revenue share model and city exclusivity will be discussed.",
      "Onboarding call will be scheduled.",
      "Sales training and collateral will be provided.",
    ],
    cta_label: "View Partnership Opportunities",
    cta_url: "https://igenpartners.com",
    share_message:
      "Just applied as an IGEN Reseller Partner — building my business on India's industry intelligence infrastructure → www.igenworld.com",
  },
  founding_stakeholder: {
    headline: "Your Founding Stakeholder Interest is Registered",
    next_steps: [
      "Founder Vijay Singh's office will personally review your application.",
      "A direct meeting request will be sent within 48 hours.",
      "IGEN World company deck and vision document will be shared.",
      "Strategic discussion will follow based on your area of interest.",
    ],
    cta_label: "Learn About IGEN World",
    cta_url: "https://igenworld.com",
    share_message:
      "Exploring a Founding Stakeholder opportunity with IGEN World — India's most ambitious industry intelligence company → www.igenworld.com",
  },
};

export const SECTOR_LIST = [
  "Agriculture & Food Processing",
  "Automotive & EV",
  "Banking & Financial Services",
  "Chemicals & Petrochemicals",
  "Defence & Aerospace",
  "Education & Ed-Tech",
  "Energy & Renewables",
  "Engineering & Capital Goods",
  "Healthcare & Pharma",
  "IT & Technology",
  "Infrastructure & Real Estate",
  "Logistics & Supply Chain",
  "Manufacturing & MSME",
  "Retail & E-Commerce",
  "Textiles & Apparel",
  "Other (specify)",
];

export const PRODUCT_GROUPS = [
  {
    label: "IGEN NEWS Platform",
    ids: ["sme_page", "associate_sme", "company_page", "leader_page", "reader_plan"] as ProductId[],
  },
  {
    label: "IGEN EXPO Platform",
    ids: ["indian_exporter", "global_importer", "global_exporter", "indian_importer", "service_provider"] as ProductId[],
  },
  {
    label: "Common Products",
    ids: ["igen_awards", "viksit_bharat_conf", "affiliate_partner", "reseller_partner", "founding_stakeholder"] as ProductId[],
  },
];
