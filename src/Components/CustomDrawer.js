import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { colorTheme } from "../Constant/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { PowerIcon } from "react-native-heroicons/outline";
import { clearLoggedInformation } from "../Redux/ReduxSlice/LoginSLice";
// create a component
const CustomDrawer = (props) => {
  const [useName, setUserName] = useState("");
  const [department, setDepartment] = useState("");

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.loginFuntion.loginInfo);
  const loggedUserDetl = useMemo(() => userInfo, [userInfo]);

  useEffect(() => {
    const { emp_name, emp_sec } = loggedUserDetl.loginDetl;
    setUserName(emp_name);
    setDepartment(emp_sec);
  }, [loggedUserDetl]);

  const logOut = async () => {
    dispatch(clearLoggedInformation());
    AsyncStorage.clear();
  };

  return (
    // <View style={styles.container}>
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        backgroundColor: "white",
        margin: 0,
        padding: 0,
        flex: 1,
      }}
      style={{
        backgroundColor: "red",
      }}
    >
      <ImageBackground
        source={require("../../assets/bgImageNewTheme.png")}
        style={{ padding: 5, flex: 1, opacity: 1, marginTop: -4 }}
        // resizeMode='repeat'
      >
        <View style={{ flex: 1 }}>
          <View
            className="border-b-pink-950"
            style={{
              marginHorizontal: -5,
              paddingHorizontal: 6,
              paddingTop: 3,
              paddingBottom: 3,
              borderBottomWidth: 1.8,
            }}
          >
            <View className="flex" style={{ flexDirection: "row" }}>
              <View className="flex grow" style={{}}>
                <Text
                  style={{
                    color: colorTheme.fontColor,
                    fontSize: 18,
                    textTransform: "capitalize",
                    fontFamily: "Roboto_400Regular",
                  }}
                >
                  {useName?.toLowerCase()}
                </Text>
                <Text
                  style={{
                    color: colorTheme.fontColor,
                    fontSize: 15,
                    textTransform: "capitalize",
                    fontFamily: "Roboto_400Regular",
                  }}
                >
                  {department?.toLowerCase()}
                </Text>
              </View>
              <View className="flex justify-center">
                <Image
                  source={require("../../assets/LogoMeliora.png")}
                  style={{ width: 35, height: 35 }}
                  className="flex"
                />
              </View>
            </View>
          </View>

          <ScrollView
            style={{ flex: 1 }}
            contentOffset={{ x: 5, y: 5 }}
            showsVerticalScrollIndicator={false}
          >
            <DrawerItemList {...props} />
          </ScrollView>
          <View className="flex flex-row bg-[#454762] h-12 rounded-t-full rounded-b-full justify-center items-center">
            <TouchableOpacity className="flex flex-row" onPress={logOut}>
              <Text
                className="flex mr-2"
                style={{
                  fontSize: 18,
                  fontFamily: "Roboto_300Light",
                  color: "white",
                }}
              >
                Logoutaaaa
              </Text>
              <View className="font-extrabold">
                <PowerIcon size={22} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </DrawerContentScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
});

//make this component available to the app
export default CustomDrawer;
