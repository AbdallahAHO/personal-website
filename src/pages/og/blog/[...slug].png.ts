import type { APIRoute, GetStaticPaths } from 'astro'
import { getCollection, type CollectionEntry } from 'astro:content'
import { generateOGImage } from '@/og/generate'

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog')
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }))
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: CollectionEntry<'blog'> }

  const png = await generateOGImage({
    title: post.data.title,
    description: post.data.description,
    date: post.data.pubDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    badge: 'BLOG',
  })

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  })
}
