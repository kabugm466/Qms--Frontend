const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

if (!SECRET) {
  // Fail loudly at boot rather than silently signing tokens with `undefined`.
  throw new Error('JWT_SECRET is not set in the environment (.env)');
}

/**
 * Sign a JWT for a given user payload.
 * Keep the payload small — id, role, institution_id are enough for
 * authorize.js to make decisions without a DB round-trip.
 */
function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
}

/**
 * Verify a JWT. Throws if invalid/expired — callers (authenticate.js)
 * are expected to catch and turn this into a 401.
 */
function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { signToken, verifyToken };
