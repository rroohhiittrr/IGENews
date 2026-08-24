import { Article } from "@/types/types";
import TrendingNowWidget from "@/components/feed/TrendingNowWidget";
import MostDiscussedWidget from "@/components/feed/MostDiscussedWidget";
import NewsletterWidget from "@/components/feed/NewsletterWidget";
import ExploreIGEWidget from "@/components/feed/ExploreIGEWidget";

interface RightSidebarProps {
  trendingArticles: Article[];
  mostDiscussedArticles: Article[];
}

export default function RightSidebar({ trendingArticles, mostDiscussedArticles }: RightSidebarProps) {
  return (
    <aside className="hidden xl:block w-full space-y-4">
      <TrendingNowWidget articles={trendingArticles} />
      <MostDiscussedWidget articles={mostDiscussedArticles} />
      <NewsletterWidget />
      <ExploreIGEWidget />
    </aside>
  );
}
