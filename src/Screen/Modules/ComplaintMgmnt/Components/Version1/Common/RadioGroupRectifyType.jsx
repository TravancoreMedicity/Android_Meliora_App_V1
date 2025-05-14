import { View, Text, useWindowDimensions } from "react-native";
import React, { memo, useState } from "react";
import { RadioButton, useTheme } from "react-native-paper";

const RadioGroupRectifyType = ({ value, setValue }) => {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  return (
    <RadioButton.Group onValueChange={(value) => setValue(value)} value={value}>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <RadioButton.Item
          label="Rectified"
          value={2}
          color={theme.colors.logoCol1}
          uncheckedColor={theme.colors.logoCol2}
          position="leading"
          style={{
            //backgroundColor: "green",
            height: 40,
            borderRadius: 18,
            minWidth: (width * 40) / 100,
            borderWidth: 1.5,
            borderColor: theme.colors.logoCol2,
            color: theme.colors.logoCol1,
          }}
          labelStyle={{
            fontSize: 15.5,
            fontFamily: "Roboto_500Medium",
            color: theme.colors.logoCol2,
            textAlign: "justify",
            // fontWeight: "bold",
          }}
        />
        <RadioButton.Item
          label="hold"
          value={1}
          color={theme.colors.logoCol1}
          uncheckedColor={theme.colors.logoCol2}
          position="leading"
          style={{
            //backgroundColor: "green",
            height: 40,
            borderRadius: 18,
            minWidth: (width * 40) / 100,
            borderWidth: 1.5,
            borderColor: theme.colors.logoCol2,
            color: theme.colors.logoCol1,
          }}
          labelStyle={{
            fontSize: 15.5,
            fontFamily: "Roboto_500Medium",
            color: theme.colors.logoCol2,
            // textAlignVertical: "top",
            // backgroundColor: "red",
            textAlign: "justify",
            // fontWeight: "bold",
          }}
        />
      </View>
    </RadioButton.Group>
  );
};

export default memo(RadioGroupRectifyType);
