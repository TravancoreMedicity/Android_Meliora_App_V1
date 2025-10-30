import React, { memo } from "react";
import { useWindowDimensions, View } from "react-native";
import ContentLoader, { Rect } from "react-content-loader/native";
const SkeletonExpo = ({ height }) => {
  const { width } = useWindowDimensions();
  // const height = 10;
  const customWidth = width - width * 0.07;

  return (
    <View
      style={{ width: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <ContentLoader
        speed={1}
        width={customWidth}
        height={height}
        viewBox={`0 0 ${customWidth} ${height}`}
        backgroundColor="#c3c3ca"
        foregroundColor="#d5d2d2"
      >
        <Rect x="0" y="0" rx="10" ry="10" width={customWidth} height={height} />
      </ContentLoader>
    </View>
  );
};

export default memo(SkeletonExpo);
