import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { option } from "../hooks/types";
import { useThemeContext } from "../context/ThemeContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StatusBar as RNStatusBar } from "react-native";
import AppZoomIcon from "./AppZoomIcon";

type NavigationProp = NativeStackNavigationProp<option, "StartGame">;

const StartGameScreen = () => {
  const [enteredNumber, setEnteredNumber] = useState("");
  const [zoomOut, setZoomOut] = useState(false);

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
    navigation.navigate("Game", { chosenNumber: number });
  }

  function handlePressZoom() {
    setZoomOut((pre) => !pre);
    RNStatusBar.setHidden(!zoomOut, "fade");
    navigation.setOptions({ headerShown: zoomOut });
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      justifyContent: "center",
      backgroundColor: theme.background,
    },
    input: {
      width: "100%",
      fontSize: 20,
      textAlign: "center",
      backgroundColor: theme.surface,
      borderRadius: 8,
    },
    text: {
      color: theme.text,
      fontSize: 28,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
    },
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
    chosenNumber: {
      textAlign: "center",
      fontSize: 16,
      marginBottom: 10,
      color: theme.text,
    },
    zoomIcon: {
      position: "absolute",
      bottom: 24,
      left: 24,
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.text}>Guess Number Game</Text>

        {enteredNumber ? (
          <Text style={styles.chosenNumber}>
            Chosen number is: {enteredNumber}
          </Text>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Enter a number"
          placeholderTextColor={theme.placeholder}
          textColor={theme.text}
          mode="outlined"
          keyboardType="number-pad"
          inputMode="numeric"
          maxLength={2}
          value={enteredNumber}
          onChangeText={handleChange}
          theme={{
            colors: {
              primary: theme.primary,
            },
          }}
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
          Toggle Theme
        </Button>

        <AppZoomIcon
          zoomOut={zoomOut}
          handlePressZoom={handlePressZoom}
          color={theme.text}
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default StartGameScreen;
