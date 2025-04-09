import { Image, StyleSheet, View } from "react-native";
import React, { useMemo, useState } from "react";
import { Avatar, Button, Card, Text, useTheme } from "react-native-paper";
import image0 from "../../../../assets/pic/1.png";
import image1 from "../../../../assets/pic/2.png";
import image2 from "../../../../assets/pic/3.png";
import image3 from "../../../../assets/pic/4.png";

import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { shallowEqual, useSelector } from "react-redux";

const PersonalinfoCard = () => {
  const theme = useTheme();
  const image = [image0, image1, image2, image3];

  const loggedEmpDetl = useSelector(
    (state) => state.loginFuntion.loginInfo.loginDetl,
    shallowEqual
  );
  const loggedDetl = useMemo(() => loggedEmpDetl, [loggedEmpDetl]);
  const { emp_name, emp_id, emp_no, emp_dept, dept_name, emp_sec, desg_name } =
    loggedDetl;

  const [imageUri, setImageUri] = useState(image[0]);
  const randomIndex = Math.floor(Math.random() * image.length);

  return (
    <View
      style={{
        margin: 10,
        flex: 1,
        flexDirection: "row",
        borderRadius: 28,
        overflow: "hidden",
        elevation: 5,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
      }}
    >
      {/* Card Imge asection */}
      <View
        style={{
          width: 110,
          backgroundColor: theme.colors.cardBgColor,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={image[randomIndex]}
          style={{ height: 100, width: 100 }}
        />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.cardBgColor,
          padding: 10,
          paddingVertical: 15,
          paddingTop: 25,
        }}
      >
        <Text
          variant="titleLarge"
          style={{
            fontWeight: "bold",
            fontSize: 18,
            fontFamily: "Roboto_500Medium",
            color: theme.colors.whiteFontColor,
            textTransform: "capitalize",
          }}
          lineBreakMode="head"
          lineBreakStrategyIOS="hangul-word"
          numberOfLines={1}
        >
          {emp_name?.toLowerCase()}
        </Text>
        <Text
          lineBreakMode="head"
          lineBreakStrategyIOS="hangul-word"
          numberOfLines={1}
          variant="bodyMedium"
          style={{
            fontFamily: "Roboto_500Medium",
            lineHeight: 18,
            color: theme.colors.whiteFontColor,
            textTransform: "capitalize",
          }}
        >
          {desg_name?.toLowerCase() ?? null}
        </Text>
        <Text
          lineBreakMode="head"
          lineBreakStrategyIOS="hangul-word"
          numberOfLines={1}
          variant="bodyMedium"
          style={{
            fontFamily: "Roboto_500Medium",
            lineHeight: 15,
            color: theme.colors.whiteFontColor,
            textTransform: "capitalize",
          }}
        >
          {emp_sec?.toLowerCase() ?? null}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            // backgroundColor: "green",
            padding: 10,
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.cardBgColor,
              flex: 1,
              flexDirection: "row",
              justifyContent: "",
              alignItems: "flex-end",
            }}
          >
            <Ionicons name="ticket" size={20} color={theme.colors.logoCol2} />
            <Text
              style={{
                marginLeft: 5,
                fontFamily: "Roboto_500Medium",
                fontSize: 15,
                color: theme.colors.whiteFontColor,
                fontWeight: "bold",
                lineHeight: 15,
              }}
            >
              0
            </Text>
          </View>
          <View
            style={{
              backgroundColor: theme.colors.cardBgColor,
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-end",
            }}
          >
            <FontAwesome5
              name="tasks"
              size={18.5}
              color={theme.colors.logoCol2}
            />
            <Text
              style={{
                marginLeft: 5,
                fontFamily: "Roboto_500Medium",
                fontSize: 15,
                color: "white",
                fontWeight: "900",
                lineHeight: 15,
              }}
            >
              0
            </Text>
          </View>
        </View>
      </View>
      {/* Card Content section */}
      {/* <View style={{ flexGrow: 1 }}>
      </View> */}
    </View>
  );
};

export default PersonalinfoCard;

const styles = StyleSheet.create({});
