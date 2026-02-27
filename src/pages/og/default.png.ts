import type { APIRoute } from 'astro'
import { SITE } from '@/constants/site'
import { generateOGImage } from '@/og/generate'

export const GET: APIRoute = async () => {
  const png = await generateOGImage({
    title: SITE.NAME,
    description: SITE.DESCRIPTION,
  })

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  })
}
