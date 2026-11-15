import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { setTimeout } from 'node:timers/promises'

const image = process.argv[2]
if (!image) throw new Error('Usage: node scripts/verify-container.mjs IMAGE')
const docker = (...args) => execFileSync('docker', args, { encoding: 'utf8', timeout: 30000 }).trim()
let container
try {
  container = docker('run', '--detach', '--rm', '--read-only', '--tmpfs', '/tmp:rw,noexec,nosuid,size=16m', '--cap-drop=ALL', '--security-opt=no-new-privileges:true', '--publish', '127.0.0.1::8080', image)
  const port = docker('port', container, '8080/tcp').split(':').at(-1)
  const base = 'http://127.0.0.1:' + port
  let ready = false
  for (let attempt = 0; attempt < 40; attempt++) {
    try { ready = (await fetch(base + '/health', { signal: AbortSignal.timeout(1000) })).ok } catch { /* retry startup */ }
    if (ready) break
    await setTimeout(250)
  }
  assert.ok(ready, 'Container did not become healthy')
  assert.notEqual(docker('exec', container, 'id', '-u'), '0', 'Nginx must not run as root')
  docker('exec', container, 'nginx', '-t')

  const get = async (path) => {
    const response = await fetch(base + path, { signal: AbortSignal.timeout(5000) })
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff', path)
    assert.equal(response.headers.get('x-frame-options'), 'DENY', path)
    const csp = response.headers.get('content-security-policy')
    assert.ok(csp?.includes("script-src 'self'"), path)
    assert.ok(!csp.includes('unsafe-'), path)
    return response
  }
  const html = await get('/')
  assert.equal(html.status, 200)
  assert.match(html.headers.get('content-type'), /text\/html/)
  assert.equal(html.headers.get('cache-control'), 'no-cache')
  const document = await html.text()
  assert.match(document, /Rastro Sureño/)
  for (const [, url] of document.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const path = new URL(url, base + '/').pathname
    const response = await get(path)
    assert.equal(response.status, 200, path)
    if (path.endsWith('.js')) assert.match(response.headers.get('content-type'), /javascript/)
    if (path.endsWith('.css')) assert.match(response.headers.get('content-type'), /text\/css/)
    if (path.startsWith('/assets/')) assert.match(response.headers.get('cache-control'), /immutable/)
    else assert.equal(response.headers.get('cache-control'), 'no-cache')
  }
  // Verify the imported (hashed) image too, not just resources listed in HTML.
  const assets = docker('exec', container, 'ls', '/usr/share/nginx/html/assets').split('\n')
  const logo = assets.find(name => /^logo_rastro_sureno-.+\.jpg$/.test(name))
  assert.ok(logo, 'Missing hashed logo')
  const imageResponse = await get('/assets/' + logo)
  assert.equal(imageResponse.status, 200)
  assert.match(imageResponse.headers.get('content-type'), /image\/jpeg/)
  assert.match(imageResponse.headers.get('cache-control'), /immutable/)
  assert.equal((await get('/assets/missing-script.js')).status, 404)
  assert.equal((await get('/.htaccess')).status, 403)
  assert.equal((await get('/health')).status, 200)
  console.log(JSON.stringify({ image, uid: docker('exec', container, 'id', '-u'), readOnly: true, checks: 'HTML, JS, CSS, logo, favicon, health, CSP, headers, cache, 404, dotfiles', result: 'PASS' }))
} catch (error) {
  if (container) {
    try { console.error(docker('logs', container)) } catch { /* preserve original error */ }
  }
  throw error
} finally {
  if (container) docker('stop', container)
}
