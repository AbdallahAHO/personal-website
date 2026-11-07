import { type CollectionEntry, getCollection } from 'astro:content'
import type { APIRoute, GetStaticPaths } from 'astro'
import { ogImageResponse } from '@/og/generate'

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog')
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }))
}

export const GET: APIRoute = ({ props }) => {
  const { post } = props as { post: CollectionEntry<'blog'> }
  return ogImageResponse({
    title: post.data.title,
    description: post.data.description,
    date: post.data.pubDate,
    badge: 'BLOG',
  })
}
