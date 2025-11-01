import React, {
  memo,
  Suspense,
  useMemo,
  lazy,
  useRef,
  useState,
  useEffect,
} from "react";
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  useWindowDimensions,
} from "react-native";
import { useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import HearderSecondary from "../../../Components/HearderSecondary";
import { UsegetEmpHoldTicketList } from "../../../api/TicketsUtilities";
import { getLogiEmployeeID } from "../../../Redux/ReduxSlice/LoginSLice";
import CustomActivityIndicator from "../../../Components/CustomActivityIndicator";
import FlashListOnholdListCmp from "./Components/FlashListOnholdListCmp";

const FlashListCmp = lazy(() => import("./Components/FlashListCmp"));
// const OnHoldCmp = lazy(() => import("./Components/OnHoldCmp"));

// import OnHoldCmp from "./Components/OnHoldCmp";

// create a component
const FlashListOnHold = ({ navigation }) => {
  const theme = useTheme();

  const [onHoldTickt, setOnHoldTickt] = useState([]);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false; // Cleanup on unmount
    };
  }, []);

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

  useEffect(() => {
    if (!isLoading && isSuccess && !isError && isMounted.current) {
      setOnHoldTickt(data?.data ?? []);
    }
  }, [data, isLoading, isSuccess, isError]);

  // const onHoldTickt = useMemo(() => {
  //   if (!isError && !isLoading && isSuccess) {
  //     return data?.data ?? [];
  //   } else {
  //     return [];
  //   }
  // }, [data, isLoading, isSuccess, isError]);

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
          <Suspense fallback={<CustomActivityIndicator />}>
            <FlashListOnholdListCmp
              onHooldTickets={isLoading ? [] : onHoldTickt ?? []}
            />
          </Suspense>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

//make this component available to the app
export default memo(FlashListOnHold);
