"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Users, ChevronRight, Globe } from "lucide-react";

const EVENTS = [
  { id: 1, title: "India–UAE Trade Summit 2026", date: "Jun 15, 2026", time: "10:00 AM IST", location: "Mumbai, India", type: "Conference", attendees: 1200, isVirtual: false, isRegistered: true },
  { id: 2, title: "Global Export Leaders Webinar", date: "Jun 22, 2026", time: "3:00 PM IST", location: "Online", type: "Webinar", attendees: 450, isVirtual: true, isRegistered: false },
  { id: 3, title: "SME Connect — Manufacturing Sector", date: "Jul 4, 2026", time: "11:00 AM IST", location: "Pune, India", type: "Networking", attendees: 300, isVirtual: false, isRegistered: false },
  { id: 4, title: "IGENews Industry Roundtable", date: "Jul 18, 2026", time: "4:00 PM IST", location: "Online", type: "Roundtable", attendees: 80, isVirtual: true, isRegistered: true },
];

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  Conference: { bg: "bg-blue-50",    text: "text-blue-700" },
  Webinar:    { bg: "bg-purple-50",  text: "text-purple-700" },
  Networking: { bg: "bg-amber-50",   text: "text-amber-700" },
  Roundtable: { bg: "bg-emerald-50", text: "text-emerald-700" },
};

export default function EventsPage() {
  const upcoming = EVENTS.filter(e => e.isRegistered);
  const discover = EVENTS.filter(e => !e.isRegistered);

  return (
    <div className="p-5 md:p-8 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1E3A5F]" style={{ fontFamily: "var(--font-display)" }}>Events</h1>
        <p className="text-sm text-gray-500 mt-1">Trade summits, webinars, and industry networking events</p>
      </div>

      {/* My Registered Events */}
      <section className="mb-10">
        <h2 className="text-base font-bold text-[#1E3A5F] mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#F4A024]" /> My Registered Events
          <span className="ml-auto text-xs font-bold px-3 py-1 bg-[#F4A024] text-white rounded-full">{upcoming.length}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {upcoming.map((event, i) => {
            const tc = TYPE_COLORS[event.type] ?? { bg: "bg-gray-50", text: "text-gray-600" };
            return (
              <motion.div key={event.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h3 className="font-bold text-[#1E3A5F] text-base leading-snug">{event.title}</h3>
                  <span className={`text-[10px] font-black px-3 py-1 rounded-lg shrink-0 ${tc.bg} ${tc.text}`}>{event.type}</span>
                </div>
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#F4A024] shrink-0" />{event.date}</div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#F4A024] shrink-0" />{event.time}</div>
                  <div className="flex items-center gap-2">{event.isVirtual ? <Globe className="w-4 h-4 text-[#F4A024] shrink-0" /> : <MapPin className="w-4 h-4 text-[#F4A024] shrink-0" />}{event.location}</div>
                  <div className="flex items-center gap-2"><Users className="w-4 h-4 text-[#F4A024] shrink-0" />{event.attendees.toLocaleString()} attendees</div>
                </div>
                <div className="mt-5 flex gap-3">
                  <button className="flex-1 py-2.5 bg-[#1E3A5F] text-white text-sm font-bold rounded-xl hover:bg-[#F4A024] transition-colors">
                    Join Event
                  </button>
                  <button className="px-4 py-2.5 bg-[#f4f7fb] text-[#1E3A5F] text-sm font-bold rounded-xl hover:bg-gray-200 transition-colors">
                    Details
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Discover Events */}
      <section>
        <h2 className="text-base font-bold text-[#1E3A5F] mb-4 flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#1E3A5F]" /> Discover Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {discover.map((event, i) => {
            const tc = TYPE_COLORS[event.type] ?? { bg: "bg-gray-50", text: "text-gray-600" };
            return (
              <motion.div key={event.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
                className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h3 className="font-bold text-[#1E3A5F] text-base leading-snug">{event.title}</h3>
                  <span className={`text-[10px] font-black px-3 py-1 rounded-lg shrink-0 ${tc.bg} ${tc.text}`}>{event.type}</span>
                </div>
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4 shrink-0" />{event.date}</div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4 shrink-0" />{event.time}</div>
                  <div className="flex items-center gap-2">{event.isVirtual ? <Globe className="w-4 h-4 shrink-0" /> : <MapPin className="w-4 h-4 shrink-0" />}{event.location}</div>
                </div>
                <button className="mt-5 w-full py-2.5 border-2 border-[#1E3A5F] text-[#1E3A5F] text-sm font-bold rounded-xl hover:bg-[#1E3A5F] hover:text-white transition-all flex items-center justify-center gap-2">
                  Register <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
