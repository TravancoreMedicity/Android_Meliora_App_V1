//import liraries
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
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
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
// import logo from "./assets/SvgIcon.png";
// import logo from "../../../assets/SvgIcon.png";
import SvgLogo from "../../../assets/tmcsvg.svg";
import { bgColor, buttonColor, colorTheme, fontColor } from "../../Constant/Colors";

// import SvgLogo from "./src/Components/Svg/SVGComponent";
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// create a component
const MainScreen = ({ navigation }) => {
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
  });

  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       // Pre-load fonts, make any API calls you need to do here
  //       // await Font.loadAsync(fontsLoaded);
  //       // Artificially delay for two seconds to simulate a slow loading
  //       // experience. Please remove this if you copy and paste the code!
  //       // await new Promise((resolve) => setTimeout(resolve, 2000));
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       // Tell the application to render
  //       setAppIsReady(true);
  //     }
  //   }

  //   prepare();
  // }, [fontsLoaded]);

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
        backgroundColor={colorTheme.mainBgColor}
        barStyle='dark-content'
      />
      <View>
        <Text style={styles.textStyle}>Meliora</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* <Image source={logo} /> */}
        <SvgLogo width={300} height={300} />
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorTheme.mainBgColor,
    paddingTop: 24,
  },
  textStyle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#20315f",
    marginTop: 30,
  },
  TouchButton: {
    backgroundColor: colorTheme.mainColor,
    padding: 20,
    width: "90%",
    borderRadius: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 50,
  },
  TouchBtnText: {
    // fontWeight: "bold",
    fontSize: 18,
    color: fontColor.main,
    fontFamily: "Roboto_500Medium_Italic",
  },
});

//make this component available to the app
export default MainScreen;
