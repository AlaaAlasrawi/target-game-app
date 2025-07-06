import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { option } from "../../hooks/types";
import { useThemeContext } from "../../context/ThemeContext";
import ViewBox from "../ViewBox";
import { Button } from "react-native-paper";

type GameScreenRouteProp = RouteProp<option, "Game">;

const GameScreen = () => {
  const { theme } = useThemeContext();
  const route = useRoute<GameScreenRouteProp>();
  const { chosenNumber } = route.params;

  const [min, setMin] = useState(1);
  const [max, setMax] = useState(99);
  const [guessedNumber, setGuessedNumber] = useState(Math.floor((1 + 99) / 2));
  const [log, setLog] = useState<number[]>([Math.floor((1 + 99) / 2)]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      paddingVertical: 20,
    },
    number: {
      fontSize: 32,
      color: theme.text,
    },
    text: {
      fontSize: 24,
      color: theme.text,
      marginBottom: 10,
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
    },
    buttonLabel: {
      color: theme.buttonText,
      fontWeight: "bold",
      fontSize: 17,
    },
    buttonContent: {
      height: 50,
      justifyContent: "center",
    },
    log: {
      width: 280,
      padding: 10,
      marginTop: 10,
      borderRadius: 8,
      backgroundColor: theme.neutral,
    },
    logText: {
      color: theme.text,
      fontSize: 16,
    },
  });

  function makeNextGuess(newMin: number, newMax: number) {
    const next = Math.floor((newMin + newMax) / 2);
    setMin(newMin);
    setMax(newMax);
    setGuessedNumber(next);
    setLog((prev) => [...prev, next]);
  }

  function handleLessPress() {
    if (guessedNumber <= chosenNumber) {
      Alert.alert("Incorrect Hint", "That can't be right!");
      return;
    }
    const newMax = guessedNumber - 1;
    if (newMax < min) {
      Alert.alert("Error", "No valid guesses left.");
      return;
    }
    makeNextGuess(min, newMax);
  }

  function handleMorePress() {
    if (guessedNumber >= chosenNumber) {
      Alert.alert("Incorrect Hint", "That can't be right!");
      return;
    }
    const newMin = guessedNumber + 1;
    if (newMin > max) {
      Alert.alert("Error", "No valid guesses left.");
      return;
    }
    makeNextGuess(newMin, max);
  }

  function handleEqualPress() {
    if (guessedNumber === chosenNumber) {
      Alert.alert(
        "finally!",
        `🎉 phone guessed the number` + " with " + log.length + " attempt"
      );
    } else {
      Alert.alert("Incorrect", "That's not the correct number");
    }
  }

  function handleReset() {
    const initialGuess = Math.floor((1 + 99) / 2);
    setMin(1);
    setMax(99);
    setGuessedNumber(initialGuess);
    setLog([initialGuess]);
  }

  return (
    <View style={styles.container}>
      <ViewBox elevation={0}>
        <Text style={styles.number}>{guessedNumber}</Text>
      </ViewBox>

      <Text style={styles.text}>Is this your number?</Text>

      <View style={styles.box}>
        <Button
          mode="contained"
          style={styles.btn}
          labelStyle={styles.buttonLabel}
          contentStyle={styles.buttonContent}
          onPress={handleLessPress}
        >
          Less
        </Button>
        <Button
          mode="contained"
          style={styles.btn}
          labelStyle={styles.buttonLabel}
          contentStyle={styles.buttonContent}
          onPress={handleMorePress}
        >
          More
        </Button>
      </View>

      <Button
        mode="contained"
        style={[styles.btn, { width: "85%" }]}
        labelStyle={styles.buttonLabel}
        contentStyle={styles.buttonContent}
        onPress={handleEqualPress}
      >
        Equal
      </Button>

      <Button
        mode="outlined"
        style={{ marginTop: 20, borderColor: theme.primary }}
        labelStyle={{ color: theme.primary }}
        onPress={handleReset}
      >
        Reset Game
      </Button>

      <ScrollView>
        {log.map((item, index) => (
          <View key={index} style={styles.log}>
            <Text style={styles.logText}>
              Guess {index + 1}: {item}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default GameScreen;
