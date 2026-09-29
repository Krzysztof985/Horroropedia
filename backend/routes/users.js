const express = require('express');
const argon2 = require('argon2');
const users = require('../data/users');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(users);
});

router.post('/', async (req, res) => {
  const { nick, email, password } = req.body;

  const existingUser = users.find(
    user => user.nick === nick || user.email === email
  );

  if (existingUser) {
    return res.status(409).json({
      message: 'Nick lub email jest już zajęty.'
    });
  }

  const passwordHash = await argon2.hash(password);

  const newId = users.length > 0
    ? Math.max(...users.map(user => user.id)) + 1
    : 1;

  const newUser = {
    id: newId,
    nick: nick,
    email: email,
    dateOfJoining: new Date().toISOString(),
    rank: 'user',
    passwordHash: passwordHash
  };

  users.push(newUser);

  const publicUser = {
    id: newUser.id,
    nick: newUser.nick,
    email: newUser.email,
    dateOfJoining: newUser.dateOfJoining,
    rank: newUser.rank
  };

  res.status(201).json(publicUser);
});

router.post('/login', async (req, res) => {
  const { login, password } = req.body;

  const user = users.find(
    user => user.nick === login || user.email === login
  );

  if (!user) {
    return res.status(401).json({
      message: 'Nieprawidłowy login lub hasło.'
    });
  }

  const passwordValid = await argon2.verify(
    user.passwordHash,
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
