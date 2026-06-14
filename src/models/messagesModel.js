import db from "../config/db.js";

export async function getAllMessages() {
  const result = await db.query("SELECT * FROM messages ORDER BY created_at DESC");
  return result.rows;
}

export async function createMessage({ name, email, subject, message, ipAddress = "127.0.0.1" }) {
  const result = await db.query(
    "INSERT INTO messages (name, email, subject, message, ip_address) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, email, subject, message, ipAddress]
  );
  return result.rows[0];
}

export async function updateMessageStatus(id, status) {
  const result = await db.query(
    "UPDATE messages SET status = $1 WHERE id = $2 RETURNING *",
    [status, id]
  );
  return result.rows[0];
}

export async function deleteMessage(id) {
  const result = await db.query("DELETE FROM messages WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
}

export async function getDashboardStats() {
  const result = await db.query("SELECT * FROM get_admin_dashboard_stats()");
  return result.rows[0];
}
