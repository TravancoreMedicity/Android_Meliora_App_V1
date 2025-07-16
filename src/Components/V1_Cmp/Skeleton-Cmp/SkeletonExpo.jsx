import React, { memo } from "react";
import { useWindowDimensions, View } from "react-native";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { useTheme } from "react-native-paper";
const SkeletonExpo = (props) => {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const height = 110;
  const customWidth = width - 45;

  return (
    <ContentLoader
      speed={1}
      width={customWidth}
      height={height}
      viewBox={`0 0 ${customWidth} ${height}`}
      backgroundColor="#c2a8d7"
      foregroundColor="#ecebeb"
    >
      <Rect x="0" y="0" rx="10" ry="10" width={customWidth} height={height} />
    </ContentLoader>
  );
};

export default memo(SkeletonExpo);
