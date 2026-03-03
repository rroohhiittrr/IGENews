import {
  Article,
  Sector,
  Country,
  LeaderDesignation,
  ContentType,
  ArticleStatus,
  BreakingNews,
} from "@/types/types";

// ==========================================
// SECTORS (20 as per spec)
// ==========================================
export const sectors: Sector[] = [
  { id: "s1", name: "Technology", slug: "technology", articleCount: 342, icon: "💻", trendingIndicator: "up" },
  { id: "s2", name: "Pharmaceuticals", slug: "pharmaceuticals", articleCount: 289, icon: "💊", trendingIndicator: "up" },
  { id: "s3", name: "Textiles & Apparel", slug: "textiles-apparel", articleCount: 198, icon: "🧵", trendingIndicator: "stable" },
  { id: "s4", name: "Automotive", slug: "automotive", articleCount: 256, icon: "🚗", trendingIndicator: "up" },
  { id: "s5", name: "Agriculture", slug: "agriculture", articleCount: 178, icon: "🌾", trendingIndicator: "stable" },
  { id: "s6", name: "Chemicals", slug: "chemicals", articleCount: 145, icon: "⚗️", trendingIndicator: "down" },
  { id: "s7", name: "Defence & Aerospace", slug: "defence-aerospace", articleCount: 167, icon: "🛡️", trendingIndicator: "up" },
  { id: "s8", name: "Electronics", slug: "electronics", articleCount: 234, icon: "📱", trendingIndicator: "up" },
  { id: "s9", name: "Energy & Power", slug: "energy-power", articleCount: 213, icon: "⚡", trendingIndicator: "up" },
  { id: "s10", name: "Food & Beverages", slug: "food-beverages", articleCount: 156, icon: "🍽️", trendingIndicator: "stable" },
  { id: "s11", name: "Gems & Jewellery", slug: "gems-jewellery", articleCount: 98, icon: "💎", trendingIndicator: "stable" },
  { id: "s12", name: "Healthcare", slug: "healthcare", articleCount: 267, icon: "🏥", trendingIndicator: "up" },
  { id: "s13", name: "Infrastructure", slug: "infrastructure", articleCount: 189, icon: "🏗️", trendingIndicator: "up" },
  { id: "s14", name: "Iron & Steel", slug: "iron-steel", articleCount: 123, icon: "🔩", trendingIndicator: "down" },
  { id: "s15", name: "Leather", slug: "leather", articleCount: 87, icon: "👜", trendingIndicator: "stable" },
  { id: "s16", name: "Marine & Shipping", slug: "marine-shipping", articleCount: 134, icon: "🚢", trendingIndicator: "stable" },
  { id: "s17", name: "Mining & Minerals", slug: "mining-minerals", articleCount: 112, icon: "⛏️", trendingIndicator: "down" },
  { id: "s18", name: "Plastics & Rubber", slug: "plastics-rubber", articleCount: 98, icon: "♻️", trendingIndicator: "stable" },
  { id: "s19", name: "Renewable Energy", slug: "renewable-energy", articleCount: 245, icon: "🌱", trendingIndicator: "up" },
  { id: "s20", name: "Services & IT", slug: "services-it", articleCount: 312, icon: "🖥️", trendingIndicator: "up" },
];

// ==========================================
// COUNTRIES (sample bilateral pairs)
// ==========================================
export const countries: Country[] = [
  { id: "c1", name: "USA", pairName: "USA–India", flagEmoji: "🇺🇸", tradeVolume: 128.5, articleCount: 456 },
  { id: "c2", name: "China", pairName: "China–India", flagEmoji: "🇨🇳", tradeVolume: 115.4, articleCount: 389 },
  { id: "c3", name: "UAE", pairName: "UAE–India", flagEmoji: "🇦🇪", tradeVolume: 84.2, articleCount: 234 },
  { id: "c4", name: "Saudi Arabia", pairName: "Saudi Arabia–India", flagEmoji: "🇸🇦", tradeVolume: 52.8, articleCount: 198 },
  { id: "c5", name: "Germany", pairName: "Germany–India", flagEmoji: "🇩🇪", tradeVolume: 28.4, articleCount: 167 },
  { id: "c6", name: "UK", pairName: "UK–India", flagEmoji: "🇬🇧", tradeVolume: 24.9, articleCount: 189 },
  { id: "c7", name: "Japan", pairName: "Japan–India", flagEmoji: "🇯🇵", tradeVolume: 21.3, articleCount: 145 },
  { id: "c8", name: "Singapore", pairName: "Singapore–India", flagEmoji: "🇸🇬", tradeVolume: 19.8, articleCount: 134 },
  { id: "c9", name: "Australia", pairName: "Australia–India", flagEmoji: "🇦🇺", tradeVolume: 18.2, articleCount: 112 },
  { id: "c10", name: "South Korea", pairName: "South Korea–India", flagEmoji: "🇰🇷", tradeVolume: 16.7, articleCount: 98 },
];

// ==========================================
// LEADER DESIGNATIONS (25 as per spec)
// ==========================================
export const leaderDesignations: LeaderDesignation[] = [
  { id: "l1", title: "CEO", priority: 1, articleCount: 456 },
  { id: "l2", title: "CFO", priority: 2, articleCount: 234 },
  { id: "l3", title: "CTO", priority: 3, articleCount: 198 },
  { id: "l4", title: "COO", priority: 4, articleCount: 178 },
  { id: "l5", title: "CMO", priority: 5, articleCount: 145 },
  { id: "l6", title: "Managing Director", priority: 6, articleCount: 312 },
  { id: "l7", title: "Chairman", priority: 7, articleCount: 289 },
  { id: "l8", title: "President", priority: 8, articleCount: 267 },
  { id: "l9", title: "Vice President", priority: 9, articleCount: 189 },
  { id: "l10", title: "Director", priority: 10, articleCount: 213 },
  { id: "l11", title: "Founder", priority: 11, articleCount: 345 },
  { id: "l12", title: "Co-Founder", priority: 12, articleCount: 234 },
  { id: "l13", title: "Board Member", priority: 13, articleCount: 123 },
  { id: "l14", title: "Partner", priority: 14, articleCount: 167 },
  { id: "l15", title: "Head of Strategy", priority: 15, articleCount: 134 },
  { id: "l16", title: "Head of Operations", priority: 16, articleCount: 112 },
  { id: "l17", title: "Head of Technology", priority: 17, articleCount: 156 },
  { id: "l18", title: "Head of Finance", priority: 18, articleCount: 98 },
  { id: "l19", title: "Head of Marketing", priority: 19, articleCount: 87 },
  { id: "l20", title: "Head of Sales", priority: 20, articleCount: 76 },
  { id: "l21", title: "General Manager", priority: 21, articleCount: 145 },
  { id: "l22", title: "Country Head", priority: 22, articleCount: 189 },
  { id: "l23", title: "Regional Director", priority: 23, articleCount: 112 },
  { id: "l24", title: "Chief Data Officer", priority: 24, articleCount: 67 },
  { id: "l25", title: "Chief Sustainability Officer", priority: 25, articleCount: 56 },
];

// ==========================================
// MOCK ARTICLES
// ==========================================
export const mockArticles: Article[] = [
  {
    id: "a1",
    slug: "india-semiconductor-push-2026",
    title: "India's ₹76,000 Crore Semiconductor Push: 3 New Fabs Approved, Production to Begin by 2027",
    summary: "The Indian government has approved three new semiconductor fabrication units in Gujarat, Karnataka, and Tamil Nadu, marking a historic shift in the country's electronics manufacturing ambitions. The move is expected to reduce India's dependency on chip imports by 40% within five years.",
    body: `<h2>A Historic Turning Point for Indian Electronics</h2>
<p>In a landmark policy decision announced on Monday, the Union Cabinet approved three new semiconductor fabrication units — commonly called "fabs" — to be established in Gujarat, Karnataka, and Tamil Nadu. The combined investment of ₹76,000 crore represents the single largest government-backed push into advanced manufacturing in India's history.</p>
<p>The approval follows years of lobbying from the electronics industry and signals a decisive shift in India's ambitions to become a global chip-making hub. Production at all three fabs is expected to commence by Q2 2027, with commercial-scale output projected by 2028.</p>
<h2>What Will the Fabs Produce?</h2>
<p>The Gujarat unit, backed by a consortium that includes Vedanta's semiconductor arm and a Taiwanese technology partner, will focus on <strong>28nm and 40nm logic chips</strong> — the nodes used widely in automotive electronics, consumer appliances, and industrial controllers. The Karnataka facility, anchored near Bengaluru's existing electronics corridor, will specialise in compound semiconductors used in <strong>defence systems and 5G base stations</strong>. Tamil Nadu's fab, located in the emerging Hosur electronics cluster, will produce <strong>power semiconductors and OSAT (outsourced semiconductor assembly and test)</strong> components.</p>
<blockquote>"India doesn't need to lead at 3nm to win the semiconductor race. Winning the 28nm-to-65nm segment is where the real volume market lies, and that's exactly where we are focused." — Dr. Ajay Kumar Sood, Principal Scientific Adviser</blockquote>
<h2>Reducing Import Dependency</h2>
<p>India currently imports over $50 billion worth of semiconductor components annually, making it one of the world's largest chip-importing nations. The new fabs are projected to reduce this dependency by approximately <strong>40% within five years</strong>, saving an estimated ₹1.2 lakh crore in foreign exchange annually by 2030.</p>
<p>Beyond the import bill, the facilities are expected to create over <strong>1,20,000 direct and indirect jobs</strong>, primarily in high-skill engineering and technician roles. The government has separately announced a ₹3,200 crore skill-development programme targeting semiconductor process engineers in collaboration with IITs and NITs.</p>
<h2>Industry Reaction</h2>
<p>Reaction from the electronics industry has been largely positive. The India Electronics and Semiconductor Association (IESA) called it "the watershed moment we've been waiting for," while global chip equipment suppliers — including Applied Materials and ASML — have already signalled interest in setting up support hubs near the new fab sites.</p>
<p>However, some analysts caution that executing at this scale will be challenging. "The talent pipeline, supply chain for specialty chemicals, and ultra-pure water infrastructure all need to be built almost from scratch," noted one senior industry consultant who asked not to be named. "The timelines are aggressive but not impossible."</p>
<h2>What's Next</h2>
<p>The Ministry of Electronics and Information Technology (MeitY) is expected to release detailed implementation guidelines within 30 days. Land acquisition is already underway in all three states, with state governments offering additional incentives including subsidised power, stamp duty waivers, and fast-track environmental clearances.</p>
<p>The broader India Semiconductor Mission, launched in 2021 with a ₹76,000 crore outlay, has now effectively deployed its full corpus. Analysts expect a second phase of the mission to be announced in the next Union Budget, potentially targeting advanced packaging and EDA (Electronic Design Automation) capabilities.</p>`,
    heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop",
    readTime: 7,
    type: ContentType.MANUAL_AI,
    status: ArticleStatus.PUBLISHED,
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    sector: sectors[0],
    sourceName: "IGN Editorial",
    authorName: "Priyanshi Sharma",
    likeCount: 468,
    commentCount: 52,
    shareCount: 71,
    isTrending: true,
    isBreaking: false,
    isSponsored: false,
    tags: ["Technology", "Semiconductor", "Manufacturing", "India", "Electronics"],
  },
  {
    id: "a2",
    slug: "pharma-exports-record-high",
    title: "Indian Pharma Exports Hit Record $28 Billion — Africa & Latin America Lead Growth",
    summary: "India's pharmaceutical exports crossed the $28 billion mark in FY2025-26, with Africa and Latin America emerging as the fastest-growing markets. Generic drug exports to sub-Saharan Africa grew 34% year-on-year.",
    body: `<h2>A Record-Breaking Year for Indian Pharma</h2>
<p>India's pharmaceutical export sector has hit an unprecedented milestone, crossing <strong>$28 billion in total exports</strong> for FY2025-26. The figure, released by the Pharmaceuticals Export Promotion Council (Pharmexcil), represents a 12.4% year-on-year growth and firmly cements India's position as the world's largest supplier of generic medicines by volume.</p>
<p>The United States remains the largest single market, accounting for nearly 31% of total exports. However, the most striking growth stories this year have emerged from <strong>sub-Saharan Africa and Latin America</strong>, where ageing populations, expanding public health programmes, and weakening local manufacturing capacity have fuelled demand for affordable Indian generics.</p>
<h2>Africa: The New Frontier</h2>
<p>Generic drug exports to sub-Saharan Africa surged <strong>34% year-on-year</strong>, with Nigeria, Kenya, Ethiopia, and South Africa recording the largest increases. Indian companies have benefited from long-standing regulatory approvals from the World Health Organization (WHO), making their products eligible for procurement under the Global Fund and PEPFAR programmes.</p>
<blockquote>"Africa is not just a charity market — it is a $14 billion pharmaceutical opportunity that Indian companies are uniquely positioned to lead." — Pharmexcil Chairman</blockquote>
<h2>Latin America Emerges as a Growth Engine</h2>
<p>Brazil and Mexico have historically been dominated by European and US multinationals, but Indian exporters have made significant inroads over the past three years. Combined exports to the Latin American region grew <strong>27% in FY2025-26</strong>, with oncology, cardiovascular, and anti-diabetic drugs leading the category mix.</p>
<h2>Challenges on the Horizon</h2>
<p>Despite the record figures, industry stakeholders warn of growing headwinds. The US FDA issued <strong>143 warning letters</strong> to Indian manufacturing facilities in the last fiscal year — a number that, while declining from the peak of 2022, remains a concern for premium market access. Additionally, currency volatility in several African markets has put pressure on payment realisation timelines.</p>
<p>Raw material sourcing also continues to be a vulnerability. India still imports nearly <strong>65% of its Active Pharmaceutical Ingredients (APIs)</strong> from China, a dependency that regulators and industry bodies have flagged repeatedly as a strategic risk.</p>
<h2>Government Response</h2>
<p>The government's PLI scheme for bulk drugs and medical devices has so far attracted ₹15,000 crore in committed investments from 55 companies. The Ministry of Commerce is also negotiating preferential pharmaceutical trade terms within ongoing FTA discussions with the UK, Canada, and the Gulf Cooperation Council (GCC) bloc.</p>`,
    heroImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=450&fit=crop",
    readTime: 5,
    type: ContentType.RSS_AI,
    status: ArticleStatus.PUBLISHED,
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    sector: sectors[1],
    country: countries[0],
    sourceName: "Economic Times",
    likeCount: 312,
    commentCount: 38,
    shareCount: 45,
    isTrending: true,
    isBreaking: false,
    isSponsored: false,
    tags: ["Pharmaceuticals", "Exports", "Africa", "Generic Drugs"],
  },
  {
    id: "a3",
    slug: "usa-india-trade-corridor",
    title: "USA–India Trade Corridor: New $2B Manufacturing Agreement Signed at G20 Side Event",
    summary: "A landmark $2 billion manufacturing partnership was signed between US and Indian trade bodies at the G20 side event in New Delhi, focusing on defense electronics, green hydrogen, and advanced materials. The agreement covers technology transfer and joint research programs.",
    body: `<h2>G20 Side Event Produces Landmark Deal</h2>
<p>On the sidelines of the G20 Trade Ministers' Summit in New Delhi, the US-India Business Council (USIBC) and the Federation of Indian Chambers of Commerce and Industry (FICCI) jointly signed a comprehensive <strong>$2 billion manufacturing partnership agreement</strong>. The deal is structured across three primary verticals: defence electronics, green hydrogen infrastructure, and advanced composite materials.</p>
<p>The signing ceremony was attended by senior officials from both governments, including the US Under Secretary of Commerce and India's Minister of State for Commerce and Industry, underscoring the diplomatic weight attached to the agreement.</p>
<h2>Three Pillars of the Partnership</h2>
<p><strong>Defence Electronics:</strong> American firms including Raytheon Technologies and L3Harris will co-develop radar systems, communication equipment, and drone electronics with Indian partners under the iDEX (Innovations for Defence Excellence) framework. The arrangement includes technology transfer provisions that India has long sought in bilateral defence deals.</p>
<p><strong>Green Hydrogen:</strong> A joint research consortium will be established with participation from the US Department of Energy's national laboratories and Indian public sector undertakings. The focus will be on <strong>electrolyser manufacturing and hydrogen storage</strong> — two areas where cost reduction is critical to commercial viability.</p>
<p><strong>Advanced Materials:</strong> Carbon fibre, titanium alloys, and specialty polymers will be the focus of a joint R&D programme linking Indian IITs with American universities including MIT and Georgia Tech.</p>
<blockquote>"This is not a memorandum of understanding that will gather dust. This has binding investment commitments, timelines, and review mechanisms." — US-India Business Council President</blockquote>
<h2>Strategic Context</h2>
<p>The deal comes at a time when both nations are navigating a post-pandemic realignment of global supply chains. The US government's push to reduce dependency on Chinese manufacturing — particularly in strategic sectors — has created a significant opening for India as an alternative production hub. India, meanwhile, has aggressively courted American investment through its PLI schemes and "Make in India" programme.</p>
<h2>Timeline and Milestones</h2>
<p>The first tranche of investments — approximately $400 million — is expected to be committed within the next six months, with full deployment of the $2 billion corpus planned over four years. A joint ministerial review committee will track progress on an annual basis, with the first review scheduled for Q1 2027.</p>`,
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=450&fit=crop",
    readTime: 6,
    type: ContentType.MANUAL_AI,
    status: ArticleStatus.PUBLISHED,
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    country: countries[0],
    sector: sectors[6],
    sourceName: "IGN Editorial",
    authorName: "Sanjay Mehta",
    likeCount: 289,
    commentCount: 45,
    shareCount: 62,
    isTrending: false,
    isBreaking: false,
    isSponsored: false,
    tags: ["USA", "India", "Trade", "Manufacturing", "Defence"],
  },
  {
    id: "a4",
    slug: "renewable-energy-100gw",
    title: "India Crosses 100GW Renewable Energy Milestone — Solar Leads at 67GW Installed Capacity",
    summary: "India has officially crossed the 100GW renewable energy capacity mark, with solar power contributing 67GW. The government's target of 500GW by 2030 is now considered achievable by industry analysts, supported by ₹19,500 crore PLI scheme for solar modules.",
    body: `<h2>India's Green Energy Revolution Reaches a Crucial Milestone</h2>
<p>India has officially crossed the <strong>100 gigawatt (GW) renewable energy capacity</strong> mark, according to figures released by the Central Electricity Authority (CEA). Solar power leads the milestone with <strong>67GW of installed capacity</strong>, followed by wind at 47GW, hydropower at 47GW, and a growing base of biomass and small hydro projects.</p>
<p>The crossing of the 100GW threshold — a target set under India's Nationally Determined Contributions (NDC) to the Paris Agreement — is seen as a major vindication of the country's clean energy strategy, which has involved a combination of government auctions, viability gap funding, and production-linked incentives.</p>
<h2>Solar: The Engine of Growth</h2>
<p>India's solar trajectory has been nothing short of remarkable. From just <strong>2.6GW in 2014</strong> to 67GW today, solar capacity has grown over 25-fold in a decade, driven by plummeting panel prices (down 90% since 2012), large-scale ultra-mega solar parks, and aggressive state-level targets.</p>
<blockquote>"We are not just meeting our climate targets. We are building a domestic clean energy industry that will create millions of jobs and reduce our energy import bill by ₹2.5 lakh crore by 2030." — Union Minister for New & Renewable Energy</blockquote>
<p>The ₹19,500 crore PLI scheme for high-efficiency solar modules has been particularly effective in stimulating domestic manufacturing. India now produces approximately <strong>35GW of solar modules annually</strong>, reducing its dependence on Chinese imports from 85% in 2020 to under 40% today.</p>
<h2>Is 500GW by 2030 Achievable?</h2>
<p>The government's ambitious target of 500GW of non-fossil fuel capacity by 2030 — with 450GW from renewables — requires India to add roughly 50GW per year for the next five years. Independent analysts, who previously flagged this as "optimistic," have now revised their assessments upward.</p>
<p>"The pipeline of projects under various stages of development now exceeds 250GW," noted a senior analyst at BloombergNEF. "Grid integration and transmission infrastructure remain the key constraints, not generation capacity."</p>
<h2>Grid and Storage Challenges</h2>
<p>India's transmission grid — built primarily for centralized coal-based generation — is struggling to absorb high levels of intermittent renewable power. Curtailment rates in some solar-heavy states like Rajasthan and Gujarat have risen to <strong>8-12%</strong>, representing significant wasted capacity.</p>
<p>The government's National Green Hydrogen Mission and the Battery Energy Storage System (BESS) policy are expected to provide crucial flexibility solutions. A ₹4,000 crore tender for grid-scale battery storage — India's largest — was issued last month and is expected to attract bids from global players including Tesla, BYD, and Fluence.</p>`,
    heroImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=450&fit=crop",
    readTime: 4,
    type: ContentType.RSS_AI,
    status: ArticleStatus.PUBLISHED,
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    sector: sectors[18],
    sourceName: "Mint",
    likeCount: 534,
    commentCount: 67,
    shareCount: 89,
    isTrending: true,
    isBreaking: false,
    isSponsored: false,
    tags: ["Renewable Energy", "Solar", "Green", "Climate"],
  },
  {
    id: "a5",
    slug: "ceo-interview-tata-tech",
    title: "Exclusive: Tata Technologies CEO on Building India's EV Ecosystem — 'We're 5 Years Ahead of Schedule'",
    summary: "In an exclusive interview with India Global News, Tata Technologies CEO shares insights on India's electric vehicle revolution, the company's role in developing affordable EV platforms, and plans for a ₹5,000 crore R&D investment in battery technology.",
    body: `<h2>Setting the Scene</h2>
<p>We met the CEO of Tata Technologies at the company's sprawling Pune R&D campus — a facility that houses over 11,000 engineers and is, by some measures, India's largest private automotive engineering centre. What struck me immediately was the energy: the whiteboard-covered walls, the prototype battery packs on display, and the unmistakable buzz of a team that believes it is building something historic.</p>
<p>Tata Technologies, a subsidiary of Tata Motors, has quietly become one of the most important players in India's electric vehicle revolution — not as a manufacturer, but as the engineering backbone that powers it.</p>
<blockquote>"We don't build cars. We build the intelligence inside them. And right now, that intelligence is electric, connected, and Indian." — CEO, Tata Technologies</blockquote>
<h2>Five Years Ahead of Schedule — How?</h2>
<p>The headline claim is bold. When I asked what "five years ahead of schedule" actually means, the CEO was specific: "In 2019, our internal roadmap projected that India would reach 8% EV penetration in passenger vehicles by 2030. We hit that number in 2025. The Nexon EV alone has done things we didn't think were possible in this market."</p>
<p>The acceleration, he says, has been driven by three convergent forces: <strong>battery cost declines faster than modelled, government policy consistency, and a fundamental shift in consumer perception</strong> — from EVs being seen as a compromise to being seen as aspirational.</p>
<h2>The ₹5,000 Crore Bet on Battery R&D</h2>
<p>The most significant announcement from our conversation was the company's commitment to invest <strong>₹5,000 crore in battery technology R&D</strong> over the next three years. The investment will be spread across three areas: next-generation cell chemistry (specifically sodium-ion as a complement to lithium), battery management system (BMS) software, and second-life battery applications for stationary storage.</p>
<p>"We are not trying to build cells. That's a different, capital-intensive game. We are investing in the software and systems intelligence layer that sits around the cell — and that's where Indian engineering has a genuine global edge," the CEO explained.</p>
<h2>On Competition and China</h2>
<p>I asked the obvious question: how does India compete with China's vertically integrated EV supply chain, which spans mines, cells, modules, and vehicles? The answer was measured but confident. "China has a 15-year head start in the cell game. We accept that. But the software-defined vehicle is an inflection point that resets the clock. If you can win on software, connectivity, and integration — that is an India-sized opportunity."</p>`,
    heroImage: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&h=450&fit=crop",
    readTime: 12,
    type: ContentType.MANUAL_AI,
    status: ArticleStatus.PUBLISHED,
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    sector: sectors[3],
    leaderDesignation: leaderDesignations[0],
    sourceName: "IGN Editorial",
    authorName: "Ritu Patel",
    likeCount: 678,
    commentCount: 89,
    shareCount: 112,
    isTrending: true,
    isBreaking: false,
    isSponsored: false,
    tags: ["Automotive", "EV", "CEO", "Tata", "Leadership"],
  },
  {
    id: "a6",
    slug: "textile-exports-eu-fta",
    title: "India-EU FTA Breakthrough: Textile Exports Set for 25% Duty Reduction Starting April 2026",
    summary: "After 12 years of negotiations, India and the EU have reached a breakthrough on textile and apparel tariffs. The new Free Trade Agreement provisions will reduce duties by 25% on Indian textiles entering European markets, benefiting over 4,500 exporters.",
    body: `<h2>Twelve Years in the Making</h2>
<p>The India-EU Free Trade Agreement negotiations, launched in 2007 and paused for nearly a decade before being relaunched in 2022, have finally produced a breakthrough on one of the most contested chapters: <strong>textiles and apparel tariffs</strong>. The agreement, expected to be formally signed at the next India-EU Summit, will reduce duties on Indian textiles entering European markets by <strong>25% starting April 2026</strong>.</p>
<p>The development is being hailed as transformative for India's $44 billion textile and apparel industry, which employs approximately 45 million people and is the country's second-largest export earner after IT services.</p>
<h2>Who Benefits?</h2>
<p>Over <strong>4,500 Indian exporters</strong> are expected to benefit directly from the duty reduction. The most significant gains will accrue to exporters of cotton fabrics, readymade garments, and technical textiles — categories where Indian manufacturers have consistently lost market share to Bangladesh and Vietnam due to more favourable tariff treatment under those countries' EU trade arrangements.</p>
<blockquote>"This levels the playing field. For the first time in a decade, Indian garment exporters will be price-competitive with Bangladesh in the EU market." — Apparel Export Promotion Council Chairman</blockquote>
<h2>Beyond Tariffs: The Rules of Origin Question</h2>
<p>While the tariff reduction is the headline, trade experts note that the <strong>rules of origin provisions</strong> will be equally important in practice. The EU has agreed to a "double transformation" rule — meaning Indian exporters can use imported yarn and still qualify for preferential tariffs, provided the fabric is woven and the garment is cut and sewn in India. This is a significant concession that enables Indian manufacturers to maintain their current sourcing flexibility.</p>
<h2>Market Opportunity</h2>
<p>The EU is the world's largest textile and apparel import market, valued at over €260 billion annually. India currently holds approximately 3.2% of this market — well below its potential. The tariff reduction is projected to help India capture an additional 0.8-1.2 percentage points of market share over three years, translating to incremental exports of <strong>€2.5-3.5 billion annually</strong>.</p>`,
    heroImage: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=450&fit=crop",
    readTime: 5,
    type: ContentType.RSS_AI,
    status: ArticleStatus.PUBLISHED,
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    sector: sectors[2],
    sourceName: "Business Standard",
    likeCount: 234,
    commentCount: 31,
    shareCount: 28,
    isTrending: false,
    isBreaking: false,
    isSponsored: false,
    tags: ["Textiles", "FTA", "EU", "Exports", "Trade Policy"],
  },
  {
    id: "a7",
    slug: "uae-india-bilateral-infra",
    title: "UAE Commits $10B to India's Smart Cities Infrastructure — 5 Cities Selected for Phase 1",
    summary: "The UAE has committed $10 billion in infrastructure investments for India's smart cities program. Phase 1 targets Ahmedabad, Pune, Hyderabad, Kochi, and Lucknow with projects spanning transportation, renewable energy, and digital governance.",
    body: `<h2>A $10 Billion Vote of Confidence</h2>
<p>The United Arab Emirates has formalised a <strong>$10 billion commitment</strong> to India's Smart Cities Mission, announced at the India-UAE Joint Investment Forum in Abu Dhabi. The investment will be channelled through the Abu Dhabi Investment Authority (ADIA) and Mubadala Investment Company, with co-investment from Indian sovereign wealth funds and state governments.</p>
<p>Five cities have been selected for Phase 1: <strong>Ahmedabad, Pune, Hyderabad, Kochi, and Lucknow</strong>. Each city will receive between $1.5 billion and $2.5 billion in infrastructure investment focused on three core verticals: integrated transport systems, renewable energy microgrids, and AI-powered digital governance platforms.</p>
<h2>What Each City Gets</h2>
<p><strong>Ahmedabad</strong> will see the expansion of its BRTS (Bus Rapid Transit System) and the development of a new metro corridor connecting the city to its airport special economic zone. <strong>Pune</strong> will receive investment in its ring road network and a large-scale rooftop solar programme targeting 500MW of distributed generation. <strong>Hyderabad</strong>'s investment focuses on smart traffic management and a unified city data platform. <strong>Kochi</strong> gets a waterfront regeneration project and smart port infrastructure. <strong>Lucknow</strong> will develop a modern solid waste management system and LED street lighting across the city.</p>
<blockquote>"India's cities are not a problem to be solved. They are an opportunity to be seized. The UAE sees this, and we want to be part of India's urban century." — UAE Minister of Economy</blockquote>
<h2>Governance Structure</h2>
<p>A joint India-UAE Smart Cities Investment Authority will be established to oversee fund deployment, with representation from MeitY, the Ministry of Housing and Urban Affairs, and UAE sovereign wealth entities. Projects will be structured as <strong>public-private partnerships (PPPs)</strong>, with returns linked to city revenue generation and population growth metrics.</p>`,
    heroImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=450&fit=crop",
    readTime: 6,
    type: ContentType.MANUAL_AI,
    status: ArticleStatus.PUBLISHED,
    publishedAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    sector: sectors[12],
    country: countries[2],
    sourceName: "IGN Editorial",
    authorName: "Priyanshi Sharma",
    likeCount: 189,
    commentCount: 27,
    shareCount: 34,
    isTrending: false,
    isBreaking: false,
    isSponsored: false,
    tags: ["UAE", "Infrastructure", "Smart Cities", "Investment"],
  },
  {
    id: "a8",
    slug: "food-processing-pli",
    title: "Food Processing PLI Scheme 2.0: ₹10,900 Crore Approved for 120 Companies",
    summary: "The government has approved the second phase of the PLI scheme for food processing, allocating ₹10,900 crore to 120 companies. The scheme targets value-added products like ready-to-eat meals, organic food, and premium dairy for export markets.",
    body: `<h2>PLI 2.0: Scaling Up India's Food Processing Ambition</h2>
<p>The Union Cabinet has approved the second phase of the Production Linked Incentive (PLI) scheme for the food processing sector, allocating <strong>₹10,900 crore to 120 companies</strong> over a five-year period. The scheme targets the production of high-value, export-ready food products including ready-to-eat (RTE) meals, organic and natural food, millet-based products, and premium dairy.</p>
<p>PLI 1.0, which concluded its disbursement cycle last year, generated over ₹7,500 crore in incremental sales and added approximately 2.5 lakh jobs in the food processing value chain. PLI 2.0 is designed to build on these gains with a sharper focus on export markets and product premiumisation.</p>
<h2>Target Categories and Companies</h2>
<p>The 120 approved beneficiaries span a range of company sizes and product categories. Large companies accounting for 60% of the corpus will focus on <strong>snack foods, processed vegetables, and seafood exports</strong>. A dedicated SME tranche — a new feature of PLI 2.0 — allocates ₹2,200 crore specifically to smaller food processing units in Tier 2 and Tier 3 cities with a focus on <strong>millets, spices, and traditional Indian foods</strong>.</p>
<blockquote>"India wastes 40% of its horticultural produce due to inadequate processing infrastructure. PLI 2.0 is a direct attack on that number." — Food Processing Minister</blockquote>
<h2>Export Potential</h2>
<p>India's processed food exports currently stand at approximately $14 billion — a fraction of China's $90 billion and the USA's $140 billion. The ministry projects that PLI 2.0, combined with ongoing infrastructure investments in cold chain and food parks, will help grow processed food exports to <strong>$25 billion by 2029</strong>.</p>
<p>Key target markets include the Middle East (where the Indian diaspora drives demand for Indian RTE meals), the United States (premium organic and Ayurvedic food categories), and ASEAN nations (where Indian millet-based products are gaining traction as health foods).</p>`,
    heroImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=450&fit=crop",
    readTime: 4,
    type: ContentType.RSS_AI,
    status: ArticleStatus.PUBLISHED,
    publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
    sector: sectors[9],
    sourceName: "NDTV Profit",
    likeCount: 145,
    commentCount: 19,
    shareCount: 22,
    isTrending: false,
    isBreaking: false,
    isSponsored: false,
    tags: ["Food Processing", "PLI", "Government", "FMCG"],
  },
  {
    id: "a9",
    slug: "japan-india-ev-battery",
    title: "Japan–India EV Battery Alliance: ₹15,000 Crore Joint Venture Announced by Honda and Tata Chemicals",
    summary: "Honda Motor Co. and Tata Chemicals have announced a ₹15,000 crore joint venture to manufacture next-generation lithium iron phosphate (LFP) batteries in Maharashtra. The facility is expected to produce 40GWh annually by 2029.",
    body: `<h2>A Joint Venture Reshaping the Battery Landscape</h2>
<p>Honda Motor Co. and Tata Chemicals have formalised a <strong>₹15,000 crore joint venture</strong> to manufacture lithium iron phosphate (LFP) batteries in Maharashtra. The announcement, made at a joint press conference in Mumbai, marks one of the largest Japanese investments in Indian manufacturing and signals a decisive push by both companies to capture the booming South Asian EV market.</p>
<p>The new facility — to be built in the Pune-Nashik industrial corridor — will initially produce <strong>15GWh of LFP battery capacity annually from 2027</strong>, scaling to 40GWh by 2029. LFP batteries, known for their thermal stability, long cycle life, and lower cost compared to nickel-rich chemistries, are the preferred choice for mass-market EVs and stationary energy storage.</p>
<h2>Why LFP, and Why Now?</h2>
<p>LFP chemistry has staged a remarkable comeback in the global battery market. Once dismissed in favour of higher-energy-density nickel-based chemistries, LFP now accounts for over <strong>45% of global EV battery installations</strong>, driven by cost reductions and the rise of urban commuter vehicles with moderate range requirements — precisely the segment that dominates India's EV market.</p>
<blockquote>"LFP is the right chemistry for the Indian EV market at this moment in time. The range, cost, and longevity profile is perfectly matched to Indian usage patterns." — CEO, Tata Chemicals</blockquote>
<h2>Honda's Strategic Pivot</h2>
<p>For Honda, the investment represents a significant strategic shift. The Japanese automaker, which has historically been cautious about battery manufacturing investments, is betting that India will become a crucial EV manufacturing hub for both the domestic and export market. Honda plans to supply cells from the joint venture to power its own India-manufactured EV lineup, which it plans to launch in 2027.</p>
<h2>Government Support and PLI Linkage</h2>
<p>The Maharashtra government has offered a comprehensive incentive package including subsidised land, power tariff concessions, and stamp duty waivers valued at approximately ₹1,800 crore. The project will also be eligible under the central government's ₹18,100 crore Advanced Chemistry Cell (ACC) PLI scheme, which provides incentives of up to ₹20 per Wh on domestically produced battery capacity.</p>`,
    heroImage: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800&h=450&fit=crop",
    readTime: 8,
    type: ContentType.MANUAL_AI,
    status: ArticleStatus.PUBLISHED,
    publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    sector: sectors[3],
    country: countries[6],
    sourceName: "IGN Editorial",
    authorName: "Sanjay Mehta",
    likeCount: 356,
    commentCount: 42,
    shareCount: 56,
    isTrending: true,
    isBreaking: false,
    isSponsored: false,
    tags: ["Japan", "India", "EV", "Battery", "Joint Venture"],
  },
  {
    id: "a10",
    slug: "defence-exports-milestone",
    title: "India's Defence Exports Cross ₹21,000 Crore — BrahMos & HAL Lead Global Orders",
    summary: "India's defence exports have crossed the ₹21,000 crore milestone, driven by BrahMos missile sales to the Philippines and Vietnam, and HAL's light combat aircraft orders from Malaysia and Egypt. The Ministry of Defence targets ₹35,000 crore in defence exports by 2029.",
    body: `<h2>India Becomes a Serious Defence Exporter</h2>
<p>India's defence export figures for FY2025-26, released by the Ministry of Defence, show that the country has crossed the <strong>₹21,000 crore milestone</strong> — a near-sixfold increase from ₹3,500 crore in FY2020-21. The achievement cements India's status as a genuine global defence exporter, not merely a buyer of foreign military equipment.</p>
<p>Two platforms have led the charge: the <strong>BrahMos supersonic cruise missile</strong>, developed jointly with Russia by BrahMos Aerospace, and the <strong>Light Combat Aircraft (LCA) Tejas</strong>, manufactured by Hindustan Aeronautics Limited (HAL).</p>
<h2>BrahMos: India's Export Crown Jewel</h2>
<p>The BrahMos missile, capable of striking targets at supersonic speeds of Mach 2.8, has found eager buyers among India's regional partners. The Philippines, which signed a landmark $375 million deal in 2022, has concluded delivery of its first battery and is in advanced talks for a follow-on order. Vietnam and Indonesia have both signed Letters of Intent, with formal contracts expected in the next six months.</p>
<blockquote>"BrahMos has done more for India's defence diplomacy than any other platform in our history. It has made India a preferred security partner across the Indo-Pacific." — Defence Secretary</blockquote>
<h2>HAL's Tejas Finds International Buyers</h2>
<p>The LCA Tejas Mark 1A, a single-engine light fighter jet, has attracted confirmed orders from Malaysia (18 aircraft, ₹6,500 crore) and Egypt (12 aircraft, ₹4,200 crore), with Argentina and Nigeria in discussions. The Tejas programme, once derided for delays and cost overruns, is now seen internationally as a credible and affordable alternative to Russian and Western fighters in the light combat category.</p>
<h2>The Path to ₹35,000 Crore</h2>
<p>The Ministry of Defence has set a target of <strong>₹35,000 crore in defence exports by 2029</strong>. Reaching this figure will require India to successfully commercialise additional platforms including the Dhanush artillery gun, the Akash surface-to-air missile system, and a new generation of naval vessels being developed at Cochin Shipyard. The Defence Acquisition Procedure (DAP) has been amended to streamline export licensing, and a dedicated Defence Export Organisation is being established under the Department of Defence Production.</p>`,
    heroImage: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?w=800&h=450&fit=crop",
    readTime: 6,
    type: ContentType.RSS_AI,
    status: ArticleStatus.PUBLISHED,
    publishedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    sector: sectors[6],
    sourceName: "LiveMint",
    likeCount: 423,
    commentCount: 56,
    shareCount: 78,
    isTrending: true,
    isBreaking: false,
    isSponsored: false,
    tags: ["Defence", "Exports", "BrahMos", "HAL", "Military"],
  },
  {
    id: "a11",
    slug: "it-services-ai-boom",
    title: "Indian IT Services Revenue to Hit $300B by 2027 — AI and GenAI Consulting Drive Growth",
    summary: "Industry body NASSCOM projects that Indian IT services revenue will reach $300 billion by 2027, up from $254 billion in 2025. The surge is driven by AI transformation consulting, cloud migration services, and cybersecurity, with GenAI projects contributing 15% of new deal values.",
    body: `<h2>The $300 Billion Projection</h2>
<p>India's IT services industry is on track to cross <strong>$300 billion in annual revenue by 2027</strong>, according to the latest NASSCOM Strategic Review. The industry, which employs approximately 5.4 million professionals directly and generates nearly 8% of India's GDP, has entered a new phase of growth driven by artificial intelligence transformation projects and generative AI consulting.</p>
<p>The projection represents a significant acceleration from the 2025 figure of $254 billion and, if achieved, would make India's IT sector larger than the entire GDP of countries like Finland or Portugal.</p>
<h2>The GenAI Gold Rush</h2>
<p>Generative AI — encompassing large language models, image generation, code synthesis, and enterprise chatbots — has created an entirely new consulting and implementation opportunity for Indian IT firms. <strong>GenAI projects now account for 15% of new deal values</strong>, up from near zero in 2022, with TCS, Infosys, Wipro, and HCL Tech all reporting significant GenAI-related revenue in their most recent quarterly results.</p>
<blockquote>"Every Fortune 500 company is in some stage of GenAI transformation. The question is not whether they will hire Indian IT firms to help them — it's which ones." — NASSCOM President</blockquote>
<h2>Beyond Coding: The Shift to Solutioning</h2>
<p>The most significant trend in the industry is the shift from pure execution — writing code, maintaining systems — to <strong>higher-value "solutioning" roles</strong> where Indian firms design transformation roadmaps, own business outcomes, and take on risk-sharing commercial models. This has driven a 23% improvement in deal margins over the past two years.</p>
<h2>Workforce and Talent Challenges</h2>
<p>The rapid shift to AI-centric work is creating significant workforce pressures. While overall headcount remains relatively flat (the large IT firms collectively added only 12,000 net new employees in 2025 versus 100,000+ annually in the pre-2023 boom), demand for AI engineers, data scientists, and prompt engineers has surged. Indian engineering colleges produced approximately <strong>180,000 AI-specialised graduates</strong> in 2025 — a figure that still falls short of industry demand by an estimated 40,000 roles.</p>`,
    heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop",
    readTime: 5,
    type: ContentType.RSS_AI,
    status: ArticleStatus.PUBLISHED,
    publishedAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
    sector: sectors[19],
    sourceName: "Financial Express",
    likeCount: 267,
    commentCount: 34,
    shareCount: 41,
    isTrending: false,
    isBreaking: false,
    isSponsored: false,
    tags: ["IT Services", "AI", "NASSCOM", "Technology", "Revenue"],
  },
  {
    id: "a12",
    slug: "green-hydrogen-saudi",
    title: "Saudi Arabia–India Green Hydrogen MoU: $5B Investment Pipeline Announced at Riyadh Energy Forum",
    summary: "Saudi Arabia and India have signed a Green Hydrogen MoU at the Riyadh Energy Forum, establishing a $5 billion investment pipeline for green hydrogen production, transportation, and storage infrastructure spanning both nations.",
    body: `<h2>Riyadh Energy Forum: A Green Pivot</h2>
<p>Against the backdrop of the Riyadh Energy Forum — one of the largest annual gatherings of energy ministers and industry leaders — Saudi Arabia and India signed a landmark <strong>Green Hydrogen Memorandum of Understanding (MoU)</strong>, establishing a $5 billion investment pipeline across the two countries' clean energy sectors.</p>
<p>The MoU was signed between Saudi Aramco's clean energy division, ACWA Power, and India's National Thermal Power Corporation (NTPC) and Indian Oil Corporation (IOC). It establishes a framework for joint investment in green hydrogen production facilities, hydrogen transportation infrastructure, and industrial application pilots.</p>
<h2>What the $5 Billion Will Fund</h2>
<p>The investment pipeline is divided across three tranches over six years. The first tranche ($1.2 billion) will fund <strong>green hydrogen production pilots</strong> in Rajasthan and Gujarat — states with high solar irradiation that makes renewable-powered electrolysis cost-competitive. The second tranche ($2 billion) targets hydrogen transportation and storage, including the exploration of a dedicated hydrogen pipeline between India's western coast and a Saudi hydrogen export hub. The third tranche ($1.8 billion) covers industrial application pilots in steel, fertilisers, and refining.</p>
<blockquote>"Green hydrogen is not an aspiration. It is an industrial necessity. Saudi Arabia and India together can reshape the global hydrogen trade map." — Saudi Energy Minister</blockquote>
<h2>India's Green Hydrogen Ambition</h2>
<p>India's National Green Hydrogen Mission, which targets the production of <strong>5 million metric tonnes of green hydrogen annually by 2030</strong>, has found in Saudi Arabia a natural partner — both as a co-investor and as a potential export destination for green ammonia derived from Indian renewable energy.</p>
<p>The cost of green hydrogen production in India — currently around $4-5 per kg — needs to fall to $1-2 per kg to be commercially competitive with grey hydrogen. The scale of investment contemplated under this MoU, combined with India's falling renewable energy costs, could help accelerate that cost reduction trajectory by 2-3 years, industry analysts estimate.</p>`,
    heroImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=450&fit=crop",
    readTime: 6,
    type: ContentType.MANUAL_AI,
    status: ArticleStatus.PUBLISHED,
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    sector: sectors[8],
    country: countries[3],
    sourceName: "IGN Editorial",
    authorName: "Ritu Patel",
    likeCount: 198,
    commentCount: 23,
    shareCount: 31,
    isTrending: false,
    isBreaking: false,
    isSponsored: false,
    tags: ["Saudi Arabia", "Green Hydrogen", "Energy", "MoU"],
  },
];

// ==========================================
// BREAKING NEWS
// ==========================================
export const breakingNews: BreakingNews[] = [
  {
    id: "bn1",
    headline: "BREAKING: India signs $2B semiconductor deal with Netherlands — ASML to set up training center in Bangalore",
    articleSlug: "india-semiconductor-push-2026",
  },
];

// ==========================================
// TRENDING ARTICLES (subset)
// ==========================================
export const trendingArticles = mockArticles
  .filter((a) => a.isTrending)
  .sort((a, b) => b.likeCount - a.likeCount);

// ==========================================
// MOST DISCUSSED (sorted by comments)
// ==========================================
export const mostDiscussedArticles = [...mockArticles]
  .sort((a, b) => b.commentCount - a.commentCount)
  .slice(0, 5);
