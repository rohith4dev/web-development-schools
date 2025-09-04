// import mysql from "mysql2/promise";

// export async function query({ query, values = [] }: { query: string; values?: any[] }) {
//   const connection = await mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//   });

//   try {
//     const [results] = await connection.execute(query, values);
//     return results;
//   } catch (error) {
//     throw Error("DB Error: " + (error as Error).message);
//   } finally {
//     await connection.end();
//   }
// }


// lib/db.ts
import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: process.env.DB_HOST,     // e.g., "localhost"
  user: process.env.DB_USER,     // e.g., "root"
  password: process.env.DB_PASS, // your MySQL password
  database: 'school_db',
});
