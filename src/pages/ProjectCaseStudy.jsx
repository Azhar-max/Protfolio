import React from 'react'
import { useParams } from 'react-router-dom'

const projectData = {
  1: {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured online shopping platform with cart, checkout, and payment integration.",
    challenge: "The main challenge was to create a seamless shopping experience while ensuring security for payment transactions.",
    solution: "I implemented a responsive design using React and integrated Stripe for secure payments. The platform includes user authentication, product search, and order tracking.",
    results: "The platform increased client's sales by 40% in the first quarter and received positive feedback for its intuitive interface.",
    techStack: ["React", "Node.js", "MongoDB", "Stripe API", "Express"],
    images: ["/src/assets/project1.jpg", "/src/assets/project1-2.jpg"],
    liveUrl: "#",
    githubUrl: "#"
  },
  2: {
    id: 2,
    title: "Task Management App",
    description: "A productivity application for managing tasks with drag-and-drop functionality.",
    challenge: "Users needed a simple yet powerful tool to organize their daily tasks and collaborate with team members.",
    solution: "I developed a Kanban-style interface with drag-and-drop capabilities using React Beautiful DnD. The app includes real-time updates through WebSockets.",
    results: "The app improved team productivity by 25% and was adopted by over 500 users within the first month.",
    techStack: ["React", "Firebase", "CSS", "React Beautiful DnD"],
    images: ["/src/assets/project2.jpg", "/src/assets/project2-2.jpg"],
    liveUrl: "#",
    githubUrl: "#"
  }
}

export default function ProjectCaseStudy() {
  const { id } = useParams()
  const project = projectData[id] || projectData[1]
  
  return (
    <div className="project-case-study">
      <div className="container">
        <a href="/#projects" className="back-link">← Back to Projects</a>
        
        <header className="project-header">
          <h1>{project.title}</h1>
          <p className="project-description">{project.description}</p>
          
          <div className="project-actions">
            <a href={project.liveUrl} className="btn">Live Demo</a>
            <a href={project.githubUrl} className="btn btn-outline">GitHub</a>
          </div>
        </header>
        
        <div className="project-gallery">
          {project.images.map((image, index) => (
            <img 
              key={index} 
              src={image || "/src/assets/profile.png"} 
              alt={`${project.title} screenshot ${index + 1}`} 
              className="project-image"
            />
          ))}
        </div>
        
        <div className="project-details">
          <div className="detail-section">
            <h2>The Challenge</h2>
            <p>{project.challenge}</p>
          </div>
          
          <div className="detail-section">
            <h2>The Solution</h2>
            <p>{project.solution}</p>
          </div>
          
          <div className="detail-section">
            <h2>Results</h2>
            <p>{project.results}</p>
          </div>
          
          <div className="detail-section">
            <h2>Tech Stack</h2>
            <div className="tech-stack">
              {project.techStack.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}