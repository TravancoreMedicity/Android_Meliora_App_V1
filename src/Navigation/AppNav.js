import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { useSelector } from "react-redux";
import { colorTheme } from "../Constant/Colors";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { PaperProvider } from "react-native-paper";
import { CombinedDarkTheme, CombinedLightTheme } from "../theme/Theme";
import useDarkThemeMode from "../Hooks/useDarkThemeMode";
import { ThemeContext } from "../Context/ThemeContext";

const AppNav = () => {
  const [userToken, setUserToken] = useState(null);
  const tokenId = useSelector((state) => state.loginFuntion.loginInfo.token);
  const colorScheme = useColorScheme();

  const { isDarkTheme, toggleTheme } = useDarkThemeMode();

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("@token:");
      const userInfo = await AsyncStorage.getItem("@userInfo:");
      setUserToken(token);
    };
    getToken();
  }, [tokenId]);

  const defTheme = isDarkTheme ? CombinedDarkTheme : CombinedLightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      <PaperProvider theme={defTheme}>
        <NavigationContainer theme={defTheme}>
          <StatusBar
            animated={true}
            showHideTransition="fade"
            backgroundColor={colorTheme.mainBgColor}
            barStyle="dark-content"
          />
          {tokenId === null ? <AuthStack /> : <AppStack />}
        </NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  );
};

export default AppNav;
