import { sql } from '@vercel/postgres';

// By using the `sql` template literal from `@vercel/postgres`,
// Vercel automatically handles the database connection using the
// `POSTGRES_URL` environment variable. You do not need to
// create a connection pool manually.
//
// This makes the code cleaner and more secure in a serverless environment.

export const db = {
    // We are creating a db object that is compatible with the `mysql2/promise` API
    // that the rest of the application uses.
    // The `sql` template literal is the modern way to query with `@vercel/postgres`.
    // The query method is provided for compatibility with existing code.
    query: (query: string, values?: any[]) => sql.query(query, values),
    execute: (query: string, values?: any[]) => sql.query(query, values),
};
