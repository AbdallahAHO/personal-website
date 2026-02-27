import type { APIRoute } from 'astro'
import { generateOGImage } from '@/og/generate'

export const GET: APIRoute = async () => {
  const png = await generateOGImage({
    title: 'Work Experience',
    description:
      'Career journey through tech — from Alexandria to Hamburg, building products at scale.',
    badge: 'WORK',
  })

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  })
}
