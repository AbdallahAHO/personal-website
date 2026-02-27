import type { APIRoute } from 'astro'
import { SITE } from '@/constants/site'
import { generateOGImage } from '@/og/generate'

export const GET: APIRoute = async () => {
  const png = await generateOGImage({
    title: 'Blog',
    description: SITE.BLOG_DESCRIPTION,
    badge: 'BLOG',
  })

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  })
}
