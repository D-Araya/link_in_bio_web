import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock para matchMedia (necesario para algunos tests)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock para window.open (usado en LinkButton)
Object.defineProperty(window, 'open', {
  writable: true,
  value: vi.fn(),
})

// Configuración global para tests
interface GlobalWithResizeObserver {
  ResizeObserver: unknown;
}

;(globalThis as unknown as GlobalWithResizeObserver).ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))
