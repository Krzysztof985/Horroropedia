const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'horroropedia',
  password: 'TAJNE',
  port: 5432
});

module.exports = pool;
