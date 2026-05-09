import messaging from '@react-native-firebase/messaging';
export async function requestPermission() { return messaging().requestPermission(); }
export async function getDeviceToken() { return messaging().getToken(); }
export function onMessage(cb) { return messaging().onMessage(cb); }
messaging().setBackgroundMessageHandler(async msg => console.log('BG message:', msg));
