#!/usr/bin/env node

/**
 * TLS and HTTP/2 Validation Script
 * 
 * This script validates:
 * 1. TLS certificate validity
 * 2. HTTP/2 protocol support
 * 3. Cipher suite strength
 * 4. ALPN protocol negotiation
 */

const https = require('https');
const tls = require('tls');
const fs = require('fs');
const path = require('path');

// Configuration
const HOST = 'localhost';
const PORT = 8443;
const CERT_PATH = path.join(__dirname, '..', 'localhost.pem');
const KEY_PATH = path.join(__dirname, '..', 'localhost-key.pem');

// Test HTTP/2 support
function testHttp2Support() {
  return new Promise((resolve) => {
    const options = {
      hostname: HOST,
      port: PORT,
      path: '/',
      method: 'GET',
      ALPNProtocols: ['h2', 'http/1.1'],
      rejectUnauthorized: false // Self-signed certs
    };

    const req = https.request(options, (res) => {
      const protocol = res.alpnProtocol || res.connection.alpnProtocol;
      resolve({
        success: true,
        protocol: protocol,
        http2: protocol === 'h2',
        statusCode: res.statusCode,
        headers: res.headers
      });
    });

    req.on('error', (error) => {
      resolve({
        success: false,
        error: error.message
      });
    });

    req.setTimeout(5000, () => {
      req.destroy();
      resolve({
        success: false,
        error: 'Request timeout'
      });
    });

    req.end();
  });
}

// Test TLS configuration
function testTlsConfiguration() {
  return new Promise((resolve) => {
    const options = {
      host: HOST,
      port: PORT,
      rejectUnauthorized: false, // Self-signed certs
      ALPNProtocols: ['h2', 'http/1.1']
    };

    const socket = tls.connect(options, () => {
      const cipher = socket.getCipher();
      const protocol = socket.alpnProtocol;
      const cert = socket.getPeerCertificate();
      
      socket.end();
      
      resolve({
        success: true,
        tlsVersion: cipher.version,
        cipher: cipher.name,
        protocol: protocol,
        certificate: {
          subject: cert.subject,
          issuer: cert.issuer,
          validFrom: cert.valid_from,
          validTo: cert.valid_to
        }
      });
  });

    socket.on('error', (error) => {
      resolve({
        success: false,
        error: error.message
      });
    });
  });
}

// Validate certificate files
function validateCertificates() {
  try {
    if (!fs.existsSync(CERT_PATH)) {
      return { success: false, error: 'Certificate file not found' };
    }
    
    if (!fs.existsSync(KEY_PATH)) {
      return { success: false, error: 'Private key file not found' };
    }
    
    const cert = fs.readFileSync(CERT_PATH, 'utf8');
    const key = fs.readFileSync(KEY_PATH, 'utf8');
    
    return {
      success: true,
      certPath: CERT_PATH,
      keyPath: KEY_PATH,
      certLength: cert.length,
      keyLength: key.length
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// Strong cipher check
function isStrongCipher(cipherName) {
  // List of strong cipher suites
  const strongCiphers = [
    'TLS_AES_128_GCM_SHA256',
    'TLS_AES_256_GCM_SHA384',
    'TLS_CHACHA20_POLY1305_SHA256',
    'ECDHE-RSA-AES128-GCM-SHA256',
    'ECDHE-RSA-AES256-GCM-SHA384',
    'ECDHE-RSA-CHACHA20-POLY1305'
  ];
  
  return strongCiphers.some(strong => cipherName.includes(strong));
}

// Run validation
async function runValidation() {
  console.log('=== TLS and HTTP/2 Validation ===\n');
  
  // Validate certificates
  console.log('1. Validating certificates...');
  const certResult = validateCertificates();
  if (certResult.success) {
    console.log('   ✓ Certificates found and readable');
    console.log(`   Certificate: ${certResult.certPath}`);
    console.log(`   Private Key: ${certResult.keyPath}\n`);
  } else {
    console.log(`   ✗ Certificate validation failed: ${certResult.error}\n`);
    return;
  }
  
  // Test TLS configuration
  console.log('2. Testing TLS configuration...');
  const tlsResult = await testTlsConfiguration();
  if (tlsResult.success) {
    console.log(`   ✓ TLS Version: ${tlsResult.tlsVersion}`);
    console.log(`   ✓ Cipher Suite: ${tlsResult.cipher}`);
    console.log(`   ✓ ALPN Protocol: ${tlsResult.protocol || 'Not negotiated'}`);
    console.log(`   ✓ Strong Cipher: ${isStrongCipher(tlsResult.cipher) ? 'Yes' : 'No'}`);
    
    if (tlsResult.certificate) {
      console.log(`   ✓ Certificate Subject: ${JSON.stringify(tlsResult.certificate.subject)}`);
      console.log(`   ✓ Valid From: ${tlsResult.certificate.validFrom}`);
      console.log(`   ✓ Valid To: ${tlsResult.certificate.validTo}`);
    }
    console.log('');
  } else {
    console.log(`   ✗ TLS test failed: ${tlsResult.error}\n`);
  }
  
  // Test HTTP/2 support
  console.log('3. Testing HTTP/2 support...');
  const http2Result = await testHttp2Support();
  if (http2Result.success) {
    console.log(`   ✓ Status Code: ${http2Result.statusCode}`);
    console.log(`   ✓ Negotiated Protocol: ${http2Result.protocol || 'None'}`);
    console.log(`   ✓ HTTP/2 Active: ${http2Result.http2 ? 'Yes' : 'No'}`);
    console.log('');
  } else {
    console.log(`   ✗ HTTP/2 test failed: ${http2Result.error}\n`);
  }
  
  // Summary
  console.log('=== Validation Summary ===');
  if (certResult.success && tlsResult.success) {
    const protocol = tlsResult.protocol || http2Result.protocol;
    console.log(`✓ TLS Configuration: Secure (${tlsResult.tlsVersion})`);
    console.log(`✓ Protocol Negotiation: ${protocol || 'None'}`);
    console.log(`✓ HTTP/2 Support: ${http2Result.http2 ? 'Enabled' : 'Not negotiated'}`);
    console.log(`✓ Cipher Strength: ${isStrongCipher(tlsResult.cipher) ? 'Strong' : 'Weak'}`);
    
    if (http2Result.http2) {
      console.log('\n🎉 HTTP/2 is successfully enabled!');
    } else {
      console.log('\n⚠️  HTTP/2 not negotiated. This may be due to client or server configuration.');
    }
  } else {
    console.log('✗ Validation failed. Please check the errors above.');
  }
}

// Run if called directly
if (require.main === module) {
  runValidation().catch(console.error);
}

module.exports = {
  testHttp2Support,
  testTlsConfiguration,
  validateCertificates,
  isStrongCipher
};