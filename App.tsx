import StartGameScreen from "./components/screens/StartGameScreen";
import CustomWrapper, { DrawerNavigator } from "./components/CustomWrapper";
import GameScreen from "./components/screens/GameScreen";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Pacifico-Regular": require("./assets/fonts/Pacifico-Regular.ttf"),
    "BungeeTint-Regular": require("./assets/fonts/BungeeTint-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <CustomWrapper
      initialRouteName="StartGame"
      screens={[
        {
          name: "StartGame",
          component: DrawerNavigator,
          options: { headerShown: false },
        },
        {
          name: "Game",
          component: GameScreen,
        },
      ]}
    />
  );
}
