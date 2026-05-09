import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email.trim());
      setMessage("Password reset email sent.");
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <View>
      <Text>Reset Password</Text>
      {message && <Text>{message}</Text>}
      {error && <Text>{error}</Text>}
      <TextInput placeholder="Email" autoCapitalize="none" onChangeText={setEmail} value={email} />
      <Button title="Send reset email" onPress={onSubmit} />
    </View>
  );
}
