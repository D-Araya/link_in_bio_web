import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Avatar from '../Avatar'

describe('Avatar', () => {
  it('names the business and reserves the real logo aspect ratio without lazy-loading the hero', () => {
    render(<Avatar src="/logo.jpg" alt="Logo de Rastro Sureño" name="Rastro Sureño" />)
    const logo = screen.getByRole('img', { name: 'Logo de Rastro Sureño' })
    expect(logo).toHaveAttribute('src', '/logo.jpg')
    expect(logo).toHaveAttribute('width', '1056')
    expect(logo).toHaveAttribute('height', '664')
    expect(logo).not.toHaveAttribute('loading', 'lazy')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Rastro Sureño')
  })
})
