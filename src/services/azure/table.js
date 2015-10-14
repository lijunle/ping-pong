import azure from 'azure-storage';
import * as logger from './logger';
import { toEntity, toRecord } from './edm-helper';

const tableService = azure.createTableService();

function call(functionName, ...args) {
  return new Promise((resolve, reject) =>
    tableService[functionName](...args, (error, result) =>
      error ? reject(error) : resolve(result)));
}

export function ensure(tableName) {
  logger.debug(`[service:azure] ensure table [${tableName}] exist.`);
  return call('createTableIfNotExists', tableName);
}

export function query(tableName) {
  logger.debug(`[service:azure] query all entities from table [${tableName}].`);
  return call('queryEntities', tableName, null, null)
    .then(result => result.entries.map(toRecord));
}

export function insert(tableName, record) {
  logger.debug(`[service:azure] insert record ${JSON.stringify(record)} into table [${tableName}].`);
  const entity = toEntity(record);
  return call('insertEntity', tableName, entity);
}
