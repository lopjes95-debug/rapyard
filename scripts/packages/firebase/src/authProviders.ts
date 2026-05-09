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
