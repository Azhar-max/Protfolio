import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// Hardcoded blog posts data
const blogPosts = [
  {
    slug: 'getting-started-with-react',
    title: "Getting Started with React Hooks",
    excerpt: "Learn how to use React Hooks to simplify your functional components and manage state effectively.",
    date: new Date("2023-05-15"),
    tags: ["React", "JavaScript", "Hooks"],
    content: `
      <h1>Getting Started with React Hooks</h1>
      <p>React Hooks have revolutionized the way we write React components. They allow us to use state and other React features without writing a class component.</p>
      
      <h2>What are React Hooks?</h2>
      <p>Hooks are functions that let you "hook into" React state and lifecycle features from function components. They were introduced in React 16.8 and have since become the standard way to write React components.</p>
      
      <h2>useState Hook</h2>
      <p>The useState hook allows you to add state to functional components:</p>
      <pre><code class="language-jsx">import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}</code></pre>
      
      <h2>useEffect Hook</h2>
      <p>The useEffect hook lets you perform side effects in function components:</p>
      <pre><code class="language-jsx">import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = \`You clicked \${count} times\`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}</code></pre>
      
      <h2>Conclusion</h2>
      <p>React Hooks provide a more direct API to the React concepts you already know: props, state, context, refs, and lifecycle. They offer a powerful and expressive way to compose behavior instead of having to follow the rigid structure of class components.</p>
    `
  },
  {
    slug: 'css-grid-layout',
    title: "Building Responsive Layouts with CSS Grid",
    excerpt: "A comprehensive guide to creating flexible and responsive layouts using CSS Grid.",
    date: new Date("2023-04-22"),
    tags: ["CSS", "Layout", "Responsive Design"],
    content: `
      <h1>Building Responsive Layouts with CSS Grid</h1>
      <p>CSS Grid is a powerful layout system that allows you to create complex, responsive layouts with ease. It's a two-dimensional system, meaning it can handle both columns and rows, unlike Flexbox which is largely a one-dimensional system.</p>
      
      <h2>What is CSS Grid?</h2>
      <p>CSS Grid Layout is a two-dimensional layout system for the web. It lets you lay content out in rows and columns, and has many features that make building complex layouts straightforward.</p>
      
      <h2>Basic Concepts</h2>
      <h3>Grid Container</h3>
      <p>To create a grid container, you need to set the display property to grid or inline-grid:</p>
      <pre><code class="language-css">.container {
  display: grid;
}</code></pre>
      
      <h3>Grid Items</h3>
      <p>Direct children of a grid container automatically become grid items:</p>
      <pre><code class="language-html">&lt;div class="container"&gt;
  &lt;div class="item"&gt;Item 1&lt;/div&gt;
  &lt;div class="item"&gt;Item 2&lt;/div&gt;
  &lt;div class="item"&gt;Item 3&lt;/div&gt;
&lt;/div&gt;</code></pre>
      
      <h2>Creating Columns and Rows</h2>
      <p>You can define columns and rows using the grid-template-columns and grid-template-rows properties:</p>
      <pre><code class="language-css">.container {
  display: grid;
  grid-template-columns: 200px 200px 200px;
  grid-template-rows: 100px 100px;
}</code></pre>
      
      <p>Or using the fr unit for flexible layouts:</p>
      <pre><code class="language-css">.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 100px;
}</code></pre>
      
      <h2>Grid Gap</h2>
      <p>You can add gaps between grid items using grid-gap, row-gap, or column-gap:</p>
      <pre><code class="language-css">.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
}</code></pre>
      
      <h2>Responsive Grids</h2>
      <p>CSS Grid makes responsive design incredibly easy. You can use media queries or the repeat() function with auto-fit or auto-fill:</p>
      <pre><code class="language-css">.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
}</code></pre>
      
      <h2>Conclusion</h2>
      <p>CSS Grid is an incredibly powerful tool for creating complex layouts with minimal code. It provides precise control over how elements are positioned and sized, making it perfect for everything from simple card layouts to complex dashboard interfaces.</p>
    `
  }
]

export default function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()
  
  // Find the post by slug
  const post = blogPosts.find(post => post.slug === slug)
  
  if (!post) {
    return (
      <div className="container">
        <h1>Post Not Found</h1>
        <p>The blog post you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/')} className="btn">Back to Home</button>
      </div>
    )
  }
  
  return (
    <article className="blog-post-page">
      <div className="container">
        <button onClick={() => navigate('/#blog')} className="back-link">← Back to Blog</button>
        
        <header className="post-header">
          <h1>{post.title}</h1>
          <div className="post-meta">
            <time dateTime={post.date.toISOString()}>
              {post.date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </time>
            <span className="read-time">5 min read</span>
          </div>
          <div className="post-tags">
            {post.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </header>
        
        <div className="post-content">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </article>
  )
}