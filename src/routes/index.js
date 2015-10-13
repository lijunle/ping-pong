import express from 'express';
import { logger, table, queue } from '../services';

const router = new express.Router();
export default router;

router.get('/', (req, res) => {
  logger.debug('[route] request home page.');

  res.render('index', { name: 'world' });
});

router.post('/ping', (req, res) => {
  logger.debug('[route] ping a message.');

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
  .then(() => queue.ensure(tableName))
  .then(() => queue.insert(tableName, dateTime.toString()))
  .then(data => res.send(data), error => res.status(500).send(error.toString()));
});
