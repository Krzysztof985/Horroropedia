const express = require('express');
const reviews = require('../data/reviews');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(reviews);
});

router.post('/', (req, res) => {
  const newId = reviews.length > 0
    ? Math.max(...reviews.map(review => review.id)) + 1
    : 1;

  const newReview = {
    ...req.body,
    id: newId
  };

  reviews.push(newReview);

  res.status(201).json(newReview);
});

module.exports = router;
