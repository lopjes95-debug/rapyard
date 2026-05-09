import { Pressable, Text, StyleSheet } from "react-native";

export function Button({ title, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.btn}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 12,
    backgroundColor: "#111",
    borderRadius: 8,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});
