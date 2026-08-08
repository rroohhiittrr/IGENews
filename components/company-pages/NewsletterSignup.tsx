'use client';

import { useState } from 'react';
import { Mail, Sparkles, CheckCircle } from 'lucide-react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
      <div className="bg-white dark:bg-[#122238] border border-gray-100 dark:border-white/5 rounded-[32px] p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4A024]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-3 max-w-xl text-center lg:text-left relative z-10">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#F4A024] flex items-center justify-center lg:justify-start gap-1">
            <Sparkles className="w-3.5 h-3.5 fill-[#F4A024] stroke-none animate-pulse" />
            Stay Ahead
          </span>
          <h3 className="text-2xl font-black text-[#1E3A5F] dark:text-white" style={{ fontFamily: 'var(--font-display)' }}>
            Subscribe to IGN Company updates
          </h3>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-semibold leading-relaxed">
            Get weekly alerts covering newly verified exporters, key policy announcements, and strategic B2B market indicators.
          </p>
        </div>

        <div className="w-full max-w-md shrink-0 relative z-10">
          {submitted ? (
            <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <div className="text-xs font-bold">
                Subscription successful! You will receive our newsletter this Friday.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex items-center w-full">
                <Mail className="w-4 h-4 absolute left-4 text-gray-400 shrink-0" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter company email address..."
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 pl-11 pr-4 py-3 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#F4A024] focus:bg-white"
                />
              </div>
              <button
                type="submit"
                className="bg-[#1E3A5F] hover:bg-[#2F6FA3] text-white px-6 py-3 rounded-2xl font-bold text-xs shrink-0 cursor-pointer shadow-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
