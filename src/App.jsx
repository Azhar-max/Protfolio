import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/projects/Projects'
import Blog from './components/blog/Blog'
import Contact from './components/Contact'
import Resume from './components/Resume'
import StructuredData from './components/StructuredData'
import SEO from './components/SEO'
import ProjectCaseStudy from './pages/ProjectCaseStudy'
import BlogPost from './pages/BlogPost'
import Footer from './components/Footer'
import NotFound from './pages/NotFound'

export default function App() {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) return savedTheme
    
    // Check system preference for theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  })

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme)
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <SEO />
      <StructuredData />
      <div className="page-bg">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main id="main-content" className="container">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Blog />
                <Contact />
              </>
            } />
            <Route path="/resume" element={<Resume />} />
            <Route path="/projects/:id" element={<ProjectCaseStudy />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}
