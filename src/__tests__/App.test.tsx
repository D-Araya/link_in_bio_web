import { render, screen, within } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('Rastro Sureño public profile', () => {
  it('presents the business and an accessible logo', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Rastro Sureño', level: 1 })).toBeVisible()
    expect(screen.getByRole('img', { name: 'Logo de Rastro Sureño' })).toHaveAttribute('src', expect.stringContaining('logo_rastro_sureno'))
    expect(screen.getByText('Quesos Artesanales, Mistelas & Mermeladas')).toBeVisible()
    expect(screen.getByText(/Todos los derechos reservados/)).toHaveTextContent(String(new Date().getFullYear()))
  })

  it('links to the documented profiles and the WhatsApp confirmed by the owner', () => {
    render(<App />)
    const channels = within(screen.getByRole('navigation', { name: 'Canales de Rastro Sureño' }))
    const expected = [
      ['Google', 'https://www.google.com/search?q=rastro+sure%C3%B1o'],
      ['Instagram', 'https://www.instagram.com/rastrosureno/'],
      ['TikTok', 'https://www.tiktok.com/@rastrosureno'],
      ['Facebook', 'https://www.facebook.com/rastrosureno/'],
      ['Rastro Sureño Web E-commerce', 'https://rastrosureno.com'],
      ['WhatsApp', 'https://wa.me/56993504989'],
    ]
    expect(channels.getAllByRole('link')).toHaveLength(expected.length)
    for (const [label, href] of expected) {
      expect(channels.getByRole('link', { name: label + ' (se abre en una pestaña nueva)' })).toHaveAttribute('href', href)
    }
  })
})
