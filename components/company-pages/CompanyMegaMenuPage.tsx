'use client';

import { Suspense } from 'react';
import { CompanyHeroBanner } from './CompanyHeroBanner';
import { FeaturedCompanies } from './FeaturedCompanies';
import { LatestCompanyNews } from './LatestCompanyNews';
import { TrendingCompanyNews } from './TrendingCompanyNews';
import { CompanyDirectory } from './CompanyDirectory';
import { BrowseByIndustry } from './BrowseByIndustry';
import { TrendingCompanies } from './TrendingCompanies';
import { CompanySpotlight } from './CompanySpotlight';
import { UpgradeBanner } from './UpgradeBanner';
import { NewsletterSignup } from './NewsletterSignup';
import { CompanySkeleton } from './skeletons';

export function CompanyMegaMenuPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#070b12] pb-12">
      {/* Search Header Banner */}
      <CompanyHeroBanner />
      
      {/* 2. Featured premium listings */}
      <Suspense fallback={<CompanySkeleton variant="featured" />}>
        <FeaturedCompanies />
      </Suspense>
      
      {/* 3. Press releases news updates */}
      <Suspense fallback={<CompanySkeleton variant="news" />}>
        <LatestCompanyNews />
      </Suspense>
      
      {/* 4. Trending highlights slider */}
      <Suspense fallback={<CompanySkeleton variant="trending" />}>
        <TrendingCompanyNews />
      </Suspense>
      
      {/* 5. Directory Search & Facet Panel */}
      <Suspense fallback={<CompanySkeleton variant="directory" />}>
        <CompanyDirectory />
      </Suspense>
      
      {/* 6. Sector Directory Deck */}
      <Suspense fallback={<CompanySkeleton variant="industry" />}>
        <BrowseByIndustry />
      </Suspense>
      
      {/* 7. Enterprise Sponsor Spotlight */}
      <Suspense fallback={<CompanySkeleton variant="spotlight" />}>
        <CompanySpotlight />
      </Suspense>
      
      {/* Upselling & Subscriptions */}
      <UpgradeBanner />
      <NewsletterSignup />
    </div>
  );
}
