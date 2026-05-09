import inAppMessaging from '@react-native-firebase/in-app-messaging';
export function triggerInAppMessage(event) { return inAppMessaging().triggerEvent(event); }
export function enableInAppMessaging() { return inAppMessaging().setMessagesSuppressed(false); }
export function disableInAppMessaging() { return inAppMessaging().setMessagesSuppressed(true); }
