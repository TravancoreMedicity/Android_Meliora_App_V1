import { View, Text } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { UseGetEmpWithOutLoginUser } from "../../../../../../api/TicketsUtilities";
import { Checkbox, useTheme } from "react-native-paper";
import CustomActivityIndicator from "../../../../../../Components/CustomActivityIndicator";
import SkeletonExpo from "../../../../../../Components/V1_Cmp/Skeleton-Cmp/SkeletonExpo";

const EmpListWithOutLoggedUser = ({
  postData,
  selectedEmpNos,
  setSelectedEmpNos,
  assitedEmplist,
}) => {
  const theme = useTheme();

  const { data, isError, isLoading, isSuccess } =
    UseGetEmpWithOutLoginUser(postData);
  const empList = data?.data ?? [];
  const employees = useMemo(() => {
    const assistemp = assitedEmplist?.map((emp) => emp.assigned_emp);
    return empList?.filter((emp) => !assistemp.includes(emp.em_id));
  }, [empList, assitedEmplist]);

  const toggleCheckbox = useCallback(
    (emp_no) => {
      setSelectedEmpNos(
        (prev) =>
          prev.includes(emp_no)
            ? prev.filter((id) => id !== emp_no) // remove if already selected
            : [...prev, emp_no] // add if not selected
      );
    },
    [setSelectedEmpNos]
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  // Clear selectedEmpNos on unmount
  useEffect(() => {
    return () => {
      setSelectedEmpNos([]);
    };
  }, [setSelectedEmpNos]);

  return loading || isLoading || isError ? (
    <SkeletonExpo height={110} />
  ) : (
    <View style={{ padding: 12.5 }}>
      {employees.length > 0 &&
        employees.map((emp) => (
          <View
            key={emp.em_id}
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
                selectedEmpNos.includes(emp.em_id) ? "checked" : "unchecked"
              }
              onPress={() => toggleCheckbox(emp.em_id)}
              label={emp.em_name}
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

export default EmpListWithOutLoggedUser;
