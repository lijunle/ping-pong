import { logger, table, queue } from './services';

const tables = [
  'package',
];

const queues = [
  'package',
];

export default function prepare() {
  logger.debug(`[prepare] ensure tables exist: ${tables}`);
  const ensureTables = tables.map(item => table.ensure(item));

  logger.debug(`[prepare] ensure queues exist: ${queues}`);
  const ensureQueues = queues.map(item => queue.ensure(item));

  return Promise.all([ensureTables, ensureQueues])
    .catch(error => logger.error(`[prepare] error on prepare: ${error}`));
}
