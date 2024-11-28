import { Icons } from "@/components/ui/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Marián Hollý",
  initials: "MH",
  url: "https://marianholly.vercel.app",
  avatarUrl: "/avatar.jpg",
  description:
    "Front-end developer, samouk - React, Nextjs... Momentálne sa učím Python a Django. Minimalizmus v dizajne aj sociálnych sieťach.",
  summary:
    "Momentálne si rozširujem zručnosti získavaním certifikátu v [Pythone na Software Development Academy](https://sdacademy.sk/kurzy/python/), čo mi pomôže prejsť na backendový vývoj a analýzu dát. Okrem učenia sa Pythonu [píšem články o témach vo frontend vývoji](https://dev.to/), poznámky z python učenia, občas pár tipov a objevov vo web vývoji. Naďalej si prehlbujem zručnosti vo frontend-e a občas experimentujem s dizajnovaním.",
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
      href: "videos/screen-capture-op.mp4",
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
      subtitle: "Podrobný sprievodca OOP v Pythone, ktorý zahŕňa základné koncepty aj pokročilé témy, ako sú abstrakcia, polymorfizmus a metaklasy",
      publishedAt: "2024-09-22",
      summary:
        "Zisti, ako zvládnuť objektovo orientované programovanie (OOP) v Pythone od základov až po pokročilé techniky. Tento článok ponúka komplexný prehľad všetkého, čo potrebuješ vedieť na dosiahnutie excelentnej úrovne ako programátor.",
      slug: "object-oriented-programming",
    },
  ],
};
