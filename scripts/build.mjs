// A local .env must never turn a release build into React development code.
process.env.NODE_ENV = 'production'
const { build } = await import('vite')
await build()
