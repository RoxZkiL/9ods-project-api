const pool = require("../../database/database");

const User = {
  findByEmail: async (email) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  },

  createUser: async (name, email, password, is_admin) => {
    const result = await pool.query(
      "INSERT INTO users (name, email, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, password, is_admin]
    );
    return result.rows[0];
  },

  findUserById: async (id) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  },

  updatePassword: async (email, newPassword) => {
    const result = await pool.query(
      "UPDATE users SET password = $1 WHERE email = $2 RETURNING *",
      [newPassword, email]
    );
    return result.rows[0];
  },
};

module.exports = User;
