export interface LeaderRole {
  id: string;
  name: string;
  icon: string;
}

export const LEADER_ROLES: LeaderRole[] = [
  { id: "employee", name: "Employee", icon: "UserCheck" },
  { id: "founder", name: "Founder", icon: "Rocket" },
  { id: "co-founder", name: "Co-Founder", icon: "Users" },
  { id: "ceo", name: "CEO", icon: "Crown" },
  { id: "managing-director", name: "Managing Director (MD)", icon: "Building" },
  { id: "coo", name: "COO", icon: "Settings" },
  { id: "cfo", name: "CFO", icon: "DollarSign" },
  { id: "cto", name: "CTO", icon: "Code" },
  { id: "cmo", name: "CMO", icon: "Megaphone" },
  { id: "chro", name: "CHRO", icon: "Heart" },
  { id: "cio", name: "CIO", icon: "Monitor" },
  { id: "cro", name: "CRO", icon: "TrendingUp" },
  { id: "board-member", name: "Board Member", icon: "LayoutGrid" },
  { id: "investor-vc", name: "Investor / Venture Capitalist", icon: "Banknote" },
  { id: "government-official", name: "Government Official / Policy Maker", icon: "Landmark" },
];

export const FREE_LEADER_LIMIT = 5;
