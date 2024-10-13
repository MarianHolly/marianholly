"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import BlurFade from "./ui/blur-fade";
import { Button } from "./ui/button";
import { cn, formatDate, formatDateShort } from "@/lib/utils";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export default function BlogCard({ post, id }: { post: any; id: number }) {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
      <div
        className="relative"
        onMouseEnter={() => setHoveredIndex(id)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <AnimatePresence>
          {hoveredIndex === id && (
            <motion.span
              className="absolute inset-0 h-full w-full bg-slate-100 dark:bg-slate-800/[0.8] block rounded-xl"
              layoutId="hoverBackground"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.15 },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.15, delay: 0.2 },
              }}
            />
          )}
        </AnimatePresence>
        <div className="w-full flex flex-row relative justify-start gap-4 p-1 rounded-sm">
          <Link className="w-full" href={`/blog/${post.slug}`}>
          <Card className="flex flex-row items-start">
              <div className="hidden min-w-32 sm:flex flex-row items-center justify-start pl-1">
                <p className="text-sm font-light opacity-80">
                  {post.metadata.publishedAt && (
                    <time className="text-xs text-muted-foreground">
                      {formatDateShort(post.metadata.publishedAt)}
                    </time>
                  )}
                </p>
              </div> 

              <div className="flex flex-col gap-1">
                <h2 className="font-semibold leading-none">{post.metadata.title}</h2>

                {post.metadata.summary && (
                  <span className="prose dark:prose-invert text-xs text-muted-foreground">
                    {post.metadata.summary}
                  </span>
                )}
              </div>
                </Card>
          </Link>
        </div>
      </div>
    </BlurFade>
  );
}

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-xl h-full w-full p-2 overflow-hidden bg-slate-10 border border-transparent dark:border-black group-hover:border-slate-150 relative z-10",
        className
      )}
    >
      <div className="relative z-50">
        <div className="flex flex-row gap-4 p-1">{children}</div>
      </div>
    </div>
  );
};
