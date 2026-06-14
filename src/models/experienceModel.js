import db from "../config/db.js";

export async function getAllExperiences() {
  const result = await db.query("SELECT * FROM experiences ORDER BY display_order ASC, id DESC");
  return result.rows;
}

export async function createExperience({ role, company, location, period, type = "Full-Time", description, points = [], tech = [], colorHex = "#39ff14", displayOrder = 0 }) {
  const result = await db.query(
    "INSERT INTO experiences (role, company, location, period, type, description, points, tech, color_hex, display_order) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
    [role, company, location, period, type, description, points, tech, colorHex, displayOrder]
  );
  return result.rows[0];
}

export async function updateExperience(id, { role, company, location, period, type, description, points, tech, colorHex, displayOrder }) {
  const result = await db.query(
    "UPDATE experiences SET role = $1, company = $2, location = $3, period = $4, type = $5, description = $6, points = $7, tech = $8, color_hex = $9, display_order = $10 WHERE id = $11 RETURNING *",
    [role, company, location, period, type, description, points, tech, colorHex, displayOrder, id]
  );
  return result.rows[0];
}

export async function deleteExperience(id) {
  const result = await db.query("DELETE FROM experiences WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
}
