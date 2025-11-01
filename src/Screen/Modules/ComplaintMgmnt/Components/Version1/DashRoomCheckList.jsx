import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { memo } from "react";
import { useTheme } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const DashRoomCheckList = () => {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => {}}>
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
            <MaterialIcons
              name="room-preferences"
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
              Room Checklist
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
              0
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(DashRoomCheckList);
