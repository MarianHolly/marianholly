import Link from "next/link";
import Markdown from "react-markdown";

// Components
import BlurFade from "@/components/ui/blur-fade";
import BlurFadeText from "@/components/ui/blur-fade-text";
import ShinyButton from "@/components/ui/shiny-button";
import HoverMailCard from "@/components/hover-mail";

// Cards
import BlogCard from "@/components/card-blog";
import ProjectCard from "@/components/card-project";
import GitHubRepositories from "@/components/github-repositories";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CodeSandboxLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { DATA } from "@/lib/resume";

const BLUR_FADE_DELAY = 0.04;

export default function Home() {
  return (
    <main className="flex flex-col min-h-[100dvh] max-w-2xl mx-auto space-y-10">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8 lg:pt-44">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={`Čau, som ${DATA.name.split(" ")[0]}`}
              />
              <BlurFadeText
                className="max-w-[600px] md:text-xl"
                delay={BLUR_FADE_DELAY * 1.5}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <Avatar className="size-32 border">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about" className="mb-12">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold mb-2">O mne</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 3.5}>
          <div className="space-y-4">
            {DATA.summary.map((text, index) => (
              <Markdown
                key={index}
                className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert"
              >
                {text}
              </Markdown>
            ))}
          </div>
        </BlurFade>
      </section>

      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  webové aplikácie
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  nedávne vybrané projekty
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Objav moju vášeň pre tvorbu interaktívnych a užívateľsky
                  prívetivých webových zážitkov. Tu je niekoľko mojich
                  obľúbených.
                </p>
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 4.5}>
            {DATA.projects.map((project, id) => (
              <div
                key={id}
                className="flex flex-col space-y-3 items-center justify-center"
              >
                <ProjectCard {...project} />
                <div className="w-4/5">
                  <h2 className="text-center font-bold text-xl mb-2">
                    {project.title}
                  </h2>
                  <p className="text-center text-sm text-muted-foreground mb-2">
                    {project.description}
                  </p>
                  <div className="flex flex-row justify-center my-2 gap-2 ">
                    {project.technologies.map((tech, id) => (
                      <Badge
                        variant="outline"
                        key={id}
                        className="text-center text-xs text-muted-foreground px-1 py-0.5"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-row space-x-2 justify-center">
                    <Link href={project.githubHref} passHref legacyBehavior>
                      <a target="_blank">
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-xl w-16 p-0"
                        >
                          <GitHubLogoIcon className="h-5 w-5" />
                        </Button>
                      </a>
                    </Link>

                    {project.websiteHref && (
                      <Link href={project.websiteHref} passHref legacyBehavior>
                        <a target="_blank">
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-xl w-16"
                          >
                            <CodeSandboxLogoIcon className="h-5 w-5" />
                          </Button>
                        </a>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </BlurFade>
        </div>
      </section>

      <section id="repositories" className="mb-12">
        <GitHubRepositories />
      </section>

      <section id="blog">
        <div className="space-y-12 w-full">
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  blogové články
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  zdieľam, čo sa učím
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Ponorte sa do môjho blogu, kde zdieľam svoje poznatky z
                  webového vývoja, od praktických návodov po tipy a triky pre
                  front-end technológie ako React, Next.js a dizajnové nástroje
                  ako Tailwind CSS a Shadcn UI.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="space-y-12 w-full pt-4 pb-12">
            <BlurFade delay={BLUR_FADE_DELAY * 6.5}>
              {DATA.featuredArticles.map((article, id) => (
                <div key={id}>
                  <BlogCard
                    id={id}
                    slug={article.slug}
                    publishedAt={article.publishedAt}
                    summary={article.summary}
                    title={article.title}
                  />
                </div>
              ))}
              <div className="w-full mt-4 flex flex-col justify-center items-center">
                <Link href="/blog">
                  <ShinyButton>zvedavý na ostatné články?</ShinyButton>
                </Link>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 7.5}>
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                kontakt
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-6">
                dajte mi vedieť
              </h2>
              <span className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                ani facebook, ani instagram, ale môžete ma nájsť na{" "}
                <Link
                  href={DATA.contact.social.LinkedIn.url}
                  passHref
                  legacyBehavior
                >
                  <a target="_blank" className="text-cyan-700 hover:underline">
                    LinkedIn
                  </a>
                </Link>
                .<br /> naj možnosť je{" "}
                <HoverMailCard
                  trigger="via mail"
                  content={DATA.contact.email}
                  position={{
                    top: "-3rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                />
                . Ozvem sa, keď budem môcť.
              </span>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
