//import liraries
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, Pressable, Alert, TouchableOpacity } from "react-native";
import { bgColor, colorTheme, fontColor } from "../../../../Constant/Colors";
import { styles } from "../Style/Style";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { getLogiEmployeeID } from "../../../../Redux/ReduxSlice/LoginSLice";
import { axiosApi } from "../../../../config/Axiox";
import { reduxUpdation } from "../../../../Redux/ReduxSlice/commonSlice";
import { TextInput, useTheme } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import LiveCmpTimeDiffrenceClock from "./Modals/LiveCmpTimeDiffrenceClock";
import CenteredButton from "./Version1/Common/CenteredButton";
import Feather from "react-native-vector-icons/Feather";
import { Toast } from "toastify-react-native";
import { useQueryClient } from "@tanstack/react-query";

// create a component
const AssistanceCmp = ({ data }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const compDetlData = useMemo(() => data, [data]);

  const emp_id = useSelector(getLogiEmployeeID);

  const {
    Time, //"Time": null,
    assigned_date, //"assigned_date": null,
    assist_assign_date, //"assist_assign_date": "2025-05-20 17:21:27",
    assist_receive, //"assist_receive": 0,
    cm_asset_status, //"cm_asset_status": 0,
    cm_complaint_location, //"cm_complaint_location": null,
    comp_reg_emp, //"comp_reg_emp": "AJIMINSHA S",
    compalint_date, //"compalint_date": "2025-04-18 15:52:55",
    compalint_priority, //"compalint_priority": null,
    complaint_dept_name, //"complaint_dept_name": "IT",
    complaint_desc, //"complaint_desc": ,
    complaint_slno, //"complaint_slno": 63551,
    complaint_type_name, //"complaint_type_name": "SOFTWARE",
    date, //"date": null,
    detl_slno, //"detl_slno": 93641,
    em_name, //"em_name": "AJIMINSHA S",
    empdept, //"empdept": "INFORMATION TECHNOLOGY",
    hic_policy_name, //"hic_policy_name": null,
    location, //"location": "INFORMATION TECHNOLOGY",
    priority, //"priority": "Not Updated",
    priority_check, //"priority_check": 0,
    priority_reason, //"priority_reason": null,
    req_type_name, //"req_type_name": "New Ticket Registration",
    rm_floor_name, //"rm_floor_name": "FOURTH FLOOR",
    rm_insidebuildblock_name, //"rm_insidebuildblock_name": "BLOCK",
    rm_insidebuilldblock_slno, //"rm_insidebuilldblock_slno": 1,
    rm_room_floor_slno, //"rm_room_floor_slno": 1,
    rm_room_name, //"rm_room_name": "ED403",
    rm_room_slno, //"rm_room_slno": 269,
    rm_roomtype_name, //"rm_roomtype_name": "IT DUCT",
    rm_roomtype_slno, //"rm_roomtype_slno": 3,
    sec_name, //"sec_name": "INFORMATION TECHNOLOGY",
    verify_spervsr, //"verify_spervsr": 0
  } = compDetlData;

  const year = format(new Date(compalint_date), "yyyy");

  const locationName = useMemo(() => {
    const location =
      compDetlData.rm_roomtype_name ||
      compDetlData.rm_insidebuildblock_name ||
      compDetlData.rm_floor_name
        ? `(${compDetlData.rm_roomtype_name || ""}${
            compDetlData.rm_roomtype_name &&
            compDetlData.rm_insidebuildblock_name
              ? " - "
              : ""
          }${compDetlData.rm_insidebuildblock_name || ""}${
            compDetlData.rm_insidebuildblock_name && compDetlData.rm_floor_name
              ? " - "
              : ""
          }${compDetlData.rm_floor_name || ""})`
        : compDetlData.cm_complaint_location || null;

    return `${compDetlData.rm_room_name} ${location}`;
  }, [compDetlData]);

  const [remark, setRemark] = useState("");
  const [visible, setVisible] = useState(false);

  const handleRemarkChange = (text) => {
    setRemark(text);
  };
  //  ACCEPT THE TICKETS

  const acceptTheTicket = useCallback(async () => {
    setVisible(false);

    const postData = {
      assigned_date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      assist_receive: 1,
      complaint_slno: complaint_slno,
      assigned_emp: emp_id,
    };

    const response = await axiosApi.patch(
      "/complaintassign/assistant/recieved",
      postData
    );

    const { success } = await response.data;
    if (success === 1) {
      Toast.show({
        type: "success",
        text1: "Ticket Accepted",
        text2: "Ticket Accepted Successfully !",
        onHide: () => {
          // PENDING assitance TICKET LIST
          queryClient.invalidateQueries({
            queryKey: ["assitedRequestList", emp_id],
            refetchType: "active",
          });

          queryClient.invalidateQueries({
            queryKey: ["assitedRequestCount", emp_id],
            refetchType: "active",
          });
        },
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong !",
        visibilityTime: 2000,
        onHide: () => {
          // PENDING assitance TICKET LIST
          setVisible(false);
        },
      });
    }
    // Alert.alert("Accept the Ticket");
  }, [complaint_slno, emp_id]);

  // REJECT THE TICKETS

  const rejectTheTicket = useCallback(async () => {
    setVisible(true);

    if (visible === true && remark.length === 0) {
      Toast.show({
        type: "error",
        text1: "Warning",
        text2: "Please Enter the Reason",
        visibilityTime: 2000,
      });
      return;
    }

    const postData = {
      assist_flag: 2,
      assist_req_reject_reason: remark,
      complaint_slno: complaint_slno,
      assigned_emp: emp_id,
    };

    if (remark.length === 0) {
      Toast.show({
        type: "error",
        text1: "Warning",
        text2: "Please Enter the Reason",
        visibilityTime: 2000,
      });
      return;
    } else {
      const response = await axiosApi.patch(
        "/complaintassign/assistant/reject",
        postData
      );

      const { success } = await response.data;
      if (success === 1) {
        Toast.show({
          type: "success",
          text1: "Ticket Rejected",
          text2: "Ticket Rejected Successfully !",
          visibilityTime: 2000,
          onHide: () => {
            // PENDING assitance TICKET LIST
            setRemark("");
            setVisible(false);
            queryClient.invalidateQueries({
              queryKey: ["assitedRequestList", emp_id],
              refetchType: "active",
            });

            queryClient.invalidateQueries({
              queryKey: ["assitedRequestCount", emp_id],
              refetchType: "active",
            });
          },
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Something went wrong !",
          visibilityTime: 2000,
          onHide: () => {
            // PENDING assitance TICKET LIST
            setVisible(false);
          },
        });
      }
    }

    // Alert.alert("Reject the Ticket");
  }, [emp_id, complaint_slno, remark, visible]);

  // UPDATION ON UNMOUNT

  useEffect(() => {
    return () => {
      setRemark("");
      setVisible(false);
    };
  }, []);

  return (
    <View
      style={{
        minHeight: 150,
        flexGrow: 1,
        // marginBottom: 20,
        borderRadius: 20,
        overflow: "hidden",
        paddingVertical: 5,
        borderLeftWidth: 2,
        borderColor:
          priority_check === 1
            ? theme.colors.logoCol1
            : theme.colors.cardBgColor,
      }}
    >
      <View
        style={{
          marginBottom: 3,
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

      {/* live clock */}
      <View style={{ alignItems: "flex-end" }}>
        <LiveCmpTimeDiffrenceClock compalint_date={compalint_date} />
      </View>

      {/* Middle Components Start */}
      <View
        style={{
          flexGrow: 1,
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

        <View style={{ flexDirection: "row" }}>
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
            style={{
              fontSize: 12,
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
              fontSize: 12,
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

        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 12,
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
              fontSize: 12,
              fontFamily: "Roboto_500Medium",
              fontWeight: "900",
              color: theme.colors.lightBlueFont,
            }}
          >
            {assigned_date}
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
      {/* Middle Components End */}

      <View
        style={{
          flexDirection: "row",
          //   backgroundColor: "green",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 10,
        }}
      >
        <View style={{ width: "30%", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: theme.colors.logoCol2, // green
              padding: 15,
              borderRadius: 50, // circular
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              opacity: 0.8,
              shadowOffset: { width: 0, height: 2 }, // iOS shadow
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 4, // Android shadow
            }}
            onPress={acceptTheTicket}
            activeOpacity={0.7}
          >
            <Feather name="thumbs-up" size={22} color="white" />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                fontFamily: "Roboto_500Medium",
                color: theme.colors.lightBlueFont,
              }}
            >
              Accept
            </Text>
          </View>
        </View>

        <View style={{ width: "30%", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: theme.colors.logoCol2, // green
              padding: 15,
              borderRadius: 50, // circular
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              opacity: 0.8,
              shadowOffset: { width: 0, height: 2 }, // iOS shadow
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 4, // Android shadow
            }}
            onPress={rejectTheTicket}
            activeOpacity={0.7}
          >
            <Feather name="slash" size={22} color="white" />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                fontFamily: "Roboto_500Medium",
                color: theme.colors.lightBlueFont,
              }}
            >
              Reject
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          padding: 10,
          paddingBottom: 20,
          display: (visible && "flex") || "none",
          pointerEvents: (visible && "auto") || "none",
        }}
      >
        <TextInput
          label="Reject Reason"
          value={remark}
          //   style={{ height: 60 }}
          onChangeText={handleRemarkChange}
          on
          multiline
          dense={true}
          numberOfLines={3}
        />
      </View>
    </View>
  );
};

//make this component available to the app
export default memo(AssistanceCmp);
