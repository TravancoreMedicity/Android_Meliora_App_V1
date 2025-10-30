//import liraries
import React from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useTheme } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";

// create a component
const HearderSecondary = ({ navigation, name }) => {
  const theme = useTheme();
  const { height, width } = useWindowDimensions();

  return (
    <View>
      <StatusBar
        animated={false}
        backgroundColor={theme.colors.statusBarCol}
        barStyle={theme.dark ? "light-content" : "dark-content"}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: height > 790 ? 100 : 75,
          backgroundColor: theme.colors.statusBarCol,
        }}
      >
        {/* Drawer open button Start */}
        <View
          style={{
            // backgroundColor: "green",
            height: "100%",
            width: width / 7,
            justifyContent: "center",
            alignItems: width > 450 ? "center" : "flex-end",
          }}
        >
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <AntDesign
              name="appstore-o"
              size={30}
              color={theme.colors.logoCol2}
            />
          </TouchableOpacity>
        </View>
        {/* Drawer open button End */}

        {/* Page name Start */}
        <View
          style={{
            flex: 1,
            paddingTop: 8,
            justifyContent: "center",
            alignItems: "flex-start",
            paddingLeft: width > 450 ? 0 : 10,
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto_500Medium",
              fontSize: 14.4,
              color: theme.colors.logoCol2,
            }}
          >
            {name}
          </Text>
        </View>
        {/* Page name End */}

        {/* Home and Back Menu Start */}
        <View
          style={{
            height: "100%",
            width: width / 4,
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-undo-outline"
              size={30}
              color={theme.colors.logoCol2}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("HomeStack")}>
            <Feather name="home" size={25} color={theme.colors.logoCol2} />
          </TouchableOpacity>
        </View>
        {/* SearchHome and Back Menu  Start */}
      </View>
    </View>
  );
};

// define your styles

//make this component available to the app
export default React.memo(HearderSecondary);
