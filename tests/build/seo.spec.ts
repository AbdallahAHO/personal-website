import { expect, test } from '@playwright/test'

const seoPages = [
  { url: '/', ogImageContains: '/og/default.png' },
  { url: '/about', ogImageContains: '/og/about.png' },
  { url: '/blog/getting-started', ogImageContains: '/og/blog/' },
  { url: '/projects/escalay', ogImageContains: '/og/projects/' },
]

for (const page of seoPages) {
  test.describe(`SEO: ${page.url}`, () => {
    test('has required meta tags', async ({ page: browser }) => {
      await browser.goto(page.url)

      const ogTitle = await browser.locator('meta[property="og:title"]').getAttribute('content')
      expect(ogTitle).toBeTruthy()

      const ogDescription = await browser
        .locator('meta[property="og:description"]')
        .getAttribute('content')
      expect(ogDescription).toBeTruthy()

      const ogImage = await browser.locator('meta[property="og:image"]').getAttribute('content')
      expect(ogImage).toBeTruthy()
      expect(ogImage).toContain('abdallahaho.com')
      expect(ogImage).toContain(page.ogImageContains)

      const ogType = await browser.locator('meta[property="og:type"]').getAttribute('content')
      expect(ogType).toBeTruthy()

      const twitterCard = await browser.locator('meta[name="twitter:card"]').getAttribute('content')
      expect(twitterCard).toBe('summary_large_image')

      const description = await browser
        .locator('meta[name="description"]')
        .first()
        .getAttribute('content')
      expect(description).toBeTruthy()
    })
  })
}
