import { expect, test } from '@playwright/test'

test.describe('Navigation menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('opens with Menu and navigates', async ({ page }) => {
    const menu = page.getByRole('dialog', { name: 'Navigation menu' })
    await expect(menu).toBeHidden()

    await page.getByRole('button', { name: 'Open navigation menu' }).click()
    await expect(menu).toBeVisible()

    await menu.getByRole('link', { name: 'About' }).click()
    await expect(page).toHaveURL(/\/about\/?$/)
  })

  test('closes with the Close button', async ({ page }) => {
    const menu = page.getByRole('dialog', { name: 'Navigation menu' })
    await page.getByRole('button', { name: 'Open navigation menu' }).click()
    await menu.getByRole('button', { name: 'Close' }).click()
    await expect(menu).toBeHidden()
  })

  test('closes with Escape', async ({ page }) => {
    const menu = page.getByRole('dialog', { name: 'Navigation menu' })
    await page.getByRole('button', { name: 'Open navigation menu' }).click()
    await page.keyboard.press('Escape')
    await expect(menu).toBeHidden()
  })
})
