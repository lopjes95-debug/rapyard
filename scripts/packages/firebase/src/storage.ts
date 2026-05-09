import storage from '@react-native-firebase/storage';
export async function uploadFile(path, uri) { const ref = storage().ref(path); await ref.putFile(uri); return ref.getDownloadURL(); }
export async function deleteFile(path) { return storage().ref(path).delete(); }
