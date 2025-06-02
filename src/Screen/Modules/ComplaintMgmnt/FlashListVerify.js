//import liraries
import React, { lazy, memo, Suspense, useMemo, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  useWindowDimensions,
  KeyboardAvoidingView,
} from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import _ from "underscore";
import HearderSecondary from "../../../Components/HearderSecondary";
import { bgColor, colorTheme } from "../../../Constant/Colors";
import { getOnVerifyList } from "../../../Redux/ReduxSlice/ticketMagmntSlice";
import { windowHeight, windowWidth } from "../../../utils/Dimentions";
import { styles } from "./Style/Style";
import OverLayLoading from "./Components/OverLayLoading";
import { secondLevelList } from "../../../Redux/ReduxSlice/ticketMagmentDeptSlice";
import { getLogiEmployeeID } from "../../../Redux/ReduxSlice/LoginSLice";
import CustomActivityIndicator from "../../../Components/CustomActivityIndicator";
import { format } from "date-fns";
import { UsegetTicketRectifyList } from "../../../api/TicketsUtilities";
// import ForVerifyCmp from './Components/ForVerifyCmp';

const FlashListCmp = lazy(() => import("./Components/FlashListCmp"));
const ForVerifyCmp = lazy(() => import("./Components/ForVerifyCmp"));

// create a component
const FlashListVerify = ({ navigation }) => {
  const theme = useTheme();
  const { height, width } = useWindowDimensions();
  //   Main view height
  const headerHeight = height > 790 ? 100 : 75;
  const headerHeightWithStatusBar = height - headerHeight;

  // GET THE LOGGED EMP ID
  const emId = useSelector((state) => getLogiEmployeeID(state));

  const searchDate = useMemo(() => {
    return {
      from: format(new Date(), "yyyy-MM-dd 00:00:00"),
      to: format(new Date(), "yyyy-MM-dd 23:59:59"),
      assigned_emp: emId,
    };
  }, [emId]);

  const { data, isError, isLoading, isSuccess } =
    UsegetTicketRectifyList(searchDate);

  return (
    <KeyboardAvoidingView enabled behavior="height">
      <SafeAreaView style={{ backgroundColor: theme.colors.appBgInside }}>
        {/* Header  */}
        <HearderSecondary navigation={navigation} name="Rectified ticket" />
        {/* {loding && <OverLayLoading />} */}
        <View
          style={{
            height: headerHeightWithStatusBar,
            width: width,
            paddingHorizontal: 15,
          }}
        >
          <Suspense fallback={<CustomActivityIndicator />}>
            <FlashListCmp
              FlashRenderCmp={ForVerifyCmp}
              Assigned={data?.data ?? []}
            />
          </Suspense>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

//make this component available to the app
export default memo(FlashListVerify);
