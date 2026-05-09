import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function OnboardingIntro() {
  const router = useRouter();
  return (
    <View>
      <Text>Welcome to rapyard</Text>
      <Button title="Next" onPress={() => router.push("/(onboarding)/preferences")} />
    </View>
  );
}
