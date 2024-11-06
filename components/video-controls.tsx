import React from "react";
import { TIcons } from "./icons";
import { cn } from "@/lib/utils";

interface VideoPlayerControlsProps {
  size?: number | undefined;
  progress: number;
  width?: number | undefined;
  isPaused: boolean;
  onPlayPause: () => void;
  trackClassName?: string;
  progressClassName?: string;
  className?: string;
}

export default function VideoPlayerControls({
  progress,
  size = 48,
  width = 4,
  isPaused,
  className,
  onPlayPause,
  progressClassName = "text-slate-950",
  trackClassName = "text-black/10 dark:text-white/10",
}: VideoPlayerControlsProps) {
  const center = size / 2;

  const radius = center - width;
  const dashArray = 2 * Math.PI * radius;
  const dashOffset = dashArray * (1 - progress);

  return (
    <div className={`relative flex justify-center items-center ${className}`}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          r={radius}
          cx={center}
          cy={center}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={width + 1}
          strokeDasharray={"10px 0"}
          strokeDashoffset="0px"
          className={cn("duration-500", trackClassName)}
        />
        <circle
          r={radius}
          cx={center}
          cy={center}
          stroke="currentColor"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          strokeWidth={width}
          fill="transparent"
          className={cn("duration-500", progressClassName)}
        />
      </svg>
      <div className="absolute">
        <button
          className="group cursor-pointer flex justify-center items-center"
          onClick={onPlayPause}
        >
          <div className=" fill-[#000000] group-hover:fill-[#000000] transition-colors duration-200 ease-in-out">
            {isPaused ? <TIcons.play className="w-4 h-4" /> : <TIcons.pause className="w-5 h-5" />}
          </div>
        </button>
      </div>
    </div>
  );
}
