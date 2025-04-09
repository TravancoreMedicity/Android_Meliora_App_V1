import { Text, useWindowDimensions, View } from "react-native";
import React, { memo, useRef } from "react";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
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

  const notification = [
    {
      title: "Ticket Management",
      body: "Ticket management software is a tool used to efficiently track, prioritize, assign, and resolve customer or internal support requests. It helps teams streamline communication, improve response times, and ensure no issue falls through the cracks—ideal for customer service, IT support, and help desks",
      time: "07-04-2025 02:34 PM",
    },
    {
      title: "CRF Management",
      body: "Central Asset Request Management is a unified system that streamlines how teams request, approve, track, and manage organizational assets—such as equipment, devices, software, or facilities—ensuring transparency, accountability, and faster fulfillment.",
      time: "07-04-2025 02:34 PM",
    },
  ];

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
        autoPlayInterval={10000}
        windowSize={1}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.88,
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
        data={notification}
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
                {data?.item?.title}
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
                  fontSize: 30,
                  textAlign: "justify",
                  fontSize: 16,
                  textTransform: "capitalize",
                  fontFamily: "Roboto_300Light",
                  color: "#fff",
                  // paddingHorizontal: 10,
                }}
                numberOfLines={3}
              >
                {data?.item?.body}
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

export default memo(NotificationBoard); // NotificationBoard;
