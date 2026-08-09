"use client";

import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";

interface Comment {
  id: string;
  name: string;
  body: string;
  date: string;
}

export default function CommentSection({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(`comments:${slug}`);
      const list: Comment[] = raw ? JSON.parse(raw) : [];
      setComments(list);
    } catch {
      setComments([]);
    }
  }, [slug]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedBody = body.trim();
    if (!trimmedName || !trimmedBody) return;
    const newComment: Comment = {
      id: `${Date.now()}`,
      name: trimmedName,
      body: trimmedBody,
      date: new Date().toISOString(),
    };
    const next = [newComment, ...comments];
    setComments(next);
    localStorage.setItem(`comments:${slug}`, JSON.stringify(next));
    setName("");
    setBody("");
  };

  return (
    <section className="mt-16 border-t border-neutral-200 pt-10 dark:border-neutral-800">
      <h2 className="font-serif text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        Comments ({mounted ? comments.length : 0})
      </h2>

      <form onSubmit={submit} className="mt-6 space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          maxLength={60}
          className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:ring-pink-900/30"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Share your thoughts..."
          rows={4}
          maxLength={1000}
          className="w-full resize-y rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:ring-pink-900/30"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
        >
          <Send className="h-4 w-4" />
          Post comment
        </button>
      </form>

      <div className="mt-8 space-y-6">
        {mounted && comments.length === 0 && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Be the first to share your thoughts.
          </p>
        )}
        {mounted &&
          comments.map((c) => (
            <div
              key={c.id}
              className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  {c.name}
                </span>
                <span className="text-xs text-neutral-400">
                  {formatDate(c.date)}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                {c.body}
              </p>
            </div>
          ))}
      </div>
    </section>
  );
}
