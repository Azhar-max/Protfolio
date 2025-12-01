import React from 'react'
import { render, screen } from '@testing-library/react'
import Navbar from '../../src/components/Navbar'

describe('Navbar Component', () => {
  test('renders navbar with brand and navigation links', () => {
    render(<Navbar theme="dark" toggleTheme={() => {}} />)
    
    // Check if brand is rendered
    expect(screen.getByText('Azhar')).toBeInTheDocument()
    expect(screen.getByText('Portfolio')).toBeInTheDocument()
    
    // Check if navigation links are rendered
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
    
    // Check if theme toggle button is rendered
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument()
    
    // Check if download CV button is rendered
    expect(screen.getByText('Download CV')).toBeInTheDocument()
  })
})