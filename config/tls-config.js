/**
 * TLS Configuration for HTTP/2 and HTTP/3 support
 * 
 * This configuration ensures:
 * 1. Strong cipher suites for security
 * 2. ALPN protocol negotiation for HTTP/2
 * 3. Future readiness for HTTP/3/QUIC
 */

module.exports = {
  // ALPN protocols for protocol negotiation
  // HTTP/2 requires ALPN to negotiate the protocol
  alpnProtocols: ['h2', 'http/1.1'],
  
  // Strong cipher suites (ordered by preference)
  // Reference: https://wiki.mozilla.org/Security/Server_Side_TLS
  cipherSuites: [
    // TLS 1.3 cipher suites
    'TLS_AES_128_GCM_SHA256',
    'TLS_AES_256_GCM_SHA384',
    'TLS_CHACHA20_POLY1305_SHA256',
    
    // TLS 1.2 cipher suites (for backward compatibility)
    'ECDHE-RSA-AES128-GCM-SHA256',
    'ECDHE-RSA-AES256-GCM-SHA384',
    'ECDHE-RSA-CHACHA20-POLY1305',
    'ECDHE-RSA-AES128-SHA256',
    'ECDHE-RSA-AES256-SHA384'
  ],
  
  // Minimum TLS version
  minVersion: 'TLSv1.2',
  
  // Maximum TLS version
  maxVersion: 'TLSv1.3',
  
  // Enable secure options
  secureOptions: [
    'SSL_OP_NO_SSLv2',
    'SSL_OP_NO_SSLv3',
    'SSL_OP_NO_COMPRESSION',
    'SSL_OP_CIPHER_SERVER_PREFERENCE',
    'SSL_OP_NO_TLSv1',
    'SSL_OP_NO_TLSv1_1'
  ].reduce((acc, flag) => acc | (require('constants')[flag] || 0), 0),
  
  // Honor cipher order
  honorCipherOrder: true,
  
  // EC curve for ECDHE
  ecdhCurve: 'prime256v1:secp384r1',
  
  // Session timeout
  sessionTimeout: 300
};