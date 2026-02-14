export interface Sector {
  id: string;
  name: string;
  icon: string; // lucide-react icon name
  description: string;
}

export const SECTORS: Sector[] = [
  { id: "manufacturing", name: "Manufacturing", icon: "Factory", description: "Industrial production & supply chains" },
  { id: "consumer-brands", name: "Consumer Brands", icon: "ShoppingBag", description: "FMCG, retail & consumer goods" },
  { id: "technology", name: "Technology", icon: "Cpu", description: "Software, hardware & digital innovation" },
  { id: "services", name: "Services", icon: "Briefcase", description: "Consulting, finance & business services" },
  { id: "education", name: "Education", icon: "GraduationCap", description: "EdTech, institutions & learning" },
  { id: "agriculture-food", name: "Agriculture & Food", icon: "Wheat", description: "Farming, food processing & agritech" },
  { id: "healthcare-pharma", name: "Healthcare & Pharma", icon: "HeartPulse", description: "Pharma, biotech & medical devices" },
  { id: "energy-sustainability", name: "Energy & Sustainability", icon: "Zap", description: "Renewables, oil & gas, green tech" },
  { id: "infrastructure-construction", name: "Infrastructure & Construction", icon: "Building2", description: "Real estate, construction & urban dev" },
  { id: "defence-aerospace-mobility", name: "Defence, Aerospace & Mobility", icon: "Shield", description: "Defence, aviation & EV mobility" },
  { id: "chemicals-materials", name: "Chemicals & Materials", icon: "FlaskConical", description: "Specialty chemicals & raw materials" },
  { id: "electronics-components", name: "Electronics & Components", icon: "CircuitBoard", description: "Semiconductors & electronic parts" },
];

export const FREE_SECTOR_LIMIT = 2;
