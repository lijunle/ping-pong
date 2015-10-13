import { logger, queue } from '../services';

function filterNoMessage(message) {
  if (!message) {
    logger.debug('No message in the queue.');
    throw new Error('no-message');
  }

  return message;
}

function handle(error, query) {
  if (error && error.message !== 'no-message') {
    logger.error(`Error happens. ${error}`);
  }

  // when error or no-message, sleep 10 second before next query
  const interval = error ? 10000 : 0;

  logger.debug(`Finish query, trigger next query after ${interval}ms.`);
  setTimeout(query, interval);
}

export default function trigger(queueName, fn) {
  function query() {
    logger.debug(`Start query on the queue [${queueName}].`);

    // TODO update the queue trigger to be safe for concurrency.
    queue.peek(queueName)
    .then(message => filterNoMessage(message))
    .then(message => queue.process(message, fn).then(() => message))
    .then(message => queue.remove(queueName, message))
    .then(() => handle(null, query), error => handle(error, query));
  }

  logger.debug(`Listen on jobs in the queue [${queueName}].`);
  setTimeout(query, 0);
}
