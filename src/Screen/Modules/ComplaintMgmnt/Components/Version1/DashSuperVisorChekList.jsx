import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { memo } from "react";
import { useTheme } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { UsegetSuperVisorVerificationCount } from "../../../../../api/TicketsUtilities";
import { useSelector } from "react-redux";
import { getLogiEmpDEPT } from "../../../../../Redux/ReduxSlice/LoginSLice";

const DashSuperVisorChekList = () => {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const deptID = useSelector(getLogiEmpDEPT);

  const { count, isError, isLoading, isSuccess } =
    UsegetSuperVisorVerificationCount(deptID);

  return (
    <TouchableOpacity onPress={() => navigation.navigate("SuperVerify")}>
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
            <MaterialCommunityIcons
              name="account-cowboy-hat-outline"
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
              justifyContent: "center",
              alignItems: "flex-end",
              paddingRight: 20,
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
              {count}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(DashSuperVisorChekList);
