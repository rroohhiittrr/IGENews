import { mockArticles } from "@/lib/mockData";
import { notFound } from "next/navigation";
import ArticlePage from "@/components/article/ArticlePage";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePageRoute({ params }: Props) {
  const { slug } = await params;
  const article = mockArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = mockArticles
    .filter(
      (a) =>
        a.slug !== slug &&
        (a.sector?.id === article.sector?.id ||
          a.country?.id === article.country?.id)
    )
    .slice(0, 4);

  // Fallback: if no related by sector/country, take latest articles
  const fallbackRelated =
    relatedArticles.length > 0
      ? relatedArticles
      : mockArticles.filter((a) => a.slug !== slug).slice(0, 4);

  return <ArticlePage article={article} relatedArticles={fallbackRelated} />;
}
