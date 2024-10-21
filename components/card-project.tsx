"use client";

import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Globe, Github } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

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

export default function ProjectCard({
  title,
  href,
  dates,
  active,
  description,
  technologies,
  links,
  image,
  video,
}: ProjectCardProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  console.log(isVideoLoaded);
  console.log(video);

  return (
    <Card className="w-full max-w-lg overflow-hidden">
      <div className="relative aspect-[16/9]">
        {image && (
          <Image
            src={image}
            alt={title || "Project Image"}
            width={1600}
            height={900}
            className={`transition-opacity duration-300 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoadingComplete={() => setIsImageLoaded(true)}
          />
        )}
        {!isImageLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
      </div>
      <CardHeader className="px-4 py-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>{title || "Mock Project Title"}</span>
          {active && (
            <Badge variant="secondary" className="ml-2">
              Active
            </Badge>
          )}
        </CardTitle>
        <p className="text-xs text-muted-foreground">{dates || "Jan 2024 - Present"}</p>
      </CardHeader>
      <CardContent className="px-4 pt-0">
        <p className="text-sm mb-2 line-clamp-2">
          {description ||
            "This is a mock description for the project. It showcases the project's main features and goals in a concise manner."}
        </p>
        <div className="flex flex-row">
          <div className="flex flex-wrap gap-1">
            {(technologies.length ? technologies : ["React", "TypeScript", "Tailwind"]).map(
              (tech, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              )
            )}
          </div>
          {links?.map((link, index) => (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              asChild
              className="px-4 w-fit rounded-3xl"
            >
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.type === "Website" ? (
                  <Globe className="mr-2 h-4 w-4" />
                ) : (
                  <Github className="mr-2 h-4 w-4" />
                )}
                {link.type}
              </a>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
