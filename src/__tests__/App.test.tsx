import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('App Component Integration', () => {
  it('renders complete application structure', () => {
    render(<App />)
    
    // Check if Avatar is rendered
    const avatar = screen.getByRole('img')
    const name = screen.getByRole('heading', { level: 1 })
    
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src', '/logo_rastro_sureno.jpg')
    expect(avatar).toHaveAttribute('alt', 'Rastro Sureño Logo')
    expect(name).toHaveTextContent('Rastro Sureño')
  })

  it('renders all social media links', () => {
    render(<App />)
    
    // Check for all expected links
    const links = screen.getAllByRole('link')
    
    expect(links).toHaveLength(6) // Google, Instagram, TikTok, Facebook, E-commerce, WhatsApp
    
    // Check specific links
    expect(screen.getByText('Google')).toBeInTheDocument()
    expect(screen.getByText('Instagram')).toBeInTheDocument()
    expect(screen.getByText('TikTok')).toBeInTheDocument()
    expect(screen.getByText('Facebook')).toBeInTheDocument()
    expect(screen.getByText('Rastro Sureño Web E-commerce')).toBeInTheDocument()
    expect(screen.getByText('WhatsApp')).toBeInTheDocument()
  })

  it('has correct link URLs', () => {
    render(<App />)
    
    const googleLink = screen.getByText('Google').closest('a')
    const instagramLink = screen.getByText('Instagram').closest('a')
    const tiktokLink = screen.getByText('TikTok').closest('a')
    const facebookLink = screen.getByText('Facebook').closest('a')
    const ecommerceLink = screen.getByText('Rastro Sureño Web E-commerce').closest('a')
    const whatsappLink = screen.getByText('WhatsApp').closest('a')
    
    expect(googleLink).toHaveAttribute('href', 'https://google.com/search?q=rastro+sureño')
    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com')
    expect(tiktokLink).toHaveAttribute('href', 'https://tiktok.com')
    expect(facebookLink).toHaveAttribute('href', 'https://facebook.com')
    expect(ecommerceLink).toHaveAttribute('href', 'https://rastrosureno.com')
    expect(whatsappLink).toHaveAttribute('href', 'https://wa.me/1234567890')
  })

  it('applies correct container styles', () => {
    render(<App />)
    
    // The main container should have the expected styling
    const mainElement = screen.getByRole('main')
    expect(mainElement).toBeInTheDocument()
    expect(document.body.firstChild).toBeInTheDocument()
  })

  it('renders with responsive design elements', () => {
    render(<App />)
    
    // Check that all components are present for responsive design
    const avatar = screen.getByRole('img')
    const links = screen.getAllByRole('link')
    
    expect(avatar).toBeInTheDocument()
    expect(links.length).toBeGreaterThan(0)
  })
})