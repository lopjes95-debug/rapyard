import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

const cinematic = [
  { title: "The YardGate", subtitle: "The industrial entrance to the RapYard universe." },
  { title: "Cinematic vs Iconic", subtitle: "A mythic world built with gritty realism." },
  { title: "Gate Opens", subtitle: "Light floods in. The arena wakes." },
  { title: "The Cypher Pit", subtitle: "Where rappers sharpen steel with steel." },
  { title: "Beat Stations", subtitle: "Producers crafting heat and flipping samples." },
  { title: "Workshop Zone", subtitle: "Creators refining tapes and leveling up." },
  { title: "The Yard Revealed", subtitle: "A full industrial arena of creators and fans." },
  { title: "The RapYard System", subtitle: "Battles, Cyphers, Mixtapes, Producers, Royalties." },
];

type Props = {
  navigation?: {
    replace: (route: string) => void;
    navigate?: (route: string) => void;
  };
};

export function IntroGate({ navigation }: Props) {
  const goChooseLane = () => {
    navigation?.replace?.("Step1");
  };

  const goSignIn = () => {
    navigation?.replace?.("SignIn");
  };

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.tagline}>Enter the Yard</Text>

        <Text style={styles.title}>The YardGate</Text>

        <Text style={styles.description}>
          A cinematic universe built for creators — gritty, industrial, alive with energy.
        </Text>

        {cinematic.map((item) => (
          <View key={item.title} style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
          </View>
        ))}

        <TouchableOpacity onPress={goChooseLane} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Choose Your Lane</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goSignIn} style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Already in the Yard — Sign In</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#050505",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 60,
  },
  tagline: {
    fontSize: 14,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#777",
    marginBottom: 8,
  },
  title: {
    fontSize: 44,
    fontWeight: "900",
    marginBottom: 10,
    color: "#fff",
  },
  description: {
    fontSize: 18,
    opacity: 0.8,
    marginBottom: 36,
    color: "#fff",
  },
  card: {
    backgroundColor: "#111",
    borderRadius: 18,
    padding: 22,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#222",
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 6,
    color: "#fff",
  },
  cardSubtitle: {
    fontSize: 15,
    opacity: 0.8,
    color: "#fff",
  },
  primaryButton: {
    marginTop: 24,
    backgroundColor: "#FFD700",
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#000",
    fontWeight: "800",
    fontSize: 16,
  },
  secondaryButton: {
    marginTop: 18,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#888",
    fontSize: 14,
  },
});
