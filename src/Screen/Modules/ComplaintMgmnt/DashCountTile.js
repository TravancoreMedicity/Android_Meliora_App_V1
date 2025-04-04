//import liraries
import React, { memo, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  useWindowDimensions,
} from "react-native";
import { colorTheme, fontColor } from "../../../Constant/Colors";
import { windowHeight } from "../../../utils/Dimentions";
import { MegaphoneIcon } from "react-native-heroicons/outline";
import { useTheme } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
// create a component
const DashCountTile = ({ name, count, id, route }) => {
  const theme = useTheme();
  const { width } = useWindowDimensions();

  const navigation = useNavigation();
  //dashboard api call count
  const dashCountUpdation = useCallback(() => {
    if (id === 2) {
      navigation.navigate("AssignList");
    } else if (id === 3) {
      navigation.navigate("Assistance");
    } else if (id === 4) {
      navigation.navigate("OnHold");
    } else if (id === 5) {
      navigation.navigate("Verify");
    } else if (id === 6) {
      navigation.navigate("Completed");
    } else if (id === 1) {
      navigation.navigate("notAssign");
    }
  }, [navigation]);

  const tileWidth = width > 450 ? (width - 120) / 3 : (width - 60) / 2;

  return (
    <View
      style={{
        margin: 3,
        width: tileWidth,
        height: 70,
        borderWidth: 2,
        borderColor: theme.colors.cardBgColor,
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <TouchableNativeFeedback
        onPress={() => navigation.navigate(route)}
        useForeground={true}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
          }}
        >
          <View
            style={{
              flex: 1,
              paddingLeft: 10,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Ionicons
              size={20}
              name="ticket"
              style={{ color: theme.colors.logoCol1 }}
            />
            <Text
              style={{
                paddingLeft: 5,
                fontFamily: "Roboto_500Medium",
                fontWeight: "900",
                color: theme.colors.fontColor1,
              }}
            >
              20
            </Text>
          </View>
          <View
            style={{
              flex: 0.6,
              paddingLeft: 10,
              backgroundColor: theme.colors.cardBgColor,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto_500Medium",
                fontWeight: "900",
                textTransform: "capitalize",
                color: theme.colors.logoCol2,
              }}
            >
              {name}
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

//make this component available to the app
export default memo(DashCountTile);
