const express = require('express');
const cors = require('cors');
const worksRouter = require('./routes/works');
const reviewsRouter = require('./routes/reviews');

const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;

app.use('/api/works', worksRouter);
app.use('/api/reviews', reviewsRouter);

app.listen(port, () => {
  console.log(`Backend działa na http://localhost:${port}`);
});
