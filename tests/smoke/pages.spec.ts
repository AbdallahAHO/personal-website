import { expect, test } from '@playwright/test'

const SITE_URL = process.env.SMOKE_URL || 'https://abdallahaho.com'

const pages = [
  { url: '/', titleContains: 'Abdallah Othman' },
  { url: '/about', titleContains: 'About' },
  { url: '/work', titleContains: 'Abdallah Othman' },
  { url: '/now', titleContains: 'Abdallah Othman' },
  { url: '/blog', titleContains: 'Abdallah Othman' },
  { url: '/projects', titleContains: 'Abdallah Othman' },
  { url: '/blog/tags', titleContains: 'Tag' },
]

test.use({ baseURL: SITE_URL })

for (const page of pages) {
  test(`${page.url} is live and has correct title`, async ({ request }) => {
    const response = await request.get(page.url)
    expect(response.status()).toBe(200)

    const html = await response.text()
    expect(html).toContain('<title>')
    expect(html.toLowerCase()).toContain(page.titleContains.toLowerCase())
  })
}
