/**
 * Admin Authentication Utility
 * 
 * This module provides functions for admin authentication and authorization
 */

/**
 * Authenticate admin user
 * @param {string} username - Username
 * @param {string} password - Password
 * @returns {object|null} User object if authenticated, null otherwise
 */
function authenticateAdmin(username, password) {
  // In a real application, you would hash the password and compare it to the stored hash
  // For this example, we're using a simple check
  if (username === 'admin' && password === 'admin123') {
    return {
      username: 'admin',
      role: 'administrator',
      permissions: ['read', 'write', 'delete'],
      token: generateToken()
    };
  }
  return null;
}

/**
 * Generate a simple token (in a real app, use JWT or similar)
 * @returns {string} Token
 */
function generateToken() {
  return 'admin-token-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

/**
 * Verify admin token
 * @param {string} token - Token to verify
 * @returns {boolean} True if valid, false otherwise
 */
function verifyToken(token) {
  // In a real application, you would verify the token signature and expiration
  return token && token.startsWith('admin-token-');
}

/**
 * Check if user has permission
 * @param {object} user - User object
 * @param {string} permission - Permission to check
 * @returns {boolean} True if user has permission, false otherwise
 */
function hasPermission(user, permission) {
  return user && user.permissions && user.permissions.includes(permission);
}

/**
 * Middleware for admin authentication
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - Next middleware function
 */
function adminAuthMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }
  
  const token = authHeader.replace('Bearer ', '');
  
  if (!verifyToken(token)) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
  
  // Attach user info to request
  req.user = {
    username: 'admin',
    role: 'administrator',
    permissions: ['read', 'write', 'delete']
  };
  
  next();
}

module.exports = {
  authenticateAdmin,
  verifyToken,
  hasPermission,
  adminAuthMiddleware
};