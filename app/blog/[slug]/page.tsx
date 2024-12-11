import Image from "next/image";
import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getBlogPosts, getPost } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { DATA } from "@/lib/resume";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  let post = await getPost(params.slug);

  let { title, publishedAt: publishedTime, summary: description, image } = post.metadata;
  let ogImage = image ? `${DATA.url}${image}` : `${DATA.url}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  let post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section id="blog">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${DATA.url}${post.metadata.image}`
              : `${DATA.url}/og?title=${post.metadata.title}`,
            url: `${DATA.url}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: DATA.name,
            },
          }),
        }}
      />

      <div id="header" className="max-w-4xl mx-auto">
        <div className="w-full flex flex-col justify-between items-center">
          <h1 className="text-center font-bold text-4xl tracking-wider mb-2">
            {post.metadata.title}
          </h1>
          <h2 className="text-center font-light text-xl tracking-wider">
            {post.metadata.subtitle}
          </h2>

          <div className="flex justify-between items-center mt-2 mb-4 text-sm font-semibold">
            <Suspense fallback={<p className="h-5" />}>
              <p className="text-sm text-neutral-700 dark:text-neutral-400 uppercase">
                {formatDate(post.metadata.publishedAt)}
              </p>
            </Suspense>
          </div>

          <Image
            src={post.metadata.image}
            alt={post.metadata.title}
            width={900}
            height={400}
            className="rounded-2xl mb-12"
          />
        </div>
      </div>

      <article
        className="prose dark:prose-invert max-w-3xl mx-auto text-sm"
        dangerouslySetInnerHTML={{ __html: post.source }}
      ></article>
    </section>
  );
}
