import { Icons } from "@/components/ui/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Marián Hollý",
  initials: "MH",
  avatarUrl: "/avatar.jpg",
  description:
    "Aspiring front-end web developer. Creating ui components, exploring Python, interested in AI. Fan of minimalist design. Limited social media presence.",
  summary: [
    {
      past: "Na konci roku 2023 som sa rozhodol urobiť významný kariérny posun a opustil som svoju predchádzajúcu prácu v oblasti zubnej techniky, aby som nasledoval svoje nadšenie pre webový vývoj. Svoju cestu som začal ponorením sa do front-end vývoja, pričom som sa zameral na technológie ako React a Next.js. Aby som doplnil svoje kódovacie zručnosti, venoval som sa aj dizajnu, kde som pracoval s Tailwind CSS a Shadcn UI na vytváraní responzívnych a vizuálne príťažlivých rozhraní.",
    },
    {
      present:
        "Momentálne si rozširujem zručnosti získavaním certifikátu v [Pythone na Software Development Academy](https://sdacademy.sk/kurzy/python/), čo mi pomôže prejsť na backendový vývoj a analýzu dát. Okrem učenia sa Pythonu [píšem články o témach vo frontend vývoji](https://dev.to/), poznámky z python učenia, občas pár tipov a objevov vo web vývoji. Naďalej si prehlbujem zručnosti vo frontend-e a občas experimentujem s dizajnovaním.",
    },
  ],
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
  projects: [],
  repositories: [],

  projemkcts: [
    {
      title: "Bookish Retreat",
      href: "https://chatcollect.com",
      dates: "Jan 2024 - Feb 2024",
      active: true,
      description:
        "Discover a hidden gem of literature. Browse by genre, author, or publisher and find your next favorite read.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://chatcollect.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
    },
    {
      title: "Dogen in Moonlight",
      href: "https://magicui.design",
      dates: "June 2023 - Present",
      active: true,
      description: "Designed, developed and sold animated UI components for developers.",
      technologies: ["Astro", "Markdown", "TailwindCSS", "Shadcn UI"],
      links: [
        {
          type: "Website",
          href: "https://magicui.design",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/magicuidesign/magicui",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://cdn.magicui.design/bento-grid.mp4",
    },
    {
      title: "Tea Haven",
      href: "https://llm.report",
      dates: "April 2023 - September 2023",
      active: true,
      description:
        "Embark on a journey of flavor. Explore our extensive collection of teas from China, Japan, India, and around the world.",
      technologies: ["Next.js", "Typescript", "Sanity", "TailwindCSS", "Shadcn UI", "Stripe"],
      links: [
        {
          type: "Website",
          href: "https://llm.report",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/dillionverma/llm.report",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://cdn.llm.report/openai-demo.mp4",
    },
  ],
  hackathons: [
    {
      title: "Hack Western 5",
      dates: "November 23rd - 25th, 2018",
      location: "London, Ontario",
      description:
        "Developed a mobile application which delivered bedtime stories to children using augmented reality.",
      image: "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-western.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "Hack The North",
      dates: "September 14th - 16th, 2018",
      location: "Waterloo, Ontario",
      description:
        "Developed a mobile application which delivers university campus wide events in real time to all students.",
      image: "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-north.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "FirstNet Public Safety Hackathon",
      dates: "March 23rd - 24th, 2018",
      location: "San Francisco, California",
      description:
        "Developed a mobile application which communcicates a victims medical data from inside an ambulance to doctors at hospital.",
      icon: "public",
      image: "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/firstnet.png",
      links: [],
    },
  ],
};
