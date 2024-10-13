import { Metadata } from "next";
import { getBlogPosts } from "@/lib/blog";
import ArticleFilterWrapper from "@/components/article-wrapper";
import ArticleList from "@/components/article-list";

export const metadata: Metadata = {
  title: "Article List",
  description: "Browse all our articles",
};

interface Article {
  slug: string;
  metadata: {
    title: string;
    subtitle: string;
    publishedAt: Date;
    summary: string;
    image: string;
    tags: string[];
    published: boolean;
  };
}


export default async function ArticlesPage() {
  const articles: any[] = await getBlogPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Articles</h1>
      <ArticleFilterWrapper>
        <ArticleList articles={articles} />
      </ArticleFilterWrapper>
    </div>
  );
}
