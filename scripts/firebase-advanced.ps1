Write-Host "Bootstrapping Advanced Firebase Module..." -ForegroundColor Cyan

$root = "packages/firebase/src"
New-Item -ItemType Directory -Force -Path $root | Out-Null

# Analytics
Set-Content "$root/analytics.ts" @"
import analytics from '@react-native-firebase/analytics';
export function logEvent(name, params) { return analytics().logEvent(name, params); }
export function setUserId(id) { return analytics().setUserId(id); }
export function setUserProperty(name, value) { return analytics().setUserProperty(name, value); }
"@

# Crashlytics
Set-Content "$root/crashlytics.ts" @"
import crashlytics from '@react-native-firebase/crashlytics';
export function recordError(e) { crashlytics().recordError(e); }
export function log(msg) { crashlytics().log(msg); }
export function setCrashUser(id) { crashlytics().setUserId(id); }
"@

# Storage
Set-Content "$root/storage.ts" @"
import storage from '@react-native-firebase/storage';
export async function uploadFile(path, uri) { const ref = storage().ref(path); await ref.putFile(uri); return ref.getDownloadURL(); }
export async function deleteFile(path) { return storage().ref(path).delete(); }
"@

# Firebase → Supabase Auth Bridge
Set-Content "$root/authBridge.ts" @"
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
"@

# Device Token → Supabase Sync
Set-Content "$root/deviceTokenSupabase.ts" @"
import { getDeviceToken } from './messaging';
import { createClient } from '@supabase/supabase-js';
import { env } from '@config/env';
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
export async function syncDeviceTokenToSupabase(userId) {
  const token = await getDeviceToken();
  await supabase.from('device_tokens').upsert({ user_id: userId, token, updated_at: new Date().toISOString() });
  return token;
}
"@

Write-Host "Advanced Firebase module created." -ForegroundColor Green
