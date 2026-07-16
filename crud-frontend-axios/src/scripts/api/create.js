import { execute } from './client.js';
export const createRecord = (resource, data) => execute('POST', resource, null, data);
