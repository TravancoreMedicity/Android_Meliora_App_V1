import { View, Text } from "react-native";
import React, { memo } from "react";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "react-native-paper";

const AssitReqListComp = ({ item }) => {
  const theme = useTheme();
  return (
    <View
      style={{
        marginHorizontal: 10,
        flexDirection: "row",
        borderWidth: 2,
        columnGap: 10,
        padding: 8,
        borderRadius: 5,
        borderColor: theme.colors.logoCol2,
      }}
    >
      <View style={{ alignItems: "center" }}>
        {item.assist_receive === 1 ? (
          <View>
            <Feather name="thumbs-up" size={22} color="green" />
          </View>
        ) : item.assist_flag === 2 ? (
          <View>
            <Feather name="slash" size={22} color="red" />
          </View>
        ) : (
          <View>
            <Feather name="phone" size={22} color={theme.colors.logoCol3} />
          </View>
        )}
      </View>
      <View>
        <Text
          style={{
            textTransform: "capitalize",
            fontFamily: "Roboto_500Medium",
            fontSize: 15,
            color: theme.colors.logoCol2,
            fontWeight: 900,
          }}
        >
          {item.assigned_emp_name?.toLowerCase()}
        </Text>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "Roboto_500Medium",
            fontSize: 15,
            color: theme.colors.logoCol2,
            fontWeight: 700,
            textTransform: "lowercase",
            fontStyle: "italic",
          }}
        >
          {(item.assist_req_reject_reason !== "" ||
            item.assist_req_reject_reason !== null) &&
            item.assist_req_reject_reason}
        </Text>
      </View>
    </View>
  );
};

export default memo(AssitReqListComp);
