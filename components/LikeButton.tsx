"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

export default function LikeButton({ slug }: { slug: string }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(`likes:${slug}`);
      const stored = raw ? (JSON.parse(raw) as { count: number; liked: boolean }) : null;
      setLiked(stored?.liked ?? false);
      setCount(stored?.count ?? 0);
    } catch {
      setLiked(false);
      setCount(0);
    }
  }, [slug]);

  const toggle = () => {
    const nextLiked = !liked;
    const nextCount = nextLiked ? count + 1 : Math.max(0, count - 1);
    setLiked(nextLiked);
    setCount(nextCount);
    localStorage.setItem(
      `likes:${slug}`,
      JSON.stringify({ count: nextCount, liked: nextLiked })
    );
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={liked}
      className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-pink-300 hover:text-pink-700 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-pink-700 dark:hover:text-pink-300"
    >
      <Heart
        className={`h-4 w-4 transition ${liked ? "fill-pink-500 text-pink-500" : ""}`}
      />
      <span>{mounted ? count : 0}</span>
      <span className="sr-only">likes</span>
    </button>
  );
}
