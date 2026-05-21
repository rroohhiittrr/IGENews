"use client";

import { UserProfile } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface AuthorityCardProps {
  user: UserProfile;
}

export default function AuthorityCard({ user }: AuthorityCardProps) {
  const isVerified = user.accountType === "sme" || user.accountType === "leader" || user.accountType === "company";
  
  const stages = [
    { id: 1, title: "Reader — Consuming intelligence", subtitle: "Reading, bookmarking, and engaging with content.", active: true, completed: true, color: "bg-[#f4f7fb]", textColor: "text-[#1E3A5F]", date: "" },
    { id: 2, title: "Contributor — Engaging & sharing", subtitle: "Commenting, sharing insights, and participating.", active: true, completed: user.accountType !== 'reader', color: "bg-fuchsia-50", textColor: "text-fuchsia-900", date: "" },
    { id: 3, title: "Authority — Verified expert", subtitle: "Publishing articles, verified identity, and high reputation.", active: isVerified, completed: false, color: "bg-orange-50", textColor: "text-orange-900", date: "Started: 13.06.2026" },
    { id: 4, title: "Influence — Monetization & impact", subtitle: "SME Consulting, paid reports, and ecosystem power.", active: false, completed: false, color: "bg-gray-50", textColor: "text-gray-400", date: "" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-[32px] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
    >
      <h2 className="text-2xl font-bold text-[#1E3A5F] mb-8">Growth Journey</h2>
      
      <div className="relative pl-4 md:pl-6">
        {/* Vertical Line */}
        <div className="absolute left-[23px] md:left-[31px] top-6 bottom-6 w-0.5 bg-[#1E3A5F]/20"></div>

        <div className="space-y-6">
           {stages.map((stage) => (
              <div key={stage.id} className="relative flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                 {/* Circle Marker */}
                 <div className="relative z-10 w-4 h-4 rounded-full border-2 border-[#1E3A5F] bg-white shadow-[0_0_0_4px_white] shrink-0 self-start md:self-center mt-6 md:mt-0">
                    {stage.completed && <div className="absolute inset-[3px] bg-[#1E3A5F] rounded-full"></div>}
                 </div>

                 {/* Card */}
                 <div className={`flex-1 rounded-2xl p-5 ${stage.color} relative group transition-all hover:shadow-md`}>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 pr-10">
                       <div>
                          <h3 className={`font-bold ${stage.textColor} mb-1.5`}>{stage.title}</h3>
                          <p className={`text-sm ${stage.textColor} opacity-80 leading-relaxed`}>{stage.subtitle}</p>
                       </div>
                       
                       {stage.completed ? (
                          <span className="px-3 py-1 bg-[#10b981] text-white text-xs font-bold rounded-lg shadow-sm shrink-0 self-start">
                             Completed
                          </span>
                       ) : stage.date ? (
                          <span className="px-3 py-1 bg-[#1E3A5F] text-white text-xs font-bold rounded-lg shadow-sm shrink-0 self-start">
                             {stage.date}
                          </span>
                       ) : null}
                    </div>

                    {/* Arrow Button */}
                    <button className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1E3A5F] shadow-sm opacity-50 group-hover:opacity-100 transition-opacity">
                       <ArrowDown className="w-4 h-4 -rotate-45" />
                    </button>
                 </div>
              </div>
           ))}
        </div>
      </div>
    </motion.div>
  );
}
