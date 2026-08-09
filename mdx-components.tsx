import React from "react";
import { codeToHtml } from "shiki";
import { slugify } from "@/lib/utils";

// Block code: rendered via <pre>. We intercept the inner <code> element,
// extract its language class and raw text, and highlight with Shiki.
async function Pre({ children }: { children?: React.ReactNode }) {
  const child = Array.isArray(children) ? children[0] : children;
  const childProps =
    (child as React.ReactElement<{ className?: string; children?: React.ReactNode }> | null)
      ?.props ?? {};
  const className = (childProps.className as string | undefined) ?? "";
  const codeText = String(childProps.children ?? "").replace(/\n$/, "");
  const lang = className.replace(/^language-/, "") || "text";

  let supported = lang;
  try {
    const { bundledLanguages } = await import("shiki");
    const langs = bundledLanguages as Record<string, unknown>;
    if (!(lang in langs) && lang !== "text") supported = "text";
  } catch {
    supported = "text";
  }

  try {
    const html = await codeToHtml(codeText, {
      lang: supported,
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    });
    return (
      <div
        className="shiki-wrapper my-6 overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch {
    return (
      <pre className="my-6 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100">
        <code>{codeText}</code>
      </pre>
    );
  }
}

function InlineCode({ children }: { children?: React.ReactNode }) {
  return (
    <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[0.85em] text-pink-700 dark:bg-neutral-800 dark:text-pink-300">
      {children}
    </code>
  );
}

function H2({ children }: { children?: React.ReactNode }) {
  const text = String(children ?? "");
  return (
    <h2
      id={slugify(text)}
      className="mt-12 mb-4 scroll-mt-24 font-serif text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl dark:text-neutral-100"
    >
      {children}
    </h2>
  );
}

function H3({ children }: { children?: React.ReactNode }) {
  const text = String(children ?? "");
  return (
    <h3
      id={slugify(text)}
      className="mt-8 mb-3 scroll-mt-24 font-serif text-xl font-semibold tracking-tight text-neutral-900 md:text-2xl dark:text-neutral-100"
    >
      {children}
    </h3>
  );
}

function A({
  href,
  children,
}: {
  href?: string;
  children?: React.ReactNode;
}) {
  const isExternal = href?.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="font-medium text-pink-700 underline decoration-pink-300 underline-offset-2 transition hover:text-pink-900 dark:text-pink-300 dark:decoration-pink-700 dark:hover:text-pink-200"
    >
      {children}
    </a>
  );
}

function Ul({ children }: { children?: React.ReactNode }) {
  return (
    <ul className="my-4 list-disc space-y-2 pl-6 text-neutral-700 dark:text-neutral-300">
      {children}
    </ul>
  );
}

function Ol({ children }: { children?: React.ReactNode }) {
  return (
    <ol className="my-4 list-decimal space-y-2 pl-6 text-neutral-700 dark:text-neutral-300">
      {children}
    </ol>
  );
}

function Blockquote({ children }: { children?: React.ReactNode }) {
  return (
    <blockquote className="my-6 border-l-4 border-pink-300 pl-5 font-serif text-lg italic text-neutral-600 dark:border-pink-700 dark:text-neutral-400">
      {children}
    </blockquote>
  );
}

function Img({ src, alt }: { src?: string; alt?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt ?? ""} className="my-6 w-full rounded-lg" />;
}

function Table({ children }: { children?: React.ReactNode }) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  );
}

function Td({ children }: { children?: React.ReactNode }) {
  return (
    <td className="border border-neutral-200 px-3 py-2 text-neutral-700 dark:border-neutral-800 dark:text-neutral-300">
      {children}
    </td>
  );
}

function Th({ children }: { children?: React.ReactNode }) {
  return (
    <th className="border border-neutral-200 bg-neutral-50 px-3 py-2 text-left font-semibold text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100">
      {children}
    </th>
  );
}

export const mdxComponents = {
  h2: H2,
  h3: H3,
  pre: Pre,
  code: InlineCode,
  a: A,
  ul: Ul,
  ol: Ol,
  blockquote: Blockquote,
  img: Img,
  table: Table,
  td: Td,
  th: Th,
};

export default mdxComponents;
