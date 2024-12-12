"use client";

import { useRef, useEffect, useState } from "react";
import VideoPlayerControls from "./video-controls";

interface ProjectLink {
  type: string;
  href: string;
  icon: React.ReactNode;
}

interface ProjectCardProps {
  title: string;
  href: string;
  dates: string;
  active: boolean;
  description: string;
  technologies: string[];
  links?: ProjectLink[];
  image?: string;
  video?: string;
}

export default function ProjectCard({ href }: ProjectCardProps) {
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
      const loadingTimeout = setTimeout(() => {
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
        src={href}
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
