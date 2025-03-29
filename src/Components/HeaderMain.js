//import liraries
import React, { memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { colorTheme } from "../Constant/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { PowerIcon } from "react-native-heroicons/solid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { clearLoggedInformation } from "../Redux/ReduxSlice/LoginSLice";
import { useTheme } from "react-native-paper";
// create a component
const HeaderMain = ({ navigation, name }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const logOut = async () => {
    //CLEAR THE LOGIN INFORMATION
    dispatch(clearLoggedInformation());
    AsyncStorage.clear();
  };

  console.log(theme.dark);

  return (
    <View>
      <StatusBar
        animated={false}
        backgroundColor={theme.colors.statusBarCol}
        barStyle={theme.dark ? "light-content" : "dark-content"}
      />
      <View style={styles.headerStyleCmp}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialIcons
            name="reorder"
            size={25}
            color={colorTheme.mainColor}
          />
        </TouchableOpacity>
        <View
          style={{
            display: "flex",
            flex: 1,
            paddingLeft: 10,
            flexDirection: "row",
          }}
        >
          {/* <Text>Login as : </Text> */}
          <Text style={styles.userName}>{name}</Text>
        </View>
        <TouchableOpacity onPress={logOut}>
          <PowerIcon color={colorTheme.mainColor} height={25} width={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  imageBgCmp: {
    height: 35,
    width: 35,
  },
  headerStyleCmp: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 70,
    padding: 20,
    alignItems: "center",
  },
  userName: {
    fontSize: 20,
    fontFamily: "Roboto_500Medium",
    color: colorTheme.mainColor,
    textTransform: "capitalize",
  },
});

//make this component available to the app
export default memo(HeaderMain);
