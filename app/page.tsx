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
          <h2 className="text-xl font-bold mb-2">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            {DATA.summary}
          </Markdown>
         </BlurFade>
      </section>
      <section id="projects"></section>
      <section id="repositories"></section>
      <section id="blog"></section>
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                No facebook, no instagram, but you can try{" "}
                <Link href={DATA.contact.email} className="text-blue-500 hover:underline">
                  linkedin
                </Link>
                . The best way to reach me is{" "}
                <Link href={DATA.contact.email} className="text-blue-500 hover:underline">
                  via email
                </Link>
                . Feel free to drop a message, and I'll respond when I can.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
