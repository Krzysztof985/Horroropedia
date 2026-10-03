const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await pool.query(`
    SELECT
      id,
      target_type AS "targetType",
      target_id AS "targetId",
      user_id AS "userId",
      content,
      published_at AS "publishedAt"
    FROM comments
  `);

  res.json(result.rows);
});

router.post('/', async (req, res) => {
  const {
    targetType,
    targetId,
    userId,
    content,
    publishedAt
  } = req.body;

  const result = await pool.query(
    `
      INSERT INTO comments (
        target_type,
        target_id,
        user_id,
        content,
        published_at
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING
        id,
        target_type AS "targetType",
        target_id AS "targetId",
        user_id AS "userId",
        content,
        published_at AS "publishedAt"
    `,
    [
      targetType,
      targetId,
      userId ?? null,
      content,
      publishedAt
    ]
  );

  res.status(201).json(result.rows[0]);
});

module.exports = router;
