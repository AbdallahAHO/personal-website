import { expect, test } from '@playwright/test'

const SITE_URL = process.env.SMOKE_URL || 'https://abdallahaho.com'

test.use({ baseURL: SITE_URL })

test.describe('Sitemap', () => {
  test('sitemap index is accessible and valid', async ({ request }) => {
    const response = await request.get('/sitemap-index.xml')
    expect(response.status()).toBe(200)

    const body = await response.text()
    expect(body).toContain('<?xml')
    expect(body).toContain('sitemapindex')
    expect(body).toContain('sitemap-0.xml')
  })

  test('sitemap-0 contains key pages with correct domain', async ({ request }) => {
    const response = await request.get('/sitemap-0.xml')
    expect(response.status()).toBe(200)

    const body = await response.text()
    expect(body).toContain('urlset')

    const expectedPaths = ['/about/', '/work/', '/blog/', '/projects/']
    for (const path of expectedPaths) {
      expect(body).toContain(path)
    }

    const urls = body.match(/<loc>(.*?)<\/loc>/g) || []
    expect(urls.length).toBeGreaterThan(5)
    for (const url of urls) {
      expect(url).toContain('https://')
      expect(url).toContain('abdallahaho.com')
    }
  })
})

test.describe('RSS Feed', () => {
  test('returns valid XML with channel and items', async ({ request }) => {
    const response = await request.get('/rss.xml')
    expect(response.status()).toBe(200)

    const body = await response.text()
    expect(body).toContain('<?xml')
    expect(body).toContain('<channel>')
    expect(body).toContain('<title>')
    expect(body).toContain('<description>')
    expect(body).toContain('<item>')
    expect(body).toContain('<pubDate>')
  })
})
