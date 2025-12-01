import fs from 'fs'
import path from 'path'

// Function to read and parse MDX files
export function getAllBlogPosts() {
  const blogDir = path.join(process.cwd(), 'src', 'content', 'blog')
  const filenames = fs.readdirSync(blogDir)
  
  return filenames.map(filename => {
    const filePath = path.join(blogDir, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    
    // Extract frontmatter
    const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
    const match = fileContents.match(frontmatterRegex)
    
    if (!match) {
      throw new Error(`Invalid MDX file format: ${filename}`)
    }
    
    const frontmatter = {}
    const frontmatterLines = match[1].split('\n')
    
    frontmatterLines.forEach(line => {
      if (line.trim() === '') return
      
      const [key, ...valueParts] = line.split(':')
      const value = valueParts.join(':').trim()
      
      // Handle array values (tags)
      if (value.startsWith('[') && value.endsWith(']')) {
        frontmatter[key.trim()] = JSON.parse(value)
      } else {
        // Remove quotes if present
        frontmatter[key.trim()] = value.replace(/^"(.*)"$/, '$1')
      }
    })
    
    // Extract slug from filename
    const slug = filename.replace(/\.mdx?$/, '')
    
    return {
      ...frontmatter,
      slug,
      date: new Date(frontmatter.date),
      content: fileContents.replace(frontmatterRegex, '').trim()
    }
  }).sort((a, b) => b.date - a.date) // Sort by date, newest first
}

// Function to get a single blog post by slug
export function getBlogPostBySlug(slug) {
  const blogDir = path.join(process.cwd(), 'src', 'content', 'blog')
  const filePath = path.join(blogDir, `${slug}.mdx`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8')
  
  // Extract frontmatter
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = fileContents.match(frontmatterRegex)
  
  if (!match) {
    throw new Error(`Invalid MDX file format: ${slug}.mdx`)
  }
  
  const frontmatter = {}
  const frontmatterLines = match[1].split('\n')
  
  frontmatterLines.forEach(line => {
    if (line.trim() === '') return
    
    const [key, ...valueParts] = line.split(':')
    const value = valueParts.join(':').trim()
    
    // Handle array values (tags)
    if (value.startsWith('[') && value.endsWith(']')) {
      frontmatter[key.trim()] = JSON.parse(value)
    } else {
      // Remove quotes if present
      frontmatter[key.trim()] = value.replace(/^"(.*)"$/, '$1')
    }
  })
  
  return {
    ...frontmatter,
    slug,
    date: new Date(frontmatter.date),
    content: fileContents.replace(frontmatterRegex, '').trim()
  }
}