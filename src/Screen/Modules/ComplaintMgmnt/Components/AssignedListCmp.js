//import liraries
import { memo, useState, useCallback, useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import LiveCmpTimeDiffrenceClock from "./Modals/LiveCmpTimeDiffrenceClock";
import { useTheme } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { format } from "date-fns";
import Feather from "react-native-vector-icons/Feather";
import TicketRectifyModal from "./Version1/TicketRectifyModal";
import AssistRequestedModal from "./Version1/AssistRequestedModal";
import {
  getLogiEmployeeID,
  getLogiEmpDEPT,
} from "../../../../Redux/ReduxSlice/LoginSLice";
import FadeColorBox from "./Version1/Common/FadeInOutCmp";

// create a component
const AssignedListCmp = ({ data }) => {
  const theme = useTheme();

  const empId = useSelector((state) => getLogiEmployeeID(state));
  const empDEPT = useSelector((state) => getLogiEmpDEPT(state));

  const postDeptData = useMemo(() => {
    return { em_id: empId, em_department: empDEPT };
  }, []);

  const assignTickData = useMemo(() => data, [data]);
  const {
    complaint_slno, //complaint slno
    compalint_date, //complaint date
    req_type_name, // request complaint type - complaint,new requirement , modification
    complaint_type_name, // comolaint type name hardware ,software ,etc
    location, // location name in detail
    comp_reg_emp, //  register employee name-complaint
    empdept, // registerd department
    hic_policy_name,
    complaint_desc,
    compalint_priority,
    priority_check,
    complaint_hicslno,
    assigned_date,
    create_employee,
    sec_name,
    priority_reason,
    rejected,
    accepted,
    pending,
  } = assignTickData;

  const assisted = useMemo(() => {
    return accepted > 0 || rejected > 0 || pending > 0 ? true : false;
  }, [accepted, rejected, pending]);

  const year = format(new Date(compalint_date), "yyyy");

  // location name mapping
  const locationName = useMemo(() => {
    const location =
      assignTickData.rm_roomtype_name ||
      assignTickData.rm_insidebuildblock_name ||
      assignTickData.rm_floor_name
        ? `(${assignTickData.rm_roomtype_name || ""}${
            assignTickData.rm_roomtype_name &&
            assignTickData.rm_insidebuildblock_name
              ? " - "
              : ""
          }${assignTickData.rm_insidebuildblock_name || ""}${
            assignTickData.rm_insidebuildblock_name &&
            assignTickData.rm_floor_name
              ? " - "
              : ""
          }${assignTickData.rm_floor_name || ""})`
        : assignTickData.cm_complaint_location || null;

    return `${assignTickData.rm_room_name} ${location}`;
  }, [assignTickData]);

  const [openState, openModelState] = useState(false);

  const handleModal = useCallback(async () => {
    openModelState(!openState);
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [assistModalVisible, setAssistModalVisible] = useState(false);

  return (
    <View>
      <TicketRectifyModal
        openState={modalVisible}
        setModalVisible={setModalVisible}
        data={{ ...assignTickData, locationName }}
      />
      {/* MOdal componet end here */}

      {/* MOdal for assit request */}
      <AssistRequestedModal
        openState={assistModalVisible}
        setModalVisible={setAssistModalVisible}
        data={{ ...assignTickData, locationName }}
        postData={postDeptData}
      />

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

          <View
            style={{
              paddingVertical: 8,
              // backgroundColor: "#4CAF50",
              width: "100%",
              alignItems: "flex-start",
              flexDirection: "row",
            }}
          >
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: theme.colors.logoCol2, // green
                  padding: 12,
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
                onPressIn={() => setModalVisible(true)}
                activeOpacity={0.7}
              >
                <Feather name="thumbs-up" size={22} color="white" />
              </TouchableOpacity>
            </View>
            <View style={{ paddingLeft: 20 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: theme.colors.logoCol3, // green
                  padding: 12,
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
                onPressIn={() => setAssistModalVisible(true)}
                activeOpacity={0.7}
              >
                <Ionicons name="headset-outline" size={22} color="white" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
                flex: 1,
                // backgroundColor: "green",
                padding: 12,
                // borderRadius: 50,
              }}
            >
              {assisted && <FadeColorBox />}
            </View>
          </View>
        </View>
        {/* Middle Components  End*/}
      </View>
    </View>
  );
};

//make this component available to the app
export default memo(AssignedListCmp);
