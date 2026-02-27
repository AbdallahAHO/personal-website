import { expect, test } from '@playwright/test'

test.describe('RSS Feed', () => {
  test('returns valid XML with channel info', async ({ request }) => {
    const response = await request.get('/rss.xml')
    expect(response.status()).toBe(200)

    const body = await response.text()
    expect(body).toContain('<?xml')
    expect(body).toContain('<channel>')
    expect(body).toContain('<title>')
    expect(body).toContain('<description>')
  })

  test('contains blog post items', async ({ request }) => {
    const response = await request.get('/rss.xml')
    const body = await response.text()

    expect(body).toContain('<item>')
    expect(body).toContain('<pubDate>')
    expect(body).toContain('<link>')

    expect(body).toContain('getting-started')
    expect(body).toContain('self-hosting-hetzner-coolify')
  })
})
