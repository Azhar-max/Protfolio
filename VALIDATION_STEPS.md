# HTTP/2 and TLS Validation Steps

This document provides detailed steps to validate that your server correctly supports HTTP/2 with proper TLS configuration.

## Prerequisites

Before validating, ensure you have:
1. Generated TLS certificates using `npm run dev`
2. Started the server with `npm start`
3. The server is running on `https://localhost:8443`

## Automated Validation

Run the automated validation script:

```bash
npm run validate
```

This will check:
- Certificate validity
- TLS configuration
- HTTP/2 protocol support
- Cipher suite strength

## Manual Browser Validation

### Chrome DevTools Method

1. Open Chrome and navigate to `https://localhost:8443`
2. Press `F12` to open Developer Tools
3. Go to the Network tab
4. Refresh the page
5. Check the "Protocol" column for values like:
   - `h2` for HTTP/2
   - `http/1.1` for HTTP/1.1
6. Go to the Security tab to view TLS details

### Firefox Developer Tools Method

1. Open Firefox and navigate to `https://localhost:8443`
2. Press `F12` to open Developer Tools
3. Go to the Network tab
4. Refresh the page
5. Right-click on column headers and ensure "Protocol" is selected
6. Check protocol values as described for Chrome

## Command-Line Validation

### Using curl

Check HTTP/2 support:

```bash
curl -I --http2 https://localhost:8443 --insecure
```

Check TLS version and cipher:

```bash
curl -I --tlsv1.2 --ciphers ECDHE-RSA-AES128-GCM-SHA256 https://localhost:8443 --insecure
```

Verbose TLS information:

```bash
curl -v https://localhost:8443 --insecure
```

### Using OpenSSL

Check TLS handshake:

```bash
openssl s_client -connect localhost:8443 -servername localhost -alpn h2
```

Check supported protocols:

```bash
openssl s_client -connect localhost:8443 -servername localhost -nextprotoneg ''
```

Check certificate details:

```bash
openssl x509 -in localhost.pem -text -noout
```

## Admin Endpoint Validation

### Login to Admin Panel

1. Send a POST request to login:
```bash
curl -X POST https://localhost:8443/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  --insecure
```

2. Use the returned token to access the admin endpoint:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  https://localhost:8443/admin \
  --insecure
```

## Expected Results

### Successful HTTP/2 Configuration

In browser Network tab:
- Protocol column shows `h2` for most resources
- Mixed content warnings should be absent
- Fast loading times due to multiplexing

In terminal with curl:
- Response headers include `HTTP/2 200`
- Connection is established securely

### TLS Configuration

Security checks should show:
- TLS 1.2 or TLS 1.3
- Strong cipher suite (AES-GCM or ChaCha20-Poly1305)
- Valid certificate chain
- No weak cipher warnings

## Troubleshooting

### HTTP/2 Not Working

1. Check that ALPN is configured correctly in server settings
2. Ensure TLS 1.2 or higher is enabled
3. Verify strong cipher suites are used
4. Confirm certificates are valid and properly configured

### Certificate Errors

1. Regenerate certificates with `npm run dev`
2. Ensure browser trusts self-signed certificates (add exception)
3. Check certificate paths in server configuration

### Admin Authentication Issues

1. Verify correct username/password (admin/admin123)
2. Check that the Authorization header is properly formatted
3. Ensure the token is included in requests to protected endpoints

### Performance Issues

1. Verify HTTP/2 multiplexing is working
2. Check for blocking resources
3. Ensure proper compression is enabled
4. Validate caching headers

## Production Considerations

For production deployments:

1. Use certificates from a trusted CA (Let's Encrypt, DigiCert, etc.)
2. Configure CDN with HTTP/2 support (Cloudflare, AWS CloudFront)
3. Implement proper HSTS headers
4. Set up OCSP stapling
5. Regularly update cipher suites based on current best practices
6. Use environment variables for sensitive configuration
7. Implement proper logging and monitoring

## Additional Resources

- [Mozilla SSL Configuration Generator](https://ssl-config.mozilla.org/)
- [HTTP/2 Specification](https://httpwg.org/specs/rfc7540.html)
- [HTTP/3 Specification](https://quicwg.org/base-drafts/draft-ietf-quic-http.html)
- [Chrome HTTP/2 and HTTP/3 Support Documentation](https://www.chromium.org/quic/)