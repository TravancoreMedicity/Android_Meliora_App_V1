//import liraries
import React, {
  memo,
  Suspense,
  //   useEffect,
  useMemo,
  useState,
  lazy,
  //   useCallback,
} from "react";
import {
  View,
  Text,
  //   StyleSheet,
  //   ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  useWindowDimensions,
  StatusBar,
} from "react-native";
import { useTheme } from "react-native-paper";
import HearderSecondary from "../../../Components/HearderSecondary";
// import { bgColor, colorTheme, fontColor } from "../../../Constant/Colors";
// import { getTheAssignedListOnly } from "../../../Redux/Actions/complaintMagmt.action";
// import { windowHeight, windowWidth } from "../../../utils/Dimentions";
import { useSelector } from "react-redux";
// import _ from "underscore";
import FlashListCmp from "./Components/FlashListCmp";
// import ApiGetFun from "./func/ApiGetFun";
import { getLogiEmployeeID } from "../../../Redux/ReduxSlice/LoginSLice";
// import {
//   assignedListUserWise,
//   getAssignListEmp,
// } from "../../../Redux/ReduxSlice/ticketMagmntSlice";
// import OverLayLoading from "./Components/OverLayLoading";
import CustomActivityIndicator from "../../../Components/CustomActivityIndicator";
import { UseGetAssignedList } from "../../../api/TicketsUtilities";
// import { assignedListUserWise, getAssignedTicketList } from '../../../Redux/ReduxSlice/complaintMagmntSlice';

const AssignedListCmp = lazy(() => import("./Components/AssignedListCmp"));

// create a component
const FlashListAssign = ({ navigation }) => {
  const theme = useTheme();
  const { height, width } = useWindowDimensions();

  const statusBarHeight = StatusBar.currentHeight;

  const headerHeight = height > 790 ? 100 : 75;
  const headerHeightWithStatusBar = height - headerHeight;

  // user logged information
  const empId = useSelector((state) => getLogiEmployeeID(state));
  const emId = useMemo(() => empId, [empId]);

  //   get the assigned list only employee wise
  const { data, isError, isLoading, isSuccess } = UseGetAssignedList(emId);

  //   const [loding, setLoading] = useState(true);
  //   useEffect(() => {
  //     dispatch(getAssignListEmp(emId));
  //   }, [emId]);

  //   const assignedList = useSelector(assignedListUserWise);
  //   const newAssignList = useMemo(() => assignedList, [assignedList]);

  //   const [count, setCount] = useState(0);
  //   const [refresh, setRefresh] = useState(false);

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
          {isLoading && !isSuccess && !isError && <CustomActivityIndicator />}

          <Suspense fallback={<CustomActivityIndicator />}>
            <View style={{ flex: 1 }}>
              <FlashListCmp
                FlashRenderCmp={AssignedListCmp}
                Assigned={data?.data ?? []}
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
