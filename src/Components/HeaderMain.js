//import liraries
import React, { memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
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
          alignItems: "center",
          backgroundColor: "lightgreen",
          height: height > 790 ? 100 : 75,
        }}
      >
        {/* Open Drawer Menu Section Start here */}
        <View
          style={{
            flex: 1,
            height: "100%",
            // justifyContent: "center",
            alignItems: "center",
            // paddingHorizontal: height > 760 ? 40 : 18,
            flexDirection: "row",
            backgroundColor: "red",
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
            flex: 3,
            height: "100%",
            backgroundColor: "yellow",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              textAlignVertical: "",
              marginTop: Platform.OS === "ios" ? 0 : 20,
              fontFamily: "AkayaKanadaka_400Regular",
              fontSize: height > 760 ? 35 : 28,
            }}
          >
            Meliora
          </Text>
        </View>
        {/* Header Section Name end Here */}

        {/* LOgout Button Section start here */}
        <View
          style={{
            flex: 0,
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
