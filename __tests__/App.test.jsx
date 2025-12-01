import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from '../src/App'

// Mock child components to isolate App tests
jest.mock('../src/components/Navbar', () => () => <div data-testid="navbar">Navbar</div>)
jest.mock('../src/components/Hero', () => () => <div data-testid="hero">Hero</div>)
jest.mock('../src/components/About', () => () => <div data-testid="about">About</div>)
jest.mock('../src/components/Skills', () => () => <div data-testid="skills">Skills</div>)
jest.mock('../src/components/projects/Projects', () => () => <div data-testid="projects">Projects</div>)
jest.mock('../src/components/blog/Blog', () => () => <div data-testid="blog">Blog</div>)
jest.mock('../src/components/Contact', () => () => <div data-testid="contact">Contact</div>)
jest.mock('../src/components/Footer', () => () => <div data-testid="footer">Footer</div>)

describe('App Component', () => {
  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    expect(screen.getByTestId('navbar')).toBeInTheDocument()
    expect(screen.getByTestId('hero')).toBeInTheDocument()
    expect(screen.getByTestId('about')).toBeInTheDocument()
    expect(screen.getByTestId('skills')).toBeInTheDocument()
    expect(screen.getByTestId('projects')).toBeInTheDocument()
    expect(screen.getByTestId('blog')).toBeInTheDocument()
    expect(screen.getByTestId('contact')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })
})