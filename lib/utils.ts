import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateShort(date: string) {
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }

  const fullDate = new Date(date).toLocaleString("sk-SK", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `${fullDate}`;
}

export function formatDate(date: string) {
  const currentDate = new Date().getTime();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date).getTime();
  const timeDifference = Math.abs(currentDate - targetDate);
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const fullDate = new Date(date).toLocaleString("sk-SK", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (daysAgo < 1) {
    return "dnes";
  } else if (daysAgo < 2) {
    return "včera";
  } else if (daysAgo < 3) {
    return "predvčerom";
  } else if (daysAgo < 7) {
    return `${fullDate} (minulý týždeň)`;
  } else if (daysAgo < 14) {
    return `${fullDate} (pred ${daysAgo} dňami)`;
  } else if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7);
    return `${fullDate} (pred ${weeksAgo} týždňami)`;
  } else if (daysAgo < 60) {
    return "minulý mesiac";
  } else if (daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30);
    return `${fullDate} (pred ${monthsAgo} mesiacmi)`;
  } else if (daysAgo < 730) {
    return "minulý rok";
  } else {
    const yearsAgo = Math.floor(daysAgo / 365);
    return `${fullDate} (pred ${yearsAgo} rokmi)`;
  }
}
