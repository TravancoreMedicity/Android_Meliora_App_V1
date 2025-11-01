import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  getComplaintType,
  getComplaintTypeList,
  setSelectedComplaintType,
} from "../../../../../../Redux/ReduxSlice/newTicketSlice";
import SkeletonExpo from "../../../../../../Components/V1_Cmp/Skeleton-Cmp/SkeletonExpo";

const ComTypeSelection = ({ selectedComplaintDepartment }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const complaintTypeList = useSelector(getComplaintTypeList);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedTypeId, setSelectedTypeId] = useState(null);
  // const [selectedDeptId, setSelectedDeptId] = useState(null);

  useEffect(() => {
    // Debounce for repeted api call
    let debounceTimer;
    const minLoadingTimer = setTimeout(() => {}, 500); // Minimum 500ms loading time

    debounceTimer = setTimeout(() => {
      dispatch(getComplaintType()).then(() => {
        clearTimeout(minLoadingTimer);
        setIsLoading(false);
      });
    }, 300); // Debounce delay of 300ms

    return () => {
      clearTimeout(debounceTimer);
      clearTimeout(minLoadingTimer);
    };
  }, [dispatch]);

  const handleSingleSelect = (deptTypeId) => {
    setSelectedTypeId(deptTypeId);
    dispatch(setSelectedComplaintType(deptTypeId));
    // setComplaintDepartment(deptId);
  };

  const filteredComplaintTypes =
    complaintTypeList?.filter(
      (item) => item.complaint_dept_slno === selectedComplaintDepartment
    ) || [];

  // Map-based rendering for single selection
  const renderMapSingle = () =>
    filteredComplaintTypes?.map((item) => (
      <TouchableOpacity
        key={item.complaint_type_slno} // Use unique ID or fallback
        style={[
          styles(theme).button,
          selectedTypeId === item.complaint_type_slno &&
            styles(theme).selectedButton,
        ]}
        onPress={() => handleSingleSelect(item.complaint_type_slno)}
        accessibilityRole="radio"
        accessibilityState={{
          selected: selectedTypeId === item.complaint_type_slno,
        }}
        accessibilityLabel={`Select ${item.complaint_type_name || "Type"}`}
      >
        <View style={styles(theme).buttonContent}>
          {selectedTypeId === item.complaint_type_slno && (
            <View>
              <Ionicons name="checkmark-done" size={20} color="white" />
            </View>
          )}
          <View>
            <Text
              style={[
                styles(theme).buttonText,
                selectedTypeId === item.complaint_type_slno &&
                  styles(theme).selectedButtonText,
              ]}
            >
              {item.complaint_type_name || "Unknown Type"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ));

  const renderComplaintDeptsTyes = () => {
    if (isLoading) return <SkeletonExpo height={60} />;
    if (!filteredComplaintTypes.length)
      return (
        <Text style={styles(theme).emptyText}>
          {selectedComplaintDepartment
            ? "No complaint types available"
            : "Please select a department"}
        </Text>
      );
    return renderMapSingle();
  };

  return (
    <View style={styles(theme).container}>{renderComplaintDeptsTyes()}</View>
  );
};

export default React.memo(ComTypeSelection);

const styles = (colorTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexWrap: "wrap",
      flexDirection: "row",
      backgroundColor: colorTheme.colors.mainScreenColor,
      alignItems: "center",
      justifyContent: "center",
      rowGap: 5,
    },
    button: {
      width: "48%",
      justifyContent: "center",
      alignItems: "center",
      padding: 5,
      marginRight: 5,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colorTheme.colors.logoCol2,
    },
    selectedButton: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colorTheme.colors.logoCol2,
      borderColor: colorTheme.colors.logoCol2,
    },
    buttonContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      columnGap: 10,
    },
    buttonText: {
      fontSize: 12.5,
      color: "rgb(124,81,161)",
      textAlign: "center",
      fontFamily: "Roboto_500Medium",
      fontWeight: "bold",
      textTransform: "capitalize",
    },
    selectedButtonText: {
      fontSize: 12.5,
      color: "white",
      textAlign: "center",
      fontFamily: "Roboto_500Medium",
      fontWeight: "bold",
      textTransform: "capitalize",
    },
  });
