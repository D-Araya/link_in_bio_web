import { defineConfig, devices } from '@playwright/test'

const externalServer = process.env.E2E_BASE_URL

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: externalServer || 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Desktop Chrome'], viewport: { width: 320, height: 740 }, isMobile: true, hasTouch: true } },
  ],
  webServer: externalServer ? undefined : {
    command: 'node scripts/serve-dist.mjs',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: false,
  },
})
