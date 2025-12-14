"use client";

import { useMemo, useState } from "react";
import { cn, formatDateShort } from "@/lib/utils";
import { useFilterContext } from "./article-wrapper";
import { AnimatePresence, motion } from "framer-motion";
import type { Article } from "@/lib/types";

import { Button } from "./ui/button";
import { TIcons } from "./icons";
import { Separator } from "./ui/separator";
import BlurFade from "./ui/blur-fade";
import { ANIMATION } from "@/lib/constants";

interface ArticleListProps {
  articles: Article[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { filterPublished, categoryFilter, setCategoryFilter } =
    useFilterContext();

  const categories: string[] = Array.from(
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

  const sortedAndFilteredArticles = useMemo(() => {
    return articles
      .filter(
        (article) =>
          (!filterPublished || article.metadata.published) &&
          (categoryFilter === "" ||
            article.metadata.tags.includes(categoryFilter))
      )
      .sort((a, b) => {
        // Sort by publishedAt date in descending order (newest first)
        return (
          new Date(b.metadata.publishedAt).getTime() -
          new Date(a.metadata.publishedAt).getTime()
        );
      });
  }, [articles, filterPublished, categoryFilter]);

  return (
    <div>
      <BlurFade delay={ANIMATION.BLUR_FADE_DELAY}>
        <div className="flex flex-row justify-end mb-4">
          <div className="flex flex-wrap gap-1">
            {categories.map((category) => {
              const IconComponent =
                TIcons[category.toLowerCase() as keyof typeof TIcons];
              return (
                <Button
                  key={category}
                  type="button"
                  variant={activeCategory === category ? "outline" : "ghost"}
                  size="icon"
                  className="rounded-full p-1 w-11 h-11"
                  onClick={() => handleCategoryClick(category)}
                >
                  {IconComponent ? (
                    <IconComponent className="" />
                  ) : (
                    <span className="text-xs">
                      {category.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                  <span className="sr-only">{category}</span>
                </Button>
              );
            })}
          </div>
        </div>
        <Separator orientation="horizontal" className="h-full" />
      </BlurFade>

      <BlurFade delay={ANIMATION.BLUR_FADE_DELAY + ANIMATION.STAGGER_DELAY}>
        <ul className="space-y-2">
          {sortedAndFilteredArticles.map((article, id) => (
            <div
              key={article.slug}
              className="relative"
              onMouseEnter={() => setHoveredIndex(id)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === id && (
                  <motion.span
                    className="absolute inset-0 h-full w-full bg-slate-100 dark:bg-slate-800/[0.8] block rounded-md"
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
                      "rounded-xl h-full w-full p-1 overflow-hidden bg-slate-10 border border-transparent group-hover:border-slate-150 relative z-10 flex flex-row items-start"
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
                          <h2 className="font-semibold leading-none">
                            {article.metadata.title}
                          </h2>

                          {article.metadata.subtitle && (
                            <span className="prose dark:prose-invert text-xs text-muted-foreground">
                              {article.metadata.subtitle}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </ul>
      </BlurFade>
    </div>
  );
}
