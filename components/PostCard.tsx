import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import type { PostMeta } from "@/lib/posts";
import { getTagSlug } from "@/lib/posts";
import { getAuthorBySlug } from "@/lib/authors";
import { formatDate } from "@/lib/utils";

export default function PostCard({
  post,
  featured = false,
}: {
  post: PostMeta;
  featured?: boolean;
}) {
  const author = getAuthorBySlug(post.author);

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:border-neutral-300 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 ${
        featured ? "md:flex-row" : ""
      }`}
    >
      <Link
        href={`/${post.slug}`}
        className={`relative block overflow-hidden ${
          featured ? "md:w-1/2" : "aspect-[16/9]"
        }`}
      >
        <Image
          src={post.coverImage}
          alt={post.title}
          fill={featured}
          width={featured ? 800 : 800}
          height={featured ? 600 : 450}
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover transition duration-500 group-hover:scale-105 ${
            featured ? "h-full w-full" : ""
          }`}
        />
      </Link>
      <div className={`flex flex-1 flex-col p-6 ${featured ? "md:p-8" : ""}`}>
        <div className="flex items-center gap-2 text-xs">
          <Link
            href={`/category/${getTagSlug(post.category)}`}
            className="font-semibold uppercase tracking-widest text-pink-700 hover:underline dark:text-pink-300"
          >
            {post.category}
          </Link>
          <span className="text-neutral-300 dark:text-neutral-600">·</span>
          <span className="text-neutral-500 dark:text-neutral-400">
            {formatDate(post.date)}
          </span>
        </div>

        <h3
          className={`mt-3 font-serif font-bold leading-tight tracking-tight text-neutral-900 dark:text-neutral-100 ${
            featured ? "text-2xl md:text-3xl" : "text-xl"
          }`}
        >
          <Link href={`/${post.slug}`} className="hover:text-pink-700 dark:hover:text-pink-300">
            {post.title}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between pt-5 text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            {author && (
              <>
                <Image
                  src={author.avatar}
                  alt={author.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span className="font-medium text-neutral-700 dark:text-neutral-300">
                  {author.name}
                </span>
              </>
            )}
          </div>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime}
          </span>
        </div>
      </div>
    </article>
  );
}
