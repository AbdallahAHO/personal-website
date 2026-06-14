import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
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
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
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
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
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
  loader: glob({ pattern: '**/*.md', base: './src/content/now' }),
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
