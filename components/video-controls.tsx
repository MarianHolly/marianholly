import React from "react";
import { Pause as PauseButton, Play as PlayButton } from "lucide-react";

interface VideoPlayerControlsProps {
  progress: number;
  size?: number | undefined;
  width?: number | undefined;
  isPaused: boolean;
  onPlayPause: () => void;
}


export default function VideoPlayerControls({
    progress,
    size = 48,
    width = 3,
    isPaused,
    onPlayPause,
  }: VideoPlayerControlsProps ) {
  
    const center = size / 2;
  const radius = center - width;
  const dashArray = 2 * Math.PI * radius;
  const dashOffset = dashArray * (1 - progress);

  
    return (
    
        <div className="relative flex justify-center items-center bg-white backdrop-blur-3xl rounded-full">
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="#aaaaaa"
            strokeWidth={width}
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="#ffffff"
            strokeWidth={width}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute">
          <button
            className="group cursor-pointer flex justify-center items-center"
            onClick={onPlayPause}
          >
            <div className=" fill-[#000000] group-hover:fill-[#000000] transition-colors duration-200 ease-in-out">
              {isPaused ? <PlayButton /> : <PauseButton />}
            </div>
          </button>
        </div>
      </div>
  )
}
