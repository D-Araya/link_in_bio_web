import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import LinkButton from '../LinkButton'

describe('LinkButton Component', () => {
  const defaultProps = {
    href: 'https://example.com',
    icon: '🔗',
    text: 'Visit Website'
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders link button with correct props', () => {
    render(<LinkButton {...defaultProps} />)
    
    const link = screen.getByRole('link')
    const icon = screen.getByText('🔗')
    const text = screen.getByText('Visit Website')
    
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(icon).toBeInTheDocument()
    expect(text).toBeInTheDocument()
  })

  it('applies correct base styles', () => {
    render(<LinkButton {...defaultProps} />)
    
    const link = screen.getByRole('link')
    
    expect(link).toHaveStyle({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px 24px',
      backgroundColor: '#ffffff',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      textDecoration: 'none',
      color: '#1f2937'
    })
  })

  it('handles mouse hover effects', () => {
    render(<LinkButton {...defaultProps} />)
    
    const link = screen.getByRole('link')
    
    // Test mouse enter
    fireEvent.mouseEnter(link)
    expect(link).toHaveStyle({
      backgroundColor: '#f9fafb',
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    })
    
    // Test mouse leave
    fireEvent.mouseLeave(link)
    expect(link).toHaveStyle({
      backgroundColor: '#ffffff',
      transform: 'translateY(0)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    })
  })

  it('renders with different icons and text', () => {
    const { rerender } = render(
      <LinkButton href="https://twitter.com" icon="🐦" text="Twitter" />
    )
    
    expect(screen.getByText('🐦')).toBeInTheDocument()
    expect(screen.getByText('Twitter')).toBeInTheDocument()
    
    rerender(
      <LinkButton href="https://github.com" icon="💻" text="GitHub" />
    )
    
    expect(screen.getByText('💻')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
  })

  it('handles click events correctly', () => {
    render(<LinkButton {...defaultProps} />)
    
    const link = screen.getByRole('link')
    
    // Simulate click
    fireEvent.click(link)
    
    // Verify the link is still present (navigation would be handled by browser)
    expect(link).toBeInTheDocument()
  })

  it('renders with special characters in text', () => {
    render(
      <LinkButton 
        href="https://example.com" 
        icon="📧" 
        text="Email & Contact" 
      />
    )
    
    expect(screen.getByText('Email & Contact')).toBeInTheDocument()
  })
})