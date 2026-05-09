import storage from '@react-native-firebase/storage';
import { createClient } from '@supabase/supabase-js';
import { env } from '@config/env';
import * as FileSystem from 'expo-file-system';
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);
export async function uploadAndSync(path, fileUri) {
  const ref = storage().ref(path);
  await ref.putFile(fileUri);
  const firebaseUrl = await ref.getDownloadURL();
  const file = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
  const { data, error } = await supabase.storage.from('mirror').upload(path, Buffer.from(file, 'base64'), { upsert: true });
  if (error) throw error;
  return { firebaseUrl, supabasePath: data?.path };
}
