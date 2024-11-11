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
    },  {
      title: "Space Invaders Clone",
      description: "Retro strieľačka z vesmíru vytvorená v Pythone s knižnicou Pygame.",
      githubHref: "https://github.com/Python-Game-Dev/Space-Invaders",  // Replace with your actual Github repository link
      websiteHref: "https://space-invaders-python.herokuapp.com/",  // Replace with your actual deployed website link (if any)
      image: "https://raw.githubusercontent.com/mdn/content/master/files/webgl/spaceinvaders.png",
      dates: "June 10th - 12th, 2022"
    },  {
      title: "Snake Game",
      description: "Klasická hra Had pre dvoch hráčov, vytvorená v Javascripte pomocou knižnice Canvas.",
      githubHref: "https://github.com/vasikprog/snake-game",  // Replace with your actual Github repository link
      websiteHref: "https://snake-game-vasikprog.netlify.app/",  // Replace with your actual deployed website link (if any)
      image: "https://placeimg.com/640/480/animals",  // Replace with an image of the Snake Game
      dates: "May 1st - 2nd, 2023"
    }, {
      title: "Tic-Tac-Toe",
      description: "Strategická hra Pexeso pre dvoch hráčov, naprogramovaná v React.js.",
      githubHref: "https://github.com/maria-dev/tic-tac-toe-react",  // Replace with your actual Github repository link
      websiteHref: "https://tic-tac-toe-maria.vercel.app/",  // Replace with your actual deployed website link (if any)
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Tic-tac-toe.svg/1200px-Tic-tac-toe.svg.png",
      dates: "July 15th - 16th, 2024"
    }

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
