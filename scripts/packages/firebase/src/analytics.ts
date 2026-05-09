import analytics from '@react-native-firebase/analytics';
export function logEvent(name, params) { return analytics().logEvent(name, params); }
export function setUserId(id) { return analytics().setUserId(id); }
export function setUserProperty(name, value) { return analytics().setUserProperty(name, value); }
