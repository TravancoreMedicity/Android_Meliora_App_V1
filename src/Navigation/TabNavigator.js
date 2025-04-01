//import liraries
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../Screen/Profile/Profile";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { bgColor, colorTheme, iconColor } from "../Constant/Colors";
import SettingStack from "./SettingStack";
import HomeScreen from "../Screen/Home/HomeScreen";
import ChatStack from "./ChatStack";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "react-native-paper";
import { Platform, useWindowDimensions } from "react-native";

const Tab = createBottomTabNavigator();

// create a component
const TabNavigator = () => {
  const theme = useTheme();
  const { width } = useWindowDimensions();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.logoCol2,
          borderRadius: 30,
          position: "absolute",
          bottom: 20,
          paddingVertical: Platform.OS === "ios" ? 15 : 0,
          marginHorizontal: width > 760 ? 110 : 20,
          height: Platform.OS === "ios" ? 50 : 50,
        },
        tabBarInactiveTintColor: "#fff",
        tabBarActiveTintColor: theme.colors.logoCol4,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="DashBoard"
        component={Profile}
        // component={DashBoard}
        options={{
          // tabBarBadge: 9,
          // tabBarBadgeStyle: { backgroundColor: iconColor.tabBarIconColor },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-dashboard-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SettingScreeen"
        component={SettingStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={ChatStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="message1" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

//make this component available to the app
export default TabNavigator;
