import db from "../config/db.js";

export async function findByUsername(username) {
  const result = await db.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );
  return result.rows[0];
}

export async function findById(id) {
  const result = await db.query(
    "SELECT id, username, email, role, created_at FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

export async function createUser({ username, email, passwordHash, role = "admin" }) {
  const result = await db.query(
    "INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role, created_at",
    [username, email, passwordHash, role]
  );
  return result.rows[0];
}

export async function countUsers() {
  const result = await db.query("SELECT COUNT(*)::int as count FROM users");
  return result.rows[0].count;
}
