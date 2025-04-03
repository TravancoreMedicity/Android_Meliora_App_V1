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
// create a component
const DashCountTile = ({ navigation, name, count, id, escalated }) => {
  const theme = useTheme();
  const { width, height } = useWindowDimensions();
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

  const tileWidth = width > 450 ? (width - 80) / 3 : (width - 60) / 2;

  return (
    <View
      style={{
        // backgroundColor: ,
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
        // onPress={() => dashCountUpdation()}
        onPress={() => {}}
        useForeground={true}
        // style={{ backgroundColor: "red", flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            // padding: 5,
            flexDirection: "column",
            // backgroundColor: "green",
            // justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              paddingLeft: 10,
              flexDirection: "row",
              //   backgroundColor: "red",
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
                color: theme.colors.logoCol2,
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
              asdasd
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

//make this component available to the app
export default memo(DashCountTile);
