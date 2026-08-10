import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import ArticleContent from "@/components/ArticleContent";
import AuthorCard from "@/components/AuthorCard";
import BookmarkButton from "@/components/BookmarkButton";
import CommentSection from "@/components/CommentSection";
import LikeButton from "@/components/LikeButton";
import ReadProgress from "@/components/ReadProgress";
import RelatedPosts from "@/components/RelatedPosts";
import ShareButtons from "@/components/ShareButtons";
import TableOfContents from "@/components/TableOfContents";
import {
  getAllPostsFull,
  getPostBySlug,
  getRelatedPosts,
  getTagSlug,
} from "@/lib/posts";
import { getAuthorBySlug } from "@/lib/authors";
import { extractHeadings, formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPostsFull().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: getAuthorBySlug(post.author)?.name
        ? [getAuthorBySlug(post.author)!.name]
        : [],
      images: [{ url: post.coverImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const author = getAuthorBySlug(post.author);
  const headings = extractHeadings(post.content);
  const related = getRelatedPosts(post, 3);

  const siteUrl = "https://wellness.eastlink-hub.com";

  return (
    <>
      <ReadProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            image: post.coverImage,
            datePublished: post.date,
            author: author
              ? { "@type": "Person", name: author.name }
              : undefined,
            publisher: {
              "@type": "Organization",
              name: "IntimateWellness",
            },
            mainEntityOfPage: `${siteUrl}/${post.slug}`,
          }),
        }}
      />

      <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 transition hover:text-pink-700 dark:text-neutral-400 dark:hover:text-pink-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all articles
        </Link>

        {/* Header */}
        <header className="mx-auto mt-8 max-w-3xl text-center">
          <div className="flex items-center justify-center gap-2 text-xs">
            <Link
              href={`/category/${getTagSlug(post.category)}`}
              className="font-semibold uppercase tracking-widest text-pink-700 hover:underline dark:text-pink-300"
            >
              {post.category}
            </Link>
          </div>
          <h1 className="mt-4 font-serif text-3xl font-bold leading-tight tracking-tight text-neutral-900 md:text-5xl dark:text-neutral-100">
            {post.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            {post.excerpt}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-neutral-500 dark:text-neutral-400">
            {author && (
              <Link
                href={`/author/${author.slug}`}
                className="inline-flex items-center gap-2 font-medium text-neutral-700 hover:text-pink-700 dark:text-neutral-300 dark:hover:text-pink-300"
              >
                <Image
                  src={author.avatar}
                  alt={author.name}
                  width={28}
                  height={28}
                  className="rounded-full"
                />
                {author.name}
              </Link>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readingTime}
            </span>
          </div>
        </header>

        {/* Cover image */}
        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={1200}
            height={630}
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="h-auto w-full object-cover"
          />
        </div>

        {/* Body + TOC */}
        <div className="mx-auto mt-12 max-w-6xl gap-12 lg:grid lg:grid-cols-[1fr_220px]">
          <div className="mx-auto max-w-[680px] lg:mx-0">
            <ArticleContent source={post.content} />

            {/* Tags */}
            <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-neutral-200 pt-8 dark:border-neutral-800">
              <Tag className="h-4 w-4 text-neutral-400" />
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tag/${getTagSlug(tag)}`}
                  className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600 transition hover:border-pink-300 hover:text-pink-700 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-pink-700 dark:hover:text-pink-300"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            {/* Engagement */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <LikeButton slug={post.slug} />
                <BookmarkButton slug={post.slug} />
              </div>
              <ShareButtons title={post.title} slug={post.slug} />
            </div>

            {/* Author */}
            {author && (
              <div className="mt-10">
                <AuthorCard author={author} />
              </div>
            )}

            {/* Related */}
            <RelatedPosts posts={related} />

            {/* Comments */}
            <CommentSection slug={post.slug} />
          </div>

          {/* TOC sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
