//import liraries
import React, { memo } from "react";
import { View, StyleSheet, } from "react-native";
import { Button, Text } from "react-native-paper";

// create a component
const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text variant='headlineSmall' >This Module is under development.</Text>
      <Button
        icon="camera"
        mode="contained"
        style={{
          margin: 10
        }}
        onPress={() => navigation.goBack()}>
        Go Home
      </Button>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
export default memo(Profile);
