import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/lib/resume";

import Markdown from "react-markdown";
import BlurFade from "@/components/ui/blur-fade";
import BlurFadeText from "@/components/ui/blur-fade-text";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export default function Home() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8 lg:pt-44">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
              />
              <BlurFadeText
                className="max-w-[600px] md:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-28 border">
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
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>

      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Webové aplikácie
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  nedávne vybrané projekty
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Objav moju vášeň pre tvorbu interaktívnych a užívateľsky prívetivých webových
                  zážitkov. Tu je niekoľko mojich obľúbených.
                </p>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="repositories">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  GitHub Repozitáre
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  neustále niečo kódujem
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Preskúmaj moju cestu kódenia cez rôznorodú zbierku projektov, od malých
                  experimentov až po plnohodnotné aplikácie postavené rôznymi technologiami React,
                  Next.js, Typescript, Astro, Sanity, Contentful, Python, Django, Flask, Pygame.
                </p>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="blog">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Blogové články
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  zdieľam, čo sa učím
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Ponorte sa do môjho blogu, kde zdieľam svoje poznatky z webového vývoja, od
                  praktických návodov po tipy a triky pre front-end technológie ako React, Next.js a
                  dizajnové nástroje ako Tailwind CSS a Shadcn UI.
                </p>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Kontakt
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">dajte mi vedieť</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                ani facebook, ani instagram, ale môžete ma nájsť na{" "}
                <Link href={DATA.contact.email} className="text-blue-500 hover:underline">
                  LinkedIn
                </Link>
                . naj možnosť je{" "}
                <Link href={DATA.contact.email} className="text-blue-500 hover:underline">
                  via mail
                </Link>
                . Ozvem sa, keď budem môcť.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
