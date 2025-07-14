import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

interface AppZoomIconProps {
  zoomOut: boolean;
  color: any;
  style?: any;
  handlePressZoom: () => void;
}
const AppZoomIcon = ({
  zoomOut,
  color,
  style,
  handlePressZoom,
}: AppZoomIconProps) => {
  return (
    <Pressable onPress={handlePressZoom} style={[styles.zoomIcon, style]}>
      <MaterialIcons
        name={zoomOut ? "zoom-out-map" : "zoom-in-map"}
        size={32}
        color={color}
      />
    </Pressable>
  );
};

export default AppZoomIcon;
const styles = StyleSheet.create({
  zoomIcon: {
    position: "absolute",
    bottom: 24,
    left: 24,
  },
});
