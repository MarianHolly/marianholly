import { Metadata } from "next";
import { getBlogPosts } from "@/lib/blog";
import BlogWrapper from "@/components/blog/blog-wrapper";
import BlogList from "@/components/blog/blog-list";

export const metadata: Metadata = {
  title: "Article List",
  description: "Browse all our articles",
};

export default async function ProjectsPage() {
  const posts: any[] = await getBlogPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <BlogWrapper>
        <BlogList posts={posts} />
      </BlogWrapper>
    </div>
  );
}
