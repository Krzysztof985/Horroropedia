const express = require('express');
const comments = require('../data/comments');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(comments);
});

router.post('/', (req, res) => {
  const newId = comments.length > 0
    ? Math.max(...comments.map(comment => comment.id)) + 1
    : 1;

  const newComment = {
    ...req.body,
    id: newId
  };

  comments.push(newComment);

  res.status(201).json(newComment);
});

module.exports = router;
