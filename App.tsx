import { MaterialIcons } from "@expo/vector-icons";
import { Text, Pressable } from "react-native";
import { useThemeContext } from "./context/ThemeContext"; // Optional if you want to use the theme color
import GameScreen from "./components/GameScreen";
import StartGameScreen from "./components/StartGameScreen";
import CustomWrapper from "./components/CustomWrapper";
export default function App() {
  return (
    <CustomWrapper
      initialRouteName="StartGame"
      screens={[
        {
          name: "StartGame",
          component: StartGameScreen,
          headerIcon: {
            direction: "right",
            name: "settings",
            onPress: () => console.log("Settings pressed"),
          },
        },
        {
          name: "Game",
          component: GameScreen,
        },
      ]}
    />
  );
}
