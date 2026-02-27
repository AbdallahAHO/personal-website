import { expect, test } from '@playwright/test'

const ogEndpoints = [
  '/og/default.png',
  '/og/about.png',
  '/og/work.png',
  '/og/now.png',
  '/og/blog.png',
  '/og/projects.png',
  '/og/blog/tags.png',
  '/og/blog/getting-started.png',
  '/og/blog/self-hosting-hetzner-coolify.png',
  '/og/projects/escalay.png',
  '/og/projects/personal-website.png',
  '/og/blog/tags/personal.png',
]

for (const endpoint of ogEndpoints) {
  test(`${endpoint} returns valid PNG`, async ({ request }) => {
    const response = await request.get(endpoint)
    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toBe('image/png')

    const body = await response.body()
    expect(body.length).toBeGreaterThan(1024)
  })
}
