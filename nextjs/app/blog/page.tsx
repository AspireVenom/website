import { headers } from "next/headers";
import { listPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

function getBasePath(host?: string): string {
  if (!host) return "/blog";
  return host.startsWith("blog.") ? "" : "/blog";
}

export default async function BlogIndex() {
  const posts = await listPosts();
  const hdrs = await headers();
  const host = hdrs.get("host") || undefined;
  const basePath = getBasePath(host);
  return (
    <main className="blog-container">
      <header className="blog-hero">
        <h1 className="blog-transition-target">Blog</h1>
        <p>Notes on engineering, design, and learning in public.</p>
      </header>
      <ul className="blog-list">
        {posts.map((post) => (
          <li key={post.slug} className="blog-item">
            <a href={`${basePath}/${post.slug}`} className="blog-link">
              <h2>{post.meta.title}</h2>
              {post.meta.description ? <p>{post.meta.description}</p> : null}
              <small>{post.meta.date}</small>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}


