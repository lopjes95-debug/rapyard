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
