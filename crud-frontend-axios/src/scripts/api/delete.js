import { execute } from './client.js';
export const deleteRecord = (resource, id) => execute('DELETE', resource, id);
