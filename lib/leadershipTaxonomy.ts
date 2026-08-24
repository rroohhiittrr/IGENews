// Master Leadership Taxonomy Data extracted from Master_Leadership_Taxonomy.xlsx
// Contains 6 Groups, 66 Categories, 294 Subcategories, and 1,233 Titles

export interface LeaderSubcategory {
  id: string;
  name: string;
  categoryId: string;
  titles: string[];
}

export interface LeaderCategory {
  id: string;
  num: number;
  name: string;
  group: string;
  groupId: string;
  icon: string;
  subcategories: LeaderSubcategory[];
}

export interface LeaderGroup {
  id: string;
  name: string;
  categories: LeaderCategory[];
}

export interface LeaderTitle {
  id: string;
  title: string;
  categoryId: string;
  categoryName: string;
  subcategoryId?: string | null;
  subcategoryName?: string;
  groupName: string;
}

export const FREE_LEADER_CATEGORY_LIMIT = 5;

export const LEADERSHIP_GROUPS: LeaderGroup[] = [
  {
    "id": "grp-1",
    "name": "Leadership & Governance",
    "categories": [
      {
        "id": "cat-1",
        "num": 1,
        "name": "Executive Leadership",
        "group": "Leadership & Governance",
        "groupId": "grp-1",
        "icon": "Crown",
        "subcategories": [
          {
            "id": "sub-1-1",
            "name": "Founders",
            "categoryId": "cat-1",
            "titles": [
              "Founder",
              "Co-Founder",
              "Founding Partner",
              "Promoter",
              "Co-Promoter",
              "Managing Partner"
            ]
          },
          {
            "id": "sub-1-2",
            "name": "Board Leadership",
            "categoryId": "cat-1",
            "titles": [
              "Chairman",
              "Executive Chairman",
              "Vice Chairman",
              "Board Director",
              "Independent Director",
              "Non-Executive Director",
              "Lead Independent Director",
              "Board Advisor"
            ]
          },
          {
            "id": "sub-1-3",
            "name": "Executive Management",
            "categoryId": "cat-1",
            "titles": [
              "Chief Executive Officer (CEO)",
              "President",
              "Managing Director (MD)",
              "Executive Director",
              "Group CEO",
              "Regional CEO",
              "Country CEO",
              "Business Unit CEO",
              "Division President",
              "Executive Vice President"
            ]
          },
          {
            "id": "sub-1-4",
            "name": "Leadership Office",
            "categoryId": "cat-1",
            "titles": [
              "Chief of Staff",
              "Executive Secretary",
              "Executive Advisor",
              "Senior Advisor",
              "Strategic Advisor"
            ]
          }
        ]
      },
      {
        "id": "cat-2",
        "num": 2,
        "name": "Corporate Governance",
        "group": "Leadership & Governance",
        "groupId": "grp-1",
        "icon": "Building2",
        "subcategories": [
          {
            "id": "sub-2-1",
            "name": "Board Governance",
            "categoryId": "cat-2",
            "titles": [
              "Governance Chairman",
              "Board Chairman",
              "Board Director",
              "Independent Director",
              "Non-Executive Director",
              "Governance Advisor"
            ]
          },
          {
            "id": "sub-2-2",
            "name": "Governance Office",
            "categoryId": "cat-2",
            "titles": [
              "Chief Governance Officer",
              "Governance Director",
              "Governance Head",
              "Governance Manager",
              "Governance Officer"
            ]
          },
          {
            "id": "sub-2-3",
            "name": "Board Committees",
            "categoryId": "cat-2",
            "titles": [
              "Audit Committee Chair",
              "Nomination Committee Chair",
              "Remuneration Committee Chair",
              "ESG Committee Chair",
              "Ethics Committee Chair"
            ]
          },
          {
            "id": "sub-2-4",
            "name": "Corporate Secretariat",
            "categoryId": "cat-2",
            "titles": [
              "Company Secretary",
              "Assistant Company Secretary",
              "Board Secretary",
              "Corporate Secretary"
            ]
          }
        ]
      },
      {
        "id": "cat-3",
        "num": 3,
        "name": "Corporate Legal",
        "group": "Leadership & Governance",
        "groupId": "grp-1",
        "icon": "Shield",
        "subcategories": [
          {
            "id": "sub-3-1",
            "name": "Legal Leadership",
            "categoryId": "cat-3",
            "titles": [
              "Chief Legal Officer (CLO)",
              "General Counsel",
              "Legal Director",
              "Head of Legal",
              "Legal Advisor"
            ]
          },
          {
            "id": "sub-3-2",
            "name": "Corporate Legal",
            "categoryId": "cat-3",
            "titles": [
              "Senior Legal Counsel",
              "Corporate Counsel",
              "Associate General Counsel",
              "Legal Manager"
            ]
          },
          {
            "id": "sub-3-3",
            "name": "Contracts",
            "categoryId": "cat-3",
            "titles": [
              "Contracts Director",
              "Contracts Manager",
              "Commercial Counsel",
              "Contract Specialist"
            ]
          },
          {
            "id": "sub-3-4",
            "name": "Litigation",
            "categoryId": "cat-3",
            "titles": [
              "Litigation Head",
              "Litigation Counsel",
              "Arbitration Counsel",
              "Legal Compliance Counsel"
            ]
          }
        ]
      },
      {
        "id": "cat-4",
        "num": 4,
        "name": "Corporate Compliance",
        "group": "Leadership & Governance",
        "groupId": "grp-1",
        "icon": "Briefcase",
        "subcategories": [
          {
            "id": "sub-4-1",
            "name": "Compliance Leadership",
            "categoryId": "cat-4",
            "titles": [
              "Chief Compliance Officer",
              "Compliance Director",
              "Compliance Head",
              "Compliance Manager"
            ]
          },
          {
            "id": "sub-4-2",
            "name": "Regulatory Compliance",
            "categoryId": "cat-4",
            "titles": [
              "Regulatory Affairs Director",
              "Regulatory Compliance Head",
              "Regulatory Manager",
              "Licensing Manager"
            ]
          },
          {
            "id": "sub-4-3",
            "name": "Ethics & Integrity",
            "categoryId": "cat-4",
            "titles": [
              "Ethics Officer",
              "Integrity Officer",
              "Ethics Director",
              "Whistleblower Officer"
            ]
          },
          {
            "id": "sub-4-4",
            "name": "Corporate Compliance",
            "categoryId": "cat-4",
            "titles": [
              "Compliance Auditor",
              "Compliance Analyst",
              "Governance Officer",
              "Compliance Executive"
            ]
          }
        ]
      },
      {
        "id": "cat-5",
        "num": 5,
        "name": "Administration",
        "group": "Leadership & Governance",
        "groupId": "grp-1",
        "icon": "Users",
        "subcategories": [
          {
            "id": "sub-5-1",
            "name": "Administration Leadership",
            "categoryId": "cat-5",
            "titles": [
              "Chief Administrative Officer (CAO)",
              "Administration Director",
              "Administration Head",
              "Administration Manager"
            ]
          },
          {
            "id": "sub-5-2",
            "name": "Office Administration",
            "categoryId": "cat-5",
            "titles": [
              "Office Manager",
              "Office Administrator",
              "Executive Administrator",
              "Administrative Officer"
            ]
          },
          {
            "id": "sub-5-3",
            "name": "Facilities",
            "categoryId": "cat-5",
            "titles": [
              "Facilities Director",
              "Facilities Manager",
              "Workplace Manager",
              "Building Manager"
            ]
          },
          {
            "id": "sub-5-4",
            "name": "Corporate Services",
            "categoryId": "cat-5",
            "titles": [
              "Travel Manager",
              "Fleet Manager",
              "Asset Manager",
              "Office Services Head"
            ]
          }
        ]
      },
      {
        "id": "cat-6",
        "num": 6,
        "name": "Marketing Excellence",
        "group": "Leadership & Governance",
        "groupId": "grp-1",
        "icon": "Landmark",
        "subcategories": [
          {
            "id": "sub-6-1",
            "name": "Marketing Leadership",
            "categoryId": "cat-6",
            "titles": [
              "Chief Marketing Officer (CMO)",
              "VP Marketing",
              "Marketing Director",
              "Head of Marketing",
              "Marketing Manager"
            ]
          },
          {
            "id": "sub-6-2",
            "name": "Digital Marketing",
            "categoryId": "cat-6",
            "titles": [
              "Digital Marketing Director",
              "SEO Director",
              "Performance Marketing Head",
              "Growth Marketing Head"
            ]
          },
          {
            "id": "sub-6-3",
            "name": "Content Marketing",
            "categoryId": "cat-6",
            "titles": [
              "Content Director",
              "Content Marketing Manager",
              "Campaign Manager",
              "Marketing Communications Manager"
            ]
          },
          {
            "id": "sub-6-4",
            "name": "Market Intelligence",
            "categoryId": "cat-6",
            "titles": [
              "Market Research Director",
              "Consumer Insights Head",
              "Marketing Analyst",
              "Competitive Intelligence Manager"
            ]
          }
        ]
      },
      {
        "id": "cat-7",
        "num": 7,
        "name": "Corporate Communications",
        "group": "Leadership & Governance",
        "groupId": "grp-1",
        "icon": "Award",
        "subcategories": [
          {
            "id": "sub-7-1",
            "name": "Communications Leadership",
            "categoryId": "cat-7",
            "titles": [
              "Chief Communications Officer (CCO)",
              "Communications Director",
              "Communications Head",
              "Communications Manager"
            ]
          },
          {
            "id": "sub-7-2",
            "name": "Public Relations",
            "categoryId": "cat-7",
            "titles": [
              "PR Director",
              "PR Manager",
              "Media Relations Head",
              "Corporate Spokesperson"
            ]
          },
          {
            "id": "sub-7-3",
            "name": "Internal Communications",
            "categoryId": "cat-7",
            "titles": [
              "Internal Communications Head",
              "Employee Communications Manager",
              "Communications Executive"
            ]
          },
          {
            "id": "sub-7-4",
            "name": "External Communications",
            "categoryId": "cat-7",
            "titles": [
              "External Relations Director",
              "Corporate Affairs Manager",
              "Media Advisor",
              "Press Secretary"
            ]
          }
        ]
      },
      {
        "id": "cat-8",
        "num": 8,
        "name": "Government Relations",
        "group": "Leadership & Governance",
        "groupId": "grp-1",
        "icon": "Globe",
        "subcategories": [
          {
            "id": "sub-8-1",
            "name": "Government Affairs",
            "categoryId": "cat-8",
            "titles": [
              "Chief Public Affairs Officer",
              "Government Relations Director",
              "Government Relations Head",
              "Government Affairs Manager",
              "Public Affairs Manager"
            ]
          },
          {
            "id": "sub-8-2",
            "name": "Public Policy",
            "categoryId": "cat-8",
            "titles": [
              "Public Policy Director",
              "Policy Head",
              "Policy Advisor",
              "Regulatory Policy Manager"
            ]
          },
          {
            "id": "sub-8-3",
            "name": "Regulatory Relations",
            "categoryId": "cat-8",
            "titles": [
              "Regulatory Affairs Director",
              "Regulatory Liaison Officer",
              "Government Liaison Officer",
              "Licensing Head"
            ]
          },
          {
            "id": "sub-8-4",
            "name": "External Affairs",
            "categoryId": "cat-8",
            "titles": [
              "External Affairs Director",
              "Stakeholder Relations Head",
              "Diplomatic Affairs Manager",
              "Trade Relations Manager"
            ]
          }
        ]
      },
      {
        "id": "cat-9",
        "num": 9,
        "name": "Public Policy",
        "group": "Leadership & Governance",
        "groupId": "grp-1",
        "icon": "Mic",
        "subcategories": [
          {
            "id": "sub-9-1",
            "name": "Policy Leadership",
            "categoryId": "cat-9",
            "titles": [
              "Chief Public Policy Officer",
              "Public Policy Director",
              "Head of Public Policy",
              "VP Public Policy",
              "Policy Advisor"
            ]
          },
          {
            "id": "sub-9-2",
            "name": "Policy Development",
            "categoryId": "cat-9",
            "titles": [
              "Policy Research Director",
              "Policy Development Manager",
              "Legislative Affairs Head",
              "Policy Analyst"
            ]
          },
          {
            "id": "sub-9-3",
            "name": "Regulatory Policy",
            "categoryId": "cat-9",
            "titles": [
              "Regulatory Policy Director",
              "Regulatory Affairs Manager",
              "Government Policy Advisor",
              "Public Affairs Executive"
            ]
          },
          {
            "id": "sub-9-4",
            "name": "Strategic Policy",
            "categoryId": "cat-9",
            "titles": [
              "Economic Policy Advisor",
              "Trade Policy Specialist",
              "Industry Policy Head",
              "Public Policy Consultant"
            ]
          }
        ]
      },
      {
        "id": "cat-10",
        "num": 10,
        "name": "Health, Safety & Environment (HSE/EHS)",
        "group": "Leadership & Governance",
        "groupId": "grp-1",
        "icon": "Activity",
        "subcategories": [
          {
            "id": "sub-10-1",
            "name": "HSE Leadership",
            "categoryId": "cat-10",
            "titles": [
              "Chief HSE Officer",
              "HSE Director",
              "Head of HSE",
              "HSE Manager"
            ]
          },
          {
            "id": "sub-10-2",
            "name": "Health & Safety",
            "categoryId": "cat-10",
            "titles": [
              "Occupational Health Director",
              "Safety Director",
              "Safety Manager",
              "Industrial Hygienist",
              "Safety Officer"
            ]
          },
          {
            "id": "sub-10-3",
            "name": "Environmental Management",
            "categoryId": "cat-10",
            "titles": [
              "Environment Director",
              "Environmental Compliance Manager",
              "Environmental Engineer",
              "Sustainability Officer"
            ]
          },
          {
            "id": "sub-10-4",
            "name": "Emergency & Risk",
            "categoryId": "cat-10",
            "titles": [
              "Emergency Response Manager",
              "Fire & Safety Head",
              "Disaster Recovery Manager",
              "Crisis Management Lead"
            ]
          }
        ]
      },
      {
        "id": "cat-11",
        "num": 11,
        "name": "Diplomacy",
        "group": "Leadership & Governance",
        "groupId": "grp-1",
        "icon": "FileEdit",
        "subcategories": [
          {
            "id": "sub-11-1",
            "name": "Diplomatic Leadership",
            "categoryId": "cat-11",
            "titles": [
              "Ambassador",
              "High Commissioner",
              "Deputy High Commissioner",
              "Permanent Representative"
            ]
          },
          {
            "id": "sub-11-2",
            "name": "Trade Diplomacy",
            "categoryId": "cat-11",
            "titles": [
              "Trade Commissioner",
              "Commercial Attach\u00e9",
              "Economic Counsellor",
              "Trade Promotion Officer"
            ]
          },
          {
            "id": "sub-11-3",
            "name": "Consular Affairs",
            "categoryId": "cat-11",
            "titles": [
              "Consul General",
              "Deputy Consul General",
              "Consular Officer",
              "Visa Officer"
            ]
          },
          {
            "id": "sub-11-4",
            "name": "International Relations",
            "categoryId": "cat-11",
            "titles": [
              "International Relations Director",
              "Bilateral Affairs Head",
              "Multilateral Affairs Head",
              "Foreign Affairs Advisor"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "grp-2",
    "name": "Finance, Strategy & Growth",
    "categories": [
      {
        "id": "cat-12",
        "num": 12,
        "name": "Corporate Strategy",
        "group": "Finance, Strategy & Growth",
        "groupId": "grp-2",
        "icon": "Target",
        "subcategories": [
          {
            "id": "sub-12-1",
            "name": "Strategy Leadership",
            "categoryId": "cat-12",
            "titles": [
              "Chief Strategy Officer (CSO)",
              "Strategy Director",
              "VP Strategy",
              "Head of Strategy",
              "Strategy Manager"
            ]
          },
          {
            "id": "sub-12-2",
            "name": "Business Planning",
            "categoryId": "cat-12",
            "titles": [
              "Corporate Planning Director",
              "Strategic Planning Manager",
              "Business Planning Head",
              "Planning Analyst"
            ]
          },
          {
            "id": "sub-12-3",
            "name": "Growth Strategy",
            "categoryId": "cat-12",
            "titles": [
              "Growth Strategy Director",
              "Market Expansion Head",
              "Business Strategy Lead",
              "Competitive Strategy Manager"
            ]
          },
          {
            "id": "sub-12-4",
            "name": "Enterprise Strategy",
            "categoryId": "cat-12",
            "titles": [
              "Enterprise Architect",
              "Portfolio Strategy Head",
              "Strategic Initiatives Lead",
              "Transformation Advisor"
            ]
          }
        ]
      },
      {
        "id": "cat-13",
        "num": 13,
        "name": "Business Transformation",
        "group": "Finance, Strategy & Growth",
        "groupId": "grp-2",
        "icon": "TrendingUp",
        "subcategories": [
          {
            "id": "sub-13-1",
            "name": "Transformation Leadership",
            "categoryId": "cat-13",
            "titles": [
              "Chief Transformation Officer",
              "Transformation Director",
              "Head of Transformation",
              "Transformation Manager"
            ]
          },
          {
            "id": "sub-13-2",
            "name": "Organizational Change",
            "categoryId": "cat-13",
            "titles": [
              "Change Management Director",
              "Change Manager",
              "Organizational Change Lead",
              "Business Excellence Head"
            ]
          },
          {
            "id": "sub-13-3",
            "name": "Process Excellence",
            "categoryId": "cat-13",
            "titles": [
              "Process Improvement Director",
              "Lean Transformation Manager",
              "Six Sigma Leader",
              "Operational Excellence Head"
            ]
          },
          {
            "id": "sub-13-4",
            "name": "Strategic Initiatives",
            "categoryId": "cat-13",
            "titles": [
              "Strategic Programs Director",
              "Enterprise Transformation Lead",
              "Business Improvement Manager",
              "Innovation Transformation Head"
            ]
          }
        ]
      },
      {
        "id": "cat-14",
        "num": 14,
        "name": "Finance",
        "group": "Finance, Strategy & Growth",
        "groupId": "grp-2",
        "icon": "DollarSign",
        "subcategories": [
          {
            "id": "sub-14-1",
            "name": "Finance Leadership",
            "categoryId": "cat-14",
            "titles": [
              "Chief Financial Officer (CFO)",
              "Deputy CFO",
              "Finance Director",
              "VP Finance",
              "Head of Finance"
            ]
          },
          {
            "id": "sub-14-2",
            "name": "Accounting",
            "categoryId": "cat-14",
            "titles": [
              "Chief Accounting Officer",
              "Financial Controller",
              "Finance Controller",
              "Chief Accountant",
              "Accounting Manager"
            ]
          },
          {
            "id": "sub-14-3",
            "name": "Financial Planning",
            "categoryId": "cat-14",
            "titles": [
              "FP&A Director",
              "Budget Director",
              "Cost Controller",
              "Financial Planning Manager"
            ]
          },
          {
            "id": "sub-14-4",
            "name": "Financial Operations",
            "categoryId": "cat-14",
            "titles": [
              "Payroll Head",
              "Tax Director",
              "Financial Reporting Manager",
              "Accounts Payable Manager"
            ]
          }
        ]
      },
      {
        "id": "cat-15",
        "num": 15,
        "name": "Treasury",
        "group": "Finance, Strategy & Growth",
        "groupId": "grp-2",
        "icon": "CreditCard",
        "subcategories": [
          {
            "id": "sub-15-1",
            "name": "Treasury Leadership",
            "categoryId": "cat-15",
            "titles": [
              "Treasurer",
              "Treasury Director",
              "Head of Treasury",
              "Treasury Manager"
            ]
          },
          {
            "id": "sub-15-2",
            "name": "Cash Management",
            "categoryId": "cat-15",
            "titles": [
              "Cash Management Director",
              "Liquidity Manager",
              "Working Capital Manager",
              "Banking Relations Manager"
            ]
          },
          {
            "id": "sub-15-3",
            "name": "Investments",
            "categoryId": "cat-15",
            "titles": [
              "Chief Investment Officer",
              "Investment Director",
              "Portfolio Manager",
              "Capital Markets Manager"
            ]
          },
          {
            "id": "sub-15-4",
            "name": "Foreign Exchange",
            "categoryId": "cat-15",
            "titles": [
              "FX Manager",
              "Currency Risk Manager",
              "Hedging Specialist",
              "Treasury Analyst"
            ]
          }
        ]
      },
      {
        "id": "cat-16",
        "num": 16,
        "name": "Investor Relations",
        "group": "Finance, Strategy & Growth",
        "groupId": "grp-2",
        "icon": "BarChart3",
        "subcategories": [
          {
            "id": "sub-16-1",
            "name": "Investor Relations Leadership",
            "categoryId": "cat-16",
            "titles": [
              "Chief Investor Relations Officer",
              "Investor Relations Director",
              "Head of Investor Relations",
              "Investor Relations Manager"
            ]
          },
          {
            "id": "sub-16-2",
            "name": "Shareholder Relations",
            "categoryId": "cat-16",
            "titles": [
              "Shareholder Communications Director",
              "Shareholder Services Manager",
              "Investor Communications Lead",
              "Stakeholder Relations Manager"
            ]
          },
          {
            "id": "sub-16-3",
            "name": "Capital Markets",
            "categoryId": "cat-16",
            "titles": [
              "Capital Markets Director",
              "Equity Research Head",
              "Market Intelligence Manager",
              "Investment Communications Manager"
            ]
          },
          {
            "id": "sub-16-4",
            "name": "Corporate Reporting",
            "categoryId": "cat-16",
            "titles": [
              "Annual Report Manager",
              "ESG Reporting Lead",
              "Financial Communications Manager",
              "Disclosure Officer"
            ]
          }
        ]
      },
      {
        "id": "cat-17",
        "num": 17,
        "name": "Risk Management",
        "group": "Finance, Strategy & Growth",
        "groupId": "grp-2",
        "icon": "Layers",
        "subcategories": [
          {
            "id": "sub-17-1",
            "name": "Risk Leadership",
            "categoryId": "cat-17",
            "titles": [
              "Chief Risk Officer (CRO)",
              "Risk Director",
              "VP Risk Management",
              "Head of Risk",
              "Risk Manager"
            ]
          },
          {
            "id": "sub-17-2",
            "name": "Enterprise Risk",
            "categoryId": "cat-17",
            "titles": [
              "Enterprise Risk Director",
              "Enterprise Risk Manager",
              "Risk Assessment Lead",
              "Business Continuity Manager"
            ]
          },
          {
            "id": "sub-17-3",
            "name": "Operational Risk",
            "categoryId": "cat-17",
            "titles": [
              "Operational Risk Head",
              "Operational Risk Manager",
              "Internal Controls Manager",
              "Risk Analytics Manager"
            ]
          },
          {
            "id": "sub-17-4",
            "name": "Compliance Risk",
            "categoryId": "cat-17",
            "titles": [
              "Regulatory Risk Manager",
              "Financial Risk Manager",
              "Credit Risk Manager",
              "Market Risk Manager"
            ]
          }
        ]
      },
      {
        "id": "cat-18",
        "num": 18,
        "name": "Corporate Audit",
        "group": "Finance, Strategy & Growth",
        "groupId": "grp-2",
        "icon": "Store",
        "subcategories": [
          {
            "id": "sub-18-1",
            "name": "Audit Leadership",
            "categoryId": "cat-18",
            "titles": [
              "Chief Audit Executive (CAE)",
              "Internal Audit Director",
              "Head of Internal Audit",
              "Audit Manager"
            ]
          },
          {
            "id": "sub-18-2",
            "name": "Internal Audit",
            "categoryId": "cat-18",
            "titles": [
              "Senior Internal Auditor",
              "Internal Auditor",
              "Audit Supervisor",
              "Audit Executive"
            ]
          },
          {
            "id": "sub-18-3",
            "name": "Financial Audit",
            "categoryId": "cat-18",
            "titles": [
              "Financial Audit Director",
              "Financial Auditor",
              "Revenue Audit Manager",
              "Cost Audit Manager"
            ]
          },
          {
            "id": "sub-18-4",
            "name": "Governance Audit",
            "categoryId": "cat-18",
            "titles": [
              "Compliance Auditor",
              "Process Auditor",
              "IT Auditor",
              "Audit Analyst"
            ]
          }
        ]
      },
      {
        "id": "cat-19",
        "num": 19,
        "name": "Digital Transformation",
        "group": "Finance, Strategy & Growth",
        "groupId": "grp-2",
        "icon": "ShoppingBag",
        "subcategories": [
          {
            "id": "sub-19-1",
            "name": "Digital Leadership",
            "categoryId": "cat-19",
            "titles": [
              "Chief Digital Officer (CDO)",
              "Digital Transformation Director",
              "Head of Digital Transformation",
              "Digital Strategy Manager"
            ]
          },
          {
            "id": "sub-19-2",
            "name": "Digital Innovation",
            "categoryId": "cat-19",
            "titles": [
              "Digital Innovation Director",
              "Innovation Manager",
              "Smart Technology Lead",
              "Automation Lead"
            ]
          },
          {
            "id": "sub-19-3",
            "name": "Enterprise Digital",
            "categoryId": "cat-19",
            "titles": [
              "Enterprise Digital Head",
              "Business Process Digitization Manager",
              "Digital Program Manager",
              "Transformation Consultant"
            ]
          },
          {
            "id": "sub-19-4",
            "name": "Digital Excellence",
            "categoryId": "cat-19",
            "titles": [
              "Digital Excellence Manager",
              "Customer Digital Experience Lead",
              "Digital Adoption Manager",
              "Change Enablement Manager"
            ]
          }
        ]
      },
      {
        "id": "cat-20",
        "num": 20,
        "name": "Sales Excellence",
        "group": "Finance, Strategy & Growth",
        "groupId": "grp-2",
        "icon": "Rocket",
        "subcategories": [
          {
            "id": "sub-20-1",
            "name": "Sales Leadership",
            "categoryId": "cat-20",
            "titles": [
              "Chief Sales Officer (CSO)",
              "VP Sales",
              "Sales Director",
              "Head of Sales",
              "National Sales Head"
            ]
          },
          {
            "id": "sub-20-2",
            "name": "Business Sales",
            "categoryId": "cat-20",
            "titles": [
              "Regional Sales Director",
              "Territory Sales Manager",
              "Area Sales Manager",
              "Key Account Manager"
            ]
          },
          {
            "id": "sub-20-3",
            "name": "Enterprise Sales",
            "categoryId": "cat-20",
            "titles": [
              "Enterprise Sales Director",
              "Strategic Accounts Director",
              "Global Sales Head",
              "Channel Sales Director"
            ]
          },
          {
            "id": "sub-20-4",
            "name": "Sales Operations",
            "categoryId": "cat-20",
            "titles": [
              "Sales Operations Manager",
              "Sales Excellence Manager",
              "Revenue Operations Manager",
              "Sales Enablement Manager"
            ]
          }
        ]
      },
      {
        "id": "cat-21",
        "num": 21,
        "name": "Brand Management",
        "group": "Finance, Strategy & Growth",
        "groupId": "grp-2",
        "icon": "Zap",
        "subcategories": [
          {
            "id": "sub-21-1",
            "name": "Brand Leadership",
            "categoryId": "cat-21",
            "titles": [
              "Chief Brand Officer (CBO)",
              "Brand Director",
              "Head of Brand",
              "Brand Manager"
            ]
          },
          {
            "id": "sub-21-2",
            "name": "Brand Strategy",
            "categoryId": "cat-21",
            "titles": [
              "Brand Strategy Director",
              "Brand Planning Manager",
              "Corporate Identity Manager",
              "Employer Branding Head"
            ]
          },
          {
            "id": "sub-21-3",
            "name": "Consumer Brand",
            "categoryId": "cat-21",
            "titles": [
              "Consumer Brand Manager",
              "Product Brand Manager",
              "Category Brand Manager",
              "Retail Brand Manager"
            ]
          },
          {
            "id": "sub-21-4",
            "name": "Brand Communications",
            "categoryId": "cat-21",
            "titles": [
              "Brand Communications Director",
              "Creative Director",
              "Design Head",
              "Visual Identity Manager"
            ]
          }
        ]
      },
      {
        "id": "cat-22",
        "num": 22,
        "name": "Public Relations",
        "group": "Finance, Strategy & Growth",
        "groupId": "grp-2",
        "icon": "Lightbulb",
        "subcategories": [
          {
            "id": "sub-22-1",
            "name": "PR Leadership",
            "categoryId": "cat-22",
            "titles": [
              "Chief Public Relations Officer",
              "Public Relations Director",
              "Head of Public Relations",
              "PR Manager"
            ]
          },
          {
            "id": "sub-22-2",
            "name": "Media Relations",
            "categoryId": "cat-22",
            "titles": [
              "Media Relations Director",
              "Media Relations Manager",
              "Press Relations Officer",
              "Press Secretary"
            ]
          },
          {
            "id": "sub-22-3",
            "name": "Reputation Management",
            "categoryId": "cat-22",
            "titles": [
              "Reputation Director",
              "Corporate Reputation Manager",
              "Crisis Communications Manager",
              "Image Management Specialist"
            ]
          },
          {
            "id": "sub-22-4",
            "name": "Public Engagement",
            "categoryId": "cat-22",
            "titles": [
              "Community Relations Manager",
              "Public Affairs Manager",
              "External Communications Manager",
              "Stakeholder Communications Lead"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "grp-3",
    "name": "Technology, AI & Innovation",
    "categories": [
      {
        "id": "cat-23",
        "num": 23,
        "name": "Information Technology (IT)",
        "group": "Technology, AI & Innovation",
        "groupId": "grp-3",
        "icon": "Cpu",
        "subcategories": [
          {
            "id": "sub-23-1",
            "name": "IT Leadership",
            "categoryId": "cat-23",
            "titles": [
              "Chief Information Officer (CIO)",
              "Chief Technology Officer (CTO)",
              "IT Director",
              "VP Information Technology",
              "Head of IT"
            ]
          },
          {
            "id": "sub-23-2",
            "name": "Infrastructure",
            "categoryId": "cat-23",
            "titles": [
              "Infrastructure Director",
              "Infrastructure Manager",
              "Network Manager",
              "Systems Administrator"
            ]
          },
          {
            "id": "sub-23-3",
            "name": "Enterprise Applications",
            "categoryId": "cat-23",
            "titles": [
              "ERP Director",
              "SAP Program Director",
              "Enterprise Applications Manager",
              "Business Applications Manager"
            ]
          },
          {
            "id": "sub-23-4",
            "name": "IT Operations",
            "categoryId": "cat-23",
            "titles": [
              "IT Operations Director",
              "Service Delivery Manager",
              "IT Support Manager",
              "Helpdesk Manager"
            ]
          },
          {
            "id": "sub-23-5",
            "name": "Architecture",
            "categoryId": "cat-23",
            "titles": [
              "Enterprise Architect",
              "Solution Architect",
              "Cloud Architect",
              "Technical Architect"
            ]
          }
        ]
      },
      {
        "id": "cat-24",
        "num": 24,
        "name": "Engineering Services",
        "group": "Technology, AI & Innovation",
        "groupId": "grp-3",
        "icon": "Cog",
        "subcategories": [
          {
            "id": "sub-24-1",
            "name": "Engineering Leadership",
            "categoryId": "cat-24",
            "titles": [
              "Chief Engineer",
              "Engineering Director",
              "VP Engineering",
              "Head of Engineering",
              "Engineering Manager"
            ]
          },
          {
            "id": "sub-24-2",
            "name": "Design Engineering",
            "categoryId": "cat-24",
            "titles": [
              "Design Director",
              "Mechanical Engineering Head",
              "Electrical Engineering Head",
              "Civil Engineering Head"
            ]
          },
          {
            "id": "sub-24-3",
            "name": "Project Engineering",
            "categoryId": "cat-24",
            "titles": [
              "Project Engineering Director",
              "Project Engineer",
              "Site Engineering Manager",
              "Engineering Coordinator"
            ]
          },
          {
            "id": "sub-24-4",
            "name": "Technical Services",
            "categoryId": "cat-24",
            "titles": [
              "Technical Services Director",
              "Technical Support Manager",
              "Engineering Consultant",
              "Principal Engineer"
            ]
          },
          {
            "id": "sub-24-5",
            "name": "Industrial Engineering",
            "categoryId": "cat-24",
            "titles": [
              "Industrial Engineering Manager",
              "Process Engineer",
              "Manufacturing Engineer",
              "Reliability Engineer"
            ]
          }
        ]
      },
      {
        "id": "cat-25",
        "num": 25,
        "name": "Artificial Intelligence",
        "group": "Technology, AI & Innovation",
        "groupId": "grp-3",
        "icon": "CircuitBoard",
        "subcategories": [
          {
            "id": "sub-25-1",
            "name": "AI Leadership",
            "categoryId": "cat-25",
            "titles": [
              "Chief Artificial Intelligence Officer (CAIO)",
              "Chief AI Officer",
              "AI Director",
              "VP Artificial Intelligence",
              "Head of AI",
              "AI Program Manager"
            ]
          },
          {
            "id": "sub-25-2",
            "name": "AI Engineering",
            "categoryId": "cat-25",
            "titles": [
              "AI Engineering Director",
              "Machine Learning Director",
              "AI Engineering Manager",
              "Lead AI Engineer",
              "AI Solutions Architect"
            ]
          },
          {
            "id": "sub-25-3",
            "name": "AI Research",
            "categoryId": "cat-25",
            "titles": [
              "AI Research Director",
              "Principal AI Scientist",
              "AI Research Lead",
              "Generative AI Head",
              "NLP Research Lead"
            ]
          },
          {
            "id": "sub-25-4",
            "name": "Responsible AI",
            "categoryId": "cat-25",
            "titles": [
              "AI Ethics Officer",
              "Responsible AI Lead",
              "AI Governance Manager",
              "AI Risk Manager"
            ]
          },
          {
            "id": "sub-25-5",
            "name": "AI Operations",
            "categoryId": "cat-25",
            "titles": [
              "MLOps Director",
              "AI Platform Manager",
              "AI Deployment Lead",
              "AI Product Manager"
            ]
          }
        ]
      },
      {
        "id": "cat-26",
        "num": 26,
        "name": "Data, Analytics & Business Intelligence",
        "group": "Technology, AI & Innovation",
        "groupId": "grp-3",
        "icon": "Monitor",
        "subcategories": [
          {
            "id": "sub-26-1",
            "name": "Data Leadership",
            "categoryId": "cat-26",
            "titles": [
              "Chief Data Officer (CDO)",
              "Chief Analytics Officer",
              "Data Director",
              "Head of Data",
              "Data Governance Head"
            ]
          },
          {
            "id": "sub-26-2",
            "name": "Data Engineering",
            "categoryId": "cat-26",
            "titles": [
              "Data Engineering Director",
              "Data Architect",
              "Data Platform Manager",
              "Database Administrator",
              "Big Data Manager"
            ]
          },
          {
            "id": "sub-26-3",
            "name": "Analytics",
            "categoryId": "cat-26",
            "titles": [
              "Analytics Director",
              "Business Intelligence Director",
              "BI Manager",
              "Data Science Director",
              "Senior Data Scientist"
            ]
          },
          {
            "id": "sub-26-4",
            "name": "Reporting",
            "categoryId": "cat-26",
            "titles": [
              "Reporting Manager",
              "Dashboard Lead",
              "Insights Manager",
              "MIS Manager"
            ]
          },
          {
            "id": "sub-26-5",
            "name": "Governance",
            "categoryId": "cat-26",
            "titles": [
              "Master Data Manager",
              "Data Quality Manager",
              "Metadata Manager",
              "Data Steward"
            ]
          }
        ]
      },
      {
        "id": "cat-27",
        "num": 27,
        "name": "Product Management",
        "group": "Technology, AI & Innovation",
        "groupId": "grp-3",
        "icon": "Code",
        "subcategories": [
          {
            "id": "sub-27-1",
            "name": "Product Leadership",
            "categoryId": "cat-27",
            "titles": [
              "Chief Product Officer (CPO)",
              "VP Product",
              "Product Director",
              "Head of Product",
              "Product Portfolio Director"
            ]
          },
          {
            "id": "sub-27-2",
            "name": "Product Strategy",
            "categoryId": "cat-27",
            "titles": [
              "Product Strategy Director",
              "Product Planning Manager",
              "Product Roadmap Lead",
              "Portfolio Manager"
            ]
          },
          {
            "id": "sub-27-3",
            "name": "Product Operations",
            "categoryId": "cat-27",
            "titles": [
              "Senior Product Manager",
              "Product Manager",
              "Associate Product Manager",
              "Product Owner",
              "Platform Manager"
            ]
          },
          {
            "id": "sub-27-4",
            "name": "Product Delivery",
            "categoryId": "cat-27",
            "titles": [
              "Release Manager",
              "Product Delivery Manager",
              "Go-to-Market Manager",
              "Product Marketing Manager"
            ]
          },
          {
            "id": "sub-27-5",
            "name": "Product Experience",
            "categoryId": "cat-27",
            "titles": [
              "UX Product Lead",
              "Product Analyst",
              "Feature Manager",
              "Product Success Manager"
            ]
          }
        ]
      },
      {
        "id": "cat-28",
        "num": 28,
        "name": "Innovation",
        "group": "Technology, AI & Innovation",
        "groupId": "grp-3",
        "icon": "Microchip",
        "subcategories": [
          {
            "id": "sub-28-1",
            "name": "Innovation Leadership",
            "categoryId": "cat-28",
            "titles": [
              "Chief Innovation Officer (CINO)",
              "Innovation Director",
              "Head of Innovation",
              "Innovation Manager"
            ]
          },
          {
            "id": "sub-28-2",
            "name": "Innovation Labs",
            "categoryId": "cat-28",
            "titles": [
              "Innovation Lab Director",
              "Research Innovation Lead",
              "Technology Innovation Manager",
              "Innovation Consultant"
            ]
          },
          {
            "id": "sub-28-3",
            "name": "Emerging Innovation",
            "categoryId": "cat-28",
            "titles": [
              "Future Technologies Director",
              "Open Innovation Manager",
              "Innovation Partnerships Head",
              "Venture Innovation Lead"
            ]
          },
          {
            "id": "sub-28-4",
            "name": "Innovation Programs",
            "categoryId": "cat-28",
            "titles": [
              "Innovation Program Manager",
              "Incubation Manager",
              "Accelerator Program Lead",
              "Corporate Innovation Lead"
            ]
          }
        ]
      },
      {
        "id": "cat-29",
        "num": 29,
        "name": "Customer Experience",
        "group": "Technology, AI & Innovation",
        "groupId": "grp-3",
        "icon": "Radio",
        "subcategories": [
          {
            "id": "sub-29-1",
            "name": "Customer Leadership",
            "categoryId": "cat-29",
            "titles": [
              "Chief Customer Officer (CCO)",
              "Customer Experience Director",
              "Head of Customer Experience",
              "Customer Success Director"
            ]
          },
          {
            "id": "sub-29-2",
            "name": "Customer Operations",
            "categoryId": "cat-29",
            "titles": [
              "Customer Service Director",
              "Service Excellence Manager",
              "Customer Support Manager",
              "Contact Center Director"
            ]
          },
          {
            "id": "sub-29-3",
            "name": "Customer Insights",
            "categoryId": "cat-29",
            "titles": [
              "Customer Insights Director",
              "Voice of Customer Manager",
              "Customer Research Lead",
              "Customer Analytics Manager"
            ]
          },
          {
            "id": "sub-29-4",
            "name": "CRM",
            "categoryId": "cat-29",
            "titles": [
              "CRM Director",
              "CRM Manager",
              "Loyalty Program Manager",
              "Customer Engagement Manager"
            ]
          }
        ]
      },
      {
        "id": "cat-30",
        "num": 30,
        "name": "Program Management",
        "group": "Technology, AI & Innovation",
        "groupId": "grp-3",
        "icon": "Radar",
        "subcategories": [
          {
            "id": "sub-30-1",
            "name": "PMO Leadership",
            "categoryId": "cat-30",
            "titles": [
              "Chief Program Officer",
              "PMO Director",
              "Head of PMO",
              "PMO Manager"
            ]
          },
          {
            "id": "sub-30-2",
            "name": "Program Delivery",
            "categoryId": "cat-30",
            "titles": [
              "Program Director",
              "Senior Program Manager",
              "Program Manager",
              "Program Coordinator"
            ]
          },
          {
            "id": "sub-30-3",
            "name": "Portfolio Management",
            "categoryId": "cat-30",
            "titles": [
              "Portfolio Director",
              "Portfolio Manager",
              "Governance Manager",
              "Benefits Realization Manager"
            ]
          },
          {
            "id": "sub-30-4",
            "name": "Agile Delivery",
            "categoryId": "cat-30",
            "titles": [
              "Scrum Master",
              "Agile Coach",
              "Delivery Lead",
              "Release Train Engineer"
            ]
          }
        ]
      },
      {
        "id": "cat-31",
        "num": 31,
        "name": "Startup",
        "group": "Technology, AI & Innovation",
        "groupId": "grp-3",
        "icon": "FlaskConical",
        "subcategories": [
          {
            "id": "sub-31-1",
            "name": "Startup Leadership",
            "categoryId": "cat-31",
            "titles": [
              "Founder",
              "Co-Founder",
              "Startup CEO",
              "Startup COO",
              "Startup CTO"
            ]
          },
          {
            "id": "sub-31-2",
            "name": "Venture Growth",
            "categoryId": "cat-31",
            "titles": [
              "Venture Director",
              "Startup Growth Head",
              "Business Scaling Manager",
              "Startup Advisor"
            ]
          },
          {
            "id": "sub-31-3",
            "name": "Investment",
            "categoryId": "cat-31",
            "titles": [
              "Angel Investor",
              "Venture Capital Partner",
              "Managing Partner",
              "Investment Manager"
            ]
          },
          {
            "id": "sub-31-4",
            "name": "Incubation",
            "categoryId": "cat-31",
            "titles": [
              "Incubator Director",
              "Accelerator Director",
              "Innovation Mentor",
              "Startup Ecosystem Lead"
            ]
          }
        ]
      },
      {
        "id": "cat-32",
        "num": 32,
        "name": "Cloud Computing & Digital Infrastructure",
        "group": "Technology, AI & Innovation",
        "groupId": "grp-3",
        "icon": "TestTube",
        "subcategories": [
          {
            "id": "sub-32-1",
            "name": "Cloud Leadership",
            "categoryId": "cat-32",
            "titles": [
              "Chief Cloud Officer",
              "Cloud Director",
              "Head of Cloud",
              "Cloud Operations Manager"
            ]
          },
          {
            "id": "sub-32-2",
            "name": "Cloud Architecture",
            "categoryId": "cat-32",
            "titles": [
              "Cloud Architect",
              "Enterprise Cloud Architect",
              "Solutions Architect",
              "Infrastructure Architect"
            ]
          },
          {
            "id": "sub-32-3",
            "name": "Infrastructure",
            "categoryId": "cat-32",
            "titles": [
              "Infrastructure Director",
              "Network Infrastructure Manager",
              "Data Center Manager",
              "Platform Engineering Lead"
            ]
          },
          {
            "id": "sub-32-4",
            "name": "DevOps & SRE",
            "categoryId": "cat-32",
            "titles": [
              "DevOps Director",
              "Site Reliability Engineering Lead",
              "Platform Reliability Manager",
              "Infrastructure Automation Lead"
            ]
          }
        ]
      },
      {
        "id": "cat-33",
        "num": 33,
        "name": "Emerging Technologies & Automation",
        "group": "Technology, AI & Innovation",
        "groupId": "grp-3",
        "icon": "Sparkles",
        "subcategories": [
          {
            "id": "sub-33-1",
            "name": "Emerging Technology Leadership",
            "categoryId": "cat-33",
            "titles": [
              "Chief Technology Innovation Officer",
              "Emerging Technologies Director",
              "Head of Emerging Technologies",
              "Innovation Technology Manager"
            ]
          },
          {
            "id": "sub-33-2",
            "name": "Automation",
            "categoryId": "cat-33",
            "titles": [
              "Automation Director",
              "Intelligent Automation Manager",
              "Robotics Process Automation (RPA) Lead",
              "Hyperautomation Manager"
            ]
          },
          {
            "id": "sub-33-3",
            "name": "Future Technologies",
            "categoryId": "cat-33",
            "titles": [
              "Robotics Director",
              "IoT Director",
              "Blockchain Director",
              "Quantum Computing Lead",
              "Digital Twin Manager"
            ]
          },
          {
            "id": "sub-33-4",
            "name": "Smart Industry",
            "categoryId": "cat-33",
            "titles": [
              "Industry 4.0 Director",
              "Smart Manufacturing Lead",
              "Industrial Automation Head",
              "Advanced Technology Strategist"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "grp-4",
    "name": "People, Customer & Security",
    "categories": [
      {
        "id": "cat-34",
        "num": 34,
        "name": "Human Resources (HR)",
        "group": "People, Customer & Security",
        "groupId": "grp-4",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "sub-34-1",
            "name": "HR Leadership",
            "categoryId": "cat-34",
            "titles": [
              "Chief Human Resources Officer (CHRO)",
              "Chief People Officer (CPO)",
              "VP Human Resources",
              "HR Director",
              "Head of Human Resources",
              "HR Business Partner"
            ]
          },
          {
            "id": "sub-34-2",
            "name": "HR Operations",
            "categoryId": "cat-34",
            "titles": [
              "HR Operations Director",
              "HR Operations Manager",
              "HR Shared Services Head",
              "HR General Manager",
              "HR Executive"
            ]
          },
          {
            "id": "sub-34-3",
            "name": "Compensation & Benefits",
            "categoryId": "cat-34",
            "titles": [
              "Compensation Director",
              "Benefits Director",
              "Payroll Manager",
              "Rewards Manager",
              "Compensation Analyst"
            ]
          },
          {
            "id": "sub-34-4",
            "name": "Employee Relations",
            "categoryId": "cat-34",
            "titles": [
              "Employee Relations Director",
              "Industrial Relations Head",
              "Employee Relations Manager",
              "Labour Relations Manager"
            ]
          },
          {
            "id": "sub-34-5",
            "name": "HR Strategy",
            "categoryId": "cat-34",
            "titles": [
              "Workforce Planning Director",
              "HR Analytics Manager",
              "HR Transformation Lead",
              "People Strategy Manager"
            ]
          }
        ]
      },
      {
        "id": "cat-35",
        "num": 35,
        "name": "Learning & Development",
        "group": "People, Customer & Security",
        "groupId": "grp-4",
        "icon": "GraduationCap",
        "subcategories": [
          {
            "id": "sub-35-1",
            "name": "L&D Leadership",
            "categoryId": "cat-35",
            "titles": [
              "Chief Learning Officer (CLO)",
              "Learning Director",
              "Head of Learning & Development",
              "Learning Manager"
            ]
          },
          {
            "id": "sub-35-2",
            "name": "Leadership Development",
            "categoryId": "cat-35",
            "titles": [
              "Leadership Development Director",
              "Executive Coaching Lead",
              "Leadership Coach",
              "Succession Planning Manager"
            ]
          },
          {
            "id": "sub-35-3",
            "name": "Corporate Training",
            "categoryId": "cat-35",
            "titles": [
              "Training Director",
              "Corporate Trainer",
              "Technical Trainer",
              "Functional Trainer"
            ]
          },
          {
            "id": "sub-35-4",
            "name": "Learning Technologies",
            "categoryId": "cat-35",
            "titles": [
              "LMS Administrator",
              "Digital Learning Manager",
              "eLearning Manager",
              "Instructional Designer"
            ]
          },
          {
            "id": "sub-35-5",
            "name": "Capability Building",
            "categoryId": "cat-35",
            "titles": [
              "Capability Development Head",
              "Skills Development Manager",
              "Competency Manager",
              "Organizational Learning Lead"
            ]
          }
        ]
      },
      {
        "id": "cat-36",
        "num": 36,
        "name": "Facilities Management",
        "group": "People, Customer & Security",
        "groupId": "grp-4",
        "icon": "Building",
        "subcategories": [
          {
            "id": "sub-36-1",
            "name": "Facilities Leadership",
            "categoryId": "cat-36",
            "titles": [
              "Facilities Director",
              "Head of Facilities",
              "Facilities Manager",
              "Corporate Services Director"
            ]
          },
          {
            "id": "sub-36-2",
            "name": "Workplace Management",
            "categoryId": "cat-36",
            "titles": [
              "Workplace Director",
              "Workplace Experience Manager",
              "Office Manager",
              "Workspace Planner"
            ]
          },
          {
            "id": "sub-36-3",
            "name": "Building Operations",
            "categoryId": "cat-36",
            "titles": [
              "Building Manager",
              "Property Manager",
              "Maintenance Manager",
              "Utilities Manager"
            ]
          },
          {
            "id": "sub-36-4",
            "name": "Security & Administration",
            "categoryId": "cat-36",
            "titles": [
              "Security Manager",
              "Administration Manager",
              "Reception Manager",
              "Visitor Services Manager"
            ]
          },
          {
            "id": "sub-36-5",
            "name": "Facility Planning",
            "categoryId": "cat-36",
            "titles": [
              "Space Planning Manager",
              "Facility Projects Manager",
              "Infrastructure Manager",
              "Smart Building Manager"
            ]
          }
        ]
      },
      {
        "id": "cat-37",
        "num": 37,
        "name": "Cyber Security & Information Security",
        "group": "People, Customer & Security",
        "groupId": "grp-4",
        "icon": "HeartPulse",
        "subcategories": [
          {
            "id": "sub-37-1",
            "name": "Security Leadership",
            "categoryId": "cat-37",
            "titles": [
              "Chief Information Security Officer (CISO)",
              "Chief Security Officer (CSO)",
              "VP Cyber Security",
              "Security Director",
              "Head of Information Security"
            ]
          },
          {
            "id": "sub-37-2",
            "name": "Security Operations",
            "categoryId": "cat-37",
            "titles": [
              "SOC Director",
              "SOC Manager",
              "Incident Response Manager",
              "Threat Intelligence Manager",
              "Security Operations Manager"
            ]
          },
          {
            "id": "sub-37-3",
            "name": "Cyber Defense",
            "categoryId": "cat-37",
            "titles": [
              "Cyber Security Architect",
              "Penetration Testing Lead",
              "Vulnerability Manager",
              "Security Engineering Manager"
            ]
          },
          {
            "id": "sub-37-4",
            "name": "Governance & Risk",
            "categoryId": "cat-37",
            "titles": [
              "Security Governance Manager",
              "Cyber Risk Manager",
              "Compliance Security Manager",
              "Privacy Officer"
            ]
          },
          {
            "id": "sub-37-5",
            "name": "Identity & Access",
            "categoryId": "cat-37",
            "titles": [
              "IAM Director",
              "Identity Manager",
              "Access Control Manager",
              "PKI Manager"
            ]
          }
        ]
      },
      {
        "id": "cat-38",
        "num": 38,
        "name": "Business Development",
        "group": "People, Customer & Security",
        "groupId": "grp-4",
        "icon": "UtensilsCrossed",
        "subcategories": [
          {
            "id": "sub-38-1",
            "name": "BD Leadership",
            "categoryId": "cat-38",
            "titles": [
              "Chief Business Development Officer",
              "VP Business Development",
              "Business Development Director",
              "Head of Business Development",
              "Business Development Manager"
            ]
          },
          {
            "id": "sub-38-2",
            "name": "Strategic Growth",
            "categoryId": "cat-38",
            "titles": [
              "Growth Director",
              "Strategic Partnerships Director",
              "Market Expansion Manager",
              "Corporate Development Manager"
            ]
          },
          {
            "id": "sub-38-3",
            "name": "Alliances",
            "categoryId": "cat-38",
            "titles": [
              "Partnerships Director",
              "Alliance Manager",
              "Channel Development Manager",
              "Ecosystem Partnerships Lead"
            ]
          },
          {
            "id": "sub-38-4",
            "name": "New Business",
            "categoryId": "cat-38",
            "titles": [
              "New Business Manager",
              "Opportunity Development Manager",
              "Client Acquisition Manager",
              "Strategic Accounts Manager"
            ]
          },
          {
            "id": "sub-38-5",
            "name": "Commercial Strategy",
            "categoryId": "cat-38",
            "titles": [
              "Commercial Director",
              "Commercial Excellence Manager",
              "Business Growth Lead",
              "Revenue Growth Manager"
            ]
          }
        ]
      },
      {
        "id": "cat-39",
        "num": 39,
        "name": "Customer Success",
        "group": "People, Customer & Security",
        "groupId": "grp-4",
        "icon": "Tv",
        "subcategories": [
          {
            "id": "sub-39-1",
            "name": "Customer Success Leadership",
            "categoryId": "cat-39",
            "titles": [
              "Chief Customer Success Officer",
              "VP Customer Success",
              "Customer Success Director",
              "Head of Customer Success",
              "Customer Success Manager"
            ]
          },
          {
            "id": "sub-39-2",
            "name": "Customer Engagement",
            "categoryId": "cat-39",
            "titles": [
              "Engagement Director",
              "Customer Relationship Manager",
              "Account Success Manager",
              "Customer Lifecycle Manager"
            ]
          },
          {
            "id": "sub-39-3",
            "name": "Client Success",
            "categoryId": "cat-39",
            "titles": [
              "Enterprise Success Manager",
              "Strategic Success Manager",
              "Technical Success Manager",
              "Adoption Manager"
            ]
          },
          {
            "id": "sub-39-4",
            "name": "Customer Retention",
            "categoryId": "cat-39",
            "titles": [
              "Retention Director",
              "Renewal Manager",
              "Customer Loyalty Manager",
              "Churn Prevention Manager"
            ]
          },
          {
            "id": "sub-39-5",
            "name": "Success Operations",
            "categoryId": "cat-39",
            "titles": [
              "Customer Success Operations Manager",
              "Customer Health Manager",
              "Success Analyst",
              "Customer Advocacy Manager"
            ]
          }
        ]
      },
      {
        "id": "cat-40",
        "num": 40,
        "name": "Projects Management",
        "group": "People, Customer & Security",
        "groupId": "grp-4",
        "icon": "ShoppingCart",
        "subcategories": [
          {
            "id": "sub-40-1",
            "name": "Project Leadership",
            "categoryId": "cat-40",
            "titles": [
              "Chief Projects Officer",
              "Projects Director",
              "Head of Projects",
              "Senior Project Manager",
              "Project Manager"
            ]
          },
          {
            "id": "sub-40-2",
            "name": "Project Delivery",
            "categoryId": "cat-40",
            "titles": [
              "Delivery Director",
              "Delivery Manager",
              "Project Coordinator",
              "Site Project Manager"
            ]
          },
          {
            "id": "sub-40-3",
            "name": "Construction & Engineering Projects",
            "categoryId": "cat-40",
            "titles": [
              "EPC Director",
              "Construction Project Manager",
              "Infrastructure Project Manager",
              "Capital Projects Manager"
            ]
          },
          {
            "id": "sub-40-4",
            "name": "Project Controls",
            "categoryId": "cat-40",
            "titles": [
              "Project Controls Director",
              "Cost Control Manager",
              "Planning Engineer",
              "Scheduling Manager"
            ]
          },
          {
            "id": "sub-40-5",
            "name": "Project Governance",
            "categoryId": "cat-40",
            "titles": [
              "Project Governance Manager",
              "Risk & Controls Manager",
              "Project Quality Manager",
              "PMO Analyst"
            ]
          }
        ]
      },
      {
        "id": "cat-41",
        "num": 41,
        "name": "Organizational Development",
        "group": "People, Customer & Security",
        "groupId": "grp-4",
        "icon": "Shield",
        "subcategories": [
          {
            "id": "sub-41-1",
            "name": "OD Leadership",
            "categoryId": "cat-41",
            "titles": [
              "Chief Organizational Development Officer",
              "Organizational Development Director",
              "Head of Organizational Development",
              "OD Manager"
            ]
          },
          {
            "id": "sub-41-2",
            "name": "Organization Design",
            "categoryId": "cat-41",
            "titles": [
              "Organization Design Director",
              "Workforce Design Manager",
              "Organizational Effectiveness Manager",
              "Business Transformation Consultant"
            ]
          },
          {
            "id": "sub-41-3",
            "name": "Change Management",
            "categoryId": "cat-41",
            "titles": [
              "Change Director",
              "Change Management Manager",
              "Transformation Coach",
              "Organizational Change Lead"
            ]
          },
          {
            "id": "sub-41-4",
            "name": "Culture & Performance",
            "categoryId": "cat-41",
            "titles": [
              "Culture Director",
              "Performance Excellence Manager",
              "Employee Experience Director",
              "Organizational Performance Manager"
            ]
          },
          {
            "id": "sub-41-5",
            "name": "Talent Strategy",
            "categoryId": "cat-41",
            "titles": [
              "Talent Strategy Director",
              "Succession Planning Lead",
              "Workforce Analytics Manager",
              "Capability Strategy Manager"
            ]
          }
        ]
      },
      {
        "id": "cat-42",
        "num": 42,
        "name": "Talent Acquisition",
        "group": "People, Customer & Security",
        "groupId": "grp-4",
        "icon": "Lock",
        "subcategories": [
          {
            "id": "sub-42-1",
            "name": "Talent Acquisition Leadership",
            "categoryId": "cat-42",
            "titles": [
              "Chief Talent Officer (CTO)",
              "Talent Acquisition Director",
              "Head of Talent Acquisition",
              "VP Talent Acquisition",
              "Talent Acquisition Manager"
            ]
          },
          {
            "id": "sub-42-2",
            "name": "Recruitment",
            "categoryId": "cat-42",
            "titles": [
              "Recruitment Director",
              "Recruitment Manager",
              "Senior Recruiter",
              "Technical Recruiter",
              "Campus Recruitment Manager"
            ]
          },
          {
            "id": "sub-42-3",
            "name": "Executive Search",
            "categoryId": "cat-42",
            "titles": [
              "Executive Search Director",
              "Executive Recruiter",
              "Leadership Hiring Manager",
              "Executive Talent Partner"
            ]
          },
          {
            "id": "sub-42-4",
            "name": "Employer Branding",
            "categoryId": "cat-42",
            "titles": [
              "Employer Branding Director",
              "Recruitment Marketing Manager",
              "Talent Branding Manager",
              "EVP Manager"
            ]
          },
          {
            "id": "sub-42-5",
            "name": "Workforce Planning",
            "categoryId": "cat-42",
            "titles": [
              "Workforce Planning Director",
              "Resource Planning Manager",
              "Talent Intelligence Lead",
              "Hiring Strategy Manager"
            ]
          }
        ]
      },
      {
        "id": "cat-43",
        "num": 43,
        "name": "Workplace Culture",
        "group": "People, Customer & Security",
        "groupId": "grp-4",
        "icon": "Key",
        "subcategories": [
          {
            "id": "sub-43-1",
            "name": "Culture Leadership",
            "categoryId": "cat-43",
            "titles": [
              "Chief Culture Officer",
              "Culture Director",
              "Head of Culture",
              "Culture Manager"
            ]
          },
          {
            "id": "sub-43-2",
            "name": "Organizational Culture",
            "categoryId": "cat-43",
            "titles": [
              "Culture Transformation Director",
              "Organizational Culture Lead",
              "Values & Ethics Manager",
              "Behavioral Excellence Manager"
            ]
          },
          {
            "id": "sub-43-3",
            "name": "Inclusion & Diversity",
            "categoryId": "cat-43",
            "titles": [
              "Chief Diversity Officer",
              "Diversity Director",
              "Inclusion Manager",
              "Belonging Manager"
            ]
          },
          {
            "id": "sub-43-4",
            "name": "Workplace Wellbeing",
            "categoryId": "cat-43",
            "titles": [
              "Wellbeing Director",
              "Wellness Manager",
              "Employee Wellbeing Lead",
              "Mental Health Program Manager"
            ]
          },
          {
            "id": "sub-43-5",
            "name": "Employee Experience",
            "categoryId": "cat-43",
            "titles": [
              "Employee Experience Director",
              "Workplace Experience Manager",
              "Culture Ambassador",
              "Workplace Excellence Lead"
            ]
          }
        ]
      },
      {
        "id": "cat-44",
        "num": 44,
        "name": "Employee Engagement",
        "group": "People, Customer & Security",
        "groupId": "grp-4",
        "icon": "UserPlus",
        "subcategories": [
          {
            "id": "sub-44-1",
            "name": "Engagement Leadership",
            "categoryId": "cat-44",
            "titles": [
              "Employee Engagement Director",
              "Head of Employee Engagement",
              "Engagement Manager",
              "Employee Experience Manager"
            ]
          },
          {
            "id": "sub-44-2",
            "name": "Employee Programs",
            "categoryId": "cat-44",
            "titles": [
              "Employee Programs Director",
              "Recognition Manager",
              "Rewards Program Manager",
              "Employee Events Manager"
            ]
          },
          {
            "id": "sub-44-3",
            "name": "Internal Engagement",
            "categoryId": "cat-44",
            "titles": [
              "Internal Communications Manager",
              "Employee Communications Lead",
              "Community Manager",
              "Engagement Specialist"
            ]
          },
          {
            "id": "sub-44-4",
            "name": "Surveys & Analytics",
            "categoryId": "cat-44",
            "titles": [
              "Employee Insights Director",
              "Engagement Analytics Manager",
              "Survey Manager",
              "HR Insights Analyst"
            ]
          },
          {
            "id": "sub-44-5",
            "name": "Retention",
            "categoryId": "cat-44",
            "titles": [
              "Retention Director",
              "Employee Success Manager",
              "Retention Specialist",
              "Employee Advocacy Lead"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "grp-5",
    "name": "Manufacturing & Operations",
    "categories": [
      {
        "id": "cat-45",
        "num": 45,
        "name": "Research & Development (R&D)",
        "group": "Manufacturing & Operations",
        "groupId": "grp-5",
        "icon": "FlaskConical",
        "subcategories": [
          {
            "id": "sub-45-1",
            "name": "R&D Leadership",
            "categoryId": "cat-45",
            "titles": [
              "Chief Research Officer",
              "Chief Scientific Officer",
              "R&D Director",
              "Head of Research",
              "R&D Manager"
            ]
          },
          {
            "id": "sub-45-2",
            "name": "Scientific Research",
            "categoryId": "cat-45",
            "titles": [
              "Principal Scientist",
              "Senior Scientist",
              "Research Scientist",
              "Applied Scientist"
            ]
          },
          {
            "id": "sub-45-3",
            "name": "Product Research",
            "categoryId": "cat-45",
            "titles": [
              "Product Research Director",
              "Innovation Scientist",
              "Prototype Manager",
              "Product Validation Manager"
            ]
          },
          {
            "id": "sub-45-4",
            "name": "Technology Research",
            "categoryId": "cat-45",
            "titles": [
              "Technology Research Director",
              "Research Engineer",
              "Technology Fellow",
              "Innovation Research Lead"
            ]
          },
          {
            "id": "sub-45-5",
            "name": "Research Operations",
            "categoryId": "cat-45",
            "titles": [
              "Laboratory Director",
              "Lab Manager",
              "Testing Director",
              "Research Coordinator"
            ]
          }
        ]
      },
      {
        "id": "cat-46",
        "num": 46,
        "name": "Operations Efficiency",
        "group": "Manufacturing & Operations",
        "groupId": "grp-5",
        "icon": "Activity",
        "subcategories": [
          {
            "id": "sub-46-1",
            "name": "Operations Leadership",
            "categoryId": "cat-46",
            "titles": [
              "Chief Operating Officer (COO)",
              "Operations Excellence Director",
              "Head of Operations Excellence",
              "Operations Manager"
            ]
          },
          {
            "id": "sub-46-2",
            "name": "Process Excellence",
            "categoryId": "cat-46",
            "titles": [
              "Operational Excellence Director",
              "Process Improvement Manager",
              "Lean Six Sigma Master Black Belt",
              "Continuous Improvement Manager"
            ]
          },
          {
            "id": "sub-46-3",
            "name": "Business Excellence",
            "categoryId": "cat-46",
            "titles": [
              "Business Excellence Director",
              "Performance Excellence Manager",
              "Operational Performance Lead",
              "Productivity Manager"
            ]
          },
          {
            "id": "sub-46-4",
            "name": "Process Management",
            "categoryId": "cat-46",
            "titles": [
              "Business Process Manager",
              "Process Architect",
              "Process Analyst",
              "Workflow Manager"
            ]
          },
          {
            "id": "sub-46-5",
            "name": "Operational Analytics",
            "categoryId": "cat-46",
            "titles": [
              "Operations Analytics Manager",
              "KPI Manager",
              "Efficiency Analyst",
              "Performance Analyst"
            ]
          }
        ]
      },
      {
        "id": "cat-47",
        "num": 47,
        "name": "Manufacturing",
        "group": "Manufacturing & Operations",
        "groupId": "grp-5",
        "icon": "Factory",
        "subcategories": [
          {
            "id": "sub-47-1",
            "name": "Manufacturing Leadership",
            "categoryId": "cat-47",
            "titles": [
              "Chief Manufacturing Officer",
              "Manufacturing Director",
              "Head of Manufacturing",
              "Plant Director",
              "Manufacturing Manager"
            ]
          },
          {
            "id": "sub-47-2",
            "name": "Factory Operations",
            "categoryId": "cat-47",
            "titles": [
              "Factory Manager",
              "Plant Manager",
              "Shop Floor Manager",
              "Unit Head"
            ]
          },
          {
            "id": "sub-47-3",
            "name": "Manufacturing Engineering",
            "categoryId": "cat-47",
            "titles": [
              "Manufacturing Engineering Director",
              "Industrial Engineer",
              "Process Engineer",
              "Production Engineer"
            ]
          },
          {
            "id": "sub-47-4",
            "name": "Smart Manufacturing",
            "categoryId": "cat-47",
            "titles": [
              "Industry 4.0 Director",
              "Smart Factory Manager",
              "Automation Manufacturing Lead",
              "Digital Manufacturing Manager"
            ]
          },
          {
            "id": "sub-47-5",
            "name": "Manufacturing Excellence",
            "categoryId": "cat-47",
            "titles": [
              "Lean Manufacturing Head",
              "TPM Manager",
              "Operational Excellence Manager",
              "Continuous Improvement Engineer"
            ]
          }
        ]
      },
      {
        "id": "cat-48",
        "num": 48,
        "name": "Production",
        "group": "Manufacturing & Operations",
        "groupId": "grp-5",
        "icon": "Settings",
        "subcategories": [
          {
            "id": "sub-48-1",
            "name": "Production Leadership",
            "categoryId": "cat-48",
            "titles": [
              "Production Director",
              "Head of Production",
              "Production Manager",
              "Production Superintendent"
            ]
          },
          {
            "id": "sub-48-2",
            "name": "Production Planning",
            "categoryId": "cat-48",
            "titles": [
              "Production Planning Director",
              "Planning Manager",
              "Scheduling Manager",
              "Capacity Planning Manager"
            ]
          },
          {
            "id": "sub-48-3",
            "name": "Production Operations",
            "categoryId": "cat-48",
            "titles": [
              "Shift Manager",
              "Line Manager",
              "Assembly Manager",
              "Production Supervisor"
            ]
          },
          {
            "id": "sub-48-4",
            "name": "Production Control",
            "categoryId": "cat-48",
            "titles": [
              "Production Control Manager",
              "Inventory Planning Manager",
              "Materials Planning Manager",
              "Output Controller"
            ]
          },
          {
            "id": "sub-48-5",
            "name": "Production Improvement",
            "categoryId": "cat-48",
            "titles": [
              "Production Excellence Manager",
              "Kaizen Leader",
              "Continuous Improvement Specialist",
              "Productivity Engineer"
            ]
          }
        ]
      },
      {
        "id": "cat-49",
        "num": 49,
        "name": "Quality Assurance",
        "group": "Manufacturing & Operations",
        "groupId": "grp-5",
        "icon": "Package",
        "subcategories": [
          {
            "id": "sub-49-1",
            "name": "Quality Leadership",
            "categoryId": "cat-49",
            "titles": [
              "Chief Quality Officer (CQO)",
              "Quality Director",
              "Head of Quality",
              "QA Manager",
              "Quality Assurance Manager"
            ]
          },
          {
            "id": "sub-49-2",
            "name": "Quality Control",
            "categoryId": "cat-49",
            "titles": [
              "QC Director",
              "QC Manager",
              "Inspection Manager",
              "Quality Inspector"
            ]
          },
          {
            "id": "sub-49-3",
            "name": "Quality Systems",
            "categoryId": "cat-49",
            "titles": [
              "Quality Systems Director",
              "ISO Manager",
              "Compliance Quality Manager",
              "Documentation Manager"
            ]
          },
          {
            "id": "sub-49-4",
            "name": "Continuous Improvement",
            "categoryId": "cat-49",
            "titles": [
              "Six Sigma Director",
              "Lean Quality Manager",
              "Process Quality Manager",
              "Operational Quality Lead"
            ]
          },
          {
            "id": "sub-49-5",
            "name": "Customer Quality",
            "categoryId": "cat-49",
            "titles": [
              "Supplier Quality Manager",
              "Customer Quality Manager",
              "Product Quality Manager",
              "Quality Excellence Lead"
            ]
          }
        ]
      },
      {
        "id": "cat-50",
        "num": 50,
        "name": "Warehouse & Distribution",
        "group": "Manufacturing & Operations",
        "groupId": "grp-5",
        "icon": "Ship",
        "subcategories": [
          {
            "id": "sub-50-1",
            "name": "Warehouse Leadership",
            "categoryId": "cat-50",
            "titles": [
              "Chief Warehouse Officer",
              "Warehouse Director",
              "Head of Warehousing",
              "Warehouse Manager",
              "Distribution Manager"
            ]
          },
          {
            "id": "sub-50-2",
            "name": "Warehouse Operations",
            "categoryId": "cat-50",
            "titles": [
              "Warehouse Operations Director",
              "Inventory Control Manager",
              "Warehouse Supervisor",
              "Storage Operations Manager"
            ]
          },
          {
            "id": "sub-50-3",
            "name": "Distribution",
            "categoryId": "cat-50",
            "titles": [
              "Distribution Director",
              "Distribution Center Manager",
              "Dispatch Manager",
              "Delivery Operations Manager"
            ]
          },
          {
            "id": "sub-50-4",
            "name": "Inventory Management",
            "categoryId": "cat-50",
            "titles": [
              "Inventory Manager",
              "Inventory Planning Manager",
              "Stock Control Manager",
              "Materials Controller"
            ]
          },
          {
            "id": "sub-50-5",
            "name": "Logistics Excellence",
            "categoryId": "cat-50",
            "titles": [
              "Logistics Excellence Manager",
              "Warehouse Excellence Lead",
              "Fulfillment Manager",
              "Supply Operations Manager"
            ]
          }
        ]
      },
      {
        "id": "cat-51",
        "num": 51,
        "name": "Lean Manufacturing",
        "group": "Manufacturing & Operations",
        "groupId": "grp-5",
        "icon": "Train",
        "subcategories": [
          {
            "id": "sub-51-1",
            "name": "Lean Leadership",
            "categoryId": "cat-51",
            "titles": [
              "Lean Director",
              "Head of Lean Manufacturing",
              "Lean Manager",
              "Lean Transformation Lead"
            ]
          },
          {
            "id": "sub-51-2",
            "name": "Continuous Improvement",
            "categoryId": "cat-51",
            "titles": [
              "Kaizen Leader",
              "Continuous Improvement Director",
              "Lean Six Sigma Black Belt",
              "Lean Coach"
            ]
          },
          {
            "id": "sub-51-3",
            "name": "Manufacturing Excellence",
            "categoryId": "cat-51",
            "titles": [
              "Manufacturing Excellence Director",
              "TPM Manager",
              "Operational Excellence Manager",
              "Process Excellence Manager"
            ]
          },
          {
            "id": "sub-51-4",
            "name": "Lean Engineering",
            "categoryId": "cat-51",
            "titles": [
              "Lean Engineer",
              "Value Stream Manager",
              "Process Optimization Engineer",
              "Industrial Improvement Lead"
            ]
          }
        ]
      },
      {
        "id": "cat-52",
        "num": 52,
        "name": "International Business",
        "group": "Manufacturing & Operations",
        "groupId": "grp-5",
        "icon": "Truck",
        "subcategories": [
          {
            "id": "sub-52-1",
            "name": "International Leadership",
            "categoryId": "cat-52",
            "titles": [
              "Chief International Business Officer",
              "International Business Director",
              "Head of International Business",
              "VP Global Business"
            ]
          },
          {
            "id": "sub-52-2",
            "name": "Global Markets",
            "categoryId": "cat-52",
            "titles": [
              "Global Markets Director",
              "Regional Business Director",
              "Country Manager",
              "International Sales Director"
            ]
          },
          {
            "id": "sub-52-3",
            "name": "Export & Trade",
            "categoryId": "cat-52",
            "titles": [
              "Export Director",
              "Export Manager",
              "Trade Development Manager",
              "Global Trade Manager"
            ]
          },
          {
            "id": "sub-52-4",
            "name": "Import Operations",
            "categoryId": "cat-52",
            "titles": [
              "Import Director",
              "Import Manager",
              "Customs Compliance Manager",
              "Trade Compliance Manager"
            ]
          },
          {
            "id": "sub-52-5",
            "name": "International Partnerships",
            "categoryId": "cat-52",
            "titles": [
              "International Partnerships Director",
              "Cross-border Business Manager",
              "Global Alliance Manager",
              "International Expansion Lead"
            ]
          }
        ]
      },
      {
        "id": "cat-53",
        "num": 53,
        "name": "Industrial Engineering",
        "group": "Manufacturing & Operations",
        "groupId": "grp-5",
        "icon": "Plane",
        "subcategories": [
          {
            "id": "sub-53-1",
            "name": "Engineering Leadership",
            "categoryId": "cat-53",
            "titles": [
              "Industrial Engineering Director",
              "Head of Industrial Engineering",
              "Industrial Engineering Manager",
              "Chief Industrial Engineer"
            ]
          },
          {
            "id": "sub-53-2",
            "name": "Process Engineering",
            "categoryId": "cat-53",
            "titles": [
              "Process Engineering Director",
              "Manufacturing Process Engineer",
              "Process Optimization Manager",
              "Production Systems Engineer"
            ]
          },
          {
            "id": "sub-53-3",
            "name": "Productivity Engineering",
            "categoryId": "cat-53",
            "titles": [
              "Productivity Director",
              "Efficiency Engineer",
              "Time & Motion Engineer",
              "Operations Engineer"
            ]
          },
          {
            "id": "sub-53-4",
            "name": "Systems Engineering",
            "categoryId": "cat-53",
            "titles": [
              "Systems Engineer",
              "Plant Layout Engineer",
              "Industrial Automation Engineer",
              "Reliability Engineer"
            ]
          }
        ]
      },
      {
        "id": "cat-54",
        "num": 54,
        "name": "Maintenance & Asset Management",
        "group": "Manufacturing & Operations",
        "groupId": "grp-5",
        "icon": "Car",
        "subcategories": [
          {
            "id": "sub-54-1",
            "name": "Maintenance Leadership",
            "categoryId": "cat-54",
            "titles": [
              "Maintenance Director",
              "Head of Maintenance",
              "Maintenance Manager",
              "Engineering Maintenance Manager"
            ]
          },
          {
            "id": "sub-54-2",
            "name": "Asset Management",
            "categoryId": "cat-54",
            "titles": [
              "Asset Director",
              "Asset Manager",
              "Asset Reliability Manager",
              "Asset Performance Manager"
            ]
          },
          {
            "id": "sub-54-3",
            "name": "Plant Maintenance",
            "categoryId": "cat-54",
            "titles": [
              "Plant Maintenance Head",
              "Mechanical Maintenance Manager",
              "Electrical Maintenance Manager",
              "Utilities Maintenance Manager"
            ]
          },
          {
            "id": "sub-54-4",
            "name": "Reliability",
            "categoryId": "cat-54",
            "titles": [
              "Reliability Director",
              "Predictive Maintenance Manager",
              "Preventive Maintenance Manager",
              "Condition Monitoring Engineer"
            ]
          },
          {
            "id": "sub-54-5",
            "name": "Facilities Maintenance",
            "categoryId": "cat-54",
            "titles": [
              "Facility Maintenance Manager",
              "Building Services Manager",
              "Infrastructure Maintenance Lead",
              "Maintenance Planner"
            ]
          }
        ]
      },
      {
        "id": "cat-55",
        "num": 55,
        "name": "Industrial Safety & EHS",
        "group": "Manufacturing & Operations",
        "groupId": "grp-5",
        "icon": "BatteryCharging",
        "subcategories": [
          {
            "id": "sub-55-1",
            "name": "Safety Leadership",
            "categoryId": "cat-55",
            "titles": [
              "Chief Safety Officer",
              "EHS Director",
              "Head of Industrial Safety",
              "Safety Manager"
            ]
          },
          {
            "id": "sub-55-2",
            "name": "Occupational Safety",
            "categoryId": "cat-55",
            "titles": [
              "Occupational Safety Director",
              "Safety Engineer",
              "Workplace Safety Manager",
              "Industrial Hygiene Manager"
            ]
          },
          {
            "id": "sub-55-3",
            "name": "Environmental Health",
            "categoryId": "cat-55",
            "titles": [
              "Environment Health Director",
              "Environmental Safety Manager",
              "Sustainability Safety Lead",
              "Compliance Safety Manager"
            ]
          },
          {
            "id": "sub-55-4",
            "name": "Emergency Management",
            "categoryId": "cat-55",
            "titles": [
              "Emergency Response Director",
              "Fire Safety Manager",
              "Disaster Recovery Manager",
              "Crisis Response Lead"
            ]
          },
          {
            "id": "sub-55-5",
            "name": "Safety Excellence",
            "categoryId": "cat-55",
            "titles": [
              "Safety Excellence Manager",
              "Safety Training Lead",
              "Incident Investigation Manager",
              "Risk Prevention Manager"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "grp-6",
    "name": "Supply Chain & Sustainability",
    "categories": [
      {
        "id": "cat-56",
        "num": 56,
        "name": "Procurement",
        "group": "Supply Chain & Sustainability",
        "groupId": "grp-6",
        "icon": "ShoppingBag",
        "subcategories": [
          {
            "id": "sub-56-1",
            "name": "Procurement Leadership",
            "categoryId": "cat-56",
            "titles": [
              "Chief Procurement Officer (CPO)",
              "Procurement Director",
              "Head of Procurement",
              "Procurement Manager"
            ]
          },
          {
            "id": "sub-56-2",
            "name": "Purchasing",
            "categoryId": "cat-56",
            "titles": [
              "Purchasing Director",
              "Purchasing Manager",
              "Senior Buyer",
              "Procurement Executive"
            ]
          },
          {
            "id": "sub-56-3",
            "name": "Vendor Management",
            "categoryId": "cat-56",
            "titles": [
              "Vendor Director",
              "Supplier Relationship Manager",
              "Vendor Development Manager",
              "Supplier Quality Manager"
            ]
          },
          {
            "id": "sub-56-4",
            "name": "Category Procurement",
            "categoryId": "cat-56",
            "titles": [
              "Category Manager",
              "Commodity Manager",
              "Sourcing Manager",
              "Spend Analytics Manager"
            ]
          },
          {
            "id": "sub-56-5",
            "name": "Procurement Excellence",
            "categoryId": "cat-56",
            "titles": [
              "Procurement Excellence Director",
              "Procurement Operations Manager",
              "Procurement Analyst",
              "Cost Optimization Manager"
            ]
          }
        ]
      },
      {
        "id": "cat-57",
        "num": 57,
        "name": "Strategic Sourcing",
        "group": "Supply Chain & Sustainability",
        "groupId": "grp-6",
        "icon": "Layers",
        "subcategories": [
          {
            "id": "sub-57-1",
            "name": "Sourcing Leadership",
            "categoryId": "cat-57",
            "titles": [
              "Strategic Sourcing Director",
              "Head of Strategic Sourcing",
              "Strategic Sourcing Manager",
              "Global Sourcing Manager"
            ]
          },
          {
            "id": "sub-57-2",
            "name": "Supplier Strategy",
            "categoryId": "cat-57",
            "titles": [
              "Supplier Strategy Director",
              "Supplier Development Manager",
              "Supplier Performance Manager",
              "Supplier Excellence Lead"
            ]
          },
          {
            "id": "sub-57-3",
            "name": "Category Sourcing",
            "categoryId": "cat-57",
            "titles": [
              "Global Category Manager",
              "Commodity Strategy Manager",
              "Strategic Buyer",
              "Category Procurement Lead"
            ]
          },
          {
            "id": "sub-57-4",
            "name": "Strategic Procurement",
            "categoryId": "cat-57",
            "titles": [
              "Cost Management Director",
              "Strategic Procurement Manager",
              "Contract Sourcing Manager",
              "Supply Market Intelligence Manager"
            ]
          }
        ]
      },
      {
        "id": "cat-58",
        "num": 58,
        "name": "Supply Chain",
        "group": "Supply Chain & Sustainability",
        "groupId": "grp-6",
        "icon": "Truck",
        "subcategories": [
          {
            "id": "sub-58-1",
            "name": "Supply Chain Leadership",
            "categoryId": "cat-58",
            "titles": [
              "Chief Supply Chain Officer (CSCO)",
              "Supply Chain Director",
              "VP Supply Chain",
              "Head of Supply Chain",
              "Supply Chain Manager"
            ]
          },
          {
            "id": "sub-58-2",
            "name": "Supply Chain Planning",
            "categoryId": "cat-58",
            "titles": [
              "Supply Planning Director",
              "Demand Planning Manager",
              "Supply Planning Manager",
              "S&OP Manager"
            ]
          },
          {
            "id": "sub-58-3",
            "name": "Logistics",
            "categoryId": "cat-58",
            "titles": [
              "Logistics Director",
              "Transportation Manager",
              "Freight Manager",
              "Fleet Operations Manager"
            ]
          },
          {
            "id": "sub-58-4",
            "name": "End-to-End Supply Chain",
            "categoryId": "cat-58",
            "titles": [
              "End-to-End Supply Chain Director",
              "Network Planning Manager",
              "Distribution Planning Manager",
              "Supply Chain Analytics Manager"
            ]
          },
          {
            "id": "sub-58-5",
            "name": "Supply Chain Excellence",
            "categoryId": "cat-58",
            "titles": [
              "Supply Chain Excellence Director",
              "Inventory Optimization Manager",
              "Supply Chain Transformation Lead",
              "Supply Chain Performance Manager"
            ]
          }
        ]
      },
      {
        "id": "cat-59",
        "num": 59,
        "name": "Logistics",
        "group": "Supply Chain & Sustainability",
        "groupId": "grp-6",
        "icon": "Globe",
        "subcategories": [
          {
            "id": "sub-59-1",
            "name": "Logistics Leadership",
            "categoryId": "cat-59",
            "titles": [
              "Chief Logistics Officer (CLO)",
              "Logistics Director",
              "Head of Logistics",
              "VP Logistics",
              "Logistics Manager"
            ]
          },
          {
            "id": "sub-59-2",
            "name": "Transportation",
            "categoryId": "cat-59",
            "titles": [
              "Transportation Director",
              "Fleet Manager",
              "Route Planning Manager",
              "Transport Operations Manager"
            ]
          },
          {
            "id": "sub-59-3",
            "name": "Distribution",
            "categoryId": "cat-59",
            "titles": [
              "Distribution Director",
              "Dispatch Manager",
              "Distribution Center Manager",
              "Delivery Operations Manager"
            ]
          },
          {
            "id": "sub-59-4",
            "name": "International Logistics",
            "categoryId": "cat-59",
            "titles": [
              "Global Logistics Director",
              "Freight Manager",
              "Customs Logistics Manager",
              "Cross-border Logistics Manager"
            ]
          },
          {
            "id": "sub-59-5",
            "name": "Logistics Excellence",
            "categoryId": "cat-59",
            "titles": [
              "Logistics Excellence Director",
              "Logistics Planning Manager",
              "Logistics Analytics Manager",
              "Logistics Transformation Lead"
            ]
          }
        ]
      },
      {
        "id": "cat-60",
        "num": 60,
        "name": "Sustainability & ESG",
        "group": "Supply Chain & Sustainability",
        "groupId": "grp-6",
        "icon": "Leaf",
        "subcategories": [
          {
            "id": "sub-60-1",
            "name": "Sustainability Leadership",
            "categoryId": "cat-60",
            "titles": [
              "Chief Sustainability Officer (CSO)",
              "ESG Director",
              "Head of Sustainability",
              "Sustainability Manager",
              "ESG Program Manager"
            ]
          },
          {
            "id": "sub-60-2",
            "name": "Environmental Sustainability",
            "categoryId": "cat-60",
            "titles": [
              "Environmental Director",
              "Climate Strategy Director",
              "Carbon Management Lead",
              "Environmental Compliance Manager"
            ]
          },
          {
            "id": "sub-60-3",
            "name": "ESG Governance",
            "categoryId": "cat-60",
            "titles": [
              "ESG Reporting Director",
              "ESG Strategy Manager",
              "ESG Risk Manager",
              "Sustainable Finance Lead"
            ]
          },
          {
            "id": "sub-60-4",
            "name": "Social Impact",
            "categoryId": "cat-60",
            "titles": [
              "Social Sustainability Manager",
              "Community Impact Director",
              "Diversity & Inclusion Director",
              "Responsible Business Manager"
            ]
          },
          {
            "id": "sub-60-5",
            "name": "Sustainability Excellence",
            "categoryId": "cat-60",
            "titles": [
              "Circular Economy Lead",
              "Net Zero Program Manager",
              "Sustainability Innovation Lead",
              "Sustainable Development Manager"
            ]
          }
        ]
      },
      {
        "id": "cat-61",
        "num": 61,
        "name": "CSR & Social Impact",
        "group": "Supply Chain & Sustainability",
        "groupId": "grp-6",
        "icon": "Sprout",
        "subcategories": [
          {
            "id": "sub-61-1",
            "name": "CSR Leadership",
            "categoryId": "cat-61",
            "titles": [
              "CSR Director",
              "Head of CSR",
              "CSR Manager",
              "Corporate Citizenship Manager"
            ]
          },
          {
            "id": "sub-61-2",
            "name": "Community Development",
            "categoryId": "cat-61",
            "titles": [
              "Community Relations Director",
              "Community Development Manager",
              "Rural Development Manager",
              "Social Development Manager"
            ]
          },
          {
            "id": "sub-61-3",
            "name": "Education & Skills",
            "categoryId": "cat-61",
            "titles": [
              "Education Program Director",
              "Skill Development Manager",
              "Youth Development Manager",
              "Livelihood Program Manager"
            ]
          },
          {
            "id": "sub-61-4",
            "name": "NGO & Partnerships",
            "categoryId": "cat-61",
            "titles": [
              "NGO Partnership Director",
              "Foundation Director",
              "Social Partnerships Manager",
              "Philanthropy Manager"
            ]
          },
          {
            "id": "sub-61-5",
            "name": "Impact Measurement",
            "categoryId": "cat-61",
            "titles": [
              "Impact Assessment Director",
              "Social Impact Analyst",
              "CSR Reporting Manager",
              "Community Impact Lead"
            ]
          }
        ]
      },
      {
        "id": "cat-62",
        "num": 62,
        "name": "Global Expansion",
        "group": "Supply Chain & Sustainability",
        "groupId": "grp-6",
        "icon": "TreePine",
        "subcategories": [
          {
            "id": "sub-62-1",
            "name": "Expansion Leadership",
            "categoryId": "cat-62",
            "titles": [
              "Chief Global Expansion Officer",
              "Global Expansion Director",
              "Head of International Expansion",
              "Expansion Manager"
            ]
          },
          {
            "id": "sub-62-2",
            "name": "Market Expansion",
            "categoryId": "cat-62",
            "titles": [
              "International Markets Director",
              "Country Expansion Manager",
              "Regional Expansion Manager",
              "Market Entry Manager"
            ]
          },
          {
            "id": "sub-62-3",
            "name": "Strategic Alliances",
            "categoryId": "cat-62",
            "titles": [
              "Global Alliances Director",
              "International Partnerships Manager",
              "Strategic Alliances Manager",
              "Joint Ventures Director"
            ]
          },
          {
            "id": "sub-62-4",
            "name": "Business Development",
            "categoryId": "cat-62",
            "titles": [
              "Cross-border Business Director",
              "International Growth Manager",
              "Global Strategy Lead",
              "Overseas Operations Manager"
            ]
          }
        ]
      },
      {
        "id": "cat-63",
        "num": 63,
        "name": "Export Excellence",
        "group": "Supply Chain & Sustainability",
        "groupId": "grp-6",
        "icon": "Recycle",
        "subcategories": [
          {
            "id": "sub-63-1",
            "name": "Export Leadership",
            "categoryId": "cat-63",
            "titles": [
              "Export Director",
              "Head of Exports",
              "Export Manager",
              "International Sales Manager"
            ]
          },
          {
            "id": "sub-63-2",
            "name": "Export Operations",
            "categoryId": "cat-63",
            "titles": [
              "Export Operations Director",
              "Export Documentation Manager",
              "Export Compliance Manager",
              "Export Logistics Manager"
            ]
          },
          {
            "id": "sub-63-3",
            "name": "Trade Development",
            "categoryId": "cat-63",
            "titles": [
              "Export Promotion Director",
              "Trade Development Manager",
              "Global Market Development Manager",
              "Trade Intelligence Manager"
            ]
          },
          {
            "id": "sub-63-4",
            "name": "International Sales",
            "categoryId": "cat-63",
            "titles": [
              "Regional Export Manager",
              "Overseas Sales Director",
              "Global Accounts Manager",
              "Export Strategy Lead"
            ]
          }
        ]
      },
      {
        "id": "cat-64",
        "num": 64,
        "name": "Import & Trade Excellence",
        "group": "Supply Chain & Sustainability",
        "groupId": "grp-6",
        "icon": "SunMedium",
        "subcategories": [
          {
            "id": "sub-64-1",
            "name": "Import Leadership",
            "categoryId": "cat-64",
            "titles": [
              "Import Director",
              "Head of Imports",
              "Import Manager",
              "Trade Operations Manager"
            ]
          },
          {
            "id": "sub-64-2",
            "name": "Import Operations",
            "categoryId": "cat-64",
            "titles": [
              "Customs Compliance Director",
              "Customs Manager",
              "Import Documentation Manager",
              "Trade Compliance Manager"
            ]
          },
          {
            "id": "sub-64-3",
            "name": "Trade Management",
            "categoryId": "cat-64",
            "titles": [
              "International Trade Director",
              "Global Trade Manager",
              "Trade Policy Manager",
              "Cross-border Trade Manager"
            ]
          },
          {
            "id": "sub-64-4",
            "name": "Trade Facilitation",
            "categoryId": "cat-64",
            "titles": [
              "Trade Facilitation Director",
              "Customs Relations Manager",
              "Import Strategy Lead",
              "International Procurement Manager"
            ]
          }
        ]
      },
      {
        "id": "cat-65",
        "num": 65,
        "name": "Circular Economy",
        "group": "Supply Chain & Sustainability",
        "groupId": "grp-6",
        "icon": "Wind",
        "subcategories": [
          {
            "id": "sub-65-1",
            "name": "Circular Economy Leadership",
            "categoryId": "cat-65",
            "titles": [
              "Circular Economy Director",
              "Head of Circular Economy",
              "Circular Economy Manager",
              "Sustainability Innovation Lead"
            ]
          },
          {
            "id": "sub-65-2",
            "name": "Resource Management",
            "categoryId": "cat-65",
            "titles": [
              "Resource Recovery Director",
              "Materials Recovery Manager",
              "Waste Reduction Manager",
              "Recycling Program Manager"
            ]
          },
          {
            "id": "sub-65-3",
            "name": "Sustainable Design",
            "categoryId": "cat-65",
            "titles": [
              "Eco Design Director",
              "Sustainable Product Manager",
              "Green Innovation Manager",
              "Life Cycle Assessment Lead"
            ]
          },
          {
            "id": "sub-65-4",
            "name": "Circular Innovation",
            "categoryId": "cat-65",
            "titles": [
              "Circular Business Model Director",
              "Circular Supply Chain Manager",
              "Zero Waste Program Manager",
              "Circular Strategy Manager"
            ]
          }
        ]
      },
      {
        "id": "cat-66",
        "num": 66,
        "name": "Green Supply Chain",
        "group": "Supply Chain & Sustainability",
        "groupId": "grp-6",
        "icon": "Droplets",
        "subcategories": [
          {
            "id": "sub-66-1",
            "name": "Green Supply Chain Leadership",
            "categoryId": "cat-66",
            "titles": [
              "Green Supply Chain Director",
              "Head of Sustainable Supply Chain",
              "Green Logistics Manager",
              "Sustainable Procurement Director"
            ]
          },
          {
            "id": "sub-66-2",
            "name": "Sustainable Procurement",
            "categoryId": "cat-66",
            "titles": [
              "Sustainable Sourcing Manager",
              "Responsible Procurement Manager",
              "Ethical Sourcing Manager",
              "Supplier Sustainability Manager"
            ]
          },
          {
            "id": "sub-66-3",
            "name": "Green Logistics",
            "categoryId": "cat-66",
            "titles": [
              "Low Carbon Logistics Director",
              "Green Transportation Manager",
              "Sustainable Distribution Manager",
              "Eco Logistics Manager"
            ]
          },
          {
            "id": "sub-66-4",
            "name": "Supply Chain Sustainability",
            "categoryId": "cat-66",
            "titles": [
              "Supply Chain ESG Director",
              "Carbon Supply Chain Manager",
              "Sustainable Operations Manager",
              "Green Supply Chain Analyst"
            ]
          }
        ]
      }
    ]
  }
];

export const LEADERSHIP_CATEGORIES: LeaderCategory[] = [
  {
    "id": "cat-1",
    "num": 1,
    "name": "Executive Leadership",
    "group": "Leadership & Governance",
    "groupId": "grp-1",
    "icon": "Crown",
    "subcategories": [
      {
        "id": "sub-1-1",
        "name": "Founders",
        "categoryId": "cat-1",
        "titles": [
          "Founder",
          "Co-Founder",
          "Founding Partner",
          "Promoter",
          "Co-Promoter",
          "Managing Partner"
        ]
      },
      {
        "id": "sub-1-2",
        "name": "Board Leadership",
        "categoryId": "cat-1",
        "titles": [
          "Chairman",
          "Executive Chairman",
          "Vice Chairman",
          "Board Director",
          "Independent Director",
          "Non-Executive Director",
          "Lead Independent Director",
          "Board Advisor"
        ]
      },
      {
        "id": "sub-1-3",
        "name": "Executive Management",
        "categoryId": "cat-1",
        "titles": [
          "Chief Executive Officer (CEO)",
          "President",
          "Managing Director (MD)",
          "Executive Director",
          "Group CEO",
          "Regional CEO",
          "Country CEO",
          "Business Unit CEO",
          "Division President",
          "Executive Vice President"
        ]
      },
      {
        "id": "sub-1-4",
        "name": "Leadership Office",
        "categoryId": "cat-1",
        "titles": [
          "Chief of Staff",
          "Executive Secretary",
          "Executive Advisor",
          "Senior Advisor",
          "Strategic Advisor"
        ]
      }
    ]
  },
  {
    "id": "cat-2",
    "num": 2,
    "name": "Corporate Governance",
    "group": "Leadership & Governance",
    "groupId": "grp-1",
    "icon": "Building2",
    "subcategories": [
      {
        "id": "sub-2-1",
        "name": "Board Governance",
        "categoryId": "cat-2",
        "titles": [
          "Governance Chairman",
          "Board Chairman",
          "Board Director",
          "Independent Director",
          "Non-Executive Director",
          "Governance Advisor"
        ]
      },
      {
        "id": "sub-2-2",
        "name": "Governance Office",
        "categoryId": "cat-2",
        "titles": [
          "Chief Governance Officer",
          "Governance Director",
          "Governance Head",
          "Governance Manager",
          "Governance Officer"
        ]
      },
      {
        "id": "sub-2-3",
        "name": "Board Committees",
        "categoryId": "cat-2",
        "titles": [
          "Audit Committee Chair",
          "Nomination Committee Chair",
          "Remuneration Committee Chair",
          "ESG Committee Chair",
          "Ethics Committee Chair"
        ]
      },
      {
        "id": "sub-2-4",
        "name": "Corporate Secretariat",
        "categoryId": "cat-2",
        "titles": [
          "Company Secretary",
          "Assistant Company Secretary",
          "Board Secretary",
          "Corporate Secretary"
        ]
      }
    ]
  },
  {
    "id": "cat-3",
    "num": 3,
    "name": "Corporate Legal",
    "group": "Leadership & Governance",
    "groupId": "grp-1",
    "icon": "Shield",
    "subcategories": [
      {
        "id": "sub-3-1",
        "name": "Legal Leadership",
        "categoryId": "cat-3",
        "titles": [
          "Chief Legal Officer (CLO)",
          "General Counsel",
          "Legal Director",
          "Head of Legal",
          "Legal Advisor"
        ]
      },
      {
        "id": "sub-3-2",
        "name": "Corporate Legal",
        "categoryId": "cat-3",
        "titles": [
          "Senior Legal Counsel",
          "Corporate Counsel",
          "Associate General Counsel",
          "Legal Manager"
        ]
      },
      {
        "id": "sub-3-3",
        "name": "Contracts",
        "categoryId": "cat-3",
        "titles": [
          "Contracts Director",
          "Contracts Manager",
          "Commercial Counsel",
          "Contract Specialist"
        ]
      },
      {
        "id": "sub-3-4",
        "name": "Litigation",
        "categoryId": "cat-3",
        "titles": [
          "Litigation Head",
          "Litigation Counsel",
          "Arbitration Counsel",
          "Legal Compliance Counsel"
        ]
      }
    ]
  },
  {
    "id": "cat-4",
    "num": 4,
    "name": "Corporate Compliance",
    "group": "Leadership & Governance",
    "groupId": "grp-1",
    "icon": "Briefcase",
    "subcategories": [
      {
        "id": "sub-4-1",
        "name": "Compliance Leadership",
        "categoryId": "cat-4",
        "titles": [
          "Chief Compliance Officer",
          "Compliance Director",
          "Compliance Head",
          "Compliance Manager"
        ]
      },
      {
        "id": "sub-4-2",
        "name": "Regulatory Compliance",
        "categoryId": "cat-4",
        "titles": [
          "Regulatory Affairs Director",
          "Regulatory Compliance Head",
          "Regulatory Manager",
          "Licensing Manager"
        ]
      },
      {
        "id": "sub-4-3",
        "name": "Ethics & Integrity",
        "categoryId": "cat-4",
        "titles": [
          "Ethics Officer",
          "Integrity Officer",
          "Ethics Director",
          "Whistleblower Officer"
        ]
      },
      {
        "id": "sub-4-4",
        "name": "Corporate Compliance",
        "categoryId": "cat-4",
        "titles": [
          "Compliance Auditor",
          "Compliance Analyst",
          "Governance Officer",
          "Compliance Executive"
        ]
      }
    ]
  },
  {
    "id": "cat-5",
    "num": 5,
    "name": "Administration",
    "group": "Leadership & Governance",
    "groupId": "grp-1",
    "icon": "Users",
    "subcategories": [
      {
        "id": "sub-5-1",
        "name": "Administration Leadership",
        "categoryId": "cat-5",
        "titles": [
          "Chief Administrative Officer (CAO)",
          "Administration Director",
          "Administration Head",
          "Administration Manager"
        ]
      },
      {
        "id": "sub-5-2",
        "name": "Office Administration",
        "categoryId": "cat-5",
        "titles": [
          "Office Manager",
          "Office Administrator",
          "Executive Administrator",
          "Administrative Officer"
        ]
      },
      {
        "id": "sub-5-3",
        "name": "Facilities",
        "categoryId": "cat-5",
        "titles": [
          "Facilities Director",
          "Facilities Manager",
          "Workplace Manager",
          "Building Manager"
        ]
      },
      {
        "id": "sub-5-4",
        "name": "Corporate Services",
        "categoryId": "cat-5",
        "titles": [
          "Travel Manager",
          "Fleet Manager",
          "Asset Manager",
          "Office Services Head"
        ]
      }
    ]
  },
  {
    "id": "cat-6",
    "num": 6,
    "name": "Marketing Excellence",
    "group": "Leadership & Governance",
    "groupId": "grp-1",
    "icon": "Landmark",
    "subcategories": [
      {
        "id": "sub-6-1",
        "name": "Marketing Leadership",
        "categoryId": "cat-6",
        "titles": [
          "Chief Marketing Officer (CMO)",
          "VP Marketing",
          "Marketing Director",
          "Head of Marketing",
          "Marketing Manager"
        ]
      },
      {
        "id": "sub-6-2",
        "name": "Digital Marketing",
        "categoryId": "cat-6",
        "titles": [
          "Digital Marketing Director",
          "SEO Director",
          "Performance Marketing Head",
          "Growth Marketing Head"
        ]
      },
      {
        "id": "sub-6-3",
        "name": "Content Marketing",
        "categoryId": "cat-6",
        "titles": [
          "Content Director",
          "Content Marketing Manager",
          "Campaign Manager",
          "Marketing Communications Manager"
        ]
      },
      {
        "id": "sub-6-4",
        "name": "Market Intelligence",
        "categoryId": "cat-6",
        "titles": [
          "Market Research Director",
          "Consumer Insights Head",
          "Marketing Analyst",
          "Competitive Intelligence Manager"
        ]
      }
    ]
  },
  {
    "id": "cat-7",
    "num": 7,
    "name": "Corporate Communications",
    "group": "Leadership & Governance",
    "groupId": "grp-1",
    "icon": "Award",
    "subcategories": [
      {
        "id": "sub-7-1",
        "name": "Communications Leadership",
        "categoryId": "cat-7",
        "titles": [
          "Chief Communications Officer (CCO)",
          "Communications Director",
          "Communications Head",
          "Communications Manager"
        ]
      },
      {
        "id": "sub-7-2",
        "name": "Public Relations",
        "categoryId": "cat-7",
        "titles": [
          "PR Director",
          "PR Manager",
          "Media Relations Head",
          "Corporate Spokesperson"
        ]
      },
      {
        "id": "sub-7-3",
        "name": "Internal Communications",
        "categoryId": "cat-7",
        "titles": [
          "Internal Communications Head",
          "Employee Communications Manager",
          "Communications Executive"
        ]
      },
      {
        "id": "sub-7-4",
        "name": "External Communications",
        "categoryId": "cat-7",
        "titles": [
          "External Relations Director",
          "Corporate Affairs Manager",
          "Media Advisor",
          "Press Secretary"
        ]
      }
    ]
  },
  {
    "id": "cat-8",
    "num": 8,
    "name": "Government Relations",
    "group": "Leadership & Governance",
    "groupId": "grp-1",
    "icon": "Globe",
    "subcategories": [
      {
        "id": "sub-8-1",
        "name": "Government Affairs",
        "categoryId": "cat-8",
        "titles": [
          "Chief Public Affairs Officer",
          "Government Relations Director",
          "Government Relations Head",
          "Government Affairs Manager",
          "Public Affairs Manager"
        ]
      },
      {
        "id": "sub-8-2",
        "name": "Public Policy",
        "categoryId": "cat-8",
        "titles": [
          "Public Policy Director",
          "Policy Head",
          "Policy Advisor",
          "Regulatory Policy Manager"
        ]
      },
      {
        "id": "sub-8-3",
        "name": "Regulatory Relations",
        "categoryId": "cat-8",
        "titles": [
          "Regulatory Affairs Director",
          "Regulatory Liaison Officer",
          "Government Liaison Officer",
          "Licensing Head"
        ]
      },
      {
        "id": "sub-8-4",
        "name": "External Affairs",
        "categoryId": "cat-8",
        "titles": [
          "External Affairs Director",
          "Stakeholder Relations Head",
          "Diplomatic Affairs Manager",
          "Trade Relations Manager"
        ]
      }
    ]
  },
  {
    "id": "cat-9",
    "num": 9,
    "name": "Public Policy",
    "group": "Leadership & Governance",
    "groupId": "grp-1",
    "icon": "Mic",
    "subcategories": [
      {
        "id": "sub-9-1",
        "name": "Policy Leadership",
        "categoryId": "cat-9",
        "titles": [
          "Chief Public Policy Officer",
          "Public Policy Director",
          "Head of Public Policy",
          "VP Public Policy",
          "Policy Advisor"
        ]
      },
      {
        "id": "sub-9-2",
        "name": "Policy Development",
        "categoryId": "cat-9",
        "titles": [
          "Policy Research Director",
          "Policy Development Manager",
          "Legislative Affairs Head",
          "Policy Analyst"
        ]
      },
      {
        "id": "sub-9-3",
        "name": "Regulatory Policy",
        "categoryId": "cat-9",
        "titles": [
          "Regulatory Policy Director",
          "Regulatory Affairs Manager",
          "Government Policy Advisor",
          "Public Affairs Executive"
        ]
      },
      {
        "id": "sub-9-4",
        "name": "Strategic Policy",
        "categoryId": "cat-9",
        "titles": [
          "Economic Policy Advisor",
          "Trade Policy Specialist",
          "Industry Policy Head",
          "Public Policy Consultant"
        ]
      }
    ]
  },
  {
    "id": "cat-10",
    "num": 10,
    "name": "Health, Safety & Environment (HSE/EHS)",
    "group": "Leadership & Governance",
    "groupId": "grp-1",
    "icon": "Activity",
    "subcategories": [
      {
        "id": "sub-10-1",
        "name": "HSE Leadership",
        "categoryId": "cat-10",
        "titles": [
          "Chief HSE Officer",
          "HSE Director",
          "Head of HSE",
          "HSE Manager"
        ]
      },
      {
        "id": "sub-10-2",
        "name": "Health & Safety",
        "categoryId": "cat-10",
        "titles": [
          "Occupational Health Director",
          "Safety Director",
          "Safety Manager",
          "Industrial Hygienist",
          "Safety Officer"
        ]
      },
      {
        "id": "sub-10-3",
        "name": "Environmental Management",
        "categoryId": "cat-10",
        "titles": [
          "Environment Director",
          "Environmental Compliance Manager",
          "Environmental Engineer",
          "Sustainability Officer"
        ]
      },
      {
        "id": "sub-10-4",
        "name": "Emergency & Risk",
        "categoryId": "cat-10",
        "titles": [
          "Emergency Response Manager",
          "Fire & Safety Head",
          "Disaster Recovery Manager",
          "Crisis Management Lead"
        ]
      }
    ]
  },
  {
    "id": "cat-11",
    "num": 11,
    "name": "Diplomacy",
    "group": "Leadership & Governance",
    "groupId": "grp-1",
    "icon": "FileEdit",
    "subcategories": [
      {
        "id": "sub-11-1",
        "name": "Diplomatic Leadership",
        "categoryId": "cat-11",
        "titles": [
          "Ambassador",
          "High Commissioner",
          "Deputy High Commissioner",
          "Permanent Representative"
        ]
      },
      {
        "id": "sub-11-2",
        "name": "Trade Diplomacy",
        "categoryId": "cat-11",
        "titles": [
          "Trade Commissioner",
          "Commercial Attach\u00e9",
          "Economic Counsellor",
          "Trade Promotion Officer"
        ]
      },
      {
        "id": "sub-11-3",
        "name": "Consular Affairs",
        "categoryId": "cat-11",
        "titles": [
          "Consul General",
          "Deputy Consul General",
          "Consular Officer",
          "Visa Officer"
        ]
      },
      {
        "id": "sub-11-4",
        "name": "International Relations",
        "categoryId": "cat-11",
        "titles": [
          "International Relations Director",
          "Bilateral Affairs Head",
          "Multilateral Affairs Head",
          "Foreign Affairs Advisor"
        ]
      }
    ]
  },
  {
    "id": "cat-12",
    "num": 12,
    "name": "Corporate Strategy",
    "group": "Finance, Strategy & Growth",
    "groupId": "grp-2",
    "icon": "Target",
    "subcategories": [
      {
        "id": "sub-12-1",
        "name": "Strategy Leadership",
        "categoryId": "cat-12",
        "titles": [
          "Chief Strategy Officer (CSO)",
          "Strategy Director",
          "VP Strategy",
          "Head of Strategy",
          "Strategy Manager"
        ]
      },
      {
        "id": "sub-12-2",
        "name": "Business Planning",
        "categoryId": "cat-12",
        "titles": [
          "Corporate Planning Director",
          "Strategic Planning Manager",
          "Business Planning Head",
          "Planning Analyst"
        ]
      },
      {
        "id": "sub-12-3",
        "name": "Growth Strategy",
        "categoryId": "cat-12",
        "titles": [
          "Growth Strategy Director",
          "Market Expansion Head",
          "Business Strategy Lead",
          "Competitive Strategy Manager"
        ]
      },
      {
        "id": "sub-12-4",
        "name": "Enterprise Strategy",
        "categoryId": "cat-12",
        "titles": [
          "Enterprise Architect",
          "Portfolio Strategy Head",
          "Strategic Initiatives Lead",
          "Transformation Advisor"
        ]
      }
    ]
  },
  {
    "id": "cat-13",
    "num": 13,
    "name": "Business Transformation",
    "group": "Finance, Strategy & Growth",
    "groupId": "grp-2",
    "icon": "TrendingUp",
    "subcategories": [
      {
        "id": "sub-13-1",
        "name": "Transformation Leadership",
        "categoryId": "cat-13",
        "titles": [
          "Chief Transformation Officer",
          "Transformation Director",
          "Head of Transformation",
          "Transformation Manager"
        ]
      },
      {
        "id": "sub-13-2",
        "name": "Organizational Change",
        "categoryId": "cat-13",
        "titles": [
          "Change Management Director",
          "Change Manager",
          "Organizational Change Lead",
          "Business Excellence Head"
        ]
      },
      {
        "id": "sub-13-3",
        "name": "Process Excellence",
        "categoryId": "cat-13",
        "titles": [
          "Process Improvement Director",
          "Lean Transformation Manager",
          "Six Sigma Leader",
          "Operational Excellence Head"
        ]
      },
      {
        "id": "sub-13-4",
        "name": "Strategic Initiatives",
        "categoryId": "cat-13",
        "titles": [
          "Strategic Programs Director",
          "Enterprise Transformation Lead",
          "Business Improvement Manager",
          "Innovation Transformation Head"
        ]
      }
    ]
  },
  {
    "id": "cat-14",
    "num": 14,
    "name": "Finance",
    "group": "Finance, Strategy & Growth",
    "groupId": "grp-2",
    "icon": "DollarSign",
    "subcategories": [
      {
        "id": "sub-14-1",
        "name": "Finance Leadership",
        "categoryId": "cat-14",
        "titles": [
          "Chief Financial Officer (CFO)",
          "Deputy CFO",
          "Finance Director",
          "VP Finance",
          "Head of Finance"
        ]
      },
      {
        "id": "sub-14-2",
        "name": "Accounting",
        "categoryId": "cat-14",
        "titles": [
          "Chief Accounting Officer",
          "Financial Controller",
          "Finance Controller",
          "Chief Accountant",
          "Accounting Manager"
        ]
      },
      {
        "id": "sub-14-3",
        "name": "Financial Planning",
        "categoryId": "cat-14",
        "titles": [
          "FP&A Director",
          "Budget Director",
          "Cost Controller",
          "Financial Planning Manager"
        ]
      },
      {
        "id": "sub-14-4",
        "name": "Financial Operations",
        "categoryId": "cat-14",
        "titles": [
          "Payroll Head",
          "Tax Director",
          "Financial Reporting Manager",
          "Accounts Payable Manager"
        ]
      }
    ]
  },
  {
    "id": "cat-15",
    "num": 15,
    "name": "Treasury",
    "group": "Finance, Strategy & Growth",
    "groupId": "grp-2",
    "icon": "CreditCard",
    "subcategories": [
      {
        "id": "sub-15-1",
        "name": "Treasury Leadership",
        "categoryId": "cat-15",
        "titles": [
          "Treasurer",
          "Treasury Director",
          "Head of Treasury",
          "Treasury Manager"
        ]
      },
      {
        "id": "sub-15-2",
        "name": "Cash Management",
        "categoryId": "cat-15",
        "titles": [
          "Cash Management Director",
          "Liquidity Manager",
          "Working Capital Manager",
          "Banking Relations Manager"
        ]
      },
      {
        "id": "sub-15-3",
        "name": "Investments",
        "categoryId": "cat-15",
        "titles": [
          "Chief Investment Officer",
          "Investment Director",
          "Portfolio Manager",
          "Capital Markets Manager"
        ]
      },
      {
        "id": "sub-15-4",
        "name": "Foreign Exchange",
        "categoryId": "cat-15",
        "titles": [
          "FX Manager",
          "Currency Risk Manager",
          "Hedging Specialist",
          "Treasury Analyst"
        ]
      }
    ]
  },
  {
    "id": "cat-16",
    "num": 16,
    "name": "Investor Relations",
    "group": "Finance, Strategy & Growth",
    "groupId": "grp-2",
    "icon": "BarChart3",
    "subcategories": [
      {
        "id": "sub-16-1",
        "name": "Investor Relations Leadership",
        "categoryId": "cat-16",
        "titles": [
          "Chief Investor Relations Officer",
          "Investor Relations Director",
          "Head of Investor Relations",
          "Investor Relations Manager"
        ]
      },
      {
        "id": "sub-16-2",
        "name": "Shareholder Relations",
        "categoryId": "cat-16",
        "titles": [
          "Shareholder Communications Director",
          "Shareholder Services Manager",
          "Investor Communications Lead",
          "Stakeholder Relations Manager"
        ]
      },
      {
        "id": "sub-16-3",
        "name": "Capital Markets",
        "categoryId": "cat-16",
        "titles": [
          "Capital Markets Director",
          "Equity Research Head",
          "Market Intelligence Manager",
          "Investment Communications Manager"
        ]
      },
      {
        "id": "sub-16-4",
        "name": "Corporate Reporting",
        "categoryId": "cat-16",
        "titles": [
          "Annual Report Manager",
          "ESG Reporting Lead",
          "Financial Communications Manager",
          "Disclosure Officer"
        ]
      }
    ]
  },
  {
    "id": "cat-17",
    "num": 17,
    "name": "Risk Management",
    "group": "Finance, Strategy & Growth",
    "groupId": "grp-2",
    "icon": "Layers",
    "subcategories": [
      {
        "id": "sub-17-1",
        "name": "Risk Leadership",
        "categoryId": "cat-17",
        "titles": [
          "Chief Risk Officer (CRO)",
          "Risk Director",
          "VP Risk Management",
          "Head of Risk",
          "Risk Manager"
        ]
      },
      {
        "id": "sub-17-2",
        "name": "Enterprise Risk",
        "categoryId": "cat-17",
        "titles": [
          "Enterprise Risk Director",
          "Enterprise Risk Manager",
          "Risk Assessment Lead",
          "Business Continuity Manager"
        ]
      },
      {
        "id": "sub-17-3",
        "name": "Operational Risk",
        "categoryId": "cat-17",
        "titles": [
          "Operational Risk Head",
          "Operational Risk Manager",
          "Internal Controls Manager",
          "Risk Analytics Manager"
        ]
      },
      {
        "id": "sub-17-4",
        "name": "Compliance Risk",
        "categoryId": "cat-17",
        "titles": [
          "Regulatory Risk Manager",
          "Financial Risk Manager",
          "Credit Risk Manager",
          "Market Risk Manager"
        ]
      }
    ]
  },
  {
    "id": "cat-18",
    "num": 18,
    "name": "Corporate Audit",
    "group": "Finance, Strategy & Growth",
    "groupId": "grp-2",
    "icon": "Store",
    "subcategories": [
      {
        "id": "sub-18-1",
        "name": "Audit Leadership",
        "categoryId": "cat-18",
        "titles": [
          "Chief Audit Executive (CAE)",
          "Internal Audit Director",
          "Head of Internal Audit",
          "Audit Manager"
        ]
      },
      {
        "id": "sub-18-2",
        "name": "Internal Audit",
        "categoryId": "cat-18",
        "titles": [
          "Senior Internal Auditor",
          "Internal Auditor",
          "Audit Supervisor",
          "Audit Executive"
        ]
      },
      {
        "id": "sub-18-3",
        "name": "Financial Audit",
        "categoryId": "cat-18",
        "titles": [
          "Financial Audit Director",
          "Financial Auditor",
          "Revenue Audit Manager",
          "Cost Audit Manager"
        ]
      },
      {
        "id": "sub-18-4",
        "name": "Governance Audit",
        "categoryId": "cat-18",
        "titles": [
          "Compliance Auditor",
          "Process Auditor",
          "IT Auditor",
          "Audit Analyst"
        ]
      }
    ]
  },
  {
    "id": "cat-19",
    "num": 19,
    "name": "Digital Transformation",
    "group": "Finance, Strategy & Growth",
    "groupId": "grp-2",
    "icon": "ShoppingBag",
    "subcategories": [
      {
        "id": "sub-19-1",
        "name": "Digital Leadership",
        "categoryId": "cat-19",
        "titles": [
          "Chief Digital Officer (CDO)",
          "Digital Transformation Director",
          "Head of Digital Transformation",
          "Digital Strategy Manager"
        ]
      },
      {
        "id": "sub-19-2",
        "name": "Digital Innovation",
        "categoryId": "cat-19",
        "titles": [
          "Digital Innovation Director",
          "Innovation Manager",
          "Smart Technology Lead",
          "Automation Lead"
        ]
      },
      {
        "id": "sub-19-3",
        "name": "Enterprise Digital",
        "categoryId": "cat-19",
        "titles": [
          "Enterprise Digital Head",
          "Business Process Digitization Manager",
          "Digital Program Manager",
          "Transformation Consultant"
        ]
      },
      {
        "id": "sub-19-4",
        "name": "Digital Excellence",
        "categoryId": "cat-19",
        "titles": [
          "Digital Excellence Manager",
          "Customer Digital Experience Lead",
          "Digital Adoption Manager",
          "Change Enablement Manager"
        ]
      }
    ]
  },
  {
    "id": "cat-20",
    "num": 20,
    "name": "Sales Excellence",
    "group": "Finance, Strategy & Growth",
    "groupId": "grp-2",
    "icon": "Rocket",
    "subcategories": [
      {
        "id": "sub-20-1",
        "name": "Sales Leadership",
        "categoryId": "cat-20",
        "titles": [
          "Chief Sales Officer (CSO)",
          "VP Sales",
          "Sales Director",
          "Head of Sales",
          "National Sales Head"
        ]
      },
      {
        "id": "sub-20-2",
        "name": "Business Sales",
        "categoryId": "cat-20",
        "titles": [
          "Regional Sales Director",
          "Territory Sales Manager",
          "Area Sales Manager",
          "Key Account Manager"
        ]
      },
      {
        "id": "sub-20-3",
        "name": "Enterprise Sales",
        "categoryId": "cat-20",
        "titles": [
          "Enterprise Sales Director",
          "Strategic Accounts Director",
          "Global Sales Head",
          "Channel Sales Director"
        ]
      },
      {
        "id": "sub-20-4",
        "name": "Sales Operations",
        "categoryId": "cat-20",
        "titles": [
          "Sales Operations Manager",
          "Sales Excellence Manager",
          "Revenue Operations Manager",
          "Sales Enablement Manager"
        ]
      }
    ]
  },
  {
    "id": "cat-21",
    "num": 21,
    "name": "Brand Management",
    "group": "Finance, Strategy & Growth",
    "groupId": "grp-2",
    "icon": "Zap",
    "subcategories": [
      {
        "id": "sub-21-1",
        "name": "Brand Leadership",
        "categoryId": "cat-21",
        "titles": [
          "Chief Brand Officer (CBO)",
          "Brand Director",
          "Head of Brand",
          "Brand Manager"
        ]
      },
      {
        "id": "sub-21-2",
        "name": "Brand Strategy",
        "categoryId": "cat-21",
        "titles": [
          "Brand Strategy Director",
          "Brand Planning Manager",
          "Corporate Identity Manager",
          "Employer Branding Head"
        ]
      },
      {
        "id": "sub-21-3",
        "name": "Consumer Brand",
        "categoryId": "cat-21",
        "titles": [
          "Consumer Brand Manager",
          "Product Brand Manager",
          "Category Brand Manager",
          "Retail Brand Manager"
        ]
      },
      {
        "id": "sub-21-4",
        "name": "Brand Communications",
        "categoryId": "cat-21",
        "titles": [
          "Brand Communications Director",
          "Creative Director",
          "Design Head",
          "Visual Identity Manager"
        ]
      }
    ]
  },
  {
    "id": "cat-22",
    "num": 22,
    "name": "Public Relations",
    "group": "Finance, Strategy & Growth",
    "groupId": "grp-2",
    "icon": "Lightbulb",
    "subcategories": [
      {
        "id": "sub-22-1",
        "name": "PR Leadership",
        "categoryId": "cat-22",
        "titles": [
          "Chief Public Relations Officer",
          "Public Relations Director",
          "Head of Public Relations",
          "PR Manager"
        ]
      },
      {
        "id": "sub-22-2",
        "name": "Media Relations",
        "categoryId": "cat-22",
        "titles": [
          "Media Relations Director",
          "Media Relations Manager",
          "Press Relations Officer",
          "Press Secretary"
        ]
      },
      {
        "id": "sub-22-3",
        "name": "Reputation Management",
        "categoryId": "cat-22",
        "titles": [
          "Reputation Director",
          "Corporate Reputation Manager",
          "Crisis Communications Manager",
          "Image Management Specialist"
        ]
      },
      {
        "id": "sub-22-4",
        "name": "Public Engagement",
        "categoryId": "cat-22",
        "titles": [
          "Community Relations Manager",
          "Public Affairs Manager",
          "External Communications Manager",
          "Stakeholder Communications Lead"
        ]
      }
    ]
  },
  {
    "id": "cat-23",
    "num": 23,
    "name": "Information Technology (IT)",
    "group": "Technology, AI & Innovation",
    "groupId": "grp-3",
    "icon": "Cpu",
    "subcategories": [
      {
        "id": "sub-23-1",
        "name": "IT Leadership",
        "categoryId": "cat-23",
        "titles": [
          "Chief Information Officer (CIO)",
          "Chief Technology Officer (CTO)",
          "IT Director",
          "VP Information Technology",
          "Head of IT"
        ]
      },
      {
        "id": "sub-23-2",
        "name": "Infrastructure",
        "categoryId": "cat-23",
        "titles": [
          "Infrastructure Director",
          "Infrastructure Manager",
          "Network Manager",
          "Systems Administrator"
        ]
      },
      {
        "id": "sub-23-3",
        "name": "Enterprise Applications",
        "categoryId": "cat-23",
        "titles": [
          "ERP Director",
          "SAP Program Director",
          "Enterprise Applications Manager",
          "Business Applications Manager"
        ]
      },
      {
        "id": "sub-23-4",
        "name": "IT Operations",
        "categoryId": "cat-23",
        "titles": [
          "IT Operations Director",
          "Service Delivery Manager",
          "IT Support Manager",
          "Helpdesk Manager"
        ]
      },
      {
        "id": "sub-23-5",
        "name": "Architecture",
        "categoryId": "cat-23",
        "titles": [
          "Enterprise Architect",
          "Solution Architect",
          "Cloud Architect",
          "Technical Architect"
        ]
      }
    ]
  },
  {
    "id": "cat-24",
    "num": 24,
    "name": "Engineering Services",
    "group": "Technology, AI & Innovation",
    "groupId": "grp-3",
    "icon": "Cog",
    "subcategories": [
      {
        "id": "sub-24-1",
        "name": "Engineering Leadership",
        "categoryId": "cat-24",
        "titles": [
          "Chief Engineer",
          "Engineering Director",
          "VP Engineering",
          "Head of Engineering",
          "Engineering Manager"
        ]
      },
      {
        "id": "sub-24-2",
        "name": "Design Engineering",
        "categoryId": "cat-24",
        "titles": [
          "Design Director",
          "Mechanical Engineering Head",
          "Electrical Engineering Head",
          "Civil Engineering Head"
        ]
      },
      {
        "id": "sub-24-3",
        "name": "Project Engineering",
        "categoryId": "cat-24",
        "titles": [
          "Project Engineering Director",
          "Project Engineer",
          "Site Engineering Manager",
          "Engineering Coordinator"
        ]
      },
      {
        "id": "sub-24-4",
        "name": "Technical Services",
        "categoryId": "cat-24",
        "titles": [
          "Technical Services Director",
          "Technical Support Manager",
          "Engineering Consultant",
          "Principal Engineer"
        ]
      },
      {
        "id": "sub-24-5",
        "name": "Industrial Engineering",
        "categoryId": "cat-24",
        "titles": [
          "Industrial Engineering Manager",
          "Process Engineer",
          "Manufacturing Engineer",
          "Reliability Engineer"
        ]
      }
    ]
  },
  {
    "id": "cat-25",
    "num": 25,
    "name": "Artificial Intelligence",
    "group": "Technology, AI & Innovation",
    "groupId": "grp-3",
    "icon": "CircuitBoard",
    "subcategories": [
      {
        "id": "sub-25-1",
        "name": "AI Leadership",
        "categoryId": "cat-25",
        "titles": [
          "Chief Artificial Intelligence Officer (CAIO)",
          "Chief AI Officer",
          "AI Director",
          "VP Artificial Intelligence",
          "Head of AI",
          "AI Program Manager"
        ]
      },
      {
        "id": "sub-25-2",
        "name": "AI Engineering",
        "categoryId": "cat-25",
        "titles": [
          "AI Engineering Director",
          "Machine Learning Director",
          "AI Engineering Manager",
          "Lead AI Engineer",
          "AI Solutions Architect"
        ]
      },
      {
        "id": "sub-25-3",
        "name": "AI Research",
        "categoryId": "cat-25",
        "titles": [
          "AI Research Director",
          "Principal AI Scientist",
          "AI Research Lead",
          "Generative AI Head",
          "NLP Research Lead"
        ]
      },
      {
        "id": "sub-25-4",
        "name": "Responsible AI",
        "categoryId": "cat-25",
        "titles": [
          "AI Ethics Officer",
          "Responsible AI Lead",
          "AI Governance Manager",
          "AI Risk Manager"
        ]
      },
      {
        "id": "sub-25-5",
        "name": "AI Operations",
        "categoryId": "cat-25",
        "titles": [
          "MLOps Director",
          "AI Platform Manager",
          "AI Deployment Lead",
          "AI Product Manager"
        ]
      }
    ]
  },
  {
    "id": "cat-26",
    "num": 26,
    "name": "Data, Analytics & Business Intelligence",
    "group": "Technology, AI & Innovation",
    "groupId": "grp-3",
    "icon": "Monitor",
    "subcategories": [
      {
        "id": "sub-26-1",
        "name": "Data Leadership",
        "categoryId": "cat-26",
        "titles": [
          "Chief Data Officer (CDO)",
          "Chief Analytics Officer",
          "Data Director",
          "Head of Data",
          "Data Governance Head"
        ]
      },
      {
        "id": "sub-26-2",
        "name": "Data Engineering",
        "categoryId": "cat-26",
        "titles": [
          "Data Engineering Director",
          "Data Architect",
          "Data Platform Manager",
          "Database Administrator",
          "Big Data Manager"
        ]
      },
      {
        "id": "sub-26-3",
        "name": "Analytics",
        "categoryId": "cat-26",
        "titles": [
          "Analytics Director",
          "Business Intelligence Director",
          "BI Manager",
          "Data Science Director",
          "Senior Data Scientist"
        ]
      },
      {
        "id": "sub-26-4",
        "name": "Reporting",
        "categoryId": "cat-26",
        "titles": [
          "Reporting Manager",
          "Dashboard Lead",
          "Insights Manager",
          "MIS Manager"
        ]
      },
      {
        "id": "sub-26-5",
        "name": "Governance",
        "categoryId": "cat-26",
        "titles": [
          "Master Data Manager",
          "Data Quality Manager",
          "Metadata Manager",
          "Data Steward"
        ]
      }
    ]
  },
  {
    "id": "cat-27",
    "num": 27,
    "name": "Product Management",
    "group": "Technology, AI & Innovation",
    "groupId": "grp-3",
    "icon": "Code",
    "subcategories": [
      {
        "id": "sub-27-1",
        "name": "Product Leadership",
        "categoryId": "cat-27",
        "titles": [
          "Chief Product Officer (CPO)",
          "VP Product",
          "Product Director",
          "Head of Product",
          "Product Portfolio Director"
        ]
      },
      {
        "id": "sub-27-2",
        "name": "Product Strategy",
        "categoryId": "cat-27",
        "titles": [
          "Product Strategy Director",
          "Product Planning Manager",
          "Product Roadmap Lead",
          "Portfolio Manager"
        ]
      },
      {
        "id": "sub-27-3",
        "name": "Product Operations",
        "categoryId": "cat-27",
        "titles": [
          "Senior Product Manager",
          "Product Manager",
          "Associate Product Manager",
          "Product Owner",
          "Platform Manager"
        ]
      },
      {
        "id": "sub-27-4",
        "name": "Product Delivery",
        "categoryId": "cat-27",
        "titles": [
          "Release Manager",
          "Product Delivery Manager",
          "Go-to-Market Manager",
          "Product Marketing Manager"
        ]
      },
      {
        "id": "sub-27-5",
        "name": "Product Experience",
        "categoryId": "cat-27",
        "titles": [
          "UX Product Lead",
          "Product Analyst",
          "Feature Manager",
          "Product Success Manager"
        ]
      }
    ]
  },
  {
    "id": "cat-28",
    "num": 28,
    "name": "Innovation",
    "group": "Technology, AI & Innovation",
    "groupId": "grp-3",
    "icon": "Microchip",
    "subcategories": [
      {
        "id": "sub-28-1",
        "name": "Innovation Leadership",
        "categoryId": "cat-28",
        "titles": [
          "Chief Innovation Officer (CINO)",
          "Innovation Director",
          "Head of Innovation",
          "Innovation Manager"
        ]
      },
      {
        "id": "sub-28-2",
        "name": "Innovation Labs",
        "categoryId": "cat-28",
        "titles": [
          "Innovation Lab Director",
          "Research Innovation Lead",
          "Technology Innovation Manager",
          "Innovation Consultant"
        ]
      },
      {
        "id": "sub-28-3",
        "name": "Emerging Innovation",
        "categoryId": "cat-28",
        "titles": [
          "Future Technologies Director",
          "Open Innovation Manager",
          "Innovation Partnerships Head",
          "Venture Innovation Lead"
        ]
      },
      {
        "id": "sub-28-4",
        "name": "Innovation Programs",
        "categoryId": "cat-28",
        "titles": [
          "Innovation Program Manager",
          "Incubation Manager",
          "Accelerator Program Lead",
          "Corporate Innovation Lead"
        ]
      }
    ]
  },
  {
    "id": "cat-29",
    "num": 29,
    "name": "Customer Experience",
    "group": "Technology, AI & Innovation",
    "groupId": "grp-3",
    "icon": "Radio",
    "subcategories": [
      {
        "id": "sub-29-1",
        "name": "Customer Leadership",
        "categoryId": "cat-29",
        "titles": [
          "Chief Customer Officer (CCO)",
          "Customer Experience Director",
          "Head of Customer Experience",
          "Customer Success Director"
        ]
      },
      {
        "id": "sub-29-2",
        "name": "Customer Operations",
        "categoryId": "cat-29",
        "titles": [
          "Customer Service Director",
          "Service Excellence Manager",
          "Customer Support Manager",
          "Contact Center Director"
        ]
      },
      {
        "id": "sub-29-3",
        "name": "Customer Insights",
        "categoryId": "cat-29",
        "titles": [
          "Customer Insights Director",
          "Voice of Customer Manager",
          "Customer Research Lead",
          "Customer Analytics Manager"
        ]
      },
      {
        "id": "sub-29-4",
        "name": "CRM",
        "categoryId": "cat-29",
        "titles": [
          "CRM Director",
          "CRM Manager",
          "Loyalty Program Manager",
          "Customer Engagement Manager"
        ]
      }
    ]
  },
  {
    "id": "cat-30",
    "num": 30,
    "name": "Program Management",
    "group": "Technology, AI & Innovation",
    "groupId": "grp-3",
    "icon": "Radar",
    "subcategories": [
      {
        "id": "sub-30-1",
        "name": "PMO Leadership",
        "categoryId": "cat-30",
        "titles": [
          "Chief Program Officer",
          "PMO Director",
          "Head of PMO",
          "PMO Manager"
        ]
      },
      {
        "id": "sub-30-2",
        "name": "Program Delivery",
        "categoryId": "cat-30",
        "titles": [
          "Program Director",
          "Senior Program Manager",
          "Program Manager",
          "Program Coordinator"
        ]
      },
      {
        "id": "sub-30-3",
        "name": "Portfolio Management",
        "categoryId": "cat-30",
        "titles": [
          "Portfolio Director",
          "Portfolio Manager",
          "Governance Manager",
          "Benefits Realization Manager"
        ]
      },
      {
        "id": "sub-30-4",
        "name": "Agile Delivery",
        "categoryId": "cat-30",
        "titles": [
          "Scrum Master",
          "Agile Coach",
          "Delivery Lead",
          "Release Train Engineer"
        ]
      }
    ]
  },
  {
    "id": "cat-31",
    "num": 31,
    "name": "Startup",
    "group": "Technology, AI & Innovation",
    "groupId": "grp-3",
    "icon": "FlaskConical",
    "subcategories": [
      {
        "id": "sub-31-1",
        "name": "Startup Leadership",
        "categoryId": "cat-31",
        "titles": [
          "Founder",
          "Co-Founder",
          "Startup CEO",
          "Startup COO",
          "Startup CTO"
        ]
      },
      {
        "id": "sub-31-2",
        "name": "Venture Growth",
        "categoryId": "cat-31",
        "titles": [
          "Venture Director",
          "Startup Growth Head",
          "Business Scaling Manager",
          "Startup Advisor"
        ]
      },
      {
        "id": "sub-31-3",
        "name": "Investment",
        "categoryId": "cat-31",
        "titles": [
          "Angel Investor",
          "Venture Capital Partner",
          "Managing Partner",
          "Investment Manager"
        ]
      },
      {
        "id": "sub-31-4",
        "name": "Incubation",
        "categoryId": "cat-31",
        "titles": [
          "Incubator Director",
          "Accelerator Director",
          "Innovation Mentor",
          "Startup Ecosystem Lead"
        ]
      }
    ]
  },
  {
    "id": "cat-32",
    "num": 32,
    "name": "Cloud Computing & Digital Infrastructure",
    "group": "Technology, AI & Innovation",
    "groupId": "grp-3",
    "icon": "TestTube",
    "subcategories": [
      {
        "id": "sub-32-1",
        "name": "Cloud Leadership",
        "categoryId": "cat-32",
        "titles": [
          "Chief Cloud Officer",
          "Cloud Director",
          "Head of Cloud",
          "Cloud Operations Manager"
        ]
      },
      {
        "id": "sub-32-2",
        "name": "Cloud Architecture",
        "categoryId": "cat-32",
        "titles": [
          "Cloud Architect",
          "Enterprise Cloud Architect",
          "Solutions Architect",
          "Infrastructure Architect"
        ]
      },
      {
        "id": "sub-32-3",
        "name": "Infrastructure",
        "categoryId": "cat-32",
        "titles": [
          "Infrastructure Director",
          "Network Infrastructure Manager",
          "Data Center Manager",
          "Platform Engineering Lead"
        ]
      },
      {
        "id": "sub-32-4",
        "name": "DevOps & SRE",
        "categoryId": "cat-32",
        "titles": [
          "DevOps Director",
          "Site Reliability Engineering Lead",
          "Platform Reliability Manager",
          "Infrastructure Automation Lead"
        ]
      }
    ]
  },
  {
    "id": "cat-33",
    "num": 33,
    "name": "Emerging Technologies & Automation",
    "group": "Technology, AI & Innovation",
    "groupId": "grp-3",
    "icon": "Sparkles",
    "subcategories": [
      {
        "id": "sub-33-1",
        "name": "Emerging Technology Leadership",
        "categoryId": "cat-33",
        "titles": [
          "Chief Technology Innovation Officer",
          "Emerging Technologies Director",
          "Head of Emerging Technologies",
          "Innovation Technology Manager"
        ]
      },
      {
        "id": "sub-33-2",
        "name": "Automation",
        "categoryId": "cat-33",
        "titles": [
          "Automation Director",
          "Intelligent Automation Manager",
          "Robotics Process Automation (RPA) Lead",
          "Hyperautomation Manager"
        ]
      },
      {
        "id": "sub-33-3",
        "name": "Future Technologies",
        "categoryId": "cat-33",
        "titles": [
          "Robotics Director",
          "IoT Director",
          "Blockchain Director",
          "Quantum Computing Lead",
          "Digital Twin Manager"
        ]
      },
      {
        "id": "sub-33-4",
        "name": "Smart Industry",
        "categoryId": "cat-33",
        "titles": [
          "Industry 4.0 Director",
          "Smart Manufacturing Lead",
          "Industrial Automation Head",
          "Advanced Technology Strategist"
        ]
      }
    ]
  },
  {
    "id": "cat-34",
    "num": 34,
    "name": "Human Resources (HR)",
    "group": "People, Customer & Security",
    "groupId": "grp-4",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "sub-34-1",
        "name": "HR Leadership",
        "categoryId": "cat-34",
        "titles": [
          "Chief Human Resources Officer (CHRO)",
          "Chief People Officer (CPO)",
          "VP Human Resources",
          "HR Director",
          "Head of Human Resources",
          "HR Business Partner"
        ]
      },
      {
        "id": "sub-34-2",
        "name": "HR Operations",
        "categoryId": "cat-34",
        "titles": [
          "HR Operations Director",
          "HR Operations Manager",
          "HR Shared Services Head",
          "HR General Manager",
          "HR Executive"
        ]
      },
      {
        "id": "sub-34-3",
        "name": "Compensation & Benefits",
        "categoryId": "cat-34",
        "titles": [
          "Compensation Director",
          "Benefits Director",
          "Payroll Manager",
          "Rewards Manager",
          "Compensation Analyst"
        ]
      },
      {
        "id": "sub-34-4",
        "name": "Employee Relations",
        "categoryId": "cat-34",
        "titles": [
          "Employee Relations Director",
          "Industrial Relations Head",
          "Employee Relations Manager",
          "Labour Relations Manager"
        ]
      },
      {
        "id": "sub-34-5",
        "name": "HR Strategy",
        "categoryId": "cat-34",
        "titles": [
          "Workforce Planning Director",
          "HR Analytics Manager",
          "HR Transformation Lead",
          "People Strategy Manager"
        ]
      }
    ]
  },
  {
    "id": "cat-35",
    "num": 35,
    "name": "Learning & Development",
    "group": "People, Customer & Security",
    "groupId": "grp-4",
    "icon": "GraduationCap",
    "subcategories": [
      {
        "id": "sub-35-1",
        "name": "L&D Leadership",
        "categoryId": "cat-35",
        "titles": [
          "Chief Learning Officer (CLO)",
          "Learning Director",
          "Head of Learning & Development",
          "Learning Manager"
        ]
      },
      {
        "id": "sub-35-2",
        "name": "Leadership Development",
        "categoryId": "cat-35",
        "titles": [
          "Leadership Development Director",
          "Executive Coaching Lead",
          "Leadership Coach",
          "Succession Planning Manager"
        ]
      },
      {
        "id": "sub-35-3",
        "name": "Corporate Training",
        "categoryId": "cat-35",
        "titles": [
          "Training Director",
          "Corporate Trainer",
          "Technical Trainer",
          "Functional Trainer"
        ]
      },
      {
        "id": "sub-35-4",
        "name": "Learning Technologies",
        "categoryId": "cat-35",
        "titles": [
          "LMS Administrator",
          "Digital Learning Manager",
          "eLearning Manager",
          "Instructional Designer"
        ]
      },
      {
        "id": "sub-35-5",
        "name": "Capability Building",
        "categoryId": "cat-35",
        "titles": [
          "Capability Development Head",
          "Skills Development Manager",
          "Competency Manager",
          "Organizational Learning Lead"
        ]
      }
    ]
  },
  {
    "id": "cat-36",
    "num": 36,
    "name": "Facilities Management",
    "group": "People, Customer & Security",
    "groupId": "grp-4",
    "icon": "Building",
    "subcategories": [
      {
        "id": "sub-36-1",
        "name": "Facilities Leadership",
        "categoryId": "cat-36",
        "titles": [
          "Facilities Director",
          "Head of Facilities",
          "Facilities Manager",
          "Corporate Services Director"
        ]
      },
      {
        "id": "sub-36-2",
        "name": "Workplace Management",
        "categoryId": "cat-36",
        "titles": [
          "Workplace Director",
          "Workplace Experience Manager",
          "Office Manager",
          "Workspace Planner"
        ]
      },
      {
        "id": "sub-36-3",
        "name": "Building Operations",
        "categoryId": "cat-36",
        "titles": [
          "Building Manager",
          "Property Manager",
          "Maintenance Manager",
          "Utilities Manager"
        ]
      },
      {
        "id": "sub-36-4",
        "name": "Security & Administration",
        "categoryId": "cat-36",
        "titles": [
          "Security Manager",
          "Administration Manager",
          "Reception Manager",
          "Visitor Services Manager"
        ]
      },
      {
        "id": "sub-36-5",
        "name": "Facility Planning",
        "categoryId": "cat-36",
        "titles": [
          "Space Planning Manager",
          "Facility Projects Manager",
          "Infrastructure Manager",
          "Smart Building Manager"
        ]
      }
    ]
  },
  {
    "id": "cat-37",
    "num": 37,
    "name": "Cyber Security & Information Security",
    "group": "People, Customer & Security",
    "groupId": "grp-4",
    "icon": "HeartPulse",
    "subcategories": [
      {
        "id": "sub-37-1",
        "name": "Security Leadership",
        "categoryId": "cat-37",
        "titles": [
          "Chief Information Security Officer (CISO)",
          "Chief Security Officer (CSO)",
          "VP Cyber Security",
          "Security Director",
          "Head of Information Security"
        ]
      },
      {
        "id": "sub-37-2",
        "name": "Security Operations",
        "categoryId": "cat-37",
        "titles": [
          "SOC Director",
          "SOC Manager",
          "Incident Response Manager",
          "Threat Intelligence Manager",
          "Security Operations Manager"
        ]
      },
      {
        "id": "sub-37-3",
        "name": "Cyber Defense",
        "categoryId": "cat-37",
        "titles": [
          "Cyber Security Architect",
          "Penetration Testing Lead",
          "Vulnerability Manager",
          "Security Engineering Manager"
        ]
      },
      {
        "id": "sub-37-4",
        "name": "Governance & Risk",
        "categoryId": "cat-37",
        "titles": [
          "Security Governance Manager",
          "Cyber Risk Manager",
          "Compliance Security Manager",
          "Privacy Officer"
        ]
      },
      {
        "id": "sub-37-5",
        "name": "Identity & Access",
        "categoryId": "cat-37",
        "titles": [
          "IAM Director",
          "Identity Manager",
          "Access Control Manager",
          "PKI Manager"
        ]
      }
    ]
  },
  {
    "id": "cat-38",
    "num": 38,
    "name": "Business Development",
    "group": "People, Customer & Security",
    "groupId": "grp-4",
    "icon": "UtensilsCrossed",
    "subcategories": [
      {
        "id": "sub-38-1",
        "name": "BD Leadership",
        "categoryId": "cat-38",
        "titles": [
          "Chief Business Development Officer",
          "VP Business Development",
          "Business Development Director",
          "Head of Business Development",
          "Business Development Manager"
        ]
      },
      {
        "id": "sub-38-2",
        "name": "Strategic Growth",
        "categoryId": "cat-38",
        "titles": [
          "Growth Director",
          "Strategic Partnerships Director",
          "Market Expansion Manager",
          "Corporate Development Manager"
        ]
      },
      {
        "id": "sub-38-3",
        "name": "Alliances",
        "categoryId": "cat-38",
        "titles": [
          "Partnerships Director",
          "Alliance Manager",
          "Channel Development Manager",
          "Ecosystem Partnerships Lead"
        ]
      },
      {
        "id": "sub-38-4",
        "name": "New Business",
        "categoryId": "cat-38",
        "titles": [
          "New Business Manager",
          "Opportunity Development Manager",
          "Client Acquisition Manager",
          "Strategic Accounts Manager"
        ]
      },
      {
        "id": "sub-38-5",
        "name": "Commercial Strategy",
        "categoryId": "cat-38",
        "titles": [
          "Commercial Director",
          "Commercial Excellence Manager",
          "Business Growth Lead",
          "Revenue Growth Manager"
        ]
      }
    ]
  },
  {
    "id": "cat-39",
    "num": 39,
    "name": "Customer Success",
    "group": "People, Customer & Security",
    "groupId": "grp-4",
    "icon": "Tv",
    "subcategories": [
      {
        "id": "sub-39-1",
        "name": "Customer Success Leadership",
        "categoryId": "cat-39",
        "titles": [
          "Chief Customer Success Officer",
          "VP Customer Success",
          "Customer Success Director",
          "Head of Customer Success",
          "Customer Success Manager"
        ]
      },
      {
        "id": "sub-39-2",
        "name": "Customer Engagement",
        "categoryId": "cat-39",
        "titles": [
          "Engagement Director",
          "Customer Relationship Manager",
          "Account Success Manager",
          "Customer Lifecycle Manager"
        ]
      },
      {
        "id": "sub-39-3",
        "name": "Client Success",
        "categoryId": "cat-39",
        "titles": [
          "Enterprise Success Manager",
          "Strategic Success Manager",
          "Technical Success Manager",
          "Adoption Manager"
        ]
      },
      {
        "id": "sub-39-4",
        "name": "Customer Retention",
        "categoryId": "cat-39",
        "titles": [
          "Retention Director",
          "Renewal Manager",
          "Customer Loyalty Manager",
          "Churn Prevention Manager"
        ]
      },
      {
        "id": "sub-39-5",
        "name": "Success Operations",
        "categoryId": "cat-39",
        "titles": [
          "Customer Success Operations Manager",
          "Customer Health Manager",
          "Success Analyst",
          "Customer Advocacy Manager"
        ]
      }
    ]
  },
  {
    "id": "cat-40",
    "num": 40,
    "name": "Projects Management",
    "group": "People, Customer & Security",
    "groupId": "grp-4",
    "icon": "ShoppingCart",
    "subcategories": [
      {
        "id": "sub-40-1",
        "name": "Project Leadership",
        "categoryId": "cat-40",
        "titles": [
          "Chief Projects Officer",
          "Projects Director",
          "Head of Projects",
          "Senior Project Manager",
          "Project Manager"
        ]
      },
      {
        "id": "sub-40-2",
        "name": "Project Delivery",
        "categoryId": "cat-40",
        "titles": [
          "Delivery Director",
          "Delivery Manager",
          "Project Coordinator",
          "Site Project Manager"
        ]
      },
      {
        "id": "sub-40-3",
        "name": "Construction & Engineering Projects",
        "categoryId": "cat-40",
        "titles": [
          "EPC Director",
          "Construction Project Manager",
          "Infrastructure Project Manager",
          "Capital Projects Manager"
        ]
      },
      {
        "id": "sub-40-4",
        "name": "Project Controls",
        "categoryId": "cat-40",
        "titles": [
          "Project Controls Director",
          "Cost Control Manager",
          "Planning Engineer",
          "Scheduling Manager"
        ]
      },
      {
        "id": "sub-40-5",
        "name": "Project Governance",
        "categoryId": "cat-40",
        "titles": [
          "Project Governance Manager",
          "Risk & Controls Manager",
          "Project Quality Manager",
          "PMO Analyst"
        ]
      }
    ]
  },
  {
    "id": "cat-41",
    "num": 41,
    "name": "Organizational Development",
    "group": "People, Customer & Security",
    "groupId": "grp-4",
    "icon": "Shield",
    "subcategories": [
      {
        "id": "sub-41-1",
        "name": "OD Leadership",
        "categoryId": "cat-41",
        "titles": [
          "Chief Organizational Development Officer",
          "Organizational Development Director",
          "Head of Organizational Development",
          "OD Manager"
        ]
      },
      {
        "id": "sub-41-2",
        "name": "Organization Design",
        "categoryId": "cat-41",
        "titles": [
          "Organization Design Director",
          "Workforce Design Manager",
          "Organizational Effectiveness Manager",
          "Business Transformation Consultant"
        ]
      },
      {
        "id": "sub-41-3",
        "name": "Change Management",
        "categoryId": "cat-41",
        "titles": [
          "Change Director",
          "Change Management Manager",
          "Transformation Coach",
          "Organizational Change Lead"
        ]
      },
      {
        "id": "sub-41-4",
        "name": "Culture & Performance",
        "categoryId": "cat-41",
        "titles": [
          "Culture Director",
          "Performance Excellence Manager",
          "Employee Experience Director",
          "Organizational Performance Manager"
        ]
      },
      {
        "id": "sub-41-5",
        "name": "Talent Strategy",
        "categoryId": "cat-41",
        "titles": [
          "Talent Strategy Director",
          "Succession Planning Lead",
          "Workforce Analytics Manager",
          "Capability Strategy Manager"
        ]
      }
    ]
  },
  {
    "id": "cat-42",
    "num": 42,
    "name": "Talent Acquisition",
    "group": "People, Customer & Security",
    "groupId": "grp-4",
    "icon": "Lock",
    "subcategories": [
      {
        "id": "sub-42-1",
        "name": "Talent Acquisition Leadership",
        "categoryId": "cat-42",
        "titles": [
          "Chief Talent Officer (CTO)",
          "Talent Acquisition Director",
          "Head of Talent Acquisition",
          "VP Talent Acquisition",
          "Talent Acquisition Manager"
        ]
      },
      {
        "id": "sub-42-2",
        "name": "Recruitment",
        "categoryId": "cat-42",
        "titles": [
          "Recruitment Director",
          "Recruitment Manager",
          "Senior Recruiter",
          "Technical Recruiter",
          "Campus Recruitment Manager"
        ]
      },
      {
        "id": "sub-42-3",
        "name": "Executive Search",
        "categoryId": "cat-42",
        "titles": [
          "Executive Search Director",
          "Executive Recruiter",
          "Leadership Hiring Manager",
          "Executive Talent Partner"
        ]
      },
      {
        "id": "sub-42-4",
        "name": "Employer Branding",
        "categoryId": "cat-42",
        "titles": [
          "Employer Branding Director",
          "Recruitment Marketing Manager",
          "Talent Branding Manager",
          "EVP Manager"
        ]
      },
      {
        "id": "sub-42-5",
        "name": "Workforce Planning",
        "categoryId": "cat-42",
        "titles": [
          "Workforce Planning Director",
          "Resource Planning Manager",
          "Talent Intelligence Lead",
          "Hiring Strategy Manager"
        ]
      }
    ]
  },
  {
    "id": "cat-43",
    "num": 43,
    "name": "Workplace Culture",
    "group": "People, Customer & Security",
    "groupId": "grp-4",
    "icon": "Key",
    "subcategories": [
      {
        "id": "sub-43-1",
        "name": "Culture Leadership",
        "categoryId": "cat-43",
        "titles": [
          "Chief Culture Officer",
          "Culture Director",
          "Head of Culture",
          "Culture Manager"
        ]
      },
      {
        "id": "sub-43-2",
        "name": "Organizational Culture",
        "categoryId": "cat-43",
        "titles": [
          "Culture Transformation Director",
          "Organizational Culture Lead",
          "Values & Ethics Manager",
          "Behavioral Excellence Manager"
        ]
      },
      {
        "id": "sub-43-3",
        "name": "Inclusion & Diversity",
        "categoryId": "cat-43",
        "titles": [
          "Chief Diversity Officer",
          "Diversity Director",
          "Inclusion Manager",
          "Belonging Manager"
        ]
      },
      {
        "id": "sub-43-4",
        "name": "Workplace Wellbeing",
        "categoryId": "cat-43",
        "titles": [
          "Wellbeing Director",
          "Wellness Manager",
          "Employee Wellbeing Lead",
          "Mental Health Program Manager"
        ]
      },
      {
        "id": "sub-43-5",
        "name": "Employee Experience",
        "categoryId": "cat-43",
        "titles": [
          "Employee Experience Director",
          "Workplace Experience Manager",
          "Culture Ambassador",
          "Workplace Excellence Lead"
        ]
      }
    ]
  },
  {
    "id": "cat-44",
    "num": 44,
    "name": "Employee Engagement",
    "group": "People, Customer & Security",
    "groupId": "grp-4",
    "icon": "UserPlus",
    "subcategories": [
      {
        "id": "sub-44-1",
        "name": "Engagement Leadership",
        "categoryId": "cat-44",
        "titles": [
          "Employee Engagement Director",
          "Head of Employee Engagement",
          "Engagement Manager",
          "Employee Experience Manager"
        ]
      },
      {
        "id": "sub-44-2",
        "name": "Employee Programs",
        "categoryId": "cat-44",
        "titles": [
          "Employee Programs Director",
          "Recognition Manager",
          "Rewards Program Manager",
          "Employee Events Manager"
        ]
      },
      {
        "id": "sub-44-3",
        "name": "Internal Engagement",
        "categoryId": "cat-44",
        "titles": [
          "Internal Communications Manager",
          "Employee Communications Lead",
          "Community Manager",
          "Engagement Specialist"
        ]
      },
      {
        "id": "sub-44-4",
        "name": "Surveys & Analytics",
        "categoryId": "cat-44",
        "titles": [
          "Employee Insights Director",
          "Engagement Analytics Manager",
          "Survey Manager",
          "HR Insights Analyst"
        ]
      },
      {
        "id": "sub-44-5",
        "name": "Retention",
        "categoryId": "cat-44",
        "titles": [
          "Retention Director",
          "Employee Success Manager",
          "Retention Specialist",
          "Employee Advocacy Lead"
        ]
      }
    ]
  },
  {
    "id": "cat-45",
    "num": 45,
    "name": "Research & Development (R&D)",
    "group": "Manufacturing & Operations",
    "groupId": "grp-5",
    "icon": "FlaskConical",
    "subcategories": [
      {
        "id": "sub-45-1",
        "name": "R&D Leadership",
        "categoryId": "cat-45",
        "titles": [
          "Chief Research Officer",
          "Chief Scientific Officer",
          "R&D Director",
          "Head of Research",
          "R&D Manager"
        ]
      },
      {
        "id": "sub-45-2",
        "name": "Scientific Research",
        "categoryId": "cat-45",
        "titles": [
          "Principal Scientist",
          "Senior Scientist",
          "Research Scientist",
          "Applied Scientist"
        ]
      },
      {
        "id": "sub-45-3",
        "name": "Product Research",
        "categoryId": "cat-45",
        "titles": [
          "Product Research Director",
          "Innovation Scientist",
          "Prototype Manager",
          "Product Validation Manager"
        ]
      },
      {
        "id": "sub-45-4",
        "name": "Technology Research",
        "categoryId": "cat-45",
        "titles": [
          "Technology Research Director",
          "Research Engineer",
          "Technology Fellow",
          "Innovation Research Lead"
        ]
      },
      {
        "id": "sub-45-5",
        "name": "Research Operations",
        "categoryId": "cat-45",
        "titles": [
          "Laboratory Director",
          "Lab Manager",
          "Testing Director",
          "Research Coordinator"
        ]
      }
    ]
  },
  {
    "id": "cat-46",
    "num": 46,
    "name": "Operations Efficiency",
    "group": "Manufacturing & Operations",
    "groupId": "grp-5",
    "icon": "Activity",
    "subcategories": [
      {
        "id": "sub-46-1",
        "name": "Operations Leadership",
        "categoryId": "cat-46",
        "titles": [
          "Chief Operating Officer (COO)",
          "Operations Excellence Director",
          "Head of Operations Excellence",
          "Operations Manager"
        ]
      },
      {
        "id": "sub-46-2",
        "name": "Process Excellence",
        "categoryId": "cat-46",
        "titles": [
          "Operational Excellence Director",
          "Process Improvement Manager",
          "Lean Six Sigma Master Black Belt",
          "Continuous Improvement Manager"
        ]
      },
      {
        "id": "sub-46-3",
        "name": "Business Excellence",
        "categoryId": "cat-46",
        "titles": [
          "Business Excellence Director",
          "Performance Excellence Manager",
          "Operational Performance Lead",
          "Productivity Manager"
        ]
      },
      {
        "id": "sub-46-4",
        "name": "Process Management",
        "categoryId": "cat-46",
        "titles": [
          "Business Process Manager",
          "Process Architect",
          "Process Analyst",
          "Workflow Manager"
        ]
      },
      {
        "id": "sub-46-5",
        "name": "Operational Analytics",
        "categoryId": "cat-46",
        "titles": [
          "Operations Analytics Manager",
          "KPI Manager",
          "Efficiency Analyst",
          "Performance Analyst"
        ]
      }
    ]
  },
  {
    "id": "cat-47",
    "num": 47,
    "name": "Manufacturing",
    "group": "Manufacturing & Operations",
    "groupId": "grp-5",
    "icon": "Factory",
    "subcategories": [
      {
        "id": "sub-47-1",
        "name": "Manufacturing Leadership",
        "categoryId": "cat-47",
        "titles": [
          "Chief Manufacturing Officer",
          "Manufacturing Director",
          "Head of Manufacturing",
          "Plant Director",
          "Manufacturing Manager"
        ]
      },
      {
        "id": "sub-47-2",
        "name": "Factory Operations",
        "categoryId": "cat-47",
        "titles": [
          "Factory Manager",
          "Plant Manager",
          "Shop Floor Manager",
          "Unit Head"
        ]
      },
      {
        "id": "sub-47-3",
        "name": "Manufacturing Engineering",
        "categoryId": "cat-47",
        "titles": [
          "Manufacturing Engineering Director",
          "Industrial Engineer",
          "Process Engineer",
          "Production Engineer"
        ]
      },
      {
        "id": "sub-47-4",
        "name": "Smart Manufacturing",
        "categoryId": "cat-47",
        "titles": [
          "Industry 4.0 Director",
          "Smart Factory Manager",
          "Automation Manufacturing Lead",
          "Digital Manufacturing Manager"
        ]
      },
      {
        "id": "sub-47-5",
        "name": "Manufacturing Excellence",
        "categoryId": "cat-47",
        "titles": [
          "Lean Manufacturing Head",
          "TPM Manager",
          "Operational Excellence Manager",
          "Continuous Improvement Engineer"
        ]
      }
    ]
  },
  {
    "id": "cat-48",
    "num": 48,
    "name": "Production",
    "group": "Manufacturing & Operations",
    "groupId": "grp-5",
    "icon": "Settings",
    "subcategories": [
      {
        "id": "sub-48-1",
        "name": "Production Leadership",
        "categoryId": "cat-48",
        "titles": [
          "Production Director",
          "Head of Production",
          "Production Manager",
          "Production Superintendent"
        ]
      },
      {
        "id": "sub-48-2",
        "name": "Production Planning",
        "categoryId": "cat-48",
        "titles": [
          "Production Planning Director",
          "Planning Manager",
          "Scheduling Manager",
          "Capacity Planning Manager"
        ]
      },
      {
        "id": "sub-48-3",
        "name": "Production Operations",
        "categoryId": "cat-48",
        "titles": [
          "Shift Manager",
          "Line Manager",
          "Assembly Manager",
          "Production Supervisor"
        ]
      },
      {
        "id": "sub-48-4",
        "name": "Production Control",
        "categoryId": "cat-48",
        "titles": [
          "Production Control Manager",
          "Inventory Planning Manager",
          "Materials Planning Manager",
          "Output Controller"
        ]
      },
      {
        "id": "sub-48-5",
        "name": "Production Improvement",
        "categoryId": "cat-48",
        "titles": [
          "Production Excellence Manager",
          "Kaizen Leader",
          "Continuous Improvement Specialist",
          "Productivity Engineer"
        ]
      }
    ]
  },
  {
    "id": "cat-49",
    "num": 49,
    "name": "Quality Assurance",
    "group": "Manufacturing & Operations",
    "groupId": "grp-5",
    "icon": "Package",
    "subcategories": [
      {
        "id": "sub-49-1",
        "name": "Quality Leadership",
        "categoryId": "cat-49",
        "titles": [
          "Chief Quality Officer (CQO)",
          "Quality Director",
          "Head of Quality",
          "QA Manager",
          "Quality Assurance Manager"
        ]
      },
      {
        "id": "sub-49-2",
        "name": "Quality Control",
        "categoryId": "cat-49",
        "titles": [
          "QC Director",
          "QC Manager",
          "Inspection Manager",
          "Quality Inspector"
        ]
      },
      {
        "id": "sub-49-3",
        "name": "Quality Systems",
        "categoryId": "cat-49",
        "titles": [
          "Quality Systems Director",
          "ISO Manager",
          "Compliance Quality Manager",
          "Documentation Manager"
        ]
      },
      {
        "id": "sub-49-4",
        "name": "Continuous Improvement",
        "categoryId": "cat-49",
        "titles": [
          "Six Sigma Director",
          "Lean Quality Manager",
          "Process Quality Manager",
          "Operational Quality Lead"
        ]
      },
      {
        "id": "sub-49-5",
        "name": "Customer Quality",
        "categoryId": "cat-49",
        "titles": [
          "Supplier Quality Manager",
          "Customer Quality Manager",
          "Product Quality Manager",
          "Quality Excellence Lead"
        ]
      }
    ]
  },
  {
    "id": "cat-50",
    "num": 50,
    "name": "Warehouse & Distribution",
    "group": "Manufacturing & Operations",
    "groupId": "grp-5",
    "icon": "Ship",
    "subcategories": [
      {
        "id": "sub-50-1",
        "name": "Warehouse Leadership",
        "categoryId": "cat-50",
        "titles": [
          "Chief Warehouse Officer",
          "Warehouse Director",
          "Head of Warehousing",
          "Warehouse Manager",
          "Distribution Manager"
        ]
      },
      {
        "id": "sub-50-2",
        "name": "Warehouse Operations",
        "categoryId": "cat-50",
        "titles": [
          "Warehouse Operations Director",
          "Inventory Control Manager",
          "Warehouse Supervisor",
          "Storage Operations Manager"
        ]
      },
      {
        "id": "sub-50-3",
        "name": "Distribution",
        "categoryId": "cat-50",
        "titles": [
          "Distribution Director",
          "Distribution Center Manager",
          "Dispatch Manager",
          "Delivery Operations Manager"
        ]
      },
      {
        "id": "sub-50-4",
        "name": "Inventory Management",
        "categoryId": "cat-50",
        "titles": [
          "Inventory Manager",
          "Inventory Planning Manager",
          "Stock Control Manager",
          "Materials Controller"
        ]
      },
      {
        "id": "sub-50-5",
        "name": "Logistics Excellence",
        "categoryId": "cat-50",
        "titles": [
          "Logistics Excellence Manager",
          "Warehouse Excellence Lead",
          "Fulfillment Manager",
          "Supply Operations Manager"
        ]
      }
    ]
  },
  {
    "id": "cat-51",
    "num": 51,
    "name": "Lean Manufacturing",
    "group": "Manufacturing & Operations",
    "groupId": "grp-5",
    "icon": "Train",
    "subcategories": [
      {
        "id": "sub-51-1",
        "name": "Lean Leadership",
        "categoryId": "cat-51",
        "titles": [
          "Lean Director",
          "Head of Lean Manufacturing",
          "Lean Manager",
          "Lean Transformation Lead"
        ]
      },
      {
        "id": "sub-51-2",
        "name": "Continuous Improvement",
        "categoryId": "cat-51",
        "titles": [
          "Kaizen Leader",
          "Continuous Improvement Director",
          "Lean Six Sigma Black Belt",
          "Lean Coach"
        ]
      },
      {
        "id": "sub-51-3",
        "name": "Manufacturing Excellence",
        "categoryId": "cat-51",
        "titles": [
          "Manufacturing Excellence Director",
          "TPM Manager",
          "Operational Excellence Manager",
          "Process Excellence Manager"
        ]
      },
      {
        "id": "sub-51-4",
        "name": "Lean Engineering",
        "categoryId": "cat-51",
        "titles": [
          "Lean Engineer",
          "Value Stream Manager",
          "Process Optimization Engineer",
          "Industrial Improvement Lead"
        ]
      }
    ]
  },
  {
    "id": "cat-52",
    "num": 52,
    "name": "International Business",
    "group": "Manufacturing & Operations",
    "groupId": "grp-5",
    "icon": "Truck",
    "subcategories": [
      {
        "id": "sub-52-1",
        "name": "International Leadership",
        "categoryId": "cat-52",
        "titles": [
          "Chief International Business Officer",
          "International Business Director",
          "Head of International Business",
          "VP Global Business"
        ]
      },
      {
        "id": "sub-52-2",
        "name": "Global Markets",
        "categoryId": "cat-52",
        "titles": [
          "Global Markets Director",
          "Regional Business Director",
          "Country Manager",
          "International Sales Director"
        ]
      },
      {
        "id": "sub-52-3",
        "name": "Export & Trade",
        "categoryId": "cat-52",
        "titles": [
          "Export Director",
          "Export Manager",
          "Trade Development Manager",
          "Global Trade Manager"
        ]
      },
      {
        "id": "sub-52-4",
        "name": "Import Operations",
        "categoryId": "cat-52",
        "titles": [
          "Import Director",
          "Import Manager",
          "Customs Compliance Manager",
          "Trade Compliance Manager"
        ]
      },
      {
        "id": "sub-52-5",
        "name": "International Partnerships",
        "categoryId": "cat-52",
        "titles": [
          "International Partnerships Director",
          "Cross-border Business Manager",
          "Global Alliance Manager",
          "International Expansion Lead"
        ]
      }
    ]
  },
  {
    "id": "cat-53",
    "num": 53,
    "name": "Industrial Engineering",
    "group": "Manufacturing & Operations",
    "groupId": "grp-5",
    "icon": "Plane",
    "subcategories": [
      {
        "id": "sub-53-1",
        "name": "Engineering Leadership",
        "categoryId": "cat-53",
        "titles": [
          "Industrial Engineering Director",
          "Head of Industrial Engineering",
          "Industrial Engineering Manager",
          "Chief Industrial Engineer"
        ]
      },
      {
        "id": "sub-53-2",
        "name": "Process Engineering",
        "categoryId": "cat-53",
        "titles": [
          "Process Engineering Director",
          "Manufacturing Process Engineer",
          "Process Optimization Manager",
          "Production Systems Engineer"
        ]
      },
      {
        "id": "sub-53-3",
        "name": "Productivity Engineering",
        "categoryId": "cat-53",
        "titles": [
          "Productivity Director",
          "Efficiency Engineer",
          "Time & Motion Engineer",
          "Operations Engineer"
        ]
      },
      {
        "id": "sub-53-4",
        "name": "Systems Engineering",
        "categoryId": "cat-53",
        "titles": [
          "Systems Engineer",
          "Plant Layout Engineer",
          "Industrial Automation Engineer",
          "Reliability Engineer"
        ]
      }
    ]
  },
  {
    "id": "cat-54",
    "num": 54,
    "name": "Maintenance & Asset Management",
    "group": "Manufacturing & Operations",
    "groupId": "grp-5",
    "icon": "Car",
    "subcategories": [
      {
        "id": "sub-54-1",
        "name": "Maintenance Leadership",
        "categoryId": "cat-54",
        "titles": [
          "Maintenance Director",
          "Head of Maintenance",
          "Maintenance Manager",
          "Engineering Maintenance Manager"
        ]
      },
      {
        "id": "sub-54-2",
        "name": "Asset Management",
        "categoryId": "cat-54",
        "titles": [
          "Asset Director",
          "Asset Manager",
          "Asset Reliability Manager",
          "Asset Performance Manager"
        ]
      },
      {
        "id": "sub-54-3",
        "name": "Plant Maintenance",
        "categoryId": "cat-54",
        "titles": [
          "Plant Maintenance Head",
          "Mechanical Maintenance Manager",
          "Electrical Maintenance Manager",
          "Utilities Maintenance Manager"
        ]
      },
      {
        "id": "sub-54-4",
        "name": "Reliability",
        "categoryId": "cat-54",
        "titles": [
          "Reliability Director",
          "Predictive Maintenance Manager",
          "Preventive Maintenance Manager",
          "Condition Monitoring Engineer"
        ]
      },
      {
        "id": "sub-54-5",
        "name": "Facilities Maintenance",
        "categoryId": "cat-54",
        "titles": [
          "Facility Maintenance Manager",
          "Building Services Manager",
          "Infrastructure Maintenance Lead",
          "Maintenance Planner"
        ]
      }
    ]
  },
  {
    "id": "cat-55",
    "num": 55,
    "name": "Industrial Safety & EHS",
    "group": "Manufacturing & Operations",
    "groupId": "grp-5",
    "icon": "BatteryCharging",
    "subcategories": [
      {
        "id": "sub-55-1",
        "name": "Safety Leadership",
        "categoryId": "cat-55",
        "titles": [
          "Chief Safety Officer",
          "EHS Director",
          "Head of Industrial Safety",
          "Safety Manager"
        ]
      },
      {
        "id": "sub-55-2",
        "name": "Occupational Safety",
        "categoryId": "cat-55",
        "titles": [
          "Occupational Safety Director",
          "Safety Engineer",
          "Workplace Safety Manager",
          "Industrial Hygiene Manager"
        ]
      },
      {
        "id": "sub-55-3",
        "name": "Environmental Health",
        "categoryId": "cat-55",
        "titles": [
          "Environment Health Director",
          "Environmental Safety Manager",
          "Sustainability Safety Lead",
          "Compliance Safety Manager"
        ]
      },
      {
        "id": "sub-55-4",
        "name": "Emergency Management",
        "categoryId": "cat-55",
        "titles": [
          "Emergency Response Director",
          "Fire Safety Manager",
          "Disaster Recovery Manager",
          "Crisis Response Lead"
        ]
      },
      {
        "id": "sub-55-5",
        "name": "Safety Excellence",
        "categoryId": "cat-55",
        "titles": [
          "Safety Excellence Manager",
          "Safety Training Lead",
          "Incident Investigation Manager",
          "Risk Prevention Manager"
        ]
      }
    ]
  },
  {
    "id": "cat-56",
    "num": 56,
    "name": "Procurement",
    "group": "Supply Chain & Sustainability",
    "groupId": "grp-6",
    "icon": "ShoppingBag",
    "subcategories": [
      {
        "id": "sub-56-1",
        "name": "Procurement Leadership",
        "categoryId": "cat-56",
        "titles": [
          "Chief Procurement Officer (CPO)",
          "Procurement Director",
          "Head of Procurement",
          "Procurement Manager"
        ]
      },
      {
        "id": "sub-56-2",
        "name": "Purchasing",
        "categoryId": "cat-56",
        "titles": [
          "Purchasing Director",
          "Purchasing Manager",
          "Senior Buyer",
          "Procurement Executive"
        ]
      },
      {
        "id": "sub-56-3",
        "name": "Vendor Management",
        "categoryId": "cat-56",
        "titles": [
          "Vendor Director",
          "Supplier Relationship Manager",
          "Vendor Development Manager",
          "Supplier Quality Manager"
        ]
      },
      {
        "id": "sub-56-4",
        "name": "Category Procurement",
        "categoryId": "cat-56",
        "titles": [
          "Category Manager",
          "Commodity Manager",
          "Sourcing Manager",
          "Spend Analytics Manager"
        ]
      },
      {
        "id": "sub-56-5",
        "name": "Procurement Excellence",
        "categoryId": "cat-56",
        "titles": [
          "Procurement Excellence Director",
          "Procurement Operations Manager",
          "Procurement Analyst",
          "Cost Optimization Manager"
        ]
      }
    ]
  },
  {
    "id": "cat-57",
    "num": 57,
    "name": "Strategic Sourcing",
    "group": "Supply Chain & Sustainability",
    "groupId": "grp-6",
    "icon": "Layers",
    "subcategories": [
      {
        "id": "sub-57-1",
        "name": "Sourcing Leadership",
        "categoryId": "cat-57",
        "titles": [
          "Strategic Sourcing Director",
          "Head of Strategic Sourcing",
          "Strategic Sourcing Manager",
          "Global Sourcing Manager"
        ]
      },
      {
        "id": "sub-57-2",
        "name": "Supplier Strategy",
        "categoryId": "cat-57",
        "titles": [
          "Supplier Strategy Director",
          "Supplier Development Manager",
          "Supplier Performance Manager",
          "Supplier Excellence Lead"
        ]
      },
      {
        "id": "sub-57-3",
        "name": "Category Sourcing",
        "categoryId": "cat-57",
        "titles": [
          "Global Category Manager",
          "Commodity Strategy Manager",
          "Strategic Buyer",
          "Category Procurement Lead"
        ]
      },
      {
        "id": "sub-57-4",
        "name": "Strategic Procurement",
        "categoryId": "cat-57",
        "titles": [
          "Cost Management Director",
          "Strategic Procurement Manager",
          "Contract Sourcing Manager",
          "Supply Market Intelligence Manager"
        ]
      }
    ]
  },
  {
    "id": "cat-58",
    "num": 58,
    "name": "Supply Chain",
    "group": "Supply Chain & Sustainability",
    "groupId": "grp-6",
    "icon": "Truck",
    "subcategories": [
      {
        "id": "sub-58-1",
        "name": "Supply Chain Leadership",
        "categoryId": "cat-58",
        "titles": [
          "Chief Supply Chain Officer (CSCO)",
          "Supply Chain Director",
          "VP Supply Chain",
          "Head of Supply Chain",
          "Supply Chain Manager"
        ]
      },
      {
        "id": "sub-58-2",
        "name": "Supply Chain Planning",
        "categoryId": "cat-58",
        "titles": [
          "Supply Planning Director",
          "Demand Planning Manager",
          "Supply Planning Manager",
          "S&OP Manager"
        ]
      },
      {
        "id": "sub-58-3",
        "name": "Logistics",
        "categoryId": "cat-58",
        "titles": [
          "Logistics Director",
          "Transportation Manager",
          "Freight Manager",
          "Fleet Operations Manager"
        ]
      },
      {
        "id": "sub-58-4",
        "name": "End-to-End Supply Chain",
        "categoryId": "cat-58",
        "titles": [
          "End-to-End Supply Chain Director",
          "Network Planning Manager",
          "Distribution Planning Manager",
          "Supply Chain Analytics Manager"
        ]
      },
      {
        "id": "sub-58-5",
        "name": "Supply Chain Excellence",
        "categoryId": "cat-58",
        "titles": [
          "Supply Chain Excellence Director",
          "Inventory Optimization Manager",
          "Supply Chain Transformation Lead",
          "Supply Chain Performance Manager"
        ]
      }
    ]
  },
  {
    "id": "cat-59",
    "num": 59,
    "name": "Logistics",
    "group": "Supply Chain & Sustainability",
    "groupId": "grp-6",
    "icon": "Globe",
    "subcategories": [
      {
        "id": "sub-59-1",
        "name": "Logistics Leadership",
        "categoryId": "cat-59",
        "titles": [
          "Chief Logistics Officer (CLO)",
          "Logistics Director",
          "Head of Logistics",
          "VP Logistics",
          "Logistics Manager"
        ]
      },
      {
        "id": "sub-59-2",
        "name": "Transportation",
        "categoryId": "cat-59",
        "titles": [
          "Transportation Director",
          "Fleet Manager",
          "Route Planning Manager",
          "Transport Operations Manager"
        ]
      },
      {
        "id": "sub-59-3",
        "name": "Distribution",
        "categoryId": "cat-59",
        "titles": [
          "Distribution Director",
          "Dispatch Manager",
          "Distribution Center Manager",
          "Delivery Operations Manager"
        ]
      },
      {
        "id": "sub-59-4",
        "name": "International Logistics",
        "categoryId": "cat-59",
        "titles": [
          "Global Logistics Director",
          "Freight Manager",
          "Customs Logistics Manager",
          "Cross-border Logistics Manager"
        ]
      },
      {
        "id": "sub-59-5",
        "name": "Logistics Excellence",
        "categoryId": "cat-59",
        "titles": [
          "Logistics Excellence Director",
          "Logistics Planning Manager",
          "Logistics Analytics Manager",
          "Logistics Transformation Lead"
        ]
      }
    ]
  },
  {
    "id": "cat-60",
    "num": 60,
    "name": "Sustainability & ESG",
    "group": "Supply Chain & Sustainability",
    "groupId": "grp-6",
    "icon": "Leaf",
    "subcategories": [
      {
        "id": "sub-60-1",
        "name": "Sustainability Leadership",
        "categoryId": "cat-60",
        "titles": [
          "Chief Sustainability Officer (CSO)",
          "ESG Director",
          "Head of Sustainability",
          "Sustainability Manager",
          "ESG Program Manager"
        ]
      },
      {
        "id": "sub-60-2",
        "name": "Environmental Sustainability",
        "categoryId": "cat-60",
        "titles": [
          "Environmental Director",
          "Climate Strategy Director",
          "Carbon Management Lead",
          "Environmental Compliance Manager"
        ]
      },
      {
        "id": "sub-60-3",
        "name": "ESG Governance",
        "categoryId": "cat-60",
        "titles": [
          "ESG Reporting Director",
          "ESG Strategy Manager",
          "ESG Risk Manager",
          "Sustainable Finance Lead"
        ]
      },
      {
        "id": "sub-60-4",
        "name": "Social Impact",
        "categoryId": "cat-60",
        "titles": [
          "Social Sustainability Manager",
          "Community Impact Director",
          "Diversity & Inclusion Director",
          "Responsible Business Manager"
        ]
      },
      {
        "id": "sub-60-5",
        "name": "Sustainability Excellence",
        "categoryId": "cat-60",
        "titles": [
          "Circular Economy Lead",
          "Net Zero Program Manager",
          "Sustainability Innovation Lead",
          "Sustainable Development Manager"
        ]
      }
    ]
  },
  {
    "id": "cat-61",
    "num": 61,
    "name": "CSR & Social Impact",
    "group": "Supply Chain & Sustainability",
    "groupId": "grp-6",
    "icon": "Sprout",
    "subcategories": [
      {
        "id": "sub-61-1",
        "name": "CSR Leadership",
        "categoryId": "cat-61",
        "titles": [
          "CSR Director",
          "Head of CSR",
          "CSR Manager",
          "Corporate Citizenship Manager"
        ]
      },
      {
        "id": "sub-61-2",
        "name": "Community Development",
        "categoryId": "cat-61",
        "titles": [
          "Community Relations Director",
          "Community Development Manager",
          "Rural Development Manager",
          "Social Development Manager"
        ]
      },
      {
        "id": "sub-61-3",
        "name": "Education & Skills",
        "categoryId": "cat-61",
        "titles": [
          "Education Program Director",
          "Skill Development Manager",
          "Youth Development Manager",
          "Livelihood Program Manager"
        ]
      },
      {
        "id": "sub-61-4",
        "name": "NGO & Partnerships",
        "categoryId": "cat-61",
        "titles": [
          "NGO Partnership Director",
          "Foundation Director",
          "Social Partnerships Manager",
          "Philanthropy Manager"
        ]
      },
      {
        "id": "sub-61-5",
        "name": "Impact Measurement",
        "categoryId": "cat-61",
        "titles": [
          "Impact Assessment Director",
          "Social Impact Analyst",
          "CSR Reporting Manager",
          "Community Impact Lead"
        ]
      }
    ]
  },
  {
    "id": "cat-62",
    "num": 62,
    "name": "Global Expansion",
    "group": "Supply Chain & Sustainability",
    "groupId": "grp-6",
    "icon": "TreePine",
    "subcategories": [
      {
        "id": "sub-62-1",
        "name": "Expansion Leadership",
        "categoryId": "cat-62",
        "titles": [
          "Chief Global Expansion Officer",
          "Global Expansion Director",
          "Head of International Expansion",
          "Expansion Manager"
        ]
      },
      {
        "id": "sub-62-2",
        "name": "Market Expansion",
        "categoryId": "cat-62",
        "titles": [
          "International Markets Director",
          "Country Expansion Manager",
          "Regional Expansion Manager",
          "Market Entry Manager"
        ]
      },
      {
        "id": "sub-62-3",
        "name": "Strategic Alliances",
        "categoryId": "cat-62",
        "titles": [
          "Global Alliances Director",
          "International Partnerships Manager",
          "Strategic Alliances Manager",
          "Joint Ventures Director"
        ]
      },
      {
        "id": "sub-62-4",
        "name": "Business Development",
        "categoryId": "cat-62",
        "titles": [
          "Cross-border Business Director",
          "International Growth Manager",
          "Global Strategy Lead",
          "Overseas Operations Manager"
        ]
      }
    ]
  },
  {
    "id": "cat-63",
    "num": 63,
    "name": "Export Excellence",
    "group": "Supply Chain & Sustainability",
    "groupId": "grp-6",
    "icon": "Recycle",
    "subcategories": [
      {
        "id": "sub-63-1",
        "name": "Export Leadership",
        "categoryId": "cat-63",
        "titles": [
          "Export Director",
          "Head of Exports",
          "Export Manager",
          "International Sales Manager"
        ]
      },
      {
        "id": "sub-63-2",
        "name": "Export Operations",
        "categoryId": "cat-63",
        "titles": [
          "Export Operations Director",
          "Export Documentation Manager",
          "Export Compliance Manager",
          "Export Logistics Manager"
        ]
      },
      {
        "id": "sub-63-3",
        "name": "Trade Development",
        "categoryId": "cat-63",
        "titles": [
          "Export Promotion Director",
          "Trade Development Manager",
          "Global Market Development Manager",
          "Trade Intelligence Manager"
        ]
      },
      {
        "id": "sub-63-4",
        "name": "International Sales",
        "categoryId": "cat-63",
        "titles": [
          "Regional Export Manager",
          "Overseas Sales Director",
          "Global Accounts Manager",
          "Export Strategy Lead"
        ]
      }
    ]
  },
  {
    "id": "cat-64",
    "num": 64,
    "name": "Import & Trade Excellence",
    "group": "Supply Chain & Sustainability",
    "groupId": "grp-6",
    "icon": "SunMedium",
    "subcategories": [
      {
        "id": "sub-64-1",
        "name": "Import Leadership",
        "categoryId": "cat-64",
        "titles": [
          "Import Director",
          "Head of Imports",
          "Import Manager",
          "Trade Operations Manager"
        ]
      },
      {
        "id": "sub-64-2",
        "name": "Import Operations",
        "categoryId": "cat-64",
        "titles": [
          "Customs Compliance Director",
          "Customs Manager",
          "Import Documentation Manager",
          "Trade Compliance Manager"
        ]
      },
      {
        "id": "sub-64-3",
        "name": "Trade Management",
        "categoryId": "cat-64",
        "titles": [
          "International Trade Director",
          "Global Trade Manager",
          "Trade Policy Manager",
          "Cross-border Trade Manager"
        ]
      },
      {
        "id": "sub-64-4",
        "name": "Trade Facilitation",
        "categoryId": "cat-64",
        "titles": [
          "Trade Facilitation Director",
          "Customs Relations Manager",
          "Import Strategy Lead",
          "International Procurement Manager"
        ]
      }
    ]
  },
  {
    "id": "cat-65",
    "num": 65,
    "name": "Circular Economy",
    "group": "Supply Chain & Sustainability",
    "groupId": "grp-6",
    "icon": "Wind",
    "subcategories": [
      {
        "id": "sub-65-1",
        "name": "Circular Economy Leadership",
        "categoryId": "cat-65",
        "titles": [
          "Circular Economy Director",
          "Head of Circular Economy",
          "Circular Economy Manager",
          "Sustainability Innovation Lead"
        ]
      },
      {
        "id": "sub-65-2",
        "name": "Resource Management",
        "categoryId": "cat-65",
        "titles": [
          "Resource Recovery Director",
          "Materials Recovery Manager",
          "Waste Reduction Manager",
          "Recycling Program Manager"
        ]
      },
      {
        "id": "sub-65-3",
        "name": "Sustainable Design",
        "categoryId": "cat-65",
        "titles": [
          "Eco Design Director",
          "Sustainable Product Manager",
          "Green Innovation Manager",
          "Life Cycle Assessment Lead"
        ]
      },
      {
        "id": "sub-65-4",
        "name": "Circular Innovation",
        "categoryId": "cat-65",
        "titles": [
          "Circular Business Model Director",
          "Circular Supply Chain Manager",
          "Zero Waste Program Manager",
          "Circular Strategy Manager"
        ]
      }
    ]
  },
  {
    "id": "cat-66",
    "num": 66,
    "name": "Green Supply Chain",
    "group": "Supply Chain & Sustainability",
    "groupId": "grp-6",
    "icon": "Droplets",
    "subcategories": [
      {
        "id": "sub-66-1",
        "name": "Green Supply Chain Leadership",
        "categoryId": "cat-66",
        "titles": [
          "Green Supply Chain Director",
          "Head of Sustainable Supply Chain",
          "Green Logistics Manager",
          "Sustainable Procurement Director"
        ]
      },
      {
        "id": "sub-66-2",
        "name": "Sustainable Procurement",
        "categoryId": "cat-66",
        "titles": [
          "Sustainable Sourcing Manager",
          "Responsible Procurement Manager",
          "Ethical Sourcing Manager",
          "Supplier Sustainability Manager"
        ]
      },
      {
        "id": "sub-66-3",
        "name": "Green Logistics",
        "categoryId": "cat-66",
        "titles": [
          "Low Carbon Logistics Director",
          "Green Transportation Manager",
          "Sustainable Distribution Manager",
          "Eco Logistics Manager"
        ]
      },
      {
        "id": "sub-66-4",
        "name": "Supply Chain Sustainability",
        "categoryId": "cat-66",
        "titles": [
          "Supply Chain ESG Director",
          "Carbon Supply Chain Manager",
          "Sustainable Operations Manager",
          "Green Supply Chain Analyst"
        ]
      }
    ]
  }
];

export const LEADERSHIP_TITLES: LeaderTitle[] = [
  {
    "id": "t-1",
    "title": "Founder",
    "categoryId": "cat-1",
    "categoryName": "Executive Leadership",
    "subcategoryId": "sub-1-1",
    "subcategoryName": "Founders",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-2",
    "title": "Co-Founder",
    "categoryId": "cat-1",
    "categoryName": "Executive Leadership",
    "subcategoryId": "sub-1-1",
    "subcategoryName": "Founders",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-3",
    "title": "Founding Partner",
    "categoryId": "cat-1",
    "categoryName": "Executive Leadership",
    "subcategoryId": "sub-1-1",
    "subcategoryName": "Founders",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-4",
    "title": "Promoter",
    "categoryId": "cat-1",
    "categoryName": "Executive Leadership",
    "subcategoryId": "sub-1-1",
    "subcategoryName": "Founders",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-5",
    "title": "Co-Promoter",
    "categoryId": "cat-1",
    "categoryName": "Executive Leadership",
    "subcategoryId": "sub-1-1",
    "subcategoryName": "Founders",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-6",
    "title": "Managing Partner",
    "categoryId": "cat-1",
    "categoryName": "Executive Leadership",
    "subcategoryId": "sub-1-1",
    "subcategoryName": "Founders",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-7",
    "title": "Chairman",
    "categoryId": "cat-1",
    "categoryName": "Executive Leadership",
    "subcategoryId": "sub-1-2",
    "subcategoryName": "Board Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-8",
    "title": "Executive Chairman",
    "categoryId": "cat-1",
    "categoryName": "Executive Leadership",
    "subcategoryId": "sub-1-2",
    "subcategoryName": "Board Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-9",
    "title": "Vice Chairman",
    "categoryId": "cat-1",
    "categoryName": "Executive Leadership",
    "subcategoryId": "sub-1-2",
    "subcategoryName": "Board Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-10",
    "title": "Board Director",
    "categoryId": "cat-1",
    "categoryName": "Executive Leadership",
    "subcategoryId": "sub-1-2",
    "subcategoryName": "Board Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-11",
    "title": "Independent Director",
    "categoryId": "cat-1",
    "categoryName": "Executive Leadership",
    "subcategoryId": "sub-1-2",
    "subcategoryName": "Board Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-12",
    "title": "Non-Executive Director",
    "categoryId": "cat-1",
    "categoryName": "Executive Leadership",
    "subcategoryId": "sub-1-2",
    "subcategoryName": "Board Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-13",
    "title": "Lead Independent Director",
    "categoryId": "cat-1",
    "categoryName": "Executive Leadership",
    "subcategoryId": "sub-1-2",
    "subcategoryName": "Board Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-14",
    "title": "Board Advisor",
    "categoryId": "cat-1",
    "categoryName": "Executive Leadership",
    "subcategoryId": "sub-1-2",
    "subcategoryName": "Board Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-15",
    "title": "Chief Executive Officer (CEO)",
    "categoryId": "cat-1",
    "categoryName": "Executive Leadership",
    "subcategoryId": "sub-1-3",
    "subcategoryName": "Executive Management",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-16",
    "title": "President",
    "categoryId": "cat-1",
    "categoryName": "Executive Leadership",
    "subcategoryId": "sub-1-3",
    "subcategoryName": "Executive Management",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-17",
    "title": "Managing Director (MD)",
    "categoryId": "cat-1",
    "categoryName": "Executive Leadership",
    "subcategoryId": "sub-1-3",
    "subcategoryName": "Executive Management",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-18",
    "title": "Executive Director",
    "categoryId": "cat-1",
    "categoryName": "Executive Leadership",
    "subcategoryId": "sub-1-3",
    "subcategoryName": "Executive Management",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-19",
    "title": "Group CEO",
    "categoryId": "cat-1",
    "categoryName": "Executive Leadership",
    "subcategoryId": "sub-1-3",
    "subcategoryName": "Executive Management",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-20",
    "title": "Regional CEO",
    "categoryId": "cat-1",
    "categoryName": "Executive Leadership",
    "subcategoryId": "sub-1-3",
    "subcategoryName": "Executive Management",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-21",
    "title": "Country CEO",
    "categoryId": "cat-1",
    "categoryName": "Executive Leadership",
    "subcategoryId": "sub-1-3",
    "subcategoryName": "Executive Management",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-22",
    "title": "Business Unit CEO",
    "categoryId": "cat-1",
    "categoryName": "Executive Leadership",
    "subcategoryId": "sub-1-3",
    "subcategoryName": "Executive Management",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-23",
    "title": "Division President",
    "categoryId": "cat-1",
    "categoryName": "Executive Leadership",
    "subcategoryId": "sub-1-3",
    "subcategoryName": "Executive Management",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-24",
    "title": "Executive Vice President",
    "categoryId": "cat-1",
    "categoryName": "Executive Leadership",
    "subcategoryId": "sub-1-3",
    "subcategoryName": "Executive Management",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-25",
    "title": "Chief of Staff",
    "categoryId": "cat-1",
    "categoryName": "Executive Leadership",
    "subcategoryId": "sub-1-4",
    "subcategoryName": "Leadership Office",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-26",
    "title": "Executive Secretary",
    "categoryId": "cat-1",
    "categoryName": "Executive Leadership",
    "subcategoryId": "sub-1-4",
    "subcategoryName": "Leadership Office",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-27",
    "title": "Executive Advisor",
    "categoryId": "cat-1",
    "categoryName": "Executive Leadership",
    "subcategoryId": "sub-1-4",
    "subcategoryName": "Leadership Office",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-28",
    "title": "Senior Advisor",
    "categoryId": "cat-1",
    "categoryName": "Executive Leadership",
    "subcategoryId": "sub-1-4",
    "subcategoryName": "Leadership Office",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-29",
    "title": "Strategic Advisor",
    "categoryId": "cat-1",
    "categoryName": "Executive Leadership",
    "subcategoryId": "sub-1-4",
    "subcategoryName": "Leadership Office",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-30",
    "title": "Governance Chairman",
    "categoryId": "cat-2",
    "categoryName": "Corporate Governance",
    "subcategoryId": "sub-2-1",
    "subcategoryName": "Board Governance",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-31",
    "title": "Board Chairman",
    "categoryId": "cat-2",
    "categoryName": "Corporate Governance",
    "subcategoryId": "sub-2-1",
    "subcategoryName": "Board Governance",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-32",
    "title": "Board Director",
    "categoryId": "cat-2",
    "categoryName": "Corporate Governance",
    "subcategoryId": "sub-2-1",
    "subcategoryName": "Board Governance",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-33",
    "title": "Independent Director",
    "categoryId": "cat-2",
    "categoryName": "Corporate Governance",
    "subcategoryId": "sub-2-1",
    "subcategoryName": "Board Governance",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-34",
    "title": "Non-Executive Director",
    "categoryId": "cat-2",
    "categoryName": "Corporate Governance",
    "subcategoryId": "sub-2-1",
    "subcategoryName": "Board Governance",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-35",
    "title": "Governance Advisor",
    "categoryId": "cat-2",
    "categoryName": "Corporate Governance",
    "subcategoryId": "sub-2-1",
    "subcategoryName": "Board Governance",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-36",
    "title": "Chief Governance Officer",
    "categoryId": "cat-2",
    "categoryName": "Corporate Governance",
    "subcategoryId": "sub-2-2",
    "subcategoryName": "Governance Office",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-37",
    "title": "Governance Director",
    "categoryId": "cat-2",
    "categoryName": "Corporate Governance",
    "subcategoryId": "sub-2-2",
    "subcategoryName": "Governance Office",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-38",
    "title": "Governance Head",
    "categoryId": "cat-2",
    "categoryName": "Corporate Governance",
    "subcategoryId": "sub-2-2",
    "subcategoryName": "Governance Office",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-39",
    "title": "Governance Manager",
    "categoryId": "cat-2",
    "categoryName": "Corporate Governance",
    "subcategoryId": "sub-2-2",
    "subcategoryName": "Governance Office",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-40",
    "title": "Governance Officer",
    "categoryId": "cat-2",
    "categoryName": "Corporate Governance",
    "subcategoryId": "sub-2-2",
    "subcategoryName": "Governance Office",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-41",
    "title": "Audit Committee Chair",
    "categoryId": "cat-2",
    "categoryName": "Corporate Governance",
    "subcategoryId": "sub-2-3",
    "subcategoryName": "Board Committees",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-42",
    "title": "Nomination Committee Chair",
    "categoryId": "cat-2",
    "categoryName": "Corporate Governance",
    "subcategoryId": "sub-2-3",
    "subcategoryName": "Board Committees",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-43",
    "title": "Remuneration Committee Chair",
    "categoryId": "cat-2",
    "categoryName": "Corporate Governance",
    "subcategoryId": "sub-2-3",
    "subcategoryName": "Board Committees",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-44",
    "title": "ESG Committee Chair",
    "categoryId": "cat-2",
    "categoryName": "Corporate Governance",
    "subcategoryId": "sub-2-3",
    "subcategoryName": "Board Committees",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-45",
    "title": "Ethics Committee Chair",
    "categoryId": "cat-2",
    "categoryName": "Corporate Governance",
    "subcategoryId": "sub-2-3",
    "subcategoryName": "Board Committees",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-46",
    "title": "Company Secretary",
    "categoryId": "cat-2",
    "categoryName": "Corporate Governance",
    "subcategoryId": "sub-2-4",
    "subcategoryName": "Corporate Secretariat",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-47",
    "title": "Assistant Company Secretary",
    "categoryId": "cat-2",
    "categoryName": "Corporate Governance",
    "subcategoryId": "sub-2-4",
    "subcategoryName": "Corporate Secretariat",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-48",
    "title": "Board Secretary",
    "categoryId": "cat-2",
    "categoryName": "Corporate Governance",
    "subcategoryId": "sub-2-4",
    "subcategoryName": "Corporate Secretariat",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-49",
    "title": "Corporate Secretary",
    "categoryId": "cat-2",
    "categoryName": "Corporate Governance",
    "subcategoryId": "sub-2-4",
    "subcategoryName": "Corporate Secretariat",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-50",
    "title": "Chief Legal Officer (CLO)",
    "categoryId": "cat-3",
    "categoryName": "Corporate Legal",
    "subcategoryId": "sub-3-1",
    "subcategoryName": "Legal Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-51",
    "title": "General Counsel",
    "categoryId": "cat-3",
    "categoryName": "Corporate Legal",
    "subcategoryId": "sub-3-1",
    "subcategoryName": "Legal Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-52",
    "title": "Legal Director",
    "categoryId": "cat-3",
    "categoryName": "Corporate Legal",
    "subcategoryId": "sub-3-1",
    "subcategoryName": "Legal Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-53",
    "title": "Head of Legal",
    "categoryId": "cat-3",
    "categoryName": "Corporate Legal",
    "subcategoryId": "sub-3-1",
    "subcategoryName": "Legal Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-54",
    "title": "Legal Advisor",
    "categoryId": "cat-3",
    "categoryName": "Corporate Legal",
    "subcategoryId": "sub-3-1",
    "subcategoryName": "Legal Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-55",
    "title": "Senior Legal Counsel",
    "categoryId": "cat-3",
    "categoryName": "Corporate Legal",
    "subcategoryId": "sub-3-2",
    "subcategoryName": "Corporate Legal",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-56",
    "title": "Corporate Counsel",
    "categoryId": "cat-3",
    "categoryName": "Corporate Legal",
    "subcategoryId": "sub-3-2",
    "subcategoryName": "Corporate Legal",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-57",
    "title": "Associate General Counsel",
    "categoryId": "cat-3",
    "categoryName": "Corporate Legal",
    "subcategoryId": "sub-3-2",
    "subcategoryName": "Corporate Legal",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-58",
    "title": "Legal Manager",
    "categoryId": "cat-3",
    "categoryName": "Corporate Legal",
    "subcategoryId": "sub-3-2",
    "subcategoryName": "Corporate Legal",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-59",
    "title": "Contracts Director",
    "categoryId": "cat-3",
    "categoryName": "Corporate Legal",
    "subcategoryId": "sub-3-3",
    "subcategoryName": "Contracts",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-60",
    "title": "Contracts Manager",
    "categoryId": "cat-3",
    "categoryName": "Corporate Legal",
    "subcategoryId": "sub-3-3",
    "subcategoryName": "Contracts",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-61",
    "title": "Commercial Counsel",
    "categoryId": "cat-3",
    "categoryName": "Corporate Legal",
    "subcategoryId": "sub-3-3",
    "subcategoryName": "Contracts",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-62",
    "title": "Contract Specialist",
    "categoryId": "cat-3",
    "categoryName": "Corporate Legal",
    "subcategoryId": "sub-3-3",
    "subcategoryName": "Contracts",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-63",
    "title": "Litigation Head",
    "categoryId": "cat-3",
    "categoryName": "Corporate Legal",
    "subcategoryId": "sub-3-4",
    "subcategoryName": "Litigation",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-64",
    "title": "Litigation Counsel",
    "categoryId": "cat-3",
    "categoryName": "Corporate Legal",
    "subcategoryId": "sub-3-4",
    "subcategoryName": "Litigation",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-65",
    "title": "Arbitration Counsel",
    "categoryId": "cat-3",
    "categoryName": "Corporate Legal",
    "subcategoryId": "sub-3-4",
    "subcategoryName": "Litigation",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-66",
    "title": "Legal Compliance Counsel",
    "categoryId": "cat-3",
    "categoryName": "Corporate Legal",
    "subcategoryId": "sub-3-4",
    "subcategoryName": "Litigation",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-67",
    "title": "Chief Compliance Officer",
    "categoryId": "cat-4",
    "categoryName": "Corporate Compliance",
    "subcategoryId": "sub-4-1",
    "subcategoryName": "Compliance Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-68",
    "title": "Compliance Director",
    "categoryId": "cat-4",
    "categoryName": "Corporate Compliance",
    "subcategoryId": "sub-4-1",
    "subcategoryName": "Compliance Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-69",
    "title": "Compliance Head",
    "categoryId": "cat-4",
    "categoryName": "Corporate Compliance",
    "subcategoryId": "sub-4-1",
    "subcategoryName": "Compliance Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-70",
    "title": "Compliance Manager",
    "categoryId": "cat-4",
    "categoryName": "Corporate Compliance",
    "subcategoryId": "sub-4-1",
    "subcategoryName": "Compliance Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-71",
    "title": "Regulatory Affairs Director",
    "categoryId": "cat-4",
    "categoryName": "Corporate Compliance",
    "subcategoryId": "sub-4-2",
    "subcategoryName": "Regulatory Compliance",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-72",
    "title": "Regulatory Compliance Head",
    "categoryId": "cat-4",
    "categoryName": "Corporate Compliance",
    "subcategoryId": "sub-4-2",
    "subcategoryName": "Regulatory Compliance",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-73",
    "title": "Regulatory Manager",
    "categoryId": "cat-4",
    "categoryName": "Corporate Compliance",
    "subcategoryId": "sub-4-2",
    "subcategoryName": "Regulatory Compliance",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-74",
    "title": "Licensing Manager",
    "categoryId": "cat-4",
    "categoryName": "Corporate Compliance",
    "subcategoryId": "sub-4-2",
    "subcategoryName": "Regulatory Compliance",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-75",
    "title": "Ethics Officer",
    "categoryId": "cat-4",
    "categoryName": "Corporate Compliance",
    "subcategoryId": "sub-4-3",
    "subcategoryName": "Ethics & Integrity",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-76",
    "title": "Integrity Officer",
    "categoryId": "cat-4",
    "categoryName": "Corporate Compliance",
    "subcategoryId": "sub-4-3",
    "subcategoryName": "Ethics & Integrity",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-77",
    "title": "Ethics Director",
    "categoryId": "cat-4",
    "categoryName": "Corporate Compliance",
    "subcategoryId": "sub-4-3",
    "subcategoryName": "Ethics & Integrity",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-78",
    "title": "Whistleblower Officer",
    "categoryId": "cat-4",
    "categoryName": "Corporate Compliance",
    "subcategoryId": "sub-4-3",
    "subcategoryName": "Ethics & Integrity",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-79",
    "title": "Compliance Auditor",
    "categoryId": "cat-4",
    "categoryName": "Corporate Compliance",
    "subcategoryId": "sub-4-4",
    "subcategoryName": "Corporate Compliance",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-80",
    "title": "Compliance Analyst",
    "categoryId": "cat-4",
    "categoryName": "Corporate Compliance",
    "subcategoryId": "sub-4-4",
    "subcategoryName": "Corporate Compliance",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-81",
    "title": "Governance Officer",
    "categoryId": "cat-4",
    "categoryName": "Corporate Compliance",
    "subcategoryId": "sub-4-4",
    "subcategoryName": "Corporate Compliance",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-82",
    "title": "Compliance Executive",
    "categoryId": "cat-4",
    "categoryName": "Corporate Compliance",
    "subcategoryId": "sub-4-4",
    "subcategoryName": "Corporate Compliance",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-83",
    "title": "Chief Administrative Officer (CAO)",
    "categoryId": "cat-5",
    "categoryName": "Administration",
    "subcategoryId": "sub-5-1",
    "subcategoryName": "Administration Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-84",
    "title": "Administration Director",
    "categoryId": "cat-5",
    "categoryName": "Administration",
    "subcategoryId": "sub-5-1",
    "subcategoryName": "Administration Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-85",
    "title": "Administration Head",
    "categoryId": "cat-5",
    "categoryName": "Administration",
    "subcategoryId": "sub-5-1",
    "subcategoryName": "Administration Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-86",
    "title": "Administration Manager",
    "categoryId": "cat-5",
    "categoryName": "Administration",
    "subcategoryId": "sub-5-1",
    "subcategoryName": "Administration Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-87",
    "title": "Office Manager",
    "categoryId": "cat-5",
    "categoryName": "Administration",
    "subcategoryId": "sub-5-2",
    "subcategoryName": "Office Administration",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-88",
    "title": "Office Administrator",
    "categoryId": "cat-5",
    "categoryName": "Administration",
    "subcategoryId": "sub-5-2",
    "subcategoryName": "Office Administration",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-89",
    "title": "Executive Administrator",
    "categoryId": "cat-5",
    "categoryName": "Administration",
    "subcategoryId": "sub-5-2",
    "subcategoryName": "Office Administration",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-90",
    "title": "Administrative Officer",
    "categoryId": "cat-5",
    "categoryName": "Administration",
    "subcategoryId": "sub-5-2",
    "subcategoryName": "Office Administration",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-91",
    "title": "Facilities Director",
    "categoryId": "cat-5",
    "categoryName": "Administration",
    "subcategoryId": "sub-5-3",
    "subcategoryName": "Facilities",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-92",
    "title": "Facilities Manager",
    "categoryId": "cat-5",
    "categoryName": "Administration",
    "subcategoryId": "sub-5-3",
    "subcategoryName": "Facilities",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-93",
    "title": "Workplace Manager",
    "categoryId": "cat-5",
    "categoryName": "Administration",
    "subcategoryId": "sub-5-3",
    "subcategoryName": "Facilities",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-94",
    "title": "Building Manager",
    "categoryId": "cat-5",
    "categoryName": "Administration",
    "subcategoryId": "sub-5-3",
    "subcategoryName": "Facilities",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-95",
    "title": "Travel Manager",
    "categoryId": "cat-5",
    "categoryName": "Administration",
    "subcategoryId": "sub-5-4",
    "subcategoryName": "Corporate Services",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-96",
    "title": "Fleet Manager",
    "categoryId": "cat-5",
    "categoryName": "Administration",
    "subcategoryId": "sub-5-4",
    "subcategoryName": "Corporate Services",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-97",
    "title": "Asset Manager",
    "categoryId": "cat-5",
    "categoryName": "Administration",
    "subcategoryId": "sub-5-4",
    "subcategoryName": "Corporate Services",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-98",
    "title": "Office Services Head",
    "categoryId": "cat-5",
    "categoryName": "Administration",
    "subcategoryId": "sub-5-4",
    "subcategoryName": "Corporate Services",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-99",
    "title": "Chief Marketing Officer (CMO)",
    "categoryId": "cat-6",
    "categoryName": "Marketing Excellence",
    "subcategoryId": "sub-6-1",
    "subcategoryName": "Marketing Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-100",
    "title": "VP Marketing",
    "categoryId": "cat-6",
    "categoryName": "Marketing Excellence",
    "subcategoryId": "sub-6-1",
    "subcategoryName": "Marketing Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-101",
    "title": "Marketing Director",
    "categoryId": "cat-6",
    "categoryName": "Marketing Excellence",
    "subcategoryId": "sub-6-1",
    "subcategoryName": "Marketing Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-102",
    "title": "Head of Marketing",
    "categoryId": "cat-6",
    "categoryName": "Marketing Excellence",
    "subcategoryId": "sub-6-1",
    "subcategoryName": "Marketing Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-103",
    "title": "Marketing Manager",
    "categoryId": "cat-6",
    "categoryName": "Marketing Excellence",
    "subcategoryId": "sub-6-1",
    "subcategoryName": "Marketing Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-104",
    "title": "Digital Marketing Director",
    "categoryId": "cat-6",
    "categoryName": "Marketing Excellence",
    "subcategoryId": "sub-6-2",
    "subcategoryName": "Digital Marketing",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-105",
    "title": "SEO Director",
    "categoryId": "cat-6",
    "categoryName": "Marketing Excellence",
    "subcategoryId": "sub-6-2",
    "subcategoryName": "Digital Marketing",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-106",
    "title": "Performance Marketing Head",
    "categoryId": "cat-6",
    "categoryName": "Marketing Excellence",
    "subcategoryId": "sub-6-2",
    "subcategoryName": "Digital Marketing",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-107",
    "title": "Growth Marketing Head",
    "categoryId": "cat-6",
    "categoryName": "Marketing Excellence",
    "subcategoryId": "sub-6-2",
    "subcategoryName": "Digital Marketing",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-108",
    "title": "Content Director",
    "categoryId": "cat-6",
    "categoryName": "Marketing Excellence",
    "subcategoryId": "sub-6-3",
    "subcategoryName": "Content Marketing",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-109",
    "title": "Content Marketing Manager",
    "categoryId": "cat-6",
    "categoryName": "Marketing Excellence",
    "subcategoryId": "sub-6-3",
    "subcategoryName": "Content Marketing",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-110",
    "title": "Campaign Manager",
    "categoryId": "cat-6",
    "categoryName": "Marketing Excellence",
    "subcategoryId": "sub-6-3",
    "subcategoryName": "Content Marketing",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-111",
    "title": "Marketing Communications Manager",
    "categoryId": "cat-6",
    "categoryName": "Marketing Excellence",
    "subcategoryId": "sub-6-3",
    "subcategoryName": "Content Marketing",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-112",
    "title": "Market Research Director",
    "categoryId": "cat-6",
    "categoryName": "Marketing Excellence",
    "subcategoryId": "sub-6-4",
    "subcategoryName": "Market Intelligence",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-113",
    "title": "Consumer Insights Head",
    "categoryId": "cat-6",
    "categoryName": "Marketing Excellence",
    "subcategoryId": "sub-6-4",
    "subcategoryName": "Market Intelligence",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-114",
    "title": "Marketing Analyst",
    "categoryId": "cat-6",
    "categoryName": "Marketing Excellence",
    "subcategoryId": "sub-6-4",
    "subcategoryName": "Market Intelligence",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-115",
    "title": "Competitive Intelligence Manager",
    "categoryId": "cat-6",
    "categoryName": "Marketing Excellence",
    "subcategoryId": "sub-6-4",
    "subcategoryName": "Market Intelligence",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-116",
    "title": "Chief Communications Officer (CCO)",
    "categoryId": "cat-7",
    "categoryName": "Corporate Communications",
    "subcategoryId": "sub-7-1",
    "subcategoryName": "Communications Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-117",
    "title": "Communications Director",
    "categoryId": "cat-7",
    "categoryName": "Corporate Communications",
    "subcategoryId": "sub-7-1",
    "subcategoryName": "Communications Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-118",
    "title": "Communications Head",
    "categoryId": "cat-7",
    "categoryName": "Corporate Communications",
    "subcategoryId": "sub-7-1",
    "subcategoryName": "Communications Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-119",
    "title": "Communications Manager",
    "categoryId": "cat-7",
    "categoryName": "Corporate Communications",
    "subcategoryId": "sub-7-1",
    "subcategoryName": "Communications Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-120",
    "title": "PR Director",
    "categoryId": "cat-7",
    "categoryName": "Corporate Communications",
    "subcategoryId": "sub-7-2",
    "subcategoryName": "Public Relations",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-121",
    "title": "PR Manager",
    "categoryId": "cat-7",
    "categoryName": "Corporate Communications",
    "subcategoryId": "sub-7-2",
    "subcategoryName": "Public Relations",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-122",
    "title": "Media Relations Head",
    "categoryId": "cat-7",
    "categoryName": "Corporate Communications",
    "subcategoryId": "sub-7-2",
    "subcategoryName": "Public Relations",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-123",
    "title": "Corporate Spokesperson",
    "categoryId": "cat-7",
    "categoryName": "Corporate Communications",
    "subcategoryId": "sub-7-2",
    "subcategoryName": "Public Relations",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-124",
    "title": "Internal Communications Head",
    "categoryId": "cat-7",
    "categoryName": "Corporate Communications",
    "subcategoryId": "sub-7-3",
    "subcategoryName": "Internal Communications",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-125",
    "title": "Employee Communications Manager",
    "categoryId": "cat-7",
    "categoryName": "Corporate Communications",
    "subcategoryId": "sub-7-3",
    "subcategoryName": "Internal Communications",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-126",
    "title": "Communications Executive",
    "categoryId": "cat-7",
    "categoryName": "Corporate Communications",
    "subcategoryId": "sub-7-3",
    "subcategoryName": "Internal Communications",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-127",
    "title": "External Relations Director",
    "categoryId": "cat-7",
    "categoryName": "Corporate Communications",
    "subcategoryId": "sub-7-4",
    "subcategoryName": "External Communications",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-128",
    "title": "Corporate Affairs Manager",
    "categoryId": "cat-7",
    "categoryName": "Corporate Communications",
    "subcategoryId": "sub-7-4",
    "subcategoryName": "External Communications",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-129",
    "title": "Media Advisor",
    "categoryId": "cat-7",
    "categoryName": "Corporate Communications",
    "subcategoryId": "sub-7-4",
    "subcategoryName": "External Communications",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-130",
    "title": "Press Secretary",
    "categoryId": "cat-7",
    "categoryName": "Corporate Communications",
    "subcategoryId": "sub-7-4",
    "subcategoryName": "External Communications",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-131",
    "title": "Chief Public Affairs Officer",
    "categoryId": "cat-8",
    "categoryName": "Government Relations",
    "subcategoryId": "sub-8-1",
    "subcategoryName": "Government Affairs",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-132",
    "title": "Government Relations Director",
    "categoryId": "cat-8",
    "categoryName": "Government Relations",
    "subcategoryId": "sub-8-1",
    "subcategoryName": "Government Affairs",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-133",
    "title": "Government Relations Head",
    "categoryId": "cat-8",
    "categoryName": "Government Relations",
    "subcategoryId": "sub-8-1",
    "subcategoryName": "Government Affairs",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-134",
    "title": "Government Affairs Manager",
    "categoryId": "cat-8",
    "categoryName": "Government Relations",
    "subcategoryId": "sub-8-1",
    "subcategoryName": "Government Affairs",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-135",
    "title": "Public Affairs Manager",
    "categoryId": "cat-8",
    "categoryName": "Government Relations",
    "subcategoryId": "sub-8-1",
    "subcategoryName": "Government Affairs",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-136",
    "title": "Public Policy Director",
    "categoryId": "cat-8",
    "categoryName": "Government Relations",
    "subcategoryId": "sub-8-2",
    "subcategoryName": "Public Policy",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-137",
    "title": "Policy Head",
    "categoryId": "cat-8",
    "categoryName": "Government Relations",
    "subcategoryId": "sub-8-2",
    "subcategoryName": "Public Policy",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-138",
    "title": "Policy Advisor",
    "categoryId": "cat-8",
    "categoryName": "Government Relations",
    "subcategoryId": "sub-8-2",
    "subcategoryName": "Public Policy",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-139",
    "title": "Regulatory Policy Manager",
    "categoryId": "cat-8",
    "categoryName": "Government Relations",
    "subcategoryId": "sub-8-2",
    "subcategoryName": "Public Policy",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-140",
    "title": "Regulatory Affairs Director",
    "categoryId": "cat-8",
    "categoryName": "Government Relations",
    "subcategoryId": "sub-8-3",
    "subcategoryName": "Regulatory Relations",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-141",
    "title": "Regulatory Liaison Officer",
    "categoryId": "cat-8",
    "categoryName": "Government Relations",
    "subcategoryId": "sub-8-3",
    "subcategoryName": "Regulatory Relations",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-142",
    "title": "Government Liaison Officer",
    "categoryId": "cat-8",
    "categoryName": "Government Relations",
    "subcategoryId": "sub-8-3",
    "subcategoryName": "Regulatory Relations",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-143",
    "title": "Licensing Head",
    "categoryId": "cat-8",
    "categoryName": "Government Relations",
    "subcategoryId": "sub-8-3",
    "subcategoryName": "Regulatory Relations",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-144",
    "title": "External Affairs Director",
    "categoryId": "cat-8",
    "categoryName": "Government Relations",
    "subcategoryId": "sub-8-4",
    "subcategoryName": "External Affairs",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-145",
    "title": "Stakeholder Relations Head",
    "categoryId": "cat-8",
    "categoryName": "Government Relations",
    "subcategoryId": "sub-8-4",
    "subcategoryName": "External Affairs",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-146",
    "title": "Diplomatic Affairs Manager",
    "categoryId": "cat-8",
    "categoryName": "Government Relations",
    "subcategoryId": "sub-8-4",
    "subcategoryName": "External Affairs",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-147",
    "title": "Trade Relations Manager",
    "categoryId": "cat-8",
    "categoryName": "Government Relations",
    "subcategoryId": "sub-8-4",
    "subcategoryName": "External Affairs",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-148",
    "title": "Chief Public Policy Officer",
    "categoryId": "cat-9",
    "categoryName": "Public Policy",
    "subcategoryId": "sub-9-1",
    "subcategoryName": "Policy Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-149",
    "title": "Public Policy Director",
    "categoryId": "cat-9",
    "categoryName": "Public Policy",
    "subcategoryId": "sub-9-1",
    "subcategoryName": "Policy Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-150",
    "title": "Head of Public Policy",
    "categoryId": "cat-9",
    "categoryName": "Public Policy",
    "subcategoryId": "sub-9-1",
    "subcategoryName": "Policy Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-151",
    "title": "VP Public Policy",
    "categoryId": "cat-9",
    "categoryName": "Public Policy",
    "subcategoryId": "sub-9-1",
    "subcategoryName": "Policy Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-152",
    "title": "Policy Advisor",
    "categoryId": "cat-9",
    "categoryName": "Public Policy",
    "subcategoryId": "sub-9-1",
    "subcategoryName": "Policy Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-153",
    "title": "Policy Research Director",
    "categoryId": "cat-9",
    "categoryName": "Public Policy",
    "subcategoryId": "sub-9-2",
    "subcategoryName": "Policy Development",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-154",
    "title": "Policy Development Manager",
    "categoryId": "cat-9",
    "categoryName": "Public Policy",
    "subcategoryId": "sub-9-2",
    "subcategoryName": "Policy Development",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-155",
    "title": "Legislative Affairs Head",
    "categoryId": "cat-9",
    "categoryName": "Public Policy",
    "subcategoryId": "sub-9-2",
    "subcategoryName": "Policy Development",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-156",
    "title": "Policy Analyst",
    "categoryId": "cat-9",
    "categoryName": "Public Policy",
    "subcategoryId": "sub-9-2",
    "subcategoryName": "Policy Development",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-157",
    "title": "Regulatory Policy Director",
    "categoryId": "cat-9",
    "categoryName": "Public Policy",
    "subcategoryId": "sub-9-3",
    "subcategoryName": "Regulatory Policy",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-158",
    "title": "Regulatory Affairs Manager",
    "categoryId": "cat-9",
    "categoryName": "Public Policy",
    "subcategoryId": "sub-9-3",
    "subcategoryName": "Regulatory Policy",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-159",
    "title": "Government Policy Advisor",
    "categoryId": "cat-9",
    "categoryName": "Public Policy",
    "subcategoryId": "sub-9-3",
    "subcategoryName": "Regulatory Policy",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-160",
    "title": "Public Affairs Executive",
    "categoryId": "cat-9",
    "categoryName": "Public Policy",
    "subcategoryId": "sub-9-3",
    "subcategoryName": "Regulatory Policy",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-161",
    "title": "Economic Policy Advisor",
    "categoryId": "cat-9",
    "categoryName": "Public Policy",
    "subcategoryId": "sub-9-4",
    "subcategoryName": "Strategic Policy",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-162",
    "title": "Trade Policy Specialist",
    "categoryId": "cat-9",
    "categoryName": "Public Policy",
    "subcategoryId": "sub-9-4",
    "subcategoryName": "Strategic Policy",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-163",
    "title": "Industry Policy Head",
    "categoryId": "cat-9",
    "categoryName": "Public Policy",
    "subcategoryId": "sub-9-4",
    "subcategoryName": "Strategic Policy",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-164",
    "title": "Public Policy Consultant",
    "categoryId": "cat-9",
    "categoryName": "Public Policy",
    "subcategoryId": "sub-9-4",
    "subcategoryName": "Strategic Policy",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-165",
    "title": "Chief HSE Officer",
    "categoryId": "cat-10",
    "categoryName": "Health, Safety & Environment (HSE/EHS)",
    "subcategoryId": "sub-10-1",
    "subcategoryName": "HSE Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-166",
    "title": "HSE Director",
    "categoryId": "cat-10",
    "categoryName": "Health, Safety & Environment (HSE/EHS)",
    "subcategoryId": "sub-10-1",
    "subcategoryName": "HSE Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-167",
    "title": "Head of HSE",
    "categoryId": "cat-10",
    "categoryName": "Health, Safety & Environment (HSE/EHS)",
    "subcategoryId": "sub-10-1",
    "subcategoryName": "HSE Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-168",
    "title": "HSE Manager",
    "categoryId": "cat-10",
    "categoryName": "Health, Safety & Environment (HSE/EHS)",
    "subcategoryId": "sub-10-1",
    "subcategoryName": "HSE Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-169",
    "title": "Occupational Health Director",
    "categoryId": "cat-10",
    "categoryName": "Health, Safety & Environment (HSE/EHS)",
    "subcategoryId": "sub-10-2",
    "subcategoryName": "Health & Safety",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-170",
    "title": "Safety Director",
    "categoryId": "cat-10",
    "categoryName": "Health, Safety & Environment (HSE/EHS)",
    "subcategoryId": "sub-10-2",
    "subcategoryName": "Health & Safety",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-171",
    "title": "Safety Manager",
    "categoryId": "cat-10",
    "categoryName": "Health, Safety & Environment (HSE/EHS)",
    "subcategoryId": "sub-10-2",
    "subcategoryName": "Health & Safety",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-172",
    "title": "Industrial Hygienist",
    "categoryId": "cat-10",
    "categoryName": "Health, Safety & Environment (HSE/EHS)",
    "subcategoryId": "sub-10-2",
    "subcategoryName": "Health & Safety",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-173",
    "title": "Safety Officer",
    "categoryId": "cat-10",
    "categoryName": "Health, Safety & Environment (HSE/EHS)",
    "subcategoryId": "sub-10-2",
    "subcategoryName": "Health & Safety",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-174",
    "title": "Environment Director",
    "categoryId": "cat-10",
    "categoryName": "Health, Safety & Environment (HSE/EHS)",
    "subcategoryId": "sub-10-3",
    "subcategoryName": "Environmental Management",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-175",
    "title": "Environmental Compliance Manager",
    "categoryId": "cat-10",
    "categoryName": "Health, Safety & Environment (HSE/EHS)",
    "subcategoryId": "sub-10-3",
    "subcategoryName": "Environmental Management",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-176",
    "title": "Environmental Engineer",
    "categoryId": "cat-10",
    "categoryName": "Health, Safety & Environment (HSE/EHS)",
    "subcategoryId": "sub-10-3",
    "subcategoryName": "Environmental Management",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-177",
    "title": "Sustainability Officer",
    "categoryId": "cat-10",
    "categoryName": "Health, Safety & Environment (HSE/EHS)",
    "subcategoryId": "sub-10-3",
    "subcategoryName": "Environmental Management",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-178",
    "title": "Emergency Response Manager",
    "categoryId": "cat-10",
    "categoryName": "Health, Safety & Environment (HSE/EHS)",
    "subcategoryId": "sub-10-4",
    "subcategoryName": "Emergency & Risk",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-179",
    "title": "Fire & Safety Head",
    "categoryId": "cat-10",
    "categoryName": "Health, Safety & Environment (HSE/EHS)",
    "subcategoryId": "sub-10-4",
    "subcategoryName": "Emergency & Risk",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-180",
    "title": "Disaster Recovery Manager",
    "categoryId": "cat-10",
    "categoryName": "Health, Safety & Environment (HSE/EHS)",
    "subcategoryId": "sub-10-4",
    "subcategoryName": "Emergency & Risk",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-181",
    "title": "Crisis Management Lead",
    "categoryId": "cat-10",
    "categoryName": "Health, Safety & Environment (HSE/EHS)",
    "subcategoryId": "sub-10-4",
    "subcategoryName": "Emergency & Risk",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-182",
    "title": "Ambassador",
    "categoryId": "cat-11",
    "categoryName": "Diplomacy",
    "subcategoryId": "sub-11-1",
    "subcategoryName": "Diplomatic Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-183",
    "title": "High Commissioner",
    "categoryId": "cat-11",
    "categoryName": "Diplomacy",
    "subcategoryId": "sub-11-1",
    "subcategoryName": "Diplomatic Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-184",
    "title": "Deputy High Commissioner",
    "categoryId": "cat-11",
    "categoryName": "Diplomacy",
    "subcategoryId": "sub-11-1",
    "subcategoryName": "Diplomatic Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-185",
    "title": "Permanent Representative",
    "categoryId": "cat-11",
    "categoryName": "Diplomacy",
    "subcategoryId": "sub-11-1",
    "subcategoryName": "Diplomatic Leadership",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-186",
    "title": "Trade Commissioner",
    "categoryId": "cat-11",
    "categoryName": "Diplomacy",
    "subcategoryId": "sub-11-2",
    "subcategoryName": "Trade Diplomacy",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-187",
    "title": "Commercial Attach\u00e9",
    "categoryId": "cat-11",
    "categoryName": "Diplomacy",
    "subcategoryId": "sub-11-2",
    "subcategoryName": "Trade Diplomacy",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-188",
    "title": "Economic Counsellor",
    "categoryId": "cat-11",
    "categoryName": "Diplomacy",
    "subcategoryId": "sub-11-2",
    "subcategoryName": "Trade Diplomacy",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-189",
    "title": "Trade Promotion Officer",
    "categoryId": "cat-11",
    "categoryName": "Diplomacy",
    "subcategoryId": "sub-11-2",
    "subcategoryName": "Trade Diplomacy",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-190",
    "title": "Consul General",
    "categoryId": "cat-11",
    "categoryName": "Diplomacy",
    "subcategoryId": "sub-11-3",
    "subcategoryName": "Consular Affairs",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-191",
    "title": "Deputy Consul General",
    "categoryId": "cat-11",
    "categoryName": "Diplomacy",
    "subcategoryId": "sub-11-3",
    "subcategoryName": "Consular Affairs",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-192",
    "title": "Consular Officer",
    "categoryId": "cat-11",
    "categoryName": "Diplomacy",
    "subcategoryId": "sub-11-3",
    "subcategoryName": "Consular Affairs",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-193",
    "title": "Visa Officer",
    "categoryId": "cat-11",
    "categoryName": "Diplomacy",
    "subcategoryId": "sub-11-3",
    "subcategoryName": "Consular Affairs",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-194",
    "title": "International Relations Director",
    "categoryId": "cat-11",
    "categoryName": "Diplomacy",
    "subcategoryId": "sub-11-4",
    "subcategoryName": "International Relations",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-195",
    "title": "Bilateral Affairs Head",
    "categoryId": "cat-11",
    "categoryName": "Diplomacy",
    "subcategoryId": "sub-11-4",
    "subcategoryName": "International Relations",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-196",
    "title": "Multilateral Affairs Head",
    "categoryId": "cat-11",
    "categoryName": "Diplomacy",
    "subcategoryId": "sub-11-4",
    "subcategoryName": "International Relations",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-197",
    "title": "Foreign Affairs Advisor",
    "categoryId": "cat-11",
    "categoryName": "Diplomacy",
    "subcategoryId": "sub-11-4",
    "subcategoryName": "International Relations",
    "groupName": "Leadership & Governance"
  },
  {
    "id": "t-198",
    "title": "Chief Strategy Officer (CSO)",
    "categoryId": "cat-12",
    "categoryName": "Corporate Strategy",
    "subcategoryId": "sub-12-1",
    "subcategoryName": "Strategy Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-199",
    "title": "Strategy Director",
    "categoryId": "cat-12",
    "categoryName": "Corporate Strategy",
    "subcategoryId": "sub-12-1",
    "subcategoryName": "Strategy Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-200",
    "title": "VP Strategy",
    "categoryId": "cat-12",
    "categoryName": "Corporate Strategy",
    "subcategoryId": "sub-12-1",
    "subcategoryName": "Strategy Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-201",
    "title": "Head of Strategy",
    "categoryId": "cat-12",
    "categoryName": "Corporate Strategy",
    "subcategoryId": "sub-12-1",
    "subcategoryName": "Strategy Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-202",
    "title": "Strategy Manager",
    "categoryId": "cat-12",
    "categoryName": "Corporate Strategy",
    "subcategoryId": "sub-12-1",
    "subcategoryName": "Strategy Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-203",
    "title": "Corporate Planning Director",
    "categoryId": "cat-12",
    "categoryName": "Corporate Strategy",
    "subcategoryId": "sub-12-2",
    "subcategoryName": "Business Planning",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-204",
    "title": "Strategic Planning Manager",
    "categoryId": "cat-12",
    "categoryName": "Corporate Strategy",
    "subcategoryId": "sub-12-2",
    "subcategoryName": "Business Planning",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-205",
    "title": "Business Planning Head",
    "categoryId": "cat-12",
    "categoryName": "Corporate Strategy",
    "subcategoryId": "sub-12-2",
    "subcategoryName": "Business Planning",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-206",
    "title": "Planning Analyst",
    "categoryId": "cat-12",
    "categoryName": "Corporate Strategy",
    "subcategoryId": "sub-12-2",
    "subcategoryName": "Business Planning",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-207",
    "title": "Growth Strategy Director",
    "categoryId": "cat-12",
    "categoryName": "Corporate Strategy",
    "subcategoryId": "sub-12-3",
    "subcategoryName": "Growth Strategy",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-208",
    "title": "Market Expansion Head",
    "categoryId": "cat-12",
    "categoryName": "Corporate Strategy",
    "subcategoryId": "sub-12-3",
    "subcategoryName": "Growth Strategy",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-209",
    "title": "Business Strategy Lead",
    "categoryId": "cat-12",
    "categoryName": "Corporate Strategy",
    "subcategoryId": "sub-12-3",
    "subcategoryName": "Growth Strategy",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-210",
    "title": "Competitive Strategy Manager",
    "categoryId": "cat-12",
    "categoryName": "Corporate Strategy",
    "subcategoryId": "sub-12-3",
    "subcategoryName": "Growth Strategy",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-211",
    "title": "Enterprise Architect",
    "categoryId": "cat-12",
    "categoryName": "Corporate Strategy",
    "subcategoryId": "sub-12-4",
    "subcategoryName": "Enterprise Strategy",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-212",
    "title": "Portfolio Strategy Head",
    "categoryId": "cat-12",
    "categoryName": "Corporate Strategy",
    "subcategoryId": "sub-12-4",
    "subcategoryName": "Enterprise Strategy",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-213",
    "title": "Strategic Initiatives Lead",
    "categoryId": "cat-12",
    "categoryName": "Corporate Strategy",
    "subcategoryId": "sub-12-4",
    "subcategoryName": "Enterprise Strategy",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-214",
    "title": "Transformation Advisor",
    "categoryId": "cat-12",
    "categoryName": "Corporate Strategy",
    "subcategoryId": "sub-12-4",
    "subcategoryName": "Enterprise Strategy",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-215",
    "title": "Chief Transformation Officer",
    "categoryId": "cat-13",
    "categoryName": "Business Transformation",
    "subcategoryId": "sub-13-1",
    "subcategoryName": "Transformation Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-216",
    "title": "Transformation Director",
    "categoryId": "cat-13",
    "categoryName": "Business Transformation",
    "subcategoryId": "sub-13-1",
    "subcategoryName": "Transformation Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-217",
    "title": "Head of Transformation",
    "categoryId": "cat-13",
    "categoryName": "Business Transformation",
    "subcategoryId": "sub-13-1",
    "subcategoryName": "Transformation Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-218",
    "title": "Transformation Manager",
    "categoryId": "cat-13",
    "categoryName": "Business Transformation",
    "subcategoryId": "sub-13-1",
    "subcategoryName": "Transformation Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-219",
    "title": "Change Management Director",
    "categoryId": "cat-13",
    "categoryName": "Business Transformation",
    "subcategoryId": "sub-13-2",
    "subcategoryName": "Organizational Change",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-220",
    "title": "Change Manager",
    "categoryId": "cat-13",
    "categoryName": "Business Transformation",
    "subcategoryId": "sub-13-2",
    "subcategoryName": "Organizational Change",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-221",
    "title": "Organizational Change Lead",
    "categoryId": "cat-13",
    "categoryName": "Business Transformation",
    "subcategoryId": "sub-13-2",
    "subcategoryName": "Organizational Change",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-222",
    "title": "Business Excellence Head",
    "categoryId": "cat-13",
    "categoryName": "Business Transformation",
    "subcategoryId": "sub-13-2",
    "subcategoryName": "Organizational Change",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-223",
    "title": "Process Improvement Director",
    "categoryId": "cat-13",
    "categoryName": "Business Transformation",
    "subcategoryId": "sub-13-3",
    "subcategoryName": "Process Excellence",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-224",
    "title": "Lean Transformation Manager",
    "categoryId": "cat-13",
    "categoryName": "Business Transformation",
    "subcategoryId": "sub-13-3",
    "subcategoryName": "Process Excellence",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-225",
    "title": "Six Sigma Leader",
    "categoryId": "cat-13",
    "categoryName": "Business Transformation",
    "subcategoryId": "sub-13-3",
    "subcategoryName": "Process Excellence",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-226",
    "title": "Operational Excellence Head",
    "categoryId": "cat-13",
    "categoryName": "Business Transformation",
    "subcategoryId": "sub-13-3",
    "subcategoryName": "Process Excellence",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-227",
    "title": "Strategic Programs Director",
    "categoryId": "cat-13",
    "categoryName": "Business Transformation",
    "subcategoryId": "sub-13-4",
    "subcategoryName": "Strategic Initiatives",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-228",
    "title": "Enterprise Transformation Lead",
    "categoryId": "cat-13",
    "categoryName": "Business Transformation",
    "subcategoryId": "sub-13-4",
    "subcategoryName": "Strategic Initiatives",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-229",
    "title": "Business Improvement Manager",
    "categoryId": "cat-13",
    "categoryName": "Business Transformation",
    "subcategoryId": "sub-13-4",
    "subcategoryName": "Strategic Initiatives",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-230",
    "title": "Innovation Transformation Head",
    "categoryId": "cat-13",
    "categoryName": "Business Transformation",
    "subcategoryId": "sub-13-4",
    "subcategoryName": "Strategic Initiatives",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-231",
    "title": "Chief Financial Officer (CFO)",
    "categoryId": "cat-14",
    "categoryName": "Finance",
    "subcategoryId": "sub-14-1",
    "subcategoryName": "Finance Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-232",
    "title": "Deputy CFO",
    "categoryId": "cat-14",
    "categoryName": "Finance",
    "subcategoryId": "sub-14-1",
    "subcategoryName": "Finance Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-233",
    "title": "Finance Director",
    "categoryId": "cat-14",
    "categoryName": "Finance",
    "subcategoryId": "sub-14-1",
    "subcategoryName": "Finance Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-234",
    "title": "VP Finance",
    "categoryId": "cat-14",
    "categoryName": "Finance",
    "subcategoryId": "sub-14-1",
    "subcategoryName": "Finance Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-235",
    "title": "Head of Finance",
    "categoryId": "cat-14",
    "categoryName": "Finance",
    "subcategoryId": "sub-14-1",
    "subcategoryName": "Finance Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-236",
    "title": "Chief Accounting Officer",
    "categoryId": "cat-14",
    "categoryName": "Finance",
    "subcategoryId": "sub-14-2",
    "subcategoryName": "Accounting",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-237",
    "title": "Financial Controller",
    "categoryId": "cat-14",
    "categoryName": "Finance",
    "subcategoryId": "sub-14-2",
    "subcategoryName": "Accounting",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-238",
    "title": "Finance Controller",
    "categoryId": "cat-14",
    "categoryName": "Finance",
    "subcategoryId": "sub-14-2",
    "subcategoryName": "Accounting",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-239",
    "title": "Chief Accountant",
    "categoryId": "cat-14",
    "categoryName": "Finance",
    "subcategoryId": "sub-14-2",
    "subcategoryName": "Accounting",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-240",
    "title": "Accounting Manager",
    "categoryId": "cat-14",
    "categoryName": "Finance",
    "subcategoryId": "sub-14-2",
    "subcategoryName": "Accounting",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-241",
    "title": "FP&A Director",
    "categoryId": "cat-14",
    "categoryName": "Finance",
    "subcategoryId": "sub-14-3",
    "subcategoryName": "Financial Planning",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-242",
    "title": "Budget Director",
    "categoryId": "cat-14",
    "categoryName": "Finance",
    "subcategoryId": "sub-14-3",
    "subcategoryName": "Financial Planning",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-243",
    "title": "Cost Controller",
    "categoryId": "cat-14",
    "categoryName": "Finance",
    "subcategoryId": "sub-14-3",
    "subcategoryName": "Financial Planning",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-244",
    "title": "Financial Planning Manager",
    "categoryId": "cat-14",
    "categoryName": "Finance",
    "subcategoryId": "sub-14-3",
    "subcategoryName": "Financial Planning",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-245",
    "title": "Payroll Head",
    "categoryId": "cat-14",
    "categoryName": "Finance",
    "subcategoryId": "sub-14-4",
    "subcategoryName": "Financial Operations",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-246",
    "title": "Tax Director",
    "categoryId": "cat-14",
    "categoryName": "Finance",
    "subcategoryId": "sub-14-4",
    "subcategoryName": "Financial Operations",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-247",
    "title": "Financial Reporting Manager",
    "categoryId": "cat-14",
    "categoryName": "Finance",
    "subcategoryId": "sub-14-4",
    "subcategoryName": "Financial Operations",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-248",
    "title": "Accounts Payable Manager",
    "categoryId": "cat-14",
    "categoryName": "Finance",
    "subcategoryId": "sub-14-4",
    "subcategoryName": "Financial Operations",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-249",
    "title": "Treasurer",
    "categoryId": "cat-15",
    "categoryName": "Treasury",
    "subcategoryId": "sub-15-1",
    "subcategoryName": "Treasury Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-250",
    "title": "Treasury Director",
    "categoryId": "cat-15",
    "categoryName": "Treasury",
    "subcategoryId": "sub-15-1",
    "subcategoryName": "Treasury Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-251",
    "title": "Head of Treasury",
    "categoryId": "cat-15",
    "categoryName": "Treasury",
    "subcategoryId": "sub-15-1",
    "subcategoryName": "Treasury Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-252",
    "title": "Treasury Manager",
    "categoryId": "cat-15",
    "categoryName": "Treasury",
    "subcategoryId": "sub-15-1",
    "subcategoryName": "Treasury Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-253",
    "title": "Cash Management Director",
    "categoryId": "cat-15",
    "categoryName": "Treasury",
    "subcategoryId": "sub-15-2",
    "subcategoryName": "Cash Management",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-254",
    "title": "Liquidity Manager",
    "categoryId": "cat-15",
    "categoryName": "Treasury",
    "subcategoryId": "sub-15-2",
    "subcategoryName": "Cash Management",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-255",
    "title": "Working Capital Manager",
    "categoryId": "cat-15",
    "categoryName": "Treasury",
    "subcategoryId": "sub-15-2",
    "subcategoryName": "Cash Management",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-256",
    "title": "Banking Relations Manager",
    "categoryId": "cat-15",
    "categoryName": "Treasury",
    "subcategoryId": "sub-15-2",
    "subcategoryName": "Cash Management",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-257",
    "title": "Chief Investment Officer",
    "categoryId": "cat-15",
    "categoryName": "Treasury",
    "subcategoryId": "sub-15-3",
    "subcategoryName": "Investments",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-258",
    "title": "Investment Director",
    "categoryId": "cat-15",
    "categoryName": "Treasury",
    "subcategoryId": "sub-15-3",
    "subcategoryName": "Investments",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-259",
    "title": "Portfolio Manager",
    "categoryId": "cat-15",
    "categoryName": "Treasury",
    "subcategoryId": "sub-15-3",
    "subcategoryName": "Investments",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-260",
    "title": "Capital Markets Manager",
    "categoryId": "cat-15",
    "categoryName": "Treasury",
    "subcategoryId": "sub-15-3",
    "subcategoryName": "Investments",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-261",
    "title": "FX Manager",
    "categoryId": "cat-15",
    "categoryName": "Treasury",
    "subcategoryId": "sub-15-4",
    "subcategoryName": "Foreign Exchange",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-262",
    "title": "Currency Risk Manager",
    "categoryId": "cat-15",
    "categoryName": "Treasury",
    "subcategoryId": "sub-15-4",
    "subcategoryName": "Foreign Exchange",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-263",
    "title": "Hedging Specialist",
    "categoryId": "cat-15",
    "categoryName": "Treasury",
    "subcategoryId": "sub-15-4",
    "subcategoryName": "Foreign Exchange",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-264",
    "title": "Treasury Analyst",
    "categoryId": "cat-15",
    "categoryName": "Treasury",
    "subcategoryId": "sub-15-4",
    "subcategoryName": "Foreign Exchange",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-265",
    "title": "Chief Investor Relations Officer",
    "categoryId": "cat-16",
    "categoryName": "Investor Relations",
    "subcategoryId": "sub-16-1",
    "subcategoryName": "Investor Relations Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-266",
    "title": "Investor Relations Director",
    "categoryId": "cat-16",
    "categoryName": "Investor Relations",
    "subcategoryId": "sub-16-1",
    "subcategoryName": "Investor Relations Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-267",
    "title": "Head of Investor Relations",
    "categoryId": "cat-16",
    "categoryName": "Investor Relations",
    "subcategoryId": "sub-16-1",
    "subcategoryName": "Investor Relations Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-268",
    "title": "Investor Relations Manager",
    "categoryId": "cat-16",
    "categoryName": "Investor Relations",
    "subcategoryId": "sub-16-1",
    "subcategoryName": "Investor Relations Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-269",
    "title": "Shareholder Communications Director",
    "categoryId": "cat-16",
    "categoryName": "Investor Relations",
    "subcategoryId": "sub-16-2",
    "subcategoryName": "Shareholder Relations",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-270",
    "title": "Shareholder Services Manager",
    "categoryId": "cat-16",
    "categoryName": "Investor Relations",
    "subcategoryId": "sub-16-2",
    "subcategoryName": "Shareholder Relations",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-271",
    "title": "Investor Communications Lead",
    "categoryId": "cat-16",
    "categoryName": "Investor Relations",
    "subcategoryId": "sub-16-2",
    "subcategoryName": "Shareholder Relations",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-272",
    "title": "Stakeholder Relations Manager",
    "categoryId": "cat-16",
    "categoryName": "Investor Relations",
    "subcategoryId": "sub-16-2",
    "subcategoryName": "Shareholder Relations",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-273",
    "title": "Capital Markets Director",
    "categoryId": "cat-16",
    "categoryName": "Investor Relations",
    "subcategoryId": "sub-16-3",
    "subcategoryName": "Capital Markets",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-274",
    "title": "Equity Research Head",
    "categoryId": "cat-16",
    "categoryName": "Investor Relations",
    "subcategoryId": "sub-16-3",
    "subcategoryName": "Capital Markets",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-275",
    "title": "Market Intelligence Manager",
    "categoryId": "cat-16",
    "categoryName": "Investor Relations",
    "subcategoryId": "sub-16-3",
    "subcategoryName": "Capital Markets",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-276",
    "title": "Investment Communications Manager",
    "categoryId": "cat-16",
    "categoryName": "Investor Relations",
    "subcategoryId": "sub-16-3",
    "subcategoryName": "Capital Markets",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-277",
    "title": "Annual Report Manager",
    "categoryId": "cat-16",
    "categoryName": "Investor Relations",
    "subcategoryId": "sub-16-4",
    "subcategoryName": "Corporate Reporting",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-278",
    "title": "ESG Reporting Lead",
    "categoryId": "cat-16",
    "categoryName": "Investor Relations",
    "subcategoryId": "sub-16-4",
    "subcategoryName": "Corporate Reporting",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-279",
    "title": "Financial Communications Manager",
    "categoryId": "cat-16",
    "categoryName": "Investor Relations",
    "subcategoryId": "sub-16-4",
    "subcategoryName": "Corporate Reporting",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-280",
    "title": "Disclosure Officer",
    "categoryId": "cat-16",
    "categoryName": "Investor Relations",
    "subcategoryId": "sub-16-4",
    "subcategoryName": "Corporate Reporting",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-281",
    "title": "Chief Risk Officer (CRO)",
    "categoryId": "cat-17",
    "categoryName": "Risk Management",
    "subcategoryId": "sub-17-1",
    "subcategoryName": "Risk Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-282",
    "title": "Risk Director",
    "categoryId": "cat-17",
    "categoryName": "Risk Management",
    "subcategoryId": "sub-17-1",
    "subcategoryName": "Risk Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-283",
    "title": "VP Risk Management",
    "categoryId": "cat-17",
    "categoryName": "Risk Management",
    "subcategoryId": "sub-17-1",
    "subcategoryName": "Risk Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-284",
    "title": "Head of Risk",
    "categoryId": "cat-17",
    "categoryName": "Risk Management",
    "subcategoryId": "sub-17-1",
    "subcategoryName": "Risk Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-285",
    "title": "Risk Manager",
    "categoryId": "cat-17",
    "categoryName": "Risk Management",
    "subcategoryId": "sub-17-1",
    "subcategoryName": "Risk Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-286",
    "title": "Enterprise Risk Director",
    "categoryId": "cat-17",
    "categoryName": "Risk Management",
    "subcategoryId": "sub-17-2",
    "subcategoryName": "Enterprise Risk",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-287",
    "title": "Enterprise Risk Manager",
    "categoryId": "cat-17",
    "categoryName": "Risk Management",
    "subcategoryId": "sub-17-2",
    "subcategoryName": "Enterprise Risk",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-288",
    "title": "Risk Assessment Lead",
    "categoryId": "cat-17",
    "categoryName": "Risk Management",
    "subcategoryId": "sub-17-2",
    "subcategoryName": "Enterprise Risk",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-289",
    "title": "Business Continuity Manager",
    "categoryId": "cat-17",
    "categoryName": "Risk Management",
    "subcategoryId": "sub-17-2",
    "subcategoryName": "Enterprise Risk",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-290",
    "title": "Operational Risk Head",
    "categoryId": "cat-17",
    "categoryName": "Risk Management",
    "subcategoryId": "sub-17-3",
    "subcategoryName": "Operational Risk",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-291",
    "title": "Operational Risk Manager",
    "categoryId": "cat-17",
    "categoryName": "Risk Management",
    "subcategoryId": "sub-17-3",
    "subcategoryName": "Operational Risk",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-292",
    "title": "Internal Controls Manager",
    "categoryId": "cat-17",
    "categoryName": "Risk Management",
    "subcategoryId": "sub-17-3",
    "subcategoryName": "Operational Risk",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-293",
    "title": "Risk Analytics Manager",
    "categoryId": "cat-17",
    "categoryName": "Risk Management",
    "subcategoryId": "sub-17-3",
    "subcategoryName": "Operational Risk",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-294",
    "title": "Regulatory Risk Manager",
    "categoryId": "cat-17",
    "categoryName": "Risk Management",
    "subcategoryId": "sub-17-4",
    "subcategoryName": "Compliance Risk",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-295",
    "title": "Financial Risk Manager",
    "categoryId": "cat-17",
    "categoryName": "Risk Management",
    "subcategoryId": "sub-17-4",
    "subcategoryName": "Compliance Risk",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-296",
    "title": "Credit Risk Manager",
    "categoryId": "cat-17",
    "categoryName": "Risk Management",
    "subcategoryId": "sub-17-4",
    "subcategoryName": "Compliance Risk",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-297",
    "title": "Market Risk Manager",
    "categoryId": "cat-17",
    "categoryName": "Risk Management",
    "subcategoryId": "sub-17-4",
    "subcategoryName": "Compliance Risk",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-298",
    "title": "Chief Audit Executive (CAE)",
    "categoryId": "cat-18",
    "categoryName": "Corporate Audit",
    "subcategoryId": "sub-18-1",
    "subcategoryName": "Audit Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-299",
    "title": "Internal Audit Director",
    "categoryId": "cat-18",
    "categoryName": "Corporate Audit",
    "subcategoryId": "sub-18-1",
    "subcategoryName": "Audit Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-300",
    "title": "Head of Internal Audit",
    "categoryId": "cat-18",
    "categoryName": "Corporate Audit",
    "subcategoryId": "sub-18-1",
    "subcategoryName": "Audit Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-301",
    "title": "Audit Manager",
    "categoryId": "cat-18",
    "categoryName": "Corporate Audit",
    "subcategoryId": "sub-18-1",
    "subcategoryName": "Audit Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-302",
    "title": "Senior Internal Auditor",
    "categoryId": "cat-18",
    "categoryName": "Corporate Audit",
    "subcategoryId": "sub-18-2",
    "subcategoryName": "Internal Audit",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-303",
    "title": "Internal Auditor",
    "categoryId": "cat-18",
    "categoryName": "Corporate Audit",
    "subcategoryId": "sub-18-2",
    "subcategoryName": "Internal Audit",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-304",
    "title": "Audit Supervisor",
    "categoryId": "cat-18",
    "categoryName": "Corporate Audit",
    "subcategoryId": "sub-18-2",
    "subcategoryName": "Internal Audit",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-305",
    "title": "Audit Executive",
    "categoryId": "cat-18",
    "categoryName": "Corporate Audit",
    "subcategoryId": "sub-18-2",
    "subcategoryName": "Internal Audit",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-306",
    "title": "Financial Audit Director",
    "categoryId": "cat-18",
    "categoryName": "Corporate Audit",
    "subcategoryId": "sub-18-3",
    "subcategoryName": "Financial Audit",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-307",
    "title": "Financial Auditor",
    "categoryId": "cat-18",
    "categoryName": "Corporate Audit",
    "subcategoryId": "sub-18-3",
    "subcategoryName": "Financial Audit",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-308",
    "title": "Revenue Audit Manager",
    "categoryId": "cat-18",
    "categoryName": "Corporate Audit",
    "subcategoryId": "sub-18-3",
    "subcategoryName": "Financial Audit",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-309",
    "title": "Cost Audit Manager",
    "categoryId": "cat-18",
    "categoryName": "Corporate Audit",
    "subcategoryId": "sub-18-3",
    "subcategoryName": "Financial Audit",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-310",
    "title": "Compliance Auditor",
    "categoryId": "cat-18",
    "categoryName": "Corporate Audit",
    "subcategoryId": "sub-18-4",
    "subcategoryName": "Governance Audit",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-311",
    "title": "Process Auditor",
    "categoryId": "cat-18",
    "categoryName": "Corporate Audit",
    "subcategoryId": "sub-18-4",
    "subcategoryName": "Governance Audit",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-312",
    "title": "IT Auditor",
    "categoryId": "cat-18",
    "categoryName": "Corporate Audit",
    "subcategoryId": "sub-18-4",
    "subcategoryName": "Governance Audit",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-313",
    "title": "Audit Analyst",
    "categoryId": "cat-18",
    "categoryName": "Corporate Audit",
    "subcategoryId": "sub-18-4",
    "subcategoryName": "Governance Audit",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-314",
    "title": "Chief Digital Officer (CDO)",
    "categoryId": "cat-19",
    "categoryName": "Digital Transformation",
    "subcategoryId": "sub-19-1",
    "subcategoryName": "Digital Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-315",
    "title": "Digital Transformation Director",
    "categoryId": "cat-19",
    "categoryName": "Digital Transformation",
    "subcategoryId": "sub-19-1",
    "subcategoryName": "Digital Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-316",
    "title": "Head of Digital Transformation",
    "categoryId": "cat-19",
    "categoryName": "Digital Transformation",
    "subcategoryId": "sub-19-1",
    "subcategoryName": "Digital Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-317",
    "title": "Digital Strategy Manager",
    "categoryId": "cat-19",
    "categoryName": "Digital Transformation",
    "subcategoryId": "sub-19-1",
    "subcategoryName": "Digital Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-318",
    "title": "Digital Innovation Director",
    "categoryId": "cat-19",
    "categoryName": "Digital Transformation",
    "subcategoryId": "sub-19-2",
    "subcategoryName": "Digital Innovation",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-319",
    "title": "Innovation Manager",
    "categoryId": "cat-19",
    "categoryName": "Digital Transformation",
    "subcategoryId": "sub-19-2",
    "subcategoryName": "Digital Innovation",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-320",
    "title": "Smart Technology Lead",
    "categoryId": "cat-19",
    "categoryName": "Digital Transformation",
    "subcategoryId": "sub-19-2",
    "subcategoryName": "Digital Innovation",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-321",
    "title": "Automation Lead",
    "categoryId": "cat-19",
    "categoryName": "Digital Transformation",
    "subcategoryId": "sub-19-2",
    "subcategoryName": "Digital Innovation",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-322",
    "title": "Enterprise Digital Head",
    "categoryId": "cat-19",
    "categoryName": "Digital Transformation",
    "subcategoryId": "sub-19-3",
    "subcategoryName": "Enterprise Digital",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-323",
    "title": "Business Process Digitization Manager",
    "categoryId": "cat-19",
    "categoryName": "Digital Transformation",
    "subcategoryId": "sub-19-3",
    "subcategoryName": "Enterprise Digital",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-324",
    "title": "Digital Program Manager",
    "categoryId": "cat-19",
    "categoryName": "Digital Transformation",
    "subcategoryId": "sub-19-3",
    "subcategoryName": "Enterprise Digital",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-325",
    "title": "Transformation Consultant",
    "categoryId": "cat-19",
    "categoryName": "Digital Transformation",
    "subcategoryId": "sub-19-3",
    "subcategoryName": "Enterprise Digital",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-326",
    "title": "Digital Excellence Manager",
    "categoryId": "cat-19",
    "categoryName": "Digital Transformation",
    "subcategoryId": "sub-19-4",
    "subcategoryName": "Digital Excellence",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-327",
    "title": "Customer Digital Experience Lead",
    "categoryId": "cat-19",
    "categoryName": "Digital Transformation",
    "subcategoryId": "sub-19-4",
    "subcategoryName": "Digital Excellence",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-328",
    "title": "Digital Adoption Manager",
    "categoryId": "cat-19",
    "categoryName": "Digital Transformation",
    "subcategoryId": "sub-19-4",
    "subcategoryName": "Digital Excellence",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-329",
    "title": "Change Enablement Manager",
    "categoryId": "cat-19",
    "categoryName": "Digital Transformation",
    "subcategoryId": "sub-19-4",
    "subcategoryName": "Digital Excellence",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-330",
    "title": "Chief Sales Officer (CSO)",
    "categoryId": "cat-20",
    "categoryName": "Sales Excellence",
    "subcategoryId": "sub-20-1",
    "subcategoryName": "Sales Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-331",
    "title": "VP Sales",
    "categoryId": "cat-20",
    "categoryName": "Sales Excellence",
    "subcategoryId": "sub-20-1",
    "subcategoryName": "Sales Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-332",
    "title": "Sales Director",
    "categoryId": "cat-20",
    "categoryName": "Sales Excellence",
    "subcategoryId": "sub-20-1",
    "subcategoryName": "Sales Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-333",
    "title": "Head of Sales",
    "categoryId": "cat-20",
    "categoryName": "Sales Excellence",
    "subcategoryId": "sub-20-1",
    "subcategoryName": "Sales Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-334",
    "title": "National Sales Head",
    "categoryId": "cat-20",
    "categoryName": "Sales Excellence",
    "subcategoryId": "sub-20-1",
    "subcategoryName": "Sales Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-335",
    "title": "Regional Sales Director",
    "categoryId": "cat-20",
    "categoryName": "Sales Excellence",
    "subcategoryId": "sub-20-2",
    "subcategoryName": "Business Sales",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-336",
    "title": "Territory Sales Manager",
    "categoryId": "cat-20",
    "categoryName": "Sales Excellence",
    "subcategoryId": "sub-20-2",
    "subcategoryName": "Business Sales",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-337",
    "title": "Area Sales Manager",
    "categoryId": "cat-20",
    "categoryName": "Sales Excellence",
    "subcategoryId": "sub-20-2",
    "subcategoryName": "Business Sales",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-338",
    "title": "Key Account Manager",
    "categoryId": "cat-20",
    "categoryName": "Sales Excellence",
    "subcategoryId": "sub-20-2",
    "subcategoryName": "Business Sales",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-339",
    "title": "Enterprise Sales Director",
    "categoryId": "cat-20",
    "categoryName": "Sales Excellence",
    "subcategoryId": "sub-20-3",
    "subcategoryName": "Enterprise Sales",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-340",
    "title": "Strategic Accounts Director",
    "categoryId": "cat-20",
    "categoryName": "Sales Excellence",
    "subcategoryId": "sub-20-3",
    "subcategoryName": "Enterprise Sales",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-341",
    "title": "Global Sales Head",
    "categoryId": "cat-20",
    "categoryName": "Sales Excellence",
    "subcategoryId": "sub-20-3",
    "subcategoryName": "Enterprise Sales",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-342",
    "title": "Channel Sales Director",
    "categoryId": "cat-20",
    "categoryName": "Sales Excellence",
    "subcategoryId": "sub-20-3",
    "subcategoryName": "Enterprise Sales",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-343",
    "title": "Sales Operations Manager",
    "categoryId": "cat-20",
    "categoryName": "Sales Excellence",
    "subcategoryId": "sub-20-4",
    "subcategoryName": "Sales Operations",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-344",
    "title": "Sales Excellence Manager",
    "categoryId": "cat-20",
    "categoryName": "Sales Excellence",
    "subcategoryId": "sub-20-4",
    "subcategoryName": "Sales Operations",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-345",
    "title": "Revenue Operations Manager",
    "categoryId": "cat-20",
    "categoryName": "Sales Excellence",
    "subcategoryId": "sub-20-4",
    "subcategoryName": "Sales Operations",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-346",
    "title": "Sales Enablement Manager",
    "categoryId": "cat-20",
    "categoryName": "Sales Excellence",
    "subcategoryId": "sub-20-4",
    "subcategoryName": "Sales Operations",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-347",
    "title": "Chief Brand Officer (CBO)",
    "categoryId": "cat-21",
    "categoryName": "Brand Management",
    "subcategoryId": "sub-21-1",
    "subcategoryName": "Brand Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-348",
    "title": "Brand Director",
    "categoryId": "cat-21",
    "categoryName": "Brand Management",
    "subcategoryId": "sub-21-1",
    "subcategoryName": "Brand Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-349",
    "title": "Head of Brand",
    "categoryId": "cat-21",
    "categoryName": "Brand Management",
    "subcategoryId": "sub-21-1",
    "subcategoryName": "Brand Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-350",
    "title": "Brand Manager",
    "categoryId": "cat-21",
    "categoryName": "Brand Management",
    "subcategoryId": "sub-21-1",
    "subcategoryName": "Brand Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-351",
    "title": "Brand Strategy Director",
    "categoryId": "cat-21",
    "categoryName": "Brand Management",
    "subcategoryId": "sub-21-2",
    "subcategoryName": "Brand Strategy",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-352",
    "title": "Brand Planning Manager",
    "categoryId": "cat-21",
    "categoryName": "Brand Management",
    "subcategoryId": "sub-21-2",
    "subcategoryName": "Brand Strategy",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-353",
    "title": "Corporate Identity Manager",
    "categoryId": "cat-21",
    "categoryName": "Brand Management",
    "subcategoryId": "sub-21-2",
    "subcategoryName": "Brand Strategy",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-354",
    "title": "Employer Branding Head",
    "categoryId": "cat-21",
    "categoryName": "Brand Management",
    "subcategoryId": "sub-21-2",
    "subcategoryName": "Brand Strategy",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-355",
    "title": "Consumer Brand Manager",
    "categoryId": "cat-21",
    "categoryName": "Brand Management",
    "subcategoryId": "sub-21-3",
    "subcategoryName": "Consumer Brand",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-356",
    "title": "Product Brand Manager",
    "categoryId": "cat-21",
    "categoryName": "Brand Management",
    "subcategoryId": "sub-21-3",
    "subcategoryName": "Consumer Brand",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-357",
    "title": "Category Brand Manager",
    "categoryId": "cat-21",
    "categoryName": "Brand Management",
    "subcategoryId": "sub-21-3",
    "subcategoryName": "Consumer Brand",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-358",
    "title": "Retail Brand Manager",
    "categoryId": "cat-21",
    "categoryName": "Brand Management",
    "subcategoryId": "sub-21-3",
    "subcategoryName": "Consumer Brand",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-359",
    "title": "Brand Communications Director",
    "categoryId": "cat-21",
    "categoryName": "Brand Management",
    "subcategoryId": "sub-21-4",
    "subcategoryName": "Brand Communications",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-360",
    "title": "Creative Director",
    "categoryId": "cat-21",
    "categoryName": "Brand Management",
    "subcategoryId": "sub-21-4",
    "subcategoryName": "Brand Communications",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-361",
    "title": "Design Head",
    "categoryId": "cat-21",
    "categoryName": "Brand Management",
    "subcategoryId": "sub-21-4",
    "subcategoryName": "Brand Communications",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-362",
    "title": "Visual Identity Manager",
    "categoryId": "cat-21",
    "categoryName": "Brand Management",
    "subcategoryId": "sub-21-4",
    "subcategoryName": "Brand Communications",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-363",
    "title": "Chief Public Relations Officer",
    "categoryId": "cat-22",
    "categoryName": "Public Relations",
    "subcategoryId": "sub-22-1",
    "subcategoryName": "PR Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-364",
    "title": "Public Relations Director",
    "categoryId": "cat-22",
    "categoryName": "Public Relations",
    "subcategoryId": "sub-22-1",
    "subcategoryName": "PR Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-365",
    "title": "Head of Public Relations",
    "categoryId": "cat-22",
    "categoryName": "Public Relations",
    "subcategoryId": "sub-22-1",
    "subcategoryName": "PR Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-366",
    "title": "PR Manager",
    "categoryId": "cat-22",
    "categoryName": "Public Relations",
    "subcategoryId": "sub-22-1",
    "subcategoryName": "PR Leadership",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-367",
    "title": "Media Relations Director",
    "categoryId": "cat-22",
    "categoryName": "Public Relations",
    "subcategoryId": "sub-22-2",
    "subcategoryName": "Media Relations",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-368",
    "title": "Media Relations Manager",
    "categoryId": "cat-22",
    "categoryName": "Public Relations",
    "subcategoryId": "sub-22-2",
    "subcategoryName": "Media Relations",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-369",
    "title": "Press Relations Officer",
    "categoryId": "cat-22",
    "categoryName": "Public Relations",
    "subcategoryId": "sub-22-2",
    "subcategoryName": "Media Relations",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-370",
    "title": "Press Secretary",
    "categoryId": "cat-22",
    "categoryName": "Public Relations",
    "subcategoryId": "sub-22-2",
    "subcategoryName": "Media Relations",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-371",
    "title": "Reputation Director",
    "categoryId": "cat-22",
    "categoryName": "Public Relations",
    "subcategoryId": "sub-22-3",
    "subcategoryName": "Reputation Management",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-372",
    "title": "Corporate Reputation Manager",
    "categoryId": "cat-22",
    "categoryName": "Public Relations",
    "subcategoryId": "sub-22-3",
    "subcategoryName": "Reputation Management",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-373",
    "title": "Crisis Communications Manager",
    "categoryId": "cat-22",
    "categoryName": "Public Relations",
    "subcategoryId": "sub-22-3",
    "subcategoryName": "Reputation Management",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-374",
    "title": "Image Management Specialist",
    "categoryId": "cat-22",
    "categoryName": "Public Relations",
    "subcategoryId": "sub-22-3",
    "subcategoryName": "Reputation Management",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-375",
    "title": "Community Relations Manager",
    "categoryId": "cat-22",
    "categoryName": "Public Relations",
    "subcategoryId": "sub-22-4",
    "subcategoryName": "Public Engagement",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-376",
    "title": "Public Affairs Manager",
    "categoryId": "cat-22",
    "categoryName": "Public Relations",
    "subcategoryId": "sub-22-4",
    "subcategoryName": "Public Engagement",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-377",
    "title": "External Communications Manager",
    "categoryId": "cat-22",
    "categoryName": "Public Relations",
    "subcategoryId": "sub-22-4",
    "subcategoryName": "Public Engagement",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-378",
    "title": "Stakeholder Communications Lead",
    "categoryId": "cat-22",
    "categoryName": "Public Relations",
    "subcategoryId": "sub-22-4",
    "subcategoryName": "Public Engagement",
    "groupName": "Finance, Strategy & Growth"
  },
  {
    "id": "t-379",
    "title": "Chief Information Officer (CIO)",
    "categoryId": "cat-23",
    "categoryName": "Information Technology (IT)",
    "subcategoryId": "sub-23-1",
    "subcategoryName": "IT Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-380",
    "title": "Chief Technology Officer (CTO)",
    "categoryId": "cat-23",
    "categoryName": "Information Technology (IT)",
    "subcategoryId": "sub-23-1",
    "subcategoryName": "IT Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-381",
    "title": "IT Director",
    "categoryId": "cat-23",
    "categoryName": "Information Technology (IT)",
    "subcategoryId": "sub-23-1",
    "subcategoryName": "IT Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-382",
    "title": "VP Information Technology",
    "categoryId": "cat-23",
    "categoryName": "Information Technology (IT)",
    "subcategoryId": "sub-23-1",
    "subcategoryName": "IT Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-383",
    "title": "Head of IT",
    "categoryId": "cat-23",
    "categoryName": "Information Technology (IT)",
    "subcategoryId": "sub-23-1",
    "subcategoryName": "IT Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-384",
    "title": "Infrastructure Director",
    "categoryId": "cat-23",
    "categoryName": "Information Technology (IT)",
    "subcategoryId": "sub-23-2",
    "subcategoryName": "Infrastructure",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-385",
    "title": "Infrastructure Manager",
    "categoryId": "cat-23",
    "categoryName": "Information Technology (IT)",
    "subcategoryId": "sub-23-2",
    "subcategoryName": "Infrastructure",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-386",
    "title": "Network Manager",
    "categoryId": "cat-23",
    "categoryName": "Information Technology (IT)",
    "subcategoryId": "sub-23-2",
    "subcategoryName": "Infrastructure",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-387",
    "title": "Systems Administrator",
    "categoryId": "cat-23",
    "categoryName": "Information Technology (IT)",
    "subcategoryId": "sub-23-2",
    "subcategoryName": "Infrastructure",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-388",
    "title": "ERP Director",
    "categoryId": "cat-23",
    "categoryName": "Information Technology (IT)",
    "subcategoryId": "sub-23-3",
    "subcategoryName": "Enterprise Applications",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-389",
    "title": "SAP Program Director",
    "categoryId": "cat-23",
    "categoryName": "Information Technology (IT)",
    "subcategoryId": "sub-23-3",
    "subcategoryName": "Enterprise Applications",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-390",
    "title": "Enterprise Applications Manager",
    "categoryId": "cat-23",
    "categoryName": "Information Technology (IT)",
    "subcategoryId": "sub-23-3",
    "subcategoryName": "Enterprise Applications",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-391",
    "title": "Business Applications Manager",
    "categoryId": "cat-23",
    "categoryName": "Information Technology (IT)",
    "subcategoryId": "sub-23-3",
    "subcategoryName": "Enterprise Applications",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-392",
    "title": "IT Operations Director",
    "categoryId": "cat-23",
    "categoryName": "Information Technology (IT)",
    "subcategoryId": "sub-23-4",
    "subcategoryName": "IT Operations",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-393",
    "title": "Service Delivery Manager",
    "categoryId": "cat-23",
    "categoryName": "Information Technology (IT)",
    "subcategoryId": "sub-23-4",
    "subcategoryName": "IT Operations",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-394",
    "title": "IT Support Manager",
    "categoryId": "cat-23",
    "categoryName": "Information Technology (IT)",
    "subcategoryId": "sub-23-4",
    "subcategoryName": "IT Operations",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-395",
    "title": "Helpdesk Manager",
    "categoryId": "cat-23",
    "categoryName": "Information Technology (IT)",
    "subcategoryId": "sub-23-4",
    "subcategoryName": "IT Operations",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-396",
    "title": "Enterprise Architect",
    "categoryId": "cat-23",
    "categoryName": "Information Technology (IT)",
    "subcategoryId": "sub-23-5",
    "subcategoryName": "Architecture",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-397",
    "title": "Solution Architect",
    "categoryId": "cat-23",
    "categoryName": "Information Technology (IT)",
    "subcategoryId": "sub-23-5",
    "subcategoryName": "Architecture",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-398",
    "title": "Cloud Architect",
    "categoryId": "cat-23",
    "categoryName": "Information Technology (IT)",
    "subcategoryId": "sub-23-5",
    "subcategoryName": "Architecture",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-399",
    "title": "Technical Architect",
    "categoryId": "cat-23",
    "categoryName": "Information Technology (IT)",
    "subcategoryId": "sub-23-5",
    "subcategoryName": "Architecture",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-400",
    "title": "Chief Engineer",
    "categoryId": "cat-24",
    "categoryName": "Engineering Services",
    "subcategoryId": "sub-24-1",
    "subcategoryName": "Engineering Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-401",
    "title": "Engineering Director",
    "categoryId": "cat-24",
    "categoryName": "Engineering Services",
    "subcategoryId": "sub-24-1",
    "subcategoryName": "Engineering Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-402",
    "title": "VP Engineering",
    "categoryId": "cat-24",
    "categoryName": "Engineering Services",
    "subcategoryId": "sub-24-1",
    "subcategoryName": "Engineering Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-403",
    "title": "Head of Engineering",
    "categoryId": "cat-24",
    "categoryName": "Engineering Services",
    "subcategoryId": "sub-24-1",
    "subcategoryName": "Engineering Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-404",
    "title": "Engineering Manager",
    "categoryId": "cat-24",
    "categoryName": "Engineering Services",
    "subcategoryId": "sub-24-1",
    "subcategoryName": "Engineering Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-405",
    "title": "Design Director",
    "categoryId": "cat-24",
    "categoryName": "Engineering Services",
    "subcategoryId": "sub-24-2",
    "subcategoryName": "Design Engineering",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-406",
    "title": "Mechanical Engineering Head",
    "categoryId": "cat-24",
    "categoryName": "Engineering Services",
    "subcategoryId": "sub-24-2",
    "subcategoryName": "Design Engineering",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-407",
    "title": "Electrical Engineering Head",
    "categoryId": "cat-24",
    "categoryName": "Engineering Services",
    "subcategoryId": "sub-24-2",
    "subcategoryName": "Design Engineering",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-408",
    "title": "Civil Engineering Head",
    "categoryId": "cat-24",
    "categoryName": "Engineering Services",
    "subcategoryId": "sub-24-2",
    "subcategoryName": "Design Engineering",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-409",
    "title": "Project Engineering Director",
    "categoryId": "cat-24",
    "categoryName": "Engineering Services",
    "subcategoryId": "sub-24-3",
    "subcategoryName": "Project Engineering",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-410",
    "title": "Project Engineer",
    "categoryId": "cat-24",
    "categoryName": "Engineering Services",
    "subcategoryId": "sub-24-3",
    "subcategoryName": "Project Engineering",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-411",
    "title": "Site Engineering Manager",
    "categoryId": "cat-24",
    "categoryName": "Engineering Services",
    "subcategoryId": "sub-24-3",
    "subcategoryName": "Project Engineering",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-412",
    "title": "Engineering Coordinator",
    "categoryId": "cat-24",
    "categoryName": "Engineering Services",
    "subcategoryId": "sub-24-3",
    "subcategoryName": "Project Engineering",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-413",
    "title": "Technical Services Director",
    "categoryId": "cat-24",
    "categoryName": "Engineering Services",
    "subcategoryId": "sub-24-4",
    "subcategoryName": "Technical Services",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-414",
    "title": "Technical Support Manager",
    "categoryId": "cat-24",
    "categoryName": "Engineering Services",
    "subcategoryId": "sub-24-4",
    "subcategoryName": "Technical Services",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-415",
    "title": "Engineering Consultant",
    "categoryId": "cat-24",
    "categoryName": "Engineering Services",
    "subcategoryId": "sub-24-4",
    "subcategoryName": "Technical Services",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-416",
    "title": "Principal Engineer",
    "categoryId": "cat-24",
    "categoryName": "Engineering Services",
    "subcategoryId": "sub-24-4",
    "subcategoryName": "Technical Services",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-417",
    "title": "Industrial Engineering Manager",
    "categoryId": "cat-24",
    "categoryName": "Engineering Services",
    "subcategoryId": "sub-24-5",
    "subcategoryName": "Industrial Engineering",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-418",
    "title": "Process Engineer",
    "categoryId": "cat-24",
    "categoryName": "Engineering Services",
    "subcategoryId": "sub-24-5",
    "subcategoryName": "Industrial Engineering",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-419",
    "title": "Manufacturing Engineer",
    "categoryId": "cat-24",
    "categoryName": "Engineering Services",
    "subcategoryId": "sub-24-5",
    "subcategoryName": "Industrial Engineering",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-420",
    "title": "Reliability Engineer",
    "categoryId": "cat-24",
    "categoryName": "Engineering Services",
    "subcategoryId": "sub-24-5",
    "subcategoryName": "Industrial Engineering",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-421",
    "title": "Chief Artificial Intelligence Officer (CAIO)",
    "categoryId": "cat-25",
    "categoryName": "Artificial Intelligence",
    "subcategoryId": "sub-25-1",
    "subcategoryName": "AI Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-422",
    "title": "Chief AI Officer",
    "categoryId": "cat-25",
    "categoryName": "Artificial Intelligence",
    "subcategoryId": "sub-25-1",
    "subcategoryName": "AI Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-423",
    "title": "AI Director",
    "categoryId": "cat-25",
    "categoryName": "Artificial Intelligence",
    "subcategoryId": "sub-25-1",
    "subcategoryName": "AI Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-424",
    "title": "VP Artificial Intelligence",
    "categoryId": "cat-25",
    "categoryName": "Artificial Intelligence",
    "subcategoryId": "sub-25-1",
    "subcategoryName": "AI Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-425",
    "title": "Head of AI",
    "categoryId": "cat-25",
    "categoryName": "Artificial Intelligence",
    "subcategoryId": "sub-25-1",
    "subcategoryName": "AI Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-426",
    "title": "AI Program Manager",
    "categoryId": "cat-25",
    "categoryName": "Artificial Intelligence",
    "subcategoryId": "sub-25-1",
    "subcategoryName": "AI Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-427",
    "title": "AI Engineering Director",
    "categoryId": "cat-25",
    "categoryName": "Artificial Intelligence",
    "subcategoryId": "sub-25-2",
    "subcategoryName": "AI Engineering",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-428",
    "title": "Machine Learning Director",
    "categoryId": "cat-25",
    "categoryName": "Artificial Intelligence",
    "subcategoryId": "sub-25-2",
    "subcategoryName": "AI Engineering",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-429",
    "title": "AI Engineering Manager",
    "categoryId": "cat-25",
    "categoryName": "Artificial Intelligence",
    "subcategoryId": "sub-25-2",
    "subcategoryName": "AI Engineering",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-430",
    "title": "Lead AI Engineer",
    "categoryId": "cat-25",
    "categoryName": "Artificial Intelligence",
    "subcategoryId": "sub-25-2",
    "subcategoryName": "AI Engineering",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-431",
    "title": "AI Solutions Architect",
    "categoryId": "cat-25",
    "categoryName": "Artificial Intelligence",
    "subcategoryId": "sub-25-2",
    "subcategoryName": "AI Engineering",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-432",
    "title": "AI Research Director",
    "categoryId": "cat-25",
    "categoryName": "Artificial Intelligence",
    "subcategoryId": "sub-25-3",
    "subcategoryName": "AI Research",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-433",
    "title": "Principal AI Scientist",
    "categoryId": "cat-25",
    "categoryName": "Artificial Intelligence",
    "subcategoryId": "sub-25-3",
    "subcategoryName": "AI Research",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-434",
    "title": "AI Research Lead",
    "categoryId": "cat-25",
    "categoryName": "Artificial Intelligence",
    "subcategoryId": "sub-25-3",
    "subcategoryName": "AI Research",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-435",
    "title": "Generative AI Head",
    "categoryId": "cat-25",
    "categoryName": "Artificial Intelligence",
    "subcategoryId": "sub-25-3",
    "subcategoryName": "AI Research",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-436",
    "title": "NLP Research Lead",
    "categoryId": "cat-25",
    "categoryName": "Artificial Intelligence",
    "subcategoryId": "sub-25-3",
    "subcategoryName": "AI Research",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-437",
    "title": "AI Ethics Officer",
    "categoryId": "cat-25",
    "categoryName": "Artificial Intelligence",
    "subcategoryId": "sub-25-4",
    "subcategoryName": "Responsible AI",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-438",
    "title": "Responsible AI Lead",
    "categoryId": "cat-25",
    "categoryName": "Artificial Intelligence",
    "subcategoryId": "sub-25-4",
    "subcategoryName": "Responsible AI",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-439",
    "title": "AI Governance Manager",
    "categoryId": "cat-25",
    "categoryName": "Artificial Intelligence",
    "subcategoryId": "sub-25-4",
    "subcategoryName": "Responsible AI",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-440",
    "title": "AI Risk Manager",
    "categoryId": "cat-25",
    "categoryName": "Artificial Intelligence",
    "subcategoryId": "sub-25-4",
    "subcategoryName": "Responsible AI",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-441",
    "title": "MLOps Director",
    "categoryId": "cat-25",
    "categoryName": "Artificial Intelligence",
    "subcategoryId": "sub-25-5",
    "subcategoryName": "AI Operations",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-442",
    "title": "AI Platform Manager",
    "categoryId": "cat-25",
    "categoryName": "Artificial Intelligence",
    "subcategoryId": "sub-25-5",
    "subcategoryName": "AI Operations",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-443",
    "title": "AI Deployment Lead",
    "categoryId": "cat-25",
    "categoryName": "Artificial Intelligence",
    "subcategoryId": "sub-25-5",
    "subcategoryName": "AI Operations",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-444",
    "title": "AI Product Manager",
    "categoryId": "cat-25",
    "categoryName": "Artificial Intelligence",
    "subcategoryId": "sub-25-5",
    "subcategoryName": "AI Operations",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-445",
    "title": "Chief Data Officer (CDO)",
    "categoryId": "cat-26",
    "categoryName": "Data, Analytics & Business Intelligence",
    "subcategoryId": "sub-26-1",
    "subcategoryName": "Data Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-446",
    "title": "Chief Analytics Officer",
    "categoryId": "cat-26",
    "categoryName": "Data, Analytics & Business Intelligence",
    "subcategoryId": "sub-26-1",
    "subcategoryName": "Data Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-447",
    "title": "Data Director",
    "categoryId": "cat-26",
    "categoryName": "Data, Analytics & Business Intelligence",
    "subcategoryId": "sub-26-1",
    "subcategoryName": "Data Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-448",
    "title": "Head of Data",
    "categoryId": "cat-26",
    "categoryName": "Data, Analytics & Business Intelligence",
    "subcategoryId": "sub-26-1",
    "subcategoryName": "Data Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-449",
    "title": "Data Governance Head",
    "categoryId": "cat-26",
    "categoryName": "Data, Analytics & Business Intelligence",
    "subcategoryId": "sub-26-1",
    "subcategoryName": "Data Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-450",
    "title": "Data Engineering Director",
    "categoryId": "cat-26",
    "categoryName": "Data, Analytics & Business Intelligence",
    "subcategoryId": "sub-26-2",
    "subcategoryName": "Data Engineering",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-451",
    "title": "Data Architect",
    "categoryId": "cat-26",
    "categoryName": "Data, Analytics & Business Intelligence",
    "subcategoryId": "sub-26-2",
    "subcategoryName": "Data Engineering",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-452",
    "title": "Data Platform Manager",
    "categoryId": "cat-26",
    "categoryName": "Data, Analytics & Business Intelligence",
    "subcategoryId": "sub-26-2",
    "subcategoryName": "Data Engineering",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-453",
    "title": "Database Administrator",
    "categoryId": "cat-26",
    "categoryName": "Data, Analytics & Business Intelligence",
    "subcategoryId": "sub-26-2",
    "subcategoryName": "Data Engineering",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-454",
    "title": "Big Data Manager",
    "categoryId": "cat-26",
    "categoryName": "Data, Analytics & Business Intelligence",
    "subcategoryId": "sub-26-2",
    "subcategoryName": "Data Engineering",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-455",
    "title": "Analytics Director",
    "categoryId": "cat-26",
    "categoryName": "Data, Analytics & Business Intelligence",
    "subcategoryId": "sub-26-3",
    "subcategoryName": "Analytics",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-456",
    "title": "Business Intelligence Director",
    "categoryId": "cat-26",
    "categoryName": "Data, Analytics & Business Intelligence",
    "subcategoryId": "sub-26-3",
    "subcategoryName": "Analytics",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-457",
    "title": "BI Manager",
    "categoryId": "cat-26",
    "categoryName": "Data, Analytics & Business Intelligence",
    "subcategoryId": "sub-26-3",
    "subcategoryName": "Analytics",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-458",
    "title": "Data Science Director",
    "categoryId": "cat-26",
    "categoryName": "Data, Analytics & Business Intelligence",
    "subcategoryId": "sub-26-3",
    "subcategoryName": "Analytics",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-459",
    "title": "Senior Data Scientist",
    "categoryId": "cat-26",
    "categoryName": "Data, Analytics & Business Intelligence",
    "subcategoryId": "sub-26-3",
    "subcategoryName": "Analytics",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-460",
    "title": "Reporting Manager",
    "categoryId": "cat-26",
    "categoryName": "Data, Analytics & Business Intelligence",
    "subcategoryId": "sub-26-4",
    "subcategoryName": "Reporting",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-461",
    "title": "Dashboard Lead",
    "categoryId": "cat-26",
    "categoryName": "Data, Analytics & Business Intelligence",
    "subcategoryId": "sub-26-4",
    "subcategoryName": "Reporting",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-462",
    "title": "Insights Manager",
    "categoryId": "cat-26",
    "categoryName": "Data, Analytics & Business Intelligence",
    "subcategoryId": "sub-26-4",
    "subcategoryName": "Reporting",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-463",
    "title": "MIS Manager",
    "categoryId": "cat-26",
    "categoryName": "Data, Analytics & Business Intelligence",
    "subcategoryId": "sub-26-4",
    "subcategoryName": "Reporting",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-464",
    "title": "Master Data Manager",
    "categoryId": "cat-26",
    "categoryName": "Data, Analytics & Business Intelligence",
    "subcategoryId": "sub-26-5",
    "subcategoryName": "Governance",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-465",
    "title": "Data Quality Manager",
    "categoryId": "cat-26",
    "categoryName": "Data, Analytics & Business Intelligence",
    "subcategoryId": "sub-26-5",
    "subcategoryName": "Governance",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-466",
    "title": "Metadata Manager",
    "categoryId": "cat-26",
    "categoryName": "Data, Analytics & Business Intelligence",
    "subcategoryId": "sub-26-5",
    "subcategoryName": "Governance",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-467",
    "title": "Data Steward",
    "categoryId": "cat-26",
    "categoryName": "Data, Analytics & Business Intelligence",
    "subcategoryId": "sub-26-5",
    "subcategoryName": "Governance",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-468",
    "title": "Chief Product Officer (CPO)",
    "categoryId": "cat-27",
    "categoryName": "Product Management",
    "subcategoryId": "sub-27-1",
    "subcategoryName": "Product Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-469",
    "title": "VP Product",
    "categoryId": "cat-27",
    "categoryName": "Product Management",
    "subcategoryId": "sub-27-1",
    "subcategoryName": "Product Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-470",
    "title": "Product Director",
    "categoryId": "cat-27",
    "categoryName": "Product Management",
    "subcategoryId": "sub-27-1",
    "subcategoryName": "Product Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-471",
    "title": "Head of Product",
    "categoryId": "cat-27",
    "categoryName": "Product Management",
    "subcategoryId": "sub-27-1",
    "subcategoryName": "Product Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-472",
    "title": "Product Portfolio Director",
    "categoryId": "cat-27",
    "categoryName": "Product Management",
    "subcategoryId": "sub-27-1",
    "subcategoryName": "Product Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-473",
    "title": "Product Strategy Director",
    "categoryId": "cat-27",
    "categoryName": "Product Management",
    "subcategoryId": "sub-27-2",
    "subcategoryName": "Product Strategy",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-474",
    "title": "Product Planning Manager",
    "categoryId": "cat-27",
    "categoryName": "Product Management",
    "subcategoryId": "sub-27-2",
    "subcategoryName": "Product Strategy",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-475",
    "title": "Product Roadmap Lead",
    "categoryId": "cat-27",
    "categoryName": "Product Management",
    "subcategoryId": "sub-27-2",
    "subcategoryName": "Product Strategy",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-476",
    "title": "Portfolio Manager",
    "categoryId": "cat-27",
    "categoryName": "Product Management",
    "subcategoryId": "sub-27-2",
    "subcategoryName": "Product Strategy",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-477",
    "title": "Senior Product Manager",
    "categoryId": "cat-27",
    "categoryName": "Product Management",
    "subcategoryId": "sub-27-3",
    "subcategoryName": "Product Operations",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-478",
    "title": "Product Manager",
    "categoryId": "cat-27",
    "categoryName": "Product Management",
    "subcategoryId": "sub-27-3",
    "subcategoryName": "Product Operations",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-479",
    "title": "Associate Product Manager",
    "categoryId": "cat-27",
    "categoryName": "Product Management",
    "subcategoryId": "sub-27-3",
    "subcategoryName": "Product Operations",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-480",
    "title": "Product Owner",
    "categoryId": "cat-27",
    "categoryName": "Product Management",
    "subcategoryId": "sub-27-3",
    "subcategoryName": "Product Operations",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-481",
    "title": "Platform Manager",
    "categoryId": "cat-27",
    "categoryName": "Product Management",
    "subcategoryId": "sub-27-3",
    "subcategoryName": "Product Operations",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-482",
    "title": "Release Manager",
    "categoryId": "cat-27",
    "categoryName": "Product Management",
    "subcategoryId": "sub-27-4",
    "subcategoryName": "Product Delivery",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-483",
    "title": "Product Delivery Manager",
    "categoryId": "cat-27",
    "categoryName": "Product Management",
    "subcategoryId": "sub-27-4",
    "subcategoryName": "Product Delivery",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-484",
    "title": "Go-to-Market Manager",
    "categoryId": "cat-27",
    "categoryName": "Product Management",
    "subcategoryId": "sub-27-4",
    "subcategoryName": "Product Delivery",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-485",
    "title": "Product Marketing Manager",
    "categoryId": "cat-27",
    "categoryName": "Product Management",
    "subcategoryId": "sub-27-4",
    "subcategoryName": "Product Delivery",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-486",
    "title": "UX Product Lead",
    "categoryId": "cat-27",
    "categoryName": "Product Management",
    "subcategoryId": "sub-27-5",
    "subcategoryName": "Product Experience",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-487",
    "title": "Product Analyst",
    "categoryId": "cat-27",
    "categoryName": "Product Management",
    "subcategoryId": "sub-27-5",
    "subcategoryName": "Product Experience",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-488",
    "title": "Feature Manager",
    "categoryId": "cat-27",
    "categoryName": "Product Management",
    "subcategoryId": "sub-27-5",
    "subcategoryName": "Product Experience",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-489",
    "title": "Product Success Manager",
    "categoryId": "cat-27",
    "categoryName": "Product Management",
    "subcategoryId": "sub-27-5",
    "subcategoryName": "Product Experience",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-490",
    "title": "Chief Innovation Officer (CINO)",
    "categoryId": "cat-28",
    "categoryName": "Innovation",
    "subcategoryId": "sub-28-1",
    "subcategoryName": "Innovation Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-491",
    "title": "Innovation Director",
    "categoryId": "cat-28",
    "categoryName": "Innovation",
    "subcategoryId": "sub-28-1",
    "subcategoryName": "Innovation Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-492",
    "title": "Head of Innovation",
    "categoryId": "cat-28",
    "categoryName": "Innovation",
    "subcategoryId": "sub-28-1",
    "subcategoryName": "Innovation Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-493",
    "title": "Innovation Manager",
    "categoryId": "cat-28",
    "categoryName": "Innovation",
    "subcategoryId": "sub-28-1",
    "subcategoryName": "Innovation Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-494",
    "title": "Innovation Lab Director",
    "categoryId": "cat-28",
    "categoryName": "Innovation",
    "subcategoryId": "sub-28-2",
    "subcategoryName": "Innovation Labs",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-495",
    "title": "Research Innovation Lead",
    "categoryId": "cat-28",
    "categoryName": "Innovation",
    "subcategoryId": "sub-28-2",
    "subcategoryName": "Innovation Labs",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-496",
    "title": "Technology Innovation Manager",
    "categoryId": "cat-28",
    "categoryName": "Innovation",
    "subcategoryId": "sub-28-2",
    "subcategoryName": "Innovation Labs",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-497",
    "title": "Innovation Consultant",
    "categoryId": "cat-28",
    "categoryName": "Innovation",
    "subcategoryId": "sub-28-2",
    "subcategoryName": "Innovation Labs",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-498",
    "title": "Future Technologies Director",
    "categoryId": "cat-28",
    "categoryName": "Innovation",
    "subcategoryId": "sub-28-3",
    "subcategoryName": "Emerging Innovation",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-499",
    "title": "Open Innovation Manager",
    "categoryId": "cat-28",
    "categoryName": "Innovation",
    "subcategoryId": "sub-28-3",
    "subcategoryName": "Emerging Innovation",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-500",
    "title": "Innovation Partnerships Head",
    "categoryId": "cat-28",
    "categoryName": "Innovation",
    "subcategoryId": "sub-28-3",
    "subcategoryName": "Emerging Innovation",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-501",
    "title": "Venture Innovation Lead",
    "categoryId": "cat-28",
    "categoryName": "Innovation",
    "subcategoryId": "sub-28-3",
    "subcategoryName": "Emerging Innovation",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-502",
    "title": "Innovation Program Manager",
    "categoryId": "cat-28",
    "categoryName": "Innovation",
    "subcategoryId": "sub-28-4",
    "subcategoryName": "Innovation Programs",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-503",
    "title": "Incubation Manager",
    "categoryId": "cat-28",
    "categoryName": "Innovation",
    "subcategoryId": "sub-28-4",
    "subcategoryName": "Innovation Programs",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-504",
    "title": "Accelerator Program Lead",
    "categoryId": "cat-28",
    "categoryName": "Innovation",
    "subcategoryId": "sub-28-4",
    "subcategoryName": "Innovation Programs",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-505",
    "title": "Corporate Innovation Lead",
    "categoryId": "cat-28",
    "categoryName": "Innovation",
    "subcategoryId": "sub-28-4",
    "subcategoryName": "Innovation Programs",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-506",
    "title": "Chief Customer Officer (CCO)",
    "categoryId": "cat-29",
    "categoryName": "Customer Experience",
    "subcategoryId": "sub-29-1",
    "subcategoryName": "Customer Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-507",
    "title": "Customer Experience Director",
    "categoryId": "cat-29",
    "categoryName": "Customer Experience",
    "subcategoryId": "sub-29-1",
    "subcategoryName": "Customer Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-508",
    "title": "Head of Customer Experience",
    "categoryId": "cat-29",
    "categoryName": "Customer Experience",
    "subcategoryId": "sub-29-1",
    "subcategoryName": "Customer Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-509",
    "title": "Customer Success Director",
    "categoryId": "cat-29",
    "categoryName": "Customer Experience",
    "subcategoryId": "sub-29-1",
    "subcategoryName": "Customer Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-510",
    "title": "Customer Service Director",
    "categoryId": "cat-29",
    "categoryName": "Customer Experience",
    "subcategoryId": "sub-29-2",
    "subcategoryName": "Customer Operations",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-511",
    "title": "Service Excellence Manager",
    "categoryId": "cat-29",
    "categoryName": "Customer Experience",
    "subcategoryId": "sub-29-2",
    "subcategoryName": "Customer Operations",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-512",
    "title": "Customer Support Manager",
    "categoryId": "cat-29",
    "categoryName": "Customer Experience",
    "subcategoryId": "sub-29-2",
    "subcategoryName": "Customer Operations",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-513",
    "title": "Contact Center Director",
    "categoryId": "cat-29",
    "categoryName": "Customer Experience",
    "subcategoryId": "sub-29-2",
    "subcategoryName": "Customer Operations",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-514",
    "title": "Customer Insights Director",
    "categoryId": "cat-29",
    "categoryName": "Customer Experience",
    "subcategoryId": "sub-29-3",
    "subcategoryName": "Customer Insights",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-515",
    "title": "Voice of Customer Manager",
    "categoryId": "cat-29",
    "categoryName": "Customer Experience",
    "subcategoryId": "sub-29-3",
    "subcategoryName": "Customer Insights",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-516",
    "title": "Customer Research Lead",
    "categoryId": "cat-29",
    "categoryName": "Customer Experience",
    "subcategoryId": "sub-29-3",
    "subcategoryName": "Customer Insights",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-517",
    "title": "Customer Analytics Manager",
    "categoryId": "cat-29",
    "categoryName": "Customer Experience",
    "subcategoryId": "sub-29-3",
    "subcategoryName": "Customer Insights",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-518",
    "title": "CRM Director",
    "categoryId": "cat-29",
    "categoryName": "Customer Experience",
    "subcategoryId": "sub-29-4",
    "subcategoryName": "CRM",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-519",
    "title": "CRM Manager",
    "categoryId": "cat-29",
    "categoryName": "Customer Experience",
    "subcategoryId": "sub-29-4",
    "subcategoryName": "CRM",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-520",
    "title": "Loyalty Program Manager",
    "categoryId": "cat-29",
    "categoryName": "Customer Experience",
    "subcategoryId": "sub-29-4",
    "subcategoryName": "CRM",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-521",
    "title": "Customer Engagement Manager",
    "categoryId": "cat-29",
    "categoryName": "Customer Experience",
    "subcategoryId": "sub-29-4",
    "subcategoryName": "CRM",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-522",
    "title": "Chief Program Officer",
    "categoryId": "cat-30",
    "categoryName": "Program Management",
    "subcategoryId": "sub-30-1",
    "subcategoryName": "PMO Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-523",
    "title": "PMO Director",
    "categoryId": "cat-30",
    "categoryName": "Program Management",
    "subcategoryId": "sub-30-1",
    "subcategoryName": "PMO Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-524",
    "title": "Head of PMO",
    "categoryId": "cat-30",
    "categoryName": "Program Management",
    "subcategoryId": "sub-30-1",
    "subcategoryName": "PMO Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-525",
    "title": "PMO Manager",
    "categoryId": "cat-30",
    "categoryName": "Program Management",
    "subcategoryId": "sub-30-1",
    "subcategoryName": "PMO Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-526",
    "title": "Program Director",
    "categoryId": "cat-30",
    "categoryName": "Program Management",
    "subcategoryId": "sub-30-2",
    "subcategoryName": "Program Delivery",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-527",
    "title": "Senior Program Manager",
    "categoryId": "cat-30",
    "categoryName": "Program Management",
    "subcategoryId": "sub-30-2",
    "subcategoryName": "Program Delivery",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-528",
    "title": "Program Manager",
    "categoryId": "cat-30",
    "categoryName": "Program Management",
    "subcategoryId": "sub-30-2",
    "subcategoryName": "Program Delivery",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-529",
    "title": "Program Coordinator",
    "categoryId": "cat-30",
    "categoryName": "Program Management",
    "subcategoryId": "sub-30-2",
    "subcategoryName": "Program Delivery",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-530",
    "title": "Portfolio Director",
    "categoryId": "cat-30",
    "categoryName": "Program Management",
    "subcategoryId": "sub-30-3",
    "subcategoryName": "Portfolio Management",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-531",
    "title": "Portfolio Manager",
    "categoryId": "cat-30",
    "categoryName": "Program Management",
    "subcategoryId": "sub-30-3",
    "subcategoryName": "Portfolio Management",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-532",
    "title": "Governance Manager",
    "categoryId": "cat-30",
    "categoryName": "Program Management",
    "subcategoryId": "sub-30-3",
    "subcategoryName": "Portfolio Management",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-533",
    "title": "Benefits Realization Manager",
    "categoryId": "cat-30",
    "categoryName": "Program Management",
    "subcategoryId": "sub-30-3",
    "subcategoryName": "Portfolio Management",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-534",
    "title": "Scrum Master",
    "categoryId": "cat-30",
    "categoryName": "Program Management",
    "subcategoryId": "sub-30-4",
    "subcategoryName": "Agile Delivery",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-535",
    "title": "Agile Coach",
    "categoryId": "cat-30",
    "categoryName": "Program Management",
    "subcategoryId": "sub-30-4",
    "subcategoryName": "Agile Delivery",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-536",
    "title": "Delivery Lead",
    "categoryId": "cat-30",
    "categoryName": "Program Management",
    "subcategoryId": "sub-30-4",
    "subcategoryName": "Agile Delivery",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-537",
    "title": "Release Train Engineer",
    "categoryId": "cat-30",
    "categoryName": "Program Management",
    "subcategoryId": "sub-30-4",
    "subcategoryName": "Agile Delivery",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-538",
    "title": "Founder",
    "categoryId": "cat-31",
    "categoryName": "Startup",
    "subcategoryId": "sub-31-1",
    "subcategoryName": "Startup Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-539",
    "title": "Co-Founder",
    "categoryId": "cat-31",
    "categoryName": "Startup",
    "subcategoryId": "sub-31-1",
    "subcategoryName": "Startup Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-540",
    "title": "Startup CEO",
    "categoryId": "cat-31",
    "categoryName": "Startup",
    "subcategoryId": "sub-31-1",
    "subcategoryName": "Startup Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-541",
    "title": "Startup COO",
    "categoryId": "cat-31",
    "categoryName": "Startup",
    "subcategoryId": "sub-31-1",
    "subcategoryName": "Startup Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-542",
    "title": "Startup CTO",
    "categoryId": "cat-31",
    "categoryName": "Startup",
    "subcategoryId": "sub-31-1",
    "subcategoryName": "Startup Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-543",
    "title": "Venture Director",
    "categoryId": "cat-31",
    "categoryName": "Startup",
    "subcategoryId": "sub-31-2",
    "subcategoryName": "Venture Growth",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-544",
    "title": "Startup Growth Head",
    "categoryId": "cat-31",
    "categoryName": "Startup",
    "subcategoryId": "sub-31-2",
    "subcategoryName": "Venture Growth",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-545",
    "title": "Business Scaling Manager",
    "categoryId": "cat-31",
    "categoryName": "Startup",
    "subcategoryId": "sub-31-2",
    "subcategoryName": "Venture Growth",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-546",
    "title": "Startup Advisor",
    "categoryId": "cat-31",
    "categoryName": "Startup",
    "subcategoryId": "sub-31-2",
    "subcategoryName": "Venture Growth",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-547",
    "title": "Angel Investor",
    "categoryId": "cat-31",
    "categoryName": "Startup",
    "subcategoryId": "sub-31-3",
    "subcategoryName": "Investment",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-548",
    "title": "Venture Capital Partner",
    "categoryId": "cat-31",
    "categoryName": "Startup",
    "subcategoryId": "sub-31-3",
    "subcategoryName": "Investment",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-549",
    "title": "Managing Partner",
    "categoryId": "cat-31",
    "categoryName": "Startup",
    "subcategoryId": "sub-31-3",
    "subcategoryName": "Investment",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-550",
    "title": "Investment Manager",
    "categoryId": "cat-31",
    "categoryName": "Startup",
    "subcategoryId": "sub-31-3",
    "subcategoryName": "Investment",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-551",
    "title": "Incubator Director",
    "categoryId": "cat-31",
    "categoryName": "Startup",
    "subcategoryId": "sub-31-4",
    "subcategoryName": "Incubation",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-552",
    "title": "Accelerator Director",
    "categoryId": "cat-31",
    "categoryName": "Startup",
    "subcategoryId": "sub-31-4",
    "subcategoryName": "Incubation",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-553",
    "title": "Innovation Mentor",
    "categoryId": "cat-31",
    "categoryName": "Startup",
    "subcategoryId": "sub-31-4",
    "subcategoryName": "Incubation",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-554",
    "title": "Startup Ecosystem Lead",
    "categoryId": "cat-31",
    "categoryName": "Startup",
    "subcategoryId": "sub-31-4",
    "subcategoryName": "Incubation",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-555",
    "title": "Chief Cloud Officer",
    "categoryId": "cat-32",
    "categoryName": "Cloud Computing & Digital Infrastructure",
    "subcategoryId": "sub-32-1",
    "subcategoryName": "Cloud Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-556",
    "title": "Cloud Director",
    "categoryId": "cat-32",
    "categoryName": "Cloud Computing & Digital Infrastructure",
    "subcategoryId": "sub-32-1",
    "subcategoryName": "Cloud Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-557",
    "title": "Head of Cloud",
    "categoryId": "cat-32",
    "categoryName": "Cloud Computing & Digital Infrastructure",
    "subcategoryId": "sub-32-1",
    "subcategoryName": "Cloud Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-558",
    "title": "Cloud Operations Manager",
    "categoryId": "cat-32",
    "categoryName": "Cloud Computing & Digital Infrastructure",
    "subcategoryId": "sub-32-1",
    "subcategoryName": "Cloud Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-559",
    "title": "Cloud Architect",
    "categoryId": "cat-32",
    "categoryName": "Cloud Computing & Digital Infrastructure",
    "subcategoryId": "sub-32-2",
    "subcategoryName": "Cloud Architecture",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-560",
    "title": "Enterprise Cloud Architect",
    "categoryId": "cat-32",
    "categoryName": "Cloud Computing & Digital Infrastructure",
    "subcategoryId": "sub-32-2",
    "subcategoryName": "Cloud Architecture",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-561",
    "title": "Solutions Architect",
    "categoryId": "cat-32",
    "categoryName": "Cloud Computing & Digital Infrastructure",
    "subcategoryId": "sub-32-2",
    "subcategoryName": "Cloud Architecture",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-562",
    "title": "Infrastructure Architect",
    "categoryId": "cat-32",
    "categoryName": "Cloud Computing & Digital Infrastructure",
    "subcategoryId": "sub-32-2",
    "subcategoryName": "Cloud Architecture",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-563",
    "title": "Infrastructure Director",
    "categoryId": "cat-32",
    "categoryName": "Cloud Computing & Digital Infrastructure",
    "subcategoryId": "sub-32-3",
    "subcategoryName": "Infrastructure",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-564",
    "title": "Network Infrastructure Manager",
    "categoryId": "cat-32",
    "categoryName": "Cloud Computing & Digital Infrastructure",
    "subcategoryId": "sub-32-3",
    "subcategoryName": "Infrastructure",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-565",
    "title": "Data Center Manager",
    "categoryId": "cat-32",
    "categoryName": "Cloud Computing & Digital Infrastructure",
    "subcategoryId": "sub-32-3",
    "subcategoryName": "Infrastructure",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-566",
    "title": "Platform Engineering Lead",
    "categoryId": "cat-32",
    "categoryName": "Cloud Computing & Digital Infrastructure",
    "subcategoryId": "sub-32-3",
    "subcategoryName": "Infrastructure",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-567",
    "title": "DevOps Director",
    "categoryId": "cat-32",
    "categoryName": "Cloud Computing & Digital Infrastructure",
    "subcategoryId": "sub-32-4",
    "subcategoryName": "DevOps & SRE",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-568",
    "title": "Site Reliability Engineering Lead",
    "categoryId": "cat-32",
    "categoryName": "Cloud Computing & Digital Infrastructure",
    "subcategoryId": "sub-32-4",
    "subcategoryName": "DevOps & SRE",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-569",
    "title": "Platform Reliability Manager",
    "categoryId": "cat-32",
    "categoryName": "Cloud Computing & Digital Infrastructure",
    "subcategoryId": "sub-32-4",
    "subcategoryName": "DevOps & SRE",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-570",
    "title": "Infrastructure Automation Lead",
    "categoryId": "cat-32",
    "categoryName": "Cloud Computing & Digital Infrastructure",
    "subcategoryId": "sub-32-4",
    "subcategoryName": "DevOps & SRE",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-571",
    "title": "Chief Technology Innovation Officer",
    "categoryId": "cat-33",
    "categoryName": "Emerging Technologies & Automation",
    "subcategoryId": "sub-33-1",
    "subcategoryName": "Emerging Technology Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-572",
    "title": "Emerging Technologies Director",
    "categoryId": "cat-33",
    "categoryName": "Emerging Technologies & Automation",
    "subcategoryId": "sub-33-1",
    "subcategoryName": "Emerging Technology Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-573",
    "title": "Head of Emerging Technologies",
    "categoryId": "cat-33",
    "categoryName": "Emerging Technologies & Automation",
    "subcategoryId": "sub-33-1",
    "subcategoryName": "Emerging Technology Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-574",
    "title": "Innovation Technology Manager",
    "categoryId": "cat-33",
    "categoryName": "Emerging Technologies & Automation",
    "subcategoryId": "sub-33-1",
    "subcategoryName": "Emerging Technology Leadership",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-575",
    "title": "Automation Director",
    "categoryId": "cat-33",
    "categoryName": "Emerging Technologies & Automation",
    "subcategoryId": "sub-33-2",
    "subcategoryName": "Automation",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-576",
    "title": "Intelligent Automation Manager",
    "categoryId": "cat-33",
    "categoryName": "Emerging Technologies & Automation",
    "subcategoryId": "sub-33-2",
    "subcategoryName": "Automation",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-577",
    "title": "Robotics Process Automation (RPA) Lead",
    "categoryId": "cat-33",
    "categoryName": "Emerging Technologies & Automation",
    "subcategoryId": "sub-33-2",
    "subcategoryName": "Automation",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-578",
    "title": "Hyperautomation Manager",
    "categoryId": "cat-33",
    "categoryName": "Emerging Technologies & Automation",
    "subcategoryId": "sub-33-2",
    "subcategoryName": "Automation",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-579",
    "title": "Robotics Director",
    "categoryId": "cat-33",
    "categoryName": "Emerging Technologies & Automation",
    "subcategoryId": "sub-33-3",
    "subcategoryName": "Future Technologies",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-580",
    "title": "IoT Director",
    "categoryId": "cat-33",
    "categoryName": "Emerging Technologies & Automation",
    "subcategoryId": "sub-33-3",
    "subcategoryName": "Future Technologies",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-581",
    "title": "Blockchain Director",
    "categoryId": "cat-33",
    "categoryName": "Emerging Technologies & Automation",
    "subcategoryId": "sub-33-3",
    "subcategoryName": "Future Technologies",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-582",
    "title": "Quantum Computing Lead",
    "categoryId": "cat-33",
    "categoryName": "Emerging Technologies & Automation",
    "subcategoryId": "sub-33-3",
    "subcategoryName": "Future Technologies",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-583",
    "title": "Digital Twin Manager",
    "categoryId": "cat-33",
    "categoryName": "Emerging Technologies & Automation",
    "subcategoryId": "sub-33-3",
    "subcategoryName": "Future Technologies",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-584",
    "title": "Industry 4.0 Director",
    "categoryId": "cat-33",
    "categoryName": "Emerging Technologies & Automation",
    "subcategoryId": "sub-33-4",
    "subcategoryName": "Smart Industry",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-585",
    "title": "Smart Manufacturing Lead",
    "categoryId": "cat-33",
    "categoryName": "Emerging Technologies & Automation",
    "subcategoryId": "sub-33-4",
    "subcategoryName": "Smart Industry",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-586",
    "title": "Industrial Automation Head",
    "categoryId": "cat-33",
    "categoryName": "Emerging Technologies & Automation",
    "subcategoryId": "sub-33-4",
    "subcategoryName": "Smart Industry",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-587",
    "title": "Advanced Technology Strategist",
    "categoryId": "cat-33",
    "categoryName": "Emerging Technologies & Automation",
    "subcategoryId": "sub-33-4",
    "subcategoryName": "Smart Industry",
    "groupName": "Technology, AI & Innovation"
  },
  {
    "id": "t-588",
    "title": "Chief Human Resources Officer (CHRO)",
    "categoryId": "cat-34",
    "categoryName": "Human Resources (HR)",
    "subcategoryId": "sub-34-1",
    "subcategoryName": "HR Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-589",
    "title": "Chief People Officer (CPO)",
    "categoryId": "cat-34",
    "categoryName": "Human Resources (HR)",
    "subcategoryId": "sub-34-1",
    "subcategoryName": "HR Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-590",
    "title": "VP Human Resources",
    "categoryId": "cat-34",
    "categoryName": "Human Resources (HR)",
    "subcategoryId": "sub-34-1",
    "subcategoryName": "HR Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-591",
    "title": "HR Director",
    "categoryId": "cat-34",
    "categoryName": "Human Resources (HR)",
    "subcategoryId": "sub-34-1",
    "subcategoryName": "HR Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-592",
    "title": "Head of Human Resources",
    "categoryId": "cat-34",
    "categoryName": "Human Resources (HR)",
    "subcategoryId": "sub-34-1",
    "subcategoryName": "HR Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-593",
    "title": "HR Business Partner",
    "categoryId": "cat-34",
    "categoryName": "Human Resources (HR)",
    "subcategoryId": "sub-34-1",
    "subcategoryName": "HR Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-594",
    "title": "HR Operations Director",
    "categoryId": "cat-34",
    "categoryName": "Human Resources (HR)",
    "subcategoryId": "sub-34-2",
    "subcategoryName": "HR Operations",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-595",
    "title": "HR Operations Manager",
    "categoryId": "cat-34",
    "categoryName": "Human Resources (HR)",
    "subcategoryId": "sub-34-2",
    "subcategoryName": "HR Operations",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-596",
    "title": "HR Shared Services Head",
    "categoryId": "cat-34",
    "categoryName": "Human Resources (HR)",
    "subcategoryId": "sub-34-2",
    "subcategoryName": "HR Operations",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-597",
    "title": "HR General Manager",
    "categoryId": "cat-34",
    "categoryName": "Human Resources (HR)",
    "subcategoryId": "sub-34-2",
    "subcategoryName": "HR Operations",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-598",
    "title": "HR Executive",
    "categoryId": "cat-34",
    "categoryName": "Human Resources (HR)",
    "subcategoryId": "sub-34-2",
    "subcategoryName": "HR Operations",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-599",
    "title": "Compensation Director",
    "categoryId": "cat-34",
    "categoryName": "Human Resources (HR)",
    "subcategoryId": "sub-34-3",
    "subcategoryName": "Compensation & Benefits",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-600",
    "title": "Benefits Director",
    "categoryId": "cat-34",
    "categoryName": "Human Resources (HR)",
    "subcategoryId": "sub-34-3",
    "subcategoryName": "Compensation & Benefits",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-601",
    "title": "Payroll Manager",
    "categoryId": "cat-34",
    "categoryName": "Human Resources (HR)",
    "subcategoryId": "sub-34-3",
    "subcategoryName": "Compensation & Benefits",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-602",
    "title": "Rewards Manager",
    "categoryId": "cat-34",
    "categoryName": "Human Resources (HR)",
    "subcategoryId": "sub-34-3",
    "subcategoryName": "Compensation & Benefits",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-603",
    "title": "Compensation Analyst",
    "categoryId": "cat-34",
    "categoryName": "Human Resources (HR)",
    "subcategoryId": "sub-34-3",
    "subcategoryName": "Compensation & Benefits",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-604",
    "title": "Employee Relations Director",
    "categoryId": "cat-34",
    "categoryName": "Human Resources (HR)",
    "subcategoryId": "sub-34-4",
    "subcategoryName": "Employee Relations",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-605",
    "title": "Industrial Relations Head",
    "categoryId": "cat-34",
    "categoryName": "Human Resources (HR)",
    "subcategoryId": "sub-34-4",
    "subcategoryName": "Employee Relations",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-606",
    "title": "Employee Relations Manager",
    "categoryId": "cat-34",
    "categoryName": "Human Resources (HR)",
    "subcategoryId": "sub-34-4",
    "subcategoryName": "Employee Relations",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-607",
    "title": "Labour Relations Manager",
    "categoryId": "cat-34",
    "categoryName": "Human Resources (HR)",
    "subcategoryId": "sub-34-4",
    "subcategoryName": "Employee Relations",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-608",
    "title": "Workforce Planning Director",
    "categoryId": "cat-34",
    "categoryName": "Human Resources (HR)",
    "subcategoryId": "sub-34-5",
    "subcategoryName": "HR Strategy",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-609",
    "title": "HR Analytics Manager",
    "categoryId": "cat-34",
    "categoryName": "Human Resources (HR)",
    "subcategoryId": "sub-34-5",
    "subcategoryName": "HR Strategy",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-610",
    "title": "HR Transformation Lead",
    "categoryId": "cat-34",
    "categoryName": "Human Resources (HR)",
    "subcategoryId": "sub-34-5",
    "subcategoryName": "HR Strategy",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-611",
    "title": "People Strategy Manager",
    "categoryId": "cat-34",
    "categoryName": "Human Resources (HR)",
    "subcategoryId": "sub-34-5",
    "subcategoryName": "HR Strategy",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-612",
    "title": "Chief Learning Officer (CLO)",
    "categoryId": "cat-35",
    "categoryName": "Learning & Development",
    "subcategoryId": "sub-35-1",
    "subcategoryName": "L&D Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-613",
    "title": "Learning Director",
    "categoryId": "cat-35",
    "categoryName": "Learning & Development",
    "subcategoryId": "sub-35-1",
    "subcategoryName": "L&D Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-614",
    "title": "Head of Learning & Development",
    "categoryId": "cat-35",
    "categoryName": "Learning & Development",
    "subcategoryId": "sub-35-1",
    "subcategoryName": "L&D Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-615",
    "title": "Learning Manager",
    "categoryId": "cat-35",
    "categoryName": "Learning & Development",
    "subcategoryId": "sub-35-1",
    "subcategoryName": "L&D Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-616",
    "title": "Leadership Development Director",
    "categoryId": "cat-35",
    "categoryName": "Learning & Development",
    "subcategoryId": "sub-35-2",
    "subcategoryName": "Leadership Development",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-617",
    "title": "Executive Coaching Lead",
    "categoryId": "cat-35",
    "categoryName": "Learning & Development",
    "subcategoryId": "sub-35-2",
    "subcategoryName": "Leadership Development",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-618",
    "title": "Leadership Coach",
    "categoryId": "cat-35",
    "categoryName": "Learning & Development",
    "subcategoryId": "sub-35-2",
    "subcategoryName": "Leadership Development",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-619",
    "title": "Succession Planning Manager",
    "categoryId": "cat-35",
    "categoryName": "Learning & Development",
    "subcategoryId": "sub-35-2",
    "subcategoryName": "Leadership Development",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-620",
    "title": "Training Director",
    "categoryId": "cat-35",
    "categoryName": "Learning & Development",
    "subcategoryId": "sub-35-3",
    "subcategoryName": "Corporate Training",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-621",
    "title": "Corporate Trainer",
    "categoryId": "cat-35",
    "categoryName": "Learning & Development",
    "subcategoryId": "sub-35-3",
    "subcategoryName": "Corporate Training",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-622",
    "title": "Technical Trainer",
    "categoryId": "cat-35",
    "categoryName": "Learning & Development",
    "subcategoryId": "sub-35-3",
    "subcategoryName": "Corporate Training",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-623",
    "title": "Functional Trainer",
    "categoryId": "cat-35",
    "categoryName": "Learning & Development",
    "subcategoryId": "sub-35-3",
    "subcategoryName": "Corporate Training",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-624",
    "title": "LMS Administrator",
    "categoryId": "cat-35",
    "categoryName": "Learning & Development",
    "subcategoryId": "sub-35-4",
    "subcategoryName": "Learning Technologies",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-625",
    "title": "Digital Learning Manager",
    "categoryId": "cat-35",
    "categoryName": "Learning & Development",
    "subcategoryId": "sub-35-4",
    "subcategoryName": "Learning Technologies",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-626",
    "title": "eLearning Manager",
    "categoryId": "cat-35",
    "categoryName": "Learning & Development",
    "subcategoryId": "sub-35-4",
    "subcategoryName": "Learning Technologies",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-627",
    "title": "Instructional Designer",
    "categoryId": "cat-35",
    "categoryName": "Learning & Development",
    "subcategoryId": "sub-35-4",
    "subcategoryName": "Learning Technologies",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-628",
    "title": "Capability Development Head",
    "categoryId": "cat-35",
    "categoryName": "Learning & Development",
    "subcategoryId": "sub-35-5",
    "subcategoryName": "Capability Building",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-629",
    "title": "Skills Development Manager",
    "categoryId": "cat-35",
    "categoryName": "Learning & Development",
    "subcategoryId": "sub-35-5",
    "subcategoryName": "Capability Building",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-630",
    "title": "Competency Manager",
    "categoryId": "cat-35",
    "categoryName": "Learning & Development",
    "subcategoryId": "sub-35-5",
    "subcategoryName": "Capability Building",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-631",
    "title": "Organizational Learning Lead",
    "categoryId": "cat-35",
    "categoryName": "Learning & Development",
    "subcategoryId": "sub-35-5",
    "subcategoryName": "Capability Building",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-632",
    "title": "Facilities Director",
    "categoryId": "cat-36",
    "categoryName": "Facilities Management",
    "subcategoryId": "sub-36-1",
    "subcategoryName": "Facilities Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-633",
    "title": "Head of Facilities",
    "categoryId": "cat-36",
    "categoryName": "Facilities Management",
    "subcategoryId": "sub-36-1",
    "subcategoryName": "Facilities Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-634",
    "title": "Facilities Manager",
    "categoryId": "cat-36",
    "categoryName": "Facilities Management",
    "subcategoryId": "sub-36-1",
    "subcategoryName": "Facilities Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-635",
    "title": "Corporate Services Director",
    "categoryId": "cat-36",
    "categoryName": "Facilities Management",
    "subcategoryId": "sub-36-1",
    "subcategoryName": "Facilities Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-636",
    "title": "Workplace Director",
    "categoryId": "cat-36",
    "categoryName": "Facilities Management",
    "subcategoryId": "sub-36-2",
    "subcategoryName": "Workplace Management",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-637",
    "title": "Workplace Experience Manager",
    "categoryId": "cat-36",
    "categoryName": "Facilities Management",
    "subcategoryId": "sub-36-2",
    "subcategoryName": "Workplace Management",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-638",
    "title": "Office Manager",
    "categoryId": "cat-36",
    "categoryName": "Facilities Management",
    "subcategoryId": "sub-36-2",
    "subcategoryName": "Workplace Management",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-639",
    "title": "Workspace Planner",
    "categoryId": "cat-36",
    "categoryName": "Facilities Management",
    "subcategoryId": "sub-36-2",
    "subcategoryName": "Workplace Management",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-640",
    "title": "Building Manager",
    "categoryId": "cat-36",
    "categoryName": "Facilities Management",
    "subcategoryId": "sub-36-3",
    "subcategoryName": "Building Operations",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-641",
    "title": "Property Manager",
    "categoryId": "cat-36",
    "categoryName": "Facilities Management",
    "subcategoryId": "sub-36-3",
    "subcategoryName": "Building Operations",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-642",
    "title": "Maintenance Manager",
    "categoryId": "cat-36",
    "categoryName": "Facilities Management",
    "subcategoryId": "sub-36-3",
    "subcategoryName": "Building Operations",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-643",
    "title": "Utilities Manager",
    "categoryId": "cat-36",
    "categoryName": "Facilities Management",
    "subcategoryId": "sub-36-3",
    "subcategoryName": "Building Operations",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-644",
    "title": "Security Manager",
    "categoryId": "cat-36",
    "categoryName": "Facilities Management",
    "subcategoryId": "sub-36-4",
    "subcategoryName": "Security & Administration",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-645",
    "title": "Administration Manager",
    "categoryId": "cat-36",
    "categoryName": "Facilities Management",
    "subcategoryId": "sub-36-4",
    "subcategoryName": "Security & Administration",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-646",
    "title": "Reception Manager",
    "categoryId": "cat-36",
    "categoryName": "Facilities Management",
    "subcategoryId": "sub-36-4",
    "subcategoryName": "Security & Administration",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-647",
    "title": "Visitor Services Manager",
    "categoryId": "cat-36",
    "categoryName": "Facilities Management",
    "subcategoryId": "sub-36-4",
    "subcategoryName": "Security & Administration",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-648",
    "title": "Space Planning Manager",
    "categoryId": "cat-36",
    "categoryName": "Facilities Management",
    "subcategoryId": "sub-36-5",
    "subcategoryName": "Facility Planning",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-649",
    "title": "Facility Projects Manager",
    "categoryId": "cat-36",
    "categoryName": "Facilities Management",
    "subcategoryId": "sub-36-5",
    "subcategoryName": "Facility Planning",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-650",
    "title": "Infrastructure Manager",
    "categoryId": "cat-36",
    "categoryName": "Facilities Management",
    "subcategoryId": "sub-36-5",
    "subcategoryName": "Facility Planning",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-651",
    "title": "Smart Building Manager",
    "categoryId": "cat-36",
    "categoryName": "Facilities Management",
    "subcategoryId": "sub-36-5",
    "subcategoryName": "Facility Planning",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-652",
    "title": "Chief Information Security Officer (CISO)",
    "categoryId": "cat-37",
    "categoryName": "Cyber Security & Information Security",
    "subcategoryId": "sub-37-1",
    "subcategoryName": "Security Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-653",
    "title": "Chief Security Officer (CSO)",
    "categoryId": "cat-37",
    "categoryName": "Cyber Security & Information Security",
    "subcategoryId": "sub-37-1",
    "subcategoryName": "Security Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-654",
    "title": "VP Cyber Security",
    "categoryId": "cat-37",
    "categoryName": "Cyber Security & Information Security",
    "subcategoryId": "sub-37-1",
    "subcategoryName": "Security Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-655",
    "title": "Security Director",
    "categoryId": "cat-37",
    "categoryName": "Cyber Security & Information Security",
    "subcategoryId": "sub-37-1",
    "subcategoryName": "Security Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-656",
    "title": "Head of Information Security",
    "categoryId": "cat-37",
    "categoryName": "Cyber Security & Information Security",
    "subcategoryId": "sub-37-1",
    "subcategoryName": "Security Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-657",
    "title": "SOC Director",
    "categoryId": "cat-37",
    "categoryName": "Cyber Security & Information Security",
    "subcategoryId": "sub-37-2",
    "subcategoryName": "Security Operations",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-658",
    "title": "SOC Manager",
    "categoryId": "cat-37",
    "categoryName": "Cyber Security & Information Security",
    "subcategoryId": "sub-37-2",
    "subcategoryName": "Security Operations",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-659",
    "title": "Incident Response Manager",
    "categoryId": "cat-37",
    "categoryName": "Cyber Security & Information Security",
    "subcategoryId": "sub-37-2",
    "subcategoryName": "Security Operations",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-660",
    "title": "Threat Intelligence Manager",
    "categoryId": "cat-37",
    "categoryName": "Cyber Security & Information Security",
    "subcategoryId": "sub-37-2",
    "subcategoryName": "Security Operations",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-661",
    "title": "Security Operations Manager",
    "categoryId": "cat-37",
    "categoryName": "Cyber Security & Information Security",
    "subcategoryId": "sub-37-2",
    "subcategoryName": "Security Operations",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-662",
    "title": "Cyber Security Architect",
    "categoryId": "cat-37",
    "categoryName": "Cyber Security & Information Security",
    "subcategoryId": "sub-37-3",
    "subcategoryName": "Cyber Defense",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-663",
    "title": "Penetration Testing Lead",
    "categoryId": "cat-37",
    "categoryName": "Cyber Security & Information Security",
    "subcategoryId": "sub-37-3",
    "subcategoryName": "Cyber Defense",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-664",
    "title": "Vulnerability Manager",
    "categoryId": "cat-37",
    "categoryName": "Cyber Security & Information Security",
    "subcategoryId": "sub-37-3",
    "subcategoryName": "Cyber Defense",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-665",
    "title": "Security Engineering Manager",
    "categoryId": "cat-37",
    "categoryName": "Cyber Security & Information Security",
    "subcategoryId": "sub-37-3",
    "subcategoryName": "Cyber Defense",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-666",
    "title": "Security Governance Manager",
    "categoryId": "cat-37",
    "categoryName": "Cyber Security & Information Security",
    "subcategoryId": "sub-37-4",
    "subcategoryName": "Governance & Risk",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-667",
    "title": "Cyber Risk Manager",
    "categoryId": "cat-37",
    "categoryName": "Cyber Security & Information Security",
    "subcategoryId": "sub-37-4",
    "subcategoryName": "Governance & Risk",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-668",
    "title": "Compliance Security Manager",
    "categoryId": "cat-37",
    "categoryName": "Cyber Security & Information Security",
    "subcategoryId": "sub-37-4",
    "subcategoryName": "Governance & Risk",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-669",
    "title": "Privacy Officer",
    "categoryId": "cat-37",
    "categoryName": "Cyber Security & Information Security",
    "subcategoryId": "sub-37-4",
    "subcategoryName": "Governance & Risk",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-670",
    "title": "IAM Director",
    "categoryId": "cat-37",
    "categoryName": "Cyber Security & Information Security",
    "subcategoryId": "sub-37-5",
    "subcategoryName": "Identity & Access",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-671",
    "title": "Identity Manager",
    "categoryId": "cat-37",
    "categoryName": "Cyber Security & Information Security",
    "subcategoryId": "sub-37-5",
    "subcategoryName": "Identity & Access",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-672",
    "title": "Access Control Manager",
    "categoryId": "cat-37",
    "categoryName": "Cyber Security & Information Security",
    "subcategoryId": "sub-37-5",
    "subcategoryName": "Identity & Access",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-673",
    "title": "PKI Manager",
    "categoryId": "cat-37",
    "categoryName": "Cyber Security & Information Security",
    "subcategoryId": "sub-37-5",
    "subcategoryName": "Identity & Access",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-674",
    "title": "Chief Business Development Officer",
    "categoryId": "cat-38",
    "categoryName": "Business Development",
    "subcategoryId": "sub-38-1",
    "subcategoryName": "BD Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-675",
    "title": "VP Business Development",
    "categoryId": "cat-38",
    "categoryName": "Business Development",
    "subcategoryId": "sub-38-1",
    "subcategoryName": "BD Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-676",
    "title": "Business Development Director",
    "categoryId": "cat-38",
    "categoryName": "Business Development",
    "subcategoryId": "sub-38-1",
    "subcategoryName": "BD Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-677",
    "title": "Head of Business Development",
    "categoryId": "cat-38",
    "categoryName": "Business Development",
    "subcategoryId": "sub-38-1",
    "subcategoryName": "BD Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-678",
    "title": "Business Development Manager",
    "categoryId": "cat-38",
    "categoryName": "Business Development",
    "subcategoryId": "sub-38-1",
    "subcategoryName": "BD Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-679",
    "title": "Growth Director",
    "categoryId": "cat-38",
    "categoryName": "Business Development",
    "subcategoryId": "sub-38-2",
    "subcategoryName": "Strategic Growth",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-680",
    "title": "Strategic Partnerships Director",
    "categoryId": "cat-38",
    "categoryName": "Business Development",
    "subcategoryId": "sub-38-2",
    "subcategoryName": "Strategic Growth",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-681",
    "title": "Market Expansion Manager",
    "categoryId": "cat-38",
    "categoryName": "Business Development",
    "subcategoryId": "sub-38-2",
    "subcategoryName": "Strategic Growth",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-682",
    "title": "Corporate Development Manager",
    "categoryId": "cat-38",
    "categoryName": "Business Development",
    "subcategoryId": "sub-38-2",
    "subcategoryName": "Strategic Growth",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-683",
    "title": "Partnerships Director",
    "categoryId": "cat-38",
    "categoryName": "Business Development",
    "subcategoryId": "sub-38-3",
    "subcategoryName": "Alliances",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-684",
    "title": "Alliance Manager",
    "categoryId": "cat-38",
    "categoryName": "Business Development",
    "subcategoryId": "sub-38-3",
    "subcategoryName": "Alliances",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-685",
    "title": "Channel Development Manager",
    "categoryId": "cat-38",
    "categoryName": "Business Development",
    "subcategoryId": "sub-38-3",
    "subcategoryName": "Alliances",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-686",
    "title": "Ecosystem Partnerships Lead",
    "categoryId": "cat-38",
    "categoryName": "Business Development",
    "subcategoryId": "sub-38-3",
    "subcategoryName": "Alliances",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-687",
    "title": "New Business Manager",
    "categoryId": "cat-38",
    "categoryName": "Business Development",
    "subcategoryId": "sub-38-4",
    "subcategoryName": "New Business",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-688",
    "title": "Opportunity Development Manager",
    "categoryId": "cat-38",
    "categoryName": "Business Development",
    "subcategoryId": "sub-38-4",
    "subcategoryName": "New Business",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-689",
    "title": "Client Acquisition Manager",
    "categoryId": "cat-38",
    "categoryName": "Business Development",
    "subcategoryId": "sub-38-4",
    "subcategoryName": "New Business",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-690",
    "title": "Strategic Accounts Manager",
    "categoryId": "cat-38",
    "categoryName": "Business Development",
    "subcategoryId": "sub-38-4",
    "subcategoryName": "New Business",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-691",
    "title": "Commercial Director",
    "categoryId": "cat-38",
    "categoryName": "Business Development",
    "subcategoryId": "sub-38-5",
    "subcategoryName": "Commercial Strategy",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-692",
    "title": "Commercial Excellence Manager",
    "categoryId": "cat-38",
    "categoryName": "Business Development",
    "subcategoryId": "sub-38-5",
    "subcategoryName": "Commercial Strategy",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-693",
    "title": "Business Growth Lead",
    "categoryId": "cat-38",
    "categoryName": "Business Development",
    "subcategoryId": "sub-38-5",
    "subcategoryName": "Commercial Strategy",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-694",
    "title": "Revenue Growth Manager",
    "categoryId": "cat-38",
    "categoryName": "Business Development",
    "subcategoryId": "sub-38-5",
    "subcategoryName": "Commercial Strategy",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-695",
    "title": "Chief Customer Success Officer",
    "categoryId": "cat-39",
    "categoryName": "Customer Success",
    "subcategoryId": "sub-39-1",
    "subcategoryName": "Customer Success Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-696",
    "title": "VP Customer Success",
    "categoryId": "cat-39",
    "categoryName": "Customer Success",
    "subcategoryId": "sub-39-1",
    "subcategoryName": "Customer Success Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-697",
    "title": "Customer Success Director",
    "categoryId": "cat-39",
    "categoryName": "Customer Success",
    "subcategoryId": "sub-39-1",
    "subcategoryName": "Customer Success Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-698",
    "title": "Head of Customer Success",
    "categoryId": "cat-39",
    "categoryName": "Customer Success",
    "subcategoryId": "sub-39-1",
    "subcategoryName": "Customer Success Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-699",
    "title": "Customer Success Manager",
    "categoryId": "cat-39",
    "categoryName": "Customer Success",
    "subcategoryId": "sub-39-1",
    "subcategoryName": "Customer Success Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-700",
    "title": "Engagement Director",
    "categoryId": "cat-39",
    "categoryName": "Customer Success",
    "subcategoryId": "sub-39-2",
    "subcategoryName": "Customer Engagement",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-701",
    "title": "Customer Relationship Manager",
    "categoryId": "cat-39",
    "categoryName": "Customer Success",
    "subcategoryId": "sub-39-2",
    "subcategoryName": "Customer Engagement",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-702",
    "title": "Account Success Manager",
    "categoryId": "cat-39",
    "categoryName": "Customer Success",
    "subcategoryId": "sub-39-2",
    "subcategoryName": "Customer Engagement",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-703",
    "title": "Customer Lifecycle Manager",
    "categoryId": "cat-39",
    "categoryName": "Customer Success",
    "subcategoryId": "sub-39-2",
    "subcategoryName": "Customer Engagement",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-704",
    "title": "Enterprise Success Manager",
    "categoryId": "cat-39",
    "categoryName": "Customer Success",
    "subcategoryId": "sub-39-3",
    "subcategoryName": "Client Success",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-705",
    "title": "Strategic Success Manager",
    "categoryId": "cat-39",
    "categoryName": "Customer Success",
    "subcategoryId": "sub-39-3",
    "subcategoryName": "Client Success",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-706",
    "title": "Technical Success Manager",
    "categoryId": "cat-39",
    "categoryName": "Customer Success",
    "subcategoryId": "sub-39-3",
    "subcategoryName": "Client Success",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-707",
    "title": "Adoption Manager",
    "categoryId": "cat-39",
    "categoryName": "Customer Success",
    "subcategoryId": "sub-39-3",
    "subcategoryName": "Client Success",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-708",
    "title": "Retention Director",
    "categoryId": "cat-39",
    "categoryName": "Customer Success",
    "subcategoryId": "sub-39-4",
    "subcategoryName": "Customer Retention",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-709",
    "title": "Renewal Manager",
    "categoryId": "cat-39",
    "categoryName": "Customer Success",
    "subcategoryId": "sub-39-4",
    "subcategoryName": "Customer Retention",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-710",
    "title": "Customer Loyalty Manager",
    "categoryId": "cat-39",
    "categoryName": "Customer Success",
    "subcategoryId": "sub-39-4",
    "subcategoryName": "Customer Retention",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-711",
    "title": "Churn Prevention Manager",
    "categoryId": "cat-39",
    "categoryName": "Customer Success",
    "subcategoryId": "sub-39-4",
    "subcategoryName": "Customer Retention",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-712",
    "title": "Customer Success Operations Manager",
    "categoryId": "cat-39",
    "categoryName": "Customer Success",
    "subcategoryId": "sub-39-5",
    "subcategoryName": "Success Operations",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-713",
    "title": "Customer Health Manager",
    "categoryId": "cat-39",
    "categoryName": "Customer Success",
    "subcategoryId": "sub-39-5",
    "subcategoryName": "Success Operations",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-714",
    "title": "Success Analyst",
    "categoryId": "cat-39",
    "categoryName": "Customer Success",
    "subcategoryId": "sub-39-5",
    "subcategoryName": "Success Operations",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-715",
    "title": "Customer Advocacy Manager",
    "categoryId": "cat-39",
    "categoryName": "Customer Success",
    "subcategoryId": "sub-39-5",
    "subcategoryName": "Success Operations",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-716",
    "title": "Chief Projects Officer",
    "categoryId": "cat-40",
    "categoryName": "Projects Management",
    "subcategoryId": "sub-40-1",
    "subcategoryName": "Project Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-717",
    "title": "Projects Director",
    "categoryId": "cat-40",
    "categoryName": "Projects Management",
    "subcategoryId": "sub-40-1",
    "subcategoryName": "Project Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-718",
    "title": "Head of Projects",
    "categoryId": "cat-40",
    "categoryName": "Projects Management",
    "subcategoryId": "sub-40-1",
    "subcategoryName": "Project Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-719",
    "title": "Senior Project Manager",
    "categoryId": "cat-40",
    "categoryName": "Projects Management",
    "subcategoryId": "sub-40-1",
    "subcategoryName": "Project Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-720",
    "title": "Project Manager",
    "categoryId": "cat-40",
    "categoryName": "Projects Management",
    "subcategoryId": "sub-40-1",
    "subcategoryName": "Project Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-721",
    "title": "Delivery Director",
    "categoryId": "cat-40",
    "categoryName": "Projects Management",
    "subcategoryId": "sub-40-2",
    "subcategoryName": "Project Delivery",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-722",
    "title": "Delivery Manager",
    "categoryId": "cat-40",
    "categoryName": "Projects Management",
    "subcategoryId": "sub-40-2",
    "subcategoryName": "Project Delivery",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-723",
    "title": "Project Coordinator",
    "categoryId": "cat-40",
    "categoryName": "Projects Management",
    "subcategoryId": "sub-40-2",
    "subcategoryName": "Project Delivery",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-724",
    "title": "Site Project Manager",
    "categoryId": "cat-40",
    "categoryName": "Projects Management",
    "subcategoryId": "sub-40-2",
    "subcategoryName": "Project Delivery",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-725",
    "title": "EPC Director",
    "categoryId": "cat-40",
    "categoryName": "Projects Management",
    "subcategoryId": "sub-40-3",
    "subcategoryName": "Construction & Engineering Projects",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-726",
    "title": "Construction Project Manager",
    "categoryId": "cat-40",
    "categoryName": "Projects Management",
    "subcategoryId": "sub-40-3",
    "subcategoryName": "Construction & Engineering Projects",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-727",
    "title": "Infrastructure Project Manager",
    "categoryId": "cat-40",
    "categoryName": "Projects Management",
    "subcategoryId": "sub-40-3",
    "subcategoryName": "Construction & Engineering Projects",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-728",
    "title": "Capital Projects Manager",
    "categoryId": "cat-40",
    "categoryName": "Projects Management",
    "subcategoryId": "sub-40-3",
    "subcategoryName": "Construction & Engineering Projects",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-729",
    "title": "Project Controls Director",
    "categoryId": "cat-40",
    "categoryName": "Projects Management",
    "subcategoryId": "sub-40-4",
    "subcategoryName": "Project Controls",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-730",
    "title": "Cost Control Manager",
    "categoryId": "cat-40",
    "categoryName": "Projects Management",
    "subcategoryId": "sub-40-4",
    "subcategoryName": "Project Controls",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-731",
    "title": "Planning Engineer",
    "categoryId": "cat-40",
    "categoryName": "Projects Management",
    "subcategoryId": "sub-40-4",
    "subcategoryName": "Project Controls",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-732",
    "title": "Scheduling Manager",
    "categoryId": "cat-40",
    "categoryName": "Projects Management",
    "subcategoryId": "sub-40-4",
    "subcategoryName": "Project Controls",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-733",
    "title": "Project Governance Manager",
    "categoryId": "cat-40",
    "categoryName": "Projects Management",
    "subcategoryId": "sub-40-5",
    "subcategoryName": "Project Governance",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-734",
    "title": "Risk & Controls Manager",
    "categoryId": "cat-40",
    "categoryName": "Projects Management",
    "subcategoryId": "sub-40-5",
    "subcategoryName": "Project Governance",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-735",
    "title": "Project Quality Manager",
    "categoryId": "cat-40",
    "categoryName": "Projects Management",
    "subcategoryId": "sub-40-5",
    "subcategoryName": "Project Governance",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-736",
    "title": "PMO Analyst",
    "categoryId": "cat-40",
    "categoryName": "Projects Management",
    "subcategoryId": "sub-40-5",
    "subcategoryName": "Project Governance",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-737",
    "title": "Chief Organizational Development Officer",
    "categoryId": "cat-41",
    "categoryName": "Organizational Development",
    "subcategoryId": "sub-41-1",
    "subcategoryName": "OD Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-738",
    "title": "Organizational Development Director",
    "categoryId": "cat-41",
    "categoryName": "Organizational Development",
    "subcategoryId": "sub-41-1",
    "subcategoryName": "OD Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-739",
    "title": "Head of Organizational Development",
    "categoryId": "cat-41",
    "categoryName": "Organizational Development",
    "subcategoryId": "sub-41-1",
    "subcategoryName": "OD Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-740",
    "title": "OD Manager",
    "categoryId": "cat-41",
    "categoryName": "Organizational Development",
    "subcategoryId": "sub-41-1",
    "subcategoryName": "OD Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-741",
    "title": "Organization Design Director",
    "categoryId": "cat-41",
    "categoryName": "Organizational Development",
    "subcategoryId": "sub-41-2",
    "subcategoryName": "Organization Design",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-742",
    "title": "Workforce Design Manager",
    "categoryId": "cat-41",
    "categoryName": "Organizational Development",
    "subcategoryId": "sub-41-2",
    "subcategoryName": "Organization Design",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-743",
    "title": "Organizational Effectiveness Manager",
    "categoryId": "cat-41",
    "categoryName": "Organizational Development",
    "subcategoryId": "sub-41-2",
    "subcategoryName": "Organization Design",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-744",
    "title": "Business Transformation Consultant",
    "categoryId": "cat-41",
    "categoryName": "Organizational Development",
    "subcategoryId": "sub-41-2",
    "subcategoryName": "Organization Design",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-745",
    "title": "Change Director",
    "categoryId": "cat-41",
    "categoryName": "Organizational Development",
    "subcategoryId": "sub-41-3",
    "subcategoryName": "Change Management",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-746",
    "title": "Change Management Manager",
    "categoryId": "cat-41",
    "categoryName": "Organizational Development",
    "subcategoryId": "sub-41-3",
    "subcategoryName": "Change Management",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-747",
    "title": "Transformation Coach",
    "categoryId": "cat-41",
    "categoryName": "Organizational Development",
    "subcategoryId": "sub-41-3",
    "subcategoryName": "Change Management",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-748",
    "title": "Organizational Change Lead",
    "categoryId": "cat-41",
    "categoryName": "Organizational Development",
    "subcategoryId": "sub-41-3",
    "subcategoryName": "Change Management",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-749",
    "title": "Culture Director",
    "categoryId": "cat-41",
    "categoryName": "Organizational Development",
    "subcategoryId": "sub-41-4",
    "subcategoryName": "Culture & Performance",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-750",
    "title": "Performance Excellence Manager",
    "categoryId": "cat-41",
    "categoryName": "Organizational Development",
    "subcategoryId": "sub-41-4",
    "subcategoryName": "Culture & Performance",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-751",
    "title": "Employee Experience Director",
    "categoryId": "cat-41",
    "categoryName": "Organizational Development",
    "subcategoryId": "sub-41-4",
    "subcategoryName": "Culture & Performance",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-752",
    "title": "Organizational Performance Manager",
    "categoryId": "cat-41",
    "categoryName": "Organizational Development",
    "subcategoryId": "sub-41-4",
    "subcategoryName": "Culture & Performance",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-753",
    "title": "Talent Strategy Director",
    "categoryId": "cat-41",
    "categoryName": "Organizational Development",
    "subcategoryId": "sub-41-5",
    "subcategoryName": "Talent Strategy",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-754",
    "title": "Succession Planning Lead",
    "categoryId": "cat-41",
    "categoryName": "Organizational Development",
    "subcategoryId": "sub-41-5",
    "subcategoryName": "Talent Strategy",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-755",
    "title": "Workforce Analytics Manager",
    "categoryId": "cat-41",
    "categoryName": "Organizational Development",
    "subcategoryId": "sub-41-5",
    "subcategoryName": "Talent Strategy",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-756",
    "title": "Capability Strategy Manager",
    "categoryId": "cat-41",
    "categoryName": "Organizational Development",
    "subcategoryId": "sub-41-5",
    "subcategoryName": "Talent Strategy",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-757",
    "title": "Chief Talent Officer (CTO)",
    "categoryId": "cat-42",
    "categoryName": "Talent Acquisition",
    "subcategoryId": "sub-42-1",
    "subcategoryName": "Talent Acquisition Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-758",
    "title": "Talent Acquisition Director",
    "categoryId": "cat-42",
    "categoryName": "Talent Acquisition",
    "subcategoryId": "sub-42-1",
    "subcategoryName": "Talent Acquisition Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-759",
    "title": "Head of Talent Acquisition",
    "categoryId": "cat-42",
    "categoryName": "Talent Acquisition",
    "subcategoryId": "sub-42-1",
    "subcategoryName": "Talent Acquisition Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-760",
    "title": "VP Talent Acquisition",
    "categoryId": "cat-42",
    "categoryName": "Talent Acquisition",
    "subcategoryId": "sub-42-1",
    "subcategoryName": "Talent Acquisition Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-761",
    "title": "Talent Acquisition Manager",
    "categoryId": "cat-42",
    "categoryName": "Talent Acquisition",
    "subcategoryId": "sub-42-1",
    "subcategoryName": "Talent Acquisition Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-762",
    "title": "Recruitment Director",
    "categoryId": "cat-42",
    "categoryName": "Talent Acquisition",
    "subcategoryId": "sub-42-2",
    "subcategoryName": "Recruitment",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-763",
    "title": "Recruitment Manager",
    "categoryId": "cat-42",
    "categoryName": "Talent Acquisition",
    "subcategoryId": "sub-42-2",
    "subcategoryName": "Recruitment",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-764",
    "title": "Senior Recruiter",
    "categoryId": "cat-42",
    "categoryName": "Talent Acquisition",
    "subcategoryId": "sub-42-2",
    "subcategoryName": "Recruitment",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-765",
    "title": "Technical Recruiter",
    "categoryId": "cat-42",
    "categoryName": "Talent Acquisition",
    "subcategoryId": "sub-42-2",
    "subcategoryName": "Recruitment",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-766",
    "title": "Campus Recruitment Manager",
    "categoryId": "cat-42",
    "categoryName": "Talent Acquisition",
    "subcategoryId": "sub-42-2",
    "subcategoryName": "Recruitment",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-767",
    "title": "Executive Search Director",
    "categoryId": "cat-42",
    "categoryName": "Talent Acquisition",
    "subcategoryId": "sub-42-3",
    "subcategoryName": "Executive Search",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-768",
    "title": "Executive Recruiter",
    "categoryId": "cat-42",
    "categoryName": "Talent Acquisition",
    "subcategoryId": "sub-42-3",
    "subcategoryName": "Executive Search",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-769",
    "title": "Leadership Hiring Manager",
    "categoryId": "cat-42",
    "categoryName": "Talent Acquisition",
    "subcategoryId": "sub-42-3",
    "subcategoryName": "Executive Search",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-770",
    "title": "Executive Talent Partner",
    "categoryId": "cat-42",
    "categoryName": "Talent Acquisition",
    "subcategoryId": "sub-42-3",
    "subcategoryName": "Executive Search",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-771",
    "title": "Employer Branding Director",
    "categoryId": "cat-42",
    "categoryName": "Talent Acquisition",
    "subcategoryId": "sub-42-4",
    "subcategoryName": "Employer Branding",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-772",
    "title": "Recruitment Marketing Manager",
    "categoryId": "cat-42",
    "categoryName": "Talent Acquisition",
    "subcategoryId": "sub-42-4",
    "subcategoryName": "Employer Branding",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-773",
    "title": "Talent Branding Manager",
    "categoryId": "cat-42",
    "categoryName": "Talent Acquisition",
    "subcategoryId": "sub-42-4",
    "subcategoryName": "Employer Branding",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-774",
    "title": "EVP Manager",
    "categoryId": "cat-42",
    "categoryName": "Talent Acquisition",
    "subcategoryId": "sub-42-4",
    "subcategoryName": "Employer Branding",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-775",
    "title": "Workforce Planning Director",
    "categoryId": "cat-42",
    "categoryName": "Talent Acquisition",
    "subcategoryId": "sub-42-5",
    "subcategoryName": "Workforce Planning",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-776",
    "title": "Resource Planning Manager",
    "categoryId": "cat-42",
    "categoryName": "Talent Acquisition",
    "subcategoryId": "sub-42-5",
    "subcategoryName": "Workforce Planning",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-777",
    "title": "Talent Intelligence Lead",
    "categoryId": "cat-42",
    "categoryName": "Talent Acquisition",
    "subcategoryId": "sub-42-5",
    "subcategoryName": "Workforce Planning",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-778",
    "title": "Hiring Strategy Manager",
    "categoryId": "cat-42",
    "categoryName": "Talent Acquisition",
    "subcategoryId": "sub-42-5",
    "subcategoryName": "Workforce Planning",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-779",
    "title": "Chief Culture Officer",
    "categoryId": "cat-43",
    "categoryName": "Workplace Culture",
    "subcategoryId": "sub-43-1",
    "subcategoryName": "Culture Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-780",
    "title": "Culture Director",
    "categoryId": "cat-43",
    "categoryName": "Workplace Culture",
    "subcategoryId": "sub-43-1",
    "subcategoryName": "Culture Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-781",
    "title": "Head of Culture",
    "categoryId": "cat-43",
    "categoryName": "Workplace Culture",
    "subcategoryId": "sub-43-1",
    "subcategoryName": "Culture Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-782",
    "title": "Culture Manager",
    "categoryId": "cat-43",
    "categoryName": "Workplace Culture",
    "subcategoryId": "sub-43-1",
    "subcategoryName": "Culture Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-783",
    "title": "Culture Transformation Director",
    "categoryId": "cat-43",
    "categoryName": "Workplace Culture",
    "subcategoryId": "sub-43-2",
    "subcategoryName": "Organizational Culture",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-784",
    "title": "Organizational Culture Lead",
    "categoryId": "cat-43",
    "categoryName": "Workplace Culture",
    "subcategoryId": "sub-43-2",
    "subcategoryName": "Organizational Culture",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-785",
    "title": "Values & Ethics Manager",
    "categoryId": "cat-43",
    "categoryName": "Workplace Culture",
    "subcategoryId": "sub-43-2",
    "subcategoryName": "Organizational Culture",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-786",
    "title": "Behavioral Excellence Manager",
    "categoryId": "cat-43",
    "categoryName": "Workplace Culture",
    "subcategoryId": "sub-43-2",
    "subcategoryName": "Organizational Culture",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-787",
    "title": "Chief Diversity Officer",
    "categoryId": "cat-43",
    "categoryName": "Workplace Culture",
    "subcategoryId": "sub-43-3",
    "subcategoryName": "Inclusion & Diversity",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-788",
    "title": "Diversity Director",
    "categoryId": "cat-43",
    "categoryName": "Workplace Culture",
    "subcategoryId": "sub-43-3",
    "subcategoryName": "Inclusion & Diversity",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-789",
    "title": "Inclusion Manager",
    "categoryId": "cat-43",
    "categoryName": "Workplace Culture",
    "subcategoryId": "sub-43-3",
    "subcategoryName": "Inclusion & Diversity",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-790",
    "title": "Belonging Manager",
    "categoryId": "cat-43",
    "categoryName": "Workplace Culture",
    "subcategoryId": "sub-43-3",
    "subcategoryName": "Inclusion & Diversity",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-791",
    "title": "Wellbeing Director",
    "categoryId": "cat-43",
    "categoryName": "Workplace Culture",
    "subcategoryId": "sub-43-4",
    "subcategoryName": "Workplace Wellbeing",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-792",
    "title": "Wellness Manager",
    "categoryId": "cat-43",
    "categoryName": "Workplace Culture",
    "subcategoryId": "sub-43-4",
    "subcategoryName": "Workplace Wellbeing",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-793",
    "title": "Employee Wellbeing Lead",
    "categoryId": "cat-43",
    "categoryName": "Workplace Culture",
    "subcategoryId": "sub-43-4",
    "subcategoryName": "Workplace Wellbeing",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-794",
    "title": "Mental Health Program Manager",
    "categoryId": "cat-43",
    "categoryName": "Workplace Culture",
    "subcategoryId": "sub-43-4",
    "subcategoryName": "Workplace Wellbeing",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-795",
    "title": "Employee Experience Director",
    "categoryId": "cat-43",
    "categoryName": "Workplace Culture",
    "subcategoryId": "sub-43-5",
    "subcategoryName": "Employee Experience",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-796",
    "title": "Workplace Experience Manager",
    "categoryId": "cat-43",
    "categoryName": "Workplace Culture",
    "subcategoryId": "sub-43-5",
    "subcategoryName": "Employee Experience",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-797",
    "title": "Culture Ambassador",
    "categoryId": "cat-43",
    "categoryName": "Workplace Culture",
    "subcategoryId": "sub-43-5",
    "subcategoryName": "Employee Experience",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-798",
    "title": "Workplace Excellence Lead",
    "categoryId": "cat-43",
    "categoryName": "Workplace Culture",
    "subcategoryId": "sub-43-5",
    "subcategoryName": "Employee Experience",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-799",
    "title": "Employee Engagement Director",
    "categoryId": "cat-44",
    "categoryName": "Employee Engagement",
    "subcategoryId": "sub-44-1",
    "subcategoryName": "Engagement Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-800",
    "title": "Head of Employee Engagement",
    "categoryId": "cat-44",
    "categoryName": "Employee Engagement",
    "subcategoryId": "sub-44-1",
    "subcategoryName": "Engagement Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-801",
    "title": "Engagement Manager",
    "categoryId": "cat-44",
    "categoryName": "Employee Engagement",
    "subcategoryId": "sub-44-1",
    "subcategoryName": "Engagement Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-802",
    "title": "Employee Experience Manager",
    "categoryId": "cat-44",
    "categoryName": "Employee Engagement",
    "subcategoryId": "sub-44-1",
    "subcategoryName": "Engagement Leadership",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-803",
    "title": "Employee Programs Director",
    "categoryId": "cat-44",
    "categoryName": "Employee Engagement",
    "subcategoryId": "sub-44-2",
    "subcategoryName": "Employee Programs",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-804",
    "title": "Recognition Manager",
    "categoryId": "cat-44",
    "categoryName": "Employee Engagement",
    "subcategoryId": "sub-44-2",
    "subcategoryName": "Employee Programs",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-805",
    "title": "Rewards Program Manager",
    "categoryId": "cat-44",
    "categoryName": "Employee Engagement",
    "subcategoryId": "sub-44-2",
    "subcategoryName": "Employee Programs",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-806",
    "title": "Employee Events Manager",
    "categoryId": "cat-44",
    "categoryName": "Employee Engagement",
    "subcategoryId": "sub-44-2",
    "subcategoryName": "Employee Programs",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-807",
    "title": "Internal Communications Manager",
    "categoryId": "cat-44",
    "categoryName": "Employee Engagement",
    "subcategoryId": "sub-44-3",
    "subcategoryName": "Internal Engagement",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-808",
    "title": "Employee Communications Lead",
    "categoryId": "cat-44",
    "categoryName": "Employee Engagement",
    "subcategoryId": "sub-44-3",
    "subcategoryName": "Internal Engagement",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-809",
    "title": "Community Manager",
    "categoryId": "cat-44",
    "categoryName": "Employee Engagement",
    "subcategoryId": "sub-44-3",
    "subcategoryName": "Internal Engagement",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-810",
    "title": "Engagement Specialist",
    "categoryId": "cat-44",
    "categoryName": "Employee Engagement",
    "subcategoryId": "sub-44-3",
    "subcategoryName": "Internal Engagement",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-811",
    "title": "Employee Insights Director",
    "categoryId": "cat-44",
    "categoryName": "Employee Engagement",
    "subcategoryId": "sub-44-4",
    "subcategoryName": "Surveys & Analytics",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-812",
    "title": "Engagement Analytics Manager",
    "categoryId": "cat-44",
    "categoryName": "Employee Engagement",
    "subcategoryId": "sub-44-4",
    "subcategoryName": "Surveys & Analytics",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-813",
    "title": "Survey Manager",
    "categoryId": "cat-44",
    "categoryName": "Employee Engagement",
    "subcategoryId": "sub-44-4",
    "subcategoryName": "Surveys & Analytics",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-814",
    "title": "HR Insights Analyst",
    "categoryId": "cat-44",
    "categoryName": "Employee Engagement",
    "subcategoryId": "sub-44-4",
    "subcategoryName": "Surveys & Analytics",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-815",
    "title": "Retention Director",
    "categoryId": "cat-44",
    "categoryName": "Employee Engagement",
    "subcategoryId": "sub-44-5",
    "subcategoryName": "Retention",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-816",
    "title": "Employee Success Manager",
    "categoryId": "cat-44",
    "categoryName": "Employee Engagement",
    "subcategoryId": "sub-44-5",
    "subcategoryName": "Retention",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-817",
    "title": "Retention Specialist",
    "categoryId": "cat-44",
    "categoryName": "Employee Engagement",
    "subcategoryId": "sub-44-5",
    "subcategoryName": "Retention",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-818",
    "title": "Employee Advocacy Lead",
    "categoryId": "cat-44",
    "categoryName": "Employee Engagement",
    "subcategoryId": "sub-44-5",
    "subcategoryName": "Retention",
    "groupName": "People, Customer & Security"
  },
  {
    "id": "t-819",
    "title": "Chief Research Officer",
    "categoryId": "cat-45",
    "categoryName": "Research & Development (R&D)",
    "subcategoryId": "sub-45-1",
    "subcategoryName": "R&D Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-820",
    "title": "Chief Scientific Officer",
    "categoryId": "cat-45",
    "categoryName": "Research & Development (R&D)",
    "subcategoryId": "sub-45-1",
    "subcategoryName": "R&D Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-821",
    "title": "R&D Director",
    "categoryId": "cat-45",
    "categoryName": "Research & Development (R&D)",
    "subcategoryId": "sub-45-1",
    "subcategoryName": "R&D Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-822",
    "title": "Head of Research",
    "categoryId": "cat-45",
    "categoryName": "Research & Development (R&D)",
    "subcategoryId": "sub-45-1",
    "subcategoryName": "R&D Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-823",
    "title": "R&D Manager",
    "categoryId": "cat-45",
    "categoryName": "Research & Development (R&D)",
    "subcategoryId": "sub-45-1",
    "subcategoryName": "R&D Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-824",
    "title": "Principal Scientist",
    "categoryId": "cat-45",
    "categoryName": "Research & Development (R&D)",
    "subcategoryId": "sub-45-2",
    "subcategoryName": "Scientific Research",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-825",
    "title": "Senior Scientist",
    "categoryId": "cat-45",
    "categoryName": "Research & Development (R&D)",
    "subcategoryId": "sub-45-2",
    "subcategoryName": "Scientific Research",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-826",
    "title": "Research Scientist",
    "categoryId": "cat-45",
    "categoryName": "Research & Development (R&D)",
    "subcategoryId": "sub-45-2",
    "subcategoryName": "Scientific Research",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-827",
    "title": "Applied Scientist",
    "categoryId": "cat-45",
    "categoryName": "Research & Development (R&D)",
    "subcategoryId": "sub-45-2",
    "subcategoryName": "Scientific Research",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-828",
    "title": "Product Research Director",
    "categoryId": "cat-45",
    "categoryName": "Research & Development (R&D)",
    "subcategoryId": "sub-45-3",
    "subcategoryName": "Product Research",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-829",
    "title": "Innovation Scientist",
    "categoryId": "cat-45",
    "categoryName": "Research & Development (R&D)",
    "subcategoryId": "sub-45-3",
    "subcategoryName": "Product Research",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-830",
    "title": "Prototype Manager",
    "categoryId": "cat-45",
    "categoryName": "Research & Development (R&D)",
    "subcategoryId": "sub-45-3",
    "subcategoryName": "Product Research",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-831",
    "title": "Product Validation Manager",
    "categoryId": "cat-45",
    "categoryName": "Research & Development (R&D)",
    "subcategoryId": "sub-45-3",
    "subcategoryName": "Product Research",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-832",
    "title": "Technology Research Director",
    "categoryId": "cat-45",
    "categoryName": "Research & Development (R&D)",
    "subcategoryId": "sub-45-4",
    "subcategoryName": "Technology Research",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-833",
    "title": "Research Engineer",
    "categoryId": "cat-45",
    "categoryName": "Research & Development (R&D)",
    "subcategoryId": "sub-45-4",
    "subcategoryName": "Technology Research",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-834",
    "title": "Technology Fellow",
    "categoryId": "cat-45",
    "categoryName": "Research & Development (R&D)",
    "subcategoryId": "sub-45-4",
    "subcategoryName": "Technology Research",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-835",
    "title": "Innovation Research Lead",
    "categoryId": "cat-45",
    "categoryName": "Research & Development (R&D)",
    "subcategoryId": "sub-45-4",
    "subcategoryName": "Technology Research",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-836",
    "title": "Laboratory Director",
    "categoryId": "cat-45",
    "categoryName": "Research & Development (R&D)",
    "subcategoryId": "sub-45-5",
    "subcategoryName": "Research Operations",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-837",
    "title": "Lab Manager",
    "categoryId": "cat-45",
    "categoryName": "Research & Development (R&D)",
    "subcategoryId": "sub-45-5",
    "subcategoryName": "Research Operations",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-838",
    "title": "Testing Director",
    "categoryId": "cat-45",
    "categoryName": "Research & Development (R&D)",
    "subcategoryId": "sub-45-5",
    "subcategoryName": "Research Operations",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-839",
    "title": "Research Coordinator",
    "categoryId": "cat-45",
    "categoryName": "Research & Development (R&D)",
    "subcategoryId": "sub-45-5",
    "subcategoryName": "Research Operations",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-840",
    "title": "Chief Operating Officer (COO)",
    "categoryId": "cat-46",
    "categoryName": "Operations Efficiency",
    "subcategoryId": "sub-46-1",
    "subcategoryName": "Operations Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-841",
    "title": "Operations Excellence Director",
    "categoryId": "cat-46",
    "categoryName": "Operations Efficiency",
    "subcategoryId": "sub-46-1",
    "subcategoryName": "Operations Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-842",
    "title": "Head of Operations Excellence",
    "categoryId": "cat-46",
    "categoryName": "Operations Efficiency",
    "subcategoryId": "sub-46-1",
    "subcategoryName": "Operations Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-843",
    "title": "Operations Manager",
    "categoryId": "cat-46",
    "categoryName": "Operations Efficiency",
    "subcategoryId": "sub-46-1",
    "subcategoryName": "Operations Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-844",
    "title": "Operational Excellence Director",
    "categoryId": "cat-46",
    "categoryName": "Operations Efficiency",
    "subcategoryId": "sub-46-2",
    "subcategoryName": "Process Excellence",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-845",
    "title": "Process Improvement Manager",
    "categoryId": "cat-46",
    "categoryName": "Operations Efficiency",
    "subcategoryId": "sub-46-2",
    "subcategoryName": "Process Excellence",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-846",
    "title": "Lean Six Sigma Master Black Belt",
    "categoryId": "cat-46",
    "categoryName": "Operations Efficiency",
    "subcategoryId": "sub-46-2",
    "subcategoryName": "Process Excellence",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-847",
    "title": "Continuous Improvement Manager",
    "categoryId": "cat-46",
    "categoryName": "Operations Efficiency",
    "subcategoryId": "sub-46-2",
    "subcategoryName": "Process Excellence",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-848",
    "title": "Business Excellence Director",
    "categoryId": "cat-46",
    "categoryName": "Operations Efficiency",
    "subcategoryId": "sub-46-3",
    "subcategoryName": "Business Excellence",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-849",
    "title": "Performance Excellence Manager",
    "categoryId": "cat-46",
    "categoryName": "Operations Efficiency",
    "subcategoryId": "sub-46-3",
    "subcategoryName": "Business Excellence",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-850",
    "title": "Operational Performance Lead",
    "categoryId": "cat-46",
    "categoryName": "Operations Efficiency",
    "subcategoryId": "sub-46-3",
    "subcategoryName": "Business Excellence",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-851",
    "title": "Productivity Manager",
    "categoryId": "cat-46",
    "categoryName": "Operations Efficiency",
    "subcategoryId": "sub-46-3",
    "subcategoryName": "Business Excellence",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-852",
    "title": "Business Process Manager",
    "categoryId": "cat-46",
    "categoryName": "Operations Efficiency",
    "subcategoryId": "sub-46-4",
    "subcategoryName": "Process Management",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-853",
    "title": "Process Architect",
    "categoryId": "cat-46",
    "categoryName": "Operations Efficiency",
    "subcategoryId": "sub-46-4",
    "subcategoryName": "Process Management",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-854",
    "title": "Process Analyst",
    "categoryId": "cat-46",
    "categoryName": "Operations Efficiency",
    "subcategoryId": "sub-46-4",
    "subcategoryName": "Process Management",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-855",
    "title": "Workflow Manager",
    "categoryId": "cat-46",
    "categoryName": "Operations Efficiency",
    "subcategoryId": "sub-46-4",
    "subcategoryName": "Process Management",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-856",
    "title": "Operations Analytics Manager",
    "categoryId": "cat-46",
    "categoryName": "Operations Efficiency",
    "subcategoryId": "sub-46-5",
    "subcategoryName": "Operational Analytics",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-857",
    "title": "KPI Manager",
    "categoryId": "cat-46",
    "categoryName": "Operations Efficiency",
    "subcategoryId": "sub-46-5",
    "subcategoryName": "Operational Analytics",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-858",
    "title": "Efficiency Analyst",
    "categoryId": "cat-46",
    "categoryName": "Operations Efficiency",
    "subcategoryId": "sub-46-5",
    "subcategoryName": "Operational Analytics",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-859",
    "title": "Performance Analyst",
    "categoryId": "cat-46",
    "categoryName": "Operations Efficiency",
    "subcategoryId": "sub-46-5",
    "subcategoryName": "Operational Analytics",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-860",
    "title": "Chief Manufacturing Officer",
    "categoryId": "cat-47",
    "categoryName": "Manufacturing",
    "subcategoryId": "sub-47-1",
    "subcategoryName": "Manufacturing Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-861",
    "title": "Manufacturing Director",
    "categoryId": "cat-47",
    "categoryName": "Manufacturing",
    "subcategoryId": "sub-47-1",
    "subcategoryName": "Manufacturing Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-862",
    "title": "Head of Manufacturing",
    "categoryId": "cat-47",
    "categoryName": "Manufacturing",
    "subcategoryId": "sub-47-1",
    "subcategoryName": "Manufacturing Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-863",
    "title": "Plant Director",
    "categoryId": "cat-47",
    "categoryName": "Manufacturing",
    "subcategoryId": "sub-47-1",
    "subcategoryName": "Manufacturing Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-864",
    "title": "Manufacturing Manager",
    "categoryId": "cat-47",
    "categoryName": "Manufacturing",
    "subcategoryId": "sub-47-1",
    "subcategoryName": "Manufacturing Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-865",
    "title": "Factory Manager",
    "categoryId": "cat-47",
    "categoryName": "Manufacturing",
    "subcategoryId": "sub-47-2",
    "subcategoryName": "Factory Operations",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-866",
    "title": "Plant Manager",
    "categoryId": "cat-47",
    "categoryName": "Manufacturing",
    "subcategoryId": "sub-47-2",
    "subcategoryName": "Factory Operations",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-867",
    "title": "Shop Floor Manager",
    "categoryId": "cat-47",
    "categoryName": "Manufacturing",
    "subcategoryId": "sub-47-2",
    "subcategoryName": "Factory Operations",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-868",
    "title": "Unit Head",
    "categoryId": "cat-47",
    "categoryName": "Manufacturing",
    "subcategoryId": "sub-47-2",
    "subcategoryName": "Factory Operations",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-869",
    "title": "Manufacturing Engineering Director",
    "categoryId": "cat-47",
    "categoryName": "Manufacturing",
    "subcategoryId": "sub-47-3",
    "subcategoryName": "Manufacturing Engineering",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-870",
    "title": "Industrial Engineer",
    "categoryId": "cat-47",
    "categoryName": "Manufacturing",
    "subcategoryId": "sub-47-3",
    "subcategoryName": "Manufacturing Engineering",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-871",
    "title": "Process Engineer",
    "categoryId": "cat-47",
    "categoryName": "Manufacturing",
    "subcategoryId": "sub-47-3",
    "subcategoryName": "Manufacturing Engineering",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-872",
    "title": "Production Engineer",
    "categoryId": "cat-47",
    "categoryName": "Manufacturing",
    "subcategoryId": "sub-47-3",
    "subcategoryName": "Manufacturing Engineering",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-873",
    "title": "Industry 4.0 Director",
    "categoryId": "cat-47",
    "categoryName": "Manufacturing",
    "subcategoryId": "sub-47-4",
    "subcategoryName": "Smart Manufacturing",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-874",
    "title": "Smart Factory Manager",
    "categoryId": "cat-47",
    "categoryName": "Manufacturing",
    "subcategoryId": "sub-47-4",
    "subcategoryName": "Smart Manufacturing",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-875",
    "title": "Automation Manufacturing Lead",
    "categoryId": "cat-47",
    "categoryName": "Manufacturing",
    "subcategoryId": "sub-47-4",
    "subcategoryName": "Smart Manufacturing",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-876",
    "title": "Digital Manufacturing Manager",
    "categoryId": "cat-47",
    "categoryName": "Manufacturing",
    "subcategoryId": "sub-47-4",
    "subcategoryName": "Smart Manufacturing",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-877",
    "title": "Lean Manufacturing Head",
    "categoryId": "cat-47",
    "categoryName": "Manufacturing",
    "subcategoryId": "sub-47-5",
    "subcategoryName": "Manufacturing Excellence",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-878",
    "title": "TPM Manager",
    "categoryId": "cat-47",
    "categoryName": "Manufacturing",
    "subcategoryId": "sub-47-5",
    "subcategoryName": "Manufacturing Excellence",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-879",
    "title": "Operational Excellence Manager",
    "categoryId": "cat-47",
    "categoryName": "Manufacturing",
    "subcategoryId": "sub-47-5",
    "subcategoryName": "Manufacturing Excellence",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-880",
    "title": "Continuous Improvement Engineer",
    "categoryId": "cat-47",
    "categoryName": "Manufacturing",
    "subcategoryId": "sub-47-5",
    "subcategoryName": "Manufacturing Excellence",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-881",
    "title": "Production Director",
    "categoryId": "cat-48",
    "categoryName": "Production",
    "subcategoryId": "sub-48-1",
    "subcategoryName": "Production Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-882",
    "title": "Head of Production",
    "categoryId": "cat-48",
    "categoryName": "Production",
    "subcategoryId": "sub-48-1",
    "subcategoryName": "Production Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-883",
    "title": "Production Manager",
    "categoryId": "cat-48",
    "categoryName": "Production",
    "subcategoryId": "sub-48-1",
    "subcategoryName": "Production Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-884",
    "title": "Production Superintendent",
    "categoryId": "cat-48",
    "categoryName": "Production",
    "subcategoryId": "sub-48-1",
    "subcategoryName": "Production Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-885",
    "title": "Production Planning Director",
    "categoryId": "cat-48",
    "categoryName": "Production",
    "subcategoryId": "sub-48-2",
    "subcategoryName": "Production Planning",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-886",
    "title": "Planning Manager",
    "categoryId": "cat-48",
    "categoryName": "Production",
    "subcategoryId": "sub-48-2",
    "subcategoryName": "Production Planning",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-887",
    "title": "Scheduling Manager",
    "categoryId": "cat-48",
    "categoryName": "Production",
    "subcategoryId": "sub-48-2",
    "subcategoryName": "Production Planning",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-888",
    "title": "Capacity Planning Manager",
    "categoryId": "cat-48",
    "categoryName": "Production",
    "subcategoryId": "sub-48-2",
    "subcategoryName": "Production Planning",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-889",
    "title": "Shift Manager",
    "categoryId": "cat-48",
    "categoryName": "Production",
    "subcategoryId": "sub-48-3",
    "subcategoryName": "Production Operations",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-890",
    "title": "Line Manager",
    "categoryId": "cat-48",
    "categoryName": "Production",
    "subcategoryId": "sub-48-3",
    "subcategoryName": "Production Operations",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-891",
    "title": "Assembly Manager",
    "categoryId": "cat-48",
    "categoryName": "Production",
    "subcategoryId": "sub-48-3",
    "subcategoryName": "Production Operations",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-892",
    "title": "Production Supervisor",
    "categoryId": "cat-48",
    "categoryName": "Production",
    "subcategoryId": "sub-48-3",
    "subcategoryName": "Production Operations",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-893",
    "title": "Production Control Manager",
    "categoryId": "cat-48",
    "categoryName": "Production",
    "subcategoryId": "sub-48-4",
    "subcategoryName": "Production Control",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-894",
    "title": "Inventory Planning Manager",
    "categoryId": "cat-48",
    "categoryName": "Production",
    "subcategoryId": "sub-48-4",
    "subcategoryName": "Production Control",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-895",
    "title": "Materials Planning Manager",
    "categoryId": "cat-48",
    "categoryName": "Production",
    "subcategoryId": "sub-48-4",
    "subcategoryName": "Production Control",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-896",
    "title": "Output Controller",
    "categoryId": "cat-48",
    "categoryName": "Production",
    "subcategoryId": "sub-48-4",
    "subcategoryName": "Production Control",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-897",
    "title": "Production Excellence Manager",
    "categoryId": "cat-48",
    "categoryName": "Production",
    "subcategoryId": "sub-48-5",
    "subcategoryName": "Production Improvement",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-898",
    "title": "Kaizen Leader",
    "categoryId": "cat-48",
    "categoryName": "Production",
    "subcategoryId": "sub-48-5",
    "subcategoryName": "Production Improvement",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-899",
    "title": "Continuous Improvement Specialist",
    "categoryId": "cat-48",
    "categoryName": "Production",
    "subcategoryId": "sub-48-5",
    "subcategoryName": "Production Improvement",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-900",
    "title": "Productivity Engineer",
    "categoryId": "cat-48",
    "categoryName": "Production",
    "subcategoryId": "sub-48-5",
    "subcategoryName": "Production Improvement",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-901",
    "title": "Chief Quality Officer (CQO)",
    "categoryId": "cat-49",
    "categoryName": "Quality Assurance",
    "subcategoryId": "sub-49-1",
    "subcategoryName": "Quality Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-902",
    "title": "Quality Director",
    "categoryId": "cat-49",
    "categoryName": "Quality Assurance",
    "subcategoryId": "sub-49-1",
    "subcategoryName": "Quality Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-903",
    "title": "Head of Quality",
    "categoryId": "cat-49",
    "categoryName": "Quality Assurance",
    "subcategoryId": "sub-49-1",
    "subcategoryName": "Quality Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-904",
    "title": "QA Manager",
    "categoryId": "cat-49",
    "categoryName": "Quality Assurance",
    "subcategoryId": "sub-49-1",
    "subcategoryName": "Quality Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-905",
    "title": "Quality Assurance Manager",
    "categoryId": "cat-49",
    "categoryName": "Quality Assurance",
    "subcategoryId": "sub-49-1",
    "subcategoryName": "Quality Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-906",
    "title": "QC Director",
    "categoryId": "cat-49",
    "categoryName": "Quality Assurance",
    "subcategoryId": "sub-49-2",
    "subcategoryName": "Quality Control",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-907",
    "title": "QC Manager",
    "categoryId": "cat-49",
    "categoryName": "Quality Assurance",
    "subcategoryId": "sub-49-2",
    "subcategoryName": "Quality Control",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-908",
    "title": "Inspection Manager",
    "categoryId": "cat-49",
    "categoryName": "Quality Assurance",
    "subcategoryId": "sub-49-2",
    "subcategoryName": "Quality Control",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-909",
    "title": "Quality Inspector",
    "categoryId": "cat-49",
    "categoryName": "Quality Assurance",
    "subcategoryId": "sub-49-2",
    "subcategoryName": "Quality Control",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-910",
    "title": "Quality Systems Director",
    "categoryId": "cat-49",
    "categoryName": "Quality Assurance",
    "subcategoryId": "sub-49-3",
    "subcategoryName": "Quality Systems",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-911",
    "title": "ISO Manager",
    "categoryId": "cat-49",
    "categoryName": "Quality Assurance",
    "subcategoryId": "sub-49-3",
    "subcategoryName": "Quality Systems",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-912",
    "title": "Compliance Quality Manager",
    "categoryId": "cat-49",
    "categoryName": "Quality Assurance",
    "subcategoryId": "sub-49-3",
    "subcategoryName": "Quality Systems",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-913",
    "title": "Documentation Manager",
    "categoryId": "cat-49",
    "categoryName": "Quality Assurance",
    "subcategoryId": "sub-49-3",
    "subcategoryName": "Quality Systems",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-914",
    "title": "Six Sigma Director",
    "categoryId": "cat-49",
    "categoryName": "Quality Assurance",
    "subcategoryId": "sub-49-4",
    "subcategoryName": "Continuous Improvement",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-915",
    "title": "Lean Quality Manager",
    "categoryId": "cat-49",
    "categoryName": "Quality Assurance",
    "subcategoryId": "sub-49-4",
    "subcategoryName": "Continuous Improvement",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-916",
    "title": "Process Quality Manager",
    "categoryId": "cat-49",
    "categoryName": "Quality Assurance",
    "subcategoryId": "sub-49-4",
    "subcategoryName": "Continuous Improvement",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-917",
    "title": "Operational Quality Lead",
    "categoryId": "cat-49",
    "categoryName": "Quality Assurance",
    "subcategoryId": "sub-49-4",
    "subcategoryName": "Continuous Improvement",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-918",
    "title": "Supplier Quality Manager",
    "categoryId": "cat-49",
    "categoryName": "Quality Assurance",
    "subcategoryId": "sub-49-5",
    "subcategoryName": "Customer Quality",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-919",
    "title": "Customer Quality Manager",
    "categoryId": "cat-49",
    "categoryName": "Quality Assurance",
    "subcategoryId": "sub-49-5",
    "subcategoryName": "Customer Quality",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-920",
    "title": "Product Quality Manager",
    "categoryId": "cat-49",
    "categoryName": "Quality Assurance",
    "subcategoryId": "sub-49-5",
    "subcategoryName": "Customer Quality",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-921",
    "title": "Quality Excellence Lead",
    "categoryId": "cat-49",
    "categoryName": "Quality Assurance",
    "subcategoryId": "sub-49-5",
    "subcategoryName": "Customer Quality",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-922",
    "title": "Chief Warehouse Officer",
    "categoryId": "cat-50",
    "categoryName": "Warehouse & Distribution",
    "subcategoryId": "sub-50-1",
    "subcategoryName": "Warehouse Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-923",
    "title": "Warehouse Director",
    "categoryId": "cat-50",
    "categoryName": "Warehouse & Distribution",
    "subcategoryId": "sub-50-1",
    "subcategoryName": "Warehouse Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-924",
    "title": "Head of Warehousing",
    "categoryId": "cat-50",
    "categoryName": "Warehouse & Distribution",
    "subcategoryId": "sub-50-1",
    "subcategoryName": "Warehouse Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-925",
    "title": "Warehouse Manager",
    "categoryId": "cat-50",
    "categoryName": "Warehouse & Distribution",
    "subcategoryId": "sub-50-1",
    "subcategoryName": "Warehouse Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-926",
    "title": "Distribution Manager",
    "categoryId": "cat-50",
    "categoryName": "Warehouse & Distribution",
    "subcategoryId": "sub-50-1",
    "subcategoryName": "Warehouse Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-927",
    "title": "Warehouse Operations Director",
    "categoryId": "cat-50",
    "categoryName": "Warehouse & Distribution",
    "subcategoryId": "sub-50-2",
    "subcategoryName": "Warehouse Operations",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-928",
    "title": "Inventory Control Manager",
    "categoryId": "cat-50",
    "categoryName": "Warehouse & Distribution",
    "subcategoryId": "sub-50-2",
    "subcategoryName": "Warehouse Operations",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-929",
    "title": "Warehouse Supervisor",
    "categoryId": "cat-50",
    "categoryName": "Warehouse & Distribution",
    "subcategoryId": "sub-50-2",
    "subcategoryName": "Warehouse Operations",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-930",
    "title": "Storage Operations Manager",
    "categoryId": "cat-50",
    "categoryName": "Warehouse & Distribution",
    "subcategoryId": "sub-50-2",
    "subcategoryName": "Warehouse Operations",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-931",
    "title": "Distribution Director",
    "categoryId": "cat-50",
    "categoryName": "Warehouse & Distribution",
    "subcategoryId": "sub-50-3",
    "subcategoryName": "Distribution",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-932",
    "title": "Distribution Center Manager",
    "categoryId": "cat-50",
    "categoryName": "Warehouse & Distribution",
    "subcategoryId": "sub-50-3",
    "subcategoryName": "Distribution",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-933",
    "title": "Dispatch Manager",
    "categoryId": "cat-50",
    "categoryName": "Warehouse & Distribution",
    "subcategoryId": "sub-50-3",
    "subcategoryName": "Distribution",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-934",
    "title": "Delivery Operations Manager",
    "categoryId": "cat-50",
    "categoryName": "Warehouse & Distribution",
    "subcategoryId": "sub-50-3",
    "subcategoryName": "Distribution",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-935",
    "title": "Inventory Manager",
    "categoryId": "cat-50",
    "categoryName": "Warehouse & Distribution",
    "subcategoryId": "sub-50-4",
    "subcategoryName": "Inventory Management",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-936",
    "title": "Inventory Planning Manager",
    "categoryId": "cat-50",
    "categoryName": "Warehouse & Distribution",
    "subcategoryId": "sub-50-4",
    "subcategoryName": "Inventory Management",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-937",
    "title": "Stock Control Manager",
    "categoryId": "cat-50",
    "categoryName": "Warehouse & Distribution",
    "subcategoryId": "sub-50-4",
    "subcategoryName": "Inventory Management",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-938",
    "title": "Materials Controller",
    "categoryId": "cat-50",
    "categoryName": "Warehouse & Distribution",
    "subcategoryId": "sub-50-4",
    "subcategoryName": "Inventory Management",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-939",
    "title": "Logistics Excellence Manager",
    "categoryId": "cat-50",
    "categoryName": "Warehouse & Distribution",
    "subcategoryId": "sub-50-5",
    "subcategoryName": "Logistics Excellence",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-940",
    "title": "Warehouse Excellence Lead",
    "categoryId": "cat-50",
    "categoryName": "Warehouse & Distribution",
    "subcategoryId": "sub-50-5",
    "subcategoryName": "Logistics Excellence",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-941",
    "title": "Fulfillment Manager",
    "categoryId": "cat-50",
    "categoryName": "Warehouse & Distribution",
    "subcategoryId": "sub-50-5",
    "subcategoryName": "Logistics Excellence",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-942",
    "title": "Supply Operations Manager",
    "categoryId": "cat-50",
    "categoryName": "Warehouse & Distribution",
    "subcategoryId": "sub-50-5",
    "subcategoryName": "Logistics Excellence",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-943",
    "title": "Lean Director",
    "categoryId": "cat-51",
    "categoryName": "Lean Manufacturing",
    "subcategoryId": "sub-51-1",
    "subcategoryName": "Lean Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-944",
    "title": "Head of Lean Manufacturing",
    "categoryId": "cat-51",
    "categoryName": "Lean Manufacturing",
    "subcategoryId": "sub-51-1",
    "subcategoryName": "Lean Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-945",
    "title": "Lean Manager",
    "categoryId": "cat-51",
    "categoryName": "Lean Manufacturing",
    "subcategoryId": "sub-51-1",
    "subcategoryName": "Lean Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-946",
    "title": "Lean Transformation Lead",
    "categoryId": "cat-51",
    "categoryName": "Lean Manufacturing",
    "subcategoryId": "sub-51-1",
    "subcategoryName": "Lean Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-947",
    "title": "Kaizen Leader",
    "categoryId": "cat-51",
    "categoryName": "Lean Manufacturing",
    "subcategoryId": "sub-51-2",
    "subcategoryName": "Continuous Improvement",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-948",
    "title": "Continuous Improvement Director",
    "categoryId": "cat-51",
    "categoryName": "Lean Manufacturing",
    "subcategoryId": "sub-51-2",
    "subcategoryName": "Continuous Improvement",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-949",
    "title": "Lean Six Sigma Black Belt",
    "categoryId": "cat-51",
    "categoryName": "Lean Manufacturing",
    "subcategoryId": "sub-51-2",
    "subcategoryName": "Continuous Improvement",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-950",
    "title": "Lean Coach",
    "categoryId": "cat-51",
    "categoryName": "Lean Manufacturing",
    "subcategoryId": "sub-51-2",
    "subcategoryName": "Continuous Improvement",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-951",
    "title": "Manufacturing Excellence Director",
    "categoryId": "cat-51",
    "categoryName": "Lean Manufacturing",
    "subcategoryId": "sub-51-3",
    "subcategoryName": "Manufacturing Excellence",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-952",
    "title": "TPM Manager",
    "categoryId": "cat-51",
    "categoryName": "Lean Manufacturing",
    "subcategoryId": "sub-51-3",
    "subcategoryName": "Manufacturing Excellence",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-953",
    "title": "Operational Excellence Manager",
    "categoryId": "cat-51",
    "categoryName": "Lean Manufacturing",
    "subcategoryId": "sub-51-3",
    "subcategoryName": "Manufacturing Excellence",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-954",
    "title": "Process Excellence Manager",
    "categoryId": "cat-51",
    "categoryName": "Lean Manufacturing",
    "subcategoryId": "sub-51-3",
    "subcategoryName": "Manufacturing Excellence",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-955",
    "title": "Lean Engineer",
    "categoryId": "cat-51",
    "categoryName": "Lean Manufacturing",
    "subcategoryId": "sub-51-4",
    "subcategoryName": "Lean Engineering",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-956",
    "title": "Value Stream Manager",
    "categoryId": "cat-51",
    "categoryName": "Lean Manufacturing",
    "subcategoryId": "sub-51-4",
    "subcategoryName": "Lean Engineering",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-957",
    "title": "Process Optimization Engineer",
    "categoryId": "cat-51",
    "categoryName": "Lean Manufacturing",
    "subcategoryId": "sub-51-4",
    "subcategoryName": "Lean Engineering",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-958",
    "title": "Industrial Improvement Lead",
    "categoryId": "cat-51",
    "categoryName": "Lean Manufacturing",
    "subcategoryId": "sub-51-4",
    "subcategoryName": "Lean Engineering",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-959",
    "title": "Chief International Business Officer",
    "categoryId": "cat-52",
    "categoryName": "International Business",
    "subcategoryId": "sub-52-1",
    "subcategoryName": "International Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-960",
    "title": "International Business Director",
    "categoryId": "cat-52",
    "categoryName": "International Business",
    "subcategoryId": "sub-52-1",
    "subcategoryName": "International Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-961",
    "title": "Head of International Business",
    "categoryId": "cat-52",
    "categoryName": "International Business",
    "subcategoryId": "sub-52-1",
    "subcategoryName": "International Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-962",
    "title": "VP Global Business",
    "categoryId": "cat-52",
    "categoryName": "International Business",
    "subcategoryId": "sub-52-1",
    "subcategoryName": "International Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-963",
    "title": "Global Markets Director",
    "categoryId": "cat-52",
    "categoryName": "International Business",
    "subcategoryId": "sub-52-2",
    "subcategoryName": "Global Markets",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-964",
    "title": "Regional Business Director",
    "categoryId": "cat-52",
    "categoryName": "International Business",
    "subcategoryId": "sub-52-2",
    "subcategoryName": "Global Markets",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-965",
    "title": "Country Manager",
    "categoryId": "cat-52",
    "categoryName": "International Business",
    "subcategoryId": "sub-52-2",
    "subcategoryName": "Global Markets",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-966",
    "title": "International Sales Director",
    "categoryId": "cat-52",
    "categoryName": "International Business",
    "subcategoryId": "sub-52-2",
    "subcategoryName": "Global Markets",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-967",
    "title": "Export Director",
    "categoryId": "cat-52",
    "categoryName": "International Business",
    "subcategoryId": "sub-52-3",
    "subcategoryName": "Export & Trade",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-968",
    "title": "Export Manager",
    "categoryId": "cat-52",
    "categoryName": "International Business",
    "subcategoryId": "sub-52-3",
    "subcategoryName": "Export & Trade",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-969",
    "title": "Trade Development Manager",
    "categoryId": "cat-52",
    "categoryName": "International Business",
    "subcategoryId": "sub-52-3",
    "subcategoryName": "Export & Trade",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-970",
    "title": "Global Trade Manager",
    "categoryId": "cat-52",
    "categoryName": "International Business",
    "subcategoryId": "sub-52-3",
    "subcategoryName": "Export & Trade",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-971",
    "title": "Import Director",
    "categoryId": "cat-52",
    "categoryName": "International Business",
    "subcategoryId": "sub-52-4",
    "subcategoryName": "Import Operations",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-972",
    "title": "Import Manager",
    "categoryId": "cat-52",
    "categoryName": "International Business",
    "subcategoryId": "sub-52-4",
    "subcategoryName": "Import Operations",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-973",
    "title": "Customs Compliance Manager",
    "categoryId": "cat-52",
    "categoryName": "International Business",
    "subcategoryId": "sub-52-4",
    "subcategoryName": "Import Operations",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-974",
    "title": "Trade Compliance Manager",
    "categoryId": "cat-52",
    "categoryName": "International Business",
    "subcategoryId": "sub-52-4",
    "subcategoryName": "Import Operations",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-975",
    "title": "International Partnerships Director",
    "categoryId": "cat-52",
    "categoryName": "International Business",
    "subcategoryId": "sub-52-5",
    "subcategoryName": "International Partnerships",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-976",
    "title": "Cross-border Business Manager",
    "categoryId": "cat-52",
    "categoryName": "International Business",
    "subcategoryId": "sub-52-5",
    "subcategoryName": "International Partnerships",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-977",
    "title": "Global Alliance Manager",
    "categoryId": "cat-52",
    "categoryName": "International Business",
    "subcategoryId": "sub-52-5",
    "subcategoryName": "International Partnerships",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-978",
    "title": "International Expansion Lead",
    "categoryId": "cat-52",
    "categoryName": "International Business",
    "subcategoryId": "sub-52-5",
    "subcategoryName": "International Partnerships",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-979",
    "title": "Industrial Engineering Director",
    "categoryId": "cat-53",
    "categoryName": "Industrial Engineering",
    "subcategoryId": "sub-53-1",
    "subcategoryName": "Engineering Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-980",
    "title": "Head of Industrial Engineering",
    "categoryId": "cat-53",
    "categoryName": "Industrial Engineering",
    "subcategoryId": "sub-53-1",
    "subcategoryName": "Engineering Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-981",
    "title": "Industrial Engineering Manager",
    "categoryId": "cat-53",
    "categoryName": "Industrial Engineering",
    "subcategoryId": "sub-53-1",
    "subcategoryName": "Engineering Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-982",
    "title": "Chief Industrial Engineer",
    "categoryId": "cat-53",
    "categoryName": "Industrial Engineering",
    "subcategoryId": "sub-53-1",
    "subcategoryName": "Engineering Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-983",
    "title": "Process Engineering Director",
    "categoryId": "cat-53",
    "categoryName": "Industrial Engineering",
    "subcategoryId": "sub-53-2",
    "subcategoryName": "Process Engineering",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-984",
    "title": "Manufacturing Process Engineer",
    "categoryId": "cat-53",
    "categoryName": "Industrial Engineering",
    "subcategoryId": "sub-53-2",
    "subcategoryName": "Process Engineering",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-985",
    "title": "Process Optimization Manager",
    "categoryId": "cat-53",
    "categoryName": "Industrial Engineering",
    "subcategoryId": "sub-53-2",
    "subcategoryName": "Process Engineering",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-986",
    "title": "Production Systems Engineer",
    "categoryId": "cat-53",
    "categoryName": "Industrial Engineering",
    "subcategoryId": "sub-53-2",
    "subcategoryName": "Process Engineering",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-987",
    "title": "Productivity Director",
    "categoryId": "cat-53",
    "categoryName": "Industrial Engineering",
    "subcategoryId": "sub-53-3",
    "subcategoryName": "Productivity Engineering",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-988",
    "title": "Efficiency Engineer",
    "categoryId": "cat-53",
    "categoryName": "Industrial Engineering",
    "subcategoryId": "sub-53-3",
    "subcategoryName": "Productivity Engineering",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-989",
    "title": "Time & Motion Engineer",
    "categoryId": "cat-53",
    "categoryName": "Industrial Engineering",
    "subcategoryId": "sub-53-3",
    "subcategoryName": "Productivity Engineering",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-990",
    "title": "Operations Engineer",
    "categoryId": "cat-53",
    "categoryName": "Industrial Engineering",
    "subcategoryId": "sub-53-3",
    "subcategoryName": "Productivity Engineering",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-991",
    "title": "Systems Engineer",
    "categoryId": "cat-53",
    "categoryName": "Industrial Engineering",
    "subcategoryId": "sub-53-4",
    "subcategoryName": "Systems Engineering",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-992",
    "title": "Plant Layout Engineer",
    "categoryId": "cat-53",
    "categoryName": "Industrial Engineering",
    "subcategoryId": "sub-53-4",
    "subcategoryName": "Systems Engineering",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-993",
    "title": "Industrial Automation Engineer",
    "categoryId": "cat-53",
    "categoryName": "Industrial Engineering",
    "subcategoryId": "sub-53-4",
    "subcategoryName": "Systems Engineering",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-994",
    "title": "Reliability Engineer",
    "categoryId": "cat-53",
    "categoryName": "Industrial Engineering",
    "subcategoryId": "sub-53-4",
    "subcategoryName": "Systems Engineering",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-995",
    "title": "Maintenance Director",
    "categoryId": "cat-54",
    "categoryName": "Maintenance & Asset Management",
    "subcategoryId": "sub-54-1",
    "subcategoryName": "Maintenance Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-996",
    "title": "Head of Maintenance",
    "categoryId": "cat-54",
    "categoryName": "Maintenance & Asset Management",
    "subcategoryId": "sub-54-1",
    "subcategoryName": "Maintenance Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-997",
    "title": "Maintenance Manager",
    "categoryId": "cat-54",
    "categoryName": "Maintenance & Asset Management",
    "subcategoryId": "sub-54-1",
    "subcategoryName": "Maintenance Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-998",
    "title": "Engineering Maintenance Manager",
    "categoryId": "cat-54",
    "categoryName": "Maintenance & Asset Management",
    "subcategoryId": "sub-54-1",
    "subcategoryName": "Maintenance Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-999",
    "title": "Asset Director",
    "categoryId": "cat-54",
    "categoryName": "Maintenance & Asset Management",
    "subcategoryId": "sub-54-2",
    "subcategoryName": "Asset Management",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1000",
    "title": "Asset Manager",
    "categoryId": "cat-54",
    "categoryName": "Maintenance & Asset Management",
    "subcategoryId": "sub-54-2",
    "subcategoryName": "Asset Management",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1001",
    "title": "Asset Reliability Manager",
    "categoryId": "cat-54",
    "categoryName": "Maintenance & Asset Management",
    "subcategoryId": "sub-54-2",
    "subcategoryName": "Asset Management",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1002",
    "title": "Asset Performance Manager",
    "categoryId": "cat-54",
    "categoryName": "Maintenance & Asset Management",
    "subcategoryId": "sub-54-2",
    "subcategoryName": "Asset Management",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1003",
    "title": "Plant Maintenance Head",
    "categoryId": "cat-54",
    "categoryName": "Maintenance & Asset Management",
    "subcategoryId": "sub-54-3",
    "subcategoryName": "Plant Maintenance",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1004",
    "title": "Mechanical Maintenance Manager",
    "categoryId": "cat-54",
    "categoryName": "Maintenance & Asset Management",
    "subcategoryId": "sub-54-3",
    "subcategoryName": "Plant Maintenance",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1005",
    "title": "Electrical Maintenance Manager",
    "categoryId": "cat-54",
    "categoryName": "Maintenance & Asset Management",
    "subcategoryId": "sub-54-3",
    "subcategoryName": "Plant Maintenance",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1006",
    "title": "Utilities Maintenance Manager",
    "categoryId": "cat-54",
    "categoryName": "Maintenance & Asset Management",
    "subcategoryId": "sub-54-3",
    "subcategoryName": "Plant Maintenance",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1007",
    "title": "Reliability Director",
    "categoryId": "cat-54",
    "categoryName": "Maintenance & Asset Management",
    "subcategoryId": "sub-54-4",
    "subcategoryName": "Reliability",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1008",
    "title": "Predictive Maintenance Manager",
    "categoryId": "cat-54",
    "categoryName": "Maintenance & Asset Management",
    "subcategoryId": "sub-54-4",
    "subcategoryName": "Reliability",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1009",
    "title": "Preventive Maintenance Manager",
    "categoryId": "cat-54",
    "categoryName": "Maintenance & Asset Management",
    "subcategoryId": "sub-54-4",
    "subcategoryName": "Reliability",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1010",
    "title": "Condition Monitoring Engineer",
    "categoryId": "cat-54",
    "categoryName": "Maintenance & Asset Management",
    "subcategoryId": "sub-54-4",
    "subcategoryName": "Reliability",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1011",
    "title": "Facility Maintenance Manager",
    "categoryId": "cat-54",
    "categoryName": "Maintenance & Asset Management",
    "subcategoryId": "sub-54-5",
    "subcategoryName": "Facilities Maintenance",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1012",
    "title": "Building Services Manager",
    "categoryId": "cat-54",
    "categoryName": "Maintenance & Asset Management",
    "subcategoryId": "sub-54-5",
    "subcategoryName": "Facilities Maintenance",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1013",
    "title": "Infrastructure Maintenance Lead",
    "categoryId": "cat-54",
    "categoryName": "Maintenance & Asset Management",
    "subcategoryId": "sub-54-5",
    "subcategoryName": "Facilities Maintenance",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1014",
    "title": "Maintenance Planner",
    "categoryId": "cat-54",
    "categoryName": "Maintenance & Asset Management",
    "subcategoryId": "sub-54-5",
    "subcategoryName": "Facilities Maintenance",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1015",
    "title": "Chief Safety Officer",
    "categoryId": "cat-55",
    "categoryName": "Industrial Safety & EHS",
    "subcategoryId": "sub-55-1",
    "subcategoryName": "Safety Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1016",
    "title": "EHS Director",
    "categoryId": "cat-55",
    "categoryName": "Industrial Safety & EHS",
    "subcategoryId": "sub-55-1",
    "subcategoryName": "Safety Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1017",
    "title": "Head of Industrial Safety",
    "categoryId": "cat-55",
    "categoryName": "Industrial Safety & EHS",
    "subcategoryId": "sub-55-1",
    "subcategoryName": "Safety Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1018",
    "title": "Safety Manager",
    "categoryId": "cat-55",
    "categoryName": "Industrial Safety & EHS",
    "subcategoryId": "sub-55-1",
    "subcategoryName": "Safety Leadership",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1019",
    "title": "Occupational Safety Director",
    "categoryId": "cat-55",
    "categoryName": "Industrial Safety & EHS",
    "subcategoryId": "sub-55-2",
    "subcategoryName": "Occupational Safety",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1020",
    "title": "Safety Engineer",
    "categoryId": "cat-55",
    "categoryName": "Industrial Safety & EHS",
    "subcategoryId": "sub-55-2",
    "subcategoryName": "Occupational Safety",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1021",
    "title": "Workplace Safety Manager",
    "categoryId": "cat-55",
    "categoryName": "Industrial Safety & EHS",
    "subcategoryId": "sub-55-2",
    "subcategoryName": "Occupational Safety",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1022",
    "title": "Industrial Hygiene Manager",
    "categoryId": "cat-55",
    "categoryName": "Industrial Safety & EHS",
    "subcategoryId": "sub-55-2",
    "subcategoryName": "Occupational Safety",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1023",
    "title": "Environment Health Director",
    "categoryId": "cat-55",
    "categoryName": "Industrial Safety & EHS",
    "subcategoryId": "sub-55-3",
    "subcategoryName": "Environmental Health",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1024",
    "title": "Environmental Safety Manager",
    "categoryId": "cat-55",
    "categoryName": "Industrial Safety & EHS",
    "subcategoryId": "sub-55-3",
    "subcategoryName": "Environmental Health",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1025",
    "title": "Sustainability Safety Lead",
    "categoryId": "cat-55",
    "categoryName": "Industrial Safety & EHS",
    "subcategoryId": "sub-55-3",
    "subcategoryName": "Environmental Health",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1026",
    "title": "Compliance Safety Manager",
    "categoryId": "cat-55",
    "categoryName": "Industrial Safety & EHS",
    "subcategoryId": "sub-55-3",
    "subcategoryName": "Environmental Health",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1027",
    "title": "Emergency Response Director",
    "categoryId": "cat-55",
    "categoryName": "Industrial Safety & EHS",
    "subcategoryId": "sub-55-4",
    "subcategoryName": "Emergency Management",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1028",
    "title": "Fire Safety Manager",
    "categoryId": "cat-55",
    "categoryName": "Industrial Safety & EHS",
    "subcategoryId": "sub-55-4",
    "subcategoryName": "Emergency Management",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1029",
    "title": "Disaster Recovery Manager",
    "categoryId": "cat-55",
    "categoryName": "Industrial Safety & EHS",
    "subcategoryId": "sub-55-4",
    "subcategoryName": "Emergency Management",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1030",
    "title": "Crisis Response Lead",
    "categoryId": "cat-55",
    "categoryName": "Industrial Safety & EHS",
    "subcategoryId": "sub-55-4",
    "subcategoryName": "Emergency Management",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1031",
    "title": "Safety Excellence Manager",
    "categoryId": "cat-55",
    "categoryName": "Industrial Safety & EHS",
    "subcategoryId": "sub-55-5",
    "subcategoryName": "Safety Excellence",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1032",
    "title": "Safety Training Lead",
    "categoryId": "cat-55",
    "categoryName": "Industrial Safety & EHS",
    "subcategoryId": "sub-55-5",
    "subcategoryName": "Safety Excellence",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1033",
    "title": "Incident Investigation Manager",
    "categoryId": "cat-55",
    "categoryName": "Industrial Safety & EHS",
    "subcategoryId": "sub-55-5",
    "subcategoryName": "Safety Excellence",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1034",
    "title": "Risk Prevention Manager",
    "categoryId": "cat-55",
    "categoryName": "Industrial Safety & EHS",
    "subcategoryId": "sub-55-5",
    "subcategoryName": "Safety Excellence",
    "groupName": "Manufacturing & Operations"
  },
  {
    "id": "t-1035",
    "title": "Chief Procurement Officer (CPO)",
    "categoryId": "cat-56",
    "categoryName": "Procurement",
    "subcategoryId": "sub-56-1",
    "subcategoryName": "Procurement Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1036",
    "title": "Procurement Director",
    "categoryId": "cat-56",
    "categoryName": "Procurement",
    "subcategoryId": "sub-56-1",
    "subcategoryName": "Procurement Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1037",
    "title": "Head of Procurement",
    "categoryId": "cat-56",
    "categoryName": "Procurement",
    "subcategoryId": "sub-56-1",
    "subcategoryName": "Procurement Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1038",
    "title": "Procurement Manager",
    "categoryId": "cat-56",
    "categoryName": "Procurement",
    "subcategoryId": "sub-56-1",
    "subcategoryName": "Procurement Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1039",
    "title": "Purchasing Director",
    "categoryId": "cat-56",
    "categoryName": "Procurement",
    "subcategoryId": "sub-56-2",
    "subcategoryName": "Purchasing",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1040",
    "title": "Purchasing Manager",
    "categoryId": "cat-56",
    "categoryName": "Procurement",
    "subcategoryId": "sub-56-2",
    "subcategoryName": "Purchasing",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1041",
    "title": "Senior Buyer",
    "categoryId": "cat-56",
    "categoryName": "Procurement",
    "subcategoryId": "sub-56-2",
    "subcategoryName": "Purchasing",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1042",
    "title": "Procurement Executive",
    "categoryId": "cat-56",
    "categoryName": "Procurement",
    "subcategoryId": "sub-56-2",
    "subcategoryName": "Purchasing",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1043",
    "title": "Vendor Director",
    "categoryId": "cat-56",
    "categoryName": "Procurement",
    "subcategoryId": "sub-56-3",
    "subcategoryName": "Vendor Management",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1044",
    "title": "Supplier Relationship Manager",
    "categoryId": "cat-56",
    "categoryName": "Procurement",
    "subcategoryId": "sub-56-3",
    "subcategoryName": "Vendor Management",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1045",
    "title": "Vendor Development Manager",
    "categoryId": "cat-56",
    "categoryName": "Procurement",
    "subcategoryId": "sub-56-3",
    "subcategoryName": "Vendor Management",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1046",
    "title": "Supplier Quality Manager",
    "categoryId": "cat-56",
    "categoryName": "Procurement",
    "subcategoryId": "sub-56-3",
    "subcategoryName": "Vendor Management",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1047",
    "title": "Category Manager",
    "categoryId": "cat-56",
    "categoryName": "Procurement",
    "subcategoryId": "sub-56-4",
    "subcategoryName": "Category Procurement",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1048",
    "title": "Commodity Manager",
    "categoryId": "cat-56",
    "categoryName": "Procurement",
    "subcategoryId": "sub-56-4",
    "subcategoryName": "Category Procurement",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1049",
    "title": "Sourcing Manager",
    "categoryId": "cat-56",
    "categoryName": "Procurement",
    "subcategoryId": "sub-56-4",
    "subcategoryName": "Category Procurement",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1050",
    "title": "Spend Analytics Manager",
    "categoryId": "cat-56",
    "categoryName": "Procurement",
    "subcategoryId": "sub-56-4",
    "subcategoryName": "Category Procurement",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1051",
    "title": "Procurement Excellence Director",
    "categoryId": "cat-56",
    "categoryName": "Procurement",
    "subcategoryId": "sub-56-5",
    "subcategoryName": "Procurement Excellence",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1052",
    "title": "Procurement Operations Manager",
    "categoryId": "cat-56",
    "categoryName": "Procurement",
    "subcategoryId": "sub-56-5",
    "subcategoryName": "Procurement Excellence",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1053",
    "title": "Procurement Analyst",
    "categoryId": "cat-56",
    "categoryName": "Procurement",
    "subcategoryId": "sub-56-5",
    "subcategoryName": "Procurement Excellence",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1054",
    "title": "Cost Optimization Manager",
    "categoryId": "cat-56",
    "categoryName": "Procurement",
    "subcategoryId": "sub-56-5",
    "subcategoryName": "Procurement Excellence",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1055",
    "title": "Strategic Sourcing Director",
    "categoryId": "cat-57",
    "categoryName": "Strategic Sourcing",
    "subcategoryId": "sub-57-1",
    "subcategoryName": "Sourcing Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1056",
    "title": "Head of Strategic Sourcing",
    "categoryId": "cat-57",
    "categoryName": "Strategic Sourcing",
    "subcategoryId": "sub-57-1",
    "subcategoryName": "Sourcing Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1057",
    "title": "Strategic Sourcing Manager",
    "categoryId": "cat-57",
    "categoryName": "Strategic Sourcing",
    "subcategoryId": "sub-57-1",
    "subcategoryName": "Sourcing Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1058",
    "title": "Global Sourcing Manager",
    "categoryId": "cat-57",
    "categoryName": "Strategic Sourcing",
    "subcategoryId": "sub-57-1",
    "subcategoryName": "Sourcing Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1059",
    "title": "Supplier Strategy Director",
    "categoryId": "cat-57",
    "categoryName": "Strategic Sourcing",
    "subcategoryId": "sub-57-2",
    "subcategoryName": "Supplier Strategy",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1060",
    "title": "Supplier Development Manager",
    "categoryId": "cat-57",
    "categoryName": "Strategic Sourcing",
    "subcategoryId": "sub-57-2",
    "subcategoryName": "Supplier Strategy",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1061",
    "title": "Supplier Performance Manager",
    "categoryId": "cat-57",
    "categoryName": "Strategic Sourcing",
    "subcategoryId": "sub-57-2",
    "subcategoryName": "Supplier Strategy",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1062",
    "title": "Supplier Excellence Lead",
    "categoryId": "cat-57",
    "categoryName": "Strategic Sourcing",
    "subcategoryId": "sub-57-2",
    "subcategoryName": "Supplier Strategy",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1063",
    "title": "Global Category Manager",
    "categoryId": "cat-57",
    "categoryName": "Strategic Sourcing",
    "subcategoryId": "sub-57-3",
    "subcategoryName": "Category Sourcing",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1064",
    "title": "Commodity Strategy Manager",
    "categoryId": "cat-57",
    "categoryName": "Strategic Sourcing",
    "subcategoryId": "sub-57-3",
    "subcategoryName": "Category Sourcing",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1065",
    "title": "Strategic Buyer",
    "categoryId": "cat-57",
    "categoryName": "Strategic Sourcing",
    "subcategoryId": "sub-57-3",
    "subcategoryName": "Category Sourcing",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1066",
    "title": "Category Procurement Lead",
    "categoryId": "cat-57",
    "categoryName": "Strategic Sourcing",
    "subcategoryId": "sub-57-3",
    "subcategoryName": "Category Sourcing",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1067",
    "title": "Cost Management Director",
    "categoryId": "cat-57",
    "categoryName": "Strategic Sourcing",
    "subcategoryId": "sub-57-4",
    "subcategoryName": "Strategic Procurement",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1068",
    "title": "Strategic Procurement Manager",
    "categoryId": "cat-57",
    "categoryName": "Strategic Sourcing",
    "subcategoryId": "sub-57-4",
    "subcategoryName": "Strategic Procurement",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1069",
    "title": "Contract Sourcing Manager",
    "categoryId": "cat-57",
    "categoryName": "Strategic Sourcing",
    "subcategoryId": "sub-57-4",
    "subcategoryName": "Strategic Procurement",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1070",
    "title": "Supply Market Intelligence Manager",
    "categoryId": "cat-57",
    "categoryName": "Strategic Sourcing",
    "subcategoryId": "sub-57-4",
    "subcategoryName": "Strategic Procurement",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1071",
    "title": "Chief Supply Chain Officer (CSCO)",
    "categoryId": "cat-58",
    "categoryName": "Supply Chain",
    "subcategoryId": "sub-58-1",
    "subcategoryName": "Supply Chain Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1072",
    "title": "Supply Chain Director",
    "categoryId": "cat-58",
    "categoryName": "Supply Chain",
    "subcategoryId": "sub-58-1",
    "subcategoryName": "Supply Chain Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1073",
    "title": "VP Supply Chain",
    "categoryId": "cat-58",
    "categoryName": "Supply Chain",
    "subcategoryId": "sub-58-1",
    "subcategoryName": "Supply Chain Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1074",
    "title": "Head of Supply Chain",
    "categoryId": "cat-58",
    "categoryName": "Supply Chain",
    "subcategoryId": "sub-58-1",
    "subcategoryName": "Supply Chain Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1075",
    "title": "Supply Chain Manager",
    "categoryId": "cat-58",
    "categoryName": "Supply Chain",
    "subcategoryId": "sub-58-1",
    "subcategoryName": "Supply Chain Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1076",
    "title": "Supply Planning Director",
    "categoryId": "cat-58",
    "categoryName": "Supply Chain",
    "subcategoryId": "sub-58-2",
    "subcategoryName": "Supply Chain Planning",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1077",
    "title": "Demand Planning Manager",
    "categoryId": "cat-58",
    "categoryName": "Supply Chain",
    "subcategoryId": "sub-58-2",
    "subcategoryName": "Supply Chain Planning",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1078",
    "title": "Supply Planning Manager",
    "categoryId": "cat-58",
    "categoryName": "Supply Chain",
    "subcategoryId": "sub-58-2",
    "subcategoryName": "Supply Chain Planning",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1079",
    "title": "S&OP Manager",
    "categoryId": "cat-58",
    "categoryName": "Supply Chain",
    "subcategoryId": "sub-58-2",
    "subcategoryName": "Supply Chain Planning",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1080",
    "title": "Logistics Director",
    "categoryId": "cat-58",
    "categoryName": "Supply Chain",
    "subcategoryId": "sub-58-3",
    "subcategoryName": "Logistics",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1081",
    "title": "Transportation Manager",
    "categoryId": "cat-58",
    "categoryName": "Supply Chain",
    "subcategoryId": "sub-58-3",
    "subcategoryName": "Logistics",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1082",
    "title": "Freight Manager",
    "categoryId": "cat-58",
    "categoryName": "Supply Chain",
    "subcategoryId": "sub-58-3",
    "subcategoryName": "Logistics",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1083",
    "title": "Fleet Operations Manager",
    "categoryId": "cat-58",
    "categoryName": "Supply Chain",
    "subcategoryId": "sub-58-3",
    "subcategoryName": "Logistics",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1084",
    "title": "End-to-End Supply Chain Director",
    "categoryId": "cat-58",
    "categoryName": "Supply Chain",
    "subcategoryId": "sub-58-4",
    "subcategoryName": "End-to-End Supply Chain",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1085",
    "title": "Network Planning Manager",
    "categoryId": "cat-58",
    "categoryName": "Supply Chain",
    "subcategoryId": "sub-58-4",
    "subcategoryName": "End-to-End Supply Chain",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1086",
    "title": "Distribution Planning Manager",
    "categoryId": "cat-58",
    "categoryName": "Supply Chain",
    "subcategoryId": "sub-58-4",
    "subcategoryName": "End-to-End Supply Chain",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1087",
    "title": "Supply Chain Analytics Manager",
    "categoryId": "cat-58",
    "categoryName": "Supply Chain",
    "subcategoryId": "sub-58-4",
    "subcategoryName": "End-to-End Supply Chain",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1088",
    "title": "Supply Chain Excellence Director",
    "categoryId": "cat-58",
    "categoryName": "Supply Chain",
    "subcategoryId": "sub-58-5",
    "subcategoryName": "Supply Chain Excellence",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1089",
    "title": "Inventory Optimization Manager",
    "categoryId": "cat-58",
    "categoryName": "Supply Chain",
    "subcategoryId": "sub-58-5",
    "subcategoryName": "Supply Chain Excellence",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1090",
    "title": "Supply Chain Transformation Lead",
    "categoryId": "cat-58",
    "categoryName": "Supply Chain",
    "subcategoryId": "sub-58-5",
    "subcategoryName": "Supply Chain Excellence",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1091",
    "title": "Supply Chain Performance Manager",
    "categoryId": "cat-58",
    "categoryName": "Supply Chain",
    "subcategoryId": "sub-58-5",
    "subcategoryName": "Supply Chain Excellence",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1092",
    "title": "Chief Logistics Officer (CLO)",
    "categoryId": "cat-59",
    "categoryName": "Logistics",
    "subcategoryId": "sub-59-1",
    "subcategoryName": "Logistics Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1093",
    "title": "Logistics Director",
    "categoryId": "cat-59",
    "categoryName": "Logistics",
    "subcategoryId": "sub-59-1",
    "subcategoryName": "Logistics Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1094",
    "title": "Head of Logistics",
    "categoryId": "cat-59",
    "categoryName": "Logistics",
    "subcategoryId": "sub-59-1",
    "subcategoryName": "Logistics Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1095",
    "title": "VP Logistics",
    "categoryId": "cat-59",
    "categoryName": "Logistics",
    "subcategoryId": "sub-59-1",
    "subcategoryName": "Logistics Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1096",
    "title": "Logistics Manager",
    "categoryId": "cat-59",
    "categoryName": "Logistics",
    "subcategoryId": "sub-59-1",
    "subcategoryName": "Logistics Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1097",
    "title": "Transportation Director",
    "categoryId": "cat-59",
    "categoryName": "Logistics",
    "subcategoryId": "sub-59-2",
    "subcategoryName": "Transportation",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1098",
    "title": "Fleet Manager",
    "categoryId": "cat-59",
    "categoryName": "Logistics",
    "subcategoryId": "sub-59-2",
    "subcategoryName": "Transportation",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1099",
    "title": "Route Planning Manager",
    "categoryId": "cat-59",
    "categoryName": "Logistics",
    "subcategoryId": "sub-59-2",
    "subcategoryName": "Transportation",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1100",
    "title": "Transport Operations Manager",
    "categoryId": "cat-59",
    "categoryName": "Logistics",
    "subcategoryId": "sub-59-2",
    "subcategoryName": "Transportation",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1101",
    "title": "Distribution Director",
    "categoryId": "cat-59",
    "categoryName": "Logistics",
    "subcategoryId": "sub-59-3",
    "subcategoryName": "Distribution",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1102",
    "title": "Dispatch Manager",
    "categoryId": "cat-59",
    "categoryName": "Logistics",
    "subcategoryId": "sub-59-3",
    "subcategoryName": "Distribution",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1103",
    "title": "Distribution Center Manager",
    "categoryId": "cat-59",
    "categoryName": "Logistics",
    "subcategoryId": "sub-59-3",
    "subcategoryName": "Distribution",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1104",
    "title": "Delivery Operations Manager",
    "categoryId": "cat-59",
    "categoryName": "Logistics",
    "subcategoryId": "sub-59-3",
    "subcategoryName": "Distribution",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1105",
    "title": "Global Logistics Director",
    "categoryId": "cat-59",
    "categoryName": "Logistics",
    "subcategoryId": "sub-59-4",
    "subcategoryName": "International Logistics",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1106",
    "title": "Freight Manager",
    "categoryId": "cat-59",
    "categoryName": "Logistics",
    "subcategoryId": "sub-59-4",
    "subcategoryName": "International Logistics",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1107",
    "title": "Customs Logistics Manager",
    "categoryId": "cat-59",
    "categoryName": "Logistics",
    "subcategoryId": "sub-59-4",
    "subcategoryName": "International Logistics",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1108",
    "title": "Cross-border Logistics Manager",
    "categoryId": "cat-59",
    "categoryName": "Logistics",
    "subcategoryId": "sub-59-4",
    "subcategoryName": "International Logistics",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1109",
    "title": "Logistics Excellence Director",
    "categoryId": "cat-59",
    "categoryName": "Logistics",
    "subcategoryId": "sub-59-5",
    "subcategoryName": "Logistics Excellence",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1110",
    "title": "Logistics Planning Manager",
    "categoryId": "cat-59",
    "categoryName": "Logistics",
    "subcategoryId": "sub-59-5",
    "subcategoryName": "Logistics Excellence",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1111",
    "title": "Logistics Analytics Manager",
    "categoryId": "cat-59",
    "categoryName": "Logistics",
    "subcategoryId": "sub-59-5",
    "subcategoryName": "Logistics Excellence",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1112",
    "title": "Logistics Transformation Lead",
    "categoryId": "cat-59",
    "categoryName": "Logistics",
    "subcategoryId": "sub-59-5",
    "subcategoryName": "Logistics Excellence",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1113",
    "title": "Chief Sustainability Officer (CSO)",
    "categoryId": "cat-60",
    "categoryName": "Sustainability & ESG",
    "subcategoryId": "sub-60-1",
    "subcategoryName": "Sustainability Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1114",
    "title": "ESG Director",
    "categoryId": "cat-60",
    "categoryName": "Sustainability & ESG",
    "subcategoryId": "sub-60-1",
    "subcategoryName": "Sustainability Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1115",
    "title": "Head of Sustainability",
    "categoryId": "cat-60",
    "categoryName": "Sustainability & ESG",
    "subcategoryId": "sub-60-1",
    "subcategoryName": "Sustainability Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1116",
    "title": "Sustainability Manager",
    "categoryId": "cat-60",
    "categoryName": "Sustainability & ESG",
    "subcategoryId": "sub-60-1",
    "subcategoryName": "Sustainability Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1117",
    "title": "ESG Program Manager",
    "categoryId": "cat-60",
    "categoryName": "Sustainability & ESG",
    "subcategoryId": "sub-60-1",
    "subcategoryName": "Sustainability Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1118",
    "title": "Environmental Director",
    "categoryId": "cat-60",
    "categoryName": "Sustainability & ESG",
    "subcategoryId": "sub-60-2",
    "subcategoryName": "Environmental Sustainability",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1119",
    "title": "Climate Strategy Director",
    "categoryId": "cat-60",
    "categoryName": "Sustainability & ESG",
    "subcategoryId": "sub-60-2",
    "subcategoryName": "Environmental Sustainability",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1120",
    "title": "Carbon Management Lead",
    "categoryId": "cat-60",
    "categoryName": "Sustainability & ESG",
    "subcategoryId": "sub-60-2",
    "subcategoryName": "Environmental Sustainability",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1121",
    "title": "Environmental Compliance Manager",
    "categoryId": "cat-60",
    "categoryName": "Sustainability & ESG",
    "subcategoryId": "sub-60-2",
    "subcategoryName": "Environmental Sustainability",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1122",
    "title": "ESG Reporting Director",
    "categoryId": "cat-60",
    "categoryName": "Sustainability & ESG",
    "subcategoryId": "sub-60-3",
    "subcategoryName": "ESG Governance",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1123",
    "title": "ESG Strategy Manager",
    "categoryId": "cat-60",
    "categoryName": "Sustainability & ESG",
    "subcategoryId": "sub-60-3",
    "subcategoryName": "ESG Governance",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1124",
    "title": "ESG Risk Manager",
    "categoryId": "cat-60",
    "categoryName": "Sustainability & ESG",
    "subcategoryId": "sub-60-3",
    "subcategoryName": "ESG Governance",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1125",
    "title": "Sustainable Finance Lead",
    "categoryId": "cat-60",
    "categoryName": "Sustainability & ESG",
    "subcategoryId": "sub-60-3",
    "subcategoryName": "ESG Governance",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1126",
    "title": "Social Sustainability Manager",
    "categoryId": "cat-60",
    "categoryName": "Sustainability & ESG",
    "subcategoryId": "sub-60-4",
    "subcategoryName": "Social Impact",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1127",
    "title": "Community Impact Director",
    "categoryId": "cat-60",
    "categoryName": "Sustainability & ESG",
    "subcategoryId": "sub-60-4",
    "subcategoryName": "Social Impact",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1128",
    "title": "Diversity & Inclusion Director",
    "categoryId": "cat-60",
    "categoryName": "Sustainability & ESG",
    "subcategoryId": "sub-60-4",
    "subcategoryName": "Social Impact",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1129",
    "title": "Responsible Business Manager",
    "categoryId": "cat-60",
    "categoryName": "Sustainability & ESG",
    "subcategoryId": "sub-60-4",
    "subcategoryName": "Social Impact",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1130",
    "title": "Circular Economy Lead",
    "categoryId": "cat-60",
    "categoryName": "Sustainability & ESG",
    "subcategoryId": "sub-60-5",
    "subcategoryName": "Sustainability Excellence",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1131",
    "title": "Net Zero Program Manager",
    "categoryId": "cat-60",
    "categoryName": "Sustainability & ESG",
    "subcategoryId": "sub-60-5",
    "subcategoryName": "Sustainability Excellence",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1132",
    "title": "Sustainability Innovation Lead",
    "categoryId": "cat-60",
    "categoryName": "Sustainability & ESG",
    "subcategoryId": "sub-60-5",
    "subcategoryName": "Sustainability Excellence",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1133",
    "title": "Sustainable Development Manager",
    "categoryId": "cat-60",
    "categoryName": "Sustainability & ESG",
    "subcategoryId": "sub-60-5",
    "subcategoryName": "Sustainability Excellence",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1134",
    "title": "CSR Director",
    "categoryId": "cat-61",
    "categoryName": "CSR & Social Impact",
    "subcategoryId": "sub-61-1",
    "subcategoryName": "CSR Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1135",
    "title": "Head of CSR",
    "categoryId": "cat-61",
    "categoryName": "CSR & Social Impact",
    "subcategoryId": "sub-61-1",
    "subcategoryName": "CSR Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1136",
    "title": "CSR Manager",
    "categoryId": "cat-61",
    "categoryName": "CSR & Social Impact",
    "subcategoryId": "sub-61-1",
    "subcategoryName": "CSR Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1137",
    "title": "Corporate Citizenship Manager",
    "categoryId": "cat-61",
    "categoryName": "CSR & Social Impact",
    "subcategoryId": "sub-61-1",
    "subcategoryName": "CSR Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1138",
    "title": "Community Relations Director",
    "categoryId": "cat-61",
    "categoryName": "CSR & Social Impact",
    "subcategoryId": "sub-61-2",
    "subcategoryName": "Community Development",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1139",
    "title": "Community Development Manager",
    "categoryId": "cat-61",
    "categoryName": "CSR & Social Impact",
    "subcategoryId": "sub-61-2",
    "subcategoryName": "Community Development",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1140",
    "title": "Rural Development Manager",
    "categoryId": "cat-61",
    "categoryName": "CSR & Social Impact",
    "subcategoryId": "sub-61-2",
    "subcategoryName": "Community Development",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1141",
    "title": "Social Development Manager",
    "categoryId": "cat-61",
    "categoryName": "CSR & Social Impact",
    "subcategoryId": "sub-61-2",
    "subcategoryName": "Community Development",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1142",
    "title": "Education Program Director",
    "categoryId": "cat-61",
    "categoryName": "CSR & Social Impact",
    "subcategoryId": "sub-61-3",
    "subcategoryName": "Education & Skills",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1143",
    "title": "Skill Development Manager",
    "categoryId": "cat-61",
    "categoryName": "CSR & Social Impact",
    "subcategoryId": "sub-61-3",
    "subcategoryName": "Education & Skills",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1144",
    "title": "Youth Development Manager",
    "categoryId": "cat-61",
    "categoryName": "CSR & Social Impact",
    "subcategoryId": "sub-61-3",
    "subcategoryName": "Education & Skills",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1145",
    "title": "Livelihood Program Manager",
    "categoryId": "cat-61",
    "categoryName": "CSR & Social Impact",
    "subcategoryId": "sub-61-3",
    "subcategoryName": "Education & Skills",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1146",
    "title": "NGO Partnership Director",
    "categoryId": "cat-61",
    "categoryName": "CSR & Social Impact",
    "subcategoryId": "sub-61-4",
    "subcategoryName": "NGO & Partnerships",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1147",
    "title": "Foundation Director",
    "categoryId": "cat-61",
    "categoryName": "CSR & Social Impact",
    "subcategoryId": "sub-61-4",
    "subcategoryName": "NGO & Partnerships",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1148",
    "title": "Social Partnerships Manager",
    "categoryId": "cat-61",
    "categoryName": "CSR & Social Impact",
    "subcategoryId": "sub-61-4",
    "subcategoryName": "NGO & Partnerships",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1149",
    "title": "Philanthropy Manager",
    "categoryId": "cat-61",
    "categoryName": "CSR & Social Impact",
    "subcategoryId": "sub-61-4",
    "subcategoryName": "NGO & Partnerships",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1150",
    "title": "Impact Assessment Director",
    "categoryId": "cat-61",
    "categoryName": "CSR & Social Impact",
    "subcategoryId": "sub-61-5",
    "subcategoryName": "Impact Measurement",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1151",
    "title": "Social Impact Analyst",
    "categoryId": "cat-61",
    "categoryName": "CSR & Social Impact",
    "subcategoryId": "sub-61-5",
    "subcategoryName": "Impact Measurement",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1152",
    "title": "CSR Reporting Manager",
    "categoryId": "cat-61",
    "categoryName": "CSR & Social Impact",
    "subcategoryId": "sub-61-5",
    "subcategoryName": "Impact Measurement",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1153",
    "title": "Community Impact Lead",
    "categoryId": "cat-61",
    "categoryName": "CSR & Social Impact",
    "subcategoryId": "sub-61-5",
    "subcategoryName": "Impact Measurement",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1154",
    "title": "Chief Global Expansion Officer",
    "categoryId": "cat-62",
    "categoryName": "Global Expansion",
    "subcategoryId": "sub-62-1",
    "subcategoryName": "Expansion Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1155",
    "title": "Global Expansion Director",
    "categoryId": "cat-62",
    "categoryName": "Global Expansion",
    "subcategoryId": "sub-62-1",
    "subcategoryName": "Expansion Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1156",
    "title": "Head of International Expansion",
    "categoryId": "cat-62",
    "categoryName": "Global Expansion",
    "subcategoryId": "sub-62-1",
    "subcategoryName": "Expansion Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1157",
    "title": "Expansion Manager",
    "categoryId": "cat-62",
    "categoryName": "Global Expansion",
    "subcategoryId": "sub-62-1",
    "subcategoryName": "Expansion Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1158",
    "title": "International Markets Director",
    "categoryId": "cat-62",
    "categoryName": "Global Expansion",
    "subcategoryId": "sub-62-2",
    "subcategoryName": "Market Expansion",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1159",
    "title": "Country Expansion Manager",
    "categoryId": "cat-62",
    "categoryName": "Global Expansion",
    "subcategoryId": "sub-62-2",
    "subcategoryName": "Market Expansion",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1160",
    "title": "Regional Expansion Manager",
    "categoryId": "cat-62",
    "categoryName": "Global Expansion",
    "subcategoryId": "sub-62-2",
    "subcategoryName": "Market Expansion",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1161",
    "title": "Market Entry Manager",
    "categoryId": "cat-62",
    "categoryName": "Global Expansion",
    "subcategoryId": "sub-62-2",
    "subcategoryName": "Market Expansion",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1162",
    "title": "Global Alliances Director",
    "categoryId": "cat-62",
    "categoryName": "Global Expansion",
    "subcategoryId": "sub-62-3",
    "subcategoryName": "Strategic Alliances",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1163",
    "title": "International Partnerships Manager",
    "categoryId": "cat-62",
    "categoryName": "Global Expansion",
    "subcategoryId": "sub-62-3",
    "subcategoryName": "Strategic Alliances",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1164",
    "title": "Strategic Alliances Manager",
    "categoryId": "cat-62",
    "categoryName": "Global Expansion",
    "subcategoryId": "sub-62-3",
    "subcategoryName": "Strategic Alliances",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1165",
    "title": "Joint Ventures Director",
    "categoryId": "cat-62",
    "categoryName": "Global Expansion",
    "subcategoryId": "sub-62-3",
    "subcategoryName": "Strategic Alliances",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1166",
    "title": "Cross-border Business Director",
    "categoryId": "cat-62",
    "categoryName": "Global Expansion",
    "subcategoryId": "sub-62-4",
    "subcategoryName": "Business Development",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1167",
    "title": "International Growth Manager",
    "categoryId": "cat-62",
    "categoryName": "Global Expansion",
    "subcategoryId": "sub-62-4",
    "subcategoryName": "Business Development",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1168",
    "title": "Global Strategy Lead",
    "categoryId": "cat-62",
    "categoryName": "Global Expansion",
    "subcategoryId": "sub-62-4",
    "subcategoryName": "Business Development",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1169",
    "title": "Overseas Operations Manager",
    "categoryId": "cat-62",
    "categoryName": "Global Expansion",
    "subcategoryId": "sub-62-4",
    "subcategoryName": "Business Development",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1170",
    "title": "Export Director",
    "categoryId": "cat-63",
    "categoryName": "Export Excellence",
    "subcategoryId": "sub-63-1",
    "subcategoryName": "Export Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1171",
    "title": "Head of Exports",
    "categoryId": "cat-63",
    "categoryName": "Export Excellence",
    "subcategoryId": "sub-63-1",
    "subcategoryName": "Export Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1172",
    "title": "Export Manager",
    "categoryId": "cat-63",
    "categoryName": "Export Excellence",
    "subcategoryId": "sub-63-1",
    "subcategoryName": "Export Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1173",
    "title": "International Sales Manager",
    "categoryId": "cat-63",
    "categoryName": "Export Excellence",
    "subcategoryId": "sub-63-1",
    "subcategoryName": "Export Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1174",
    "title": "Export Operations Director",
    "categoryId": "cat-63",
    "categoryName": "Export Excellence",
    "subcategoryId": "sub-63-2",
    "subcategoryName": "Export Operations",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1175",
    "title": "Export Documentation Manager",
    "categoryId": "cat-63",
    "categoryName": "Export Excellence",
    "subcategoryId": "sub-63-2",
    "subcategoryName": "Export Operations",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1176",
    "title": "Export Compliance Manager",
    "categoryId": "cat-63",
    "categoryName": "Export Excellence",
    "subcategoryId": "sub-63-2",
    "subcategoryName": "Export Operations",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1177",
    "title": "Export Logistics Manager",
    "categoryId": "cat-63",
    "categoryName": "Export Excellence",
    "subcategoryId": "sub-63-2",
    "subcategoryName": "Export Operations",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1178",
    "title": "Export Promotion Director",
    "categoryId": "cat-63",
    "categoryName": "Export Excellence",
    "subcategoryId": "sub-63-3",
    "subcategoryName": "Trade Development",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1179",
    "title": "Trade Development Manager",
    "categoryId": "cat-63",
    "categoryName": "Export Excellence",
    "subcategoryId": "sub-63-3",
    "subcategoryName": "Trade Development",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1180",
    "title": "Global Market Development Manager",
    "categoryId": "cat-63",
    "categoryName": "Export Excellence",
    "subcategoryId": "sub-63-3",
    "subcategoryName": "Trade Development",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1181",
    "title": "Trade Intelligence Manager",
    "categoryId": "cat-63",
    "categoryName": "Export Excellence",
    "subcategoryId": "sub-63-3",
    "subcategoryName": "Trade Development",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1182",
    "title": "Regional Export Manager",
    "categoryId": "cat-63",
    "categoryName": "Export Excellence",
    "subcategoryId": "sub-63-4",
    "subcategoryName": "International Sales",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1183",
    "title": "Overseas Sales Director",
    "categoryId": "cat-63",
    "categoryName": "Export Excellence",
    "subcategoryId": "sub-63-4",
    "subcategoryName": "International Sales",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1184",
    "title": "Global Accounts Manager",
    "categoryId": "cat-63",
    "categoryName": "Export Excellence",
    "subcategoryId": "sub-63-4",
    "subcategoryName": "International Sales",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1185",
    "title": "Export Strategy Lead",
    "categoryId": "cat-63",
    "categoryName": "Export Excellence",
    "subcategoryId": "sub-63-4",
    "subcategoryName": "International Sales",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1186",
    "title": "Import Director",
    "categoryId": "cat-64",
    "categoryName": "Import & Trade Excellence",
    "subcategoryId": "sub-64-1",
    "subcategoryName": "Import Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1187",
    "title": "Head of Imports",
    "categoryId": "cat-64",
    "categoryName": "Import & Trade Excellence",
    "subcategoryId": "sub-64-1",
    "subcategoryName": "Import Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1188",
    "title": "Import Manager",
    "categoryId": "cat-64",
    "categoryName": "Import & Trade Excellence",
    "subcategoryId": "sub-64-1",
    "subcategoryName": "Import Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1189",
    "title": "Trade Operations Manager",
    "categoryId": "cat-64",
    "categoryName": "Import & Trade Excellence",
    "subcategoryId": "sub-64-1",
    "subcategoryName": "Import Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1190",
    "title": "Customs Compliance Director",
    "categoryId": "cat-64",
    "categoryName": "Import & Trade Excellence",
    "subcategoryId": "sub-64-2",
    "subcategoryName": "Import Operations",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1191",
    "title": "Customs Manager",
    "categoryId": "cat-64",
    "categoryName": "Import & Trade Excellence",
    "subcategoryId": "sub-64-2",
    "subcategoryName": "Import Operations",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1192",
    "title": "Import Documentation Manager",
    "categoryId": "cat-64",
    "categoryName": "Import & Trade Excellence",
    "subcategoryId": "sub-64-2",
    "subcategoryName": "Import Operations",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1193",
    "title": "Trade Compliance Manager",
    "categoryId": "cat-64",
    "categoryName": "Import & Trade Excellence",
    "subcategoryId": "sub-64-2",
    "subcategoryName": "Import Operations",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1194",
    "title": "International Trade Director",
    "categoryId": "cat-64",
    "categoryName": "Import & Trade Excellence",
    "subcategoryId": "sub-64-3",
    "subcategoryName": "Trade Management",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1195",
    "title": "Global Trade Manager",
    "categoryId": "cat-64",
    "categoryName": "Import & Trade Excellence",
    "subcategoryId": "sub-64-3",
    "subcategoryName": "Trade Management",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1196",
    "title": "Trade Policy Manager",
    "categoryId": "cat-64",
    "categoryName": "Import & Trade Excellence",
    "subcategoryId": "sub-64-3",
    "subcategoryName": "Trade Management",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1197",
    "title": "Cross-border Trade Manager",
    "categoryId": "cat-64",
    "categoryName": "Import & Trade Excellence",
    "subcategoryId": "sub-64-3",
    "subcategoryName": "Trade Management",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1198",
    "title": "Trade Facilitation Director",
    "categoryId": "cat-64",
    "categoryName": "Import & Trade Excellence",
    "subcategoryId": "sub-64-4",
    "subcategoryName": "Trade Facilitation",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1199",
    "title": "Customs Relations Manager",
    "categoryId": "cat-64",
    "categoryName": "Import & Trade Excellence",
    "subcategoryId": "sub-64-4",
    "subcategoryName": "Trade Facilitation",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1200",
    "title": "Import Strategy Lead",
    "categoryId": "cat-64",
    "categoryName": "Import & Trade Excellence",
    "subcategoryId": "sub-64-4",
    "subcategoryName": "Trade Facilitation",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1201",
    "title": "International Procurement Manager",
    "categoryId": "cat-64",
    "categoryName": "Import & Trade Excellence",
    "subcategoryId": "sub-64-4",
    "subcategoryName": "Trade Facilitation",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1202",
    "title": "Circular Economy Director",
    "categoryId": "cat-65",
    "categoryName": "Circular Economy",
    "subcategoryId": "sub-65-1",
    "subcategoryName": "Circular Economy Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1203",
    "title": "Head of Circular Economy",
    "categoryId": "cat-65",
    "categoryName": "Circular Economy",
    "subcategoryId": "sub-65-1",
    "subcategoryName": "Circular Economy Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1204",
    "title": "Circular Economy Manager",
    "categoryId": "cat-65",
    "categoryName": "Circular Economy",
    "subcategoryId": "sub-65-1",
    "subcategoryName": "Circular Economy Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1205",
    "title": "Sustainability Innovation Lead",
    "categoryId": "cat-65",
    "categoryName": "Circular Economy",
    "subcategoryId": "sub-65-1",
    "subcategoryName": "Circular Economy Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1206",
    "title": "Resource Recovery Director",
    "categoryId": "cat-65",
    "categoryName": "Circular Economy",
    "subcategoryId": "sub-65-2",
    "subcategoryName": "Resource Management",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1207",
    "title": "Materials Recovery Manager",
    "categoryId": "cat-65",
    "categoryName": "Circular Economy",
    "subcategoryId": "sub-65-2",
    "subcategoryName": "Resource Management",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1208",
    "title": "Waste Reduction Manager",
    "categoryId": "cat-65",
    "categoryName": "Circular Economy",
    "subcategoryId": "sub-65-2",
    "subcategoryName": "Resource Management",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1209",
    "title": "Recycling Program Manager",
    "categoryId": "cat-65",
    "categoryName": "Circular Economy",
    "subcategoryId": "sub-65-2",
    "subcategoryName": "Resource Management",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1210",
    "title": "Eco Design Director",
    "categoryId": "cat-65",
    "categoryName": "Circular Economy",
    "subcategoryId": "sub-65-3",
    "subcategoryName": "Sustainable Design",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1211",
    "title": "Sustainable Product Manager",
    "categoryId": "cat-65",
    "categoryName": "Circular Economy",
    "subcategoryId": "sub-65-3",
    "subcategoryName": "Sustainable Design",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1212",
    "title": "Green Innovation Manager",
    "categoryId": "cat-65",
    "categoryName": "Circular Economy",
    "subcategoryId": "sub-65-3",
    "subcategoryName": "Sustainable Design",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1213",
    "title": "Life Cycle Assessment Lead",
    "categoryId": "cat-65",
    "categoryName": "Circular Economy",
    "subcategoryId": "sub-65-3",
    "subcategoryName": "Sustainable Design",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1214",
    "title": "Circular Business Model Director",
    "categoryId": "cat-65",
    "categoryName": "Circular Economy",
    "subcategoryId": "sub-65-4",
    "subcategoryName": "Circular Innovation",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1215",
    "title": "Circular Supply Chain Manager",
    "categoryId": "cat-65",
    "categoryName": "Circular Economy",
    "subcategoryId": "sub-65-4",
    "subcategoryName": "Circular Innovation",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1216",
    "title": "Zero Waste Program Manager",
    "categoryId": "cat-65",
    "categoryName": "Circular Economy",
    "subcategoryId": "sub-65-4",
    "subcategoryName": "Circular Innovation",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1217",
    "title": "Circular Strategy Manager",
    "categoryId": "cat-65",
    "categoryName": "Circular Economy",
    "subcategoryId": "sub-65-4",
    "subcategoryName": "Circular Innovation",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1218",
    "title": "Green Supply Chain Director",
    "categoryId": "cat-66",
    "categoryName": "Green Supply Chain",
    "subcategoryId": "sub-66-1",
    "subcategoryName": "Green Supply Chain Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1219",
    "title": "Head of Sustainable Supply Chain",
    "categoryId": "cat-66",
    "categoryName": "Green Supply Chain",
    "subcategoryId": "sub-66-1",
    "subcategoryName": "Green Supply Chain Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1220",
    "title": "Green Logistics Manager",
    "categoryId": "cat-66",
    "categoryName": "Green Supply Chain",
    "subcategoryId": "sub-66-1",
    "subcategoryName": "Green Supply Chain Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1221",
    "title": "Sustainable Procurement Director",
    "categoryId": "cat-66",
    "categoryName": "Green Supply Chain",
    "subcategoryId": "sub-66-1",
    "subcategoryName": "Green Supply Chain Leadership",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1222",
    "title": "Sustainable Sourcing Manager",
    "categoryId": "cat-66",
    "categoryName": "Green Supply Chain",
    "subcategoryId": "sub-66-2",
    "subcategoryName": "Sustainable Procurement",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1223",
    "title": "Responsible Procurement Manager",
    "categoryId": "cat-66",
    "categoryName": "Green Supply Chain",
    "subcategoryId": "sub-66-2",
    "subcategoryName": "Sustainable Procurement",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1224",
    "title": "Ethical Sourcing Manager",
    "categoryId": "cat-66",
    "categoryName": "Green Supply Chain",
    "subcategoryId": "sub-66-2",
    "subcategoryName": "Sustainable Procurement",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1225",
    "title": "Supplier Sustainability Manager",
    "categoryId": "cat-66",
    "categoryName": "Green Supply Chain",
    "subcategoryId": "sub-66-2",
    "subcategoryName": "Sustainable Procurement",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1226",
    "title": "Low Carbon Logistics Director",
    "categoryId": "cat-66",
    "categoryName": "Green Supply Chain",
    "subcategoryId": "sub-66-3",
    "subcategoryName": "Green Logistics",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1227",
    "title": "Green Transportation Manager",
    "categoryId": "cat-66",
    "categoryName": "Green Supply Chain",
    "subcategoryId": "sub-66-3",
    "subcategoryName": "Green Logistics",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1228",
    "title": "Sustainable Distribution Manager",
    "categoryId": "cat-66",
    "categoryName": "Green Supply Chain",
    "subcategoryId": "sub-66-3",
    "subcategoryName": "Green Logistics",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1229",
    "title": "Eco Logistics Manager",
    "categoryId": "cat-66",
    "categoryName": "Green Supply Chain",
    "subcategoryId": "sub-66-3",
    "subcategoryName": "Green Logistics",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1230",
    "title": "Supply Chain ESG Director",
    "categoryId": "cat-66",
    "categoryName": "Green Supply Chain",
    "subcategoryId": "sub-66-4",
    "subcategoryName": "Supply Chain Sustainability",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1231",
    "title": "Carbon Supply Chain Manager",
    "categoryId": "cat-66",
    "categoryName": "Green Supply Chain",
    "subcategoryId": "sub-66-4",
    "subcategoryName": "Supply Chain Sustainability",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1232",
    "title": "Sustainable Operations Manager",
    "categoryId": "cat-66",
    "categoryName": "Green Supply Chain",
    "subcategoryId": "sub-66-4",
    "subcategoryName": "Supply Chain Sustainability",
    "groupName": "Supply Chain & Sustainability"
  },
  {
    "id": "t-1233",
    "title": "Green Supply Chain Analyst",
    "categoryId": "cat-66",
    "categoryName": "Green Supply Chain",
    "subcategoryId": "sub-66-4",
    "subcategoryName": "Supply Chain Sustainability",
    "groupName": "Supply Chain & Sustainability"
  }
];

export function searchLeadershipTitles(query: string, limit = 20): LeaderTitle[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return LEADERSHIP_TITLES.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.categoryName.toLowerCase().includes(q) ||
      (t.subcategoryName && t.subcategoryName.toLowerCase().includes(q))
  ).slice(0, limit);
}
