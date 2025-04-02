import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Dimensions,
} from "react-native";
import React, { memo, useRef } from "react";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

const data = [...new Array(6).keys()];

const NotificationBoard = () => {
  const ref = useRef(null);
  const { width } = useWindowDimensions();
  const progress = useSharedValue(0);

  const onPressPagination = (index) => {
    if (ref.current) {
      ref.current.scrollTo({
        count: index - progress.value,
        animated: true,
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        ref={ref}
        loop={true}
        width={width}
        height={100}
        autoFillData={true}
        autoPlay={true}
        autoPlayInterval={3000}
        windowSize={1}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 30,
        }}
        pagingEnabled={true}
        snapEnabled={true}
        overscrollEnabled={true}
        style={{
          //   backgroundColor: "green",
          width: width,
        }}
        // vertical={true}
        data={data}
        onProgressChange={progress}
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "red",
              borderRadius: 15,
              //   width: "100%",
              justifyContent: "center",
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 30 }}>{index}</Text>
          </View>
        )}
      />

      {/* <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: 5 }}
        onPress={onPressPagination}
      /> */}
    </View>
  );
};

export default NotificationBoard; // NotificationBoard;

const styles = StyleSheet.create({});
