import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
import devtoolsJson from 'vite-plugin-devtools-json'

export default defineConfig({
  markdown: {
    drafts: true,
    shikiConfig: {
      theme: 'css-variables',
    },
  },
  vite: {
    plugins: [tailwindcss(), devtoolsJson({ uuid: '6722dc0b-b5b2-4d99-a7bf-0733ae915756' })],
  },
  shikiConfig: {
    wrap: true,
    skipInline: false,
    drafts: true,
  },
  site: 'https://abdallahaho.com',
  integrations: [sitemap(), mdx()],
})
