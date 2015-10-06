/* eslint-disable no-console */

import express from 'express';

const port = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => {
  console.log('Listening on port', port);
});
