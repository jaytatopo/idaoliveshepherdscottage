import mysql from 'mysql2/promise';

// This prevents TypeScript errors when using `global.db_pool`.
declare global {
  // We use `var` here because `let` and `const` have block scope.
  // eslint-disable-next-line no-var
  var db_pool: mysql.Pool | undefined;
}

const createDbPool = () => {
    if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_DATABASE) {
        console.warn('Database environment variables are not set. Database features will be disabled. Using mock pool.');
        // Return a mock pool that does nothing, to prevent crashes.
        return {
          query: () => Promise.resolve([[], []]),
          execute: () => Promise.resolve([[], []]),
          end: () => Promise.resolve(),
        } as unknown as mysql.Pool;
    }

    return mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
}

// In development, Next.js can clear the Node.js cache on every request,
// creating a new connection pool. We store the pool in a global variable
// to preserve it across requests.
const pool = global.db_pool ?? (global.db_pool = createDbPool());

export const db = pool;
