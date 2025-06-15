import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import devtoolsJson from 'vite-plugin-devtools-json'

export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'css-variables',
      wrap: true,
      skipInline: false,
    },
  },
  vite: {
    plugins: [tailwindcss(), devtoolsJson({ uuid: '6722dc0b-b5b2-4d99-a7bf-0733ae915756' })],
    build: {
      rollupOptions: {
        output: {
          // Configure cache-friendly file names with content hashes
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && /\.(css|js)$/.test(assetInfo.name)) {
              return '_astro/[name].[hash][extname]'
            }
            return 'assets/[name].[hash][extname]'
          },
          chunkFileNames: '_astro/[name].[hash].js',
          entryFileNames: '_astro/[name].[hash].js'
        }
      }
    },
    preview: {
      cors: {
        origin: 'https://abdallahaho.com',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type'],
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 204,
        maxAge: 3600,
      },
      allowedHosts: ['abdallahaho.com'],
    },
  },
  site: 'https://abdallahaho.com',
  integrations: [
    sitemap({
      customPages: [
        'https://abdallahaho.com/',
        'https://abdallahaho.com/about/',
        'https://abdallahaho.com/work/',
        'https://abdallahaho.com/blog/',
        'https://abdallahaho.com/projects/',
        'https://abdallahaho.com/now/',
      ],
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

        // Add lastmod date
        item.lastmod = new Date().toISOString()

        return item
      },
    }),
    mdx(),
  ],
})
