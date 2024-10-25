import { Metadata } from "next";
import { getBlogPosts } from "@/lib/blog";

import ArticleList from "@/components/article-list";
import ArticleFilterWrapper from "@/components/article-wrapper";

export const metadata: Metadata = {
  title: "Posts",
  description: "Browse all my posts",
};

export default async function ArticlesPage() {
  const articles: any[] = await getBlogPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <ArticleFilterWrapper>
        <ArticleList articles={articles} />
      </ArticleFilterWrapper>
    </div>
  );
}
