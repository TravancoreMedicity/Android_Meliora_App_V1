import {
  View,
  Text,
  KeyboardAvoidingView,
  useWindowDimensions,
} from "react-native";
import React, { useMemo } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRoute, useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import HearderSecondary from "../../../../../Components/HearderSecondary";
import { format, intervalToDuration, parse } from "date-fns";

const SuperVerifyedComp = ({ navigation }) => {
  const route = useRoute();
  const theme = useTheme();
  const { height, width } = useWindowDimensions();

  //   Main view height
  const headerHeight = height > 790 ? 100 : 75;
  const headerHeightWithStatusBar = height - headerHeight;

  const { data } = route.params;
  const compDetlData = useMemo(() => data, [data]);
  console.log(compDetlData);
  const {
    cm_rectify_time,
    comp_reg_emp,
    compalint_date,
    complaint_desc,
    complaint_slno,
    sec_name,
    assigned_employees,
    rectify_pending_hold_remarks,
    assigned_date,
  } = compDetlData;

  const year = format(new Date(compalint_date), "yyyy");

  const parseDate = parse(compalint_date, "yyyy-MM-dd HH:mm:ss", new Date());
  const formattedCmpDate = format(parseDate, "dd-MMMM-yyyy hh:mm:ss a");

  const parseAssignedDate = parse(
    assigned_date,
    "yyyy-MM-dd HH:mm:ss",
    new Date()
  );
  const formattedAssignedDate = format(
    parseAssignedDate,
    "dd-MMMM-yyyy hh:mm:ss a"
  );

  const parseRectifyTime = parse(
    cm_rectify_time,
    "yyyy-MM-dd HH:mm:ss",
    new Date()
  );
  const formattedRectifyTime = format(
    parseRectifyTime,
    "dd-MMMM-yyyy hh:mm:ss a"
  );

  const start = parse(assigned_date, "yyyy-MM-dd HH:mm:ss", new Date());
  const end = parse(cm_rectify_time, "yyyy-MM-dd HH:mm:ss", new Date());
  const duration = intervalToDuration({ start, end });
  const { days, hours, minutes, seconds } = duration;
  const durationString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  return (
    <KeyboardAvoidingView enabled behavior="height">
      <SafeAreaView style={{ backgroundColor: theme.colors.appBgInside }}>
        {/* Header  */}
        <HearderSecondary
          navigation={navigation}
          name="Supervisor Verification"
        />
        <View
          style={{
            height: headerHeightWithStatusBar,
            width: width,
            paddingHorizontal: 15,
          }}
        >
          <View
            style={{
              flex: 1,
              padding: 5,
              //   backgroundColor: "green",
            }}
          >
            <View
              style={{
                marginBottom: 3,
              }}
            >
              <View
                style={{
                  height: 40,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 5,
                  }}
                >
                  <Ionicons
                    name="checkmark-done-sharp"
                    size={30}
                    color="green"
                  />
                </View>
                <View
                  style={{
                    marginLeft: 2,
                    flex: 1,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Roboto_500Medium",
                          fontWeight: "800",
                          color: theme.colors.lightBlueFont,
                        }}
                      >
                        #{complaint_slno}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Roboto_500Medium",
                          fontWeight: "800",
                          color: theme.colors.lightBlueFont,
                        }}
                      >
                        /{year}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons
                        name="calendar-outline"
                        color={theme.colors.logoCol1}
                      />
                      <Text
                        style={{
                          paddingLeft: 2,
                          fontSize: 12,
                          fontFamily: "Roboto_500Medium",
                          fontWeight: "800",
                          color: theme.colors.lightBlueFont,
                          paddingRight: 5,
                        }}
                      >
                        {formattedCmpDate}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "Roboto_500Medium",
                        fontWeight: "800",
                        color: theme.colors.lightBlueFont,
                      }}
                      numberOfLines={1}
                    >
                      {comp_reg_emp}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "Roboto_500Medium",
                        fontWeight: "800",
                        paddingHorizontal: 2,
                        color: theme.colors.lightBlueFont,
                      }}
                    >
                      /
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 12,
                        fontFamily: "Roboto_500Medium",
                        fontWeight: "800",
                        color: theme.colors.lightBlueFont,
                      }}
                    >
                      {sec_name}
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexGrow: 1,
                  paddingLeft: 15,
                  paddingTop: 5,
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "800",
                      color: theme.colors.inactiveFont,
                    }}
                  >
                    Ticket Description :
                  </Text>
                </View>
                <View
                  style={{
                    flexGrow: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "800",
                      color: theme.colors.lightBlueFont,
                    }}
                    textBreakStrategy="highQuality"
                  >
                    {complaint_desc ?? "N/A"}
                  </Text>
                </View>

                <View style={{ flexDirection: "row", paddingTop: 5 }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "800",
                      paddingRight: 5,
                      color: theme.colors.inactiveFont,
                    }}
                  >
                    Ticket Assign Date :
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "900",
                      color: theme.colors.lightBlueFont,
                    }}
                  >
                    {formattedAssignedDate}
                  </Text>
                </View>

                <View style={{ flexDirection: "row", paddingTop: 5 }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "800",
                      paddingRight: 5,
                      color: theme.colors.inactiveFont,
                    }}
                  >
                    Ticket rectify Date :
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "900",
                      color: theme.colors.lightBlueFont,
                    }}
                  >
                    {formattedRectifyTime}
                  </Text>
                </View>

                <View style={{ flexGrow: 1 }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "800",
                      paddingRight: 5,
                      color: theme.colors.inactiveFont,
                    }}
                  >
                    Rectified By :
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "900",
                      color: theme.colors.lightBlueFont,
                    }}
                    textBreakStrategy="highQuality"
                    numberOfLines={2}
                  >
                    {assigned_employees}
                  </Text>
                </View>

                <View
                  style={{ flexDirection: "row", flexGrow: 1, paddingTop: 5 }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "800",
                      paddingRight: 5,
                      color: theme.colors.inactiveFont,
                    }}
                  >
                    Remarks :
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "900",
                      color: theme.colors.lightBlueFont,
                    }}
                    textBreakStrategy="highQuality"
                  >
                    {rectify_pending_hold_remarks}
                  </Text>
                </View>

                <View
                  style={{ flexDirection: "row", flexGrow: 1, paddingTop: 5 }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "800",
                      paddingRight: 5,
                      color: theme.colors.inactiveFont,
                    }}
                  >
                    Complaint Rectification Duration :
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "900",
                      color: theme.colors.lightBlueFont,
                    }}
                    textBreakStrategy="highQuality"
                  >
                    {durationString}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SuperVerifyedComp;
