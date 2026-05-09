Write-Host "Bootstrapping Firebase Ultra Module..." -ForegroundColor Cyan

$root = "packages/firebase/src"
New-Item -ItemType Directory -Force -Path $root | Out-Null

# ML Kit
Set-Content "$root/mlkit.ts" @"
import ml from '@react-native-firebase/ml';
export async function recognizeTextFromImage(uri) { return ml().cloudDocumentTextRecognizerProcessImage(uri); }
export async function labelImage(uri) { return ml().cloudImageLabelerProcessImage(uri); }
export async function translateText(text, target) { return ml().cloudTranslateText(text, target); }
"@

# Dynamic Links
Set-Content "$root/dynamicLinks.ts" @"
import dynamicLinks from '@react-native-firebase/dynamic-links';
export function createDynamicLink(path) {
  return dynamicLinks().buildShortLink(
    {
      link: 'https://rapyard.page.link/' + path,
      domainUriPrefix: 'https://rapyard.page.link',
      android: { packageName: 'com.rapyard.app' },
      ios: { bundleId: 'com.rapyard.app' }
    },
    dynamicLinks.ShortLinkType.UNGUESSABLE
  );
}
export function onDynamicLink(cb) { return dynamicLinks().onLink(({ url }) => cb(url)); }
"@

# In-App Messaging
Set-Content "$root/inAppMessaging.ts" @"
import inAppMessaging from '@react-native-firebase/in-app-messaging';
export function triggerInAppMessage(event) { return inAppMessaging().triggerEvent(event); }
export function enableInAppMessaging() { return inAppMessaging().setMessagesSuppressed(false); }
export function disableInAppMessaging() { return inAppMessaging().setMessagesSuppressed(true); }
"@

# App Check
Set-Content "$root/appCheck.ts" @"
import appCheck from '@react-native-firebase/app-check';
export async function activateAppCheck() { await appCheck().activate('YOUR_RECAPTCHA_SITE_KEY', true); }
export async function getAppCheckToken() { return appCheck().getToken(); }
"@

# Firebase Functions → Supabase Edge Sync
Set-Content "$root/functionsToSupabase.ts" @"
import functions from '@react-native-firebase/functions';
import { createClient } from '@supabase/supabase-js';
import { env } from '@config/env';
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);
export async function callFunctionAndSync(firebaseFn, supabaseFn, payload) {
  const result = await functions().httpsCallable(firebaseFn)(payload);
  const { data, error } = await supabase.functions.invoke(supabaseFn, { body: result.data });
  if (error) throw error;
  return data;
}
"@

Write-Host "Firebase Ultra Module created." -ForegroundColor Green
