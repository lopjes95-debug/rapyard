Write-Host "Bootstrapping Firebase module..." -ForegroundColor Cyan

$root = "packages/firebase/src"
New-Item -ItemType Directory -Force -Path $root | Out-Null

Set-Content "$root/firebase.ts" @"
import { FirebaseApp, initializeApp } from '@react-native-firebase/app';
let app: FirebaseApp | null = null;
export function getFirebaseApp() {
  if (!app) app = initializeApp();
  return app;
}
"@

Set-Content "$root/auth.ts" @"
import auth from '@react-native-firebase/auth';
export const signIn = (email, password) => auth().signInWithEmailAndPassword(email, password);
export const signOut = () => auth().signOut();
export const onAuthChanged = cb => auth().onAuthStateChanged(cb);
"@

Set-Content "$root/messaging.ts" @"
import messaging from '@react-native-firebase/messaging';
export async function requestPermission() { return messaging().requestPermission(); }
export async function getDeviceToken() { return messaging().getToken(); }
export function onMessage(cb) { return messaging().onMessage(cb); }
messaging().setBackgroundMessageHandler(async msg => console.log('BG message:', msg));
"@

Set-Content "$root/firestore.ts" @"
import firestore from '@react-native-firebase/firestore';
export const users = firestore().collection('users');
export function createUser(uid, data) { return users.doc(uid).set(data); }
export function getUser(uid) { return users.doc(uid).get(); }
"@

Set-Content "$root/notifications.ts" @"
import { getDeviceToken } from './messaging';
import { enqueue } from '@rapyard/workers/queues/producer';
export async function syncDeviceToken(userId) {
  const token = await getDeviceToken();
  await enqueue('device.token.sync', { userId, token });
  return token;
}
"@

Write-Host "Firebase module created." -ForegroundColor Green
