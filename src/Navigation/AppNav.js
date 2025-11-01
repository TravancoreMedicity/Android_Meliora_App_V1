import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { colorTheme } from "../Constant/Colors";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { PaperProvider } from "react-native-paper";
import { CombinedDarkTheme, CombinedLightTheme } from "../theme/Theme";
import useDarkThemeMode from "../Hooks/useDarkThemeMode";
import { ThemeContext } from "../Context/ThemeContext";
import { axiosApi } from "../config/Axiox";
import { navigationRef } from "./NavigationService";
import { authenticatedLoginStatus } from "../Redux/ReduxSlice/LoginSLice";

const AppNav = () => {
  // const navigation = useNavigation();
  const dispatch = useDispatch();
  // const [userToken, setUserToken] = useState(null);
  const tokenId = useSelector((state) => state.loginFuntion.loginInfo.token);
  const loginStatus = useSelector(
    (state) => state.loginFuntion.loginInfo.lodingStatus
  );

  // console.log(loginStatus);
  const colorScheme = useColorScheme();

  const { isDarkTheme, toggleTheme } = useDarkThemeMode();

  useEffect(() => {
    const getToken = async () => {
      // const token = await AsyncStorage.getItem("@token:");
      if (tokenId) {
        // console.log(` token id `);
        // const userInfo = await AsyncStorage.getItem("@userInfo:");
        const validatetoken = await axiosApi.get("/validateToken");
        const { success } = validatetoken.data || {};
        if (success === 106) {
          const loginInfo = { loginStatus: true };
          dispatch(authenticatedLoginStatus(loginInfo));
        } else {
          const loginInfo = { loginStatus: false };
          dispatch(authenticatedLoginStatus(loginInfo));

          await AsyncStorage.removeItem("@token:");
          await AsyncStorage.removeItem("@userInfo:");
        }
      }
    };
    getToken();
  }, [tokenId]);

  // console.log("login status");

  const defTheme = isDarkTheme ? CombinedDarkTheme : CombinedLightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      <PaperProvider theme={defTheme}>
        <NavigationContainer theme={defTheme} ref={navigationRef}>
          <StatusBar
            animated={true}
            showHideTransition="fade"
            backgroundColor={colorTheme.mainBgColor}
            barStyle="dark-content"
          />
          {loginStatus === false ? <AuthStack /> : <AppStack />}
        </NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  );
};

export default AppNav;
