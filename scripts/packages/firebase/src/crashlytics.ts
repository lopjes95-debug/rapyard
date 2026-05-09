import crashlytics from '@react-native-firebase/crashlytics';
export function recordError(e) { crashlytics().recordError(e); }
export function log(msg) { crashlytics().log(msg); }
export function setCrashUser(id) { crashlytics().setUserId(id); }
