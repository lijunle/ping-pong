import azure from 'azure-storage';

const queueService = azure.createQueueService();

function call(functionName, ...args) {
  return new Promise((resolve, reject) =>
    queueService[functionName](...args, (error, result) =>
      error ? reject(error) : resolve(result)));
}

export function ensure(queueName) {
  return call('createQueueIfNotExists', queueName);
}

export function peek(queueName) {
  return call('getMessages', queueName, { numOfMessages: 1 })
    .then(([message]) => message);
}

export function insert(queueName, message) {
  return call('createMessage', queueName, message);
}

export function remove(queueName, message) {
  return call('deleteMessage', queueName, message.messageid, message.popreceipt);
}
