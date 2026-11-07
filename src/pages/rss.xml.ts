import { getCollection } from 'astro:content'
import rss from '@astrojs/rss'

export async function GET(context: { site: string }) {
  const blog = (await getCollection('blog')).sort(
    (a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
  )

  return rss({
    title: 'Abdallah Othman',
    description:
      'Personal website of Abdallah Othman, product engineer in Hamburg. Thoughts, projects, and insights on web development, Growth Engineering, and AI.',
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
  })
}
