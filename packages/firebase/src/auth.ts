import auth from '@react-native-firebase/auth';
export const signIn = (email, password) => auth().signInWithEmailAndPassword(email, password);
export const signOut = () => auth().signOut();
export const onAuthChanged = cb => auth().onAuthStateChanged(cb);
