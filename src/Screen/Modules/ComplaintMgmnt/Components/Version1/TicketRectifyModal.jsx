import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { memo, useCallback, useMemo, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import { TextInput, useTheme } from "react-native-paper";
import { format } from "date-fns";
import Ionicons from "react-native-vector-icons/Ionicons";
import LiveCmpTimeDiffrenceClock from "../Modals/LiveCmpTimeDiffrenceClock";
import CheckBoxEmployeeSelection from "./Common/CheckBoxEmployeeSelection";
import RadioGroupRectifyType from "./Common/RadioGroupRectifyType";
import HoldReason from "./Common/HoldReason";
import { Toast } from "toastify-react-native";
import { axiosApi } from "../../../../../config/Axiox";
import { useSelector } from "react-redux";
import { getLogiEmployeeID } from "../../../../../Redux/ReduxSlice/LoginSLice";
import { useQueryClient } from "@tanstack/react-query";
import CenteredButton from "./Common/CenteredButton";
import FloatingButton from "./Common/FloatingButton";

const TicketRectifyModal = ({ openState, setModalVisible, data }) => {
  const theme = useTheme();
  const { height } = useWindowDimensions();
  const queryClient = useQueryClient();

  const empId = useSelector((state) => getLogiEmployeeID(state));
  const emId = useMemo(() => empId, [empId]);

  const year = format(new Date(data.compalint_date), "yyyy");
  const [remark, setRemark] = useState("");
  const [rectifyType, setRectifyType] = useState(2);
  const [selectedEmpNos, setSelectedEmpNos] = useState([]);
  const [holdReason, setHoldReason] = useState(1);

  const complaint_slno = useMemo(() => data.complaint_slno, [data]);

  const handleRemarkChange = (text) => {
    setRemark(text);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleRectify = useCallback(async () => {
    // console.log("clicked");
    if (selectedEmpNos.length === 0) {
      Toast.show({
        type: "infoToast",
        text1: "Warning",
        text2: "Please select employee",
        visibilityTime: 2000,
      });
      return;
    }

    if (rectifyType === 2) {
      if (remark === "") {
        Toast.show({
          type: "errorToast",
          text1: "Error",
          text2: "Remark is mandatory",
          visibilityTime: 2000,
        });
        return;
      }
    }

    if (rectifyType === 1) {
      if (remark === "") {
        Toast.show({
          type: "errorToast",
          text1: "Error",
          text2: "Remark is mandatory",
          visibilityTime: 2000,
        });
        return;
      }
    }

    // RECTIFY THE COMPLAINT TYPE AS RECTIFY
    if (rectifyType === 2) {
      // RECTIFY THE COMPLAINT
      const postData = selectedEmpNos?.map((val) => {
        return {
          compalint_status: rectifyType === 2 ? 2 : 1,
          cm_rectify_status:
            rectifyType === 2 ? "R" : holdReason === 1 ? "O" : null,
          cm_rectify_time: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
          rectify_pending_hold_remarks:
            holdReason === 1 ? remark : rectifyType === 2 ? remark : null,
          pending_onhold_time:
            holdReason === 1 ? format(new Date(), "yyyy-MM-dd HH:mm:ss") : null,
          pending_onhold_user: emId,
          assigned_emp: val,
          verify_spervsr: 0,
          cm_hold_reason_slno: holdReason,
          complaint_slno: data.complaint_slno,
        };
      });

      const response = await axiosApi.patch(
        "/Rectifycomplit/updatecmp",
        postData
      );

      const { success, message } = await response.data;

      if (success === 2) {
        Toast.show({
          type: "successToast",
          text1: "Success",
          text2: message,
          visibilityTime: 2000,
          onHide: () => {
            queryClient.invalidateQueries({
              queryKey: ["assignedList", emId],
              //exact: true,
            });

            queryClient.invalidateQueries({
              queryKey: ["getAssistpendingCount", emId],
              //exact: true,
            });
            handleModalClose();
          },
        });
      } else {
        Toast.show({
          type: "errorToast",
          text1: "Error",
          text2: message,
          visibilityTime: 2000,
          onHide: () => {
            handleModalClose();
          },
        });
      }
    }

    //RECTIFY THE COMPLAINT TYPE AS HOLD
    if (rectifyType === 1) {
      // HOLD THE COMPLAINT
      const postDataOnHold = {
        compalint_status: 1,
        cm_rectify_status: rectifyType === 1 ? "O" : null,
        rectify_pending_hold_remarks: remark,
        pending_onhold_time: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        pending_onhold_user: emId,
        complaint_slno: complaint_slno,
        cm_hold_reason_slno: holdReason,
      };

      // console.log(postDataOnHold);
      const onHoldResponse = await axiosApi.patch(
        `/Rectifycomplit/updateHoldProgress`,
        postDataOnHold
      );

      const { success, message } = await onHoldResponse.data;

      if (success === 1) {
        Toast.show({
          type: "successToast",
          text1: "Success",
          text2: message,
          visibilityTime: 2000,
          onHide: () => {
            queryClient.invalidateQueries({
              queryKey: ["assignedList", emId],
              exact: true,
            });

            queryClient.invalidateQueries({
              queryKey: ["getAssistpendingCount", emId],
              exact: true,
            });

            handleModalClose();
          },
        });
      } else {
        Toast.show({
          type: "errorToast",
          text1: "Error",
          text2: message,
          visibilityTime: 2000,
          onHide: () => {
            handleModalClose();
          },
        });
      }

      // console.log(await onHoldResponse.data);
    }
  }, [selectedEmpNos, holdReason, rectifyType, remark, emId, complaint_slno]);

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
            style={{
              flex: 1,
              backgroundColor: theme.colors.statusBarCol,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            fadingEdgeLength={200}
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
                      #{data.complaint_slno}
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
                      {data.compalint_date}
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
                    {data.comp_reg_emp}
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
                    {data.sec_name}
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
                    {data.locationName}
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
                    {data.complaint_type_name}
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
                    {data.assigned_date}
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
                    {data.complaint_desc ?? "N/A"}
                  </Text>
                </View>
                {/* live clock */}
                <View style={{ alignItems: "center" }}>
                  <LiveCmpTimeDiffrenceClock
                    compalint_date={data.compalint_date}
                  />
                </View>
              </View>

              {/* Rectify a atransaction status */}
              <View>
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontFamily: "Roboto_500Medium",
                      fontSize: 12,
                      paddingLeft: 12.7,
                      color: theme.colors.logoCol2,
                    }}
                  >
                    Select Participating Employees
                  </Text>
                  <CheckBoxEmployeeSelection
                    cmp_no={data.complaint_slno}
                    selectedEmpNos={selectedEmpNos}
                    setSelectedEmpNos={setSelectedEmpNos}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontFamily: "Roboto_500Medium",
                      fontSize: 12,
                      paddingLeft: 12.7,
                      color: theme.colors.logoCol2,
                      paddingBottom: 10,
                    }}
                  >
                    Resolution Status
                  </Text>
                  <RadioGroupRectifyType
                    value={rectifyType}
                    setValue={setRectifyType}
                  />
                </View>
                {rectifyType === 1 && (
                  <View>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontFamily: "Roboto_500Medium",
                        fontSize: 12,
                        paddingLeft: 12.7,
                        color: theme.colors.logoCol2,
                        paddingBottom: 10,
                        paddingTop: 10,
                      }}
                    >
                      Hold Reasons
                    </Text>
                    <HoldReason value={holdReason} setValue={setHoldReason} />
                  </View>
                )}
                <View style={{ paddingHorizontal: 12.5, paddingBottom: 20 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontFamily: "Roboto_500Medium",
                      fontSize: 12,
                      // paddingLeft: 12.7,
                      paddingTop: 10,
                      color: theme.colors.logoCol2,
                      paddingBottom: 3,
                    }}
                  >
                    Remarks
                  </Text>
                  <View>
                    <TextInput
                      // label="Remarks"
                      // value={remark}
                      style={{ height: 60 }}
                      onChangeText={handleRemarkChange}
                      multiline
                      dense={true}
                      numberOfLines={3}
                    />
                  </View>
                </View>
                {/* centered button Component */}
                <CenteredButton
                  hangleOnPress={handleRectify}
                  label="Confirm Rectify"
                />
              </View>
            </View>
          </ScrollView>
          {/* Floating button component */}
          <FloatingButton hangleOnPress={handleModalClose} />
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default memo(TicketRectifyModal);
