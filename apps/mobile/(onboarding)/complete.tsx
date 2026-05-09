import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/lib/supabase";

export default function OnboardingComplete() {
  const router = useRouter();
  const { user } = useAuth();

  const finish = async () => {
    if (user) {
      await supabase.from("users").update({ has_onboarded: true }).eq("id", user.uid);
    }
    router.replace("/(tabs)");
  };

  return (
    <View>
      <Text>All set!</Text>
      <Button title="Start using app" onPress={finish} />
    </View>
  );
}
