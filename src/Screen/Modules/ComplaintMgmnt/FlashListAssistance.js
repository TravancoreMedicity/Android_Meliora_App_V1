//import liraries
import React, { lazy, memo, Suspense, useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  useWindowDimensions,
} from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import _ from "underscore";
import HearderSecondary from "../../../Components/HearderSecondary";
import { bgColor, colorTheme } from "../../../Constant/Colors";
import { assistListUserWise } from "../../../Redux/ReduxSlice/ticketMagmntSlice";
import { windowHeight, windowWidth } from "../../../utils/Dimentions";
import { styles } from "./Style/Style";
import OverLayLoading from "./Components/OverLayLoading";
import CustomActivityIndicator from "../../../Components/CustomActivityIndicator";
import { SafeAreaView } from "react-native-safe-area-context";
import { UsegetAssitRequestList } from "../../../api/TicketsUtilities";
import { getLogiEmployeeID } from "../../../Redux/ReduxSlice/LoginSLice";

const FlashListCmp = lazy(() => import("./Components/FlashListCmp"));
const AssistanceCmp = lazy(() => import("./Components/AssistanceCmp"));

// create a component
const FlashListAssistance = ({ navigation }) => {
  const theme = useTheme();
  const { height, width } = useWindowDimensions();
  //   Main view height
  const headerHeight = height > 790 ? 100 : 75;
  const headerHeightWithStatusBar = height - headerHeight;

  // GET THE LOGGED EMP ID
  const emId = useSelector((state) => getLogiEmployeeID(state));
  // GET  THE ASSIT REQUEST LIST
  const { data, isError, isLoading, isSuccess } = UsegetAssitRequestList(emId);

  const assitedList = useMemo(() => {
    if (!isError && !isLoading && isSuccess) {
      return data?.data ?? [];
    } else {
      return [];
    }
  }, [data, isLoading, isSuccess, isError]);

  return (
    <KeyboardAvoidingView enabled behavior="height">
      <SafeAreaView style={{ backgroundColor: theme.colors.appBgInside }}>
        {/* Header  */}
        <HearderSecondary navigation={navigation} name="Assist Request" />
        <View
          style={{
            height: headerHeightWithStatusBar,
            width: width,
            paddingHorizontal: 15,
          }}
        >
          {isLoading && !isSuccess && !isError && <CustomActivityIndicator />}
          <Suspense fallback={<CustomActivityIndicator />}>
            <FlashListCmp
              FlashRenderCmp={AssistanceCmp}
              Assigned={assitedList}
            />
          </Suspense>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

//make this component available to the app
export default memo(FlashListAssistance);
