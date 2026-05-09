import { View, Text, StyleSheet } from "react-native";

export function YardGateCard({ title, subtitle }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#111",
    borderRadius: 18,
    padding: 22,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#222"
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 6,
    color: "#fff"
  },
  subtitle: {
    fontSize: 15,
    opacity: 0.8,
    color: "#fff"
  }
});
