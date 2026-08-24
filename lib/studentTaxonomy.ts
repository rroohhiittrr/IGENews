// Master Student & Reader Taxonomy Data extracted from igennews_com_ReaderList_v2_0.xlsx
// Contains 11 Groups, 86 Categories, and 258 Degree/Title Degrees

export interface StudentSubcategory {
  id: string;
  name: string;
  categoryId: string;
  titles: string[];
}

export interface StudentCategory {
  id: string;
  num: number;
  name: string;
  group: string;
  groupId: string;
  icon: string;
  subcategories: StudentSubcategory[];
}

export interface StudentGroup {
  id: string;
  name: string;
  icon: string;
  categories: StudentCategory[];
}

export interface StudentTitle {
  id: string;
  title: string;
  categoryId: string;
  categoryName: string;
  subcategoryId?: string | null;
  subcategoryName?: string;
  groupName: string;
}

export const FREE_STUDENT_CATEGORY_LIMIT = 5;

export const STUDENT_GROUPS: StudentGroup[] = [
  {
    "id": "stud-grp-1",
    "name": "Engineering & Technology",
    "icon": "Cpu",
    "categories": [
      {
        "id": "stud-cat-1",
        "num": 1,
        "name": "Computer Science & IT",
        "group": "Engineering & Technology",
        "groupId": "stud-grp-1",
        "icon": "Cpu",
        "subcategories": [
          {
            "id": "stud-sub-1",
            "name": "Degree Program",
            "categoryId": "stud-cat-1",
            "titles": [
              "Diploma in Computer Engineering",
              "B.Tech/B.E. Computer Science",
              "B.Tech Information Technology",
              "M.Tech/M.E. Computer Science",
              "M.Tech Software Engineering",
              "PhD Computer Science"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-2",
        "num": 2,
        "name": "Electronics & Communication",
        "group": "Engineering & Technology",
        "groupId": "stud-grp-1",
        "icon": "Cpu",
        "subcategories": [
          {
            "id": "stud-sub-2",
            "name": "Degree Program",
            "categoryId": "stud-cat-2",
            "titles": [
              "Diploma in Electronics",
              "B.Tech Electronics & Communication (ECE)",
              "B.Tech VLSI Design",
              "M.Tech Electronics & Communication",
              "PhD Electronics Engineering"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-3",
        "num": 3,
        "name": "Mechanical Engineering",
        "group": "Engineering & Technology",
        "groupId": "stud-grp-1",
        "icon": "Cpu",
        "subcategories": [
          {
            "id": "stud-sub-3",
            "name": "Degree Program",
            "categoryId": "stud-cat-3",
            "titles": [
              "Diploma in Mechanical Engineering",
              "B.Tech/B.E. Mechanical Engineering",
              "M.Tech Mechanical Engineering",
              "M.Tech Thermal Engineering",
              "PhD Mechanical Engineering"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-4",
        "num": 4,
        "name": "Civil Engineering",
        "group": "Engineering & Technology",
        "groupId": "stud-grp-1",
        "icon": "Cpu",
        "subcategories": [
          {
            "id": "stud-sub-4",
            "name": "Degree Program",
            "categoryId": "stud-cat-4",
            "titles": [
              "Diploma in Civil Engineering",
              "B.Tech/B.E. Civil Engineering",
              "M.Tech Structural Engineering",
              "M.Tech Transportation Engineering",
              "PhD Civil Engineering"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-5",
        "num": 5,
        "name": "Electrical Engineering",
        "group": "Engineering & Technology",
        "groupId": "stud-grp-1",
        "icon": "Cpu",
        "subcategories": [
          {
            "id": "stud-sub-5",
            "name": "Degree Program",
            "categoryId": "stud-cat-5",
            "titles": [
              "Diploma in Electrical Engineering",
              "B.Tech/B.E. Electrical Engineering",
              "B.Tech Power Systems",
              "M.Tech Electrical Engineering",
              "PhD Electrical Engineering"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-6",
        "num": 6,
        "name": "Chemical Engineering",
        "group": "Engineering & Technology",
        "groupId": "stud-grp-1",
        "icon": "Cpu",
        "subcategories": [
          {
            "id": "stud-sub-6",
            "name": "Degree Program",
            "categoryId": "stud-cat-6",
            "titles": [
              "B.Tech/B.E. Chemical Engineering",
              "M.Tech Chemical Engineering",
              "PhD Chemical Engineering"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-7",
        "num": 7,
        "name": "Biotechnology & Bioengineering",
        "group": "Engineering & Technology",
        "groupId": "stud-grp-1",
        "icon": "Cpu",
        "subcategories": [
          {
            "id": "stud-sub-7",
            "name": "Degree Program",
            "categoryId": "stud-cat-7",
            "titles": [
              "B.Tech Biotechnology",
              "M.Tech/M.Sc Biotechnology",
              "M.Tech Bioinformatics",
              "PhD Biotechnology"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-8",
        "num": 8,
        "name": "Aerospace & Aeronautical",
        "group": "Engineering & Technology",
        "groupId": "stud-grp-1",
        "icon": "Cpu",
        "subcategories": [
          {
            "id": "stud-sub-8",
            "name": "Degree Program",
            "categoryId": "stud-cat-8",
            "titles": [
              "B.Tech Aerospace Engineering",
              "B.Tech Aeronautical Engineering",
              "M.Tech Aerospace Engineering",
              "PhD Aerospace Engineering"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-9",
        "num": 9,
        "name": "Automobile Engineering",
        "group": "Engineering & Technology",
        "groupId": "stud-grp-1",
        "icon": "Cpu",
        "subcategories": [
          {
            "id": "stud-sub-9",
            "name": "Degree Program",
            "categoryId": "stud-cat-9",
            "titles": [
              "B.Tech Automobile Engineering",
              "M.Tech Automotive Engineering (EV specialization)"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-10",
        "num": 10,
        "name": "Metallurgical & Mining Engineering",
        "group": "Engineering & Technology",
        "groupId": "stud-grp-1",
        "icon": "Cpu",
        "subcategories": [
          {
            "id": "stud-sub-10",
            "name": "Degree Program",
            "categoryId": "stud-cat-10",
            "titles": [
              "B.Tech Metallurgical Engineering",
              "B.Tech Mining Engineering",
              "M.Tech Metallurgy",
              "PhD Metallurgical Engineering"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-11",
        "num": 11,
        "name": "Textile Engineering",
        "group": "Engineering & Technology",
        "groupId": "stud-grp-1",
        "icon": "Cpu",
        "subcategories": [
          {
            "id": "stud-sub-11",
            "name": "Degree Program",
            "categoryId": "stud-cat-11",
            "titles": [
              "B.Tech Textile Engineering",
              "B.Tech Fashion Technology",
              "M.Tech Textile Engineering"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-12",
        "num": 12,
        "name": "Agricultural Engineering",
        "group": "Engineering & Technology",
        "groupId": "stud-grp-1",
        "icon": "Cpu",
        "subcategories": [
          {
            "id": "stud-sub-12",
            "name": "Degree Program",
            "categoryId": "stud-cat-12",
            "titles": [
              "B.Tech Agricultural Engineering",
              "M.Tech Agricultural Engineering",
              "PhD Agricultural Sciences"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-13",
        "num": 13,
        "name": "Environmental Engineering",
        "group": "Engineering & Technology",
        "groupId": "stud-grp-1",
        "icon": "Cpu",
        "subcategories": [
          {
            "id": "stud-sub-13",
            "name": "Degree Program",
            "categoryId": "stud-cat-13",
            "titles": [
              "B.Tech Environmental Engineering",
              "M.Tech Environmental Engineering",
              "PhD Environmental Science"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-14",
        "num": 14,
        "name": "Industrial & Production Engineering",
        "group": "Engineering & Technology",
        "groupId": "stud-grp-1",
        "icon": "Cpu",
        "subcategories": [
          {
            "id": "stud-sub-14",
            "name": "Degree Program",
            "categoryId": "stud-cat-14",
            "titles": [
              "B.Tech Industrial Engineering",
              "B.Tech Production Engineering",
              "M.Tech Industrial Engineering & Management"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-15",
        "num": 15,
        "name": "Marine & Naval Engineering",
        "group": "Engineering & Technology",
        "groupId": "stud-grp-1",
        "icon": "Cpu",
        "subcategories": [
          {
            "id": "stud-sub-15",
            "name": "Degree Program",
            "categoryId": "stud-cat-15",
            "titles": [
              "B.Tech Marine Engineering",
              "B.Tech Naval Architecture & Ocean Engineering"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-16",
        "num": 16,
        "name": "Nuclear Engineering",
        "group": "Engineering & Technology",
        "groupId": "stud-grp-1",
        "icon": "Cpu",
        "subcategories": [
          {
            "id": "stud-sub-16",
            "name": "Degree Program",
            "categoryId": "stud-cat-16",
            "titles": [
              "B.Tech Nuclear Engineering",
              "M.Tech Nuclear Engineering",
              "PhD Nuclear Physics/Engineering"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-17",
        "num": 17,
        "name": "Petroleum Engineering",
        "group": "Engineering & Technology",
        "groupId": "stud-grp-1",
        "icon": "Cpu",
        "subcategories": [
          {
            "id": "stud-sub-17",
            "name": "Degree Program",
            "categoryId": "stud-cat-17",
            "titles": [
              "B.Tech Petroleum Engineering",
              "M.Tech Petroleum Engineering"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "stud-grp-2",
    "name": "Medical & Health Sciences",
    "icon": "HeartPulse",
    "categories": [
      {
        "id": "stud-cat-18",
        "num": 18,
        "name": "Allopathic Medicine",
        "group": "Medical & Health Sciences",
        "groupId": "stud-grp-2",
        "icon": "HeartPulse",
        "subcategories": [
          {
            "id": "stud-sub-18",
            "name": "Degree Program",
            "categoryId": "stud-cat-18",
            "titles": [
              "NEET Aspirant (Pre-Medical)",
              "MBBS Student",
              "MD/MS (Postgraduate Medicine)",
              "DM/MCh (Super-Specialty)"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-19",
        "num": 19,
        "name": "Dental Sciences",
        "group": "Medical & Health Sciences",
        "groupId": "stud-grp-2",
        "icon": "HeartPulse",
        "subcategories": [
          {
            "id": "stud-sub-19",
            "name": "Degree Program",
            "categoryId": "stud-cat-19",
            "titles": [
              "BDS Student",
              "MDS (Postgraduate Dental)"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-20",
        "num": 20,
        "name": "AYUSH (Traditional Medicine)",
        "group": "Medical & Health Sciences",
        "groupId": "stud-grp-2",
        "icon": "HeartPulse",
        "subcategories": [
          {
            "id": "stud-sub-20",
            "name": "Degree Program",
            "categoryId": "stud-cat-20",
            "titles": [
              "BAMS Student (Ayurveda)",
              "BHMS Student (Homeopathy)",
              "BUMS Student (Unani)",
              "BNYS Student (Naturopathy & Yoga)"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-21",
        "num": 21,
        "name": "Nursing",
        "group": "Medical & Health Sciences",
        "groupId": "stud-grp-2",
        "icon": "HeartPulse",
        "subcategories": [
          {
            "id": "stud-sub-21",
            "name": "Degree Program",
            "categoryId": "stud-cat-21",
            "titles": [
              "B.Sc Nursing",
              "M.Sc Nursing",
              "GNM (General Nursing & Midwifery)"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-22",
        "num": 22,
        "name": "Pharmacy",
        "group": "Medical & Health Sciences",
        "groupId": "stud-grp-2",
        "icon": "HeartPulse",
        "subcategories": [
          {
            "id": "stud-sub-22",
            "name": "Degree Program",
            "categoryId": "stud-cat-22",
            "titles": [
              "D.Pharm",
              "B.Pharm",
              "M.Pharm",
              "Pharm.D"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-23",
        "num": 23,
        "name": "Allied Health Sciences",
        "group": "Medical & Health Sciences",
        "groupId": "stud-grp-2",
        "icon": "HeartPulse",
        "subcategories": [
          {
            "id": "stud-sub-23",
            "name": "Degree Program",
            "categoryId": "stud-cat-23",
            "titles": [
              "Physiotherapy (BPT/MPT)",
              "Medical Lab Technology (BMLT)",
              "Radiology & Imaging Technology",
              "Occupational Therapy",
              "Nutrition & Dietetics"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-24",
        "num": 24,
        "name": "Public Health",
        "group": "Medical & Health Sciences",
        "groupId": "stud-grp-2",
        "icon": "HeartPulse",
        "subcategories": [
          {
            "id": "stud-sub-24",
            "name": "Degree Program",
            "categoryId": "stud-cat-24",
            "titles": [
              "MPH (Master of Public Health)",
              "PhD Public Health / Epidemiology"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-25",
        "num": 25,
        "name": "Veterinary Sciences",
        "group": "Medical & Health Sciences",
        "groupId": "stud-grp-2",
        "icon": "HeartPulse",
        "subcategories": [
          {
            "id": "stud-sub-25",
            "name": "Degree Program",
            "categoryId": "stud-cat-25",
            "titles": [
              "B.V.Sc & AH Student",
              "M.V.Sc Student"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "stud-grp-3",
    "name": "Management",
    "icon": "Briefcase",
    "categories": [
      {
        "id": "stud-cat-26",
        "num": 26,
        "name": "MBA / PGDM Specializations",
        "group": "Management",
        "groupId": "stud-grp-3",
        "icon": "Briefcase",
        "subcategories": [
          {
            "id": "stud-sub-26",
            "name": "Degree Program",
            "categoryId": "stud-cat-26",
            "titles": [
              "MBA \u2014 Finance",
              "MBA \u2014 Marketing",
              "MBA \u2014 Human Resources",
              "MBA \u2014 Operations & Supply Chain",
              "MBA \u2014 International Business",
              "MBA \u2014 Business Analytics / Data Science",
              "MBA \u2014 Healthcare Management",
              "MBA \u2014 Agribusiness Management",
              "MBA \u2014 Rural Management",
              "MBA \u2014 Hospital & Health Systems Management",
              "PGDM (Post Graduate Diploma in Management)",
              "Executive MBA",
              "BBA (Bachelor of Business Administration)"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "stud-grp-4",
    "name": "Commerce & Finance",
    "icon": "DollarSign",
    "categories": [
      {
        "id": "stud-cat-27",
        "num": 27,
        "name": "Commerce Degrees",
        "group": "Commerce & Finance",
        "groupId": "stud-grp-4",
        "icon": "DollarSign",
        "subcategories": [
          {
            "id": "stud-sub-27",
            "name": "Degree/Certification",
            "categoryId": "stud-cat-27",
            "titles": [
              "B.Com (General)",
              "B.Com (Honours)",
              "M.Com"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-28",
        "num": 28,
        "name": "Professional Accountancy",
        "group": "Commerce & Finance",
        "groupId": "stud-grp-4",
        "icon": "DollarSign",
        "subcategories": [
          {
            "id": "stud-sub-28",
            "name": "Degree/Certification",
            "categoryId": "stud-cat-28",
            "titles": [
              "CA Foundation Student",
              "CA Intermediate Student",
              "CA Article ship / Final Student",
              "Company Secretary (CS) Student",
              "Cost & Management Accountant (CMA) Student"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-29",
        "num": 29,
        "name": "Financial Analysis",
        "group": "Commerce & Finance",
        "groupId": "stud-grp-4",
        "icon": "DollarSign",
        "subcategories": [
          {
            "id": "stud-sub-29",
            "name": "Degree/Certification",
            "categoryId": "stud-cat-29",
            "titles": [
              "CFA Level 1/2/3 Candidate",
              "Financial Risk Manager (FRM) Candidate",
              "Actuarial Science Student"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "stud-grp-5",
    "name": "Law",
    "icon": "Shield",
    "categories": [
      {
        "id": "stud-cat-30",
        "num": 30,
        "name": "Undergraduate Law",
        "group": "Law",
        "groupId": "stud-grp-5",
        "icon": "Shield",
        "subcategories": [
          {
            "id": "stud-sub-30",
            "name": "Degree Program",
            "categoryId": "stud-cat-30",
            "titles": [
              "LLB (3-Year)",
              "BA LLB (5-Year Integrated)",
              "BBA LLB (5-Year Integrated)"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-31",
        "num": 31,
        "name": "Postgraduate & Specialized Law",
        "group": "Law",
        "groupId": "stud-grp-5",
        "icon": "Shield",
        "subcategories": [
          {
            "id": "stud-sub-31",
            "name": "Degree Program",
            "categoryId": "stud-cat-31",
            "titles": [
              "LLM \u2014 Corporate & Commercial Law",
              "LLM \u2014 International Trade & WTO Law",
              "LLM \u2014 Intellectual Property Law",
              "LLM \u2014 Constitutional Law",
              "LLM \u2014 Cyber Law",
              "LLM \u2014 Criminal Law",
              "PhD Law"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-32",
        "num": 32,
        "name": "Judiciary Track",
        "group": "Law",
        "groupId": "stud-grp-5",
        "icon": "Shield",
        "subcategories": [
          {
            "id": "stud-sub-32",
            "name": "Degree Program",
            "categoryId": "stud-cat-32",
            "titles": [
              "Judicial Services Exam Aspirant"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "stud-grp-6",
    "name": "Pure & Applied Sciences / Research",
    "icon": "FlaskConical",
    "categories": [
      {
        "id": "stud-cat-33",
        "num": 33,
        "name": "Physics",
        "group": "Pure & Applied Sciences / Research",
        "groupId": "stud-grp-6",
        "icon": "FlaskConical",
        "subcategories": [
          {
            "id": "stud-sub-33",
            "name": "Degree Program",
            "categoryId": "stud-cat-33",
            "titles": [
              "B.Sc Physics",
              "M.Sc Physics",
              "PhD Physics"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-34",
        "num": 34,
        "name": "Chemistry",
        "group": "Pure & Applied Sciences / Research",
        "groupId": "stud-grp-6",
        "icon": "FlaskConical",
        "subcategories": [
          {
            "id": "stud-sub-34",
            "name": "Degree Program",
            "categoryId": "stud-cat-34",
            "titles": [
              "B.Sc Chemistry",
              "M.Sc Chemistry",
              "PhD Chemistry"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-35",
        "num": 35,
        "name": "Mathematics & Statistics",
        "group": "Pure & Applied Sciences / Research",
        "groupId": "stud-grp-6",
        "icon": "FlaskConical",
        "subcategories": [
          {
            "id": "stud-sub-35",
            "name": "Degree Program",
            "categoryId": "stud-cat-35",
            "titles": [
              "B.Sc Mathematics/Statistics",
              "M.Sc Mathematics/Statistics",
              "PhD Mathematics/Statistics"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-36",
        "num": 36,
        "name": "Biology & Life Sciences",
        "group": "Pure & Applied Sciences / Research",
        "groupId": "stud-grp-6",
        "icon": "FlaskConical",
        "subcategories": [
          {
            "id": "stud-sub-36",
            "name": "Degree Program",
            "categoryId": "stud-cat-36",
            "titles": [
              "B.Sc Life Sciences/Botany/Zoology",
              "M.Sc Life Sciences",
              "PhD Life Sciences"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-37",
        "num": 37,
        "name": "Environmental Science",
        "group": "Pure & Applied Sciences / Research",
        "groupId": "stud-grp-6",
        "icon": "FlaskConical",
        "subcategories": [
          {
            "id": "stud-sub-37",
            "name": "Degree Program",
            "categoryId": "stud-cat-37",
            "titles": [
              "B.Sc Environmental Science",
              "M.Sc Environmental Science",
              "PhD Environmental Science"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-38",
        "num": 38,
        "name": "Geology & Earth Sciences",
        "group": "Pure & Applied Sciences / Research",
        "groupId": "stud-grp-6",
        "icon": "FlaskConical",
        "subcategories": [
          {
            "id": "stud-sub-38",
            "name": "Degree Program",
            "categoryId": "stud-cat-38",
            "titles": [
              "B.Sc Geology",
              "M.Sc Geology/Earth Sciences",
              "PhD Geology"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-39",
        "num": 39,
        "name": "Data Science & Statistics (General)",
        "group": "Pure & Applied Sciences / Research",
        "groupId": "stud-grp-6",
        "icon": "FlaskConical",
        "subcategories": [
          {
            "id": "stud-sub-39",
            "name": "Degree Program",
            "categoryId": "stud-cat-39",
            "titles": [
              "B.Sc/M.Sc Data Science",
              "PhD Data Science"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-40",
        "num": 40,
        "name": "Cross-Discipline Research",
        "group": "Pure & Applied Sciences / Research",
        "groupId": "stud-grp-6",
        "icon": "FlaskConical",
        "subcategories": [
          {
            "id": "stud-sub-40",
            "name": "Degree Program",
            "categoryId": "stud-cat-40",
            "titles": [
              "Junior Research Fellow (JRF)",
              "Senior Research Fellow (SRF)",
              "Postdoctoral Research Scholar"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "stud-grp-7",
    "name": "Arts, Humanities & Social Sciences",
    "icon": "BookOpen",
    "categories": [
      {
        "id": "stud-cat-41",
        "num": 41,
        "name": "Social Science Degrees",
        "group": "Arts, Humanities & Social Sciences",
        "groupId": "stud-grp-7",
        "icon": "BookOpen",
        "subcategories": [
          {
            "id": "stud-sub-41",
            "name": "Degree Program",
            "categoryId": "stud-cat-41",
            "titles": [
              "BA/MA Economics",
              "BA/MA Political Science",
              "BA/MA Sociology",
              "BA/MA History",
              "BA/MA Psychology",
              "MA International Relations",
              "Master of Public Policy (MPP)",
              "Master of Public Administration (MPA)",
              "BA/MA Geography",
              "BA General / Humanities"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "stud-grp-8",
    "name": "Journalism & Media",
    "icon": "Mic",
    "categories": [
      {
        "id": "stud-cat-42",
        "num": 42,
        "name": "Journalism / Mass Communication",
        "group": "Journalism & Media",
        "groupId": "stud-grp-8",
        "icon": "Mic",
        "subcategories": [
          {
            "id": "stud-sub-42",
            "name": "Degree Program",
            "categoryId": "stud-cat-42",
            "titles": [
              "BJMC (Bachelor of Journalism & Mass Communication)",
              "MA Journalism & Mass Communication",
              "Broadcast Journalism Student",
              "Digital Media & Content Student",
              "Film & TV Production Student",
              "Public Relations & Corporate Communication Student"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "stud-grp-9",
    "name": "Design & Architecture",
    "icon": "Building2",
    "categories": [
      {
        "id": "stud-cat-43",
        "num": 43,
        "name": "Design & Built Environment",
        "group": "Design & Architecture",
        "groupId": "stud-grp-9",
        "icon": "Building2",
        "subcategories": [
          {
            "id": "stud-sub-43",
            "name": "Degree Program",
            "categoryId": "stud-cat-43",
            "titles": [
              "B.Arch (Architecture)",
              "M.Arch",
              "B.Des Product/Industrial Design",
              "B.Des UX/UI Design"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "stud-grp-10",
    "name": "Competitive Exams / Government Services",
    "icon": "Award",
    "categories": [
      {
        "id": "stud-cat-44",
        "num": 44,
        "name": "Civil Services (UPSC)",
        "group": "Competitive Exams / Government Services",
        "groupId": "stud-grp-10",
        "icon": "Award",
        "subcategories": [
          {
            "id": "stud-sub-44",
            "name": "Exam Track",
            "categoryId": "stud-cat-44",
            "titles": [
              "IAS Aspirant",
              "IFS (Foreign Service) Aspirant",
              "IPS Aspirant",
              "IRS (Revenue Service) Aspirant",
              "State PSC (State Civil Services) Aspirant"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-45",
        "num": 45,
        "name": "Defence Forces",
        "group": "Competitive Exams / Government Services",
        "groupId": "stud-grp-10",
        "icon": "Award",
        "subcategories": [
          {
            "id": "stud-sub-45",
            "name": "Exam Track",
            "categoryId": "stud-cat-45",
            "titles": [
              "NDA Aspirant (Army/Navy/Air Force)",
              "CDS Aspirant",
              "AFCAT Aspirant (Air Force)",
              "Territorial Army Aspirant"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-46",
        "num": 46,
        "name": "Police & Paramilitary",
        "group": "Competitive Exams / Government Services",
        "groupId": "stud-grp-10",
        "icon": "Award",
        "subcategories": [
          {
            "id": "stud-sub-46",
            "name": "Exam Track",
            "categoryId": "stud-cat-46",
            "titles": [
              "SSC Police / State Police Aspirant",
              "Central Armed Police Forces (CAPF) Aspirant"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-47",
        "num": 47,
        "name": "Defence R&D and Space",
        "group": "Competitive Exams / Government Services",
        "groupId": "stud-grp-10",
        "icon": "Award",
        "subcategories": [
          {
            "id": "stud-sub-47",
            "name": "Exam Track",
            "categoryId": "stud-cat-47",
            "titles": [
              "DRDO Scientist Entry Aspirant",
              "ISRO Scientist/Engineer Aspirant"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-48",
        "num": 48,
        "name": "Banking & Financial Sector Exams",
        "group": "Competitive Exams / Government Services",
        "groupId": "stud-grp-10",
        "icon": "Award",
        "subcategories": [
          {
            "id": "stud-sub-48",
            "name": "Exam Track",
            "categoryId": "stud-cat-48",
            "titles": [
              "IBPS PO/Clerk Aspirant",
              "SBI PO/Clerk Aspirant",
              "RBI Grade B Aspirant"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-49",
        "num": 49,
        "name": "Railways",
        "group": "Competitive Exams / Government Services",
        "groupId": "stud-grp-10",
        "icon": "Award",
        "subcategories": [
          {
            "id": "stud-sub-49",
            "name": "Exam Track",
            "categoryId": "stud-cat-49",
            "titles": [
              "RRB (Railway Recruitment Board) Aspirant"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-50",
        "num": 50,
        "name": "Judiciary & Teaching",
        "group": "Competitive Exams / Government Services",
        "groupId": "stud-grp-10",
        "icon": "Award",
        "subcategories": [
          {
            "id": "stud-sub-50",
            "name": "Exam Track",
            "categoryId": "stud-cat-50",
            "titles": [
              "Judicial Services Aspirant",
              "UGC-NET Aspirant",
              "CTET Aspirant"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "stud-grp-11",
    "name": "Working Professionals (by Department)",
    "icon": "UserCheck",
    "categories": [
      {
        "id": "stud-cat-51",
        "num": 51,
        "name": "Executive Leadership",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-51",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-51",
            "titles": [
              "Management Trainee",
              "Executive Assistant to Leadership"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-52",
        "num": 52,
        "name": "Board & Corporate Governance",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-52",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-52",
            "titles": [
              "Company Secretary Executive",
              "Governance Analyst"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-53",
        "num": 53,
        "name": "Corporate Strategy",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-53",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-53",
            "titles": [
              "Strategy Analyst",
              "Business Analyst"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-54",
        "num": 54,
        "name": "Business Transformation",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-54",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-54",
            "titles": [
              "Transformation Associate",
              "Change Management Analyst"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-55",
        "num": 55,
        "name": "Finance & Accounts",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-55",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-55",
            "titles": [
              "Accounts Executive",
              "Finance Analyst"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-56",
        "num": 56,
        "name": "Treasury & Investor Relations",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-56",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-56",
            "titles": [
              "Treasury Analyst",
              "Investor Relations Associate"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-57",
        "num": 57,
        "name": "Legal & Compliance",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-57",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-57",
            "titles": [
              "Legal Associate",
              "Compliance Analyst"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-58",
        "num": 58,
        "name": "Risk Management",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-58",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-58",
            "titles": [
              "Risk Analyst"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-59",
        "num": 59,
        "name": "Internal Audit & Assurance",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-59",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-59",
            "titles": [
              "Internal Auditor",
              "Audit Associate"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-60",
        "num": 60,
        "name": "Human Resources (HR)",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-60",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-60",
            "titles": [
              "HR Executive",
              "Talent Acquisition Specialist"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-61",
        "num": 61,
        "name": "Learning & Talent Development",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-61",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-61",
            "titles": [
              "L&D Executive",
              "Training Coordinator"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-62",
        "num": 62,
        "name": "Administration & Facilities",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-62",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-62",
            "titles": [
              "Administration Executive",
              "Facilities Coordinator"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-63",
        "num": 63,
        "name": "Information Technology (IT)",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-63",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-63",
            "titles": [
              "Software Engineer",
              "IT Support Engineer",
              "Systems Analyst"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-64",
        "num": 64,
        "name": "Engineering & Technical Services",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-64",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-64",
            "titles": [
              "Engineer (Technical Services)",
              "Design Engineer"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-65",
        "num": 65,
        "name": "Artificial Intelligence (AI)",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-65",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-65",
            "titles": [
              "AI/ML Engineer",
              "Data Scientist"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-66",
        "num": 66,
        "name": "Data, Analytics & Business Intelligence",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-66",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-66",
            "titles": [
              "Data Analyst",
              "BI Developer"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-67",
        "num": 67,
        "name": "Cyber Security & Information Security",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-67",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-67",
            "titles": [
              "Security Analyst",
              "SOC Engineer"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-68",
        "num": 68,
        "name": "Product Management",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-68",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-68",
            "titles": [
              "Associate Product Manager",
              "Product Analyst"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-69",
        "num": 69,
        "name": "Research & Development (R&D)",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-69",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-69",
            "titles": [
              "R&D Engineer",
              "Research Associate"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-70",
        "num": 70,
        "name": "Innovation & Digital Transformation",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-70",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-70",
            "titles": [
              "Innovation Associate",
              "Digital Transformation Analyst"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-71",
        "num": 71,
        "name": "Operations",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-71",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-71",
            "titles": [
              "Operations Executive",
              "Operations Analyst"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-72",
        "num": 72,
        "name": "Manufacturing & Production",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-72",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-72",
            "titles": [
              "Production Engineer",
              "Shift Supervisor"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-73",
        "num": 73,
        "name": "Quality Assurance & Continuous Improvement",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-73",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-73",
            "titles": [
              "QA Engineer",
              "Process Improvement Analyst"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-74",
        "num": 74,
        "name": "Procurement & Strategic Sourcing",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-74",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-74",
            "titles": [
              "Procurement Executive",
              "Sourcing Analyst"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-75",
        "num": 75,
        "name": "Supply Chain, Logistics & Warehousing",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-75",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-75",
            "titles": [
              "Supply Chain Executive",
              "Logistics Coordinator"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-76",
        "num": 76,
        "name": "Sales & Business Development",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-76",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-76",
            "titles": [
              "Sales Executive",
              "Business Development Associate"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-77",
        "num": 77,
        "name": "Marketing & Brand Management",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-77",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-77",
            "titles": [
              "Marketing Executive",
              "Brand Associate"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-78",
        "num": 78,
        "name": "Customer Success & Customer Experience",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-78",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-78",
            "titles": [
              "Customer Success Associate",
              "CX Analyst"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-79",
        "num": 79,
        "name": "Corporate Communications & Public Relations",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-79",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-79",
            "titles": [
              "Corporate Communications Executive",
              "PR Associate"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-80",
        "num": 80,
        "name": "Government Relations & Public Policy",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-80",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-80",
            "titles": [
              "Government Relations Associate",
              "Public Policy Analyst"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-81",
        "num": 81,
        "name": "International Business & Global Trade",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-81",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-81",
            "titles": [
              "International Trade Executive",
              "Export-Import Analyst"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-82",
        "num": 82,
        "name": "Sustainability, ESG & CSR",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-82",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-82",
            "titles": [
              "Sustainability Analyst",
              "CSR Executive"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-83",
        "num": 83,
        "name": "Health, Safety & Environment (HSE/EHS)",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-83",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-83",
            "titles": [
              "HSE Officer",
              "Safety Engineer"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-84",
        "num": 84,
        "name": "Corporate Affairs & Industry Relations",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-84",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-84",
            "titles": [
              "Corporate Affairs Executive",
              "Industry Relations Associate"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-85",
        "num": 85,
        "name": "Projects, PMO & Program Management",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-85",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-85",
            "titles": [
              "Project Coordinator",
              "PMO Analyst"
            ]
          }
        ]
      },
      {
        "id": "stud-cat-86",
        "num": 86,
        "name": "Innovation Ecosystem, Partnerships & Alliances",
        "group": "Working Professionals (by Department)",
        "groupId": "stud-grp-11",
        "icon": "UserCheck",
        "subcategories": [
          {
            "id": "stud-sub-86",
            "name": "Early/Mid-Career Title",
            "categoryId": "stud-cat-86",
            "titles": [
              "Partnerships Associate",
              "Alliances Executive"
            ]
          }
        ]
      }
    ]
  }
];

export const STUDENT_CATEGORIES: StudentCategory[] = [
  {
    "id": "stud-cat-1",
    "num": 1,
    "name": "Computer Science & IT",
    "group": "Engineering & Technology",
    "groupId": "stud-grp-1",
    "icon": "Cpu",
    "subcategories": [
      {
        "id": "stud-sub-1",
        "name": "Degree Program",
        "categoryId": "stud-cat-1",
        "titles": [
          "Diploma in Computer Engineering",
          "B.Tech/B.E. Computer Science",
          "B.Tech Information Technology",
          "M.Tech/M.E. Computer Science",
          "M.Tech Software Engineering",
          "PhD Computer Science"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-2",
    "num": 2,
    "name": "Electronics & Communication",
    "group": "Engineering & Technology",
    "groupId": "stud-grp-1",
    "icon": "Cpu",
    "subcategories": [
      {
        "id": "stud-sub-2",
        "name": "Degree Program",
        "categoryId": "stud-cat-2",
        "titles": [
          "Diploma in Electronics",
          "B.Tech Electronics & Communication (ECE)",
          "B.Tech VLSI Design",
          "M.Tech Electronics & Communication",
          "PhD Electronics Engineering"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-3",
    "num": 3,
    "name": "Mechanical Engineering",
    "group": "Engineering & Technology",
    "groupId": "stud-grp-1",
    "icon": "Cpu",
    "subcategories": [
      {
        "id": "stud-sub-3",
        "name": "Degree Program",
        "categoryId": "stud-cat-3",
        "titles": [
          "Diploma in Mechanical Engineering",
          "B.Tech/B.E. Mechanical Engineering",
          "M.Tech Mechanical Engineering",
          "M.Tech Thermal Engineering",
          "PhD Mechanical Engineering"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-4",
    "num": 4,
    "name": "Civil Engineering",
    "group": "Engineering & Technology",
    "groupId": "stud-grp-1",
    "icon": "Cpu",
    "subcategories": [
      {
        "id": "stud-sub-4",
        "name": "Degree Program",
        "categoryId": "stud-cat-4",
        "titles": [
          "Diploma in Civil Engineering",
          "B.Tech/B.E. Civil Engineering",
          "M.Tech Structural Engineering",
          "M.Tech Transportation Engineering",
          "PhD Civil Engineering"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-5",
    "num": 5,
    "name": "Electrical Engineering",
    "group": "Engineering & Technology",
    "groupId": "stud-grp-1",
    "icon": "Cpu",
    "subcategories": [
      {
        "id": "stud-sub-5",
        "name": "Degree Program",
        "categoryId": "stud-cat-5",
        "titles": [
          "Diploma in Electrical Engineering",
          "B.Tech/B.E. Electrical Engineering",
          "B.Tech Power Systems",
          "M.Tech Electrical Engineering",
          "PhD Electrical Engineering"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-6",
    "num": 6,
    "name": "Chemical Engineering",
    "group": "Engineering & Technology",
    "groupId": "stud-grp-1",
    "icon": "Cpu",
    "subcategories": [
      {
        "id": "stud-sub-6",
        "name": "Degree Program",
        "categoryId": "stud-cat-6",
        "titles": [
          "B.Tech/B.E. Chemical Engineering",
          "M.Tech Chemical Engineering",
          "PhD Chemical Engineering"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-7",
    "num": 7,
    "name": "Biotechnology & Bioengineering",
    "group": "Engineering & Technology",
    "groupId": "stud-grp-1",
    "icon": "Cpu",
    "subcategories": [
      {
        "id": "stud-sub-7",
        "name": "Degree Program",
        "categoryId": "stud-cat-7",
        "titles": [
          "B.Tech Biotechnology",
          "M.Tech/M.Sc Biotechnology",
          "M.Tech Bioinformatics",
          "PhD Biotechnology"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-8",
    "num": 8,
    "name": "Aerospace & Aeronautical",
    "group": "Engineering & Technology",
    "groupId": "stud-grp-1",
    "icon": "Cpu",
    "subcategories": [
      {
        "id": "stud-sub-8",
        "name": "Degree Program",
        "categoryId": "stud-cat-8",
        "titles": [
          "B.Tech Aerospace Engineering",
          "B.Tech Aeronautical Engineering",
          "M.Tech Aerospace Engineering",
          "PhD Aerospace Engineering"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-9",
    "num": 9,
    "name": "Automobile Engineering",
    "group": "Engineering & Technology",
    "groupId": "stud-grp-1",
    "icon": "Cpu",
    "subcategories": [
      {
        "id": "stud-sub-9",
        "name": "Degree Program",
        "categoryId": "stud-cat-9",
        "titles": [
          "B.Tech Automobile Engineering",
          "M.Tech Automotive Engineering (EV specialization)"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-10",
    "num": 10,
    "name": "Metallurgical & Mining Engineering",
    "group": "Engineering & Technology",
    "groupId": "stud-grp-1",
    "icon": "Cpu",
    "subcategories": [
      {
        "id": "stud-sub-10",
        "name": "Degree Program",
        "categoryId": "stud-cat-10",
        "titles": [
          "B.Tech Metallurgical Engineering",
          "B.Tech Mining Engineering",
          "M.Tech Metallurgy",
          "PhD Metallurgical Engineering"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-11",
    "num": 11,
    "name": "Textile Engineering",
    "group": "Engineering & Technology",
    "groupId": "stud-grp-1",
    "icon": "Cpu",
    "subcategories": [
      {
        "id": "stud-sub-11",
        "name": "Degree Program",
        "categoryId": "stud-cat-11",
        "titles": [
          "B.Tech Textile Engineering",
          "B.Tech Fashion Technology",
          "M.Tech Textile Engineering"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-12",
    "num": 12,
    "name": "Agricultural Engineering",
    "group": "Engineering & Technology",
    "groupId": "stud-grp-1",
    "icon": "Cpu",
    "subcategories": [
      {
        "id": "stud-sub-12",
        "name": "Degree Program",
        "categoryId": "stud-cat-12",
        "titles": [
          "B.Tech Agricultural Engineering",
          "M.Tech Agricultural Engineering",
          "PhD Agricultural Sciences"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-13",
    "num": 13,
    "name": "Environmental Engineering",
    "group": "Engineering & Technology",
    "groupId": "stud-grp-1",
    "icon": "Cpu",
    "subcategories": [
      {
        "id": "stud-sub-13",
        "name": "Degree Program",
        "categoryId": "stud-cat-13",
        "titles": [
          "B.Tech Environmental Engineering",
          "M.Tech Environmental Engineering",
          "PhD Environmental Science"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-14",
    "num": 14,
    "name": "Industrial & Production Engineering",
    "group": "Engineering & Technology",
    "groupId": "stud-grp-1",
    "icon": "Cpu",
    "subcategories": [
      {
        "id": "stud-sub-14",
        "name": "Degree Program",
        "categoryId": "stud-cat-14",
        "titles": [
          "B.Tech Industrial Engineering",
          "B.Tech Production Engineering",
          "M.Tech Industrial Engineering & Management"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-15",
    "num": 15,
    "name": "Marine & Naval Engineering",
    "group": "Engineering & Technology",
    "groupId": "stud-grp-1",
    "icon": "Cpu",
    "subcategories": [
      {
        "id": "stud-sub-15",
        "name": "Degree Program",
        "categoryId": "stud-cat-15",
        "titles": [
          "B.Tech Marine Engineering",
          "B.Tech Naval Architecture & Ocean Engineering"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-16",
    "num": 16,
    "name": "Nuclear Engineering",
    "group": "Engineering & Technology",
    "groupId": "stud-grp-1",
    "icon": "Cpu",
    "subcategories": [
      {
        "id": "stud-sub-16",
        "name": "Degree Program",
        "categoryId": "stud-cat-16",
        "titles": [
          "B.Tech Nuclear Engineering",
          "M.Tech Nuclear Engineering",
          "PhD Nuclear Physics/Engineering"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-17",
    "num": 17,
    "name": "Petroleum Engineering",
    "group": "Engineering & Technology",
    "groupId": "stud-grp-1",
    "icon": "Cpu",
    "subcategories": [
      {
        "id": "stud-sub-17",
        "name": "Degree Program",
        "categoryId": "stud-cat-17",
        "titles": [
          "B.Tech Petroleum Engineering",
          "M.Tech Petroleum Engineering"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-18",
    "num": 18,
    "name": "Allopathic Medicine",
    "group": "Medical & Health Sciences",
    "groupId": "stud-grp-2",
    "icon": "HeartPulse",
    "subcategories": [
      {
        "id": "stud-sub-18",
        "name": "Degree Program",
        "categoryId": "stud-cat-18",
        "titles": [
          "NEET Aspirant (Pre-Medical)",
          "MBBS Student",
          "MD/MS (Postgraduate Medicine)",
          "DM/MCh (Super-Specialty)"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-19",
    "num": 19,
    "name": "Dental Sciences",
    "group": "Medical & Health Sciences",
    "groupId": "stud-grp-2",
    "icon": "HeartPulse",
    "subcategories": [
      {
        "id": "stud-sub-19",
        "name": "Degree Program",
        "categoryId": "stud-cat-19",
        "titles": [
          "BDS Student",
          "MDS (Postgraduate Dental)"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-20",
    "num": 20,
    "name": "AYUSH (Traditional Medicine)",
    "group": "Medical & Health Sciences",
    "groupId": "stud-grp-2",
    "icon": "HeartPulse",
    "subcategories": [
      {
        "id": "stud-sub-20",
        "name": "Degree Program",
        "categoryId": "stud-cat-20",
        "titles": [
          "BAMS Student (Ayurveda)",
          "BHMS Student (Homeopathy)",
          "BUMS Student (Unani)",
          "BNYS Student (Naturopathy & Yoga)"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-21",
    "num": 21,
    "name": "Nursing",
    "group": "Medical & Health Sciences",
    "groupId": "stud-grp-2",
    "icon": "HeartPulse",
    "subcategories": [
      {
        "id": "stud-sub-21",
        "name": "Degree Program",
        "categoryId": "stud-cat-21",
        "titles": [
          "B.Sc Nursing",
          "M.Sc Nursing",
          "GNM (General Nursing & Midwifery)"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-22",
    "num": 22,
    "name": "Pharmacy",
    "group": "Medical & Health Sciences",
    "groupId": "stud-grp-2",
    "icon": "HeartPulse",
    "subcategories": [
      {
        "id": "stud-sub-22",
        "name": "Degree Program",
        "categoryId": "stud-cat-22",
        "titles": [
          "D.Pharm",
          "B.Pharm",
          "M.Pharm",
          "Pharm.D"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-23",
    "num": 23,
    "name": "Allied Health Sciences",
    "group": "Medical & Health Sciences",
    "groupId": "stud-grp-2",
    "icon": "HeartPulse",
    "subcategories": [
      {
        "id": "stud-sub-23",
        "name": "Degree Program",
        "categoryId": "stud-cat-23",
        "titles": [
          "Physiotherapy (BPT/MPT)",
          "Medical Lab Technology (BMLT)",
          "Radiology & Imaging Technology",
          "Occupational Therapy",
          "Nutrition & Dietetics"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-24",
    "num": 24,
    "name": "Public Health",
    "group": "Medical & Health Sciences",
    "groupId": "stud-grp-2",
    "icon": "HeartPulse",
    "subcategories": [
      {
        "id": "stud-sub-24",
        "name": "Degree Program",
        "categoryId": "stud-cat-24",
        "titles": [
          "MPH (Master of Public Health)",
          "PhD Public Health / Epidemiology"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-25",
    "num": 25,
    "name": "Veterinary Sciences",
    "group": "Medical & Health Sciences",
    "groupId": "stud-grp-2",
    "icon": "HeartPulse",
    "subcategories": [
      {
        "id": "stud-sub-25",
        "name": "Degree Program",
        "categoryId": "stud-cat-25",
        "titles": [
          "B.V.Sc & AH Student",
          "M.V.Sc Student"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-26",
    "num": 26,
    "name": "MBA / PGDM Specializations",
    "group": "Management",
    "groupId": "stud-grp-3",
    "icon": "Briefcase",
    "subcategories": [
      {
        "id": "stud-sub-26",
        "name": "Degree Program",
        "categoryId": "stud-cat-26",
        "titles": [
          "MBA \u2014 Finance",
          "MBA \u2014 Marketing",
          "MBA \u2014 Human Resources",
          "MBA \u2014 Operations & Supply Chain",
          "MBA \u2014 International Business",
          "MBA \u2014 Business Analytics / Data Science",
          "MBA \u2014 Healthcare Management",
          "MBA \u2014 Agribusiness Management",
          "MBA \u2014 Rural Management",
          "MBA \u2014 Hospital & Health Systems Management",
          "PGDM (Post Graduate Diploma in Management)",
          "Executive MBA",
          "BBA (Bachelor of Business Administration)"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-27",
    "num": 27,
    "name": "Commerce Degrees",
    "group": "Commerce & Finance",
    "groupId": "stud-grp-4",
    "icon": "DollarSign",
    "subcategories": [
      {
        "id": "stud-sub-27",
        "name": "Degree/Certification",
        "categoryId": "stud-cat-27",
        "titles": [
          "B.Com (General)",
          "B.Com (Honours)",
          "M.Com"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-28",
    "num": 28,
    "name": "Professional Accountancy",
    "group": "Commerce & Finance",
    "groupId": "stud-grp-4",
    "icon": "DollarSign",
    "subcategories": [
      {
        "id": "stud-sub-28",
        "name": "Degree/Certification",
        "categoryId": "stud-cat-28",
        "titles": [
          "CA Foundation Student",
          "CA Intermediate Student",
          "CA Article ship / Final Student",
          "Company Secretary (CS) Student",
          "Cost & Management Accountant (CMA) Student"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-29",
    "num": 29,
    "name": "Financial Analysis",
    "group": "Commerce & Finance",
    "groupId": "stud-grp-4",
    "icon": "DollarSign",
    "subcategories": [
      {
        "id": "stud-sub-29",
        "name": "Degree/Certification",
        "categoryId": "stud-cat-29",
        "titles": [
          "CFA Level 1/2/3 Candidate",
          "Financial Risk Manager (FRM) Candidate",
          "Actuarial Science Student"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-30",
    "num": 30,
    "name": "Undergraduate Law",
    "group": "Law",
    "groupId": "stud-grp-5",
    "icon": "Shield",
    "subcategories": [
      {
        "id": "stud-sub-30",
        "name": "Degree Program",
        "categoryId": "stud-cat-30",
        "titles": [
          "LLB (3-Year)",
          "BA LLB (5-Year Integrated)",
          "BBA LLB (5-Year Integrated)"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-31",
    "num": 31,
    "name": "Postgraduate & Specialized Law",
    "group": "Law",
    "groupId": "stud-grp-5",
    "icon": "Shield",
    "subcategories": [
      {
        "id": "stud-sub-31",
        "name": "Degree Program",
        "categoryId": "stud-cat-31",
        "titles": [
          "LLM \u2014 Corporate & Commercial Law",
          "LLM \u2014 International Trade & WTO Law",
          "LLM \u2014 Intellectual Property Law",
          "LLM \u2014 Constitutional Law",
          "LLM \u2014 Cyber Law",
          "LLM \u2014 Criminal Law",
          "PhD Law"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-32",
    "num": 32,
    "name": "Judiciary Track",
    "group": "Law",
    "groupId": "stud-grp-5",
    "icon": "Shield",
    "subcategories": [
      {
        "id": "stud-sub-32",
        "name": "Degree Program",
        "categoryId": "stud-cat-32",
        "titles": [
          "Judicial Services Exam Aspirant"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-33",
    "num": 33,
    "name": "Physics",
    "group": "Pure & Applied Sciences / Research",
    "groupId": "stud-grp-6",
    "icon": "FlaskConical",
    "subcategories": [
      {
        "id": "stud-sub-33",
        "name": "Degree Program",
        "categoryId": "stud-cat-33",
        "titles": [
          "B.Sc Physics",
          "M.Sc Physics",
          "PhD Physics"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-34",
    "num": 34,
    "name": "Chemistry",
    "group": "Pure & Applied Sciences / Research",
    "groupId": "stud-grp-6",
    "icon": "FlaskConical",
    "subcategories": [
      {
        "id": "stud-sub-34",
        "name": "Degree Program",
        "categoryId": "stud-cat-34",
        "titles": [
          "B.Sc Chemistry",
          "M.Sc Chemistry",
          "PhD Chemistry"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-35",
    "num": 35,
    "name": "Mathematics & Statistics",
    "group": "Pure & Applied Sciences / Research",
    "groupId": "stud-grp-6",
    "icon": "FlaskConical",
    "subcategories": [
      {
        "id": "stud-sub-35",
        "name": "Degree Program",
        "categoryId": "stud-cat-35",
        "titles": [
          "B.Sc Mathematics/Statistics",
          "M.Sc Mathematics/Statistics",
          "PhD Mathematics/Statistics"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-36",
    "num": 36,
    "name": "Biology & Life Sciences",
    "group": "Pure & Applied Sciences / Research",
    "groupId": "stud-grp-6",
    "icon": "FlaskConical",
    "subcategories": [
      {
        "id": "stud-sub-36",
        "name": "Degree Program",
        "categoryId": "stud-cat-36",
        "titles": [
          "B.Sc Life Sciences/Botany/Zoology",
          "M.Sc Life Sciences",
          "PhD Life Sciences"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-37",
    "num": 37,
    "name": "Environmental Science",
    "group": "Pure & Applied Sciences / Research",
    "groupId": "stud-grp-6",
    "icon": "FlaskConical",
    "subcategories": [
      {
        "id": "stud-sub-37",
        "name": "Degree Program",
        "categoryId": "stud-cat-37",
        "titles": [
          "B.Sc Environmental Science",
          "M.Sc Environmental Science",
          "PhD Environmental Science"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-38",
    "num": 38,
    "name": "Geology & Earth Sciences",
    "group": "Pure & Applied Sciences / Research",
    "groupId": "stud-grp-6",
    "icon": "FlaskConical",
    "subcategories": [
      {
        "id": "stud-sub-38",
        "name": "Degree Program",
        "categoryId": "stud-cat-38",
        "titles": [
          "B.Sc Geology",
          "M.Sc Geology/Earth Sciences",
          "PhD Geology"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-39",
    "num": 39,
    "name": "Data Science & Statistics (General)",
    "group": "Pure & Applied Sciences / Research",
    "groupId": "stud-grp-6",
    "icon": "FlaskConical",
    "subcategories": [
      {
        "id": "stud-sub-39",
        "name": "Degree Program",
        "categoryId": "stud-cat-39",
        "titles": [
          "B.Sc/M.Sc Data Science",
          "PhD Data Science"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-40",
    "num": 40,
    "name": "Cross-Discipline Research",
    "group": "Pure & Applied Sciences / Research",
    "groupId": "stud-grp-6",
    "icon": "FlaskConical",
    "subcategories": [
      {
        "id": "stud-sub-40",
        "name": "Degree Program",
        "categoryId": "stud-cat-40",
        "titles": [
          "Junior Research Fellow (JRF)",
          "Senior Research Fellow (SRF)",
          "Postdoctoral Research Scholar"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-41",
    "num": 41,
    "name": "Social Science Degrees",
    "group": "Arts, Humanities & Social Sciences",
    "groupId": "stud-grp-7",
    "icon": "BookOpen",
    "subcategories": [
      {
        "id": "stud-sub-41",
        "name": "Degree Program",
        "categoryId": "stud-cat-41",
        "titles": [
          "BA/MA Economics",
          "BA/MA Political Science",
          "BA/MA Sociology",
          "BA/MA History",
          "BA/MA Psychology",
          "MA International Relations",
          "Master of Public Policy (MPP)",
          "Master of Public Administration (MPA)",
          "BA/MA Geography",
          "BA General / Humanities"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-42",
    "num": 42,
    "name": "Journalism / Mass Communication",
    "group": "Journalism & Media",
    "groupId": "stud-grp-8",
    "icon": "Mic",
    "subcategories": [
      {
        "id": "stud-sub-42",
        "name": "Degree Program",
        "categoryId": "stud-cat-42",
        "titles": [
          "BJMC (Bachelor of Journalism & Mass Communication)",
          "MA Journalism & Mass Communication",
          "Broadcast Journalism Student",
          "Digital Media & Content Student",
          "Film & TV Production Student",
          "Public Relations & Corporate Communication Student"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-43",
    "num": 43,
    "name": "Design & Built Environment",
    "group": "Design & Architecture",
    "groupId": "stud-grp-9",
    "icon": "Building2",
    "subcategories": [
      {
        "id": "stud-sub-43",
        "name": "Degree Program",
        "categoryId": "stud-cat-43",
        "titles": [
          "B.Arch (Architecture)",
          "M.Arch",
          "B.Des Product/Industrial Design",
          "B.Des UX/UI Design"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-44",
    "num": 44,
    "name": "Civil Services (UPSC)",
    "group": "Competitive Exams / Government Services",
    "groupId": "stud-grp-10",
    "icon": "Award",
    "subcategories": [
      {
        "id": "stud-sub-44",
        "name": "Exam Track",
        "categoryId": "stud-cat-44",
        "titles": [
          "IAS Aspirant",
          "IFS (Foreign Service) Aspirant",
          "IPS Aspirant",
          "IRS (Revenue Service) Aspirant",
          "State PSC (State Civil Services) Aspirant"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-45",
    "num": 45,
    "name": "Defence Forces",
    "group": "Competitive Exams / Government Services",
    "groupId": "stud-grp-10",
    "icon": "Award",
    "subcategories": [
      {
        "id": "stud-sub-45",
        "name": "Exam Track",
        "categoryId": "stud-cat-45",
        "titles": [
          "NDA Aspirant (Army/Navy/Air Force)",
          "CDS Aspirant",
          "AFCAT Aspirant (Air Force)",
          "Territorial Army Aspirant"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-46",
    "num": 46,
    "name": "Police & Paramilitary",
    "group": "Competitive Exams / Government Services",
    "groupId": "stud-grp-10",
    "icon": "Award",
    "subcategories": [
      {
        "id": "stud-sub-46",
        "name": "Exam Track",
        "categoryId": "stud-cat-46",
        "titles": [
          "SSC Police / State Police Aspirant",
          "Central Armed Police Forces (CAPF) Aspirant"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-47",
    "num": 47,
    "name": "Defence R&D and Space",
    "group": "Competitive Exams / Government Services",
    "groupId": "stud-grp-10",
    "icon": "Award",
    "subcategories": [
      {
        "id": "stud-sub-47",
        "name": "Exam Track",
        "categoryId": "stud-cat-47",
        "titles": [
          "DRDO Scientist Entry Aspirant",
          "ISRO Scientist/Engineer Aspirant"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-48",
    "num": 48,
    "name": "Banking & Financial Sector Exams",
    "group": "Competitive Exams / Government Services",
    "groupId": "stud-grp-10",
    "icon": "Award",
    "subcategories": [
      {
        "id": "stud-sub-48",
        "name": "Exam Track",
        "categoryId": "stud-cat-48",
        "titles": [
          "IBPS PO/Clerk Aspirant",
          "SBI PO/Clerk Aspirant",
          "RBI Grade B Aspirant"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-49",
    "num": 49,
    "name": "Railways",
    "group": "Competitive Exams / Government Services",
    "groupId": "stud-grp-10",
    "icon": "Award",
    "subcategories": [
      {
        "id": "stud-sub-49",
        "name": "Exam Track",
        "categoryId": "stud-cat-49",
        "titles": [
          "RRB (Railway Recruitment Board) Aspirant"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-50",
    "num": 50,
    "name": "Judiciary & Teaching",
    "group": "Competitive Exams / Government Services",
    "groupId": "stud-grp-10",
    "icon": "Award",
    "subcategories": [
      {
        "id": "stud-sub-50",
        "name": "Exam Track",
        "categoryId": "stud-cat-50",
        "titles": [
          "Judicial Services Aspirant",
          "UGC-NET Aspirant",
          "CTET Aspirant"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-51",
    "num": 51,
    "name": "Executive Leadership",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-51",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-51",
        "titles": [
          "Management Trainee",
          "Executive Assistant to Leadership"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-52",
    "num": 52,
    "name": "Board & Corporate Governance",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-52",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-52",
        "titles": [
          "Company Secretary Executive",
          "Governance Analyst"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-53",
    "num": 53,
    "name": "Corporate Strategy",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-53",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-53",
        "titles": [
          "Strategy Analyst",
          "Business Analyst"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-54",
    "num": 54,
    "name": "Business Transformation",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-54",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-54",
        "titles": [
          "Transformation Associate",
          "Change Management Analyst"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-55",
    "num": 55,
    "name": "Finance & Accounts",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-55",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-55",
        "titles": [
          "Accounts Executive",
          "Finance Analyst"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-56",
    "num": 56,
    "name": "Treasury & Investor Relations",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-56",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-56",
        "titles": [
          "Treasury Analyst",
          "Investor Relations Associate"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-57",
    "num": 57,
    "name": "Legal & Compliance",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-57",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-57",
        "titles": [
          "Legal Associate",
          "Compliance Analyst"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-58",
    "num": 58,
    "name": "Risk Management",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-58",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-58",
        "titles": [
          "Risk Analyst"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-59",
    "num": 59,
    "name": "Internal Audit & Assurance",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-59",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-59",
        "titles": [
          "Internal Auditor",
          "Audit Associate"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-60",
    "num": 60,
    "name": "Human Resources (HR)",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-60",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-60",
        "titles": [
          "HR Executive",
          "Talent Acquisition Specialist"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-61",
    "num": 61,
    "name": "Learning & Talent Development",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-61",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-61",
        "titles": [
          "L&D Executive",
          "Training Coordinator"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-62",
    "num": 62,
    "name": "Administration & Facilities",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-62",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-62",
        "titles": [
          "Administration Executive",
          "Facilities Coordinator"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-63",
    "num": 63,
    "name": "Information Technology (IT)",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-63",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-63",
        "titles": [
          "Software Engineer",
          "IT Support Engineer",
          "Systems Analyst"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-64",
    "num": 64,
    "name": "Engineering & Technical Services",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-64",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-64",
        "titles": [
          "Engineer (Technical Services)",
          "Design Engineer"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-65",
    "num": 65,
    "name": "Artificial Intelligence (AI)",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-65",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-65",
        "titles": [
          "AI/ML Engineer",
          "Data Scientist"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-66",
    "num": 66,
    "name": "Data, Analytics & Business Intelligence",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-66",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-66",
        "titles": [
          "Data Analyst",
          "BI Developer"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-67",
    "num": 67,
    "name": "Cyber Security & Information Security",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-67",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-67",
        "titles": [
          "Security Analyst",
          "SOC Engineer"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-68",
    "num": 68,
    "name": "Product Management",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-68",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-68",
        "titles": [
          "Associate Product Manager",
          "Product Analyst"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-69",
    "num": 69,
    "name": "Research & Development (R&D)",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-69",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-69",
        "titles": [
          "R&D Engineer",
          "Research Associate"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-70",
    "num": 70,
    "name": "Innovation & Digital Transformation",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-70",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-70",
        "titles": [
          "Innovation Associate",
          "Digital Transformation Analyst"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-71",
    "num": 71,
    "name": "Operations",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-71",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-71",
        "titles": [
          "Operations Executive",
          "Operations Analyst"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-72",
    "num": 72,
    "name": "Manufacturing & Production",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-72",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-72",
        "titles": [
          "Production Engineer",
          "Shift Supervisor"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-73",
    "num": 73,
    "name": "Quality Assurance & Continuous Improvement",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-73",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-73",
        "titles": [
          "QA Engineer",
          "Process Improvement Analyst"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-74",
    "num": 74,
    "name": "Procurement & Strategic Sourcing",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-74",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-74",
        "titles": [
          "Procurement Executive",
          "Sourcing Analyst"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-75",
    "num": 75,
    "name": "Supply Chain, Logistics & Warehousing",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-75",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-75",
        "titles": [
          "Supply Chain Executive",
          "Logistics Coordinator"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-76",
    "num": 76,
    "name": "Sales & Business Development",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-76",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-76",
        "titles": [
          "Sales Executive",
          "Business Development Associate"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-77",
    "num": 77,
    "name": "Marketing & Brand Management",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-77",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-77",
        "titles": [
          "Marketing Executive",
          "Brand Associate"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-78",
    "num": 78,
    "name": "Customer Success & Customer Experience",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-78",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-78",
        "titles": [
          "Customer Success Associate",
          "CX Analyst"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-79",
    "num": 79,
    "name": "Corporate Communications & Public Relations",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-79",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-79",
        "titles": [
          "Corporate Communications Executive",
          "PR Associate"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-80",
    "num": 80,
    "name": "Government Relations & Public Policy",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-80",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-80",
        "titles": [
          "Government Relations Associate",
          "Public Policy Analyst"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-81",
    "num": 81,
    "name": "International Business & Global Trade",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-81",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-81",
        "titles": [
          "International Trade Executive",
          "Export-Import Analyst"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-82",
    "num": 82,
    "name": "Sustainability, ESG & CSR",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-82",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-82",
        "titles": [
          "Sustainability Analyst",
          "CSR Executive"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-83",
    "num": 83,
    "name": "Health, Safety & Environment (HSE/EHS)",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-83",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-83",
        "titles": [
          "HSE Officer",
          "Safety Engineer"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-84",
    "num": 84,
    "name": "Corporate Affairs & Industry Relations",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-84",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-84",
        "titles": [
          "Corporate Affairs Executive",
          "Industry Relations Associate"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-85",
    "num": 85,
    "name": "Projects, PMO & Program Management",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-85",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-85",
        "titles": [
          "Project Coordinator",
          "PMO Analyst"
        ]
      }
    ]
  },
  {
    "id": "stud-cat-86",
    "num": 86,
    "name": "Innovation Ecosystem, Partnerships & Alliances",
    "group": "Working Professionals (by Department)",
    "groupId": "stud-grp-11",
    "icon": "UserCheck",
    "subcategories": [
      {
        "id": "stud-sub-86",
        "name": "Early/Mid-Career Title",
        "categoryId": "stud-cat-86",
        "titles": [
          "Partnerships Associate",
          "Alliances Executive"
        ]
      }
    ]
  }
];

export const STUDENT_TITLES: StudentTitle[] = [
  {
    "id": "stud-t-1",
    "title": "Diploma in Computer Engineering",
    "categoryId": "stud-cat-1",
    "categoryName": "Computer Science & IT",
    "subcategoryId": "stud-sub-1",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-2",
    "title": "B.Tech/B.E. Computer Science",
    "categoryId": "stud-cat-1",
    "categoryName": "Computer Science & IT",
    "subcategoryId": "stud-sub-1",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-3",
    "title": "B.Tech Information Technology",
    "categoryId": "stud-cat-1",
    "categoryName": "Computer Science & IT",
    "subcategoryId": "stud-sub-1",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-4",
    "title": "M.Tech/M.E. Computer Science",
    "categoryId": "stud-cat-1",
    "categoryName": "Computer Science & IT",
    "subcategoryId": "stud-sub-1",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-5",
    "title": "M.Tech Software Engineering",
    "categoryId": "stud-cat-1",
    "categoryName": "Computer Science & IT",
    "subcategoryId": "stud-sub-1",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-6",
    "title": "PhD Computer Science",
    "categoryId": "stud-cat-1",
    "categoryName": "Computer Science & IT",
    "subcategoryId": "stud-sub-1",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-7",
    "title": "Diploma in Electronics",
    "categoryId": "stud-cat-2",
    "categoryName": "Electronics & Communication",
    "subcategoryId": "stud-sub-2",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-8",
    "title": "B.Tech Electronics & Communication (ECE)",
    "categoryId": "stud-cat-2",
    "categoryName": "Electronics & Communication",
    "subcategoryId": "stud-sub-2",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-9",
    "title": "B.Tech VLSI Design",
    "categoryId": "stud-cat-2",
    "categoryName": "Electronics & Communication",
    "subcategoryId": "stud-sub-2",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-10",
    "title": "M.Tech Electronics & Communication",
    "categoryId": "stud-cat-2",
    "categoryName": "Electronics & Communication",
    "subcategoryId": "stud-sub-2",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-11",
    "title": "PhD Electronics Engineering",
    "categoryId": "stud-cat-2",
    "categoryName": "Electronics & Communication",
    "subcategoryId": "stud-sub-2",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-12",
    "title": "Diploma in Mechanical Engineering",
    "categoryId": "stud-cat-3",
    "categoryName": "Mechanical Engineering",
    "subcategoryId": "stud-sub-3",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-13",
    "title": "B.Tech/B.E. Mechanical Engineering",
    "categoryId": "stud-cat-3",
    "categoryName": "Mechanical Engineering",
    "subcategoryId": "stud-sub-3",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-14",
    "title": "M.Tech Mechanical Engineering",
    "categoryId": "stud-cat-3",
    "categoryName": "Mechanical Engineering",
    "subcategoryId": "stud-sub-3",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-15",
    "title": "M.Tech Thermal Engineering",
    "categoryId": "stud-cat-3",
    "categoryName": "Mechanical Engineering",
    "subcategoryId": "stud-sub-3",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-16",
    "title": "PhD Mechanical Engineering",
    "categoryId": "stud-cat-3",
    "categoryName": "Mechanical Engineering",
    "subcategoryId": "stud-sub-3",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-17",
    "title": "Diploma in Civil Engineering",
    "categoryId": "stud-cat-4",
    "categoryName": "Civil Engineering",
    "subcategoryId": "stud-sub-4",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-18",
    "title": "B.Tech/B.E. Civil Engineering",
    "categoryId": "stud-cat-4",
    "categoryName": "Civil Engineering",
    "subcategoryId": "stud-sub-4",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-19",
    "title": "M.Tech Structural Engineering",
    "categoryId": "stud-cat-4",
    "categoryName": "Civil Engineering",
    "subcategoryId": "stud-sub-4",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-20",
    "title": "M.Tech Transportation Engineering",
    "categoryId": "stud-cat-4",
    "categoryName": "Civil Engineering",
    "subcategoryId": "stud-sub-4",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-21",
    "title": "PhD Civil Engineering",
    "categoryId": "stud-cat-4",
    "categoryName": "Civil Engineering",
    "subcategoryId": "stud-sub-4",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-22",
    "title": "Diploma in Electrical Engineering",
    "categoryId": "stud-cat-5",
    "categoryName": "Electrical Engineering",
    "subcategoryId": "stud-sub-5",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-23",
    "title": "B.Tech/B.E. Electrical Engineering",
    "categoryId": "stud-cat-5",
    "categoryName": "Electrical Engineering",
    "subcategoryId": "stud-sub-5",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-24",
    "title": "B.Tech Power Systems",
    "categoryId": "stud-cat-5",
    "categoryName": "Electrical Engineering",
    "subcategoryId": "stud-sub-5",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-25",
    "title": "M.Tech Electrical Engineering",
    "categoryId": "stud-cat-5",
    "categoryName": "Electrical Engineering",
    "subcategoryId": "stud-sub-5",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-26",
    "title": "PhD Electrical Engineering",
    "categoryId": "stud-cat-5",
    "categoryName": "Electrical Engineering",
    "subcategoryId": "stud-sub-5",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-27",
    "title": "B.Tech/B.E. Chemical Engineering",
    "categoryId": "stud-cat-6",
    "categoryName": "Chemical Engineering",
    "subcategoryId": "stud-sub-6",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-28",
    "title": "M.Tech Chemical Engineering",
    "categoryId": "stud-cat-6",
    "categoryName": "Chemical Engineering",
    "subcategoryId": "stud-sub-6",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-29",
    "title": "PhD Chemical Engineering",
    "categoryId": "stud-cat-6",
    "categoryName": "Chemical Engineering",
    "subcategoryId": "stud-sub-6",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-30",
    "title": "B.Tech Biotechnology",
    "categoryId": "stud-cat-7",
    "categoryName": "Biotechnology & Bioengineering",
    "subcategoryId": "stud-sub-7",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-31",
    "title": "M.Tech/M.Sc Biotechnology",
    "categoryId": "stud-cat-7",
    "categoryName": "Biotechnology & Bioengineering",
    "subcategoryId": "stud-sub-7",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-32",
    "title": "M.Tech Bioinformatics",
    "categoryId": "stud-cat-7",
    "categoryName": "Biotechnology & Bioengineering",
    "subcategoryId": "stud-sub-7",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-33",
    "title": "PhD Biotechnology",
    "categoryId": "stud-cat-7",
    "categoryName": "Biotechnology & Bioengineering",
    "subcategoryId": "stud-sub-7",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-34",
    "title": "B.Tech Aerospace Engineering",
    "categoryId": "stud-cat-8",
    "categoryName": "Aerospace & Aeronautical",
    "subcategoryId": "stud-sub-8",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-35",
    "title": "B.Tech Aeronautical Engineering",
    "categoryId": "stud-cat-8",
    "categoryName": "Aerospace & Aeronautical",
    "subcategoryId": "stud-sub-8",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-36",
    "title": "M.Tech Aerospace Engineering",
    "categoryId": "stud-cat-8",
    "categoryName": "Aerospace & Aeronautical",
    "subcategoryId": "stud-sub-8",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-37",
    "title": "PhD Aerospace Engineering",
    "categoryId": "stud-cat-8",
    "categoryName": "Aerospace & Aeronautical",
    "subcategoryId": "stud-sub-8",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-38",
    "title": "B.Tech Automobile Engineering",
    "categoryId": "stud-cat-9",
    "categoryName": "Automobile Engineering",
    "subcategoryId": "stud-sub-9",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-39",
    "title": "M.Tech Automotive Engineering (EV specialization)",
    "categoryId": "stud-cat-9",
    "categoryName": "Automobile Engineering",
    "subcategoryId": "stud-sub-9",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-40",
    "title": "B.Tech Metallurgical Engineering",
    "categoryId": "stud-cat-10",
    "categoryName": "Metallurgical & Mining Engineering",
    "subcategoryId": "stud-sub-10",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-41",
    "title": "B.Tech Mining Engineering",
    "categoryId": "stud-cat-10",
    "categoryName": "Metallurgical & Mining Engineering",
    "subcategoryId": "stud-sub-10",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-42",
    "title": "M.Tech Metallurgy",
    "categoryId": "stud-cat-10",
    "categoryName": "Metallurgical & Mining Engineering",
    "subcategoryId": "stud-sub-10",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-43",
    "title": "PhD Metallurgical Engineering",
    "categoryId": "stud-cat-10",
    "categoryName": "Metallurgical & Mining Engineering",
    "subcategoryId": "stud-sub-10",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-44",
    "title": "B.Tech Textile Engineering",
    "categoryId": "stud-cat-11",
    "categoryName": "Textile Engineering",
    "subcategoryId": "stud-sub-11",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-45",
    "title": "B.Tech Fashion Technology",
    "categoryId": "stud-cat-11",
    "categoryName": "Textile Engineering",
    "subcategoryId": "stud-sub-11",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-46",
    "title": "M.Tech Textile Engineering",
    "categoryId": "stud-cat-11",
    "categoryName": "Textile Engineering",
    "subcategoryId": "stud-sub-11",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-47",
    "title": "B.Tech Agricultural Engineering",
    "categoryId": "stud-cat-12",
    "categoryName": "Agricultural Engineering",
    "subcategoryId": "stud-sub-12",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-48",
    "title": "M.Tech Agricultural Engineering",
    "categoryId": "stud-cat-12",
    "categoryName": "Agricultural Engineering",
    "subcategoryId": "stud-sub-12",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-49",
    "title": "PhD Agricultural Sciences",
    "categoryId": "stud-cat-12",
    "categoryName": "Agricultural Engineering",
    "subcategoryId": "stud-sub-12",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-50",
    "title": "B.Tech Environmental Engineering",
    "categoryId": "stud-cat-13",
    "categoryName": "Environmental Engineering",
    "subcategoryId": "stud-sub-13",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-51",
    "title": "M.Tech Environmental Engineering",
    "categoryId": "stud-cat-13",
    "categoryName": "Environmental Engineering",
    "subcategoryId": "stud-sub-13",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-52",
    "title": "PhD Environmental Science",
    "categoryId": "stud-cat-13",
    "categoryName": "Environmental Engineering",
    "subcategoryId": "stud-sub-13",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-53",
    "title": "B.Tech Industrial Engineering",
    "categoryId": "stud-cat-14",
    "categoryName": "Industrial & Production Engineering",
    "subcategoryId": "stud-sub-14",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-54",
    "title": "B.Tech Production Engineering",
    "categoryId": "stud-cat-14",
    "categoryName": "Industrial & Production Engineering",
    "subcategoryId": "stud-sub-14",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-55",
    "title": "M.Tech Industrial Engineering & Management",
    "categoryId": "stud-cat-14",
    "categoryName": "Industrial & Production Engineering",
    "subcategoryId": "stud-sub-14",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-56",
    "title": "B.Tech Marine Engineering",
    "categoryId": "stud-cat-15",
    "categoryName": "Marine & Naval Engineering",
    "subcategoryId": "stud-sub-15",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-57",
    "title": "B.Tech Naval Architecture & Ocean Engineering",
    "categoryId": "stud-cat-15",
    "categoryName": "Marine & Naval Engineering",
    "subcategoryId": "stud-sub-15",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-58",
    "title": "B.Tech Nuclear Engineering",
    "categoryId": "stud-cat-16",
    "categoryName": "Nuclear Engineering",
    "subcategoryId": "stud-sub-16",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-59",
    "title": "M.Tech Nuclear Engineering",
    "categoryId": "stud-cat-16",
    "categoryName": "Nuclear Engineering",
    "subcategoryId": "stud-sub-16",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-60",
    "title": "PhD Nuclear Physics/Engineering",
    "categoryId": "stud-cat-16",
    "categoryName": "Nuclear Engineering",
    "subcategoryId": "stud-sub-16",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-61",
    "title": "B.Tech Petroleum Engineering",
    "categoryId": "stud-cat-17",
    "categoryName": "Petroleum Engineering",
    "subcategoryId": "stud-sub-17",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-62",
    "title": "M.Tech Petroleum Engineering",
    "categoryId": "stud-cat-17",
    "categoryName": "Petroleum Engineering",
    "subcategoryId": "stud-sub-17",
    "subcategoryName": "Degree Program",
    "groupName": "Engineering & Technology"
  },
  {
    "id": "stud-t-63",
    "title": "NEET Aspirant (Pre-Medical)",
    "categoryId": "stud-cat-18",
    "categoryName": "Allopathic Medicine",
    "subcategoryId": "stud-sub-18",
    "subcategoryName": "Degree Program",
    "groupName": "Medical & Health Sciences"
  },
  {
    "id": "stud-t-64",
    "title": "MBBS Student",
    "categoryId": "stud-cat-18",
    "categoryName": "Allopathic Medicine",
    "subcategoryId": "stud-sub-18",
    "subcategoryName": "Degree Program",
    "groupName": "Medical & Health Sciences"
  },
  {
    "id": "stud-t-65",
    "title": "MD/MS (Postgraduate Medicine)",
    "categoryId": "stud-cat-18",
    "categoryName": "Allopathic Medicine",
    "subcategoryId": "stud-sub-18",
    "subcategoryName": "Degree Program",
    "groupName": "Medical & Health Sciences"
  },
  {
    "id": "stud-t-66",
    "title": "DM/MCh (Super-Specialty)",
    "categoryId": "stud-cat-18",
    "categoryName": "Allopathic Medicine",
    "subcategoryId": "stud-sub-18",
    "subcategoryName": "Degree Program",
    "groupName": "Medical & Health Sciences"
  },
  {
    "id": "stud-t-67",
    "title": "BDS Student",
    "categoryId": "stud-cat-19",
    "categoryName": "Dental Sciences",
    "subcategoryId": "stud-sub-19",
    "subcategoryName": "Degree Program",
    "groupName": "Medical & Health Sciences"
  },
  {
    "id": "stud-t-68",
    "title": "MDS (Postgraduate Dental)",
    "categoryId": "stud-cat-19",
    "categoryName": "Dental Sciences",
    "subcategoryId": "stud-sub-19",
    "subcategoryName": "Degree Program",
    "groupName": "Medical & Health Sciences"
  },
  {
    "id": "stud-t-69",
    "title": "BAMS Student (Ayurveda)",
    "categoryId": "stud-cat-20",
    "categoryName": "AYUSH (Traditional Medicine)",
    "subcategoryId": "stud-sub-20",
    "subcategoryName": "Degree Program",
    "groupName": "Medical & Health Sciences"
  },
  {
    "id": "stud-t-70",
    "title": "BHMS Student (Homeopathy)",
    "categoryId": "stud-cat-20",
    "categoryName": "AYUSH (Traditional Medicine)",
    "subcategoryId": "stud-sub-20",
    "subcategoryName": "Degree Program",
    "groupName": "Medical & Health Sciences"
  },
  {
    "id": "stud-t-71",
    "title": "BUMS Student (Unani)",
    "categoryId": "stud-cat-20",
    "categoryName": "AYUSH (Traditional Medicine)",
    "subcategoryId": "stud-sub-20",
    "subcategoryName": "Degree Program",
    "groupName": "Medical & Health Sciences"
  },
  {
    "id": "stud-t-72",
    "title": "BNYS Student (Naturopathy & Yoga)",
    "categoryId": "stud-cat-20",
    "categoryName": "AYUSH (Traditional Medicine)",
    "subcategoryId": "stud-sub-20",
    "subcategoryName": "Degree Program",
    "groupName": "Medical & Health Sciences"
  },
  {
    "id": "stud-t-73",
    "title": "B.Sc Nursing",
    "categoryId": "stud-cat-21",
    "categoryName": "Nursing",
    "subcategoryId": "stud-sub-21",
    "subcategoryName": "Degree Program",
    "groupName": "Medical & Health Sciences"
  },
  {
    "id": "stud-t-74",
    "title": "M.Sc Nursing",
    "categoryId": "stud-cat-21",
    "categoryName": "Nursing",
    "subcategoryId": "stud-sub-21",
    "subcategoryName": "Degree Program",
    "groupName": "Medical & Health Sciences"
  },
  {
    "id": "stud-t-75",
    "title": "GNM (General Nursing & Midwifery)",
    "categoryId": "stud-cat-21",
    "categoryName": "Nursing",
    "subcategoryId": "stud-sub-21",
    "subcategoryName": "Degree Program",
    "groupName": "Medical & Health Sciences"
  },
  {
    "id": "stud-t-76",
    "title": "D.Pharm",
    "categoryId": "stud-cat-22",
    "categoryName": "Pharmacy",
    "subcategoryId": "stud-sub-22",
    "subcategoryName": "Degree Program",
    "groupName": "Medical & Health Sciences"
  },
  {
    "id": "stud-t-77",
    "title": "B.Pharm",
    "categoryId": "stud-cat-22",
    "categoryName": "Pharmacy",
    "subcategoryId": "stud-sub-22",
    "subcategoryName": "Degree Program",
    "groupName": "Medical & Health Sciences"
  },
  {
    "id": "stud-t-78",
    "title": "M.Pharm",
    "categoryId": "stud-cat-22",
    "categoryName": "Pharmacy",
    "subcategoryId": "stud-sub-22",
    "subcategoryName": "Degree Program",
    "groupName": "Medical & Health Sciences"
  },
  {
    "id": "stud-t-79",
    "title": "Pharm.D",
    "categoryId": "stud-cat-22",
    "categoryName": "Pharmacy",
    "subcategoryId": "stud-sub-22",
    "subcategoryName": "Degree Program",
    "groupName": "Medical & Health Sciences"
  },
  {
    "id": "stud-t-80",
    "title": "Physiotherapy (BPT/MPT)",
    "categoryId": "stud-cat-23",
    "categoryName": "Allied Health Sciences",
    "subcategoryId": "stud-sub-23",
    "subcategoryName": "Degree Program",
    "groupName": "Medical & Health Sciences"
  },
  {
    "id": "stud-t-81",
    "title": "Medical Lab Technology (BMLT)",
    "categoryId": "stud-cat-23",
    "categoryName": "Allied Health Sciences",
    "subcategoryId": "stud-sub-23",
    "subcategoryName": "Degree Program",
    "groupName": "Medical & Health Sciences"
  },
  {
    "id": "stud-t-82",
    "title": "Radiology & Imaging Technology",
    "categoryId": "stud-cat-23",
    "categoryName": "Allied Health Sciences",
    "subcategoryId": "stud-sub-23",
    "subcategoryName": "Degree Program",
    "groupName": "Medical & Health Sciences"
  },
  {
    "id": "stud-t-83",
    "title": "Occupational Therapy",
    "categoryId": "stud-cat-23",
    "categoryName": "Allied Health Sciences",
    "subcategoryId": "stud-sub-23",
    "subcategoryName": "Degree Program",
    "groupName": "Medical & Health Sciences"
  },
  {
    "id": "stud-t-84",
    "title": "Nutrition & Dietetics",
    "categoryId": "stud-cat-23",
    "categoryName": "Allied Health Sciences",
    "subcategoryId": "stud-sub-23",
    "subcategoryName": "Degree Program",
    "groupName": "Medical & Health Sciences"
  },
  {
    "id": "stud-t-85",
    "title": "MPH (Master of Public Health)",
    "categoryId": "stud-cat-24",
    "categoryName": "Public Health",
    "subcategoryId": "stud-sub-24",
    "subcategoryName": "Degree Program",
    "groupName": "Medical & Health Sciences"
  },
  {
    "id": "stud-t-86",
    "title": "PhD Public Health / Epidemiology",
    "categoryId": "stud-cat-24",
    "categoryName": "Public Health",
    "subcategoryId": "stud-sub-24",
    "subcategoryName": "Degree Program",
    "groupName": "Medical & Health Sciences"
  },
  {
    "id": "stud-t-87",
    "title": "B.V.Sc & AH Student",
    "categoryId": "stud-cat-25",
    "categoryName": "Veterinary Sciences",
    "subcategoryId": "stud-sub-25",
    "subcategoryName": "Degree Program",
    "groupName": "Medical & Health Sciences"
  },
  {
    "id": "stud-t-88",
    "title": "M.V.Sc Student",
    "categoryId": "stud-cat-25",
    "categoryName": "Veterinary Sciences",
    "subcategoryId": "stud-sub-25",
    "subcategoryName": "Degree Program",
    "groupName": "Medical & Health Sciences"
  },
  {
    "id": "stud-t-89",
    "title": "MBA \u2014 Finance",
    "categoryId": "stud-cat-26",
    "categoryName": "MBA / PGDM Specializations",
    "subcategoryId": "stud-sub-26",
    "subcategoryName": "Degree Program",
    "groupName": "Management"
  },
  {
    "id": "stud-t-90",
    "title": "MBA \u2014 Marketing",
    "categoryId": "stud-cat-26",
    "categoryName": "MBA / PGDM Specializations",
    "subcategoryId": "stud-sub-26",
    "subcategoryName": "Degree Program",
    "groupName": "Management"
  },
  {
    "id": "stud-t-91",
    "title": "MBA \u2014 Human Resources",
    "categoryId": "stud-cat-26",
    "categoryName": "MBA / PGDM Specializations",
    "subcategoryId": "stud-sub-26",
    "subcategoryName": "Degree Program",
    "groupName": "Management"
  },
  {
    "id": "stud-t-92",
    "title": "MBA \u2014 Operations & Supply Chain",
    "categoryId": "stud-cat-26",
    "categoryName": "MBA / PGDM Specializations",
    "subcategoryId": "stud-sub-26",
    "subcategoryName": "Degree Program",
    "groupName": "Management"
  },
  {
    "id": "stud-t-93",
    "title": "MBA \u2014 International Business",
    "categoryId": "stud-cat-26",
    "categoryName": "MBA / PGDM Specializations",
    "subcategoryId": "stud-sub-26",
    "subcategoryName": "Degree Program",
    "groupName": "Management"
  },
  {
    "id": "stud-t-94",
    "title": "MBA \u2014 Business Analytics / Data Science",
    "categoryId": "stud-cat-26",
    "categoryName": "MBA / PGDM Specializations",
    "subcategoryId": "stud-sub-26",
    "subcategoryName": "Degree Program",
    "groupName": "Management"
  },
  {
    "id": "stud-t-95",
    "title": "MBA \u2014 Healthcare Management",
    "categoryId": "stud-cat-26",
    "categoryName": "MBA / PGDM Specializations",
    "subcategoryId": "stud-sub-26",
    "subcategoryName": "Degree Program",
    "groupName": "Management"
  },
  {
    "id": "stud-t-96",
    "title": "MBA \u2014 Agribusiness Management",
    "categoryId": "stud-cat-26",
    "categoryName": "MBA / PGDM Specializations",
    "subcategoryId": "stud-sub-26",
    "subcategoryName": "Degree Program",
    "groupName": "Management"
  },
  {
    "id": "stud-t-97",
    "title": "MBA \u2014 Rural Management",
    "categoryId": "stud-cat-26",
    "categoryName": "MBA / PGDM Specializations",
    "subcategoryId": "stud-sub-26",
    "subcategoryName": "Degree Program",
    "groupName": "Management"
  },
  {
    "id": "stud-t-98",
    "title": "MBA \u2014 Hospital & Health Systems Management",
    "categoryId": "stud-cat-26",
    "categoryName": "MBA / PGDM Specializations",
    "subcategoryId": "stud-sub-26",
    "subcategoryName": "Degree Program",
    "groupName": "Management"
  },
  {
    "id": "stud-t-99",
    "title": "PGDM (Post Graduate Diploma in Management)",
    "categoryId": "stud-cat-26",
    "categoryName": "MBA / PGDM Specializations",
    "subcategoryId": "stud-sub-26",
    "subcategoryName": "Degree Program",
    "groupName": "Management"
  },
  {
    "id": "stud-t-100",
    "title": "Executive MBA",
    "categoryId": "stud-cat-26",
    "categoryName": "MBA / PGDM Specializations",
    "subcategoryId": "stud-sub-26",
    "subcategoryName": "Degree Program",
    "groupName": "Management"
  },
  {
    "id": "stud-t-101",
    "title": "BBA (Bachelor of Business Administration)",
    "categoryId": "stud-cat-26",
    "categoryName": "MBA / PGDM Specializations",
    "subcategoryId": "stud-sub-26",
    "subcategoryName": "Degree Program",
    "groupName": "Management"
  },
  {
    "id": "stud-t-102",
    "title": "B.Com (General)",
    "categoryId": "stud-cat-27",
    "categoryName": "Commerce Degrees",
    "subcategoryId": "stud-sub-27",
    "subcategoryName": "Degree/Certification",
    "groupName": "Commerce & Finance"
  },
  {
    "id": "stud-t-103",
    "title": "B.Com (Honours)",
    "categoryId": "stud-cat-27",
    "categoryName": "Commerce Degrees",
    "subcategoryId": "stud-sub-27",
    "subcategoryName": "Degree/Certification",
    "groupName": "Commerce & Finance"
  },
  {
    "id": "stud-t-104",
    "title": "M.Com",
    "categoryId": "stud-cat-27",
    "categoryName": "Commerce Degrees",
    "subcategoryId": "stud-sub-27",
    "subcategoryName": "Degree/Certification",
    "groupName": "Commerce & Finance"
  },
  {
    "id": "stud-t-105",
    "title": "CA Foundation Student",
    "categoryId": "stud-cat-28",
    "categoryName": "Professional Accountancy",
    "subcategoryId": "stud-sub-28",
    "subcategoryName": "Degree/Certification",
    "groupName": "Commerce & Finance"
  },
  {
    "id": "stud-t-106",
    "title": "CA Intermediate Student",
    "categoryId": "stud-cat-28",
    "categoryName": "Professional Accountancy",
    "subcategoryId": "stud-sub-28",
    "subcategoryName": "Degree/Certification",
    "groupName": "Commerce & Finance"
  },
  {
    "id": "stud-t-107",
    "title": "CA Article ship / Final Student",
    "categoryId": "stud-cat-28",
    "categoryName": "Professional Accountancy",
    "subcategoryId": "stud-sub-28",
    "subcategoryName": "Degree/Certification",
    "groupName": "Commerce & Finance"
  },
  {
    "id": "stud-t-108",
    "title": "Company Secretary (CS) Student",
    "categoryId": "stud-cat-28",
    "categoryName": "Professional Accountancy",
    "subcategoryId": "stud-sub-28",
    "subcategoryName": "Degree/Certification",
    "groupName": "Commerce & Finance"
  },
  {
    "id": "stud-t-109",
    "title": "Cost & Management Accountant (CMA) Student",
    "categoryId": "stud-cat-28",
    "categoryName": "Professional Accountancy",
    "subcategoryId": "stud-sub-28",
    "subcategoryName": "Degree/Certification",
    "groupName": "Commerce & Finance"
  },
  {
    "id": "stud-t-110",
    "title": "CFA Level 1/2/3 Candidate",
    "categoryId": "stud-cat-29",
    "categoryName": "Financial Analysis",
    "subcategoryId": "stud-sub-29",
    "subcategoryName": "Degree/Certification",
    "groupName": "Commerce & Finance"
  },
  {
    "id": "stud-t-111",
    "title": "Financial Risk Manager (FRM) Candidate",
    "categoryId": "stud-cat-29",
    "categoryName": "Financial Analysis",
    "subcategoryId": "stud-sub-29",
    "subcategoryName": "Degree/Certification",
    "groupName": "Commerce & Finance"
  },
  {
    "id": "stud-t-112",
    "title": "Actuarial Science Student",
    "categoryId": "stud-cat-29",
    "categoryName": "Financial Analysis",
    "subcategoryId": "stud-sub-29",
    "subcategoryName": "Degree/Certification",
    "groupName": "Commerce & Finance"
  },
  {
    "id": "stud-t-113",
    "title": "LLB (3-Year)",
    "categoryId": "stud-cat-30",
    "categoryName": "Undergraduate Law",
    "subcategoryId": "stud-sub-30",
    "subcategoryName": "Degree Program",
    "groupName": "Law"
  },
  {
    "id": "stud-t-114",
    "title": "BA LLB (5-Year Integrated)",
    "categoryId": "stud-cat-30",
    "categoryName": "Undergraduate Law",
    "subcategoryId": "stud-sub-30",
    "subcategoryName": "Degree Program",
    "groupName": "Law"
  },
  {
    "id": "stud-t-115",
    "title": "BBA LLB (5-Year Integrated)",
    "categoryId": "stud-cat-30",
    "categoryName": "Undergraduate Law",
    "subcategoryId": "stud-sub-30",
    "subcategoryName": "Degree Program",
    "groupName": "Law"
  },
  {
    "id": "stud-t-116",
    "title": "LLM \u2014 Corporate & Commercial Law",
    "categoryId": "stud-cat-31",
    "categoryName": "Postgraduate & Specialized Law",
    "subcategoryId": "stud-sub-31",
    "subcategoryName": "Degree Program",
    "groupName": "Law"
  },
  {
    "id": "stud-t-117",
    "title": "LLM \u2014 International Trade & WTO Law",
    "categoryId": "stud-cat-31",
    "categoryName": "Postgraduate & Specialized Law",
    "subcategoryId": "stud-sub-31",
    "subcategoryName": "Degree Program",
    "groupName": "Law"
  },
  {
    "id": "stud-t-118",
    "title": "LLM \u2014 Intellectual Property Law",
    "categoryId": "stud-cat-31",
    "categoryName": "Postgraduate & Specialized Law",
    "subcategoryId": "stud-sub-31",
    "subcategoryName": "Degree Program",
    "groupName": "Law"
  },
  {
    "id": "stud-t-119",
    "title": "LLM \u2014 Constitutional Law",
    "categoryId": "stud-cat-31",
    "categoryName": "Postgraduate & Specialized Law",
    "subcategoryId": "stud-sub-31",
    "subcategoryName": "Degree Program",
    "groupName": "Law"
  },
  {
    "id": "stud-t-120",
    "title": "LLM \u2014 Cyber Law",
    "categoryId": "stud-cat-31",
    "categoryName": "Postgraduate & Specialized Law",
    "subcategoryId": "stud-sub-31",
    "subcategoryName": "Degree Program",
    "groupName": "Law"
  },
  {
    "id": "stud-t-121",
    "title": "LLM \u2014 Criminal Law",
    "categoryId": "stud-cat-31",
    "categoryName": "Postgraduate & Specialized Law",
    "subcategoryId": "stud-sub-31",
    "subcategoryName": "Degree Program",
    "groupName": "Law"
  },
  {
    "id": "stud-t-122",
    "title": "PhD Law",
    "categoryId": "stud-cat-31",
    "categoryName": "Postgraduate & Specialized Law",
    "subcategoryId": "stud-sub-31",
    "subcategoryName": "Degree Program",
    "groupName": "Law"
  },
  {
    "id": "stud-t-123",
    "title": "Judicial Services Exam Aspirant",
    "categoryId": "stud-cat-32",
    "categoryName": "Judiciary Track",
    "subcategoryId": "stud-sub-32",
    "subcategoryName": "Degree Program",
    "groupName": "Law"
  },
  {
    "id": "stud-t-124",
    "title": "B.Sc Physics",
    "categoryId": "stud-cat-33",
    "categoryName": "Physics",
    "subcategoryId": "stud-sub-33",
    "subcategoryName": "Degree Program",
    "groupName": "Pure & Applied Sciences / Research"
  },
  {
    "id": "stud-t-125",
    "title": "M.Sc Physics",
    "categoryId": "stud-cat-33",
    "categoryName": "Physics",
    "subcategoryId": "stud-sub-33",
    "subcategoryName": "Degree Program",
    "groupName": "Pure & Applied Sciences / Research"
  },
  {
    "id": "stud-t-126",
    "title": "PhD Physics",
    "categoryId": "stud-cat-33",
    "categoryName": "Physics",
    "subcategoryId": "stud-sub-33",
    "subcategoryName": "Degree Program",
    "groupName": "Pure & Applied Sciences / Research"
  },
  {
    "id": "stud-t-127",
    "title": "B.Sc Chemistry",
    "categoryId": "stud-cat-34",
    "categoryName": "Chemistry",
    "subcategoryId": "stud-sub-34",
    "subcategoryName": "Degree Program",
    "groupName": "Pure & Applied Sciences / Research"
  },
  {
    "id": "stud-t-128",
    "title": "M.Sc Chemistry",
    "categoryId": "stud-cat-34",
    "categoryName": "Chemistry",
    "subcategoryId": "stud-sub-34",
    "subcategoryName": "Degree Program",
    "groupName": "Pure & Applied Sciences / Research"
  },
  {
    "id": "stud-t-129",
    "title": "PhD Chemistry",
    "categoryId": "stud-cat-34",
    "categoryName": "Chemistry",
    "subcategoryId": "stud-sub-34",
    "subcategoryName": "Degree Program",
    "groupName": "Pure & Applied Sciences / Research"
  },
  {
    "id": "stud-t-130",
    "title": "B.Sc Mathematics/Statistics",
    "categoryId": "stud-cat-35",
    "categoryName": "Mathematics & Statistics",
    "subcategoryId": "stud-sub-35",
    "subcategoryName": "Degree Program",
    "groupName": "Pure & Applied Sciences / Research"
  },
  {
    "id": "stud-t-131",
    "title": "M.Sc Mathematics/Statistics",
    "categoryId": "stud-cat-35",
    "categoryName": "Mathematics & Statistics",
    "subcategoryId": "stud-sub-35",
    "subcategoryName": "Degree Program",
    "groupName": "Pure & Applied Sciences / Research"
  },
  {
    "id": "stud-t-132",
    "title": "PhD Mathematics/Statistics",
    "categoryId": "stud-cat-35",
    "categoryName": "Mathematics & Statistics",
    "subcategoryId": "stud-sub-35",
    "subcategoryName": "Degree Program",
    "groupName": "Pure & Applied Sciences / Research"
  },
  {
    "id": "stud-t-133",
    "title": "B.Sc Life Sciences/Botany/Zoology",
    "categoryId": "stud-cat-36",
    "categoryName": "Biology & Life Sciences",
    "subcategoryId": "stud-sub-36",
    "subcategoryName": "Degree Program",
    "groupName": "Pure & Applied Sciences / Research"
  },
  {
    "id": "stud-t-134",
    "title": "M.Sc Life Sciences",
    "categoryId": "stud-cat-36",
    "categoryName": "Biology & Life Sciences",
    "subcategoryId": "stud-sub-36",
    "subcategoryName": "Degree Program",
    "groupName": "Pure & Applied Sciences / Research"
  },
  {
    "id": "stud-t-135",
    "title": "PhD Life Sciences",
    "categoryId": "stud-cat-36",
    "categoryName": "Biology & Life Sciences",
    "subcategoryId": "stud-sub-36",
    "subcategoryName": "Degree Program",
    "groupName": "Pure & Applied Sciences / Research"
  },
  {
    "id": "stud-t-136",
    "title": "B.Sc Environmental Science",
    "categoryId": "stud-cat-37",
    "categoryName": "Environmental Science",
    "subcategoryId": "stud-sub-37",
    "subcategoryName": "Degree Program",
    "groupName": "Pure & Applied Sciences / Research"
  },
  {
    "id": "stud-t-137",
    "title": "M.Sc Environmental Science",
    "categoryId": "stud-cat-37",
    "categoryName": "Environmental Science",
    "subcategoryId": "stud-sub-37",
    "subcategoryName": "Degree Program",
    "groupName": "Pure & Applied Sciences / Research"
  },
  {
    "id": "stud-t-138",
    "title": "PhD Environmental Science",
    "categoryId": "stud-cat-37",
    "categoryName": "Environmental Science",
    "subcategoryId": "stud-sub-37",
    "subcategoryName": "Degree Program",
    "groupName": "Pure & Applied Sciences / Research"
  },
  {
    "id": "stud-t-139",
    "title": "B.Sc Geology",
    "categoryId": "stud-cat-38",
    "categoryName": "Geology & Earth Sciences",
    "subcategoryId": "stud-sub-38",
    "subcategoryName": "Degree Program",
    "groupName": "Pure & Applied Sciences / Research"
  },
  {
    "id": "stud-t-140",
    "title": "M.Sc Geology/Earth Sciences",
    "categoryId": "stud-cat-38",
    "categoryName": "Geology & Earth Sciences",
    "subcategoryId": "stud-sub-38",
    "subcategoryName": "Degree Program",
    "groupName": "Pure & Applied Sciences / Research"
  },
  {
    "id": "stud-t-141",
    "title": "PhD Geology",
    "categoryId": "stud-cat-38",
    "categoryName": "Geology & Earth Sciences",
    "subcategoryId": "stud-sub-38",
    "subcategoryName": "Degree Program",
    "groupName": "Pure & Applied Sciences / Research"
  },
  {
    "id": "stud-t-142",
    "title": "B.Sc/M.Sc Data Science",
    "categoryId": "stud-cat-39",
    "categoryName": "Data Science & Statistics (General)",
    "subcategoryId": "stud-sub-39",
    "subcategoryName": "Degree Program",
    "groupName": "Pure & Applied Sciences / Research"
  },
  {
    "id": "stud-t-143",
    "title": "PhD Data Science",
    "categoryId": "stud-cat-39",
    "categoryName": "Data Science & Statistics (General)",
    "subcategoryId": "stud-sub-39",
    "subcategoryName": "Degree Program",
    "groupName": "Pure & Applied Sciences / Research"
  },
  {
    "id": "stud-t-144",
    "title": "Junior Research Fellow (JRF)",
    "categoryId": "stud-cat-40",
    "categoryName": "Cross-Discipline Research",
    "subcategoryId": "stud-sub-40",
    "subcategoryName": "Degree Program",
    "groupName": "Pure & Applied Sciences / Research"
  },
  {
    "id": "stud-t-145",
    "title": "Senior Research Fellow (SRF)",
    "categoryId": "stud-cat-40",
    "categoryName": "Cross-Discipline Research",
    "subcategoryId": "stud-sub-40",
    "subcategoryName": "Degree Program",
    "groupName": "Pure & Applied Sciences / Research"
  },
  {
    "id": "stud-t-146",
    "title": "Postdoctoral Research Scholar",
    "categoryId": "stud-cat-40",
    "categoryName": "Cross-Discipline Research",
    "subcategoryId": "stud-sub-40",
    "subcategoryName": "Degree Program",
    "groupName": "Pure & Applied Sciences / Research"
  },
  {
    "id": "stud-t-147",
    "title": "BA/MA Economics",
    "categoryId": "stud-cat-41",
    "categoryName": "Social Science Degrees",
    "subcategoryId": "stud-sub-41",
    "subcategoryName": "Degree Program",
    "groupName": "Arts, Humanities & Social Sciences"
  },
  {
    "id": "stud-t-148",
    "title": "BA/MA Political Science",
    "categoryId": "stud-cat-41",
    "categoryName": "Social Science Degrees",
    "subcategoryId": "stud-sub-41",
    "subcategoryName": "Degree Program",
    "groupName": "Arts, Humanities & Social Sciences"
  },
  {
    "id": "stud-t-149",
    "title": "BA/MA Sociology",
    "categoryId": "stud-cat-41",
    "categoryName": "Social Science Degrees",
    "subcategoryId": "stud-sub-41",
    "subcategoryName": "Degree Program",
    "groupName": "Arts, Humanities & Social Sciences"
  },
  {
    "id": "stud-t-150",
    "title": "BA/MA History",
    "categoryId": "stud-cat-41",
    "categoryName": "Social Science Degrees",
    "subcategoryId": "stud-sub-41",
    "subcategoryName": "Degree Program",
    "groupName": "Arts, Humanities & Social Sciences"
  },
  {
    "id": "stud-t-151",
    "title": "BA/MA Psychology",
    "categoryId": "stud-cat-41",
    "categoryName": "Social Science Degrees",
    "subcategoryId": "stud-sub-41",
    "subcategoryName": "Degree Program",
    "groupName": "Arts, Humanities & Social Sciences"
  },
  {
    "id": "stud-t-152",
    "title": "MA International Relations",
    "categoryId": "stud-cat-41",
    "categoryName": "Social Science Degrees",
    "subcategoryId": "stud-sub-41",
    "subcategoryName": "Degree Program",
    "groupName": "Arts, Humanities & Social Sciences"
  },
  {
    "id": "stud-t-153",
    "title": "Master of Public Policy (MPP)",
    "categoryId": "stud-cat-41",
    "categoryName": "Social Science Degrees",
    "subcategoryId": "stud-sub-41",
    "subcategoryName": "Degree Program",
    "groupName": "Arts, Humanities & Social Sciences"
  },
  {
    "id": "stud-t-154",
    "title": "Master of Public Administration (MPA)",
    "categoryId": "stud-cat-41",
    "categoryName": "Social Science Degrees",
    "subcategoryId": "stud-sub-41",
    "subcategoryName": "Degree Program",
    "groupName": "Arts, Humanities & Social Sciences"
  },
  {
    "id": "stud-t-155",
    "title": "BA/MA Geography",
    "categoryId": "stud-cat-41",
    "categoryName": "Social Science Degrees",
    "subcategoryId": "stud-sub-41",
    "subcategoryName": "Degree Program",
    "groupName": "Arts, Humanities & Social Sciences"
  },
  {
    "id": "stud-t-156",
    "title": "BA General / Humanities",
    "categoryId": "stud-cat-41",
    "categoryName": "Social Science Degrees",
    "subcategoryId": "stud-sub-41",
    "subcategoryName": "Degree Program",
    "groupName": "Arts, Humanities & Social Sciences"
  },
  {
    "id": "stud-t-157",
    "title": "BJMC (Bachelor of Journalism & Mass Communication)",
    "categoryId": "stud-cat-42",
    "categoryName": "Journalism / Mass Communication",
    "subcategoryId": "stud-sub-42",
    "subcategoryName": "Degree Program",
    "groupName": "Journalism & Media"
  },
  {
    "id": "stud-t-158",
    "title": "MA Journalism & Mass Communication",
    "categoryId": "stud-cat-42",
    "categoryName": "Journalism / Mass Communication",
    "subcategoryId": "stud-sub-42",
    "subcategoryName": "Degree Program",
    "groupName": "Journalism & Media"
  },
  {
    "id": "stud-t-159",
    "title": "Broadcast Journalism Student",
    "categoryId": "stud-cat-42",
    "categoryName": "Journalism / Mass Communication",
    "subcategoryId": "stud-sub-42",
    "subcategoryName": "Degree Program",
    "groupName": "Journalism & Media"
  },
  {
    "id": "stud-t-160",
    "title": "Digital Media & Content Student",
    "categoryId": "stud-cat-42",
    "categoryName": "Journalism / Mass Communication",
    "subcategoryId": "stud-sub-42",
    "subcategoryName": "Degree Program",
    "groupName": "Journalism & Media"
  },
  {
    "id": "stud-t-161",
    "title": "Film & TV Production Student",
    "categoryId": "stud-cat-42",
    "categoryName": "Journalism / Mass Communication",
    "subcategoryId": "stud-sub-42",
    "subcategoryName": "Degree Program",
    "groupName": "Journalism & Media"
  },
  {
    "id": "stud-t-162",
    "title": "Public Relations & Corporate Communication Student",
    "categoryId": "stud-cat-42",
    "categoryName": "Journalism / Mass Communication",
    "subcategoryId": "stud-sub-42",
    "subcategoryName": "Degree Program",
    "groupName": "Journalism & Media"
  },
  {
    "id": "stud-t-163",
    "title": "B.Arch (Architecture)",
    "categoryId": "stud-cat-43",
    "categoryName": "Design & Built Environment",
    "subcategoryId": "stud-sub-43",
    "subcategoryName": "Degree Program",
    "groupName": "Design & Architecture"
  },
  {
    "id": "stud-t-164",
    "title": "M.Arch",
    "categoryId": "stud-cat-43",
    "categoryName": "Design & Built Environment",
    "subcategoryId": "stud-sub-43",
    "subcategoryName": "Degree Program",
    "groupName": "Design & Architecture"
  },
  {
    "id": "stud-t-165",
    "title": "B.Des Product/Industrial Design",
    "categoryId": "stud-cat-43",
    "categoryName": "Design & Built Environment",
    "subcategoryId": "stud-sub-43",
    "subcategoryName": "Degree Program",
    "groupName": "Design & Architecture"
  },
  {
    "id": "stud-t-166",
    "title": "B.Des UX/UI Design",
    "categoryId": "stud-cat-43",
    "categoryName": "Design & Built Environment",
    "subcategoryId": "stud-sub-43",
    "subcategoryName": "Degree Program",
    "groupName": "Design & Architecture"
  },
  {
    "id": "stud-t-167",
    "title": "IAS Aspirant",
    "categoryId": "stud-cat-44",
    "categoryName": "Civil Services (UPSC)",
    "subcategoryId": "stud-sub-44",
    "subcategoryName": "Exam Track",
    "groupName": "Competitive Exams / Government Services"
  },
  {
    "id": "stud-t-168",
    "title": "IFS (Foreign Service) Aspirant",
    "categoryId": "stud-cat-44",
    "categoryName": "Civil Services (UPSC)",
    "subcategoryId": "stud-sub-44",
    "subcategoryName": "Exam Track",
    "groupName": "Competitive Exams / Government Services"
  },
  {
    "id": "stud-t-169",
    "title": "IPS Aspirant",
    "categoryId": "stud-cat-44",
    "categoryName": "Civil Services (UPSC)",
    "subcategoryId": "stud-sub-44",
    "subcategoryName": "Exam Track",
    "groupName": "Competitive Exams / Government Services"
  },
  {
    "id": "stud-t-170",
    "title": "IRS (Revenue Service) Aspirant",
    "categoryId": "stud-cat-44",
    "categoryName": "Civil Services (UPSC)",
    "subcategoryId": "stud-sub-44",
    "subcategoryName": "Exam Track",
    "groupName": "Competitive Exams / Government Services"
  },
  {
    "id": "stud-t-171",
    "title": "State PSC (State Civil Services) Aspirant",
    "categoryId": "stud-cat-44",
    "categoryName": "Civil Services (UPSC)",
    "subcategoryId": "stud-sub-44",
    "subcategoryName": "Exam Track",
    "groupName": "Competitive Exams / Government Services"
  },
  {
    "id": "stud-t-172",
    "title": "NDA Aspirant (Army/Navy/Air Force)",
    "categoryId": "stud-cat-45",
    "categoryName": "Defence Forces",
    "subcategoryId": "stud-sub-45",
    "subcategoryName": "Exam Track",
    "groupName": "Competitive Exams / Government Services"
  },
  {
    "id": "stud-t-173",
    "title": "CDS Aspirant",
    "categoryId": "stud-cat-45",
    "categoryName": "Defence Forces",
    "subcategoryId": "stud-sub-45",
    "subcategoryName": "Exam Track",
    "groupName": "Competitive Exams / Government Services"
  },
  {
    "id": "stud-t-174",
    "title": "AFCAT Aspirant (Air Force)",
    "categoryId": "stud-cat-45",
    "categoryName": "Defence Forces",
    "subcategoryId": "stud-sub-45",
    "subcategoryName": "Exam Track",
    "groupName": "Competitive Exams / Government Services"
  },
  {
    "id": "stud-t-175",
    "title": "Territorial Army Aspirant",
    "categoryId": "stud-cat-45",
    "categoryName": "Defence Forces",
    "subcategoryId": "stud-sub-45",
    "subcategoryName": "Exam Track",
    "groupName": "Competitive Exams / Government Services"
  },
  {
    "id": "stud-t-176",
    "title": "SSC Police / State Police Aspirant",
    "categoryId": "stud-cat-46",
    "categoryName": "Police & Paramilitary",
    "subcategoryId": "stud-sub-46",
    "subcategoryName": "Exam Track",
    "groupName": "Competitive Exams / Government Services"
  },
  {
    "id": "stud-t-177",
    "title": "Central Armed Police Forces (CAPF) Aspirant",
    "categoryId": "stud-cat-46",
    "categoryName": "Police & Paramilitary",
    "subcategoryId": "stud-sub-46",
    "subcategoryName": "Exam Track",
    "groupName": "Competitive Exams / Government Services"
  },
  {
    "id": "stud-t-178",
    "title": "DRDO Scientist Entry Aspirant",
    "categoryId": "stud-cat-47",
    "categoryName": "Defence R&D and Space",
    "subcategoryId": "stud-sub-47",
    "subcategoryName": "Exam Track",
    "groupName": "Competitive Exams / Government Services"
  },
  {
    "id": "stud-t-179",
    "title": "ISRO Scientist/Engineer Aspirant",
    "categoryId": "stud-cat-47",
    "categoryName": "Defence R&D and Space",
    "subcategoryId": "stud-sub-47",
    "subcategoryName": "Exam Track",
    "groupName": "Competitive Exams / Government Services"
  },
  {
    "id": "stud-t-180",
    "title": "IBPS PO/Clerk Aspirant",
    "categoryId": "stud-cat-48",
    "categoryName": "Banking & Financial Sector Exams",
    "subcategoryId": "stud-sub-48",
    "subcategoryName": "Exam Track",
    "groupName": "Competitive Exams / Government Services"
  },
  {
    "id": "stud-t-181",
    "title": "SBI PO/Clerk Aspirant",
    "categoryId": "stud-cat-48",
    "categoryName": "Banking & Financial Sector Exams",
    "subcategoryId": "stud-sub-48",
    "subcategoryName": "Exam Track",
    "groupName": "Competitive Exams / Government Services"
  },
  {
    "id": "stud-t-182",
    "title": "RBI Grade B Aspirant",
    "categoryId": "stud-cat-48",
    "categoryName": "Banking & Financial Sector Exams",
    "subcategoryId": "stud-sub-48",
    "subcategoryName": "Exam Track",
    "groupName": "Competitive Exams / Government Services"
  },
  {
    "id": "stud-t-183",
    "title": "RRB (Railway Recruitment Board) Aspirant",
    "categoryId": "stud-cat-49",
    "categoryName": "Railways",
    "subcategoryId": "stud-sub-49",
    "subcategoryName": "Exam Track",
    "groupName": "Competitive Exams / Government Services"
  },
  {
    "id": "stud-t-184",
    "title": "Judicial Services Aspirant",
    "categoryId": "stud-cat-50",
    "categoryName": "Judiciary & Teaching",
    "subcategoryId": "stud-sub-50",
    "subcategoryName": "Exam Track",
    "groupName": "Competitive Exams / Government Services"
  },
  {
    "id": "stud-t-185",
    "title": "UGC-NET Aspirant",
    "categoryId": "stud-cat-50",
    "categoryName": "Judiciary & Teaching",
    "subcategoryId": "stud-sub-50",
    "subcategoryName": "Exam Track",
    "groupName": "Competitive Exams / Government Services"
  },
  {
    "id": "stud-t-186",
    "title": "CTET Aspirant",
    "categoryId": "stud-cat-50",
    "categoryName": "Judiciary & Teaching",
    "subcategoryId": "stud-sub-50",
    "subcategoryName": "Exam Track",
    "groupName": "Competitive Exams / Government Services"
  },
  {
    "id": "stud-t-187",
    "title": "Management Trainee",
    "categoryId": "stud-cat-51",
    "categoryName": "Executive Leadership",
    "subcategoryId": "stud-sub-51",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-188",
    "title": "Executive Assistant to Leadership",
    "categoryId": "stud-cat-51",
    "categoryName": "Executive Leadership",
    "subcategoryId": "stud-sub-51",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-189",
    "title": "Company Secretary Executive",
    "categoryId": "stud-cat-52",
    "categoryName": "Board & Corporate Governance",
    "subcategoryId": "stud-sub-52",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-190",
    "title": "Governance Analyst",
    "categoryId": "stud-cat-52",
    "categoryName": "Board & Corporate Governance",
    "subcategoryId": "stud-sub-52",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-191",
    "title": "Strategy Analyst",
    "categoryId": "stud-cat-53",
    "categoryName": "Corporate Strategy",
    "subcategoryId": "stud-sub-53",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-192",
    "title": "Business Analyst",
    "categoryId": "stud-cat-53",
    "categoryName": "Corporate Strategy",
    "subcategoryId": "stud-sub-53",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-193",
    "title": "Transformation Associate",
    "categoryId": "stud-cat-54",
    "categoryName": "Business Transformation",
    "subcategoryId": "stud-sub-54",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-194",
    "title": "Change Management Analyst",
    "categoryId": "stud-cat-54",
    "categoryName": "Business Transformation",
    "subcategoryId": "stud-sub-54",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-195",
    "title": "Accounts Executive",
    "categoryId": "stud-cat-55",
    "categoryName": "Finance & Accounts",
    "subcategoryId": "stud-sub-55",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-196",
    "title": "Finance Analyst",
    "categoryId": "stud-cat-55",
    "categoryName": "Finance & Accounts",
    "subcategoryId": "stud-sub-55",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-197",
    "title": "Treasury Analyst",
    "categoryId": "stud-cat-56",
    "categoryName": "Treasury & Investor Relations",
    "subcategoryId": "stud-sub-56",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-198",
    "title": "Investor Relations Associate",
    "categoryId": "stud-cat-56",
    "categoryName": "Treasury & Investor Relations",
    "subcategoryId": "stud-sub-56",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-199",
    "title": "Legal Associate",
    "categoryId": "stud-cat-57",
    "categoryName": "Legal & Compliance",
    "subcategoryId": "stud-sub-57",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-200",
    "title": "Compliance Analyst",
    "categoryId": "stud-cat-57",
    "categoryName": "Legal & Compliance",
    "subcategoryId": "stud-sub-57",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-201",
    "title": "Risk Analyst",
    "categoryId": "stud-cat-58",
    "categoryName": "Risk Management",
    "subcategoryId": "stud-sub-58",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-202",
    "title": "Internal Auditor",
    "categoryId": "stud-cat-59",
    "categoryName": "Internal Audit & Assurance",
    "subcategoryId": "stud-sub-59",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-203",
    "title": "Audit Associate",
    "categoryId": "stud-cat-59",
    "categoryName": "Internal Audit & Assurance",
    "subcategoryId": "stud-sub-59",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-204",
    "title": "HR Executive",
    "categoryId": "stud-cat-60",
    "categoryName": "Human Resources (HR)",
    "subcategoryId": "stud-sub-60",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-205",
    "title": "Talent Acquisition Specialist",
    "categoryId": "stud-cat-60",
    "categoryName": "Human Resources (HR)",
    "subcategoryId": "stud-sub-60",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-206",
    "title": "L&D Executive",
    "categoryId": "stud-cat-61",
    "categoryName": "Learning & Talent Development",
    "subcategoryId": "stud-sub-61",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-207",
    "title": "Training Coordinator",
    "categoryId": "stud-cat-61",
    "categoryName": "Learning & Talent Development",
    "subcategoryId": "stud-sub-61",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-208",
    "title": "Administration Executive",
    "categoryId": "stud-cat-62",
    "categoryName": "Administration & Facilities",
    "subcategoryId": "stud-sub-62",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-209",
    "title": "Facilities Coordinator",
    "categoryId": "stud-cat-62",
    "categoryName": "Administration & Facilities",
    "subcategoryId": "stud-sub-62",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-210",
    "title": "Software Engineer",
    "categoryId": "stud-cat-63",
    "categoryName": "Information Technology (IT)",
    "subcategoryId": "stud-sub-63",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-211",
    "title": "IT Support Engineer",
    "categoryId": "stud-cat-63",
    "categoryName": "Information Technology (IT)",
    "subcategoryId": "stud-sub-63",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-212",
    "title": "Systems Analyst",
    "categoryId": "stud-cat-63",
    "categoryName": "Information Technology (IT)",
    "subcategoryId": "stud-sub-63",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-213",
    "title": "Engineer (Technical Services)",
    "categoryId": "stud-cat-64",
    "categoryName": "Engineering & Technical Services",
    "subcategoryId": "stud-sub-64",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-214",
    "title": "Design Engineer",
    "categoryId": "stud-cat-64",
    "categoryName": "Engineering & Technical Services",
    "subcategoryId": "stud-sub-64",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-215",
    "title": "AI/ML Engineer",
    "categoryId": "stud-cat-65",
    "categoryName": "Artificial Intelligence (AI)",
    "subcategoryId": "stud-sub-65",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-216",
    "title": "Data Scientist",
    "categoryId": "stud-cat-65",
    "categoryName": "Artificial Intelligence (AI)",
    "subcategoryId": "stud-sub-65",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-217",
    "title": "Data Analyst",
    "categoryId": "stud-cat-66",
    "categoryName": "Data, Analytics & Business Intelligence",
    "subcategoryId": "stud-sub-66",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-218",
    "title": "BI Developer",
    "categoryId": "stud-cat-66",
    "categoryName": "Data, Analytics & Business Intelligence",
    "subcategoryId": "stud-sub-66",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-219",
    "title": "Security Analyst",
    "categoryId": "stud-cat-67",
    "categoryName": "Cyber Security & Information Security",
    "subcategoryId": "stud-sub-67",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-220",
    "title": "SOC Engineer",
    "categoryId": "stud-cat-67",
    "categoryName": "Cyber Security & Information Security",
    "subcategoryId": "stud-sub-67",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-221",
    "title": "Associate Product Manager",
    "categoryId": "stud-cat-68",
    "categoryName": "Product Management",
    "subcategoryId": "stud-sub-68",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-222",
    "title": "Product Analyst",
    "categoryId": "stud-cat-68",
    "categoryName": "Product Management",
    "subcategoryId": "stud-sub-68",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-223",
    "title": "R&D Engineer",
    "categoryId": "stud-cat-69",
    "categoryName": "Research & Development (R&D)",
    "subcategoryId": "stud-sub-69",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-224",
    "title": "Research Associate",
    "categoryId": "stud-cat-69",
    "categoryName": "Research & Development (R&D)",
    "subcategoryId": "stud-sub-69",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-225",
    "title": "Innovation Associate",
    "categoryId": "stud-cat-70",
    "categoryName": "Innovation & Digital Transformation",
    "subcategoryId": "stud-sub-70",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-226",
    "title": "Digital Transformation Analyst",
    "categoryId": "stud-cat-70",
    "categoryName": "Innovation & Digital Transformation",
    "subcategoryId": "stud-sub-70",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-227",
    "title": "Operations Executive",
    "categoryId": "stud-cat-71",
    "categoryName": "Operations",
    "subcategoryId": "stud-sub-71",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-228",
    "title": "Operations Analyst",
    "categoryId": "stud-cat-71",
    "categoryName": "Operations",
    "subcategoryId": "stud-sub-71",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-229",
    "title": "Production Engineer",
    "categoryId": "stud-cat-72",
    "categoryName": "Manufacturing & Production",
    "subcategoryId": "stud-sub-72",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-230",
    "title": "Shift Supervisor",
    "categoryId": "stud-cat-72",
    "categoryName": "Manufacturing & Production",
    "subcategoryId": "stud-sub-72",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-231",
    "title": "QA Engineer",
    "categoryId": "stud-cat-73",
    "categoryName": "Quality Assurance & Continuous Improvement",
    "subcategoryId": "stud-sub-73",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-232",
    "title": "Process Improvement Analyst",
    "categoryId": "stud-cat-73",
    "categoryName": "Quality Assurance & Continuous Improvement",
    "subcategoryId": "stud-sub-73",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-233",
    "title": "Procurement Executive",
    "categoryId": "stud-cat-74",
    "categoryName": "Procurement & Strategic Sourcing",
    "subcategoryId": "stud-sub-74",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-234",
    "title": "Sourcing Analyst",
    "categoryId": "stud-cat-74",
    "categoryName": "Procurement & Strategic Sourcing",
    "subcategoryId": "stud-sub-74",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-235",
    "title": "Supply Chain Executive",
    "categoryId": "stud-cat-75",
    "categoryName": "Supply Chain, Logistics & Warehousing",
    "subcategoryId": "stud-sub-75",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-236",
    "title": "Logistics Coordinator",
    "categoryId": "stud-cat-75",
    "categoryName": "Supply Chain, Logistics & Warehousing",
    "subcategoryId": "stud-sub-75",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-237",
    "title": "Sales Executive",
    "categoryId": "stud-cat-76",
    "categoryName": "Sales & Business Development",
    "subcategoryId": "stud-sub-76",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-238",
    "title": "Business Development Associate",
    "categoryId": "stud-cat-76",
    "categoryName": "Sales & Business Development",
    "subcategoryId": "stud-sub-76",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-239",
    "title": "Marketing Executive",
    "categoryId": "stud-cat-77",
    "categoryName": "Marketing & Brand Management",
    "subcategoryId": "stud-sub-77",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-240",
    "title": "Brand Associate",
    "categoryId": "stud-cat-77",
    "categoryName": "Marketing & Brand Management",
    "subcategoryId": "stud-sub-77",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-241",
    "title": "Customer Success Associate",
    "categoryId": "stud-cat-78",
    "categoryName": "Customer Success & Customer Experience",
    "subcategoryId": "stud-sub-78",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-242",
    "title": "CX Analyst",
    "categoryId": "stud-cat-78",
    "categoryName": "Customer Success & Customer Experience",
    "subcategoryId": "stud-sub-78",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-243",
    "title": "Corporate Communications Executive",
    "categoryId": "stud-cat-79",
    "categoryName": "Corporate Communications & Public Relations",
    "subcategoryId": "stud-sub-79",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-244",
    "title": "PR Associate",
    "categoryId": "stud-cat-79",
    "categoryName": "Corporate Communications & Public Relations",
    "subcategoryId": "stud-sub-79",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-245",
    "title": "Government Relations Associate",
    "categoryId": "stud-cat-80",
    "categoryName": "Government Relations & Public Policy",
    "subcategoryId": "stud-sub-80",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-246",
    "title": "Public Policy Analyst",
    "categoryId": "stud-cat-80",
    "categoryName": "Government Relations & Public Policy",
    "subcategoryId": "stud-sub-80",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-247",
    "title": "International Trade Executive",
    "categoryId": "stud-cat-81",
    "categoryName": "International Business & Global Trade",
    "subcategoryId": "stud-sub-81",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-248",
    "title": "Export-Import Analyst",
    "categoryId": "stud-cat-81",
    "categoryName": "International Business & Global Trade",
    "subcategoryId": "stud-sub-81",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-249",
    "title": "Sustainability Analyst",
    "categoryId": "stud-cat-82",
    "categoryName": "Sustainability, ESG & CSR",
    "subcategoryId": "stud-sub-82",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-250",
    "title": "CSR Executive",
    "categoryId": "stud-cat-82",
    "categoryName": "Sustainability, ESG & CSR",
    "subcategoryId": "stud-sub-82",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-251",
    "title": "HSE Officer",
    "categoryId": "stud-cat-83",
    "categoryName": "Health, Safety & Environment (HSE/EHS)",
    "subcategoryId": "stud-sub-83",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-252",
    "title": "Safety Engineer",
    "categoryId": "stud-cat-83",
    "categoryName": "Health, Safety & Environment (HSE/EHS)",
    "subcategoryId": "stud-sub-83",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-253",
    "title": "Corporate Affairs Executive",
    "categoryId": "stud-cat-84",
    "categoryName": "Corporate Affairs & Industry Relations",
    "subcategoryId": "stud-sub-84",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-254",
    "title": "Industry Relations Associate",
    "categoryId": "stud-cat-84",
    "categoryName": "Corporate Affairs & Industry Relations",
    "subcategoryId": "stud-sub-84",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-255",
    "title": "Project Coordinator",
    "categoryId": "stud-cat-85",
    "categoryName": "Projects, PMO & Program Management",
    "subcategoryId": "stud-sub-85",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-256",
    "title": "PMO Analyst",
    "categoryId": "stud-cat-85",
    "categoryName": "Projects, PMO & Program Management",
    "subcategoryId": "stud-sub-85",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-257",
    "title": "Partnerships Associate",
    "categoryId": "stud-cat-86",
    "categoryName": "Innovation Ecosystem, Partnerships & Alliances",
    "subcategoryId": "stud-sub-86",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  },
  {
    "id": "stud-t-258",
    "title": "Alliances Executive",
    "categoryId": "stud-cat-86",
    "categoryName": "Innovation Ecosystem, Partnerships & Alliances",
    "subcategoryId": "stud-sub-86",
    "subcategoryName": "Early/Mid-Career Title",
    "groupName": "Working Professionals (by Department)"
  }
];

export function searchStudentTitles(query: string, limit = 20): StudentTitle[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return STUDENT_TITLES.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.categoryName.toLowerCase().includes(q) ||
      (t.subcategoryName && t.subcategoryName.toLowerCase().includes(q))
  ).slice(0, limit);
}
