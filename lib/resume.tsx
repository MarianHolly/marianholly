import { Icons } from "@/components/ui/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Marián Hollý",
  initials: "MH",
  url: "https://marianholly.vercel.app",
  avatarUrl: "/avatar.jpg",
  description:
    "Front-end developer, self-taught - React, Next.js. Currently learning Python and Django. Minimalist approach to design and social media.",
  summary: [
    "**JavaScript** introduced me to **React**, which I love combining with *TypeScript* to build interactive applications. I enjoy designing with *Tailwind CSS* and *Shadcn UI*. I'm also interested in frameworks like **Next.js, Astro**, and **Vue**, which I'm exploring to expand my skills.",
    "I'm studying **Python** at [Software Development Academy](https://sdacademy.sk/kurzy/python/), where I've mastered fundamental concepts and advanced topics including testing and OOP. I'm experimenting with **Django** and learning **SQL** and data structures. I document my progress through technical articles.",
    "I'm seeking an opportunity to dive into real-world development on production projects. I want to grow as a developer, gain experience, and contribute value to a team where I can see the impact of my work."
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
        "Compare different state management approaches in React (hooks, Zustand, Redux Toolkit) using a simple todo list example.",
      githubHref: "https://github.com/MarianHolly/todo-list/tree/5-Zustand",
      websiteHref: "https://todo-list-8b2y.vercel.app/",
      image:
        "https://raw.githubusercontent.com/MarianHolly/todo-list/refs/heads/5-Zustand/public/todo-list.png",
      dates: "March 3 - April 12, 2024",
    },
    {
      title: "Endless Runner",
      description: "Step-by-step guide to building a pixel-based game with Pygame.",
      githubHref: "https://github.com/MarianHolly/endless-runner",
      image:
        "https://raw.githubusercontent.com/MarianHolly/endless-runner/refs/heads/main/endless-runner-1.png",
      dates: "October 12 - November 4, 2024",
    },
  ],
  featuredArticles: [
    {
      title: "Python and OOP: A Complete Guide for Developers",
      subtitle:
        "A detailed guide to Object-Oriented Programming in Python, covering fundamental concepts and advanced topics like abstraction, polymorphism, and metaclasses",
      publishedAt: "2024-09-22",
      summary:
        "Learn how to master Object-Oriented Programming (OOP) in Python from basics to advanced techniques. This article provides a comprehensive overview of everything you need to know to achieve excellence as a programmer.",
      slug: "object-oriented-programming",
    },
  ],
};
