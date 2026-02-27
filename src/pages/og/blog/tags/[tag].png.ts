import type { APIRoute, GetStaticPaths } from 'astro'
import { getCollection } from 'astro:content'
import { generateOGImage } from '@/og/generate'

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog')
  const tags = [...new Set(posts.flatMap((post) => post.data.tags || []))]
  return tags.map((tag) => ({
    params: { tag },
    props: { tag },
  }))
}

export const GET: APIRoute = async ({ props }) => {
  const { tag } = props as { tag: string }
  const label = tag.charAt(0).toUpperCase() + tag.slice(1)

  const png = await generateOGImage({
    title: label,
    description: `Articles tagged with ${tag}.`,
    badge: 'TAG',
  })

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  })
}
