import remoteConfig from '@react-native-firebase/remote-config';
export async function initRemoteConfig() {
  await remoteConfig().setDefaults({ feature_feed_enabled: true, max_upload_size: 20 });
  await remoteConfig().fetchAndActivate();
}
export function getConfigValue(key) { return remoteConfig().getValue(key).asString(); }
