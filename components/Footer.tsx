import Link from "next/link";
import { getAllCategories, getAllTags, getTagSlug } from "@/lib/posts";

export default function Footer() {
  const categories = getAllCategories().slice(0, 6);
  const tags = getAllTags().slice(0, 10);

  return (
    <footer className="mt-24 border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link
              href="/"
              className="font-serif text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100"
            >
              Intimate<span className="text-pink-600">Wellness</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              A health-focused publication sharing evidence-based knowledge on
              sexual wellness, intimacy, and relationships. Educational,
              tasteful, and human.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Categories
            </h4>
            <ul className="mt-4 space-y-2">
              {categories.map((c) => (
                <li key={c.category}>
                  <Link
                    href={`/category/${getTagSlug(c.category)}`}
                    className="text-sm text-neutral-600 hover:text-pink-700 dark:text-neutral-400 dark:hover:text-pink-300"
                  >
                    {c.category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Tags
            </h4>
            <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
              {tags.map((t) => (
                <li key={t.tag}>
                  <Link
                    href={`/tag/${getTagSlug(t.tag)}`}
                    className="text-sm text-neutral-600 hover:text-pink-700 dark:text-neutral-400 dark:hover:text-pink-300"
                  >
                    #{t.tag}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-neutral-200 pt-6 text-xs text-neutral-500 sm:flex-row dark:border-neutral-800 dark:text-neutral-400">
          <p>
            © {new Date().getFullYear()} IntimateWellness. All content is for
            educational purposes only.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/feed.xml" className="hover:text-pink-700 dark:hover:text-pink-300">
              RSS
            </Link>
            <Link href="/about" className="hover:text-pink-700 dark:hover:text-pink-300">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
