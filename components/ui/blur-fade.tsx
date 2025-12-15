"use client";

import { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import type { UseInViewOptions, Variants } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type MarginType = UseInViewOptions["margin"];

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: MarginType;
  blur?: string;
}

export default function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  inView = false,
  inViewMargin = "-50px",
  blur = "6px",
}: BlurFadeProps) {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const [hasAnimated, setHasAnimated] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!hasAnimated && (!inView || inViewResult)) {
      setHasAnimated(true);
    }
  }, [inView, inViewResult, hasAnimated]);

  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: -yOffset, opacity: 1, filter: "blur(0px)" },
  };
  const combinedVariants = variant || defaultVariants;

  // Respect user's motion preference
  const animationDuration = prefersReducedMotion ? 0.01 : duration;
  const animationDelay = prefersReducedMotion ? 0 : 0.04 + delay;

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={hasAnimated ? "visible" : "hidden"}
        exit="hidden"
        variants={combinedVariants}
        transition={{
          delay: animationDelay,
          duration: animationDuration,
          ease: "easeOut",
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
