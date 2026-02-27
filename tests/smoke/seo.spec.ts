import { expect, test } from '@playwright/test'

const SITE_URL = process.env.SMOKE_URL || 'https://abdallahaho.com'

const seoPages = [
  { url: '/', ogImageContains: '/og/default.png', ogType: 'website' },
  { url: '/about', ogImageContains: '/og/about.png', ogType: 'website' },
  { url: '/work', ogImageContains: '/og/work.png', ogType: 'website' },
  { url: '/blog/getting-started', ogImageContains: '/og/blog/', ogType: 'blogposting' },
  { url: '/projects/escalay', ogImageContains: '/og/projects/', ogType: 'article' },
]

test.use({ baseURL: SITE_URL })

function meta(html: string, attr: string, value: string): string | null {
  const re = new RegExp(`<meta[^>]+${attr}=["']${value}["'][^>]+content=["']([^"']+)["']`, 'i')
  const altRe = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+${attr}=["']${value}["']`, 'i')
  return re.exec(html)?.[1] ?? altRe.exec(html)?.[1] ?? null
}

for (const page of seoPages) {
  test.describe(`SEO: ${page.url}`, () => {
    let html: string

    test.beforeAll(async ({ request }) => {
      const response = await request.get(page.url)
      html = await response.text()
    })

    test('has og:title, og:description, og:type', () => {
      expect(meta(html, 'property', 'og:title')).toBeTruthy()
      expect(meta(html, 'property', 'og:description')).toBeTruthy()
      expect(meta(html, 'property', 'og:type')?.toLowerCase()).toContain(page.ogType)
    })

    test('og:image is absolute URL on correct domain', () => {
      const ogImage = meta(html, 'property', 'og:image')
      expect(ogImage).toBeTruthy()
      expect(ogImage).toContain('abdallahaho.com')
      expect(ogImage).toContain(page.ogImageContains)
    })

    test('twitter card is summary_large_image', () => {
      expect(meta(html, 'name', 'twitter:card')).toBe('summary_large_image')
    })

    test('has meta description', () => {
      expect(meta(html, 'name', 'description')).toBeTruthy()
    })

    test('has canonical URL', () => {
      const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)
      expect(canonical?.[1]).toBeTruthy()
      expect(canonical?.[1]).toContain('abdallahaho.com')
    })

    test('robots allows indexing', () => {
      const robots = meta(html, 'name', 'robots')
      expect(robots).toContain('index')
      expect(robots).toContain('follow')
    })
  })
}
