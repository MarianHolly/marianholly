import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { MDXComponents } from 'mdx/types';

function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
  const headers = data.headers.map((header) => (
    <th key={`header-${header}`}>{header}</th>
  ));
  const rows = data.rows.map((row, rowIndex) => (
    <tr key={`row-${rowIndex}-${row.join('-').slice(0, 20)}`}>
      {row.map((cell, cellIndex) => (
        <td key={`cell-${rowIndex}-${cellIndex}-${cell.slice(0, 10)}`}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href;

  if (href?.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href?.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props: React.ImgHTMLAttributes<HTMLImageElement> & {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
}) {
  const { src, alt = "", width, height, className, ...restProps } = props;
  
  if (!src) {
    return null;
  }

  // Convert props to the format Next.js Image expects
  const imageProps = {
    src,
    alt,
    className: `rounded-lg ${className || ''}`.trim(),
    ...(width && { width: typeof width === 'string' ? Number.parseInt(width, 10) : width }),
    ...(height && { height: typeof height === 'string' ? Number.parseInt(height, 10) : height }),
    ...restProps
  };

  return <Image {...imageProps} />;
}

// This replaces rehype-slug
function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Heading = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const { children, ...rest } = props;
    const slug = slugify(children?.toString() || "");

    const sizeClasses = {
      1: "text-4xl font-bold",
      2: "text-3xl font-semibold",
      3: "text-2xl font-medium",
      4: "text-xl font-normal",
      5: "text-lg font-light",
      6: "text-base font-light"
    };

    return React.createElement(
      `h${level}`,
      { 
        id: slug, 
        className: sizeClasses[level],
        ...rest
      },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };
  Heading.displayName = `Heading${level}`;
  return Heading;
}

export const globalComponents: MDXComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  img: RoundedImage,
  a: CustomLink,
  Table,
};