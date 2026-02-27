import type { APIRoute } from 'astro'
import { generateOGImage } from '@/og/generate'

export const GET: APIRoute = async () => {
  const png = await generateOGImage({
    title: 'Projects',
    description: 'Selected projects and side work.',
    badge: 'PROJECTS',
  })

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  })
}
