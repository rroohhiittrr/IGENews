"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Search, MoreVertical, ArrowLeft, Circle } from "lucide-react";

interface Message { id: number; text: string; time: string; fromMe: boolean; }
interface Thread { id: number; name: string; role: string; lastMsg: string; time: string; unread: number; messages: Message[]; }

const THREADS: Thread[] = [
  {
    id: 1, name: "IGENews Team", role: "Platform", lastMsg: "Welcome to IGENews! Your profile is ready.", time: "10:32 AM", unread: 1,
    messages: [
      { id: 1, text: "Welcome to IGENews! Your profile has been set up successfully.", time: "10:30 AM", fromMe: false },
      { id: 2, text: "Explore your sectors, countries, and start reading industry intelligence.", time: "10:32 AM", fromMe: false },
    ]
  },
  {
    id: 2, name: "Rajesh Gupta", role: "SME — Manufacturing", lastMsg: "Would love to connect on the EV report.", time: "Yesterday", unread: 0,
    messages: [
      { id: 1, text: "Hi, I read your comment on the EV sector article.", time: "Yesterday 2:10 PM", fromMe: false },
      { id: 2, text: "Sure, let's connect!", time: "Yesterday 2:45 PM", fromMe: true },
      { id: 3, text: "Would love to connect on the EV report.", time: "Yesterday 3:00 PM", fromMe: false },
    ]
  },
  {
    id: 3, name: "Priya Sharma", role: "Leader — Technology", lastMsg: "See you at the Trade Summit!", time: "Mon", unread: 0,
    messages: [
      { id: 1, text: "Are you attending the India–UAE Trade Summit?", time: "Mon 9:00 AM", fromMe: false },
      { id: 2, text: "Yes, I'm registered!", time: "Mon 9:15 AM", fromMe: true },
      { id: 3, text: "See you at the Trade Summit!", time: "Mon 9:20 AM", fromMe: false },
    ]
  },
];

export default function MessagesPage() {
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");

  const filtered = THREADS.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.lastMsg.toLowerCase().includes(search.toLowerCase())
  );

  const totalUnread = THREADS.reduce((s, t) => s + t.unread, 0);

  return (
    <div className="p-5 md:p-8 lg:p-10 h-screen flex flex-col">
      <div className="mb-6 flex items-center gap-4">
        {selectedThread && (
          <button onClick={() => setSelectedThread(null)} className="md:hidden w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#1E3A5F]">
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <div>
          <h1 className="text-3xl font-bold text-[#1E3A5F]" style={{ fontFamily: "var(--font-display)" }}>Messages</h1>
          <p className="text-sm text-gray-500 mt-0.5">{totalUnread > 0 ? `${totalUnread} unread message${totalUnread > 1 ? "s" : ""}` : "All caught up!"}</p>
        </div>
      </div>

      <div className="flex gap-5 flex-1 min-h-0">
        {/* Thread List */}
        <div className={`w-full md:w-80 shrink-0 flex flex-col gap-3 ${selectedThread ? "hidden md:flex" : "flex"}`}>
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search messages..."
              className="pl-11 pr-4 py-3 rounded-2xl bg-white w-full text-sm border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F4A024]" />
          </div>

          {/* Threads */}
          <div className="flex-1 overflow-y-auto space-y-2 hide-scrollbar">
            {filtered.map(thread => (
              <button key={thread.id} onClick={() => setSelectedThread(thread)}
                className={`w-full flex items-start gap-4 p-4 rounded-[20px] text-left transition-all hover:shadow-md ${selectedThread?.id === thread.id ? "bg-[#1E3A5F] text-white shadow-lg" : "bg-white shadow-sm"}`}>
                {/* Avatar */}
                <div className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center font-black text-sm ${selectedThread?.id === thread.id ? "bg-white/20 text-white" : "bg-[#f4f7fb] text-[#1E3A5F]"}`}>
                  {thread.name.split(" ").map(n => n[0]).join("").slice(0,2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`font-bold text-sm truncate ${selectedThread?.id === thread.id ? "text-white" : "text-[#1E3A5F]"}`}>{thread.name}</span>
                    <span className={`text-[10px] shrink-0 ml-2 ${selectedThread?.id === thread.id ? "text-white/60" : "text-gray-400"}`}>{thread.time}</span>
                  </div>
                  <p className={`text-[10px] mb-1 ${selectedThread?.id === thread.id ? "text-white/70" : "text-[#F4A024] font-semibold"}`}>{thread.role}</p>
                  <p className={`text-xs truncate ${selectedThread?.id === thread.id ? "text-white/70" : "text-gray-500"}`}>{thread.lastMsg}</p>
                </div>
                {thread.unread > 0 && (
                  <span className={`shrink-0 w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center mt-1 ${selectedThread?.id === thread.id ? "bg-[#F4A024] text-white" : "bg-[#1E3A5F] text-white"}`}>
                    {thread.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Message Panel */}
        <div className={`flex-1 flex flex-col min-h-0 ${selectedThread ? "flex" : "hidden md:flex"}`}>
          {selectedThread ? (
            <div className="flex flex-col h-full bg-white rounded-[28px] shadow-sm border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#f4f7fb] flex items-center justify-center font-black text-sm text-[#1E3A5F]">
                  {selectedThread.name.split(" ").map(n => n[0]).join("").slice(0,2)}
                </div>
                <div>
                  <h3 className="font-bold text-[#1E3A5F] text-sm">{selectedThread.name}</h3>
                  <p className="text-xs text-[#F4A024] font-semibold">{selectedThread.role}</p>
                </div>
                <button className="ml-auto text-gray-400 hover:text-[#1E3A5F]"><MoreVertical className="w-5 h-5" /></button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 hide-scrollbar">
                {selectedThread.messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-[18px] text-sm leading-relaxed ${msg.fromMe ? "bg-[#1E3A5F] text-white rounded-br-md" : "bg-[#f4f7fb] text-[#1E3A5F] rounded-bl-md"}`}>
                      <p>{msg.text}</p>
                      <p className={`text-[10px] mt-1 text-right ${msg.fromMe ? "text-white/50" : "text-gray-400"}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-3 bg-[#f4f7fb] rounded-2xl px-4 py-2">
                  <input value={draft} onChange={e => setDraft(e.target.value)}
                    placeholder="Type a message..."
                    onKeyDown={e => { if (e.key === "Enter" && draft.trim()) setDraft(""); }}
                    className="flex-1 bg-transparent text-sm text-[#1E3A5F] border-none focus:outline-none py-2" />
                  <button onClick={() => setDraft("")}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${draft.trim() ? "bg-[#F4A024] text-white shadow" : "bg-gray-200 text-gray-400"}`}>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 bg-white rounded-[28px] shadow-sm border border-gray-100 flex items-center justify-center flex-col gap-4">
              <div className="w-16 h-16 rounded-full bg-[#f4f7fb] flex items-center justify-center">
                <Circle className="w-8 h-8 text-[#1E3A5F]/20" />
              </div>
              <p className="text-gray-400 text-sm font-medium">Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
