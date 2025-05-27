import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";
import { FontAwesome5 } from "@expo/vector-icons"; // or 'react-native-vector-icons/FontAwesome5'
import { useTheme } from "react-native-paper";

const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome5);

const FadingIcon = () => {
  const theme = useTheme();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 2000 }),
      -1, // infinite
      true // reverse
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      ["#fff", theme.colors.logoCol2] // from gray to blue
    );
    return {
      color,
    };
  });

  return (
    <View style={{}}>
      <AnimatedIcon name="users-cog" size={30} style={animatedStyle} />
    </View>
  );
};

export default FadingIcon;
