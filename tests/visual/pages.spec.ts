import { expect, test } from '@playwright/test'

const pages = [
  { name: 'home', url: '/' },
  { name: 'about', url: '/about' },
  { name: 'blog', url: '/blog' },
  { name: 'projects', url: '/projects' },
  { name: 'work', url: '/work' },
]

for (const page of pages) {
  test(`${page.name} page matches screenshot`, async ({ page: browser }) => {
    await browser.setViewportSize({ width: 1280, height: 720 })
    await browser.goto(page.url)
    await browser.waitForLoadState('networkidle')
    await browser.waitForTimeout(1000)

    await expect(browser).toHaveScreenshot(`${page.name}.png`, {
      fullPage: true,
      threshold: 0.2,
      maxDiffPixelRatio: 0.02,
    })
  })
}

test('home dark mode matches screenshot', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 })
  await page.goto('/')
  await page.waitForLoadState('networkidle')

  const themeToggle = page.locator('[data-theme-toggle]')
  if ((await themeToggle.count()) > 0) {
    await themeToggle.click()
    await page.waitForTimeout(500)
    await expect(page).toHaveScreenshot('home-dark.png', {
      fullPage: true,
      threshold: 0.2,
      maxDiffPixelRatio: 0.02,
    })
  }
})
