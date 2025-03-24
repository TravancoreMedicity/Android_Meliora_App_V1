//import liraries
import React, { lazy, Suspense, memo } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import HeaderMain from "../../Components/HeaderMain";
import { bgColor } from "../../Constant/Colors";

const SettingsCmp = lazy(() => import('./SettingsCmp'))

// create a component
const Settings = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container} >
      {/* Header Component */}
      <HeaderMain navigation={navigation} name="Common Settings" />

      <ScrollView>
        <View style={{ flex: 1, padding: 5 }} >
          <Suspense fallback={<ActivityIndicator />} >
            <SettingsCmp title={"Enable Push Notification"} />
          </Suspense>
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
});

//make this component available to the app
export default memo(Settings);
