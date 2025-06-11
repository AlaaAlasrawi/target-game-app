import React from "react";
import { StyleSheet } from "react-native";
import StartGameScreen from "./components/StartGameScreen";
import GameScreen from "./components/GameScreen";
import CustomWrapper from "./components/CustomWrapper";

export default function App() {
  return (
    <CustomWrapper
      initialRouteName="StartGame"
      screens={[
        { name: "StartGame", component: StartGameScreen },
        { name: "Game", component: GameScreen },
      ]}
    />
  );
}
