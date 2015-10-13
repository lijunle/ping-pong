import path from 'path';
import express from 'express';
import react from 'express-react-views';
import routes from './routes';
import prepare from './prepare';
import { logger } from './services';

const port = process.env.PORT || 3000;
const app = express();

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'js');

app.engine('js', (filePath, options, callback) => {
  logger.debug(`[app] render view file [${filePath}].`);
  const viewEngine = react.createEngine({ transformViews: false });
  return viewEngine(filePath, options, callback);
});

app.use((req, res, next) => {
  logger.debug(`[app] request route [${req.url}].`);
  next();
});

app.use('/', routes);

// TODO serve an error dedicated app when error
prepare().then(() =>
  app.listen(port, () =>
    logger.info(`[app] server started, listening on ${port}.`)));
