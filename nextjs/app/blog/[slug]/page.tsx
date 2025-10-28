import { getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export const dynamic = "force-dynamic";

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="blog-h1" {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="blog-h2" {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="blog-p" {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a className="blog-a" {...props} />,
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => <pre className="blog-pre" {...props} />,
  code: (props: React.HTMLAttributes<HTMLElement>) => <code className="blog-code" {...props} />,
};

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slug) {
    notFound();
  }
  let content: string;
  let meta: { title: string; description?: string; date: string };
  try {
    ({ content, meta } = await getPostBySlug(slug));
  } catch {
    notFound();
  }
  return (
    <>
      <article className="blog-article">
      <header className="blog-post-header">
        <h1 style={{ viewTransitionName: `post-title` }}>{meta.title}</h1>
        {meta.description ? <p className="blog-desc">{meta.description}</p> : null}
        <small className="blog-date">{meta.date}</small>
      </header>
      <MDXRemote
        source={content}
        components={components}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings] } }}
      />
      </article>
    </>
  );
}


