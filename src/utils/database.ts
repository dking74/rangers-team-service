import pg, { Pool, QueryResult } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, 
});

/** Register error event handler on the pool */
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
});

/**
 * Method to make a query on the pool
 * 
 * @param {string} query 
 * @param {Array} params 
 * @returns The type that is anticipated from the query
 */
export const query = async (query: string, params: [] = []): Promise<QueryResult> => {
  const connection = await pool.connect();
  const result = await connection.query(query, params).finally(
    () => connection.release()
  );

  return result;
};

/**
 * Abstracted query specifically for data-retrieval of resources from database.
 * 
 * @param {string} _query 
 * @param {Array} params 
 * @returns {T} The templated type designated for retrieval
 */
export const getQuery = async <T>(_query: string, params: [] = []): Promise<T> => {
  const queryResult = await query(_query, params);
  return queryResult?.rows as unknown as T;
}