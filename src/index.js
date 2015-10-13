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
app.engine('js', react.createEngine({ transformViews: false }));

app.use((req, res, next) => {
  logger.debug(`[app] request route [${req.url}].`);
  next();
});

app.use('/', routes);

// TODO serve an error dedicated app when error
prepare().then(() =>
  app.listen(port, () =>
    logger.info(`[app] server started, listening on ${port}.`)));
