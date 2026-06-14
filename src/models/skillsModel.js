import db from "../config/db.js";

// --- Technical Skills ---
export async function getAllSkills() {
  const result = await db.query("SELECT * FROM skills ORDER BY category ASC, display_order ASC, name ASC");
  return result.rows;
}

export async function createSkill({ name, iconName, level, colorHex, category, displayOrder = 0 }) {
  const result = await db.query(
    "INSERT INTO skills (name, icon_name, level, color_hex, category, display_order) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [name, iconName, level, colorHex, category, displayOrder]
  );
  return result.rows[0];
}

export async function updateSkill(id, { name, iconName, level, colorHex, category, displayOrder }) {
  const result = await db.query(
    "UPDATE skills SET name = $1, icon_name = $2, level = $3, color_hex = $4, category = $5, display_order = $6 WHERE id = $7 RETURNING *",
    [name, iconName, level, colorHex, category, displayOrder, id]
  );
  return result.rows[0];
}

export async function deleteSkill(id) {
  const result = await db.query("DELETE FROM skills WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
}

// --- About Page Highlights ---
export async function getAllHighlights() {
  const result = await db.query("SELECT * FROM about_highlights ORDER BY display_order ASC, id ASC");
  return result.rows;
}

export async function createHighlight({ iconName, label, description, delayOffset = 0.0, displayOrder = 0 }) {
  const result = await db.query(
    "INSERT INTO about_highlights (icon_name, label, description, delay_offset, display_order) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [iconName, label, description, delayOffset, displayOrder]
  );
  return result.rows[0];
}

export async function updateHighlight(id, { iconName, label, description, delayOffset, displayOrder }) {
  const result = await db.query(
    "UPDATE about_highlights SET icon_name = $1, label = $2, description = $3, delay_offset = $4, display_order = $5 WHERE id = $6 RETURNING *",
    [iconName, label, description, delayOffset, displayOrder, id]
  );
  return result.rows[0];
}

export async function deleteHighlight(id) {
  const result = await db.query("DELETE FROM about_highlights WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
}
