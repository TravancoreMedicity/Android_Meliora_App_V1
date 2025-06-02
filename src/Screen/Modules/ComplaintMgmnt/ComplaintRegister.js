//import liraries
import React, {
  lazy,
  memo,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import _ from "underscore";
import HearderSecondary from "../../../Components/HearderSecondary";
import { colorTheme } from "../../../Constant/Colors";
import { windowHeight, windowWidth } from "../../../utils/Dimentions";
import { useSelector, useDispatch } from "react-redux";

const DashBoardView = lazy(() => import("./DashBoardView"));

import { useTheme } from "react-native-paper";
import CustomActivityIndicator from "../../../Components/CustomActivityIndicator";
import NewTicketDash from "./Components/Version1/NewTicketDash";
import DashAssistRequested from "./Components/Version1/DashAssistRequested";
import DashSuperVisorChekList from "./Components/Version1/DashSuperVisorChekList";
import DashRoomCheckList from "./Components/Version1/DashRoomCheckList";
import DashChart from "./Components/Version1/DashChart";
import { getSuperVisor } from "../../../Redux/ReduxSlice/LoginSLice";

// create a component
const ComplaintRegister = ({ navigation }) => {
  const theme = useTheme();
  const { width } = useWindowDimensions();

  const dispatch = useDispatch();

  //   Login INformation
  const loggedEmpDetl = useSelector(
    (state) => state.loginFuntion.loginInfo.loginDetl
  );
  const loggedDetl = useMemo(() => loggedEmpDetl, [loggedEmpDetl]);
  const { emp_id, emp_dept } = loggedDetl;

  const supervisor = useSelector(getSuperVisor);
  console.log(supervisor, "supervisor");
  // const { dismiss, dismissAll } = useBottomSheetModal();
  //not asssigned list from database
  // useEffect(() => {
  //   dispatch(getEmployeeDetlLoggedDeptWise(emp_dept));
  // }, [emp_dept, emp_id, dispatch]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.appBgInside,
      }}
    >
      {/* Header Component  Start*/}
      <HearderSecondary navigation={navigation} name="Ticket Management" />
      {/* Header Component  End*/}

      <ScrollView
        style={{
          paddingHorizontal: width > 450 ? 35 : 15,
          paddingTop: 5,
        }}
      >
        {/* Dash Bord Veiw Start */}

        <View>
          <Suspense fallback={<CustomActivityIndicator />}>
            {/* New Ticket Container */}
            <View>
              <NewTicketDash />
            </View>

            <View style={{ marginTop: 10 }}>
              <DashAssistRequested />
            </View>

            {/* Dash Bord View Start  */}
            <View style={{ marginTop: 18 }}>
              <DashBoardView navigation={navigation} />
            </View>

            <View
              style={{
                flexGrow: 1,
                marginTop: 18,
                backgroundColor: theme.colors.cardBgSecond,
                borderRadius: 13,
                padding: 10,
                gap: 10,
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {supervisor === 1 && (
                <View>
                  <DashSuperVisorChekList />
                </View>
              )}

              <View>
                <DashRoomCheckList />
              </View>
            </View>

            <View
              style={{
                flexGrow: 1,
                marginTop: 18,
                backgroundColor: theme.colors.cardBgSecond,
                borderRadius: 13,
                padding: 7,
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <View style={{ marginTop: 10, padding: 10 }}>
                <DashChart />
              </View>
            </View>
          </Suspense>
        </View>
        {/* Dash Bord View End  */}

        <View
          style={{
            marginTop: 10,
          }}
        >
          {/* <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>My Ticket's Statistics</Text>
          </View>
          <Suspense fallback={<ActivityIndicator />}>
            <MyTicketDash />
          </Suspense> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    // backgroundColor: colorTheme.mainBgColor,
    // height: windowHeight,
  },
  scrollView: {
    // padding: 8,
  },
  dashBord: {
    // flex: 1,
    flexDirection: "row",
  },
  card: {
    flex: 1,
    backgroundColor: colorTheme.mainBgColor,
  },
  cardHeader: {
    backgroundColor: colorTheme.mainBgColor,
    // backgroundColor: "powderblue",
    height: (windowHeight * 4) / 100,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    flexDirection: "row",
    overflow: "hidden",
    borderTopLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  cardTitle: {
    fontFamily: "Roboto_500Medium",
    fontSize: windowWidth > 400 ? 14 : 12,
    paddingHorizontal: 5,
    overflow: "hidden",
    color: colorTheme.mainColor,
  },
});

//make this component available to the app
export default memo(ComplaintRegister);
