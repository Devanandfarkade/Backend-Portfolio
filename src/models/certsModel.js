import db from "../config/db.js";

export async function getAllCertifications() {
  const result = await db.query("SELECT * FROM certifications ORDER BY display_order ASC, id DESC");
  return result.rows;
}

export async function createCertification({ title, issuer, date, credentialId, link, skills = [], iconEmoji = "🎓", colorHex = "#39ff14", displayOrder = 0 }) {
  const result = await db.query(
    "INSERT INTO certifications (title, issuer, date, credential_id, link, skills, icon_emoji, color_hex, display_order) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
    [title, issuer, date, credentialId, link, skills, iconEmoji, colorHex, displayOrder]
  );
  return result.rows[0];
}

export async function updateCertification(id, { title, issuer, date, credentialId, link, skills, iconEmoji, colorHex, displayOrder }) {
  const result = await db.query(
    "UPDATE certifications SET title = $1, issuer = $2, date = $3, credential_id = $4, link = $5, skills = $6, icon_emoji = $7, color_hex = $8, display_order = $9 WHERE id = $10 RETURNING *",
    [title, issuer, date, credentialId, link, skills, iconEmoji, colorHex, displayOrder, id]
  );
  return result.rows[0];
}

export async function deleteCertification(id) {
  const result = await db.query("DELETE FROM certifications WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
}
