export interface SectorTaxonomyItem {
  code: string;
  name: string;
  ministry: string;
  count: number;
  icon: string;
  feed?: string;
}

export const IGEN_50_SECTORS: SectorTaxonomyItem[] = [
  { code: "S01", name: "Agriculture & Farmers Welfare", ministry: "Ministry of Agriculture & Farmers Welfare", count: 28, icon: "🌾", feed: "Harvest exports spike 14%." },
  { code: "S02", name: "AI & Cyber Security", ministry: "Ministry of Electronics & IT", count: 30, icon: "🤖", feed: "New cyber defense shield approved." },
  { code: "S03", name: "Animal Husbandry, Dairying & Fisheries", ministry: "Ministry of Fisheries, Animal Husbandry & Dairying", count: 28, icon: "🐄", feed: "Dairy export incentives expanded." },
  { code: "S04", name: "Atomic Energy", ministry: "Department of Atomic Energy", count: 27, icon: "⚛️", feed: "Small modular reactor pilot commissioned." },
  { code: "S05", name: "Ayush & Ayurveda & Herbal Medicine", ministry: "Ministry of Ayush", count: 31, icon: "🌿", feed: "Global herbal standards unified." },
  { code: "S06", name: "Biotechnology", ministry: "Ministry of Science & Technology", count: 30, icon: "🧬", feed: "Biotech seed fund releases $40M." },
  { code: "S07", name: "Chemicals & Fertilizers & Minerals", ministry: "Ministry of Chemicals & Fertilizers", count: 35, icon: "🧪", feed: "Specialty chemical export surge." },
  { code: "S08", name: "Petrochemicals", ministry: "Ministry of Chemicals & Fertilizers", count: 27, icon: "🛢️", feed: "Cracker plant expansion commissioned." },
  { code: "S09", name: "Civil Aviation", ministry: "Ministry of Civil Aviation", count: 29, icon: "✈️", feed: "Cargo airport hubs expanded." },
  { code: "S10", name: "Coal", ministry: "Ministry of Coal", count: 25, icon: "⛏️", feed: "Clean coal gasification initiative." },
  { code: "S11", name: "Communications & Telecom", ministry: "Ministry of Communications", count: 35, icon: "📡", feed: "6G spectrum research labs opened." },
  { code: "S12", name: "Consumer Brands & Retail", ministry: "Ministry of Commerce & Industry", count: 30, icon: "🏷️", feed: "Retail brand export volume up 18%." },
  { code: "S13", name: "Defence & Aerospace", ministry: "Ministry of Defence", count: 25, icon: "🛡️", feed: "Indo-French UAV trials conclude." },
  { code: "S14", name: "Earth Sciences & Climate", ministry: "Ministry of Earth Sciences", count: 25, icon: "🌐", feed: "Deep-ocean climate sensors deployed." },
  { code: "S15", name: "Education & EdTech", ministry: "Ministry of Education", count: 25, icon: "🎓", feed: "EduTech export guidelines issued." },
  { code: "S16", name: "Electronics & IT & Components", ministry: "Ministry of Electronics & IT", count: 35, icon: "💻", feed: "Mobile manufacturing incentive doubled." },
  { code: "S17", name: "Energy & Sustainability", ministry: "Ministry of New & Renewable Energy", count: 28, icon: "⚡", feed: "Solar grid interconnectivity funded." },
  { code: "S18", name: "Environment, Forest & Climate Change", ministry: "Ministry of Environment, Forest & Climate Change", count: 25, icon: "🌲", feed: "Carbon credit trading portal launched." },
  { code: "S19", name: "Fertilizers & Agri-Inputs", ministry: "Ministry of Chemicals & Fertilizers", count: 25, icon: "🌱", feed: "Nano-urea domestic production hits peak." },
  { code: "S20", name: "Fisheries & Marine Products", ministry: "Ministry of Fisheries, Animal Husbandry & Dairying", count: 25, icon: "🐟", feed: "Shrimp & seafood export tariffs cut." },
  { code: "S21", name: "FMCG & Consumer Packaged Goods", ministry: "Ministry of Consumer Affairs", count: 25, icon: "📦", feed: "Rural FMCG demand surges 12%." },
  { code: "S22", name: "Food Processing Industries", ministry: "Ministry of Food Processing Industries", count: 25, icon: "🥫", feed: "Mega food parks gain PLI incentives." },
  { code: "S23", name: "Health & Family Welfare & Pharma", ministry: "Ministry of Health & Family Welfare", count: 25, icon: "🏥", feed: "Medical device parks inaugurated." },
  { code: "S24", name: "Heavy Industries & Machinery", ministry: "Ministry of Heavy Industries", count: 25, icon: "🚜", feed: "Capital goods output index expands." },
  { code: "S25", name: "Information & Broadcasting & Media", ministry: "Ministry of Information & Broadcasting", count: 25, icon: "📺", feed: "AVGC media hub incentives announced." },
  { code: "S26", name: "Infrastructure & Urban Development", ministry: "Ministry of Housing & Urban Affairs", count: 25, icon: "🏗️", feed: "Smart city logistics corridors funded." },
  { code: "S27", name: "Labour & Employment & HR Tech", ministry: "Ministry of Labour & Employment", count: 25, icon: "👥", feed: "Gig economy social security code enacted." },
  { code: "S28", name: "Manufacturing & Industrial Goods", ministry: "Ministry of Commerce & Industry", count: 25, icon: "🏭", feed: "PM Gati Shakti multi-modal hubs added." },
  { code: "S29", name: "Mines & Critical Minerals", ministry: "Ministry of Mines", count: 25, icon: "💎", feed: "Lithium & Cobalt block auctions open." },
  { code: "S30", name: "New & Renewable Clean Energy", ministry: "Ministry of New & Renewable Energy", count: 25, icon: "☀️", feed: "Green Hydrogen SIGHT Phase 2 launched." },
  { code: "S31", name: "Petroleum & Natural Gas", ministry: "Ministry of Petroleum & Natural Gas", count: 30, icon: "⛽", feed: "Strategic petroleum reserve expanded." },
  { code: "S32", name: "Pharmaceuticals & Formulations", ministry: "Ministry of Chemicals & Fertilizers", count: 30, icon: "💊", feed: "API bulk drug parks reach commercial ops." },
  { code: "S33", name: "Ports, Shipping & Waterways", ministry: "Ministry of Ports, Shipping & Waterways", count: 26, icon: "🚢", feed: "Mundra & JNPT container throughput peak." },
  { code: "S34", name: "Power & Electrical Grids", ministry: "Ministry of Power", count: 28, icon: "🔌", feed: "Smart meter national grid roll-out." },
  { code: "S35", name: "Professional Services & Consulting", ministry: "Ministry of Commerce & Industry", count: 25, icon: "💼", feed: "GCC global capability centers double." },
  { code: "S36", name: "Space & ISRO Commercial Tech", ministry: "Department of Space / ISRO", count: 25, icon: "🚀", feed: "IN-SPACe private satellite launches." },
  { code: "S37", name: "Steel & Metallurgy", ministry: "Ministry of Steel", count: 26, icon: "⛓️", feed: "Green steel production standards set." },
  { code: "S38", name: "Technology & Enterprise Software", ministry: "Ministry of Electronics & IT", count: 30, icon: "🖥️", feed: "Enterprise SaaS exports cross $30B." },
  { code: "S39", name: "Textiles & Apparel", ministry: "Ministry of Textiles", count: 27, icon: "🧵", feed: "PM MITRA mega textile parks active." },
  { code: "S40", name: "Tourism & Hospitality", ministry: "Ministry of Tourism", count: 25, icon: "🏨", feed: "MICE tourism corridors expanded." },
  { code: "S41", name: "Banking & Financial Services (BFSI)", ministry: "Ministry of Finance", count: 26, icon: "🏦", feed: "GIFT City offshore banking volume up 35%." },
  { code: "S42", name: "FinTech & Digital Payments", ministry: "Reserve Bank of India", count: 26, icon: "💳", feed: "UPI records 15B transactions in June." },
  { code: "S43", name: "Logistics & Supply Chain", ministry: "Ministry of Commerce & Industry", count: 26, icon: "🚚", feed: "National Logistics Policy lowers costs." },
  { code: "S44", name: "Railways & High-Speed Metro", ministry: "Ministry of Railways", count: 26, icon: "🚆", feed: "Vande Bharat freight corridors tested." },
  { code: "S45", name: "Automotive & Electric Vehicles", ministry: "Ministry of Heavy Industries", count: 26, icon: "🚗", feed: "EV battery swap standards finalized." },
  { code: "S46", name: "Semiconductors & OSAT", ministry: "Ministry of Electronics & IT", count: 26, icon: "🎛️", feed: "Phase 2 fab subsidies expand." },
  { code: "S47", name: "Startups & Innovation", ministry: "DPIIT", count: 26, icon: "💡", feed: "Unicorn seed fund allocation increased." },
  { code: "S48", name: "Retail & E-Commerce", ministry: "Ministry of Commerce & Industry", count: 26, icon: "🛒", feed: "ONDC open network onboarding spikes." },
  { code: "S49", name: "Water Resources & Desalination", ministry: "Ministry of Jal Shakti", count: 26, icon: "💧", feed: "Desalination & water treatment PLI." },
  { code: "S50", name: "Waste Management & Circular Economy", ministry: "Ministry of Environment, Forest & Climate Change", count: 26, icon: "♻️", feed: "E-waste recycling mandatory targets active." }
];
