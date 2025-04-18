import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "react-native-paper";
import { UseGetPendingTicketsCount } from "../../../../../api/TicketsUtilities";
import { getLogiEmpDEPT } from "../../../../../Redux/ReduxSlice/LoginSLice";
import { useSelector } from "react-redux";
import Skeleton from "../../../../../Components/V1_Cmp/Skeleton-Cmp/Skeleton";
import { useNavigation } from "@react-navigation/native";

const NewTicketDash = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const empID = useSelector((state) => getLogiEmpDEPT(state));

  const { width } = useWindowDimensions();

  const { data, isError, isLoading, isSuccess } =
    UseGetPendingTicketsCount(empID);

  const pendingTicketCount = data?.data?.[0]?.pending_ticket_count;

  return (
    <TouchableOpacity onPress={() => navigation.navigate("notAssign")}>
      <View
        style={{
          backgroundColor: theme.colors.cardBgColor,
          height: 50,
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
              justifyContent: "space-evenly",
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
              textAlign: "center",
            }}
          >
            {isLoading === true ? <Skeleton /> : pendingTicketCount}
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
    </TouchableOpacity>
  );
};

export default NewTicketDash;
