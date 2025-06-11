import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { option } from "../hooks/types";

import { useThemeContext } from "../context/ThemeContext";

type NavigationProp = NativeStackNavigationProp<option, "StartGame">;

const StartGameScreen = () => {
  const [enteredNumber, setEnteredNumber] = useState("");
  const navigation = useNavigation<NavigationProp>();
  const { theme, toggleTheme } = useThemeContext();
  function handleChange(text: string) {
    setEnteredNumber(text);
  }

  function handlePress() {
    const number = parseInt(enteredNumber, 10);

    if (isNaN(number) || number < 1 || number > 99) {
      console.log("Please enter a valid number between 1 and 99.");
      setEnteredNumber("");
      return;
    }

    console.log("Number submitted:", number);
    navigation.navigate("Game", { chosenNumber: number });
  }
  const styles = StyleSheet.create({
    container: {
      padding: 20,
      flex: 1,
      backgroundColor: theme.background,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    input: {
      width: "100%",
      fontSize: 20,
      textAlign: "center",
      color: theme.text,
    },
    text: { color: theme.text },
    btn: {
      backgroundColor: theme.primary,
    },
    button: {
      backgroundColor: theme.primary,
      borderRadius: 12,
      width: "100%",
      marginTop: 20,
    },
    buttonLabel: {
      color: theme.onSecondary,
      fontWeight: "bold",
      fontSize: 16,
    },
    buttonContent: {
      height: 50,
      justifyContent: "center",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Guess Number Game</Text>
      {enteredNumber ? <Text>Chosen number is: {enteredNumber}</Text> : null}
      <TextInput
        style={styles.input}
        label="Enter number"
        mode="outlined"
        keyboardType="number-pad"
        inputMode="numeric"
        maxLength={2}
        value={enteredNumber}
        onChangeText={handleChange}
      />
      <Button
        mode="contained"
        onPress={handlePress}
        style={styles.button}
        labelStyle={styles.buttonLabel}
        contentStyle={styles.buttonContent}
      >
        Submit
      </Button>
      <Button
        mode="contained"
        onPress={toggleTheme}
        style={styles.button}
        labelStyle={styles.buttonLabel}
        contentStyle={styles.buttonContent}
      >
        theme
      </Button>
    </View>
  );
};

export default StartGameScreen;
