import { View } from "react-native";
import React, { memo } from "react";
import SkeletonLoading from "expo-skeleton-loading";
import { useTheme } from "react-native-paper";

const Skeleton = ({}) => {
  const theme = useTheme();
  return (
    <SkeletonLoading background={"#eae1f2"} highlight={"#f8f8fa"}>
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
            borderRadius: 20,
          }}
        />
      </View>
    </SkeletonLoading>
  );
};

export default memo(Skeleton);
