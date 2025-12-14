import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { MDXComponents } from 'mdx/types';

/**
 * Table component for rendering data in MDX
 * @param data - Object containing headers and rows arrays
 * @returns HTML table element
 */
interface TableProps {
  data: { headers: string[]; rows: string[][] };
}

function Table({ data }: TableProps): React.ReactElement {
  const headers = data.headers.map((header) => (
    <th key={`header-${header}`}>{header}</th>
  ));
  const rows = data.rows.map((row, rowIndex) => (
    <tr key={`row-${rowIndex}-${row.join("-").slice(0, 20)}`}>
      {row.map((cell, cellIndex) => (
        <td key={`cell-${rowIndex}-${cellIndex}-${cell.slice(0, 10)}`}>
          {cell}
        </td>
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

/**
 * Smart link component that handles internal and external links
 * Internal links: uses Next.js Link
 * Anchor links: renders anchor tag
 * External links: opens in new tab with security attributes
 */
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

/**
 * Rounded image component with Next.js Image optimization
 */
interface RoundedImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "width" | "height"> {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
}

function RoundedImage({
  src,
  alt = "",
  width,
  height,
  className,
  ...restProps
}: RoundedImageProps): React.ReactElement | null {
  if (!src) {
    console.warn("RoundedImage: missing src attribute");
    return null;
  }

  // Convert props to the format Next.js Image expects
  const imageWidth = width
    ? typeof width === "string"
      ? Number.parseInt(width, 10)
      : width
    : 800;
  const imageHeight = height
    ? typeof height === "string"
      ? Number.parseInt(height, 10)
      : height
    : 400;

  return (
    <Image
      src={src}
      alt={alt}
      width={imageWidth}
      height={imageHeight}
      className={`rounded-lg ${className || ""}`.trim()}
      {...restProps}
    />
  );
}

/**
 * Convert text to URL-friendly slug format
 * @param str - Text to convert
 * @returns Slugified string
 */
function slugify(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

/**
 * Create a heading component with anchor link support
 * @param level - Heading level (1-6)
 * @returns Heading component with automatic slug generation and anchor link
 */
function createHeading(
  level: 1 | 2 | 3 | 4 | 5 | 6
): React.ComponentType<React.HTMLAttributes<HTMLHeadingElement>> {
  const Heading = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const { children, ...rest } = props;
    const slug = slugify(children?.toString() || "");

    const sizeClasses: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
      1: "text-4xl font-bold",
      2: "text-3xl font-semibold",
      3: "text-2xl font-medium",
      4: "text-xl font-normal",
      5: "text-lg font-light",
      6: "text-base font-light",
    };

    return React.createElement(
      `h${level}`,
      {
        id: slug,
        className: sizeClasses[level],
        ...rest,
      },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
          "aria-label": `Link to ${slug}`,
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