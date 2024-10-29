"use client";

import { useRef, useEffect, useState } from "react";
import { Button } from "./ui/button";
import VideoPlayerControls from "./video-controls";

interface VideoPlayerProps {
  src: string;
}

export default function VideoPlayer2({ src }: VideoPlayerProps) {
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>();
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      setVideoDuration(video.duration);
    }
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const currentTime = videoRef.current?.currentTime;
    if (videoDuration != null && currentTime != null) {
      let loadingTimeout = setTimeout(() => {
        if (videoProgress == currentTime / videoDuration) {
          setVideoProgress((prev) => prev + 0.000001);
        } else {
          setVideoProgress(currentTime / videoDuration);
        }
      }, 10);

      return () => {
        clearTimeout(loadingTimeout);
      };
    }
  }, [videoProgress, videoDuration, isPaused]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      setIsPaused(!video.paused);
      video.paused ? video.play() : video.pause();
    }
  };

  return (
    <div className="relative bg-white dark:bg-black rounded-md">
      <div className="absolute top-3 right-3 z-10">
        <VideoPlayerControls
          progress={videoProgress}
          isPaused={isPaused}
          onPlayPause={togglePlayPause}
        />
      </div>

      <video
        src={src}
        playsInline
        autoPlay
        muted
        loop
        ref={videoRef}
        className="w-full rounded-md overflow-hidden"
      />
    </div>
  );
}
