import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PostCard from "@/components/PostCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import Pagination from "@/components/Pagination";
import {
  getPaginatedPosts,
  getAllTags,
  getTagSlug,
  POSTS_PER_PAGE,
} from "@/lib/posts";

export default function HomePage() {
  const { posts, totalPages, currentPage } = getPaginatedPosts(1);
  const [featured, ...rest] = posts;
  const tags = getAllTags().slice(0, 8);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Hero */}
      <section className="mb-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pink-700 dark:text-pink-300">
          Sexual Health · Intimacy · Wellness
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl font-serif text-4xl font-bold leading-tight tracking-tight text-neutral-900 md:text-6xl dark:text-neutral-100">
          Thoughtful writing on intimate wellness
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-neutral-600 md:text-lg dark:text-neutral-400">
          Evidence-based guides, honest product reviews, and human-centered
          advice on sexual health and relationships.
        </p>
      </section>

      {tags.length > 0 && (
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {tags.map((t) => (
            <Link
              key={t.tag}
              href={`/tag/${getTagSlug(t.tag)}`}
              className="rounded-full border border-neutral-200 px-3.5 py-1.5 text-xs font-medium text-neutral-600 transition hover:border-pink-300 hover:text-pink-700 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-pink-700 dark:hover:text-pink-300"
            >
              #{t.tag}
            </Link>
          ))}
        </div>
      )}

      {/* Featured */}
      {featured && (
        <section className="mb-14">
          <h2 className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Featured
          </h2>
          <PostCard post={featured} featured />
        </section>
      )}

      {/* Grid */}
      {rest.length > 0 && (
        <section>
          <h2 className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Latest articles
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/page"
      />

      <div className="mt-20">
        <NewsletterSignup />
      </div>
    </div>
  );
}
