import { View } from "react-native";
import React, { memo } from "react";
import SkeletonLoading from "expo-skeleton-loading";
import { useTheme } from "react-native-paper";

const Skeleton = ({ height }) => {
  const theme = useTheme();
  return (
    <SkeletonLoading background={"#eae1f2"} highlight={"#f8f8fa"}>
      <View
        style={{
          marginHorizontal: 22,
          borderRadius: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          // backgroundColor: theme.colors.logoCol2,
        }}
      >
        <View
          style={{
            width: "auto",
            height: height,
            // borderRadius: 20,
          }}
        />
      </View>
    </SkeletonLoading>
  );
};

export default memo(Skeleton);
