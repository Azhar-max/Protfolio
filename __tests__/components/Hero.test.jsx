import React from 'react'
import { render, screen } from '@testing-library/react'
import Hero from '../../src/components/Hero'

// Mock the profile image import
jest.mock('../../src/assets/profile.png', () => 'profile-mock.png')

describe('Hero Component', () => {
  test('renders hero section with correct content', () => {
    render(<Hero />)
    
    // Check if the main heading is rendered
    expect(screen.getByText('Azhar Ali Shah', { selector: '.name' })).toBeInTheDocument()
    
    // Check if the role is rendered
    expect(screen.getByText('BS Software Engineering Student — UET Mardan')).toBeInTheDocument()
    
    // Check if the CTA buttons are rendered
    expect(screen.getByText('Hire Me')).toBeInTheDocument()
    expect(screen.getByText('View Projects')).toBeInTheDocument()
    
    // Check if the profile image is rendered
    const profileImage = screen.getByAltText('Azhar Ali Shah')
    expect(profileImage).toBeInTheDocument()
    expect(profileImage).toHaveAttribute('src', 'profile-mock.png')
  })
})