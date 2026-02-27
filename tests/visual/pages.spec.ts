import { expect, test } from '@playwright/test'

const pages = [
  { name: 'home', url: '/' },
  { name: 'about', url: '/about' },
  { name: 'blog', url: '/blog' },
  { name: 'projects', url: '/projects' },
  { name: 'work', url: '/work' },
]

const viewports = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 667 },
]

for (const page of pages) {
  test.describe(`${page.name} page`, () => {
    for (const viewport of viewports) {
      test(`should look correct on ${viewport.name}`, async ({ page: browser }) => {
        await browser.setViewportSize({ width: viewport.width, height: viewport.height })
        await browser.goto(page.url)
        await browser.waitForLoadState('networkidle')

        // Wait for fonts and images to load
        await browser.waitForTimeout(1000)

        await expect(browser).toHaveScreenshot(`${page.name}-${viewport.name}.png`, {
          fullPage: true,
          threshold: 0.2,
        })
      })
    }
  })
}

test.describe('Interactive elements', () => {
  test('theme toggle should work correctly', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Test dark mode toggle
    const themeToggle = page.locator('[data-theme-toggle]')
    if ((await themeToggle.count()) > 0) {
      await themeToggle.click()
      await page.waitForTimeout(500)
      await expect(page).toHaveScreenshot('home-dark-mode.png', {
        fullPage: true,
        threshold: 0.2,
      })
    }
  })
})
