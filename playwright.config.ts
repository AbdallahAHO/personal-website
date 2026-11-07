import { defineConfig, devices } from '@playwright/test'

// Own port so a dev server from another project on 4321 never answers the build tests.
const previewPort = 4391

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: `http://localhost:${previewPort}`,
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
        command: `pnpm preview --port ${previewPort}`,
        port: previewPort,
        reuseExistingServer: !process.env.CI,
      },
})
