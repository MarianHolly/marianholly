import { Metadata } from "next";
import { cn } from "@/lib/utils";
import { DATA } from "@/lib/resume";
import { getBlogPosts } from "@/lib/blog";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

import Link from "next/link";
import BlurFade from "@/components/ui/blur-fade";
import BlogCard from "@/components/card-blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "My thoughts on web development, programming, and life.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const item = DATA.navbar[1];

  console.log(posts);

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <Link
          href={item.href}
          className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-12 m-2")}
        >
          <item.icon className="size-44" />
        </Link>
      </BlurFade>

      {posts
        .sort((a, b) => {
          if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
            return -1;
          }
          return 1;
        })
        .map((post, id) => (
          <BlogCard post={post} id={id} />
        ))}
    </section>
  );
}
