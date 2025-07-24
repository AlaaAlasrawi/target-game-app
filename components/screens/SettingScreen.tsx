import React, { useEffect, useRef } from "react";
import { Text, View, Switch, StyleSheet, Animated, Easing } from "react-native";
import { useThemeContext } from "../../context/ThemeContext";

const SettingScreen = () => {
  const { theme, isDark, toggleTheme } = useThemeContext();

  // Pulse animation for the switch
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Pulse the switch when theme changes
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 100,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [isDark]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.label, { color: theme.text }]}>
        {isDark ? "Dark Mode On" : "Dark Mode Off"}
      </Text>

      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          thumbColor={theme.switchThumb}
          trackColor={{
            false: theme.switchTrackOff,
            true: theme.switchTrackOn,
          }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  label: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
});

export default SettingScreen;
