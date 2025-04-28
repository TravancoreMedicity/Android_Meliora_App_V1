import {
  View,
  Text,
  useWindowDimensions,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { memo, useMemo, useState } from "react";
import { Dialog, Portal, TextInput, useTheme } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { addMinutes, format } from "date-fns";
import EmployeeSelection from "./EmployeeSelection";
import TicketPrioritySelection from "./TicketPrioritySelection";
import CustomDateTimeSelector from "./Common/CustomDateTimeSelector";
import { Toast } from "toastify-react-native";

const DetailedAssignedTicket = ({ visible, handleDetaledHideDialog, data }) => {
  const { height, width } = useWindowDimensions();
  const theme = useTheme();

  const {
    compalint_date,
    complaint_desc,
    complaint_hicslno,
    complaint_slno,
    complaint_type_name,
    comp_reg_emp,
    dept_sec,
    location,
    priority_check,
    priority_reason,
    sec_name,
    req_type_name,
    rm_room_name,
    year,
    locationName,
    emp_id,
  } = data;

  //   const year = format(new Date(compalint_date), "yyyy");
  // console.log(width);

  const [remark, setRemark] = useState("");
  const [selectedEmp, setSelectedEmp] = useState([]);
  const [priorityVal, setPriorityVal] = useState([]);
  const [priorityObj, setPriorityObj] = useState([]);

  const MaxTicketCompletionDate = useMemo(() => {
    if (priorityObj.length > 0) {
      const MaximumDate = priorityObj[0].maxMinists;
      const approximateCompleteDate = addMinutes(new Date(), MaximumDate);
      return approximateCompleteDate;
    }
    return new Date();
  }, [priorityObj]);

  const hadleSubmitTicketAssign = async () => {
    if (selectedEmp.length === 0) {
      Toast.show({
        type: "warn",
        text1: "Warning",
        text2: "Please Select the Employee",
      });
    } else if (priorityVal.length === 0) {
      Toast.show({
        type: "warn",
        text1: "Warning",
        text2: "Please Select the Priority",
      });
    } else if (remark === null || remark === "" || remark === undefined) {
      Toast.show({
        type: "warn",
        text1: "Warning",
        text2: "Please Enter the Remark",
      });
    } else {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Ticket Assigned",
        onHide: () => {
          handleDetaledHideDialog();
        },
      });
    }
  };

  // console.log(priorityVal);

  // const postData = selectedEmp?.map((val) => {
  //   return {
  //     complaint_remark: remark,
  //     complaint_slno: complaint_slno,
  //     assigned_emp: val,
  //     assigned_date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  //     assign_rect_status: 0,
  //     assigned_user: emp_id,
  //     compalint_priority: priorityVal[0] ?? 0,
  //     aprrox_date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  //     assign_status: 1,
  //   };
  // });

  // console.log(postData);

  console.log(priorityObj);

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={handleDetaledHideDialog}
        style={{
          flexGrow: 1,
          borderRadius: 15,
          //   height: height * 0.8,
          paddingHorizontal: 10,
          paddingTop: 20,
          //   paddingBottom: 50,
        }}
        dismissableBackButton={true}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginBottom: 20,
            }}
          >
            <View
              style={{
                height: 40,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 5,
                }}
              >
                <Ionicons
                  name="ticket"
                  size={30}
                  color={
                    priority_check === 1
                      ? theme.colors.logoCol1
                      : theme.colors.cardBgColor
                  }
                />
              </View>
              <View
                style={{
                  marginLeft: 2,
                  flex: 1,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "Roboto_500Medium",
                        fontWeight: "800",
                        color: theme.colors.lightBlueFont,
                      }}
                    >
                      #{complaint_slno}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "Roboto_500Medium",
                        fontWeight: "800",
                        color: theme.colors.lightBlueFont,
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
                      name="calendar-outline"
                      color={theme.colors.logoCol1}
                    />
                    <Text
                      style={{
                        paddingLeft: 2,
                        fontSize: 12,
                        fontFamily: "Roboto_500Medium",
                        fontWeight: "800",
                        color: theme.colors.lightBlueFont,
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
                    //justifyContent: "space-between",
                    overflow: "hidden",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "800",
                      color: theme.colors.lightBlueFont,
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
              </View>
            </View>
          </View>

          <View
            style={{
              paddingLeft: 15,
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Roboto_500Medium",
                  fontWeight: "800",
                  color: theme.colors.inactiveFont,
                }}
              >
                Ticket Description :
              </Text>
            </View>
            <View
              style={{
                flexGrow: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Roboto_500Medium",
                  fontWeight: "800",
                  color: theme.colors.lightBlueFont,
                }}
                textBreakStrategy="highQuality"
              >
                {complaint_desc ?? "N/A"}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                overflow: "hidden",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Roboto_500Medium",
                  fontWeight: "800",
                  color: theme.colors.inactiveFont,
                  paddingRight: 5,
                }}
              >
                Location :
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: width > 360 ? 12 : 10.5,
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
                  fontSize: width > 360 ? 12 : 10.5,
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
                  fontSize: 12,
                  fontFamily: "Roboto_500Medium",
                  fontWeight: "800",
                  color: theme.colors.lightBlueFont,
                }}
              >
                {complaint_type_name}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
              }}
            >
              {priority_check === 1 ? (
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
                      color: theme.colors.logoCol1,
                    }}
                  >
                    Priority Reason : {priority_reason}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>

          {/* Employee Picker */}
          <View
            style={{
              padding: 15,
              paddingTop: 15,
              justifyContent: "flex-start",
              //   alignItems: "flex-start",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: width > 360 ? 12 : 10.5,
                  fontFamily: "Roboto_500Medium",
                  fontWeight: "800",
                  paddingRight: 5,
                  color: theme.colors.inactiveFont,
                }}
              >
                Select Responsible Employee
              </Text>
              <EmployeeSelection
                selectedEmpArray={selectedEmp}
                handleSelectedEmpArray={setSelectedEmp}
              />
            </View>
            <View>
              <Text
                style={{
                  fontSize: width > 360 ? 12 : 10.5,
                  fontFamily: "Roboto_500Medium",
                  fontWeight: "800",
                  paddingRight: 5,
                  paddingTop: 10,
                  color: theme.colors.inactiveFont,
                }}
              >
                Select Ticket Priority
              </Text>
              <TicketPrioritySelection
                priorityVal={priorityVal}
                setPriorityVal={setPriorityVal}
                setPriorityObj={setPriorityObj}
              />
            </View>
            <View>
              <Text
                style={{
                  fontSize: width > 360 ? 12 : 10.5,
                  fontFamily: "Roboto_500Medium",
                  fontWeight: "800",
                  paddingRight: 5,
                  paddingTop: 8,
                  paddingBottom: 4,
                  color: theme.colors.inactiveFont,
                }}
              >
                Approximate Completion Date
              </Text>
              <CustomDateTimeSelector priorityDate={MaxTicketCompletionDate} />
            </View>
            <View>
              <Text
                style={{
                  fontSize: width > 360 ? 12 : 10.5,
                  fontFamily: "Roboto_500Medium",
                  fontWeight: "800",
                  paddingRight: 5,
                  paddingTop: 8,
                  paddingBottom: 4,
                  color: theme.colors.inactiveFont,
                }}
              >
                Remarks
              </Text>
              <View>
                <TextInput
                  label="Remarks"
                  value={remark}
                  onChange={(text) => setRemark(text)}
                  multiline={true}
                  dense={true}
                  numberOfLines={3}
                />
              </View>
            </View>

            <View
              style={{
                alignItems: "center",
                marginTop: 20,
                marginBottom: 100,
                // backgroundColor: "lightgreen",
              }}
            >
              <TouchableOpacity
                onPress={hadleSubmitTicketAssign}
                style={{
                  backgroundColor: theme.colors.logoCol2,
                  padding: 10,
                  borderRadius: 18,
                  width: "80%",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "800",
                    }}
                  >
                    Assign Ticket
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Dialog>
    </Portal>
  );
};

export default memo(DetailedAssignedTicket);
