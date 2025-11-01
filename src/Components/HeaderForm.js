//import liraries
import { useNavigation } from "@react-navigation/native";
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
import Fontisto from "react-native-vector-icons/Fontisto";

const HeaderForm = ({ name }) => {
  const theme = useTheme();
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: theme.colors.statusBarCol }}>
      <StatusBar
        animated={false}
        backgroundColor={theme.colors.statusBarCol}
        barStyle={theme.dark ? "light-content" : "dark-content"}
        hidden={false}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 1,
          marginBottom: 7,
          //   height: height > 790 ? 30 : 20,
          backgroundColor: theme.colors.statusBarCol,
        }}
      >
        <View
          style={{
            // height: "100%",
            width: width,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: 25,
          }}
        >
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Fontisto
                name="arrow-left-l"
                size={30}
                color={theme.colors.logoCol2}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingTop: 8,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto_500Medium",
                fontSize: 14.4,
                fontWeight: "bold",
                color: theme.colors.logoCol2,
              }}
            >
              {name}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(HeaderForm);
