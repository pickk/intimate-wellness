import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import {
  getPaginatedPosts,
  getAllPosts,
  POSTS_PER_PAGE,
} from "@/lib/posts";

interface PageProps {
  params: Promise<{ page: string }>;
}

export function generateStaticParams() {
  const totalPages = Math.max(1, Math.ceil(getAllPosts().length / POSTS_PER_PAGE));
  return Array.from({ length: totalPages }, (_, i) => ({
    page: String(i + 1),
  })).filter((p) => p.page !== "1");
}

export async function generateMetadata({ params }: PageProps) {
  const { page } = await params;
  const num = Number(page);
  if (!Number.isFinite(num) || num < 1) return {};
  return {
    title: `Page ${num}`,
    description: `Articles — page ${num}`,
  };
}

export default async function PaginatedPage({ params }: PageProps) {
  const { page } = await params;
  const num = Number(page);
  if (!Number.isFinite(num) || num < 1) notFound();

  const { posts, totalPages, currentPage } = getPaginatedPosts(num);
  if (num > totalPages) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="mb-10">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl dark:text-neutral-100">
          All Articles
        </h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Page {currentPage} of {totalPages}
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/page"
      />
    </div>
  );
}
