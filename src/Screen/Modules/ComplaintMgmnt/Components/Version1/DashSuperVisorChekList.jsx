import { View, Text, useWindowDimensions } from "react-native";
import React, { memo } from "react";
import { useTheme } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

const DashSuperVisorChekList = () => {
  const theme = useTheme();
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        backgroundColor: theme.colors.cardBgColor,
        borderRadius: 15,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
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
            Supervisor verification
          </Text>
        </View>
        <View
          style={{
            flex: 0.3,
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto_400Regular",
              fontSize: 20,
              fontWeight: "900",
              color: theme.colors.logoCol2,
            }}
          >
            2000
          </Text>
        </View>
      </View>
    </View>
  );
};

export default memo(DashSuperVisorChekList);
