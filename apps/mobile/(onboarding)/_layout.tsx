import { Stack, Redirect } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function OnboardingLayout() {
  const { user, loading } = useAuth();
  const [done, setDone] = useState<boolean | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("users")
      .select("has_onboarded")
      .eq("id", user.uid)
      .single()
      .then(({ data }) => setDone(data?.has_onboarded ?? false));
  }, [user]);

  if (loading || done === null) return null;
  if (!user) return <Redirect href="/(auth)/sign-in" />;
  if (done) return <Redirect href="/(tabs)" />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
