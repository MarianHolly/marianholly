import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { DATE_FORMAT } from "@/lib/constants";

/**
 * Merge Tailwind CSS classes intelligently
 * @param inputs - CSS class values to merge
 * @returns Merged class string
 * @example cn("px-4", "px-6") // Returns "px-6"
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format date to short format (e.g., "January 15, 2024")
 * @param date - ISO date string or date with T
 * @returns Formatted date string in Slovak locale
 */
export function formatDateShort(date: string): string {
  const dateWithTime = date.includes("T") ? date : `${date}T00:00:00`;

  try {
    const fullDate = new Date(dateWithTime).toLocaleString(
      DATE_FORMAT.LOCALE,
      {
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );

    return fullDate;
  } catch (error) {
    console.warn(`Invalid date format: ${date}`, error);
    return date;
  }
}

/**
 * Format date with relative time (e.g., "Today", "Yesterday", "2 days ago")
 * @param date - ISO date string or date with T
 * @returns Relative date string in Slovak locale
 */
export function formatDate(date: string): string {
  try {
    const currentDate = new Date().getTime();
    const dateWithTime = date.includes("T") ? date : `${date}T00:00:00`;
    const targetDate = new Date(dateWithTime).getTime();
    const timeDifference = Math.abs(currentDate - targetDate);
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    const fullDate = new Date(dateWithTime).toLocaleString(
      DATE_FORMAT.LOCALE,
      {
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );

    const thresholds = DATE_FORMAT.THRESHOLD_DAYS;

    if (daysAgo < thresholds.TODAY) {
      return "dnes";
    }

    if (daysAgo < thresholds.YESTERDAY) {
      return "včera";
    }

    if (daysAgo < thresholds.DAY_BEFORE_YESTERDAY) {
      return "predvčerom";
    }

    if (daysAgo < thresholds.THIS_WEEK) {
      return `${fullDate} (minulý týždeň)`;
    }

    if (daysAgo < thresholds.TWO_WEEKS) {
      return `${fullDate} (pred ${daysAgo} dňami)`;
    }

    if (daysAgo < thresholds.THIS_MONTH) {
      const weeksAgo = Math.floor(daysAgo / 7);
      return `${fullDate} (pred ${weeksAgo} týždňami)`;
    }

    if (daysAgo < thresholds.TWO_MONTHS) {
      return "minulý mesiac";
    }

    if (daysAgo < thresholds.THIS_YEAR) {
      const monthsAgo = Math.floor(daysAgo / 30);
      return `${fullDate} (pred ${monthsAgo} mesiacmi)`;
    }

    if (daysAgo < thresholds.TWO_YEARS) {
      return "minulý rok";
    }

    const yearsAgo = Math.floor(daysAgo / 365);
    return `${fullDate} (pred ${yearsAgo} rokmi)`;
  } catch (error) {
    console.warn(`Invalid date format: ${date}`, error);
    return date;
  }
}

/**
 * Validate if a value is a valid number
 * @param value - Value to validate
 * @returns True if value is a valid finite number
 */
export function isValidNumber(value: unknown): value is number {
  const numValue = Number(value);
  return !Number.isNaN(numValue) && Number.isFinite(numValue);
}