import azure from 'azure-storage';
import * as logger from './logger';

const generator = azure.TableUtilities.entityGenerator;

function isInt(value) {
  return parseFloat(value) === parseInt(value, 10) && !isNaN(value);
}

function toEntityValue(value) {
  switch (value.constructor) {
  case Number:
    return isInt(value)
    ? generator.Int32(value) // eslint-disable-line new-cap
    : generator.Double(value); // eslint-disable-line new-cap
  case Boolean:
    return generator.Boolean(value);
  case String:
    return generator.String(value);
  case Date:
    return generator.DateTime(value); // eslint-disable-line new-cap
  default:
    logger.error(`[service:azure] convert type [${value.constructor}] to entity type fail.`);
    throw new Error(`The type of value, ${value.constructor}, is not supported to generate Edm type.`);
  }
}

function toRecordValue(value) {
  // use typeof check here to handle value._ is empty string, or zero number.
  return typeof value._ !== 'undefined' ? value._ : value;
}

export function toEntity(record) {
  // TODO parse PartitionKey and RowKey from _id
  return Object.keys(record).reduce(
    (result, key) => ({ ...result, [key]: toEntityValue(record[key]) }),
    {});
}

export function toRecord(entity) {
  return Object.keys(entity).reduce(
    (result, key) => ({ ...result, [key]: toRecordValue(entity[key]) }),
    {});
}
