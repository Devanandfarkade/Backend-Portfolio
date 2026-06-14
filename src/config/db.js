import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("CRITICAL: DATABASE_URL is not set in environment variables.");
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});

pool.on("connect", () => {
  console.log("Database connected successfully to PostgreSQL pool.");
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle database client:", err);
  process.exit(-1);
});

export default {
  query: (text, params) => pool.query(text, params),
  pool
};
