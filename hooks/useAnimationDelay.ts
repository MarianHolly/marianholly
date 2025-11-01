import { ANIMATION } from "@/lib/constants";

/**
 * Hook to provide animation delay multipliers for staggered animations
 * @param multiplier - Multiplier for base delay (default 1)
 * @returns Animation delay value in seconds
 * @example
 * const delay = useAnimationDelay(2);
 * // returns ANIMATION.BLUR_FADE_DELAY * 2 = 0.08
 */
export function useAnimationDelay(multiplier: number = 1): number {
  return ANIMATION.BLUR_FADE_DELAY * multiplier;
}

/**
 * Hook to generate sequential animation delays for array items
 * @param itemCount - Number of items to animate
 * @param multiplier - Base multiplier for delays (default 0.5)
 * @returns Array of delay values for staggered animations
 * @example
 * const delays = useSequentialDelays(5);
 * // returns [0.04, 0.08, 0.12, 0.16, 0.20]
 */
export function useSequentialDelays(
  itemCount: number,
  multiplier: number = 0.5
): number[] {
  return Array.from({ length: itemCount }, (_, i) =>
    ANIMATION.BLUR_FADE_DELAY * (i + 1) * multiplier
  );
}
