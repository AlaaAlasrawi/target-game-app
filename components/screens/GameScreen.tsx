import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { option } from "../../hooks/types";

import { useThemeContext } from "../../context/ThemeContext";
import ViewBox from "../ViewBox";
import { Button } from "react-native-paper";

type GameScreenRouteProp = RouteProp<option, "Game">;

const GameScreen = () => {
  const { theme, toggleTheme } = useThemeContext();
  const [guessedNumber, setGuessedNumber] = useState(50);
  const route = useRoute<GameScreenRouteProp>();
  const { chosenNumber } = route.params;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    number: {
      fontSize: 32,
      color: theme.text,
    },
    text: {
      fontSize: 24,
      color: theme.text,
    },
    box: {
      margin: 10,
      padding: 20,
      width: 350,
      height: 100,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    btn: {
      backgroundColor: theme.primary,
      borderRadius: 12,
      width: "40%",
      fontSize: 20,
    },
    buttonLabel: {
      color: theme.onSecondary,
      fontWeight: "bold",
      fontSize: 17,
    },
    buttonContent: {
      height: 50,
      justifyContent: "center",
    },
  });

  return (
    <View style={styles.container}>
      <ViewBox elevation={0}>
        <Text style={styles.number}>{guessedNumber}</Text>
      </ViewBox>

      <Text style={styles.text}>Is The Number ?</Text>
      <View style={styles.box}>
        <Button
          mode="contained"
          style={styles.btn}
          labelStyle={styles.buttonLabel}
          contentStyle={styles.buttonContent}
        >
          less
        </Button>
        <Button
          mode="contained"
          style={styles.btn}
          labelStyle={styles.buttonLabel}
          contentStyle={styles.buttonContent}
        >
          more
        </Button>
      </View>
    </View>
  );
};

export default GameScreen;
