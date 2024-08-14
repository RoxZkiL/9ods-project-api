const pool = require("../database/database");

const News = {
  create: async (title, summary, content, image_url, admin_id) => {
    const { rows } = await pool.query(
      "INSERT INTO news (title, summary, content, image_url, admin_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, summary, content, image_url, admin_id]
    );
    return rows[0];
  },

  update: async (id, title, summary, content, image_url) => {
    const { rows } = await pool.query(
      "UPDATE news SET title = $1, summary = $2, content = $3, image_url = $4, updated_at = now() WHERE id = $5 RETURNING *",
      [title, summary, content, image_url, id]
    );
    return rows[0];
  },

  delete: async (id) => {
    const { rows } = await pool.query(
      "DELETE FROM news WHERE id = $1 RETURNING *",
      [id]
    );
    return rows[0];
  },

  findAll: async () => {
    const result = await pool.query("SELECT * FROM news");
    return result.rows;
  },

  findById: async (id) => {
    const result = await pool.query("SELECT * FROM news WHERE id = $1", [id]);
    return result.rows[0];
  },
};
