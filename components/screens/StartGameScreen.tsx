import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Image,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { option } from "../../hooks/types";
import { useThemeContext } from "../../context/ThemeContext";
import { StatusBar as RNStatusBar } from "react-native";
import AppZoomIcon from "../AppZoomIcon";

type NavigationProp = NativeStackNavigationProp<option, "StartGame">;

const StartGameScreen = () => {
  const [enteredNumber, setEnteredNumber] = useState("");
  const [zoomOut, setZoomOut] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [imageLoading, setImageLoading] = useState(false);

  const navigation = useNavigation<NavigationProp>();
  const { theme, toggleTheme } = useThemeContext();

  const { width, height } = useWindowDimensions();
  const isPortrait = height >= width;

  const styles = getStyles(theme, isPortrait);

  function handleChange(text: string) {
    setEnteredNumber(text);
  }

  function handlePress() {
    const number = parseInt(enteredNumber, 10);
    if (isNaN(number) || number < 1 || number > 99) {
      setError("Please enter a number between 1 and 99.");
      setEnteredNumber("");
      return;
    }
    setError(undefined);
    navigation.navigate("Game", { chosenNumber: number });
  }

  function handlePressZoom() {
    setZoomOut((pre) => !pre);
    navigation.setOptions({ headerShown: !zoomOut, animation: "none" });
    RNStatusBar.setHidden(zoomOut, "fade");
  }

  function handleImageLoading() {
    setImageLoading(true);
  }

  function handleImageLoaded() {
    setImageLoading(false);
  }
  // console.log("isPortrait:", isPortrait, "Width:", width, "Height:", height);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Image
            style={styles.image}
            source={require("../../assets/images/target-pic.jpg")}
            onLoadStart={handleImageLoading}
            onLoadEnd={handleImageLoaded}
            onError={(e) =>
              console.warn("Image failed to load", e.nativeEvent.error)
            }
          />
          {imageLoading && (
            <ActivityIndicator
              size="large"
              color={theme.primary}
              style={styles.loading}
            />
          )}
          <View style={styles.innerContainer}>
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
            {error && <Text style={styles.error}>{error}</Text>}

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
          </View>
          <AppZoomIcon
            style={styles.zoomIcon}
            zoomOut={zoomOut}
            handlePressZoom={handlePressZoom}
            color={theme.text}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

function getStyles(theme: any, isPortrait: boolean) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    container: {
      flex: 1,
      paddingHorizontal: isPortrait ? 0 : 20,
      flexDirection: isPortrait ? "column" : "row",
    },
    image: {
      width: isPortrait ? "100%" : "40%",
      height: isPortrait ? 220 : "100%",
      resizeMode: isPortrait ? "cover" : "contain",
    },
    innerContainer: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: isPortrait ? 20 : 0,
    },
    text: {
      fontSize: 32,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
      fontFamily: "BungeeTint-Regular",
      paddingTop: 20,
    },
    input: {
      width: "100%",
      fontSize: 20,
      textAlign: "center",
      backgroundColor: theme.surface,
      borderRadius: 8,
    },
    button: {
      backgroundColor: theme.primary,
      borderRadius: 12,
      width: "100%",
      marginTop: 20,
    },
    buttonLabel: {
      color: theme.buttonText,
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
    error: {
      color: theme.error,
      marginTop: 8,
      textAlign: "center",
    },
    zoomIcon: {
      position: "absolute",
      bottom: 24,
      left: 24,
    },
    loading: {},
  });
}

export default StartGameScreen;
