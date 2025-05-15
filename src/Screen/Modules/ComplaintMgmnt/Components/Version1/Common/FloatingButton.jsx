import { View, Text, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "react-native-paper";

const FloatingButton = ({ hangleOnPress }) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        bottom: 30,
        right: 30,
        backgroundColor: theme.colors.logoCol1,
        borderRadius: 50,
        padding: 15,
        elevation: 5,
        zIndex: 10,
      }}
      onPress={hangleOnPress}
    >
      <Feather name="corner-up-left" size={22} color="white" />
    </TouchableOpacity>
  );
};

export default memo(FloatingButton);
