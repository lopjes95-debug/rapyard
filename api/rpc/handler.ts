import { NextRequest } from 'next/server';
import { rpcDefinitions, RpcName } from '../schema/rpc';

export async function handleRpc(req: NextRequest) {
  const body = await req.json();
  const { name, params } = body as { name: RpcName; params: any };

  const def = rpcDefinitions[name];
  if (!def) return new Response('Unknown RPC', { status: 400 });

  const parsed = def.params.parse(params);

  return new Response(JSON.stringify({ ok: true, data: parsed }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
