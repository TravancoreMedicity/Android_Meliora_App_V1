//import liraries
import { memo, Suspense, useMemo, lazy } from "react";
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  useWindowDimensions,
} from "react-native";
import { useTheme } from "react-native-paper";
import HearderSecondary from "../../../Components/HearderSecondary";
import { useSelector } from "react-redux";
import FlashListCmp from "./Components/FlashListCmp";
import { getLogiEmployeeID } from "../../../Redux/ReduxSlice/LoginSLice";
import CustomActivityIndicator from "../../../Components/CustomActivityIndicator";
import { UseGetAssignedList } from "../../../api/TicketsUtilities";

const AssignedListCmp = lazy(() => import("./Components/AssignedListCmp"));

// create a component
const FlashListAssign = ({ navigation }) => {
  const theme = useTheme();
  const { height, width } = useWindowDimensions();
  const headerHeight = height > 790 ? 100 : 75;
  const headerHeightWithStatusBar = height - headerHeight;

  // user logged information
  const empId = useSelector((state) => getLogiEmployeeID(state));
  const emId = useMemo(() => empId, [empId]);

  //   get the assigned list only employee wise
  const { data, isError, isLoading, isSuccess } = UseGetAssignedList(emId);

  return (
    <KeyboardAvoidingView enabled behavior="height">
      <SafeAreaView style={{ backgroundColor: theme.colors.appBgInside }}>
        <HearderSecondary navigation={navigation} name="Assigned Tickets" />

        <View
          style={{
            height: headerHeightWithStatusBar,
            width: width,
            paddingHorizontal: 15,
          }}
        >
          <Suspense fallback={<CustomActivityIndicator />}>
            <View style={{ flex: 1 }}>
              <FlashListCmp
                FlashRenderCmp={AssignedListCmp}
                Assigned={isLoading ? [] : data?.data ?? []}
              />
            </View>
          </Suspense>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

//make this component available to the app
export default memo(FlashListAssign);
