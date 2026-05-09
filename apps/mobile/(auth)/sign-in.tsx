import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, Link } from "expo-router";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async () => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/(tabs)");
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <View>
      <Text>Sign In</Text>
      {error && <Text>{error}</Text>}
      <TextInput placeholder="Email" autoCapitalize="none" onChangeText={setEmail} value={email} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} />
      <Button title="Sign In" onPress={onSubmit} />
      <Link href="/(auth)/sign-up">Create account</Link>
      <Link href="/(auth)/forgot-password">Forgot password?</Link>
    </View>
  );
}
