const { Pool } = require('pg');

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "joyas",
  password: "18211238-a3163486",
  port: 3163,
  allowExitOnIdle: true,
});

module.exports = pool;
