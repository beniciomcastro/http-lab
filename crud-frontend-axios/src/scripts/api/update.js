import { execute } from './client.js';
export const replaceRecord = (resource, id, data) => execute('PUT', resource, id, data);
export const updateRecord = (resource, id, data) => execute('PATCH', resource, id, data);
