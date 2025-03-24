//import liraries
import React, { memo } from "react";
import { View, StyleSheet, TextInput } from "react-native";

// create a component
const CustomTextInput = ({
  Icon,
  Placeholder,
  keyboardType,
  value,
  onChangeTextFn,
}) => {
  return (
    <View style={styles.textInputFeild}>
      {Icon}
      <TextInput
        placeholder={Placeholder}
        style={styles.textInput}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeTextFn}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  textInputFeild: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
  },
});

//make this component available to the app
export default memo(CustomTextInput);
