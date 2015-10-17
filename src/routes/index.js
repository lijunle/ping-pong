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
    id: `package-${packageName}`,
    package: packageName,
    status: 'pending',
    createTime: new Date(),
  };

  table.insert(tableName, record)
  .then(() => queue.insert(tableName, packageName))
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
