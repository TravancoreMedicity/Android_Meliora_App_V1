//import liraries
import React, { memo, useState } from "react";
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
import CustomActivityIndicator from "./CustomActivityIndicator";
import { Toast } from "toastify-react-native";

// create a component
const HeaderMain = ({ navigation, name }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const logOut = async () => {
    //CLEAR THE LOGIN INFORMATION
    Toast.show({
      type: "info",
      text1: "Logout",
      text2: "Logout Successfully !",
      position: "center",
      visibilityTime: 2000,
    });
    setTimeout(() => {
      dispatch(clearLoggedInformation());
      AsyncStorage.clear();
    }, 2000);
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
          height: height > 790 ? 100 : 75,
        }}
      >
        {/* Open Drawer Menu Section Start here */}
        <View
          style={{
            // flex: 1,
            // height: "100%",
            // alignItems: "center",
            // flexDirection: "row",
            height: "100%",
            width: width / 7,
            justifyContent: "center",
            alignItems: width > 450 ? "center" : "flex-end",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            // style={{
            //   paddingLeft: 30,
            //   paddingRight: 10,
            // }}
          >
            <Ionicons
              name="apps"
              // size={height > 760 ? 40 : 30}
              // color={theme.colors.logoCol2}
              size={30}
              color={theme.colors.logoCol2}
            />
          </TouchableOpacity>
        </View>
        {/* Open Drawer section menu end here */}

        {/* Header Name Section Start here *************/}

        <View
          style={{
            flex: 1,
            paddingTop: 8,
            justifyContent: "center",
            alignItems: "flex-start",
            paddingLeft: width > 450 ? 0 : 10,
          }}
        >
          <Text
            style={{
              // fontFamily: "Roboto_500Medium",
              // fontSize: 14.4,
              // color: theme.colors.logoCol2,
              color: theme.colors.logoCol2,
              marginTop: Platform.OS === "ios" ? 0 : 13,
              fontFamily: "AkayaKanadaka_400Regular",
              fontSize: height > 760 ? 30 : 26,
            }}
          >
            Meliora
          </Text>
        </View>

        {/* <View
          style={{
            flex: 3,
            height: "100%",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              textAlignVertical: "",
              color: theme.colors.logoCol2,
              marginTop: Platform.OS === "ios" ? 0 : 20,
              fontFamily: "AkayaKanadaka_400Regular",
              fontSize: height > 760 ? 35 : 28,
            }}
          >
            Meliora
          </Text>
        </View> */}
        {/* Header Section Name end Here */}

        {/* LOgout Button Section start here */}
        <View
          style={{
            flex: 0,
            paddingHorizontal: height > 760 ? 40 : 18,
          }}
        >
          <TouchableOpacity onPress={logOut}>
            <PowerIcon
              color={theme.colors.logoCol2}
              fontWeight="900"
              fontSize="25"
              height={26}
              width={26}
            />
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
});

//make this component available to the app
export default memo(HeaderMain);
