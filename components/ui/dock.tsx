"use client";

import { useRef, useState } from "react";
import type { PropsWithChildren } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

export interface DockProps extends PropsWithChildren {
  className?: string;
  magnification?: number;
  distance?: number;
  direction?: "top" | "middle" | "bottom";
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

export function Dock({
  className,
  children,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  direction = "bottom",
}: DockProps) {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);

  const renderChildren = () => {
    return children;
  };

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
      className={cn(
        "mx-auto flex h-16 items-end gap-4 rounded-2xl border bg-background px-4 pb-3",
        {
          "items-start": direction === "top",
          "items-center": direction === "middle",
          "items-end": direction === "bottom",
        },
        className
      )}
    >
      {renderChildren()}
    </motion.div>
  );
}

export interface DockIconProps {
  size?: number;
  magnification?: number;
  distance?: number;
  children: React.ReactNode;
  className?: string;
}

export function DockIcon({
  size = 40,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  children,
  className,
}: DockIconProps) {
  const ref = useRef<HTMLDivElement>(null);

  const distanceCalc = useTransform(
    useMotionValue(Number.POSITIVE_INFINITY),
    (val: number) => {
      const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
      return val - bounds.x - bounds.width / 2;
    }
  );

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        className
      )}
    >
      {children}
    </motion.div>
  );
}