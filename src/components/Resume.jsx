import React from 'react'

export default function Resume() {
  const handleDownload = () => {
    // Create a temporary link to trigger the download
    const link = document.createElement('a')
    link.href = '/src/assets/resume/Azhar_Ali_Shah_Resume.pdf'
    link.download = 'Azhar_Ali_Shah_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="resume" className="resume-section card" aria-label="Resume">
      <h2>Resume</h2>
      <p className="section-description">Download my complete resume in PDF format.</p>
      
      <div className="resume-content">
        <div className="resume-preview">
          <div className="preview-placeholder">
            <div className="preview-text">Resume Preview</div>
          </div>
        </div>
        
        <div className="resume-download">
          <h3>Download Full Resume</h3>
          <p>Get a comprehensive overview of my experience, skills, and qualifications.</p>
          <button onClick={handleDownload} className="btn">Download PDF</button>
        </div>
      </div>
    </section>
  )
}