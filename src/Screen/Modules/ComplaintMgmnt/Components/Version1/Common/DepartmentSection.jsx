import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useGetDepartmentSection } from "../../../../../../api/TicketsUtilities";
import { useDispatch } from "react-redux";
import { setSelectedDepartmentSectionId } from "../../../../../../Redux/ReduxSlice/newTicketSlice";

const DepartmentSection = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {
    data: departmentSections,
    isLoading,
    isError,
    error,
  } = useGetDepartmentSection();

  const [selectedEmpIds, setSelectedEmpIds] = useState([]);

  const handleSelectedItemsChange = (selectedIds) => {
    setSelectedEmpIds(selectedIds);
    dispatch(setSelectedDepartmentSectionId(selectedIds[0]));
  };

  useEffect(() => {
    return () => {
      setSelectedEmpIds([]);
      dispatch(setSelectedDepartmentSectionId(null));
    };
  }, [dispatch]);

  const renderHeader = () => (
    <View style={styles(theme).headerContainer}>
      <Text
        style={[
          styles(theme).headerText,
          { color: theme.colors.logoCol2 || theme.colors.primary },
        ]}
      >
        Department Sections
      </Text>
    </View>
  );

  const renderLoading = () => (
    <View style={styles(theme).loadingContainer}>
      <Text
        style={[
          styles(theme).loadingText,
          { color: theme.colors.text || "#666" },
        ]}
      >
        Loading employees...
      </Text>
    </View>
  );

  const renderError = () => (
    <View style={styles(theme).errorContainer}>
      <Text
        style={[
          styles(theme).errorText,
          { color: theme.colors.text || "#666" },
        ]}
      >
        Error: {error?.message || "Failed to load employees"}
      </Text>
    </View>
  );
  return (
    <View style={styles(theme).container}>
      {isError ? (
        renderError()
      ) : (
        <SectionedMultiSelect
          IconRenderer={MaterialIcons}
          uniqueKey="sec_id"
          displayKey="sec_name"
          items={departmentSections || []}
          onSelectedItemsChange={handleSelectedItemsChange}
          selectedItems={selectedEmpIds}
          selectText="Department Sections"
          autoFocus
          showDropDowns={false}
          single={true}
          showCancelButton
          itemNumberOfLines={1}
          alwaysShowSelectText={false}
          highlightChildren={true}
          showRemoveAll
          headerComponent={renderHeader}
          loadingComponent={renderLoading}
          loading={isLoading}
          confirmText="Confirm Selection"
          cancelIconComponent={
            <MaterialIcons name="close" size={23} color="white" />
          }
          searchPlaceholderText="Search Sections"
          styles={{
            container: {
              borderRadius: 15,
              padding: 10,
            },
            chipText: {
              color: theme.colors.logoCol2,
              fontSize: 12,
              fontFamily: "Roboto_500Medium",
              fontWeight: "800",
            },
            searchBar: {
              backgroundColor: `rgba(0,0,0,0.1)`,
              borderRadius: 10,
              margin: 2,
              marginVertical: 7,
              marginHorizontal: 7,
              marginTop: 7,
            },
            itemText: {
              color: theme.colors.fontColor1,
              fontSize: 14.5,
              fontFamily: "Roboto_500Medium",
              fontWeight: "800",
              textTransform: "capitalize",
            },
            button: {
              backgroundColor: theme.colors.logoCol2,
              opacity: 0.9,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            },
            chipIcon: {
              color: theme.colors.logoCol2,
            },
            cancelButton: {
              backgroundColor: theme.colors.logoCol1,
              opacity: 0.9,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            },
            toggleIcon: {
              color: theme.colors.logoCol1,
            },
            selectedItemText: {
              color: theme.colors.logoCol2,
              fontSize: 14.5,
              fontFamily: "Roboto_500Medium",
              fontWeight: "800",
              textTransform: "capitalize",
            },
            subItemText: {
              color: "lightgrey",
            },
            item: {
              paddingHorizontal: 15,
            },
            subItem: {
              paddingHorizontal: 40,
            },
            selectedItem: {
              backgroundColor: "rgba(0,0,0,0.1)",
            },
            selectedSubItem: {
              backgroundColor: "rgba(0,0,0,0.1)",
            },
            selectToggle: {
              flex: 1,
              backgroundColor: theme.colors.logoCol1Opacity,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              margin: 2,
              marginVertical: 7,
              marginTop: 7,
              padding: 5,
            },
            selectToggleText: {
              color: theme.colors.logoCol2,
              fontSize: 14.5,
              fontFamily: "Roboto_500Medium",
              fontWeight: "800",
              textTransform: "capitalize",
              textAlign: "center",
              textAlignVertical: "center",
            },
            scrollView: { paddingHorizontal: 0 },
          }}
          colors={{
            success: theme.colors.logoCol1,
            chipColor: theme.colors.logoCol2,
            cancel: theme.colors.logoCol1,
          }}
        />
      )}
    </View>
  );
};

export default React.memo(DepartmentSection);

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    headerContainer: {
      justifyContent: "center",
      alignItems: "center",
      height: 30,
    },
    headerText: {
      fontFamily: "Roboto_500Medium",
      fontWeight: "800",
      fontSize: 16,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    loadingText: {
      fontSize: 14,
      fontFamily: "Roboto_400Regular",
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    errorText: {
      fontSize: 14,
      fontFamily: "Roboto_400Regular",
    },
  });
