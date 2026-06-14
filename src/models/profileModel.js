import db from "../config/db.js";

// --- Profile Settings ---
export async function getProfile() {
  const result = await db.query("SELECT * FROM profile_settings LIMIT 1");
  return result.rows[0];
}

export async function updateProfile(fields) {
  const keys = Object.keys(fields);
  if (keys.length === 0) return null;

  const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
  const values = Object.values(fields);

  const query = `
    UPDATE profile_settings 
    SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
    WHERE id = (SELECT id FROM profile_settings LIMIT 1) 
    RETURNING *
  `;
  const result = await db.query(query, values);
  return result.rows[0];
}

// --- Hero Roles ---
export async function getHeroRoles() {
  const result = await db.query("SELECT * FROM hero_roles ORDER BY display_order ASC, id ASC");
  return result.rows;
}

export async function createHeroRole(roleName, displayOrder = 0) {
  const result = await db.query(
    "INSERT INTO hero_roles (role_name, display_order) VALUES ($1, $2) RETURNING *",
    [roleName, displayOrder]
  );
  return result.rows[0];
}

export async function updateHeroRole(id, roleName, displayOrder) {
  const result = await db.query(
    "UPDATE hero_roles SET role_name = $1, display_order = $2 WHERE id = $3 RETURNING *",
    [roleName, displayOrder, id]
  );
  return result.rows[0];
}

export async function deleteHeroRole(id) {
  const result = await db.query("DELETE FROM hero_roles WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
}

// --- Hero Stats ---
export async function getHeroStats() {
  const result = await db.query("SELECT * FROM hero_stats ORDER BY display_order ASC, id ASC");
  return result.rows;
}

export async function createHeroStat(value, label, displayOrder = 0) {
  const result = await db.query(
    "INSERT INTO hero_stats (value, label, display_order) VALUES ($1, $2, $3) RETURNING *",
    [value, label, displayOrder]
  );
  return result.rows[0];
}

export async function updateHeroStat(id, value, label, displayOrder) {
  const result = await db.query(
    "UPDATE hero_stats SET value = $1, label = $2, display_order = $3 WHERE id = $4 RETURNING *",
    [value, label, displayOrder, id]
  );
  return result.rows[0];
}

export async function deleteHeroStat(id) {
  const result = await db.query("DELETE FROM hero_stats WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
}
