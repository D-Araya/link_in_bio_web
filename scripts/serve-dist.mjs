// Test-only static server. It deliberately serves no SPA fallback.
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'

const root = resolve('dist')
await stat(resolve(root, 'index.html'))
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg' }
const mount = '/link_in_bio_web'

const server = createServer(async (request, response) => {
  try {
    let pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
    if (pathname === mount) {
      response.writeHead(308, { Location: mount + '/' }).end()
      return
    }
    if (pathname.startsWith(mount + '/')) pathname = pathname.slice(mount.length)
    if (pathname === '/') pathname = '/index.html'
    const file = resolve(root, '.' + pathname)
    if (!file.startsWith(root + sep) || pathname.split('/').some(part => part.startsWith('.'))) {
      response.writeHead(404).end()
      return
    }
    const body = await readFile(file)
    response.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' })
    response.end(body)
  } catch {
    response.writeHead(404).end('Not found')
  }
})
server.listen(4173, '127.0.0.1', () => console.log('Static acceptance server: http://127.0.0.1:4173'))
