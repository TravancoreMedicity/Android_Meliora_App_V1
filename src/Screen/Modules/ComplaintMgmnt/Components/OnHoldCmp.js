//import liraries
import React, {
  memo,
  useState,
  lazy,
  Suspense,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { View, Text, Pressable } from "react-native";
import { bgColor, colorTheme, fontColor } from "../../../../Constant/Colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Button, Divider, useTheme } from "react-native-paper";
import { styles } from "../Style/Style";
import { useDispatch } from "react-redux";
import { getTheActualEmployee } from "../../../../Redux/Actions/complaintMagmt.action";
import OnholdTicketRectify from "./Modals/OnholdTicketRectify";
import { getActualTicketAssingedEmp } from "../../../../Redux/ReduxSlice/ticketMagmntSlice";
import Ionicons from "react-native-vector-icons/Ionicons";
import { format } from "date-fns";
import LiveCmpTimeDiffrenceClock from "./Modals/LiveCmpTimeDiffrenceClock";
import CenteredButton from "./Version1/Common/CenteredButton";
import TicketRectifyModal from "./Version1/TicketRectifyModal";

const RectifyModal = lazy(() => import("./RectifyModal"));

// create a component
const OnHoldCmp = ({ data }) => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const compDetlData = useMemo(() => data, [data]);
  const {
    accepted,
    aprrox_date,
    assigned_date,
    assigned_employees,
    assinged_user,
    cm_asset_status,
    cm_complaint_location,
    cm_file_status,
    cm_hold_reason,
    cm_hold_reason_slno,
    cm_location,
    cm_query_status,
    cm_rectify_status,
    cm_rectify_status1,
    comp_reg_emp,
    compalint_date,
    compalint_priority,
    compalint_status,
    compalint_status1,
    compdept_message,
    compdept_message_flag,
    complaint_dept_name,
    complaint_dept_secslno,
    complaint_deptslno,
    complaint_desc,
    complaint_hicslno,
    complaint_remark,
    complaint_request_slno,
    complaint_slno,
    complaint_type_name,
    complaint_typeslno,
    create_user,
    hic_policy_name,
    hic_policy_status,
    holduser,
    location,
    message_reply_emp,
    pending,
    pending_onhold_time,
    pending_onhold_user,
    priority,
    priority_check,
    priority_reason,
    read_user,
    rectify_pending_hold_remarks,
    rectify_pending_hold_remarks1,
    rejected,
    req_type_name,
    rm_floor_name,
    rm_insidebuildblock_name,
    rm_insidebuilldblock_slno,
    rm_room_floor_slno,
    rm_room_name,
    rm_room_slno,
    rm_roomtype_name,
    rm_roomtype_slno,
    sec_name,
    send_user,
    verify_spervsr,
    verify_spervsr_remarks,
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

  const [visible, setVisible] = useState(false);

  // useEffect(() => {
  //     return () => {
  //         dispatch(getTheActualEmployee(0))
  //     }
  // }, [getTheActualEmployee, dispatch])

  const onRectifyModal = useCallback(async () => {
    // dispatch(getTheActualEmployee(complaint_slno))
    // dispatch(getActualTicketAssingedEmp(complaint_slno));
    setVisible(true);
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
      <TicketRectifyModal
        setModalVisible={setVisible}
        openState={visible}
        data={compDetlData}
      />

      {/* <OnholdTicketRectify
        openModelState={setVisible}
        openState={visible}
        data={complaint_slno}
      /> */}
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

        <View style={{ flexDirection: "row", paddingTop: 10 }}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Roboto_500Medium",
              fontWeight: "800",
              paddingRight: 5,
              color: theme.colors.inactiveFont,
            }}
          >
            Ticket hold date :
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Roboto_500Medium",
              fontWeight: "900",
              color: theme.colors.lightBlueFont,
            }}
          >
            {pending_onhold_time}
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
            Hold user name :
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Roboto_500Medium",
              fontWeight: "900",
              color: theme.colors.lightBlueFont,
            }}
          >
            {holduser}
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
            Hold reason :
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Roboto_500Medium",
              fontWeight: "900",
              color: theme.colors.lightBlueFont,
            }}
          >
            {cm_hold_reason}
          </Text>
        </View>
      </View>

      {/* Middle Components End */}

      <View className="pb-1 pt-1">
        <CenteredButton
          hangleOnPress={onRectifyModal}
          label={"Rectify Hold Tickets"}
        />

        {/* <Pressable
          onPress={onRectifyModal}
          className="flex"
          style={{
            borderWidth: 0.3,
            borderRadius: 10,
            marginHorizontal: 25,
            height: 30,
            justifyContent: "center",
            backgroundColor: colorTheme.switchTrack,
          }}
        >
          <Text className="text-center text-white">Rectify tickets</Text>
        </Pressable> */}
      </View>
    </View>
  );
};

//make this component available to the app
export default memo(OnHoldCmp);
