//import liraries
import React, { memo, useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "react-native-paper";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";
const SuperVisorVerify = ({ data }) => {
  const theme = useTheme();
  const compDetlData = useMemo(() => data, [data]);

  const navigation = useNavigation();

  const {
    cm_rectify_time,
    comp_reg_emp,
    compalint_date,
    complaint_desc,
    complaint_slno,
    sec_name,
    assigned_employees,
  } = compDetlData;

  const year = format(new Date(compalint_date), "yyyy");

  return (
    <View
      style={{
        // minHeight: 150,
        flexGrow: 1,
        flexDirection: "row",
        // marginBottom: 20,
        borderRadius: 20,
        overflow: "hidden",
        // paddingVertical: 5,
        borderWidth: 3,
        borderColor: "rgba(124,81,161,0.8)",
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
              <Ionicons name="checkmark-done-sharp" size={30} color="green" />
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
                numberOfLines={2}
              >
                {complaint_desc ?? "N/A"}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
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
                {cm_rectify_time}
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
                // lineBreakMode="middle"
              >
                {assigned_employees}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ backgroundColor: "rgba(124,81,161,0.8)" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("SuperVerifyComponent", { data })}
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <Ionicons name="chevron-forward-outline" size={50} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(SuperVisorVerify);
