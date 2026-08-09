import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageHref = (page: number) =>
    page === 1 ? "/" : `${basePath}/${page}`;

  const prev = currentPage > 1 ? currentPage - 1 : null;
  const next = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <nav
      className="mt-16 flex items-center justify-between border-t border-neutral-200 pt-8 dark:border-neutral-800"
      aria-label="Pagination"
    >
      <div className="flex-1">
        {prev !== null && (
          <Link
            href={pageHref(prev)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 transition hover:text-pink-700 dark:text-neutral-400 dark:hover:text-pink-300"
          >
            <ChevronLeft className="h-4 w-4" />
            Newer
          </Link>
        )}
      </div>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Link
            key={p}
            href={pageHref(p)}
            aria-current={p === currentPage ? "page" : undefined}
            className={`inline-flex h-9 min-w-9 items-center justify-center rounded-full px-3 text-sm transition ${
              p === currentPage
                ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
            }`}
          >
            {p}
          </Link>
        ))}
      </div>

      <div className="flex flex-1 justify-end">
        {next !== null && (
          <Link
            href={pageHref(next)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 transition hover:text-pink-700 dark:text-neutral-400 dark:hover:text-pink-300"
          >
            Older
            <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </nav>
  );
}
