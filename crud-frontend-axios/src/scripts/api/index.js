import { listRecords } from './read.js';
import { createRecord } from './create.js';
import { replaceRecord, updateRecord } from './update.js';
import { deleteRecord } from './delete.js';

export const api = {
  list: listRecords,
  create: createRecord,
  replace: replaceRecord,
  update: updateRecord,
  remove: deleteRecord,
};
