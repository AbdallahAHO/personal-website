import { getCollection } from 'astro:content'
import type { APIRoute, GetStaticPaths } from 'astro'
import { ogImageResponse } from '@/og/generate'

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog')
  const tags = [...new Set(posts.flatMap((post) => post.data.tags ?? []))]
  return tags.map((tag) => ({ params: { tag }, props: { tag } }))
}

export const GET: APIRoute = ({ props }) => {
  const { tag } = props as { tag: string }
  return ogImageResponse({
    title: tag.charAt(0).toUpperCase() + tag.slice(1),
    description: `Articles tagged with ${tag}.`,
    badge: 'TAG',
  })
}
