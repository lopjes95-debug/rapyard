import auth from '@react-native-firebase/auth';
import { createClient } from '@supabase/supabase-js';
import { env } from '@config/env';
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
export async function firebaseToSupabase() {
  const user = auth().currentUser;
  if (!user) return null;
  const token = await user.getIdToken();
  const { data, error } = await supabase.auth.signInWithIdToken({ provider: 'firebase', token });
  if (error) throw error;
  return data;
}
