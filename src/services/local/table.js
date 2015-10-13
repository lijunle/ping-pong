import path from 'path';
import Database from 'locallydb';
import * as logger from './logger';

const db = new Database(path.resolve(__dirname, './db'));

export function ensure(tableName) {
  logger.debug(`[service:local] ensure table [${tableName}] exist (no-op).`);
  return Promise.resolve();
}

export function query(tableName) {
  logger.debug(`[service:local] query records in table [${tableName}].`);
  return new Promise(resolve =>
    resolve(db.collection(tableName).items));
}

export function insert(tableName, record) {
  logger.debug(`[service:local] insert record ${JSON.stringify(record)} into table [${tableName}].`);
  return new Promise(resolve => {
    const collection = db.collection(tableName);
    collection.insert(record);
    resolve(record);
  });
}

export function remove(tableName, record) {
  logger.debug(`[service:local] remove record with id [${record.cid}] from table [${tableName}].`);
  return new Promise(resolve => {
    const collection = db.collection(tableName);
    collection.remove(record.cid);
    resolve(record);
  });
}
