import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // Only start preview server for build tests (smoke tests hit production directly)
  webServer: process.env.SMOKE_URL
    ? undefined
    : {
        command: 'pnpm preview',
        port: 4321,
        reuseExistingServer: !process.env.CI,
      },
})
