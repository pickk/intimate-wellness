import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import AuthorCard from "@/components/AuthorCard";
import { getAllAuthors, getAuthorBySlug } from "@/lib/authors";
import { getPostsByAuthor } from "@/lib/posts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllAuthors().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return {};
  return {
    title: author.name,
    description: author.bio,
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  const posts = getPostsByAuthor(slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <AuthorCard author={author} />
      </div>

      <section className="mt-14">
        <h2 className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
          Articles by {author.name} ({posts.length})
        </h2>
        {posts.length === 0 ? (
          <p className="text-neutral-500 dark:text-neutral-400">
            No articles yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
