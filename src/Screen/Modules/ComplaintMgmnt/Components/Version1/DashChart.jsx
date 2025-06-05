import { View, Text } from "react-native";
import React from "react";
import { BarChart } from "react-native-gifted-charts";

const DashChart = () => {
  const barData = [
    { value: 250, label: "M" },
    { value: 500, label: "T", frontColor: "#177AD5" },
    { value: 745, label: "W", frontColor: "#177AD5" },
    { value: 320, label: "T" },
    { value: 600, label: "F", frontColor: "#177AD5" },
    { value: 256, label: "S" },
    { value: 300, label: "S" },
    { value: 600, label: "F", frontColor: "#177AD5" },
    { value: 256, label: "S" },
    { value: 300, label: "S" },
  ];

  return (
    <View>
      <BarChart
        // horizontal
        barWidth={22}
        noOfSections={5}
        barBorderRadius={4}
        frontColor="lightgray"
        data={barData}
        yAxisThickness={0}
        xAxisThickness={0.5}
        height={150}
        initialSpacing={0.5}
        spacing={7}
        //isThreeD={true}
        // showBarTops
        isAnimated
      />
    </View>
  );
};

export default DashChart;
