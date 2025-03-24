import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { useSelector } from "react-redux";
import { colorTheme } from "../Constant/Colors";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

const AppNav = () => {
  const [userToken, setUserToken] = useState(null);
  const tokenId = useSelector((state) => state.loginFuntion.loginInfo.token);

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("@token:");
      const userInfo = await AsyncStorage.getItem("@userInfo:");
      setUserToken(token);
    };
    getToken();
  }, [tokenId]);

  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor={colorTheme.mainBgColor}
        barStyle='dark-content'
      />
      {tokenId === null ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
};

export default AppNav;
