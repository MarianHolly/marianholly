import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/blog";
import type { Article } from "@/lib/types";

import ArticleList from "@/components/article-list";
import ArticleFilterWrapper from "@/components/article-wrapper";

export const metadata: Metadata = {
  title: "Posts",
  description: "Browse all my posts",
};

export default async function ArticlesPage() {
  const articles: Article[] = await getBlogPosts();

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <ArticleFilterWrapper>
        <ArticleList articles={articles} />
      </ArticleFilterWrapper>
    </div>
  );
}
