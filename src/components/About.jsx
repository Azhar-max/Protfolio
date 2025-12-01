import React from 'react'

export default function About() {
  return (
    <section id="about" className="about" aria-label="About">
      <div className="left card">
        <h3>About Me</h3>
        <p style={{ color: 'var(--muted)' }}>
          I'm Azhar — a BS Software Engineering student at UET Mardan. I love designing clean interfaces,
          building robust web & mobile apps, and researching secure systems. I enjoy solving problems using modern
          technologies like React, blockchain primitives, and mobile frameworks.
        </p>
        <p style={{ color: 'var(--muted)' }}>
          Open to internships, collaborative projects, and freelance assignments.
        </p>
      </div>

      <div className="text card">
        <h4>Education</h4>
        <p style={{ color: 'var(--muted)' }}>BS Software Engineering — UET Mardan</p>

        <h4 style={{ marginTop: 8 }}>Contact</h4>
        <p style={{ color: 'var(--muted)' }}>
          Email: <a href="mailto:azharalishah405@gmail.com" style={{ color: 'inherit' }}>azharalishah405@gmail.com</a>
        </p>
        <p style={{ color: 'var(--muted)' }}>
          Phone: <a href="tel:+923307292838" style={{ color: 'inherit' }}>+92-3307292838</a>
        </p>
      </div>
    </section>
  )
}
