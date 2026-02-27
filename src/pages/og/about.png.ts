import type { APIRoute } from 'astro'
import { generateOGImage } from '@/og/generate'

export const GET: APIRoute = async () => {
  const png = await generateOGImage({
    title: 'About',
    description:
      'Software Engineer from Egypt to Hamburg — building products, leading teams, and writing about it.',
    badge: 'ABOUT',
  })

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  })
}
