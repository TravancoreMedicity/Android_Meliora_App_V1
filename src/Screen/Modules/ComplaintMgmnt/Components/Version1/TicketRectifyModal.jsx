import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React, { memo, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "react-native-paper";
import { format } from "date-fns";
import Ionicons from "react-native-vector-icons/Ionicons";
import LiveCmpTimeDiffrenceClock from "../Modals/LiveCmpTimeDiffrenceClock";
import CheckBoxEmployeeSelection from "./Common/CheckBoxEmployeeSelection";

const TicketRectifyModal = ({ openState, setModalVisible, data }) => {
  const theme = useTheme();
  const { height } = useWindowDimensions();
  const year = format(new Date(data.compalint_date), "yyyy");
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "red" }}
        mode="margin"
        edges={["top", "bottom"]}
        animated
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={openState}
          onRequestClose={() => {
            setModalVisible(false);
          }}
          statusBarTranslucent
          presentationStyle="overFullScreen"
          hardwareAccelerated={true}
        >
          {/* outer layer */}
          <View style={{ flex: 1 }}>
            {/* inner layer starting */}
            <View
              style={{
                flex: 1,
                backgroundColor: theme.colors.statusBarCol,
                overflow: "hidden",
                paddingTop: (height * 10) / 100,
              }}
            >
              {/* inner content */}
              <View
                style={{
                  borderWidth: 2,
                  borderColor: theme.colors.logoCol2,
                  margin: 12.5,
                  padding: 12.5,
                  borderRadius: 22,
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row", paddingBottom: 2 }}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontFamily: "Roboto_500Medium",
                        fontWeight: "800",
                        color: theme.colors.logoCol2,
                      }}
                    >
                      #{data.complaint_slno}
                    </Text>
                    <Text
                      style={{
                        fontSize: 17,
                        fontFamily: "Roboto_500Medium",
                        fontWeight: "800",
                        color: theme.colors.logoCol2,
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
                      size={18}
                      name="calendar-outline"
                      color={theme.colors.logoCol2}
                    />
                    <Text
                      style={{
                        paddingLeft: 2,
                        fontSize: 15,
                        fontFamily: "Roboto_500Medium",
                        fontWeight: "800",
                        color: theme.colors.logoCol2,
                        paddingRight: 5,
                      }}
                    >
                      {data.compalint_date}
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
                      color: theme.colors.logoCol2,
                    }}
                    numberOfLines={1}
                  >
                    {data.comp_reg_emp}
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
                    {data.sec_name}
                  </Text>
                </View>

                <View style={{ flexDirection: "row", paddingTop: 5 }}>
                  <Text
                    style={{
                      fontSize: 12.5,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "800",
                      color: theme.colors.inactiveFont,
                      paddingRight: 5,
                    }}
                  >
                    Location :
                  </Text>
                  <Text
                    style={{
                      fontSize: 13.5,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "800",
                      color: theme.colors.lightBlueFont,
                    }}
                  >
                    {data.locationName}
                  </Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 12.5,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "800",
                      paddingRight: 5,
                      color: theme.colors.inactiveFont,
                    }}
                  >
                    Ticket Type :
                  </Text>
                  <Text
                    style={{
                      fontSize: 13.5,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "800",
                      color: theme.colors.lightBlueFont,
                    }}
                  >
                    {data.complaint_type_name}
                  </Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 12.5,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "800",
                      paddingRight: 5,
                      color: theme.colors.inactiveFont,
                    }}
                  >
                    Assigned Date :
                  </Text>
                  <Text
                    style={{
                      fontSize: 13.5,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "900",
                      color: theme.colors.lightBlueFont,
                    }}
                  >
                    {data.assigned_date}
                  </Text>
                </View>

                <View>
                  <Text
                    style={{
                      fontSize: 12.5,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "800",
                      color: theme.colors.inactiveFont,
                    }}
                  >
                    Ticket Description :
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 13.5,
                      fontFamily: "Roboto_500Medium",
                      fontWeight: "800",
                      color: theme.colors.lightBlueFont,
                    }}
                    textBreakStrategy="highQuality"
                  >
                    {data.complaint_desc ?? "N/A"}
                  </Text>
                </View>
                {/* live clock */}
                <View style={{ alignItems: "center" }}>
                  <LiveCmpTimeDiffrenceClock
                    compalint_date={data.compalint_date}
                  />
                </View>
              </View>

              {/* Rectify a atransaction status */}
              <View>
                <View>
                  <CheckBoxEmployeeSelection cmp_no={data.complaint_slno} />
                </View>
                <View>
                  <Text>Check the rectify status</Text>
                </View>
                <View>
                  <Text>Remarks</Text>
                </View>
                <View>
                  <Text>Sumbit Button</Text>
                </View>
              </View>
              {/* test */}
              {/* test */}
              {/* test */}
              {/* test */}
              {/* test */}
              {/* test */}
              <View
                style={{
                  paddingVertical: 8,
                  backgroundColor: "#4CAF50",
                  width: "100%",
                  alignItems: "flex-start",
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: theme.colors.logoCol2, // green
                    padding: 12,
                    borderRadius: 50, // circular
                    alignItems: "center",
                    justifyContent: "center",
                    shadowColor: "#000",
                    opacity: 0.8,
                    shadowOffset: { width: 0, height: 2 }, // iOS shadow
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    elevation: 4, // Android shadow
                  }}
                  onPress={() => setModalVisible(!openState)}
                  activeOpacity={0.7}
                >
                  <Feather name="thumbs-up" size={22} color="white" />
                </TouchableOpacity>
              </View>
              {/* test */}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default memo(TicketRectifyModal);
