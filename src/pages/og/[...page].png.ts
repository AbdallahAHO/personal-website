import type { APIRoute, GetStaticPaths } from 'astro'
import { SITE } from '@/constants/site'
import { type OGImageOptions, ogImageResponse } from '@/og/generate'

/** Social cards for the fixed pages, keyed by their path under /og/. */
const cards: Record<string, OGImageOptions> = {
  default: { title: SITE.NAME, description: SITE.DESCRIPTION },
  about: {
    title: 'About',
    description:
      'Software Engineer from Egypt to Hamburg, building products, leading teams, and writing about it.',
    badge: 'ABOUT',
  },
  work: {
    title: 'Work Experience',
    description:
      'Career journey through tech, from Alexandria to Hamburg, building products at scale.',
    badge: 'WORK',
  },
  projects: {
    title: 'Projects',
    description: 'Selected projects and side work.',
    badge: 'PROJECTS',
  },
  blog: { title: 'Blog', description: SITE.BLOG_DESCRIPTION, badge: 'BLOG' },
  'blog/tags': { title: 'Tags', description: 'Browse articles by topic.', badge: 'TAGS' },
  now: {
    title: 'Now',
    description: "What I'm currently focused on: projects, interests, and what's keeping me busy.",
    badge: 'NOW',
  },
}

export const getStaticPaths: GetStaticPaths = () =>
  Object.entries(cards).map(([page, card]) => ({ params: { page }, props: { card } }))

export const GET: APIRoute = ({ props }) => ogImageResponse(props.card as OGImageOptions)
