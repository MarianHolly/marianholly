import { Icons } from "@/components/ui/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Marián Hollý",
  initials: "MH",
  url: "https://marianholly.vercel.app",
  avatarUrl: "/avatar.jpg",
  description:
    "Front-end developer, samouk. Momentálne sa učím Python. Preferujem minimalizmus v dizajne aj sociálnych sieťach.",
  summary:
    "Momentálne si rozširujem zručnosti získavaním certifikátu v [Pythone na Software Development Academy](https://sdacademy.sk/kurzy/python/), čo mi pomôže prejsť na backendový vývoj a analýzu dát. Okrem učenia sa Pythonu [píšem články o témach vo frontend vývoji](https://dev.to/), poznámky z python učenia, občas pár tipov a objevov vo web vývoji. Naďalej si prehlbujem zručnosti vo frontend-e a občas experimentujem s dizajnovaním.",
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
    //  { href: "/repos", icon: Icons.github, label: "Repos" },
  ],
  contact: {
    email: "hello@example.com",
    tel: "+123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://dub.sh/dillion-github",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://dub.sh/dillion-linkedin",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,
        navbar: false,
      },
    },
  },
  projects: [
    {
      title: "Bookish Retreat",
      href: "",
      dates: "Jan 2024 - Feb 2024",
      active: true,
      description:
        "Discover a hidden gem of literature. Browse by genre, author, or publisher and find your next favorite read.",
      technologies: ["Next.js", "Typescript", "TailwindCSS", "Stripe", "Shadcn UI"],
      links: [
        {
          type: "Website",
          href: "https://chatcollect.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "https://raw.githubusercontent.com/MarianHolly/bookish-bliss/refs/heads/main/public/public-01.png",
      video: "https://raw.githubusercontent.com/MarianHolly/bookish-bliss/refs/heads/main/public/public-01.png",
    },
  ],
  repositories: [
    {
      title: "Task Manager",
      description: "Jednoduchý správca úloh vytvorený pomocou Next.js s TypeScriptom.",
      githubHref: "https://github.com/dillionverma/task-manager",
      websiteHref: "https://todo-list-8b2y.vercel.app/",
      image: "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/developer-week.jpg",
      dates: "March 23rd - 24th, 2018",
    },
    
    {
      title: "Flappy Bird",
      description: "Legendárna hra vytvorená pomocou Pythonu a Pygame.",
      githubHref: "https://github.com/MarianHolly/todo-list/tree/5-Zustand",
      websiteHref: "https://todo-list-8b2y.vercel.app/",
      image: "https://raw.githubusercontent.com/MarianHolly/todo-list/refs/heads/5-Zustand/public/todo-list.png",
      dates: "February 3rd - 4th, 2018",
    },
  ],
  featuredArticles: [
    {
      title: "Spravovanie stavu v Reacte",
      subtitle: "Manažovanie stavu v aplikáciách s využitím Reactu",
      publishedAt: "2024-09-05",
      summary:
        "Podrobnejší pohľad na manažovanie, zdielanie a spravovanie stavu v aplikáciách s využitím Reactu.",
      slug: "state-management-in-react",
    },
    {
      title: "Objektovo-orientované programovanie v Pythone",
      subtitle: "Ako premýšlať s objektovou orientáciou v Pythone",
      publishedAt: "2024-09-22",
      summary:
        "Preskúmanie princípov objektovo-orientovaného programovania a ich implementácia v Pythone.",
      slug: "object-oriented-programming",
    }
  ],
};
