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
import { colorTheme } from "../Constant/Colors";
import SettingStack from "./SettingStack";
import HomeStack from "./HomeStack";
import NewTickets from "../Screen/Modules/ComplaintMgmnt/NewTickets";
import DownloadsFile from "../Screen/Modules/DownLoads/DownloadsFile";
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

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      // useLegacyImplementation={true}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: colorTheme.mainColor,
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: colorTheme.mainColor,
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: "Roboto_500Medium",
          fontSize: 15,
        },
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
        component={Profile}
        options={{
          drawerIcon: ({ color }) => (
            <CalendarDaysIcon name="person" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="My Projects"
        component={Profile}
        options={{
          drawerIcon: ({ color }) => (
            <ClipboardDocumentListIcon size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="My Attendance Info"
        component={Profile}
        options={{
          drawerIcon: ({ color }) => (
            <DeviceTabletIcon size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Messages"
        component={Profile}
        options={{
          drawerIcon: ({ color }) => (
            <ChatBubbleLeftEllipsisIcon size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={Profile}
        options={{
          drawerIcon: ({ color }) => <BellIcon size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Escalations"
        component={Profile}
        options={{
          drawerIcon: ({ color }) => <BellAlertIcon size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="News & Events"
        component={Profile}
        options={{
          drawerIcon: ({ color }) => <NewspaperIcon size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Downloads"
        component={DownloadsFile}
        options={{
          drawerIcon: ({ color }) => (
            <CloudArrowDownIcon size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
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
