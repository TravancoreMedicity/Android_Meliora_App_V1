import { View, Text } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "react-native-paper";

const NewTicketDash = () => {
  const theme = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.cardBgColor,
        height: 100,
        borderRadius: 15,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth: 2,
          borderBottomEndRadius: 30,
          borderBottomStartRadius: 30,
          borderStyle: "solid",
          borderColor: theme.colors.logoCol2,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Ionicons
            name="ticket-outline"
            size={20}
            color={theme.colors.logoCol2}
          />
          <Text
            style={{
              fontFamily: "Roboto_400Regular",
              fontSize: 15,
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
      </View>
      {/* sectrion */}
      <View
        style={{
          flex: 1,
          //   backgroundColor: "grey",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 1,
            // backgroundColor: "#afafaf",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto_400Regular",
              fontSize: 12,
              fontWeight: "900",
              color: theme.colors.logoCol2,
            }}
          >
            Today
          </Text>
          <Text
            style={{
              fontFamily: "Roboto_400Regular",
              fontSize: 15,
              fontWeight: "900",
              color: theme.colors.logoCol2,
            }}
          >
            150
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            // backgroundColor: "#afafaf",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto_400Regular",
              fontSize: 12,
              fontWeight: "900",
              color: theme.colors.logoCol2,
            }}
          >
            Previous Days
          </Text>
          <Text
            style={{
              fontFamily: "Roboto_400Regular",
              fontSize: 15,
              fontWeight: "900",
              color: theme.colors.logoCol2,
            }}
          >
            150
          </Text>
        </View>
      </View>
    </View>
  );
};

export default NewTicketDash;
