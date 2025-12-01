import React from 'react'
import { render, screen } from '@testing-library/react'
import Contact from '../../src/components/Contact'

describe('Contact Component', () => {
  test('renders contact section with correct heading', () => {
    render(<Contact />)
    
    // Check if the main heading is rendered
    expect(screen.getByText('Contact Me')).toBeInTheDocument()
    
    // Check if the description is rendered
    expect(screen.getByText('Want to work together? Send a message or reach out on social media.')).toBeInTheDocument()
    
    // Check if form fields are rendered
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your message')).toBeInTheDocument()
    
    // Check if submit button is rendered
    expect(screen.getByText('Send Message')).toBeInTheDocument()
    
    // Check if social links are rendered
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
  })
})