const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'horroropedia',
  password: 'F0rb1dd3n',
  port: 5432
});

module.exports = pool;
