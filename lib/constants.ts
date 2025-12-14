/**
 * Application Constants
 * Single source of truth for all magic numbers and string literals
 */

// Animation constants
export const ANIMATION = {
  BLUR_FADE_DELAY: 0.04,
  BLUR_FADE_TEXT_DELAY: 0.08,
  TRANSITION_DURATION: 0.15,
  STAGGER_DELAY: 0.12,
} as const;

// Date formatting constants
export const DATE_FORMAT = {
  LOCALE: "sk-SK",
  THRESHOLD_DAYS: {
    TODAY: 1,
    YESTERDAY: 2,
    DAY_BEFORE_YESTERDAY: 3,
    THIS_WEEK: 7,
    TWO_WEEKS: 14,
    THIS_MONTH: 30,
    TWO_MONTHS: 60,
    THIS_YEAR: 365,
    TWO_YEARS: 730,
  },
} as const;

// Validation constants
export const VALIDATION = {
  SLUG_PATTERN: /^[a-zA-Z0-9_-]+$/,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL_PATTERN: /^https?:\/\/.+/,
} as const;

// UI constants
export const UI = {
  CONTAINER_MAX_WIDTH: "max-w-2xl",
  PROSE_CLASS: "prose dark:prose-invert max-w-3xl mx-auto text-sm",
  BUTTON_ICON_SIZE: "h-5 w-5",
} as const;

// API/Content constants
export const CONTENT = {
  MDX_EXTENSION: ".mdx",
  CONTENT_DIR: "content",
  BLOG_ROUTE: "/blog",
  HOME_ROUTE: "/",
  PAGINATION_LIMIT: 10,
} as const;

// Application defaults
export const DEFAULTS = {
  THEME: "system" as const,
  SORT_ORDER: "desc" as const,
  ITEMS_PER_PAGE: 20,
} as const;
