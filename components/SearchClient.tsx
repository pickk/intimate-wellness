"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { PostMeta } from "@/lib/posts";
import { formatDate, slugify } from "@/lib/utils";

interface SearchablePost extends PostMeta {
  haystack: string;
}

function buildIndex(posts: PostMeta[]): SearchablePost[] {
  return posts.map((p) => ({
    ...p,
    haystack: `${p.title} ${p.excerpt} ${p.tags.join(" ")} ${p.category}`.toLowerCase(),
  }));
}

function fuzzyScore(haystack: string, query: string): number {
  if (!query) return 0;
  const q = query.toLowerCase().trim();
  if (haystack.includes(q)) return 100 - haystack.indexOf(q);
  // simple tokenized matching
  const tokens = q.split(/\s+/);
  let score = 0;
  for (const t of tokens) {
    if (haystack.includes(t)) score += 10;
  }
  return score;
}

export default function SearchClient({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("");
  const index = useMemo(() => buildIndex(posts), [posts]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return index
      .map((p) => ({ post: p, score: fuzzyScore(p.haystack, query) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((r) => r.post);
  }, [query, index]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="text-center">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl dark:text-neutral-100">
          Search articles
        </h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Find guides, reviews, and wellness knowledge across the archive.
        </p>
      </header>

      <div className="relative mt-8">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          placeholder="Try “massager”, “consent”, “hygiene”..."
          className="w-full rounded-full border border-neutral-300 bg-white py-3.5 pl-12 pr-12 text-base text-neutral-900 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:ring-pink-900/30"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="mt-10">
        {!query.trim() && (
          <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
            Start typing to search {posts.length} articles.
          </p>
        )}

        {query.trim() && results.length === 0 && (
          <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
            No results for “{query}”. Try different keywords.
          </p>
        )}

        {results.length > 0 && (
          <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {results.map((post) => (
              <li key={post.slug} className="py-5">
                <Link
                  href={`/${post.slug}`}
                  className="group flex gap-4"
                >
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    width={96}
                    height={72}
                    className="hidden h-[72px] w-24 flex-shrink-0 rounded-lg object-cover sm:block"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-xs">
                      <Link
                        href={`/category/${slugify(post.category)}`}
                        className="font-semibold uppercase tracking-widest text-pink-700 hover:underline dark:text-pink-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {post.category}
                      </Link>
                      <span className="text-neutral-300 dark:text-neutral-600">·</span>
                      <span className="text-neutral-500 dark:text-neutral-400">
                        {formatDate(post.date)}
                      </span>
                    </div>
                    <h3 className="mt-1 font-serif text-lg font-bold leading-snug text-neutral-900 group-hover:text-pink-700 dark:text-neutral-100 dark:group-hover:text-pink-300">
                      {post.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
