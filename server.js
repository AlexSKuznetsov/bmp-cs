import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('hi');
});

app.listen(process.env.PORT || 3000);
