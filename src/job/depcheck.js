import { logger } from '../services';

export default function depcheck(packageName) {
  logger.info(`[job:depcheck] depcheck on package [${packageName}].`);
  return new Promise(resolve => {
    resolve(); // TODO resolve after update package status to started.
  });
}
