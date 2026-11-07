import { type CollectionEntry, getCollection } from 'astro:content'
import type { APIRoute, GetStaticPaths } from 'astro'
import { ogImageResponse } from '@/og/generate'

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getCollection('projects')
  return projects.map((project) => ({ params: { slug: project.id }, props: { project } }))
}

export const GET: APIRoute = ({ props }) => {
  const { project } = props as { project: CollectionEntry<'projects'> }
  return ogImageResponse({
    title: project.data.title,
    description: project.data.subtitle,
    date: project.data.pubDate,
    badge: 'PROJECT',
  })
}
