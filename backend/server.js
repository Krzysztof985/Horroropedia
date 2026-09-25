const express = require('express');
const cors = require('cors');
const worksRouter = require('./routes/works');
const reviewsRouter = require('./routes/reviews');
const commentsRouter = require('./routes/comments');
const usersRouter = require('./routes/users');

const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;

app.use('/api/works', worksRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/users', usersRouter);

app.listen(port, () => {
  console.log(`Backend działa na http://localhost:${port}`);
});
