import type { NextRequest } from 'next/server';
import { handleRpc } from '../rpc/handler';
import { handleWebhook } from '../webhooks/handler';

const routes = {
  '/api/rpc': handleRpc,
  '/api/webhooks': handleWebhook,
};

export async function gateway(req: NextRequest): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;

  const handler = routes[path];
  if (!handler) return new Response('Not found', { status: 404 });

  try {
    return await handler(req);
  } catch (err) {
    console.error('Gateway error', err);
    return new Response('Internal server error', { status: 500 });
  }
}
