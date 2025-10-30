import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Profile from "../Screen/Profile/Profile";
import CustomDrawer from "../Components/CustomDrawer";
import { MaterialIcons } from "@expo/vector-icons";
const Drawer = createDrawerNavigator();

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
import SettingStack from "./SettingStack";
import HomeStack from "./HomeStack";
import NewTickets from "../Screen/Modules/ComplaintMgmnt/NewTickets";
import DownloadsFile from "../Screen/Modules/DownLoads/DownloadsFile";
import ChatMain from "../Screen/Chat/ChatMain";
import {
  PencilSquareIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  BellAlertIcon,
  DeviceTabletIcon,
  ChatBubbleLeftEllipsisIcon,
  BellIcon,
  NewspaperIcon,
  HomeIcon,
  UserIcon,
  Cog6ToothIcon,
  CloudArrowDownIcon,
} from "react-native-heroicons/outline";
import { useTheme } from "react-native-paper";
import { View } from "react-native";

// create a component
const AppStack = () => {
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

  const theme = useTheme();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: theme.colors.logoCol2,
        drawerActiveTintColor: "#ccc",
        drawerInactiveTintColor: theme.colors.fontColor1,
        lazy: true,
        drawerLabelStyle: {
          marginLeft: -10,
          fontFamily: "Roboto_500Medium",
        },
        drawerItemStyle: {
          flex: 1,
          borderRadius: 20,
          marginHorizontal: 20,
          marginVertical: 4,
          paddingHorizontal: 10,
        },
        drawerStatusBarAnimation: "slide",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{
          drawerIcon: ({ color }) => <HomeIcon size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="New Ticket"
        component={NewTickets}
        options={{
          drawerIcon: ({ color }) => (
            <PencilSquareIcon height={22} width={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="My Tasks"
        component={ChatMain}
        options={{
          drawerIcon: ({ color }) => (
            <CalendarDaysIcon name="person" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="My Projects"
        component={ChatMain}
        options={{
          drawerIcon: ({ color }) => (
            <ClipboardDocumentListIcon size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="My Attendance Info"
        component={ChatMain}
        options={{
          drawerIcon: ({ color }) => (
            <DeviceTabletIcon size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Messages"
        component={ChatMain}
        options={{
          drawerIcon: ({ color }) => (
            <ChatBubbleLeftEllipsisIcon size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={ChatMain}
        options={{
          drawerIcon: ({ color }) => <BellIcon size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Escalations"
        component={ChatMain}
        options={{
          drawerIcon: ({ color }) => <BellAlertIcon size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="News & Events"
        component={ChatMain}
        options={{
          drawerIcon: ({ color }) => <NewspaperIcon size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Downloads"
        component={ChatMain}
        options={{
          drawerIcon: ({ color }) => (
            <CloudArrowDownIcon size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ChatMain}
        options={{
          drawerIcon: ({ color }) => (
            <UserIcon name="person" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingStack}
        options={{
          drawerIcon: ({ color }) => <Cog6ToothIcon size={22} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
};

//make this component available to the app
export default AppStack;
