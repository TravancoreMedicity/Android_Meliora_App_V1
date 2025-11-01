//import liraries
import React, { useCallback, useState } from "react";
import { Dimensions } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  useColorScheme,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from "@expo-google-fonts/roboto";
import { AkayaKanadaka_400Regular } from "@expo-google-fonts/akaya-kanadaka";

import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
// import logo from "./assets/SvgIcon.png";
// import logo from "../../../assets/SvgIcon.png";
import SvgLogo from "../../../assets/tmcsvg.svg";
import {
  bgColor,
  buttonColor,
  colorTheme,
  fontColor,
} from "../../Constant/Colors";
import { useTheme } from "react-native-paper";
const { height, width } = Dimensions.get("window");

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
// create a component

const MainScreen = ({ navigation }) => {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);

  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
    AkayaKanadaka_400Regular,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar
        animated={true}
        showHideTransition="fade"
        backgroundColor={theme.colors.mainScreenColor}
        barStyle="dark-content"
      />
      <View>
        <Text style={styles.textStyle}>Meliora</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* <Image source={logo} /> */}
        <SvgLogo
          width={height > 1000 ? 400 : 300}
          height={height > 1000 ? 200 : 200}
        />
      </View>
      <TouchableOpacity
        style={styles.TouchButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.TouchBtnText}>Let's Begin</Text>
        <MaterialIcons
          name="arrow-forward-ios"
          size={24}
          color={fontColor.main}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// define your styles
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colorTheme.mainBgColor,
    paddingTop: 24,
  },
  textStyle: {
    fontSize: height > 1000 ? 80 : 40,
    color: "rgb(124,81,161)",
    fontFamily: "AkayaKanadaka_400Regular",
    marginTop: height > 1000 ? 150 : 70,
  },
  TouchButton: {
    backgroundColor: "rgb(124,81,161)",
    padding: 20,
    width: "87%",
    borderRadius: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 90,
  },
  TouchBtnText: {
    // fontWeight: "bold",
    fontSize: 18,
    marginLeft: 20,
    color: fontColor.main,
    fontFamily: "Roboto_500Medium",
  },
});

//make this component available to the app
export default MainScreen;
