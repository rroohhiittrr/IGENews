'use client';

import { useState, useEffect } from 'react';
import { NewsCard as NewsCardType } from '@/types/company';
import { companyApi } from '@/lib/api/company';
import { SkeletonPulse } from '@/components/company-pages/skeletons';
import { ArrowLeft, Clock, Calendar, Share2, Bookmark, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function CompanyNewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const locale = (params?.locale as string) || 'en';

  const [news, setNews] = useState<NewsCardType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    async function load() {
      if (!id) return;
      setLoading(true);
      setError(false);
      try {
        // Query the deterministic news lists to match by ID
        const allNews = await companyApi.latestNews(50);
        const match = allNews.find(n => n.id === id);
        
        if (match) {
          setNews(match);
          setIsBookmarked(match.isBookmarked);
        } else {
          setError(true);
        }
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
        <SkeletonPulse className="h-6 w-24" />
        <SkeletonPulse className="h-10 w-3/4" />
        <SkeletonPulse className="h-6 w-1/3" />
        <SkeletonPulse className="h-[250px] w-full rounded-3xl" />
        <SkeletonPulse className="h-[200px] w-full rounded-2xl" />
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center space-y-4">
        <p className="text-sm font-bold text-red-500">Failed to load press release.</p>
        <button onClick={() => router.back()} className="text-xs font-bold text-[#1E3A5F] dark:text-white underline">
          Go Back
        </button>
      </div>
    );
  }

  const formattedDate = new Date(news.publishedAt).toLocaleDateString(locale === 'en' ? 'en-US' : 'en-IN', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#070b12] pb-16">
      {/* Header toolbar */}
      <div className="max-w-3xl mx-auto px-4 pt-6 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-xl bg-white dark:bg-[#122238] border border-gray-100 dark:border-white/5 transition-colors cursor-pointer ${
              isBookmarked ? 'text-[#F4A024]' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
          <button className="p-2 rounded-xl bg-white dark:bg-[#122238] border border-gray-100 dark:border-white/5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main article body */}
      <article className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="bg-[#1E3A5F]/10 dark:bg-white/5 text-[#1E3A5F] dark:text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md">
              {news.category}
            </span>
            {news.isSponsored && (
              <span className="bg-[#F4A024] text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-md">
                Sponsored PR
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-[#1E3A5F] dark:text-white leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            {news.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {news.readingTimeMinutes} min read
            </span>
          </div>
        </div>

        {/* Thumbnail Hero */}
        <div className="relative aspect-[1.8] w-full rounded-3xl overflow-hidden bg-gray-100 dark:bg-white/5 shadow-inner">
          {news.thumbnailUrl ? (
            <img src={news.thumbnailUrl} alt={news.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1E3A5F] to-[#2F6FA3] text-white/10">
              <Sparkles className="w-16 h-16" />
            </div>
          )}
        </div>

        {/* Company card linking info */}
        <div className="flex items-center justify-between p-4 bg-white dark:bg-[#122238] border border-gray-100 dark:border-white/5 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E3A5F] to-[#2F6FA3] flex items-center justify-center text-white font-bold text-xs shrink-0">
              {news.company.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">Published By</span>
              <h4 className="text-xs font-bold text-[#1E3A5F] dark:text-white">{news.company.name}</h4>
            </div>
          </div>
          <Link
            href={`/${locale}/company-news/${news.company.tier}/pages/${news.company.id}`}
            className="px-4 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 text-[#1E3A5F] dark:text-white rounded-xl text-xs font-bold transition-all"
          >
            Visit Profile
          </Link>
        </div>

        {/* Mock body paragraphs */}
        <div className="space-y-4 text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed font-semibold">
          <p>
            {news.summary}
          </p>
          <p>
            This strategic announcement highlights a critical milestone in our ongoing expansion plans across bilateral trade corridors. 
            By strengthening resource allocation and enhancing operational efficiency, the project aims to deliver robust value-added chains 
            to global supply partners. 
          </p>
          <p>
            Our core focus remains on delivering sustainable products with top-tier verification compliance. The board of directors expressed 
            deep optimism regarding subsequent growth indicators throughout this fiscal quarter.
          </p>
        </div>
      </article>
    </div>
  );
}
