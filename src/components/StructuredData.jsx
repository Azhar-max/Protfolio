import React from 'react'

export default function StructuredData() {
  const jsonData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Azhar Ali Shah",
    "url": "",
    "image": "/src/assets/profile.png",
    "sameAs": [
      "https://www.linkedin.com/in/azhar-ali-shah-72a4571b8/",
      "https://github.com/Azhar-max"
    ],
    "jobTitle": "Software Engineer",
    "worksFor": {
      "@type": "Organization",
      "name": "UET Mardan"
    },
    "alumniOf": "UET Mardan",
    "description": "Software Engineer, UI/UX Designer, and Cybersecurity Expert. Showcasing projects, skills, and experience."
  }

  return (
    <script 
      type="application/ld+json" 
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonData) }} 
    />
  )
}