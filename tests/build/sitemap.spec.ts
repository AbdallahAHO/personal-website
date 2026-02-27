import { expect, test } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const distDir = join(process.cwd(), 'dist')

test.describe('Sitemap', () => {
  test('sitemap index is valid XML', () => {
    const body = readFileSync(join(distDir, 'sitemap-index.xml'), 'utf-8')
    expect(body).toContain('<?xml')
    expect(body).toContain('sitemapindex')
    expect(body).toContain('sitemap-0.xml')
  })

  test('sitemap-0.xml contains expected URLs', () => {
    const body = readFileSync(join(distDir, 'sitemap-0.xml'), 'utf-8')
    expect(body).toContain('<?xml')
    expect(body).toContain('urlset')

    const expectedPaths = ['/about/', '/work/', '/blog/', '/projects/']
    for (const path of expectedPaths) {
      expect(body).toContain(path)
    }
  })

  test('sitemap URLs all use https and correct domain', () => {
    const body = readFileSync(join(distDir, 'sitemap-0.xml'), 'utf-8')

    const urls = body.match(/<loc>(.*?)<\/loc>/g) || []
    expect(urls.length).toBeGreaterThan(0)
    for (const url of urls) {
      expect(url).toContain('https://')
      expect(url).toContain('abdallahaho.com')
    }
  })
})
