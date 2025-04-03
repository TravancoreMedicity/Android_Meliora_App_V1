import { View, Text } from "react-native";
import React, { memo } from "react";
import { useTheme } from "react-native-paper";

const DashAssistRequested = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.colors.cardBgColor,
        borderRadius: 15,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>DashAssistRequested</Text>
    </View>
  );
};

export default memo(DashAssistRequested);
