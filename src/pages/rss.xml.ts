import { getCollection } from 'astro:content'
import rss from '@astrojs/rss'

export async function GET(context: { site: string }) {
  const blog = await getCollection('blog')

  return rss({
    title: 'Abdallah Othman',
    description:
      'Personal website of Abdallah Othman - Senior Frontend Engineer and Technical Lead. Thoughts, projects, and insights on web development, Growth Engineering, and AI.',
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
  })
}
