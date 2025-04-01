//import liraries
import React, { memo } from "react";
import { View, ActivityIndicator } from "react-native";
import { useTheme } from "react-native-paper";

// create a component
const CustomActivityIndicator = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <ActivityIndicator color={theme.colors.logoCol1} size="large" />
    </View>
  );
};

//make this component available to the app
export default memo(CustomActivityIndicator);
