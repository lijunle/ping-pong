import { logger, table, job } from './services';

job.execute('ping', message => {
  logger.info(`Get message [${message}], pong back.`);

  return table.insert('ping', {
    PartitionKey: 'pong',
    RowKey: message,
    type: 'pong',
    time: message,
  });
});
