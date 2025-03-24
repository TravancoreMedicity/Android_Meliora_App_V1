//import liraries
import React, {
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Platform,
  Button,
} from "react-native";
import HeaderMain from "../../Components/HeaderMain";
import { bgColor, colorTheme, fontColor } from "../../Constant/Colors";
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

//Notification imports
import * as Notifications from "expo-notifications";
// import { ActionType } from '../../Redux/Constants/action.type'
import { useDispatch } from "react-redux";
import AvatarMenu from "./AvatarMenu";

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    };
  },
});

import { DATA } from "./func/HomeFunc";
import MyTicketDash from "../Modules/ComplaintMgmnt/Components/MyTicketDash";
import { getExpoPushToken } from "../../Redux/ReduxSlice/pushTokenSlice";
import DeptStatistic from "../Dashboard/DeptStatistic";
import DepartmentStat from "../Dashboard/DepartmentStat";

// create a component
const HomeScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const [expoPushToken, setExpoPushToken] = useState();
  const [loding, setLoading] = useState(true);

  // const { FETCH_PUSH_TOKEN } = ActionType;

  //getting the pushtoken
  useEffect(() => {
    const configurePushNotifications = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert(
          "Permission required",
          "Push Notification Permission Required"
        );
        return;
      }

      const pushTokenData = await Notifications.getExpoPushTokenAsync();
      // dispatch({ type: FETCH_PUSH_TOKEN, payload: pushTokenData })

      dispatch(getExpoPushToken(pushTokenData))
      // setExpoPushToken(pushTokenData);
      // console.log(pushTokenData);

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
          sound: './assets/notification-sound.wav',
        });
      }
    };

    configurePushNotifications();
  }, []);

  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        // console.log("NOTIFICATION RECEIVED LISTNER");
        // console.log(notification);
        const userName = notification.request.content.data;
      }
    );

    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        // console.log("NOTIFICATION RESPONSE RECEIVED LISTNER");
        // console.log(response);
        const userName = response.notification.request.content.data;
      }
    );

    return () => {
      subscription1.remove();
      subscription2.remove();
    };


  }, []);

  setTimeout(() => {
    setLoading(false)
  }, 2000)

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

  // const scheduleNotificationHandler = async () => {
  //   await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "this is my first notification",
  //       body: "This is the message body",
  //       subtitle: 'New Ticket Registerd',
  //       badge: 3,
  //       color: '#d5fc5c',
  //       vibrationPattern: [0, 250, 250, 250],
  //       data: { userName: "Ajith" },
  //     },
  //     trigger: {
  //       seconds: 1,
  //     },
  //   });
  // };

  // const sendPushNotification = async (expoPushToken) => {
  //   // console.log(expoPushToken);

  //   const message = {
  //     to: expoPushToken.data,
  //     sound: "default",
  //     title: "Original Title",
  //     body: "And here is the body!",
  //     data: { someData: "goes here" },
  //   };

  //   const pushToken = axiosApi.post("/push", expoPushToken);
  //   console.log(pushToken);

  //   // console.log(message);

  //   // await fetch("https://exp.host/--/api/v2/push/send", {
  //   //   method: "POST",
  //   //   headers: {
  //   //     Accept: "application/json",
  //   //     "Accept-encoding": "gzip, deflate",
  //   //     "Content-Type": "application/json",
  //   //   },
  //   //   body: JSON.stringify(message),
  //   // });
  // };

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      {/* Header Component */}
      <HeaderMain navigation={navigation} name="Meliora" />
      <View className="flex" >
        <View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            fadingEdgeLength={10}
            className="flex"
          >
            {
              DATA.map((val) => {
                return <AvatarMenu
                  mainTitle={val.title}
                  icon={val.icon}
                  iconColor={colorTheme.iconColor}
                  avatarColor={colorTheme.secondaryBgColor}
                  key={val.id}
                  navigation={navigation}
                  routeName={val.routeName}
                />
              })
            }
          </ScrollView>
        </View>

        <ScrollView className="flex" >
          <View className="flex p-2" >
            {/* <MyTicketDash /> */}
            {/* <DeptStatistic /> */}
            <DepartmentStat />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: colorTheme.mainBgColor,
    flex: 1
  },
  textCardFont: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 15,
    margin: 5,
    color: fontColor.inActiveFont
  },
  menuContainer: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // padding: 4,
  },
  textStyle: {
    fontFamily: "Roboto_500Medium",
    fontSize: 10,
    fontWeight: '400',
    color: bgColor.statusbar
  },
  avatar: {
    backgroundColor: bgColor.cardBg
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

//make this component available to the app
export default memo(HomeScreen);
