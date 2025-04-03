import { View, Text } from "react-native";
import React from "react";
import SkeletonLoading from "expo-skeleton-loading";

const DashBoardSkeleton = () => {
  return (
    <SkeletonLoading background={"#adadad"} highlight={"#ffffff"}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          // backgroundColor: "red",
        }}
      >
        <View
          style={{
            width: 250,
            height: 90,
            backgroundColor: "#adadad",
            borderRadius: 20,
          }}
        />
      </View>
    </SkeletonLoading>
  );
};

export default DashBoardSkeleton;
