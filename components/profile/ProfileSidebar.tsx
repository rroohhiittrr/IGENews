"use client";

import { User, BookOpen, Award, Calendar, MessageSquare, Shield } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { icon: User, label: "Profile", href: "#profile", badge: null },
    { icon: BookOpen, label: "My News", href: "#news", badge: "3" },
    { icon: Award, label: "Authority", href: "#authority", badge: null },
    { icon: Calendar, label: "Events", href: "#events", badge: "2" },
    { icon: Shield, label: "Settings", href: "#settings", badge: null },
    { icon: MessageSquare, label: "Messages", href: "#messages", badge: "1" },
  ];

  return (
    <div className="w-64 bg-[#1E3A5F] rounded-r-[40px] h-[calc(100vh)] p-6 text-white flex-col relative overflow-hidden hidden md:flex sticky top-0 shadow-2xl z-10 border-r border-[#142840]">
      {/* Decorative Bird/Graphic - Abstract Representation */}
      <div className="absolute bottom-0 left-0 w-full h-64 pointer-events-none opacity-80">
         <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform translate-y-10 scale-150">
           <path fill="#F4A024" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.3,-46.3C90.8,-33.5,96.8,-18.1,96.5,-2.9C96.2,12.3,89.6,27.3,80.4,40.1C71.2,52.9,59.4,63.5,46.1,71.6C32.8,79.7,18,85.3,3.3,80.1C-11.4,74.9,-26.1,58.8,-40.5,49.2C-54.9,39.6,-69,36.5,-78.5,28.5C-88,20.5,-92.9,7.6,-91.7,-4.8C-90.5,-17.2,-83.2,-29.1,-74.2,-39.2C-65.2,-49.3,-54.5,-57.6,-42.6,-65.4C-30.7,-73.2,-17.6,-80.5,-2.3,-76.6C13,-72.7,28.2,-57.6,44.7,-76.4Z" transform="translate(100 100)" />
           <path fill="#2F6FA3" d="M38.1,-63.9C50.1,-56.3,61.1,-46.8,70.1,-34.8C79.1,-22.8,86.1,-8.3,84.6,5.3C83.1,18.9,73.1,31.6,62.1,41.9C51.1,52.2,39.1,60.1,26.1,65.8C13.1,71.5,-0.9,75,-14.9,73.6C-28.9,72.2,-42.9,65.9,-54.4,56.1C-65.9,46.3,-74.9,33,-78.9,18.5C-82.9,4,-81.9,-11.7,-75.4,-25.1C-68.9,-38.5,-56.9,-49.6,-43.9,-56.9C-30.9,-64.2,-16.9,-67.7,-2.1,-64.2C12.7,-60.7,26.1,-50.2,38.1,-63.9Z" transform="translate(100 100) scale(0.8)" />
         </svg>
      </div>

      <div className="mb-12 mt-4 px-4 relative z-10">
        <h2 className="text-xl font-bold tracking-widest uppercase text-white">IGENews</h2>
      </div>

      <nav className="flex-1 space-y-3 relative z-10 w-full ml-2">
        {menuItems.map((item, index) => {
          const isActive = index === 0; 
          return (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center justify-between px-5 py-3.5 rounded-l-3xl transition-all w-[calc(100%+24px)] ${
                isActive 
                  ? "bg-[#f4f7fb] text-[#1E3A5F] font-bold shadow-lg relative" 
                  : "text-white/80 hover:bg-white/10 hover:text-white rounded-r-3xl mr-6 w-auto"
              }`}
            >
              <div className="flex items-center gap-3 relative z-10">
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full z-10 ${isActive ? "bg-[#1E3A5F] text-white" : "bg-white/20 text-white"}`}>
                  {item.badge}
                </span>
              )}
              {isActive && (
                 <>
                   {/* Top curve */}
                   <div className="absolute -top-6 right-0 w-6 h-6 bg-transparent rounded-br-3xl shadow-[0_12px_0_0_#f4f7fb]"></div>
                   {/* Bottom curve */}
                   <div className="absolute -bottom-6 right-0 w-6 h-6 bg-transparent rounded-tr-3xl shadow-[0_-12px_0_0_#f4f7fb]"></div>
                 </>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
