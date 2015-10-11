import * as queue from './queue';

function process(message, fn) {
  if (!message) {
    throw message; // the handle function will capture and re-query
  }

  return fn(message.messagetext).then(() => message);
}

function handle(error, query) {
  console.error(error || 'No message in the queue.'); // eslint-disable-line no-console

  // when error, sleep 10 second before next query
  setTimeout(query, 10000);
}

export function execute(queueName, fn) {
  function query() {
    queue.peek(queueName)
    .then(message => process(message, fn))
    .then(message => queue.remove(queueName, message))
    .then(() => setTimeout(query, 0), error => handle(error, query));
  }

  setTimeout(query, 0);
}
