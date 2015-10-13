import express from 'express';
import bodyParser from 'body-parser';
import { logger, table, queue } from '../services';

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = new express.Router();
export default router;

router.get('/', (req, res) => {
  logger.debug('[route] request home page.');

  res.render('index');
});

router.post('/packages/new', urlencodedParser, (req, res) => {
  // TODO move the request logging to a express middleware
  logger.debug('[route] request a new package.');

  const tableName = 'package';
  const packageName = req.body.packageName;
  const record = {
    _id: `package-${packageName}`,
    PartitionKey: 'package',
    RowKey: packageName,
    package: packageName,
    status: 'pending',
  };

  table.insert(tableName, record)
  .then(entity => queue.insert(tableName, entity._id))
  .then(() => res.redirect(`/package/${packageName}`),
    error => res.status(500).send(error.toString()));
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
