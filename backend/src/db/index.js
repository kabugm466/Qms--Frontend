const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.on('error', (err) => {
  // Errors on idle clients (e.g. connection dropped) shouldn't crash the process.
  console.error('[db] Unexpected error on idle client', err);
});

/**
 * Run a query against the pool. Thin wrapper so call sites don't import
 * `pool` directly and so we have one place to add query logging/metrics later.
 */
function query(text, params) {
  return pool.query(text, params);
}

/**
 * Borrow a client for a multi-statement transaction.
 * Usage:
 *   const client = await getClient();
 *   try {
 *     await client.query('BEGIN');
 *     ...
 *     await client.query('COMMIT');
 *   } catch (err) {
 *     await client.query('ROLLBACK');
 *     throw err;
 *   } finally {
 *     client.release();
 *   }
 */
function getClient() {
  return pool.connect();
}

module.exports = { pool, query, getClient };
