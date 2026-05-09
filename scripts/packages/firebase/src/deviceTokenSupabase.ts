import { getDeviceToken } from './messaging';
import { createClient } from '@supabase/supabase-js';
import { env } from '@config/env';
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
export async function syncDeviceTokenToSupabase(userId) {
  const token = await getDeviceToken();
  await supabase.from('device_tokens').upsert({ user_id: userId, token, updated_at: new Date().toISOString() });
  return token;
}
