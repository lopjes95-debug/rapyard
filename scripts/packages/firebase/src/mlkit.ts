import ml from '@react-native-firebase/ml';
export async function recognizeTextFromImage(uri) { return ml().cloudDocumentTextRecognizerProcessImage(uri); }
export async function labelImage(uri) { return ml().cloudImageLabelerProcessImage(uri); }
export async function translateText(text, target) { return ml().cloudTranslateText(text, target); }
