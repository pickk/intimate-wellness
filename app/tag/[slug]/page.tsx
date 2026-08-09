import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import {
  getAllTags,
  getPostsByTag,
  getTagLabel,
  POSTS_PER_PAGE,
} from "@/lib/posts";
import { slugify } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllTags().map((t) => ({ slug: slugify(t.tag) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const label = getTagLabel(slug);
  return {
    title: `#${label}`,
    description: `Articles tagged "${label}"`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params;
  const label = getTagLabel(slug);
  const posts = getPostsByTag(label);
  if (posts.length === 0) notFound();

  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pink-700 dark:text-pink-300">
          Tag
        </p>
        <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl dark:text-neutral-100">
          #{label}
        </h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          {posts.length} article{posts.length === 1 ? "" : "s"}
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      <Pagination currentPage={1} totalPages={totalPages} basePath={`/tag/${slug}`} />
    </div>
  );
}
