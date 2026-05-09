import firestore from '@react-native-firebase/firestore';
export const users = firestore().collection('users');
export function createUser(uid, data) { return users.doc(uid).set(data); }
export function getUser(uid) { return users.doc(uid).get(); }
