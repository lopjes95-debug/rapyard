import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, Link } from "expo-router";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async () => {
    try {
      setError(null);
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/(onboarding)");
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <View>
      <Text>Sign Up</Text>
      {error && <Text>{error}</Text>}
      <TextInput placeholder="Email" autoCapitalize="none" onChangeText={setEmail} value={email} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} />
      <Button title="Create account" onPress={onSubmit} />
      <Link href="/(auth)/sign-in">Already have an account?</Link>
    </View>
  );
}
