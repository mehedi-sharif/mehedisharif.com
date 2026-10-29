import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const loader = (name: string) =>
  glob({
    base: `./src/content/${name}`,
    pattern: "**/*.{md,mdx}",
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ""),
  });

// Post collection schema
const blogCollection = defineCollection({
  loader: loader("posts"),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    date: z.date().optional(),
    image: z.string().optional(),
    author: z.string().default("Admin"),
    categories: z.array(z.string()).default(["others"]),
    tags: z.array(z.string()).default(["others"]),
    draft: z.boolean().optional(),
  }),
});

// Pages collection schema
const pagesCollection = defineCollection({
  loader: loader("pages"),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

// Export collections
export const collections = {
  posts: blogCollection,
  pages: pagesCollection,
  homepage: defineCollection({ loader: loader("homepage") }),
  contact: defineCollection({ loader: loader("contact") }),
  sections: defineCollection({ loader: loader("sections") }),
};
