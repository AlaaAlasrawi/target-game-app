import StartGameScreen from "./components/screens/StartGameScreen";
import CustomWrapper from "./components/CustomWrapper";
import GameScreen from "./components/screens/GameScreen";
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
