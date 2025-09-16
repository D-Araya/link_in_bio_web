import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Avatar from '../Avatar'

describe('Avatar Component', () => {
  const defaultProps = {
    src: '/test-image.jpg',
    alt: 'Test Avatar',
    name: 'John Doe'
  }

  it('renders avatar with correct props', () => {
    render(<Avatar {...defaultProps} />)
    
    const image = screen.getByRole('img')
    const name = screen.getByRole('heading', { level: 1 })
    
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/test-image.jpg')
    expect(image).toHaveAttribute('alt', 'Test Avatar')
    expect(name).toHaveTextContent('John Doe')
  })

  it('applies correct styles to image', () => {
    render(<Avatar {...defaultProps} />)
    
    const image = screen.getByRole('img')
    
    expect(image).toHaveStyle({
      width: '100%',
      maxWidth: '400px',
      borderRadius: '12px',
      border: '2px solid #e5e7eb'
    })
  })

  it('applies correct styles to name', () => {
    render(<Avatar {...defaultProps} />)
    
    const name = screen.getByRole('heading', { level: 1 })
    
    expect(name).toHaveStyle({
      fontSize: '30px',
      fontWeight: 'bold',
      color: '#1f2937'
    })
  })

  it('handles mouse hover effects', () => {
    render(<Avatar {...defaultProps} />)
    
    const image = screen.getByRole('img')
    
    // Test mouse enter
    fireEvent.mouseEnter(image)
    expect(image).toHaveStyle('transform: scale(1.05)')
    
    // Test mouse leave
    fireEvent.mouseLeave(image)
    expect(image).toHaveStyle('transform: scale(1)')
  })

  it('renders with different name values', () => {
    const { rerender } = render(<Avatar {...defaultProps} name="Alice Smith" />)
    
    expect(screen.getByRole('heading')).toHaveTextContent('Alice Smith')
    
    rerender(<Avatar {...defaultProps} name="Bob Johnson" />)
    expect(screen.getByRole('heading')).toHaveTextContent('Bob Johnson')
  })

  it('handles empty name gracefully', () => {
    render(<Avatar {...defaultProps} name="" />)
    
    const name = screen.getByRole('heading', { level: 1 })
    expect(name).toBeInTheDocument()
    expect(name).toHaveTextContent('')
  })
})