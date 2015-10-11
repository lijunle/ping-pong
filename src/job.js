import * as job from './azure/job';
import * as table from './azure/table';

job.execute('ping', message => {
  console.log(message); // eslint-disable-line no-console

  return table.insert('ping', {
    PartitionKey: 'pong',
    RowKey: message,
    type: 'pong',
    time: message,
  });
});
