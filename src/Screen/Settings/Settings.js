//import liraries
import React, { lazy, Suspense, memo } from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import HeaderMain from "../../Components/HeaderMain";
import CustomActivityIndicator from "../../Components/CustomActivityIndicator";
import { useTheme } from "react-native-paper";

const SettingsCmp = lazy(() => import("./SettingsCmp"));

// create a component
const Settings = ({ navigation }) => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.appBgInside,
        flex: 1,
      }}
    >
      {/* Header Component */}
      <HeaderMain navigation={navigation} name="Common Settings" />

      <ScrollView>
        <View style={{ flex: 1, padding: 5 }}>
          <Suspense fallback={<CustomActivityIndicator />}>
            <SettingsCmp title={"Enable Push Notification"} />
          </Suspense>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

//make this component available to the app
export default memo(Settings);
