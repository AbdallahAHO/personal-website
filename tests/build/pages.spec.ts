import { expect, test } from '@playwright/test'

const pages = [
  { url: '/', title: 'Abdallah Othman' },
  { url: '/about', title: 'About Abdallah Othman' },
  { url: '/work', title: 'Abdallah Othman' },
  { url: '/now', title: 'Abdallah Othman' },
  { url: '/blog/home', title: 'Abdallah Othman' },
  { url: '/blog/getting-started', title: 'Blog' },
  { url: '/blog/self-hosting-hetzner-coolify', title: 'Blog' },
  { url: '/projects/home', title: 'Abdallah Othman' },
  { url: '/projects/escalay', title: 'Projects' },
  { url: '/projects/personal-website', title: 'Projects' },
  { url: '/blog/tags', title: 'Tag' },
  { url: '/blog/tags/personal', title: 'personal' },
]

for (const page of pages) {
  test(`${page.url} returns 200 with correct title`, async ({ page: browser }) => {
    const response = await browser.goto(page.url)
    expect(response?.status()).toBe(200)

    const title = await browser.title()
    expect(title).toContain(page.title)

    const h1Count = await browser.locator('h1').count()
    expect(h1Count).toBeGreaterThan(0)
  })
}
