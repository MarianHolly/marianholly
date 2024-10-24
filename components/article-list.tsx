"use client";

import { useState } from "react";
import { useFilterContext } from "./article-wrapper";
import { AnimatePresence, motion } from "framer-motion";
import { cn, formatDateShort } from "@/lib/utils";

import { Button } from "./ui/button";
import { TIcons } from "./icons";
import { Separator } from "./ui/separator";
import BlurFade from "./ui/blur-fade";

interface Article {
  slug: string;
  metadata: {
    title: string;
    subtitle: string;
    publishedAt: string;
    summary: string;
    image: string;
    tags: string[];
    published: boolean;
  };
}

interface ArticleListProps {
  articles: Article[];
}

const BLUR_FADE_DELAY = 0.04;

export default function ArticleList({ articles }: ArticleListProps) {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { filterPublished, categoryFilter, setCategoryFilter } = useFilterContext();

  const filteredArticles = articles.filter(
    (article) =>
      (!filterPublished || article.metadata.published) &&
      (categoryFilter === "" || article.metadata.tags.includes(categoryFilter))
  );

  const categories: any[] = Array.from(
    new Set(articles.flatMap((article) => article.metadata.tags))
  );

  const [activeCategory, setActiveCategory] = useState("");

  const handleCategoryClick = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory("");
      setCategoryFilter("");
    } else {
      setActiveCategory(category);
      setCategoryFilter(category);
    }
  };

  return (
    <div>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex flex-row justify-end mb-4">
          <div className="flex flex-wrap gap-1">
            {categories.map((category) => {
              const IconComponent = TIcons[category.toLowerCase() as keyof typeof TIcons];
              return (
                <Button
                  key={category}
                  variant={activeCategory === category ? "outline" : "ghost"}
                  size="icon"
                  className="rounded-full p-1 w-11 h-11"
                  onClick={() => handleCategoryClick(category)}
                >
                  {IconComponent ? (
                    <IconComponent className="" />
                  ) : (
                    <span className="text-xs">{category.slice(0, 2).toUpperCase()}</span>
                  )}
                  <span className="sr-only">{category}</span>
                </Button>
              );
            })}
          </div>
        </div>
        <Separator orientation="horizontal" className="h-full" />
      </BlurFade>

      <ul className="space-y-2">
        {filteredArticles.map((article, id) => (
          <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={article.slug}>
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
                <a
                  href={`/blog/${article.slug}`}
                  className={`w-full ${
                    article.metadata.published
                      ? "opacity-100"
                      : "opacity-50 disabled pointer-events-none"
                  }`}
                >
                  <div
                    className={cn(
                      "rounded-xl h-full w-full p-1 overflow-hidden bg-slate-10 border border-transparent dark:border-black group-hover:border-slate-150 relative z-10 flex flex-row items-start"
                    )}
                  >
                    <div className="relative z-50">
                      <div className="flex flex-row gap-4">
                        <div className="hidden min-w-32 sm:flex flex-row items-center justify-start pl-1">
                          <p className="text-sm font-light opacity-80">
                            {article.metadata.publishedAt && (
                              <time className="text-xs text-muted-foreground">
                                {formatDateShort(article.metadata.publishedAt)}
                              </time>
                            )}
                          </p>
                        </div>

                        <div className="flex flex-col gap-1">
                          <h2 className="font-semibold leading-none">{article.metadata.title}</h2>

                          {article.metadata.summary && (
                            <span className="prose dark:prose-invert text-xs text-muted-foreground">
                              {article.metadata.summary}
                            </span>
                          )}
                          {/*
                            <p className="text-xs pt-1 text-gray-700">
                              Category: <span className="font-semibold">{article.metadata.tags}</span>{" "}
                              | Status: {article.metadata.published ? "Published" : "Draft"}
                            </p>
                          */}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </BlurFade>
        ))}
      </ul>
    </div>
  );
}
