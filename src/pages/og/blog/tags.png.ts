import type { APIRoute } from 'astro'
import { generateOGImage } from '@/og/generate'

export const GET: APIRoute = async () => {
  const png = await generateOGImage({
    title: 'Tags',
    description: 'Browse articles by topic.',
    badge: 'TAGS',
  })

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  })
}
