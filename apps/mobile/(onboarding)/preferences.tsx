import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Preferences() {
  const router = useRouter();
  return (
    <View>
      <Text>Pick your preferences</Text>
      <Button title="Continue" onPress={() => router.push("/(onboarding)/complete")} />
    </View>
  );
}
