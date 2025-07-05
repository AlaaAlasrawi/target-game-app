import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import { ThemeProvider, useThemeContext } from "../context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// Custom type for header icon configuration
interface HeaderIconConfig {
  direction: "left" | "right";
  name: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
  color?: string;
  size?: number;
}

// Extended screen interface
interface Screen {
  name: string;
  component: React.ComponentType<any>;
  options?: object;
  headerIcon?: HeaderIconConfig;
}

interface CustomWrapperProps {
  screens: Screen[];
  initialRouteName: string;
}

const InnerWrapper = ({ screens, initialRouteName }: CustomWrapperProps) => {
  const Stack = createNativeStackNavigator();
  const { theme, isDark } = useThemeContext();

  return (
    <PaperProvider>
      <StatusBar style={isDark ? "light" : "dark"} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRouteName}
          screenOptions={{
            headerStyle: { backgroundColor: theme.surface },
            headerTintColor: theme.text,
            contentStyle: { backgroundColor: theme.background },
          }}
        >
          {screens.map((screen) => {
            const { headerIcon, options, ...rest } = screen;

            const headerOption: Record<string, any> = {};

            if (headerIcon) {
              const iconElement = () => (
                <Pressable onPress={headerIcon.onPress}>
                  <MaterialIcons
                    name={headerIcon.name}
                    size={headerIcon.size ?? 24}
                    color={headerIcon.color ?? theme.text}
                    style={{
                      marginHorizontal: 12,
                    }}
                  />
                </Pressable>
              );

              headerOption[
                headerIcon.direction === "right" ? "headerRight" : "headerLeft"
              ] = iconElement;
            }

            return (
              <Stack.Screen
                key={screen.name}
                name={screen.name}
                component={screen.component}
                options={{
                  ...options,
                  ...headerOption,
                }}
              />
            );
          })}
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
