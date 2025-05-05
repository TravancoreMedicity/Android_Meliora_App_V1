import moment from "moment";
import React, { memo, useCallback } from "react";
import Clock from "react-live-clock";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";

const LiveCmpTimeDiffrenceClock = ({ compalint_date }) => {
  const theme = useTheme();

  const getTimeDiffrenceForLiveClock = useCallback(
    (compalint_date) => {
      const startTime = moment(compalint_date);
      const endTime = moment();
      const timeDiffrence = endTime.diff(startTime);
      const duration = moment.duration(timeDiffrence);

      const formattedTime = moment
        .utc(duration.asMilliseconds())
        .format("HH:mm:ss");
      const date = moment(formattedTime, "HH:mm:ss").format();
      return date;
    },
    [compalint_date]
  );

  //DAY DIFFRENCE INCLUDING THE TIME ALASO
  const getDayDiffrenceIncludeTheTime = useCallback(
    (compalint_date) => {
      const startTime = moment(compalint_date);
      const endTime = moment();
      return endTime.diff(startTime, "day");
    },
    [compalint_date]
  );

  return (
    <View className="flex">
      <View className="flex flex-row items-center">
        <Text
          style={{
            fontFamily: "Roboto_500Medium",
            color: theme.colors.logoCol1,
            fontSize: 14,
            fontWeight: "700",
            paddingRight: 8,
          }}
        >{`${getDayDiffrenceIncludeTheTime(compalint_date)} days`}</Text>
        <Clock
          element={Text}
          ticking={true}
          date={getTimeDiffrenceForLiveClock(compalint_date)}
          format="HH:mm:ss"
          style={{
            fontFamily: "Roboto_500Medium",
            color: theme.colors.logoCol1,
            fontSize: 14,
            fontWeight: "700",
          }}
        />
        <Text
          style={{
            fontFamily: "Roboto_500Medium",
            color: theme.colors.logoCol1,
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
