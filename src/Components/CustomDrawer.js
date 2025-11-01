import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  useWindowDimensions,
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
import { Avatar, useTheme } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ThemeContext } from "../Context/ThemeContext";
import { Toast } from "toastify-react-native";

// create a component
const CustomDrawer = (props) => {
  const theme = useTheme();
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
    Toast.show({
      type: "infoToast",
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

  const { height } = useWindowDimensions();

  // theme shifging code here
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        backgroundColor: theme.colors.appBgInside,
        margin: 0,
        padding: 0,
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.appBgInside,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginBottom: 8,
            height:
              height < 620 && height > 100
                ? 50
                : height > 700 && height < 799
                ? 70
                : 80,
          }}
        >
          <View
            style={{
              flex: 5,
              padding: 5,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: 10,
                paddingLeft: 5,
              }}
            >
              <Avatar.Icon
                size={height < 620 ? 40 : 50}
                icon="account-outline"
                backgroundColor={theme.colors.avatarBgColor1}
                color={theme.colors.avatarIconColor}
              />
            </View>
            <View
              style={{
                alignItems: "flex-start",
                justifyContent: "flex-end",
                lineHeight: 0,
              }}
            >
              <Text
                style={{
                  color: theme.colors.fontColor1,
                  fontSize: height > 750 ? 17 : 14,
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  fontFamily: "Roboto_400Regular",
                }}
                numberOfLines={1}
              >
                {useName?.toLowerCase()}
              </Text>
              <Text
                style={{
                  color: theme.colors.fontColor1,
                  fontSize: height > 750 ? 14 : 12,
                  textTransform: "capitalize",
                  fontFamily: "Roboto_400Regular",
                }}
                numberOfLines={1}
              >
                {department?.toLowerCase()}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1.5,
              alignItems: "center",
              justifyContent: "center",
              // backgroundColor: "orange",
            }}
          >
            <TouchableOpacity
              onPress={() => toggleTheme()}
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 35,
                height: 35,
                borderRadius: 100,
              }}
            >
              {isDarkTheme ? (
                <Ionicons
                  name="sunny"
                  size={30}
                  color={theme.colors.logoCol1}
                />
              ) : (
                <Ionicons name="moon" size={30} color={theme.colors.logoCol1} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          style={{ flex: 1 }}
          contentOffset={{ x: 5, y: 5 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Drawer conetet goes here */}
          <DrawerItemList {...props} />
          {/* Drawer contert ends here */}
        </ScrollView>
        {/* Bottom Conten */}
        <View
          style={{
            backgroundColor: theme.colors.logoCol2,
            minHeight: 65,
            maxHeight: 80,
            alignItems: "center",
            justifyContent: "center",
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            elevation: 5,
            marginHorizontal: 5,
          }}
        >
          <TouchableOpacity className="flex flex-row" onPress={logOut}>
            <Text
              className="flex mr-2"
              style={{
                fontSize: 18,
                fontFamily: "Roboto_300Light",
                color: "white",
              }}
            >
              Sign Out
            </Text>
            <View className="font-extrabold">
              <PowerIcon size={25} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

//make this component available to the app
export default CustomDrawer;
