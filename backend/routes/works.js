const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
  const result = await pool.query(`
    SELECT
      id,
      title,
      author,
      producer,
      release_date AS "releaseDate",
      category
    FROM works
  `);

  res.json(result.rows);
});

router.post('/', async (req, res) => {
  const { title, author, producer, releaseDate, category } = req.body;

  const result = await pool.query(
    `
      INSERT INTO works (
        title,
        author,
        producer,
        release_date,
        category
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING
        id,
        title,
        author,
        producer,
        release_date AS "releaseDate",
        category
    `,
    [title, author, producer ?? null, releaseDate, category]
  );

  res.status(201).json(result.rows[0]);
});

module.exports = router;
