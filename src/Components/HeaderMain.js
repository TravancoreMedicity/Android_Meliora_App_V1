//import liraries
import React, { memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { colorTheme } from "../Constant/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { PowerIcon } from "react-native-heroicons/solid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { clearLoggedInformation } from "../Redux/ReduxSlice/LoginSLice";
import { useTheme } from "react-native-paper";

import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";

// create a component
const HeaderMain = ({ navigation, name }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const logOut = async () => {
    //CLEAR THE LOGIN INFORMATION
    dispatch(clearLoggedInformation());
    AsyncStorage.clear();
  };

  const { height, width } = useWindowDimensions();

  return (
    <View>
      <StatusBar
        animated={false}
        backgroundColor={theme.colors.statusBarCol}
        barStyle={theme.dark ? "light-content" : "dark-content"}
      />
      <View
        style={{
          flexDirection: "row",
          // justifyContent: "center",
          // paddingVertical: 20,
          // alignItems: "center",
          // backgroundColor: theme.colors.appBgInside,
          // backgroundColor: "lightgreen",
          height: height > 790 ? 100 : 75,
        }}
      >
        {/* Open Drawer Menu Section Start here */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            // paddingHorizontal: height > 760 ? 40 : 18,
            flexDirection: "row",
            // backgroundColor: "red",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{
              // backgroundColor: "white",
              paddingLeft: 30,
              paddingRight: 10,
            }}
          >
            <Ionicons
              name="apps"
              size={height > 760 ? 40 : 30}
              color={theme.colors.avatarBgColor1}
            />
          </TouchableOpacity>
        </View>
        {/* Open Drawer section menu end here */}

        {/* Header Name Section Start here *************/}
        <View
          style={{
            flex: 1,
            // backgroundColor: "yellow",
            flexDirection: "column",
            justifyContent: "flex-end",
            // alignItems: "center",
            // paddingTop: 25,
          }}
        >
          <Text
            style={{
              // marginTop: 10,
              // justifyContent: "center",
              fontFamily: "AkayaKanadaka_400Regular",
              // color: colorTheme.mainColor,
              // textTransform: "capitalize",
              // backgroundColor: "blue",
              // paddingTop: 20,
              fontSize: height > 760 ? 35 : 28,
            }}
          >
            {name}
          </Text>
        </View>
        {/* Header Section Name end Here */}

        {/* LOgout Button Section start here */}
        <View
          style={{
            // backgroundColor: "orange",
            paddingHorizontal: height > 760 ? 40 : 18,
          }}
        >
          <TouchableOpacity onPress={logOut}>
            <PowerIcon color={colorTheme.mainColor} height={25} width={25} />
          </TouchableOpacity>
        </View>
        {/* Log out button end here */}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  imageBgCmp: {
    height: 35,
    width: 35,
  },
  headerStyleCmp: {},
  userName: {},
});

//make this component available to the app
export default memo(HeaderMain);
