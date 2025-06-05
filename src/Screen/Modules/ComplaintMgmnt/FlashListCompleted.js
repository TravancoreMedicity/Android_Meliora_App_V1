//import liraries
import React, { memo, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  useWindowDimensions,
} from "react-native";
import { useTheme } from "react-native-paper";
import HearderSecondary from "../../../Components/HearderSecondary";
import { colorTheme } from "../../../Constant/Colors";
import {
  UsegetDeptWiseVerifiedCount,
  UsegetEmplWiseTicketVerifiedCount,
} from "../../../api/TicketsUtilities";
import { useSelector } from "react-redux";
import {
  getLogiEmpDEPT,
  getLogiEmployeeID,
} from "../../../Redux/ReduxSlice/LoginSLice";

// create a component
const FlashListCompleted = ({ navigation }) => {
  const theme = useTheme();
  const { height, width } = useWindowDimensions();
  //   Main view height
  const headerHeight = height > 790 ? 100 : 75;
  const headerHeightWithStatusBar = height - headerHeight;

  const empID = useSelector((state) => getLogiEmployeeID(state));
  const deptID = useSelector((state) => getLogiEmpDEPT(state));

  const { data: userVerifiedList, isSuccess: userVerifiedSuccess } =
    UsegetEmplWiseTicketVerifiedCount(empID);

  const { data: deptVerifiedList, isSuccess: deptVerifiedSuccess } =
    UsegetDeptWiseVerifiedCount(deptID);

  const [useList, setUseList] = useState([]);
  const [deptList, setDeptList] = useState([]);

  useEffect(() => {
    if (userVerifiedSuccess) {
      setUseList(userVerifiedList?.data);
    }
    if (deptVerifiedSuccess) {
      setDeptList(deptVerifiedList?.data);
    }
  }, [userVerifiedSuccess, deptVerifiedSuccess]);

  return (
    <KeyboardAvoidingView enabled behavior="height">
      <SafeAreaView style={{ backgroundColor: theme.colors.appBgInside }}>
        {/* Header  */}
        <HearderSecondary
          navigation={navigation}
          name="Today Verified ticket"
        />
        {/* {loding && <OverLayLoading />} */}
        <View
          style={{
            height: headerHeightWithStatusBar,
            width: width,
            paddingHorizontal: 15,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontFamily: "Roboto_500Medium",
              color: theme.colors.logoCol2,
              padding: 5,
            }}
          >
            User wise verified ticket
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: colorTheme.secondaryBgColor,
              padding: 10,
              borderRadius: 10,
            }}
          >
            {useList?.map((item, index) => {
              const lastIndex = useList.length - 1;
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    marginBottom: lastIndex === index ? 0 : 10,
                    height: 50,
                    alignItems: "center",
                    padding: 10,
                    borderWidth: 1,
                    borderColor: colorTheme.secondaryBgColor,
                    borderRadius: 15,
                  }}
                >
                  <View style={{ flexGrow: 1 }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontFamily: "Roboto_500Medium",
                        color: theme.colors.logoCol2,
                      }}
                    >
                      {item.sec_name}
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontFamily: "Roboto_500Medium",
                        color: theme.colors.logoCol2,
                      }}
                    >
                      {item.complaint_count}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
          {/* <Suspense fallback={<CustomActivityIndicator />}>
            <FlashListCmp
              FlashRenderCmp={OnProgressListCmp}
              Assigned={onProgressTicket}
            />
          </Suspense> */}

          <Text
            style={{
              fontWeight: "bold",
              fontFamily: "Roboto_500Medium",
              color: theme.colors.logoCol2,
              padding: 5,
            }}
          >
            Department wise verified ticket
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: colorTheme.secondaryBgColor,
              padding: 10,
              borderRadius: 10,
            }}
          >
            {deptList?.map((item, index) => {
              const lastIndex = deptList.length - 1;
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    marginBottom: lastIndex === index ? 0 : 10,
                    height: 50,
                    alignItems: "center",
                    padding: 10,
                    borderWidth: 1,
                    borderColor: colorTheme.secondaryBgColor,
                    borderRadius: 15,
                  }}
                >
                  <View style={{ flexGrow: 1 }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontFamily: "Roboto_500Medium",
                        color: theme.colors.logoCol2,
                      }}
                    >
                      {item.sec_name}
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontFamily: "Roboto_500Medium",
                        color: theme.colors.logoCol2,
                      }}
                    >
                      {item.complaint_count}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

//make this component available to the app
export default memo(FlashListCompleted);
