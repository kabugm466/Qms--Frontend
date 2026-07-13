const { verifyToken } = require('../config/jwt');

/**
 * Requires a valid `Authorization: Bearer <token>` header.
 * On success, attaches the decoded payload (id, role, ...) to req.user.
 * Any failure is forwarded to errorHandler via next(err).
 */
function authenticate(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header' });
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch (err) {
    next(err); // errorHandler translates JsonWebTokenError / TokenExpiredError
  }
}

module.exports = { authenticate };
