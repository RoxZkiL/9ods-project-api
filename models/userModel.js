const pool = require("../database/database");

const User = {
  findByEmail: async (email) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  },
  create: async (name, email, password, profileImage) => {
    const result = await pool.query(
      "INSERT INTO users (name, email, password, profile_image) VALUES ($1, $2, $3, $4) RETURNING id",
      [name, email, password, profileImage]
    );
    return result.rows[0];
  },
};

module.exports = User;
