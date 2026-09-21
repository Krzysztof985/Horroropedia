const express = require('express');
const works = require('../data/works');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(works);
});

router.post('/', (req, res) => {
  const newId = works.length > 0
    ? Math.max(...works.map(work => work.id)) + 1
    : 1;

  const newWork = {
    ...req.body,
    id: newId
  };

  works.push(newWork);

  res.status(201).json(newWork);
});

module.exports = router;
