const pool = require("../database/database");

const Comment = {
  create: async (userId, blogId, content, userName, userImage) => {
    const result = await pool.query(
      "INSERT INTO comments (user_id, blog_id, content, user_name, user_image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [userId, blogId, content, userName, userImage]
    );
    return result.rows[0];
  },

  findByBlogId: async (blogId) => {
    const result = await pool.query(
      "SELECT * FROM comments WHERE blog_id = $1 ORDER BY created_at DESC",
      [blogId]
    );
    return result.rows;
  },
};

module.exports = Comment;
