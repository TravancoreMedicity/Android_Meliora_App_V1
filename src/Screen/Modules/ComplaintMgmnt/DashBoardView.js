//import liraries
import React, { memo, useState, lazy, useMemo, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import _ from "underscore";
import {
  getNotAssignedCount,
  getTicketCount,
} from "../../../Redux/ReduxSlice/ticketMagmntSlice";
import { styles } from "./Style/Style";
import { secondLevelCount } from "../../../Redux/ReduxSlice/ticketMagmentDeptSlice";
import {
  getLogiEmpDEPT,
  getLogiEmployeeID,
  getSuperVisor,
} from "../../../Redux/ReduxSlice/LoginSLice";
import { useTheme } from "react-native-paper";
import {
  UsegetEmpAssignedTicket,
  UsegetEmpRectifyTodayTicket,
  UsegetEmpVerifiedTodayTicket,
  UsegetgetEmpHoldTicket,
  UseGetPendingAssistTicketCount,
  UseGetPendingTicketsCount,
} from "../../../api/TicketsUtilities";

const DashCountTile = lazy(() => import("./DashCountTile"));

// create a component
const DashBoardView = ({ navigation }) => {
  const theme = useTheme();

  const ticketDataCount = [
    { id: 1, route: "notAssign", title: "New Tickets", count: 56 },
    { id: 2, route: "AssignList", title: "Assigned", count: 10 },
    { id: 3, route: "Assistance", title: "Assist Request", count: 25 },
    { id: 4, route: "OnHold", title: "On Hold", count: 456 },
    { id: 5, route: "Verify", title: "Rectified", count: 5 },
    { id: 6, route: "Completed", title: "Verified", count: 121 },
  ];

  const [tickData, setTickData] = useState([
    { id: 1, route: "notAssign", title: "New Tickets", count: 56 },
    { id: 2, route: "AssignList", title: "Assigned", count: 10 },
    { id: 3, route: "Assistance", title: "Assist Request", count: 25 },
    { id: 4, route: "OnHold", title: "On Hold", count: 456 },
    { id: 5, route: "Verify", title: "Rectified", count: 5 },
    { id: 6, route: "Completed", title: "Verified", count: 121 },
  ]);

  const empID = useSelector((state) => getLogiEmployeeID(state));
  const deptID = useSelector((state) => getLogiEmpDEPT(state));

  // GET THE ASSIT REQUEST COUNT
  const { data: assistCount, isLoading: assistLoading } =
    UseGetPendingAssistTicketCount(empID);

  // GET THE PENDING TICKET COUNT
  const { data: pendingCount, isLoading: pendingLoading } =
    UseGetPendingTicketsCount(deptID);

  // ASSIGNED TICKET COUNT
  const { data: assignedCount, isLoading: assignedLoading } =
    UsegetEmpAssignedTicket(empID);

  // HOLD TICKET COUNT
  const { data: holdCount, isLoading: holdLoading } =
    UsegetgetEmpHoldTicket(empID);

  // TICKET RECTIFIED COUNT
  const { data: rectifiedCount, isLoading: rectifiedLoading } =
    UsegetEmpRectifyTodayTicket(empID);

  const { data: verifiedCount, isLoading: verifiedLoading } =
    UsegetEmpVerifiedTodayTicket(empID);

  useEffect(() => {
    setTickData([
      {
        id: 1,
        route: "notAssign",
        title: "New Tickets",
        count: pendingCount?.data[0]?.pending_ticket_count,
        loading: pendingLoading,
      },
      {
        id: 2,
        route: "AssignList",
        title: "Assigned",
        count: assignedCount?.data[0]?.employee_ticket_assigned_count,
        loading: assignedLoading,
      },
      {
        id: 3,
        route: "Assistance",
        title: "Assist Request",
        count: assistCount?.data[0]?.assist_req_count,
        loading: assistLoading,
      },
      {
        id: 4,
        route: "OnHold",
        title: "On Hold",
        count: holdCount?.data[0]?.employee_ticket_hold_count,
        loading: holdLoading,
      },
      {
        id: 5,
        route: "Verify",
        title: "Rectified",
        count: rectifiedCount?.data[0]?.employee_ticket_rectified_count,
        loading: rectifiedLoading,
      },
      {
        id: 6,
        route: "Completed",
        title: "Verified",
        count: verifiedCount?.data[0]?.employee_ticket_rectified_count,
        loading: verifiedLoading,
      },
    ]);
  }, [
    assistCount,
    pendingLoading,
    assignedCount,
    holdCount,
    rectifiedCount,
    verifiedCount,
  ]);

  const dashData = useMemo(() => tickData, [tickData]);

  return (
    <View
      style={{
        flexGrow: 1,
        backgroundColor: theme.colors.cardBgSecond,
        borderRadius: 13,
        padding: 7,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {dashData?.map((val) => {
        return (
          <DashCountTile
            key={val.id}
            id={1}
            name={val.title}
            count={val.count}
            route={val.route}
            loading={val.loading}
          />
        );
      })}
    </View>
  );
};

//make this component available to the app
export default memo(DashBoardView);
