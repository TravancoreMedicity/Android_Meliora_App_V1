import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import pic from "../../../../assets/module/M1.png";
import { useTheme, Avatar } from "react-native-paper";

const ModuleMenus = ({ icon, name }) => {
  const { width, height } = useWindowDimensions();
  const theme = useTheme();

  const tileWidth = width > 450 ? (width - 60) / 3 : (width - 60) / 2;

  return (
    <TouchableOpacity>
      <View
        style={{
          marginVertical: 5,
          height: 80,
          width: tileWidth,
          borderRadius: 10,
          backgroundColor: theme.colors.cardBgColor,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          overflow: "hidden",
          //   elevation: 5,
          //   shadowColor: "black",
          //   shadowOffset: { width: 0, height: 2 },
          //   shadowRadius: 6,
          //   shadowOpacity: 0.25,
        }}
      >
        <View>
          <MaterialIcons name={icon} size={30} color={theme.colors.logoCol2} />
        </View>
        <Text
          lineBreakMode="clip"
          style={{
            fontFamily: "Roboto_400Regular",
            fontSize: 12,
            marginTop: 3,
            fontWeight: "900",
            color: "white",
            textAlign: "center",
          }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ModuleMenus;

const styles = StyleSheet.create({});
