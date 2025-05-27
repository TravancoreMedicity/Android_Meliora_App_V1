import React, { memo, Suspense, useMemo, useState, lazy } from "react";
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  useWindowDimensions,
} from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import _ from "underscore";
import HearderSecondary from "../../../Components/HearderSecondary";
import { bgColor, colorTheme } from "../../../Constant/Colors";
import { getOnholdCompList } from "../../../Redux/ReduxSlice/ticketMagmntSlice";
import { windowHeight, windowWidth } from "../../../utils/Dimentions";
import { styles } from "./Style/Style";
import OverLayLoading from "./Components/OverLayLoading";
import { UsegetEmpHoldTicketList } from "../../../api/TicketsUtilities";
import { getLogiEmployeeID } from "../../../Redux/ReduxSlice/LoginSLice";

const FlashListCmp = lazy(() => import("./Components/FlashListCmp"));
const OnHoldCmp = lazy(() => import("./Components/OnHoldCmp"));

// create a component
const FlashListOnHold = ({ navigation }) => {
  const theme = useTheme();

  const { height, width } = useWindowDimensions();
  //   Main view height
  const headerHeight = height > 790 ? 100 : 75;
  const headerHeightWithStatusBar = height - headerHeight;

  // GET THE LOGGED EMP ID
  const emId = useSelector((state) => getLogiEmployeeID(state));

  const searchData = useMemo(() => {
    return {
      assigned_emp: emId,
    };
  }, [emId]);

  const { data, isError, isLoading, isSuccess } =
    UsegetEmpHoldTicketList(searchData);

  const onHoldTickt = useMemo(() => {
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
        <HearderSecondary navigation={navigation} name="Hold tickets" />
        <View
          style={{
            height: headerHeightWithStatusBar,
            width: width,
            paddingHorizontal: 15,
          }}
        >
          <Suspense fallback={<ActivityIndicator />}>
            <FlashListCmp FlashRenderCmp={OnHoldCmp} Assigned={onHoldTickt} />
          </Suspense>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

//make this component available to the app
export default memo(FlashListOnHold);
