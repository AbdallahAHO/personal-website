import type { APIRoute } from 'astro'
import { generateOGImage } from '@/og/generate'

export const GET: APIRoute = async () => {
  const png = await generateOGImage({
    title: 'Now',
    description: "What I'm currently focused on — projects, interests, and what's keeping me busy.",
    badge: 'NOW',
  })

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  })
}
