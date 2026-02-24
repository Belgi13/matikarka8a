import { render, screen } from '@testing-library/react'
import BottomNav from '@/components/BottomNav'

// Mock usePathname
jest.mock('next/navigation', () => ({ usePathname: () => '/solve' }))

describe('BottomNav', () => {
  it('renders all 5 navigation tabs', () => {
    render(<BottomNav />)
    expect(screen.getByText('Vyriešiť')).toBeInTheDocument()
    expect(screen.getByText('Zbierka')).toBeInTheDocument()
    expect(screen.getByText('Precvičiť')).toBeInTheDocument()
    expect(screen.getByText('Teória')).toBeInTheDocument()
    expect(screen.getByText('História')).toBeInTheDocument()
  })

  it('highlights the active tab', () => {
    render(<BottomNav />)
    const activeLink = screen.getByText('Vyriešiť').closest('a')
    expect(activeLink).toHaveClass('text-[var(--brand-primary)]')
  })

  it('renders Teória tab linking to /theory', () => {
    render(<BottomNav />)
    expect(screen.getByText('Teória')).toBeInTheDocument()
    expect(screen.getByText('Teória').closest('a')).toHaveAttribute('href', '/theory')
  })
})
