import express from 'express';
import bodyParser from 'body-parser';
import { table, queue } from '../services';

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = new express.Router();
export default router;

router.get('/', (req, res) => {
  table.query('package')
  .then(packages => res.render('index', { packages }),
    error => res.send(error));
});

router.post('/packages/new', urlencodedParser, (req, res) => {
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

router.get('/package/:packageName', (req, res) => {
  table.query('package', {
    limit: 1,
    filter: { package: req.params.packageName },
  })
  .then(([result]) => res.render('package', result),
    error => res.send(error));
});
