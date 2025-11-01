import {
  View,
  Text,
  Modal,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";
import { format } from "date-fns";
import Ionicons from "react-native-vector-icons/Ionicons";
import LiveCmpTimeDiffrenceClock from "../Modals/LiveCmpTimeDiffrenceClock";
import Feather from "react-native-vector-icons/Feather";
import EmpListWithOutLoggedUser from "./Common/EmpListWithOutLoggedUser";
import FloatingButton from "./Common/FloatingButton";
import CenteredButton from "./Common/CenteredButton";
import { useSelector } from "react-redux";
import { getLogiEmployeeID } from "../../../../../Redux/ReduxSlice/LoginSLice";
import { Toast } from "toastify-react-native";
import { axiosApi } from "../../../../../config/Axiox";
import { useQueryClient } from "@tanstack/react-query";
import { UsegetAssitedEmpList } from "../../../../../api/TicketsUtilities";
import AssitReqListComp from "./AssitReqListComp";
import CustomActivityIndicator from "../../../../../Components/CustomActivityIndicator";
import SkeletonExpo from "../../../../../Components/V1_Cmp/Skeleton-Cmp/SkeletonExpo";

const AssistRequestedModal = ({
  openState,
  setModalVisible,
  data,
  postData,
}) => {
  const theme = useTheme();
  const { height } = useWindowDimensions();
  const queryClient = useQueryClient();

  const ticketData = useMemo(() => {
    return data;
  }, [data]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const empId = useSelector((state) => getLogiEmployeeID(state));
  const emId = useMemo(() => empId, [empId]);

  const {
    compalint_date,
    complaint_slno,
    comp_reg_emp,
    sec_name,
    locationName,
    complaint_type_name,
    assigned_date,
    complaint_desc,
  } = ticketData;
  const year = format(new Date(compalint_date), "yyyy");

  const [empList, setEmpList] = useState([]);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const postAssistData = useMemo(() => {
    return empList?.map((val) => {
      return {
        complaint_slno: complaint_slno,
        assigned_emp: val,
        assist_assign_date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        assist_flag: 1,
        assist_requested_emp: emId,
        assign_rect_status: 0,
        assigned_user: emId,
      };
    });
  }, [empList, complaint_slno, emId]);

  const handledSubmitAssistRequest = useCallback(async () => {
    if (postAssistData?.length === 0) {
      Toast.show({
        type: "warnToast",
        text1: "Warning",
        text2: "Please select at least one employee",
      });
    }

    if (postAssistData?.length > 0) {
      const response = await axiosApi.post(
        `/complaintassign/assist/multiple`,
        postAssistData
      );
      const responseData = await response.data;
      const { success, message } = responseData;

      if (success === 1) {
        Toast.show({
          type: "successToast",
          text1: "Success",
          text2: message,
          onHide: () => {
            queryClient.invalidateQueries({
              queryKey: ["assignedList", emId],
              //exact: true,
            });
            setModalVisible(false);
          },
        });
      }
    }
  }, [postAssistData]);

  //   LIST ASSIST REQUEST EMPLOYEE DETAILS
  // UsegetAssitedEmpList
  const searchPostData = useMemo(() => {
    return {
      complaint_slno: complaint_slno,
    };
  }, [complaint_slno]);

  const {
    data: searchData,
    isError,
    isLoading,
    isSuccess,
    refetch,
  } = UsegetAssitedEmpList(searchPostData);

  const searchDataList = useMemo(() => searchData?.data ?? [], [searchData]);

  useEffect(() => {
    if (openState === true) {
      refetch();
    }
  }, [openState]);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1 }}
        mode="margin"
        edges={["top", "bottom"]}
        animated
      >
        <Modal
          animationType="slide"
          transparent={false}
          visible={openState}
          onRequestClose={() => {
            setModalVisible(false);
          }}
          statusBarTranslucent
          presentationStyle="overFullScreen"
        >
          {/* outer layer */}
          <ScrollView
            style={{ flex: 1, backgroundColor: theme.colors.statusBarCol }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
          >
            {/* inner layer starting */}
            <View
              style={{
                flex: 1,
                backgroundColor: theme.colors.statusBarCol,
                overflow: "hidden",
                paddingTop: (height * 6) / 100,
              }}
            >
              {/* inner content */}
              <View
                style={{
                  borderWidth: 2,
                  borderColor: theme.colors.logoCol2,
                  margin: 12.5,
                  padding: 12.5,
                  borderRadius: 22,
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row", paddingBottom: 2 }}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontFamily: "Roboto_500Medium",
                        fontWeight: "800",
                        color: theme.colors.logoCol2,
                      }}
                    >
                      #{complaint_slno}
                    </Text>
                    <Text
                      style={{
                        fontSize: 17,
                        fontFamily: "Roboto_500Medium",
                        fontWeight: "800",
                        color: theme.colors.logoCol2,
                      }}
                    >
                      /{year}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons
                      size={18}
                      name="calendar-outline"
                      color={theme.colors.logoCol2}
                    />
                    <Text
                      style={{
                        paddingLeft: 2,
                        fontSize: 15,
                        fontFamily: "Roboto_500Medium",
                        fontWeight: "800",
                        color: theme.colors.logoCol2,
                        paddingRight: 5,
                      }}
                    >
                      {compalint_date}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "800",
                      color: theme.colors.logoCol2,
                    }}
                    numberOfLines={1}
                  >
                    {comp_reg_emp}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "800",
                      paddingHorizontal: 2,
                      color: theme.colors.lightBlueFont,
                    }}
                  >
                    /
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 12,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "800",
                      color: theme.colors.lightBlueFont,
                    }}
                  >
                    {sec_name}
                  </Text>
                </View>

                <View style={{ flexDirection: "row", paddingTop: 5 }}>
                  <Text
                    style={{
                      fontSize: 12.5,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "800",
                      color: theme.colors.inactiveFont,
                      paddingRight: 5,
                    }}
                  >
                    Location :
                  </Text>
                  <Text
                    style={{
                      fontSize: 13.5,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "800",
                      color: theme.colors.lightBlueFont,
                    }}
                  >
                    {locationName}
                  </Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 12.5,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "800",
                      paddingRight: 5,
                      color: theme.colors.inactiveFont,
                    }}
                  >
                    Ticket Type :
                  </Text>
                  <Text
                    style={{
                      fontSize: 13.5,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "800",
                      color: theme.colors.lightBlueFont,
                    }}
                  >
                    {complaint_type_name}
                  </Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 12.5,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "800",
                      paddingRight: 5,
                      color: theme.colors.inactiveFont,
                    }}
                  >
                    Assigned Date :
                  </Text>
                  <Text
                    style={{
                      fontSize: 13.5,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "900",
                      color: theme.colors.lightBlueFont,
                    }}
                  >
                    {assigned_date}
                  </Text>
                </View>

                <View>
                  <Text
                    style={{
                      fontSize: 12.5,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "800",
                      color: theme.colors.inactiveFont,
                    }}
                  >
                    Ticket Description :
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 13.5,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "800",
                      color: theme.colors.lightBlueFont,
                    }}
                    textBreakStrategy="highQuality"
                  >
                    {complaint_desc ?? "N/A"}
                  </Text>
                </View>
                {/* live clock */}
                <View style={{ alignItems: "center" }}>
                  <LiveCmpTimeDiffrenceClock compalint_date={compalint_date} />
                </View>
              </View>
              <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
                <View>
                  <View style={{ paddingBottom: 10 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "800",
                        fontFamily: "Roboto_500Medium",
                        color: theme.colors.logoCol2,
                        textDecorationLine: "underline",
                        textDecorationColor: theme.colors.logoCol2,
                        textDecorationStyle: "solid",
                      }}
                    >
                      Request Assistance
                    </Text>
                  </View>
                  {/* Assistance status start */}
                  {searchDataList.length > 0 && (
                    <View>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "800",
                          color: theme.colors.logoCol2,
                        }}
                      >
                        Assistance Status
                      </Text>
                      {loading === true ? (
                        <SkeletonExpo height={110} />
                      ) : (
                        <View style={{ marginVertical: 10, rowGap: 5 }}>
                          {searchDataList?.map((item, index) => {
                            return <AssitReqListComp key={index} item={item} />;
                          })}
                        </View>
                      )}
                    </View>
                  )}
                  {/* Assistance status end */}

                  {/* employee list for select the assist request start  */}
                  <View>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "800",
                        color: theme.colors.logoCol2,
                      }}
                    >
                      Select Assistance
                    </Text>
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <EmpListWithOutLoggedUser
                      postData={postData}
                      selectedEmpNos={empList}
                      setSelectedEmpNos={setEmpList}
                      assitedEmplist={searchDataList}
                    />
                  </View>
                  {/* employee list for select the assist request end  */}
                </View>
              </View>
              {/* confirm button */}
              <CenteredButton
                hangleOnPress={handledSubmitAssistRequest}
                label={"Confirm Assistance"}
              />
            </View>
          </ScrollView>
          {/* Floating Button Component    */}
          <FloatingButton hangleOnPress={handleModalClose} />
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default memo(AssistRequestedModal);
