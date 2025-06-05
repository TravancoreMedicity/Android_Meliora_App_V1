//import liraries
import React, { memo } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import DashChart from "../Modules/ComplaintMgmnt/Components/Version1/DashChart";
import { LineChart } from "react-native-gifted-charts";

// create a component
const Profile = ({ navigation }) => {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const lineData = [
    { value: 0 },
    { value: 20 },
    { value: 18 },
    { value: 40 },
    { value: 36 },
    { value: 60 },
    { value: 54 },
    { value: 85 },
  ];
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.appBgInside,
      }}
    >
      <ScrollView
        style={{
          paddingHorizontal: width > 450 ? 35 : 15,
          paddingTop: 5,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexGrow: 1,
            marginTop: 18,
            // backgroundColor: theme.colors.cardBgSecond,
            //backgroundColor: "green",
            borderRadius: 13,
            padding: 7,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexGrow: 1, marginTop: 10, padding: 10 }}>
            <DashChart />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

//make this component available to the app
export default memo(Profile);
