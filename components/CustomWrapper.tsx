import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import { ThemeProvider } from "../context/ThemeContext";

interface Screen {
  name: string;
  component: React.ComponentType<any>;
}

interface CustomWrapperProps {
  screens: Screen[];
  initialRouteName: string;
}

const CustomWrapper = ({ screens, initialRouteName }: CustomWrapperProps) => {
  const Stack = createNativeStackNavigator();

  return (
    <ThemeProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRouteName}>
            {screens.map((screen) => (
              <Stack.Screen
                key={screen.name}
                name={screen.name}
                component={screen.component}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ThemeProvider>
  );
};
export default CustomWrapper;
