const fs = require('fs');
const path = require('path');
const http2 = require('http2');
const express = require('express');
const tlsConfig = require('./config/tls-config');
const { adminAuthMiddleware } = require('./src/utils/adminAuth');

// Check if certificates exist
const keyPath = path.join(__dirname, 'localhost-key.pem');
const certPath = path.join(__dirname, 'localhost.pem');

if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
  console.error('TLS certificates not found. Please run "npm run dev" first to generate certificates.');
  process.exit(1);
}

// Read certificates and apply TLS configuration
const options = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
  allowHTTP1: true, // Allow HTTP/1.1 fallback
  // ALPN protocols for protocol negotiation
  ALPNProtocols: tlsConfig.alpnProtocols,
  // Strong cipher suites
  ciphers: tlsConfig.cipherSuites.join(':'),
  // TLS version constraints
  minVersion: tlsConfig.minVersion,
  maxVersion: tlsConfig.maxVersion,
  // Secure options
  secureOptions: tlsConfig.secureOptions,
  // Honor cipher order
  honorCipherOrder: tlsConfig.honorCipherOrder,
  // EC curve for ECDHE
  ecdhCurve: tlsConfig.ecdhCurve,
  // Session timeout
  sessionTimeout: tlsConfig.sessionTimeout
};

// Create Express app
const app = express();

// Parse JSON bodies
app.use(express.json());

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Admin endpoint with authentication middleware
app.get('/admin', adminAuthMiddleware, (req, res) => {
  res.json({ 
    message: 'Admin endpoint accessed successfully',
    user: req.user,
    timestamp: new Date().toISOString(),
    httpVersion: req.httpVersion
  });
});

// Admin login endpoint
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  // Import the authenticateAdmin function here to avoid circular dependencies
  const { authenticateAdmin } = require('./src/utils/adminAuth');
  
  const user = authenticateAdmin(username, password);
  
  if (user) {
    res.json({ 
      message: 'Authentication successful',
      token: user.token,
      user: {
        username: user.username,
        role: user.role
      },
      timestamp: new Date().toISOString()
    });
  } else {
    res.status(401).json({ 
      error: 'Invalid credentials',
      timestamp: new Date().toISOString()
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    httpVersion: req.httpVersion
  });
});

// API endpoint to check HTTP version
app.get('/api/http-version', (req, res) => {
  res.json({ 
    httpVersion: req.httpVersion,
    protocol: req.protocol,
    secure: req.secure
  });
});

// Serve index.html for all routes (SPA fallback)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/resume', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/projects/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/blog/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Create HTTP/2 server
const server = http2.createSecureServer(options, app);

// Handle server errors
server.on('error', (err) => {
  console.error('Server error:', err);
});

// Handle stream errors
server.on('stream', (stream) => {
  stream.on('error', (err) => {
    console.error('Stream error:', err);
  });
});

// Start server
const PORT = process.env.PORT || 8443;
server.listen(PORT, () => {
  console.log(`HTTPS/HTTP/2 Server running on https://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop the server');
  
  // Show certificate information
  console.log('\nCertificate Info:');
  console.log('- Subject: localhost');
  console.log('- Valid for: localhost, 127.0.0.1, ::1');
  console.log('- Protocol support: HTTP/2 (h2), HTTP/1.1');
  console.log('- TLS version: ' + tlsConfig.minVersion + ' to ' + tlsConfig.maxVersion);
  console.log('- Cipher suites: ' + tlsConfig.cipherSuites.join(', '));
  
  // Show admin login information
  console.log('\nAdmin Access:');
  console.log('- Login endpoint: POST https://localhost:' + PORT + '/admin/login');
  console.log('- Admin endpoint: GET https://localhost:' + PORT + '/admin');
  console.log('- Use Authorization: Bearer <token> header for admin access');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});