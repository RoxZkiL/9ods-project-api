const pool = require("../database/database");

const User = {
  findByEmail: async (email) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  },
  create: async (name, email, password, profile_image) => {
    const result = await pool.query(
      "INSERT INTO users (email, password, name, profile_image, is_admin) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [email, password, name, profile_image, is_admin]
    );
    return result.rows[0];
  },
};

module.exports = User;
