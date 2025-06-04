//import liraries
import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { bgColor } from "../../Constant/Colors";

// create a component
const ChatMain = ({ navigation }) => {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.appBgInside,
      }}
    >
      <Text variant="headlineSmall">This Module is under development.</Text>
      <Button
        icon="camera"
        mode="contained"
        style={{
          margin: 10,
        }}
        onPress={() => navigation.goBack()}
      >
        Go Home
      </Button>
    </View>
  );
};
//make this component available to the app
export default memo(ChatMain);
