import {
  View,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import React, { Suspense, memo, lazy, useCallback } from "react";
import HearderSecondary from "../../../Components/HearderSecondary";
import { useTheme } from "react-native-paper";
import CustomActivityIndicator from "../../../Components/CustomActivityIndicator";
import { useSelector } from "react-redux";
import { getLogiEmpDEPT } from "../../../Redux/ReduxSlice/LoginSLice";
import { UsegetSuperVisorVerificationList } from "../../../api/TicketsUtilities";
import { useFocusEffect } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";

const FlashListCmp = lazy(() => import("./Components/FlashListCmp"));
const ForVerifyCmp = lazy(() =>
  import("./Components/Version1/SuperVisorVerify")
);

const FlashListSuperVerify = ({ navigation }) => {
  const theme = useTheme();
  const { height, width } = useWindowDimensions();
  const queryClient = useQueryClient();
  //   Main view height
  const headerHeight = height > 790 ? 100 : 75;
  const headerHeightWithStatusBar = height - headerHeight;

  // GET THE LOGGED EMP ID
  const deptID = useSelector(getLogiEmpDEPT);

  const { data, isError, isLoading, isSuccess, refetch } =
    UsegetSuperVisorVerificationList(deptID);

  useFocusEffect(
    useCallback(() => {
      refetch();
      queryClient.invalidateQueries(["superVisorVerificationCount"]);
    }, [])
  );

  return (
    <KeyboardAvoidingView enabled behavior="height">
      <SafeAreaView style={{ backgroundColor: theme.colors.appBgInside }}>
        {/* Header  */}
        <HearderSecondary
          navigation={navigation}
          name="Supervisor verification"
        />
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
              Assigned={isSuccess ? data?.data : []}
            />
          </Suspense>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default memo(FlashListSuperVerify);
