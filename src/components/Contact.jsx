import React, { useState } from 'react'

export default function Contact(){
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitMessage('Thanks for your message! I\'ll get back to you soon.')
      setFormData({ name: '', email: '', message: '' })
      
      // Clear message after 5 seconds
      setTimeout(() => {
        setSubmitMessage('')
      }, 5000)
    }, 1500)
  }

  return (
    <section id="contact" className="contact card" aria-label="Contact">
      <div>
        <h3>Contact Me</h3>
        <p style={{color:'var(--muted)'}}>Want to work together? Send a message or reach out on social media.</p>
        <form onSubmit={handleSubmit}>
          <input 
            className="input" 
            placeholder="Your name" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required 
          />
          <input 
            className="input" 
            placeholder="Your email" 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required 
          />
          <textarea 
            placeholder="Your message" 
            name="message"
            value={formData.message}
            onChange={handleChange}
            required 
          />
          <button className="btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          {submitMessage && (
            <div style={{marginTop: '10px', color: 'var(--accent-color)', fontWeight: '600'}}>
              {submitMessage}
            </div>
          )}
        </form>
      </div>

      <aside className="card" style={{height:'100%'}}>
        <h4>Connect</h4>
        <p style={{color:'var(--muted)'}}>
          <a href="https://www.linkedin.com/in/azhar-ali-shah-72a4571b8/" target="_blank" rel="noopener noreferrer">LinkedIn</a> | 
          <a href="https://github.com/Azhar-max" target="_blank" rel="noopener noreferrer">GitHub</a> | 
          <a href="mailto:azharalishah405@gmail.com">Email</a>
        </p>
        <div style={{marginTop:12}}>
          <div style={{fontWeight:700}}>Location</div>
          <div style={{color:'var(--muted)'}}>Mardan, Pakistan</div>
        </div>
        <div style={{marginTop:12}}>
          <a href="#" className="btn btn-outline" style={{textDecoration: 'none'}}>Download Resume</a>
        </div>
      </aside>
    </section>
  )
}
