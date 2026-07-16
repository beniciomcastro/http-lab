import axios from 'axios';
import { API_URL } from '../config.js';

const client = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
  validateStatus: () => true,
});

export async function execute(method, resource, id = null, data = null) {
  const endpoint = `/${resource}${id ? `/${id}` : ''}`;
  const startedAt = performance.now();

  try {
    const response = await client.request({
      method: method.toLowerCase(),
      url: endpoint,
      data: data ?? undefined,
    });

    return {
      ok: response.status >= 200 && response.status < 300,
      method: method.toUpperCase(),
      endpoint: `/api${endpoint}`,
      request: data,
      response: response.data ?? {},
      status: response.status,
      duration: Math.round(performance.now() - startedAt),
    };
  } catch (error) {
    return {
      ok: false,
      method: method.toUpperCase(),
      endpoint: `/api${endpoint}`,
      request: data,
      response: {
        error: 'Não foi possível acessar a API.',
        detail: error instanceof Error ? error.message : String(error),
      },
      status: 0,
      duration: Math.round(performance.now() - startedAt),
    };
  }
}
