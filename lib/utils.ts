import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { DATE_FORMAT, VALIDATION } from "@/lib/constants";

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

/**
 * Validate if a string matches email pattern
 * @param email - Email string to validate
 * @returns True if email format is valid
 */
export function isValidEmail(email: string): boolean {
  return VALIDATION.EMAIL_PATTERN.test(email);
}

/**
 * Validate if a string matches URL pattern
 * @param url - URL string to validate
 * @returns True if URL format is valid
 */
export function isValidUrl(url: string): boolean {
  return VALIDATION.URL_PATTERN.test(url);
}

/**
 * Safely parse JSON with error handling
 * @param json - JSON string to parse
 * @param fallback - Fallback value if parsing fails
 * @returns Parsed object or fallback
 * @example
 * safeJsonParse('{"a": 1}', {}) // returns { a: 1 }
 * safeJsonParse('invalid', {}) // returns {}
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch (error) {
    console.warn("Failed to parse JSON:", error);
    return fallback;
  }
}

/**
 * Truncate string to max length with ellipsis
 * @param str - String to truncate
 * @param maxLength - Maximum length
 * @returns Truncated string with ellipsis if exceeds maxLength
 * @example
 * truncateString("hello world", 5) // returns "hello..."
 * truncateString("hi", 5) // returns "hi"
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
}