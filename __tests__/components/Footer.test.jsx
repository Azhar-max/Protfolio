import React from 'react'
import { render, screen } from '@testing-library/react'
import Footer from '../../src/components/Footer'

// Mock the AccessibilityStatement component
jest.mock('../../src/components/AccessibilityStatement', () => () => <div>Accessibility Statement</div>)

describe('Footer Component', () => {
  test('renders footer with copyright and social links', () => {
    render(<Footer />)
    
    // Check if copyright text is rendered
    expect(screen.getByText(/© \d{4} Azhar Ali Shah/i)).toBeInTheDocument()
    
    // Check if social links are rendered
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    
    // Check if accessibility statement is rendered
    expect(screen.getByText('Accessibility Statement')).toBeInTheDocument()
  })
})