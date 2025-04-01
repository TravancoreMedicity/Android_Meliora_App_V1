import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";

const ModuleMenus = () => {
  const { width, height } = useWindowDimensions();

  const tileWidth = width / 2;

  return (
    <View
      style={{
        margin: 10,
        height: 100,
        width: tileWidth,
        backgroundColor: "lightblue",
      }}
    >
      <Text>{width}</Text>
    </View>
  );
};

export default ModuleMenus;

const styles = StyleSheet.create({});
