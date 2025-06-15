import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import { ThemeProvider, useThemeContext } from "../context/ThemeContext";

interface Screen {
  name: string;
  component: React.ComponentType<any>;
}

interface CustomWrapperProps {
  screens: Screen[];
  initialRouteName: string;
}

const InnerWrapper = ({ screens, initialRouteName }: CustomWrapperProps) => {
  const Stack = createNativeStackNavigator();
  const { theme } = useThemeContext();

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRouteName}
          screenOptions={{
            headerStyle: { backgroundColor: theme.surface },
            headerTintColor: theme.text,
            contentStyle: { backgroundColor: theme.background },
          }}
        >
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
  );
};

const CustomWrapper = (props: CustomWrapperProps) => {
  return (
    <ThemeProvider>
      <InnerWrapper {...props} />
    </ThemeProvider>
  );
};

export default CustomWrapper;
