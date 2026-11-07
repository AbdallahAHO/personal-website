import { defineConfig, devices } from '@playwright/test'

// Own port so another project's dev server on 4321 never answers; --ignore-lock keeps
// Astro from auto-backgrounding the preview server when an agent runs the tests.
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
        command: `pnpm preview --port ${previewPort} --ignore-lock`,
        port: previewPort,
        reuseExistingServer: !process.env.CI,
      },
})
