import queueTrigger from './queue-trigger';
import { logger, table } from '../services';

queueTrigger('ping', message => {
  logger.info(`[job] get message [${message}], pong back.`);

  return table.insert('ping', {
    PartitionKey: 'pong',
    RowKey: message,
    type: 'pong',
    time: message,
  });
});
