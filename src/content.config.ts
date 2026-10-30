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
    cover_placeholder: z.string().optional(),
    cover_caption: z.string().optional(),
    categories: z.array(z.string()).default(["others"]),
    tags: z.array(z.string()).default(["others"]),
    draft: z.boolean().optional(),
    heading: z.string().optional(),
    empty_message: z.string().optional(),
    newer_label: z.string().optional(),
    older_label: z.string().optional(),
    all_posts_label: z.string().optional(),
    toc_label: z.string().optional(),
    previous_label: z.string().optional(),
    next_label: z.string().optional(),
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
  homepage: defineCollection({
    loader: loader("homepage"),
    schema: z.object({
      banner: z.object({
        label: z.string(),
        title: z.string(),
        title_second_line: z.string(),
        description: z.string(),
        primary_button: z.object({ label: z.string(), link: z.string() }),
        secondary_button: z.object({ label: z.string(), link: z.string() }),
      }),
      about: z.object({
        enable: z.boolean(),
        title: z.string(),
        title_second_line: z.string(),
        image: z.string(),
        image_alt: z.string(),
        paragraphs: z.array(z.string()),
      }),
      businesses: z.object({
        enable: z.boolean(),
        label: z.string(),
        title: z.string(),
        items: z.array(
          z.object({
            title: z.string(),
            period: z.string(),
            featured: z.boolean(),
            link: z.string(),
            link_label: z.string(),
            description: z.string(),
          }),
        ),
      }),
      values: z.object({
        enable: z.boolean(),
        label: z.string(),
        title: z.string(),
        items: z.array(
          z.object({ title: z.string(), description: z.string() }),
        ),
      }),
      interests: z.object({
        enable: z.boolean(),
        label: z.string(),
        title: z.string(),
        images: z.array(z.object({ image: z.string(), alt: z.string() })),
      }),
      connect: z.object({
        enable: z.boolean(),
        label: z.string(),
        title: z.string(),
        description: z.string(),
        button: z.object({ label: z.string(), link: z.string() }),
      }),
    }),
  }),
  contact: defineCollection({
    loader: loader("contact"),
    schema: z.object({
      title: z.string(),
      title_second_line: z.string(),
      meta_title: z.string(),
      description: z.string(),
      form: z.object({
        name_label: z.string(),
        name_placeholder: z.string(),
        email_label: z.string(),
        email_placeholder: z.string(),
        message_label: z.string(),
        message_placeholder: z.string(),
        submit_label: z.string(),
        sending_label: z.string(),
        success_message: z.string(),
        error_message: z.string(),
        email_subject: z.string(),
      }),
    }),
  }),
  site: defineCollection({
    loader: loader("site"),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      name: z.string(),
      header_logo: z.string(),
      footer_logo: z.string(),
      navigation: z.array(z.object({ label: z.string(), link: z.string() })),
      contact_button: z.object({ label: z.string(), link: z.string() }),
      socials: z.array(
        z.object({ name: z.string(), icon: z.string(), link: z.string() }),
      ),
      calendar: z.object({ label: z.string(), link: z.string() }),
    }),
  }),
  sections: defineCollection({ loader: loader("sections") }),
};
