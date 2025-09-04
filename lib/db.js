import mysql from 'mysql2/promise';

export async function connectDB() {
  const db = await mysql.createConnection({
    host: 'localhost', // or your server
    user: 'root',
    password: 'password',
    database: 'schoolDB'
  });
  return db;
}
