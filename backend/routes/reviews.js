const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await pool.query(`
    SELECT
      id,
      work_id AS "workId",
      user_id AS "userId",
      other_media AS "otherMedia",
      created_at AS "createdAt",
      content
    FROM reviews
  `);

  res.json(result.rows);
});

router.post('/', async (req, res) => {
  const {
    workId,
    userId,
    otherMedia,
    createdAt,
    content
  } = req.body;

  const result = await pool.query(
    `
      INSERT INTO reviews (
        work_id,
        user_id,
        other_media,
        created_at,
        content
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING
        id,
        work_id AS "workId",
        user_id AS "userId",
        other_media AS "otherMedia",
        created_at AS "createdAt",
        content
    `,
    [
      workId,
      userId,
      otherMedia ?? null,
      createdAt,
      content
    ]
  );

  res.status(201).json(result.rows[0]);
});

module.exports = router;
