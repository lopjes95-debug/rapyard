import { getDeviceToken } from './messaging';
import { enqueue } from '@rapyard/workers/queues/producer';
export async function syncDeviceToken(userId) {
  const token = await getDeviceToken();
  await enqueue('device.token.sync', { userId, token });
  return token;
}
