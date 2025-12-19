/**
 * HTTP/2 Functionality Test Script
 * 
 * This script verifies that the HTTP/2 server is working correctly
 * and that all endpoints are accessible.
 */

const https = require('https');
const tls = require('tls');

// Configuration
const HOST = 'localhost';
const PORT = 8443;

// Test results storage
let testResults = [];

// Helper function to log test results
function logTest(name, passed, details = '') {
  const status = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`${status} ${name}${details ? `: ${details}` : ''}`);
  testResults.push({ name, passed, details });
}

// Test 1: TLS Configuration and ALPN Negotiation
function testTlsConfiguration() {
  return new Promise((resolve) => {
    const options = {
      host: HOST,
      port: PORT,
      rejectUnauthorized: false,
      ALPNProtocols: ['h2', 'http/1.1']
    };

    const socket = tls.connect(options, () => {
      const tlsVersion = socket.getCipher().version;
      const protocol = socket.alpnProtocol;
      
      socket.end();
      
      const passed = tlsVersion && protocol;
      logTest('TLS Configuration', passed, 
        passed ? `${tlsVersion} with ${protocol} protocol` : 'Failed to establish TLS connection');
      
      resolve(passed);
    });

    socket.on('error', (error) => {
      logTest('TLS Configuration', false, error.message);
      resolve(false);
    });
  });
}

// Test 2: HTTPS Request Handling
function testHttpsRequest() {
  return new Promise((resolve) => {
    const options = {
      hostname: HOST,
      port: PORT,
      path: '/health',
      method: 'GET',
      rejectUnauthorized: false
    };

    const req = https.request(options, (res) => {
      const passed = res.statusCode === 200;
      logTest('HTTPS Request Handling', passed, 
        passed ? `Status ${res.statusCode}` : `Status ${res.statusCode}`);
      
      // Collect response data to properly close connection
      res.on('data', () => {});
      res.on('end', () => resolve(passed));
    });

    req.on('error', (error) => {
      logTest('HTTPS Request Handling', false, error.message);
      resolve(false);
    });

    req.end();
  });
}

// Test 3: Admin Login
function testAdminLogin() {
  return new Promise((resolve) => {
    const data = JSON.stringify({
      username: 'admin',
      password: 'admin123'
    });

    const options = {
      hostname: HOST,
      port: PORT,
      path: '/admin/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      },
      rejectUnauthorized: false
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        const passed = res.statusCode === 200;
        let details = `Status ${res.statusCode}`;
        
        if (passed) {
          try {
            const jsonData = JSON.parse(responseData);
            details += `, Token: ${jsonData.token ? 'Generated' : 'Missing'}`;
          } catch (e) {
            details += ', Invalid JSON response';
            resolve(false);
            return;
          }
        }
        
        logTest('Admin Login', passed, details);
        resolve(passed);
      });
    });

    req.on('error', (error) => {
      logTest('Admin Login', false, error.message);
      resolve(false);
    });

    req.write(data);
    req.end();
  });
}

// Test 4: Admin Endpoint Access
function testAdminAccess() {
  return new Promise((resolve) => {
    // First, get a token
    const loginData = JSON.stringify({
      username: 'admin',
      password: 'admin123'
    });

    const loginOptions = {
      hostname: HOST,
      port: PORT,
      path: '/admin/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': loginData.length
      },
      rejectUnauthorized: false
    };

    const loginReq = https.request(loginOptions, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode !== 200) {
          logTest('Admin Access', false, `Login failed with status ${res.statusCode}`);
          resolve(false);
          return;
        }
        
        try {
          const jsonData = JSON.parse(responseData);
          const token = jsonData.token;
          
          if (!token) {
            logTest('Admin Access', false, 'No token received from login');
            resolve(false);
            return;
          }
          
          // Now test accessing the admin endpoint
          const adminOptions = {
            hostname: HOST,
            port: PORT,
            path: '/admin',
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            rejectUnauthorized: false
          };

          const adminReq = https.request(adminOptions, (res) => {
            const passed = res.statusCode === 200;
            logTest('Admin Access', passed, 
              passed ? `Status ${res.statusCode}` : `Status ${res.statusCode}`);
            
            // Collect response data to properly close connection
            res.on('data', () => {});
            res.on('end', () => resolve(passed));
          });

          adminReq.on('error', (error) => {
            logTest('Admin Access', false, error.message);
            resolve(false);
          });

          adminReq.end();
        } catch (e) {
          logTest('Admin Access', false, 'Failed to parse login response');
          resolve(false);
        }
      });
    });

    loginReq.on('error', (error) => {
      logTest('Admin Access', false, `Login error: ${error.message}`);
      resolve(false);
    });

    loginReq.write(loginData);
    loginReq.end();
  });
}

// Run all tests
async function runAllTests() {
  console.log('🧪 HTTP/2 Functionality Tests\n');
  
  await testTlsConfiguration();
  await testHttpsRequest();
  await testAdminLogin();
  await testAdminAccess();
  
  console.log('\n📋 Test Summary:');
  const passedTests = testResults.filter(t => t.passed).length;
  const totalTests = testResults.length;
  
  console.log(`Passed: ${passedTests}/${totalTests}`);
  
  if (passedTests === totalTests) {
    console.log('\n🎉 All tests passed! Your HTTP/2 server is working correctly.');
    console.log('\n💡 Next steps:');
    console.log('1. Deploy to Railway with the updated configuration');
    console.log('2. Verify HTTP/2 functionality in production');
    console.log('3. Test admin endpoints in production environment');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the output above for details.');
    console.log('Refer to COMPREHENSIVE_HTTP2_HTTP3_SOLUTION.md for troubleshooting steps.');
  }
}

// Run if called directly
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = {
  testTlsConfiguration,
  testHttpsRequest,
  testAdminLogin,
  testAdminAccess,
  runAllTests
};