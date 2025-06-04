import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.HOST);
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: true,
  },
});
export default pool.promise();
