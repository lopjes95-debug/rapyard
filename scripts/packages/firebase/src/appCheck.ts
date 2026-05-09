import appCheck from '@react-native-firebase/app-check';
export async function activateAppCheck() { await appCheck().activate('YOUR_RECAPTCHA_SITE_KEY', true); }
export async function getAppCheckToken() { return appCheck().getToken(); }
