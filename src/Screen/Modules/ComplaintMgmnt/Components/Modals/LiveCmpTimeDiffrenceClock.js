import moment from "moment";
import React, { memo, useState, useEffect, useCallback } from "react";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";

const LiveCmpTimeDiffrenceClock = ({ compalint_date }) => {
  const theme = useTheme();

  // Validate input
  if (!compalint_date || isNaN(new Date(compalint_date).getTime())) {
    return (
      <Text style={{ color: theme.colors.logoCol1 || "#000000" }}>
        Invalid Date
      </Text>
    );
  }

  const [timeDifference, setTimeDifference] = useState("00:00:00");
  const [dayDifference, setDayDifference] = useState(0);

  const calculateTimeDifference = useCallback(
    (compalint_date) => {
      const startTime = moment(compalint_date);
      const endTime = moment();
      if (!startTime.isValid() || !endTime.isValid()) {
        setTimeDifference("00:00:00");
        setDayDifference(0);
        return;
      }
      const diff = endTime.diff(startTime);
      const duration = moment.duration(diff);
      setTimeDifference(
        moment.utc(duration.asMilliseconds()).format("HH:mm:ss")
      );
      setDayDifference(endTime.diff(startTime, "day"));
    },
    [compalint_date]
  );

  useEffect(() => {
    calculateTimeDifference(compalint_date);
    const timer = setInterval(() => {
      calculateTimeDifference(compalint_date);
    }, 1000); // Update every second

    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, [compalint_date, calculateTimeDifference]);

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Roboto_500Medium",
            color: theme.colors.logoCol1 || "#000000",
            fontSize: 14,
            fontWeight: "700",
            paddingRight: 8,
          }}
        >{`${dayDifference} days`}</Text>
        <Text
          style={{
            fontFamily: "Roboto_500Medium",
            color: theme.colors.logoCol1 || "#000000",
            fontSize: 13,
            fontWeight: "700",
          }}
        >
          {timeDifference}
        </Text>
        <Text
          style={{
            fontFamily: "Roboto_500Medium",
            color: theme.colors.logoCol1 || "#000000",
            fontSize: 14,
            fontWeight: "700",
            paddingLeft: 8,
          }}
        >
          hours
        </Text>
      </View>
    </View>
  );
};

export default memo(LiveCmpTimeDiffrenceClock);
