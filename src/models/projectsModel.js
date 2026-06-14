import db from "../config/db.js";

export async function getAllProjects() {
  const result = await db.query("SELECT * FROM projects ORDER BY id DESC");
  return result.rows;
}

export async function getProjectById(id) {
  const result = await db.query("SELECT * FROM projects WHERE id = $1", [id]);
  return result.rows[0];
}

export async function createProject({ title, description, category, repoUrl, liveUrl, status = "STABLE", colorHex = "#00e5ff", tags = [] }) {
  const result = await db.query(
    "INSERT INTO projects (title, description, category, repo_url, live_url, status, color_hex, tags) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
    [title, description, category, repoUrl, liveUrl, status, colorHex, tags]
  );
  return result.rows[0];
}

export async function updateProject(id, { title, description, category, repoUrl, liveUrl, status, colorHex, tags }) {
  const result = await db.query(
    "UPDATE projects SET title = $1, description = $2, category = $3, repo_url = $4, live_url = $5, status = $6, color_hex = $7, tags = $8 WHERE id = $9 RETURNING *",
    [title, description, category, repoUrl, liveUrl, status, colorHex, tags, id]
  );
  return result.rows[0];
}

export async function deleteProject(id) {
  const result = await db.query("DELETE FROM projects WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
}
