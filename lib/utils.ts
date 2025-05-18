import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateShort(date: string) {
  const dateWithTime = date.includes("T") ? date : `${date}T00:00:00`;

  const fullDate = new Date(dateWithTime).toLocaleString("sk-SK", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `${fullDate}`;
}

export function formatDate(date: string) {
  const currentDate = new Date().getTime();
  const dateWithTime = date.includes("T") ? date : `${date}T00:00:00`;
  const targetDate = new Date(dateWithTime).getTime();
  const timeDifference = Math.abs(currentDate - targetDate);
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const fullDate = new Date(dateWithTime).toLocaleString("sk-SK", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (daysAgo < 1) {
    return "dnes";
  } 
  
  if (daysAgo < 2) {
    return "včera";
  } 
  
  if (daysAgo < 3) {
    return "predvčerom";
  } 
  
  if (daysAgo < 7) {
    return `${fullDate} (minulý týždeň)`;
  } 
  
  if (daysAgo < 14) {
    return `${fullDate} (pred ${daysAgo} dňami)`;
  } 
  
  if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7);
    return `${fullDate} (pred ${weeksAgo} týždňami)`;
  } 
  
  if (daysAgo < 60) {
    return "minulý mesiac";
  } 
  
  if (daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30);
    return `${fullDate} (pred ${monthsAgo} mesiacmi)`;
  } 
  
  if (daysAgo < 730) {
    return "minulý rok";
  }
  
  const yearsAgo = Math.floor(daysAgo / 365);
  return `${fullDate} (pred ${yearsAgo} rokmi)`;
}

export function isValidNumber(value: unknown): boolean {
  const numValue = Number(value);
  return !Number.isNaN(numValue) && Number.isFinite(numValue);
}