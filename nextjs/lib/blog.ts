import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export type FrontMatter = {
  title: string;
  description?: string;
  date: string;
};

export async function listPosts(): Promise<Array<{ slug: string; meta: FrontMatter }>> {
  const files = await fs.readdir(CONTENT_DIR);
  const mdxFiles = files.filter((f) => f.endsWith(".mdx"));
  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const full = path.join(CONTENT_DIR, file);
      const raw = await fs.readFile(full, "utf8");
      const { data } = matter(raw);
      const d = (data as any).date;
      const dateStr = typeof d === "string" ? d : d instanceof Date ? d.toISOString().slice(0, 10) : "";
      return {
        slug: file.replace(/\.mdx$/, ""),
        meta: { ...(data as Omit<FrontMatter, "date">), date: dateStr },
      };
    })
  );
  return posts.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<{ content: string; meta: FrontMatter }> {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const raw = await fs.readFile(filePath, "utf8");
  const { content, data } = matter(raw);
  const d = (data as any).date;
  const dateStr = typeof d === "string" ? d : d instanceof Date ? d.toISOString().slice(0, 10) : "";
  return { content, meta: { ...(data as Omit<FrontMatter, "date">), date: dateStr } };
}


