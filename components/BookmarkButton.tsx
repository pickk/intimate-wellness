"use client";

import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";

export default function BookmarkButton({ slug }: { slug: string }) {
  const [bookmarked, setBookmarked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem("bookmarks");
      const list: string[] = raw ? JSON.parse(raw) : [];
      setBookmarked(list.includes(slug));
    } catch {
      setBookmarked(false);
    }
  }, [slug]);

  const toggle = () => {
    try {
      const raw = localStorage.getItem("bookmarks");
      const list: string[] = raw ? JSON.parse(raw) : [];
      const next = list.includes(slug)
        ? list.filter((s) => s !== slug)
        : [...list, slug];
      localStorage.setItem("bookmarks", JSON.stringify(next));
      setBookmarked(!bookmarked);
    } catch {
      // ignore
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={bookmarked}
      className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-pink-300 hover:text-pink-700 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-pink-700 dark:hover:text-pink-300"
    >
      <Bookmark
        className={`h-4 w-4 transition ${bookmarked ? "fill-pink-500 text-pink-500" : ""}`}
      />
      <span>{mounted && bookmarked ? "Saved" : "Save"}</span>
    </button>
  );
}
