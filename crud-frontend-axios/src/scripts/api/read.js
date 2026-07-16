import { execute } from './client.js';
export const listRecords = (resource) => execute('GET', resource);
