import React from 'react'
import { render, screen } from '@testing-library/react'
import Skills from '../../src/components/Skills'

describe('Skills Component', () => {
  test('renders skills section with correct heading', () => {
    render(<Skills />)
    
    // Check if the main heading is rendered
    expect(screen.getByText('Skills')).toBeInTheDocument()
    
    // Check if the description is rendered
    expect(screen.getByText('A selection of my main skills & expertise.')).toBeInTheDocument()
    
    // Check if skill categories are rendered
    expect(screen.getByText('Development')).toBeInTheDocument()
    expect(screen.getByText('Design')).toBeInTheDocument()
    expect(screen.getByText('Other')).toBeInTheDocument()
    
    // Check if some skills are rendered
    expect(screen.getByText('Software Engineer')).toBeInTheDocument()
    expect(screen.getByText('Web Designer')).toBeInTheDocument()
  })
})