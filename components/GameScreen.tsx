import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { option } from "../hooks/types";

type GameScreenRouteProp = RouteProp<option, "Game">;

const GameScreen = () => {
  const route = useRoute<GameScreenRouteProp>();
  const { chosenNumber } = route.params;

  return (
    <View style={styles.container}>
      <Text>GameScreen</Text>
      <Text>Number to guess: {chosenNumber}</Text>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
