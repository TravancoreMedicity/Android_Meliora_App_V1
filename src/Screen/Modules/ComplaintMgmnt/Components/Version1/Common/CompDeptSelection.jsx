import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getComplaintDept,
  getComplaintDeptList,
  setSelectedDept,
} from "../../../../../../Redux/ReduxSlice/newTicketSlice";
import SkeletonExpo from "../../../../../../Components/V1_Cmp/Skeleton-Cmp/SkeletonExpo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "react-native-paper";

const CompDeptSelection = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const complaintDept = useSelector(getComplaintDeptList);
  // For single selection: stores the ID of the selected department
  const [selectedDeptId, setSelectedDeptId] = useState(null);

  useEffect(() => {
    // Debounce for repeted api call
    let debounceTimer;
    const minLoadingTimer = setTimeout(() => {}, 500); // Minimum 500ms loading time

    debounceTimer = setTimeout(() => {
      dispatch(getComplaintDept()).then(() => {
        clearTimeout(minLoadingTimer);
        setIsLoading(false);
      });
    }, 300); // Debounce delay of 300ms

    return () => {
      clearTimeout(debounceTimer);
      clearTimeout(minLoadingTimer);
    };
  }, [dispatch]);

  // Single selection handler
  const handleSingleSelect = (deptId) => {
    setSelectedDeptId(deptId);
    dispatch(setSelectedDept(deptId));
  };

  useEffect(() => {
    dispatch(setSelectedDept(null));
  }, [dispatch]);

  // Map-based rendering for single selection
  const renderMapSingle = () =>
    complaintDept.map((item) => (
      <TouchableOpacity
        key={item.id} // Use unique ID or fallback
        style={[
          styles(theme).button,
          selectedDeptId === item.id && styles(theme).selectedButton,
        ]}
        onPress={() => handleSingleSelect(item.id)}
        accessibilityLabel={`Select ${item.label || "department"}`}
      >
        <View style={styles(theme).buttonContent}>
          {selectedDeptId === item.id && (
            <View>
              <Ionicons name="checkmark-done" size={20} color="white" />
            </View>
          )}
          <View>
            <Text
              style={[
                styles(theme).buttonText,
                selectedDeptId === item.id && styles(theme).selectedButtonText,
              ]}
            >
              {item.label || "Unknown Department"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ));

  const renderComplaintDepts = () => {
    if (isLoading) return <SkeletonExpo height={110} />;
    if (!complaintDept?.length) return <SkeletonExpo height={110} />;

    return renderMapSingle();
  };
  //   console.log(renderComplaintDepts);
  return <View style={styles(theme).container}>{renderComplaintDepts()}</View>;
};

export default React.memo(CompDeptSelection);

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
      //   marginHorizontal: 2,
      padding: 5,
      //   marginVertical: 5,
      //   marginHorizontal: 10,
      marginRight: 5,
      //   backgroundColor: colorTheme.colors.logoCol1Opacity,
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
      //   backgroundColor: "green",
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
