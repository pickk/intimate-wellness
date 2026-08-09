import { Feed } from "feed";
import { getAllPostsFull } from "@/lib/posts";
import { getAuthorBySlug } from "@/lib/authors";

const siteUrl = "https://intimate-wellness.example";

export async function GET() {
  const posts = getAllPostsFull();

  const feed = new Feed({
    title: "IntimateWellness",
    description:
      "A health-focused publication sharing evidence-based knowledge on sexual wellness, intimacy, and relationships.",
    id: siteUrl,
    link: siteUrl,
    language: "en",
    image: `${siteUrl}/og.png`,
    copyright: `© ${new Date().getFullYear()} IntimateWellness`,
    updated: posts[0] ? new Date(posts[0].date) : new Date(),
    feedLinks: {
      rss: `${siteUrl}/feed.xml`,
    },
    author: {
      name: "IntimateWellness",
      link: siteUrl,
    },
  });

  for (const post of posts) {
    const author = getAuthorBySlug(post.author);
    feed.addItem({
      title: post.title,
      id: `${siteUrl}/${post.slug}`,
      link: `${siteUrl}/${post.slug}`,
      description: post.excerpt,
      content: post.excerpt,
      author: author ? [{ name: author.name }] : [],
      date: new Date(post.date),
      image: post.coverImage,
      category: [{ name: post.category }],
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
