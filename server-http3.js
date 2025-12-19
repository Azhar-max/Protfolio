/**
 * HTTP/3 Server Example
 * 
 * Note: HTTP/3 support in Node.js is experimental and requires Node.js 16+ with QUIC support
 * or a third-party library like @fails-components/webtransport
 * 
 * This is an example of how to configure HTTP/3 for future implementation
 */

const fs = require('fs');
const path = require('path');
const express = require('express');

// Create Express app
const app = express();

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Admin endpoint
app.get('/admin', (req, res) => {
  // Simple authentication check (in a real app, use proper authentication)
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== 'Bearer admin-secret-token') {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  
  res.json({ 
    message: 'Admin endpoint accessed successfully (HTTP/3)',
    timestamp: new Date().toISOString(),
    httpVersion: '3.0' // Simulating HTTP/3
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    httpVersion: '3.0' // Simulating HTTP/3
  });
});

// API endpoint to check HTTP version
app.get('/api/http-version', (req, res) => {
  res.json({ 
    httpVersion: '3.0', // Simulating HTTP/3
    protocol: 'https',
    secure: true
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

// HTTP/3 server configuration example
// Note: This is a conceptual example as HTTP/3 support varies by platform
const startHttp3Server = () => {
  try {
    // Check if certificates exist
    const keyPath = path.join(__dirname, 'localhost-key.pem');
    const certPath = path.join(__dirname, 'localhost.pem');
    
    if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
      console.log('TLS certificates not found. Cannot start HTTP/3 server.');
      return null;
    }
    
    // HTTP/3 configuration example (conceptual)
    const options = {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
      // HTTP/3 specific options would go here
      // These are illustrative and may not work with current implementations
      http3: {
        enable: true,
        quic: {
          maxIdleTimeout: 30000,
          maxUdpPayloadSize: 1200,
          ackDelayExponent: 3,
          maxAckDelay: 25,
          disableActiveMigration: false,
          activeConnectionIdLimit: 2
        }
      }
    };
    
    console.log('HTTP/3 server configuration example created.');
    console.log('Note: Actual HTTP/3 implementation requires specific libraries or Node.js experimental features.');
    
    return options;
  } catch (error) {
    console.error('Error setting up HTTP/3 server:', error.message);
    return null;
  }
};

// Export for use in other files
module.exports = {
  startHttp3Server
};

// If run directly, show configuration example
if (require.main === module) {
  console.log('=== HTTP/3 Configuration Example ===');
  console.log('This is a conceptual example of HTTP/3 configuration.');
  console.log('Actual implementation would depend on the specific HTTP/3 library used.');
  
  const config = startHttp3Server();
  if (config) {
    console.log('Configuration ready for HTTP/3 implementation.');
  }
}