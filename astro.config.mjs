import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import devtoolsJson from 'vite-plugin-devtools-json'

export default defineConfig({
  // Keep HTML-aware whitespace; Astro 7's 'jsx' default glues inline text together.
  compressHTML: true,
  markdown: {
    shikiConfig: {
      theme: 'css-variables',
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss(), devtoolsJson({ uuid: '6722dc0b-b5b2-4d99-a7bf-0733ae915756' })],
  },
  site: 'https://abdallahaho.com',
  integrations: [
    sitemap({
      serialize(item) {
        // Set priorities based on page importance
        if (item.url === 'https://abdallahaho.com/') {
          item.priority = 1.0
        } else if (item.url.includes('/blog/') && !item.url.includes('/tags/')) {
          item.priority = 0.8
        } else if (
          item.url.includes('/projects/') ||
          item.url.includes('/about/') ||
          item.url.includes('/work/')
        ) {
          item.priority = 0.7
        } else if (item.url.includes('/blog/') || item.url.includes('/projects/')) {
          item.priority = 0.6
        } else {
          item.priority = 0.5
        }

        // No lastmod: stamping build time on every URL marked the whole
        // site as freshly modified on each deploy, which dilutes the signal.
        return item
      },
    }),
    mdx(),
  ],
})
