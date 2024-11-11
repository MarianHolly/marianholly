import TableOfContent from "@/components/table-of-content";
import { Separator } from "@/components/ui/separator";
import { getBlogPosts, getPost } from "@/lib/blog";
import { DATA } from "@/lib/resume";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
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
  let headings = [
    ];

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

      <section className="grid grid-cols-[minmax(0px,1fr)_min(768px,100%)_minmax(0px,1fr)] gap-y-6 *:px-4">
        <Image
          src={post.metadata.image}
          alt={post.metadata.title}
          width={900}
          height={400}
          className="rounded-2xl"
        />
        <section className="col-start-2 flex flex-col gap-y-6 text-center">
          <div className="flex flex-col gap-y-4">
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              {post.metadata.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
              {" "}
              {post.metadata.subtitle}
            </div>
            <div className="flex items-center gap-2">
              <Suspense fallback={<p className="h-5" />}>
                <p className="text-sm text-neutral-700 dark:text-neutral-400 uppercase">
                  {formatDate(post.metadata.publishedAt)}
                </p>
              </Suspense>
              <Separator orientation="vertical" className="h-4" />
            </div>
            <div className="flex flex-wrap justify-center gap-2">TAGS </div>
          </div>
        </section>
      </section>

   
           <TableOfContent />


      <article
        className="prose prose-neutral dark:prose-invert col-start-2 max-w-none"
        dangerouslySetInnerHTML={{ __html: post.source }}
      ></article>
    </section>
  );
}
