import perf from '@react-native-firebase/perf';
export async function trace(name, fn) {
  const t = await perf().newTrace(name);
  await t.start();
  const result = await fn();
  await t.stop();
  return result;
}
