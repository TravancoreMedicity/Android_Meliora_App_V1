import { View, Text } from "react-native";
import React, { memo, useState } from "react";
import { Checkbox, useTheme } from "react-native-paper";
import { UseGetAssignListEmp } from "../../../../../../api/TicketsUtilities";
import Skeleton from "../../../../../../Components/V1_Cmp/Skeleton-Cmp/Skeleton";

const CheckBoxEmployeeSelection = ({ cmp_no }) => {
  const theme = useTheme();
  const [selectedEmpNos, setSelectedEmpNos] = useState([]);

  const { data, isError, isLoading, isSuccess } = UseGetAssignListEmp(cmp_no);

  const employees = [
    { emp_no: 1, name: "ajith" },
    { emp_no: 2, name: "arun" },
    { emp_no: 3, name: "anju" },
  ];

  const toggleCheckbox = (emp_no) => {
    setSelectedEmpNos(
      (prev) =>
        prev.includes(emp_no)
          ? prev.filter((id) => id !== emp_no) // remove if already selected
          : [...prev, emp_no] // add if not selected
    );
  };

  return isLoading ? (
    <Skeleton height={50} />
  ) : (
    <View style={{ padding: 12.5 }}>
      {employees.map((emp) => (
        <View
          key={emp.emp_no}
          style={{
            width: "100%",
            // backgroundColor: "orange",
            borderWidth: 1.5,
            borderColor: theme.colors.logoCol2,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 2,
            borderRadius: 12,
            marginBottom: 4,
          }}
        >
          <Checkbox.Item
            status={
              selectedEmpNos.includes(emp.emp_no) ? "checked" : "unchecked"
            }
            onPress={() => toggleCheckbox(emp.emp_no)}
            label={emp.name}
            accessibilityLabel="Checkbox"
            labelVariant="titleMedium"
            position="leading"
            mode="android"
            uncheckedColor={theme.colors.logoCol2}
            color={theme.colors.logoCol1}
            theme={{ animation: { scale: 1 } }}
            labelStyle={{
              color: theme.colors.logoCol2,
              fontSize: 18,
              fontFamily: "Roboto_500Medium",
              fontWeight: "bold",
              textTransform: "capitalize",
              textAlign: "left",
              paddingLeft: 5,
            }}
            style={{
              width: "100%",
              height: 38,
            }}
          />
        </View>
      ))}
    </View>
  );
};

export default memo(CheckBoxEmployeeSelection);
