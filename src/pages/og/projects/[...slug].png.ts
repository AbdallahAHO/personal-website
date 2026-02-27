import type { APIRoute, GetStaticPaths } from 'astro'
import { getCollection, type CollectionEntry } from 'astro:content'
import { generateOGImage } from '@/og/generate'

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getCollection('projects')
  return projects.map((project) => ({
    params: { slug: project.slug },
    props: { project },
  }))
}

export const GET: APIRoute = async ({ props }) => {
  const { project } = props as { project: CollectionEntry<'projects'> }

  const png = await generateOGImage({
    title: project.data.title,
    description: project.data.subtitle,
    date: project.data.pubDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    badge: 'PROJECT',
  })

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  })
}
