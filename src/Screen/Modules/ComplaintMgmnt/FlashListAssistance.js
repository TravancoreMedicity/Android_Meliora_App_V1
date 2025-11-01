//import liraries
import React, { lazy, Suspense, useMemo, useRef, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  useWindowDimensions,
  Text,
} from "react-native";
import { useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import _ from "underscore";
import HearderSecondary from "../../../Components/HearderSecondary";
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
  const isMounted = useRef(false);
  //   Main view height
  const headerHeight = height > 790 ? 100 : 75;
  const headerHeightWithStatusBar = height - headerHeight;

  // GET THE LOGGED EMP ID
  const emId = useSelector((state) => getLogiEmployeeID(state));
  // GET  THE ASSIT REQUEST LIST
  const { data, isError, isLoading, isSuccess } = UsegetAssitRequestList(emId);

  const assitedList = useMemo(() => {
    if (isMounted.current && !isError && !isLoading && isSuccess && data) {
      return data?.data ?? [];
    }
    return [];
  }, [data, isLoading, isSuccess, isError]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

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
export default React.memo(FlashListAssistance);
