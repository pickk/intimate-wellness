import Image from "next/image";
import Link from "next/link";
import type { Author } from "@/lib/authors";

export default function AuthorCard({
  author,
  compact = false,
}: {
  author: Author;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-4 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900 ${
        compact ? "" : "md:p-8"
      }`}
    >
      <Image
        src={author.avatar}
        alt={author.name}
        width={compact ? 56 : 72}
        height={compact ? 56 : 72}
        className="rounded-full"
      />
      <div className="flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <Link
            href={`/author/${author.slug}`}
            className="font-serif text-lg font-bold text-neutral-900 hover:text-pink-700 dark:text-neutral-100 dark:hover:text-pink-300"
          >
            {author.name}
          </Link>
          <span className="text-xs font-medium uppercase tracking-widest text-pink-700 dark:text-pink-300">
            {author.role}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {author.bio}
        </p>
        {author.social && author.social.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3 text-xs">
            {author.social.map((s) => (
              <a
                key={s.label}
                href={s.url}
                className="text-neutral-500 underline-offset-2 hover:text-pink-700 hover:underline dark:text-neutral-400 dark:hover:text-pink-300"
              >
                {s.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
