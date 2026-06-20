// Build-time content loader. Reads Markdown chant files from /posts, parses the
// YAML front matter with gray-matter, and returns typed Post objects. Runs only
// on the server during the static export, so Node's fs access is safe here.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Post, PostMeta, Verse } from "./types";

const POSTS_DIR = path.join(process.cwd(), "posts");

/** All chant slugs derived from filenames in /posts (without extension). */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

/** Load and parse a single chant by slug. Throws if the file is missing. */
export function getPost(slug: string): Post {
  const fullPath = path.join(POSTS_DIR, `${slug}.md`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const meta = data as PostMeta & { verses?: Verse[] };

  return {
    title: meta.title,
    slug,
    category: meta.category,
    deity: meta.deity,
    source: meta.source,
    description: meta.description,
    difficulty: meta.difficulty,
    order: meta.order,
    verses: meta.verses ?? [],
    body: content.trim() || undefined,
  };
}

/** All chants, ordered by their `order` field then title. */
export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map(getPost)
    .sort((a, b) => {
      const byOrder = (a.order ?? 999) - (b.order ?? 999);
      return byOrder !== 0 ? byOrder : a.title.localeCompare(b.title);
    });
}

/** Chants grouped by their category, preserving order within each group. */
export function getPostsByCategory(): { category: string; posts: Post[] }[] {
  const groups = new Map<string, Post[]>();
  for (const post of getAllPosts()) {
    const list = groups.get(post.category) ?? [];
    list.push(post);
    groups.set(post.category, list);
  }
  return [...groups.entries()].map(([category, posts]) => ({ category, posts }));
}
