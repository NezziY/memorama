import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export default function Card({ onPress, isTurnedOver, children }) {
  return (
    <Pressable onPress={onPress} style={isTurnedOver ? styles.cardUp : styles.cardDown}>
      {isTurnedOver ? (
        <Text style={styles.text}>{children}</Text>
      ) : (
        <Text style={styles.text}>❔</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardUp: {
    width: 100,
    height: 100,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    borderWidth: 4,
    borderColor: "#94a3b8",
    backgroundColor: "#334155",
  },
  cardDown: {
    width: 100,
    height: 100,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    borderWidth: 4,
    borderColor: "#94a3b8",
    backgroundColor: "#334155",
  },
  text: {
    fontSize: 46,
    color: "#64748b",
  },
});
