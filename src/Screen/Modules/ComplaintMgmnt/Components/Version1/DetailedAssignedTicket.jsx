import { View, Text, useWindowDimensions, ScrollView } from "react-native";
import React, { memo } from "react";
import { Dialog, Portal, useTheme } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { format } from "date-fns";
import EmployeeSelection from "./EmployeeSelection";
import TicketPrioritySelection from "./TicketPrioritySelection";
import CustomDateTimeSelector from "./Common/CustomDateTimeSelector";

const DetailedAssignedTicket = ({ visible, handleDetaledHideDialog, data }) => {
  const { height, width } = useWindowDimensions();
  const theme = useTheme();

  const {
    compalint_date,
    complaint_desc,
    complaint_hicslno,
    complaint_slno,
    complaint_type_name,
    comp_reg_emp,
    dept_sec,
    location,
    priority_check,
    priority_reason,
    sec_name,
    req_type_name,
    rm_room_name,
    year,
    locationName,
  } = data;

  //   const year = format(new Date(compalint_date), "yyyy");
  console.log(width);
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={handleDetaledHideDialog}
        style={{
          flexGrow: 1,
          borderRadius: 15,
          //   height: height * 0.8,
          paddingHorizontal: 10,
          paddingTop: 20,
          //   paddingBottom: 50,
        }}
        dismissableBackButton={true}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginBottom: 20,
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
                  name="ticket"
                  size={30}
                  color={
                    priority_check === 1
                      ? theme.colors.logoCol1
                      : theme.colors.cardBgColor
                  }
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
                      {compalint_date}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    //justifyContent: "space-between",
                    overflow: "hidden",
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
          </View>

          <View
            style={{
              paddingLeft: 15,
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

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                overflow: "hidden",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Roboto_500Medium",
                  fontWeight: "800",
                  color: theme.colors.inactiveFont,
                  paddingRight: 5,
                }}
              >
                Location :
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: width > 360 ? 12 : 10.5,
                  fontFamily: "Roboto_500Medium",
                  fontWeight: "800",
                  color: theme.colors.lightBlueFont,
                }}
              >
                {locationName}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: width > 360 ? 12 : 10.5,
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
                  fontSize: 12,
                  fontFamily: "Roboto_500Medium",
                  fontWeight: "800",
                  color: theme.colors.lightBlueFont,
                }}
              >
                {complaint_type_name}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
              }}
            >
              {priority_check === 1 ? (
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
                      color: theme.colors.logoCol1,
                    }}
                  >
                    Priority Reason : {priority_reason}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>

          {/* Employee Picker */}
          <View
            style={{
              padding: 15,
              paddingTop: 15,
              justifyContent: "flex-start",
              //   alignItems: "flex-start",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: width > 360 ? 12 : 10.5,
                  fontFamily: "Roboto_500Medium",
                  fontWeight: "800",
                  paddingRight: 5,
                  color: theme.colors.inactiveFont,
                }}
              >
                Select Responsible Employee
              </Text>
              <EmployeeSelection />
            </View>
            <View>
              <Text
                style={{
                  fontSize: width > 360 ? 12 : 10.5,
                  fontFamily: "Roboto_500Medium",
                  fontWeight: "800",
                  paddingRight: 5,
                  paddingTop: 10,
                  color: theme.colors.inactiveFont,
                }}
              >
                Select Ticket Priority
              </Text>
              <TicketPrioritySelection />
            </View>
            <View>
              <Text
                style={{
                  fontSize: width > 360 ? 12 : 10.5,
                  fontFamily: "Roboto_500Medium",
                  fontWeight: "800",
                  paddingRight: 5,
                  paddingTop: 8,
                  paddingBottom: 4,
                  color: theme.colors.inactiveFont,
                }}
              >
                Approximate Completion Date
              </Text>
              <CustomDateTimeSelector />
            </View>
          </View>
        </ScrollView>
      </Dialog>
    </Portal>
  );
};

export default memo(DetailedAssignedTicket);
