import { defineCollection, z } from 'astro:content'

const projects = defineCollection({
  schema: z.object({
    // SEO-optimized fields (for search engines)
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    seoTags: z.array(z.string()).optional(),

    // User-facing fields (elegant and classy)
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    tags: z.array(z.string()).optional(),

    // Common fields
    pubDate: z.date(),
    live: z.string().optional(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
  }),
})

const blog = defineCollection({
  schema: z.object({
    // SEO-optimized fields (for search engines)
    seoTitle: z.string(),
    seoDescription: z.string(),
    seoTags: z.array(z.string()).optional(),

    // User-facing fields (elegant and classy)
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).optional(),

    // Common fields
    pubDate: z.date(),
    slug: z.string().optional(),
    image: z
      .object({
        url: z.string(),
        alt: z.string(),
      })
      .optional(),
  }),
})

const work = defineCollection({
  schema: z.object({
    pubDate: z.date(),
    title: z.string(),
    subtitle: z.string(),
    dateStart: z.string(),
    dateEnd: z.string(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
  }),
})

const now = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    lastUpdated: z.string(),
  }),
})

export const collections = {
  projects: projects,
  blog: blog,
  work: work,
  now: now,
}
