
"use client";
import { useState } from "react";


interface Post {
  slug: string;
  metadata: {
    title: string;
    subtitle: string;
    publishedAt: string;
    summary: string;
    image: string;
    tags: string[];
    published: boolean;
  };
}

interface PostListProps {
  posts: Post[];
}

const BLUR_FADE_DELAY = 0.04;

export default function BlogList({ posts }: PostListProps) {
    let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return <div>BlogList</div>;
}
