import { View, Text, useWindowDimensions } from "react-native";
import React, { memo } from "react";
import { useTheme } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { getLogiEmployeeID } from "../../../../../Redux/ReduxSlice/LoginSLice";
import { UseGetPendingTicketCount } from "../../../../../api/TicketsUtilities";

const DashAssistRequested = () => {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const empID = useSelector((state) => getLogiEmployeeID(state));

  const { data, isError, isLoading, isSuccess } =
    UseGetPendingTicketCount(empID);
  console.log(data);

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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons
            name="support-agent"
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
            Assist Requested
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

export default memo(DashAssistRequested);
