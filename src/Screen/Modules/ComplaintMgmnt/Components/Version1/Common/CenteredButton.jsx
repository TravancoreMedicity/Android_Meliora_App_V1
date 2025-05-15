import { View, Text, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { useTheme } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";

const CenteredButton = ({ hangleOnPress, label }) => {
  const theme = useTheme();
  return (
    <View
      style={{
        paddingVertical: 8,
        // paddingBottom: 50,
        height: 130,
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-evenly",
        // backgroundColor: theme.colors.statusBarCol,
        // backgroundColor: "green",
      }}
    >
      <View
        style={{
          // borderWidth: 2,
          width: "40%",
          // backgroundColor: "orange",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
          borderColor: theme.colors.logoCol2,
          shadowColor: "#000",
          opacity: 0.8,
          shadowOffset: { width: 0, height: 2 }, // iOS shadow
          shadowOpacity: 0.2,
          shadowRadius: 3,
          // elevation: 4, // Android shadow
        }}
      >
        <View style={{ width: "40%", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: theme.colors.logoCol2, // green
              padding: 15,
              borderRadius: 50, // circular
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              opacity: 0.8,
              shadowOffset: { width: 0, height: 2 }, // iOS shadow
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 4, // Android shadow
            }}
            onPress={hangleOnPress}
            activeOpacity={0.7}
          >
            <Feather name="thumbs-up" size={22} color="white" />
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              color: theme.colors.logoCol2,
              fontSize: 12,
              fontFamily: "Roboto_500Medium",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {label}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default memo(CenteredButton);
