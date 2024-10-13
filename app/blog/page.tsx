import { Metadata } from "next";
import { cn } from "@/lib/utils";
import { DATA } from "@/lib/resume";
import { getBlogPosts } from "@/lib/blog";
import { Button, buttonVariants } from "@/components/ui/button";

import Link from "next/link";
import BlurFade from "@/components/ui/blur-fade";
import BlogCard from "@/components/blog-card";

export const metadata: Metadata = {
  title: "Blog",
  description: "My thoughts on web development, programming, and life.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  const filteredPosts = posts.filter((post) => post.metadata.published === true);
  const item = DATA.navbar[1];

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="w-full flex flex-row justify-between items-end mb-4">
          <Link
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "size-20 p-4 rounded-full"
            )}
          >
            <item.icon className="size-44" />
          </Link>
          <Button variant="ghost" size="icon" className="w-fit px-6">
            <h2 className="font-light italic opacity-85 text-md">look into future</h2>
          </Button>
        </div>
      </BlurFade>

      {filteredPosts
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
