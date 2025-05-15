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
  //   Text,
  //   StyleSheet,
  //   ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  useWindowDimensions,
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

  // user logged information
  const empId = useSelector((state) => getLogiEmployeeID(state));
  const emId = useMemo(() => empId, [empId]);

  //   get the assigned list only employee wise
  const { data, isError, isLoading, isSuccess } = UseGetAssignedList(emId);

  const [assignedList, setAssignedList] = useState(data?.data ?? []);

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
        {/* Header  */}
        <HearderSecondary navigation={navigation} name="Assigned Tickets" />

        <View
          style={{
            height: height / 1.2,
            width: width,
            paddingHorizontal: 15,
          }}
        >
          {isLoading && !isSuccess && !isError && <CustomActivityIndicator />}

          <Suspense fallback={<CustomActivityIndicator />}>
            <FlashListCmp
              FlashRenderCmp={AssignedListCmp}
              Assigned={data?.data ?? []}
            />
          </Suspense>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

// define your styles
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: bgColor.cardBg,
//     height: windowHeight,
//   },
//   scrollView: {
//     padding: 8,
//   },
//   dashBord: {
//     // flex: 1,
//     flexDirection: "row",
//   },
//   card: {
//     flex: 1,
//     backgroundColor: "#fffdff",
//     borderRadius: 5,
//     overflow: "hidden",
//   },
//   cardHeader: {
//     backgroundColor: bgColor.cardBg,
//     // backgroundColor: "powderblue",
//     minHeight: (windowHeight * 3) / 100,
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 5,
//     flexDirection: "row",
//     overflow: "hidden",
//     borderTopLeftRadius: 5,
//     borderTopLeftRadius: 5,
//   },
//   cardTitle: {
//     fontFamily: "Roboto_500Medium",
//     fontSize: windowWidth > 400 ? 14 : 12,
//     paddingHorizontal: 5,
//     overflow: "hidden",
//     color: fontColor.inActiveFont,
//   },
// });

//make this component available to the app
export default memo(FlashListAssign);
