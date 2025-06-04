import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { memo } from "react";
import { TextInput } from "react-native-paper";

const NtivePaperInput = ({ handleRemarkChange, label, value, lines }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <TextInput
        label={label}
        value={value}
        style={{ height: 60 }}
        onChangeText={handleRemarkChange}
        multiline
        dense
        numberOfLines={lines}
      />
    </TouchableWithoutFeedback>
  );
};

export default memo(NtivePaperInput);
