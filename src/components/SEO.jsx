import React from 'react'
import { useLocation } from 'react-router-dom'

export default function SEO({ 
  title = "Azhar Ali Shah — Professional Portfolio",
  description = "Professional portfolio of Azhar Ali Shah - Software Engineer, UI/UX Designer, and Cybersecurity Expert. Showcasing projects, skills, and experience.",
  keywords = "software engineer, portfolio, ui/ux designer, cybersecurity, blockchain developer, react native, web development",
  author = "Azhar Ali Shah",
  image = "/src/assets/profile.png",
  url
}) {
  const location = useLocation()
  const currentUrl = url || `${window.location.origin}${location.pathname}`
  
  // Update document title
  React.useEffect(() => {
    document.title = title
  }, [title])
  
  return (
    <>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="theme-color" content="#7f5af0" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      <link rel="canonical" href={currentUrl} />
    </>
  )
}