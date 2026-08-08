'use client';

export function SkeletonPulse({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-slate-700 rounded ${className}`} />
  );
}

export function CompanyCardSkeleton() {
  return (
    <div className="border border-gray-100 dark:border-white/5 rounded-3xl p-5 bg-white dark:bg-[#122238] space-y-4">
      <div className="flex gap-4 items-center">
        <SkeletonPulse className="w-14 h-14 rounded-2xl shrink-0" />
        <div className="space-y-2 w-full">
          <SkeletonPulse className="h-4 w-1/3" />
          <SkeletonPulse className="h-5 w-3/4" />
        </div>
      </div>
      <SkeletonPulse className="h-4 w-full" />
      <SkeletonPulse className="h-4 w-5/6" />
      <div className="pt-2 flex justify-between">
        <SkeletonPulse className="h-3 w-1/4" />
        <SkeletonPulse className="h-3 w-1/4" />
      </div>
    </div>
  );
}

export function NewsCardSkeleton() {
  return (
    <div className="border border-gray-100 dark:border-white/5 rounded-3xl p-4 bg-white dark:bg-[#122238] space-y-3">
      <SkeletonPulse className="w-full aspect-[1.6] rounded-2xl" />
      <div className="flex items-center gap-2">
        <SkeletonPulse className="w-5 h-5 rounded-full" />
        <SkeletonPulse className="h-3 w-1/4" />
      </div>
      <SkeletonPulse className="h-5 w-full" />
      <SkeletonPulse className="h-4 w-5/6" />
      <div className="flex justify-between items-center pt-2">
        <SkeletonPulse className="h-3 w-1/5" />
        <SkeletonPulse className="h-5 w-1/4 rounded-full" />
      </div>
    </div>
  );
}

export function IndustryCardSkeleton() {
  return (
    <div className="border border-gray-100 dark:border-white/5 rounded-2xl p-4 bg-white dark:bg-[#122238] flex gap-3 items-center">
      <SkeletonPulse className="w-10 h-10 rounded-xl shrink-0" />
      <div className="space-y-2 w-full">
        <SkeletonPulse className="h-4 w-2/3" />
        <SkeletonPulse className="h-3 w-1/3" />
      </div>
    </div>
  );
}

export function CompanySkeleton({ variant = 'directory' }: { variant?: 'featured' | 'news' | 'trending' | 'directory' | 'industry' | 'trending-companies' | 'spotlight' }) {
  if (variant === 'featured') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 lg:px-6 py-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <CompanyCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (variant === 'news' || variant === 'trending') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 lg:px-6 py-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <NewsCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (variant === 'industry') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-7xl mx-auto px-4 lg:px-6 py-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <IndustryCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (variant === 'spotlight') {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        <div className="bg-white dark:bg-[#122238] border border-gray-100 dark:border-white/5 rounded-[32px] p-6 md:p-8 space-y-6">
          <SkeletonPulse className="h-6 w-1/6" />
          <div className="flex flex-col md:flex-row gap-6 md:items-center">
            <SkeletonPulse className="w-24 h-24 rounded-3xl shrink-0" />
            <div className="space-y-3 w-full">
              <SkeletonPulse className="h-7 w-1/3" />
              <SkeletonPulse className="h-5 w-2/3" />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonPulse key={i} className="h-16 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default / Directory
  return (
    <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto px-4 lg:px-6 py-6">
      <div className="col-span-12 lg:col-span-3 hidden lg:block space-y-4">
        <SkeletonPulse className="h-[400px] w-full rounded-3xl" />
      </div>
      <div className="col-span-12 lg:col-span-9 space-y-6">
        <div className="flex justify-between items-center">
          <SkeletonPulse className="h-6 w-1/4" />
          <SkeletonPulse className="h-8 w-1/5" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <CompanyCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
