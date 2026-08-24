import { Article } from "@/types/types";
import NowReadingDesk from "./NowReadingDesk";
import TopNewsWidget from "./TopNewsWidget";
import UpcomingHighlightsWidget from "./UpcomingHighlightsWidget";
import TrendingNowWidget from "./TrendingNowWidget";
import MostDiscussedWidget from "./MostDiscussedWidget";
import NewsletterWidget from "./NewsletterWidget";
import ExploreIGEWidget from "./ExploreIGEWidget";

interface RightSidebarProps {
  spotlightArticle: Article;
  topNewsArticles: Article[];
  highlightArticles: Article[];
  trendingArticles: Article[];
  mostDiscussedArticles: Article[];
}

export default function RightSidebar({
  spotlightArticle,
  topNewsArticles,
  highlightArticles,
  trendingArticles,
  mostDiscussedArticles,
}: RightSidebarProps) {
  return (
    <aside className="hidden xl:block w-full space-y-4">
      {/* 9a. NOW READING / Desk */}
      <NowReadingDesk article={spotlightArticle} />

      {/* 9b. Top News with badges */}
      <TopNewsWidget articles={topNewsArticles} />

      {/* 9c. Upcoming Highlights with country ad */}
      <UpcomingHighlightsWidget articles={highlightArticles} />

      {/* 9d. Trending Now with CEO ad */}
      <TrendingNowWidget articles={trendingArticles} />

      {/* 9e. Most Discussed with company ad */}
      <MostDiscussedWidget articles={mostDiscussedArticles} />

      {/* 9f. Newsletter */}
      <NewsletterWidget />

      {/* 9g. About IGE and redirect */}
      <ExploreIGEWidget />
    </aside>
  );
}
