import React from 'react'
import { useNavigate } from 'react-router-dom'

// Hardcoded blog posts data
const blogPosts = [
  {
    slug: 'getting-started-with-react',
    title: "Getting Started with React Hooks",
    excerpt: "Learn how to use React Hooks to simplify your functional components and manage state effectively.",
    date: new Date("2023-05-15"),
    tags: ["React", "JavaScript", "Hooks"]
  },
  {
    slug: 'css-grid-layout',
    title: "Building Responsive Layouts with CSS Grid",
    excerpt: "A comprehensive guide to creating flexible and responsive layouts using CSS Grid.",
    date: new Date("2023-04-22"),
    tags: ["CSS", "Layout", "Responsive Design"]
  }
]

export default function Blog() {
  const navigate = useNavigate()
  
  const handleReadMore = (slug) => {
    navigate(`/blog/${slug}`)
  }

  return (
    <section id="blog" className="blog-section" aria-label="Blog">
      <div className="container">
        <h2>Blog</h2>
        <p className="section-description">Thoughts, tutorials, and insights from my journey as a developer.</p>
        
        <div className="blog-grid">
          {blogPosts.map(post => (
            <article key={post.slug} className="blog-post">
              <div className="post-content">
                <div className="post-meta-blog">
                  <span className="post-date">{post.date.toLocaleDateString()}</span>
                  <span className="read-time">5 min read</span>
                </div>
                <h3 className="post-title">{post.title}</h3>
                <p className="post-excerpt">{post.excerpt}</p>
                <div className="post-tags">
                  {post.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <button onClick={() => handleReadMore(post.slug)} className="read-more">Read more →</button>
              </div>
            </article>
          ))}
        </div>
        
        <div className="view-all-container">
          <button onClick={() => navigate('/blog')} className="btn btn-outline">View All Articles</button>
        </div>
      </div>
    </section>
  )
}