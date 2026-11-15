import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import LinkButton from '../LinkButton'

describe('External channel link', () => {
  it('has a keyboard-accessible name, warns about the new tab and isolates the opener', async () => {
    render(<LinkButton id="whatsapp" href="https://wa.me/56993504989" label="WhatsApp" icon="◉" />)
    const link = screen.getByRole('link', { name: 'WhatsApp (se abre en una pestaña nueva)' })
    expect(link).toHaveAttribute('href', 'https://wa.me/56993504989')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(screen.getByText('◉')).toHaveAttribute('aria-hidden', 'true')
    await userEvent.setup().tab()
    expect(link).toHaveFocus()
  })
})
