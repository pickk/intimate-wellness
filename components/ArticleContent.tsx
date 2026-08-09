import { MDXRemote } from "next-mdx-remote/rsc";
import mdxComponents from "@/mdx-components";

export default function ArticleContent({ source }: { source: string }) {
  return (
    <div className="prose-wellness">
      <MDXRemote source={source} components={mdxComponents} />
    </div>
  );
}
