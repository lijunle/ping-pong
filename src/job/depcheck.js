import { logger, table } from '../services';

export default function depcheck(packageName) {
  logger.info(`[job:depcheck] depcheck on package [${packageName}].`);
  return table.query('package', {
    limit: 1,
    filter: { package: packageName },
  })
  .then(([record]) => table.update('package', {
    ...record,
    status: 'started',
    startTime: new Date(),
  }));
}
