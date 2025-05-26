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
  UseGetPendingAssistTicketCount,
  UseGetPendingTicketsCount,
} from "../../../api/TicketsUtilities";

const DashCountTile = lazy(() => import("./DashCountTile"));

// create a component
const DashBoardView = ({ navigation }) => {
  const theme = useTheme();

  const empID = useSelector((state) => getLogiEmployeeID(state));
  const deptID = useSelector((state) => getLogiEmpDEPT(state));

  // GET THE ASSIT REQUEST COUNT
  const { data, isError, isLoading, isSuccess } =
    UseGetPendingAssistTicketCount(empID);
  // GET THE PENDING TICKET COUNT
  const {} = UseGetPendingTicketsCount(deptID);

  // const superId = useSelector(getSuperVisor);
  // const [newTicket, setNewTicket] = useState(0);
  // const [secondLvl, setSecondLvl] = useState(0);
  // const [ticktCount, setTicktCount] = useState({
  //   assigned: 0,
  //   assit: 0,
  //   onHold: 0,
  //   forVerify: 0,
  //   completed: 0,
  //   pending: 0,
  //   superPending: 0,
  // });

  // const tickectCount = useSelector(getTicketCount);
  // const notAssignedCount = useSelector(getNotAssignedCount);
  // const secondListCount = useSelector(secondLevelCount);

  // //FOR ASSIGN THE NOT ASSIGNED TICKET COUNT
  // useEffect(() => {
  //   setNewTicket(notAssignedCount);
  //   setSecondLvl(secondListCount);
  // }, [notAssignedCount, secondListCount]);
  // //FOT ASSIGN THE ALL TICKET COUNT OTHER THAN NOT ASSIGN
  // const tiktCountFrmDb = useMemo(() => tickectCount, [tickectCount]);

  // useEffect(() => {
  //   tiktCountFrmDb?.map((val) => {
  //     if (val.countype === "AC")
  //       setTicktCount({ ...ticktCount, ...(ticktCount.assigned = val.total) });
  //     if (val.countype === "AA")
  //       setTicktCount({ ...ticktCount, ...(ticktCount.assit = val.total) });
  //     if (val.countype === "HC")
  //       setTicktCount({ ...ticktCount, ...(ticktCount.onHold = val.total) });
  //     if (val.countype === "PC")
  //       setTicktCount({ ...ticktCount, ...(ticktCount.pending = val.total) });
  //     if (val.countype === "RC")
  //       setTicktCount({ ...ticktCount, ...(ticktCount.forVerify = val.total) });
  //     if (val.countype === "CC")
  //       setTicktCount({ ...ticktCount, ...(ticktCount.completed = val.total) });
  //     if (val.countype === "SP")
  //       setTicktCount({
  //         ...ticktCount,
  //         ...(ticktCount.superPending = val.total),
  //       });
  //   });
  // }, [tiktCountFrmDb]);

  // const {
  //   assigned,
  //   assit,
  //   completed,
  //   forVerify,
  //   onHold,
  //   pending,
  //   superPending,
  // } = ticktCount;

  const ticketDataCount = [
    { id: 1, route: "notAssign", title: "New Tickets", count: 56 },
    { id: 2, route: "AssignList", title: "Assigned", count: 10 },
    { id: 3, route: "Assistance", title: "Assist Request", count: 25 },
    { id: 4, route: "OnHold", title: "On Hold", count: 456 },
    { id: 5, route: "Verify", title: "Rectified", count: 5 },
    { id: 6, route: "Completed", title: "Verified", count: 121 },
  ];

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
      {ticketDataCount?.map((val) => {
        return (
          <DashCountTile
            key={val.id}
            id={1}
            name={val.title}
            count={val.count}
            route={val.route}
          />
        );
      })}
    </View>
  );
};

//make this component available to the app
export default memo(DashBoardView);
