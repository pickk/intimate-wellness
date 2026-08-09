"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/utils";

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeSlug, setActiveSlug] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveSlug(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -70% 0px",
        threshold: [0, 1],
      }
    );

    const ids = headings.map((h) => h.slug);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
        On this page
      </p>
      <ul className="space-y-3 border-l border-neutral-200 dark:border-neutral-800">
        {headings.map((h) => (
          <li key={h.slug}>
            <a
              href={`#${h.slug}`}
              className={`-ml-px block border-l-2 py-0.5 transition ${
                h.level === 3 ? "pl-6" : "pl-4"
              } ${
                activeSlug === h.slug
                  ? "border-pink-500 font-medium text-pink-700 dark:text-pink-300"
                  : "border-transparent text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
