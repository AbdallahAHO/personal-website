import { expect, test } from '@playwright/test'

const SITE_URL = process.env.SMOKE_URL || 'https://abdallahaho.com'

const ogEndpoints = [
  '/og/default.png',
  '/og/about.png',
  '/og/work.png',
  '/og/now.png',
  '/og/blog.png',
  '/og/projects.png',
  '/og/blog/tags.png',
  '/og/blog/getting-started.png',
  '/og/projects/escalay.png',
  '/og/blog/tags/personal.png',
]

test.use({ baseURL: SITE_URL })

for (const endpoint of ogEndpoints) {
  test(`${endpoint} returns valid PNG`, async ({ request }) => {
    const response = await request.get(endpoint)
    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toContain('image/png')

    const body = await response.body()
    expect(body.length).toBeGreaterThan(1024)
  })
}
