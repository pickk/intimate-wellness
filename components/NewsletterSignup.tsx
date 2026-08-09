"use client";

import { Mail } from "lucide-react";
import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = (await res.json()) as { message?: string };
      if (res.ok) {
        setStatus("success");
        setMessage(data.message ?? "You're subscribed. Welcome aboard!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <section className="rounded-2xl border border-neutral-200 bg-gradient-to-br from-rose-50 to-pink-50 p-8 dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-900">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300">
          <Mail className="h-5 w-5" />
        </span>
        <h3 className="font-serif text-xl font-bold text-neutral-900 dark:text-neutral-100">
          Get our wellness newsletter
        </h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        Thoughtful, evidence-based articles on sexual health, intimacy, and
        relationships — delivered twice a month. No spam, ever.
      </p>
      <form onSubmit={submit} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email address"
          className="flex-1 rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:ring-pink-900/30"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:opacity-60 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {status !== "idle" && status !== "loading" && (
        <p
          className={`mt-3 text-sm ${
            status === "success"
              ? "text-green-700 dark:text-green-400"
              : "text-red-700 dark:text-red-400"
          }`}
        >
          {message}
        </p>
      )}
    </section>
  );
}
