import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { option } from "../hooks/types";

type NavigationProp = NativeStackNavigationProp<option, "StartGame">;

const StartGameScreen = () => {
  const [enteredNumber, setEnteredNumber] = useState("");
  const navigation = useNavigation<NavigationProp>();

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

  return (
    <View style={styles.container}>
      <Text>Guess Number Game</Text>
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
      <Button mode="contained" onPress={handlePress}>
        Submit
      </Button>
    </View>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  input: {
    width: "100%",
    fontSize: 20,
    textAlign: "center",
  },
});
