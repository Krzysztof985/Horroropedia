const express = require('express');
const argon2 = require('argon2');
const pool = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await pool.query(`
    SELECT
      id,
      nick,
      email,
      date_of_joining AS "dateOfJoining",
      rank
    FROM users
  `);

  res.json(result.rows);
});

router.post('/', async (req, res) => {
  const { nick, email, password } = req.body;

  const existingUser = await pool.query(
    `
      SELECT id
      FROM users
      WHERE nick = $1 OR email = $2 
    `,
    [nick, email]
  );

  if (existingUser.rows.length > 0) {
    return res.status(409).json({
      message: 'Nick lub email jest już zajęty.'
    });
  }

  const passwordHash = await argon2.hash(password);

  const result = await pool.query(
    `
      INSERT INTO users (
        nick,
        email,
        password_hash,
        date_of_joining,
        rank
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING
        id,
        nick,
        email,
        date_of_joining AS "dateOfJoining",
        rank
    `,
    [
      nick,
      email,
      passwordHash,
      new Date(),
      'user'
    ]
  );

  res.status(201).json(result.rows[0]);
});

router.post('/login', async (req, res) => {
  const { login, password } = req.body;

  const result = await pool.query(
    `
      SELECT
        id,
        nick,
        email,
        password_hash,
        date_of_joining AS "dateOfJoining",
        rank
      FROM users
      WHERE nick = $1 OR email = $1
    `,
    [login]
  );

  if (result.rows.length === 0) {
    return res.status(401).json({
      message: 'Nieprawidłowy login lub hasło.'
    });
  }

  const user = result.rows[0];

  // Jan i Krzysztof są użytkownikami testowymi
  // i nie mają ustawionego hasła.
  if (!user.password_hash) {
    return res.status(401).json({
      message: 'Nieprawidłowy login lub hasło.'
    });
  }

  const passwordValid = await argon2.verify(
    user.password_hash,
    password
  );

  if (!passwordValid) {
    return res.status(401).json({
      message: 'Nieprawidłowy login lub hasło.'
    });
  }

  const publicUser = {
    id: user.id,
    nick: user.nick,
    email: user.email,
    dateOfJoining: user.dateOfJoining,
    rank: user.rank
  };

  res.json(publicUser);
});

module.exports = router;
