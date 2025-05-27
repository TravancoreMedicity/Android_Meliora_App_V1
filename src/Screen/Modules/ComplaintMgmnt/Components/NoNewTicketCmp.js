//import liraries
import React, { memo } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import CustomActivityIndicator from "../../../../Components/CustomActivityIndicator";

// create a component
const NoNewTicketCmp = () => {
  const theme = useTheme();
  const { height } = useWindowDimensions();
  return (
    <View
      style={{
        height: (height * 80) / 100,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <CustomActivityIndicator />
      <Text
        style={{
          color: theme.colors.logoCol2,
          paddingTop: 50,
          fontSize: 12,
          fontWeight: "900",
        }}
      >
        No tickets data found !
      </Text>
    </View>
  );
};

//make this component available to the app
export default memo(NoNewTicketCmp);
