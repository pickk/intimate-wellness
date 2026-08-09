import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { slugify } from "./utils";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  category: string;
  author: string;
  coverImage: string;
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
}

function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? new Date().toISOString(),
    excerpt: data.excerpt ?? "",
    tags: (data.tags ?? []).map((t: string) => String(t)),
    category: data.category ?? "Uncategorized",
    author: data.author ?? "dr-emma-hayes",
    coverImage:
      data.coverImage ??
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1200&h=630&fit=crop",
    content,
    readingTime: stats.text,
  };
}

export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is Post => p !== null)
    .map(({ content, ...meta }) => meta)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

export function getAllPostsFull(): Post[] {
  const slugs = getPostSlugs();
  return slugs
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedPost(): PostMeta | undefined {
  return getAllPosts()[0];
}

export const POSTS_PER_PAGE = 6;

export function getPaginatedPosts(page: number): {
  posts: PostMeta[];
  totalPages: number;
  currentPage: number;
} {
  const all = getAllPosts();
  const totalPages = Math.max(1, Math.ceil(all.length / POSTS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const posts = all.slice(start, start + POSTS_PER_PAGE);
  return { posts, totalPages, currentPage };
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllCategories(): { category: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): PostMeta[] {
  const normalized = slugify(tag);
  return getAllPosts().filter(
    (p) => p.tags.some((t) => slugify(t) === normalized) || p.tags.includes(tag)
  );
}

export function getPostsByCategory(category: string): PostMeta[] {
  const normalized = slugify(category);
  return getAllPosts().filter(
    (p) => slugify(p.category) === normalized || p.category === category
  );
}

export function getPostsByAuthor(authorSlug: string): PostMeta[] {
  return getAllPosts().filter((p) => p.author === authorSlug);
}

export function getRelatedPosts(post: PostMeta, count = 3): PostMeta[] {
  const all = getAllPosts().filter((p) => p.slug !== post.slug);
  const scored = all.map((p) => {
    let score = 0;
    if (p.category === post.category) score += 2;
    score += p.tags.filter((t) => post.tags.includes(t)).length;
    return { post: p, score };
  });
  return scored
    .sort((a, b) => b.score - a.score || new Date(b.post.date).getTime() - new Date(a.post.date).getTime())
    .slice(0, count)
    .map((s) => s.post);
}

export function getSearchIndex(): PostMeta[] {
  return getAllPosts();
}

export function getTagSlug(tag: string): string {
  return slugify(tag);
}

export function getTagLabel(slug: string): string {
  const tag = getAllTags().find((t) => slugify(t.tag) === slug);
  return tag ? tag.tag : slug;
}

export function getCategoryLabel(slug: string): string {
  const cat = getAllCategories().find((c) => slugify(c.category) === slug);
  return cat ? cat.category : slug;
}
