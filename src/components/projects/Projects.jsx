import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured online shopping platform with cart, checkout, and payment integration.",
    tags: ["React", "Node.js", "MongoDB"],
    image: "/src/assets/project1.jpg",
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A productivity application for managing tasks with drag-and-drop functionality.",
    tags: ["React", "Firebase", "CSS"],
    image: "/src/assets/project2.jpg",
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Real-time weather forecasting application with location detection.",
    tags: ["JavaScript", "API", "CSS"],
    image: "/src/assets/project3.jpg",
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: 4,
    title: "Social Media Analytics",
    description: "Dashboard for tracking social media metrics and engagement.",
    tags: ["React", "D3.js", "Express"],
    image: "/src/assets/project4.jpg",
    demoUrl: "#",
    githubUrl: "#"
  }
]

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const navigate = useNavigate()
  
  const allTags = ['All', ...new Set(projectsData.flatMap(project => project.tags))]
  
  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(project => project.tags.includes(filter))

  const viewCaseStudy = (id) => {
    navigate(`/projects/${id}`)
  }

  return (
    <section id="projects" className="projects-section" aria-label="Projects">
      <div className="container">
        <h2>Projects</h2>
        <p className="section-description">Showcasing my recent work and passion projects.</p>
        
        <div className="filter-buttons">
          {allTags.map(tag => (
            <button 
              key={tag}
              className={`filter-btn ${filter === tag ? 'active' : ''}`}
              onClick={() => setFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img src={project.image || "/src/assets/profile.png"} alt={project.title} loading="lazy" decoding="async" />
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  <button onClick={() => viewCaseStudy(project.id)} className="btn btn-secondary">View Case Study</button>
                  <a href={project.demoUrl} className="btn btn-outline">Live Demo</a>
                  <a href={project.githubUrl} className="btn btn-outline">GitHub</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}