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
import { useTheme } from "react-native-paper";

const data = [100, 200, 300, 400, 500];

const NotificationBoard = () => {
  const theme = useTheme();
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
    <View
      style={{
        flex: 1,
        // backgroundColor: "green",
        // marginHorizontal: 13,
      }}
    >
      <Carousel
        ref={ref}
        loop={true}
        width={width}
        height={110}
        autoFillData={true}
        autoPlay={true}
        autoPlayInterval={3000}
        windowSize={1}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.86,
          parallaxScrollingOffset: 40,
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
        renderItem={(data) => (
          <View
            style={{
              flex: 1,
              // borderWidth: 1,
              // borderColor: "red",
              borderRadius: 15,
              backgroundColor: theme.colors.cardBgColor,
              //   width: "100%",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <View
              style={{
                height: 30,
                // backgroundColor: "green",
                paddingLeft: 18,
                alignItems: "flex-start",
                justifyContent: "flex-end",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  textTransform: "capitalize",
                  fontFamily: "Roboto_900Black",
                  color: theme.colors.logoCol2,
                }}
                lineBreakMode="middle"
                textBreakStrategy="balanced"
              >
                Notifications
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                marginHorizontal: 20,
                // backgroundColor: "blue",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 30,
                  textAlign: "center",
                  fontSize: 16,
                  // textTransform: "capitalize",
                  fontFamily: "Roboto_300Light",
                  color: "#fff",
                  // paddingHorizontal: 10,
                }}
                numberOfLines={3}
              >
                sdfsdfsfsdfsdfdsfsdfsdfsdf sdfsf sdf sdfsdfs sfsdfs
                sdfsdfsdfsdghtfhrhytu drgdrgr ertertertert
                erterterytyuy7iyiuyiyuiyuiyuiyuiy dtdrtrtdrtdrtdrtd
                drtdrtdtyrtuyiou youoy
              </Text>
            </View>
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
