import type { Metadata } from "next";
import SearchClient from "@/components/SearchClient";
import { getSearchIndex } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the IntimateWellness article archive.",
};

export default function SearchPage() {
  const posts = getSearchIndex();
  return <SearchClient posts={posts} />;
}
