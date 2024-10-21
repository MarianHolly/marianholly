"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import BlurFade from "./ui/blur-fade";
import { DATA } from "@/lib/resume";
import { Button } from "./ui/button";
import { LinkPreview } from "./ui/link-preview";
import { CodeSandboxLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

const BLUR_FADE_DELAY = 0.04;

export default function GitHubRepoList() {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="space-y-12 w-full py-12">
      <BlurFade delay={BLUR_FADE_DELAY * 8}>
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
              GitHub repozitáre
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              neustále niečo kódujem
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Preskúmaj moju cestu kódenia cez rôznorodú zbierku projektov, od malých experimentov
              až po plnohodnotné aplikácie postavené rôznymi technologiami React, Next.js,
              Typescript, Astro, Sanity, Contentful, Python, Django, Flask, Pygame.
            </p>
          </div>
        </div>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 14}>
        <ul className="flex flex-col gap-6">
          {DATA.repositories.map((repo, id) => (
            <BlurFade key={repo.title + repo.dates} delay={BLUR_FADE_DELAY * 15 + id * 0.05}>
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

                <div className="w-full flex flex-row relative justify-start gap-4 p-2 rounded-md">
                  <Card>
                    <div className="w-18 flex items-center justify-center pl-3 flex-row gap-3">
                      <Button variant="outline" size="icon" className="rounded-full">
                        <CodeSandboxLogoIcon />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <GitHubLogoIcon />
                      </Button>
                    </div>

                    <LinkPreview url={repo.image}>
                      <div className="flex flex-col gap-1">
                        <h2 className="font-semibold leading-none">{repo.title}</h2>
                        <p className="text-sm font-light opacity-75">
                          {repo.dates && (
                            <time className="text-xs text-muted-foreground">{repo.dates}</time>
                          )}
                        </p>
                        {repo.description && (
                          <span className="prose dark:prose-invert text-xs text-muted-foreground">
                            {repo.description.split(" ").slice(0, 10).join(" ")}
                          </span>
                        )}
                      </div>
                    </LinkPreview>
                  </Card>
                </div>
              </div>
            </BlurFade>
          ))}
        </ul>
      </BlurFade>
    </div>
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
