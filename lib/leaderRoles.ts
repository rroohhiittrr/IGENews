export interface LeaderRole {
  id: string;
  name: string;
  icon: string;
}

export const LEADER_ROLES: LeaderRole[] = [
  { id: "reader", name: "Reader", icon: "BookOpen" },
  { id: "sme", name: "Subject Matter Expert (SME)", icon: "UserCheck" },
  { id: "associate-sme", name: "Associate Subject Matter Expert", icon: "UserPlus" },
  { id: "founder", name: "Founder", icon: "Rocket" },
  { id: "co-founder", name: "Co-Founder", icon: "Users" },
  { id: "ceo", name: "Chief Executive Officer (CEO)", icon: "Crown" },
  { id: "cto", name: "Chief Technology Officer (CTO)", icon: "Code" },
  { id: "coo", name: "Chief Operating Officer (COO)", icon: "Settings" },
  { id: "cfo", name: "Chief Financial Officer (CFO)", icon: "DollarSign" },
  { id: "cmo", name: "Chief Marketing Officer (CMO)", icon: "Megaphone" },
  { id: "managing-director", name: "Managing Director", icon: "Building" },
  { id: "director", name: "Director", icon: "Briefcase" },
  { id: "president", name: "President", icon: "Award" },
  { id: "vice-president", name: "Vice President", icon: "TrendingUp" },
  { id: "head-of-department", name: "Head of Department", icon: "LayoutGrid" },
  { id: "business-head", name: "Business Head", icon: "Target" },
  { id: "product-head", name: "Product Head", icon: "Package" },
  { id: "technology-head", name: "Technology Head", icon: "Monitor" },
  { id: "editor-in-chief", name: "Editor-in-Chief", icon: "Newspaper" },
  { id: "managing-editor", name: "Managing Editor", icon: "FileEdit" },
  { id: "journalist", name: "Journalist / Reporter", icon: "Mic" },
  { id: "analyst", name: "Analyst", icon: "BarChart3" },
  { id: "research-lead", name: "Research Lead", icon: "FlaskConical" },
  { id: "operations-lead", name: "Operations Lead", icon: "ClipboardList" },
  { id: "employee", name: "Employee", icon: "User" },
];

export const FREE_LEADER_LIMIT = 3;
