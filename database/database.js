const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "user_auth",
  password: "2216179",
  port: 5432,
});

module.exports = pool;
