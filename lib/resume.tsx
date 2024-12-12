import { Icons } from "@/components/ui/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Marián Hollý",
  initials: "MH",
  url: "https://marianholly.vercel.app",
  avatarUrl: "/avatar.jpg",
  description:
    "Front-end developer, samouk - React, Nextjs... Momentálne sa učím Python a Django. Minimalizmus v dizajne aj sociálnych sieťach.",
  summary: [
    "**JavaScript** ma priviedol k **Reactu**, ktorý rád kombinujem s *Typescriptom*, kde sa venujem tvorbe interaktívnych aplikácií. Baví ma dizajnovať s *Tailwind CSS* a *ShadcnUI*. Zaujímajú ma aj frameworky ako **Next.js, Astro** či **Vue**, ktoré skúmam, aby som rozšíril svoje zručnosti.",
    "**Python** študujem na [Software Development Academy](https://sdacademy.sk/kurzy/python/), kde som zvládol základy aj pokročilejšie témy, testovanie aj OOP. Skúšam **Django** a čakajú ma **SQL** a dátové štruktúry. Svoje pokroky dokumentujem v článkoch.",    
    "Hľadám príležitosť ponoriť sa do reálneho vývoja na skutočných projektoch. Chcem rásť ako programátor, naberať skúsenosti a zároveň priniesť hodnotu tímu, v ktorom budem vidieť výsledky svojej práce."
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
    //  { href: "/repos", icon: Icons.github, label: "Repos" },
    // { href: "/projects", icon: Icons.suitcase, label: "Projects" },
    // { href: "/resume", icon: Icons.file, label: "Resume" },
  ],
  contact: {
    email: "marian.holly7117@gmail.com",
    tel: "+421949388479",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/MarianHolly",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/marian-holly-291b62306",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "marian.holly7117@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },
  projects: [
    {
      title: "Bookish Retreat",
      href: "videos/bookish-retreat.mp4",
      dates: "Jan 2024 - Feb 2024",
      active: true,
      description:
        "Discover a hidden gem of literature. Browse by genre, author, or publisher and find your next favorite read.",
      technologies: [
        "Next.js",
        "Typescript",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
      ],
      githubHref: "https://github.com/MarianHolly/bookish-bliss",
      websiteHref: "https://bookish-bliss.vercel.app/",
      links: [
        {
          type: "Website",
          href: "",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image:
        "https://raw.githubusercontent.com/MarianHolly/bookish-bliss/refs/heads/main/public/public-01.png",
      video:
        "https://raw.githubusercontent.com/MarianHolly/bookish-bliss/refs/heads/main/public/public-01.png",
    },
  ],
  repositories: [
    {
      title: "Todo List",
      description:
        "Porovnaj rôzne spôsoby správy stavu v Reacte (hooks, Zustand, Redux Toolkit) na jednoduchom príklade zoznamu úloh.",
      githubHref: "https://github.com/MarianHolly/todo-list/tree/5-Zustand",
      websiteHref: "https://todo-list-8b2y.vercel.app/",
      image:
        "https://raw.githubusercontent.com/MarianHolly/todo-list/refs/heads/5-Zustand/public/todo-list.png",
      dates: "Marec 3 - April 12, 2024",
    },
    {
      title: "Endless Runner",
      description: "Krok-za-krokom návod na vytvorenie pixelovej hry s Pygame.",
      githubHref: "https://github.com/MarianHolly/endless-runner",
      image:
        "https://raw.githubusercontent.com/MarianHolly/endless-runner/refs/heads/main/endless-runner-1.png",
      dates: "Oktover 12 - November 4, 2024",
    },
  ],
  featuredArticles: [
    {
      title: "Python a OOP: Kompletný sprievodca pre programátorov",
      subtitle:
        "Podrobný sprievodca OOP v Pythone, ktorý zahŕňa základné koncepty aj pokročilé témy, ako sú abstrakcia, polymorfizmus a metaklasy",
      publishedAt: "2024-09-22",
      summary:
        "Zisti, ako zvládnuť objektovo orientované programovanie (OOP) v Pythone od základov až po pokročilé techniky. Tento článok ponúka komplexný prehľad všetkého, čo potrebuješ vedieť na dosiahnutie excelentnej úrovne ako programátor.",
      slug: "object-oriented-programming",
    },
  ],
};
