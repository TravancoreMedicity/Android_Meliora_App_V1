//import liraries
import React, { memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { colorTheme } from "../Constant/Colors";

// create a component
const CustomTextInputWithLabel = ({
  Icon,
  Placeholder,
  InputType,
  keyboardType,
  feildButtonLabel,
  feildButtonFunction,
  onChangeTextFn,
  value,
}) => {
  return (
    <View style={styles.textInputFeild}>
      {Icon}
      {InputType === "password" ? (
        <TextInput
          placeholder={Placeholder}
          style={styles.textInput}
          secureTextEntry={true}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeTextFn}
        />
      ) : (
        <TextInput
          placeholder={Placeholder}
          style={styles.textInput}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeTextFn}
        />
      )}
      <TouchableOpacity onPress={feildButtonFunction}>
        <Text style={styles.forgetText}>{feildButtonLabel}</Text>
      </TouchableOpacity>
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
  forgetText: {
    color: colorTheme.mainColor,
    fontWeight: "700",
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
  },
});

//make this component available to the app
export default memo(CustomTextInputWithLabel);
