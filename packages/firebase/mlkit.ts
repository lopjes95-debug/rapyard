import ml from "@react-native-firebase/ml";

export async function recognizeTextFromImage(uri: string) {
  return ml().cloudDocumentTextRecognizerProcessImage(uri);
}

export async function labelImage(uri: string) {
  return ml().cloudImageLabelerProcessImage(uri);
}

export async function translateText(text: string, target: string) {
  return ml().cloudTranslateText(text, target);
}
