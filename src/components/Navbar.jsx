import React from 'react'

export default function Navbar({ theme, toggleTheme }) {
  return (
    <nav className="container nav" aria-label="Main Navigation">
      <div className="brand">
        <div className="dot" />
        <div>
          Azhar <div style={{fontSize:12,color:'var(--muted)'}}>Portfolio</div>
        </div>
      </div>
      <div className="nav-links">
        <a href="#about" style={{color:'var(--muted)',textDecoration:'none'}}>About</a>
        <a href="#skills" style={{color:'var(--muted)',textDecoration:'none'}}>Skills</a>
        <a href="#projects" style={{color:'var(--muted)',textDecoration:'none'}}>Projects</a>
        <a href="#blog" style={{color:'var(--muted)',textDecoration:'none'}}>Blog</a>
        <a href="#contact" style={{color:'var(--muted)',textDecoration:'none'}}>Contact</a>
        <button 
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <a href="#" className="btn">Download CV</a>
      </div>
    </nav>
  )
}