//import liraries
import React, { memo } from "react";
import { View, ActivityIndicator } from "react-native";
import { useTheme } from "react-native-paper";

// create a component
const CustomActivityIndicator = ({ size }) => {
  const theme = useTheme();
  return (
    <View
      style={{
        // flex: 1,
        justifyContent: "center",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
      }}
    >
      <ActivityIndicator color={theme.colors.logoCol1} size={size || "large"} />
    </View>
  );
};

//make this component available to the app
export default memo(CustomActivityIndicator);
