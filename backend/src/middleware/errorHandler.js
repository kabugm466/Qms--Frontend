/**
 * Small typed error you can throw from services/controllers:
 *   throw new AppError('Email already in use', 409);
 * errorHandler below knows how to render these cleanly.
 */
class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  // Known, "expected" errors we threw ourselves.
  if (err.isOperational) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // Joi validation errors (see middleware/validate.js).
  if (err.isJoi) {
    return res.status(400).json({ error: err.details[0].message });
  }

  // JWT errors from jsonwebtoken.
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid authentication token' });
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Authentication token has expired' });
  }

  // PostgreSQL errors (see https://www.postgresql.org/docs/current/errcodes-appendix.html).
  if (err.code === '23505') {
    return res.status(409).json({ error: 'A record with these details already exists' });
  }
  if (err.code === '23503') {
    return res.status(400).json({ error: 'Referenced record does not exist' });
  }

  // Anything else is unexpected — log the full error server-side but don't leak it.
  console.error('[unhandled error]', err);
  return res.status(500).json({ error: 'Something went wrong. Please try again.' });
}

module.exports = { errorHandler, AppError };
