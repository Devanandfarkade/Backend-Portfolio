import db from "../config/db.js";

export async function getAllEducation() {
  const result = await db.query("SELECT * FROM education ORDER BY display_order ASC, id DESC");
  return result.rows;
}

export async function createEducation({ degree, institution, location, period, grade, highlights = [], colorHex = "#00e5ff", displayOrder = 0 }) {
  const result = await db.query(
    "INSERT INTO education (degree, institution, location, period, grade, highlights, color_hex, display_order) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
    [degree, institution, location, period, grade, highlights, colorHex, displayOrder]
  );
  return result.rows[0];
}

export async function updateEducation(id, { degree, institution, location, period, grade, highlights, colorHex, displayOrder }) {
  const result = await db.query(
    "UPDATE education SET degree = $1, institution = $2, location = $3, period = $4, grade = $5, highlights = $6, color_hex = $7, display_order = $8 WHERE id = $9 RETURNING *",
    [degree, institution, location, period, grade, highlights, colorHex, displayOrder, id]
  );
  return result.rows[0];
}

export async function deleteEducation(id) {
  const result = await db.query("DELETE FROM education WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
}
