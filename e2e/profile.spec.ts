import { test, expect } from '@playwright/test'

const mounts = process.env.E2E_ROOT_ONLY ? ['/'] : ['/', '/link_in_bio_web/']

for (const mount of mounts) {
  test(`loads the production page and every resource at ${mount}`, async ({ page, baseURL }) => {
    const errors: string[] = []
    const requests: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    page.on('requestfailed', request => errors.push(request.url()))
    page.on('response', response => { if (response.status() >= 400) errors.push(response.url()) })
    page.on('request', request => requests.push(request.url()))
    await page.goto(mount)
    await expect(page.getByRole('heading', { name: 'Rastro Sureño', level: 1 })).toBeVisible()
    await expect(page).toHaveTitle('Rastro Sureño | Enlaces y contacto')
    await expect(page.locator('html')).toHaveAttribute('lang', 'es')
    await expect(page.getByRole('link')).toHaveCount(6)
    const logo = page.getByRole('img', { name: 'Logo de Rastro Sureño' })
    await expect(logo).toHaveJSProperty('naturalWidth', 1056)
    expect(await logo.getAttribute('src')).toMatch(/logo_rastro_sureno-[\w-]+\.jpg/)
    await expect(page.locator('[style]')).toHaveCount(0)
    const faviconURL = await page.locator('link[rel="icon"]').evaluate((el: HTMLLinkElement) => el.href)
    expect((await page.request.get(faviconURL)).status()).toBe(200)
    expect(requests.every(url => new URL(url).origin === new URL(baseURL!).origin)).toBe(true)
    expect(errors).toEqual([])
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  })

  test(`keyboard navigation and motion preference work at ${mount}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(mount)
    const links = page.getByRole('link')
    for (const link of await links.all()) {
      await page.keyboard.press('Tab')
      await expect(link).toBeFocused()
    }
    const active = page.getByRole('link', { name: /WhatsApp/ })
    expect(await active.evaluate(el => getComputedStyle(el).outlineStyle)).not.toBe('none')
    expect(await active.evaluate(el => getComputedStyle(el).transitionDuration)).toBe('0s')
  })

  test(`WhatsApp opens the confirmed number without contacting the service at ${mount}`, async ({ page, context }) => {
    await context.route('https://wa.me/**', route => route.fulfill({ contentType: 'text/html', body: '<title>Prueba local</title>' }))
    await page.goto(mount)
    const popupPromise = page.waitForEvent('popup')
    await page.getByRole('link', { name: /WhatsApp/ }).click()
    const popup = await popupPromise
    await popup.waitForLoadState()
    expect(popup.url()).toBe('https://wa.me/56993504989')
    expect(await popup.evaluate(() => window.opener)).toBeNull()
    await popup.close()
  })
}

test('missing scripts return 404 instead of an HTML fallback', async ({ request }) => {
  const response = await request.get('/assets/missing-script.js')
  expect(response.status()).toBe(404)
})
