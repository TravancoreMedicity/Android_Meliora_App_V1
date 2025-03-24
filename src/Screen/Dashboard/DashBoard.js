//import liraries
import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import HeaderMain from "../../Components/HeaderMain";
import { bgColor, fontColor } from "../../Constant/Colors";
import DashCardMain from "./DashCardMain";

// create a component
const DashBoard = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} >
      {/* Header Component */}
      <HeaderMain navigation={navigation} name="DashBoard" />
      <ScrollView>
        <View style={styles.textCard} >
          <Text style={styles.textCardFont} >Complaint Management</Text>
        </View>
        <View>
          <DashCardMain
            Icon="account-cog-outline"
            mainTitle="Pending For Assign"
            subTitle="Total Complaint"
            mainCount={245}
            subCount={521}
          />
          <DashCardMain
            Icon="account-hard-hat"
            mainTitle="Assigned Complaint"
            subTitle="Total Assigned Complaint"
            mainCount={100}
            subCount={230}
          />
          <DashCardMain
            Icon="account-edit-outline"
            mainTitle="Pending Verification"
            subTitle="Total Verified8h"
            mainCount={100}
            subCount={230}
          />
          <DashCardMain
            Icon="account-key-outline"
            mainTitle="OnHold By You"
            subTitle="Total OnHold Complaint"
            mainCount={100}
            subCount={230}
          />
          {/* <DashCardMain />
          <DashCardMain /> */}
        </View>

        <View style={styles.textCard} >
          <Text style={styles.textCardFont} >We Work - Inpatient Management</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: bgColor.mainBgColor,
    flex: 1,
  },
  card: {
    backgroundColor: "#1066f0",
    margin: 10,
    minHeight: 100
  },
  textCard: {
    // backgroundColor: '',
  },
  textCardFont: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 15,
    margin: 10,
    color: fontColor.inActiveFont
  }
});


//make this component available to the app
export default DashBoard;
