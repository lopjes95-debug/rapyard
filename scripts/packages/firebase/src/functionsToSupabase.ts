import functions from '@react-native-firebase/functions';
import { createClient } from '@supabase/supabase-js';
import { env } from '@config/env';
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);
export async function callFunctionAndSync(firebaseFn, supabaseFn, payload) {
  const result = await functions().httpsCallable(firebaseFn)(payload);
  const { data, error } = await supabase.functions.invoke(supabaseFn, { body: result.data });
  if (error) throw error;
  return data;
}
