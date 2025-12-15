"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { DATA } from "@/lib/resume";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { CodeSandboxLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

import Image from "next/image";
import BlurFade from "./ui/blur-fade";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export default function GitHubRepositories() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="space-y-12 w-full py-12">
      <BlurFade delay={BLUR_FADE_DELAY * 7.5}>
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
              GitHub Projects
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Always coding something new
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore my coding journey through a diverse collection of projects, from
              small experiments to full-featured applications built with various
              technologies including React, Next.js, TypeScript, Astro, Sanity,
              Contentful, Python, Django, Flask, and Pygame.
            </p>
          </div>
        </div>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 8}>
        <ul className="flex flex-col gap-2">
          {DATA.repositories.map((repo, id) => (
            <div key={repo.title + repo.dates}>
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

                <div className="w-full flex flex-row relative justify-start gap-4 md:p-2 rounded-md">
                  <Card isHovered={hoveredIndex === id}>
                    <div className="w-24 md:w-32 flex items-center justify-center pl-3 flex-row gap-3">
                      <Link href={repo.githubHref} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full"
                        >
                          <GitHubLogoIcon />
                        </Button>
                      </Link>

                      {repo.websiteHref && (
                        <Link href={repo.websiteHref} target="_blank" rel="noopener noreferrer">
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full"
                          >
                            <CodeSandboxLogoIcon />
                          </Button>
                        </Link>
                      )}
                    </div>

                    <div className="flex flex-col gap-1 cursor-pointer">
                      <h2 className="font-semibold leading-none">
                        {repo.title}
                      </h2>
                      <p className="text-sm font-light opacity-75">
                        {repo.dates && (
                          <time className="text-xs text-muted-foreground">
                            {repo.dates}
                          </time>
                        )}
                      </p>
                      {repo.description && (
                        <span className="prose dark:prose-invert text-xs text-muted-foreground">
                          {repo.description.split(" ").slice(0, 25).join(" ")}
                        </span>
                      )}
                    </div>

                    <AnimatePresence>
                      {hoveredIndex === id && (
                        <motion.div
                          className="absolute right-0 top-0 -mt-24 -mr-4"
                          initial={{ height: 0, opacity: 0, scale: 0.3 }}
                          animate={{ height: "auto", opacity: 1, scale: 1 }}
                          exit={{ height: 0, opacity: 0, scale: 0.3 }}
                          transition={{
                            type: "spring",
                            duration: 0.3,
                            bounce: 0.1,
                          }}
                        >
                          <Image
                            src={repo.image}
                            width={300}
                            height={200}
                            quality={100}
                            alt="repo image"
                            className="rounded-lg shadow-lg"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </BlurFade>
    </div>
  );
}

const Card = ({
  className,
  children,
  isHovered,
}: {
  className?: string;
  children: React.ReactNode;
  isHovered: boolean;
}) => {
  return (
    <div
      className={cn(
        "rounded-xl h-full w-full p-2 overflow-visible bg-slate-10 border border-transparent group-hover:border-slate-150 relative",
        isHovered ? "z-10" : "z-0",
        className
      )}
    >
      <div className="relative">
        <div className="flex flex-row gap-4 p-1">{children}</div>
      </div>
    </div>
  );
};
