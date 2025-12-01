import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Projects from '../../src/components/projects/Projects'

describe('Projects Component', () => {
  test('renders projects section with correct heading', () => {
    render(
      <MemoryRouter>
        <Projects />
      </MemoryRouter>
    )
    
    // Check if the main heading is rendered
    expect(screen.getByText('Projects')).toBeInTheDocument()
    
    // Check if the description is rendered
    expect(screen.getByText('Showcasing my recent work and passion projects.')).toBeInTheDocument()
    
    // Check if filter buttons are rendered
    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'React' })).toBeInTheDocument()
  })
  
  test('renders project cards', () => {
    render(
      <MemoryRouter>
        <Projects />
      </MemoryRouter>
    )
    
    // Check if project titles are rendered
    expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument()
    expect(screen.getByText('Task Management App')).toBeInTheDocument()
  })
})