# Azhar Ali Shah — Professional Portfolio (React + Vite)

This is a modern, responsive, and accessible portfolio website built with React and Vite. It showcases projects, skills, and experience with a sleek dark/light theme toggle.

## 🌟 Features

- **Responsive Design**: Mobile-first approach with breakpoints for all device sizes
- **Dark/Light Theme**: Automatic detection of system preference with manual toggle
- **SEO Optimized**: Meta tags, structured data, sitemap, and robots.txt
- **Accessible**: WCAG 2.1 AA compliant with proper semantics and ARIA attributes
- **Performance Focused**: Optimized for Lighthouse scores
- **Modern Tech Stack**: React 18, Vite, React Router, React Icons
- **Blog with MDX Support**: Write blog posts in Markdown with JSX support
- **Project Case Studies**: Detailed project pages with case studies
- **Contact Form**: With validation and submission handling
- **Resume Download**: PDF resume download functionality

## 📁 Project Structure

```
src/
├── components/
│   ├── projects/
│   ├── blog/
│   └── [other components]
├── pages/
├── content/
│   └── blog/ (MDX blog posts)
├── assets/
├── utils/
├── App.jsx
└── main.jsx
```

## 🚀 Getting Started

### Prerequisites

- Node.js (>=16)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd azhar-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Development

### Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the production-ready application
- `npm run preview` - Previews the production build locally
- `npm run lint` - Runs ESLint to check for code issues
- `npm test` - Runs the test suite
- `npm run test:watch` - Runs tests in watch mode

### Customization

#### Personal Information
- Update personal information in component files
- Modify contact details in `src/components/Contact.jsx`

#### Styling
- Replace images in `src/assets/`
- Modify color scheme in `src/styles.css`
- Adjust responsive breakpoints as needed

#### Content
- Add/remove skills in `src/components/Skills.jsx`
- Update projects in `src/components/projects/Projects.jsx`
- Add blog posts in `src/content/blog/` as MDX files
- Update resume in `src/assets/resume/`

## 🧪 Testing

The project includes a comprehensive testing suite using Jest and React Testing Library.

- Run all tests: `npm test`
- Run tests in watch mode: `npm run test:watch`

Test files are located in the `__tests__` directory, organized by component.

## 🚀 Deployment

### Railway Deployment (Recommended)

1. Push your code to a GitHub repository
2. Sign up/in to [Railway](https://railway.app)
3. Create a new project and import your repository
4. Railway will automatically detect the Vite framework
5. The build command is set to `npm run build`
6. The start command is set to `npm start` which serves the `dist` directory
7. Deploy!

### Custom Domain Configuration

1. After deployment, go to your Railway project dashboard
2. Navigate to Settings > Domains
3. Click "Add Domain" and enter your custom domain
4. Railway will provide DNS records to add to your domain registrar
5. Add the provided CNAME record to your DNS settings
6. Wait for DNS propagation (5-30 minutes)
7. Railway will automatically provision a Let's Encrypt SSL certificate
8. HTTP traffic will automatically redirect to HTTPS

### Validation Steps

After deployment, verify that your site is working correctly:

1. **SSL Verification**:
   - Visit your deployed site (https://your-app.up.railway.app)
   - Check for the padlock icon in the browser address bar
   - Click the padlock to view certificate details

2. **HTTP/2 Support Check**:
   - Open Developer Tools (F12)
   - Go to the Network tab
   - Reload the page
   - Right-click on column headers and ensure "Protocol" is checked
   - Look for "h2" in the Protocol column

3. **Command-Line Validation**:
   ```bash
   # Check SSL certificate details
   openssl s_client -connect your-app.up.railway.app:443 -servername your-app.up.railway.app
   
   # Check HTTP/2 support
   curl -I --http2 https://your-app.up.railway.app
   
   # Verbose SSL information
   curl -v https://your-app.up.railway.app
   ```

4. **Performance Validation**:
   - Run Lighthouse audit in Chrome DevTools
   - Check for any console errors
   - Verify all assets load correctly

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. The built files will be in the `dist` directory
3. Deploy these files to any static hosting service

### Environment Variables

No environment variables are required for this portfolio.

## 📈 Performance Optimizations

- Lazy loading for images
- CSS containment and will-change properties
- Content visibility for off-screen elements
- Optimized animations with requestAnimationFrame
- Critical CSS for above-the-fold content
- Efficient React component structure

## ♿ Accessibility Features

- Semantic HTML structure
- Proper heading hierarchy (H1-H6)
- ARIA labels and roles where needed
- Keyboard navigation support
- Focus management and visible focus indicators
- Color contrast compliance (WCAG 2.1 AA)
- Skip to main content link
- Reduced motion support

## 🔍 SEO Features

- Comprehensive meta tags
- Open Graph and Twitter cards
- Structured data (JSON-LD) for Person and WebSite
- Sitemap.xml
- Robots.txt
- Canonical URLs

## 🧰 Technologies Used

- [React 18](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [MDX](https://mdxjs.com/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## 📄 License

MIT License

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a pull request

## 📞 Contact

Azhar Ali Shah - [@LinkedIn](https://www.linkedin.com/in/azhar-ali-shah-72a4571b8/) - azharalishah405@gmail.com

Project Link: [https://github.com/Azhar-max/azhar-portfolio](https://github.com/Azhar-max/azhar-portfolio)