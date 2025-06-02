//import liraries
import React, { memo } from "react";
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  useWindowDimensions,
} from "react-native";
import { useTheme } from "react-native-paper";
import HearderSecondary from "../../../Components/HearderSecondary";
import { colorTheme } from "../../../Constant/Colors";

// create a component
const FlashListCompleted = ({ navigation }) => {
  const theme = useTheme();
  const { height, width } = useWindowDimensions();
  //   Main view height
  const headerHeight = height > 790 ? 100 : 75;
  const headerHeightWithStatusBar = height - headerHeight;

  const data = [
    {
      id: 1,
      name: "Information Technology",
      age: 100,
    },
    {
      id: 2,
      name: "Fourth Payward A Side",
      age: 20,
    },
    {
      id: 3,
      name: "Fourth Payward B Side",
      age: 38,
    },
    {
      id: 4,
      name: "Fourth Payward C Side",
      age: 128,
    },
    {
      id: 5,
      name: "Fourth Payward D Side",
      age: 78,
    },
  ];

  return (
    <KeyboardAvoidingView enabled behavior="height">
      <SafeAreaView style={{ backgroundColor: theme.colors.appBgInside }}>
        {/* Header  */}
        <HearderSecondary
          navigation={navigation}
          name="Today Verified ticket"
        />
        {/* {loding && <OverLayLoading />} */}
        <View
          style={{
            height: headerHeightWithStatusBar,
            width: width,
            paddingHorizontal: 15,
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: colorTheme.secondaryBgColor,
              padding: 10,
              borderRadius: 10,
            }}
          >
            {data?.map((item, index) => {
              const lastIndex = data.length - 1;
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    marginBottom: lastIndex === index ? 0 : 10,
                    height: 50,
                    alignItems: "center",
                    padding: 10,
                    borderWidth: 1,
                    borderColor: colorTheme.secondaryBgColor,
                    borderRadius: 15,
                  }}
                >
                  <View style={{ flexGrow: 1 }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontFamily: "Roboto_500Medium",
                        color: theme.colors.logoCol2,
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontFamily: "Roboto_500Medium",
                        color: theme.colors.logoCol2,
                      }}
                    >
                      {item.age}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
          {/* <Suspense fallback={<CustomActivityIndicator />}>
            <FlashListCmp
              FlashRenderCmp={OnProgressListCmp}
              Assigned={onProgressTicket}
            />
          </Suspense> */}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

//make this component available to the app
export default memo(FlashListCompleted);
