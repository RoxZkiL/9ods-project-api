const pool = require("../database/database");

const Blog = {
  create: async (title, image_url, content, admin_id) => {
    const { rows } = await pool.query(
      "INSERT INTO blog_details (title, image_url, content, admin_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, image_url, content, admin_id]
    );
    return rows[0];
  },

  update: async (id, title, image_url, content) => {
    const { rows } = await pool.query(
      "UPDATE blog_details SET title = $1, image_url = $2, content = $3, updated_at = now() WHERE id = $4 RETURNING *",
      [title, image_url, content, id]
    );
    return rows[0];
  },

  delete: async (id) => {
    const { rows } = await pool.query(
      "DELETE FROM blog_details WHERE id = $1 RETURNING *",
      [id]
    );
    return rows[0];
  },

  findAllPosts: async () => {
    const result = await pool.query(
      "SELECT * FROM blog_details ORDER BY created_at ASC"
    );
    return result.rows;
  },

  findPostById: async (id) => {
    const result = await pool.query(
      "SELECT * FROM blog_details WHERE id = $1",
      [id]
    );
    return result.rows[0];
  },
};

module.exports = Blog;
