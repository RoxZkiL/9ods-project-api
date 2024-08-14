const pool = require("../database/database");

const Comment = {
  create: async (userId, blogId, content, userName, userImage) => {
    const result = await pool.query(
      "INSERT INTO comments (user_id, blog_id, content, user_name, user_image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [userId, blogId, content, userName, userImage]
    );
    return result.rows[0];
  },

  findByBlogId: async (blog_id) => {
    const result = await pool.query(
      "SELECT * FROM comments WHERE blog_id = $1 ORDER BY created_at DESC",
      [blog_id]
    );
    return result.rows;
  },

  deleteComment: async (id) => {
    const result = await pool.query(
      "DELETE FROM comments WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  },
};

module.exports = Comment;
