"use client";

import { cn } from "@/lib/utils";
import { DATA } from "@/lib/resume";

import Link from "next/link";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import BlurFade from "@/components/ui/blur-fade";
const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto px-8">
      {DATA.repositories.map((repo) => (
        <div key={repo.title}>{repo.title}</div>
      ))}
      <HoverEffect items={projects} />
    </div>
  );
}

const projects = [
  {
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },
  {
    title: "Netflix",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
  },
  {
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },
  {
    title: "Meta",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "https://meta.com",
  },
  {
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "https://amazon.com",
  },
  {
    title: "Microsoft",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://microsoft.com",
  },
];

const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <BlurFade delay={BLUR_FADE_DELAY + 0.05}>
      <div className={cn("grid grid-cols-1 md:grid-cols-2 py-10", className)}>
        {items.map((item, idx) => (
          <div key={item?.link}>
            <Link
              href={item?.link}
              key={item?.link}
              className="relative group block p-2 h-full w-full"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.span
                    className="absolute inset-0 h-full w-full bg-slate-200 dark:bg-slate-800/[0.8] block rounded-md"
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

              <div className="w-full h-full flex flex-row relative justify-center gap-4 p-1 rounded-md">
                <div 
                  className={cn(`rounded-md h-full w-full p-1 overflow-hidden relative z-10 flex flex-row items-start
                     bg-slate-50 border border-transparent group-hover:border-slate-100`)}
                >
                  {/* ----------- bg-slate-100 border border-transparent group-hover:border-slate-100 ----------- */}
                  <div className="relative z-50 h-full">
                    <div className="flex flex-row gap-4 h-full">
                      <div className="hidden min-w-32 sm:flex flex-row items-center justify-center pl-1">
                        <p className="text-sm font-light opacity-80">
                          <time className="text-xs text-muted-foreground">
                            6. októbra 2024
                          </time>
                        </p>
                      </div>

                      <div className="h-full flex flex-col justify-center gap-1">
                        <h2 className="font-semibold leading-none">
                          {item.title}
                        </h2>
                        <span className="prose dark:prose-invert text-xs text-muted-foreground">
                          {item.description}
                        </span>
                      </div>


                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </BlurFade>
  );
};
