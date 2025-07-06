import React, { ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Surface } from "react-native-paper";
import { useThemeContext } from "../context/ThemeContext";

interface ViewBoxProps {
  children: ReactNode;
  style?: ViewStyle;
  elevation?: any;
  size?: number;
}

const ViewBox = ({
  children,
  style,
  elevation = 4,
  size = 160,
}: ViewBoxProps) => {
  const { theme } = useThemeContext();

  const styles = StyleSheet.create({
    container: {
      marginTop: 60,
      marginBottom: 30,
    },
    surface: {
      padding: 8,
      height: size,
      width: size,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.neutral,
      borderRadius: 12,
    },
  });

  return (
    <View style={styles.container}>
      <Surface style={[styles.surface, style]} elevation={elevation}>
        {children}
      </Surface>
    </View>
  );
};

export default ViewBox;
