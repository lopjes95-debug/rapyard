Write-Host "Bootstrapping Firebase Ultimate Module..." -ForegroundColor Cyan

$root = "packages/firebase/src"
New-Item -ItemType Directory -Force -Path $root | Out-Null

# Storage Sync
Set-Content "$root/storageSync.ts" @"
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
"@

# Multi-provider Auth
Set-Content "$root/authProviders.ts" @"
import auth from '@react-native-firebase/auth';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { RNTwitterSignIn } from 'react-native-twitter-signin';

export async function signInWithApple() {
  const apple = await appleAuth.performRequest({ requestedOperation: appleAuth.Operation.LOGIN, requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME] });
  const credential = auth.AppleAuthProvider.credential(apple.identityToken, apple.nonce);
  return auth().signInWithCredential(credential);
}

GoogleSignin.configure({ webClientId: 'YOUR_WEB_CLIENT_ID' });
export async function signInWithGoogle() {
  const { idToken } = await GoogleSignin.signIn();
  const credential = auth.GoogleAuthProvider.credential(idToken);
  return auth().signInWithCredential(credential);
}

export async function signInWithTwitter() {
  const { authToken, authTokenSecret } = await RNTwitterSignIn.logIn();
  const credential = auth.TwitterAuthProvider.credential(authToken, authTokenSecret);
  return auth().signInWithCredential(credential);
}
"@

# Remote Config
Set-Content "$root/remoteConfig.ts" @"
import remoteConfig from '@react-native-firebase/remote-config';
export async function initRemoteConfig() {
  await remoteConfig().setDefaults({ feature_feed_enabled: true, max_upload_size: 20 });
  await remoteConfig().fetchAndActivate();
}
export function getConfigValue(key) { return remoteConfig().getValue(key).asString(); }
"@

# Performance Monitoring
Set-Content "$root/perf.ts" @"
import perf from '@react-native-firebase/perf';
export async function trace(name, fn) {
  const t = await perf().newTrace(name);
  await t.start();
  const result = await fn();
  await t.stop();
  return result;
}
"@

# A/B Testing
Set-Content "$root/experiments.ts" @"
import { getConfigValue } from './remoteConfig';
export function isExperimentEnabled(name) { return getConfigValue('exp_' + name) === 'on'; }
"@

Write-Host "Firebase Ultimate Module created." -ForegroundColor Green
