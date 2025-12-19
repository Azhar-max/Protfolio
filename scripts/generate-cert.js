const fs = require('fs');
const path = require('path');
const mkcert = require('mkcert');

async function generateCertificates() {
  try {
    // Check if certificates already exist
    const keyPath = path.join(__dirname, '..', 'localhost-key.pem');
    const certPath = path.join(__dirname, '..', 'localhost.pem');
    
    if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
      console.log('Certificates already exist. Skipping generation.');
      return;
    }
    
    // Create a certificate authority
    const ca = await mkcert.createCA({
      organization: 'Azhar Portfolio Dev',
      countryCode: 'US',
      state: 'California',
      locality: 'San Francisco',
      validityDays: 365
    });
    
    // Create a certificate for localhost
    const cert = await mkcert.createCert({
      domains: ['localhost', '127.0.0.1', '::1'],
      validityDays: 365,
      caKey: ca.key,
      caCert: ca.cert
    });
    
    // Write the certificates to files
    fs.writeFileSync(keyPath, cert.key);
    fs.writeFileSync(certPath, cert.cert);
    
    console.log('Certificates generated successfully!');
    console.log(`Key: ${keyPath}`);
    console.log(`Cert: ${certPath}`);
  } catch (error) {
    console.error('Error generating certificates:', error);
  }
}

generateCertificates();