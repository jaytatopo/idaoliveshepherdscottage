import mysql from 'mysql2/promise';

// Using a global variable to maintain the connection pool across Lambda invocations.
declare global {
    var pool: mysql.Pool | null;
}

function getPool() {
  if (global.pool) {
    return global.pool;
  }
  
  if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_DATABASE) {
    console.warn('Database environment variables are not set. Database features will be disabled.');
    // Return a mock pool that does nothing, to prevent crashes.
    return {
      query: () => Promise.resolve([[], []]),
      execute: () => Promise.resolve([[], []]),
      end: () => Promise.resolve(),
    } as unknown as mysql.Pool;
  }

  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  global.pool = pool;
  return pool;
}

export const db = getPool();
