import { Text, useWindowDimensions, View } from "react-native";
import React, { memo, useEffect, useRef, useState } from "react";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { useTheme } from "react-native-paper";
import { UsegetNotificationMessages } from "../../../api/CommonUtilities";
import Skeleton from "../../../Components/V1_Cmp/Skeleton-Cmp/Skeleton";

// const data = [100, 200, 300, 400, 500];

const NotificationBoard = () => {
  const theme = useTheme();
  const ref = useRef(null);
  const { width } = useWindowDimensions();
  const progress = useSharedValue(0);

  const [visible, setVisible] = useState(true);
  const [notificationData, setNotificationData] = useState([]);

  const onPressPagination = (index) => {
    if (ref.current) {
      ref.current.scrollTo({
        count: index - progress.value,
        animated: true,
      });
    }
  };
  const { data, isError, isSuccess } = UsegetNotificationMessages();

  useEffect(() => {
    if (isError) {
      setVisible(true);
    }

    if (isSuccess) {
      setVisible(false);
      setNotificationData(data?.data);
    }
  }, [isSuccess]);

  // if (isLoading) return;
  // if (isError) return;

  return visible ? (
    <Skeleton height={110} />
  ) : (
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
        data={notificationData}
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
                {data?.item?.notification_heading}
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
                {data?.item?.notification_remarks}
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
