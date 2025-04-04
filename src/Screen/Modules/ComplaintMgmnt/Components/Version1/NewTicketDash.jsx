import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "react-native-paper";

const NewTicketDash = () => {
  const theme = useTheme();
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        backgroundColor: theme.colors.cardBgColor,
        height: 55,
        borderRadius: 15,
        overflow: "hidden",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: width > 460 ? 0 : 10,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="ticket-outline"
            size={30}
            color={theme.colors.logoCol2}
          />
          {/* </View> */}
          <Text
            style={{
              fontFamily: "Roboto_400Regular",
              fontSize: width > 360 ? 17 : 15,
              fontWeight: "800",
              paddingLeft: 10,
              color: theme.colors.logoCol2,
            }}
          >
            New Tickets
          </Text>
        </View>
        <Text
          style={{
            flex: 0.4,
            fontFamily: "Roboto_400Regular",
            fontSize: 20,
            fontWeight: "900",
            color: theme.colors.logoCol2,
          }}
        >
          200
        </Text>
        <Ionicons
          name="chevron-forward"
          size={30}
          style={{
            flex: 0.2,
            opacity: 0.5,
          }}
          color={theme.colors.logoCol5}
        />
      </View>
    </View>
  );
};

export default NewTicketDash;
