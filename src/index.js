/* eslint-disable no-console */

import express from 'express';
import * as table from './azure/table';

const port = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
  const tableName = 'ping';
  table.ensure(tableName)
  .then(() => table.query(tableName))
  .then(data => res.send(data), error => res.send(error));
});

app.post('/ping', (req, res) => {
  const tableName = 'ping';
  const dateTime = new Date();
  const record = {
    PartitionKey: 'ping',
    RowKey: dateTime.toString(),
    type: 'ping',
    time: dateTime,
  };

  table.ensure(tableName)
  .then(() => table.insert(tableName, record))
  .then(data => res.send(data), error => res.status(500).send(error.toString()));
});

app.listen(port, () => {
  console.log('Listening on port', port);
});
