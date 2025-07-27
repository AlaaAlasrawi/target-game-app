import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import { ThemeProvider, useThemeContext } from "../context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { Pressable } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StartGameScreen from "./screens/StartGameScreen";
import SettingScreen from "./screens/SettingScreen";

interface HeaderIconConfig {
  direction: "left" | "right";
  name: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
  color?: string;
  size?: number;
}

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

const Drawer = createDrawerNavigator();
export function DrawerNavigator() {
  const { theme } = useThemeContext();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: theme.surface },
        headerTintColor: theme.text,
        drawerStyle: {
          backgroundColor: theme.drawer,
        },
        drawerActiveTintColor: theme.drawerActiveColor,

        drawerInactiveTintColor: theme.text,

        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: 600,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={StartGameScreen}
        options={{
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-sharp" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-sharp" color={color} size={24} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={() => ""}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={() => ""}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
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
