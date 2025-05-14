import {
  View,
  Text,
  Modal,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { memo, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";
import { format } from "date-fns";
import Ionicons from "react-native-vector-icons/Ionicons";
import LiveCmpTimeDiffrenceClock from "../Modals/LiveCmpTimeDiffrenceClock";
import Feather from "react-native-vector-icons/Feather";
import EmpListWithOutLoggedUser from "./Common/EmpListWithOutLoggedUser";

const AssistRequestedModal = ({
  openState,
  setModalVisible,
  data,
  postData,
}) => {
  const theme = useTheme();
  const { height } = useWindowDimensions();
  const year = format(new Date(data.compalint_date), "yyyy");

  const [empList, setEmpList] = useState([]);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1 }}
        mode="margin"
        edges={["top", "bottom"]}
        animated
      >
        <Modal
          animationType="slide"
          transparent={false}
          visible={openState}
          onRequestClose={() => {
            setModalVisible(false);
          }}
          statusBarTranslucent
          presentationStyle="overFullScreen"
        >
          {/* outer layer */}
          <ScrollView
            style={{ flex: 1, backgroundColor: theme.colors.statusBarCol }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
          >
            {/* inner layer starting */}
            <View
              style={{
                flex: 1,
                backgroundColor: theme.colors.statusBarCol,
                overflow: "hidden",
                paddingTop: (height * 6) / 100,
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
                  overflow: "hidden",
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
              <View style={{ paddingHorizontal: 20 }}>
                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "800",
                      fontFamily: "Roboto_500Medium",
                      color: theme.colors.logoCol2,
                      textDecorationLine: "underline",
                      textDecorationColor: theme.colors.logoCol2,
                      textDecorationStyle: "solid",
                    }}
                  >
                    Request Assistance
                  </Text>
                  <View style={{ backgroundColor: "green" }}>
                    <EmpListWithOutLoggedUser
                      postData={postData}
                      selectedEmpNos={empList}
                      setSelectedEmpNos={setEmpList}
                    />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 30,
              right: 30,
              backgroundColor: theme.colors.logoCol1,
              borderRadius: 50,
              padding: 15,
              elevation: 5,
              zIndex: 10,
            }}
            onPress={handleModalClose}
          >
            <Feather name="corner-up-left" size={22} color="white" />
          </TouchableOpacity>
        </Modal>
        {/* Floating Icon */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default memo(AssistRequestedModal);
